import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-034 drills: classify arrays, preserve tuples, validate elements, and contrast other built-ins. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Array.isArray introduces any[] for unconstrained unknown data.
function drillUnknown(value: unknown) {
  if (Array.isArray(value)) {
    type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D002 = Expect<Equal<Kind<typeof value[number]>, TODO>>; // TODO(koan) @koan-error
    const first = value[0];
    type _D003 = Expect<Equal<Kind<typeof first>, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!Array.isArray(value)) {
    type _D005 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillObject(value: object | null) {
  if (Array.isArray(value)) {
    type _D006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillArrayOrObject(value: string[] | { id: string }) {
  if (Array.isArray(value)) {
    type _D008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type _D010 = Expect<Equal<Parameters<typeof Array.isArray>, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<ReturnType<typeof Array.isArray>, TODO>>; // TODO(koan) @koan-error
const arrayCheck = Array.isArray({});
type _D012 = Expect<Equal<typeof arrayCheck, TODO>>; // TODO(koan) @koan-error
void drillUnknown;
void drillObject;
void drillArrayOrObject;

// Group 2: Concrete array and tuple members retain more useful information.
function drillTuple(value: [string, number] | { pair: false }) {
  if (Array.isArray(value)) {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D014 = Expect<Equal<typeof value[0], TODO>>; // TODO(koan) @koan-error
    type _D015 = Expect<Equal<typeof value[1], TODO>>; // TODO(koan) @koan-error
    type _D016 = Expect<Equal<typeof value.length, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillTupleUnion(value: ["a", string] | ["b", number] | Date) {
  if (Array.isArray(value)) {
    type _D018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    if (value[0] === "a") {
      type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    } else {
      type _D020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    }
  }
}
function drillReadonly(value: readonly string[] | { id: number }) {
  if (Array.isArray(value)) {
    type _D021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D022 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
class List<T> extends Array<T> {}
function drillSubclass(value: List<number> | Set<number>) {
  if (Array.isArray(value)) {
    type _D023 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D024 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void drillTuple;
void drillTupleUnion;
void drillReadonly;
void drillSubclass;

// Group 3: every narrows its receiver; filter and find narrow their results.
function drillElements(values: unknown[]) {
  if (values.every(item => typeof item === "string")) {
    type _D025 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
    type _D026 = Expect<Equal<typeof values[0], TODO>>; // TODO(koan) @koan-error
  } else {
    type _D027 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
  }
  type _D028 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
  const strings = values.filter(item => typeof item === "string");
  const numbers = values.filter(item => typeof item === "number");
  const firstString = values.find(item => typeof item === "string");
  const firstNumber = values.find(item => typeof item === "number");
  type _D029 = Expect<Equal<typeof strings, TODO>>; // TODO(koan) @koan-error
  type _D030 = Expect<Equal<typeof numbers, TODO>>; // TODO(koan) @koan-error
  type _D031 = Expect<Equal<typeof firstString, TODO>>; // TODO(koan) @koan-error
  type _D032 = Expect<Equal<typeof firstNumber, TODO>>; // TODO(koan) @koan-error
  if (values.some(item => typeof item === "string")) {
    type _D033 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
  }
  const allStrings = values.every(item => typeof item === "string");
  type _D034 = Expect<Equal<typeof allStrings, TODO>>; // TODO(koan) @koan-error
  const first = strings[0];
  type _D035 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
  return strings;
}
type _D036 = Expect<Equal<ReturnType<typeof drillElements>, TODO>>; // TODO(koan) @koan-error

// Group 4: Typed-array and numeric classifiers expose different predicate surfaces.
function drillView(value: unknown) {
  if (ArrayBuffer.isView(value)) {
    type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D038 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Uint8Array) {
    type _D039 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof DataView) {
    type _D040 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const viewCheck = ArrayBuffer.isView(new Uint8Array());
type _D041 = Expect<Equal<typeof viewCheck, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<Parameters<typeof ArrayBuffer.isView>, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<ReturnType<typeof ArrayBuffer.isView>, TODO>>; // TODO(koan) @koan-error
function drillNumber(value: unknown) {
  if (Number.isFinite(value)) {
    type _D044 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (Number.isInteger(value)) {
    type _D045 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (Number.isNaN(value)) {
    type _D046 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const finiteCheck = Number.isFinite(1);
type _D047 = Expect<Equal<typeof finiteCheck, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<ReturnType<typeof Number.isFinite>, TODO>>; // TODO(koan) @koan-error
void drillView;
void drillNumber;

// Group 5: Special types, indexed reads, and structural lookalikes.
function drillAny(value: any) {
  if (Array.isArray(value)) {
    type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D050 = Expect<Equal<Kind<typeof value[number]>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillNever(value: never) {
  if (Array.isArray(value)) {
    type _D051 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillGeneric<T>(value: T) {
  if (Array.isArray(value)) {
    type _D052 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillIndex(values: string[]) {
  const first = values[0];
  type _D053 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
  if (first !== undefined) {
    type _D054 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
  }
}
const fakeArray = { 0: "a", length: 1 };
const fakeCheck = Array.isArray(fakeArray);
type _D055 = Expect<Equal<typeof fakeArray, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<typeof fakeCheck, TODO>>; // TODO(koan) @koan-error
const typedArray = new Uint8Array([1]);
const typedCheck = Array.isArray(typedArray);
type _D057 = Expect<Equal<typeof typedArray, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<typeof typedCheck, TODO>>; // TODO(koan) @koan-error
const empty: unknown[] = [];
const emptyEvery = empty.every(item => typeof item === "string");
type _D059 = Expect<Equal<typeof emptyEvery, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<typeof empty[number], TODO>>; // TODO(koan) @koan-error
void drillAny;
void drillNever;
void drillGeneric;
void drillIndex;
