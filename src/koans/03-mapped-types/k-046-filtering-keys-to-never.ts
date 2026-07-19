import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-046: filtering keys to never
 * =============================================================================
 *
 * A key-remapping expression is also a filter. When the `as` clause computes a
 * PropertyKey, the mapped property is emitted; when it computes `never`, there
 * is no destination key, so that source property disappears.
 *
 * I read the central pattern aloud as:
 *
 *   "For each source key K, keep K when the predicate is true; otherwise send K
 *    to never, which contributes no property."
 *
 * The value expression still uses the original K. Filtering may test the key,
 * the value `T[K]`, or both. This is the mechanism underneath `Pick`, `Omit`,
 * value-selected projections, public API views, and schema partitioning. The
 * sharp edges come from the predicate: optional reads include `undefined`,
 * `never` extends every type, `any` can choose both conditional branches, and
 * index signatures describe broad domains rather than individually removable
 * keys. Keep those predicate semantics separate from the simple emission rule.
 */

export type WithoutKeys<T, Removed extends PropertyKey> = {
  [K in keyof T as K extends Removed ? never : K]: T[K]
};

export type OnlyKeys<T, Included extends PropertyKey> = {
  [K in keyof T as K extends Included ? K : never]: T[K]
};

export type PickByValue<T, Value> = {
  [K in keyof T as T[K] extends Value ? K : never]: T[K]
};

export function omitKeys<T extends object, K extends keyof T>(value: T, keys: readonly K[]): WithoutKeys<T, K> {
  const removed = new Set<PropertyKey>(keys.map(key => typeof key === "number" ? String(key) : key));
  return Object.fromEntries(
    Reflect.ownKeys(value).filter(key => !removed.has(key)).map(key => [key, Reflect.get(value, key)]),
  ) as WithoutKeys<T, K>;
}

export function pickKeys<T extends object, K extends keyof T>(value: T, keys: readonly K[]): OnlyKeys<T, K> {
  return Object.fromEntries(keys.map(key => [key, value[key]])) as unknown as OnlyKeys<T, K>;
}

export function publicUser(user: { id: number; name: string; password: string; token: string }) {
  return omitKeys(user, ["password", "token"] as const);
}

export function pickNumberValues(value: Record<string, unknown>): Record<string, number> {
  return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, number] => typeof entry[1] === "number"));
}

interface MainRecord {
  id: number;
  name: string;
  active: boolean;
  score: number;
}

// Part 1: A named-key predicate can remove selected source properties.
type MainWithout = WithoutKeys<MainRecord, "active" | "score">;
type _Main01 = Expect<Equal<MainWithout, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<keyof MainWithout, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainWithout["id"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<WithoutKeys<MainRecord, "missing">, TODO>>; // TODO(koan) @koan-error

// Part 2: Reversing the branches keeps only an explicit key set.
type MainOnly = OnlyKeys<MainRecord, "name" | "score">;
type _Main05 = Expect<Equal<MainOnly, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<keyof MainOnly, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<OnlyKeys<MainRecord, never>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<OnlyKeys<MainRecord, PropertyKey>, TODO>>; // TODO(koan) @koan-error

// Part 3: The predicate may inspect each original value through T[K].
type MainNumbers = PickByValue<MainRecord, number>;
type MainScalars = PickByValue<MainRecord, string | boolean>;
type _Main09 = Expect<Equal<MainNumbers, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<keyof MainNumbers, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainScalars, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<PickByValue<MainRecord, unknown>, TODO>>; // TODO(koan) @koan-error

// Part 4: Surviving properties retain their original modifiers and values.
interface MainModified {
  readonly id: number;
  nickname?: string;
  active: boolean;
}
type MainModifiedNumbers = PickByValue<MainModified, number>;
type MainModifiedStrings = PickByValue<MainModified, string>;
type _Main13 = Expect<Equal<MainModifiedNumbers, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<keyof MainModifiedStrings, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<MainModified["nickname"], TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<PickByValue<MainModified, string | undefined>, TODO>>; // TODO(koan) @koan-error

// Part 5: String, number, and symbol keys all participate in the same filter.
declare const mainSecret: unique symbol;
interface MainMixedKeys {
  0: string;
  1: number;
  label: string;
  [mainSecret]: boolean;
}
type MainStringKeys = { [K in keyof MainMixedKeys as K extends string ? K : never]: MainMixedKeys[K] };
type _Main17 = Expect<Equal<MainStringKeys, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof MainStringKeys, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<PickByValue<MainMixedKeys, string>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<OnlyKeys<MainMixedKeys, 1 | typeof mainSecret>, TODO>>; // TODO(koan) @koan-error
