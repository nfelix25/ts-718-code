import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-122: rebuild Partial and Required — constructions
 * =============================================================================
 *
 * These two are one modifier written twice: `?` adds optional presence and `-?`
 * subtracts it. Under exact optional properties they are emphatically not about
 * `undefined` — presence and value domain are separate axes, which is why making
 * `{ a?: string }` required yields `{ a: string }` while `{ a?: string | undefined }`
 * yields `{ a: string | undefined }`, and why neither round trip is guaranteed to
 * return the type you started with. Both mappings are homomorphic, so `readonly`
 * survives, tuples keep their identity while their length domain shifts, and an
 * object union is transformed branch by branch without being asked. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenConfig = {
  readonly id: string;
  host: string;
  port?: number;
  mode: "dev" | "prod" | undefined;
};

type GivenVariant = { kind: "a"; a: number } | { kind: "b"; b?: string };

// Declared with the packet's own merge signature so a construction can be
// graded against a real call site.
declare function givenWithDefaults<Source extends object>(
  defaults: Source,
  values: RebuiltPartial<Source>,
): Source;

// ─── One modifier, two directions ─────────────────────────────────────

// 1. Build the form that permits every property to be absent.
//    `RebuiltPartial<{ a: 1 }>` is `{ a?: 1 }`.
export type RebuiltPartial<Source> = TODO; // TODO(koan)

type _01a = Expect<Equal<RebuiltPartial<{ a: 1; b: 2 }>, { a?: 1; b?: 2 }>>;
type _01b = Expect<
  Equal<
    RebuiltPartial<GivenConfig>,
    { readonly id?: string; host?: string; port?: number; mode?: "dev" | "prod" | undefined }
  >
>;
type _01c = Expect<Equal<keyof RebuiltPartial<GivenConfig>, "id" | "host" | "port" | "mode">>;
type _01d = Expect<Equal<RebuiltPartial<{}>, {}>>;
type _01e = Expect<Equal<RebuiltPartial<{ a: 1 } | { b: 2 }>, { a?: 1 } | { b?: 2 }>>;

// 2. Build the form that removes optional presence.
//    Hint: the modifier is subtracted, not replaced — `-?` on the mapped key.
export type RebuiltRequired<Source> = TODO; // TODO(koan)

type _02a = Expect<Equal<RebuiltRequired<{ a?: 1; b?: 2 }>, { a: 1; b: 2 }>>;
type _02b = Expect<
  Equal<
    RebuiltRequired<GivenConfig>,
    { readonly id: string; host: string; port: number; mode: "dev" | "prod" | undefined }
  >
>;
type _02c = Expect<Equal<RebuiltRequired<{}>, {}>>;
type _02d = Expect<Equal<RebuiltRequired<{ a?: 1 } | { b?: 2 }>, { a: 1 } | { b: 2 }>>;
type _02e = Expect<Equal<keyof RebuiltRequired<{ a?: 1; b: 2 }>, "a" | "b">>;

// ─── Presence is not a value ──────────────────────────────────────────

// 3. Report the central distinction: subtracting presence does not subtract a
//    declared `undefined`, and adding presence does not add one either.
export type PresenceVersusValueProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<PresenceVersusValueProfile["optionalOnly"], string>>;
type _03b = Expect<Equal<PresenceVersusValueProfile["optionalUndefined"], string | undefined>>;
type _03c = Expect<
  Equal<PresenceVersusValueProfile["requiredUndefined"], { value: string | undefined }>
>;
type _03d = Expect<Equal<PresenceVersusValueProfile["partialRead"], string | undefined>>;
type _03e = Expect<
  Equal<PresenceVersusValueProfile["partialOfUndefined"], { value?: string | undefined }>
>;

// 4. Report the round trips, which recover the original only when the value
//    domain did not already mention `undefined`.
export type RoundTripProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<RoundTripProfile["requiredAfterPartial"], { a: 1; b: 2 }>>;
type _04b = Expect<Equal<RoundTripProfile["partialAfterRequired"], { a?: 1 }>>;
type _04c = Expect<
  Equal<RoundTripProfile["undefinedSurvivesRoundTrip"], { a: string | undefined }>
>;
type _04d = Expect<
  Equal<RoundTripProfile["optionalUndefinedRoundTrip"], { a?: string | undefined }>
>;
type _04e = Expect<Equal<RoundTripProfile["recovered"], true>>;

// 5. Report `readonly` being an orthogonal axis that neither utility touches.
export type ModifierOrthogonalityProfile = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    ModifierOrthogonalityProfile["partialKeepsReadonly"],
    { readonly id?: string; count?: number }
  >
>;
type _05b = Expect<
  Equal<ModifierOrthogonalityProfile["requiredKeepsReadonly"], { readonly id: string }>
