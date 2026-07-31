import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-115: recursion over unions — constructions
 * =============================================================================
 *
 * Distribution is not something that happens once at the top. Every recursive
 * call receives a fresh type argument, so a union found inside an array element
 * or a property distributes again the moment that call begins with a naked type
 * parameter. These constructions build the same traversal three ways to make the
 * consequences visible: a distributive reading that visits each constituent
 * separately, a tuple-wrapped reading that asks whether the whole union fits one
 * branch, and a shape-preserving reading that keeps each constituent intact.
 * The distributive reading reaches every leaf but flattens away which value went
 * with which branch; the whole-union reading keeps branches together but can only
 * see the keys they share. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenVariant =
  | { kind: "text"; payload: { value: string } }
  | { kind: "count"; payload: { value: number; unit?: "ms" | "s" } };

type GivenEvent = { kind: "count"; value: number } | { kind: "label"; value: string };

// ─── Three readings of one traversal ──────────────────────────────────

// 1. Build the atomic domain that stops every one of these traversals.
export type UnionAtomic = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<UnionAtomic, Date | RegExp>, Date | RegExp>>;
type _01b = Expect<Equal<Extract<UnionAtomic, bigint | symbol>, bigint | symbol>>;
type _01c = Expect<
  Equal<
    {
      extracted: Extract<UnionAtomic, boolean>;
      accepts: (() => void) extends UnionAtomic ? true : false;
    },
    { extracted: boolean; accepts: true }
  >
>;
type _01d = Expect<
  Equal<
    {
      extracted: Extract<UnionAtomic, null | undefined>;
      accepts: { id: 1 } extends UnionAtomic ? true : false;
    },
    { extracted: null | undefined; accepts: false }
  >
>;
type _01e = Expect<
  Equal<
    {
      extracted: Extract<UnionAtomic, number>;
      accepts: readonly number[] extends UnionAtomic ? true : false;
    },
    { extracted: number; accepts: false }
  >
>;

// 2. Build the distributive leaf collector: for each constituent, stop at an
//    atomic value, unwrap array elements, and otherwise union the leaves of
//    every declared property.
//    `{ a: 1 } | { b: 2 }` yields `1 | 2`.
//    Hint: the naked `Value extends ...` tests are what make each recursive call
//    start distribution over again.
export type DeepLeavesOf<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<DeepLeavesOf<string | number>, string | number>>;
type _02b = Expect<Equal<DeepLeavesOf<{ value: string | number }>, string | number>>;
type _02c = Expect<Equal<DeepLeavesOf<{ a: 1 } | { b: 2 }>, 1 | 2>>;
type _02d = Expect<Equal<DeepLeavesOf<{}>, never>>;
type _02e = Expect<
  Equal<
    {
      anyStaysAny: GivenIsAny<DeepLeavesOf<any>>;
      nestedUnion: DeepLeavesOf<{ a: { x: 1 } } | { b: { y: 2 } }>;
    },
    { anyStaysAny: true; nestedUnion: 1 | 2 }
  >
>;

// 3. Build the non-distributive counterpart, which asks whether the complete
//    union satisfies one branch instead of testing each constituent.
//    `{ a: 1 } | { b: 2 }` yields `never`, because those branches share no keys.
//    Hint: wrapping both sides of every test in a one-element tuple suppresses
//    distribution without changing what the test means.
export type WholeDeepLeavesOf<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<WholeDeepLeavesOf<string | number>, string | number>>;
type _03b = Expect<Equal<WholeDeepLeavesOf<string | { id: number }>, string | { id: number }>>;
type _03c = Expect<Equal<WholeDeepLeavesOf<{ a: 1 } | { b: 2 }>, never>>;
type _03d = Expect<
  Equal<WholeDeepLeavesOf<{ common: 0; a: 1 } | { common: 0; b: 2 }>, 0>
>;
type _03e = Expect<Equal<WholeDeepLeavesOf<{ value: 1 }>, 1>>;

// 4. Build the shape-preserving reading, which wraps each atomic leaf in a box
//    while keeping the surrounding object and tuple structure.
//    `{ a: 1 } | { b: "x" }` yields `{ a: { value: 1 } } | { b: { value: "x" } }`.
export type DeepBoxOf<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<DeepBoxOf<1 | "x">, { value: 1 } | { value: "x" }>>;
type _04b = Expect<
  Equal<DeepBoxOf<{ value: 1 | "x" }>, { value: { value: 1 } | { value: "x" } }>
>;
type _04c = Expect<
  Equal<DeepBoxOf<{ a: 1 } | { b: "x" }>, { a: { value: 1 } } | { b: { value: "x" } }>
>;
type _04d = Expect<
  Equal<
    DeepBoxOf<readonly [1 | 2, { ok: true | false }]>,
    readonly [{ value: 1 } | { value: 2 }, { ok: { value: true } | { value: false } }]
  >
>;
type _04e = Expect<Equal<DeepBoxOf<{ value: never }>, { value: never }>>;

