import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-137: type-level interpreter capstone — constructions
 * =============================================================================
 *
 * Everything in this phase converges here. The AST is a recursive discriminated
 * union, evaluation is recursion over it, arithmetic is tuple counting, string
 * work is template matching, and the environment is a mapped object extended by
 * `let`. The design choice that makes it usable is that failure is *data*: an
 * invalid program produces a `Failure` value the type system can inspect and
 * compose, not a compiler error. Two behaviours are worth watching for. Branches
 * are lazy — the untaken branch of a conditional is never evaluated, so a broken
 * expression there costs nothing — while binary operands are strict and
 * left-first, so the leftmost failure is the one that propagates. And an
 * undecided value keeps the interpreter honest: a broad `number` addend yields a
 * broad `number` result rather than a fabricated literal. Replace each `TODO`
 * with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenIsNatural<Value extends number> = `${Value}` extends
  | `-${string}`
  | `${string}.${string}`
  ? false
  : true;

type GivenBuild<Count extends number, Acc extends unknown[] = []> = Acc["length"] extends Count
  ? Acc
  : GivenBuild<Count, [...Acc, unknown]>;

export type Value = string | number | boolean;
export type Environment = Readonly<Record<string, Value>>;

export type Literal<Held extends Value> = { kind: "literal"; value: Held };
export type Variable<Name extends string> = { kind: "variable"; name: Name };
export type Add<Left extends Expression, Right extends Expression> = {
  kind: "add";
  left: Left;
  right: Right;
};
export type Concat<Left extends Expression, Right extends Expression> = {
  kind: "concat";
  left: Left;
  right: Right;
};
export type Equals<Left extends Expression, Right extends Expression> = {
  kind: "equals";
  left: Left;
  right: Right;
};
export type If<
  Condition extends Expression,
  Then extends Expression,
  Else extends Expression,
> = { kind: "if"; condition: Condition; then: Then; else: Else };
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

// Declared with the packet's own evaluation signature so a construction can be
// graded against a real call site.
declare function givenEvaluate<const Node extends Expression, const Env extends Environment = {}>(
  node: Node,
  environment?: Env,
): EvalOf<Node, Env>;

// ─── The primitive operations ─────────────────────────────────────────

// 1. Build the numeric addition the interpreter needs. It must stay honest about
//    what it cannot count: a broad or non-natural operand yields a broad result
//    rather than a fabricated literal.
export type AddNumbersOf<Left extends number, Right extends number> = TODO; // TODO(koan)

type _01a = Expect<Equal<AddNumbersOf<2, 3>, 5>>;
type _01b = Expect<Equal<AddNumbersOf<number, 1>, number>>;
type _01c = Expect<Equal<AddNumbersOf<1.5, 2>, number>>;
type _01d = Expect<Equal<AddNumbersOf<-1, 2>, number>>;
type _01e = Expect<Equal<AddNumbersOf<1 | 2, 10>, 11 | 12>>;

// 2. Build the string concatenation, whose only subtlety is refusing to
//    interpolate a broad string into a literal template.
export type ConcatStringsOf<Left extends string, Right extends string> = TODO; // TODO(koan)

type _02a = Expect<Equal<ConcatStringsOf<"type", "script">, "typescript">>;
type _02b = Expect<Equal<ConcatStringsOf<string, "x">, string>>;
type _02c = Expect<Equal<ConcatStringsOf<"", "x">, "x">>;
type _02d = Expect<Equal<ConcatStringsOf<"a" | "b", "!">, "a!" | "b!">>;
type _02e = Expect<Equal<ConcatStringsOf<"x", string>, string>>;

// 3. Build the value equality the interpreter reports. Only two decided literals
//    can produce a decided answer; anything broad has to admit `boolean`.
export type EqualValuesOf<Left extends Value, Right extends Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<EqualValuesOf<2, 2>, true>>;
type _03b = Expect<Equal<EqualValuesOf<2, 3>, false>>;
type _03c = Expect<Equal<EqualValuesOf<string, "x">, boolean>>;
type _03d = Expect<Equal<EqualValuesOf<number, 2>, boolean>>;
type _03e = Expect<Equal<EqualValuesOf<"x", "x">, true>>;

