import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-110: DeepRequired — constructions
 * =============================================================================
 *
 * These constructions build a recursive presence guarantee. The distinction that
 * carries the whole lesson is that `-?` removes the ability to omit a property,
 * not the ability to hold `undefined`: under exact optional properties,
 * `{ x?: string }` and `{ x?: string | undefined }` become genuinely different
 * required shapes. Readonly is orthogonal and survives, broad arrays have no
 * optional positions to remove, and finite optional tuple positions become
 * required. Constructions 3 onward apply the `DeepRequiredOf` transform you build
 * in construction 2. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

type GivenUnion =
  | { kind: "a"; a?: { value?: number } }
  | { kind: "b"; b?: { value?: string } };

declare const givenToken: unique symbol;

interface GivenDraftOptions {
  server?: {
    host?: string;
    port?: number;
    tls?: { enabled?: boolean; certificate?: string | undefined };
  };
  logging?: { level?: "debug" | "info" | "error"; outputs?: string[] };
}

type GivenOptionalityModel = {
  required: number;
  optional?: string;
  readonly readonlyOptional?: boolean;
  explicitUndefined: string | undefined;
  optionalUndefined?: string | undefined;
};

// ─── The transform ────────────────────────────────────────────────────

// 1. Build the atomic domain that stops the recursion. Note that `undefined` is
//    itself an atomic value here, which is why an explicitly declared
//    `| undefined` survives while an omittable property does not.
export type RequiredAtomic = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<RequiredAtomic, undefined>, undefined>>;
type _01b = Expect<Equal<Extract<RequiredAtomic, Date | RegExp>, Date | RegExp>>;
type _01c = Expect<
  Equal<
    {
      extracted: Extract<RequiredAtomic, bigint>;
      accepts: Map<string, number> extends RequiredAtomic ? true : false;
    },
    { extracted: bigint; accepts: true }
  >
>;
type _01d = Expect<
  Equal<
    {
      extracted: Extract<RequiredAtomic, null>;
      accepts: { id?: number } extends RequiredAtomic ? true : false;
    },
    { extracted: null; accepts: false }
  >
>;
type _01e = Expect<
  Equal<
    {
      extracted: Extract<RequiredAtomic, symbol>;
      accepts: readonly number[] extends RequiredAtomic ? true : false;
    },
    { extracted: symbol; accepts: false }
  >
>;

// 2. Build the recursive presence transform: intercept `any`, return atomic
//    values unchanged, transform broad array elements while preserving mutable
//    or readonly capability, make finite tuple positions required, make object
//    properties required and recurse into their values, and otherwise stop.
//    `{ user?: { id?: number } }` becomes `{ user: { id: number } }`.
//    Hint: the `-?` modifier belongs on the mapped key, and it removes only the
//    optionality that the source declared.
export type DeepRequiredOf<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<DeepRequiredOf<{ user?: { id?: number } }>, { user: { id: number } }>>;
type _02b = Expect<Equal<DeepRequiredOf<Date>, Date>>;
type _02c = Expect<Equal<DeepRequiredOf<Array<{ id?: number }>>, Array<{ id: number }>>>;
type _02d = Expect<Equal<DeepRequiredOf<[value?: string]>, [value: string]>>;
type _02e = Expect<Equal<DeepRequiredOf<{}>, {}>>;

// ─── Leaves and nested presence ───────────────────────────────────────

// 3. Report the atomic values that pass through unchanged, including a callable
//    whose own optional parameter is none of this transform's business.
export type RequiredAtomicProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<RequiredAtomicProfile["string"], string>>;
type _03b = Expect<Equal<RequiredAtomicProfile["undefined"], undefined>>;
type _03c = Expect<Equal<RequiredAtomicProfile["date"], Date>>;
type _03d = Expect<
  Equal<RequiredAtomicProfile["optionalParameterCallable"], (value?: number) => string>
