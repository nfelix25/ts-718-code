import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-112: collection-aware recursion
 * =============================================================================
 *
 * Collection-aware transforms must branch on Map, Set, Promise, and arrays
 * before the generic object case. Otherwise the transform walks their method
 * surfaces instead of their contained key, value, or fulfillment domains.
 *
 * I read the Map branch aloud as "a readonly map whose keys and values are both
 * recursively readonly." A mutable transform instead reconstructs `Map` and
 * `Set`. Promise keeps its asynchronous container while transforming the value
 * it eventually produces. WeakMap and WeakSet are deliberately opaque because
 * their entries are not enumerable, so a general snapshot cannot traverse them.
 * Runtime snapshots clone iterable containers and preserve graph cycles.
 */

type CollectionPrimitive = string | number | boolean | bigint | symbol | null | undefined;
type CollectionCallable = (...args: any[]) => unknown;
type CollectionAtomic = CollectionPrimitive | Date | RegExp | CollectionCallable | WeakMap<object, unknown> | WeakSet<object>;
type CollectionIsAny<Value> = 0 extends (1 & Value) ? true : false;

export type CollectionReadonly<Value> = CollectionIsAny<Value> extends true
  ? any
  : Value extends CollectionAtomic
    ? Value
    : Value extends Promise<infer Fulfilled>
      ? Promise<CollectionReadonly<Fulfilled>>
      : Value extends ReadonlyMap<infer Key, infer Entry>
        ? ReadonlyMap<CollectionReadonly<Key>, CollectionReadonly<Entry>>
        : Value extends ReadonlySet<infer Entry>
          ? ReadonlySet<CollectionReadonly<Entry>>
          : Value extends readonly unknown[]
            ? number extends Value["length"]
              ? readonly CollectionReadonly<Value[number]>[]
              : { readonly [Key in keyof Value]: CollectionReadonly<Value[Key]> }
            : Value extends object
              ? { readonly [Key in keyof Value]: CollectionReadonly<Value[Key]> }
              : Value;

export type CollectionMutable<Value> = CollectionIsAny<Value> extends true
  ? any
  : Value extends CollectionAtomic
    ? Value
    : Value extends Promise<infer Fulfilled>
      ? Promise<CollectionMutable<Fulfilled>>
      : Value extends ReadonlyMap<infer Key, infer Entry>
        ? Map<CollectionMutable<Key>, CollectionMutable<Entry>>
        : Value extends ReadonlySet<infer Entry>
          ? Set<CollectionMutable<Entry>>
          : Value extends readonly unknown[]
            ? number extends Value["length"]
              ? CollectionMutable<Value[number]>[]
              : { -readonly [Key in keyof Value]: CollectionMutable<Value[Key]> }
            : Value extends object
              ? { -readonly [Key in keyof Value]: CollectionMutable<Value[Key]> }
              : Value;

function snapshot(value: unknown, readonlyView: boolean, seen: WeakMap<object, unknown>): unknown {
  if (value === null || (typeof value !== "object" && typeof value !== "function")) return value;
  if (value instanceof Date || value instanceof RegExp || value instanceof WeakMap || value instanceof WeakSet || typeof value === "function") return value;
  if (value instanceof Promise) return value.then((entry) => snapshot(entry, readonlyView, seen));
  if (seen.has(value)) return seen.get(value);
  if (value instanceof Map) {
    const result = new Map<unknown, unknown>();
    seen.set(value, result);
    for (const [key, entry] of value) result.set(snapshot(key, readonlyView, seen), snapshot(entry, readonlyView, seen));
    return result;
  }
  if (value instanceof Set) {
    const result = new Set<unknown>();
    seen.set(value, result);
    for (const entry of value) result.add(snapshot(entry, readonlyView, seen));
    return result;
  }
  if (Array.isArray(value)) {
    const result: unknown[] = [];
    seen.set(value, result);
    for (const entry of value) result.push(snapshot(entry, readonlyView, seen));
    return readonlyView ? Object.freeze(result) : result;
  }
  const result: Record<PropertyKey, unknown> = {};
  seen.set(value, result);
  for (const key of Reflect.ownKeys(value)) result[key] = snapshot(Reflect.get(value, key), readonlyView, seen);
  return readonlyView ? Object.freeze(result) : result;
}

export function readonlySnapshot<Value>(value: Value): CollectionReadonly<Value> {
  return snapshot(value, true, new WeakMap()) as CollectionReadonly<Value>;
}

export function mutableSnapshot<Value>(value: Value): CollectionMutable<Value> {
  return snapshot(value, false, new WeakMap()) as CollectionMutable<Value>;
}

// Part 1: Map keys and values recurse through their declared domains.
type _Main01 = Expect<Equal<CollectionReadonly<Map<string, { count: number }>>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<CollectionReadonly<ReadonlyMap<{ id: number }, string[]>>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<CollectionMutable<ReadonlyMap<string, readonly { readonly id: number }[]>>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<CollectionMutable<Map<readonly [1, 2], { readonly value: string }>>, TODO>>; // TODO(koan) @koan-error

// Part 2: Set elements recurse and output capability follows the transform.
type _Main05 = Expect<Equal<CollectionReadonly<Set<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<CollectionReadonly<ReadonlySet<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<CollectionMutable<ReadonlySet<{ readonly id: number }>>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<"add" extends keyof CollectionReadonly<Set<number>> ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 3: Promise retains its container and transforms its fulfillment value.
type _Main09 = Expect<Equal<CollectionReadonly<Promise<{ items: Map<string, { id: number }> }>>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<CollectionMutable<Promise<readonly [{ readonly id: number }]>>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Awaited<CollectionReadonly<Promise<{ id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Awaited<CollectionMutable<Promise<readonly [1, 2]>>>, TODO>>; // TODO(koan) @koan-error

// Part 4: ordinary arrays and objects compose with nested collections.
type MainGraph = { cache: Map<string, Set<{ id: number }>>; pending: Promise<readonly { id: number }[]> };
type _Main13 = Expect<Equal<CollectionReadonly<MainGraph>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<CollectionMutable<CollectionReadonly<MainGraph>>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<CollectionReadonly<readonly [Map<string, number>, Set<boolean>]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<CollectionMutable<readonly [ReadonlyMap<string, number>, ReadonlySet<boolean>]>, TODO>>; // TODO(koan) @koan-error

// Part 5: snapshot APIs expose the selected collection capability.
type _Main17 = Expect<Equal<ReturnType<typeof readonlySnapshot<Map<string, { id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof mutableSnapshot<ReadonlySet<{ readonly id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof readonlySnapshot<Promise<{ id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof mutableSnapshot<readonly [1, { readonly id: number }]>>, TODO>>; // TODO(koan) @koan-error
