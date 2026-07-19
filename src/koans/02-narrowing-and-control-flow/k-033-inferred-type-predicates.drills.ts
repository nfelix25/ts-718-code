import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-033 drills: identify inferred predicate signatures, collection effects, generic preservation, and blockers. */

// Group 1: Simple single-return refinements infer predicate signatures.
const inferredString = (value: unknown) => typeof value === "string";
const inferredNumber = (value: unknown) => typeof value === "number";
const inferredDate = (value: unknown) => value instanceof Date;
const inferredNull = (value: unknown) => value === null;
const inferredPrimitive = (value: unknown) => typeof value === "string" || typeof value === "number";
type Event = { type: "open"; id: string } | { type: "close"; code: number };
const inferredOpen = (value: Event) => value.type === "open";
type _D001 = Expect<Equal<typeof inferredString, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<typeof inferredNumber, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<typeof inferredDate, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<typeof inferredNull, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<typeof inferredPrimitive, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<typeof inferredOpen, TODO>>; // TODO(koan) @koan-error
function drillPrimitive(value: unknown) {
  if (inferredString(value)) {
    type _D007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (inferredPrimitive(value)) {
    type _D009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillEvent(value: Event) {
  if (inferredOpen(value)) {
    type _D010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type _D012 = Expect<Equal<ReturnType<typeof inferredString>, TODO>>; // TODO(koan) @koan-error
void drillPrimitive;
void drillEvent;

// Group 2: filter, find, and every consume inferred predicates.
const mixed: unknown[] = ["a", 1, new Date()];
const strings = mixed.filter(value => typeof value === "string");
const numbers = mixed.filter(value => typeof value === "number");
const dates = mixed.filter(value => value instanceof Date);
const primitives = mixed.filter(value => typeof value === "string" || typeof value === "number");
const nonStrings = mixed.filter(value => typeof value !== "string");
const firstString = mixed.find(value => typeof value === "string");
const firstDate = mixed.find(value => value instanceof Date);
type _D013 = Expect<Equal<typeof strings, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<typeof numbers, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<typeof dates, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<typeof primitives, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<typeof nonStrings, TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<typeof firstString, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<typeof firstDate, TODO>>; // TODO(koan) @koan-error
function drillEvery(values: unknown[]) {
  if (values.every(value => typeof value === "string")) {
    type _D020 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
    type _D021 = Expect<Equal<typeof values[number], TODO>>; // TODO(koan) @koan-error
  }
}
const events: Event[] = [{ type: "open", id: "x" }];
const opens = events.filter(value => value.type === "open");
const close = events.find(value => value.type === "close");
type _D022 = Expect<Equal<typeof opens, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<typeof close, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<ReturnType<typeof drillEvery>, TODO>>; // TODO(koan) @koan-error

// Group 3: Generic equality checks infer reusable generic predicates.
const inferredDefined = <T>(value: T | undefined) => value !== undefined;
const inferredPresent = <T>(value: T | null | undefined) => value != null;
const inferredNotNull = <T>(value: T | null) => value !== null;
type _D025 = Expect<Equal<typeof inferredDefined, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<typeof inferredPresent, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<typeof inferredNotNull, TODO>>; // TODO(koan) @koan-error
const optional: Array<string | number | undefined> = ["a", 1];
const defined = optional.filter(inferredDefined);
type _D028 = Expect<Equal<typeof defined, TODO>>; // TODO(koan) @koan-error
const nullable: Array<string | number | null | undefined> = ["a", null];
const present = nullable.filter(inferredPresent);
type _D029 = Expect<Equal<typeof present, TODO>>; // TODO(koan) @koan-error
function drillGeneric<T>(value: T | null | undefined) {
  if (inferredPresent(value)) {
    type _D030 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D031 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (inferredDefined(value)) {
    type _D032 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillGenericArray<T>(values: readonly (T | null)[]) {
  const filtered = values.filter(inferredNotNull);
  type _D033 = Expect<Equal<typeof filtered, TODO>>; // TODO(koan) @koan-error
  return filtered;
}
type _D034 = Expect<Equal<ReturnType<typeof inferredDefined>, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<ReturnType<typeof inferredPresent>, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<ReturnType<typeof drillGenericArray>, TODO>>; // TODO(koan) @koan-error
void drillGeneric;

// Group 4: Explicit annotations, multiple returns, and mutation block inference.
const annotated = (value: unknown): boolean => typeof value === "string";
function multiple(value: unknown) {
  if (typeof value === "string") return true;
  return false;
}
function mutates(value: string | number) {
  value = typeof value === "string" ? value : String(value);
  return typeof value === "string";
}
function implicit(value: unknown) {
  if (typeof value === "string") return true;
}
type _D037 = Expect<Equal<typeof annotated, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<typeof multiple, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<typeof mutates, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<typeof implicit, TODO>>; // TODO(koan) @koan-error
function drillBlocked(value: unknown) {
  if (annotated(value)) {
    type _D041 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (multiple(value)) {
    type _D042 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (implicit(value)) {
    type _D043 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const byAnnotated = mixed.filter(annotated);
const byMultiple = mixed.filter(multiple);
const byImplicit = mixed.filter(implicit);
type _D044 = Expect<Equal<typeof byAnnotated, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<typeof byMultiple, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<typeof byImplicit, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<ReturnType<typeof annotated>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<ReturnType<typeof multiple>, TODO>>; // TODO(koan) @koan-error
void drillBlocked;

// Group 5: The boolean expression must justify both result directions.
const truthyObject = (value: object | null) => !!value;
const truthyNumber = (value: number | null) => !!value;
const truthyString = (value: string | null) => !!value;
const viaBoolean = (value: object | null) => Boolean(value);
const longString = (value: unknown) => typeof value === "string" && value.length > 0;
const positiveNumber = (value: unknown) => typeof value === "number" && value > 0;
const wrappedString = (value: unknown) => inferredString(value);
const negatedString = (value: unknown) => !inferredString(value);
type _D049 = Expect<Equal<typeof truthyObject, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<typeof truthyNumber, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<typeof truthyString, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<typeof viaBoolean, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<typeof longString, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<typeof positiveNumber, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<typeof wrappedString, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<typeof negatedString, TODO>>; // TODO(koan) @koan-error
const objects: Array<object | null> = [{}, null];
const truthyObjects = objects.filter(truthyObject);
const numbersOrNull: Array<number | null> = [0, 1, null];
const truthyNumbers = numbersOrNull.filter(truthyNumber);
type _D057 = Expect<Equal<typeof truthyObjects, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<typeof truthyNumbers, TODO>>; // TODO(koan) @koan-error
const longValues = mixed.filter(longString);
type _D059 = Expect<Equal<typeof longValues, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<ReturnType<typeof truthyObject>, TODO>>; // TODO(koan) @koan-error
