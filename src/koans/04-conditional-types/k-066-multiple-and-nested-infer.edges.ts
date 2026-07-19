import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-066 edge cases: multiple and nested infer
 * =============================================================================
 * Multi-position inference is an all-or-nothing structural match. These cases
 * make tuple cardinality, readonly compatibility, repeated capture names,
 * nested distribution, overload selection, and special-type behavior visible.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EPair<T> = T extends readonly [infer A, infer B] ? [A, B] : never;
type EMutablePair<T> = T extends [infer A, infer B] ? [A, B] : never;
type ESameCapture<T> = T extends readonly [infer X, infer X] ? X : never;
type ENested<T> = T extends PromiseLike<readonly (infer E)[]> ? E : never;
type EFn<T> = T extends (...args: infer P) => infer R ? [P, R] : never;

// Fixed cardinality and readonly compatibility govern the whole match.
type _E01 = Expect<Equal<EPair<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EPair<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EMutablePair<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EPair<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EPair<[1, 2?]>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EPair<[1, ...2[]]>, TODO>>; // TODO(koan) @koan-error

// Reusing one infer name combines candidates; it does not enforce equality.
type _E07 = Expect<Equal<ESameCapture<[1, 1]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ESameCapture<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ESameCapture<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ESameCapture<readonly [true, false]>, TODO>>; // TODO(koan) @koan-error

// Distribution happens at the naked outer input, then each nested shape matches.
type _E11 = Expect<Equal<ENested<Promise<string[]> | Promise<number[]>>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ENested<Promise<string[]> | string[]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ENested<Promise<[]> | Promise<[1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ENested<Promise<string | number>>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ENested<Promise<Array<string | number>>>, TODO>>; // TODO(koan) @koan-error

// Union signatures retain pairs; overload intersections expose only the last one.
interface EOverload {
  (x: string): number;
  (x: number): string;
}
type _E16 = Expect<Equal<EFn<((x: 1) => "a") | ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EFn<EOverload>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EFn<((x: 1) => "a") & ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EFn<(x?: string) => void>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EFn<(...x: number[]) => number>, TODO>>; // TODO(koan) @koan-error

// Any can poison captures, while never distributes over zero members and unknown fails.
type _E21 = Expect<Equal<EIsAny<ESameCapture<any>>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EIsAny<ENested<any>>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EIsAny<EFn<any>[1]>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EPair<never>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<ENested<never>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EFn<never>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EPair<unknown>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ENested<unknown>, TODO>>; // TODO(koan) @koan-error

// Inner unions are one captured value; outer unions are independently matched members.
type _E29 = Expect<Equal<EPair<[1 | 2, "a" | "b"]>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EPair<[1, "a"] | [2, "b"]>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: all enclosing structures must match before E is available.
type _DemoAllLayers = Expect<Equal<ENested<Promise<readonly [1, 2]>>, 1 | 2>>;

// Pre-solved: reusing an infer name collects covariant candidates as a union.
type _DemoRepeatedName = Expect<Equal<ESameCapture<[1, 2]>, 1 | 2>>;

// Pre-solved: a union of signatures preserves each input-output relationship.
type _DemoSignatureCorrelation = Expect<Equal<
  EFn<((x: 1) => "a") | ((x: 2) => "b")>,
  [[x: 1], "a"] | [[x: 2], "b"]
>>;

// A captured variable is unavailable in the false branch.
// @ts-expect-error `Missing` was never introduced in this scope.
type InvalidNestedScope<T> = T extends PromiseLike<infer Value> ? Value : Missing;
