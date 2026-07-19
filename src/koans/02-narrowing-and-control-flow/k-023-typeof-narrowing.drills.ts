import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-023 drills: capture the observed type at every positive, negative, and remaining path. */

// Group 1: Positive primitive categories.
function drillPositive(value: string | number | boolean | bigint | symbol | undefined) {
  if (typeof value === "string") {
    type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "number") {
    type _D002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "boolean") {
    type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "bigint") {
    type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "symbol") {
    type _D005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "undefined") {
    type _D006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const unchanged = value;
  type _D007 = Expect<Equal<typeof unchanged, TODO>>; // TODO(koan) @koan-error
  if (typeof unchanged === "string") {
    const alias = unchanged;
    type _D008 = Expect<Equal<typeof alias, TODO>>; // TODO(koan) @koan-error
  }
  const category = typeof value;
  type _D009 = Expect<Equal<typeof category, TODO>>; // TODO(koan) @koan-error
  if (category === "number") {
    type _D010 = Expect<Equal<typeof category, TODO>>; // TODO(koan) @koan-error
    type _D011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D012 = Expect<Equal<ReturnType<typeof drillPositive>, TODO>>; // TODO(koan) @koan-error
}
void drillPositive;

// Group 2: Negative checks and else paths.
function drillNegative(value: string | number | boolean | undefined) {
  if (typeof value !== "string") {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value !== "number") {
    type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value !== "boolean") {
    type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value !== "undefined") {
    type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!(typeof value === "string")) {
    type _D021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "string") {
    type _D022 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D023 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D024 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void drillNegative;

// Group 3: Chained consumption and early exits.
function drillChain(value: string | number | boolean | bigint | undefined) {
  if (typeof value === "string") {
    type _D025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return value.length;
  }
  type _D026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (typeof value === "number") {
    type _D027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return value;
  }
  type _D028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (typeof value === "boolean") {
    type _D029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return value ? 1 : 0;
  }
  type _D030 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (typeof value === "bigint") {
    type _D031 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return Number(value);
  }
  type _D032 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const finalValue = value;
  type _D033 = Expect<Equal<typeof finalValue, TODO>>; // TODO(koan) @koan-error
  return 0;
}
type _D034 = Expect<Equal<ReturnType<typeof drillChain>, TODO>>; // TODO(koan) @koan-error

function drillTernary(value: string | number) {
  const result = typeof value === "string" ? value.length : value.toFixed();
  type _D035 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  return result;
}
type _D036 = Expect<Equal<ReturnType<typeof drillTernary>, TODO>>; // TODO(koan) @koan-error

// Group 4: Object and function runtime categories.
type Objectish = { id: number } | readonly number[] | null | (() => string) | string;
function drillObjects(value: Objectish) {
  if (typeof value === "object") {
    type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    if (value === null) {
      type _D038 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    } else {
      type _D039 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    }
  }
  if (typeof value === "function") {
    type _D040 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    const called = value();
    type _D041 = Expect<Equal<typeof called, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "string") {
    type _D042 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value !== "object") {
    type _D043 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value !== "function") {
    type _D044 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "object" && value !== null) {
    type _D045 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const category = typeof value;
  type _D046 = Expect<Equal<typeof category, TODO>>; // TODO(koan) @koan-error
  type _D047 = Expect<Equal<keyof typeof value, TODO>>; // TODO(koan) @koan-error
  return category;
}
type _D048 = Expect<Equal<ReturnType<typeof drillObjects>, TODO>>; // TODO(koan) @koan-error

// Group 5: unknown gains one safe runtime category at a time.
function drillUnknown(value: unknown) {
  if (typeof value === "string") {
    type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "number") {
    type _D050 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "boolean") {
    type _D051 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "bigint") {
    type _D052 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "symbol") {
    type _D053 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "undefined") {
    type _D054 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "function") {
    type _D055 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "object") {
    type _D056 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value !== "object") {
    type _D057 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const before = value;
  type _D058 = Expect<Equal<typeof before, TODO>>; // TODO(koan) @koan-error
  const category = typeof value;
  type _D059 = Expect<Equal<typeof category, TODO>>; // TODO(koan) @koan-error
  return category;
}
type _D060 = Expect<Equal<ReturnType<typeof drillUnknown>, TODO>>; // TODO(koan) @koan-error
