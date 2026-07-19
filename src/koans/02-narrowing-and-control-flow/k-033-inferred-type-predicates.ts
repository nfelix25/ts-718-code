import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-033: inferred type predicates
 * =============================================================================
 *
 * Since TypeScript 5.5, a simple boolean-returning function can receive an
 * inferred type-predicate signature. A callback such as
 * `value => value !== undefined` can therefore activate `filter`'s narrowing
 * overload without a handwritten `value is T` annotation.
 *
 * I read the inferred signature `(value: unknown) => value is string` aloud as:
 *
 *   "The compiler proved that true means string and false means not string."
 *
 * That two-way, "if and only if" relationship is the key. Inference requires a
 * single explicit return, no explicit return-type annotation, no mutation of the
 * parameter, and a boolean expression tied to a refinement. `!!value` can prove
 * object presence because every object is truthy, but it cannot generally infer
 * `number is nonzero number`: TypeScript has no such target type, and false may
 * mean zero rather than null. Multiple returns, explicit `: boolean`, mutation,
 * or a condition that proves only one direction leave an ordinary boolean API.
 */

export const isString = (value: unknown) => typeof value === "string";

export const isDefined = <T>(value: T | undefined) => value !== undefined;

export type Result =
  | { ok: true; value: string }
  | { ok: false; error: Error };

export const isSuccess = (result: Result) => result.ok;

export function onlyStrings(values: readonly unknown[]): string[] {
  return values.filter(value => typeof value === "string");
}

export function compact<T>(values: readonly (T | null | undefined)[]): T[] {
  return values.filter(value => value != null);
}

// Part 1: A simple refinement expression becomes part of the function type.
function mainPrimitive(value: unknown) {
  if (isString(value)) {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main02 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main03 = Expect<Equal<typeof isString, TODO>>; // TODO(koan) @koan-error
  type _Main04 = Expect<Equal<ReturnType<typeof isString>, TODO>>; // TODO(koan) @koan-error
}
void mainPrimitive;

// Part 2: Inline inferred predicates select narrowing collection overloads.
const mainMixed: unknown[] = ["a", 1, "b"];
const mainStrings = mainMixed.filter(value => typeof value === "string");
const mainNumbers = mainMixed.filter(value => typeof value === "number");
const mainFound = mainMixed.find(value => value instanceof Date);
const mainRejected = mainMixed.filter(value => typeof value !== "string");
type _Main05 = Expect<Equal<typeof mainStrings, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainNumbers, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainFound, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainRejected, TODO>>; // TODO(koan) @koan-error

// Part 3: Generic nullish checks preserve the caller's remaining T.
const mainOptional: Array<string | number | undefined> = ["a", 1];
const mainDefined = mainOptional.filter(isDefined);
type _Main09 = Expect<Equal<typeof mainDefined, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof isDefined, TODO>>; // TODO(koan) @koan-error
function mainGeneric<T>(value: T | undefined) {
  if (isDefined(value)) {
    type _Main11 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type _Main12 = Expect<Equal<ReturnType<typeof isDefined>, TODO>>; // TODO(koan) @koan-error
void mainGeneric;

// Part 4: An explicit boolean annotation or multiple returns blocks inference.
const mainAnnotated = (value: unknown): boolean => typeof value === "string";
function mainMultiple(value: unknown) {
  if (typeof value === "string") return true;
  return false;
}
function mainBlocked(value: unknown) {
  if (mainAnnotated(value)) {
    type _Main13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (mainMultiple(value)) {
    type _Main14 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const mainAnnotatedFilter = mainMixed.filter(mainAnnotated);
const mainMultipleFilter = mainMixed.filter(mainMultiple);
type _Main15 = Expect<Equal<typeof mainAnnotatedFilter, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainMultipleFilter, TODO>>; // TODO(koan) @koan-error
void mainBlocked;

// Part 5: Predicate inference requires a useful true and false partition.
const mainTruthyObject = (value: object | null) => !!value;
const mainTruthyNumber = (value: number | null) => !!value;
const mainLongString = (value: unknown) => typeof value === "string" && value.length > 0;
const mainBooleanCall = (value: unknown) => Boolean(value);
type _Main17 = Expect<Equal<typeof mainTruthyObject, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainTruthyNumber, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainLongString, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainBooleanCall, TODO>>; // TODO(koan) @koan-error
