import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 151 - TYPED TRANSITION TABLES
 * ====================================
 *
 * Typestate can be derived from data rather than handwritten on every method. A
 * transition table maps each state to its legal events; each event records its
 * destination and payload type. Indexed access then answers four questions:
 * which events are legal, what payload is required, where the event leads, and
 * what correlated transition cases exist.
 *
 * Read `Next<Table, "closed", "open">` aloud as: "index the closed row, index the
 * open event, and read its to field." State unions require deliberate
 * distribution because `keyof Table[S]` otherwise asks for keys common to every
 * selected row. A union of rest tuples preserves the event/payload correlation
 * at the dispatcher boundary.
 */

export type DoorTable = {
  closed: {
    open: { to: "open"; payload: undefined };
    lock: { to: "locked"; payload: { key: string } };
  };
  open: {
    close: { to: "closed"; payload: undefined };
  };
  locked: {
    unlock: { to: "closed"; payload: { key: string } };
  };
};

export type Events<Table, State extends keyof Table> =
  State extends keyof Table ? keyof Table[State] : never;

export type Next<
  Table,
  State extends keyof Table,
  Event extends Events<Table, State>,
> = State extends keyof Table
  ? Event extends keyof Table[State]
    ? Table[State][Event] extends { to: infer Target extends keyof Table } ? Target : never
    : never
  : never;

export type Payload<
  Table,
  State extends keyof Table,
  Event extends Events<Table, State>,
> = State extends keyof Table
  ? Event extends keyof Table[State]
    ? Table[State][Event] extends { payload: infer Value } ? Value : never
    : never
  : never;

export type EventArgs<
  Table,
  State extends keyof Table,
  Event extends Events<Table, State>,
> = Event extends Events<Table, State>
  ? Payload<Table, State, Event> extends undefined
    ? [event: Event]
    : [event: Event, payload: Payload<Table, State, Event>]
  : never;

export type TransitionCases<Table, State extends keyof Table> = {
  [Event in Events<Table, State>]:
    Event extends PropertyKey
      ? {
          event: Event;
          payload: Payload<Table, State, Event>;
          to: Next<Table, State, Event>;
        }
      : never;
}[Events<Table, State>];

export type DoorState = keyof DoorTable;
export type DoorEvent<State extends DoorState> = Events<DoorTable, State>;
export type DoorNext<State extends DoorState, Event extends DoorEvent<State>> =
  Next<DoorTable, State, Event>;
export type DoorArgs<State extends DoorState, Event extends DoorEvent<State>> =
  EventArgs<DoorTable, State, Event>;

export type DoorSnapshot<State extends DoorState> = Readonly<{
  state: State;
  history: readonly string[];
}>;

// Part 1: Rows determine legal event vocabularies.
type _01 = Expect<Equal<DoorState, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<DoorEvent<"closed">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<DoorEvent<"open">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<DoorEvent<"locked">, TODO>>; // TODO(koan) @koan-error

// Part 2: One state/event pair determines one destination.
type _05 = Expect<Equal<DoorNext<"closed", "open">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<DoorNext<"closed", "lock">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<DoorNext<"open", "close">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<DoorNext<"locked", "unlock">, TODO>>; // TODO(koan) @koan-error

// Part 3: Payloads control the dispatcher's tuple shape.
type _09 = Expect<Equal<Payload<DoorTable, "closed", "open">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Payload<DoorTable, "closed", "lock">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<DoorArgs<"closed", "open">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<DoorArgs<"closed", "lock">, TODO>>; // TODO(koan) @koan-error

// Part 4: Mapped indexing builds a correlated union of transition cases.
type _13 = Expect<Equal<TransitionCases<DoorTable, "closed">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<TransitionCases<DoorTable, "open">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<TransitionCases<DoorTable, "closed">["event"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<TransitionCases<DoorTable, "closed">["to"], TODO>>; // TODO(koan) @koan-error

// Part 5: Distribution keeps useful answers for state unions.
type _17 = Expect<Equal<DoorEvent<"closed" | "open">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Events<DoorTable, DoorState>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof DoorTable[DoorState], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<TransitionCases<DoorTable, DoorState>["to"], TODO>>; // TODO(koan) @koan-error

const targets = {
  closed: { open: "open", lock: "locked" },
  open: { close: "closed" },
  locked: { unlock: "closed" },
} as const;

export function createDoor(): DoorSnapshot<"closed"> {
  return { state: "closed", history: [] };
}

export function transition<
  State extends DoorState,
  Event extends DoorEvent<State>,
>(
  current: DoorSnapshot<State>,
  ...args: DoorArgs<State, Event>
): DoorSnapshot<DoorNext<State, Event>> {
  const event = args[0] as PropertyKey;
  const payload = args[1] as unknown;
  const row = targets[current.state] as Partial<Record<PropertyKey, DoorState>>;
  const next = row[event];
  if (next === undefined) throw new Error(`${String(event)} is illegal from ${current.state}`);
  if ((event === "lock" || event === "unlock") && (
    typeof payload !== "object" ||
    payload === null ||
    typeof (payload as { key?: unknown }).key !== "string"
  )) {
    throw new TypeError(`${String(event)} requires a string key`);
  }
  return {
    state: next,
    history: [...current.history, `${current.state}:${String(event)}:${next}`],
  } as unknown as DoorSnapshot<DoorNext<State, Event>>;
}
