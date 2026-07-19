import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 137 - TYPE-LEVEL INTERPRETER CAPSTONE
 * ===========================================
 *
 * A type-level interpreter combines the phase's techniques around a recursive,
 * discriminated AST. Each node is an instruction. Evaluation recursively reduces
 * children, checks their value domains, and either returns `Ok<Value>` or a
 * specific `Failure<Message>`. An environment maps variable names to values;
 * `let` evaluates a binding and extends that environment for its body.
 *
 * Read `Eval<Add<Lit<2>, Lit<3>>>` aloud as: "evaluate the left expression,
 * evaluate the right expression, require two numbers, add their tuple lengths,
 * and wrap five in Ok." The result union is data, not a compiler crash: invalid
 * programs are values the type system can inspect and compose.
 */

export type Value = string | number | boolean;
export type Environment = Readonly<Record<string, Value>>;

export type Literal<V extends Value> = { kind: "literal"; value: V };
export type Variable<Name extends string> = { kind: "variable"; name: Name };
export type Add<Left extends Expression, Right extends Expression> = { kind: "add"; left: Left; right: Right };
export type Concat<Left extends Expression, Right extends Expression> = { kind: "concat"; left: Left; right: Right };
export type Equals<Left extends Expression, Right extends Expression> = { kind: "equals"; left: Left; right: Right };
export type If<Condition extends Expression, Then extends Expression, Else extends Expression> = {
  kind: "if";
  condition: Condition;
  then: Then;
  else: Else;
};
export type Let<Name extends string, Bound extends Expression, Body extends Expression> = {
  kind: "let";
  name: Name;
  value: Bound;
  body: Body;
};

export type Expression =
  | Literal<Value>
  | Variable<string>
  | { kind: "add"; left: Expression; right: Expression }
  | { kind: "concat"; left: Expression; right: Expression }
  | { kind: "equals"; left: Expression; right: Expression }
  | { kind: "if"; condition: Expression; then: Expression; else: Expression }
  | { kind: "let"; name: string; value: Expression; body: Expression };

export type Ok<Result extends Value> = { ok: true; value: Result };
export type Failure<Message extends string> = { ok: false; error: Message };
export type Evaluation = Ok<Value> | Failure<string>;

type IsAny<T> = 0 extends 1 & T ? true : false;
type IsNatural<N extends number> = `${N}` extends `-${string}` | `${string}.${string}` ? false : true;
type Build<N extends number, Acc extends unknown[] = []> =
  Acc["length"] extends N ? Acc : Build<N, [...Acc, unknown]>;

type AddNumbers<A extends number, B extends number> = IsAny<A | B> extends true
  ? number
  : number extends A | B
    ? number
    : A extends unknown
      ? B extends unknown
        ? IsNatural<A> extends true
          ? IsNatural<B> extends true
            ? [...Build<A>, ...Build<B>]["length"]
            : number
          : number
        : never
      : never;

type ConcatStrings<A extends string, B extends string> = string extends A | B ? string : `${A}${B}`;

type EqualValues<A extends Value, B extends Value> = IsAny<A | B> extends true
  ? boolean
  : string extends A | B
    ? boolean
    : number extends A | B
      ? boolean
      : boolean extends A | B
        ? boolean
        : [Extract<A, B>] extends [never]
          ? false
          : Equal<A, B> extends true ? true : boolean;

type Bind<Env extends Environment, Name extends string, Bound extends Value> =
  Omit<Env, Name> & Readonly<Record<Name, Bound>>;

type EvalAdd<Left extends Expression, Right extends Expression, Env extends Environment> =
  Eval<Left, Env> extends infer LeftResult
    ? LeftResult extends Ok<infer LeftValue>
      ? Eval<Right, Env> extends infer RightResult
        ? RightResult extends Ok<infer RightValue>
          ? LeftValue extends number
            ? RightValue extends number
              ? Ok<AddNumbers<LeftValue, RightValue> & number>
              : Failure<"type:add">
            : Failure<"type:add">
          : RightResult extends Failure<string> ? RightResult : never
        : never
      : LeftResult extends Failure<string> ? LeftResult : never
    : never;

type EvalConcat<Left extends Expression, Right extends Expression, Env extends Environment> =
  Eval<Left, Env> extends infer LeftResult
    ? LeftResult extends Ok<infer LeftValue>
      ? Eval<Right, Env> extends infer RightResult
        ? RightResult extends Ok<infer RightValue>
          ? LeftValue extends string
            ? RightValue extends string
              ? Ok<ConcatStrings<LeftValue, RightValue>>
              : Failure<"type:concat">
            : Failure<"type:concat">
          : RightResult extends Failure<string> ? RightResult : never
        : never
      : LeftResult extends Failure<string> ? LeftResult : never
    : never;

type EvalEquals<Left extends Expression, Right extends Expression, Env extends Environment> =
  Eval<Left, Env> extends infer LeftResult
    ? LeftResult extends Ok<infer LeftValue>
      ? Eval<Right, Env> extends infer RightResult
        ? RightResult extends Ok<infer RightValue>
          ? Ok<EqualValues<LeftValue, RightValue>>
          : RightResult extends Failure<string> ? RightResult : never
        : never
      : LeftResult extends Failure<string> ? LeftResult : never
    : never;

type EvalIf<
  Condition extends Expression,
  Then extends Expression,
  Else extends Expression,
  Env extends Environment,
