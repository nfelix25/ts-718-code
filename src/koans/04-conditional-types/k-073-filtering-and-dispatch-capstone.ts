import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-073: filtering and dispatch capstone
 * =============================================================================
 *
 * Conditional types become most useful when several rules cooperate. A typed
 * dispatcher starts with a discriminated union, filters it by one tag, infers
 * that member's payload and result, and maps every tag to a correlated handler.
 *
 * I read
 *
 *   `E extends { type: K } ? E : never`
 *
 * aloud as:
 *
 *   "Visit each event member. Keep the members whose type is K; replace every
 *    other member with never, which disappears from the resulting union."
 *
 * From the filtered member, nested conditionals derive a handler and dispatch
 * tuple. A payload event becomes `[type, payload]`; a payloadless event becomes
 * `[type]`. Key mapping then builds a total handler table. Correlation survives
 * because each tag is used to filter before payload and result inference. If I
 * first union all payloads and all results independently, invalid pairings
 * become possible. Duplicate tags intentionally produce multiple matching
 * members, and therefore union handlers that need another design decision.
 */

export type AppEvent =
  | { type: "user.created"; payload: { id: number; name: string }; result: { accepted: true } }
  | { type: "user.deleted"; payload: { id: number }; result: boolean }
  | { type: "audit.logged"; payload: { message: string; level: "info" | "warn" }; result: void }
  | { type: "ping"; result: "pong" };

export type EventKind<Events> = Events extends { type: infer Kind extends PropertyKey }
  ? Kind
  : never;
export type EventOf<Events, Kind extends PropertyKey> = Events extends { type: Kind }
  ? Events
  : never;
export type PayloadOf<Event> = Event extends { payload: infer Payload } ? Payload : never;
export type ResultOfEvent<Event> = Event extends { result: infer Result } ? Result : never;
export type PayloadFor<Events, Kind extends PropertyKey> = PayloadOf<EventOf<Events, Kind>>;
export type ResultFor<Events, Kind extends PropertyKey> = ResultOfEvent<EventOf<Events, Kind>>;
export type HandlerOf<Event> = Event extends { payload: infer Payload; result: infer Result }
  ? (payload: Payload) => Result
  : Event extends { result: infer Result }
    ? () => Result
    : never;
export type HandlerMap<Events> = {
  [Kind in EventKind<Events>]: HandlerOf<EventOf<Events, Kind>>;
};
export type DispatchArgs<Events, Kind extends EventKind<Events>> =
  EventOf<Events, Kind> extends infer Event
    ? Event extends { payload: infer Payload }
      ? [type: Kind, payload: Payload]
      : [type: Kind]
    : never;

export function createDispatcher<Events extends { type: PropertyKey }>(
  handlers: HandlerMap<Events>,
) {
  return <Kind extends EventKind<Events>>(
    ...args: DispatchArgs<Events, Kind>
  ): ResultFor<Events, Kind> => {
    const [type, payload] = args as [PropertyKey, unknown?];
    const table = handlers as unknown as Record<PropertyKey, (payload?: unknown) => unknown>;
    return table[type]!(payload) as ResultFor<Events, Kind>;
  };
}

export const dispatchAppEvent = createDispatcher<AppEvent>({
  "user.created": (payload) => ({ accepted: true }),
  "user.deleted": (payload) => payload.id > 0,
  "audit.logged": (_payload) => undefined,
  ping: () => "pong",
});

// Part 1: distributive filtering selects events by their discriminant.
type _Main01 = Expect<Equal<EventKind<AppEvent>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<EventOf<AppEvent, "user.created">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<EventOf<AppEvent, "ping">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<EventOf<AppEvent, "missing">, TODO>>; // TODO(koan) @koan-error

// Part 2: payload and result extraction happens after filtering.
type _Main05 = Expect<Equal<PayloadFor<AppEvent, "user.created">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<PayloadFor<AppEvent, "user.deleted">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<PayloadFor<AppEvent, "ping">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ResultFor<AppEvent, "audit.logged">, TODO>>; // TODO(koan) @koan-error

// Part 3: each event member derives one correlated handler.
type _Main09 = Expect<Equal<HandlerOf<EventOf<AppEvent, "user.created">>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<HandlerOf<EventOf<AppEvent, "ping">>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<keyof HandlerMap<AppEvent>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<HandlerMap<AppEvent>["user.deleted"], TODO>>; // TODO(koan) @koan-error

// Part 4: dispatch tuples reflect whether the selected event has a payload.
type _Main13 = Expect<Equal<DispatchArgs<AppEvent, "user.created">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<DispatchArgs<AppEvent, "ping">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<DispatchArgs<AppEvent, "user.created" | "ping">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<DispatchArgs<AppEvent, EventKind<AppEvent>>, TODO>>; // TODO(koan) @koan-error

// Part 5: the dispatcher preserves the result selected by its tag argument.
const mainCreated = dispatchAppEvent("user.created", { id: 1, name: "Ada" });
const mainDeleted = dispatchAppEvent("user.deleted", { id: 1 });
const mainPing = dispatchAppEvent("ping");
type _Main17 = Expect<Equal<typeof mainCreated, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainDeleted, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainPing, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ResultFor<AppEvent, EventKind<AppEvent>>, TODO>>; // TODO(koan) @koan-error
