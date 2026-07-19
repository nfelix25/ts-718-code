import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-069 edge cases: contravariant inference candidates
 * =============================================================================
 * Parameter candidates intersect, then ordinary intersection simplification
 * applies. These cases stress special types, optional/rest inputs, methods,
 * outer unions, discriminants, and patterns that use one infer variable in both
 * input and output positions.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EInput<T> = T extends { a: (x: infer U) => unknown; b: (x: infer U) => unknown } ? U : never;
type EMethodInput<T> = T extends { a(x: infer U): unknown; b(x: infer U): unknown } ? U : never;
type EMixed<T> = T extends {
  a: (x: infer U) => infer U;
  b: (x: infer U) => infer U;
} ? U : never;

// Intersection algebra determines the surviving accepted values.
type _E01 = Expect<Equal<EInput<{ a: (x: 1 | 2) => void; b: (x: 2 | 3) => void }>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EInput<{ a: (x: string) => void; b: (x: "x") => void }>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EInput<{ a: (x: string) => void; b: (x: number) => void }>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EInput<{ a: (x: unknown) => void; b: (x: string) => void }>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EInput<{ a: (x: never) => void; b: (x: string) => void }>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EIsAny<EInput<{ a: (x: any) => void; b: (x: string) => void }>>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EIsAny<EInput<any>>, TODO>>; // TODO(koan) @koan-error

// Object intersections accumulate fields; conflicting discriminants become impossible.
type _E08 = Expect<Equal<EInput<{ a: (x: { id: 1 }) => void; b: (x: { name: "x" }) => void }>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EInput<{ a: (x: { kind: "a" }) => void; b: (x: { kind: "a"; id: 1 }) => void }>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EInput<{ a: (x: { kind: "a" }) => void; b: (x: { kind: "b" }) => void }>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EInput<{ a: (x: { id?: number }) => void; b: (x: { id: number }) => void }>, TODO>>; // TODO(koan) @koan-error

// Optional and rest parameter syntax changes the candidate type itself.
type _E12 = Expect<Equal<EInput<{ a: (x?: string) => void; b: (x: string) => void }>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EInput<{ a: (x?: string) => void; b: (x?: "ok") => void }>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EInput<{ a: (...x: string[]) => void; b: (x: "ok") => void }>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EInput<{ a: () => void; b: (x: string) => void }>, TODO>>; // TODO(koan) @koan-error

// Method syntax is bivariant for assignability, but infer still sees parameter candidates.
type _E16 = Expect<Equal<EMethodInput<{ a(x: 1 | 2): void; b(x: 2 | 3): void }>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EMethodInput<{ a(x: string): void; b(x: number): void }>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EMethodInput<{ a(x?: string): void; b(x: "ok"): void }>, TODO>>; // TODO(koan) @koan-error

// A naked outer union distributes, producing a union of per-member intersections.
type _E19 = Expect<Equal<EInput< // TODO(koan) @koan-error
  { a: (x: 1 | 2) => void; b: (x: 2) => void }
  | { a: (x: 3 | 4) => void; b: (x: 4) => void }
>, TODO>>;
type _E20 = Expect<Equal<EInput< // TODO(koan) @koan-error
  { a: (x: string) => void; b: (x: "x") => void }
  | { a: (x: number) => void; b: (x: 1) => void }
>, TODO>>;
type _E21 = Expect<Equal<EInput<{ a: (x: 1) => void; b: (x: 1) => void } | { a: (x: 2) => void }>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EInput<unknown>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EInput<never>, TODO>>; // TODO(koan) @koan-error

// Mixed input/output occurrences combine candidates under more complex priority rules.
type _E24 = Expect<Equal<EMixed<{ // TODO(koan) @koan-error
  a: (x: 1 | 2) => 1;
  b: (x: 2 | 3) => 2;
}>, TODO>>;
type _E25 = Expect<Equal<EMixed<{ // TODO(koan) @koan-error
  a: (x: string) => "a";
  b: (x: "a") => string;
}>, TODO>>;
type _E26 = Expect<Equal<EMixed<{ // TODO(koan) @koan-error
  a: (x: unknown) => 1;
  b: (x: number) => 2;
}>, TODO>>;

// Intersections with functions and arrays remain structural types.
type _E27 = Expect<Equal<EInput<{ a: (x: (() => 1)) => void; b: (x: { (): 1; tag: "x" }) => void }>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EInput<{ a: (x: readonly number[]) => void; b: (x: readonly [1, 2]) => void }>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EInput<{ a: (x: Promise<unknown>) => void; b: (x: Promise<string>) => void }>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EInput<{ a: (x: Map<string, unknown>) => void; b: (x: Map<string, number>) => void }>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: the only literal accepted by both sets survives.
type _DemoOverlap = Expect<Equal<
  EInput<{ a: (x: 1 | 2) => void; b: (x: 2 | 3) => void }>,
  2
>>;

// Pre-solved: unrelated primitive input candidates have no inhabitant.
type _DemoImpossible = Expect<Equal<
  EInput<{ a: (x: string) => void; b: (x: number) => void }>,
  never
>>;

// Pre-solved: an object satisfying both field contracts is accepted.
type _DemoObject = Expect<Equal<
  EInput<{ a: (x: { id: 1 }) => void; b: (x: { name: "x" }) => void }> extends { id: 1; name: "x" }
    ? true
    : false,
  true
>>;

// The shared input really rejects values outside the intersection.
declare function acceptOverlap(value: EInput<{
  a: (x: 1 | 2) => void;
  b: (x: 2 | 3) => void;
}>): void;
// @ts-expect-error Only 2 is accepted by both consumers.
acceptOverlap(1);
