import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 178 - SYMBOLS AS WEAK COLLECTION KEYS
 * ===========================================
 *
 * WeakMap and WeakSet originally accepted only objects because ordinary
 * primitive values can always be recreated. ES2023 also admits non-registered
 * symbols: each local symbol has unique identity, so once nobody can reach it,
 * its weak association can disappear too. TypeScript 5.2 updated `WeakKey` and
 * the collection declarations to represent this.
 *
 * Read `WeakMap<symbol, Value>` aloud as "associate values with symbol
 * identities without keeping those identities alive." Strings, numbers, and
 * other primitives still cannot be weak keys.
 *
 * One boundary is intentionally runtime-only. `Symbol.for("x")` uses a global
 * registry, so the runtime rejects it as a weak key. TypeScript represents both
 * registered and local values as symbol types and cannot prove their origin.
 * A registered symbol can therefore pass static checking and still throw.
 *
 * Feature ownership: TypeScript 5.2 library declarations for the ES2023 rule.
 *
 * Official sources:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#symbols-as-weakmap-and-weakset-keys
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
 */

export const localToken = Symbol("local-token");
export const secondToken = Symbol("second-token");
export const registeredToken = Symbol.for("koans.registered-token");

const descriptions = new WeakMap<WeakKey, string>();
const visited = new WeakSet<WeakKey>();

export function describeWeakly(key: WeakKey, description: string): void {
  descriptions.set(key, description);
}

export function readWeakDescription(key: WeakKey): string | undefined {
  return descriptions.get(key);
}

export function markVisited(key: WeakKey): void {
  visited.add(key);
}

export function wasVisited(key: WeakKey): boolean {
  return visited.has(key);
}

export type SymbolWeakMap = WeakMap<symbol, string>;
export type SymbolWeakSet = WeakSet<symbol>;
export type WeakSymbol = Extract<WeakKey, symbol>;
export type WeakObject = Extract<WeakKey, object>;

// Part 1: WeakKey is the admissible object-or-symbol key universe.
type _01 = Expect<Equal<WeakSymbol, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<WeakObject, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<WeakKey, string>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<object | symbol extends WeakKey ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 2: symbols can parameterize both weak collection families.
type _05 = Expect<Equal<SymbolWeakMap extends WeakMap<WeakKey, string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<SymbolWeakSet extends WeakSet<WeakKey> ? true : false, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<SymbolWeakMap["set"]>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<SymbolWeakSet["add"]>[0], TODO>>; // TODO(koan) @koan-error

// Part 3: local symbols retain unique static identities.
type _09 = Expect<Equal<typeof localToken extends symbol ? true : false, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof localToken extends typeof secondToken ? true : false, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof registeredToken extends symbol ? true : false, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof Symbol.keyFor>, TODO>>; // TODO(koan) @koan-error

// Part 4: helper signatures expose ordinary weak-map/set operations.
type _13 = Expect<Equal<Parameters<typeof describeWeakly>[0], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof describeWeakly>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof readWeakDescription>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof wasVisited>, TODO>>; // TODO(koan) @koan-error

// Part 5: unsuitable primitive types remain outside WeakKey.
type _17 = Expect<Equal<string extends WeakKey ? true : false, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<number extends WeakKey ? true : false, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<bigint extends WeakKey ? true : false, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<null extends WeakKey ? true : false, TODO>>; // TODO(koan) @koan-error
