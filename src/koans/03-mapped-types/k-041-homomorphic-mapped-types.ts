import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-041: homomorphic mapped types
 * =============================================================================
 *
 * A homomorphic mapped type transforms the properties of an input type while
 * retaining structural information attached to those properties. The canonical
 * form is `{ [K in keyof T]: F<T[K]> }`: it maps the actual property set of T,
 * so `readonly` and optional markers flow to the corresponding output keys unless
 * the mapping explicitly changes them.
 *
 * I read a homomorphic mapping aloud as:
 *
 *   "Transform each existing property in place; preserve how that property
 *    participates in the source shape."
 *
 * This differs from constructing a fresh record over a coincidentally equal key
 * union. `Record<keyof T, V>` knows the names but not their source modifiers, so
 * it emits ordinary required mutable properties. Homomorphic mappings also have
 * special container and primitive behavior: generic identity-like transforms
 * preserve arrays, tuples, and primitive types rather than reducing everything
 * to a bag of visible members. The transformation is shallow unless the value
 * expression recursively invokes another transform.
 */

export type Identity<T> = { [K in keyof T]: T[K] };
export type Flags<T> = { [K in keyof T]: boolean };
export type Boxed<T> = { [K in keyof T]: { value: T[K] } };

export function clone<T extends object>(value: T): Identity<T> {
  return { ...value };
}

export function flagsFor<T extends object>(value: T): Flags<T> {
  return Object.fromEntries(Object.keys(value).map(key => [key, false])) as Flags<T>;
}

export function boxValues<T extends object>(value: T): Boxed<T> {
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, { value: item }]),
  ) as Boxed<T>;
}

interface MainSource {
  readonly id: number;
  name?: string;
  active: boolean;
}

// Part 1: Identity mapping preserves both property values and modifiers.
type MainIdentity = { [K in keyof MainSource]: MainSource[K] };
type _Main01 = Expect<Equal<MainIdentity, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<keyof MainIdentity, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainIdentity["id"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<MainIdentity["name"], TODO>>; // TODO(koan) @koan-error

// Part 2: Changing values still preserves source readonly and optional markers.
type MainFlags = { [K in keyof MainSource]: boolean };
type _Main05 = Expect<Equal<MainFlags, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainFlags["id"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainFlags["name"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Flags<MainSource>, TODO>>; // TODO(koan) @koan-error

// Part 3: A fresh Record over the same names does not inherit source modifiers.
type MainFresh = Record<keyof MainSource, boolean>;
type _Main09 = Expect<Equal<MainFresh, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<MainFresh["name"], TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainFlags extends MainFresh ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<MainFresh extends MainFlags ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 4: Generic homomorphic transforms preserve primitive and container identity.
type _Main13 = Expect<Equal<Identity<string>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Identity<number>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Identity<readonly ["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Flags<string[]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Homomorphic transforms are shallow and compose through generic aliases.
interface MainNested { readonly config?: { enabled: boolean } }
type MainNestedIdentity = Identity<MainNested>;
type MainNestedBoxed = Boxed<MainNested>;
type _Main17 = Expect<Equal<MainNestedIdentity, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainNestedIdentity["config"], TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainNestedBoxed, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MainNestedBoxed["config"], TODO>>; // TODO(koan) @koan-error
