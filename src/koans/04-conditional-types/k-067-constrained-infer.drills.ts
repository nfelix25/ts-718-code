import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-067 guided drills: constrained infer
 * =============================================================================
 * At each capture, ask two questions: what candidate is found, and does that
 * candidate satisfy the inline constraint without a second conditional?
 */

type DStringHead<T> = T extends readonly [infer H extends string, ...unknown[]] ? H : never;
type DNumberTail<T> = T extends readonly [...unknown[], infer L extends number] ? L : never;
type DStringValue<T> = T extends { value: infer V extends string } ? V : never;
type DNumberReturn<T> = T extends (...args: any[]) => (infer R extends number) ? R : never;
type DNumber<S> = S extends `${infer N extends number}` ? N : never;
type DBigInt<S> = S extends `${infer N extends bigint}` ? N : never;
type DBoolean<S> = S extends `${infer B extends boolean}` ? B : never;

// Constrained tuple positions preserve valid literals and filter invalid members.
type _D01 = Expect<Equal<DStringHead<["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DStringHead<[string, 1]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DStringHead<readonly ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DStringHead<[1, "a"]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DStringHead<[]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DStringHead<["a", 1] | [2, "b"]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DStringHead<["a"] | ["b"]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DStringHead<string[]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DNumberTail<["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DNumberTail<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DNumberTail<[1, "x"]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DNumberTail<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DNumberTail<[]>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DNumberTail<number[]>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DNumberTail<[1, 2] | ["x", "y"]>, TODO>>; // TODO(koan) @koan-error

// Object and function capture combines extraction with filtering.
type _D16 = Expect<Equal<DStringValue<{ value: "ok" }>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DStringValue<{ readonly value: string }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DStringValue<{ value: number }>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DStringValue<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DStringValue<{ value: "a" } | { value: "b" }>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DStringValue<{ value: "a" } | { value: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DStringValue<unknown>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DNumberReturn<() => 1>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DNumberReturn<(x: string) => number>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DNumberReturn<() => string>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DNumberReturn<(() => 1) | (() => 2)>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DNumberReturn<(() => 1) | (() => "x")>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DNumberReturn<unknown>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DNumberReturn<never>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DStringValue<never>, TODO>>; // TODO(koan) @koan-error

// Numeric text captures literal types for canonical spellings.
type _D31 = Expect<Equal<DNumber<"0">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DNumber<"42">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DNumber<"-42">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DNumber<"3.14">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DNumber<"-0.5">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DNumber<"01">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DNumber<"1e3">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DNumber<" 1">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DNumber<"1 ">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DNumber<"NaN">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DNumber<"Infinity">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DNumber<"">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DNumber<"x">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DNumber<"1" | "2">, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DNumber<"1" | "x">, TODO>>; // TODO(koan) @koan-error

// Bigint and boolean constraints use their own accepted spellings.
type _D46 = Expect<Equal<DBigInt<"0">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DBigInt<"42">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DBigInt<"-42">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DBigInt<"3.14">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DBigInt<"42n">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DBigInt<"x">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DBigInt<"1" | "2">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DBoolean<"true">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DBoolean<"false">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DBoolean<"TRUE">, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DBoolean<"0">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DBoolean<"true" | "false">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DBoolean<"true" | "x">, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DNumber<string>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DBoolean<string>, TODO>>; // TODO(koan) @koan-error
