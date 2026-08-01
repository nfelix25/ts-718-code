import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-152: type-safe event emitters — constructions
 * =============================================================================
 *
 * An emitter is a relation, not two independent unions. The event name selects
 * an argument list, and that same pairing has to survive at both boundaries: the
 * listener that subscribes and the call that emits. Modelling each event's
 * arguments as a *tuple* is what makes that work uniformly — zero arguments,
 * one, several, and optional ones are all just tuple shapes, so no case needs
 * inventing.
 *
 * The failure mode is losing the correlation. Build the call as
 * `[name, ...argsForThatName]` inside a mapped type and index the result, and
 * every member of the union is a matched pair. Build it from a union of names
 * beside a union of argument lists and the type happily accepts a name from one
 * event with the arguments of another. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// A symbol event key, and a schema keyed by a broad string index.
declare const shutdownEvent: unique symbol;
type GivenBroadEvents = { [name: string]: [value: number] };

// ─── The relation ─────────────────────────────────────────────────────

// 1. Build the constraint every schema must satisfy: each key maps to a list of
//    arguments, and nothing else.
export type EventSchema<Events> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    {
      tupleValueAccepted: GivenExtends<{ ready: [] }, EventSchema<{ ready: [] }>>;
      stringValueRejected: GivenExtends<{ broken: string }, EventSchema<{ broken: string }>>;
    },
    { tupleValueAccepted: true; stringValueRejected: false }
  >
>;
type _01b = Expect<Equal<GivenExtends<{ broken: string }, EventSchema<{ broken: string }>>, false>>;
type _01c = Expect<
  Equal<
    {
      optionalTupleAccepted: GivenExtends<{ optional: [value?: number] }, EventSchema<{ optional: [value?: number] }>>;
      stringValueRejected: GivenExtends<{ broken: string }, EventSchema<{ broken: string }>>;
    },
    { optionalTupleAccepted: true; stringValueRejected: false }
  >
>;
type _01d = Expect<Equal<keyof EventSchema<{ a: []; b: [] }>, "a" | "b">>;

// 2. Build the application's schema. It deliberately covers every arity and
//    every kind of property key, because a good relation should not need a
//    special case for any of them.
export type AppEvents = TODO; // TODO(koan)

type _02a = Expect<
  Equal<keyof AppEvents, "ready" | "message" | "progress" | "error" | 404 | typeof shutdownEvent>
>;
type _02b = Expect<Equal<AppEvents["ready"], []>>;
type _02c = Expect<Equal<AppEvents["message"], [text: string, from: { readonly id: string }]>>;
type _02d = Expect<Equal<AppEvents["error"], [error: Error, fatal?: boolean]>>;
type _02e = Expect<Equal<AppEvents[typeof shutdownEvent], [code: number]>>;

// 3. Build the name alias.
export type EventNames<Events> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<EventNames<AppEvents>, "ready" | "message" | "progress" | "error" | 404 | typeof shutdownEvent>
>;
type _03b = Expect<Equal<Extract<EventNames<AppEvents>, typeof shutdownEvent>, typeof shutdownEvent>>;
type _03c = Expect<Equal<EventNames<GivenBroadEvents>, string | number>>;

// 4. Build the argument-list lookup — the other half of the relation.
export type EventArgs<
  Events extends EventSchema<Events>,
  Name extends keyof Events,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<EventArgs<AppEvents, "ready">, []>>;
type _04b = Expect<Equal<EventArgs<AppEvents, "progress">, [percent: number]>>;
type _04c = Expect<Equal<EventArgs<AppEvents, "error">, [error: Error, fatal?: boolean]>>;
type _04d = Expect<Equal<EventArgs<AppEvents, "error">["length"], 1 | 2>>;
type _04e = Expect<
  Equal<
    {
      argsOfAnythingAreAny: GivenIsAny<EventArgs<any, any>>;
      ordinaryArgsAreNot: GivenIsAny<EventArgs<AppEvents, "ready">>;
    },
    { argsOfAnythingAreAny: true; ordinaryArgsAreNot: false }
  >
>;