>;
type _05c = Expect<
  Equal<ModifierOrthogonalityProfile["readonlyOnlyProperty"], { readonly id?: string }>
>;
type _05d = Expect<
  Equal<ModifierOrthogonalityProfile["mixedSource"], { readonly a: 1; b: 2 }>
>;
type _05e = Expect<Equal<ModifierOrthogonalityProfile["configReadonly"], string | undefined>>;

// ─── Tuples encode presence in their length ───────────────────────────

// 6. Report tuples keeping their identity while every position changes presence.
export type TupleOptionalityProfile = TODO; // TODO(koan)

type _06a = Expect<
  Equal<TupleOptionalityProfile["labelledPartial"], [name?: string, age?: number]>
>;
type _06b = Expect<
  Equal<TupleOptionalityProfile["labelledRequired"], [name: string, age: number]>
>;
type _06c = Expect<Equal<TupleOptionalityProfile["readonlyPartial"], readonly [1?, 2?]>>;
type _06d = Expect<Equal<TupleOptionalityProfile["readonlyRequired"], readonly [1, 2]>>;
type _06e = Expect<Equal<TupleOptionalityProfile["emptyTuple"], []>>;

// 7. Report the length domain, which is where a tuple actually records presence.
export type TupleLengthProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<TupleLengthProfile["partialLength"], 0 | 1 | 2>>;
type _07b = Expect<Equal<TupleLengthProfile["requiredLength"], 2>>;
type _07c = Expect<Equal<TupleLengthProfile["originalLength"], 2>>;
type _07d = Expect<Equal<TupleLengthProfile["emptyLength"], 0>>;
type _07e = Expect<Equal<TupleLengthProfile["singleLength"], 0 | 1>>;

// 8. Report a rest element, where the mapping reaches the rest's element type and
//    adds `undefined` to it rather than making a position optional.
export type RestElementProfile = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    RestElementProfile["partialWithRest"],
    [head?: string, ...tail: (number | undefined)[]]
  >
>;
type _08b = Expect<
  Equal<RestElementProfile["requiredWithRest"], [head: string, ...tail: number[]]>
>;
type _08c = Expect<Equal<RestElementProfile["restElement"], string | number | undefined>>;
type _08d = Expect<Equal<RestElementProfile["broadArray"], (number | undefined)[]>>;
type _08e = Expect<Equal<RestElementProfile["broadArrayElement"], number | undefined>>;

// ─── One layer only ───────────────────────────────────────────────────

// 9. Report the mapping being strictly one layer deep.
export type ShallowMappingProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ShallowMappingProfile["nestedPartial"], { nested?: { value: 1 } }>>;
type _09b = Expect<Equal<ShallowMappingProfile["nestedRequired"], { nested: { value?: 1 } }>>;
type _09c = Expect<Equal<ShallowMappingProfile["innerUntouched"], { value?: 1 }>>;
type _09d = Expect<Equal<ShallowMappingProfile["deeplyNested"], { a?: { b: { c: 1 } } }>>;
type _09e = Expect<
  Equal<ShallowMappingProfile["reachIn"], { value: 1 } | undefined>
>;

// 10. Report index signatures, which cannot be marked optional and instead take
//     `undefined` into their value type.
export type IndexSignatureProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<IndexSignatureProfile["partialIndex"], { [key: string]: number | undefined }>
>;
type _10b = Expect<Equal<IndexSignatureProfile["keys"], string>>;
type _10c = Expect<
  Equal<IndexSignatureProfile["requiredAfterPartial"], { [key: string]: number | undefined }>
>;
type _10d = Expect<Equal<IndexSignatureProfile["partialMember"], number | undefined>>;
type _10e = Expect<
  Equal<IndexSignatureProfile["numericIndex"], { [key: number]: string | undefined }>
>;

// ─── Homomorphic behaviour ────────────────────────────────────────────

// 11. Report the mapping distributing over an object union without being told to,
//     which is what "homomorphic" buys.
export type UnionHomomorphismProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    UnionHomomorphismProfile["partialUnion"],
    { kind?: "a"; a?: number } | { kind?: "b"; b?: string }
  >
>;
type _11b = Expect<
  Equal<
    UnionHomomorphismProfile["requiredUnion"],
    { kind: "a"; a: number } | { kind: "b"; b: string }
  >
>;
type _11c = Expect<Equal<UnionHomomorphismProfile["simplePartial"], { a?: 1 } | { b?: 2 }>>;
type _11d = Expect<Equal<UnionHomomorphismProfile["simpleRequired"], { a: 1 } | { b: 2 }>>;
type _11e = Expect<Equal<UnionHomomorphismProfile["branchKeys"], "kind">>;

