import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { assert, assertDefined, assertString } from "./k-032-assertion-functions.js";

/** K-032 edges: assertions are trusted effects with annotation, mutation, and contradiction traps. */

// Group 1: A lying assertion creates unreachable-looking but reachable runtime states.
function lies(_value: unknown): asserts _value is string {
  // Returning normally makes a false compile-time promise.
}
function edgeLie(value: unknown) {
  lies(value);
  type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const length = value.length;
  type _E002 = Expect<Equal<typeof length, TODO>>; // TODO(koan) @koan-error
}
const lieResult = lies(1);
type _E003 = Expect<Equal<typeof lieResult, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<ReturnType<typeof lies>, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<Parameters<typeof lies>, TODO>>; // TODO(koan) @koan-error
void edgeLie;

// Demonstration A: as with predicates, TypeScript checks the declared assertion
// shape but does not prove that every false runtime state throws.

// Group 2: Assertion callable values require an explicit contextual annotation.
const inferredAssertion = (value: unknown): asserts value is number => {
  if (typeof value !== "number") throw new Error("number");
};
const explicitAssertion: (value: unknown) => asserts value is number = value => {
  if (typeof value !== "number") throw new Error("number");
};
type _E006 = Expect<Equal<typeof inferredAssertion, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof explicitAssertion, TODO>>; // TODO(koan) @koan-error
function edgeExplicit(value: unknown) {
  explicitAssertion(value);
  type _E008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type _E009 = Expect<Equal<ReturnType<typeof explicitAssertion>, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<Parameters<typeof explicitAssertion>, TODO>>; // TODO(koan) @koan-error

// @ts-expect-error TS2775: the assertion call target lacks an explicit type annotation.
inferredAssertion({});

// Demonstration B: the explicit variable annotation makes the assertion effect
// available before the call is resolved. Merely annotating the arrow's return is
// not sufficient for that call-site rule.

// Group 3: Contradictory assertions and mutation can invalidate useful facts.
function assertNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") throw new Error("number");
}
type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";
function edgeContradiction(value: string | number) {
  assertString(value);
  type _E011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  assertNumber(value);
  type _E012 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
function edgeMutation(box: { value: string | undefined }) {
  assertDefined(box.value);
  type _E013 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  const alias = box;
  alias.value = undefined;
  type _E014 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  box.value = "reset";
  type _E015 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
}
function edgeCondition(value: "a" | "b") {
  assert(value === "a");
  type _E016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  value = "b";
  type _E017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void edgeContradiction;
void edgeMutation;
void edgeCondition;

// Demonstration C: mutually exclusive assertions collapse a value to never.
// Reassigning a mutable binding can establish a new observation allowed by its
// declared type, while aliases can make a previous property proof stale.

// Group 4: Condition assertions, special values, and receiver methods define boundaries.
function edgeUnknown(value: unknown) {
  assertString(value);
  type _E018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function edgeAny(value: any) {
  assertString(value);
  type _E019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function edgeNever(value: never) {
  assertString(value);
  type _E020 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
function edgeFalsy(value: 0 | false | "" | null | undefined) {
  assertDefined(value);
  type _E021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function edgeBoolean(flag: boolean) {
  assert(flag);
  type _E022 = Expect<Equal<typeof flag, TODO>>; // TODO(koan) @koan-error
}
class Store {
  value: string | undefined;
  assertValue(): asserts this is this & { value: string } {
    if (this.value === undefined) throw new Error("empty");
  }
}
function edgeThis(store: Store) {
  store.assertValue();
  type _E023 = Expect<Equal<typeof store, TODO>>; // TODO(koan) @koan-error
  type _E024 = Expect<Equal<typeof store.value, TODO>>; // TODO(koan) @koan-error
}
type _E025 = Expect<Equal<ReturnType<Store["assertValue"]>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<Parameters<Store["assertValue"]>, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<ReturnType<typeof assert>, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<Parameters<typeof assert>, TODO>>; // TODO(koan) @koan-error
const assertCondition: (condition: unknown) => asserts condition = assert;
type _E029 = Expect<Equal<typeof assertCondition, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<ReturnType<typeof assertCondition>, TODO>>; // TODO(koan) @koan-error
void edgeUnknown;
void edgeAny;
void edgeNever;
void edgeFalsy;
void edgeBoolean;
void edgeThis;

// @ts-expect-error Assertion functions return void and cannot be tested as booleans.
if (assertString("x")) { /* no boolean result */ }
