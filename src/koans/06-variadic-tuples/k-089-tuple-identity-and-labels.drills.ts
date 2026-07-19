import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-089 guided drills: tuple identity and labels
 * =============================================================================
 * Read each tuple by position. Then contrast literal length with array length,
 * labels with real keys, and a known numeric index with an arbitrary one.
 */

type DIsTuple<T extends readonly unknown[]> = number extends T["length"] ? false : true;
type DKeys<T extends readonly unknown[]> = Exclude<keyof T, keyof readonly unknown[]>;
type DParams = Parameters<(host: string, port: number, secure: boolean) => void>;

// Known positions are precise; a numeric index forms the element union.
type _D01 = Expect<Equal<[string, number][0], TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<[string, number][1], TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<[string, number][number], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<[true, false][0], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<[true, false][1], TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<[true, false][number], TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<[1, "two", 3n][0], TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<[1, "two", 3n][1], TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<[1, "two", 3n][2], TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<[1, "two", 3n][number], TODO>>; // TODO(koan) @koan-error

// Finite tuple lengths are numeric literals and participate in unions.
type _D11 = Expect<Equal<[]["length"], TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<[string]["length"], TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<[string, number]["length"], TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<[1, 2, 3]["length"], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<([string] | [string, number])["length"], TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<string[]["length"], TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<(readonly string[])["length"], TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<[null, undefined][number], TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<[never]["length"], TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<[never][number], TODO>>; // TODO(koan) @koan-error

// The length test classifies empty and nonempty finite tuples alike.
type _D21 = Expect<Equal<DIsTuple<[]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DIsTuple<[unknown]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DIsTuple<[unknown, unknown]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DIsTuple<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DIsTuple<never[]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DIsTuple<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DIsTuple<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DIsTuple<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DIsTuple<[string] | [number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DIsTuple<string[] | number[]>, TODO>>; // TODO(koan) @koan-error

// Renaming or removing labels does not change the structural tuple type.
type _D31 = Expect<Equal<Equal<[x: number], [number]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<Equal<[x: number], [value: number]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<Equal<[x: number, y: string], [number, string]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<Equal<[first: 1, second: 2], [left: 1, right: 2]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<[name: string][0], TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<[name: string, age: number][1], TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<[name: string, age: number][number], TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<[name: string, age: number]["length"], TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<Equal<keyof [x: number], keyof [number]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<Equal<keyof [left: string, right: string], keyof [string, string]>, TODO>>; // TODO(koan) @koan-error

// Subtracting array keys leaves stringified positional keys, never labels.
type _D41 = Expect<Equal<DKeys<[]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DKeys<[string]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DKeys<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DKeys<[string, number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DKeys<[first: string]>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DKeys<[left: string, right: number]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DKeys<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DKeys<string[]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DKeys<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DKeys<[1] | [1, 2]>, TODO>>; // TODO(koan) @koan-error

// Parameters converts a call signature into a labeled positional tuple.
type _D51 = Expect<Equal<DParams[0], TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DParams[1], TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DParams[2], TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DParams[number], TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DParams["length"], TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DIsTuple<DParams>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DKeys<DParams>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<Equal<DParams, [string, number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<Parameters<() => void>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<Parameters<(value: 42) => 42>, TODO>>; // TODO(koan) @koan-error
