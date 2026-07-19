import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-083: mapped template keys
 * =============================================================================
 *
 * Key remapping can feed each property key into a template literal. This turns
 * an object's existing vocabulary into getters, event handlers, namespaced
 * fields, or other derived APIs while retaining each key's value relationship.
 *
 * I read
 *
 *   `[K in keyof T as K extends string ? `get${Capitalize<K>}` : never]: T[K]`
 *
 * aloud as:
 *
 *   "Visit every key K. For string keys, emit a capitalized getter name and
 *    keep that key's value type. Drop number and symbol keys."
 *
 * `keyof T` is `PropertyKey`, but template interpolation is not defined for
 * symbols. A transformation therefore needs a policy: filter to string keys,
 * preserve nonstring keys unchanged, or stringify only strings and numbers.
 * Remapped homomorphic properties retain optional and readonly modifiers unless
 * the mapped type changes them explicitly. Different source keys may collide
 * after casing or prefixing; the resulting property combines their value
 * candidates. Broad string index signatures produce broad patterned keys.
 */

export type StringGetters<T> = {
  [Key in keyof T as Key extends string ? `get${Capitalize<Key>}` : never]: () => T[Key];
};
export type PrefixedPreserving<T, Prefix extends string> = {
  [Key in keyof T as Key extends string ? `${Prefix}${Capitalize<Key>}` : Key]: T[Key];
};
export type StringifiedKeys<T> = {
  [Key in keyof T as Key extends string | number ? `${Key}` : never]: T[Key];
};
export type ChangeHandlers<T> = {
  [Key in keyof T as Key extends string ? `on${Capitalize<Key>}Change` : never]:
    (value: T[Key]) => void;
};
export type Namespaced<T, Namespace extends string> = {
  [Key in keyof T as Key extends string ? `${Namespace}.${Key}` : never]: T[Key];
};

export function makeGetters<const Value extends Record<string, unknown>>(
  value: Value,
): StringGetters<Value> {
  const result: Record<string, () => unknown> = {};
  for (const key of Object.keys(value)) {
    const getter = `get${key[0]!.toUpperCase()}${key.slice(1)}`;
    result[getter] = () => value[key];
  }
  return result as StringGetters<Value>;
}

export function namespace<const Value extends Record<string, unknown>, const Namespace extends string>(
  value: Value,
  name: Namespace,
): Namespaced<Value, Namespace> {
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [`${name}.${key}`, item]),
  ) as Namespaced<Value, Namespace>;
}

export function makeChangeHandlers<const Value extends Record<string, unknown>>(
  callbacks: { [Key in keyof Value]: (value: Value[Key]) => void },
): ChangeHandlers<Value> {
  const result: Record<string, (value: unknown) => void> = {};
  for (const key of Object.keys(callbacks)) {
    const name = `on${key[0]!.toUpperCase()}${key.slice(1)}Change`;
    result[name] = callbacks[key] as (value: unknown) => void;
  }
  return result as ChangeHandlers<Value>;
}

// Part 1: getter names derive from each string key and retain value types.
type MainModel = { name: string; age: number; active: boolean };
type _Main01 = Expect<Equal<keyof StringGetters<MainModel>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<StringGetters<MainModel>["getName"], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ReturnType<StringGetters<MainModel>["getAge"]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<StringGetters<{}>, TODO>>; // TODO(koan) @koan-error

// Part 2: preserving policy transforms strings and retains number/symbol identity.
declare const mainToken: unique symbol;
type MainMixed = { name: string; 0: boolean; [mainToken]: Date };
type _Main05 = Expect<Equal<keyof PrefixedPreserving<MainMixed, "api">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<PrefixedPreserving<MainMixed, "api">["apiName"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<PrefixedPreserving<MainMixed, "api">[0], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<PrefixedPreserving<MainMixed, "api">[typeof mainToken], TODO>>; // TODO(koan) @koan-error

// Part 3: stringifying policy converts string and number keys but drops symbols.
type _Main09 = Expect<Equal<keyof StringifiedKeys<MainMixed>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<StringifiedKeys<MainMixed>["0"], TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainToken extends keyof StringifiedKeys<MainMixed> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<StringifiedKeys<{ 1: "one"; name: "n" }>, TODO>>; // TODO(koan) @koan-error

// Part 4: templates can derive callable APIs rather than copied values.
type _Main13 = Expect<Equal<keyof ChangeHandlers<MainModel>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Parameters<ChangeHandlers<MainModel>["onNameChange"]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ReturnType<ChangeHandlers<MainModel>["onActiveChange"]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ChangeHandlers<{ "": number }>, TODO>>; // TODO(koan) @koan-error

// Part 5: namespaces retain value correlation through dotted keys.
type _Main17 = Expect<Equal<Namespaced<MainModel, "user">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof Namespaced<MainModel, "user" | "admin">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Namespaced<MainModel, "user">["user.age"], TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Namespaced<MainMixed, "x">, TODO>>; // TODO(koan) @koan-error
