import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Shape } from "./k-029-discriminated-unions.js";

/** K-029 drills: repeat whole-member selection across tags, switches, shared tags, and tuple heads. */

// Group 1: Unique string discriminants select complete members.
function drillShape(shape: Shape) {
  if (shape.kind === "circle") {
    type _D001 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D002 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  }
  if (shape.kind === "square") {
    type _D003 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D004 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  }
  if (shape.kind !== "rectangle") {
    type _D005 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D006 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  }
  if (shape.kind === "circle" || shape.kind === "square") {
    type _D007 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
    const kind = shape.kind;
    type _D008 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
  }
  const result = shape.kind === "circle" ? shape.radius : 0;
  type _D009 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  const kind = shape.kind;
  type _D010 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
  type _D011 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  return shape;
}
type _D012 = Expect<Equal<Parameters<typeof drillShape>, TODO>>; // TODO(koan) @koan-error

// Group 2: Switches and early returns progressively remove members.
type Network =
  | { state: "idle" }
  | { state: "connecting"; attempt: number }
  | { state: "online"; socket: WebSocket }
  | { state: "failed"; reason: string };
function drillSwitch(value: Network) {
  switch (value.state) {
    case "idle":
      type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      break;
    case "connecting":
      type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      break;
    case "online":
      type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      break;
    case "failed":
      type _D016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      break;
  }
}
function drillReturns(value: Network) {
  if (value.state === "idle") return "idle";
  type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "connecting") return String(value.attempt);
  type _D018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "online") return "online";
  type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const remaining = value;
  type _D020 = Expect<Equal<typeof remaining, TODO>>; // TODO(koan) @koan-error
  return remaining.reason;
}
const network: Network = Math.random() ? { state: "idle" } : { state: "failed", reason: "x" };
const label = network.state === "failed" ? network.reason : network.state;
type _D021 = Expect<Equal<typeof label, TODO>>; // TODO(koan) @koan-error
const networks: Network[] = [network];
const first = networks[0];
type _D022 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
const failures = networks.filter(value => value.state === "failed");
type _D023 = Expect<Equal<typeof failures, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<ReturnType<typeof drillReturns>, TODO>>; // TODO(koan) @koan-error
void drillSwitch;

// Group 3: Booleans, numbers, unique symbols, and tuple heads discriminate.
type BoolResult = { ok: true; data: number } | { ok: false; issue: Error };
function drillBoolean(value: BoolResult) {
  if (value.ok) {
    type _D025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D026 = Expect<Equal<typeof value.data, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D028 = Expect<Equal<typeof value.issue, TODO>>; // TODO(koan) @koan-error
  }
}
type Numeric = { code: 0; empty: true } | { code: 1; item: string } | { code: 2; items: string[] };
function drillNumeric(value: Numeric) {
  if (value.code === 0) {
    type _D029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (value.code === 1) {
    type _D030 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D031 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D032 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
declare const openTag: unique symbol;
declare const closeTag: unique symbol;
type Symbolic = { tag: typeof openTag; fd: number } | { tag: typeof closeTag; reason: string };
function drillSymbol(value: Symbolic) {
  if (value.tag === openTag) {
    type _D033 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D034 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type TupleEvent = ["data", Uint8Array] | ["error", Error] | ["end"];
function drillTuple(value: TupleEvent) {
  if (value[0] === "data") {
    type _D035 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D036 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void drillBoolean;
void drillNumeric;
void drillSymbol;
void drillTuple;

// Group 4: Shared, broad, and optional tags retain overlapping members.
type Shared =
  | { kind: "input"; mode: "text"; text: string }
  | { kind: "input"; mode: "file"; path: string }
  | { kind: "output"; bytes: Uint8Array };
function drillShared(value: Shared) {
  if (value.kind === "input") {
    type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    if (value.mode === "text") {
      type _D038 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    } else {
      type _D039 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    }
  } else {
    type _D040 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type Broad = { kind: "known"; value: number } | { kind: string; raw: unknown };
function drillBroad(value: Broad) {
  if (value.kind === "known") {
    type _D041 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D042 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value.kind === "other") {
    type _D043 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D044 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type OptionalTag = { kind: "fixed"; value: number } | { kind?: "loose"; fallback: string };
function drillOptional(value: OptionalTag) {
  if (value.kind === "fixed") {
    type _D045 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D046 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value.kind === undefined) {
    type _D047 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D048 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void drillShared;
void drillBroad;
void drillOptional;

// Group 5: Nested evidence, readonly members, collections, and special values.
type Nested = { meta: { kind: "a" }; a: number } | { meta: { kind: "b" }; b: string };
function drillNested(value: Nested) {
  if (value.meta.kind === "a") {
    type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D050 = Expect<Equal<typeof value.meta.kind, TODO>>; // TODO(koan) @koan-error
  }
}
type ReadonlyState = { readonly state: "on"; watts: number } | { readonly state: "off"; since: Date };
function drillReadonly(value: ReadonlyState) {
  if (value.state === "on") {
    type _D051 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type WithCommon = (Shape & { id: string });
function drillIntersection(value: WithCommon) {
  if (value.kind === "square") {
    type _D052 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillGeneric<T extends Shape>(value: T) {
  if (value.kind === "circle") {
    type _D053 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillUnknown(value: unknown) {
  if (typeof value === "object" && value !== null && "kind" in value && value.kind === "known") {
    type _D054 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D055 = Expect<Equal<typeof value.kind, TODO>>; // TODO(koan) @koan-error
  }
}
type Kind<T> = 0 extends 1 & T ? "any" : [T] extends [never] ? "never" : "ordinary";
function drillAny(value: any) {
  if (value.kind === "x") {
    type _D056 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillNever(value: never) {
  type _D057 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
function drillMap(value: Map<string, Shape>, key: string) {
  const found = value.get(key);
  if (found?.kind === "circle") {
    type _D058 = Expect<Equal<typeof found, TODO>>; // TODO(koan) @koan-error
  }
}
function drillArray(value: readonly Shape[]) {
  const found = value[0];
  if (found?.kind === "square") {
    type _D059 = Expect<Equal<typeof found, TODO>>; // TODO(koan) @koan-error
  }
  return found;
}
type _D060 = Expect<Equal<ReturnType<typeof drillArray>, TODO>>; // TODO(koan) @koan-error
void drillNested;
void drillReadonly;
void drillIntersection;
void drillGeneric;
void drillUnknown;
void drillAny;
void drillNever;
void drillMap;
