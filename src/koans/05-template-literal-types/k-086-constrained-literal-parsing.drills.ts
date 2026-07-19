import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-086 guided drills: constrained literal parsing
 * =============================================================================
 * Apply parser precedence in order. For constrained captures, distinguish an
 * exact literal candidate, a widened primitive candidate, and a failed match.
 */

type DNumber<S extends string> = S extends `${infer N extends number}` ? N : never;
type DBigInt<S extends string> = S extends `${infer D}n` ? D extends `${infer B extends bigint}` ? B : never : never;
type DBoolean<S extends string> = S extends `${infer B extends boolean}` ? B : never;
type DScalar<S extends string> = S extends "true" ? true
  : S extends "false" ? false
  : S extends "null" ? null
  : S extends "undefined" ? undefined
  : DBigInt<S> extends never
    ? DNumber<S> extends never ? S : DNumber<S>
    : DBigInt<S>;
type DField<S extends string> = S extends `${infer K}=${infer V}` ? [K, DScalar<V>] : never;

// Numeric constrained captures cover canonical and noncanonical text.
type _D01 = Expect<Equal<DNumber<"0">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DNumber<"1">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DNumber<"-1">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DNumber<"3.14">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DNumber<"-0.5">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DNumber<"01">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DNumber<"1e3">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DNumber<"0x10">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DNumber<" 1">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DNumber<"1 ">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DNumber<"">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DNumber<"NaN">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DNumber<"Infinity">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DNumber<"number">, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DNumber<"1" | "2" | "x">, TODO>>; // TODO(koan) @koan-error

// Bigint and boolean parsers have explicit lexical markers.
type _D16 = Expect<Equal<DBigInt<"0n">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DBigInt<"42n">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DBigInt<"-42n">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DBigInt<"42">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DBigInt<"3.14n">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DBigInt<"01n">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DBigInt<"xn">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DBigInt<"1n" | "2n">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DBoolean<"true">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DBoolean<"false">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DBoolean<"TRUE">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DBoolean<"0">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DBoolean<"true" | "false">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DBoolean<"true" | "x">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DBoolean<string>, TODO>>; // TODO(koan) @koan-error

// Scalar precedence selects booleans/nullish/bigint/number before text fallback.
type _D31 = Expect<Equal<DScalar<"true">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DScalar<"false">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DScalar<"null">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DScalar<"undefined">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DScalar<"42n">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DScalar<"-42n">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DScalar<"42">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DScalar<"-3.5">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DScalar<"hello">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DScalar<"TRUE">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DScalar<"NaN">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DScalar<"">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DScalar<"true" | "42" | "x">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DScalar<string>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DScalar<never>, TODO>>; // TODO(koan) @koan-error

// Field parsing retains key/value relationships around the first equals sign.
type _D46 = Expect<Equal<DField<"count=42">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DField<"enabled=true">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DField<"limit=42n">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DField<"empty=null">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DField<"missing=undefined">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DField<"name=Ada">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DField<"=42">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DField<"name=">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DField<"a=b=c">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DField<"missing">, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DField<"a=1" | "b=2">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DField<"a=1" | "missing">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DField<`${string}=${string}`>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DField<string>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DField<never>, TODO>>; // TODO(koan) @koan-error