>;
type _03e = Expect<Equal<RequiredAtomicProfile["map"], Map<string, number>>>;

// 4. Report optionality disappearing at every object layer.
export type NestedRequirednessProfile = TODO; // TODO(koan)

type _04a = Expect<
  Equal<NestedRequirednessProfile["flat"], { id: number; name: string }>
>;
type _04b = Expect<Equal<NestedRequirednessProfile["oneLevel"], { user: { id: number } }>>;
type _04c = Expect<
  Equal<
    NestedRequirednessProfile["threeLevels"],
    { user: { name: string; address: { city: string; zip: number } } }
  >
>;
type _04d = Expect<Equal<NestedRequirednessProfile["read"], { id: number }>>;
type _04e = Expect<Equal<NestedRequirednessProfile["reachable"], number>>;

// 5. Report the central distinction: omittable syntax is removed, an explicitly
//    declared `undefined` value domain is not.
export type OptionalVersusUndefinedProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<OptionalVersusUndefinedProfile["optionalOnly"], { x: string }>>;
type _05b = Expect<
  Equal<OptionalVersusUndefinedProfile["optionalUndefined"], { x: string | undefined }>
>;
type _05c = Expect<
  Equal<OptionalVersusUndefinedProfile["requiredUndefined"], { x: string | undefined }>
>;
type _05d = Expect<
  Equal<OptionalVersusUndefinedProfile["nestedUndefined"], { x: { y: number | undefined } }>
>;
type _05e = Expect<Equal<OptionalVersusUndefinedProfile["optionalNever"], { x: never }>>;

// 6. Report the membership consequences of that distinction.
export type PresenceMembershipProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<PresenceMembershipProfile["omitted"], false>>;
type _06b = Expect<Equal<PresenceMembershipProfile["undefinedAgainstOptional"], false>>;
type _06c = Expect<Equal<PresenceMembershipProfile["undefinedAgainstUndefined"], true>>;
type _06d = Expect<Equal<PresenceMembershipProfile["present"], true>>;
type _06e = Expect<Equal<PresenceMembershipProfile["nestedOmitted"], false>>;

// 7. Report `readonly` being orthogonal to presence and surviving untouched.
export type ModifierOrthogonalityProfile = TODO; // TODO(koan)

type _07a = Expect<
  Equal<ModifierOrthogonalityProfile["readonlyOptional"], { readonly value: string }>
>;
type _07b = Expect<
  Equal<
    ModifierOrthogonalityProfile["readonlyNested"],
    { readonly nested: { readonly id: number } }
  >
>;
type _07c = Expect<Equal<ModifierOrthogonalityProfile["alreadyRequired"], { value: string }>>;
type _07d = Expect<Equal<ModifierOrthogonalityProfile["readonlyTuple"], readonly [a: 1, b: 2]>>;
type _07e = Expect<
  Equal<ModifierOrthogonalityProfile["mixedLeaves"], { date: Date; nested: { id: number } }>
>;

// ─── Arrays and tuples ────────────────────────────────────────────────

// 8. Report broad arrays, which have no optional positions to remove and so only
//    transform their element type.
export type BroadArrayRequiredProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<BroadArrayRequiredProfile["mutable"], Array<{ id: number }>>>;
type _08b = Expect<
  Equal<BroadArrayRequiredProfile["readonlyArray"], readonly { id: number }[]>
>;
type _08c = Expect<Equal<BroadArrayRequiredProfile["primitives"], string[]>>;
type _08d = Expect<Equal<BroadArrayRequiredProfile["neverArray"], never[]>>;
type _08e = Expect<Equal<BroadArrayRequiredProfile["unknownArray"], unknown[]>>;

