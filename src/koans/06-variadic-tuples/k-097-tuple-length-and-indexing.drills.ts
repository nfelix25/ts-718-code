import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-097 guided drills: tuple length and indexing
 * =============================================================================
 * Compute cardinality, stable key strings, parsed numeric indices, and arbitrary
 * element values separately. Recombine them only after each fact is clear.
 */

type DK<T extends readonly unknown[]> = Exclude<keyof T, keyof readonly unknown[]>;
type DN<T> = T extends `${infer N extends number}` ? N : never;
type DI<T extends readonly unknown[]> = DN<DK<T>>;
type DDI<T extends readonly unknown[]> = T extends unknown ? DI<T> : never;
type DFinite<T extends readonly unknown[]> = number extends T["length"] ? never : T["length"];

// Length describes exact, optional, or unbounded cardinality.
type _D01 = Expect<Equal<[]["length"], TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<[1]["length"], TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<[1, 2]["length"], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<[1, 2, 3]["length"], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<[a?: 1]["length"], TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<[a: 1, b?: 2]["length"], TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<[a: 1, b?: 2, c?: 3]["length"], TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<[...values: 1[]]["length"], TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<[head: 0, ...values: 1[]]["length"], TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<[...values: 1[], tail: 2]["length"], TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<string[]["length"], TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<(readonly string[])["length"], TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<([1] | [1, 2])["length"], TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<([1] | string[])["length"], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<[never]["length"], TODO>>; // TODO(koan) @koan-error

// FiniteLength keeps literal length domains and filters number.
type _D16 = Expect<Equal<DFinite<[]>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DFinite<[1]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DFinite<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DFinite<[a?: 1]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DFinite<[a: 1, b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DFinite<string[]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DFinite<[1, ...2[]]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DFinite<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DFinite<[1] | [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DFinite<never>, TODO>>; // TODO(koan) @koan-error

// Removing array keys leaves the tuple's stable string-position keys.
type _D26 = Expect<Equal<DK<[]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DK<[1]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DK<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DK<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DK<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DK<[a?: 1, b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DK<[head: 0, ...tail: 1[]]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DK<[...head: 0[], tail: 1]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DK<string[]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DK<[1] | [1, 2]>, TODO>>; // TODO(koan) @koan-error

// Parsing key strings produces numeric literal position unions.
type _D36 = Expect<Equal<DI<[]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DI<[1]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DI<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DI<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DI<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DI<[a?: 1, b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DI<[head: 0, ...tail: 1[]]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DI<[...head: 0[], tail: 1]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DI<string[]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DN<"0" | "2" | "x">, TODO>>; // TODO(koan) @koan-error

// Tuple unions have common keys unless indices are gathered distributively.
type _D46 = Expect<Equal<DI<[1] | [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DDI<[1] | [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DI<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DDI<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DI<[1, 2] | [3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DDI<[1, 2] | [3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DI<[1] | string[]>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DDI<[1] | string[]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<number extends keyof [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<"3" extends keyof [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error

// Stable indices and arbitrary element domains answer different questions.
type _D56 = Expect<Equal<DI<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<[head: string, ...tail: number[]][number], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DI<[...head: string[], tail: number]>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<[...head: string[], tail: number][number], TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DI<[first: string, ...middle: boolean[], last: number]>, TODO>>; // TODO(koan) @koan-error
