import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-110: DeepRequired
 * =============================================================================
 *
 * `Required<T>` removes optional modifiers from one object layer.
 * `DeepRequired<T>` repeats that presence guarantee through selected data
 * containers. It does not remove an explicitly declared `| undefined`; it only
 * removes the ability to omit a property or tuple position.
 *
 * I read the mapped branch aloud as "every existing key must be present, and
 * its value is recursively required." Homomorphic mapping preserves readonly
 * while `-?` removes optionality. Broad arrays keep their mutable or readonly
 * capability and transform elements; finite optional tuple positions become
 * required positions. Runtime completion needs a defaults graph because types
 * alone cannot synthesize values for missing keys.
 */

type DeepRequiredPrimitive = string | number | boolean | bigint | symbol | null | undefined;
type DeepRequiredCallable = (...args: any[]) => unknown;
type DeepRequiredAtomic = DeepRequiredPrimitive | Date | RegExp | DeepRequiredCallable | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type DeepRequiredIsAny<Value> = 0 extends (1 & Value) ? true : false;

export type DeepRequired<Value> = DeepRequiredIsAny<Value> extends true
  ? any
  : Value extends DeepRequiredAtomic
    ? Value
    : Value extends readonly unknown[]
      ? number extends Value["length"]
        ? Value extends unknown[]
          ? DeepRequired<Value[number]>[]
          : readonly DeepRequired<Value[number]>[]
        : { [Key in keyof Value]-?: DeepRequired<Value[Key]> }
      : Value extends object
        ? { [Key in keyof Value]-?: DeepRequired<Value[Key]> }
        : Value;

function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function fillDefaults<Value>(value: Value, defaults: DeepRequired<Value>): DeepRequired<Value> {
  if (!isPlainObject(defaults)) return (value === undefined ? defaults : value) as DeepRequired<Value>;
  const source: Record<PropertyKey, unknown> = isPlainObject(value) ? value : {};
  const result: Record<PropertyKey, unknown> = {};
  for (const key of Reflect.ownKeys(defaults)) {
    result[key] = fillDefaults(source[key], defaults[key] as never);
  }
  return result as DeepRequired<Value>;
}

export interface DraftOptions {
  server?: {
    host?: string;
    port?: number;
    tls?: { enabled?: boolean; certificate?: string | undefined };
  };
  logging?: { level?: "debug" | "info" | "error"; outputs?: string[] };
}

export function completeOptions(
  options: DraftOptions,
  defaults: DeepRequired<DraftOptions>,
): DeepRequired<DraftOptions> {
  return fillDefaults<DraftOptions>(options, defaults);
}

// Part 1: atomic leaves retain their value domains.
type _Main01 = Expect<Equal<DeepRequired<string>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<DeepRequired<undefined>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<DeepRequired<Date>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<DeepRequired<(value?: number) => string>, TODO>>; // TODO(koan) @koan-error

// Part 2: nested object keys become required at every level.
type MainDraft = { user?: { name?: string; address?: { city?: string; zip?: number } } };
type _Main05 = Expect<Equal<DeepRequired<MainDraft>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<DeepRequired<MainDraft>["user"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<DeepRequired<MainDraft>["user"]["address"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<DeepRequired<MainDraft>["user"]["address"]["zip"], TODO>>; // TODO(koan) @koan-error

// Part 3: explicit undefined survives while optional absence does not.
type _Main09 = Expect<Equal<DeepRequired<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<DeepRequired<{ value?: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<DeepRequired<{ value: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<DeepRequired<{ nested?: { value?: number | undefined } }>, TODO>>; // TODO(koan) @koan-error

// Part 4: arrays retain capability and optional tuple positions become required.
type _Main13 = Expect<Equal<DeepRequired<Array<{ id?: number }>>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<DeepRequired<readonly { id?: number }[]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<DeepRequired<[first?: { id?: number }, second?: string]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<DeepRequired<readonly [first?: { id?: number }]>, TODO>>; // TODO(koan) @koan-error

// Part 5: defaults convert a draft graph into its required counterpart.
type _Main17 = Expect<Equal<Parameters<typeof completeOptions>[0], TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Parameters<typeof completeOptions>[1], TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof completeOptions>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof completeOptions>["server"]["tls"]["certificate"], TODO>>; // TODO(koan) @koan-error