// ─── A naked parameter visits each constituent ────────────────────────

// 5. Report unions being visited constituent by constituent, including unions
//    discovered only after descending into a container.
export type NakedParameterProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<NakedParameterProfile["topLevel"], string | number>>;
type _05b = Expect<Equal<NakedParameterProfile["insideProperty"], string | number>>;
type _05c = Expect<Equal<NakedParameterProfile["insideArray"], string | number>>;
type _05d = Expect<Equal<NakedParameterProfile["insideTuple"], 1 | "x" | true>>;
type _05e = Expect<
  Equal<NakedParameterProfile["insideTupleUnion"], "id" | number | "name" | string>
>;

// 6. Report object unions distributing before `keyof` ever observes a branch.
export type ObjectUnionProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<ObjectUnionProfile["disjoint"], 1 | 2>>;
type _06b = Expect<Equal<ObjectUnionProfile["nested"], 1 | 2>>;
type _06c = Expect<Equal<ObjectUnionProfile["shared"], 0 | 1 | 2>>;
type _06d = Expect<
  Equal<ObjectUnionProfile["variant"], "text" | string | "count" | number | "ms" | "s">
>;
type _06e = Expect<
  Equal<ObjectUnionProfile["variantNested"], "text" | string | "count" | number | "ms" | "s">
>;

// ─── Blocking distribution changes what can be seen ───────────────────

// 7. Report the whole-union reading, which can only reach keys every branch has.
export type NonDistributiveProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<NonDistributiveProfile["disjoint"], never>>;
type _07b = Expect<Equal<NonDistributiveProfile["shared"], 0>>;
type _07c = Expect<Equal<NonDistributiveProfile["mixedKinds"], string | { id: number }>>;
type _07d = Expect<Equal<NonDistributiveProfile["nullable"], {} | null>>;
type _07e = Expect<Equal<NonDistributiveProfile["intersected"], 0>>;

// 8. Report the bare `keyof` behaviour that explains the previous profile.
export type KeyofUnionProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<KeyofUnionProfile["disjointKeys"], never>>;
type _08b = Expect<Equal<KeyofUnionProfile["sharedKeys"], "common">>;
type _08c = Expect<Equal<KeyofUnionProfile["singleKeys"], "a" | "b">>;
type _08d = Expect<Equal<KeyofUnionProfile["distributedDisjoint"], 1 | 2>>;
type _08e = Expect<Equal<KeyofUnionProfile["distributedShared"], 0 | 1 | 2>>;

// 9. Report an intersection over a union, which distributes into two complete
//    branches before either reading begins.
export type IntersectionProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<IntersectionProfile["distributed"], 1 | 0 | 2>>;
type _09b = Expect<Equal<IntersectionProfile["whole"], 0>>;
type _09c = Expect<Equal<IntersectionProfile["keys"], "root">>;
type _09d = Expect<
  Equal<
    IntersectionProfile["boxed"],
    | { a: { value: 1 }; root: { value: 0 } }
    | { b: { value: 2 }; root: { value: 0 } }
  >
>;
type _09e = Expect<Equal<IntersectionProfile["plainIntersection"], 1 | 2>>;

// ─── What flattening costs ────────────────────────────────────────────

// 10. Report the correlation that a flattened leaf union throws away: nothing in
//     the result records that `"count"` belonged with `number`.
export type CorrelationLossProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<CorrelationLossProfile["leaves"], "count" | number | "label" | string>
>;
type _10b = Expect<
  Equal<CorrelationLossProfile["strings"], "count" | "label" | string>
>;
type _10c = Expect<Equal<CorrelationLossProfile["numbers"], number>>;
type _10d = Expect<
  Equal<CorrelationLossProfile["wholeReading"], "count" | number | "label" | string>
>;
type _10e = Expect<Equal<CorrelationLossProfile["keys"], "kind" | "value">>;

// 11. Report the shape-preserving reading keeping each branch's correlation.
export type ShapePreservationProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ShapePreservationProfile["boxed"],
    | { kind: { value: "count" }; value: { value: number } }
    | { kind: { value: "label" }; value: { value: string } }
  >
>;
type _11b = Expect<
  Equal<ShapePreservationProfile["tag"], { value: "count" } | { value: "label" }>
>;
type _11c = Expect<
  Equal<ShapePreservationProfile["payload"], { value: number } | { value: string }>
>;
type _11d = Expect<Equal<ShapePreservationProfile["keys"], "kind" | "value">>;
type _11e = Expect<Equal<ShapePreservationProfile["atomic"], { value: 1 } | { value: "x" }>>;

// ─── Containers, projections, and absorption ──────────────────────────

// 12. Report the container edges, where the element domain decides everything.
export type ContainerProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ContainerProfile["emptyTuple"], never>>;
type _12b = Expect<Equal<ContainerProfile["neverArray"], never>>;
type _12c = Expect<Equal<ContainerProfile["unknownArray"], unknown>>;
type _12d = Expect<Equal<ContainerProfile["anyArray"], true>>;
type _12e = Expect<Equal<ContainerProfile["nestedArray"], string | number>>;

