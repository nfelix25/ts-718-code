import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-069: contravariant inference candidates
 * =============================================================================
 *
 * Repeated `infer` variables in function parameter positions are
 * contravariant candidates. Instead of choosing a value that either position
 * may produce, TypeScript needs a value that every position can safely accept,
 * so it combines candidates as an intersection.
 *
 * I read
 *
 *   `T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never`
 *
 * aloud as:
 *
 *   "If T provides both consumers, infer one input U that is assignable to
 *    both accepted input types; intersect their candidates."
 *
 * `(1 | 2) & (2 | 3)` becomes `2`. `string & number` becomes `never` because
 * no ordinary value satisfies both. Object candidates form an intersection
 * requiring all members. `unknown` is the identity for intersections, `never`
 * annihilates them, and `any` can erase useful safety. This rule concerns
 * candidate collection within one structural match. A naked outer union still
 * distributes first, yielding a union of the per-member intersections.
 */

export type SharedInput<T> = T extends {
  left: (value: infer Input) => unknown;
  right: (value: infer Input) => unknown;
}
  ? Input
  : never;
export type TupleSharedInput<T> = T extends readonly [
  (value: infer Input) => unknown,
  (value: infer Input) => unknown,
]
  ? Input
  : never;
export type ThreeWayInput<T> = T extends {
  first: (value: infer Input) => unknown;
  second: (value: infer Input) => unknown;
  third: (value: infer Input) => unknown;
}
  ? Input
  : never;

export function callBoth<Handlers extends {
  left: (value: any) => unknown;
  right: (value: any) => unknown;
}>(handlers: Handlers, value: SharedInput<Handlers>): [unknown, unknown] {
  return [handlers.left(value), handlers.right(value)];
}

export function callTuple<Handlers extends readonly [
  (value: any) => unknown,
  (value: any) => unknown,
]>(handlers: Handlers, value: TupleSharedInput<Handlers>): [unknown, unknown] {
  return [handlers[0](value), handlers[1](value)];
}

export function callThree<Handlers extends {
  first: (value: any) => unknown;
  second: (value: any) => unknown;
  third: (value: any) => unknown;
}>(handlers: Handlers, value: ThreeWayInput<Handlers>): [unknown, unknown, unknown] {
  return [handlers.first(value), handlers.second(value), handlers.third(value)];
}

// Part 1: overlapping literal inputs intersect to their shared members.
type _Main01 = Expect<Equal<SharedInput<{ left: (x: 1 | 2) => void; right: (x: 2 | 3) => void }>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<SharedInput<{ left: (x: string) => void; right: (x: "ok") => void }>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<SharedInput<{ left: (x: boolean) => void; right: (x: true) => void }>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<SharedInput<{ left: (x: 1) => void; right: (x: 2) => void }>, TODO>>; // TODO(koan) @koan-error

// Part 2: unrelated primitive candidates collapse to never.
type _Main05 = Expect<Equal<SharedInput<{ left: (x: string) => void; right: (x: number) => void }>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<SharedInput<{ left: (x: null) => void; right: (x: undefined) => void }>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<SharedInput<{ left: (x: unknown) => void; right: (x: string) => void }>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<SharedInput<{ left: (x: never) => void; right: (x: string) => void }>, TODO>>; // TODO(koan) @koan-error

// Part 3: object intersections require the fields from every consumer candidate.
type _Main09 = Expect<Equal<SharedInput<{ // TODO(koan) @koan-error
  left: (x: { id: number }) => void;
  right: (x: { name: string }) => void;
}>, TODO>>;
type _Main10 = Expect<Equal<SharedInput<{ // TODO(koan) @koan-error
  left: (x: { kind: "user"; id: number }) => void;
  right: (x: { kind: "user"; name: string }) => void;
}>, TODO>>;
type _Main11 = Expect<Equal<SharedInput<{ // TODO(koan) @koan-error
  left: (x: { kind: "user" }) => void;
  right: (x: { kind: "admin" }) => void;
}>, TODO>>;
type _Main12 = Expect<Equal<SharedInput<{ left: (x: object) => void; right: (x: { id: 1 }) => void }>, TODO>>; // TODO(koan) @koan-error

// Part 4: tuple-held consumers obey the same contravariant rule.
type _Main13 = Expect<Equal<TupleSharedInput<[(x: 1 | 2) => void, (x: 2 | 3) => void]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<TupleSharedInput<readonly [(x: string) => void, (x: "x") => void]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<TupleSharedInput<[(x: string) => void]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<TupleSharedInput<[() => void, (x: string) => void]>, TODO>>; // TODO(koan) @koan-error

// Part 5: more consumers add more intersection operands.
type _Main17 = Expect<Equal<ThreeWayInput<{ // TODO(koan) @koan-error
  first: (x: 1 | 2 | 3) => void;
  second: (x: 2 | 3 | 4) => void;
  third: (x: 3 | 4 | 5) => void;
}>, TODO>>;
type _Main18 = Expect<Equal<ThreeWayInput<{ // TODO(koan) @koan-error
  first: (x: string) => void;
  second: (x: "a" | "b") => void;
  third: (x: "b" | "c") => void;
}>, TODO>>;
type _Main19 = Expect<Equal<ThreeWayInput<{ // TODO(koan) @koan-error
  first: (x: unknown) => void;
  second: (x: number) => void;
  third: (x: 1) => void;
}>, TODO>>;
type _Main20 = Expect<Equal<ThreeWayInput<{ first: (x: 1) => void; second: (x: 1) => void }>, TODO>>; // TODO(koan) @koan-error
