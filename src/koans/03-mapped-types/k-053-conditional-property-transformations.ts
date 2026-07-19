import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-053: conditional property transformations
 * =============================================================================
 *
 * A mapped value expression can branch on `T[K]`. This keeps every source key
 * while choosing a new value type for that property: scalars can become text,
 * functions can become async functions, arrays can become element metadata,
 * and unmatched values can pass through unchanged.
 *
 * I read the basic form aloud as:
 *
 *   "For each key K, if the complete property type T[K] satisfies this test,
 *    emit the transformed value; otherwise emit the fallback value."
 *
 * Placement matters. `T[K] extends string` is not a naked type parameter, so a
 * `string | number` property is tested as one whole union and fails. A helper
 * `Transform<V> = V extends string ? ... : ...` receives the union through naked
 * V and distributes, transforming only its string member. Optional reads add
 * undefined to the tested value. Mapped modifiers still follow the source unless
 * explicitly changed. Returning `never` as a value keeps the key with an
 * uninhabitable value; filtering a key requires `never` in the `as` clause.
 */

export type StringifyValue<Value> =
  Value extends string | number | boolean ? string : Value;

export type StringifiedProperties<T> = {
  [K in keyof T]: StringifyValue<T[K]>
};

export type WholeStringCheck<T> = {
  [K in keyof T]: T[K] extends string ? "text" : T[K]
};

export type AsyncMethods<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Result
    ? (...args: Args) => Promise<Awaited<Result>>
    : T[K]
};

export type OnlyAsyncMethods<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]:
    T[K] extends (...args: infer Args) => infer Result
      ? (...args: Args) => Promise<Awaited<Result>>
      : never
};

export function stringifyPrimitiveProperties<T extends Record<string, unknown>>(value: T): StringifiedProperties<T> {
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [
    key,
    typeof entry === "string" || typeof entry === "number" || typeof entry === "boolean" ? String(entry) : entry,
  ])) as StringifiedProperties<T>;
}

export function asyncMethods<T extends Record<string, unknown>>(value: T): AsyncMethods<T> {
  const result: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    result[key] = typeof entry === "function"
      ? (...args: unknown[]) => Promise.resolve(Reflect.apply(entry, value, args))
      : entry;
  }
  return result as AsyncMethods<T>;
}

interface MainModel { id: number; name: string; active: boolean; created: Date }

// Part 1: A helper conditional transforms matching scalar property values.
type MainStringified = StringifiedProperties<MainModel>;
type _Main01 = Expect<Equal<MainStringified, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainStringified["id"], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainStringified["created"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<keyof MainStringified, TODO>>; // TODO(koan) @koan-error

// Part 2: Keys and modifiers survive while value expressions change.
interface MainModified { readonly id: number; label?: string; payload: object }
type MainModifiedResult = StringifiedProperties<MainModified>;
type _Main05 = Expect<Equal<MainModifiedResult, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainModifiedResult["label"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Required<MainModifiedResult>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<keyof MainModifiedResult, TODO>>; // TODO(koan) @koan-error

// Part 3: Inline indexed checks and helper checks treat unions differently.
interface MainUnionValue { value: string | number; text: string; count: number }
type MainWhole = WholeStringCheck<MainUnionValue>;
type MainDistributed = StringifiedProperties<MainUnionValue>;
type _Main09 = Expect<Equal<MainWhole, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<MainWhole["value"], TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainDistributed, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<MainDistributed["value"], TODO>>; // TODO(koan) @koan-error

// Part 4: Conditional branches can rebuild callable property signatures.
interface MainService { version: string; load(id: number): string; save(value: string): Promise<boolean> }
type MainAsync = AsyncMethods<MainService>;
type _Main13 = Expect<Equal<MainAsync, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Parameters<MainAsync["load"]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ReturnType<MainAsync["load"]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ReturnType<MainAsync["save"]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Value-never keeps a key; destination-never filters it.
type MainNeverValues = { [K in keyof MainModel]: MainModel[K] extends Date ? never : MainModel[K] };
type MainMethodsOnly = OnlyAsyncMethods<MainService>;
type _Main17 = Expect<Equal<keyof MainNeverValues, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainNeverValues["created"], TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainMethodsOnly, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<keyof MainMethodsOnly, TODO>>; // TODO(koan) @koan-error
