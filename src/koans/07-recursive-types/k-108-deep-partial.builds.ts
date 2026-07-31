import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-108: DeepPartial — constructions
 * =============================================================================
 *
 * These constructions build a recursive optionality transform. The hard part is
 * not the object branch but the boundaries around it: atomic values stop before
 * their method surfaces are rewritten, broad arrays transform their element type
 * while keeping mutable or readonly capability, and finite tuples instead make
 * each position optional without losing tuple identity. Constructions 3 onward
 * apply the `DeepPartialOf` transform you build in construction 2. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

type GivenState = { kind: "idle" } | { kind: "ready"; data: { value: number } };

declare const givenToken: unique symbol;
type GivenSymbolic = { [givenToken]: { value: number }; name: string };

type GivenPatchModel = {
  id: number;
  when: Date;
  nested: { x: 1 };
  items: readonly string[];
  fn: () => void;
};

interface GivenSettings {
  readonly account: {
    readonly name: string;
    readonly contact: { readonly email: string; readonly phone?: string };
  };
  readonly theme: { readonly mode: "light" | "dark"; readonly contrast: number };
  readonly tags: readonly string[];
}

// ─── The transform ────────────────────────────────────────────────────

// 1. Build the atomic domain that must stop the recursion before its methods
//    are turned into optional properties.
export type PatchAtomic = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<PatchAtomic, Date>, Date>>;
type _01b = Expect<Equal<Extract<PatchAtomic, bigint | symbol>, bigint | symbol>>;
type _01c = Expect<
  Equal<
    {
      extracted: Extract<PatchAtomic, Set<unknown>>;
      accepts: Promise<1> extends PatchAtomic ? true : false;
    },
    { extracted: Set<unknown>; accepts: true }
  >
>;
type _01d = Expect<
  Equal<
    {
      extracted: Extract<PatchAtomic, RegExp>;
      accepts: { id: number } extends PatchAtomic ? true : false;
    },
    { extracted: RegExp; accepts: false }
  >
>;
type _01e = Expect<
  Equal<
    {
      extracted: Extract<PatchAtomic, null | undefined>;
      accepts: readonly number[] extends PatchAtomic ? true : false;
    },
    { extracted: null | undefined; accepts: false }
  >
>;

// 2. Build the recursive optionality transform: intercept `any`, return atomic
//    values unchanged, transform broad array elements while preserving mutable
//    or readonly capability, make finite tuple positions optional, make object
//    properties optional and recurse into their values, and otherwise stop.
//    `{ user: { id: number } }` becomes `{ user?: { id?: number } }`.
//    Hint: `number extends Value["length"]` separates a broad array from a
//    finite tuple, and a second check separates mutable arrays from readonly.
export type DeepPartialOf<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<DeepPartialOf<{ user: { id: number } }>, { user?: { id?: number } }>>;
type _02b = Expect<Equal<DeepPartialOf<Date>, Date>>;
type _02c = Expect<Equal<DeepPartialOf<Array<{ id: number }>>, Array<{ id?: number }>>>;
type _02d = Expect<Equal<DeepPartialOf<readonly [1, 2]>, readonly [1?, 2?]>>;
type _02e = Expect<Equal<DeepPartialOf<{}>, {}>>;

// ─── Leaves and plain objects ─────────────────────────────────────────

// 3. Report the atomic values that survive the transform unchanged.
export type PatchAtomicProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<PatchAtomicProfile["string"], string>>;
type _03b = Expect<Equal<PatchAtomicProfile["date"], Date>>;
type _03c = Expect<Equal<PatchAtomicProfile["callable"], (value: number) => string>>;
type _03d = Expect<Equal<PatchAtomicProfile["map"], Map<string, { id: number }>>>;
type _03e = Expect<Equal<PatchAtomicProfile["promise"], Promise<{ id: number }>>>;

// 4. Report optionality reaching every level of a nested object.
export type NestedObjectPatchProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<NestedObjectPatchProfile["flat"], { id?: number; name?: string }>>;
type _04b = Expect<Equal<NestedObjectPatchProfile["oneLevel"], { user?: { id?: number } }>>;
type _04c = Expect<
  Equal<NestedObjectPatchProfile["twoLevels"], { user?: { profile?: { name?: string } } }>
