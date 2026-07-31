import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-073: filtering and dispatch capstone — constructions
 * =============================================================================
 *
 * These constructions turn discriminated event unions into filtered members,
 * payload and result lookups, correlated handlers, argument tuples, complete
 * maps, and dispatcher call signatures. They cover duplicate and broad tags,
 * required/optional/absent payload conventions, whole-union tests, numeric and
 * symbol keys, special inputs, and preservation of each event's own contract.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

declare const givenToken: unique symbol;

type GivenEvents =
  | {
      type: "text";
      payload: { value: string };
      result: number;
    }
  | {
      type: "count";
      payload: { value: number };
      result: string;
    }
  | {
      type: "toggle";
      payload: boolean;
      result: boolean;
    }
  | {
      type: "ready";
      result: true;
    };

type GivenDuplicate =
  | { type: "same"; payload: string; result: 1 }
  | { type: "same"; payload: number; result: 2 };

type GivenPayloadVariants =
  | { type: "absent"; result: 0 }
  | { type: "undefined"; payload: undefined; result: 1 }
  | { type: "optional"; payload?: string; result: 2 }
  | { type: "void"; payload: void; result: 3 };

type GivenBroad =
  | { type: string; payload: unknown; result: unknown }
  | { type: "exact"; payload: 1; result: 2 };

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenKind<Events> =
  Events extends {
    type: infer Kind extends PropertyKey;
  }
    ? Kind
    : never;
type GivenEvent<
  Events,
  Kind extends PropertyKey,
> =
  Events extends { type: Kind } ? Events : never;
type GivenPayload<Event> =
  Event extends { payload: infer Payload } ? Payload : never;
type GivenResult<Event> =
  Event extends { result: infer Result } ? Result : never;
type GivenHandler<Event> =
  Event extends {
    payload: infer Payload;
    result: infer Result;
  }
    ? (payload: Payload) => Result
    : Event extends { result: infer Result }
      ? () => Result
      : never;
type GivenArgs<
  Events,
  Kind extends GivenKind<Events>,
> =
  GivenEvent<Events, Kind> extends infer Event
    ? Event extends { payload: infer Payload }
      ? [type: Kind, payload: Payload]
      : [type: Kind]
    : never;
type GivenMap<Events> = {
  [Kind in GivenKind<Events>]:
    GivenHandler<GivenEvent<Events, Kind>>;
};

// ─── Discriminant extraction and filtering ──────────────────────────────

// 1. Extract every required PropertyKey discriminant from an event union.
export type EventKind<Events> =
  TODO; // TODO(koan)

type _01a = Expect<
  Equal<EventKind<GivenEvents>, "text" | "count" | "toggle" | "ready">
>;
type _01b = Expect<
  Equal<EventKind<{ type: 1 } | { type: 2 }>, 1 | 2>
>;
type _01c = Expect<
  Equal<EventKind<{ type: typeof givenToken }>, typeof givenToken>
>;
type _01d = Expect<
  Equal<EventKind<{ readonly type: "fixed" }>, "fixed">
>;
type _01e = Expect<
  Equal<EventKind<{ type?: "maybe" }>, never>
>;

// 2. Keep only distributed members assignable to the requested tag.
export type EventOf<
  Events,
  Kind extends PropertyKey,
> =
  TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    EventOf<GivenEvents, "text">,
    {
      type: "text";
      payload: { value: string };
      result: number;
    }
  >
>;
type _02b = Expect<
  Equal<
    EventOf<GivenEvents, "text" | "count">,
    | {
        type: "text";
        payload: { value: string };
        result: number;
      }
    | {
        type: "count";
        payload: { value: number };
        result: string;
      }
  >
>;
type _02c = Expect<
  Equal<
    EventOf<GivenEvents, "ready">,
    { type: "ready"; result: true }
  >
>;
type _02d = Expect<
  Equal<EventOf<GivenEvents, "missing">, never>
