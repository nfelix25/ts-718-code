import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-068 guided drills: covariant inference candidates
 * =============================================================================
 * Find every occurrence of the repeated inferred variable, collect candidates
 * from value-producing positions, then normalize the resulting union.
 */

type DPair<T> = T extends readonly [infer U, infer U] ? U : never;
type DProps<T> = T extends { a: infer U; b: infer U } ? U : never;
type DTriple<T> = T extends { a: infer U; b: infer U; c: infer U } ? U : never;
type DReturns<T> = T extends { a: () => infer U; b: () => infer U } ? U : never;
type DArrays<T> = T extends readonly [readonly (infer U)[], readonly (infer U)[]] ? U : never;
type DPromises<T> = T extends readonly [PromiseLike<infer U>, PromiseLike<infer U>] ? U : never;

// Tuple value positions collect candidates from literals and broad types.
type _D01 = Expect<Equal<DPair<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DPair<[1, 1]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DPair<["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DPair<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DPair<["a", string]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DPair<[1, number]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DPair<[true, boolean]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DPair<[null, undefined]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DPair<[never, "x"]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DPair<[unknown, "x"]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DPair<readonly [{ id: 1 }, { name: "Ada" }]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DPair<[[1], [2]]>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DPair<[1, 2] | [3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DPair<[1]>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DPair<number[]>, TODO>>; // TODO(koan) @koan-error

// Required properties collect two or three covariant candidates.
type _D16 = Expect<Equal<DProps<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DProps<{ readonly a: "x"; readonly b: true }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DProps<{ a: string; b: "x" }>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DProps<{ a: number; b: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DProps<{ a: object; b: { id: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DProps<{ a: { id: 1 }; b: { name: "x" } }>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DProps<{ a: never; b: never }>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DProps<{ a: never; b: false }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DProps<{ a: unknown; b: false }>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DProps<{ a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DTriple<{ a: 1; b: 2; c: 3 }>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DTriple<{ a: "x"; b: string; c: "y" }>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DTriple<{ a: true; b: false; c: boolean }>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DTriple<{ a: 1; b: never; c: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DTriple<{ a: 1; b: unknown; c: 2 }>, TODO>>; // TODO(koan) @koan-error

// Function return positions aggregate output candidates.
type _D31 = Expect<Equal<DReturns<{ a: () => 1; b: () => 2 }>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DReturns<{ a: () => string; b: () => number }>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DReturns<{ a: () => "x"; b: () => string }>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DReturns<{ a: () => never; b: () => 1 }>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DReturns<{ a: () => unknown; b: () => 1 }>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DReturns<{ a: () => void; b: () => undefined }>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DReturns<{ a: () => null; b: () => undefined }>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DReturns<{ a: () => { id: 1 }; b: () => object }>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DReturns<{ a: () => Promise<1>; b: () => Promise<2> }>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DReturns<{ a: () => 1; b: string }>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DReturns<{ a: () => 1; b: () => 2 } | { a: () => 3; b: () => 4 }>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DReturns<unknown>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DReturns<never>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DReturns<{ a: () => boolean; b: () => true }>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DReturns<{ a: () => bigint; b: () => 1n }>, TODO>>; // TODO(koan) @koan-error

// Nested arrays and promises contribute their element or fulfillment candidates.
type _D46 = Expect<Equal<DArrays<[string[], number[]]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DArrays<readonly [readonly [1, 2], readonly [3, 4]]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DArrays<[["x"], string[]]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DArrays<[never[], boolean[]]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DArrays<[unknown[], number[]]>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DArrays<[string[], number]>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DPromises<[Promise<1>, Promise<2>]>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DPromises<[Promise<string>, Promise<number>]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DPromises<[Promise<"x">, Promise<string>]>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DPromises<[Promise<never>, Promise<1>]>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DPromises<[Promise<unknown>, Promise<1>]>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DPromises<[Promise<1>, number]>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DPromises<[Promise<1>, Promise<2>] | [Promise<3>, Promise<4>]>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DPromises<unknown>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DPromises<never>, TODO>>; // TODO(koan) @koan-error
