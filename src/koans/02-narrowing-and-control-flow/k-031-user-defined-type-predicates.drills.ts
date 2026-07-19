import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { isNonNullish, isNumberArray, isString } from "./k-031-user-defined-type-predicates.js";

/** K-031 drills: repeat predicate contracts across unions, generics, collections, objects, and receivers. */

// Group 1: Primitive and union predicates refine true and false branches.
function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
function isBoolean(value: string | number | boolean): value is boolean {
  return typeof value === "boolean";
}
function drillPrimitives(value: string | number | boolean) {
  if (isNumber(value)) {
    type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (isBoolean(value)) {
    type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!isNumber(value)) {
    type _D005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (isNumber(value) || isBoolean(value)) {
    type _D006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (isNumber(value) && value > 0) {
    type _D007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function drillUnknown(value: unknown) {
  if (isString(value)) {
    type _D009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type _D011 = Expect<Equal<Parameters<typeof isNumber>, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<ReturnType<typeof isNumber>, TODO>>; // TODO(koan) @koan-error
void drillPrimitives;
void drillUnknown;

// Group 2: Generic predicates retain T while subtracting invalid members.
function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
function hasId<T>(value: T): value is T & { id: string } {
  return typeof value === "object"
    && value !== null
    && "id" in value
    && typeof value.id === "string";
}
function drillGeneric<T>(value: T | null | undefined) {
  if (isNonNullish(value)) {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (isDefined(value)) {
    type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (hasId(value)) {
    type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D018 = Expect<Equal<typeof value.id, TODO>>; // TODO(koan) @koan-error
  }
}
const genericValues: Array<string | number | undefined> = ["a", 1];
const definedValues = genericValues.filter(isDefined);
const presentValues = genericValues.filter(isNonNullish);
type _D019 = Expect<Equal<typeof definedValues, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<typeof presentValues, TODO>>; // TODO(koan) @koan-error
const foundDefined = genericValues.find(isDefined);
type _D021 = Expect<Equal<typeof foundDefined, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<ReturnType<typeof isDefined>, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<Parameters<typeof isDefined>, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<ReturnType<typeof hasId>, TODO>>; // TODO(koan) @koan-error
void drillGeneric;

// Group 3: Collection methods have predicate-aware overloads.
const mixed: unknown[] = ["a", 1, true];
const strings = mixed.filter(isString);
const numbers = mixed.filter(isNumber);
const firstString = mixed.find(isString);
const firstNumber = mixed.find(isNumber);
type _D025 = Expect<Equal<typeof strings, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<typeof numbers, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<typeof firstString, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<typeof firstNumber, TODO>>; // TODO(koan) @koan-error
function drillEvery(values: unknown[]) {
  if (values.every(isString)) {
    type _D029 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
    const first = values[0];
    type _D030 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
  }
  if (values.every(isNumber)) {
    type _D031 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
  }
}
const nested: unknown[] = [[1, 2], [3]];
const numericArrays = nested.filter(isNumberArray);
type _D032 = Expect<Equal<typeof numericArrays, TODO>>; // TODO(koan) @koan-error
const optionalStrings: Array<string | undefined> = ["a", undefined];
const compact = optionalStrings.filter(isDefined);
type _D033 = Expect<Equal<typeof compact, TODO>>; // TODO(koan) @koan-error
const rejected = mixed.filter(value => !isString(value));
type _D034 = Expect<Equal<typeof rejected, TODO>>; // TODO(koan) @koan-error
const everyString = mixed.every(isString);
type _D035 = Expect<Equal<typeof everyString, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<ReturnType<typeof drillEvery>, TODO>>; // TODO(koan) @koan-error

// Group 4: Object guards compose runtime evidence into structural promises.
type Named = { name: string };
type Active = { active: true };
function isRecord(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null;
}
function isNamed(value: unknown): value is Named {
  return isRecord(value) && typeof value.name === "string";
}
function isActive(value: unknown): value is Active {
  return isRecord(value) && value.active === true;
}
function isActiveNamed(value: unknown): value is Named & Active {
  return isNamed(value) && isActive(value);
}
function drillObjects(value: unknown) {
  if (isRecord(value)) {
    type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (isNamed(value)) {
    type _D038 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D039 = Expect<Equal<typeof value.name, TODO>>; // TODO(koan) @koan-error
  }
  if (isActiveNamed(value)) {
    type _D040 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D041 = Expect<Equal<typeof value.active, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D042 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const objects: unknown[] = [{ name: "a" }, { active: true }];
const named = objects.filter(isNamed);
const active = objects.filter(isActive);
const activeNamed = objects.filter(isActiveNamed);
type _D043 = Expect<Equal<typeof named, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<typeof active, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<typeof activeNamed, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<ReturnType<typeof isRecord>, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<Parameters<typeof isNamed>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<ReturnType<typeof isActiveNamed>, TODO>>; // TODO(koan) @koan-error
void drillObjects;

// Group 5: this predicates, wrappers, unions, and special values.
class Box<T> {
  constructor(public value: T | undefined) {}
  hasValue(): this is this & { value: T } {
    return this.value !== undefined;
  }
}
function drillThis(box: Box<number>) {
  if (box.hasValue()) {
    type _D049 = Expect<Equal<typeof box, TODO>>; // TODO(koan) @koan-error
    type _D050 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D051 = Expect<Equal<typeof box, TODO>>; // TODO(koan) @koan-error
  }
}
const booleanWrapper: (value: unknown) => boolean = isString;
const predicateWrapper: (value: unknown) => value is string = isString;
type _D052 = Expect<Equal<typeof booleanWrapper, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<typeof predicateWrapper, TODO>>; // TODO(koan) @koan-error
function drillWrapper(value: unknown) {
  if (booleanWrapper(value)) {
    type _D054 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (predicateWrapper(value)) {
    type _D055 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type Kind<T> = 0 extends 1 & T ? "any" : [T] extends [never] ? "never" : "ordinary";
function drillAny(value: any) {
  if (isString(value)) {
    type _D056 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D057 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillNever(value: never) {
  if (isString(value)) {
    type _D058 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
type UnionGuard = (value: string | number | boolean) => value is string | number;
const unionGuard: UnionGuard = value => typeof value !== "boolean";
type _D059 = Expect<Equal<typeof unionGuard, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<ReturnType<UnionGuard>, TODO>>; // TODO(koan) @koan-error
void drillThis;
void drillWrapper;
void drillAny;
void drillNever;
