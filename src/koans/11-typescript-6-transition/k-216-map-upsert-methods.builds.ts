import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-216: Map upsert methods — constructions
 * =============================================================================
 *
 * "Read it, and put a default there if it was missing" is the most-written Map
 * idiom there is, and writing it by hand means either two lookups or a nullable
 * temporary. `getOrInsert` and `getOrInsertComputed` do it in one call — and,
 * more usefully for a reader, in one *type*: the result is the value type with no
 * `undefined` attached, because the miss case has already been handled.
 *
 * The pair is the interesting part. The eager form takes the default as a value,
 * so the default is built whether or not it is needed; the computed form takes a
 * key-aware factory that runs only on a miss. Neither is atomic — a signature is
 * not a synchronization primitive. Build both, their result types, and what they
 * remove from the caller's code.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The lookup they replace ──────────────────────────────────────────

// 1. Build the ordinary read, whose result admits the absence.
export type PlainGet<Key, Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<ReturnType<PlainGet<string, number>>, number | undefined>>;
type _01b = Expect<Equal<Parameters<PlainGet<string, number>>[0], string>>;
type _01c = Expect<Equal<NonNullable<ReturnType<PlainGet<string, number>>>, number>>;
type _01d = Expect<Equal<Equal<ReturnType<PlainGet<string, number>>, Map<string, number>["get"] extends (key: string) => infer Result ? Result : never>, true>>;

// 2. Build the eager upsert. The default is an argument, so it exists before the
//    lookup does.
export type GetOrInsert<Key, Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<ReturnType<GetOrInsert<string, number>>, number>>;
type _02b = Expect<Equal<Parameters<GetOrInsert<string, number>>, [string, number]>>;
type _02c = Expect<Equal<Extract<ReturnType<GetOrInsert<string, number>>, undefined>, never>>;
type _02d = Expect<Equal<Parameters<GetOrInsert<string, number>>["length"], 2>>;

// 3. Build the lazy upsert. The factory receives the key, which is what makes it
//    worth having over `??=`.
export type GetOrInsertComputed<Key, Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<ReturnType<GetOrInsertComputed<string, number>>, number>>;
type _03b = Expect<Equal<Parameters<GetOrInsertComputed<string, number>>[1], (key: string) => number>>;
type _03c = Expect<
  Equal<Parameters<Parameters<GetOrInsertComputed<string, number>>[1]>[0], string>
>;
type _03d = Expect<Equal<Parameters<GetOrInsertComputed<string, number>>["length"], 2>>;

// 4. Build the difference the two forms make to a caller's result type — which
//    is the whole reason to reach for either.
export type ResultShape<
  Form extends "get" | "getOrInsert" | "getOrInsertComputed",
  Value,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<ResultShape<"get", number>, number | undefined>>;
type _04b = Expect<Equal<ResultShape<"getOrInsert", number>, number>>;
type _04c = Expect<Equal<ResultShape<"getOrInsertComputed", number>, number>>;
type _04d = Expect<
  Equal<Equal<ResultShape<"get", number>, ResultShape<"getOrInsert", number>>, false>
>;

// ─── When the default is built ────────────────────────────────────────

// 5. Build the outcomes a call can have.
export type CallOutcome = TODO; // TODO(koan)

type _05a = Expect<Equal<CallOutcome, "existing" | "insert-default" | "skip-callback" | "compute-insert">>;
type _05b = Expect<Equal<Extract<CallOutcome, `${string}insert`>, "compute-insert">>;
type _05c = Expect<Equal<Extract<CallOutcome, `insert-${string}`>, "insert-default">>;
type _05d = Expect<Equal<Extract<CallOutcome, "throw">, never>>;

// 6. Build what each form does on a hit and on a miss.
export type OutcomeOf<
  Form extends "getOrInsert" | "getOrInsertComputed",
  Present extends boolean,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<OutcomeOf<"getOrInsert", true>, "existing">>;
type _06b = Expect<Equal<OutcomeOf<"getOrInsert", false>, "insert-default">>;
type _06c = Expect<Equal<OutcomeOf<"getOrInsertComputed", true>, "skip-callback">>;
type _06d = Expect<Equal<OutcomeOf<"getOrInsertComputed", false>, "compute-insert">>;

