import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-039 edges: generic identity, assignments, conditional returns, and parameter correlation bound CFA. */

type Kind<T> = 0 extends 1 & T ? "any" : [T] extends [never] ? "never" : "ordinary";

// Group 1: A narrowed T value accepts reads but not arbitrary replacements for caller subtypes.
function edgeAssignment<T extends string | number>(value: T) {
  if (typeof value === "string") {
    type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E002 = Expect<Equal<T, TODO>>; // TODO(koan) @koan-error
    const upper = value.toUpperCase();
    type _E003 = Expect<Equal<typeof upper, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _E006 = Expect<Equal<ReturnType<typeof edgeAssignment>, TODO>>; // TODO(koan) @koan-error

// @ts-expect-error T might be a narrower string literal, so an arbitrary string is not assignable.
function invalidReplacement<T extends string | number>(value: T) { if (typeof value === "string") value = "other"; }

// Demonstration A: branch evidence makes string operations sound, but T may be
// the literal "fixed" or a branded subtype and cannot be replaced by any string.

// Group 2: Conditional types do not evaluate from ordinary branch narrowing of T.
type Output<T> = T extends string ? { text: T } : { value: T };
function edgeConditional<T extends string | number>(value: T) {
  if (typeof value === "string") {
    type _E007 = Expect<Equal<Output<T>, TODO>>; // TODO(koan) @koan-error
    const result = { text: value };
    type _E008 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E009 = Expect<Equal<Output<T>, TODO>>; // TODO(koan) @koan-error
    const result = { value };
    type _E010 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  }
}
type _E011 = Expect<Equal<Output<string>, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<Output<number>, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<Output<string | number>, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<Output<never>, TODO>>; // TODO(koan) @koan-error
void edgeConditional;

// Demonstration B: conditional types distribute over concrete unions at type
// instantiation time; CFA does not rewrite a type parameter inside a branch.

// Group 3: Separate dependent parameters do not narrow together.
interface Fields { name: string; count: number; active: boolean }
function edgeField<K extends keyof Fields>(key: K, value: Fields[K]) {
  if (key === "name") {
    type _E015 = Expect<Equal<typeof key, TODO>>; // TODO(koan) @koan-error
    type _E016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (key === "count") {
    type _E017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type Args = ["name", string] | ["count", number] | ["active", boolean];
function edgeTuple(args: Args) {
  if (args[0] === "name") {
    type _E019 = Expect<Equal<typeof args[1], TODO>>; // TODO(koan) @koan-error
  } else if (args[0] === "count") {
    type _E020 = Expect<Equal<typeof args[1], TODO>>; // TODO(koan) @koan-error
  } else {
    type _E021 = Expect<Equal<typeof args[1], TODO>>; // TODO(koan) @koan-error
  }
}
void edgeField;
void edgeTuple;

// Demonstration C: K and T[K] are related statically but stored in independent
// parameters at runtime. A discriminated rest-tuple union retains their pairing.

// Group 4: Generic special types and constrained unions keep their algebra.
function edgeUnknown<T>(value: T) {
  if (typeof value === "string") {
    type _E022 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  return value;
}
function edgeAny<T extends any>(value: T) {
  if (typeof value === "string") {
    type _E023 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeNever<T extends never>(value: T) {
  type _E024 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
type State = { state: "ready"; data: string } | { state: "failed"; error: Error };
function edgeState<T extends State>(value: T) {
  if (value.state === "ready") {
    type _E025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E026 = Expect<Equal<typeof value.data, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E028 = Expect<Equal<T, TODO>>; // TODO(koan) @koan-error
}
type _E029 = Expect<Equal<ReturnType<typeof edgeUnknown>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<Parameters<typeof edgeState>, TODO>>; // TODO(koan) @koan-error
void edgeAny;
void edgeNever;
void edgeState;

// Demonstration D: a generic function over unconstrained T can intersect its
// value with runtime evidence, while its public return still preserves T.
