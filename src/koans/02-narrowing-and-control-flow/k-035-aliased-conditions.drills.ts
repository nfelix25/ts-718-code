import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-035 drills: replay immutable guard aliases through direct, compound, discriminant, and chained facts. */

// Group 1: Direct aliases preserve typeof, equality, truthiness, and in facts.
function drillDirect(value: string | number) {
  const isString = typeof value === "string";
  if (isString) {
    type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D002 = Expect<Equal<typeof isString, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D004 = Expect<Equal<typeof isString, TODO>>; // TODO(koan) @koan-error
  }
}
function drillNullish(value: string | null | undefined) {
  const present = value != null;
  if (present) {
    type _D005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillTruthy(value: object | null) {
  const present = !!value;
  if (present) {
    type _D007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillIn(value: { id: string } | { name: string }) {
  const hasId = "id" in value;
  if (hasId) {
    type _D009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D011 = Expect<Equal<typeof hasId, TODO>>; // TODO(koan) @koan-error
  type _D012 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void drillDirect;
void drillNullish;
void drillTruthy;
void drillIn;

// Group 2: Compound aliases combine or negate component facts.
function drillCompound(value: string | number | null | undefined) {
  const isString = typeof value === "string";
  const isNumber = typeof value === "number";
  const present = value != null;
  const usableText = present && isString;
  const scalar = isString || isNumber;
  const notText = !isString;
  if (usableText) {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D014 = Expect<Equal<typeof isString, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (scalar) {
    type _D016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (notText) {
    type _D018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const numericAndPresent = present && isNumber;
  if (numericAndPresent) {
    type _D020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const neither = !isString && !isNumber;
  if (neither) {
    type _D021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D022 = Expect<Equal<typeof scalar, TODO>>; // TODO(koan) @koan-error
  type _D023 = Expect<Equal<typeof usableText, TODO>>; // TODO(koan) @koan-error
  type _D024 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void drillCompound;

// Group 3: Discriminant aliases preserve correlated object and tuple members.
type State =
  | { state: "idle" }
  | { state: "ready"; data: string }
  | { state: "failed"; error: Error };
function drillState(value: State) {
  const ready = value.state === "ready";
  const failed = value.state === "failed";
  if (ready) {
    type _D025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D026 = Expect<Equal<typeof value.data, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (failed) {
    type _D028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const terminal = ready || failed;
  if (terminal) {
    type _D030 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D031 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D032 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type Tuple = ["text", string] | ["count", number];
function drillTuple(value: Tuple) {
  const text = value[0] === "text";
  if (text) {
    type _D033 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D034 = Expect<Equal<typeof value[1], TODO>>; // TODO(koan) @koan-error
  } else {
    type _D035 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D036 = Expect<Equal<typeof text, TODO>>; // TODO(koan) @koan-error
}
void drillState;
void drillTuple;

// Group 4: Predicate and built-in guard results can be named when sources stay stable.
const isString = (value: unknown): value is string => typeof value === "string";
function drillGuards(value: unknown) {
  const stringResult = isString(value);
  if (stringResult) {
    type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D038 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const arrayResult = Array.isArray(value);
  if (arrayResult) {
    type _D039 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D040 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const objectResult = typeof value === "object" && value !== null;
  if (objectResult) {
    type _D041 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const dateResult = value instanceof Date;
  if (dateResult) {
    type _D042 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillProperty(value: { name?: string } | null) {
  const named = value?.name !== undefined;
  if (named) {
    type _D043 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D044 = Expect<Equal<typeof value.name, TODO>>; // TODO(koan) @koan-error
  }
}
function drillIndex(value: readonly unknown[]) {
  const first = value[0];
  const firstString = typeof first === "string";
  if (firstString) {
    type _D045 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
  }
}
type _D046 = Expect<Equal<ReturnType<typeof isString>, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<Parameters<typeof isString>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<typeof isString, TODO>>; // TODO(koan) @koan-error
void drillGuards;
void drillProperty;
void drillIndex;

// Group 5: Mutation, explicit coercion, mutable aliases, and depth limit replay.
function drillBlockers(value: string | number) {
  const before = typeof value === "string";
  value = 1;
  if (before) {
    type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  let mutable = typeof value === "string";
  if (mutable) {
    type _D050 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const annotated: boolean = typeof value === "string";
  if (annotated) {
    type _D051 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const coerced = Boolean(typeof value === "string");
  if (coerced) {
    type _D052 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const one = typeof value === "number";
  const two = one;
  const three = two;
  const four = three;
  const five = four;
  const six = five;
  if (two) {
    type _D053 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (three) {
    type _D054 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (four) {
    type _D055 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (five) {
    type _D056 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (six) {
    type _D057 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D058 = Expect<Equal<typeof mutable, TODO>>; // TODO(koan) @koan-error
  type _D059 = Expect<Equal<typeof coerced, TODO>>; // TODO(koan) @koan-error
  type _D060 = Expect<Equal<typeof six, TODO>>; // TODO(koan) @koan-error
  mutable = false;
}
void drillBlockers;
