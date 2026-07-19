import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-067 edge cases: constrained infer
 * =============================================================================
 * Inline constraints filter candidates; they do not coerce them. Template
 * parsing is also stricter than a runtime conversion, and some accepted but
 * noncanonical spellings widen instead of yielding one literal.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EInline<T> = T extends readonly [infer H extends string, ...unknown[]] ? H : never;
type ETwoStage<T> = T extends readonly [infer H, ...unknown[]]
  ? H extends string
    ? H
    : never
  : never;
type ENumber<S> = S extends `${infer N extends number}` ? N : never;
type EBigInt<S> = S extends `${infer N extends bigint}` ? N : never;
type EBoolean<S> = S extends `${infer B extends boolean}` ? B : never;
type ELiteralKey<T> = T extends Record<infer K extends string, unknown> ? K : never;

// Inline and explicit two-stage filtering agree for ordinary distributed inputs.
type _E01 = Expect<Equal<EInline<["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ETwoStage<["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EInline<[1, "a"]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ETwoStage<[1, "a"]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EInline<["a"] | [1]>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ETwoStage<["a"] | [1]>, TODO>>; // TODO(koan) @koan-error

// Canonical numeric spellings retain literals; other accepted forms may widen.
type _E07 = Expect<Equal<ENumber<"42">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ENumber<"-3.5">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ENumber<"01">, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ENumber<"1e3">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<ENumber<"0x10">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ENumber<" 1">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ENumber<"">, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ENumber<"NaN">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ENumber<"Infinity">, TODO>>; // TODO(koan) @koan-error

// Bigint and boolean recognition deliberately differ from JavaScript syntax.
type _E16 = Expect<Equal<EBigInt<"42">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EBigInt<"42n">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EBigInt<"01">, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EBoolean<"true">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EBoolean<"false">, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EBoolean<"True">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EBoolean<"0">, TODO>>; // TODO(koan) @koan-error

// Distribution, broad strings, and special types affect the outer match first.
type _E23 = Expect<Equal<ENumber<"1" | "x" | "2">, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<ENumber<string>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<ENumber<unknown>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<ENumber<never>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsAny<ENumber<any>>, TODO>>; // TODO(koan) @koan-error

// Constraints can retain only the desired key domain from structural matches.
type _E28 = Expect<Equal<ELiteralKey<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ELiteralKey<{ 0: string }>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ELiteralKey<Record<string, boolean>>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: inline constrained capture is the compact two-stage form here.
type _DemoEquivalent = Expect<Equal<EInline<["ok", 1]>, ETwoStage<["ok", 1]>>>;

// Pre-solved: canonical decimal text produces a numeric literal type.
type _DemoNumberLiteral = Expect<Equal<ENumber<"42">, 42>>;

// Pre-solved: a failed constraint rejects the whole matching branch.
type _DemoRejectedHead = Expect<Equal<EInline<[42, "later"]>, never>>;

// Infer constraints must themselves be valid type constraints.
// @ts-expect-error A runtime value cannot be used as an infer type constraint.
type InvalidInferConstraint<T> = T extends [infer H extends Math.random] ? H : never;