// 7. Build the question that decides which form to reach for: was the default
//    built even though it was not needed?
export type DefaultBuiltUnnecessarily<
  Form extends "getOrInsert" | "getOrInsertComputed",
  Present extends boolean,
> = TODO; // TODO(koan)

type _07a = Expect<Equal<DefaultBuiltUnnecessarily<"getOrInsert", true>, true>>;
type _07b = Expect<Equal<DefaultBuiltUnnecessarily<"getOrInsert", false>, false>>;
type _07c = Expect<Equal<DefaultBuiltUnnecessarily<"getOrInsertComputed", true>, false>>;
type _07d = Expect<Equal<DefaultBuiltUnnecessarily<"getOrInsertComputed", false>, false>>;

// 8. Build the number of times the factory runs, which is the other half of the
//    contract: once on a miss, never on a hit.
export type FactoryCalls<Present extends boolean> = TODO; // TODO(koan)

type _08a = Expect<Equal<FactoryCalls<true>, 0>>;
type _08b = Expect<Equal<FactoryCalls<false>, 1>>;
type _08c = Expect<Equal<FactoryCalls<boolean>, 0 | 1>>;
type _08d = Expect<Equal<Equal<FactoryCalls<true>, FactoryCalls<false>>, false>>;

// ─── The collections that have them ───────────────────────────────────

// 9. Build the collection kinds, since the weak one gets the same pair.
export type CollectionKind = TODO; // TODO(koan)

type _09a = Expect<Equal<CollectionKind, "Map" | "WeakMap">>;
type _09b = Expect<Equal<Exclude<CollectionKind, "Map">, "WeakMap">>;
type _09c = Expect<Equal<Extract<CollectionKind, `Weak${string}`>, "WeakMap">>;
type _09d = Expect<Equal<Extract<CollectionKind, "Set">, never>>;

// 10. Build the key constraint each one imposes. That is where they differ — not
//     in the upsert methods.
export type KeyConstraintFor<Kind extends CollectionKind> = TODO; // TODO(koan)

type _10a = Expect<Equal<KeyConstraintFor<"WeakMap">, WeakKey>>;
type _10b = Expect<Equal<KeyConstraintFor<"Map">, unknown>>;
type _10c = Expect<
  Equal<
    {
      anObjectIsALegalWeakKey: GivenExtends<object, KeyConstraintFor<"WeakMap">>;
      andTheStrongMapConstrainsNothing: KeyConstraintFor<"Map">;
    },
    { anObjectIsALegalWeakKey: true; andTheStrongMapConstrainsNothing: unknown }
  >
>;
type _10d = Expect<Equal<GivenExtends<number, KeyConstraintFor<"WeakMap">>, false>>;

// 11. Build the upsert surface a collection exposes, which is the same pair
//     whichever kind it is.
export type UpsertSurface<Key, Value> = TODO; // TODO(koan)

type _11a = Expect<Equal<keyof UpsertSurface<string, number>, "getOrInsert" | "getOrInsertComputed">>;
type _11b = Expect<Equal<ReturnType<UpsertSurface<string, number>["getOrInsert"]>, number>>;
type _11c = Expect<
  Equal<ReturnType<UpsertSurface<object, number>["getOrInsertComputed"]>, number>
>;
type _11d = Expect<
  Equal<
    Equal<
      UpsertSurface<string, number>["getOrInsert"],
      Map<string, number>["getOrInsert"]
    >,
    true
  >
>;

// ─── What it does not promise ─────────────────────────────────────────

// 12. Build the claims a reader might take from the signature.
export type Claim = TODO; // TODO(koan)

type _12a = Expect<
  Equal<Claim, "theResultIsNotUndefined" | "theFactoryRanAtMostOnce" | "theCallIsAtomic" | "noOtherWriterInterleaved">
>;
type _12b = Expect<Equal<Extract<Claim, `no${string}`>, "noOtherWriterInterleaved">>;
type _12c = Expect<
  Equal<Exclude<Claim, "theCallIsAtomic" | "noOtherWriterInterleaved">, "theResultIsNotUndefined" | "theFactoryRanAtMostOnce">
