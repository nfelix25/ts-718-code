import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { Animal, Cat, Circle, Dog, Rectangle } from "./k-024-instanceof-narrowing.js";

/** K-024 drills: follow the prototype evidence into true, false, chained, and remaining paths. */

// Group 1: Built-in constructor branches.
function drillBuiltIns(value: Date | Error | RegExp | Map<string, number> | Set<boolean>) {
  if (value instanceof Date) {
    type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Error) {
    type _D002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof RegExp) {
    type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Map) {
    type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Set) {
    type _D005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!(value instanceof Date)) {
    type _D006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Date) {
    type _D007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const unchanged = value;
  type _D009 = Expect<Equal<typeof unchanged, TODO>>; // TODO(koan) @koan-error
  if (unchanged instanceof Error) {
    type _D010 = Expect<Equal<typeof unchanged, TODO>>; // TODO(koan) @koan-error
  }
  type _D011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _D012 = Expect<Equal<ReturnType<typeof drillBuiltIns>, TODO>>; // TODO(koan) @koan-error
}
void drillBuiltIns;

// Group 2: User classes and negative branches.
function drillShapes(value: Circle | Rectangle | Date) {
  if (value instanceof Circle) {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Rectangle) {
    type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Date) {
    type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!(value instanceof Circle)) {
    type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Circle || value instanceof Rectangle) {
    type _D020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Circle && value.radius > 0) {
    type _D021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const result = value instanceof Circle ? value.radius : value instanceof Rectangle ? value.width : value.getTime();
  type _D022 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  type _D023 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return result;
}
type _D024 = Expect<Equal<ReturnType<typeof drillShapes>, TODO>>; // TODO(koan) @koan-error

// Group 3: Base and derived constructors.
function drillHierarchy(value: Animal | Dog | Cat | Date) {
  if (value instanceof Animal) {
    type _D025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Dog) {
    type _D027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Cat) {
    type _D029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D030 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Animal && value instanceof Dog) {
    type _D031 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Animal && !(value instanceof Dog)) {
    type _D032 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Dog || value instanceof Cat) {
    type _D033 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!(value instanceof Animal)) {
    type _D034 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const name = value instanceof Animal ? value.name : value.toISOString();
  type _D035 = Expect<Equal<typeof name, TODO>>; // TODO(koan) @koan-error
  return name;
}
type _D036 = Expect<Equal<ReturnType<typeof drillHierarchy>, TODO>>; // TODO(koan) @koan-error

// Group 4: Early returns and chained constructor elimination.
function drillReturns(value: Date | Error | RegExp | URL) {
  if (value instanceof Date) return value.getTime();
  type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value instanceof Error) return value.message;
  type _D038 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value instanceof RegExp) return value.source;
  type _D039 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const remaining = value;
  type _D040 = Expect<Equal<typeof remaining, TODO>>; // TODO(koan) @koan-error
  return remaining.href;
}
type _D041 = Expect<Equal<ReturnType<typeof drillReturns>, TODO>>; // TODO(koan) @koan-error

function drillElseIf(value: Date | Error | RegExp | URL) {
  if (value instanceof Date) {
    type _D042 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (value instanceof Error) {
    type _D043 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (value instanceof RegExp) {
    type _D044 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D045 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D046 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _D047 = Expect<Equal<ReturnType<typeof drillElseIf>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<Parameters<typeof drillElseIf>, TODO>>; // TODO(koan) @koan-error

// Group 5: unknown and broad object inputs.
function drillUnknown(value: unknown) {
  if (value instanceof Date) {
    type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Error) {
    type _D050 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof RegExp) {
    type _D051 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Map) {
    type _D052 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Set) {
    type _D053 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Array) {
    type _D054 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Number) {
    type _D055 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof String) {
    type _D056 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Boolean) {
    type _D057 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const unchanged = value;
  type _D058 = Expect<Equal<typeof unchanged, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _D059 = Expect<Equal<ReturnType<typeof drillUnknown>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<Parameters<typeof drillUnknown>, TODO>>; // TODO(koan) @koan-error
