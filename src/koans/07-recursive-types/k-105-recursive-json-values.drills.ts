import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-105 guided drills: recursive JSON values
 * =============================================================================
 * Classify the base primitive first, then verify every array element or object
 * property recursively. Do not substitute JavaScript serializability heuristics.
 */

type DP = string | number | boolean | null;
type DV = DP | DO | DA;
interface DO { readonly [key: string]: DV }
interface DA extends ReadonlyArray<DV> {}

// Primitive leaves define the nonrecursive base domain.
type _D01 = Expect<Equal<string extends DP ? true : false, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<number extends DP ? true : false, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<boolean extends DP ? true : false, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<null extends DP ? true : false, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<undefined extends DP ? true : false, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<bigint extends DP ? true : false, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<symbol extends DP ? true : false, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<object extends DP ? true : false, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<"x" extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<42 extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<false extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<null extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<undefined extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<1n extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<(() => 1) extends DV ? true : false, TODO>>; // TODO(koan) @koan-error

// Arrays accept every finite or broad sequence whose elements are JSON values.
type _D16 = Expect<Equal<readonly [] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<readonly [1] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<readonly [1, "x", true, null] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<readonly [readonly [1]] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<readonly [1, readonly [2, readonly [3]]] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<readonly [undefined] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<readonly [1n] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<readonly [() => void] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<string[] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<(string | number)[] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<unknown[] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DA[number], TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DA["length"], TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<readonly DA[] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<readonly never[] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error

// Objects recurse through every declared string-keyed property value.
type _D31 = Expect<Equal<{} extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<{ x: 1 } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<{ x: 1; y: "a" } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<{ nested: { value: true } } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<{ values: readonly [1, 2] } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<{ x: undefined } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<{ x: bigint } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<{ x: () => void } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<{ x: { y: undefined } } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<Record<string, string> extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<Record<string, unknown> extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DO[string], TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<keyof DO, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<Pick<DO, "x">["x"], TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<Readonly<{ x: 1 }> extends DV ? true : false, TODO>>; // TODO(koan) @koan-error

// Deep combinations retain the same value grammar at every level.
type _D46 = Expect<Equal<{ users: readonly [{ id: 1; tags: readonly ["ts"] }] } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<{ a: { b: { c: null } } } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<readonly [{ a: readonly [{ b: 2 }] }] extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<{ a: readonly [1, { b: undefined }] } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<{ a: readonly [1, { b: 2n }] } extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<Extract<DV, string>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<Extract<DV, null>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<Extract<DV, readonly unknown[]> extends DA ? true : false, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DO extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DA extends DV ? true : false, TODO>>; // TODO(koan) @koan-error

// Structural assignability distinguishes narrow JSON values from broad unknown.
type _D56 = Expect<Equal<DV extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<unknown extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<never extends DV ? true : false, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DV extends object ? true : false, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DV extends string | number | boolean | null | object ? true : false, TODO>>; // TODO(koan) @koan-error
