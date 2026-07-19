import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 123 - REBUILD READONLY AND RECORD
 * ========================================
 *
 * `Readonly<T>` maps an existing shape and adds a capability modifier: callers
 * may read each property but not assign it. `Record<K, V>` starts from a key
 * vocabulary K and creates one required mutable property of value V per key.
 *
 * Read Readonly aloud as "for every source key P, copy T[P] and add readonly."
 * Read Record aloud as "for every property key P in K, require a V at P." Both
 * are shallow. A readonly property can still refer to a mutable object, and a
 * Record says nothing about runtime prototype, enumeration, or exactness.
 */

export type KoanReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

export type KoanRecord<K extends keyof any, V> = {
  [P in K]: V;
};

type Settings = {
  host: string;
  port?: number;
  nested: { retries: number };
};

// Part 1: Readonly adds write protection while retaining keys and values.
type _01 = Expect<Equal<KoanReadonly<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanReadonly<Settings>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof KoanReadonly<Settings>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanReadonly<KoanReadonly<Settings>>, TODO>>; // TODO(koan) @koan-error

// Part 2: Readonly is shallow and preserves optional presence.
type _05 = Expect<Equal<KoanReadonly<Settings>["port"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanReadonly<Settings>["nested"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KoanReadonly<[name: string, age: number]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanReadonly<string[]>, TODO>>; // TODO(koan) @koan-error

// Part 3: Record turns a finite key union into required properties.
type _09 = Expect<Equal<KoanRecord<"a", number>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<KoanRecord<"a" | "b", number>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<KoanRecord<never, number>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof KoanRecord<"idle" | "busy", boolean>, TODO>>; // TODO(koan) @koan-error

// Part 4: Record accepts every PropertyKey domain.
declare const token: unique symbol;
type _13 = Expect<Equal<KoanRecord<0 | 1, string>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KoanRecord<typeof token, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<KoanRecord<string, number>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<KoanRecord<PropertyKey, unknown>, TODO>>; // TODO(koan) @koan-error

// Part 5: Utilities compose, but their axes stay independent.
type _17 = Expect<Equal<KoanReadonly<KoanRecord<"x" | "y", number>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<KoanRecord<"x", KoanReadonly<{ value: number }>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Partial<KoanRecord<"x" | "y", number>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Required<KoanReadonly<{ x?: number }>>, TODO>>; // TODO(koan) @koan-error

export function freezeShallow<T extends object>(value: T): KoanReadonly<T> {
  return Object.freeze(value);
}

export function fromKeys<const Keys extends readonly PropertyKey[], V>(
  keys: Keys,
  create: (key: Keys[number]) => V,
): KoanRecord<Keys[number], V> {
  const result: Record<PropertyKey, V> = {};
  for (const key of keys) result[key] = create(key);
  return result as KoanRecord<Keys[number], V>;
}
