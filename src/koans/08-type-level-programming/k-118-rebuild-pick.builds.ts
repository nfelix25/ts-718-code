import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-118: rebuild Pick — constructions
 * =============================================================================
 *
 * `Pick` is the smallest useful mapped program: walk the requested key union and
 * look each key up in the source. Everything interesting follows from where the
 * keys come from. Because the mapping reads directly from the source, `readonly`
 * and optional modifiers ride along for free. Because the constraint is
 * `Keys extends keyof Source`, an unprovable key is a compile error rather than a
 * silently dropped property — a stricter contract than a lookup that just
 * intersects. And because a mapped type sees a union as one common surface, the
 * plain form quietly erases the correlation between a discriminant and its
 * payload; only distributing first keeps the branches apart. Replace each `TODO`
 * with a type satisfying the assertions directly below it.
 */

declare const givenToken: unique symbol;

type GivenUser = {
  readonly id: string;
  name: string;
  email?: string;
  active: boolean;
};

type GivenMixed = { 0: "zero"; label: string; [givenToken]: boolean };

type GivenEvent = { kind: "click"; x: number } | { kind: "key"; key: string };
type GivenVariant = { kind: "a"; value: number } | { kind: "b"; value: string };

// Declared with the packet's own selection signature so a construction can be
// graded against a real call site.
declare function givenPick<Source extends object, const Keys extends readonly (keyof Source)[]>(
  source: Source,
  keys: Keys,
): RebuiltPick<Source, Keys[number]>;

// ─── The mapped program ───────────────────────────────────────────────

// 1. Build the selection itself: for every requested key, create that key with
//    the value found at the source. The constraint is part of the exercise — it
//    is what makes an unprovable key a compile error.
//    `RebuiltPick<{ a: 1; b: 2 }, "a">` is `{ a: 1 }`.
export type RebuiltPick<Source, Keys extends keyof Source> = TODO; // TODO(koan)

type _01a = Expect<Equal<RebuiltPick<GivenUser, "id">, { readonly id: string }>>;
type _01b = Expect<
  Equal<RebuiltPick<GivenUser, "name" | "active">, { name: string; active: boolean }>
>;
type _01c = Expect<Equal<RebuiltPick<GivenUser, never>, {}>>;
type _01d = Expect<Equal<keyof RebuiltPick<GivenUser, "id" | "email">, "id" | "email">>;
type _01e = Expect<
  Equal<
    RebuiltPick<GivenUser, keyof GivenUser>,
    { readonly id: string; name: string; email?: string; active: boolean }
  >
>;

// 2. Build the distributing variant, which visits each union member separately
//    and keeps only the keys that member can actually prove.
//    Hint: `Extract<Keys, keyof Source>` is what lets the parameter stay a broad
//    `PropertyKey` while each branch narrows it to its own keys.
export type DistributedPickOf<Source, Keys extends PropertyKey> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<DistributedPickOf<GivenEvent, "kind">, { kind: "click" } | { kind: "key" }>
>;
type _02b = Expect<
  Equal<
    DistributedPickOf<GivenEvent, "kind" | "x" | "key">,
    { kind: "click"; x: number } | { kind: "key"; key: string }
  >
>;
type _02c = Expect<Equal<DistributedPickOf<never, "kind">, never>>;
type _02d = Expect<Equal<keyof DistributedPickOf<GivenVariant, "missing">, never>>;
type _02e = Expect<
  Equal<DistributedPickOf<{ a: 1; b: 2 }, "a">, { a: 1 }>
>;

// ─── Keys in, values out ──────────────────────────────────────────────

// 3. Report the requested key union controlling the output key set exactly.
export type KeySelectionProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<KeySelectionProfile["single"], "id">>;
type _03b = Expect<Equal<KeySelectionProfile["several"], "name" | "active">>;
type _03c = Expect<Equal<KeySelectionProfile["all"], "id" | "name" | "email" | "active">>;
type _03d = Expect<Equal<KeySelectionProfile["none"], never>>;
type _03e = Expect<Equal<KeySelectionProfile["emptySource"], {}>>;

// 4. Report value types being indexed straight out of the source.
export type ValueLookupProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<ValueLookupProfile["required"], string>>;
type _04b = Expect<Equal<ValueLookupProfile["optionalRead"], string | undefined>>;
type _04c = Expect<Equal<ValueLookupProfile["unionValue"], { value: 1 | 2 }>>;
type _04d = Expect<Equal<ValueLookupProfile["readonlyValue"], string>>;
type _04e = Expect<Equal<ValueLookupProfile["valuesOf"], string | boolean>>;

// 5. Report the source modifiers riding along, because the mapping is
//    homomorphic over the source rather than a fresh object literal.
export type ModifierPreservationProfile = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    ModifierPreservationProfile["readonlyAndOptional"],
    { readonly id: string; email?: string }
  >
>;
type _05b = Expect<Equal<ModifierPreservationProfile["readonlyOnly"], { readonly a?: 1 }>>;
type _05c = Expect<Equal<ModifierPreservationProfile["requiredAgain"], { email: string }>>;
type _05d = Expect<Equal<ModifierPreservationProfile["readonlyAdded"], { readonly name: string }>>;
type _05e = Expect<
  Equal<ModifierPreservationProfile["alreadyPartial"], { name?: string; active?: boolean }>
