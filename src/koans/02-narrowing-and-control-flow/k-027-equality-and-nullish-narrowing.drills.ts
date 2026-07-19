import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-027 drills: repeat literal selection, nullish exclusion, operand overlap, and property comparisons. */

// Group 1: Strict equality and inequality over finite literal unions.
function drillStrings(value: "draft" | "sent" | "failed") {
  if (value === "draft") {
    type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value !== "failed") {
    type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillNumbers(value: 0 | 1 | 2 | 3) {
  if (value === 0) {
    type _D005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value !== 3) {
    type _D007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillBooleans(value: boolean | null) {
  if (value === true) {
    type _D009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const targetStatus = "sent" as const;
function drillConstTarget(value: "draft" | "sent" | "failed") {
  if (value === targetStatus) {
    type _D011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D012 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void drillStrings;
void drillNumbers;
void drillBooleans;
void drillConstTarget;

// Group 2: Strict and loose nullish checks remove different sets.
function drillNullish(value: string | 0 | false | null | undefined) {
  if (value === null) {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value === undefined) {
    type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value == null) {
    type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value == undefined) {
    type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value != null) {
    type _D021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D022 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D023 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value == null ? "missing" : value;
}
type _D024 = Expect<Equal<ReturnType<typeof drillNullish>, TODO>>; // TODO(koan) @koan-error

// Group 3: Two-variable equality keeps their common possibilities.
function drillOverlap(left: string | number, right: string | boolean) {
  if (left === right) {
    type _D025 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
    type _D026 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D027 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
  }
  type _D028 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
}
function drillFiniteOverlap(left: "a" | "b" | 1, right: "b" | "c" | 2) {
  if (left === right) {
    type _D029 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
    type _D030 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D031 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
    type _D032 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
  }
}
function drillUnknownOverlap(left: string | number, right: unknown) {
  if (left === right) {
    type _D033 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
    type _D034 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
  }
}
function drillObjectReference(
  left: { kind: "a" } | { kind: "b" },
  right: { kind: "a" },
) {
  if (left === right) {
    type _D035 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
    type _D036 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
  }
}
void drillOverlap;
void drillFiniteOverlap;
void drillUnknownOverlap;
void drillObjectReference;

// Group 4: Optional chains, properties, indexed reads, and fallback operators.
type Result =
  | { kind: "ok"; value: number }
  | { kind: "error"; error: Error }
  | null
  | undefined;
function drillOptionalKind(value: Result) {
  if (value?.kind === "ok") {
    type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D038 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D039 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value?.kind == null) {
    type _D040 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillOptionalName(value: { name?: string } | null) {
  if (value?.name !== undefined) {
    type _D041 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D042 = Expect<Equal<typeof value.name, TODO>>; // TODO(koan) @koan-error
  }
}
function drillFallbacks(value: "" | 0 | false | null | undefined) {
  const nullish = value ?? "fallback";
  const truthy = value || "fallback";
  type _D043 = Expect<Equal<typeof nullish, TODO>>; // TODO(koan) @koan-error
  type _D044 = Expect<Equal<typeof truthy, TODO>>; // TODO(koan) @koan-error
}
function drillProperty(value: { code: 200 | 404 }) {
  if (value.code === 200) {
    type _D045 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D046 = Expect<Equal<typeof value.code, TODO>>; // TODO(koan) @koan-error
  }
}
function drillIndex(value: readonly [string?, number?]) {
  const first = value[0];
  if (first === undefined) {
    type _D047 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D048 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
  }
}
void drillOptionalKind;
void drillOptionalName;
void drillFallbacks;
void drillProperty;
void drillIndex;

// Group 5: unknown, any, never, Object.is, symbols, and generics.
type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";
function drillUnknown(value: unknown) {
  if (value === "ready") {
    type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value == null) {
    type _D050 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillAny(value: any) {
  if (value === "ready") {
    type _D051 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
  if (value == null) {
    type _D052 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillNever(value: never) {
  if (value === undefined) {
    type _D053 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillObjectIs(value: string | null) {
  if (Object.is(value, null)) {
    type _D054 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
const drillNaN = Number.NaN;
type _D055 = Expect<Equal<typeof drillNaN, TODO>>; // TODO(koan) @koan-error
function drillSymbols(left: symbol, right: symbol) {
  if (left === right) {
    type _D056 = Expect<Equal<typeof left, TODO>>; // TODO(koan) @koan-error
    type _D057 = Expect<Equal<typeof right, TODO>>; // TODO(koan) @koan-error
  }
}
function drillLoose(value: string | number) {
  if (value == "1") {
    type _D058 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillGeneric<T>(value: T) {
  if (value === undefined) {
    type _D059 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  return value == null ? undefined : value;
}
type _D060 = Expect<Equal<ReturnType<typeof drillGeneric>, TODO>>; // TODO(koan) @koan-error
void drillUnknown;
void drillAny;
void drillNever;
void drillObjectIs;
void drillSymbols;
void drillLoose;
