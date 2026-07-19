import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-062: any in conditional types
 * =============================================================================
 *
 * `any` is an escape hatch that behaves as both assignable and not safely known.
 * When it appears as a conditional's checked type, the compiler may preserve
 * both possible branches. `T extends string ? "yes" : "no"` instantiated with
 * any therefore yields `"yes" | "no"`, not one trustworthy answer.
 *
 * I read the result aloud as:
 *
 *   "Because any could satisfy or fail this check, retain both outcomes."
 *
 * If a branch returns T itself, any can flow into the result and poison the
 * whole computation: `T extends string ? T : never` becomes any for T = any.
 * Since the lesson sentinel TODO is also any, direct equality against such a
 * result would pass silently. Honest exercises classify it first. A standard
 * detector is `0 extends (1 & T)`: intersection with ordinary types preserves
 * any's wildcard behavior but collapses for non-any T. Tuple wrapping changes
 * distribution but cannot make data typed any trustworthy. Prefer unknown at
 * boundaries and validate before selecting runtime or type-level behavior.
 */

export type IsAny<T> = 0 extends (1 & T) ? true : false;
export type AnyBranch<T> = T extends string ? "string" : "other";
export type KeepStrings<T> = T extends string ? T : never;
export type PreserveOrBox<T> = T extends string ? T : { value: T };
export type SafeCategory<T> = IsAny<T> extends true
  ? "any"
  : T extends string ? "string" : "other";

export function unsafeUpper(value: any): string {
  return value.toUpperCase();
}

export function safeUpper(value: unknown): string | undefined {
  return typeof value === "string" ? value.toUpperCase() : undefined;
}

export function unsafeNestedRead(value: any): any {
  return value.profile.name;
}

export function safeCategory(value: unknown): "string" | "other" {
  return typeof value === "string" ? "string" : "other";
}

// Part 1: Any is accepted in both source and target assignability positions.
type _Main01 = Expect<Equal<any extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<string extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<any extends never ? "yes" : "no", TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<any extends unknown ? "yes" : "no", TODO>>; // TODO(koan) @koan-error

// Part 2: Literal branch results reveal both possible outcomes.
type _Main05 = Expect<Equal<AnyBranch<any>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<(any extends object ? 1 : 2), TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<(any extends 1 ? "one" : "other"), TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<(any extends any ? "yes" : "no"), TODO>>; // TODO(koan) @koan-error

// Part 3: Returning T lets any poison the branch result itself.
type _Main09 = Expect<Equal<IsAny<KeepStrings<any>>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<IsAny<PreserveOrBox<any>>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<IsAny<any | string>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<IsAny<any & string>, TODO>>; // TODO(koan) @koan-error

// Part 4: IsAny distinguishes poison from top, bottom, and ordinary types.
type _Main13 = Expect<Equal<IsAny<any>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<IsAny<unknown>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<IsAny<never>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<IsAny<string>, TODO>>; // TODO(koan) @koan-error

// Part 5: A detector can guard a conditional before ordinary classification.
type _Main17 = Expect<Equal<SafeCategory<any>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<SafeCategory<unknown>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<SafeCategory<string>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<SafeCategory<number>, TODO>>; // TODO(koan) @koan-error