// 9. Report the capability and length evidence separating the two array branches.
export type ArrayCapabilityProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ArrayCapabilityProfile["mutablePush"], true>>;
type _09b = Expect<Equal<ArrayCapabilityProfile["readonlyPush"], false>>;
type _09c = Expect<Equal<ArrayCapabilityProfile["arrayLength"], number>>;
type _09d = Expect<Equal<ArrayCapabilityProfile["tupleLength"], 2>>;
type _09e = Expect<Equal<ArrayCapabilityProfile["acceptsCompleteTuple"], true>>;

// 10. Report optional tuple positions becoming required, and a rest element
//     instead making the length broad so the array branch is taken.
export type TupleRequiredProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<TupleRequiredProfile["empty"], []>>;
type _10b = Expect<Equal<TupleRequiredProfile["single"], [value: string]>>;
type _10c = Expect<
  Equal<TupleRequiredProfile["labelledPair"], [a: { id: number }, b: string]>
>;
type _10d = Expect<Equal<TupleRequiredProfile["readonlySingle"], readonly [a: { id: number }]>>;
type _10e = Expect<
  Equal<TupleRequiredProfile["withRest"], ({ id: number } | { value: string })[]>
>;

// ─── Keys the transform cannot enumerate ──────────────────────────────

// 11. Report index signatures, which recurse through their value type without
//     ever naming a concrete key.
export type IndexSignatureRequiredProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<IndexSignatureRequiredProfile["stringIndex"], { [key: string]: { id: number } }>
>;
type _11b = Expect<Equal<IndexSignatureRequiredProfile["stringMember"], { id: number }>>;
type _11c = Expect<
  Equal<IndexSignatureRequiredProfile["numberIndex"], { [key: number]: { id: number } }>
>;
type _11d = Expect<Equal<IndexSignatureRequiredProfile["emptyObject"], {}>>;
type _11e = Expect<Equal<IndexSignatureRequiredProfile["keys"], "a" | "b">>;

// 12. Report symbol-keyed optional properties becoming required like any other.
export type SymbolKeyRequiredProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<SymbolKeyRequiredProfile["required"], { [givenToken]: { id: number } }>
>;
type _12b = Expect<Equal<SymbolKeyRequiredProfile["member"], { id: number }>>;
type _12c = Expect<Equal<SymbolKeyRequiredProfile["reachable"], number>>;
type _12d = Expect<Equal<SymbolKeyRequiredProfile["keys"], typeof givenToken>>;
type _12e = Expect<Equal<SymbolKeyRequiredProfile["mixed"], typeof givenToken | "name">>;

// ─── Unions and extreme sources ───────────────────────────────────────

// 13. Report the transform distributing across union members without merging
//     their key sets into one all-keys object.
export type UnionRequiredProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<UnionRequiredProfile["objects"], { x: 1 } | { y: 2 }>>;
type _13b = Expect<Equal<UnionRequiredProfile["tuples"], [a: 1] | [b: 2, c: 3]>>;
type _13c = Expect<
  Equal<UnionRequiredProfile["arrayOrObject"], Array<{ id: number }> | { id: number }>
>;
type _13d = Expect<Equal<UnionRequiredProfile["atomicOrObject"], Date | { id: number }>>;
type _13e = Expect<Equal<UnionRequiredProfile["withNever"], { id: number }>>;

// 14. Report a discriminated union whose optional members are now mandatory, so
//     a bare tag no longer satisfies the shape.
export type DiscriminatedRequirednessProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    DiscriminatedRequirednessProfile["required"],
    { kind: "a"; a: { value: number } } | { kind: "b"; b: { value: string } }
  >
>;
type _14b = Expect<Equal<DiscriminatedRequirednessProfile["tag"], "a" | "b">>;
type _14c = Expect<Equal<DiscriminatedRequirednessProfile["keys"], "kind">>;
type _14d = Expect<Equal<DiscriminatedRequirednessProfile["acceptsTagOnly"], false>>;
type _14e = Expect<Equal<DiscriminatedRequirednessProfile["acceptsComplete"], true>>;

