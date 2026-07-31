import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-107: recursion base cases and leaves — constructions
 * =============================================================================
 *
 * These constructions build an explicit leaf policy: the primitive and opaque
 * object domains that stop recursion, the non-distributive test that classifies
 * them, and the decision tree that unwraps arrays and object properties down to
 * their leaf values. Constructions 7 onward apply the `LeafValuesOf` policy you
 * build in construction 6, so its branch order — intercept `any`, stop at an
 * atomic value, recurse into elements, recurse into properties, otherwise stop —
 * decides their answers too. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

type GivenModel = {
  user: { id: number; name: string };
  flags: readonly boolean[];
};

interface GivenCycle {
  value: number;
  next: GivenCycle;
}

type GivenKeyModel = {
  id: number;
  when: Date;
  nested: { x: 1 };
  items: readonly string[];
  maybe?: string;
};

// ─── The vocabulary of leaves ─────────────────────────────────────────

// 1. Build the primitive domain that always stops recursion.
export type PrimitiveLeaf = TODO; // TODO(koan)

type _01a = Expect<
  Equal<PrimitiveLeaf, string | number | boolean | bigint | symbol | null | undefined>
>;
type _01b = Expect<Equal<Extract<PrimitiveLeaf, bigint>, bigint>>;
type _01c = Expect<Equal<Extract<PrimitiveLeaf, null | undefined>, null | undefined>>;
type _01d = Expect<Equal<Extract<PrimitiveLeaf, boolean>, boolean>>;
type _01e = Expect<
  Equal<
    { domain: PrimitiveLeaf; accepts: Date extends PrimitiveLeaf ? true : false },
    {
      domain: string | number | boolean | bigint | symbol | null | undefined;
      accepts: false;
    }
  >
>;

// 2. Build the maximally permissive call signature that treats any function as a leaf.
export type CallableLeaf = TODO; // TODO(koan)

type _02a = Expect<Equal<CallableLeaf, (...args: any[]) => unknown>>;
type _02b = Expect<Equal<ReturnType<CallableLeaf>, unknown>>;
type _02c = Expect<Equal<Parameters<CallableLeaf>, any[]>>;
type _02d = Expect<
  Equal<
    {
      domain: CallableLeaf;
      accepts: ((value: number) => string) extends CallableLeaf ? true : false;
    },
    { domain: (...args: any[]) => unknown; accepts: true }
  >
>;
type _02e = Expect<
  Equal<
    { domain: CallableLeaf; accepts: Date extends CallableLeaf ? true : false },
    { domain: (...args: any[]) => unknown; accepts: false }
  >
>;

// 3. Build the full atomic domain: primitives plus the opaque built-in objects
//    whose method surfaces must never be traversed.
export type AtomicLeaf = TODO; // TODO(koan)

type _03a = Expect<Equal<Extract<AtomicLeaf, Date>, Date>>;
type _03b = Expect<Equal<Extract<AtomicLeaf, RegExp>, RegExp>>;
type _03c = Expect<
  Equal<
    {
      extracted: Extract<AtomicLeaf, Map<unknown, unknown>>;
      accepts: Map<string, number> extends AtomicLeaf ? true : false;
    },
    { extracted: Map<unknown, unknown>; accepts: true }
  >
>;
type _03d = Expect<
  Equal<
    {
      extracted: Extract<AtomicLeaf, Promise<unknown>>;
      accepts: Promise<1> extends AtomicLeaf ? true : false;
    },
    { extracted: Promise<unknown>; accepts: true }
  >
>;
type _03e = Expect<
  Equal<
    {
      extracted: Extract<AtomicLeaf, Set<unknown>>;
      accepts: { id: number } extends AtomicLeaf ? true : false;
    },
    { extracted: Set<unknown>; accepts: false }
  >
>;

// 4. Build the leaf test that judges a whole type at once.
//    `string | Date` is atomic, but `string | { id: number }` is not.
//    Hint: wrapping both sides in a one-element tuple suppresses distribution.
export type IsAtomicValue<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<IsAtomicValue<{ id: number }>, false>>;
type _04b = Expect<Equal<IsAtomicValue<string | Date>, true>>;
type _04c = Expect<Equal<IsAtomicValue<string | { id: number }>, false>>;
type _04d = Expect<Equal<IsAtomicValue<never>, true>>;
type _04e = Expect<Equal<IsAtomicValue<unknown>, false>>;

// ─── Unwrapping containers ────────────────────────────────────────────

// 5. Build the operator that strips every layer of array nesting.
//    `string[][][]` becomes `string`.
export type DeepArrayElement<Value> = TODO; // TODO(koan)

type _05a = Expect<Equal<DeepArrayElement<string>, string>>;
type _05b = Expect<Equal<DeepArrayElement<string[][][]>, string>>;
type _05c = Expect<Equal<DeepArrayElement<readonly [1, 2]>, 1 | 2>>;
type _05d = Expect<Equal<DeepArrayElement<readonly [1, readonly [2]]>, 1 | 2>>;
type _05e = Expect<Equal<DeepArrayElement<never[]>, never>>;