>;
type _02e = Expect<Equal<EventOf<unknown, "x">, never>>;

// ─── Payload, result, and secondary filtering ───────────────────────────

// 3. Extract a required payload, rejecting absent and optional properties.
export type PayloadOf<Event> =
  TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    PayloadOf<EventOf<GivenEvents, "text">>,
    { value: string }
  >
>;
type _03b = Expect<
  Equal<PayloadOf<EventOf<GivenEvents, "toggle">>, boolean>
>;
type _03c = Expect<
  Equal<PayloadOf<EventOf<GivenEvents, "ready">>, never>
>;
type _03d = Expect<
  Equal<PayloadOf<{ payload: undefined }>, undefined>
>;
type _03e = Expect<
  Equal<PayloadOf<{ payload?: string }>, never>
>;

// 4. Extract each event member's required result type.
export type ResultOfEvent<Event> =
  TODO; // TODO(koan)

type _04a = Expect<
  Equal<ResultOfEvent<EventOf<GivenEvents, "text">>, number>
>;
type _04b = Expect<
  Equal<ResultOfEvent<EventOf<GivenEvents, "count">>, string>
>;
type _04c = Expect<
  Equal<ResultOfEvent<EventOf<GivenEvents, "ready">>, true>
>;
type _04d = Expect<
  Equal<
    ResultOfEvent<EventOf<GivenEvents, "text" | "toggle">>,
    number | boolean
  >
>;
type _04e = Expect<
  Equal<ResultOfEvent<{ type: "x" }>, never>
>;

// 5. Filter by tag first, then extract that selection's payload.
export type PayloadFor<
  Events,
  Kind extends PropertyKey,
> =
  TODO; // TODO(koan)

type _05a = Expect<
  Equal<PayloadFor<GivenEvents, "text">, { value: string }>
>;
type _05b = Expect<
  Equal<PayloadFor<GivenEvents, "count">, { value: number }>
>;
type _05c = Expect<
  Equal<PayloadFor<GivenEvents, "ready">, never>
>;
type _05d = Expect<
  Equal<
    PayloadFor<GivenEvents, "text" | "count">,
    { value: string } | { value: number }
  >
>;
type _05e = Expect<
  Equal<PayloadFor<GivenEvents, "missing">, never>
>;

// 6. Filter by tag first, then extract that selection's result.
export type ResultFor<
  Events,
  Kind extends PropertyKey,
> =
  TODO; // TODO(koan)

type _06a = Expect<
  Equal<ResultFor<GivenEvents, "text">, number>
>;
type _06b = Expect<
  Equal<ResultFor<GivenEvents, "toggle">, boolean>
>;
type _06c = Expect<
  Equal<ResultFor<GivenEvents, "ready">, true>
>;
type _06d = Expect<
  Equal<
    ResultFor<GivenEvents, EventKind<GivenEvents>>,
    number | string | boolean
  >
>;
type _06e = Expect<
  Equal<ResultFor<GivenEvents, "missing">, never>
>;

// 7. Keep events whose required payload fits a supplied structural shape.
export type EventsByPayload<Events, Shape> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    EventsByPayload<GivenEvents, { value: unknown }>,
    | {
        type: "text";
        payload: { value: string };
        result: number;
      }
    | {
        type: "count";
        payload: { value: number };
        result: string;
      }
  >
>;
type _07b = Expect<
  Equal<
    EventsByPayload<GivenEvents, boolean>,
    { type: "toggle"; payload: boolean; result: boolean }
  >
>;
type _07c = Expect<
  Equal<
    EventKind<EventsByPayload<GivenEvents, object>>,
    "text" | "count"
  >
>;
type _07d = Expect<
  Equal<EventsByPayload<GivenEvents, string>, never>
>;
type _07e = Expect<
  Equal<EventsByPayload<never, unknown>, never>
>;

