import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-026: truthiness narrowing
 * =============================================================================
 *
 * JavaScript conditions coerce values to boolean. The falsy runtime set is
 * `false`, numeric zero (including -0 and 0n), the empty string, `null`,
 * `undefined`, and `NaN`. Everything else is truthy. TypeScript uses that rule
 * to remove representable falsy union members on a truthy path and representable
 * truthy members on a falsy path.
 *
 * I read `if (value)` aloud as:
 *
 *   "On this path, keep the part of value that can be truthy."
 *
 * The word "can" is important. TypeScript has literal types for `""`, `0`,
 * `0n`, and `false`, but it has no general `NonEmptyString`, `NonZeroNumber`, or
 * singleton `NaN` type. Therefore a broad `string` or `number` often remains in
 * both branches: each broad type contains truthy and falsy runtime values.
 * Truthiness is convenient for presence checks, but it is not interchangeable
 * with a nullish check when empty strings and zero are valid data.
 */

export function formatName(value: string | null | undefined): string {
  return value ? value.trim() : "anonymous";
}

export function describeCount(value: number | null | undefined): string {
  return value ? `count:${value}` : "none";
}

export function selectLabel(
  value: string | 0 | false | null | undefined,
  fallback: string,
): string {
  return value || fallback;
}

export function doubleIfPresent(value: number | null | undefined): number {
  return value ? value * 2 : 0;
}

export function copyTags(tags: readonly string[] | undefined): string[] {
  return tags ? [...tags] : [];
}

// Part 1: Literal unions can be partitioned exactly by runtime truthiness.
type MainLiteral = "ready" | "" | 0 | 1 | false | true | null | undefined;
function mainLiterals(value: MainLiteral) {
  if (value) {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main02 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!value) {
    type _Main03 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main04 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainLiterals;

// Part 2: Broad primitive types may contain both truthy and falsy values.
function mainBroadString(value: string | null) {
  if (value) {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main06 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function mainBroadNumber(value: number | undefined) {
  if (value) {
    type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main08 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function mainBoolean(value: boolean | null) {
  if (value) {
    type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main10 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainBroadString;
void mainBroadNumber;
void mainBoolean;

// Part 3: Objects are truthy; unknown becomes the broad non-nullish `{}` type.
function mainObjects(value: { id: number } | false | null | undefined) {
  if (value) {
    type _Main11 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main12 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function mainUnknown(value: unknown) {
  if (value) {
    type _Main14 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainObjects;
void mainUnknown;

// Part 4: Logical operators preserve or replace the falsy part of the left side.
function mainLogical(value: string | null | undefined) {
  const andLength = value && value.length;
  const orFallback = value || "fallback";
  const nullishFallback = value ?? "fallback";
  const ternary = value ? value.length : false;
  type _Main15 = Expect<Equal<typeof andLength, TODO>>; // TODO(koan) @koan-error
  type _Main16 = Expect<Equal<typeof orFallback, TODO>>; // TODO(koan) @koan-error
  type _Main17 = Expect<Equal<typeof nullishFallback, TODO>>; // TODO(koan) @koan-error
  type _Main18 = Expect<Equal<typeof ternary, TODO>>; // TODO(koan) @koan-error
}
void mainLogical;

// Part 5: Double negation participates in narrowing; Boolean returns a boolean.
function mainCoercion(value: string | null) {
  if (!!value) {
    type _Main19 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const coerced = Boolean(value);
  type _Main20 = Expect<Equal<typeof coerced, TODO>>; // TODO(koan) @koan-error
}
void mainCoercion;