// 6. Build the whole leaf decision tree: intercept `any`, stop at an atomic
//    value, recurse into array elements, union the leaves of every declared
//    property, and otherwise stop.
//    Hint: branch order matters because arrays and functions are also objects,
//    and `any` must be caught before it satisfies every conditional at once.
export type LeafValuesOf<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<LeafValuesOf<GivenModel>, number | string | boolean>>;
type _06b = Expect<Equal<LeafValuesOf<Date>, Date>>;
type _06c = Expect<Equal<LeafValuesOf<readonly []>, never>>;
type _06d = Expect<Equal<LeafValuesOf<{ value?: string }>, string | undefined>>;
type _06e = Expect<
  Equal<
    { anyStaysAny: GivenIsAny<LeafValuesOf<any>>; unknownStops: LeafValuesOf<unknown> },
    { anyStaysAny: true; unknownStops: unknown }
  >
>;

// ─── Where the policy stops ───────────────────────────────────────────

// 7. Report each primitive stopping at itself.
export type PrimitiveStopProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<PrimitiveStopProfile["string"], string>>;
type _07b = Expect<Equal<PrimitiveStopProfile["bigint"], bigint>>;
type _07c = Expect<Equal<PrimitiveStopProfile["symbol"], symbol>>;
type _07d = Expect<Equal<PrimitiveStopProfile["null"], null>>;
type _07e = Expect<Equal<PrimitiveStopProfile["undefined"], undefined>>;

// 8. Report each opaque built-in surviving as one whole leaf.
export type OpaqueObjectStopProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<OpaqueObjectStopProfile["date"], Date>>;
type _08b = Expect<Equal<OpaqueObjectStopProfile["regexp"], RegExp>>;
type _08c = Expect<Equal<OpaqueObjectStopProfile["callable"], () => string>>;
type _08d = Expect<Equal<OpaqueObjectStopProfile["map"], Map<string, number>>>;
type _08e = Expect<Equal<OpaqueObjectStopProfile["set"], Set<boolean>>>;

// 9. Report the leaves that array containers contribute.
export type ArrayLeafProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ArrayLeafProfile["singleton"], 1>>;
type _09b = Expect<Equal<ArrayLeafProfile["mixedTuple"], 1 | "x" | true>>;
type _09c = Expect<Equal<ArrayLeafProfile["nestedTuple"], 1 | "x" | true>>;
type _09d = Expect<Equal<ArrayLeafProfile["unbounded"], string>>;
type _09e = Expect<Equal<ArrayLeafProfile["nestedUnion"], string | number>>;

// 10. Report the empty key and element domains that contribute no leaves.
export type EmptyContainerProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<EmptyContainerProfile["emptyObject"], never>>;
type _10b = Expect<Equal<EmptyContainerProfile["emptyTuple"], never>>;
type _10c = Expect<Equal<EmptyContainerProfile["neverArray"], never>>;
type _10d = Expect<Equal<EmptyContainerProfile["neverRecord"], never>>;
type _10e = Expect<Equal<EmptyContainerProfile["neverProperty"], never>>;

// 11. Report the leaves that declared object properties contribute.
export type ObjectLeafProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ObjectLeafProfile["single"], number>>;
type _11b = Expect<Equal<ObjectLeafProfile["several"], number | string>>;
type _11c = Expect<Equal<ObjectLeafProfile["nested"], "leaf">>;
type _11d = Expect<Equal<ObjectLeafProfile["tupleProperty"], 1 | 2>>;
type _11e = Expect<Equal<ObjectLeafProfile["indexSignature"], number>>;

// 12. Report how optional properties reach the leaf union through their read type.
export type OptionalPropertyLeafProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<OptionalPropertyLeafProfile["optionalString"], string | undefined>>;
type _12b = Expect<Equal<OptionalPropertyLeafProfile["optionalNever"], undefined>>;
type _12c = Expect<Equal<OptionalPropertyLeafProfile["optionalUnknown"], unknown>>;
type _12d = Expect<Equal<OptionalPropertyLeafProfile["optionalAny"], true>>;
type _12e = Expect<
  Equal<OptionalPropertyLeafProfile["explicitUndefined"], string | undefined>
>;

// 13. Report models that mix opaque leaves with traversable data.
export type MixedContainerProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<MixedContainerProfile["functionAndData"], (() => string) | number>>;
type _13b = Expect<Equal<MixedContainerProfile["builtins"], Date | RegExp>>;
type _13c = Expect<
  Equal<MixedContainerProfile["collections"], Map<string, number> | Set<boolean>>
>;
type _13d = Expect<Equal<MixedContainerProfile["promiseAndValue"], Promise<1> | 2>>;
type _13e = Expect<Equal<MixedContainerProfile["readonlyNested"], 1 | 2>>;