// 15. Report the boundaries taken by the top and bottom types.
export type TopAndBottomRequiredProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<TopAndBottomRequiredProfile["any"], true>>;
type _15b = Expect<Equal<TopAndBottomRequiredProfile["unknown"], unknown>>;
type _15c = Expect<Equal<TopAndBottomRequiredProfile["never"], never>>;
type _15d = Expect<Equal<TopAndBottomRequiredProfile["optionalAny"], true>>;
type _15e = Expect<Equal<TopAndBottomRequiredProfile["optionalUnknown"], { x: unknown }>>;

// ─── Surfaces built on the transform ──────────────────────────────────

// 16. Build the fully resolved counterpart of the packet's draft options.
export type ResolvedOptions = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    ResolvedOptions,
    {
      server: {
        host: string;
        port: number;
        tls: { enabled: boolean; certificate: string | undefined };
      };
      logging: { level: "debug" | "info" | "error"; outputs: string[] };
    }
  >
>;
type _16b = Expect<Equal<ResolvedOptions["server"]["tls"]["certificate"], string | undefined>>;
type _16c = Expect<Equal<ResolvedOptions["server"]["port"], number>>;
type _16d = Expect<Equal<ResolvedOptions["logging"]["outputs"], string[]>>;
type _16e = Expect<
  Equal<{} extends ResolvedOptions ? true : false, false>
>;

// 17. Build the key filter that names exactly the properties this transform
//     changes, which is also the set a defaults graph must supply.
//     Hint: a one-key `Pick` is empty-object-assignable only when that key is
//     omittable.
export type OmittableKeysOf<Model> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<OmittableKeysOf<GivenOptionalityModel>, "optional" | "readonlyOptional" | "optionalUndefined">
>;
type _17b = Expect<Equal<OmittableKeysOf<{}>, never>>;
type _17c = Expect<Equal<OmittableKeysOf<{ a: 1; b: 2 }>, never>>;
type _17d = Expect<Equal<OmittableKeysOf<{ a?: 1; b?: 2 }>, "a" | "b">>;
type _17e = Expect<Equal<OmittableKeysOf<GivenDraftOptions>, "server" | "logging">>;

// 18. Build the shape a caller must supply to complete a draft: every omittable
//     branch of the source, already fully resolved.
export type DefaultsFor<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<DefaultsFor<{ x?: string }>, { x: string }>>;
type _18b = Expect<
  Equal<DefaultsFor<{ nested?: { value?: number } }>, { nested: { value: number } }>
>;
type _18c = Expect<Equal<DefaultsFor<GivenDraftOptions>["logging"]["level"], "debug" | "info" | "error">>;
type _18d = Expect<Equal<DefaultsFor<Date>, Date>>;
type _18e = Expect<
  Equal<{ nested: {} } extends DefaultsFor<{ nested?: { value?: number } }> ? true : false, false>
>;

// 19. Build the completion signatures the packet exports.
export type DefaultsRuntimeApi = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    DefaultsRuntimeApi["fillDefaults"],
    <Value>(value: Value, defaults: DeepRequiredOf<Value>) => DeepRequiredOf<Value>
  >
>;
type _19b = Expect<
  Equal<
    DefaultsRuntimeApi["completeOptions"],
    (
      options: GivenDraftOptions,
      defaults: DeepRequiredOf<GivenDraftOptions>,
    ) => DeepRequiredOf<GivenDraftOptions>
  >
>;
type _19c = Expect<
  Equal<Parameters<DefaultsRuntimeApi["completeOptions"]>[0], GivenDraftOptions>
>;
type _19d = Expect<
  Equal<
    ReturnType<DefaultsRuntimeApi["completeOptions"]>["server"]["tls"]["certificate"],
    string | undefined
  >
>;
type _19e = Expect<Equal<ReturnType<DefaultsRuntimeApi["fillDefaults"]>, unknown>>;
