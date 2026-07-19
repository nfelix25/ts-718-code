import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { assertNever, fail } from "./k-030-exhaustiveness-and-never.js";

/** K-030 drills: prove closed domains empty through switches, exits, and never algebra. */

// Group 1: Exhaustive switches leave never after every member is handled.
type Token = { kind: "word"; text: string } | { kind: "number"; value: number } | { kind: "end" };
function drillSwitch(token: Token) {
  switch (token.kind) {
    case "word":
      type _D001 = Expect<Equal<typeof token, TODO>>; // TODO(koan) @koan-error
      break;
    case "number":
      type _D002 = Expect<Equal<typeof token, TODO>>; // TODO(koan) @koan-error
      break;
    case "end":
      type _D003 = Expect<Equal<typeof token, TODO>>; // TODO(koan) @koan-error
      break;
    default:
      type _D004 = Expect<Equal<typeof token, TODO>>; // TODO(koan) @koan-error
  }
}
function drillSwitchReturn(token: Token) {
  switch (token.kind) {
    case "word": return token.text;
    case "number": return String(token.value);
    case "end": return "end";
    default:
      type _D005 = Expect<Equal<typeof token, TODO>>; // TODO(koan) @koan-error
      return assertNever(token);
  }
}
type _D006 = Expect<Equal<ReturnType<typeof drillSwitchReturn>, TODO>>; // TODO(koan) @koan-error
type Color = "red" | "green" | "blue";
function drillColor(color: Color) {
  switch (color) {
    case "red":
      type _D007 = Expect<Equal<typeof color, TODO>>; // TODO(koan) @koan-error
      break;
    case "green":
      type _D008 = Expect<Equal<typeof color, TODO>>; // TODO(koan) @koan-error
      break;
    case "blue":
      type _D009 = Expect<Equal<typeof color, TODO>>; // TODO(koan) @koan-error
      break;
    default:
      type _D010 = Expect<Equal<typeof color, TODO>>; // TODO(koan) @koan-error
  }
}
function drillBoolean(value: boolean) {
  switch (value) {
    case true: return 1 as const;
    case false: return 0 as const;
    default:
      type _D011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return assertNever(value);
  }
}
type _D012 = Expect<Equal<ReturnType<typeof drillBoolean>, TODO>>; // TODO(koan) @koan-error
void drillSwitch;
void drillColor;

// Group 2: Early exits subtract members from the reachable remainder.
type State =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "ready"; data: string }
  | { state: "failed"; error: Error };
function drillReturns(value: State) {
  if (value.state === "idle") return "idle";
  type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "loading") return "loading";
  type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "ready") return value.data;
  type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const last = value;
  type _D016 = Expect<Equal<typeof last, TODO>>; // TODO(koan) @koan-error
  return last.error.message;
}
function drillThrows(value: State) {
  if (value.state === "failed") throw value.error;
  type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "idle") fail("idle");
  type _D018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "loading") return;
  type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value.data;
}
function drillFinal(value: State) {
  if (value.state !== "failed") return;
  type _D020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  throw value.error;
}
type _D021 = Expect<Equal<ReturnType<typeof drillReturns>, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<ReturnType<typeof drillThrows>, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<ReturnType<typeof drillFinal>, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<Parameters<typeof drillReturns>, TODO>>; // TODO(koan) @koan-error

// Group 3: Never-returning expressions and empty-union algebra.
const d025 = Math.random() ? "ok" as const : fail("no");
type _D025 = Expect<Equal<typeof d025, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<ReturnType<typeof fail>, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<string | never, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<string & never, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<never | number | boolean, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<never & { id: string }, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<[never] extends [never] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<never extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<unknown extends never ? true : false, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<keyof never, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<never[], TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<readonly never[], TODO>>; // TODO(koan) @koan-error

// Group 4: Assertions become maintenance checks for evolving APIs.
type Event = { type: "open"; id: string } | { type: "close"; id: string } | { type: "tick"; at: number };
function drillEvent(event: Event) {
  switch (event.type) {
    case "open":
      type _D037 = Expect<Equal<typeof event, TODO>>; // TODO(koan) @koan-error
      return event.id;
    case "close":
      type _D038 = Expect<Equal<typeof event, TODO>>; // TODO(koan) @koan-error
      return event.id;
    case "tick":
      type _D039 = Expect<Equal<typeof event, TODO>>; // TODO(koan) @koan-error
      return String(event.at);
    default:
      type _D040 = Expect<Equal<typeof event, TODO>>; // TODO(koan) @koan-error
      return assertNever(event);
  }
}
type Tuple = ["left", number] | ["right", string];
function drillTuple(value: Tuple) {
  if (value[0] === "left") {
    type _D041 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return value[1];
  }
  type _D042 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value[1];
}
type Numeric = { code: 1; one: string } | { code: 2; two: number };
function drillNumeric(value: Numeric) {
  switch (value.code) {
    case 1:
      type _D043 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value.one;
    case 2:
      type _D044 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return String(value.two);
    default:
      type _D045 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return assertNever(value);
  }
}
type _D046 = Expect<Equal<ReturnType<typeof drillEvent>, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<ReturnType<typeof drillTuple>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<ReturnType<typeof drillNumeric>, TODO>>; // TODO(koan) @koan-error

// Group 5: Open domains, any, unknown, and generic constraints resist proof.
type Kind<T> = 0 extends 1 & T ? "any" : [T] extends [never] ? "never" : "ordinary";
type Open = { kind: "fixed"; value: number } | { kind: string; raw: unknown };
function drillOpen(value: Open) {
  if (value.kind === "fixed") {
    type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D050 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillAny(value: any) {
  switch (value.kind) {
    default:
      type _D051 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillUnknown(value: unknown) {
  if (typeof value === "string") return value;
  type _D052 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function drillNever(value: never) {
  type _D053 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  return value;
}
function drillGeneric<T extends Event>(value: T) {
  if (value.type === "open") {
    type _D054 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D055 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function drillCatchAll(value: Event) {
  switch (value.type) {
    case "open": return value.id;
    default:
      type _D056 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return "other";
  }
}
type _D057 = Expect<Equal<Parameters<typeof assertNever>, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<Kind<ReturnType<typeof assertNever>>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<Kind<ReturnType<typeof drillNever>>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<ReturnType<typeof drillCatchAll>, TODO>>; // TODO(koan) @koan-error
void drillOpen;
void drillAny;
void drillUnknown;
void drillGeneric;
