import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-109: DeepReadonly — constructions
 * =============================================================================
 *
 * These constructions build a recursive capability restriction rather than a
 * recursive optionality change. Every data container loses its write surface —
 * including mutable arrays, which collapse into readonly arrays — while what is
 * already there stays there: optional properties stay optional, discriminants
 * stay required, and opaque leaves keep their own mutating methods because the
 * policy stops before them. Constructions 3 onward apply the `DeepReadonlyOf`
 * transform you build in construction 2. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

type GivenState = { kind: "idle" } | { kind: "ready"; data: { value: number } };

declare const givenToken: unique symbol;
type GivenMixedKeys = {
  0: { id: number };
  name: string;
  [givenToken]: { active: boolean };
};

interface GivenReadonlySettings {
  account: { name: string; contact: { email: string; phone?: string } };
  theme: { mode: "light" | "dark"; contrast: number };
  tags: string[];
}

// ─── The transform ────────────────────────────────────────────────────

// 1. Build the atomic domain this policy refuses to rewrite, which is why the
//    values below keep their own mutating methods.
export type FrozenAtomic = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<FrozenAtomic, Date>, Date>>;
type _01b = Expect<Equal<Extract<FrozenAtomic, bigint | symbol>, bigint | symbol>>;
type _01c = Expect<
  Equal<
    {
      extracted: Extract<FrozenAtomic, Map<unknown, unknown>>;
      accepts: Set<number> extends FrozenAtomic ? true : false;
    },
    { extracted: Map<unknown, unknown>; accepts: true }
  >
>;
type _01d = Expect<
  Equal<
    {
      extracted: Extract<FrozenAtomic, RegExp>;
      accepts: { id: number } extends FrozenAtomic ? true : false;
    },
    { extracted: RegExp; accepts: false }
  >
>;
type _01e = Expect<
  Equal<
    {
      extracted: Extract<FrozenAtomic, null | undefined>;
      accepts: readonly number[] extends FrozenAtomic ? true : false;
    },
    { extracted: null | undefined; accepts: false }
  >
>;

// 2. Build the recursive readonly view: intercept `any`, return atomic values
//    unchanged, turn every broad array into a readonly array of transformed
//    elements, make finite tuple positions readonly, make object properties
//    readonly and recurse into their values, and otherwise stop.
//    `{ user: { id: number } }` becomes `{ readonly user: { readonly id: number } }`.
//    Hint: unlike a partial transform, both mutable and readonly arrays end at
//    the same readonly result, so the array branch needs no capability split.
export type DeepReadonlyOf<Value> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<DeepReadonlyOf<{ user: { id: number } }>, { readonly user: { readonly id: number } }>
>;
type _02b = Expect<Equal<DeepReadonlyOf<Date>, Date>>;
type _02c = Expect<
  Equal<DeepReadonlyOf<Array<{ id: number }>>, readonly { readonly id: number }[]>
>;
type _02d = Expect<Equal<DeepReadonlyOf<[1, 2]>, readonly [1, 2]>>;
type _02e = Expect<Equal<DeepReadonlyOf<{}>, {}>>;

// ─── Leaves and plain objects ─────────────────────────────────────────

// 3. Report the atomic values that pass through unchanged.
export type ReadonlyAtomicProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<ReadonlyAtomicProfile["string"], string>>;
type _03b = Expect<Equal<ReadonlyAtomicProfile["date"], Date>>;
type _03c = Expect<Equal<ReadonlyAtomicProfile["callable"], (value: number) => string>>;
type _03d = Expect<Equal<ReadonlyAtomicProfile["map"], Map<string, number>>>;
type _03e = Expect<Equal<ReadonlyAtomicProfile["promise"], Promise<1>>>;

// 4. Report writes disappearing at every object layer.
export type NestedObjectReadonlyProfile = TODO; // TODO(koan)

type _04a = Expect<
  Equal<NestedObjectReadonlyProfile["flat"], { readonly id: number; readonly name: string }>
