import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-023: typeof narrowing
 * =============================================================================
 *
 * A variable's declared type describes every value it may hold. Control-flow
 * analysis computes a narrower observed type at each program point. A recognized
 * `typeof` comparison intersects the current possibilities with the runtime
 * category named by the guard; the false branch excludes that category.
 *
 * I read `if (typeof value === "string")` aloud as:
 *
 *   "Along this path, keep only members of value's current type that can be
 *    JavaScript strings; along the other path, remove those members."
 *
 * The recognized results are `string`, `number`, `bigint`, `boolean`, `symbol`,
 * `undefined`, `object`, and `function`. These are JavaScript runtime categories,
 * not TypeScript object-shape tests. In particular, `typeof null` is `"object"`,
 * arrays are objects, and callable values are functions. A guard narrows unknown
 * safely and narrows any in useful branches, but it does not validate deeper
 * properties. Chained guards and early returns accumulate exclusions until the
 * remaining path has a precise type.
 */

export function describePrimitive(value: unknown): string {
  if (typeof value === "string") return `string:${value.length}`;
  if (typeof value === "number") return `number:${value.toFixed(0)}`;
  if (typeof value === "boolean") return `boolean:${value}`;
  if (typeof value === "undefined") return "undefined";
  if (typeof value === "bigint") return `bigint:${value}`;
  if (typeof value === "symbol") return `symbol:${value.description ?? ""}`;
  if (typeof value === "function") return `function:${value.name}`;
  return value === null ? "null" : "object";
}

export function doubleIfNumber(value: string | number): string | number {
  return typeof value === "number" ? value * 2 : value.toUpperCase();
}

export function callIfFunction(value: unknown): unknown {
  return typeof value === "function" ? value() : value;
}

export function ownKeyCountIfObject(value: unknown): number {
  if (typeof value !== "object" || value === null) return 0;
  return Reflect.ownKeys(value).length;
}

export function normalizeText(value: string | number | undefined): string {
  if (typeof value === "undefined") return "";
  if (typeof value === "number") return String(value);
  return value.trim();
}

// Part 1: Positive guards keep the matching primitive member.
function mainPositive(value: string | number | boolean) {
  if (typeof value === "string") {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "number") {
    type _Main02 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "boolean") {
    type _Main03 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main04 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainPositive;

// Part 2: False branches exclude the guarded category.
function mainNegative(value: string | number | undefined) {
  if (typeof value !== "string") {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main06 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "undefined") {
    type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main08 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainNegative;

// Part 3: Chained branches progressively consume a union.
function mainChain(value: string | number | boolean | undefined) {
  if (typeof value === "string") {
    type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (typeof value === "number") {
    type _Main10 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (typeof value === "boolean") {
    type _Main11 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main12 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainChain;

// Part 4: Early returns leave accumulated exclusions behind.
function mainReturns(value: string | number | boolean) {
  if (typeof value === "string") return value.length;
  type _Main13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (typeof value === "number") return value;
  type _Main14 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const remaining = value;
  type _Main15 = Expect<Equal<typeof remaining, TODO>>; // TODO(koan) @koan-error
  return remaining ? 1 : 0;
}
type _Main16 = Expect<Equal<ReturnType<typeof mainReturns>, TODO>>; // TODO(koan) @koan-error

// Part 5: unknown becomes usable only after a recognized runtime check.
function mainUnknown(value: unknown) {
  if (typeof value === "string") {
    type _Main17 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (typeof value === "function") {
    type _Main18 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (typeof value === "object") {
    type _Main19 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main20 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainUnknown;
