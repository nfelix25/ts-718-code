import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-026 drills: repeat truthy/falsy partitions across literals, broad types, objects, and expressions. */

// Group 1: Literal falsy members can be removed exactly.
type LiteralMix = "" | "go" | 0 | 2 | false | true | 0n | 3n | null | undefined;
function drillLiteralMix(value: LiteralMix) {
  if (value) {
    type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!value) {
    type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillLiteralStrings(value: "" | "a" | "b" | null) {
  if (value) {
    type _D005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillLiteralNumbers(value: 0 | 1 | 2 | undefined) {
  if (value) {
    type _D007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillLiteralBigints(value: 0n | 1n | 2n | null) {
  if (value) {
    type _D009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillLiteralBooleans(value: true | false | undefined) {
  if (value) {
    type _D011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D012 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void drillLiteralMix;
void drillLiteralStrings;
void drillLiteralNumbers;
void drillLiteralBigints;
void drillLiteralBooleans;

// Group 2: Broad primitives overlap the falsy set differently.
function drillBroadString(value: string | null) {
  if (value) {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillBroadNumber(value: number | null) {
  if (value) {
    type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillBroadBigint(value: bigint | undefined) {
  if (value) {
    type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillBroadBoolean(value: boolean | undefined) {
  if (value) {
    type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillSymbol(value: symbol | undefined) {
  if (value) {
    type _D021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D022 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillFunction(value: (() => void) | undefined) {
  if (value) {
    type _D023 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D024 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void drillBroadString;
void drillBroadNumber;
void drillBroadBigint;
void drillBroadBoolean;
void drillSymbol;
void drillFunction;

// Group 3: Every object value, including empty arrays, is truthy.
function drillObject(value: { id: number } | null | undefined) {
  if (value) {
    type _D025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillArray(value: string[] | undefined) {
  if (value) {
    type _D027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillDate(value: Date | false) {
  if (value) {
    type _D029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D030 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillTuple(value: readonly [] | null) {
  if (value) {
    type _D031 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D032 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillOptionalName(value: { name: string } | undefined) {
  if (value?.name) {
    type _D033 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D034 = Expect<Equal<typeof value.name, TODO>>; // TODO(koan) @koan-error
  }
}
function drillNested(value: { child?: { id: number } } | null) {
  if (value?.child) {
    type _D035 = Expect<Equal<typeof value.child, TODO>>; // TODO(koan) @koan-error
  }
  type _D036 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void drillObject;
void drillArray;
void drillDate;
void drillTuple;
void drillOptionalName;
void drillNested;

// Group 4: Logical expressions expose which side supplies each result.
function drillLogical(value: string | null | undefined) {
  const andLength = value && value.length;
  const orText = value || "fallback";
  const nullishText = value ?? "fallback";
  type _D037 = Expect<Equal<typeof andLength, TODO>>; // TODO(koan) @koan-error
  type _D038 = Expect<Equal<typeof orText, TODO>>; // TODO(koan) @koan-error
  type _D039 = Expect<Equal<typeof nullishText, TODO>>; // TODO(koan) @koan-error
}
function drillNumberAnd(value: 0 | 1 | undefined) {
  const result = value && value.toFixed();
  type _D040 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
}
function drillObjectOperators(value: false | { id: number }) {
  const andId = value && value.id;
  const orObject = value || { id: 0 };
  type _D041 = Expect<Equal<typeof andId, TODO>>; // TODO(koan) @koan-error
  type _D042 = Expect<Equal<typeof orObject, TODO>>; // TODO(koan) @koan-error
}
function drillFallback(value: "" | "ok" | undefined) {
  const result = value || "default";
  type _D043 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
}
function drillTernary(value: 0 | 1 | 2 | null) {
  const result = value ? "present" as const : "absent" as const;
  type _D044 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
}
function drillArrayAnd(value: readonly string[] | undefined) {
  const length = value && value.length;
  type _D045 = Expect<Equal<typeof length, TODO>>; // TODO(koan) @koan-error
}
function drillBooleanAnd(value: boolean) {
  const result = value && "yes";
  type _D046 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
}
function drillUnknownAnd(value: unknown) {
  const result = value && "yes";
  type _D047 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  return result;
}
type _D048 = Expect<Equal<ReturnType<typeof drillUnknownAnd>, TODO>>; // TODO(koan) @koan-error

// Group 5: Special types, coercion forms, and generic values.
type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";
function drillUnknown(value: unknown) {
  if (value) {
    type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D050 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillAny(value: any) {
  if (value) {
    type _D051 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D052 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillNever(value: never) {
  if (value) {
    type _D053 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
const truthyLiteral = "ok" as const;
const truthyChoice = truthyLiteral ? 1 : 0;
type _D054 = Expect<Equal<typeof truthyChoice, TODO>>; // TODO(koan) @koan-error
const falsyLiteral = "" as const;
const falsyChoice = falsyLiteral ? 1 : 0;
type _D055 = Expect<Equal<typeof falsyChoice, TODO>>; // TODO(koan) @koan-error
function drillDouble(value: string | null) {
  if (!!value) {
    type _D056 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D057 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (Boolean(value)) {
    type _D058 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillGeneric<T>(value: T) {
  if (value) {
    type _D059 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  return value || undefined;
}
type _D060 = Expect<Equal<ReturnType<typeof drillGeneric>, TODO>>; // TODO(koan) @koan-error
void drillUnknown;
void drillAny;
void drillNever;
void drillDouble;
