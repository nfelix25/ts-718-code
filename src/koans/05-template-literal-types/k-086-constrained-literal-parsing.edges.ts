import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-086 edge cases: constrained literal parsing
 * =============================================================================
 * Recognition is not identical to literal preservation. These cases stress
 * canonical versus widened number candidates, parser order, bigint suffixes,
 * fallback text, delimiter ambiguity, unions, broad strings, and special types.
 */

type ENumber<S extends string> = S extends `${infer N extends number}` ? N : never;
type EBigInt<S extends string> = S extends `${infer D}n` ? D extends `${infer B extends bigint}` ? B : never : never;
type EScalar<S extends string> = S extends "true" ? true
  : S extends "false" ? false
  : S extends "null" ? null
  : S extends "undefined" ? undefined
  : EBigInt<S> extends never
    ? ENumber<S> extends never ? S : ENumber<S>
    : EBigInt<S>;
type EField<S extends string> = S extends `${infer K}=${infer V}` ? { key: K; value: EScalar<V> } : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Canonical numeric spellings preserve literals; accepted noncanonical forms may widen.
type _E01 = Expect<Equal<ENumber<"42">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ENumber<"-3.5">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ENumber<"01">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ENumber<"1e3">, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<ENumber<"0x10">, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ENumber<" 1">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ENumber<"1 ">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ENumber<"-0">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ENumber<"NaN">, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ENumber<"Infinity">, TODO>>; // TODO(koan) @koan-error

// Bigint marker disambiguates integer text from the earlier number grammar.
type _E11 = Expect<Equal<EBigInt<"42n">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EBigInt<"42">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EBigInt<"3.14n">, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EBigInt<"01n">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EBigInt<"n">, TODO>>; // TODO(koan) @koan-error

// Parser precedence protects reserved words from text fallback and numeric parsing.
type _E16 = Expect<Equal<EScalar<"true">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EScalar<"null">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EScalar<"42n">, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EScalar<"42">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EScalar<"NaN">, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EScalar<"TRUE">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EScalar<"">, TODO>>; // TODO(koan) @koan-error

// Field matching uses the first usable equals delimiter and preserves the rest as value text.
type _E23 = Expect<Equal<EField<"a=b=c">, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EField<"=42">, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EField<"name=">, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EField<"missing">, TODO>>; // TODO(koan) @koan-error

// Union, broad, never, and any inputs keep ordinary conditional behavior.
type _E27 = Expect<Equal<EScalar<"true" | "42" | "x">, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EScalar<string>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EScalar<never>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EIsAny<EScalar<any>>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: canonical numeric text yields an exact literal.
type _DemoCanonical = Expect<Equal<ENumber<"42">, 42>>;

// Pre-solved: invalid numeric text survives through the scalar string fallback.
type _DemoFallback = Expect<Equal<EScalar<"NaN">, "NaN">>;

// Pre-solved: the explicit bigint suffix selects bigint before numeric fallback.
type _DemoBigInt = Expect<Equal<EScalar<"42n">, 42n>>;

// Constrained literal parsers require string input at the boundary.
// @ts-expect-error A numeric type is not source text.
type InvalidParserInput = EScalar<42>;