// 4. Build the environment extension, which must replace an existing binding
//    rather than intersect with it — that is what makes shadowing work.
export type BindOf<
  Env extends Environment,
  Name extends string,
  Bound extends Value,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<BindOf<{}, "x", 1>["x"], 1>>;
type _04b = Expect<Equal<BindOf<{ readonly x: 9 }, "x", 1>["x"], 1>>;
type _04c = Expect<Equal<BindOf<{ readonly y: 2 }, "x", 1>["y"], 2>>;
type _04d = Expect<Equal<keyof BindOf<{ readonly y: 2 }, "x", 1>, "y" | "x">>;
type _04e = Expect<Equal<BindOf<BindOf<{}, "x", 1>, "x", 2>["x"], 2>>;

// ─── Evaluating each node ─────────────────────────────────────────────

// 5. Build the addition rule: evaluate the left operand, then the right, then
//    require both to be numbers. A failure on either side propagates unchanged,
//    and the left one wins because it is evaluated first.
export type EvalAddOf<
  Left extends Expression,
  Right extends Expression,
  Env extends Environment,
> = TODO; // TODO(koan)

type _05a = Expect<Equal<EvalAddOf<Literal<2>, Literal<3>, {}>, Ok<5>>>;
type _05b = Expect<Equal<EvalAddOf<Literal<2>, Literal<"3">, {}>, Failure<"type:add">>>;
type _05c = Expect<
  Equal<EvalAddOf<Variable<"left">, Variable<"right">, {}>, Failure<"unbound:left">>
>;
type _05d = Expect<
  Equal<EvalAddOf<Literal<1>, Variable<"right">, {}>, Failure<"unbound:right">>
>;
type _05e = Expect<Equal<EvalAddOf<Literal<number>, Literal<1>, {}>, Ok<number>>>;

// 6. Build the concatenation rule, which is the same shape with a different
//    domain check and a different failure label.
export type EvalConcatOf<
  Left extends Expression,
  Right extends Expression,
  Env extends Environment,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<EvalConcatOf<Literal<"type">, Literal<"script">, {}>, Ok<"typescript">>
>;
type _06b = Expect<Equal<EvalConcatOf<Literal<"x">, Literal<1>, {}>, Failure<"type:concat">>>;
type _06c = Expect<Equal<EvalConcatOf<Literal<1>, Literal<2>, {}>, Failure<"type:concat">>>;
type _06d = Expect<Equal<EvalConcatOf<Literal<string>, Literal<"x">, {}>, Ok<string>>>;
type _06e = Expect<
  Equal<EvalConcatOf<Literal<"bad">, Variable<"right">, {}>, Failure<"unbound:right">>
>;

// 7. Build the equality rule, which accepts any two values and so has no domain
//    failure of its own.
export type EvalEqualsOf<
  Left extends Expression,
  Right extends Expression,
  Env extends Environment,
> = TODO; // TODO(koan)

type _07a = Expect<Equal<EvalEqualsOf<Literal<2>, Literal<2>, {}>, Ok<true>>>;
type _07b = Expect<Equal<EvalEqualsOf<Literal<2>, Literal<3>, {}>, Ok<false>>>;
type _07c = Expect<Equal<EvalEqualsOf<Literal<string>, Literal<"x">, {}>, Ok<boolean>>>;
type _07d = Expect<
  Equal<EvalEqualsOf<Variable<"left">, Variable<"right">, {}>, Failure<"unbound:left">>
>;
type _07e = Expect<Equal<EvalEqualsOf<Literal<number>, Literal<2>, {}>, Ok<boolean>>>;

// 8. Build the conditional rule. Only the selected branch is evaluated, and a
//    condition that is not a boolean is its own domain failure.
export type EvalIfOf<
  Condition extends Expression,
  Then extends Expression,
  Else extends Expression,
  Env extends Environment,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<EvalIfOf<Literal<true>, Literal<"yes">, Literal<"no">, {}>, Ok<"yes">>>;
