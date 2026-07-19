import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-031: user-defined type predicates
 * =============================================================================
 *
 * A return annotation such as `value is string` tells TypeScript that a true
 * result proves the parameter belongs to a narrower type. The function body is
 * ordinary runtime JavaScript; the checker verifies that the predicate target
 * is assignable to the parameter type, but it does not prove that the body is a
 * logically correct test. A predicate is therefore a trusted boundary.
 *
 * I read `(value: unknown): value is User` aloud as:
 *
 *   "When this function returns true, callers may treat value as User; when it
 *    returns false, callers may exclude User from a union where possible."
 *
 * Predicates are especially useful for validating unknown data, preserving a
 * generic value while removing nullish members, and activating predicate-aware
 * overloads of `filter`, `find`, and `every`. A wrapper typed as plain boolean
 * can erase that relationship. Prefer small guards whose runtime checks justify
 * every field promised by the signature, and test the guard as production code.
 */

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNonNullish<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export type Result =
  | { ok: true; value: string }
  | { ok: false; error: Error };

export function isSuccess(result: Result): result is Extract<Result, { ok: true }> {
  return result.ok;
}

export function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(item => typeof item === "number");
}

export function collectStrings(values: readonly unknown[]): string[] {
  return values.filter(isString);
}

// Part 1: A predicate narrows its named parameter on both control-flow paths.
function mainPrimitive(value: unknown) {
  if (isString(value)) {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main02 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main03 = Expect<Equal<ReturnType<typeof isString>, TODO>>; // TODO(koan) @koan-error
  type _Main04 = Expect<Equal<Parameters<typeof isString>, TODO>>; // TODO(koan) @koan-error
}
void mainPrimitive;

// Part 2: Predicates can name one member of a structural union.
type MainAnimal = { kind: "fish"; swim(): void } | { kind: "bird"; fly(): void };
function isFish(value: MainAnimal): value is Extract<MainAnimal, { kind: "fish" }> {
  return value.kind === "fish";
}
function mainUnion(value: MainAnimal) {
  if (isFish(value)) {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main06 = Expect<Equal<typeof value.swim, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main08 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainUnion;

// Part 3: Generic nullish guards preserve each non-nullish member through filter.
const mainValues: (string | number | null | undefined)[] = ["a", null, 1];
const mainPresent = mainValues.filter(isNonNullish);
const mainFound = mainValues.find(isNonNullish);
type _Main09 = Expect<Equal<typeof mainPresent, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainFound, TODO>>; // TODO(koan) @koan-error
function mainGeneric<T>(value: T) {
  if (isNonNullish(value)) {
    type _Main11 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type _Main12 = Expect<Equal<ReturnType<typeof isNonNullish>, TODO>>; // TODO(koan) @koan-error
void mainGeneric;

// Part 4: Structural guards can validate an unknown value in stages.
type Named = { name: string };
function hasStringName(value: unknown): value is Named {
  return typeof value === "object"
    && value !== null
    && "name" in value
    && typeof value.name === "string";
}
function mainObject(value: unknown) {
  if (hasStringName(value)) {
    type _Main13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main14 = Expect<Equal<typeof value.name, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main15 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const mainNamed = ([{}, { name: "Ada" }] as unknown[]).filter(hasStringName);
type _Main16 = Expect<Equal<typeof mainNamed, TODO>>; // TODO(koan) @koan-error
void mainObject;

// Part 5: A method can predicate on `this`, refining the receiver and its fields.
class MainBox<T> {
  constructor(public value: T | null) {}

  hasValue(): this is this & { value: T } {
    return this.value !== null;
  }
}
function mainThis(box: MainBox<string>) {
  if (box.hasValue()) {
    type _Main17 = Expect<Equal<typeof box, TODO>>; // TODO(koan) @koan-error
    type _Main18 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main19 = Expect<Equal<typeof box, TODO>>; // TODO(koan) @koan-error
  }
}
const mainGuard: (value: unknown) => value is string = isString;
type _Main20 = Expect<Equal<typeof mainGuard, TODO>>; // TODO(koan) @koan-error
void mainThis;
