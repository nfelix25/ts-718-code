import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-148: accumulating builders — constructions
 * =============================================================================
 *
 * A fluent builder can carry a type-level ledger of everything it has been told.
 * The runtime object collects values; the generic parameter collects evidence —
 * which keys exist and what each one holds — and every step returns the same
 * abstraction at a new state. Once the ledger exists, readiness stops being a
 * runtime check: a required key set either is or is not a subset of `keyof
 * State`, and an API can simply refuse to accept a builder that is not there
 * yet.
 *
 * The ledger is an over-approximation in one important way. A key whose type is
 * a union writes *one* of those keys at runtime but records all of them, and a
 * key typed `string` records an index signature rather than the single property
 * that was actually set. Both are visible in the profiles below. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// A symbol key, so the ledger can be pointed at every kind of property key.
declare const TOKEN: unique symbol;

// ─── The ledger ───────────────────────────────────────────────────────

// 1. Build the single-step transition: the old mapping with one key written.
//    The mapped type walks the union of the old keys and the new one, and the
//    new key wins wherever they overlap.
export type SetField<State extends object, Key extends PropertyKey, Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<SetField<Record<never, never>, "enabled", true>, { enabled: true }>>;
type _01b = Expect<Equal<SetField<{ x: 1; y: 2 }, "x", 3>, { x: 3; y: 2 }>>;
type _01c = Expect<Equal<SetField<SetField<Record<never, never>, "x", 1>, "x", 2>, { x: 2 }>>;
type _01d = Expect<Equal<keyof SetField<{ x: 1 }, "y", 2>, "x" | "y">>;
type _01e = Expect<Equal<SetField<Record<never, never>, never, 1>, Record<never, never>>>;

// 2. Build the builder itself as the shape its calls expose. Each write returns
//    the same abstraction at the transitioned state, which is what makes the
//    ledger accumulate rather than reset.
export type Builder<State extends object = {}> = TODO; // TODO(koan)

type _02a = Expect<Equal<keyof Builder<{ x: 1 }>, "set" | "get" | "build">>;
type _02b = Expect<Equal<ReturnType<Builder<{ x: 1 }>["build"]>, Readonly<{ x: 1 }>>>;
type _02c = Expect<Equal<ReturnType<Builder<{ x: 1 }>["get"]>, 1>>;
type _02d = Expect<Equal<Parameters<Builder<{ x: 1 }>["get"]>[0], "x">>;
type _02e = Expect<Equal<Parameters<Builder<{ x: 1 }>["set"]>["length"], 2>>;

// 3. Build the reader that recovers the ledger from a builder, and answers with
//    nothing for anything that never carried one.
export type StateOf<Value> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    { recovered: StateOf<Builder<{ x: 1 }>>; incompleteIsNotReady: HasKeys<{ a: 1 }, "a" | "b"> },
    { recovered: { x: 1 }; incompleteIsNotReady: false }
  >
>;
type _03b = Expect<Equal<StateOf<unknown>, never>>;
type _03c = Expect<Equal<StateOf<never>, never>>;
type _03d = Expect<
  Equal<
    {
      anyLedgerStaysAny: GivenIsAny<StateOf<Builder<any>>>;
      ordinaryLedgerIsNot: GivenIsAny<StateOf<Builder<{ x: 1 }>>>;
    },
    { anyLedgerStaysAny: true; ordinaryLedgerIsNot: false }
  >
>;

// 4. Build the readiness predicate. It is a subset test and nothing more: the
//    required keys must all already be in the ledger.
export type HasKeys<State extends object, Keys extends PropertyKey> = TODO; // TODO(koan)

type _04a = Expect<Equal<HasKeys<{ method: "GET"; url: "/koans" }, "method" | "url">, true>>;
type _04b = Expect<Equal<HasKeys<{ method: "GET" }, "method" | "url">, false>>;
type _04c = Expect<Equal<HasKeys<{ method: "GET" }, "method">, true>>;
type _04d = Expect<Equal<HasKeys<Record<never, never>, never>, true>>;
type _04e = Expect<Equal<HasKeys<{ method: "GET"; extra: 1 }, "method">, true>>;

// 5. Build the gate: a builder when the ledger is complete, and nothing at all
//    when it is not, so an unfinished builder has no type to pass along.
export type CompleteBuilder<State extends object, Keys extends PropertyKey> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    {
      gated: CompleteBuilder<{ method: "GET"; url: "/x" }, "method" | "url">;
      incompleteIsNotReady: HasKeys<{ a: 1 }, "a" | "b">;
    },
    { gated: Builder<{ method: "GET"; url: "/x" }>; incompleteIsNotReady: false }
  >
