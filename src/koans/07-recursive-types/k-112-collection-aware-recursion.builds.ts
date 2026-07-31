import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-112: collection-aware recursion — constructions
 * =============================================================================
 *
 * These constructions build two transforms that must branch on `Promise`, `Map`,
 * and `Set` before the generic object case, or they would walk those containers'
 * method surfaces instead of the domains they hold. Two things repay close
 * attention. First, the weak-collection guard is not merely an ordering question:
 * a mutable `Set` of objects is structurally a `WeakSet<object>`, so it is caught
 * by the atomic branch and passes through untouched. Second, `infer` on a
 * `Promise` reads exactly one layer and does not assimilate nested promises the
 * way `Awaited` does. Constructions 4 onward apply the transforms you build in
 * constructions 2 and 3. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

type GivenKey = { id: number; nested: { active: boolean } };
type GivenWeakMap = WeakMap<object, { readonly id: number }>;
type GivenGraph = {
  cache: Map<string, Set<{ id: number }>>;
  pending: Promise<readonly { id: number }[]>;
};
type GivenCollectionModel = {
  cache: Map<string, number>;
  tags: ReadonlySet<string>;
  pending: Promise<number>;
  name: string;
  items: number[];
};

// Declared with the packet's own snapshot signature so a construction can be
// graded against a real call site.
declare function givenReadonlySnapshot<Value>(value: Value): CollectionReadonlyOf<Value>;

// ─── The two transforms ───────────────────────────────────────────────

// 1. Build the atomic domain. The weak collections belong here because their
//    entries are not enumerable, so no snapshot could traverse them.
export type CollectionAtomic = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<CollectionAtomic, Date | RegExp>, Date | RegExp>>;
type _01b = Expect<
  Equal<Extract<CollectionAtomic, WeakSet<object>>, WeakSet<object>>
>;
type _01c = Expect<
  Equal<
    {
      extracted: Extract<CollectionAtomic, WeakMap<object, unknown>>;
      accepts: GivenWeakMap extends CollectionAtomic ? true : false;
    },
    { extracted: WeakMap<object, unknown>; accepts: true }
  >
>;
type _01d = Expect<
  Equal<
    {
      extracted: Extract<CollectionAtomic, bigint>;
      accepts: ReadonlyMap<string, number> extends CollectionAtomic ? true : false;
    },
    { extracted: bigint; accepts: false }
  >
>;
type _01e = Expect<
  Equal<
    {
      extracted: Extract<CollectionAtomic, null>;
      accepts: Promise<number> extends CollectionAtomic ? true : false;
    },
    { extracted: null; accepts: false }
  >
>;

// 2. Build the readonly collection transform. Check the atomic domain, then
//    `Promise`, then `Map`, then `Set`, then arrays and tuples, then objects.
//    `Map<string, { id: number }>` becomes
//    `ReadonlyMap<string, { readonly id: number }>`.
//    Hint: matching `ReadonlyMap` and `ReadonlySet` catches their mutable
//    counterparts too, because a `Map` is assignable to a `ReadonlyMap`.
export type CollectionReadonlyOf<Value> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    CollectionReadonlyOf<Map<string, { count: number }>>,
    ReadonlyMap<string, { readonly count: number }>
  >
>;
type _02b = Expect<Equal<CollectionReadonlyOf<Set<number>>, ReadonlySet<number>>>;
type _02c = Expect<
  Equal<CollectionReadonlyOf<Promise<{ id: number }>>, Promise<{ readonly id: number }>>
>;
type _02d = Expect<Equal<CollectionReadonlyOf<Date>, Date>>;
type _02e = Expect<
  Equal<CollectionReadonlyOf<{ user: { id: number } }>, { readonly user: { readonly id: number } }>
>;

