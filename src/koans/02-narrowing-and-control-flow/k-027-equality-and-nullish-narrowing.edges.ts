import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-027 edges: loose coercion, NaN, reference identity, and non-predicate APIs complicate equality. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: == null is precise; other loose comparisons invite coercion.
function edgeLoose(value: string | number | false | null | undefined) {
  if (value == null) {
    type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value == 0) {
    type _E003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value == false) {
    type _E004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const looseZero: unknown = 0;
const looseEmpty: unknown = "";
const looseFalse: unknown = false;
const looseStringZero: unknown = "0";
const zeroEqualsEmpty = looseZero == looseEmpty;
const falseEqualsStringZero = looseFalse == looseStringZero;
type _E005 = Expect<Equal<typeof zeroEqualsEmpty, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof falseEqualsStringZero, TODO>>; // TODO(koan) @koan-error
void edgeLoose;

// Demonstration A: loose null equality is intentionally modeled as exactly the
// two nullish values, with no numeric or string coercion involved.
function solvedLooseNull(value: string | 0 | false | null | undefined) {
  if (value == null) {
    type _SolvedNullish = Expect<Equal<typeof value, null | undefined>>;
  } else {
    type _SolvedPresent = Expect<Equal<typeof value, string | 0 | false>>;
  }
}
void solvedLooseNull;

// Group 2: NaN and signed zero motivate Object.is, but Object.is is not a guard.
const edgeNaN = Number.NaN;
const nanObjectIs = Object.is(edgeNaN, edgeNaN);
const nanStrict = edgeNaN === edgeNaN;
const edgeNegativeZero = -0;
const signedZeroObjectIs = Object.is(edgeNegativeZero, 0);
const boxedOneA = new Number(1);
const boxedOneB = new Number(1);
const boxedStrict = boxedOneA === boxedOneB;
const boxedObjectIs = Object.is(boxedOneA, boxedOneB);
const widenedZero: number = 0;
type _E007 = Expect<Equal<typeof edgeNaN, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof nanObjectIs, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof nanStrict, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof edgeNegativeZero, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<typeof signedZeroObjectIs, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof boxedStrict, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof boxedObjectIs, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof widenedZero, TODO>>; // TODO(koan) @koan-error

// Demonstration B: both strict equality and Object.is return boolean. Runtime
// semantics differ: Object.is considers NaN equal to itself and distinguishes
// -0 from 0, while === does the opposite for those two cases.

// Group 3: special and generic types expose the boundaries of narrowing.
function edgeUnknown(value: unknown) {
  if (value == null) {
    type _E015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeAny(value: any) {
  if (value === null) {
    type _E017 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E018 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeNever(value: never) {
  if (value === null) {
    type _E019 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeGeneric<T>(value: T, other: T) {
  if (value === undefined) {
    type _E020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value === other) {
    type _E021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void edgeUnknown;
void edgeAny;
void edgeNever;
void edgeGeneric;

// Demonstration C: any remains any through equality guards, while an unknown
// value checked with == null becomes null | undefined on that path.

// Group 4: object equality means reference identity, not structural equality.
function edgeReferences(
  left: { id: number } | null,
  right: { id: number } | undefined,
) {
  if (left === right) {
    type _E022 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
    type _E023 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeSymbols(left: symbol, right: symbol) {
  const equal = left === right;
  type _E024 = Expect<Equal<typeof equal, TODO>>; // TODO(koan) @koan-error
}
function edgeObjectIs(value: string | null) {
  if (Object.is(value, null)) {
    type _E025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeOptional(value: { name?: string } | null | undefined) {
  if (value?.name === undefined) {
    type _E026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const knownDate = new Date(0);
function edgeKnownObject(value: Date | RegExp) {
  if (value === knownDate) {
    type _E028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const sharedObject = { id: 1 };
const sameReference = sharedObject === sharedObject;
type _E029 = Expect<Equal<typeof sameReference, TODO>>; // TODO(koan) @koan-error
function edgeTypeofComparison(left: unknown, right: unknown) {
  const sameCategory = typeof left === typeof right;
  type _E030 = Expect<Equal<typeof sameCategory, TODO>>; // TODO(koan) @koan-error
}
void edgeReferences;
void edgeSymbols;
void edgeObjectIs;
void edgeOptional;
void edgeKnownObject;
void edgeTypeofComparison;

// Demonstration D: a method returning boolean does not become a type guard just
// because its runtime predicate resembles ===. Object.is therefore leaves the
// checked variable at its declared control-flow type.
function solvedObjectIs(value: string | null) {
  if (Object.is(value, null)) {
    type _SolvedUnchanged = Expect<Equal<typeof value, string | null>>;
  }
}
void solvedObjectIs;

// @ts-expect-error A direct comparison to NaN is always false; use Number.isNaN.
function invalidNaNComparison(value: number) { return value === NaN; }
