import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-056 guided drills: structural assignability in conditionals
 * =============================================================================
 * Treat the right side as a usage contract. Check required members, then their
 * value types, then container/function variance, and only then nominal identity
 * introduced by private members or unique-symbol brands.
 */

type DAssign<A, B> = A extends B ? true : false;

// Width, depth, unions, intersections, and built-in structural capabilities.
type _D01 = Expect<Equal<DAssign<{ x: number }, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DAssign<{ x: number; y: string }, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DAssign<{ x: number }, { x: number; y: string }>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DAssign<{ x: 1 }, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DAssign<{ x: number }, { x: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DAssign<{ nested: { a: 1; b: 2 } }, { nested: { a: number } }>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DAssign<{ nested: { a: 1 } }, { nested: { a: number; b: number } }>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DAssign<{ x: 1 }, { x: number } | { y: string }>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DAssign<{ x: 1; y: "a" }, { x: number } & { y: string }>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DAssign<{ x: 1 }, { x: number } & { y?: string }>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DAssign<Date, { getTime(): number }>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DAssign<RegExp, { source: string }>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DAssign<Map<string, number>, { size: number }>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DAssign<Set<string>, { has(value: string): boolean }>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DAssign<Promise<string>, Promise<unknown>>, TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<DAssign<{ 0: string; length: 1 }, ArrayLike<string>>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DAssign<string, { length: number }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DAssign<() => void, object>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DAssign<{}, object>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DAssign<null, object>, TODO>>; // TODO(koan) @koan-error

// Optionality, explicit undefined, readonly, and open index domains.
type _D21 = Expect<Equal<DAssign<{ x: number }, { x?: number }>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DAssign<{ x?: number }, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DAssign<{}, { x?: number }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DAssign<{ x: undefined }, { x?: number }>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DAssign<{ x?: number }, { x: number | undefined }>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DAssign<{ x: number | undefined }, { x?: number }>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DAssign<{ readonly x: number }, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DAssign<{ x: number }, { readonly x: number }>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DAssign<{ a: string; b: string }, Record<string, string>>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DAssign<{ a: string; b: number }, Record<string, string>>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DAssign<Record<string, "x">, Record<string, string>>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DAssign<Record<string, string>, Record<string, "x">>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DAssign<{ 0: string }, Record<number, string>>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DAssign<{ [key: symbol]: number }, Record<symbol, number>>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DAssign<{ fixed: 1 }, { [key: string]: number }>, TODO>>; // TODO(koan) @koan-error

// Mutable/readonly arrays and tuple length/position contracts.
type _D36 = Expect<Equal<DAssign<string[], readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DAssign<readonly string[], string[]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DAssign<"x"[], string[]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DAssign<string[], "x"[]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DAssign<[1, 2], number[]>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DAssign<number[], [number, number]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DAssign<readonly [1, 2], readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DAssign<[1], [number, number?]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DAssign<[1, 2], [number, ...number[]]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DAssign<[], readonly unknown[]>, TODO>>; // TODO(koan) @koan-error

class DBase { private identity = 0; value = "base"; }
class DChild extends DBase { child = true; }
class DOther { private identity = 0; value = "base"; }

// Callable variance, class structure, and private-origin identity.
type _D46 = Expect<Equal<DAssign<() => "x", () => string>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DAssign<() => string, () => "x">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DAssign<(x: unknown) => void, (x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DAssign<(x: string) => void, (x: unknown) => void>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DAssign<(x: string, y?: number) => void, (x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DAssign<DBase, { value: string }>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DAssign<DChild, DBase>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DAssign<DBase, DChild>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DAssign<DBase, DOther>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DAssign<DOther, { value: string }>, TODO>>; // TODO(koan) @koan-error

declare const dA: unique symbol;
declare const dB: unique symbol;
type DBrandA = string & { readonly [dA]: "A" };
type DBrandB = string & { readonly [dB]: "B" };

// Brand intersections retain base assignability but reject fabrication/cross-use.
type _D56 = Expect<Equal<DAssign<DBrandA, string>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DAssign<string, DBrandA>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DAssign<DBrandA, DBrandB>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DAssign<DBrandA, DBrandA>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DAssign<DBrandA | DBrandB, string>, TODO>>; // TODO(koan) @koan-error
