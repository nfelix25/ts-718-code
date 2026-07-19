import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-051 guided drills: string, number, and symbol keys
 * =============================================================================
 * Classify the static key domain first, then separately predict the runtime own
 * key. Repeatedly contrast finite literals, index signatures, mapped Records,
 * unique symbols, broad symbols, and family-aware remapping.
 */

type DStrings<T> = Extract<keyof T, string>;
type DNumbers<T> = Extract<keyof T, number>;
type DSymbols<T> = Extract<keyof T, symbol>;
type DPrefixStrings<T> = { [K in keyof T as K extends string ? `p-${K}` : K]: T[K] };
type DStringifyNumbers<T> = { [K in keyof T as K extends number ? `${K}` : K]: T[K] };

// Universal, empty, primitive, and built-in key domains.
type _D01 = Expect<Equal<PropertyKey, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<keyof any, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<keyof never, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<keyof unknown, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<keyof {}, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<keyof object, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<keyof string, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<keyof number, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<Extract<PropertyKey, string | number>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<Exclude<PropertyKey, symbol>, TODO>>; // TODO(koan) @koan-error

declare const dToken: unique symbol;
declare const dOther: unique symbol;
interface DFinite {
  name: string;
  "-1": boolean;
  0: number;
  2: bigint;
  [dToken]: Date;
}

// Finite mixed objects keep literal key identities.
type _D11 = Expect<Equal<keyof DFinite, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DStrings<DFinite>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DNumbers<DFinite>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DSymbols<DFinite>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DFinite["name"], TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<DFinite[0], TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DFinite["-1"], TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DFinite[typeof dToken], TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<keyof { 1: "one" }, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<keyof { "1": "one" }, TODO>>; // TODO(koan) @koan-error

interface DStringIndex { [key: string]: string | number; fixed: string }
interface DNumberIndex { [index: number]: string; label: boolean }
interface DSymbolIndex { [key: symbol]: Date; fixed: number }

// Index-signature syntax and mapped Record domains deserve direct comparison.
type _D21 = Expect<Equal<keyof DStringIndex, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DStrings<DStringIndex>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DNumbers<DStringIndex>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<keyof DNumberIndex, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DStrings<DNumberIndex>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DNumbers<DNumberIndex>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<keyof DSymbolIndex, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DSymbols<DSymbolIndex>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<keyof Record<string, number>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<keyof Record<number, string>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<keyof Record<symbol, boolean>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<keyof Record<PropertyKey, unknown>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DStrings<Record<PropertyKey, unknown>>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DNumbers<Record<PropertyKey, unknown>>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DSymbols<Record<PropertyKey, unknown>>, TODO>>; // TODO(koan) @koan-error

type DUniqueSymbols = { [dToken]: "token"; [dOther]: "other" };

// Unique symbols name finite properties; broad symbol names an index domain.
type _D36 = Expect<Equal<keyof DUniqueSymbols, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DUniqueSymbols[typeof dToken], TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DSymbols<DUniqueSymbols>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<Extract<keyof DUniqueSymbols, typeof dToken>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<Exclude<keyof DUniqueSymbols, typeof dOther>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<keyof ({ [dToken]: 1 } & { [dOther]: 2 }), TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<keyof ({ [dToken]: 1 } | { [dOther]: 2 }), TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<keyof { [key: symbol]: string }, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<{ [K in symbol]: K }[symbol], TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<{ [K in typeof dToken]: boolean }, TODO>>; // TODO(koan) @koan-error

// Family-aware remapping preserves, filters, converts, and collides keys.
type _D46 = Expect<Equal<DPrefixStrings<DFinite>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<keyof DPrefixStrings<DFinite>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DStringifyNumbers<DFinite>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<keyof DStringifyNumbers<DFinite>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<{ [K in keyof DFinite as K extends symbol ? never : K]: DFinite[K] }, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<{ [K in keyof DFinite as K extends number ? `n-${K}` : K]: DFinite[K] }, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<{ [K in keyof DFinite as K extends string ? never : K]: DFinite[K] }, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<{ [K in keyof DFinite as K extends number ? K : never]: DFinite[K] }, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<{ [K in keyof DFinite as K extends symbol ? K : never]: DFinite[K] }, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<{ [K in 0 | "0" as `${K}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<{ [K in 1 | 2 as `slot-${K}`]: K }, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<keyof DPrefixStrings<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<keyof DStringifyNumbers<Record<number, string>>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DPrefixStrings<Record<symbol, Date>>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DStringifyNumbers<Record<PropertyKey, unknown>>, TODO>>; // TODO(koan) @koan-error
