import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-047 guided drills: template literal keys
 * =============================================================================
 * Compute each destination name one fragment at a time. Track distribution in
 * every interpolated union, and decide explicitly whether non-string source
 * keys are filtered, stringified, or preserved by another branch.
 */

type DPrefix<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${Capitalize<K>}` : never]: T[K]
};
type DSuffix<T, S extends string> = {
  [K in keyof T as K extends string ? `${K}${S}` : never]: T[K]
};
type DWrapped<T, P extends string, S extends string> = {
  [K in keyof T as K extends string ? `${P}${K}${S}` : never]: T[K]
};
type DStringify<T> = {
  [K in keyof T as K extends string | number ? `${K}` : never]: T[K]
};

interface DFields { name: string; active: boolean; count: number }

// Prefix construction and capitalization over varied literal spelling.
type _D01 = Expect<Equal<DPrefix<DFields, "get">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<keyof DPrefix<DFields, "set">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DPrefix<{ value: 1 }, "">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DPrefix<{ "": 1 }, "pre">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DPrefix<{ URL: string }, "get">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DPrefix<{ user_id: string }, "api">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DPrefix<{ "first-name": string }, "read">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DPrefix<{ 2: string; two: number }, "v">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DPrefix<{ x: 1 }, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<keyof DPrefix<{ x: 1; y: 2 }, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DPrefix<{}, "get">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DPrefix<{ already: true }, "is-">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DPrefix<{ "1name": string }, "field">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DPrefix<{ readonly: boolean }, "is">["isReadonly"], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<keyof DPrefix<{ a: 1; B: 2 }, "">, TODO>>; // TODO(koan) @koan-error

// Suffixes and intrinsic casing transform only the textual destination.
type _D16 = Expect<Equal<DSuffix<DFields, "Changed">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<keyof DSuffix<DFields, "Error">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DSuffix<{ x: 1 }, "A" | "B">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DWrapped<{ id: number }, "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DWrapped<{ id: number }, "", "">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<{ [K in "first" | "last" as Uppercase<K>]: K }, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<{ [K in "UP" | "Down" as Lowercase<K>]: K }, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<{ [K in "name" | "Active" as Capitalize<K>]: K }, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<{ [K in "Name" | "URL" as Uncapitalize<K>]: K }, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DSuffix<{ "": 1 }, "end">, TODO>>; // TODO(koan) @koan-error

// Every union in an interpolated position contributes to the cross-product.
type _D26 = Expect<Equal<{ [K in "user" | "file" as `${"read" | "write"}${Capitalize<K>}`]: true }, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<keyof { [K in "x" | "y" as `${K}${1 | 2}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<{ [K in "a" as `${"pre" | "post"}-${K}-${"one" | "two"}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<{ [K in "a" | "b" as `${K | "shared"}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<{ [K in "red" | "blue" as `${K}-${"light" | "dark"}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<keyof DWrapped<{ x: 1; y: 2 }, "(" | "[", ")" | "]">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DPrefix<{ x: 1 }, never>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DSuffix<{ x: 1 }, never>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<{ [K in never as `x-${K}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<{ [K in "x" as `${K | never}`]: K }, TODO>>; // TODO(koan) @koan-error

declare const dSymbol: unique symbol;
interface DMixed { text: string; 0: number; 7: boolean; [dSymbol]: Date }

// Key-domain constraints decide whether numbers and symbols survive.
type _D36 = Expect<Equal<DPrefix<DMixed, "get">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DStringify<DMixed>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<keyof DStringify<DMixed>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DStringify<DMixed>["0"], TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<{ [K in keyof DMixed as K extends number ? `slot-${K}` : never]: DMixed[K] }, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<{ [K in keyof DMixed as K extends symbol ? K : never]: DMixed[K] }, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<{ [K in keyof DMixed as K extends string ? `s:${K}` : K]: DMixed[K] }, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<{ [K in keyof DMixed as K extends number ? `${K}` : K]: DMixed[K] }, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DStringify<Record<number, string>>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<keyof DStringify<Record<number, string>>, TODO>>; // TODO(koan) @koan-error

// Broad source domains produce template-pattern key domains.
type _D46 = Expect<Equal<keyof DPrefix<Record<string, number>, "get">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DPrefix<Record<string, number>, "get">[`get${string}`], TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<keyof DSuffix<Record<string, boolean>, "Changed">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<keyof DWrapped<Record<string, Date>, "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<keyof { [K in number as `n-${K}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<{ [K in number as `n-${K}`]: K }[`n-${number}`], TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<keyof { [K in "value" as `b-${bigint}`]: boolean }, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<keyof { [K in "value" as `${boolean}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<keyof { [K in "value" as `${null | undefined}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<keyof { [K in string as `data-${K}`]: unknown }, TODO>>; // TODO(koan) @koan-error

// Composition and collisions combine key computation with mapped modifiers.
type _D56 = Expect<Equal<DPrefix<DSuffix<{ name: string }, "Value">, "get">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DSuffix<DPrefix<{ name: string }, "get">, "Now">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<{ [K in "name" | "Name" as Capitalize<K>]: K }, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DPrefix<{ readonly id: number }, "get">, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DPrefix<{ label?: string }, "get">, TODO>>; // TODO(koan) @koan-error
