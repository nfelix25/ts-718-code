import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-069 guided drills: contravariant inference candidates
 * =============================================================================
 * For every repeated parameter-position capture, intersect the accepted input
 * sets and simplify the result. The surviving type must satisfy every consumer.
 */

type DInputs<T> = T extends { a: (x: infer U) => unknown; b: (x: infer U) => unknown } ? U : never;
type DTupleInputs<T> = T extends readonly [(x: infer U) => unknown, (x: infer U) => unknown] ? U : never;
type DThree<T> = T extends {
  a: (x: infer U) => unknown;
  b: (x: infer U) => unknown;
  c: (x: infer U) => unknown;
} ? U : never;
type DSecond<T> = T extends {
  a: (head: unknown, x: infer U) => unknown;
  b: (head: unknown, x: infer U) => unknown;
} ? U : never;

// Literal and primitive input sets intersect.
type _D01 = Expect<Equal<DInputs<{ a: (x: 1 | 2) => void; b: (x: 2 | 3) => void }>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DInputs<{ a: (x: 1) => void; b: (x: 1) => void }>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DInputs<{ a: (x: 1) => void; b: (x: 2) => void }>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DInputs<{ a: (x: string) => void; b: (x: "a") => void }>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DInputs<{ a: (x: "a" | "b") => void; b: (x: "b" | "c") => void }>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DInputs<{ a: (x: number) => void; b: (x: 42) => void }>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DInputs<{ a: (x: boolean) => void; b: (x: true) => void }>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DInputs<{ a: (x: string) => void; b: (x: number) => void }>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DInputs<{ a: (x: null) => void; b: (x: undefined) => void }>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DInputs<{ a: (x: 1 | 2 | 3) => void; b: (x: 2 | 3) => void }>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DInputs<{ a: (x: unknown) => void; b: (x: string) => void }>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DInputs<{ a: (x: never) => void; b: (x: string) => void }>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DInputs<{ a: (x: void) => void; b: (x: undefined) => void }>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DInputs<{ a: (x: bigint) => void; b: (x: 1n) => void }>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DInputs<{ a: (x: symbol) => void; b: (x: symbol) => void }>, TODO>>; // TODO(koan) @koan-error

// Structural candidates accumulate required fields and compatible discriminants.
type _D16 = Expect<Equal<DInputs<{ a: (x: { id: number }) => void; b: (x: { name: string }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DInputs<{ a: (x: object) => void; b: (x: { id: 1 }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DInputs<{ a: (x: {}) => void; b: (x: { id: 1 }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DInputs<{ a: (x: { kind: "a" }) => void; b: (x: { value: 1 }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DInputs<{ a: (x: { kind: "a" }) => void; b: (x: { kind: "a"; value: 1 }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DInputs<{ a: (x: { kind: "a" }) => void; b: (x: { kind: "b" }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DInputs<{ a: (x: readonly [1, 2]) => void; b: (x: readonly number[]) => void }>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DInputs<{ a: (x: { readonly id: number }) => void; b: (x: { name: string }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DInputs<{ a: (x: { id?: number }) => void; b: (x: { id: number }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DInputs<{ a: (x: { id: number | string }) => void; b: (x: { id: number }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DInputs<{ a: (x: { a: 1 } | { b: 2 }) => void; b: (x: { b: 2 } | { c: 3 }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DInputs<{ a: (x: Function) => void; b: (x: () => void) => void }>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DInputs<{ a: (x: Date) => void; b: (x: { getTime(): number }) => void }>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DInputs<{ a: (x: Promise<unknown>) => void; b: (x: Promise<string>) => void }>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DInputs<{ a: (x: readonly unknown[]) => void; b: (x: readonly string[]) => void }>, TODO>>; // TODO(koan) @koan-error

// Tuple-held and three-way consumers repeat the same rule.
type _D31 = Expect<Equal<DTupleInputs<[(x: 1 | 2) => void, (x: 2 | 3) => void]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DTupleInputs<readonly [(x: string) => void, (x: "x") => void]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DTupleInputs<[() => void, (x: string) => void]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DTupleInputs<[(x?: string) => void, (x: string) => void]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DTupleInputs<[(...x: string[]) => void, (x: string) => void]>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DTupleInputs<[(x: unknown) => void, (x: 1) => void]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DTupleInputs<[(x: never) => void, (x: 1) => void]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DTupleInputs<[(x: { a: 1 }) => void, (x: { b: 2 }) => void]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DTupleInputs<[(x: 1) => void]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DTupleInputs<unknown>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DThree<{ a: (x: 1 | 2 | 3) => void; b: (x: 2 | 3 | 4) => void; c: (x: 3 | 4) => void }>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DThree<{ a: (x: string) => void; b: (x: "a" | "b") => void; c: (x: "b") => void }>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DThree<{ a: (x: unknown) => void; b: (x: number) => void; c: (x: 1) => void }>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DThree<{ a: (x: 1) => void; b: (x: 1) => void; c: (x: 2) => void }>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DThree<{ a: (x: { a: 1 }) => void; b: (x: { b: 2 }) => void; c: (x: { c: 3 }) => void }>, TODO>>; // TODO(koan) @koan-error

// Candidate position, outer distribution, and failed shapes round out the reps.
type _D46 = Expect<Equal<DSecond<{ a: (h: 1, x: string) => void; b: (h: 2, x: "ok") => void }>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DSecond<{ a: (h: 1, x: 1 | 2) => void; b: (h: 2, x: 2 | 3) => void }>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DSecond<{ a: (h: 1, x: string) => void; b: (x: string) => void }>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DInputs<{ a: (x: 1 | 2) => void; b: (x: 2) => void } | { a: (x: 3 | 4) => void; b: (x: 4) => void }>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DInputs<{ a: (x: 1) => void; b: (x: 1) => void } | { a: (x: 2) => void }>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DInputs<{ a: (x: string | number) => void; b: (x: number | boolean) => void }>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DInputs<{ a: (x: 1 | 2) => void; b: (x: 2 | 3) => void; extra: true }>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DInputs<{ a: (x: 1) => void; b?: (x: 1) => void }>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DInputs<{ readonly a: (x: 1 | 2) => void; readonly b: (x: 2) => void }>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DInputs<{ a(x: 1 | 2): void; b(x: 2 | 3): void }>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DInputs<unknown>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DInputs<never>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DThree<unknown>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DThree<never>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DInputs<{ a: (x: unknown) => 1; b: (x: "x") => 2 }>, TODO>>; // TODO(koan) @koan-error
