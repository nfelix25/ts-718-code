import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-039: generic narrowing and CFA capstone
 * =============================================================================
 *
 * A generic type parameter is chosen by the caller and remains that type for the
 * entire invocation. Control-flow analysis can narrow the value currently held
 * in a `T`, often producing an intersection such as `T & string`, but a branch
 * does not rewrite T itself. This distinction protects callers that instantiate
 * T with a narrower literal or structural subtype.
 *
 * I read `if (typeof value === "string")` for `value: T` aloud as:
 *
 *   "This value is both the caller's T and string on this path; T still means
 *    whatever type the caller selected."
 *
 * That is why reading string methods can work while assigning an arbitrary
 * string back to T is unsafe. Generic discriminated values behave similarly.
 * Conditional return types describe a relationship across instantiations, but
 * ordinary control flow does not generally prove an implementation satisfies
 * every conditional branch; overloads, a checked assertion at the boundary, or
 * a different API shape may be clearer. Related parameters can also lose runtime
 * correlation: a discriminated tuple union often models paired key/value cases
 * more effectively than separate `K` and `T[K]` parameters.
 */

export function stringify<T extends string | number>(value: T): string {
  return typeof value === "string" ? value.toUpperCase() : value.toFixed(0);
}

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };

export function unwrap<T>(result: Result<T>): T {
  if (result.ok) return result.value;
  throw result.error;
}

export function compact<T>(values: readonly (T | null | undefined)[]): T[] {
  return values.filter((value): value is T => value != null);
}

export type FieldArgs = ["name", string] | ["count", number] | ["active", boolean];

export function formatField(...args: FieldArgs): string {
  const [key, value] = args;
  if (key === "name") return value.toUpperCase();
  if (key === "count") return value.toFixed(0);
  return value ? "active" : "inactive";
}

export function mapPresent<T, U>(
  value: T | null | undefined,
  mapper: (value: T) => U,
): U | undefined {
  return value == null ? undefined : mapper(value);
}

// Part 1: Guards narrow a generic value while leaving the caller-owned T intact.
function mainPrimitive<T extends string | number>(value: T) {
  if (typeof value === "string") {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main02 = Expect<Equal<T, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main03 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  return value;
}
type _Main04 = Expect<Equal<ReturnType<typeof mainPrimitive>, TODO>>; // TODO(koan) @koan-error

// Part 2: A constrained generic discriminated value retains T plus branch evidence.
type MainState<D = string> =
  | { state: "ready"; data: D }
  | { state: "failed"; error: Error };
function mainState<T extends MainState>(value: T) {
  if (value.state === "ready") {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main06 = Expect<Equal<typeof value.data, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  return value;
}
type _Main08 = Expect<Equal<ReturnType<typeof mainState>, TODO>>; // TODO(koan) @koan-error

// Part 3: Conditional return types express per-instantiation output relationships.
type MainLabel<T> = T extends string ? "text" : "number";
function mainLabel<T extends string | number>(value: T): MainLabel<T> {
  return (typeof value === "string" ? "text" : "number") as MainLabel<T>;
}
const mainTextLabel = mainLabel("x");
const mainNumberLabel = mainLabel(1);
type _Main09 = Expect<Equal<typeof mainTextLabel, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainNumberLabel, TODO>>; // TODO(koan) @koan-error
function mainConditionalBranch<T extends string | number>(value: T) {
  if (typeof value === "string") {
    type _Main11 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type _Main12 = Expect<Equal<ReturnType<typeof mainLabel>, TODO>>; // TODO(koan) @koan-error
void mainConditionalBranch;

// Part 4: Generic predicates remove nullish members while preserving T.
const mainPresent = <T>(value: T | null | undefined): value is T => value != null;
const mainValues: Array<string | number | null> = ["a", 1, null];
const mainFiltered = mainValues.filter(mainPresent);
type _Main13 = Expect<Equal<typeof mainPresent, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainFiltered, TODO>>; // TODO(koan) @koan-error
function mainPredicate<T>(value: T | null) {
  if (mainPresent(value)) {
    type _Main15 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type _Main16 = Expect<Equal<ReturnType<typeof mainPresent>, TODO>>; // TODO(koan) @koan-error
void mainPredicate;

// Part 5: Separate dependent parameters lose correlation; tuple unions retain it.
interface MainFields { name: string; count: number }
function mainField<K extends keyof MainFields>(key: K, value: MainFields[K]) {
  if (key === "count") {
    type _Main17 = Expect<Equal<typeof key, TODO>>; // TODO(koan) @koan-error
    type _Main18 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type MainArgs = ["name", string] | ["count", number];
function mainTuple(args: MainArgs) {
  if (args[0] === "count") {
    type _Main19 = Expect<Equal<typeof args, TODO>>; // TODO(koan) @koan-error
    type _Main20 = Expect<Equal<typeof args[1], TODO>>; // TODO(koan) @koan-error
  }
}
void mainField;
void mainTuple;