>;
type _05b = Expect<Equal<CompleteBuilder<{ method: "GET" }, "method" | "url">, never>>;
type _05c = Expect<
  Equal<
    { gated: CompleteBuilder<{ x: 1 }, never>; incompleteIsNotReady: HasKeys<{ a: 1 }, "a" | "b"> },
    { gated: Builder<{ x: 1 }>; incompleteIsNotReady: false }
  >
>;
type _05d = Expect<Equal<CompleteBuilder<Record<never, never>, "method">, never>>;

// 6. Build the complement of the readiness test — the keys still owed, which is
//    what an error message would want to say.
export type MissingKeys<State extends object, Keys extends PropertyKey> = TODO; // TODO(koan)

type _06a = Expect<Equal<MissingKeys<{ method: "GET" }, "method" | "url">, "url">>;
type _06b = Expect<Equal<MissingKeys<{ method: "GET"; url: "/x" }, "method" | "url">, never>>;
type _06c = Expect<Equal<MissingKeys<Record<never, never>, "method" | "url">, "method" | "url">>;
type _06d = Expect<Equal<MissingKeys<{ extra: 1 }, "method">, "method">>;

// 7. Build the fold that runs a whole sequence of writes, so a chain of calls
//    can be described by the list of steps rather than by nesting.
export type Accumulate<
  Steps extends readonly (readonly [PropertyKey, unknown])[],
  State extends object = {},
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<Accumulate<[["method", "GET"], ["url", "/koans"]]>, { method: "GET"; url: "/koans" }>
>;
type _07b = Expect<Equal<Accumulate<[]>, Record<never, never>>>;
type _07c = Expect<Equal<Accumulate<[["x", 1], ["x", 2]]>, { x: 2 }>>;
type _07d = Expect<Equal<keyof Accumulate<[["a", 1], ["b", 2], ["c", 3]]>, "a" | "b" | "c">>;
type _07e = Expect<Equal<Accumulate<[["retries", 3]], { method: "GET" }>, { method: "GET"; retries: 3 }>>;

// 8. Build the report a build step would print: whether the ledger is ready,
//    what is still owed, and what it has beyond what was asked for.
export type ReadyReport<State extends object, Keys extends PropertyKey> = TODO; // TODO(koan)

type _08a = Expect<Equal<ReadyReport<{ method: "GET" }, "method" | "url">["ready"], false>>;
type _08b = Expect<Equal<ReadyReport<{ method: "GET" }, "method" | "url">["missing"], "url">>;
type _08c = Expect<Equal<ReadyReport<{ method: "GET"; url: "/x"; trace: true }, "method" | "url">["ready"], true>>;
type _08d = Expect<Equal<ReadyReport<{ method: "GET"; url: "/x"; trace: true }, "method" | "url">["extra"], "trace">>;
type _08e = Expect<Equal<ReadyReport<Record<never, never>, never>["ready"], true>>;

// ─── What the ledger records ──────────────────────────────────────────

// 9. Report overwriting. Writing a key that is already there replaces its
//    remembered type and leaves the key set alone.
export type OverwriteProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<OverwriteProfile["before"], "GET">>;
type _09b = Expect<Equal<OverwriteProfile["after"], "POST">>;
type _09c = Expect<Equal<OverwriteProfile["keysUnchanged"], "method">>;
type _09d = Expect<Equal<OverwriteProfile["otherKeysSurvive"], 3>>;
type _09e = Expect<Equal<OverwriteProfile["undefinedIsAValueLikeAnyOther"], undefined>>;

// 10. Report the over-approximation. A union key records every member even
//     though exactly one of them is written, so the ledger claims more than the
//     run did — and the readiness test believes it.
export type UnionKeyProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<UnionKeyProfile["recorded"], { a: 1; b: 1 }>>;
type _10b = Expect<Equal<UnionKeyProfile["keysRecorded"], "a" | "b">>;
type _10c = Expect<Equal<UnionKeyProfile["atFirstMember"], 1>>;
type _10d = Expect<Equal<UnionKeyProfile["claimsBothWereWritten"], true>>;
type _10e = Expect<Equal<UnionKeyProfile["overwritesBothAtOnce"], { a: 1; b: 1 }>>;

// 11. Report the broad-key case, which loses the property entirely and records
//     an index signature in its place.
export type BroadKeyProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<BroadKeyProfile["recorded"], { [key: string]: true }>>;
type _11b = Expect<Equal<BroadKeyProfile["keysRecorded"], string>>;
type _11c = Expect<Equal<BroadKeyProfile["anyStringReads"], true>>;
type _11d = Expect<Equal<BroadKeyProfile["namedKeyIsNoLongerRequired"], true>>;