>;

// 6. Report optional syntax staying distinct from an explicit `undefined` value.
export type ExactOptionalProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<ExactOptionalProfile["optional"], { a?: 1 }>>;
type _06b = Expect<Equal<ExactOptionalProfile["explicitUndefined"], { a: 1 | undefined }>>;
type _06c = Expect<Equal<ExactOptionalProfile["both"], { a?: 1 | undefined }>>;
type _06d = Expect<Equal<ExactOptionalProfile["readonlyOptional"], { readonly a?: 1 }>>;
type _06e = Expect<Equal<ExactOptionalProfile["madeRequired"], { a: 1 }>>;

// ─── Every kind of key ────────────────────────────────────────────────

// 7. Report numeric, string, and symbol keys all being selectable.
export type MixedKeyProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<MixedKeyProfile["numeric"], { 0: "zero" }>>;
type _07b = Expect<Equal<MixedKeyProfile["symbolic"], { [givenToken]: boolean }>>;
type _07c = Expect<
  Equal<MixedKeyProfile["everything"], { 0: "zero"; label: string; [givenToken]: boolean }>
>;
type _07d = Expect<Equal<MixedKeyProfile["keys"], 0 | typeof givenToken>>;
type _07e = Expect<Equal<MixedKeyProfile["numericLiteralSource"], { 0: "zero" }>>;

// 8. Report index signatures, where a literal key becomes a real property and the
//    broad key reproduces the index signature itself.
export type IndexSignatureProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<IndexSignatureProfile["literalFromIndex"], { literal: number }>>;
type _08b = Expect<Equal<IndexSignatureProfile["broadFromIndex"], { [key: string]: number }>>;
type _08c = Expect<Equal<IndexSignatureProfile["numericIndex"], { 1: string }>>;
type _08d = Expect<Equal<IndexSignatureProfile["broadKeys"], string>>;
type _08e = Expect<Equal<IndexSignatureProfile["literalKeys"], "a" | "b">>;

// ─── One surface or many branches ─────────────────────────────────────

// 9. Report the plain form seeing a union as a single common surface, which
//    merges each key's value across branches and loses the correlation.
export type UnionSurfaceProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<UnionSurfaceProfile["discriminant"], { kind: "click" | "key" }>>;
type _09b = Expect<Equal<UnionSurfaceProfile["variantTag"], { kind: "a" | "b" }>>;
type _09c = Expect<Equal<UnionSurfaceProfile["variantPayload"], { value: number | string }>>;
type _09d = Expect<
  Equal<UnionSurfaceProfile["both"], { kind: "a" | "b"; value: number | string }>
>;
type _09e = Expect<Equal<UnionSurfaceProfile["commonKeys"], "kind" | "value">>;

// 10. Report the distributing form keeping each branch intact, so a narrowed tag
//     still implies its own payload.
export type UnionDistributionProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<UnionDistributionProfile["discriminant"], { kind: "click" } | { kind: "key" }>
>;
type _10b = Expect<
  Equal<
    UnionDistributionProfile["everything"],
    { kind: "click"; x: number } | { kind: "key"; key: string }
  >
>;
type _10c = Expect<
  Equal<
    UnionDistributionProfile["variantBoth"],
    { kind: "a"; value: number } | { kind: "b"; value: string }
  >
>;
type _10d = Expect<Equal<UnionDistributionProfile["branchKeys"], "kind" | "value">>;
type _10e = Expect<Equal<UnionDistributionProfile["emptySource"], never>>;

// 11. Report the top and bottom sources, where `keyof` decides what is even
//     requestable.
export type ExtremeSourceProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ExtremeSourceProfile["unknownSource"], {}>>;
type _11b = Expect<Equal<ExtremeSourceProfile["neverSource"], {}>>;
type _11c = Expect<Equal<ExtremeSourceProfile["anyLiteralKey"], { x: any }>>;
type _11d = Expect<Equal<ExtremeSourceProfile["anyBroadKeys"], string>>;
type _11e = Expect<Equal<ExtremeSourceProfile["emptyObject"], {}>>;

// ─── Selections built on the selection ────────────────────────────────

// 12. Build the forgiving variant that accepts any `PropertyKey` and silently
//     keeps only what the source can prove, instead of rejecting the request.
export type SafePickOf<Source, Keys extends PropertyKey> = TODO; // TODO(koan)

type _12a = Expect<Equal<SafePickOf<GivenUser, "id" | "missing">, { readonly id: string }>>;
type _12b = Expect<Equal<SafePickOf<GivenUser, "missing">, {}>>;
type _12c = Expect<Equal<SafePickOf<{ a: 1; b: 2 }, "a" | "b">, { a: 1; b: 2 }>>;
type _12d = Expect<Equal<SafePickOf<Record<string, number>, "x">, { x: number }>>;
type _12e = Expect<
  Equal<
    SafePickOf<GivenUser, keyof GivenUser>,
    { readonly id: string; name: string; email?: string; active: boolean }
  >
