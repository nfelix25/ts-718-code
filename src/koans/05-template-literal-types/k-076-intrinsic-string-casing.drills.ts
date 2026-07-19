import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-076 guided drills: intrinsic string casing
 * =============================================================================
 * Decide whether the transform touches the whole string or only its first
 * segment, apply it to every union member, and preserve punctuation and digits.
 */

type DUpper<S extends string> = Uppercase<S>;
type DLower<S extends string> = Lowercase<S>;
type DCap<S extends string> = Capitalize<S>;
type DUncap<S extends string> = Uncapitalize<S>;
type DPascal<S extends string> = Capitalize<Lowercase<S>>;
type DGetter<S extends string> = `get${Capitalize<S>}`;

// Uppercase transforms the complete literal and each union member.
type _D01 = Expect<Equal<DUpper<"a">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DUpper<"abc">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DUpper<"AbC">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DUpper<"already UPPER">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DUpper<"kebab-case">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DUpper<"snake_case">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DUpper<"with space">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DUpper<"123abc!">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DUpper<"read" | "write">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DUpper<"a" | "A">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DUpper<"">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DUpper<string>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DUpper<never>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<`EVENT_${DUpper<"created" | "deleted">}`, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DUpper<Uppercase<"mixed">>, TODO>>; // TODO(koan) @koan-error

// Lowercase is the whole-string inverse operation for ordinary ASCII letters.
type _D16 = Expect<Equal<DLower<"A">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DLower<"ABC">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DLower<"AbC">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DLower<"already lower">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DLower<"KEBAB-CASE">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DLower<"SNAKE_CASE">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DLower<"WITH SPACE">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DLower<"123ABC!">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DLower<"GET" | "POST">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DLower<"a" | "A">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DLower<"">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DLower<string>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DLower<never>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<`method:${DLower<"GET" | "POST">}`, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DLower<Lowercase<"MIXED">>, TODO>>; // TODO(koan) @koan-error

// Capitalize and Uncapitalize touch only the first segment.
type _D31 = Expect<Equal<DCap<"hello">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DCap<"hELLO">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DCap<"Hello">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DCap<"1hello">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DCap<"-hello">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DCap<"">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DCap<"user" | "team">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DUncap<"Hello">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DUncap<"HELLO">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DUncap<"hello">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DUncap<"1HELLO">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DUncap<"-HELLO">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DUncap<"">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DUncap<"User" | "Team">, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DGetter<"name" | "age">, TODO>>; // TODO(koan) @koan-error

// Composition order creates naming conventions from messy source literals.
type _D46 = Expect<Equal<DPascal<"hELLO">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DPascal<"TYPEscript">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DPascal<"">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DPascal<"fOO" | "bAR">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<Uppercase<Capitalize<"hello">>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<Capitalize<Uppercase<"hello">>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<Lowercase<Capitalize<"hELLO">>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<Capitalize<Lowercase<"hELLO">>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<Uncapitalize<Uppercase<"hello">>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<Uppercase<Uncapitalize<"HELLO">>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DGetter<"firstName">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DGetter<"FirstName">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<`on${Capitalize<"click" | "focus">}`, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<`${Lowercase<"GET" | "POST">}:${Uppercase<"user" | "team">}`, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<Uncapitalize<Capitalize<"hello">>, TODO>>; // TODO(koan) @koan-error
