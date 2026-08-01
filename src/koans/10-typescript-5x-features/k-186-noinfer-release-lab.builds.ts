import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-186: NoInfer release lab — constructions
 * =============================================================================
 *
 * `NoInfer<T>` removes one occurrence of `T` from candidate collection and then
 * checks that position against whatever the remaining occurrences chose. The
 * interesting part of an API is therefore not what it accepts but *which of its
 * positions get a vote*: a state list authors a transition domain, a schema
 * authors the value shape, a callback's return authors the fallback type.
 *
 * Two consequences are worth building. First, `NoInfer<T>` is transparent — it
 * is `T` in every way once selection is over, so it validates nothing by itself.
 * Second, it only removes votes: it cannot repair an `any` arriving from a site
 * that still votes, cannot stop a caller from widening by explicit argument, and
 * leaves nothing to infer from when every occurrence is blocked.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

type Kind<Value> = 0 extends 1 & Value
  ? "any"
  : [Value] extends [never]
    ? "never"
    : unknown extends Value
      ? "unknown"
      : "ordinary";

// ─── The wrapper itself ───────────────────────────────────────────────

// 1. Build the marker that takes a position out of the vote. Everything about
//    it is invisible afterwards, which is why the assertions below can only
//    observe that it changed nothing.
export type Blocked<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<Blocked<{ id: number }>, { id: number }>>;
type _01b = Expect<Equal<Awaited<Blocked<Promise<string>>>, string>>;
type _01c = Expect<Equal<Blocked<readonly ["a", "b"]>[number], "a" | "b">>;
type _01d = Expect<Equal<Kind<Blocked<unknown>>, "unknown">>;
type _01e = Expect<Equal<Kind<Blocked<never>>, "never">>;

// ─── Modelling the vote ───────────────────────────────────────────────

// 2. Build the two roles a parameter position can have.
export type SiteRole = TODO; // TODO(koan)

type _02a = Expect<Equal<SiteRole, "authoritative" | "checked">>;
type _02b = Expect<Equal<Exclude<SiteRole, "checked">, "authoritative">>;
type _02c = Expect<Equal<Extract<SiteRole, `auth${string}`>, "authoritative">>;
type _02d = Expect<Equal<Extract<SiteRole, "inferred">, never>>;

// 3. Build the description of one position: the role it plays and the type that
//    appears there.
export type Candidate<Role extends SiteRole, Type> = TODO; // TODO(koan)

type _03a = Expect<Equal<Candidate<"authoritative", "a">["type"], "a">>;
type _03b = Expect<Equal<Candidate<"checked", string>["role"], "checked">>;
type _03c = Expect<Equal<keyof Candidate<"checked", string>, "role" | "type">>;
type _03d = Expect<
  Equal<
    Candidate<"authoritative", "a"> | Candidate<"checked", "b">,
    { role: "authoritative"; type: "a" } | { role: "checked"; type: "b" }
  >
>;

// 4. Build the collection step: only unblocked positions contribute a candidate.
export type CandidatesFrom<Sites extends readonly Candidate<SiteRole, unknown>[]> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    CandidatesFrom<[Candidate<"authoritative", "a" | "b">, Candidate<"checked", string>]>,
    "a" | "b"
  >
>;
type _04b = Expect<Equal<CandidatesFrom<[Candidate<"checked", string>]>, never>>;
type _04c = Expect<Equal<CandidatesFrom<[]>, never>>;
type _04d = Expect<
  Equal<
    CandidatesFrom<[Candidate<"authoritative", "left">, Candidate<"authoritative", "right">]>,
    "left" | "right"
  >
>;

// 5. Build the selection step. With every occurrence blocked there is nothing to
//    infer from, and the parameter falls back to its default — or to `unknown`.
export type SelectedType<
  Sites extends readonly Candidate<SiteRole, unknown>[],
  Default = unknown,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    SelectedType<[Candidate<"authoritative", "a" | "b">, Candidate<"checked", string>]>,
    "a" | "b"
  >
>;
type _05b = Expect<Equal<SelectedType<[Candidate<"checked", string>]>, unknown>>;
type _05c = Expect<Equal<SelectedType<[Candidate<"checked", string>], string>, string>>;
type _05d = Expect<
  Equal<
    SelectedType<[Candidate<"authoritative", "left">, Candidate<"authoritative", "right">]>,
    "left" | "right"
  >
>;