// 3. Build the mutable counterpart, which reconstructs `Map` and `Set` instead
//    of exposing their readonly views.
//    `ReadonlySet<{ readonly id: number }>` becomes `Set<{ id: number }>`.
export type CollectionMutableOf<Value> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<CollectionMutableOf<ReadonlySet<{ readonly id: number }>>, Set<{ id: number }>>
>;
type _03b = Expect<
  Equal<
    CollectionMutableOf<ReadonlyMap<string, readonly { readonly id: number }[]>>,
    Map<string, { id: number }[]>
  >
>;
type _03c = Expect<
  Equal<CollectionMutableOf<Promise<readonly [{ readonly id: number }]>>, Promise<[{ id: number }]>>
>;
type _03d = Expect<Equal<CollectionMutableOf<never>, never>>;
type _03e = Expect<
  Equal<CollectionMutableOf<{ readonly user: { readonly id: 1 } }>, { user: { id: 1 } }>
>;

// ─── The weak-collection overlap ──────────────────────────────────────

// 4. Report the structural overlap that decides which branch actually runs. A
//    mutable `Set` of objects already satisfies `WeakSet<object>`, and a mutable
//    `Map` with object keys already satisfies `WeakMap<object, unknown>`, so the
//    atomic guard claims them before the collection branches are reached. Their
//    readonly views have no `add` or `set`, so they are not caught.
export type WeakOverlapProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<WeakOverlapProfile["objectSet"], true>>;
type _04b = Expect<Equal<WeakOverlapProfile["primitiveSet"], false>>;
type _04c = Expect<Equal<WeakOverlapProfile["objectKeyMap"], true>>;
type _04d = Expect<Equal<WeakOverlapProfile["primitiveKeyMap"], false>>;
type _04e = Expect<Equal<WeakOverlapProfile["readonlyObjectSet"], false>>;

// 5. Report the consequence: the containers the overlap swallows come back out
//    completely untransformed, while their readonly views transform normally.
export type OverlapConsequenceProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<OverlapConsequenceProfile["objectSet"], Set<{ id: number }>>>;
type _05b = Expect<
  Equal<OverlapConsequenceProfile["readonlyObjectSet"], ReadonlySet<{ readonly id: number }>>
>;
type _05c = Expect<Equal<OverlapConsequenceProfile["objectKeyMap"], Map<GivenKey, string>>>;
type _05d = Expect<
  Equal<
    OverlapConsequenceProfile["readonlyObjectKeyMap"],
    ReadonlyMap<{ readonly id: number }, readonly string[]>
  >
>;
type _05e = Expect<
  Equal<
    OverlapConsequenceProfile["mutableObjectKeyMap"],
    Map<readonly [1, 2], { readonly value: string }>
  >
>;

// ─── Map, Set, and Promise branches ───────────────────────────────────

// 6. Report the Map branch transforming both its key and its value domain.
export type MapBranchProfile = TODO; // TODO(koan)

type _06a = Expect<
  Equal<MapBranchProfile["readonlyView"], ReadonlyMap<string, { readonly count: number }>>
>;
type _06b = Expect<
  Equal<MapBranchProfile["nestedValue"], ReadonlyMap<string, ReadonlySet<number>>>
>;
type _06c = Expect<
  Equal<MapBranchProfile["mutableRebuild"], Map<string, { id: number }>>
>;
type _06d = Expect<
  Equal<MapBranchProfile["keyDomain"], ReadonlyMap<{ readonly id: number }, string>>
>;
type _06e = Expect<Equal<MapBranchProfile["identity"], ReadonlyMap<string, number>>>;

// 7. Report the Set branch transforming its element domain.
export type SetBranchProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<SetBranchProfile["primitives"], ReadonlySet<number>>>;
type _07b = Expect<Equal<SetBranchProfile["tuples"], ReadonlySet<readonly [1, 2]>>>;
type _07c = Expect<Equal<SetBranchProfile["mutableRebuild"], Set<{ id: number }>>>;
type _07d = Expect<Equal<SetBranchProfile["emptyDomain"], Set<never>>>;
type _07e = Expect<
  Equal<SetBranchProfile["nested"], ReadonlySet<ReadonlySet<number>>>