// 8. Ask whether the whole union has a required payload property.
export type AllHavePayload<Events> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<AllHavePayload<GivenDuplicate>, true>
>;
type _08b = Expect<
  Equal<AllHavePayload<GivenPayloadVariants>, false>
>;
type _08c = Expect<
  Equal<
    AllHavePayload<{ payload: 1 } | { payload: 2 }>,
    true
  >
>;
type _08d = Expect<
  Equal<
    AllHavePayload<{ payload: 1 } | { payload?: 2 }>,
    false
  >
>;
type _08e = Expect<Equal<AllHavePayload<never>, true>>;

// ─── Handler, argument, and map construction ─────────────────────────────

// 9. Build a payload handler or payloadless handler from one event member.
export type HandlerOf<Event> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    HandlerOf<EventOf<GivenEvents, "text">>,
    (payload: { value: string }) => number
  >
>;
type _09b = Expect<
  Equal<
    HandlerOf<EventOf<GivenEvents, "toggle">>,
    (payload: boolean) => boolean
  >
>;
type _09c = Expect<
  Equal<
    HandlerOf<EventOf<GivenEvents, "ready">>,
    () => true
  >
>;
type _09d = Expect<
  Equal<
    HandlerOf<{ type: "x"; payload: undefined; result: void }>,
    (payload: undefined) => void
  >
>;
type _09e = Expect<
  Equal<
    HandlerOf<{ type: "x"; payload: unknown; result: never }>,
    (payload: unknown) => never
  >
>;

// 10. Build a total handler map keyed by every extracted event kind.
export type HandlerMap<Events> =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    keyof HandlerMap<GivenEvents>,
    "text" | "count" | "toggle" | "ready"
  >
>;
type _10b = Expect<
  Equal<
    HandlerMap<GivenEvents>["text"],
    (payload: { value: string }) => number
  >
>;
type _10c = Expect<
  Equal<
    HandlerMap<GivenEvents>["count"],
    (payload: { value: number }) => string
  >
>;
type _10d = Expect<
  Equal<HandlerMap<GivenEvents>["ready"], () => true>
>;
type _10e = Expect<
  Equal<HandlerMap<never>, {}>
>;

// 11. Build the packet's tag-first dispatch arguments for a selected kind.
export type DispatchArgs<
  Events,
  Kind extends GivenKind<Events>,
> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    DispatchArgs<GivenEvents, "text">,
    [type: "text", payload: { value: string }]
  >
>;
type _11b = Expect<
  Equal<
    DispatchArgs<GivenEvents, "ready">,
    [type: "ready"]
  >
>;
type _11c = Expect<
  Equal<
    DispatchArgs<GivenEvents, "text" | "count">,
    | [
        type: "text" | "count",
        payload: { value: string },
      ]
    | [
        type: "text" | "count",
        payload: { value: number },
      ]
  >
>;
type _11d = Expect<
  Equal<
    DispatchArgs<
      { type: "x"; payload: undefined; result: void },
      "x"
    >,
    [type: "x", payload: undefined]
  >
>;
type _11e = Expect<
  Equal<
    DispatchArgs<GivenPayloadVariants, "optional">,
    [type: "optional"]
  >
>;

// 12. Build fully correlated argument tuples from each event's own tag.
export type CorrelatedDispatchArgs<Events> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    CorrelatedDispatchArgs<
      EventOf<GivenEvents, "text" | "count">
    >,
    | [type: "text", payload: { value: string }]
    | [type: "count", payload: { value: number }]
  >
>;
type _12b = Expect<
  Equal<
    CorrelatedDispatchArgs<
      EventOf<GivenEvents, "text" | "ready">
    >,
    | [type: "text", payload: { value: string }]
    | [type: "ready"]
  >
>;
type _12c = Expect<
  Equal<
    CorrelatedDispatchArgs<GivenDuplicate>,
    | [type: "same", payload: string]
    | [type: "same", payload: number]
  >
