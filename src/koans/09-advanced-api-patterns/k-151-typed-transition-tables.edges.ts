import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  DoorArgs,
  DoorEvent,
  DoorNext,
  DoorState,
  DoorTable,
  EventArgs,
  Events,
  Next,
  Payload,
  TransitionCases,
} from "./k-151-typed-transition-tables.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * A transition table is only as precise as the correlation we preserve.
 * Directly applying `keyof` to a union of rows keeps common keys, while the
 * distributive `Events` helper collects each row's keys. Independent state and
 * event unions can also describe combinations that never occur together.
 */

type IsAny<Value> = 0 extends 1 & Value ? true : false;
type BadDestinationTable = {
  idle: { start: { to: "missing"; payload: undefined } };
};
type MixedPayloadTable = {
  idle: {
    tick: { to: "idle"; payload: undefined };
    set: { to: "idle"; payload: number };
  };
};

// Pre-solved demonstrations make the surprises explicit.
type _DemoDirectKeyof = Expect<Equal<keyof DoorTable[DoorState], never>>;
type _DemoDistributedEvents = Expect<Equal<Events<DoorTable, DoorState>, "open" | "lock" | "close" | "unlock">>;
type _DemoBadDestination = Expect<Equal<Next<BadDestinationTable, "idle", "start">, never>>;
type _DemoCorrelatedArgs = Expect<Equal<EventArgs<MixedPayloadTable, "idle", "tick" | "set">, ["tick"] | ["set", number]>>;
// A forged call still needs a runtime legality check because assertions can invent a valid-looking event type.

// 1. `keyof` union rows keep intersections; distribution collects unions (1-8)
type _01 = Expect<Equal<keyof DoorTable[DoorState], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Events<DoorTable, DoorState>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof DoorTable["closed" | "open"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Events<DoorTable, "closed" | "open">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<keyof DoorTable["closed"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Events<DoorTable, never>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<DoorEvent<DoorState>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<DoorEvent<DoorState>, keyof DoorTable[DoorState]>, TODO>>; // TODO(koan) @koan-error

// 2. Independent unions distribute, but no longer expose one paired case (9-16)
type _09 = Expect<Equal<Next<DoorTable, "closed" | "open", "open" | "close">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Next<DoorTable, DoorState, Events<DoorTable, DoorState>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<DoorNext<"closed", "open" | "lock">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Payload<DoorTable, "closed" | "locked", "lock" | "unlock">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<TransitionCases<DoorTable, DoorState>["event"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<TransitionCases<DoorTable, DoorState>["to"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<TransitionCases<DoorTable, DoorState>, { to: "closed" }>["event"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<TransitionCases<DoorTable, DoorState>, { event: "lock" }>["to"], TODO>>; // TODO(koan) @koan-error

// 3. Payload unions and rest-tuple unions preserve call-shape correlation (17-23)
type _17 = Expect<Equal<DoorArgs<"closed", "open" | "lock">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<EventArgs<MixedPayloadTable, "idle", "tick">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<EventArgs<MixedPayloadTable, "idle", "set">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<EventArgs<MixedPayloadTable, "idle", "tick" | "set">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Payload<MixedPayloadTable, "idle", "tick" | "set">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<EventArgs<DoorTable, DoorState, Events<DoorTable, DoorState>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<TransitionCases<MixedPayloadTable, "idle">["payload"], TODO>>; // TODO(koan) @koan-error

// 4. Empty states, invalid destinations, and top/bottom types (24-30)
type _24 = Expect<Equal<Events<{ idle: {} }, "idle">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<TransitionCases<{ idle: {} }, "idle">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Next<BadDestinationTable, "idle", "start">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Payload<BadDestinationTable, "idle", "start">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Next<DoorTable, never, never>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsAny<Events<any, any>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsAny<Payload<any, any, any>>, TODO>>; // TODO(koan) @koan-error
