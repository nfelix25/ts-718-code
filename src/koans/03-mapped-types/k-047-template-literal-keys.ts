import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-047: template literal keys
 * =============================================================================
 *
 * A template literal type can be the destination expression of a mapped type.
 * This turns a source key such as `name` into a computed key such as
 * `apiName`, `nameChanged`, or `data-name` while the value still comes from the
 * original `T[K]`.
 *
 * I read the core form aloud as:
 *
 *   "For each string source key K, emit the text formed by this template, and
 *    put the original value T[K] there."
 *
 * Template interpolation distributes over unions, so a union in either the
 * source key or a fixed prefix creates a cross-product of destination names.
 * Intrinsic casing helpers transform literal text but cannot accept symbols.
 * That is why reusable mappings usually narrow `K` with `K extends string` or
 * `K & string`. Numeric keys can be handled deliberately with `${K}`; symbol
 * keys must be preserved separately or filtered. Broad `string` and `number`
 * inputs produce patterned key domains rather than a finite set of literals.
 */

export type PrefixKeys<T, Prefix extends string> = {
  [K in keyof T as K extends string ? `${Prefix}${Capitalize<K>}` : never]: T[K]
};

export type SuffixKeys<T, Suffix extends string> = {
  [K in keyof T as K extends string ? `${K}${Suffix}` : never]: T[K]
};

export type DataKeys<T> = {
  [K in keyof T as K extends string | number ? `data-${K}` : never]: T[K]
};

export function prefixObjectKeys<T extends Record<string, unknown>, P extends string>(value: T, prefix: P): PrefixKeys<T, P> {
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [`${prefix}${key[0]?.toUpperCase() ?? ""}${key.slice(1)}`, entry]),
  ) as PrefixKeys<T, P>;
}

export function suffixObjectKeys<T extends Record<string, unknown>, S extends string>(value: T, suffix: S): SuffixKeys<T, S> {
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [`${key}${suffix}`, entry])) as SuffixKeys<T, S>;
}

export function dataAttributes<T extends Record<string, string | number | boolean>>(value: T): DataKeys<T> {
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [`data-${key}`, entry])) as DataKeys<T>;
}

interface MainFields { name: string; active: boolean; count: number }

// Part 1: A prefix and capitalization compute finite destination names.
type MainApi = PrefixKeys<MainFields, "api">;
type _Main01 = Expect<Equal<MainApi, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<keyof MainApi, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainApi["apiName"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<PrefixKeys<{ ready: true }, "is">, TODO>>; // TODO(koan) @koan-error

// Part 2: Suffixes and intrinsic casing can be combined independently.
type MainChanged = SuffixKeys<MainFields, "Changed">;
type MainUpper = { [K in keyof MainFields as K extends string ? Uppercase<K> : never]: MainFields[K] };
type _Main05 = Expect<Equal<MainChanged, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<keyof MainChanged, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainUpper, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<MainUpper["COUNT"], TODO>>; // TODO(koan) @koan-error

// Part 3: Union fragments create a destination cross-product.
type MainPermissions = {
  [K in "file" | "user" as `${"read" | "write"}${Capitalize<K>}`]: boolean
};
type _Main09 = Expect<Equal<MainPermissions, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<keyof MainPermissions, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainPermissions["readFile"], TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<{ [K in "x" as `${K}${"1" | "2"}`]: K }, TODO>>; // TODO(koan) @koan-error

// Part 4: String restriction filters number and symbol keys unless included.
declare const mainSymbol: unique symbol;
interface MainMixed { title: string; 0: number; [mainSymbol]: boolean }
type MainStringOnly = PrefixKeys<MainMixed, "get">;
type MainData = DataKeys<MainMixed>;
type _Main13 = Expect<Equal<MainStringOnly, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<keyof MainStringOnly, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<MainData, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<keyof MainData, TODO>>; // TODO(koan) @koan-error

// Part 5: Broad inputs describe patterned, potentially infinite key domains.
type MainBroadString = PrefixKeys<Record<string, number>, "api">;
type MainBroadNumber = DataKeys<Record<number, boolean>>;
type _Main17 = Expect<Equal<keyof MainBroadString, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainBroadString[`api${string}`], TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<keyof MainBroadNumber, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MainBroadNumber[`data-${number}`], TODO>>; // TODO(koan) @koan-error
