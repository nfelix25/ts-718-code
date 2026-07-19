import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-052: indexed access plus mapping
 * =============================================================================
 *
 * A mapped type gives each property iteration a specific key `K`; indexed
 * access `T[K]` retrieves the value correlated with that key. If the value
 * expression instead uses `T[keyof T]`, it retrieves the union of every value
 * too early and repeats that loose union at every property.
 *
 * I read the correlated form aloud as:
 *
 *   "For each key K, construct a result mentioning this K and this T[K]; then
 *    index the completed table by keyof T to collect those related rows."
 *
 * This map-then-index idiom creates entry unions, descriptor unions, command
 * tables, and many typed registries. Optional mapped properties can add
 * `undefined` when the table is indexed, so entry builders commonly use `-?`
 * on the intermediate table. Key remapping can also use `T[K]` as a destination
 * when source values are PropertyKeys, effectively inverting a lookup table;
 * duplicate values then merge their source keys.
 */

export type Values<T> = T[keyof T];
export type Descriptors<T> = {
  [K in keyof T]-?: { key: K; value: T[K] }
};
export type Entries<T> = {
  [K in keyof T]-?: [key: K, value: T[K]]
}[keyof T];
export type LooseEntry<T> = [key: keyof T, value: T[keyof T]];
export type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K
};

export function ownEntries<T extends object>(value: T): Entries<T>[] {
  return Reflect.ownKeys(value).map(key => [key, Reflect.get(value, key)]) as Entries<T>[];
}

export function descriptorObject<T extends object>(value: T): Descriptors<T> {
  return Object.fromEntries(
    Reflect.ownKeys(value).map(key => [key, { key, value: Reflect.get(value, key) }]),
  ) as Descriptors<T>;
}

export function invertRecord<T extends Record<string, PropertyKey>>(value: T): Invert<T> {
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [entry, key])) as Invert<T>;
}

interface MainModel { id: number; name: string; active: boolean }

// Part 1: Indexed access over a key union collects the corresponding values.
type _Main01 = Expect<Equal<Values<MainModel>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainModel[keyof MainModel], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainModel["id" | "active"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Values<{}>, TODO>>; // TODO(koan) @koan-error

// Part 2: T[K] inside a mapped loop creates one related descriptor per key.
type MainDescriptors = Descriptors<MainModel>;
type _Main05 = Expect<Equal<MainDescriptors, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainDescriptors["name"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainDescriptors[keyof MainDescriptors], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<MainDescriptors["active"]["value"], TODO>>; // TODO(koan) @koan-error

// Part 3: Map then index produces a correlated union of entry tuples.
type MainEntries = Entries<MainModel>;
type _Main09 = Expect<Equal<MainEntries, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Extract<MainEntries, ["id", unknown]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Extract<MainEntries, ["name", unknown]>[1], TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Entries<{}>, TODO>>; // TODO(koan) @koan-error

// Part 4: Indexing too early loses the key/value pairing.
type MainLoose = LooseEntry<MainModel>;
type _Main13 = Expect<Equal<MainLoose, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<MainLoose[0], TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<MainLoose[1], TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<["id", string] extends MainLoose ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 5: T[K] may become the destination key when values are PropertyKeys.
type MainCodes = { ready: 200; missing: 404; moved: 301 };
type MainInverted = Invert<MainCodes>;
type _Main17 = Expect<Equal<MainInverted, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof MainInverted, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainInverted[404], TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Invert<{ first: "same"; second: "same" }>["same"], TODO>>; // TODO(koan) @koan-error
