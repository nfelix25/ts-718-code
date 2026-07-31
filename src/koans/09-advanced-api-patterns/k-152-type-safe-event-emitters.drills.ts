import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AppEvents,
  type EventArgs,
  type EventCall,
  type EventCallFor,
  type EventListener,
  type EventNames,
  type EventRecord,
  type EventSchema,
  type EventsMatching,
  type FirstArgument,
  shutdownEvent,
  TypedEmitter,
} from "./k-152-type-safe-event-emitters.js";

/**
 * GUIDED DRILLS
 * =============
 *
 * Recover the event relation repeatedly from different projections. Event names
 * are property keys, payloads are complete tuples, and mapped indexing turns
 * each per-key tuple or record back into a correlated union.
 */

type Extends<From, To> = [From] extends [To] ? true : false;

// Names, argument tuples, and first arguments (1-15)
type _01 = Expect<Equal<EventNames<AppEvents>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof AppEvents, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<EventNames<AppEvents>, string>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<EventNames<AppEvents>, number>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<EventNames<AppEvents>, symbol>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<EventArgs<AppEvents, "ready">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<EventArgs<AppEvents, "message">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<EventArgs<AppEvents, "progress">, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<EventArgs<AppEvents, "error">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<EventArgs<AppEvents, 404>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<EventArgs<AppEvents, typeof shutdownEvent>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<EventArgs<AppEvents, EventNames<AppEvents>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<FirstArgument<AppEvents, "message">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<FirstArgument<AppEvents, "progress">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<FirstArgument<AppEvents, "ready">, TODO>>; // TODO(koan) @koan-error

// Listener signatures and correlated calls (16-30)
type _16 = Expect<Equal<EventListener<AppEvents, "ready">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<EventListener<AppEvents, "message">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<EventListener<AppEvents, "error">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<EventListener<AppEvents, 404>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<EventListener<AppEvents, typeof shutdownEvent>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReturnType<EventListener<AppEvents, "progress">>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<EventCallFor<AppEvents, "ready">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<EventCallFor<AppEvents, "message">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<EventCallFor<AppEvents, "error">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<EventCallFor<AppEvents, 404>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<EventCallFor<AppEvents, typeof shutdownEvent>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<EventCallFor<AppEvents, "ready" | "progress">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<EventCall<AppEvents>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extract<EventCall<AppEvents>, ["message", ...unknown[]]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Exclude<EventCall<AppEvents>, ["ready"]>, TODO>>; // TODO(koan) @koan-error

// Event records, matching, and mapped projections (31-45)
type _31 = Expect<Equal<EventRecord<AppEvents>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<EventRecord<AppEvents>["name"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<EventRecord<AppEvents>["args"], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extract<EventRecord<AppEvents>, { name: "ready" }>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extract<EventRecord<AppEvents>, { name: "message" }>["args"], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Extract<EventRecord<AppEvents>, { name: 404 }>["args"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Extract<EventRecord<AppEvents>, { name: typeof shutdownEvent }>["args"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<EventsMatching<AppEvents, []>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<EventsMatching<AppEvents, [number]>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<EventsMatching<AppEvents, [string]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<EventsMatching<AppEvents, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<EventsMatching<AppEvents, [unknown]>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Exclude<EventNames<AppEvents>, EventsMatching<AppEvents, [number]>>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Extract<EventRecord<AppEvents>, { args: [number] }>["name"], TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<EventSchema<AppEvents>, TODO>>; // TODO(koan) @koan-error

// Emitter surface, generic reflection, and empty relations (46-60)
type AppEmitter = TypedEmitter<AppEvents>;
type _46 = Expect<Equal<keyof AppEmitter, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<ReturnType<AppEmitter["on"]>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<ReturnType<AppEmitter["once"]>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<ReturnType<AppEmitter["off"]>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<ReturnType<AppEmitter["emit"]>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<AppEvents, EventSchema<AppEvents>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Extends<{ ping: readonly [] }, EventSchema<{ ping: readonly [] }>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<EventNames<{}>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<EventCall<{}>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<EventRecord<{}>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<EventCallFor<AppEvents, never>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<EventsMatching<{}, []>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<FirstArgument<{ one: readonly [1] }, "one">, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<EventCall<{ ping: []; data: [Uint8Array] }>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<EventRecord<{ ping: []; data: [Uint8Array] }>["name"], TODO>>; // TODO(koan) @koan-error