>;
type _12d = Expect<
  Equal<
    CorrelatedDispatchArgs<{
      type: 1;
      payload: string;
      result: number;
    }>,
    [type: 1, payload: string]
  >
>;
type _12e = Expect<
  Equal<CorrelatedDispatchArgs<never>, never>
>;

// 13. Preserve tag, arguments, handler, and result for each event member.
export type EventContract<Events> =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    EventContract<EventOf<GivenEvents, "text">>,
    {
      type: "text";
      args: [type: "text", payload: { value: string }];
      handler: (payload: { value: string }) => number;
      result: number;
    }
  >
>;
type _13b = Expect<
  Equal<
    EventContract<EventOf<GivenEvents, "ready">>,
    {
      type: "ready";
      args: [type: "ready"];
      handler: () => true;
      result: true;
    }
  >
>;
type _13c = Expect<
  Equal<
    EventContract<EventOf<GivenEvents, "toggle">>,
    {
      type: "toggle";
      args: [type: "toggle", payload: boolean];
      handler: (payload: boolean) => boolean;
      result: boolean;
    }
  >
>;
type _13d = Expect<
  Equal<
    EventContract<GivenDuplicate>,
    | {
        type: "same";
        args: [type: "same", payload: string];
        handler: (payload: string) => 1;
        result: 1;
      }
    | {
        type: "same";
        args: [type: "same", payload: number];
        handler: (payload: number) => 2;
        result: 2;
      }
  >
>;

// 14. Build the generic callable returned by `createDispatcher`.
export type DispatcherFunction<Events> =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    DispatcherFunction<GivenEvents>,
    <
      Kind extends "text" | "count" | "toggle" | "ready",
    >(
      ...args: GivenArgs<GivenEvents, Kind>
    ) => GivenResult<GivenEvent<GivenEvents, Kind>>
  >
>;
type _14b = Expect<
  Equal<
    ReturnType<DispatcherFunction<EventOf<GivenEvents, "text">>>,
    number
  >
>;
type _14c = Expect<
  Equal<
    ReturnType<DispatcherFunction<EventOf<GivenEvents, "ready">>>,
    true
  >
>;
type _14d = Expect<
  Equal<
    Parameters<DispatcherFunction<EventOf<GivenEvents, "text">>>,
    [type: "text", payload: { value: string }]
  >
>;
type _14e = Expect<
  Equal<
    Parameters<DispatcherFunction<EventOf<GivenEvents, "ready">>>,
    [type: "ready"]
  >
>;

// 15. Map each tag to its arguments, handler, and correlated result.
export type DispatchTable<Events> =
  TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    keyof DispatchTable<GivenEvents>,
    "text" | "count" | "toggle" | "ready"
  >
>;
type _15b = Expect<
  Equal<
    DispatchTable<GivenEvents>["text"],
    {
      args: [type: "text", payload: { value: string }];
      handler: (payload: { value: string }) => number;
      result: number;
    }
  >
>;
type _15c = Expect<
  Equal<
    DispatchTable<GivenEvents>["ready"],
    {
      args: [type: "ready"];
      handler: () => true;
      result: true;
    }
  >
>;
type _15d = Expect<
  Equal<
    DispatchTable<GivenEvents>["toggle"]["args"][1],
    boolean
  >
>;
type _15e = Expect<Equal<DispatchTable<never>, {}>>;

// ─── Duplicate, presence, broad, and special boundary profiles ──────────

// 16. Describe the union selected by one duplicated discriminant.
export type DuplicateTagProfile<
  Events,
  Kind extends GivenKind<Events>,
> =
  TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    DuplicateTagProfile<GivenDuplicate, "same">["payload"],
    string | number
  >
>;
type _16b = Expect<
  Equal<
    DuplicateTagProfile<GivenDuplicate, "same">["result"],
    1 | 2
  >
