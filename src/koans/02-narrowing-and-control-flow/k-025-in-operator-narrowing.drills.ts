import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Bird, Fish, Human } from "./k-025-in-operator-narrowing.js";

/** K-025 drills: partition union members by required, optional, absent, and newly observed keys. */

// Group 1: Required property partitions.
type Action =
  | { run: () => number; kind: "run" }
  | { stop: () => string; kind: "stop" }
  | { pause: () => boolean; kind: "pause" };
function drillRequired(value: Action) {
  if ("run" in value) {
    type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("stop" in value) {
    type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("pause" in value) {
    type _D005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!("run" in value)) {
    type _D007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("run" in value || "stop" in value) {
    type _D008 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("run" in value && value.kind === "run") {
    type _D009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const result = "run" in value ? value.run() : "stop" in value ? value.stop() : value.pause();
  type _D010 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  type _D011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return result;
}
type _D012 = Expect<Equal<ReturnType<typeof drillRequired>, TODO>>; // TODO(koan) @koan-error

// Group 2: Optional members survive both branches.
function drillOptional(value: Fish | Bird | Human) {
  if ("swim" in value) {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("fly" in value) {
    type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("swim" in value && value.swim) {
    type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    const swim = value.swim;
    type _D018 = Expect<Equal<typeof swim, TODO>>; // TODO(koan) @koan-error
  }
  if (!("swim" in value)) {
    type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("swim" in value || "fly" in value) {
    type _D020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("swim" in value && "fly" in value) {
    type _D021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const kind = value.kind;
  type _D022 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
  type _D023 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return kind;
}
type _D024 = Expect<Equal<ReturnType<typeof drillOptional>, TODO>>; // TODO(koan) @koan-error

// Group 3: Chained checks and early returns.
type Payload = { text: string } | { bytes: Uint8Array } | { json: object } | { error: Error };
function drillChain(value: Payload) {
  if ("text" in value) {
    type _D025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return value.text;
  }
  type _D026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if ("bytes" in value) {
    type _D027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return String(value.bytes.length);
  }
  type _D028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if ("json" in value) {
    type _D029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return JSON.stringify(value.json);
  }
  type _D030 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const remaining = value;
  type _D031 = Expect<Equal<typeof remaining, TODO>>; // TODO(koan) @koan-error
  return remaining.error.message;
}
type _D032 = Expect<Equal<ReturnType<typeof drillChain>, TODO>>; // TODO(koan) @koan-error

function drillElseIf(value: Payload) {
  if ("text" in value) {
    type _D033 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if ("bytes" in value) {
    type _D034 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if ("json" in value) {
    type _D035 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D036 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void drillElseIf;

// Group 4: Unknown plus object guards creates unknown-valued properties.
function drillUnknown(value: unknown) {
  if (typeof value === "object" && value !== null && "name" in value) {
    type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D038 = Expect<Equal<typeof value.name, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "object" && value !== null && "count" in value) {
    type _D039 = Expect<Equal<typeof value.count, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "object" && value !== null && 0 in value) {
    type _D040 = Expect<Equal<typeof value[0], TODO>>; // TODO(koan) @koan-error
  }
  const token = Symbol.iterator;
  if (typeof value === "object" && value !== null && token in value) {
    type _D041 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D042 = Expect<Equal<typeof value[typeof token], TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "function" && "prototype" in value) {
    type _D043 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const before = value;
  type _D044 = Expect<Equal<typeof before, TODO>>; // TODO(koan) @koan-error
  type _D045 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _D046 = Expect<Equal<ReturnType<typeof drillUnknown>, TODO>>; // TODO(koan) @koan-error

function drillObject(value: object) {
  if ("id" in value) {
    type _D047 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D048 = Expect<Equal<typeof value.id, TODO>>; // TODO(koan) @koan-error
  }
}
void drillObject;

// Group 5: String, number, symbol, and index-signature keys.
declare const uniqueKey: unique symbol;
type Keyed =
  | { name: string }
  | { 0: number }
  | { [uniqueKey]: boolean }
  | { [key: string]: Date };
function drillKeys(value: Keyed) {
  if ("name" in value) {
    type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (0 in value) {
    type _D050 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (uniqueKey in value) {
    type _D051 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("missing" in value) {
    type _D052 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!("name" in value)) {
    type _D053 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const dynamic: string = "name";
  if (dynamic in value) {
    type _D054 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const numeric: number = 0;
  if (numeric in value) {
    type _D055 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const symbol: symbol = uniqueKey;
  if (symbol in value) {
    type _D056 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D057 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _D058 = Expect<Equal<ReturnType<typeof drillKeys>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<keyof Keyed, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<Parameters<typeof drillKeys>, TODO>>; // TODO(koan) @koan-error