// 5. Build the listener signature. Spreading the tuple into the parameter list
//    is what turns "this event's arguments" into "this listener's parameters".
export type EventListener<
  Events extends EventSchema<Events>,
  Name extends keyof Events,
> = TODO; // TODO(koan)

type _05a = Expect<Equal<EventListener<AppEvents, "ready">, () => void>>;
type _05b = Expect<
  Equal<Parameters<EventListener<AppEvents, "message">>, [text: string, from: { readonly id: string }]>
>;
type _05c = Expect<Equal<ReturnType<EventListener<AppEvents, "progress">>, void>>;
type _05d = Expect<Equal<Parameters<EventListener<AppEvents, 404>>, [path: string]>>;
type _05e = Expect<Equal<Parameters<EventListener<AppEvents, typeof shutdownEvent>>, [code: number]>>;

// ─── Keeping the pair together ────────────────────────────────────────

// 6. Build the call tuple for one name, distributing over the name so a union of
//    names produces a union of *matched* calls rather than one loose shape.
export type EventCallFor<
  Events extends EventSchema<Events>,
  Name extends keyof Events,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<EventCallFor<AppEvents, "ready">, [event: "ready"]>>;
type _06b = Expect<Equal<EventCallFor<AppEvents, "progress">, [event: "progress", percent: number]>>;
type _06c = Expect<Equal<EventCallFor<AppEvents, "ready" | "progress">, ["ready"] | ["progress", number]>>;
type _06d = Expect<Equal<EventCallFor<AppEvents, never>, never>>;
type _06e = Expect<
  Equal<EventCallFor<AppEvents, "error">, [event: "error", error: Error, fatal?: boolean]>
>;

// 7. Build the union of every legal call by mapping over the whole schema and
//    indexing the result. This is the type an exhaustive dispatcher pattern
//    matches against.
export type EventCall<Events extends EventSchema<Events>> = TODO; // TODO(koan)

type _07a = Expect<Equal<Extract<EventCall<AppEvents>, ["ready", ...unknown[]]>, [event: "ready"]>>;
type _07b = Expect<
  Equal<Extract<EventCall<AppEvents>, ["error", ...unknown[]]>, [event: "error", error: Error, fatal?: boolean]>
>;
type _07c = Expect<Equal<GivenExtends<["ready", number], EventCall<AppEvents>>, false>>;
type _07d = Expect<
  Equal<
    {
      matchedPairAccepted: GivenExtends<["progress", number], EventCall<AppEvents>>;
      mismatchedPairRefused: GivenExtends<["ready", number], EventCall<AppEvents>>;
    },
    { matchedPairAccepted: true; mismatchedPairRefused: false }
  >
>;
type _07e = Expect<Equal<EventCall<GivenBroadEvents>, [event: string, value: number]>>;

// 8. Build the discriminated record form of the same relation, for the places
//    that want a named field instead of a positional tuple.
export type EventRecord<Events extends EventSchema<Events>> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<EventRecord<AppEvents>["name"], "ready" | "message" | "progress" | "error" | 404 | typeof shutdownEvent>
>;
type _08b = Expect<
  Equal<
    Extract<EventRecord<AppEvents>, { name: "message" }>["args"],
    [text: string, from: { readonly id: string }]
  >
>;
type _08c = Expect<Equal<Extract<EventRecord<AppEvents>, { name: "ready" }>["args"], []>>;
type _08d = Expect<Equal<Extract<EventRecord<AppEvents>, { name: "progress" }>, { name: "progress"; args: [percent: number] }>>;
type _08e = Expect<Equal<GivenExtends<{ name: "ready"; args: [number] }, EventRecord<AppEvents>>, false>>;

// ─── Asking questions about the schema ────────────────────────────────

// 9. Build the operator that reads an event's first argument, answering with
//    nothing when there is none. The pattern matches the whole tuple at once, so
//    a union of names has no single first argument to report.
export type FirstArgument<
  Events extends EventSchema<Events>,
  Name extends keyof Events,
> = TODO; // TODO(koan)

