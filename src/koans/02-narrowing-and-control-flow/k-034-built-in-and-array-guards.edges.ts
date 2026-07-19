import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-034 edges: any elements, readonly inputs, vacuous every, aliases, and array lookalikes need care. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: The built-in array guard's any[] target is intentionally permissive.
function edgeUnknown(value: unknown) {
  if (Array.isArray(value)) {
    type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E002 = Expect<Equal<Kind<typeof value[number]>, TODO>>; // TODO(koan) @koan-error
    const first = value[0];
    type _E003 = Expect<Equal<Kind<typeof first>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeAny(value: any) {
  if (Array.isArray(value)) {
    type _E004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E005 = Expect<Equal<Kind<typeof value[number]>, TODO>>; // TODO(koan) @koan-error
  }
}
const arraySignature = Array.isArray;
type _E006 = Expect<Equal<typeof arraySignature, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<Parameters<typeof arraySignature>, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<ReturnType<typeof arraySignature>, TODO>>; // TODO(koan) @koan-error

// Demonstration A: Array.isArray proves the container brand, not its element
// schema. Pair it with every, a decoder, or a domain-specific predicate at an
// unknown-data boundary.

// Group 2: every is vacuously true and alias mutation can stale a refinement.
function edgeEvery(values: unknown[]) {
  if (values.every(item => typeof item === "string")) {
    type _E009 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
    const first = values[0];
    type _E010 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
    const alias: unknown[] = values;
    alias.push(1);
    type _E011 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
  }
  if (values.some(item => typeof item === "string")) {
    type _E012 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
  }
}
const empty: unknown[] = [];
const vacuous = empty.every(item => typeof item === "string");
type _E013 = Expect<Equal<typeof vacuous, TODO>>; // TODO(koan) @koan-error
const filtered = empty.filter(item => typeof item === "string");
type _E014 = Expect<Equal<typeof filtered, TODO>>; // TODO(koan) @koan-error
const found = empty.find(item => typeof item === "string");
type _E015 = Expect<Equal<typeof found, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof filtered[0], TODO>>; // TODO(koan) @koan-error
void edgeEvery;

// Demonstration B: every proves an element type even for zero elements. It does
// not prove non-emptiness, and noUncheckedIndexedAccess still adds undefined.

// Group 3: Readonly arrays, tuples, typed arrays, and structural lookalikes differ.
function edgeReadonly(value: readonly string[] | { id: number }) {
  if (Array.isArray(value)) {
    type _E017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const tuple = ["a", 1] as const;
const tupleCheck = Array.isArray(tuple);
type _E019 = Expect<Equal<typeof tuple, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof tupleCheck, TODO>>; // TODO(koan) @koan-error
const typed = new Uint16Array([1]);
const typedArrayCheck = Array.isArray(typed);
const typedViewCheck = ArrayBuffer.isView(typed);
type _E021 = Expect<Equal<typeof typedArrayCheck, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof typedViewCheck, TODO>>; // TODO(koan) @koan-error
const lookalike = { 0: "a", length: 1, map: Array.prototype.map };
const lookalikeCheck = Array.isArray(lookalike);
type _E023 = Expect<Equal<typeof lookalike, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof lookalikeCheck, TODO>>; // TODO(koan) @koan-error
void edgeReadonly;

// Demonstration C: array branding is runtime identity, not a structural shape.
// Typed arrays use ArrayBuffer.isView; array-like objects remain non-arrays.

// Group 4: Numeric helpers return boolean without narrowing unknown inputs.
function edgeNumeric(value: unknown) {
  if (Number.isFinite(value)) {
    type _E025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (Number.isInteger(value)) {
    type _E026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (Number.isNaN(value)) {
    type _E027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type _E028 = Expect<Equal<Parameters<typeof Number.isFinite>, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<ReturnType<typeof Number.isFinite>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<ReturnType<typeof ArrayBuffer.isView>, TODO>>; // TODO(koan) @koan-error
void edgeNumeric;

// Demonstration D: a function can be a useful runtime classifier without being
// declared as a type predicate. Inspect the library signature, not the name.
