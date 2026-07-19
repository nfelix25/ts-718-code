import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-040: mapped types and PropertyKey
 * =============================================================================
 *
 * A mapped type iterates over a union of property keys and emits one property
 * for each member. `{ [K in "id" | "name"]: boolean }` is a type-level loop:
 * K is first "id", then "name", and the result contains both properties.
 *
 * I read `{ [K in keyof T]: T[K] }` aloud as:
 *
 *   "For every key K accepted by T, create a property K whose value is the type
 *    obtained by indexing T with that same K."
 *
 * JavaScript property keys inhabit `PropertyKey`, an alias for
 * `string | number | symbol`. A mapped key domain must be assignable to that
 * union. Finite literal unions produce named properties; broad string, number,
 * or symbol domains produce index-signature-like types. The loop variable K can
 * participate in the value expression, so each output property may depend on
 * its own key rather than sharing one value type. Later lessons will change
 * modifiers and names; first make this iteration model automatic.
 */

export type Flags<T> = { [K in keyof T]: boolean };
export type Dictionary<K extends PropertyKey, V> = { [P in K]: V };
export type Identity<T> = { [K in keyof T]: T[K] };

export function makeFlags<const K extends readonly PropertyKey[]>(keys: K): Dictionary<K[number], boolean> {
  return Object.fromEntries(keys.map(key => [key, false])) as Dictionary<K[number], boolean>;
}

export function cloneIdentity<T extends object>(value: T): Identity<T> {
  return { ...value };
}

export function valuesFor<T extends object, K extends keyof T>(value: T, keys: readonly K[]): T[K][] {
  return keys.map(key => value[key]);
}

declare const mainToken: unique symbol;

// Part 1: A finite key union produces one required property per key.
type MainFinite = { [K in "id" | "name"]: string };
type _Main01 = Expect<Equal<MainFinite, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<keyof MainFinite, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainFinite["id"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<MainFinite["name"], TODO>>; // TODO(koan) @koan-error

// Part 2: Mapping keyof transforms the property set of an object.
interface MainUser { id: number; name: string; active: boolean }
type MainFlags = { [K in keyof MainUser]: boolean };
type _Main05 = Expect<Equal<MainFlags, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<keyof MainFlags, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainFlags["id"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Flags<MainUser>, TODO>>; // TODO(koan) @koan-error

// Part 3: The loop key can select a different source value for each property.
type MainCopy = { [K in keyof MainUser]: MainUser[K] };
type _Main09 = Expect<Equal<MainCopy, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<MainCopy["id"], TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainCopy["name"], TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Identity<MainUser>, TODO>>; // TODO(koan) @koan-error

// Part 4: String, number, and symbol literals all participate in PropertyKey.
type MainMixed = { [K in "name" | 0 | typeof mainToken]: K };
type _Main13 = Expect<Equal<keyof MainMixed, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<MainMixed["name"], TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<MainMixed[0], TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<MainMixed[typeof mainToken], TODO>>; // TODO(koan) @koan-error

// Part 5: Generic and empty key domains substitute like ordinary unions.
type MainRecord<K extends PropertyKey> = { [P in K]: P };
type _Main17 = Expect<Equal<MainRecord<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainRecord<1 | 2>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainRecord<never>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<PropertyKey, TODO>>; // TODO(koan) @koan-error