type _08b = Expect<Equal<EvalIfOf<Literal<false>, Literal<"yes">, Literal<"no">, {}>, Ok<"no">>>;
type _08c = Expect<Equal<EvalIfOf<Literal<true>, Literal<1>, Variable<"missing">, {}>, Ok<1>>>;
type _08d = Expect<
  Equal<EvalIfOf<Literal<"truthy">, Literal<1>, Literal<0>, {}>, Failure<"type:condition">>
>;
type _08e = Expect<
  Equal<EvalIfOf<Variable<"flag">, Literal<1>, Literal<2>, {}>, Failure<"unbound:flag">>
>;

// 9. Build the binding rule: evaluate the bound expression in the *current*
//    environment, then evaluate the body in the extended one.
export type EvalLetOf<
  Name extends string,
  Bound extends Expression,
  Body extends Expression,
  Env extends Environment,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<EvalLetOf<"x", Literal<4>, Add<Variable<"x">, Literal<1>>, {}>, Ok<5>>
>;
type _09b = Expect<
  Equal<EvalLetOf<"x", Literal<1>, Let<"x", Literal<2>, Variable<"x">>, {}>, Ok<2>>
>;
type _09c = Expect<
  Equal<EvalLetOf<"x", Variable<"missing">, Variable<"x">, {}>, Failure<"unbound:missing">>
>;
type _09d = Expect<
  Equal<EvalLetOf<"x", Variable<"x">, Variable<"x">, { readonly x: 4 }>, Ok<4>>
>;
type _09e = Expect<Equal<EvalLetOf<"x", Literal<1>, Variable<"x">, { readonly x: 9 }>, Ok<1>>>;

// 10. Build the dispatcher that routes each node kind to its rule, with variable
//     lookup and literal wrapping handled inline.
export type EvalOf<
  Node extends Expression,
  Env extends Environment = {},
> = TODO; // TODO(koan)

type _10a = Expect<Equal<EvalOf<Literal<42>>, Ok<42>>>;
type _10b = Expect<Equal<EvalOf<Variable<"x">, { readonly x: 7 }>, Ok<7>>>;
type _10c = Expect<Equal<EvalOf<Variable<"missing">>, Failure<"unbound:missing">>>;
type _10d = Expect<Equal<EvalOf<Add<Literal<2>, Literal<3>>>, Ok<5>>>;
type _10e = Expect<Equal<EvalOf<never>, never>>;

// ─── Strategy made visible ────────────────────────────────────────────

// 11. Report branches being lazy: a broken expression in the untaken branch is
//     never evaluated and costs nothing.
export type LazyBranchProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<LazyBranchProfile["brokenElseIgnored"], Ok<1>>>;
type _11b = Expect<Equal<LazyBranchProfile["brokenThenIgnored"], Ok<2>>>;
type _11c = Expect<
  Equal<LazyBranchProfile["undecidedTakesBoth"], Ok<1> | Failure<"unbound:bad">>
>;
type _11d = Expect<Equal<LazyBranchProfile["conditionFailsFirst"], Failure<"unbound:flag">>>;
type _11e = Expect<
  Equal<LazyBranchProfile["nonBooleanCondition"], Failure<"type:condition">>
>;

// 12. Report binary operands being strict and left-first, so the leftmost failure
//     is the one that reaches the caller.
export type LeftFirstFailureProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<LeftFirstFailureProfile["bothUnbound"], Failure<"unbound:left">>
>;
type _12b = Expect<
  Equal<LeftFirstFailureProfile["leftWrongTypeStillEvaluatesRight"], Failure<"unbound:right">>
>;
type _12c = Expect<
  Equal<LeftFirstFailureProfile["rightUnbound"], Failure<"unbound:right">>
>;
type _12d = Expect<
  Equal<LeftFirstFailureProfile["equalsBothUnbound"], Failure<"unbound:left">>
