import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-151: typed transition tables — constructions
 * =============================================================================
 *
 * Typestate written by hand puts one precondition on each method. A transition
 * table puts the whole protocol in data: each state names the events it accepts,
 * and each event records where it leads and what it needs. Four operators are
 * then enough to answer everything — which events are legal here, what payload
 * this event demands, where it goes, and what the correlated cases are.
 *
 * The subtlety is distribution. `keyof Table[State]` on a union of states asks
 * for the keys *common to every* selected row, which for a real protocol is
 * usually nothing at all; collecting each row's keys instead needs a conditional
 * that distributes over the state. The same care keeps the event and its payload
 * correlated in the dispatcher's argument tuple, so a union of call shapes stays
 * a union of *matched pairs* rather than a soup of every event with every
 * payload. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// Two deliberately broken tables, so the operators can be pointed at them.
type GivenBadDestinationTable = { idle: { start: { to: "missing"; payload: undefined } } };
type GivenMixedPayloadTable = {
  idle: { tick: { to: "idle"; payload: undefined }; set: { to: "idle"; payload: number } };
};
type GivenEmptyRowTable = { idle: {} };

// ─── The protocol as data ─────────────────────────────────────────────

// 1. Build the table. A closed door opens or locks, an open one closes, a locked
//    one unlocks; the two that turn a key need one, and the others need nothing.
export type DoorTable = TODO; // TODO(koan)

type _01a = Expect<Equal<keyof DoorTable, "closed" | "open" | "locked">>;
type _01b = Expect<Equal<keyof DoorTable["closed"], "open" | "lock">>;
type _01c = Expect<Equal<DoorTable["closed"]["lock"], { to: "locked"; payload: { key: string } }>>;
type _01d = Expect<Equal<DoorTable["open"]["close"]["to"], "closed">>;
type _01e = Expect<Equal<keyof DoorTable[keyof DoorTable], never>>;

// ─── The four questions ───────────────────────────────────────────────

// 2. Build the operator that lists the legal events of a state. It has to
//    distribute, or a union of states will answer with the keys they have in
//    common instead of the keys they have between them.
export type Events<Table, State extends keyof Table> = TODO; // TODO(koan)

type _02a = Expect<Equal<Events<DoorTable, "closed">, "open" | "lock">>;
type _02b = Expect<Equal<Events<DoorTable, "open">, "close">>;
type _02c = Expect<Equal<Events<DoorTable, "closed" | "open">, "open" | "lock" | "close">>;
type _02d = Expect<Equal<Events<DoorTable, never>, never>>;
type _02e = Expect<Equal<Events<GivenEmptyRowTable, "idle">, never>>;

// 3. Build the operator that answers where one event leads. Constraining the
//    inferred destination to the table's own states is what makes a typo in the
//    table answer `never` instead of inventing a state.
export type Next<
  Table,
  State extends keyof Table,
  Event extends Events<Table, State>,
> = TODO; // TODO(koan)

type _03a = Expect<Equal<Next<DoorTable, "closed", "open">, "open">>;
type _03b = Expect<Equal<Next<DoorTable, "closed", "lock">, "locked">>;
type _03c = Expect<Equal<Next<DoorTable, "locked", "unlock">, "closed">>;
type _03d = Expect<Equal<Next<DoorTable, "closed", "open" | "lock">, "open" | "locked">>;
type _03e = Expect<Equal<Next<GivenBadDestinationTable, "idle", "start">, never>>;

// 4. Build the operator that answers what an event needs. The states that need
//    nothing say so with `undefined`, which is what the argument tuple keys off.
export type Payload<
  Table,
  State extends keyof Table,
  Event extends Events<Table, State>,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<Payload<DoorTable, "closed", "open">, undefined>>;
type _04b = Expect<Equal<Payload<DoorTable, "closed", "lock">, { key: string }>>;
type _04c = Expect<Equal<Payload<DoorTable, "locked", "unlock">, { key: string }>>;
type _04d = Expect<Equal<Payload<GivenBadDestinationTable, "idle", "start">, undefined>>;
type _04e = Expect<Equal<Payload<GivenMixedPayloadTable, "idle", "tick" | "set">, undefined | number>>;

// 5. Build the argument tuple a dispatcher would take. Distributing over the
//    event is what keeps each event paired with its own payload instead of with
//    the union of all of them.
export type EventArgs<
  Table,
  State extends keyof Table,
  Event extends Events<Table, State>,
> = TODO; // TODO(koan)

type _05a = Expect<Equal<EventArgs<DoorTable, "closed", "open">, [event: "open"]>>;
type _05b = Expect<Equal<EventArgs<DoorTable, "closed", "lock">, [event: "lock", payload: { key: string }]>>;
type _05c = Expect<
  Equal<
    EventArgs<DoorTable, "closed", "open" | "lock">,
    [event: "open"] | [event: "lock", payload: { key: string }]
  >