// 12. Report the other kinds of property key, which the ledger handles without
//     any special casing.
export type KeyKindProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<KeyKindProfile["numeric"], { 0: "zero" }>>;
type _12b = Expect<Equal<KeyKindProfile["numericKeys"], 0>>;
type _12c = Expect<Equal<KeyKindProfile["symbolKeyed"], { [TOKEN]: 1 }>>;
type _12d = Expect<Equal<KeyKindProfile["symbolValue"], 1>>;

// 13. Report the modifiers. The transition is not a homomorphic mapped type — it
//     maps over a computed key union — so `readonly` and `?` are not carried
//     across, and every remembered property comes out required and writable.
export type ModifierProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ModifierProfile["fromReadonly"], { x: 2 }>>;
type _13b = Expect<Equal<ModifierProfile["fromOptional"], { x: 2 }>>;
type _13c = Expect<Equal<ModifierProfile["untouchedReadonlyKey"], { x: 1; y: 2 }>>;
type _13d = Expect<Equal<ModifierProfile["snapshotAddsThemBack"], { readonly x: 2 }>>;

// 14. Report the special types at the edges of the ledger.
export type SpecialTypeProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<SpecialTypeProfile["fromNothing"], never>>;
type _14b = Expect<Equal<SpecialTypeProfile["fromBottom"], never>>;
type _14c = Expect<Equal<SpecialTypeProfile["anyLedgerIsStillAny"], true>>;
type _14d = Expect<Equal<SpecialTypeProfile["emptyRequirementIsAlwaysMet"], true>>;
type _14e = Expect<Equal<SpecialTypeProfile["gateWithNoRequirement"], true>>;

// 15. Report the snapshot. It is one level deep: the top-level properties become
//     readonly and everything nested stays exactly as it was recorded.
export type SnapshotProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<SnapshotProfile["snapshot"], { readonly method: "GET" }>>;
type _15b = Expect<Equal<SnapshotProfile["snapshotKeys"], "method" | "url">>;
type _15c = Expect<Equal<SnapshotProfile["nestedIsUntouched"], { retries: number }>>;
type _15d = Expect<Equal<SnapshotProfile["emptySnapshot"], Record<never, never>>>;

// ─── Using the ledger ─────────────────────────────────────────────────

// 16. Build the API. The starting point carries an empty ledger, and the
//     consumer states its requirement as a constraint on the state rather than
//     as a runtime check.
export type BuilderApi = TODO; // TODO(koan)

type _16a = Expect<Equal<StateOf<ReturnType<BuilderApi["createBuilder"]>>, Record<never, never>>>;
type _16b = Expect<Equal<keyof StateOf<ReturnType<BuilderApi["createBuilder"]>>, never>>;
type _16c = Expect<
  Equal<ReturnType<BuilderApi["executeRequest"]>, Readonly<{ method: string; url: string }>>
>;
type _16d = Expect<
  Equal<
    {
      readyBuilderIsAccepted: GivenExtends<
        Builder<{ method: "GET"; url: "/x" }>,
        Parameters<BuilderApi["executeRequest"]>[0]
      >;
      unreadyBuilderIsNot: GivenExtends<
        Builder<{ method: "GET" }>,
        Parameters<BuilderApi["executeRequest"]>[0]
      >;
    },
    { readyBuilderIsAccepted: true; unreadyBuilderIsNot: false }
  >
>;

// 17. Report reading back out. `get` is keyed by the ledger, so only recorded
//     keys can be asked for and each one answers with the type it remembers.
export type AccessProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<AccessProfile["askable"], "method" | "retries">>;
type _17b = Expect<Equal<AccessProfile["answered"], "GET">>;
type _17c = Expect<Equal<AccessProfile["answeredUnion"], "GET" | 3>>;
type _17d = Expect<Equal<AccessProfile["nothingToAskOnAnEmptyLedger"], never>>;

// 18. Report a whole flow: fold the steps, check readiness, take the gate, and
//     read the snapshot the finished builder would hand back.
export type RequestFlow<Steps extends readonly (readonly [PropertyKey, unknown])[]> = TODO; // TODO(koan)

type _18a = Expect<Equal<RequestFlow<[["method", "GET"]]>["ready"], false>>;
type _18b = Expect<Equal<RequestFlow<[["method", "GET"]]>["missing"], "url">>;
type _18c = Expect<Equal<RequestFlow<[["method", "GET"]]>["gated"], never>>;
type _18d = Expect<Equal<RequestFlow<[["method", "GET"], ["url", "/koans"]]>["ready"], true>>;
type _18e = Expect<
  Equal<
    RequestFlow<[["method", "GET"], ["url", "/koans"]]>["snapshot"],
    { readonly method: "GET"; readonly url: "/koans" }
  >
>;
