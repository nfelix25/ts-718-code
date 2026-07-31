import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type SymbolWeakMap,
  type WeakSymbol,
  localToken,
  registeredToken,
} from "./k-178-symbols-as-weak-collection-keys.js";

/** EDGE CASES: the type system cannot distinguish registered symbol provenance, weak collections are non-enumerable and non-sized, object and symbol keys coexist, unique identities remain distinct, and top/bottom types interact with WeakKey constraints. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;

// Pre-solved demonstrations establish the static/runtime mismatch.
type _DemoRegisteredIsSymbol = Expect<Equal<typeof registeredToken extends symbol ? true : false, true>>;
type _DemoRegisteredPassesStaticKey = Expect<Equal<typeof registeredToken extends WeakKey ? true : false, true>>;
type _DemoNoEnumeration = Expect<Equal<"keys" extends keyof SymbolWeakMap ? true : false, false>>;
type _DemoNoSize = Expect<Equal<"size" extends keyof SymbolWeakMap ? true : false, false>>;

// 1. Registration provenance is not represented in the symbol type (1-8)
type _01 = Expect<Equal<ReturnType<typeof Symbol.for>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<typeof Symbol>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<typeof registeredToken, symbol>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<typeof registeredToken, WeakKey>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<typeof localToken, WeakKey>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof Symbol.keyFor>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<ReturnType<typeof Symbol.keyFor>, undefined>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Exclude<ReturnType<typeof Symbol.keyFor>, undefined>, TODO>>; // TODO(koan) @koan-error

// 2. Weak collections deliberately expose no enumeration or size (9-15)
type _09 = Expect<Equal<"keys" extends keyof SymbolWeakMap ? true : false, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<"values" extends keyof SymbolWeakMap ? true : false, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<"entries" extends keyof SymbolWeakMap ? true : false, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<"size" extends keyof SymbolWeakMap ? true : false, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<"get" extends keyof SymbolWeakMap ? true : false, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<"set" extends keyof SymbolWeakMap ? true : false, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<"delete" extends keyof WeakSet<symbol> ? true : false, TODO>>; // TODO(koan) @koan-error

// 3. Unique identity and mixed admissible keys (16-22)
declare const other: unique symbol;
type _16 = Expect<Equal<Extends<typeof localToken, typeof other>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<typeof localToken, symbol>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<symbol, typeof localToken>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<WeakSymbol, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<WeakKey, object>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<WeakMap<object | symbol, number> extends WeakMap<WeakKey, number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Parameters<WeakMap<WeakKey, number>["set"]>[0], TODO>>; // TODO(koan) @koan-error

// 4. Top and bottom types can obscure the useful key boundary (23-30)
type _23 = Expect<Equal<IsNever<Extract<WeakKey, string>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<IsNever<Extract<WeakKey, never>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<unknown, WeakKey>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<never, WeakKey>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<IsAny<Extract<WeakKey, any>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<symbol | string, WeakKey>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<object | symbol, WeakKey>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<WeakKey, PropertyKey>, TODO>>; // TODO(koan) @koan-error