>;
type _12e = Expect<
  Equal<LeftFirstFailureProfile["domainFailureAfterBothSucceed"], Failure<"type:add">>
>;

// ─── The environment ──────────────────────────────────────────────────

// 13. Report binding being lexical, immutable, and shadowed by the nearest
//     enclosing `let`.
export type BindingProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<BindingProfile["shadowsOuterEnvironment"], Ok<1>>>;
type _13b = Expect<Equal<BindingProfile["boundInOuterScope"], Ok<3>>>;
type _13c = Expect<Equal<BindingProfile["innerShadowsOuterLet"], Ok<2>>>;
type _13d = Expect<Equal<BindingProfile["laterSeesEarlier"], Ok<1>>>;
type _13e = Expect<Equal<BindingProfile["unrelatedBindingSurvives"], Ok<2>>>;

// 14. Report the bound expression being evaluated *before* the new binding
//     exists, which is what makes a self-referential `let` an unbound error
//     rather than a loop.
export type BindingOrderProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<BindingOrderProfile["selfReferenceFails"], Failure<"unbound:x">>>;
type _14b = Expect<Equal<BindingOrderProfile["selfReferenceSeesOuter"], Ok<4>>>;
type _14c = Expect<Equal<BindingOrderProfile["bodyUsesBindingTwice"], Ok<2>>>;
type _14d = Expect<
  Equal<BindingOrderProfile["failedBindingPropagates"], Failure<"unbound:missing">>
>;
type _14e = Expect<Equal<BindingOrderProfile["chainedBindings"], Ok<6>>>;

// ─── Staying honest about what is unknown ─────────────────────────────

// 15. Report an undecided value producing an undecided result rather than a
//     fabricated literal.
export type UndecidedValueProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<UndecidedValueProfile["broadLiteral"], Ok<number>>>;
type _15b = Expect<Equal<UndecidedValueProfile["broadAddend"], Ok<number>>>;
type _15c = Expect<Equal<UndecidedValueProfile["broadConcat"], Ok<string>>>;
type _15d = Expect<Equal<UndecidedValueProfile["broadEquality"], Ok<boolean>>>;
type _15e = Expect<Equal<UndecidedValueProfile["undecidedCondition"], Ok<1> | Ok<2>>>;

// 16. Report the arithmetic's own representational limits leaking into the
//     interpreter: a value it cannot count still evaluates, just imprecisely.
export type ArithmeticLimitProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ArithmeticLimitProfile["fractional"], Ok<number>>>;
type _16b = Expect<Equal<ArithmeticLimitProfile["negative"], Ok<number>>>;
type _16c = Expect<Equal<ArithmeticLimitProfile["exactSmallSum"], Ok<5>>>;
type _16d = Expect<Equal<ArithmeticLimitProfile["unionAddend"], Ok<11> | Ok<12>>>;
type _16e = Expect<Equal<ArithmeticLimitProfile["unionProgram"], Ok<1> | Ok<2>>>;

// ─── Failure as data ──────────────────────────────────────────────────

// 17. Build the reader that pulls a successful value back out, which is only
//     possible because success and failure are ordinary inspectable types.
export type ResultValueOf<Result> = TODO; // TODO(koan)

type _17a = Expect<Equal<ResultValueOf<EvalOf<Add<Literal<2>, Literal<3>>>>, 5>>;
type _17b = Expect<Equal<ResultValueOf<EvalOf<Variable<"missing">>>, never>>;
type _17c = Expect<
  Equal<ResultValueOf<EvalOf<Equals<Literal<"x">, Literal<"x">>>>, true>
>;
type _17d = Expect<
  Equal<
    {
      anyStaysAny: GivenIsAny<ResultValueOf<EvalOf<Literal<any>>>>;
      decided: ResultValueOf<EvalOf<Literal<42>>>;
    },
    { anyStaysAny: true; decided: 42 }
  >