>;

// 8. Report the Promise branch keeping its container while transforming the
//    value it eventually produces.
export type PromiseBranchProfile = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    PromiseBranchProfile["object"],
    Promise<{ readonly items: ReadonlyMap<string, { readonly id: number }> }>
  >
>;
type _08b = Expect<Equal<PromiseBranchProfile["awaited"], { readonly id: number }>>;
type _08c = Expect<Equal<PromiseBranchProfile["mutableTuple"], Promise<[{ id: number }]>>>;
type _08d = Expect<Equal<PromiseBranchProfile["awaitedMutable"], [1, 2]>>;
type _08e = Expect<
  Equal<
    PromiseBranchProfile["arrayFulfillment"],
    Promise<readonly { readonly id: number }[]>
  >
>;

// 9. Report that `infer` on a promise reads exactly one layer, unlike `Awaited`,
//    which recursively assimilates nested promises.
export type PromiseInferenceProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<PromiseInferenceProfile["inferredOnce"], Promise<1>>>;
type _09b = Expect<Equal<PromiseInferenceProfile["awaitedFully"], 1>>;
type _09c = Expect<
  Equal<
    PromiseInferenceProfile["transformedNested"],
    Promise<Promise<{ readonly id: number }>>
  >
>;
type _09d = Expect<
  Equal<PromiseInferenceProfile["awaitedTransformed"], { readonly id: number }>
>;
type _09e = Expect<Equal<PromiseInferenceProfile["singleLayer"], Promise<Promise<1>>>>;

// ─── Capability and variance ──────────────────────────────────────────

// 10. Report which mutating members each transform's output exposes.
export type CollectionCapabilityProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<CollectionCapabilityProfile["readonlyMapSet"], false>>;
type _10b = Expect<Equal<CollectionCapabilityProfile["readonlySetAdd"], false>>;
type _10c = Expect<Equal<CollectionCapabilityProfile["mutableMapSet"], true>>;
type _10d = Expect<Equal<CollectionCapabilityProfile["mutableSetAdd"], true>>;
type _10e = Expect<Equal<CollectionCapabilityProfile["weakMapSet"], true>>;

// 11. Report the one-directional assignability that makes the readonly view a
//     capability restriction rather than a different runtime object.
export type CollectionVarianceProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<CollectionVarianceProfile["mapToReadonly"], true>>;
type _11b = Expect<Equal<CollectionVarianceProfile["readonlyToMap"], false>>;
type _11c = Expect<Equal<CollectionVarianceProfile["setToReadonly"], true>>;
type _11d = Expect<Equal<CollectionVarianceProfile["readonlyToSet"], false>>;
type _11e = Expect<Equal<CollectionVarianceProfile["transformedAcceptsSource"], true>>;

// 12. Report the weak collections staying opaque under both transforms, keeping
//     the mutating APIs neither transform is able to restrict.
export type WeakOpacityProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<WeakOpacityProfile["readonlyWeakMap"], GivenWeakMap>>;
type _12b = Expect<Equal<WeakOpacityProfile["mutableWeakMap"], GivenWeakMap>>;
type _12c = Expect<Equal<WeakOpacityProfile["readonlyWeakSet"], WeakSet<object>>>;
type _12d = Expect<Equal<WeakOpacityProfile["mutableWeakSet"], WeakSet<object>>>;
type _12e = Expect<Equal<WeakOpacityProfile["entryUntouched"], { readonly id: number }>>;

// ─── Composition ──────────────────────────────────────────────────────

// 13. Report ordinary objects, arrays, and tuples composing with collections.
export type CompositionProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    CompositionProfile["graph"],
    {
      readonly cache: ReadonlyMap<string, Set<{ id: number }>>;
      readonly pending: Promise<readonly { readonly id: number }[]>;
    }
  >
>;
type _13b = Expect<
  Equal<
    CompositionProfile["tuple"],
    readonly [ReadonlyMap<string, number>, ReadonlySet<boolean>]
  >
