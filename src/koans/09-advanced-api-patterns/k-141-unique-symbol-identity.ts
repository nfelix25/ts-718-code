import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 141 - UNIQUE SYMBOL IDENTITY
 * ===================================
 *
 * `symbol` describes any symbol value. A `unique symbol` type describes exactly
 * one declaration's runtime symbol. Each declaration creates a singleton type,
 * named with `typeof CONSTANT`, that can safely distinguish computed property
 * keys even when their value shapes or descriptions are identical.
 *
 * Read `Registry[typeof USER]` aloud as: "look up the property keyed by this one
 * specific symbol." Widen that key to plain `symbol` and the compiler loses the
 * identity needed for heterogeneous lookup. Unique symbols connect a runtime
 * collision-proof key to a compile-time nominal identity.
 */

export const USER = Symbol("user");
export const ORDER: unique symbol = Symbol("order");
export const broadSymbol: symbol = Symbol("broad");

export type Registry = {
  [USER]: { id: string; name: string };
  [ORDER]: { id: number; total: number };
  version: number;
};

type Extends<From, To> = [From] extends [To] ? true : false;
export type IsUniqueSymbol<Value> = Value extends symbol
  ? symbol extends Value ? false : true
  : false;

// Part 1: Each const symbol declaration receives one nominal singleton type.
type _01 = Expect<Equal<IsUniqueSymbol<typeof USER>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IsUniqueSymbol<typeof ORDER>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsUniqueSymbol<typeof broadSymbol>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Equal<typeof USER, typeof ORDER>, TODO>>; // TODO(koan) @koan-error

// Part 2: A singleton flows to symbol, but arbitrary symbols do not flow back.
type _05 = Expect<Equal<Extends<typeof USER, symbol>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<symbol, typeof USER>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<typeof USER, typeof ORDER>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof USER & typeof ORDER, TODO>>; // TODO(koan) @koan-error

// Part 3: Computed singleton keys retain heterogeneous value precision.
type _09 = Expect<Equal<keyof Registry, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Registry[typeof USER], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Registry[typeof ORDER], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Registry["version"], TODO>>; // TODO(koan) @koan-error

// Part 4: Mapped types and Records preserve the singleton key vocabulary.
type _13 = Expect<Equal<keyof Record<typeof USER, string>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Record<typeof USER | typeof ORDER, boolean>[typeof ORDER], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<{ [Key in keyof Registry]: Key }[typeof USER], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<keyof Registry, symbol>, TODO>>; // TODO(koan) @koan-error

// Part 5: Aliasing can preserve identity; annotation widening deliberately loses it.
const userAlias = USER;
const widenedUser: symbol = USER;
type _17 = Expect<Equal<typeof userAlias, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<typeof widenedUser, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsUniqueSymbol<typeof userAlias>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsUniqueSymbol<typeof widenedUser>, TODO>>; // TODO(koan) @koan-error

export function createRegistry(): Registry {
  return {
    [USER]: { id: "u1", name: "Ada" },
    [ORDER]: { id: 42, total: 1999 },
    version: 1,
  };
}

export function readRegistry<Key extends keyof Registry>(registry: Registry, key: Key): Registry[Key] {
  return registry[key];
}

export function ownRegistryKeys(registry: Registry): PropertyKey[] {
  return Reflect.ownKeys(registry);
}
