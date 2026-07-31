import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-111: DeepMutable — constructions
 * =============================================================================
 *
 * These constructions build the inverse capability transform: `-readonly` gives
 * back write access without touching anything else. Optional properties stay
 * optional, literal domains stay narrow, and opaque leaves are left alone because
 * they already carry their own mutation APIs. The subtle part is assignability —
 * dropping `readonly` from an object property changes nothing about what is
 * assignable, while dropping it from an array changes everything. Constructions 3
 * onward apply the `DeepMutableOf` transform you build in construction 2. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

declare const givenToken: unique symbol;
type GivenMixedKeys = {
  readonly 0: { readonly id: number };
  readonly name: string;
  readonly [givenToken]: { readonly active: boolean };
};

type GivenUnion =
  | { readonly kind: "a"; readonly a: { readonly value: number } }
  | { readonly kind: "b"; readonly b: { readonly value: string } };

interface GivenFrozenSettings {
  readonly account: { readonly name: string; readonly contact?: { readonly email: string } };
  readonly tags: readonly string[];
  readonly coordinates: readonly [x: number, y: number];
}

type GivenModifierModel = {
  readonly frozen: number;
  writable: string;
  readonly frozenOptional?: boolean;
  writableOptional?: symbol;
};

// ─── The transform ────────────────────────────────────────────────────

// 1. Build the atomic domain the transform leaves alone, which is why these
//    values keep exactly the mutation APIs they already had.
export type MutableAtomic = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<MutableAtomic, Date | RegExp>, Date | RegExp>>;
type _01b = Expect<Equal<Extract<MutableAtomic, boolean>, boolean>>;
type _01c = Expect<
  Equal<
    {
      extracted: Extract<MutableAtomic, Set<unknown>>;
      accepts: Map<string, number> extends MutableAtomic ? true : false;
    },
    { extracted: Set<unknown>; accepts: true }
  >
>;
type _01d = Expect<
  Equal<
    {
      extracted: Extract<MutableAtomic, null | undefined>;
      accepts: { readonly id: number } extends MutableAtomic ? true : false;
    },
    { extracted: null | undefined; accepts: false }
  >
>;
type _01e = Expect<
  Equal<
    {
      extracted: Extract<MutableAtomic, Promise<unknown>>;
      accepts: readonly number[] extends MutableAtomic ? true : false;
    },
    { extracted: Promise<unknown>; accepts: false }
  >
>;

// 2. Build the recursive write-capability transform: intercept `any`, return
//    atomic values unchanged, turn every broad array into a mutable array of
//    transformed elements, strip `readonly` from finite tuple positions and
//    object properties while recursing into their values, and otherwise stop.
//    `{ readonly user: { readonly id: 1 } }` becomes `{ user: { id: 1 } }`.
//    Hint: `-readonly` on the mapped key removes the modifier; nothing here
//    should touch optionality or widen a literal.
export type DeepMutableOf<Value> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<DeepMutableOf<{ readonly user: { readonly id: 1 } }>, { user: { id: 1 } }>
>;
type _02b = Expect<Equal<DeepMutableOf<Date>, Date>>;
type _02c = Expect<
  Equal<DeepMutableOf<readonly { readonly id: number }[]>, { id: number }[]>
>;
type _02d = Expect<Equal<DeepMutableOf<readonly [1, 2]>, [1, 2]>>;
type _02e = Expect<Equal<DeepMutableOf<{}>, {}>>;

// ─── Leaves and nested write access ───────────────────────────────────

// 3. Report the atomic values that pass through unchanged.
export type MutableAtomicProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<MutableAtomicProfile["string"], string>>;
type _03b = Expect<Equal<MutableAtomicProfile["date"], Date>>;
type _03c = Expect<Equal<MutableAtomicProfile["callable"], (value: number) => string>>;
type _03d = Expect<Equal<MutableAtomicProfile["map"], Map<string, number>>>;
type _03e = Expect<Equal<MutableAtomicProfile["promise"], Promise<1>>>;

