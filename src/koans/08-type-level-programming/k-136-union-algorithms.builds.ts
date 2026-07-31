import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-136: union algorithms — constructions
 * =============================================================================
 *
 * A conditional maps over a union's members but never hands you the union as a
 * collection. These constructions get at it sideways, through variance: put each
 * member in a *parameter* position and the compiler must find one type acceptable
 * to all of them, which is their intersection. Put each in a *return* position
 * instead and the same trick surfaces exactly one member, which recursion can
 * remove until nothing is left — producing a tuple. Two cautions run through all
 * of it. Normalisation happens first, so members that collapse were never there
 * to count. And the member the compiler surfaces is an implementation detail:
 * membership and cardinality are stable, order is not. Replace each `TODO` with a
 * type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenVariant =
  | { kind: "text"; value: string }
  | { kind: "count"; count: number };

// ─── Turning a union inside out ───────────────────────────────────────

// 1. Build the union-to-intersection conversion. Distribute each member into a
//    function parameter, then infer the single parameter type that all of those
//    functions would accept.
//    `UnionToIntersectionOf<{ a: 1 } | { b: 2 }>` is `{ a: 1 } & { b: 2 }`.
//    Hint: parameters are contravariant, which is exactly why this works.
export type UnionToIntersectionOf<Union> = TODO; // TODO(koan)

type _01a = Expect<Equal<UnionToIntersectionOf<{ a: 1 } | { b: 2 }>, { a: 1 } & { b: 2 }>>;
type _01b = Expect<Equal<UnionToIntersectionOf<string | number>, string & number>>;
type _01c = Expect<Equal<UnionToIntersectionOf<"x">, "x">>;
type _01d = Expect<Equal<UnionToIntersectionOf<unknown>, unknown>>;
type _01e = Expect<
  Equal<
    {
      anyStaysAny: GivenIsAny<UnionToIntersectionOf<any>>;
      primitives: UnionToIntersectionOf<string | number>;
    },
    { anyStaysAny: true; primitives: string & number }
  >
>;

// 2. Build the single-member extractor. The same trick with the member in a
//    return position instead surfaces one member rather than merging them.
//    Treat the choice of member as unspecified — only its being *a* member is.
export type LastOfUnion<Union> = TODO; // TODO(koan)

type _02a = Expect<Equal<LastOfUnion<42>, 42>>;
type _02b = Expect<Equal<LastOfUnion<"only">, "only">>;
type _02c = Expect<Equal<LastOfUnion<never>, never>>;
type _02d = Expect<
  Equal<
    { anyStaysAny: GivenIsAny<LastOfUnion<any>>; singleton: LastOfUnion<42> },
    { anyStaysAny: true; singleton: 42 }
  >
>;
type _02e = Expect<
  Equal<Exclude<"a" | "b", LastOfUnion<"a" | "b">> extends never ? false : true, true>
>;

// 3. Build the tuple materialisation: peel off one member at a time until the
//    union is empty.
export type UnionToTupleOf<Union, Last = LastOfUnion<Union>> = TODO; // TODO(koan)

type _03a = Expect<Equal<UnionToTupleOf<never>, []>>;
type _03b = Expect<Equal<UnionToTupleOf<"a" | "b">[number], "a" | "b">>;
type _03c = Expect<Equal<UnionToTupleOf<"a" | "b" | "c">["length"], 3>>;
type _03d = Expect<Equal<UnionToTupleOf<1 | 2 | 3>[number], 1 | 2 | 3>>;
type _03e = Expect<
  Equal<UnionToTupleOf<{ a: 1 } | { b: 2 }>[number], { a: 1 } | { b: 2 }>
>;

// 4. Build the cardinality reader, which is the tuple's length.
export type UnionSizeOf<Union> = TODO; // TODO(koan)

type _04a = Expect<Equal<UnionSizeOf<"a" | "b" | "c">, 3>>;
type _04b = Expect<Equal<UnionSizeOf<never>, 0>>;
type _04c = Expect<Equal<UnionSizeOf<"only">, 1>>;
type _04d = Expect<Equal<UnionSizeOf<1 | 2 | 3 | 4 | 5>, 5>>;
type _04e = Expect<Equal<UnionSizeOf<boolean>, 2>>;

// 5. Build the union predicate, which compares each distributed member against
//    the untouched original.
export type IsUnionOf<Union, Whole = Union> = TODO; // TODO(koan)

type _05a = Expect<Equal<IsUnionOf<string | number>, true>>;
type _05b = Expect<Equal<IsUnionOf<string>, false>>;
type _05c = Expect<Equal<IsUnionOf<never>, false>>;
type _05d = Expect<Equal<IsUnionOf<boolean>, true>>;
type _05e = Expect<Equal<IsUnionOf<any>, false>>;

// ─── What normalisation already removed ───────────────────────────────

