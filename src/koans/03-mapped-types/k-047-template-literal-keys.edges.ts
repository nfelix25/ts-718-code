import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-047 edge cases: template literal keys
 * =============================================================================
 * Finite literals are the easy case. Here the destination expression receives
 * broad strings and numbers, colliding normalized names, modifiers, empty and
 * punctuation-heavy text, tuple infrastructure keys, and symbols that cannot
 * be interpolated. Track whether the result is finite, patterned, merged, or
 * filtered.
 */

type EPrefix<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${Capitalize<K>}` : never]: T[K]
};
type EStringify<T> = {
  [K in keyof T as K extends string | number ? `${K}` : never]: T[K]
};
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Broad and special source domains produce patterns, empty maps, or any maps.
type _E01 = Expect<Equal<keyof EPrefix<Record<string, number>, "get">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<keyof { [K in string as Capitalize<K>]: K }, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<keyof { [K in number as `slot-${K}`]: K }, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<{ [K in 1 | 2 as `slot-${K}`]: K }, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<keyof { [K in symbol as K]: boolean }, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EPrefix<Record<symbol, Date>, "get">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EPrefix<unknown, "get">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EPrefix<never, "get">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EIsAny<EPrefix<any, "get">>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<keyof EStringify<Record<number, string>>, TODO>>; // TODO(koan) @koan-error

// Normalization can send distinct source keys to one destination.
type ECapitalCollision = { [K in "name" | "Name" as Capitalize<K>]: K };
type EUpperCollision = { [K in "id" | "ID" as Uppercase<K>]: K };
type _E11 = Expect<Equal<ECapitalCollision, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ECapitalCollision["Name"], TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EUpperCollision["ID"], TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<{ [K in "a" | "b" as K | "shared"]: K }["shared"], TODO>>; // TODO(koan) @koan-error

// Surviving remapped properties retain modifiers until another transform acts.
type EModified = EPrefix<{ readonly id: number; label?: string }, "get">;
type _E15 = Expect<Equal<EModified, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EModified["getLabel"], TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<{ -readonly [K in keyof EModified]: EModified[K] }, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<{ [K in keyof EModified]-?: EModified[K] }, TODO>>; // TODO(koan) @koan-error

// Intrinsic casing changes only the first code unit relevant to that helper.
type _E19 = Expect<Equal<EPrefix<{ "": 1 }, "get">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EPrefix<{ "first-name": 1 }, "get">, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EPrefix<{ _private: 1 }, "get">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EPrefix<{ URL: 1 }, "get">, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EPrefix<{ "2fa": true }, "is">, TODO>>; // TODO(koan) @koan-error

declare const eSymbol: unique symbol;
interface EIndexAndSymbol {
  [key: string]: number;
  [eSymbol]: Date;
}

// Index signatures, non-string fragments, tuples, and preservation branches.
type _E24 = Expect<Equal<keyof EPrefix<EIndexAndSymbol, "api">, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<keyof { [K in number as `${K}px`]: K }, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<keyof { [K in "x" as `${boolean}-${K}`]: K }, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<keyof { [K in "x" as `${null | undefined}-${K}`]: K }, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EPrefix<{ [key: string]: boolean }, "is">[`is${Capitalize<string>}`], TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<keyof EPrefix<readonly ["a", 1], "p">, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<{ [K in keyof EIndexAndSymbol as K extends string ? `x-${K}` : K]: EIndexAndSymbol[K] }, TODO>>; // TODO(koan) @koan-error

// Pre-solved: each interpolated union position multiplies the key set.
type DemoProduct = { [K in "x" | "y" as `${"a" | "b"}-${K}`]: K };
type _DemoProduct = Expect<Equal<keyof DemoProduct, "a-x" | "a-y" | "b-x" | "b-y">>;

// Pre-solved: numeric keys may be deliberately converted to string literals.
type DemoNumeric = EStringify<{ 0: "zero"; 1: "one" }>;
type _DemoNumeric = Expect<Equal<DemoNumeric, { "0": "zero"; "1": "one" }>>;

// Pre-solved: a symbol can be preserved by a branch but cannot be interpolated.
type DemoPreservedSymbol = {
  [K in keyof { name: string; [eSymbol]: Date } as K extends string ? `x-${K}` : K]:
    { name: string; [eSymbol]: Date }[K]
};
type _DemoPreservedSymbol = Expect<Equal<keyof DemoPreservedSymbol, "x-name" | typeof eSymbol>>;

// @ts-expect-error Symbols are not accepted as template-literal interpolations.
type InvalidSymbolInterpolation = `${typeof eSymbol}`;
