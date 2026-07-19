import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-027: equality and nullish narrowing
 * =============================================================================
 *
 * An equality check supplies more specific evidence than a truthiness check.
 * Comparing a value with a literal keeps that literal on the equal path and
 * removes it on the unequal path. Comparing two variables keeps their shared,
 * mutually assignable possibilities when they are equal.
 *
 * I read `if (left === right)` aloud as:
 *
 *   "On this path, narrow both operands to the overlap they could share."
 *
 * Strict `=== null` and `=== undefined` checks remove one nullish member at a
 * time. JavaScript's idiomatic `value == null` is a deliberate exception to the
 * usual advice against loose equality: it matches exactly `null | undefined`,
 * so TypeScript narrows both together. Equality checks preserve valid falsy data
 * such as 0 and `""`, making them safer than truthiness for presence tests.
 * `Object.is` returns boolean but is not declared as a type predicate, and loose
 * equality with other values brings coercion rules that static narrowing cannot
 * always model intuitively.
 */

export function normalizeLimit(value: number | null | undefined): number {
  return value == null ? 10 : value;
}

export function classifyStatus(value: "idle" | "running" | "done"): string {
  if (value === "idle") return "waiting";
  if (value === "running") return "active";
  return "complete";
}

export function sameText(
  left: string | number,
  right: string | boolean,
): boolean {
  return left === right;
}

export function readOptionalName(
  value: { name?: string } | null | undefined,
): string {
  if (value?.name === undefined) return "missing";
  return value.name;
}

export function preserveFalsy(
  value: string | 0 | false | null | undefined,
): string | 0 | false {
  return value ?? "fallback";
}

// Part 1: Literal equality selects one member and inequality excludes it.
type MainStatus = "idle" | "running" | "done";
function mainLiteral(value: MainStatus) {
  if (value === "idle") {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main02 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value !== "done") {
    type _Main03 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main04 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainLiteral;

// Part 2: Strict checks separate null and undefined; == null handles both.
function mainNullish(value: string | null | undefined) {
  if (value === null) {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main06 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value === undefined) {
    type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main08 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value == null) {
    type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main10 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainNullish;

// Part 3: Equality between variables narrows both sides to their overlap.
function mainOverlap(left: string | number, right: string | boolean) {
  if (left === right) {
    type _Main11 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
    type _Main12 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main13 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
  }
  type _Main14 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
}
void mainOverlap;

// Part 4: Equality through optional chaining can narrow the containing union.
type MainResult =
  | { kind: "ok"; value: number }
  | { kind: "error"; message: string }
  | null
  | undefined;
function mainOptional(value: MainResult) {
  if (value?.kind === "ok") {
    type _Main15 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main16 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main17 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main18 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainOptional;

// Part 5: Nullish coalescing replaces only null and undefined.
function mainCoalescing(value: "" | 0 | false | null | undefined) {
  const kept = value ?? "fallback";
  type _Main19 = Expect<Equal<typeof kept, TODO>>; // TODO(koan) @koan-error
  type _Main20 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return kept;
}
void mainCoalescing;