>;
type _13c = Expect<
  Equal<CompositionProfile["mutableTuple"], [Map<string, number>, Set<boolean>]>
>;
type _13d = Expect<
  Equal<CompositionProfile["arrayOfMaps"], readonly ReadonlyMap<string, number>[]>
>;
type _13e = Expect<Equal<CompositionProfile["objectKeys"], "id" | "nested">>;

// 14. Report the round trip, which restores mutability everywhere the readonly
//     transform actually reached.
export type RoundTripProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    RoundTripProfile["graph"],
    { cache: Map<string, Set<{ id: number }>>; pending: Promise<{ id: number }[]> }
  >
>;
type _14b = Expect<Equal<RoundTripProfile["map"], Map<string, number>>>;
type _14c = Expect<Equal<RoundTripProfile["set"], Set<number>>>;
type _14d = Expect<Equal<RoundTripProfile["object"], { user: { id: number } }>>;
type _14e = Expect<Equal<RoundTripProfile["weak"], GivenWeakMap>>;

// 15. Report the extreme domains carried inside collections.
export type ExtremeCollectionProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<ExtremeCollectionProfile["anyKeyMap"], Map<any, unknown>>>;
type _15b = Expect<Equal<ExtremeCollectionProfile["neverSet"], Set<never>>>;
type _15c = Expect<Equal<ExtremeCollectionProfile["never"], never>>;
type _15d = Expect<Equal<ExtremeCollectionProfile["any"], true>>;
type _15e = Expect<Equal<ExtremeCollectionProfile["unknownSet"], ReadonlySet<unknown>>>;

// ─── Reusable surfaces ────────────────────────────────────────────────

// 16. Build the key filter that names the properties holding a traversable
//     collection.
export type CollectionKeysOf<Model> = TODO; // TODO(koan)

type _16a = Expect<Equal<CollectionKeysOf<GivenCollectionModel>, "cache" | "tags" | "pending">>;
type _16b = Expect<Equal<CollectionKeysOf<{}>, never>>;
type _16c = Expect<Equal<CollectionKeysOf<{ a: string; b: number[] }>, never>>;
type _16d = Expect<Equal<CollectionKeysOf<{ a: Set<number>; b: Map<string, number> }>, "a" | "b">>;
type _16e = Expect<Equal<CollectionKeysOf<{ a?: Promise<number> }>, never>>;

// 17. Build the fulfillment reader that unwraps only the promise layers this
//     packet's transforms preserve.
export type FulfillmentOf<Value> = TODO; // TODO(koan)

type _17a = Expect<Equal<FulfillmentOf<Promise<{ id: number }>>, { id: number }>>;
type _17b = Expect<Equal<FulfillmentOf<Promise<Promise<1>>>, Promise<1>>>;
type _17c = Expect<Equal<FulfillmentOf<number>, number>>;
type _17d = Expect<Equal<FulfillmentOf<Promise<never>>, never>>;
type _17e = Expect<
  Equal<FulfillmentOf<Promise<1> | Promise<2>>, 1 | 2>
>;

// 18. Build the snapshot signatures the packet exports.
export type SnapshotRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    SnapshotRuntimeApi["readonlySnapshot"],
    <Value>(value: Value) => CollectionReadonlyOf<Value>
  >
>;
type _18b = Expect<
  Equal<
    SnapshotRuntimeApi["mutableSnapshot"],
    <Value>(value: Value) => CollectionMutableOf<Value>
  >
>;
type _18c = Expect<Equal<ReturnType<SnapshotRuntimeApi["readonlySnapshot"]>, unknown>>;
type _18d = Expect<Equal<Parameters<SnapshotRuntimeApi["mutableSnapshot"]>, [value: unknown]>>;
type _18e = Expect<
  Equal<
    ReturnType<typeof givenReadonlySnapshot<Map<string, { id: number }>>>,
    ReadonlyMap<string, { readonly id: number }>
  >
>;