// 13. Report the `-?` projection, which asks for declared property values, so an
//     optional property contributes no `undefined` leaf of its own.
export type OptionalProjectionProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<OptionalProjectionProfile["optional"], 1>>;
type _13b = Expect<Equal<OptionalProjectionProfile["optionalUnion"], "ms" | "s">>;
type _13c = Expect<Equal<OptionalProjectionProfile["requiredUndefined"], 1 | undefined>>;
type _13d = Expect<Equal<OptionalProjectionProfile["neverValue"], never>>;
type _13e = Expect<Equal<OptionalProjectionProfile["optionalNever"], never>>;

// 14. Report the union algebra that finishes before any recursion starts.
export type AbsorptionProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<AbsorptionProfile["withNever"], 1>>;
type _14b = Expect<Equal<AbsorptionProfile["withUnknown"], unknown>>;
type _14c = Expect<Equal<AbsorptionProfile["withAny"], true>>;
type _14d = Expect<Equal<AbsorptionProfile["booleanSplits"], boolean>>;
type _14e = Expect<Equal<AbsorptionProfile["explicitBooleanSplits"], boolean>>;

// 15. Report the broad object domains, where `{}` and `object` contribute no
//     declared keys and the two readings disagree about a nullable union.
export type BroadObjectProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<BroadObjectProfile["emptyObject"], never>>;
type _15b = Expect<Equal<BroadObjectProfile["emptyOrObject"], never>>;
type _15c = Expect<Equal<BroadObjectProfile["emptyOrNull"], null>>;
type _15d = Expect<Equal<BroadObjectProfile["wholeEmptyOrNull"], {} | null>>;
type _15e = Expect<Equal<BroadObjectProfile["unknownSource"], unknown>>;

// ─── Reusable distribution tools ──────────────────────────────────────

// 16. Build the predicate that reports whether a type is a union at all.
//     Hint: distribute to get one constituent, then ask whether the untouched
//     original still fits inside it.
export type IsUnionOf<Value, Members = Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<{ union: IsUnionOf<1 | 2>; single: IsUnionOf<1> }, { union: true; single: false }>
>;
type _16b = Expect<
  Equal<
    { booleans: IsUnionOf<boolean>; widened: IsUnionOf<string> },
    { booleans: true; widened: false }
  >
>;
type _16c = Expect<Equal<IsUnionOf<never>, never>>;
type _16d = Expect<
  Equal<
    { objects: IsUnionOf<{ a: 1 } | { b: 2 }>; intersection: IsUnionOf<{ a: 1 } & { b: 2 }> },
    { objects: true; intersection: false }
  >
>;
type _16e = Expect<
  Equal<
    { nullable: IsUnionOf<string | null>; unknownSource: IsUnionOf<unknown> },
    { nullable: true; unknownSource: false }
  >
>;

// 17. Build the key reader that distributes first, so it sees every branch's keys
//     rather than only the shared ones.
export type DistributedKeysOf<Value> = TODO; // TODO(koan)

type _17a = Expect<Equal<DistributedKeysOf<{ a: 1 } | { b: 2 }>, "a" | "b">>;
type _17b = Expect<
  Equal<DistributedKeysOf<{ common: 0; a: 1 } | { common: 0; b: 2 }>, "common" | "a" | "b">
>;
type _17c = Expect<Equal<DistributedKeysOf<{ a: 1; b: 2 }>, "a" | "b">>;
type _17d = Expect<Equal<DistributedKeysOf<never>, never>>;
type _17e = Expect<Equal<DistributedKeysOf<GivenEvent>, "kind" | "value">>;

// 18. Build the leaf-collection signature the packet exports. Its element type is
//     deliberately `unknown` rather than the computed leaf union, because the
//     runtime walk also has to stop cycles the type level never sees.
export type LeafRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<LeafRuntimeApi["collectDeepLeaves"], (value: unknown) => unknown[]>
>;
type _18b = Expect<Equal<ReturnType<LeafRuntimeApi["collectDeepLeaves"]>, unknown[]>>;
type _18c = Expect<Equal<Parameters<LeafRuntimeApi["collectDeepLeaves"]>, [value: unknown]>>;
type _18d = Expect<
  Equal<
    {
      declared: ReturnType<LeafRuntimeApi["collectDeepLeaves"]>[number];
      computed: DeepLeavesOf<{ a: 1 } | { b: 2 }>;
    },
    { declared: unknown; computed: 1 | 2 }
  >
>;
type _18e = Expect<
  Equal<
    {
      declared: ReturnType<LeafRuntimeApi["collectDeepLeaves"]>;
      narrowed: DeepLeavesOf<GivenEvent>[];
    },
    { declared: unknown[]; narrowed: ("count" | number | "label" | string)[] }
  >
>;