>;
type _05d = Expect<
  Equal<
    EventArgs<GivenMixedPayloadTable, "idle", "tick" | "set">,
    [event: "tick"] | [event: "set", payload: number]
  >
>;
type _05e = Expect<Equal<EventArgs<DoorTable, "open", "close">["length"], 1>>;

// 6. Build the correlated case union: one member per legal event, each carrying
//    its own event name, payload, and destination together.
export type TransitionCases<Table, State extends keyof Table> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    TransitionCases<DoorTable, "closed">,
    { event: "open"; payload: undefined; to: "open" } | { event: "lock"; payload: { key: string }; to: "locked" }
  >
>;
type _06b = Expect<
  Equal<TransitionCases<DoorTable, "open">, { event: "close"; payload: undefined; to: "closed" }>
>;
type _06c = Expect<Equal<TransitionCases<DoorTable, "closed">["event"], "open" | "lock">>;
type _06d = Expect<Equal<TransitionCases<DoorTable, "closed">["to"], "open" | "locked">>;
type _06e = Expect<Equal<TransitionCases<GivenEmptyRowTable, "idle">, never>>;

// ─── The door's own vocabulary ────────────────────────────────────────

// 7. Build the state alias — the table's own key set.
export type DoorState = TODO; // TODO(koan)

type _07a = Expect<Equal<DoorState, "closed" | "open" | "locked">>;
type _07b = Expect<Equal<Extract<DoorState, "closed">, "closed">>;
type _07c = Expect<Equal<GivenExtends<"ajar", DoorState>, false>>;

// 8. Build the event alias for a state.
export type DoorEvent<State extends DoorState> = TODO; // TODO(koan)

type _08a = Expect<Equal<DoorEvent<"closed">, "open" | "lock">>;
type _08b = Expect<Equal<DoorEvent<"open">, "close">>;
type _08c = Expect<Equal<DoorEvent<"locked">, "unlock">>;
type _08d = Expect<Equal<DoorEvent<DoorState>, "open" | "lock" | "close" | "unlock">>;

// 9. Build the destination alias.
export type DoorNext<State extends DoorState, Event extends DoorEvent<State>> = TODO; // TODO(koan)

type _09a = Expect<Equal<DoorNext<"closed", "open">, "open">>;
type _09b = Expect<Equal<DoorNext<"closed", "lock">, "locked">>;
type _09c = Expect<Equal<DoorNext<"open", "close">, "closed">>;
type _09d = Expect<Equal<DoorNext<"closed", "open" | "lock">, "open" | "locked">>;

// 10. Build the argument alias.
export type DoorArgs<State extends DoorState, Event extends DoorEvent<State>> = TODO; // TODO(koan)

type _10a = Expect<Equal<DoorArgs<"closed", "open">, [event: "open"]>>;
type _10b = Expect<Equal<DoorArgs<"closed", "lock">, [event: "lock", payload: { key: string }]>>;
type _10c = Expect<
  Equal<DoorArgs<"closed", "open" | "lock">, [event: "open"] | [event: "lock", payload: { key: string }]>
>;
type _10d = Expect<Equal<DoorArgs<"locked", "unlock">, [event: "unlock", payload: { key: string }]>>;

// 11. Build the value the dispatcher moves around: the current state plus a log,
//     with the state pinned by the parameter rather than widened to the union.
export type DoorSnapshot<State extends DoorState> = TODO; // TODO(koan)

type _11a = Expect<Equal<DoorSnapshot<"closed">["state"], "closed">>;
type _11b = Expect<Equal<DoorSnapshot<"closed">["history"], readonly string[]>>;
type _11c = Expect<Equal<keyof DoorSnapshot<"closed">, "state" | "history">>;
type _11d = Expect<Equal<DoorSnapshot<"closed">, { readonly state: "closed"; readonly history: readonly string[] }>>;

// ─── Reading the graph ────────────────────────────────────────────────

// 12. Build the operator that names every state reachable in one step, by asking
//     for the destination of every legal event at once.
export type ReachableFrom<Table, State extends keyof Table> = TODO; // TODO(koan)

type _12a = Expect<Equal<ReachableFrom<DoorTable, "closed">, "open" | "locked">>;
type _12b = Expect<Equal<ReachableFrom<DoorTable, "open">, "closed">>;
type _12c = Expect<Equal<ReachableFrom<DoorTable, "locked">, "closed">>;
type _12d = Expect<Equal<ReachableFrom<GivenEmptyRowTable, "idle">, never>>;

