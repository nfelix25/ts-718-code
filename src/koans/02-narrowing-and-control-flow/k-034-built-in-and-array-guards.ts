import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-034: built-in and array guards
 * =============================================================================
 *
 * JavaScript exposes several runtime classifiers whose library declarations
 * participate in narrowing. `Array.isArray` is the canonical cross-realm array
 * test. Its historical signature is `arg is any[]`, so applying it to unknown
 * data permits array operations but also introduces `any` elements. Validate
 * those elements before treating the collection as domain data.
 *
 * I read `if (Array.isArray(value))` aloud as:
 *
 *   "The value is a mutable JavaScript array; its elements are still unchecked."
 *
 * When the input union already contains a specific tuple or array member,
 * control flow can preserve that detail. `every` has a predicate-aware overload
 * and can refine an entire array after every element passes; `filter` and `find`
 * refine their results instead. Remember that `every` is vacuously true for an
 * empty array. Typed arrays are ArrayBuffer views, not ordinary arrays, and
 * indexed reads remain possibly undefined under `noUncheckedIndexedAccess` even
 * after the element type itself has been validated.
 */

export function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [value];
}

export function sumNumbers(value: unknown): number | undefined {
  if (!Array.isArray(value) || !value.every(item => typeof item === "number")) return undefined;
  return value.reduce((sum, item) => sum + item, 0);
}

export function firstString(value: unknown): string | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.find(item => typeof item === "string");
}

export function collectionKind(value: unknown): "array" | "view" | "other" {
  if (Array.isArray(value)) return "array";
  if (ArrayBuffer.isView(value)) return "view";
  return "other";
}

export function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

type Kind<T> = 0 extends 1 & T ? "any" : [T] extends [never] ? "never" : "ordinary";

// Part 1: Unknown becomes any[], making the unchecked element type explicit.
function mainUnknown(value: unknown) {
  if (Array.isArray(value)) {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main02 = Expect<Equal<Kind<typeof value[number]>, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main03 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main04 = Expect<Equal<ReturnType<typeof Array.isArray>, TODO>>; // TODO(koan) @koan-error
}
void mainUnknown;

// Part 2: Existing tuple information survives selection from a concrete union.
function mainTuple(value: [string, number] | { id: string }) {
  if (Array.isArray(value)) {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main06 = Expect<Equal<typeof value[0], TODO>>; // TODO(koan) @koan-error
    type _Main07 = Expect<Equal<typeof value[1], TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main08 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainTuple;

// Part 3: Array checks refine within prior object/null guards.
function mainObject(value: object | null) {
  if (value !== null && Array.isArray(value)) {
    type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main10 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const mainArrayResult = Array.isArray([]);
type _Main11 = Expect<Equal<typeof mainArrayResult, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Parameters<typeof Array.isArray>, TODO>>; // TODO(koan) @koan-error
void mainObject;

// Part 4: every refines the original array; filter refines a new result.
function mainElements(values: unknown[]) {
  if (values.every(item => typeof item === "string")) {
    type _Main13 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
    type _Main14 = Expect<Equal<typeof values[0], TODO>>; // TODO(koan) @koan-error
  }
  type _Main15 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
  const strings = values.filter(item => typeof item === "string");
  type _Main16 = Expect<Equal<typeof strings, TODO>>; // TODO(koan) @koan-error
}
void mainElements;

// Part 5: ArrayBuffer views and checked arrays are different runtime families.
function mainViews(value: unknown) {
  if (ArrayBuffer.isView(value)) {
    type _Main17 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (Array.isArray(value)) {
    type _Main18 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main19 = Expect<Equal<Kind<typeof value[0]>, TODO>>; // TODO(koan) @koan-error
  }
}
function mainChecked(values: string[]) {
  type _Main20 = Expect<Equal<typeof values[0], TODO>>; // TODO(koan) @koan-error
}
void mainViews;
void mainChecked;
