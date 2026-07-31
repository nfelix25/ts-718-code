import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  createDoor,
  type DoorArgs,
  type DoorEvent,
  type DoorNext,
  type DoorSnapshot,
  type DoorState,
  type DoorTable,
  type EventArgs,
  type Events,
  type Next,
  type Payload,
  type TransitionCases,
} from "./k-151-typed-transition-tables.js";

/**
 * GUIDED DRILLS
 * =============
 *
 * Read every lookup from left to right: choose a state row, choose a legal
 * event in that row, then project its destination or payload. The repetitions
 * move from single rows to distributed unions and finally to API reflection.
 */

type Extends<From, To> = [From] extends [To] ? true : false;

// States, event vocabularies, and row keys (1-15)
type _01 = Expect<Equal<DoorState, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof DoorTable, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<DoorEvent<"closed">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<DoorEvent<"open">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<DoorEvent<"locked">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Events<DoorTable, "closed">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Events<DoorTable, "closed" | "open">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<DoorEvent<DoorState>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Events<DoorTable, never>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<keyof DoorTable[DoorState], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<keyof DoorTable["closed"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof DoorTable["open"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<keyof DoorTable["locked"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<DoorEvent<DoorState>, "open" | "unlock">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Exclude<DoorEvent<DoorState>, "lock">, TODO>>; // TODO(koan) @koan-error

// Destinations and payload projection (16-30)
type _16 = Expect<Equal<DoorNext<"closed", "open">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<DoorNext<"closed", "lock">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<DoorNext<"open", "close">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<DoorNext<"locked", "unlock">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<DoorNext<"closed", "open" | "lock">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Next<DoorTable, "closed" | "open", "open" | "close">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Next<DoorTable, DoorState, Events<DoorTable, DoorState>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Next<DoorTable, never, never>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Payload<DoorTable, "closed", "open">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Payload<DoorTable, "closed", "lock">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Payload<DoorTable, "open", "close">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Payload<DoorTable, "locked", "unlock">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Payload<DoorTable, "closed", "open" | "lock">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Payload<DoorTable, "closed" | "locked", "lock" | "unlock">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Payload<DoorTable, DoorState, Events<DoorTable, DoorState>>, TODO>>; // TODO(koan) @koan-error

// Correlated argument tuples and transition cases (31-45)
type _31 = Expect<Equal<DoorArgs<"closed", "open">, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<DoorArgs<"closed", "lock">, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<DoorArgs<"open", "close">, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<DoorArgs<"locked", "unlock">, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<DoorArgs<"closed", "open" | "lock">, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<EventArgs<DoorTable, "closed" | "open", "open" | "close">, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<EventArgs<DoorTable, DoorState, Events<DoorTable, DoorState>>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<TransitionCases<DoorTable, "closed">, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<TransitionCases<DoorTable, "open">, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<TransitionCases<DoorTable, "locked">, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<TransitionCases<DoorTable, DoorState>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<TransitionCases<DoorTable, "closed">["event"], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<TransitionCases<DoorTable, DoorState>["to"], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Extract<TransitionCases<DoorTable, "closed">, { event: "lock" }>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Exclude<TransitionCases<DoorTable, DoorState>, { to: "closed" }>, TODO>>; // TODO(koan) @koan-error

// Snapshots, reflection, and empty tables (46-60)
type _46 = Expect<Equal<DoorSnapshot<"closed">, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<DoorSnapshot<DoorState>["state"], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<DoorSnapshot<"open">["history"], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<keyof DoorSnapshot<"locked">, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<DoorSnapshot<"closed">, Readonly<{ state: DoorState; history: readonly string[] }>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<ReturnType<typeof createDoor>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Equal<ReturnType<typeof createDoor>, DoorSnapshot<"closed">>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<DoorNext<DoorSnapshot<"closed">["state"], "open">, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<TransitionCases<DoorTable, DoorState>["event"], TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Extract<TransitionCases<DoorTable, DoorState>, { event: "unlock" }>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<TransitionCases<DoorTable, DoorState>["payload"], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<DoorArgs<DoorState, DoorEvent<DoorState>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<DoorSnapshot<"closed">, DoorSnapshot<DoorState>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Events<{ idle: {} }, "idle">, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<TransitionCases<{ idle: {} }, "idle">, TODO>>; // TODO(koan) @koan-error