>;
type _12d = Expect<Equal<Extract<Claim, "theMapIsSorted">, never>>;

// 13. Build which of them the signature actually supports.
export type SupportedBySignature<TheClaim extends Claim> = TODO; // TODO(koan)

type _13a = Expect<Equal<SupportedBySignature<"theResultIsNotUndefined">, true>>;
type _13b = Expect<Equal<SupportedBySignature<"theFactoryRanAtMostOnce">, true>>;
type _13c = Expect<Equal<SupportedBySignature<"theCallIsAtomic">, false>>;
type _13d = Expect<Equal<SupportedBySignature<"noOtherWriterInterleaved">, false>>;
type _13e = Expect<Equal<SupportedBySignature<Claim>, boolean>>;

// 14. Build the hand-written version the pair replaces, so the `undefined` that
//     disappears can be seen going in.
export type ManualUpsert<Key, Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<ReturnType<ManualUpsert<string, number>>, number>>;
type _14b = Expect<Equal<Parameters<ManualUpsert<string, number>>, [string, number]>>;
type _14c = Expect<
  Equal<
    {
      theHandWrittenVersionEndsAtTheSameType: Equal<
        ReturnType<ManualUpsert<string, number>>,
        ReturnType<GetOrInsert<string, number>>
      >;
      whichIsTheValueTypeWithNoAbsence: ReturnType<ManualUpsert<string, number>>;
    },
    { theHandWrittenVersionEndsAtTheSameType: true; whichIsTheValueTypeWithNoAbsence: number }
  >
>;
type _14d = Expect<Equal<Parameters<ManualUpsert<string, number>>["length"], 2>>;

// 15. Build the count of lookups each approach performs, which is the other
//     thing the built-in pair buys.
export type LookupCount<Approach extends "manual" | "upsert"> = TODO; // TODO(koan)

type _15a = Expect<Equal<LookupCount<"manual">, 2>>;
type _15b = Expect<Equal<LookupCount<"upsert">, 1>>;
type _15c = Expect<Equal<LookupCount<"manual" | "upsert">, 2 | 1>>;
type _15d = Expect<Equal<Equal<LookupCount<"manual">, LookupCount<"upsert">>, false>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the eager form on a hit and a miss.
export type EagerProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<EagerProfile["onAHit"], "existing">>;
type _16b = Expect<Equal<EagerProfile["onAMiss"], "insert-default">>;
type _16c = Expect<Equal<EagerProfile["theDefaultWasBuiltAnyway"], true>>;
type _16d = Expect<Equal<EagerProfile["andTheResultIsNeverUndefined"], number>>;

// 17. Report the lazy form against it.
export type LazyProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<LazyProfile["onAHit"], "skip-callback">>;
type _17b = Expect<Equal<LazyProfile["onAMiss"], "compute-insert">>;
type _17c = Expect<Equal<LazyProfile["factoryCallsOnAHit"], 0>>;
type _17d = Expect<Equal<LazyProfile["factoryCallsOnAMiss"], 1>>;
type _17e = Expect<Equal<LazyProfile["andNothingWasBuiltNeedlessly"], false>>;

// 18. Report one call at a glance: what it returns, what happened, how much work
//     it did, and what the signature still does not promise.
export type UpsertReport<
  Form extends "getOrInsert" | "getOrInsertComputed",
  Present extends boolean,
  Value,
> = TODO; // TODO(koan)

type _18a = Expect<Equal<UpsertReport<"getOrInsert", false, number>["result"], number>>;
type _18b = Expect<Equal<UpsertReport<"getOrInsert", false, number>["outcome"], "insert-default">>;
type _18c = Expect<Equal<UpsertReport<"getOrInsert", true, number>["wastedWork"], true>>;
type _18d = Expect<Equal<UpsertReport<"getOrInsertComputed", true, number>["wastedWork"], false>>;
type _18e = Expect<Equal<UpsertReport<"getOrInsert", true, number>["atomic"], false>>;