>;

// 13. Build the value-directed selection: keep the properties whose value type
//     satisfies a wanted domain.
//     Hint: a mapped type that produces either the key or `never`, then indexed
//     by `keyof Source`, is the standard way to compute a key subset.
export type PickByValueOf<Source, Wanted> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<PickByValueOf<GivenUser, string>, { readonly id: string; name: string }>
>;
type _13b = Expect<Equal<PickByValueOf<{ a: 1; b: "x"; c: 2 }, number>, { a: 1; c: 2 }>>;
type _13c = Expect<Equal<PickByValueOf<{}, string>, {}>>;
type _13d = Expect<Equal<PickByValueOf<{ a: string }, number>, {}>>;
type _13e = Expect<Equal<PickByValueOf<{ a: 1; b: 2 }, 1 | 2>, { a: 1; b: 2 }>>;

// 14. Build the reader for the keys a whole union agrees on, which is the exact
//     set the plain selection can address.
export type CommonKeysOf<Union> = TODO; // TODO(koan)

type _14a = Expect<Equal<CommonKeysOf<GivenEvent>, "kind">>;
type _14b = Expect<Equal<CommonKeysOf<GivenVariant>, "kind" | "value">>;
type _14c = Expect<Equal<CommonKeysOf<{ a: 1 } | { b: 2 }>, never>>;
type _14d = Expect<Equal<CommonKeysOf<{ a: 1; b: 2 }>, "a" | "b">>;
type _14e = Expect<Equal<CommonKeysOf<GivenUser>, "id" | "name" | "email" | "active">>;

// 15. Build the reader for every key any branch offers, which is the set the
//     distributing selection can address.
export type BranchKeysOf<Union> = TODO; // TODO(koan)

type _15a = Expect<Equal<BranchKeysOf<GivenEvent>, "kind" | "x" | "key">>;
type _15b = Expect<Equal<BranchKeysOf<{ a: 1 } | { b: 2 }>, "a" | "b">>;
type _15c = Expect<Equal<BranchKeysOf<{ a: 1; b: 2 }>, "a" | "b">>;
type _15d = Expect<Equal<BranchKeysOf<never>, never>>;
type _15e = Expect<Equal<BranchKeysOf<GivenVariant>, "kind" | "value">>;

// 16. Build the selection driven by a key tuple rather than a key union, which is
//     the shape a value-level call site actually supplies.
export type PickFromTupleOf<
  Source,
  KeyTuple extends readonly (keyof Source)[],
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<PickFromTupleOf<GivenUser, ["id", "name"]>, { readonly id: string; name: string }>
>;
type _16b = Expect<Equal<PickFromTupleOf<GivenUser, []>, {}>>;
type _16c = Expect<Equal<PickFromTupleOf<GivenUser, readonly ["email"]>, { email?: string }>>;
type _16d = Expect<
  Equal<PickFromTupleOf<GivenUser, ["id", "id"]>, { readonly id: string }>
>;
type _16e = Expect<
  Equal<PickFromTupleOf<GivenMixed, [0, typeof givenToken]>, { 0: "zero"; [givenToken]: boolean }>
>;

// 17. Build the union of the values a selection exposes, which is the same thing
//     as indexing the source by the whole key union.
export type PickedValuesOf<Source, Keys extends keyof Source> = TODO; // TODO(koan)

type _17a = Expect<Equal<PickedValuesOf<GivenUser, "name" | "active">, string | boolean>>;
type _17b = Expect<Equal<PickedValuesOf<GivenUser, "email">, string | undefined>>;
type _17c = Expect<Equal<PickedValuesOf<GivenUser, never>, never>>;
type _17d = Expect<Equal<PickedValuesOf<{ a: 1; b: 2 }, "a" | "b">, 1 | 2>>;
type _17e = Expect<Equal<PickedValuesOf<GivenMixed, 0 | typeof givenToken>, "zero" | boolean>>;

// 18. Build the selection signature the packet exports, whose `const` key tuple
//     is what keeps the literal keys from widening to `string`.
export type PickRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    PickRuntimeApi["pick"],
    <Source extends object, const Keys extends readonly (keyof Source)[]>(
      source: Source,
      keys: Keys,
    ) => RebuiltPick<Source, Keys[number]>
  >
>;
type _18b = Expect<
  Equal<ReturnType<typeof givenPick<GivenUser, ["id", "name"]>>, { readonly id: string; name: string }>
>;
type _18c = Expect<
  Equal<ReturnType<typeof givenPick<GivenUser, ["email"]>>, { email?: string }>
>;
type _18d = Expect<
  Equal<ReturnType<typeof givenPick<GivenUser, []>>, {}>
>;
type _18e = Expect<
  Equal<
    {
      fromTuple: ReturnType<typeof givenPick<GivenUser, ["id"]>>;
      fromUnion: RebuiltPick<GivenUser, "id">;
    },
    { fromTuple: { readonly id: string }; fromUnion: { readonly id: string } }
  >
>;