>;
type _16c = Expect<
  Equal<
    DuplicateTagProfile<GivenDuplicate, "same">["handler"],
    ((payload: string) => 1) | ((payload: number) => 2)
  >
>;
type _16d = Expect<
  Equal<
    DuplicateTagProfile<GivenDuplicate, "same">["args"],
    | [type: "same", payload: string]
    | [type: "same", payload: number]
  >
>;
type _16e = Expect<
  Equal<
    EventKind<DuplicateTagProfile<GivenDuplicate, "same">["events"]>,
    "same"
  >
>;

// 17. Distinguish absent, required, and optional payload conventions.
export type PayloadPresence<Event> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    PayloadPresence<EventOf<GivenPayloadVariants, "absent">>,
    { kind: "absent" }
  >
>;
type _17b = Expect<
  Equal<
    PayloadPresence<EventOf<GivenPayloadVariants, "undefined">>,
    { kind: "required"; payload: undefined }
  >
>;
type _17c = Expect<
  Equal<
    PayloadPresence<EventOf<GivenPayloadVariants, "optional">>,
    { kind: "optional"; payload: string }
  >
>;
type _17d = Expect<
  Equal<
    PayloadPresence<EventOf<GivenPayloadVariants, "void">>,
    { kind: "required"; payload: void }
  >
>;
type _17e = Expect<
  Equal<PayloadPresence<{}>, { kind: "absent" }>
>;

// 18. Describe precision loss from a broad discriminant beside an exact member.
export type BroadTagProfile<Events> =
  TODO; // TODO(koan)

type _18a = Expect<
  Equal<BroadTagProfile<GivenBroad>["kinds"], string>
>;
type _18b = Expect<
  Equal<
    BroadTagProfile<GivenBroad>["exactEvent"],
    { type: "exact"; payload: 1; result: 2 }
  >
>;
type _18c = Expect<
  Equal<BroadTagProfile<GivenBroad>["exactPayload"], 1>
>;
type _18d = Expect<
  Equal<BroadTagProfile<GivenBroad>["allPayloads"], unknown>
>;
type _18e = Expect<
  Equal<BroadTagProfile<GivenBroad>["allResults"], unknown>
>;

// 19. Classify extraction from any, never, unknown, and ordinary events safely.
export type DispatchSpecialProfile<Events> =
  TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    DispatchSpecialProfile<any>,
    [false, PropertyKey, false, unknown]
  >
>;
type _19b = Expect<
  Equal<
    DispatchSpecialProfile<never>,
    [false, never, false, never]
  >
>;
type _19c = Expect<
  Equal<
    DispatchSpecialProfile<unknown>,
    [false, never, false, never]
  >
>;
type _19d = Expect<
  Equal<
    DispatchSpecialProfile<{
      type: "x";
      payload: unknown;
      result: never;
    }>,
    [false, "x", false, unknown]
  >
>;

// 20. Build handlers for numeric and unique-symbol event keys.
export type PropertyKeyHandlerMap<Events> =
  TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    keyof PropertyKeyHandlerMap<
      | { type: 1; payload: string; result: number }
      | { type: 2; result: boolean }
    >,
    1 | 2
  >
>;
type _20b = Expect<
  Equal<
    PropertyKeyHandlerMap<{
      type: 1;
      payload: string;
      result: number;
    }>[1],
    (payload: string) => number
  >
>;
type _20c = Expect<
  Equal<
    PropertyKeyHandlerMap<{
      type: typeof givenToken;
      payload: Date;
      result: string;
    }>[typeof givenToken],
    (payload: Date) => string
  >
>;
type _20d = Expect<
  Equal<
    keyof PropertyKeyHandlerMap<
      | {
          type: typeof givenToken;
          payload: Date;
          result: string;
        }
      | { type: "ready"; result: true }
    >,
    typeof givenToken | "ready"
  >
>;
type _20e = Expect<
  Equal<PropertyKeyHandlerMap<never>, {}>
>;