> = Eval<Condition, Env> extends infer ConditionResult
  ? ConditionResult extends Ok<infer ConditionValue>
    ? ConditionValue extends true
      ? Eval<Then, Env>
      : ConditionValue extends false
        ? Eval<Else, Env>
        : Failure<"type:condition">
    : ConditionResult extends Failure<string> ? ConditionResult : never
  : never;

type EvalLet<
  Name extends string,
  Bound extends Expression,
  Body extends Expression,
  Env extends Environment,
> = Eval<Bound, Env> extends infer BoundResult
  ? BoundResult extends Ok<infer BoundValue>
    ? Eval<Body, Bind<Env, Name, BoundValue>>
    : BoundResult extends Failure<string> ? BoundResult : never
  : never;

export type Eval<Node extends Expression, Env extends Environment = {}> =
  Node extends Literal<infer LiteralValue>
    ? Ok<LiteralValue>
    : Node extends Variable<infer Name>
      ? Name extends keyof Env
        ? Env[Name] extends Value ? Ok<Env[Name]> : never
        : Failure<`unbound:${Name}`>
      : Node extends Add<infer Left, infer Right>
        ? EvalAdd<Left, Right, Env>
        : Node extends Concat<infer Left, infer Right>
          ? EvalConcat<Left, Right, Env>
          : Node extends Equals<infer Left, infer Right>
            ? EvalEquals<Left, Right, Env>
            : Node extends If<infer Condition, infer Then, infer Else>
              ? EvalIf<Condition, Then, Else, Env>
              : Node extends Let<infer Name, infer Bound, infer Body>
                ? EvalLet<Name, Bound, Body, Env>
                : never;

// Part 1: Literal and variable nodes establish values and environment lookup.
type _01 = Expect<Equal<Eval<Literal<42>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Eval<Literal<"hi">>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Eval<Variable<"x">, { x: 7 }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Eval<Variable<"missing">>, TODO>>; // TODO(koan) @koan-error

// Part 2: Operators evaluate children, validate domains, and preserve literals.
type _05 = Expect<Equal<Eval<Add<Literal<2>, Literal<3>>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Eval<Add<Literal<2>, Literal<"3">>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Eval<Concat<Literal<"type">, Literal<"script">>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Eval<Concat<Literal<"x">, Literal<1>>>, TODO>>; // TODO(koan) @koan-error

// Part 3: Equality and conditionals produce and consume Boolean results.
type _09 = Expect<Equal<Eval<Equals<Literal<2>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Eval<Equals<Literal<2>, Literal<3>>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Eval<If<Literal<true>, Literal<"yes">, Literal<"no">>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Eval<If<Literal<false>, Literal<"yes">, Literal<"no">>>, TODO>>; // TODO(koan) @koan-error

// Part 4: Let bindings extend and shadow an immutable environment.
type _13 = Expect<Equal<Eval<Let<"x", Literal<4>, Add<Variable<"x">, Literal<1>>>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Eval<Let<"name", Literal<"Type">, Concat<Variable<"name">, Literal<"Script">>>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Eval<Let<"x", Literal<1>, Let<"x", Literal<2>, Variable<"x">>>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Eval<Let<"x", Variable<"missing">, Variable<"x">>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Nested programs expose laziness, broad values, and error propagation.
type _17 = Expect<Equal<Eval<If<Literal<true>, Literal<1>, Variable<"missing">>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Eval<Add<Literal<number>, Literal<1>>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Eval<Equals<Literal<string>, Literal<"x">>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Eval<If<Literal<"truthy">, Literal<1>, Literal<0>>>, TODO>>; // TODO(koan) @koan-error

export function evaluate<const Node extends Expression, const Env extends Environment = {}>(
  node: Node,
  environment: Env = {} as Env,
): Eval<Node, Env> {
  return evaluateRuntime(node, environment) as Eval<Node, Env>;
}

function evaluateRuntime(node: Expression, environment: Environment): Evaluation {
  switch (node.kind) {
    case "literal":
      return { ok: true, value: node.value };
    case "variable":
      return node.name in environment
        ? { ok: true, value: environment[node.name] as Value }
        : { ok: false, error: `unbound:${node.name}` };
    case "add":
      return binary(node.left, node.right, environment, "add");
    case "concat":
      return binary(node.left, node.right, environment, "concat");
    case "equals":
      return binary(node.left, node.right, environment, "equals");
    case "if": {
      const condition = evaluateRuntime(node.condition, environment);
      if (!condition.ok) return condition;
      if (typeof condition.value !== "boolean") return { ok: false, error: "type:condition" };
      return evaluateRuntime(condition.value ? node.then : node.else, environment);
    }
    case "let": {
      const bound = evaluateRuntime(node.value, environment);
      if (!bound.ok) return bound;
      return evaluateRuntime(node.body, { ...environment, [node.name]: bound.value });
    }
  }
  throw new Error("unreachable expression node");
}

function binary(
  leftNode: Expression,
  rightNode: Expression,
  environment: Environment,
  operation: "add" | "concat" | "equals",
): Evaluation {
  const left = evaluateRuntime(leftNode, environment);
  if (!left.ok) return left;
  const right = evaluateRuntime(rightNode, environment);
  if (!right.ok) return right;
  if (operation === "equals") return { ok: true, value: Object.is(left.value, right.value) };
  if (operation === "add" && typeof left.value === "number" && typeof right.value === "number") {
    return { ok: true, value: left.value + right.value };
  }
  if (operation === "concat" && typeof left.value === "string" && typeof right.value === "string") {
    return { ok: true, value: left.value + right.value };
  }
  return { ok: false, error: `type:${operation}` };
}
