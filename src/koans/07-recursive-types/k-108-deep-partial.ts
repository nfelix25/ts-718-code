import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-108: DeepPartial
 * =============================================================================
 *
 * `Partial<T>` changes only T's immediate properties. `DeepPartial<T>` repeats
 * that operation through the data containers selected by its leaf policy. Plain
 * object properties become optional, tuple positions become optional while
 * keeping tuple identity, and array element values are transformed without
 * pretending array indices are optional object fields.
 *
 * I read the object branch aloud as "for each existing key, the key may be
 * omitted; if present, recursively partialize its value." Atomic built-ins stop
 * before the object branch. Mutable and readonly arrays need separate outputs.
 * This utility models patch-shaped data, not a universally correct merge
 * algorithm; runtime code must specify whether arrays replace, append, or merge.
 */

type DeepPartialPrimitive = string | number | boolean | bigint | symbol | null | undefined;
type DeepPartialCallable = (...args: any[]) => unknown;
type DeepPartialAtomic = DeepPartialPrimitive | Date | RegExp | DeepPartialCallable | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type DeepPartialIsAny<Value> = 0 extends (1 & Value) ? true : false;

export type DeepPartial<Value> = DeepPartialIsAny<Value> extends true
  ? any
  : Value extends DeepPartialAtomic
    ? Value
    : Value extends readonly unknown[]
      ? number extends Value["length"]
        ? Value extends unknown[]
          ? DeepPartial<Value[number]>[]
          : readonly DeepPartial<Value[number]>[]
        : { [Key in keyof Value]?: DeepPartial<Value[Key]> }
      : Value extends object
        ? { [Key in keyof Value]?: DeepPartial<Value[Key]> }
        : Value;

function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
  if (value === null || typeof value !== "object") return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function applyPatch<Value>(base: Value, patch: DeepPartial<Value>): Value {
  if (!isPlainObject(base) || !isPlainObject(patch)) return patch as Value;
  const result: Record<PropertyKey, unknown> = { ...base };
  for (const key of Reflect.ownKeys(patch)) {
    const next = patch[key];
    result[key] = isPlainObject(result[key]) && isPlainObject(next)
      ? applyPatch(result[key], next)
      : next;
  }
  return result as Value;
}

export interface Settings {
  readonly account: {
    readonly name: string;
    readonly contact: { readonly email: string; readonly phone?: string };
  };
  readonly theme: { readonly mode: "light" | "dark"; readonly contrast: number };
  readonly tags: readonly string[];
}

export function updateSettings(settings: Settings, patch: DeepPartial<Settings>): Settings {
  return applyPatch<Settings>(settings, patch);
}

// Part 1: primitive and declared atomic leaves remain unchanged.
type _Main01 = Expect<Equal<DeepPartial<string>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<DeepPartial<Date>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<DeepPartial<(value: number) => string>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<DeepPartial<Map<string, number>>, TODO>>; // TODO(koan) @koan-error

// Part 2: nested object properties become optional at every level.
type MainProfile = { id: number; profile: { name: string; address: { city: string; zip: number } } };
type _Main05 = Expect<Equal<DeepPartial<MainProfile>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<DeepPartial<MainProfile>["profile"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<NonNullable<DeepPartial<MainProfile>["profile"]>["address"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<NonNullable<NonNullable<DeepPartial<MainProfile>["profile"]>["address"]>["zip"], TODO>>; // TODO(koan) @koan-error

// Part 3: array elements recurse while array capability is preserved.
type _Main09 = Expect<Equal<DeepPartial<Array<{ id: number; meta: { active: boolean } }>>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<DeepPartial<readonly { id: number }[]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<DeepPartial<readonly [{ id: number }, { name: string }]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<DeepPartial<[first: { id: number }, second: string]>, TODO>>; // TODO(koan) @koan-error

// Part 4: unions and existing optionality transform member by member.
type MainState = { kind: "idle" } | { kind: "ready"; data: { value: number } };
type _Main13 = Expect<Equal<DeepPartial<MainState>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<DeepPartial<{ value?: { nested: string } }>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<DeepPartial<never>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<DeepPartial<unknown>, TODO>>; // TODO(koan) @koan-error

// Part 5: the patch boundary accepts sparse nested data and returns the base type.
type _Main17 = Expect<Equal<Parameters<typeof updateSettings>[1], TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof updateSettings>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Parameters<typeof applyPatch<MainProfile>>[1], TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof applyPatch<MainProfile>>, TODO>>; // TODO(koan) @koan-error