>;
type _04d = Expect<Equal<NestedObjectPatchProfile["read"], { id?: number } | undefined>>;
type _04e = Expect<Equal<NestedObjectPatchProfile["reachable"], number | undefined>>;

// 5. Report how existing optionality and `readonly` modifiers survive.
export type ModifierPatchProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<ModifierPatchProfile["alreadyOptional"], { value?: string }>>;
type _05b = Expect<
  Equal<ModifierPatchProfile["optionalObject"], { value?: { nested?: number } }>
>;
type _05c = Expect<Equal<ModifierPatchProfile["readonlyFlat"], { readonly id?: number }>>;
type _05d = Expect<
  Equal<ModifierPatchProfile["readonlyNested"], { readonly nested?: { readonly id?: number } }>
>;
type _05e = Expect<
  Equal<ModifierPatchProfile["mixedLeaves"], { date?: Date; data?: { id?: number } }>
>;

// ─── Arrays and tuples take different branches ────────────────────────

// 6. Report broad arrays transforming elements while keeping their capability.
export type BroadArrayPatchProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<BroadArrayPatchProfile["mutable"], Array<{ id?: number }>>>;
type _06b = Expect<Equal<BroadArrayPatchProfile["readonlyArray"], readonly { id?: number }[]>>;
type _06c = Expect<Equal<BroadArrayPatchProfile["nested"], Array<Array<{ id?: number }>>>>;
type _06d = Expect<Equal<BroadArrayPatchProfile["neverArray"], never[]>>;
type _06e = Expect<Equal<BroadArrayPatchProfile["unknownArray"], unknown[]>>;

// 7. Report the capability and length evidence that separates the two branches.
export type ArrayCapabilityProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<ArrayCapabilityProfile["mutablePush"], true>>;
type _07b = Expect<Equal<ArrayCapabilityProfile["readonlyPush"], false>>;
type _07c = Expect<Equal<ArrayCapabilityProfile["arrayLength"], number>>;
type _07d = Expect<Equal<ArrayCapabilityProfile["tupleLength"], 0 | 1 | 2>>;
type _07e = Expect<Equal<ArrayCapabilityProfile["readonlySurvives"], true>>;

// 8. Report finite tuples making each position optional.
export type TuplePatchProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<TuplePatchProfile["empty"], []>>;
type _08b = Expect<Equal<TuplePatchProfile["single"], [1?]>>;
type _08c = Expect<Equal<TuplePatchProfile["pair"], [1?, 2?]>>;
type _08d = Expect<Equal<TuplePatchProfile["readonlyPair"], readonly [1?, 2?]>>;
type _08e = Expect<
  Equal<TuplePatchProfile["objects"], readonly [{ id?: number }?, { name?: string }?]>
>;

// 9. Report labelled, already-optional, and rest-element tuples, where a rest
//    element makes the length broad and selects the array branch instead.
export type TupleShapeProfile = TODO; // TODO(koan)

type _09a = Expect<
  Equal<TupleShapeProfile["labelled"], [left?: { id?: number }, right?: string]>
>;
type _09b = Expect<Equal<TupleShapeProfile["alreadyOptional"], [value?: { id?: number }]>>;
type _09c = Expect<Equal<TupleShapeProfile["withRest"], ({ id?: number } | string)[]>>;
type _09d = Expect<Equal<TupleShapeProfile["firstPosition"], 1 | undefined>>;
type _09e = Expect<Equal<TupleShapeProfile["mixedTupleLength"], 0 | 1 | 2>>;

// ─── Unions, discriminants, and the patch boundary ────────────────────