// 4. Report write access returning at every object layer.
export type NestedMutabilityProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<NestedMutabilityProfile["flat"], { id: number; name: string }>>;
type _04b = Expect<Equal<NestedMutabilityProfile["oneLevel"], { user: { id: number } }>>;
type _04c = Expect<
  Equal<
    NestedMutabilityProfile["threeLevels"],
    { id: number; profile: { name: string; address: { city: string } } }
  >
>;
type _04d = Expect<Equal<NestedMutabilityProfile["read"], { id: number }>>;
type _04e = Expect<Equal<NestedMutabilityProfile["alreadyMutable"], { id: number }>>;

// 5. Report optionality staying exactly as it was found.
export type OptionalityUnchangedProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<OptionalityUnchangedProfile["optional"], { value?: string }>>;
type _05b = Expect<
  Equal<OptionalityUnchangedProfile["optionalNested"], { nested?: { value: number } }>
>;
type _05c = Expect<Equal<OptionalityUnchangedProfile["read"], { value: number } | undefined>>;
type _05d = Expect<Equal<OptionalityUnchangedProfile["acceptsOmitted"], true>>;
type _05e = Expect<
  Equal<OptionalityUnchangedProfile["explicitUndefined"], { value: string | undefined }>
>;

// 6. Report literal domains staying narrow: a writable position is not a wider one.
export type LiteralPreservationProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<LiteralPreservationProfile["tuple"], [1, 2]>>;
type _06b = Expect<Equal<LiteralPreservationProfile["firstPosition"], 1>>;
type _06c = Expect<Equal<LiteralPreservationProfile["acceptsSameOrder"], true>>;
type _06d = Expect<Equal<LiteralPreservationProfile["acceptsSwappedOrder"], false>>;
type _06e = Expect<Equal<LiteralPreservationProfile["nestedLiteral"], 1>>;

// ─── Arrays and tuples ────────────────────────────────────────────────

// 7. Report every broad array arriving at the same mutable result.
export type BroadArrayMutableProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<BroadArrayMutableProfile["alreadyMutable"], string[]>>;
type _07b = Expect<Equal<BroadArrayMutableProfile["readonlyArray"], string[]>>;
type _07c = Expect<Equal<BroadArrayMutableProfile["objects"], { id: number }[]>>;
type _07d = Expect<Equal<BroadArrayMutableProfile["nested"], { id: number }[][]>>;
type _07e = Expect<Equal<BroadArrayMutableProfile["element"], string>>;

// 8. Report the mutating methods returning to arrays and tuples alike.
export type ArrayCapabilityProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<ArrayCapabilityProfile["arrayPush"], true>>;
type _08b = Expect<Equal<ArrayCapabilityProfile["arrayMap"], true>>;
type _08c = Expect<Equal<ArrayCapabilityProfile["tuplePush"], true>>;
type _08d = Expect<Equal<ArrayCapabilityProfile["tupleLength"], 2>>;
type _08e = Expect<Equal<ArrayCapabilityProfile["arrayLength"], number>>;

// 9. Report finite tuples keeping cardinality, labels, and optional positions.
export type TupleMutableProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<TupleMutableProfile["empty"], []>>;
type _09b = Expect<Equal<TupleMutableProfile["single"], [1]>>;
type _09c = Expect<
  Equal<TupleMutableProfile["labelled"], [left: { id: number }, right: string]>
>;
type _09d = Expect<Equal<TupleMutableProfile["optionalPosition"], [value?: { id: number }]>>;
type _09e = Expect<Equal<TupleMutableProfile["withRest"], ({ id: number } | string)[]>>;

// ─── What assignability does and does not notice ──────────────────────

