import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type InputValue,
  type ScoreBand,
  classifyValue,
  scoreBand,
} from "./k-181-switch-true-narrowing.js";

/** GUIDED DRILLS: repeat positive and negative guard information, ordered exclusion, discriminant/range predicates, array guards, nullable defaults, and public signature reflection. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Primitive = string | number | boolean | bigint | symbol | null | undefined;
type Event =
  | { kind: "data"; value: string }
  | { kind: "error"; error: Error }
  | { kind: "done" };

// Positive guard slices (1-12)
type _01 = Expect<Equal<Extract<Primitive, string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<Primitive, number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<Primitive, boolean>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<Primitive, bigint>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<Primitive, symbol>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<Primitive, null>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<Primitive, undefined>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<InputValue, string>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extract<InputValue, number>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<InputValue, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<InputValue, null>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<InputValue, object>, TODO>>; // TODO(koan) @koan-error

// Negative information accumulated by terminating cases (13-24)
type _13 = Expect<Equal<Exclude<Primitive, string>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Exclude<Primitive, string | number>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Exclude<Primitive, string | number | boolean>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Exclude<Primitive, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Exclude<InputValue, string>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<InputValue, string | number>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Exclude<InputValue, string | number | readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Exclude<InputValue, null>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Exclude<Event, { kind: "data" }>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Exclude<Event, { kind: "data" } | { kind: "error" }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Exclude<Event, { kind: "done" }>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Exclude<Primitive, Primitive>, TODO>>; // TODO(koan) @koan-error

// Discriminated branch payloads (25-36)
type DataEvent = Extract<Event, { kind: "data" }>;
type ErrorEvent = Extract<Event, { kind: "error" }>;
type DoneEvent = Extract<Event, { kind: "done" }>;
type _25 = Expect<Equal<DataEvent, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<DataEvent["value"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ErrorEvent, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ErrorEvent["error"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<DoneEvent, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<DoneEvent["kind"], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Event["kind"], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Extract<Event["kind"], "data">, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Exclude<Event["kind"], "data">, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extends<DataEvent, Event>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extends<Event, DataEvent>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Exclude<Event, Event>, TODO>>; // TODO(koan) @koan-error

// Function and result surfaces (37-48)
type _37 = Expect<Equal<Parameters<typeof classifyValue>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Parameters<typeof classifyValue>[0], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ReturnType<typeof classifyValue>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Parameters<typeof scoreBand>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Parameters<typeof scoreBand>[0], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<typeof scoreBand>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ScoreBand, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Extract<ScoreBand, "invalid">, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Exclude<ScoreBand, "invalid">, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Extract<ScoreBand, "low" | "medium">, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extends<ScoreBand, string>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Extends<string, ScoreBand>, TODO>>; // TODO(koan) @koan-error

// Array/null and exhaustiveness contrasts (49-60)
type _49 = Expect<Equal<Extract<InputValue, readonly unknown[]>[number], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extract<InputValue, readonly unknown[]>["length"], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Exclude<InputValue, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<NonNullable<InputValue>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extract<InputValue, object>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extract<InputValue, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Exclude<InputValue, NonNullable<InputValue>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extract<Event, { kind: Event["kind"] }>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Exclude<Event, { kind: Event["kind"] }>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extract<never, string>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Exclude<never, string>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<never, InputValue>, TODO>>; // TODO(koan) @koan-error
