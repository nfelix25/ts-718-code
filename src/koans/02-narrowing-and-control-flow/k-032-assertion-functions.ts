import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-032: assertion functions
 * =============================================================================
 *
 * An assertion function represents a check that either throws or returns with a
 * proven fact. `asserts condition` preserves whatever narrowing follows from the
 * supplied expression. `asserts value is T` attaches a named type claim directly
 * to one parameter. Unlike a predicate, an assertion does not return a boolean
 * and create two branches: successful continuation is the true path; failure is
 * unreachable because the implementation must stop it.
 *
 * I read `assertDefined(value)` aloud as:
 *
 *   "Execution continues only if value is non-nullish, so remove null and
 *    undefined from every later use on this path."
 *
 * Assertion signatures are trusted boundaries just like predicates. The body
 * must actually throw whenever its promise is false. Assertions can validate
 * unknown input, preserve generic information, refine `this`, and encode local
 * invariants. Callable assertion values and assertion methods sometimes require
 * explicit annotations so control-flow analysis knows their assertion effect
 * before resolving the call.
 */

export function assert(condition: unknown, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}

export function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new TypeError("expected string");
}

export function assertDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) throw new TypeError("expected value");
}

export interface User {
  id: number;
  name: string;
}

export function assertUser(value: unknown): asserts value is User {
  assert(typeof value === "object" && value !== null, "expected object");
  assert("id" in value && typeof value.id === "number", "expected numeric id");
  assert("name" in value && typeof value.name === "string", "expected name");
}

export function parseUser(value: unknown): User {
  assertUser(value);
  return value;
}

// Part 1: A named assertion refines its argument after successful return.
function mainString(value: unknown) {
  assertString(value);
  type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _Main02 = Expect<Equal<ReturnType<typeof assertString>, TODO>>; // TODO(koan) @koan-error
  type _Main03 = Expect<Equal<Parameters<typeof assertString>, TODO>>; // TODO(koan) @koan-error
  const result = assertString(value);
  type _Main04 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
}
void mainString;

// Part 2: A generic assertion removes nullish members without losing T.
function mainDefined(value: string | null | undefined) {
  assertDefined(value);
  type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function mainGeneric<T>(value: T) {
  assertDefined(value);
  type _Main06 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
const mainMaybe: Array<number | null> = [1, null];
const mainFirst = mainMaybe[0];
assertDefined(mainFirst);
type _Main07 = Expect<Equal<typeof mainFirst, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReturnType<typeof assertDefined>, TODO>>; // TODO(koan) @koan-error

// Part 3: `asserts condition` carries the expression's own narrowing facts.
function mainCondition(value: string | number | null) {
  assert(value !== null);
  type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  assert(typeof value === "string");
  type _Main10 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const longEnough = value.length > 0;
  assert(longEnough);
  type _Main11 = Expect<Equal<typeof longEnough, TODO>>; // TODO(koan) @koan-error
  type _Main12 = Expect<Equal<Parameters<typeof assert>, TODO>>; // TODO(koan) @koan-error
}
void mainCondition;

// Part 4: Structural assertions turn unknown data into an application type.
function mainObject(value: unknown) {
  assertUser(value);
  type _Main13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _Main14 = Expect<Equal<typeof value.name, TODO>>; // TODO(koan) @koan-error
  const user = value;
  type _Main15 = Expect<Equal<typeof user, TODO>>; // TODO(koan) @koan-error
}
type _Main16 = Expect<Equal<ReturnType<typeof parseUser>, TODO>>; // TODO(koan) @koan-error
void mainObject;

// Part 5: Methods can assert a refined receiver state.
class MainStore {
  state: "empty" | "ready" = "empty";
  value: string | undefined;

  assertReady(): asserts this is this & { state: "ready"; value: string } {
    if (this.state !== "ready" || this.value === undefined) throw new Error("not ready");
  }
}
function mainThis(store: MainStore) {
  store.assertReady();
  type _Main17 = Expect<Equal<typeof store, TODO>>; // TODO(koan) @koan-error
  type _Main18 = Expect<Equal<typeof store.value, TODO>>; // TODO(koan) @koan-error
  const result = store.assertReady();
  type _Main19 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
}
const mainAssertion: (condition: unknown) => asserts condition = assert;
type _Main20 = Expect<Equal<typeof mainAssertion, TODO>>; // TODO(koan) @koan-error
void mainThis;