// 6. Report members disappearing before any algorithm runs, because a union
//    normalises the moment it is written.
export type NormalizationProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<NormalizationProfile["duplicates"], 2>>;
type _06b = Expect<Equal<NormalizationProfile["absorbedLiteral"], 1>>;
type _06c = Expect<Equal<NormalizationProfile["absorbedNumber"], 1>>;
type _06d = Expect<Equal<NormalizationProfile["absorbedByTop"], 1>>;
type _06e = Expect<Equal<NormalizationProfile["absorbedBottom"], 1>>;

// 7. Report the predicate agreeing with normalisation, including a boolean that
//    really is two literal members underneath.
export type UnionIdentityProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<UnionIdentityProfile["collapsedLiteral"], false>>;
type _07b = Expect<Equal<UnionIdentityProfile["booleanIsAUnion"], true>>;
type _07c = Expect<Equal<UnionIdentityProfile["explicitBoolean"], true>>;
type _07d = Expect<Equal<UnionIdentityProfile["booleanMembers"], boolean>>;
type _07e = Expect<Equal<UnionIdentityProfile["topIsNotAUnion"], false>>;

// ─── Stable answers and unstable ones ─────────────────────────────────

// 8. Report the properties that are safe to depend on — membership and size —
//    rather than the position any member happens to land in.
export type StablePropertyProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<StablePropertyProfile["membership"], "a" | "b" | "c">>;
type _08b = Expect<Equal<StablePropertyProfile["size"], 3>>;
type _08c = Expect<Equal<StablePropertyProfile["emptyTuple"], []>>;
type _08d = Expect<Equal<StablePropertyProfile["emptyMembership"], never>>;
type _08e = Expect<Equal<StablePropertyProfile["singletonSurfaced"], "only">>;

// 9. Report the top and bottom types, where each algorithm has a different and
//    slightly surprising identity.
export type ExtremeUnionProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ExtremeUnionProfile["intersectionOfBottom"], unknown>>;
type _09b = Expect<Equal<ExtremeUnionProfile["intersectionOfTop"], unknown>>;
type _09c = Expect<Equal<ExtremeUnionProfile["surfacedFromBottom"], never>>;
type _09d = Expect<Equal<ExtremeUnionProfile["anyIsNotAUnion"], false>>;
type _09e = Expect<Equal<ExtremeUnionProfile["anyIntersection"], true>>;

// 10. Report the intersections produced from unrelated members, which are
//     perfectly well-formed types with no inhabitants.
export type EmptyIntersectionProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<EmptyIntersectionProfile["primitives"], string & number>>;
type _10b = Expect<Equal<EmptyIntersectionProfile["conflictingProperty"], never>>;
type _10c = Expect<
  Equal<EmptyIntersectionProfile["compatibleObjects"], { a: 1 } & { b: 2 }>
>;
type _10d = Expect<Equal<EmptyIntersectionProfile["singleMember"], "x">>;
type _10e = Expect<Equal<EmptyIntersectionProfile["objectKeys"], "a" | "b">>;

// ─── Querying a union of objects ──────────────────────────────────────

// 11. Build the distributed key reader, which sees every branch's keys rather
//     than only the shared ones.
export type KeysOfUnionOf<Union> = TODO; // TODO(koan)

type _11a = Expect<Equal<KeysOfUnionOf<{ a: 1 } | { b: 2 }>, "a" | "b">>;
type _11b = Expect<Equal<KeysOfUnionOf<GivenVariant>, "kind" | "value" | "count">>;
type _11c = Expect<Equal<KeysOfUnionOf<{ a: 1; b: 2 }>, "a" | "b">>;
type _11d = Expect<Equal<KeysOfUnionOf<never>, never>>;
type _11e = Expect<Equal<KeysOfUnionOf<any>, string | number | symbol>>;

// 12. Build the distributed value reader, which collects a key's type from every
//     branch that actually has it.
export type ValueAtOf<Union, Key extends PropertyKey> = TODO; // TODO(koan)

type _12a = Expect<Equal<ValueAtOf<GivenVariant, "value">, string>>;
type _12b = Expect<Equal<ValueAtOf<{ a: 1 } | { b: 2 }, "a">, 1>>;
type _12c = Expect<Equal<ValueAtOf<{ a: 1 } | { a: 2 }, "a">, 1 | 2>>;
type _12d = Expect<Equal<ValueAtOf<{ a: 1 } | { b: 2 }, "missing">, never>>;
type _12e = Expect<
  Equal<
    {
      anyStaysAny: GivenIsAny<ValueAtOf<any, "x">>;
      distributed: ValueAtOf<{ a: 1 } | { a: 2 }, "a">;
    },
    { anyStaysAny: true; distributed: 1 | 2 }
  >
>;

// 13. Build the flattening merge, which turns a union of object branches into one
//     object carrying every key.
export type MergeUnionOf<Union> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    MergeUnionOf<GivenVariant>,
    { kind: "text" | "count"; value: string; count: number }
  >
