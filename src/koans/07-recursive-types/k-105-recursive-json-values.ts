import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-105: recursive JSON values
 * =============================================================================
 *
 * JSON is a mutually recursive data model. A value is a primitive, an array of
 * JSON values, or a string-keyed object whose properties are JSON values. Each
 * container returns to the same value alias; primitives are the base cases.
 *
 * I read the object branch aloud as "for every string key that exists, its value
 * must itself be JSON." The static type excludes undefined, bigint, symbol, and
 * functions, but `number` still includes NaN and Infinity, and structural types
 * cannot prove acyclicity, dense arrays, plain prototypes, or runtime provenance.
 * A boundary validator must enforce those semantic constraints before parsing
 * unknown input as trusted JSON data.
 */

export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export interface JsonObject {
  readonly [key: string]: JsonValue;
}

export interface JsonArray extends ReadonlyArray<JsonValue> {}

export function isJsonValue(value: unknown, seen = new Set<object>()): value is JsonValue {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "object") return false;
  if (seen.has(value)) return false;
  seen.add(value);

  if (Array.isArray(value)) {
    let valid = true;
    for (let index = 0; index < value.length; index += 1) {
      if (!(index in value) || !isJsonValue(value[index], seen)) {
        valid = false;
        break;
      }
    }
    seen.delete(value);
    return valid;
  }

  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    seen.delete(value);
    return false;
  }
  const valid = Reflect.ownKeys(value).every((key) =>
    typeof key === "string"
    && Object.prototype.propertyIsEnumerable.call(value, key)
    && isJsonValue((value as Record<string, unknown>)[key], seen));
  seen.delete(value);
  return valid;
}

export function stringifyJson(value: JsonValue): string {
  return JSON.stringify(value);
}

export function parseJson(text: string): JsonValue {
  const value: unknown = JSON.parse(text);
  if (!isJsonValue(value)) throw new TypeError("Parsed value is not strict JSON data");
  return value;
}

export function cloneJson<Value extends JsonValue>(value: Value): Value {
  return parseJson(stringifyJson(value)) as Value;
}

// Part 1: JSON primitives are the recursive model's base cases.
type _Main01 = Expect<Equal<string extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<number extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<boolean extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<null extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 2: unsupported JavaScript values are outside the static model.
type _Main05 = Expect<Equal<undefined extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<bigint extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<symbol extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<(() => void) extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 3: arrays recurse through every element.
type _Main09 = Expect<Equal<readonly [1, "x", true, null] extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<readonly [1, readonly [2, readonly [3]]] extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<readonly [undefined] extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<JsonArray[number], TODO>>; // TODO(koan) @koan-error

// Part 4: object property values recurse under string keys.
type MainObject = { name: "Ada"; stats: { score: 42 }; tags: readonly ["ts"] };
type _Main13 = Expect<Equal<MainObject extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<{ value: undefined } extends JsonValue ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<JsonObject[string], TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<keyof JsonObject, TODO>>; // TODO(koan) @koan-error

// Part 5: runtime boundaries validate unknown before returning JsonValue.
type _Main17 = Expect<Equal<Parameters<typeof isJsonValue>[0], TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof parseJson>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Parameters<typeof stringifyJson>[0], TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof cloneJson<readonly [1, { readonly ok: true }]>>, TODO>>; // TODO(koan) @koan-error