// 10. Report the transform distributing across union members.
export type UnionPatchProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<UnionPatchProfile["objects"], { x?: 1 } | { y?: 2 }>>;
type _10b = Expect<Equal<UnionPatchProfile["tuples"], readonly [1?] | readonly [2?, 3?]>>;
type _10c = Expect<Equal<UnionPatchProfile["arrayOrObject"], string[] | { id?: number }>>;
type _10d = Expect<Equal<UnionPatchProfile["atomicOrObject"], Date | { id?: number }>>;
type _10e = Expect<Equal<UnionPatchProfile["withNever"], { id?: number }>>;

// 11. Report the discriminant weakening that makes a patch type unsafe to match on.
export type DiscriminantWeakeningProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    DiscriminantWeakeningProfile["patched"],
    { kind?: "idle" } | { kind?: "ready"; data?: { value?: number } }
  >
>;
type _11b = Expect<Equal<DiscriminantWeakeningProfile["tag"], "idle" | "ready" | undefined>>;
type _11c = Expect<Equal<DiscriminantWeakeningProfile["acceptsEmpty"], true>>;
type _11d = Expect<Equal<DiscriminantWeakeningProfile["acceptsPartialReady"], true>>;
type _11e = Expect<Equal<DiscriminantWeakeningProfile["acceptsUnknownTag"], false>>;

// 12. Report the difference between an optional read and an exact optional write.
export type ExactOptionalPatchProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ExactOptionalPatchProfile["read"], { value?: number } | undefined>>;
type _12b = Expect<Equal<ExactOptionalPatchProfile["reachable"], number | undefined>>;
type _12c = Expect<Equal<ExactOptionalPatchProfile["acceptsOmitted"], true>>;
type _12d = Expect<Equal<ExactOptionalPatchProfile["acceptsEmptyNested"], true>>;
type _12e = Expect<Equal<ExactOptionalPatchProfile["acceptsExplicitUndefined"], false>>;

// ─── Index signatures, symbols, and extreme sources ───────────────────

// 13. Report index signatures, whose members cannot be marked optional and
//     instead admit `undefined` in their value type.
export type IndexSignaturePatchProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    IndexSignaturePatchProfile["stringIndex"],
    { [key: string]: { id?: number } | undefined }
  >
>;
type _13b = Expect<
  Equal<IndexSignaturePatchProfile["stringMember"], { id?: number } | undefined>
>;
type _13c = Expect<
  Equal<
    IndexSignaturePatchProfile["numberIndex"],
    { [key: number]: { id?: number } | undefined }
  >
>;
type _13d = Expect<
  Equal<IndexSignaturePatchProfile["neverValues"], { [key: string]: undefined }>
>;
type _13e = Expect<Equal<IndexSignaturePatchProfile["emptyObject"], {}>>;

// 14. Report symbol-keyed properties transforming like any other declared key.
export type SymbolKeyPatchProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    SymbolKeyPatchProfile["patched"],
    { [givenToken]?: { value?: number }; name?: string }
  >
>;
type _14b = Expect<Equal<SymbolKeyPatchProfile["symbolMember"], { value?: number } | undefined>>;
type _14c = Expect<Equal<SymbolKeyPatchProfile["stringMember"], string | undefined>>;
type _14d = Expect<Equal<SymbolKeyPatchProfile["keys"], typeof givenToken | "name">>;
type _14e = Expect<Equal<SymbolKeyPatchProfile["reachable"], number | undefined>>;

// 15. Report the boundaries taken by the top and bottom types.
export type TopAndBottomPatchProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<TopAndBottomPatchProfile["any"], true>>;
type _15b = Expect<Equal<TopAndBottomPatchProfile["unknown"], unknown>>;
type _15c = Expect<Equal<TopAndBottomPatchProfile["never"], never>>;
type _15d = Expect<Equal<TopAndBottomPatchProfile["unionWithUnknown"], unknown>>;
type _15e = Expect<Equal<TopAndBottomPatchProfile["primitiveUnion"], string | number>>;

// ─── Patch surfaces built on the transform ────────────────────────────

// 16. Build the patch shape for the packet's settings model.
export type SettingsPatch = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    SettingsPatch,
    {
      readonly account?: {
        readonly name?: string;
        readonly contact?: { readonly email?: string; readonly phone?: string };
      };
      readonly theme?: { readonly mode?: "light" | "dark"; readonly contrast?: number };
      readonly tags?: readonly string[];
    }
  >