type _09a = Expect<Equal<FirstArgument<AppEvents, "message">, string>>;
type _09b = Expect<Equal<FirstArgument<AppEvents, "error">, Error>>;
type _09c = Expect<Equal<FirstArgument<AppEvents, "ready">, never>>;
type _09d = Expect<Equal<FirstArgument<AppEvents, "ready" | "progress">, never>>;

// 10. Build the reverse lookup: which events accept a given argument list. It is
//     an ordinary filter over the schema, and it answers by assignability rather
//     than by identity.
export type EventsMatching<
  Events extends EventSchema<Events>,
  Args extends readonly unknown[],
> = TODO; // TODO(koan)

type _10a = Expect<Equal<EventsMatching<AppEvents, []>, "ready">>;
type _10b = Expect<Equal<EventsMatching<AppEvents, [number]>, "progress" | typeof shutdownEvent>>;
type _10c = Expect<Equal<EventsMatching<AppEvents, [unknown]>, "progress" | 404 | typeof shutdownEvent>>;
type _10d = Expect<
  Equal<
    EventsMatching<AppEvents, readonly unknown[]>,
    "ready" | "message" | "progress" | "error" | 404 | typeof shutdownEvent
  >
>;
type _10e = Expect<Equal<EventsMatching<AppEvents, [string, string]>, never>>;

// ─── The correlation, and what happens without it ─────────────────────

// 11. Build the shape a careless emitter would produce: one name union beside
//     one argument union, with nothing tying them together.
export type UncorrelatedCall = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    {
      looseAcceptsTheMismatch: GivenExtends<["ready", number], UncorrelatedCall>;
      correlatedRefusesMismatch: GivenExtends<["ready", number], EventCall<AppEvents>>;
    },
    { looseAcceptsTheMismatch: true; correlatedRefusesMismatch: false }
  >
>;
type _11b = Expect<
  Equal<
    {
      looseAcceptsTheMismatch: GivenExtends<["ready", number], UncorrelatedCall>;
      correlatedRefusesIt: GivenExtends<["ready", number], EventCall<AppEvents>>;
    },
    { looseAcceptsTheMismatch: true; correlatedRefusesIt: false }
  >
>;
type _11c = Expect<
  Equal<
    {
      firstSlot: UncorrelatedCall[0];
      correlatedRefusesMismatch: GivenExtends<["ready", number], EventCall<AppEvents>>;
    },
    { firstSlot: EventNames<AppEvents>; correlatedRefusesMismatch: false }
  >
>;
type _11d = Expect<
  Equal<
    {
      looseAcceptsTheMatch: GivenExtends<["progress", number], UncorrelatedCall>;
      correlatedRefusesMismatch: GivenExtends<["ready", number], EventCall<AppEvents>>;
    },
    { looseAcceptsTheMatch: true; correlatedRefusesMismatch: false }
  >
>;

// 12. Report the correlation directly. Filtering a correlated union on the name
//     narrows the arguments with it; the loose shape has nothing to narrow.
export type CorrelationProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<CorrelationProfile["readyCall"], [event: "ready"]>>;
type _12b = Expect<Equal<CorrelationProfile["progressCall"], [event: "progress", percent: number]>>;
type _12c = Expect<Equal<CorrelationProfile["mismatchRefused"], false>>;
type _12d = Expect<Equal<CorrelationProfile["mismatchAcceptedByTheLooseShape"], true>>;
type _12e = Expect<Equal<CorrelationProfile["recordFormAgrees"], [percent: number]>>;

// 13. Report the arities. Every shape a listener can have comes from a tuple
//     shape, including the optional trailing argument.
export type ArityProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ArityProfile["none"], []>>;
type _13b = Expect<Equal<ArityProfile["one"], [percent: number]>>;
type _13c = Expect<Equal<ArityProfile["several"], [text: string, from: { readonly id: string }]>>;
type _13d = Expect<Equal<ArityProfile["optionalTail"], [error: Error, fatal?: boolean]>>;
type _13e = Expect<Equal<ArityProfile["optionalTailLength"], 1 | 2>>;

