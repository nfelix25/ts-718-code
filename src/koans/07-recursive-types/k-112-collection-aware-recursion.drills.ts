import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-112 guided drills: collection-aware recursion
 * =============================================================================
 * Match specialized collections before object. Transform contained domains and
 * reconstruct the intended readonly or mutable capability at each container.
 */

type DP = string | number | boolean | bigint | symbol | null | undefined;
type DF = (...args: any[]) => unknown;
type DA = DP | Date | RegExp | DF | WeakMap<object, unknown> | WeakSet<object>;
type DAny<T> = 0 extends (1 & T) ? true : false;
type DR<T> = DAny<T> extends true ? any : T extends DA ? T : T extends Promise<infer V> ? Promise<DR<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DR<K>, DR<V>> : T extends ReadonlySet<infer V> ? ReadonlySet<DR<V>> : T extends readonly unknown[] ? number extends T["length"] ? readonly DR<T[number]>[] : { readonly [K in keyof T]: DR<T[K]> } : T extends object ? { readonly [K in keyof T]: DR<T[K]> } : T;
type DM<T> = DAny<T> extends true ? any : T extends DA ? T : T extends Promise<infer V> ? Promise<DM<V>> : T extends ReadonlyMap<infer K, infer V> ? Map<DM<K>, DM<V>> : T extends ReadonlySet<infer V> ? Set<DM<V>> : T extends readonly unknown[] ? number extends T["length"] ? DM<T[number]>[] : { -readonly [K in keyof T]: DM<T[K]> } : T extends object ? { -readonly [K in keyof T]: DM<T[K]> } : T;

// Map transforms key and value domains independently.
type _D01 = Expect<Equal<DR<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DR<ReadonlyMap<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DM<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DM<ReadonlyMap<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DR<Map<{ id: number }, { value: string }>>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DM<ReadonlyMap<{ readonly id: number }, { readonly value: string }>>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DR<Map<readonly [1, 2], readonly string[]>>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DM<ReadonlyMap<readonly [1, 2], readonly string[]>>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DR<Map<string, Map<number, { id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DM<ReadonlyMap<string, ReadonlyMap<number, { readonly id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<"set" extends keyof DR<Map<string, number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<"set" extends keyof DM<ReadonlyMap<string, number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DR<Map<never, string>>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DR<Map<unknown, string>>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DM<ReadonlyMap<string, never>>, TODO>>; // TODO(koan) @koan-error

// Set transforms one contained value domain and selects output capability.
type _D16 = Expect<Equal<DR<Set<number>>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DR<ReadonlySet<number>>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DM<Set<number>>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DM<ReadonlySet<number>>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DR<Set<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DM<ReadonlySet<{ readonly id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DR<Set<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DM<ReadonlySet<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DR<Set<Set<{ id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DM<ReadonlySet<ReadonlySet<{ readonly id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<"add" extends keyof DR<Set<number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<"add" extends keyof DM<ReadonlySet<number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DR<Set<never>>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DR<Set<unknown>>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DM<ReadonlySet<string | number>>, TODO>>; // TODO(koan) @koan-error

// Promise transforms the fulfillment domain while retaining Promise.
type _D31 = Expect<Equal<DR<Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DM<Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DR<Promise<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DM<Promise<{ readonly id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DR<Promise<readonly [1, { id: number }]>>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DM<Promise<readonly [1, { readonly id: number }]>>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DR<Promise<Map<string, { id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DM<Promise<ReadonlyMap<string, { readonly id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<Awaited<DR<Promise<{ id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<Awaited<DM<Promise<{ readonly id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DR<Promise<never>>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DR<Promise<unknown>>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DM<Promise<string | number>>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DR<Promise<readonly string[]>>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DM<Promise<readonly string[]>>, TODO>>; // TODO(koan) @koan-error

// Collections compose inside objects, arrays, tuples, and each other.
type Graph = { cache: Map<string, Set<{ id: number }>>; pending: Promise<readonly { id: number }[]> };
type _D46 = Expect<Equal<DR<Graph>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DM<DR<Graph>>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DR<readonly [Map<string, number>, Set<boolean>]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DM<readonly [ReadonlyMap<string, number>, ReadonlySet<boolean>]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DR<Array<Map<string, { id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DM<readonly ReadonlySet<{ readonly id: number }>[]>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DR<Map<string, Promise<Set<{ id: number }>>>>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DM<ReadonlyMap<string, Promise<ReadonlySet<{ readonly id: number }>>>>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DR<never>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DM<unknown>, TODO>>; // TODO(koan) @koan-error

// Weak collections remain opaque because their entries cannot be enumerated.
type _D56 = Expect<Equal<DR<WeakMap<object, { id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DM<WeakMap<object, { readonly id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DR<WeakSet<object>>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DM<WeakSet<object>>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DAny<DR<any>>, TODO>>; // TODO(koan) @koan-error