// 12. Report the top and bottom sources, plus a callable intersection whose call
//     signature the mapping simply drops.
export type ExtremeSourceProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ExtremeSourceProfile["partialBottom"], never>>;
type _12b = Expect<Equal<ExtremeSourceProfile["requiredBottom"], never>>;
type _12c = Expect<Equal<ExtremeSourceProfile["partialTop"], {}>>;
type _12d = Expect<Equal<ExtremeSourceProfile["requiredTop"], {}>>;
type _12e = Expect<Equal<ExtremeSourceProfile["callableIntersection"], { meta?: string }>>;

// ─── Surfaces built on the modifier ───────────────────────────────────

// 13. Build the key filter that names the properties which cannot be omitted.
//     Hint: a one-key `Pick` accepts `{}` exactly when that key is omittable.
export type RequiredKeysOf<Source> = TODO; // TODO(koan)

type _13a = Expect<Equal<RequiredKeysOf<GivenConfig>, "id" | "host" | "mode">>;
type _13b = Expect<Equal<RequiredKeysOf<{}>, never>>;
type _13c = Expect<Equal<RequiredKeysOf<{ a?: 1 }>, never>>;
type _13d = Expect<Equal<RequiredKeysOf<{ a: 1; b?: 2 }>, "a">>;
type _13e = Expect<Equal<RequiredKeysOf<RebuiltPartial<GivenConfig>>, never>>;

// 14. Build the complementary filter for the omittable keys.
export type OptionalKeysOf<Source> = TODO; // TODO(koan)

type _14a = Expect<Equal<OptionalKeysOf<GivenConfig>, "port">>;
type _14b = Expect<Equal<OptionalKeysOf<{}>, never>>;
type _14c = Expect<Equal<OptionalKeysOf<{ a: 1; b?: 2 }>, "b">>;
type _14d = Expect<Equal<OptionalKeysOf<RebuiltPartial<GivenConfig>>, keyof GivenConfig>>;
type _14e = Expect<Equal<OptionalKeysOf<RebuiltRequired<GivenConfig>>, never>>;

// 15. Build the predicate that reports whether every property may be omitted,
//     which is exactly what makes a value satisfiable by `{}`.
export type IsFullyOptionalOf<Source> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    { optional: IsFullyOptionalOf<{ a?: 1 }>; required: IsFullyOptionalOf<{ a: 1 }> },
    { optional: true; required: false }
  >
>;
type _15b = Expect<
  Equal<
    { empty: IsFullyOptionalOf<{}>; mixed: IsFullyOptionalOf<{ a?: 1; b: 2 }> },
    { empty: true; mixed: false }
  >
>;
type _15c = Expect<
  Equal<
    {
      afterPartial: IsFullyOptionalOf<RebuiltPartial<GivenConfig>>;
      afterRequired: IsFullyOptionalOf<RebuiltRequired<GivenConfig>>;
    },
    { afterPartial: true; afterRequired: false }
  >
>;
type _15d = Expect<
  Equal<
    {
      original: IsFullyOptionalOf<GivenConfig>;
      partialTuple: IsFullyOptionalOf<RebuiltPartial<[1, 2]>>;
    },
    { original: false; partialTuple: false }
  >
>;
type _15e = Expect<
  Equal<
    {
      explicitUndefined: IsFullyOptionalOf<{ a: undefined }>;
      optionalUndefined: IsFullyOptionalOf<{ a?: undefined }>;
    },
    { explicitUndefined: false; optionalUndefined: true }
  >
>;

// 16. Build the merge signature the packet exports, where the overrides are the
//     partial form of the very type the defaults supply.
export type DefaultsRuntimeApi = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    DefaultsRuntimeApi["withDefaults"],
    <Source extends object>(defaults: Source, values: RebuiltPartial<Source>) => Source
  >
>;
type _16b = Expect<
  Equal<Parameters<typeof givenWithDefaults<{ a: 1; b: 2 }>>[1], { a?: 1; b?: 2 }>
>;
type _16c = Expect<
  Equal<
    {
      result: ReturnType<typeof givenWithDefaults<{ a: 1 }>>;
      overrides: Parameters<typeof givenWithDefaults<{ a: 1 }>>[1];
    },
    { result: { a: 1 }; overrides: { a?: 1 } }
  >
>;
type _16d = Expect<
  Equal<
    Parameters<typeof givenWithDefaults<GivenConfig>>[1],
    { readonly id?: string; host?: string; port?: number; mode?: "dev" | "prod" | undefined }
  >
>;
type _16e = Expect<
  Equal<
    {
      overrides: Parameters<typeof givenWithDefaults<{ readonly a: 1 }>>[1];
      result: ReturnType<typeof givenWithDefaults<{ readonly a: 1 }>>;
    },
    { overrides: { readonly a?: 1 }; result: { readonly a: 1 } }
  >
>;
