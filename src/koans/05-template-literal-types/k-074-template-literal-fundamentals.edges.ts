import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-074 edge cases: template literal fundamentals
 * =============================================================================
 * Template patterns describe accepted text, not a runtime parser algorithm.
 * These cases probe broad primitive families, lexical numeric surprises,
 * normalization, never/any, and the interpolation domain's hard exclusions.
 */

type EText<T extends string | number | bigint | boolean | null | undefined> = `${T}`;
type EMatch<S extends string, P extends string> = S extends P ? true : false;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Broad primitive substitutions are patterns with distinct accepted languages.
type _E01 = Expect<Equal<EText<string>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EText<number>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EText<bigint>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EText<boolean>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EText<null | undefined>, TODO>>; // TODO(koan) @koan-error

// Numeric pattern assignability includes more spellings than canonical literals emit.
type _E06 = Expect<Equal<EMatch<"42", `${number}`>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EMatch<"-3.5", `${number}`>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EMatch<"1e3", `${number}`>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EMatch<"0x10", `${number}`>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EMatch<"01", `${number}`>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EMatch<"NaN", `${number}`>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EMatch<"Infinity", `${number}`>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EMatch<"", `${number}`>, TODO>>; // TODO(koan) @koan-error

// Bigint and boolean families have narrower lexical contracts.
type _E14 = Expect<Equal<EMatch<"42", `${bigint}`>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EMatch<"-42", `${bigint}`>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EMatch<"42n", `${bigint}`>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EMatch<"3.14", `${bigint}`>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EMatch<"true", `${boolean}`>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EMatch<"false", `${boolean}`>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EMatch<"True", `${boolean}`>, TODO>>; // TODO(koan) @koan-error

// Literal emission normalizes through the primitive literal type itself.
type _E21 = Expect<Equal<EText<-0>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EText<1.0>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EText<1000>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EText<never>, TODO>>; // TODO(koan) @koan-error

// Any remains a template pattern rather than literal any; classify before assuming poison.
type EAnyText = EText<any>;
type _E25 = Expect<Equal<EIsAny<EAnyText>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EMatch<"anything", EAnyText>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EMatch<"true", EAnyText>, TODO>>; // TODO(koan) @koan-error

// Fixed framing remains visible even around broad substitution segments.
type _E28 = Expect<Equal<EMatch<"id:42", `id:${number}`>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EMatch<"other:42", `id:${number}`>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EMatch<"id:x", `id:${string}`>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: an unframed broad string segment simplifies to string.
type _DemoBroadString = Expect<Equal<`${string}`, string>>;

// Pre-solved: never contributes no possible interpolation result.
type _DemoNever = Expect<Equal<`prefix:${never}`, never>>;

// Pre-solved: broad boolean is exactly its two runtime spellings.
type _DemoBoolean = Expect<Equal<`${boolean}`, "true" | "false">>;

// Symbols and arbitrary objects are outside the type-level interpolation domain.
// @ts-expect-error Symbol cannot be interpolated in a template literal type.
type InvalidSymbol = `${symbol}`;
// @ts-expect-error Object does not have a permitted primitive interpolation type.
type InvalidObject = `${{ id: 1 }}`;
