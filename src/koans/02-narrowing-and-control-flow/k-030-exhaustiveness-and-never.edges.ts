import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { assertNever, fail } from "./k-030-exhaustiveness-and-never.js";

/** K-030 edges: catch-alls, open tags, casts, and special types can counterfeit exhaustiveness. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: A catch-all handles runtime values but does not prove them impossible.
type State = { state: "idle" } | { state: "ready"; data: string } | { state: "failed"; error: Error };
function edgeDefault(value: State) {
  switch (value.state) {
    case "idle": return "idle";
    default:
      type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return "other";
  }
}
type OpenState = { state: "known"; value: number } | { state: string; payload: unknown };
function edgeOpen(value: OpenState) {
  switch (value.state) {
    case "known":
      type _E002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      break;
    default:
      type _E003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function edgeComplete(value: State) {
  switch (value.state) {
    case "idle": return "idle";
    case "ready": return value.data;
    case "failed": return value.error.message;
    default:
      type _E005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return assertNever(value);
  }
}
type _E006 = Expect<Equal<ReturnType<typeof edgeDefault>, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<ReturnType<typeof edgeOpen>, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<ReturnType<typeof edgeComplete>, TODO>>; // TODO(koan) @koan-error

// Demonstration A: a default that returns a normal value is runtime fallback,
// not an exhaustiveness assertion. New union members silently flow through it.

// Group 2: Never has surprising behavior in conditional and collection contexts.
type Distribute<T> = T extends string ? "string" : "other";
type Wrapped<T> = [T] extends [string] ? "string" : "other";
type _E009 = Expect<Equal<Distribute<never>, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<Wrapped<never>, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<never | undefined, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<never & unknown, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<keyof never, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<never[], TODO>>; // TODO(koan) @koan-error
const emptyNever: never[] = [];
type _E015 = Expect<Equal<typeof emptyNever[number], TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<ReturnType<typeof fail>, TODO>>; // TODO(koan) @koan-error

// Demonstration B: a distributive conditional applied to never performs zero
// branches and returns never. Tuple wrapping suppresses distribution, so the
// ordinary `never extends string` relation yields the true branch.
type _SolvedDistributed = Expect<Equal<Distribute<never>, never>>;
type _SolvedWrapped = Expect<Equal<Wrapped<never>, "string">>;

// Group 3: Special types and generic constraints are not closed concrete unions.
function edgeAny(value: any) {
  if (value.kind === "x") return;
  type _E017 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
function edgeUnknown(value: unknown) {
  if (typeof value === "string") return;
  type _E018 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
function edgeNever(value: never) {
  type _E019 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
function edgeGeneric<T extends State>(value: T) {
  if (value.state === "idle") return;
  type _E020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "ready") return;
  type _E021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "failed") return;
  type _E022 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void edgeAny;
void edgeUnknown;
void edgeNever;
void edgeGeneric;

// Demonstration C: any can reach an allegedly exhaustive default. Unknown can
// be narrowed, but a single typeof check leaves a large reachable remainder.

// Group 4: Runtime inputs and assertions can bypass the compile-time closed world.
const fabricated = { state: "future" } as unknown as State;
type _E023 = Expect<Equal<typeof fabricated, TODO>>; // TODO(koan) @koan-error
const castNever = fabricated as never;
type _E024 = Expect<Equal<typeof castNever, TODO>>; // TODO(koan) @koan-error
function edgeBoolean(value: boolean) {
  if (value === true) return "true";
  type _E025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value === false) return "false";
  type _E026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return assertNever(value);
}
function edgeNumeric(value: 0 | 1 | 2) {
  if (value === 0) return;
  type _E027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value === 1) return;
  type _E028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value === 2) return;
  type _E029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type _E030 = Expect<Equal<ReturnType<typeof edgeBoolean>, TODO>>; // TODO(koan) @koan-error
void edgeNumeric;

// Demonstration D: an assertion or deserialization boundary can fabricate a
// value outside the declared union. Keep assertNever's runtime throw even though
// its primary purpose is to force a compile-time maintenance failure.

// @ts-expect-error A never-returning function may not reach a normal return.
function invalidNever(): never { return undefined; }
