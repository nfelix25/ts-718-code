import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-028: assignment and reachability
 * =============================================================================
 *
 * Control-flow analysis tracks a variable's current observed type separately
 * from its declared type. An assignment must be valid for the declared type,
 * then becomes fresh evidence about the value currently stored. A later
 * assignment can change that observed type again without changing what future
 * assignments are permitted.
 *
 * I read `let value: string | number; value = 1` aloud as:
 *
 *   "value may accept strings or numbers, but right here it is observed number."
 *
 * When paths meet, TypeScript joins the values that can reach that point. Paths
 * ended by `return`, `throw`, `continue`, or `break` do not contribute where
 * they cannot arrive. This reachability analysis is why an early return can
 * permanently remove a union member. Loops add another question: can the body
 * run zero times? If yes, the pre-loop observation usually remains possible.
 */

export function parseOrKeep(value: string | number): number {
  if (typeof value === "string") value = Number(value);
  return value;
}

export function chooseValue(flag: boolean): string | number {
  let result: string | number;
  if (flag) result = "chosen";
  else result = 42;
  return result;
}

export function requireValue(value: string | null | undefined): string {
  if (value == null) throw new Error("missing value");
  return value;
}

export function lastDefined(values: readonly (string | undefined)[]): string | undefined {
  let result: string | undefined;
  for (const value of values) {
    if (value === undefined) continue;
    result = value;
  }
  return result;
}

export function normalizeToken(value: string | number | null): string {
  if (value === null) return "missing";
  if (typeof value === "number") return value.toFixed(0);
  return value.toUpperCase();
}

// Part 1: Assignments update the observed type, not the declared contract.
function mainAssignments(flag: boolean) {
  let value: string | number;
  value = "start";
  type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  value = 42;
  type _Main02 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const snapshot = value;
  type _Main03 = Expect<Equal<typeof snapshot, TODO>>; // TODO(koan) @koan-error
  value = flag ? "next" : 0;
  type _Main04 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainAssignments;

// Part 2: A join contains the observations from every path that reaches it.
function mainJoin(flag: boolean) {
  let value: string | number;
  if (flag) {
    value = "yes";
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    value = 1;
    type _Main06 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _Main08 = Expect<Equal<ReturnType<typeof mainJoin>, TODO>>; // TODO(koan) @koan-error

// Part 3: Assignment can replace a narrowed member before paths rejoin.
function mainReplace(value: string | number) {
  if (typeof value === "string") {
    type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    value = value.length;
    type _Main10 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main11 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _Main12 = Expect<Equal<ReturnType<typeof mainReplace>, TODO>>; // TODO(koan) @koan-error

// Part 4: Ended paths stop contributing possible types.
function mainReachability(value: string | number | null) {
  if (value === null) throw new Error("missing");
  type _Main13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (typeof value === "string") return value.length;
  type _Main14 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const remaining = value;
  type _Main15 = Expect<Equal<typeof remaining, TODO>>; // TODO(koan) @koan-error
  return remaining;
}
type _Main16 = Expect<Equal<ReturnType<typeof mainReachability>, TODO>>; // TODO(koan) @koan-error

// Part 5: A for-of loop may execute zero times; destructuring is assignment too.
function mainLoop(values: readonly string[], source: readonly [number]) {
  let current: string | undefined;
  for (const value of values) {
    current = value;
    type _Main17 = Expect<Equal<typeof current, TODO>>; // TODO(koan) @koan-error
  }
  type _Main18 = Expect<Equal<typeof current, TODO>>; // TODO(koan) @koan-error
  let item: string | number = "initial";
  [item] = source;
  type _Main19 = Expect<Equal<typeof item, TODO>>; // TODO(koan) @koan-error
  return current;
}
type _Main20 = Expect<Equal<Parameters<typeof mainLoop>, TODO>>; // TODO(koan) @koan-error