>;
type _17e = Expect<
  Equal<ResultValueOf<EvalOf<If<Literal<boolean>, Literal<1>, Literal<2>>>>, 1 | 2>
>;

// 18. Build the complementary reader for the error message, and the predicate
//     that decides which of the two a program produced.
export type ErrorMessageOf<Result> = TODO; // TODO(koan)

type _18a = Expect<Equal<ErrorMessageOf<EvalOf<Variable<"missing">>>, "unbound:missing">>;
type _18b = Expect<Equal<ErrorMessageOf<EvalOf<Add<Literal<2>, Literal<"3">>>>, "type:add">>;
type _18c = Expect<Equal<ErrorMessageOf<EvalOf<Literal<1>>>, never>>;
type _18d = Expect<
  Equal<ErrorMessageOf<EvalOf<Concat<Literal<1>, Literal<2>>>>, "type:concat">
>;
type _18e = Expect<
  Equal<
    ErrorMessageOf<EvalOf<If<Literal<boolean>, Literal<1>, Variable<"bad">>>>,
    "unbound:bad"
  >
>;

// 19. Build the success predicate, which is how a caller branches on a program's
//     outcome without the compiler ever having errored.
export type SucceedsOf<Node extends Expression, Env extends Environment = {}> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    { valid: SucceedsOf<Add<Literal<2>, Literal<3>>>; unbound: SucceedsOf<Variable<"x">> },
    { valid: true; unbound: false }
  >
>;
type _19b = Expect<
  Equal<
    {
      domainError: SucceedsOf<Concat<Literal<1>, Literal<2>>>;
      withEnvironment: SucceedsOf<Variable<"x">, { readonly x: 1 }>;
    },
    { domainError: false; withEnvironment: true }
  >
>;
type _19c = Expect<
  Equal<
    {
      lazyBranch: SucceedsOf<If<Literal<true>, Literal<1>, Variable<"bad">>>;
      undecidedBranch: SucceedsOf<If<Literal<boolean>, Literal<1>, Variable<"bad">>>;
    },
    { lazyBranch: true; undecidedBranch: false }
  >
>;
type _19d = Expect<
  Equal<
    {
      shadowed: SucceedsOf<Let<"x", Literal<1>, Variable<"x">>>;
      selfReference: SucceedsOf<Let<"x", Variable<"x">, Variable<"x">>>;
    },
    { shadowed: true; selfReference: false }
  >
>;
type _19e = Expect<
  Equal<
    {
      broadStillSucceeds: SucceedsOf<Add<Literal<number>, Literal<1>>>;
      badCondition: SucceedsOf<If<Literal<1>, Literal<true>, Literal<false>>>;
    },
    { broadStillSucceeds: true; badCondition: false }
  >
>;

// 20. Build the evaluation signature the packet exports, whose `const` parameters
//     are what keep a literal program from widening into the broad `Expression`
//     union before the interpreter can read it.
export type InterpreterRuntimeApi = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    {
      surface: keyof InterpreterRuntimeApi;
      arity: Parameters<typeof givenEvaluate<Literal<1>, {}>>["length"];
    },
    { surface: "evaluate"; arity: 1 | 2 }
  >
>;
type _20b = Expect<
  Equal<ReturnType<typeof givenEvaluate<Add<Literal<2>, Literal<3>>, {}>>, Ok<5>>
>;
type _20c = Expect<
  Equal<
    ReturnType<typeof givenEvaluate<Variable<"missing">, {}>>,
    Failure<"unbound:missing">
  >
>;
type _20d = Expect<
  Equal<
    ReturnType<typeof givenEvaluate<Variable<"x">, { readonly x: 7 }>>,
    Ok<7>
  >
>;
type _20e = Expect<
  Equal<
    {
      viaCall: ReturnType<typeof givenEvaluate<Concat<Literal<"a">, Literal<"b">>, {}>>;
      viaType: EvalOf<Concat<Literal<"a">, Literal<"b">>>;
    },
    { viaCall: Ok<"ab">; viaType: Ok<"ab"> }
  >
>;