>;
type _16b = Expect<Equal<NonNullable<SettingsPatch["theme"]>["contrast"], number | undefined>>;
type _16c = Expect<
  Equal<
    NonNullable<NonNullable<SettingsPatch["account"]>["contact"]>["phone"],
    string | undefined
  >
>;
type _16d = Expect<Equal<SettingsPatch["tags"], readonly string[] | undefined>>;
type _16e = Expect<
  Equal<
    { patch: SettingsPatch; acceptsEmpty: {} extends SettingsPatch ? true : false },
    {
      patch: {
        readonly account?: {
          readonly name?: string;
          readonly contact?: { readonly email?: string; readonly phone?: string };
        };
        readonly theme?: { readonly mode?: "light" | "dark"; readonly contrast?: number };
        readonly tags?: readonly string[];
      };
      acceptsEmpty: true;
    }
  >
>;

// 17. Build the patch variant that keeps a union's discriminant required so the
//     result can still be matched on, while everything else stays optional.
//     Hint: distributing first lets each member contribute its own literal tag.
export type TaggedPatch<Value extends { kind: string }> = TODO; // TODO(koan)

type _17a = Expect<Equal<TaggedPatch<GivenState>["kind"], "idle" | "ready">>;
type _17b = Expect<
  Equal<
    {
      tag: TaggedPatch<GivenState>["kind"];
      accepts: { kind: "idle" } extends TaggedPatch<GivenState> ? true : false;
    },
    { tag: "idle" | "ready"; accepts: true }
  >
>;
type _17c = Expect<
  Equal<
    {
      tag: TaggedPatch<GivenState>["kind"];
      accepts: {} extends TaggedPatch<GivenState> ? true : false;
    },
    { tag: "idle" | "ready"; accepts: false }
  >
>;
type _17d = Expect<
  Equal<
    {
      tag: TaggedPatch<GivenState>["kind"];
      accepts: { kind: "ready"; data: {} } extends TaggedPatch<GivenState> ? true : false;
    },
    { tag: "idle" | "ready"; accepts: true }
  >
>;
type _17e = Expect<
  Equal<
    {
      tag: TaggedPatch<GivenState>["kind"];
      accepts: { kind: "other" } extends TaggedPatch<GivenState> ? true : false;
    },
    { tag: "idle" | "ready"; accepts: false }
  >
>;

// 18. Build the key filter that selects only the properties the transform
//     actually recurses into.
export type PatchableKeysOf<Model> = TODO; // TODO(koan)

type _18a = Expect<Equal<PatchableKeysOf<GivenPatchModel>, "nested" | "items">>;
type _18b = Expect<Equal<PatchableKeysOf<{}>, never>>;
type _18c = Expect<Equal<PatchableKeysOf<{ a: string; b: number }>, never>>;
type _18d = Expect<Equal<PatchableKeysOf<{ a: { x: 1 }; b: [1] }>, "a" | "b">>;
type _18e = Expect<Equal<PatchableKeysOf<{ maybe?: { x: 1 } }>, "maybe">>;

// 19. Build the patch-application signatures the packet exports.
export type PatchRuntimeApi = TODO; // TODO(koan)

type _19a = Expect<
  Equal<PatchRuntimeApi["applyPatch"], <Value>(base: Value, patch: DeepPartialOf<Value>) => Value>
>;
type _19b = Expect<
  Equal<
    PatchRuntimeApi["updateSettings"],
    (settings: GivenSettings, patch: DeepPartialOf<GivenSettings>) => GivenSettings
  >
>;
type _19c = Expect<
  Equal<Parameters<PatchRuntimeApi["updateSettings"]>[1], DeepPartialOf<GivenSettings>>
>;
type _19d = Expect<Equal<ReturnType<PatchRuntimeApi["updateSettings"]>, GivenSettings>>;
type _19e = Expect<Equal<ReturnType<PatchRuntimeApi["applyPatch"]>, unknown>>;
