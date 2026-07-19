import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-051: string, number, and symbol keys
 * =============================================================================
 *
 * `PropertyKey` is `string | number | symbol`, but those families do not behave
 * identically. String and number literals can name distinct static key types,
 * even though JavaScript stores an object key written as `0` under the runtime
 * string `"0"`. Symbols are never coerced and retain identity.
 *
 * I read a key-family extraction aloud as:
 *
 *   "Take keyof T, then retain only the members assignable to string, number,
 *    or symbol."
 *
 * String index signatures accept runtime numeric access too, so their `keyof`
 * includes `string | number`. Number index signatures contribute `number` plus
 * any explicitly declared string keys. `Record<string, V>` is a mapped type
 * over the string domain and is worth contrasting with index-signature syntax.
 * A `unique symbol` provides one finite key; broad `symbol` describes any symbol
 * key. Remapping policies should branch deliberately rather than forcing every
 * key through a string-only template.
 */

export type StringKeys<T> = Extract<keyof T, string>;
export type NumberKeys<T> = Extract<keyof T, number>;
export type SymbolKeys<T> = Extract<keyof T, symbol>;

export type PrefixStringsPreserveOthers<T> = {
  [K in keyof T as K extends string ? `x-${K}` : K]: T[K]
};

export type StringifyNumbers<T> = {
  [K in keyof T as K extends number ? `${K}` : K]: T[K]
};

export function ownStringKeys(value: object): string[] {
  return Reflect.ownKeys(value).filter((key): key is string => typeof key === "string");
}

export function ownSymbolKeys(value: object): symbol[] {
  return Reflect.ownKeys(value).filter((key): key is symbol => typeof key === "symbol");
}

export function runtimePropertyKey(key: PropertyKey): string | symbol {
  return typeof key === "number" ? String(key) : key;
}

// Part 1: The universal and degenerate key domains establish the algebra.
type _Main01 = Expect<Equal<PropertyKey, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<keyof any, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<keyof unknown, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<keyof never, TODO>>; // TODO(koan) @koan-error

// Part 2: Finite mixed objects expose independently extractable key families.
declare const mainToken: unique symbol;
interface MainMixed { name: string; 0: number; 2: boolean; [mainToken]: Date }
type _Main05 = Expect<Equal<keyof MainMixed, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<StringKeys<MainMixed>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<NumberKeys<MainMixed>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<SymbolKeys<MainMixed>, TODO>>; // TODO(koan) @koan-error

// Part 3: String and number index signatures have different key surfaces.
interface MainStringIndex { [key: string]: number; fixed: 1 }
interface MainNumberIndex { [index: number]: string; label: string }
type _Main09 = Expect<Equal<keyof MainStringIndex, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<keyof MainNumberIndex, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<keyof Record<string, number>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<keyof Record<number, string>, TODO>>; // TODO(koan) @koan-error

// Part 4: Unique symbols are finite keys; symbol indexes are broad domains.
declare const mainOther: unique symbol;
type MainSymbols = { [mainToken]: string; [mainOther]: number };
type _Main13 = Expect<Equal<keyof MainSymbols, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<MainSymbols[typeof mainToken], TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<keyof Record<symbol, boolean>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<SymbolKeys<Record<PropertyKey, unknown>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Remapping can preserve, filter, or stringify each family deliberately.
type MainPrefixed = PrefixStringsPreserveOthers<MainMixed>;
type MainStringified = StringifyNumbers<MainMixed>;
type _Main17 = Expect<Equal<MainPrefixed, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof MainPrefixed, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainStringified, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<keyof MainStringified, TODO>>; // TODO(koan) @koan-error
