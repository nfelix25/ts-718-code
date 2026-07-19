import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-111: DeepMutable
 * =============================================================================
 *
 * `DeepMutable<T>` recursively removes readonly modifiers without changing
 * whether properties or tuple positions are optional. Readonly arrays become
 * mutable arrays of recursively mutable elements; finite tuples retain their
 * cardinality and labels while every level regains write capability.
 *
 * I read the mapped object branch aloud as "keep every key and its presence
 * rule, remove readonly from that key, and recursively make its value mutable."
 * Mutability is still a type capability. A runtime clone is needed to avoid
 * writing through aliases to the original graph. This lesson clones plain
 * objects and arrays, while opaque built-ins remain shared leaves by policy.
 */

type DeepMutablePrimitive = string | number | boolean | bigint | symbol | null | undefined;
type DeepMutableCallable = (...args: any[]) => unknown;
type DeepMutableAtomic = DeepMutablePrimitive | Date | RegExp | DeepMutableCallable | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type DeepMutableIsAny<Value> = 0 extends (1 & Value) ? true : false;

export type DeepMutable<Value> = DeepMutableIsAny<Value> extends true
  ? any
  : Value extends DeepMutableAtomic
    ? Value
    : Value extends readonly unknown[]
      ? number extends Value["length"]
        ? DeepMutable<Value[number]>[]
        : { -readonly [Key in keyof Value]: DeepMutable<Value[Key]> }
      : Value extends object
        ? { -readonly [Key in keyof Value]: DeepMutable<Value[Key]> }
        : Value;

function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function cloneMutable<Value>(value: Value, seen = new WeakMap<object, unknown>()): DeepMutable<Value> {
  if (Array.isArray(value)) {
    if (seen.has(value)) return seen.get(value) as DeepMutable<Value>;
    const result: unknown[] = [];
    seen.set(value, result);
    for (const entry of value) result.push(cloneMutable(entry, seen));
    return result as DeepMutable<Value>;
  }
  if (isPlainObject(value)) {
    if (seen.has(value)) return seen.get(value) as DeepMutable<Value>;
    const result: Record<PropertyKey, unknown> = {};
    seen.set(value, result);
    for (const key of Reflect.ownKeys(value)) result[key] = cloneMutable(value[key], seen);
    return result as DeepMutable<Value>;
  }
  return value as DeepMutable<Value>;
}

export interface FrozenSettings {
  readonly account: { readonly name: string; readonly contact?: { readonly email: string } };
  readonly tags: readonly string[];
  readonly coordinates: readonly [x: number, y: number];
}

export function thawSettings(settings: FrozenSettings): DeepMutable<FrozenSettings> {
  return cloneMutable(settings);
}

// Part 1: atomic leaves retain their full identity.
type _Main01 = Expect<Equal<DeepMutable<string>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<DeepMutable<Date>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<DeepMutable<(value: number) => string>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<DeepMutable<Map<string, number>>, TODO>>; // TODO(koan) @koan-error

// Part 2: readonly object properties become writable at every level.
type MainFrozen = { readonly id: number; readonly profile: { readonly name: string; readonly address: { readonly city: string } } };
type _Main05 = Expect<Equal<DeepMutable<MainFrozen>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<DeepMutable<MainFrozen>["profile"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<DeepMutable<MainFrozen>["profile"]["address"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<DeepMutable<MainFrozen>["profile"]["address"]["city"], TODO>>; // TODO(koan) @koan-error

// Part 3: optional presence stays optional while its value becomes mutable.
type _Main09 = Expect<Equal<DeepMutable<{ readonly value?: string }>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<DeepMutable<{ readonly nested?: { readonly value: number } }>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<DeepMutable<{ readonly value: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<{} extends DeepMutable<{ readonly value?: string }> ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 4: readonly arrays and tuples become mutable recursive containers.
type _Main13 = Expect<Equal<DeepMutable<readonly { readonly id: number }[]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<DeepMutable<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<DeepMutable<readonly [first: { readonly id: number }, second?: string]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<"push" extends keyof DeepMutable<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 5: cloning returns a mutable graph with the same value structure.
type _Main17 = Expect<Equal<Parameters<typeof cloneMutable<MainFrozen>>[0], TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof cloneMutable<MainFrozen>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof thawSettings>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof thawSettings>["coordinates"], TODO>>; // TODO(koan) @koan-error
