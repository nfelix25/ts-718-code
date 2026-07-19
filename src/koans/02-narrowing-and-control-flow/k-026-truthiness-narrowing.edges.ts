import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-026 edges: broad primitives, NaN, coercion helpers, and special types resist simple partitions. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: The type system cannot spell non-empty string or non-zero number.
function edgeBroadString(value: string | null) {
  if (value) {
    type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeBroadNumber(value: number | undefined) {
  if (value) {
    type _E003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeBroadBoolean(value: boolean | undefined) {
  if (value) {
    type _E005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeNumberOrEmpty(value: number | "") {
  if (value) {
    type _E007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void edgeBroadString;
void edgeBroadNumber;
void edgeBroadBoolean;
void edgeNumberOrEmpty;

// Demonstration A: the truthy branch of string is still spelled `string`, not a
// hypothetical NonEmptyString. The false branch retains string because `""` is
// already contained inside that broad type.
function solvedBroad(value: string | null) {
  if (value) {
    type _SolvedTruthy = Expect<Equal<typeof value, string>>;
  } else {
    type _SolvedFalsy = Expect<Equal<typeof value, string | null>>;
  }
}
void solvedBroad;

// Group 2: Some runtime falsy values have incomplete or collapsed type models.
type EdgeFalsy = false | 0 | 0n | "" | null | undefined;
function edgeAllFalsy(value: EdgeFalsy) {
  if (value) {
    type _E009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const edgeNaN = Number.NaN;
const edgeNegativeZero = -0;
const edgeZeroBigint = 0n;
const edgeEmptyString = "";
const edgeFalse = false;
type _E011 = Expect<Equal<typeof edgeNaN, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof edgeNegativeZero, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof edgeZeroBigint, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof edgeEmptyString, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof edgeFalse, TODO>>; // TODO(koan) @koan-error
void edgeAllFalsy;

// Demonstration B: NaN is falsy at runtime but has only the broad `number` type.
// -0 likewise shares the literal type 0, so there is no separate negative-zero
// narrowing result to learn.
type _SolvedNaN = Expect<Equal<typeof edgeNaN, number>>;
type _SolvedNegativeZero = Expect<Equal<typeof edgeNegativeZero, 0>>;

// Group 3: unknown narrows to `{}` when truthy; any remains an escape hatch.
function edgeUnknown(value: unknown) {
  if (value) {
    type _E016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E017 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
  const result = value || "fallback";
  type _E018 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
}
function edgeAny(value: any) {
  if (value) {
    type _E019 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E020 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
  const result = value || "fallback";
  type _E021 = Expect<Equal<Kind<typeof result>, TODO>>; // TODO(koan) @koan-error
}
function edgeNever(value: never) {
  if (value) {
    type _E022 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
void edgeUnknown;
void edgeAny;
void edgeNever;

// Demonstration C: `{}` here means any non-nullish value, not merely an object.
function solvedUnknown(value: unknown) {
  if (value) {
    type _SolvedUnknown = Expect<Equal<typeof value, {}>>;
  }
}
void solvedUnknown;

// Group 4: boolean coercion and object wrappers have distinct static behavior.
function edgeCoercion(value: string | null) {
  const direct = Boolean(value);
  const doubled = !!value;
  type _E023 = Expect<Equal<typeof direct, TODO>>; // TODO(koan) @koan-error
  type _E024 = Expect<Equal<typeof doubled, TODO>>; // TODO(koan) @koan-error
  if (Boolean(value)) {
    type _E025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!!value) {
    type _E026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const boxedFalse = new Boolean(false);
const boxedChoice = boxedFalse ? "truthy" as const : "falsy" as const;
const emptyArray: [] = [];
const arrayChoice = emptyArray ? "truthy" as const : "falsy" as const;
const zeroValue: number = 0;
const zeroOr = zeroValue || "fallback";
const nanValue: number = Number.NaN;
const nanOr = nanValue || "fallback";
type _E027 = Expect<Equal<typeof boxedChoice, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof arrayChoice, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof zeroOr, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof nanOr, TODO>>; // TODO(koan) @koan-error
void edgeCoercion;

// Demonstration D: `new Boolean(false)` is an object and therefore truthy. Its
// wrapped primitive does not control the wrapper object's truthiness. Empty
// arrays and empty objects are also truthy regardless of their contents.
type _SolvedBox = Expect<Equal<typeof boxedFalse, Boolean>>;