// 10. Report the asymmetry: property `readonly` is invisible to assignability,
//     while array `readonly` is not.
export type AssignabilityAsymmetryProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<AssignabilityAsymmetryProfile["readonlyPropertyToMutable"], true>>;
type _10b = Expect<Equal<AssignabilityAsymmetryProfile["readonlyArrayToMutable"], false>>;
type _10c = Expect<Equal<AssignabilityAsymmetryProfile["readonlyTupleToMutable"], false>>;
type _10d = Expect<Equal<AssignabilityAsymmetryProfile["transformedArrayToMutable"], true>>;
type _10e = Expect<Equal<AssignabilityAsymmetryProfile["transformedTupleToMutable"], true>>;

// 11. Report the opaque built-ins, which needed no help becoming mutable.
export type OpaqueLeafProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<OpaqueLeafProfile["dateSetter"], true>>;
type _11b = Expect<Equal<OpaqueLeafProfile["mapSetter"], true>>;
type _11c = Expect<Equal<OpaqueLeafProfile["setAdder"], true>>;
type _11d = Expect<Equal<OpaqueLeafProfile["mapIdentity"], Map<string, number>>>;
type _11e = Expect<Equal<OpaqueLeafProfile["functionIdentity"], () => string>>;

// ─── Keys, unions, and extreme sources ────────────────────────────────

// 12. Report numeric, string, and symbol keys keeping their identity.
export type MixedKeyMutableProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    MixedKeyMutableProfile["thawed"],
    { 0: { id: number }; name: string; [givenToken]: { active: boolean } }
  >
>;
type _12b = Expect<Equal<MixedKeyMutableProfile["numericMember"], { id: number }>>;
type _12c = Expect<Equal<MixedKeyMutableProfile["symbolMember"], { active: boolean }>>;
type _12d = Expect<Equal<MixedKeyMutableProfile["keys"], 0 | "name" | typeof givenToken>>;
type _12e = Expect<Equal<MixedKeyMutableProfile["indexMember"], { id: number }>>;

// 13. Report the transform distributing across union members.
export type UnionMutableProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    UnionMutableProfile["discriminated"],
    { kind: "a"; a: { value: number } } | { kind: "b"; b: { value: string } }
  >
>;
type _13b = Expect<Equal<UnionMutableProfile["tag"], "a" | "b">>;
type _13c = Expect<Equal<UnionMutableProfile["keys"], "kind">>;
type _13d = Expect<Equal<UnionMutableProfile["tuples"], [1] | [2, 3]>>;
type _13e = Expect<Equal<UnionMutableProfile["arrayOrObject"], string[] | { id: number }>>;

// 14. Report the boundaries taken by the top and bottom types.
export type TopAndBottomMutableProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<TopAndBottomMutableProfile["any"], true>>;
type _14b = Expect<Equal<TopAndBottomMutableProfile["unknown"], unknown>>;
type _14c = Expect<Equal<TopAndBottomMutableProfile["never"], never>>;
type _14d = Expect<Equal<TopAndBottomMutableProfile["neverArray"], never[]>>;
type _14e = Expect<
  Equal<TopAndBottomMutableProfile["emptyRecord"], { [key: string]: never }>
>;

// ─── Surfaces built on the transform ──────────────────────────────────

// 15. Build the thawed counterpart of the packet's frozen settings.
export type ThawedSettings = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ThawedSettings,
    {
      account: { name: string; contact?: { email: string } };
      tags: string[];
      coordinates: [x: number, y: number];
    }
  >
>;
type _15b = Expect<Equal<ThawedSettings["tags"], string[]>>;
type _15c = Expect<Equal<ThawedSettings["coordinates"], [x: number, y: number]>>;
type _15d = Expect<Equal<ThawedSettings["account"]["contact"], { email: string } | undefined>>;
type _15e = Expect<
  Equal<
    {
      tags: ThawedSettings["tags"];
      hasPush: "push" extends keyof ThawedSettings["tags"] ? true : false;
    },
    { tags: string[]; hasPush: true }
  >
