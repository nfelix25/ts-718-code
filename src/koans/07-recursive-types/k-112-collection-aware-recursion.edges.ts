import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-112 edge cases: collection-aware recursion
 * =============================================================================
 * Branch order prevents method-surface mapping. Key transformation can affect
 * Map identity semantics, readonly Map is only a capability view, Promise
 * assimilation flattens nested promises, and weak collections remain opaque.
 */

type EP = string | number | boolean | bigint | symbol | null | undefined;
type EA = EP | Date | RegExp | ((...args: any[]) => unknown) | WeakMap<object, unknown> | WeakSet<object>;
type EAny<T> = 0 extends (1 & T) ? true : false;
type ER<T> = EAny<T> extends true ? any : T extends EA ? T : T extends Promise<infer V> ? Promise<ER<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<ER<K>, ER<V>> : T extends ReadonlySet<infer V> ? ReadonlySet<ER<V>> : T extends readonly unknown[] ? number extends T["length"] ? readonly ER<T[number]>[] : { readonly [K in keyof T]: ER<T[K]> } : T extends object ? { readonly [K in keyof T]: ER<T[K]> } : T;
type EM<T> = EAny<T> extends true ? any : T extends EA ? T : T extends Promise<infer V> ? Promise<EM<V>> : T extends ReadonlyMap<infer K, infer V> ? Map<EM<K>, EM<V>> : T extends ReadonlySet<infer V> ? Set<EM<V>> : T extends readonly unknown[] ? number extends T["length"] ? EM<T[number]>[] : { -readonly [K in keyof T]: EM<T[K]> } : T extends object ? { -readonly [K in keyof T]: EM<T[K]> } : T;

// Collection branches replace mutating method surfaces with selected capabilities.
type _E01 = Expect<Equal<"set" extends keyof Map<string, number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<"set" extends keyof ER<Map<string, number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<"set" extends keyof EM<ReadonlyMap<string, number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<"add" extends keyof ER<Set<number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<"add" extends keyof EM<ReadonlySet<number>> ? true : false, TODO>>; // TODO(koan) @koan-error

// Recursive key transformation produces cloned key objects with new identity.
type Key = { id: number; nested: { active: boolean } };
type _E06 = Expect<Equal<ER<Map<Key, string>>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EM<ReadonlyMap<Readonly<Key>, string>>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ER<Map<Key, string>> extends ReadonlyMap<Readonly<Key>, string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<keyof ER<Key>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ER<Key>["nested"], TODO>>; // TODO(koan) @koan-error

// Promise inference assimilates nested promises to one fulfillment layer.
type _E11 = Expect<Equal<Promise<Promise<1>> extends Promise<infer V> ? V : never, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ER<Promise<Promise<{ id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Awaited<ER<Promise<Promise<{ id: number }>>>>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EM<Promise<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<Awaited<EM<Promise<readonly [1, 2]>>>, TODO>>; // TODO(koan) @koan-error

// Weak collections are identity leaves rather than enumerable transforms.
type WM = WeakMap<object, { readonly id: number }>;
type WS = WeakSet<object>;
type _E16 = Expect<Equal<ER<WM>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EM<WM>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ER<WS>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EM<WS>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<"set" extends keyof ER<WM> ? true : false, TODO>>; // TODO(koan) @koan-error

// Readonly collection views do not freeze the runtime collection object.
type _E21 = Expect<Equal<Map<string, number> extends ReadonlyMap<string, number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<ReadonlyMap<string, number> extends Map<string, number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<Set<number> extends ReadonlySet<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<ReadonlySet<number> extends Set<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<ER<Map<string, number>>, TODO>>; // TODO(koan) @koan-error

// Special types inside collections retain explicit behavior.
type _E26 = Expect<Equal<ER<Map<any, unknown>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EM<ReadonlySet<never>>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ER<Promise<any>> extends Promise<any> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EAny<ER<any>>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EM<never>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: mutable Map becomes a recursively readonly Map view.
type _DemoMap = Expect<Equal<ER<Map<string, { id: number }>>, ReadonlyMap<string, { readonly id: number }>>>;

// Pre-solved: readonly Set becomes mutable under the mutable transform.
type _DemoSet = Expect<Equal<EM<ReadonlySet<{ readonly id: number }>>, Set<{ id: number }>>>;

// Pre-solved: WeakMap remains opaque and retains its mutating method.
type _DemoWeak = Expect<Equal<ER<WM>, WM>>;

declare const readonlyMap: ER<Map<string, number>>;
// @ts-expect-error The readonly collection view omits Map.set.
readonlyMap.set("x", 1);