>;
type _13b = Expect<Equal<MergeUnionOf<{ a: 1 } | { b: 2 }>, { a: 1; b: 2 }>>;
type _13c = Expect<Equal<MergeUnionOf<{ a: 1 }>, { a: 1 }>>;
type _13d = Expect<Equal<MergeUnionOf<{ a: 1 } | { a: 2 }>, { a: 1 | 2 }>>;
type _13e = Expect<Equal<keyof MergeUnionOf<GivenVariant>, "kind" | "value" | "count">>;

// 14. Report the distributed queries against the plain ones, which see only what
//     every branch agrees on.
export type DistributedVersusPlainProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<DistributedVersusPlainProfile["plainKeys"], "kind">>;
type _14b = Expect<
  Equal<DistributedVersusPlainProfile["distributedKeys"], "kind" | "value" | "count">
>;
type _14c = Expect<Equal<DistributedVersusPlainProfile["plainDisjointKeys"], never>>;
type _14d = Expect<
  Equal<DistributedVersusPlainProfile["distributedDisjointKeys"], "a" | "b">
>;
type _14e = Expect<Equal<DistributedVersusPlainProfile["mergedIsNotTheUnion"], false>>;

// ─── Surfaces built on the algorithms ─────────────────────────────────

// 15. Build the membership test, which is one distributed comparison rather than
//     anything needing the tuple.
export type IsMemberOf<Candidate, Union> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    { present: IsMemberOf<"a", "a" | "b">; absent: IsMemberOf<"c", "a" | "b"> },
    { present: true; absent: false }
  >
>;
type _15b = Expect<
  Equal<
    { wholeUnion: IsMemberOf<"a" | "b", "a" | "b">; partial: IsMemberOf<"a" | "c", "a" | "b"> },
    { wholeUnion: true; partial: false }
  >
>;
type _15c = Expect<
  Equal<
    { empty: IsMemberOf<never, "a">; intoEmpty: IsMemberOf<"a", never> },
    { empty: false; intoEmpty: false }
  >
>;
type _15d = Expect<
  Equal<
    { literalIntoBase: IsMemberOf<"a", string>; baseIntoLiteral: IsMemberOf<string, "a"> },
    { literalIntoBase: true; baseIntoLiteral: false }
  >
>;
type _15e = Expect<
  Equal<
    { objectBranch: IsMemberOf<{ a: 1 }, { a: 1 } | { b: 2 }>; size: UnionSizeOf<"a" | "b"> },
    { objectBranch: true; size: 2 }
  >
>;

// 16. Build the singleton test, which is the complement of the union predicate
//     once the empty domain has been ruled out.
export type IsSingleMemberOf<Union> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    { single: IsSingleMemberOf<"a">; multiple: IsSingleMemberOf<"a" | "b"> },
    { single: true; multiple: false }
  >
>;
type _16b = Expect<
  Equal<
    { empty: IsSingleMemberOf<never>; booleans: IsSingleMemberOf<boolean> },
    { empty: false; booleans: false }
  >
>;
type _16c = Expect<
  Equal<
    { collapsed: IsSingleMemberOf<"a" | string>; primitive: IsSingleMemberOf<string> },
    { collapsed: true; primitive: true }
  >
>;
type _16d = Expect<
  Equal<
    { top: IsSingleMemberOf<unknown>; anyValue: IsSingleMemberOf<any> },
    { top: true; anyValue: true }
  >
>;
type _16e = Expect<
  Equal<
    { objects: IsSingleMemberOf<{ a: 1 } | { b: 2 }>; sizeAgrees: UnionSizeOf<{ a: 1 } | { b: 2 }> },
    { objects: false; sizeAgrees: 2 }
  >
>;

// 17. Build the three signatures the packet exports. Note that the runtime forms
//     deduplicate values, which is the value-level echo of the normalisation the
//     type level performed before any of these algorithms ran.
export type UnionRuntimeApi = TODO; // TODO(koan)

type _17a = Expect<
  Equal<UnionRuntimeApi["uniqueValues"], <Value>(values: readonly Value[]) => Value[]>
>;
type _17b = Expect<
  Equal<UnionRuntimeApi["countUnique"], (values: readonly unknown[]) => number>
>;
type _17c = Expect<
  Equal<
    UnionRuntimeApi["mergeMembers"],
    <const Members extends readonly object[]>(members: Members) => object
  >
>;
type _17d = Expect<Equal<ReturnType<UnionRuntimeApi["countUnique"]>, number>>;
type _17e = Expect<
  Equal<
    {
      runtimeCount: ReturnType<UnionRuntimeApi["countUnique"]>;
      typeCount: UnionSizeOf<1 | 1 | 2>;
    },
    { runtimeCount: number; typeCount: 2 }
  >
>;