>;

// 16. Build the key filter that names exactly the properties this transform
//     rewrites.
//     Hint: two one-key mapped types that differ only in `readonly` are not the
//     same type, and the shared `Equal` primitive can see that difference.
export type ReadonlyKeysOf<Model> = TODO; // TODO(koan)

type _16a = Expect<Equal<ReadonlyKeysOf<GivenModifierModel>, "frozen" | "frozenOptional">>;
type _16b = Expect<Equal<ReadonlyKeysOf<{}>, never>>;
type _16c = Expect<Equal<ReadonlyKeysOf<{ a: 1; b: 2 }>, never>>;
type _16d = Expect<Equal<ReadonlyKeysOf<{ readonly a: 1; readonly b: 2 }>, "a" | "b">>;
type _16e = Expect<
  Equal<ReadonlyKeysOf<GivenFrozenSettings>, "account" | "tags" | "coordinates">
>;

// 17. Build the predicate that reports whether a type is already fully mutable.
export type IsDeeplyMutable<Value> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { mutable: IsDeeplyMutable<{ id: number }>; frozen: IsDeeplyMutable<{ readonly id: number }> },
    { mutable: true; frozen: false }
  >
>;
type _17b = Expect<
  Equal<
    { mutable: IsDeeplyMutable<string[]>; frozen: IsDeeplyMutable<readonly string[]> },
    { mutable: true; frozen: false }
  >
>;
type _17c = Expect<
  Equal<
    {
      atomic: IsDeeplyMutable<Date>;
      shallowOnly: IsDeeplyMutable<{ nested: { readonly id: number } }>;
    },
    { atomic: true; shallowOnly: false }
  >
>;
type _17d = Expect<
  Equal<
    { deep: IsDeeplyMutable<{ nested: { id: number } }>; tuple: IsDeeplyMutable<readonly [1]> },
    { deep: true; tuple: false }
  >
>;
type _17e = Expect<
  Equal<
    { empty: IsDeeplyMutable<{}>; optional: IsDeeplyMutable<{ value?: string }> },
    { empty: true; optional: true }
  >
>;

// 18. Build the cloning signatures the packet exports, including the visited map
//     that keeps a cyclic graph from being copied forever.
export type CloneRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    CloneRuntimeApi["cloneMutable"],
    <Value>(value: Value, seen?: WeakMap<object, unknown>) => DeepMutableOf<Value>
  >
>;
type _18b = Expect<
  Equal<
    CloneRuntimeApi["thawSettings"],
    (settings: GivenFrozenSettings) => DeepMutableOf<GivenFrozenSettings>
  >
>;
type _18c = Expect<Equal<Parameters<CloneRuntimeApi["thawSettings"]>[0], GivenFrozenSettings>>;
type _18d = Expect<
  Equal<ReturnType<CloneRuntimeApi["thawSettings"]>["coordinates"], [x: number, y: number]>
>;
type _18e = Expect<Equal<ReturnType<CloneRuntimeApi["cloneMutable"]>, unknown>>;

// 19. Build the round trip that shows the two capability transforms are inverse
//     on plain data but not on the opaque leaves either of them refuses to enter.
export type MutableRoundTrip<Value> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<MutableRoundTrip<{ readonly user: { readonly id: 1 } }>, { user: { id: 1 } }>
>;
type _19b = Expect<Equal<MutableRoundTrip<readonly [1, 2]>, [1, 2]>>;
type _19c = Expect<Equal<MutableRoundTrip<Date>, Date>>;
type _19d = Expect<
  Equal<MutableRoundTrip<{ readonly value?: string }>, { value?: string }>
>;
type _19e = Expect<
  Equal<
    {
      once: DeepMutableOf<readonly string[]>;
      twice: MutableRoundTrip<readonly string[]>;
    },
    { once: string[]; twice: string[] }
  >
>;
