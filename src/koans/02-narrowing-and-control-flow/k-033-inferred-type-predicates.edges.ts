import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-033 edges: inferred predicates require an iff proof and retain ordinary boolean semantics when inference fails. */

// Group 1: Truthiness works for objects but cannot spell nonzero or nonempty primitives.
const objectTruth = (value: object | null) => !!value;
const numberTruth = (value: number | null) => !!value;
const stringTruth = (value: string | null) => !!value;
const booleanTruth = (value: boolean | null) => !!value;
type _E001 = Expect<Equal<typeof objectTruth, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof numberTruth, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof stringTruth, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof booleanTruth, TODO>>; // TODO(koan) @koan-error
const objects: Array<object | null> = [{}, null];
const numbers: Array<number | null> = [0, 1, null];
const strings: Array<string | null> = ["", "x", null];
const booleans: Array<boolean | null> = [false, true, null];
const keptObjects = objects.filter(objectTruth);
const keptNumbers = numbers.filter(numberTruth);
const keptStrings = strings.filter(stringTruth);
const keptBooleans = booleans.filter(booleanTruth);
type _E005 = Expect<Equal<typeof keptObjects, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof keptNumbers, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof keptStrings, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof keptBooleans, TODO>>; // TODO(koan) @koan-error

// Demonstration A: false from an object truthiness test means null. False from a
// number truthiness test could mean null, 0, -0, or NaN, and no inferred target
// can express the exact complement needed by a type predicate.

// Group 2: Extra semantic conditions usually prove only the true direction.
const nonEmptyString = (value: unknown) => typeof value === "string" && value.length > 0;
const positiveNumber = (value: unknown) => typeof value === "number" && value > 0;
const finiteNumber = (value: unknown) => typeof value === "number" && Number.isFinite(value);
const namedObject = (value: unknown) =>
  typeof value === "object" && value !== null && "name" in value;
type _E009 = Expect<Equal<typeof nonEmptyString, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof positiveNumber, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<typeof finiteNumber, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof namedObject, TODO>>; // TODO(koan) @koan-error
const unknowns: unknown[] = ["", "x", 1, {}];
const nonEmpty = unknowns.filter(nonEmptyString);
const positive = unknowns.filter(positiveNumber);
const finite = unknowns.filter(finiteNumber);
const named = unknowns.filter(namedObject);
type _E013 = Expect<Equal<typeof nonEmpty, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof positive, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof finite, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof named, TODO>>; // TODO(koan) @koan-error

// Demonstration B: a true result may prove string or number, but false does not
// prove "not string" or "not number" when a valid member can fail the extra test.

// Group 3: Syntax and mutation blockers preserve plain boolean signatures.
const annotated = (value: unknown): boolean => typeof value === "string";
function multiple(value: unknown) {
  if (typeof value === "string") return true;
  return false;
}
function mutates(value: string | number) {
  value = String(value);
  return typeof value === "string";
}
function implicit(value: unknown) {
  if (typeof value === "string") return true;
}
const viaBoolean = (value: unknown) => Boolean(value);
type _E017 = Expect<Equal<typeof annotated, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof multiple, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof mutates, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof implicit, TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<typeof viaBoolean, TODO>>; // TODO(koan) @koan-error
const annotatedValues = unknowns.filter(annotated);
const multipleValues = unknowns.filter(multiple);
type _E022 = Expect<Equal<typeof annotatedValues, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof multipleValues, TODO>>; // TODO(koan) @koan-error

// Demonstration C: explicit annotations are authoritative API design. Writing
// `: boolean` intentionally opts out even when the body could infer a predicate.

// Group 4: Generic, any, unknown, and never inputs show inference boundaries.
const genericDefined = <T>(value: T | undefined) => value !== undefined;
const genericPresent = <T>(value: T | null | undefined) => value != null;
const unknownString = (value: unknown) => typeof value === "string";
const anyString = (value: any) => typeof value === "string";
const neverString = (value: never) => typeof value === "string";
type _E024 = Expect<Equal<typeof genericDefined, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof genericPresent, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof unknownString, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof anyString, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof neverString, TODO>>; // TODO(koan) @koan-error
const optional: Array<string | undefined> = ["x"];
const defined = optional.filter(genericDefined);
type _E029 = Expect<Equal<typeof defined, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<ReturnType<typeof genericPresent>, TODO>>; // TODO(koan) @koan-error

// Demonstration D: ReturnType of any predicate is still boolean; the `is T`
// relationship lives in the call signature and is consumed by control flow.