// 14. Report how the decision tree distributes across union inputs.
export type UnionDistributionProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<UnionDistributionProfile["primitives"], string | number>>;
type _14b = Expect<Equal<UnionDistributionProfile["objects"], 1 | 2>>;
type _14c = Expect<Equal<UnionDistributionProfile["tupleOrObject"], 1 | 2>>;
type _14d = Expect<Equal<UnionDistributionProfile["atomicOrObject"], Date | number>>;
type _14e = Expect<Equal<UnionDistributionProfile["withNever"], string>>;

// 15. Report the deliberately different paths taken by the top and bottom types.
export type TopAndBottomProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<TopAndBottomProfile["any"], true>>;
type _15b = Expect<Equal<TopAndBottomProfile["unknown"], unknown>>;
type _15c = Expect<Equal<TopAndBottomProfile["never"], never>>;
type _15d = Expect<Equal<TopAndBottomProfile["unknownArray"], unknown>>;
type _15e = Expect<Equal<TopAndBottomProfile["anyArray"], true>>;

// 16. Report how intersections change which branch is selected.
export type IntersectionProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<IntersectionProfile["objectIntersection"], 1 | 2>>;
type _16b = Expect<Equal<IntersectionProfile["atomicIntersection"], Date & { tag: "x" }>>;
type _16c = Expect<
  Equal<IntersectionProfile["primitiveIntersection"], string & { tag: "x" }>
>;
type _16d = Expect<Equal<IntersectionProfile["widenedUnion"], unknown>>;
type _16e = Expect<Equal<IntersectionProfile["narrowedUnion"], 1>>;

// 17. Report a cyclic interface. Its payload still classifies normally, but the
//     self-reference is why a runtime traversal needs its own visited-set guard:
//     mapping the policy over the whole cycle is not a terminating description.
export type CyclicLeafProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<CyclicLeafProfile["payloadLeaf"], number>>;
type _17b = Expect<Equal<CyclicLeafProfile["next"], GivenCycle>>;
type _17c = Expect<Equal<CyclicLeafProfile["keys"], "value" | "next">>;
type _17d = Expect<Equal<CyclicLeafProfile["shape"], true>>;
type _17e = Expect<Equal<CyclicLeafProfile["atomic"], false>>;

// ─── Reusable policy surfaces ─────────────────────────────────────────

// 18. Build the arbitrarily nested readonly array family whose leaves are `Value`.
export type NestedArrayOf<Value> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    { family: NestedArrayOf<string>; accepts: "x" extends NestedArrayOf<string> ? true : false },
    { family: string | readonly NestedArrayOf<string>[]; accepts: true }
  >
>;
type _18b = Expect<
  Equal<
    {
      family: NestedArrayOf<string>;
      accepts: readonly [] extends NestedArrayOf<string> ? true : false;
    },
    { family: string | readonly NestedArrayOf<string>[]; accepts: true }
  >
>;
type _18c = Expect<
  Equal<
    {
      family: NestedArrayOf<string>;
      accepts: readonly ["x", readonly ["y"]] extends NestedArrayOf<string> ? true : false;
    },
    { family: string | readonly NestedArrayOf<string>[]; accepts: true }
  >
>;
type _18d = Expect<
  Equal<
    {
      family: NestedArrayOf<string>;
      accepts: readonly [1] extends NestedArrayOf<string> ? true : false;
    },
    { family: string | readonly NestedArrayOf<string>[]; accepts: false }
  >
>;
type _18e = Expect<Equal<DeepArrayElement<readonly ["x", readonly ["y"]]>, "x" | "y">>;

// 19. Build the key filter that keeps only properties whose whole type is atomic.
//     `{ id: number; nested: { x: 1 } }` yields `"id"`.
//     Hint: removing optionality inside the mapped type keeps `undefined` out of
//     the key union it produces.
export type AtomicKeysOf<Model> = TODO; // TODO(koan)

type _19a = Expect<Equal<AtomicKeysOf<GivenKeyModel>, "id" | "when" | "maybe">>;
type _19b = Expect<Equal<AtomicKeysOf<{}>, never>>;
type _19c = Expect<Equal<AtomicKeysOf<{ a: string; b: number }>, "a" | "b">>;
type _19d = Expect<Equal<AtomicKeysOf<{ a: { x: 1 }; b: readonly [1] }>, never>>;
type _19e = Expect<Equal<AtomicKeysOf<{ fn: () => void; data: { x: 1 } }>, "fn">>;

// 20. Build the traversal signatures the packet exports, including the cycle
//     guard that the static leaf union cannot express.
export type LeafRuntimeApi = TODO; // TODO(koan)

type _20a = Expect<
  Equal<LeafRuntimeApi["collectLeaves"], (value: unknown, active?: Set<object>) => unknown[]>
>;
type _20b = Expect<Equal<LeafRuntimeApi["leafCount"], (value: unknown) => number>>;
type _20c = Expect<
  Equal<LeafRuntimeApi["flattenNested"], <Value>(value: NestedArrayOf<Value>) => Value[]>
>;
type _20d = Expect<Equal<ReturnType<LeafRuntimeApi["collectLeaves"]>, unknown[]>>;
type _20e = Expect<Equal<ReturnType<LeafRuntimeApi["leafCount"]>, number>>;