// 6. Build the check for the failure `NoInfer` cannot fix: an `any` arriving
//    from a position that still votes. Blocking a position that holds `any`
//    keeps it out of the result; blocking the others does not.
export type PoisonedByAny<Sites extends readonly Candidate<SiteRole, unknown>[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<PoisonedByAny<[Candidate<"authoritative", any>]>, true>>;
type _06b = Expect<Equal<PoisonedByAny<[Candidate<"authoritative", string>]>, false>>;
type _06c = Expect<Equal<PoisonedByAny<[Candidate<"checked", any>]>, false>>;
type _06d = Expect<Equal<PoisonedByAny<[]>, false>>;

// ─── Four APIs that own their types ───────────────────────────────────

// 7. Build the transition API: the state list authors the domain, and both
//    endpoints are checked against it.
export type TransitionApi<State extends string> = TODO; // TODO(koan)

type _07a = Expect<Equal<Parameters<TransitionApi<"a" | "b">>[0], readonly ("a" | "b")[]>>;
type _07b = Expect<Equal<Parameters<TransitionApi<"a" | "b">>[1], "a" | "b">>;
type _07c = Expect<Equal<ReturnType<TransitionApi<"a" | "b">>, readonly ["a" | "b", "a" | "b"]>>;
type _07d = Expect<Equal<Parameters<TransitionApi<"a" | "b">>["length"], 3>>;

// 8. Build the schema API: the schema authors the shape, the value is checked.
export type SchemaApi<Schema> = TODO; // TODO(koan)

type _08a = Expect<Equal<Parameters<SchemaApi<{ id: number }>>[0], { id: number }>>;
type _08b = Expect<Equal<Parameters<SchemaApi<{ id: number }>>[1], { id: number }>>;
type _08c = Expect<Equal<ReturnType<SchemaApi<{ id: number }>>, { id: number }>>;
type _08d = Expect<
  Equal<
    {
      theCheckedSiteIsAsWideAsTheSchema: Parameters<SchemaApi<unknown>>[1];
      andThereAreTwoPositions: Parameters<SchemaApi<unknown>>["length"];
    },
    { theCheckedSiteIsAsWideAsTheSchema: unknown; andThereAreTwoPositions: 2 }
  >
>;

// 9. Build the transform API: the callback's result authors the output, so the
//    fallback has to agree with it rather than widen it.
export type TransformApi<Input, Output> = TODO; // TODO(koan)

type _09a = Expect<Equal<Parameters<TransformApi<string, number>>[1], (input: string) => number>>;
type _09b = Expect<Equal<Parameters<TransformApi<string, number>>[2], number>>;
type _09c = Expect<Equal<ReturnType<TransformApi<string, number>>, number>>;
type _09d = Expect<
  Equal<
    {
      aWideOutputMakesAWideFallback: Parameters<TransformApi<string, unknown>>[2];
      andThereAreThreePositions: Parameters<TransformApi<string, unknown>>["length"];
    },
    { aWideOutputMakesAWideFallback: unknown; andThereAreThreePositions: 3 }
  >
>;

// 10. Build the handler a subscription API hands back.
export type HandlerOf<Event> = TODO; // TODO(koan)

type _10a = Expect<Equal<Parameters<HandlerOf<"a" | "b">>[0], "a" | "b">>;
type _10b = Expect<Equal<ReturnType<HandlerOf<"a" | "b">>, void>>;
type _10c = Expect<Equal<Parameters<HandlerOf<string>>[0], string>>;
type _10d = Expect<
  Equal<
    {
      aWiderHandlerFitsANarrowerSlot: GivenExtends<HandlerOf<string>, HandlerOf<"a" | "b">>;
      butNotTheOtherWayAround: GivenExtends<HandlerOf<"a" | "b">, HandlerOf<string>>;
    },
    { aWiderHandlerFitsANarrowerSlot: true; butNotTheOtherWayAround: false }
  >
>;

// 11. Build the events API: the event list authors the domain, and the callback
//     parameter is checked against it rather than widening it.
export type EventsApi<Event extends string> = TODO; // TODO(koan)

type _11a = Expect<Equal<Parameters<EventsApi<"a" | "b">>[0], readonly ("a" | "b")[]>>;
type _11b = Expect<Equal<Parameters<EventsApi<"a" | "b">>[1], (event: "a" | "b") => void>>;
type _11c = Expect<Equal<ReturnType<EventsApi<"a" | "b">>, (event: "a" | "b") => void>>;
type _11d = Expect<Equal<Parameters<ReturnType<EventsApi<string>>>[0], string>>;

// 12. Build the API with two unblocked positions and one blocked one. Blocking
//     the fallback does not make the other two agree — both still vote.
export type PairApi<Value> = TODO; // TODO(koan)

type _12a = Expect<Equal<Parameters<PairApi<string>>[0], string>>;
type _12b = Expect<Equal<Parameters<PairApi<string>>[2], string>>;
type _12c = Expect<Equal<ReturnType<PairApi<"left" | "right">>, "left" | "right">>;
type _12d = Expect<Equal<Parameters<PairApi<string>>["length"], 3>>;

// 13. Build the API in which every occurrence is blocked. It is still callable
//     with an explicit type argument; what it cannot do is discover one.
export type AllBlockedApi<Value> = TODO; // TODO(koan)

type _13a = Expect<Equal<Parameters<AllBlockedApi<string>>[0], string>>;
type _13b = Expect<Equal<ReturnType<AllBlockedApi<string>>, string>>;
type _13c = Expect<Equal<Kind<ReturnType<AllBlockedApi<unknown>>>, "unknown">>;
type _13d = Expect<
  Equal<
    {
      theOnlyPositionIsAsWideAsTheChoice: Parameters<AllBlockedApi<unknown>>[0];
      andThereIsExactlyOne: Parameters<AllBlockedApi<unknown>>["length"];
    },
    { theOnlyPositionIsAsWideAsTheChoice: unknown; andThereIsExactlyOne: 1 }
  >
>;

// 14. Build the same thing with a default, which is what an all-blocked
//     parameter actually falls back to.
export type DefaultedApi<Value = string> = TODO; // TODO(koan)

type _14a = Expect<Equal<ReturnType<DefaultedApi>, string | undefined>>;
type _14b = Expect<Equal<ReturnType<DefaultedApi<number>>, number | undefined>>;
type _14c = Expect<Equal<Parameters<DefaultedApi<string>>[0], string | undefined>>;
type _14d = Expect<Equal<Parameters<DefaultedApi>["length"], 0 | 1>>;

// ─── What it cannot do ────────────────────────────────────────────────

// 15. Report explicit widening. A caller who names the type argument gets it;
//     the blocked positions simply follow that choice down.
export type WideningProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<WideningProfile["inferredFromTheList"], readonly ["a" | "b", "a" | "b"]>>;
type _15b = Expect<Equal<WideningProfile["namedByTheCaller"], readonly [string, string]>>;
type _15c = Expect<Equal<WideningProfile["theBlockedSitesFollowTheChoice"], string>>;
type _15d = Expect<Equal<WideningProfile["soBlockingDidNotPreventWidening"], true>>;

// 16. Report transparency. Nothing survives selection: the wrapper is the type,
//     so it can never be a validation step of its own.
export type TransparencyProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<TransparencyProfile["aWrappedObjectIsTheObject"], true>>;
type _16b = Expect<Equal<TransparencyProfile["aWrappedPromiseStillAwaits"], string>>;
type _16c = Expect<Equal<TransparencyProfile["aWrappedTupleStillIndexes"], "a" | "b">>;
type _16d = Expect<Equal<TransparencyProfile["modifiersStillApply"], { readonly id: number }>>;
type _16e = Expect<Equal<TransparencyProfile["andNeverStillFitsEverything"], true>>;

// 17. Report the ownership decision each of the four APIs encodes, in terms of
//     the vote model rather than the signatures.
export type AuthorityProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<AuthorityProfile["theStateListVotes"], "red" | "green">>;
type _17b = Expect<Equal<AuthorityProfile["theFallbackDoesNot"], unknown>>;
type _17c = Expect<Equal<AuthorityProfile["twoOpenSitesBothVote"], "left" | "right">>;
type _17d = Expect<Equal<AuthorityProfile["anOpenAnyPoisonsTheResult"], true>>;
type _17e = Expect<Equal<AuthorityProfile["aBlockedAnyDoesNot"], false>>;

// 18. Report one signature's inference at a glance: what was collected, what was
//     selected, whether anything voted, and whether an `any` got through.
export type NoInferReport<
  Sites extends readonly Candidate<SiteRole, unknown>[],
  Default = unknown,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    NoInferReport<[Candidate<"authoritative", "a" | "b">, Candidate<"checked", string>]>["selected"],
    "a" | "b"
  >
>;
type _18b = Expect<Equal<NoInferReport<[Candidate<"checked", string>]>["candidates"], never>>;
type _18c = Expect<Equal<NoInferReport<[Candidate<"checked", string>]>["anythingVoted"], false>>;
type _18d = Expect<Equal<NoInferReport<[Candidate<"checked", string>], number>["selected"], number>>;
type _18e = Expect<Equal<NoInferReport<[Candidate<"authoritative", any>]>["poisoned"], true>>;
