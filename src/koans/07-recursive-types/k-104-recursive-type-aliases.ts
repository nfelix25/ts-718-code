import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-104: recursive type aliases
 * =============================================================================
 *
 * A recursive alias names a family of values whose structure may contain a
 * smaller value from the same family. Useful recursion is productive: one step
 * reveals an object, tuple, array, or union branch before referring back to the
 * alias. A base case such as `null`, a leaf value, or a nonrecursive variant
 * gives both runtime algorithms and type-level reasoning somewhere to stop.
 *
 * I read `List<T> = null | { value: T; next: List<T> }` aloud as "either the
 * empty list, or one T followed by another list of T." The alias describes
 * arbitrarily deep values without eagerly expanding an infinite type. Indexed
 * access sees one structural layer at a time, and runtime functions must make
 * progress toward the base case on every recursive call.
 */

export type List<Value> = null | {
  value: Value;
  next: List<Value>;
};

export type Nested<Value> = Value | readonly Nested<Value>[];

export type RecursiveExpression =
  | { kind: "number"; value: number }
  | { kind: "negate"; expression: RecursiveExpression }
  | { kind: "add"; left: RecursiveExpression; right: RecursiveExpression };

export type ListNode<Value> = NonNullable<List<Value>>;

export function listFromArray<Value>(values: readonly Value[]): List<Value> {
  let list: List<Value> = null;
  for (let index = values.length - 1; index >= 0; index -= 1) {
    list = { value: values[index]!, next: list };
  }
  return list;
}

export function listToArray<Value>(list: List<Value>): Value[] {
  const values: Value[] = [];
  for (let node = list; node !== null; node = node.next) values.push(node.value);
  return values;
}

export function mapList<Input, Output>(list: List<Input>, transform: (value: Input) => Output): List<Output> {
  return list === null ? null : { value: transform(list.value), next: mapList(list.next, transform) };
}

export function nestedDepth(value: Nested<unknown>): number {
  return Array.isArray(value) ? 1 + Math.max(0, ...value.map(nestedDepth)) : 0;
}

export function evaluateExpression(expression: RecursiveExpression): number {
  switch (expression.kind) {
    case "number": return expression.value;
    case "negate": return -evaluateExpression(expression.expression);
    case "add": return evaluateExpression(expression.left) + evaluateExpression(expression.right);
  }
}

// Part 1: a recursive list exposes one node layer or its base case.
type _Main01 = Expect<Equal<List<string>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<ListNode<string>["value"], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ListNode<string>["next"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<NonNullable<ListNode<string>["next"]>["value"], TODO>>; // TODO(koan) @koan-error

// Part 2: concrete finite values are members of the unbounded recursive family.
type MainOne = { value: 1; next: null };
type MainTwo = { value: 1; next: { value: 2; next: null } };
type _Main05 = Expect<Equal<MainOne extends List<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainTwo extends List<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<{ value: "x"; next: null } extends List<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<null extends List<number> ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 3: nested containers use a leaf branch as their base case.
type _Main09 = Expect<Equal<string extends Nested<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<readonly ["a", "b"] extends Nested<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<readonly ["a", readonly ["b"]] extends Nested<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<readonly [1] extends Nested<string> ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 4: discriminated recursion supports exhaustive runtime algorithms.
type NumberExpression = Extract<RecursiveExpression, { kind: "number" }>;
type AddExpression = Extract<RecursiveExpression, { kind: "add" }>;
type _Main13 = Expect<Equal<NumberExpression["value"], TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<AddExpression["left"], TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<AddExpression["right"], TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<RecursiveExpression["kind"], TODO>>; // TODO(koan) @koan-error

// Part 5: generic recursion retains its type argument through every layer.
type _Main17 = Expect<Equal<ReturnType<typeof listFromArray<number>>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof listToArray<string>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof mapList<number, string>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Parameters<typeof evaluateExpression>[0], TODO>>; // TODO(koan) @koan-error
