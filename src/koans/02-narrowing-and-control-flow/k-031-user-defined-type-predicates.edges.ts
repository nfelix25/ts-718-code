import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { isNonNullish, isString } from "./k-031-user-defined-type-predicates.js";

/** K-031 edges: predicate bodies are trusted claims whose false branches, wrappers, and mutations matter. */

// Group 1: TypeScript trusts both sides of even a logically incorrect predicate.
function liesAboutString(_value: string | number): _value is string {
  return true;
}
function edgeLie(value: string | number) {
  if (liesAboutString(value)) {
    type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
const lieResult = liesAboutString(1);
type _E004 = Expect<Equal<typeof lieResult, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<Parameters<typeof liesAboutString>, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<ReturnType<typeof liesAboutString>, TODO>>; // TODO(koan) @koan-error
void edgeLie;

// Demonstration A: the checker validates the signature's assignability, not the
// body-to-predicate logic. A false result is also trusted to exclude the target.
// Guard implementations therefore need direct runtime tests.

// Group 2: Predicate-aware overloads disappear when the signature becomes boolean.
const values: unknown[] = ["a", 1, null];
const keptByPredicate = values.filter(isString);
const asBoolean: (value: unknown) => boolean = isString;
const keptByBoolean = values.filter(asBoolean);
type _E007 = Expect<Equal<typeof keptByPredicate, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof keptByBoolean, TODO>>; // TODO(koan) @koan-error
const foundByPredicate = values.find(isString);
const foundByBoolean = values.find(asBoolean);
type _E009 = Expect<Equal<typeof foundByPredicate, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof foundByBoolean, TODO>>; // TODO(koan) @koan-error
function edgeEvery(items: unknown[]) {
  if (items.every(isString)) {
    type _E011 = Expect<Equal<typeof items, TODO>>; // TODO(koan) @koan-error
    items.push("safe");
    type _E012 = Expect<Equal<typeof items, TODO>>; // TODO(koan) @koan-error
  }
}
const compact = ([0, null, false, undefined] as Array<number | boolean | null | undefined>).filter(isNonNullish);
type _E013 = Expect<Equal<typeof compact, TODO>>; // TODO(koan) @koan-error
const truthy = ([0, null, false, undefined] as Array<number | boolean | null | undefined>).filter(Boolean);
type _E014 = Expect<Equal<typeof truthy, TODO>>; // TODO(koan) @koan-error
void edgeEvery;

// Demonstration B: overload selection depends on the function type passed to the
// method, not the original implementation from which a boolean wrapper came.

// Group 3: Mutability can invalidate a truthful check after it returns.
type Item = { kind: "text"; value: string } | { kind: "count"; value: number };
function isText(value: Item): value is Extract<Item, { kind: "text" }> {
  return value.kind === "text";
}
function edgeMutation(value: Item) {
  if (isText(value)) {
    type _E015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    value.value = value.value.toUpperCase();
    type _E016 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  }
}
const mutable: unknown[] = ["a", "b"];
if (mutable.every(isString)) {
  type _E017 = Expect<Equal<typeof mutable, TODO>>; // TODO(koan) @koan-error
  const alias: unknown[] = mutable;
  alias.push(1);
  type _E018 = Expect<Equal<typeof mutable, TODO>>; // TODO(koan) @koan-error
}
type ReadonlyGuard = (value: readonly unknown[]) => value is readonly string[];
const readonlyGuard: ReadonlyGuard = value => value.every(isString);
type _E019 = Expect<Equal<typeof readonlyGuard, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<Parameters<ReadonlyGuard>, TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<ReturnType<ReadonlyGuard>, TODO>>; // TODO(koan) @koan-error
void edgeMutation;

// Demonstration C: a predicate proves a momentary fact. External aliases and
// later mutations can break that fact at runtime without notifying control flow.

// Group 4: Target restrictions and special parameter types define legal contracts.
type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";
function edgeUnknown(value: unknown) {
  if (isString(value)) {
    type _E022 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E023 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeAny(value: any) {
  if (isString(value)) {
    type _E024 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E025 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeNever(value: never) {
  if (isString(value)) {
    type _E026 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeGeneric<T>(value: T) {
  if (isNonNullish(value)) {
    type _E027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const genericGuard = <T>(value: T): value is T & { id: string } =>
  typeof value === "object" && value !== null && "id" in value;
type _E028 = Expect<Equal<typeof genericGuard, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<ReturnType<typeof genericGuard>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<Parameters<typeof genericGuard>, TODO>>; // TODO(koan) @koan-error
void edgeUnknown;
void edgeAny;
void edgeNever;
void edgeGeneric;

// @ts-expect-error A predicate target must be assignable to its parameter type.
function invalidTarget(value: string): value is number { return false; }
// @ts-expect-error A predicate may reference a parameter name, not a destructured binding pattern.
function invalidBinding({ value }: { value: unknown }): value is string { return typeof value === "string"; }