>;
type _04b = Expect<
  Equal<NestedObjectReadonlyProfile["oneLevel"], { readonly user: { readonly id: number } }>
>;
type _04c = Expect<
  Equal<
    NestedObjectReadonlyProfile["twoLevels"],
    { readonly user: { readonly profile: { readonly name: string } } }
  >
>;
type _04d = Expect<Equal<NestedObjectReadonlyProfile["read"], { readonly id: number }>>;
type _04e = Expect<Equal<NestedObjectReadonlyProfile["reachable"], number>>;

// 5. Report optionality surviving untouched and `readonly` being idempotent.
export type ModifierPreservationProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<ModifierPreservationProfile["optional"], { readonly value?: string }>>;
type _05b = Expect<
  Equal<
    ModifierPreservationProfile["optionalObject"],
    { readonly value?: { readonly nested: number } }
  >
>;
type _05c = Expect<Equal<ModifierPreservationProfile["alreadyReadonly"], { readonly id: number }>>;
type _05d = Expect<
  Equal<
    ModifierPreservationProfile["readonlyOuterOnly"],
    { readonly nested: { readonly id: number } }
  >
>;
type _05e = Expect<
  Equal<
    ModifierPreservationProfile["readonlyOptional"],
    { readonly value?: { readonly nested: string } }
  >
>;

// ─── Arrays and tuples ────────────────────────────────────────────────

// 6. Report every broad array arriving at the same readonly result.
export type BroadArrayReadonlyProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<BroadArrayReadonlyProfile["mutable"], readonly string[]>>;
type _06b = Expect<Equal<BroadArrayReadonlyProfile["alreadyReadonly"], readonly string[]>>;
type _06c = Expect<
  Equal<BroadArrayReadonlyProfile["objects"], readonly { readonly id: number }[]>
>;
type _06d = Expect<
  Equal<
    BroadArrayReadonlyProfile["nested"],
    readonly (readonly { readonly id: number }[])[]
  >
>;
type _06e = Expect<Equal<BroadArrayReadonlyProfile["neverArray"], readonly never[]>>;

// 7. Report the capability evidence: mutators leave, readers stay.
export type ArrayCapabilityProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<ArrayCapabilityProfile["arrayPush"], false>>;
type _07b = Expect<Equal<ArrayCapabilityProfile["arrayMap"], true>>;
type _07c = Expect<Equal<ArrayCapabilityProfile["tuplePush"], false>>;
type _07d = Expect<Equal<ArrayCapabilityProfile["arrayLength"], number>>;
type _07e = Expect<Equal<ArrayCapabilityProfile["tupleLength"], 2>>;

// 8. Report finite tuples keeping their cardinality while becoming readonly.
export type TupleReadonlyProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<TupleReadonlyProfile["empty"], readonly []>>;
type _08b = Expect<Equal<TupleReadonlyProfile["single"], readonly [1]>>;
type _08c = Expect<Equal<TupleReadonlyProfile["pair"], readonly [1, 2]>>;
type _08d = Expect<Equal<TupleReadonlyProfile["alreadyReadonly"], readonly [1, 2]>>;
type _08e = Expect<
  Equal<
    TupleReadonlyProfile["objects"],
    readonly [{ readonly id: number }, { readonly name: string }]
  >
>;

// 9. Report labels and optional positions surviving, and a rest element instead
//    making the length broad so the array branch is taken.
export type TupleShapeProfile = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    TupleShapeProfile["labelled"],
    readonly [left: { readonly id: number }, right: string]
  >
>;
type _09b = Expect<
  Equal<TupleShapeProfile["optionalPosition"], readonly [value?: { readonly id: number }]>
>;
type _09c = Expect<
  Equal<TupleShapeProfile["withRest"], readonly ({ readonly id: number } | string)[]>
>;
type _09d = Expect<Equal<TupleShapeProfile["firstPosition"], { readonly id: number }>>;
type _09e = Expect<Equal<TupleShapeProfile["restLength"], number>>;

// ─── Unions and the presence semantics that do not change ─────────────

