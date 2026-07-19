import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-023 edges: typeof follows JavaScript categories, including null, arrays, and callable objects. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: object includes null and arrays but excludes functions.
function edgeObject(value: { id: number } | number[] | null | (() => string)) {
  if (typeof value === "object") {
    type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    if (value === null) {
      type _E002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    } else {
      type _E003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    }
  } else {
    type _E004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "function") {
    type _E005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "object" && value !== null) {
    type _E007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value !== null && typeof value === "object") {
    type _E008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const category = typeof value;
  type _E009 = Expect<Equal<typeof category, TODO>>; // TODO(koan) @koan-error
  return category;
}
type _E010 = Expect<Equal<ReturnType<typeof edgeObject>, TODO>>; // TODO(koan) @koan-error

// Demonstration A: JavaScript reports null as object, so a typeof object branch
// must retain null until a separate equality check removes it.
function solvedNull(value: { id: number } | null) {
  if (typeof value === "object") {
    type _SolvedObjectIncludesNull = Expect<Equal<typeof value, { id: number } | null>>;
  }
  if (typeof value === "object" && value !== null) {
    type _SolvedNullRemoved = Expect<Equal<typeof value, { id: number }>>;
  }
}
void solvedNull;
// Demonstration B: functions have their own typeof category even though they are
// structurally objects with properties.
function solvedFunction(value: { id: number } | (() => string)) {
  if (typeof value === "function") {
    type _SolvedFunctionCategory = Expect<Equal<typeof value, () => string>>;
  }
}
void solvedFunction;

// Group 2: any, unknown, and never interact differently with a guard.
function edgeSpecial(anyValue: any, unknownValue: unknown, neverValue: never) {
  if (typeof anyValue === "string") {
    type _E011 = Expect<Equal<Kind<typeof anyValue>, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E012 = Expect<Equal<Kind<typeof anyValue>, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof unknownValue === "string") {
    type _E013 = Expect<Equal<typeof unknownValue, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E014 = Expect<Equal<Kind<typeof unknownValue>, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof unknownValue === "object") {
    type _E015 = Expect<Equal<typeof unknownValue, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof unknownValue === "function") {
    type _E016 = Expect<Equal<typeof unknownValue, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof neverValue === "string") {
    type _E017 = Expect<Equal<Kind<typeof neverValue>, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E018 = Expect<Equal<Kind<typeof neverValue>, TODO>>; // TODO(koan) @koan-error
  }
  const afterUnknown = unknownValue;
  type _E019 = Expect<Equal<Kind<typeof afterUnknown>, TODO>>; // TODO(koan) @koan-error
  return anyValue;
}
type _E020 = Expect<Equal<Kind<ReturnType<typeof edgeSpecial>>, TODO>>; // TODO(koan) @koan-error

// Demonstration C: a positive typeof guard makes any usable as that primitive,
// but the unmatched branch remains any.
function solvedAny(value: any) {
  if (typeof value === "string") {
    type _SolvedAnyPositive = Expect<Equal<Kind<typeof value>, "ordinary">>;
    type _SolvedAnyString = Expect<Equal<typeof value, string>>;
  } else {
    type _SolvedAnyElse = Expect<Equal<Kind<typeof value>, "any">>;
  }
}
void solvedAny;
// Demonstration D: a negative unknown branch is still unknown because excluding
// one runtime category does not enumerate every other possible type.
function solvedUnknown(value: unknown) {
  if (typeof value !== "string") {
    type _SolvedUnknownNegative = Expect<Equal<Kind<typeof value>, "unknown">>;
  }
}
void solvedUnknown;

// Group 3: Aliases, type queries, and invalid comparison strings have distinct rules.
function edgeSyntax(value: string | number | undefined) {
  const alias = value;
  if (typeof alias === "string") {
    type _E021 = Expect<Equal<typeof alias, TODO>>; // TODO(koan) @koan-error
    type _E022 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const category = typeof value;
  if (category === "number") {
    type _E023 = Expect<Equal<typeof category, TODO>>; // TODO(koan) @koan-error
    type _E024 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type E025 = typeof value;
  type _E025 = Expect<Equal<E025, TODO>>; // TODO(koan) @koan-error
  type E026 = typeof category;
  type _E026 = Expect<Equal<E026, TODO>>; // TODO(koan) @koan-error
  if (typeof value === "undefined") {
    type _E027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value !== "undefined") {
    type _E028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const finalValue = value;
  type _E029 = Expect<Equal<typeof finalValue, TODO>>; // TODO(koan) @koan-error
  return category;
}
type _E030 = Expect<Equal<ReturnType<typeof edgeSyntax>, TODO>>; // TODO(koan) @koan-error

// Demonstration E: `typeof value` in a type position is a type query. It reads
// the current static type and performs no runtime narrowing by itself.
function solvedTypeQuery(value: string | number) {
  type _SolvedBefore = Expect<Equal<typeof value, string | number>>;
  if (typeof value === "string") {
    type _SolvedInside = Expect<Equal<typeof value, string>>;
  }
}
void solvedTypeQuery;
// Demonstration F: a stored typeof result narrows the category alias itself, but
// this current form does not back-propagate that fact to the source value.
function solvedCategoryAlias(value: string | number) {
  const category = typeof value;
  if (category === "number") {
    type _SolvedCategory = Expect<Equal<typeof category, "number">>;
    type _SolvedSource = Expect<Equal<typeof value, string | number>>;
  }
}
void solvedCategoryAlias;

// @ts-expect-error Only recognized typeof result strings are meaningful comparisons.
function invalidTypeof(value: unknown) { return typeof value === "strnig"; }
