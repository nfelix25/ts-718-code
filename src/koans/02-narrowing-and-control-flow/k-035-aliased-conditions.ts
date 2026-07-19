import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-035: aliased conditions
 * =============================================================================
 *
 * Control-flow evidence can be stored in a `const` boolean and reused later.
 * TypeScript remembers that `const isString = typeof value === "string"` came
 * from a guard, so checking `isString` can narrow `value`. This lets code name a
 * domain fact once without duplicating a complicated condition.
 *
 * I read `if (isReady)` aloud as:
 *
 *   "Replay the immutable guard expression that produced isReady and apply its
 *    facts to every still-stable source location."
 *
 * The immutability and stability requirements matter. A `let` boolean can be
 * overwritten, and a guarded source variable or property can change after the
 * alias was computed. In those cases the old answer is not proof of the current
 * value. TypeScript follows aliases through a limited amount of indirection and
 * understands combinations such as `&&`, `||`, and `!`; it does not execute
 * arbitrary boolean helper functions or retain facts through unlimited chains.
 */

export function formatValue(value: string | number): string {
  const isText = typeof value === "string";
  return isText ? value.toUpperCase() : value.toFixed(0);
}

export type State =
  | { state: "idle" }
  | { state: "ready"; data: string }
  | { state: "failed"; error: Error };

export function stateMessage(value: State): string {
  const isReady = value.state === "ready";
  if (isReady) return value.data;
  const isFailed = value.state === "failed";
  return isFailed ? value.error.message : "idle";
}

export function requireText(value: string | null | undefined): string {
  const present = value != null;
  const text = typeof value === "string";
  const usable = present && text;
  if (!usable) throw new Error("missing text");
  return value;
}

export function coordinateLabel(value: { x: number; y: number } | { name: string }): string {
  const hasX = "x" in value;
  return hasX ? `${value.x},${value.y}` : value.name;
}

export function partitionValues(values: readonly (string | number)[]): [string[], number[]] {
  const strings: string[] = [];
  const numbers: number[] = [];
  for (const value of values) {
    const isString = typeof value === "string";
    if (isString) strings.push(value);
    else numbers.push(value);
  }
  return [strings, numbers];
}

// Part 1: A const boolean replays its typeof guard in both branches.
function mainDirect(value: string | number) {
  const isString = typeof value === "string";
  if (isString) {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main02 = Expect<Equal<typeof isString, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main03 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main04 = Expect<Equal<typeof isString, TODO>>; // TODO(koan) @koan-error
  }
}
void mainDirect;

// Part 2: Conjunction aliases accumulate facts from their component guards.
function mainCompound(value: string | number | null) {
  const notNull = value !== null;
  const isString = typeof value === "string";
  const usable = notNull && isString;
  if (usable) {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main06 = Expect<Equal<typeof usable, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main08 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainCompound;

// Part 3: A discriminant comparison can be named without losing correlation.
function mainState(value: State) {
  const isReady = value.state === "ready";
  if (isReady) {
    type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main10 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!isReady) {
    type _Main11 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main12 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainState;

// Part 4: Disjunction and negation preserve their union/exclusion meaning.
function mainLogic(value: string | number | boolean) {
  const isScalar = typeof value === "string" || typeof value === "number";
  if (isScalar) {
    type _Main13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main14 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const notString = typeof value !== "string";
  if (notString) {
    type _Main15 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main16 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainLogic;

// Part 5: Mutation and opaque coercion sever or avoid the source relationship.
function mainBlockers(value: string | number) {
  const wasString = typeof value === "string";
  value = 1;
  if (wasString) {
    type _Main17 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  let mutable = typeof value === "string";
  if (mutable) {
    type _Main18 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const coerced = Boolean(typeof value === "string");
  if (coerced) {
    type _Main19 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main20 = Expect<Equal<typeof mutable, TODO>>; // TODO(koan) @koan-error
  mutable = false;
}
void mainBlockers;