// 13. Build the walker that runs a sequence of events from a starting state,
//     landing on the last one or answering `never` the moment an event is not
//     legal where it was fired.
export type RunEvents<
  Table,
  State extends keyof Table,
  EventList extends readonly PropertyKey[],
> = TODO; // TODO(koan)

type _13a = Expect<Equal<RunEvents<DoorTable, "closed", ["open", "close"]>, "closed">>;
type _13b = Expect<Equal<RunEvents<DoorTable, "closed", ["lock"]>, "locked">>;
type _13c = Expect<Equal<RunEvents<DoorTable, "closed", ["close"]>, never>>;
type _13d = Expect<Equal<RunEvents<DoorTable, "closed", []>, "closed">>;
type _13e = Expect<Equal<RunEvents<DoorTable, "closed", ["lock", "unlock", "open"]>, "open">>;

// ─── What distribution buys ───────────────────────────────────────────

// 14. Report the difference between indexing a union of rows and distributing
//     over the states. The first asks what every row agrees on; the second
//     collects what each row offers.
export type DistributionProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<DistributionProfile["indexedDirectly"], never>>;
type _14b = Expect<Equal<DistributionProfile["distributed"], "open" | "lock" | "close" | "unlock">>;
type _14c = Expect<Equal<DistributionProfile["twoRowsIndexedDirectly"], never>>;
type _14d = Expect<Equal<DistributionProfile["twoRowsDistributed"], "open" | "lock" | "close">>;
type _14e = Expect<Equal<DistributionProfile["oneRowAgrees"], true>>;

// 15. Report the correlation. Because each case carries all three facts
//     together, filtering on one of them narrows the other two — which is the
//     whole reason to build the case union rather than three separate unions.
export type CorrelationProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<CorrelationProfile["everyEvent"], "open" | "lock" | "close" | "unlock">>;
type _15b = Expect<Equal<CorrelationProfile["everyDestination"], "open" | "locked" | "closed">>;
type _15c = Expect<Equal<CorrelationProfile["eventsThatClose"], "close" | "unlock">>;
type _15d = Expect<Equal<CorrelationProfile["whereLockGoes"], "locked">>;
type _15e = Expect<Equal<CorrelationProfile["whatLockNeeds"], { key: string }>>;

// 16. Report what a malformed table produces. A destination the table does not
//     declare is not an error at the table — it becomes `never` at the moment
//     something asks where the event leads.
export type MalformedTableProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<MalformedTableProfile["destination"], never>>;
type _16b = Expect<Equal<MalformedTableProfile["payloadStillReadable"], undefined>>;
type _16c = Expect<Equal<MalformedTableProfile["eventStillListed"], "start">>;
type _16d = Expect<
  Equal<MalformedTableProfile["caseCollapses"], { event: "start"; payload: undefined; to: never }>
>;

// 17. Report the edges: an empty row, the bottom state, and a table that is
//     `any` — which does not make the operators answer `any` back.
export type SpecialTypeProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<SpecialTypeProfile["emptyRowEvents"], never>>;
type _17b = Expect<Equal<SpecialTypeProfile["emptyRowCases"], never>>;
type _17c = Expect<Equal<SpecialTypeProfile["fromBottomState"], never>>;
type _17d = Expect<Equal<SpecialTypeProfile["eventsOfAnythingAreNotAny"], false>>;
type _17e = Expect<Equal<SpecialTypeProfile["payloadOfAnythingIsNotAny"], false>>;

// 18. Build the dispatcher's signatures. The rest tuple is where all four
//     answers meet: the event must be legal here, its payload must match, and
//     the result is the snapshot at wherever that event leads.
export type DoorApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    { built: ReturnType<DoorApi["createDoor"]>; noEventsFromNothing: Events<DoorTable, never> },
    { built: DoorSnapshot<"closed">; noEventsFromNothing: never }
  >
>;
type _18b = Expect<Equal<ReturnType<DoorApi["createDoor"]>["state"], "closed">>;
type _18c = Expect<
  Equal<
    { first: Parameters<typeof lockTheDoor>[0]; noEventsFromNothing: Events<DoorTable, never> },
    { first: DoorSnapshot<"closed">; noEventsFromNothing: never }
  >
>;
type _18d = Expect<
  Equal<
    { landed: ReturnType<typeof lockTheDoor>; noEventsFromNothing: Events<DoorTable, never> },
    { landed: DoorSnapshot<"locked">; noEventsFromNothing: never }
  >
>;
type _18e = Expect<Equal<Parameters<typeof lockTheDoor>[1], { key: string }>>;

declare const lockTheDoor: (
  current: DoorSnapshot<"closed">,
  payload: Payload<DoorTable, "closed", "lock">,
) => DoorSnapshot<DoorNext<"closed", "lock">>;
