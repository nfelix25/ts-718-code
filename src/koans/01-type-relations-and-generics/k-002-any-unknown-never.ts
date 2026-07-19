import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-002: any, unknown, and never
 * =============================================================================
 *
 * I use these three types to describe the boundaries of useful information.
 * They are not three spellings of "I do not know the type."
 *
 * `unknown` is the safe top type. Every value can enter an `unknown` slot, but I
 * must narrow it before I can do anything type-specific. Read it aloud as:
 *
 *   "A value exists, but this reference promises me nothing about it yet."
 *
 * `never` is the bottom type. It represents a value that cannot exist. Because
 * there are no counterexamples, `never` is assignable to every type. Read it as:
 *
 *   "This path produces no value at all."
 *
 * `any` is an escape hatch outside that safe ordering. It lets values flow both
 * in and out while suppressing checks, and it spreads through many surrounding
 * expressions. Read it as:
 *
 *   "Trust me; turn the checker off here."
 *
 * A useful picture is:
 *
 *                         unknown
 *                            ^
 *                    ordinary types
 *                            ^
 *                          never
 *
 *   any sits off to the side and short-circuits the comparison.
 *
 * This lesson uses a small `ClassifySpecial<T>` instrument panel. Its
 * implementation previews conditional types, which we will derive much later;
 * for now, use its output to observe special types without letting `TODO = any`
 * accidentally solve an exercise whose real answer is `any`.
 */

export type IsAny<T> = 0 extends 1 & T ? true : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsUnknown<T> = IsAny<T> extends true
  ? false
  : unknown extends T
    ? [keyof T] extends [never]
      ? true
      : false
    : false;

export type ClassifySpecial<T> = IsAny<T> extends true
  ? "any"
  : IsNever<T> extends true
    ? "never"
    : IsUnknown<T> extends true
      ? "unknown"
      : "ordinary";

export type IsAssignable<Source, Target> = [Source] extends [Target]
  ? true
  : false;

export function parseJson(text: string): unknown {
  return JSON.parse(text) as unknown;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readStringField(
  value: unknown,
  key: string,
): string | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const field = value[key];
  return typeof field === "string" ? field : undefined;
}

export function safeUpper(value: unknown): string | undefined {
  return typeof value === "string" ? value.toUpperCase() : undefined;
}

export function unsafeUpper(value: any): string {
  return value.toUpperCase();
}

export function fail(message: string): never {
  throw new Error(message);
}

export function formatPrimitive(value: string | number): string {
  return typeof value === "string" ? value.toUpperCase() : value.toFixed(2);
}

// Part 1: First identify which promise each special type makes.
// -----------------------------------------------------------------------------

type _Main01 = Expect<Equal<ClassifySpecial<any>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<ClassifySpecial<unknown>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ClassifySpecial<never>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<ClassifySpecial<string>, TODO>>; // TODO(koan) @koan-error

// Part 2: Think in assignment direction, not in vague "broadness."
// -----------------------------------------------------------------------------
// Everything is assignable to unknown. Unknown is not assignable back to a
// specific type without evidence. Never can flow outward because no actual
// value must survive the assignment.

type _Main05 = Expect<Equal<IsAssignable<string, unknown>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<IsAssignable<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<IsAssignable<never, string>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<IsAssignable<never, unknown>, TODO>>; // TODO(koan) @koan-error
type _Main09 = Expect<Equal<IsAssignable<string, never>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ClassifySpecial<any["unchecked"]>, TODO>>; // TODO(koan) @koan-error

// Part 3: Learn the absorption laws before doing larger union algebra.
// -----------------------------------------------------------------------------
// In a union, unknown absorbs ordinary types and any absorbs everything. Never
// contributes no possible values, so it disappears. For intersections, unknown
// is the identity, while never makes the combination impossible.

type _Main11 = Expect<Equal<ClassifySpecial<string | unknown>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ClassifySpecial<string | any>, TODO>>; // TODO(koan) @koan-error
type _Main13 = Expect<Equal<string | never, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<string & unknown, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ClassifySpecial<string & any>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ClassifySpecial<string & never>, TODO>>; // TODO(koan) @koan-error

// Part 4: Put unknown at untrusted boundaries and narrow before use.
// -----------------------------------------------------------------------------

const parsedExample = parseJson('{"name":"Ada","score":42}');
const safeUpperExample = safeUpper(parsedExample);
const unsafeUpperExample = unsafeUpper("escape hatch");
const fieldExample = readStringField(parsedExample, "name");

type _Main17 = Expect<Equal<typeof parsedExample, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof safeUpperExample, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof unsafeUpperExample, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof fieldExample, TODO>>; // TODO(koan) @koan-error
type _Main21 = Expect<Equal<ClassifySpecial<ReturnType<typeof fail>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Watch the special types propagate through keys and containers.
// -----------------------------------------------------------------------------
// `keyof unknown` is never because no property is guaranteed. `keyof any`
// allows every JavaScript property-key category. A container does not itself
// become special merely because its element type is special.

type _Main22 = Expect<Equal<keyof unknown, TODO>>; // TODO(koan) @koan-error
type _Main23 = Expect<Equal<keyof any, TODO>>; // TODO(koan) @koan-error
type _Main24 = Expect<Equal<ClassifySpecial<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _Main25 = Expect<Equal<ClassifySpecial<any[][number]>, TODO>>; // TODO(koan) @koan-error
