import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-076 edge cases: intrinsic string casing
 * =============================================================================
 * Intrinsics delegate to compiler-internal casing behavior aligned with
 * JavaScript's locale-insensitive operations. Unicode mappings may expand,
 * broad transformed strings retain intrinsic identity, and nonletters remain.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EAssignable<A, B> = A extends B ? true : false;

// First-segment transforms preserve the untouched tail exactly.
type _E01 = Expect<Equal<Capitalize<"hELLO">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<Uncapitalize<"HELLO">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<Capitalize<"1hello">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<Uncapitalize<"-HELLO">, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Capitalize<" hello">, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<Uncapitalize<" HELLO">, TODO>>; // TODO(koan) @koan-error

// Unicode mappings can differ from one-code-point-in, one-code-point-out intuition.
type _E07 = Expect<Equal<Uppercase<"straße">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<Uppercase<"ß">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<Capitalize<"ßeta">, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<Lowercase<"İ">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<Uppercase<"ı">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<Uppercase<"café">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Lowercase<"CAFÉ">, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<Uppercase<"🙂a">, TODO>>; // TODO(koan) @koan-error

// Broad transformed strings are assignable to string but retain directional information.
type _E15 = Expect<Equal<EAssignable<Uppercase<string>, string>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EAssignable<string, Uppercase<string>>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<Equal<Uppercase<string>, string>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EAssignable<Lowercase<string>, string>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EAssignable<string, Lowercase<string>>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<Equal<Capitalize<string>, string>, TODO>>; // TODO(koan) @koan-error

// Unions normalize when different inputs transform to the same output.
type _E21 = Expect<Equal<Uppercase<"a" | "A">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<Lowercase<"a" | "A">, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<Capitalize<"a" | "A">, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<Uncapitalize<"a" | "A">, TODO>>; // TODO(koan) @koan-error

// Never and any retain their special behavior through intrinsic transforms.
type _E25 = Expect<Equal<Uppercase<never>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<Lowercase<never>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsAny<Uppercase<any>>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EIsAny<Capitalize<any>>, TODO>>; // TODO(koan) @koan-error

// Intrinsics compose inside broader template patterns.
type _E29 = Expect<Equal<`GET_${Uppercase<"user" | "team">}`, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<`${Lowercase<"GET" | "POST">}:${Capitalize<"user" | "team">}`, TODO>>; // TODO(koan) @koan-error

// Pre-solved: Capitalize changes only the leading character and preserves the tail.
type _DemoFirstOnly = Expect<Equal<Capitalize<"hELLO">, "HELLO">>;

// Pre-solved: casing unions normalize duplicate outputs.
type _DemoNormalized = Expect<Equal<Uppercase<"a" | "A">, "A">>;

// Pre-solved: non-letter prefixes are stable.
type _DemoNonLetter = Expect<Equal<Capitalize<"1value">, "1value">>;

// Intrinsic string transforms reject non-string inputs.
// @ts-expect-error Number is outside Uppercase's string constraint.
type InvalidUppercase = Uppercase<42>;
// @ts-expect-error Unknown does not satisfy the string constraint.
type InvalidCapitalize = Capitalize<unknown>;
