import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-109: DeepReadonly
 * =============================================================================
 *
 * `Readonly<T>` removes writes from one property layer. `DeepReadonly<T>` repeats
 * that capability restriction through chosen data containers. Object keys and
 * finite tuple positions become readonly, mutable arrays become readonly arrays,
 * and nested values are transformed before being exposed.
 *
 * I read the object branch aloud as "for each property already in T, expose a
 * readonly property whose value is recursively readonly." This is a compile-time
 * view, not runtime freezing. A separate `deepFreeze` operation can freeze plain
 * objects and arrays. Opaque Date, Map, Set, Promise, RegExp, and function leaves
 * are preserved by this lesson's policy, so their internal mutation semantics do
 * not disappear merely because an outer property is readonly.
 */

type DeepReadonlyPrimitive = string | number | boolean | bigint | symbol | null | undefined;
type DeepReadonlyCallable = (...args: any[]) => unknown;
type DeepReadonlyAtomic = DeepReadonlyPrimitive | Date | RegExp | DeepReadonlyCallable | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type DeepReadonlyIsAny<Value> = 0 extends (1 & Value) ? true : false;

export type DeepReadonly<Value> = DeepReadonlyIsAny<Value> extends true
  ? any
  : Value extends DeepReadonlyAtomic
    ? Value
    : Value extends readonly unknown[]
      ? number extends Value["length"]
        ? readonly DeepReadonly<Value[number]>[]
        : { readonly [Key in keyof Value]: DeepReadonly<Value[Key]> }
      : Value extends object
        ? { readonly [Key in keyof Value]: DeepReadonly<Value[Key]> }
        : Value;

function isFreezableContainer(value: unknown): value is Record<PropertyKey, unknown> | unknown[] {
  if (Array.isArray(value)) return true;
  if (value === null || typeof value !== "object") return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function deepFreeze<Value>(value: Value, seen = new WeakSet<object>()): DeepReadonly<Value> {
  if (!isFreezableContainer(value)) return value as DeepReadonly<Value>;
  if (seen.has(value)) return value as DeepReadonly<Value>;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) deepFreeze(Reflect.get(value, key), seen);
  return Object.freeze(value) as DeepReadonly<Value>;
}

export interface ReadonlySettings {
  account: { name: string; contact: { email: string; phone?: string } };
  theme: { mode: "light" | "dark"; contrast: number };
  tags: string[];
}

export function freezeSettings(settings: ReadonlySettings): DeepReadonly<ReadonlySettings> {
  return deepFreeze(settings);
}

// Part 1: atomic leaves retain their complete identity.
type _Main01 = Expect<Equal<DeepReadonly<string>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<DeepReadonly<Date>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<DeepReadonly<(value: number) => string>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<DeepReadonly<Map<string, number>>, TODO>>; // TODO(koan) @koan-error

// Part 2: nested object properties lose write capability at every layer.
type MainProfile = { id: number; profile: { name: string; address: { city: string; zip: number } } };
type _Main05 = Expect<Equal<DeepReadonly<MainProfile>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<DeepReadonly<MainProfile>["profile"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<DeepReadonly<MainProfile>["profile"]["address"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<DeepReadonly<MainProfile>["profile"]["address"]["zip"], TODO>>; // TODO(koan) @koan-error

// Part 3: arrays and tuples expose readonly recursive values.
type _Main09 = Expect<Equal<DeepReadonly<Array<{ id: number; meta: { active: boolean } }>>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<DeepReadonly<readonly { id: number }[]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<DeepReadonly<[{ id: number }, { name: string }]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<DeepReadonly<[first: { id: number }, second?: string]>, TODO>>; // TODO(koan) @koan-error

// Part 4: unions and existing modifiers are preserved member by member.
type MainState = { kind: "idle" } | { kind: "ready"; data: { value: number } };
type _Main13 = Expect<Equal<DeepReadonly<MainState>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<DeepReadonly<{ readonly value?: { nested: string } }>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<DeepReadonly<never>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<DeepReadonly<unknown>, TODO>>; // TODO(koan) @koan-error

// Part 5: deepFreeze returns the recursive readonly view.
type _Main17 = Expect<Equal<Parameters<typeof deepFreeze<MainProfile>>[0], TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof deepFreeze<MainProfile>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof freezeSettings>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof freezeSettings>["tags"], TODO>>; // TODO(koan) @koan-error