// 10. Report the transform distributing across union members.
export type UnionReadonlyProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<UnionReadonlyProfile["objects"], { readonly x: 1 } | { readonly y: 2 }>
>;
type _10b = Expect<Equal<UnionReadonlyProfile["tuples"], readonly [1] | readonly [2, 3]>>;
type _10c = Expect<
  Equal<UnionReadonlyProfile["arrayOrObject"], readonly string[] | { readonly id: number }>
>;
type _10d = Expect<Equal<UnionReadonlyProfile["atomicOrObject"], Date | { readonly id: number }>>;
type _10e = Expect<Equal<UnionReadonlyProfile["withNever"], { readonly id: number }>>;

// 11. Report discriminants staying required, so the result is still matchable —
//     the opposite of what a deep partial transform does to the same union.
export type DiscriminantPreservationProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    DiscriminantPreservationProfile["frozen"],
    | { readonly kind: "idle" }
    | { readonly kind: "ready"; readonly data: { readonly value: number } }
  >
>;
type _11b = Expect<Equal<DiscriminantPreservationProfile["tag"], "idle" | "ready">>;
type _11c = Expect<Equal<DiscriminantPreservationProfile["acceptsEmpty"], false>>;
type _11d = Expect<Equal<DiscriminantPreservationProfile["acceptsComplete"], true>>;
type _11e = Expect<Equal<DiscriminantPreservationProfile["acceptsUnknownTag"], false>>;

// 12. Report optional presence semantics, which readonly does not alter.
export type OptionalPresenceProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<OptionalPresenceProfile["read"], { readonly value: number } | undefined>
>;
type _12b = Expect<Equal<OptionalPresenceProfile["reachable"], number>>;
type _12c = Expect<Equal<OptionalPresenceProfile["acceptsOmitted"], true>>;
type _12d = Expect<Equal<OptionalPresenceProfile["acceptsPresent"], true>>;
type _12e = Expect<Equal<OptionalPresenceProfile["acceptsExplicitUndefined"], false>>;

// ─── The limits of a compile-time view ────────────────────────────────

// 13. Report the opaque leaves that keep their mutating APIs, which is why this
//     transform is a capability view and not runtime freezing.
export type OpaqueMutatorProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<OpaqueMutatorProfile["dateSetter"], true>>;
type _13b = Expect<Equal<OpaqueMutatorProfile["mapSetter"], true>>;
type _13c = Expect<Equal<OpaqueMutatorProfile["setAdder"], true>>;
type _13d = Expect<Equal<OpaqueMutatorProfile["mapIdentity"], Map<string, { id: number }>>>;
type _13e = Expect<Equal<OpaqueMutatorProfile["promiseIdentity"], Promise<{ id: number }>>>;

// 14. Report numeric, string, symbol, and index-signature keys all becoming readonly.
export type MixedKeyReadonlyProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    MixedKeyReadonlyProfile["frozen"],
    {
      readonly 0: { readonly id: number };
      readonly name: string;
      readonly [givenToken]: { readonly active: boolean };
    }
  >
>;
type _14b = Expect<Equal<MixedKeyReadonlyProfile["numericMember"], { readonly id: number }>>;
type _14c = Expect<
  Equal<MixedKeyReadonlyProfile["symbolMember"], { readonly active: boolean }>
>;
type _14d = Expect<Equal<MixedKeyReadonlyProfile["keys"], 0 | "name" | typeof givenToken>>;
type _14e = Expect<Equal<MixedKeyReadonlyProfile["indexMember"], { readonly id: number }>>;

// 15. Report the boundaries taken by the top and bottom types.
export type TopAndBottomReadonlyProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<TopAndBottomReadonlyProfile["any"], true>>;
type _15b = Expect<Equal<TopAndBottomReadonlyProfile["unknown"], unknown>>;
type _15c = Expect<Equal<TopAndBottomReadonlyProfile["never"], never>>;
type _15d = Expect<
  Equal<TopAndBottomReadonlyProfile["emptyRecord"], { readonly [key: string]: never }>