// 14. Report listener compatibility. Parameters are inputs, so a listener that
//     accepts more is accepted where one accepting less was promised, and a
//     `void` return accepts an implementation that returns something anyway.
export type ListenerVarianceProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<ListenerVarianceProfile["broaderParametersAccepted"], true>>;
type _14b = Expect<Equal<ListenerVarianceProfile["narrowerParametersRefused"], false>>;
type _14c = Expect<Equal<ListenerVarianceProfile["returningImplementationAccepted"], true>>;
type _14d = Expect<Equal<ListenerVarianceProfile["unknownParametersAccepted"], true>>;
type _14e = Expect<Equal<ListenerVarianceProfile["neverParametersRefused"], false>>;

// 15. Report the key kinds. A schema keyed by literals keeps every name apart; a
//     schema keyed by a broad index collapses them into one, and the numeric
//     half of a string index shows up in the key set for free.
export type KeyKindProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<KeyKindProfile["numericKeyArgs"], [path: string]>>;
type _15b = Expect<Equal<KeyKindProfile["symbolKeyArgs"], [code: number]>>;
type _15c = Expect<Equal<KeyKindProfile["broadNames"], string | number>>;
type _15d = Expect<Equal<KeyKindProfile["broadArgs"], [value: number]>>;
type _15e = Expect<Equal<KeyKindProfile["broadCall"], [event: string, value: number]>>;

// 16. Report the schema boundary: what counts as a schema at all, and what the
//     operators answer for the degenerate inputs.
export type SchemaProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<SchemaProfile["tupleValuesAccepted"], true>>;
type _16b = Expect<Equal<SchemaProfile["nonTupleValueRejected"], false>>;
type _16c = Expect<Equal<SchemaProfile["optionalTupleAccepted"], true>>;
type _16d = Expect<Equal<SchemaProfile["noNameNoCall"], never>>;
type _16e = Expect<Equal<SchemaProfile["argsOfAnythingAreAny"], true>>;

// ─── The emitter surface ──────────────────────────────────────────────

// 17. Build the emitter's signatures. Every one of them is generic in the name,
//     so the relation is applied once per call rather than widened up front —
//     and `emit` takes the whole correlated call as its rest tuple.
export type EmitterApi<Events extends EventSchema<Events>> = TODO; // TODO(koan)

type _17a = Expect<Equal<ReturnType<EmitterApi<AppEvents>["on"]>, () => void>>;
type _17b = Expect<Equal<ReturnType<EmitterApi<AppEvents>["off"]>, void>>;
type _17c = Expect<Equal<ReturnType<EmitterApi<AppEvents>["emit"]>, boolean>>;
type _17d = Expect<Equal<keyof EmitterApi<AppEvents>, "on" | "once" | "off" | "emit">>;
type _17e = Expect<
  Equal<
    { pinned: Parameters<typeof onProgress>[1]; correlatedRefusesMismatch: GivenExtends<["ready", number], EventCall<AppEvents>> },
    { pinned: (percent: number) => void; correlatedRefusesMismatch: false }
  >
>;

declare const onProgress: (name: "progress", listener: EventListener<AppEvents, "progress">) => () => void;

// 18. Build the listener store the emitter would keep: one collection per event,
//     each holding exactly that event's listeners rather than a widened
//     callback.
export type ListenerMap<Events extends EventSchema<Events>> = TODO; // TODO(koan)

type _18a = Expect<Equal<ListenerMap<AppEvents>["progress"], ReadonlySet<(percent: number) => void>>>;
type _18b = Expect<Equal<ListenerMap<AppEvents>["ready"], ReadonlySet<() => void>>>;
type _18c = Expect<
  Equal<
    { keys: keyof ListenerMap<AppEvents>; correlatedRefusesMismatch: GivenExtends<["ready", number], EventCall<AppEvents>> },
    { keys: keyof AppEvents; correlatedRefusesMismatch: false }
  >
>;
type _18d = Expect<
  Equal<
    ListenerMap<AppEvents>["message"],
    ReadonlySet<(text: string, from: { readonly id: string }) => void>
  >
>;
type _18e = Expect<Equal<ListenerMap<AppEvents>[typeof shutdownEvent], ReadonlySet<(code: number) => void>>>;