>;
type _15e = Expect<Equal<TopAndBottomReadonlyProfile["primitiveUnion"], string | number>>;

// 16. Report the assignability that makes readonly views one-directional for
//     arrays but transparent for object properties.
export type ReadonlyAssignabilityProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ReadonlyAssignabilityProfile["mutableArrayToReadonly"], true>>;
type _16b = Expect<Equal<ReadonlyAssignabilityProfile["readonlyArrayToMutable"], false>>;
type _16c = Expect<Equal<ReadonlyAssignabilityProfile["mutableObjectToReadonly"], true>>;
type _16d = Expect<Equal<ReadonlyAssignabilityProfile["readonlyObjectToMutable"], true>>;
type _16e = Expect<Equal<ReadonlyAssignabilityProfile["tupleToReadonlyTuple"], true>>;

// ─── Surfaces built on the transform ──────────────────────────────────

// 17. Build the frozen view of the packet's settings model.
export type FrozenSettings = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    FrozenSettings,
    {
      readonly account: {
        readonly name: string;
        readonly contact: { readonly email: string; readonly phone?: string };
      };
      readonly theme: { readonly mode: "light" | "dark"; readonly contrast: number };
      readonly tags: readonly string[];
    }
  >
>;
type _17b = Expect<Equal<FrozenSettings["tags"], readonly string[]>>;
type _17c = Expect<Equal<FrozenSettings["theme"]["contrast"], number>>;
type _17d = Expect<Equal<FrozenSettings["account"]["contact"]["phone"], string | undefined>>;
type _17e = Expect<
  Equal<"push" extends keyof FrozenSettings["tags"] ? true : false, false>
>;

// 18. Build the predicate that reports whether a type is already deeply readonly.
//     Hint: the shared `Equal` primitive is itself a reusable type-level operator.
export type IsDeeplyReadonly<Value> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    {
      frozen: IsDeeplyReadonly<{ readonly id: number }>;
      mutable: IsDeeplyReadonly<{ id: number }>;
    },
    { frozen: true; mutable: false }
  >
>;
type _18b = Expect<
  Equal<
    {
      frozen: IsDeeplyReadonly<readonly string[]>;
      mutable: IsDeeplyReadonly<string[]>;
    },
    { frozen: true; mutable: false }
  >
>;
type _18c = Expect<
  Equal<
    {
      atomic: IsDeeplyReadonly<Date>;
      shallowOnly: IsDeeplyReadonly<{ readonly nested: { id: number } }>;
    },
    { atomic: true; shallowOnly: false }
  >
>;
type _18d = Expect<
  Equal<
    {
      deep: IsDeeplyReadonly<{ readonly nested: { readonly id: number } }>;
      tuple: IsDeeplyReadonly<[1, 2]>;
    },
    { deep: true; tuple: false }
  >
>;
type _18e = Expect<
  Equal<
    { empty: IsDeeplyReadonly<{}>; primitive: IsDeeplyReadonly<string> },
    { empty: true; primitive: true }
  >
>;

// 19. Build the freezing signatures the packet exports, including the visited-set
//     parameter that the static type cannot express.
export type FreezeRuntimeApi = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    FreezeRuntimeApi["deepFreeze"],
    <Value>(value: Value, seen?: WeakSet<object>) => DeepReadonlyOf<Value>
  >
>;
type _19b = Expect<
  Equal<
    FreezeRuntimeApi["freezeSettings"],
    (settings: GivenReadonlySettings) => DeepReadonlyOf<GivenReadonlySettings>
  >
>;
type _19c = Expect<
  Equal<Parameters<FreezeRuntimeApi["freezeSettings"]>[0], GivenReadonlySettings>
>;
type _19d = Expect<
  Equal<ReturnType<FreezeRuntimeApi["freezeSettings"]>["tags"], readonly string[]>
>;
type _19e = Expect<Equal<ReturnType<FreezeRuntimeApi["deepFreeze"]>, unknown>>;
