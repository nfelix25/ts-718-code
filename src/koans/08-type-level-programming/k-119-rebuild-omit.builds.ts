import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-119: rebuild Omit — constructions
 * =============================================================================
 *
 * Omission is subtraction: compute the surviving keys, then map those back to
 * their values. That framing explains its whole personality. Blocked keys never
 * have to exist, so removing an absent key is a harmless no-op rather than the
 * compile error the selection form raises. Subtraction happens on the key union,
 * so a broad filter like `string` removes a whole key domain at once — and, less
 * comfortably, a literal filter cannot dent an index signature, because `string`
 * does not extend `"fixed"`. The subtractive form also reads a union as one
 * common surface, while the key-remapped alternative is homomorphic and keeps the
 * branches apart for free. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

declare const givenToken: unique symbol;

type GivenUser = {
  readonly id: string;
  name: string;
  email?: string;
  password: string;
};

type GivenMixed = { 0: "zero"; 1: "one"; label: string; [givenToken]: boolean };
type GivenEvent = { kind: "click"; x: number } | { kind: "key"; key: string };
type GivenVariant =
  | { kind: "a"; value: number; a: 1 }
  | { kind: "b"; value: string; b: 2 };
type GivenIndexed = { [key: string]: number; fixed: 1 };

// Given the selection form from the previous packet, so the subtraction can be
// expressed in terms of it.
type GivenPick<Source, Keys extends keyof Source> = { [Key in Keys]: Source[Key] };

// Declared with the packet's own subtraction signature so a construction can
// be graded against a real call site.
declare function givenOmit<Source extends object, const Keys extends readonly PropertyKey[]>(
  source: Source,
  keys: Keys,
): RebuiltOmit<Source, Keys[number]>;

// ─── Subtraction ──────────────────────────────────────────────────────

// 1. Build the subtractive form: remove the blocked keys from the source's key
//    set, then map every survivor back to its value. The blocked keys are a broad
//    `PropertyKey` on purpose, so asking to remove something absent is allowed.
//    `RebuiltOmit<{ a: 1; b: 2 }, "b">` is `{ a: 1 }`.
export type RebuiltOmit<Source, Keys extends PropertyKey> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    RebuiltOmit<GivenUser, "password">,
    { readonly id: string; name: string; email?: string }
  >
>;
type _01b = Expect<
  Equal<RebuiltOmit<GivenUser, "email" | "password">, { readonly id: string; name: string }>
>;
type _01c = Expect<Equal<RebuiltOmit<GivenUser, keyof GivenUser>, {}>>;
type _01d = Expect<Equal<keyof RebuiltOmit<GivenUser, "password">, "id" | "name" | "email">>;
type _01e = Expect<
  Equal<
    RebuiltOmit<GivenUser, never>,
    { readonly id: string; name: string; email?: string; password: string }
  >
>;

// 2. Build the key-remapped alternative, which filters keys during the mapping
//    rather than before it.
//    Hint: `as` on a mapped key can send an unwanted key to `never`, which drops
//    the property entirely.
export type RemappedOmitOf<Source, Keys extends PropertyKey> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    RemappedOmitOf<GivenUser, "password">,
    { readonly id: string; name: string; email?: string }
  >
>;
type _02b = Expect<Equal<RemappedOmitOf<{ a: 1; b: 2 }, "b">, { a: 1 }>>;
type _02c = Expect<Equal<RemappedOmitOf<{ a: 1 }, "missing">, { a: 1 }>>;
type _02d = Expect<Equal<RemappedOmitOf<{ readonly a?: 1; b: 2 }, "b">, { readonly a?: 1 }>>;
type _02e = Expect<
  Equal<
    RemappedOmitOf<{ kind: "a"; a: 1 } | { kind: "b"; b: 2 }, "kind">,
    { a: 1 } | { b: 2 }
  >
>;

// 3. Build the explicitly distributing subtraction, for when each union branch
//    must keep the keys only it has.
export type DistributedOmitOf<Source, Keys extends PropertyKey> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<DistributedOmitOf<GivenEvent, "kind">, { x: number } | { key: string }>
>;
type _03b = Expect<
  Equal<
    DistributedOmitOf<GivenEvent, "x">,
    { kind: "click" } | { kind: "key"; key: string }
  >
>;
type _03c = Expect<Equal<DistributedOmitOf<never, "kind">, never>>;
type _03d = Expect<
  Equal<
    DistributedOmitOf<GivenVariant, "kind" | "value">,
    { a: 1 } | { b: 2 }
  >
>;
type _03e = Expect<Equal<DistributedOmitOf<null | { a: 1 }, "missing">, {} | { a: 1 }>>;

// ─── Complement and tolerance ─────────────────────────────────────────

// 4. Report omission behaving as the complement of a selection.
export type ComplementProfile = TODO; // TODO(koan)

type _04a = Expect<
  Equal<ComplementProfile["one"], { readonly id: string; name: string; email?: string }>
>;
type _04b = Expect<
  Equal<ComplementProfile["several"], { readonly id: string; name: string }>
>;
type _04c = Expect<
  Equal<
    ComplementProfile["none"],
    { readonly id: string; name: string; email?: string; password: string }
  >
>;
type _04d = Expect<Equal<ComplementProfile["all"], {}>>;
type _04e = Expect<Equal<ComplementProfile["survivingKeys"], "id" | "email">>;

// 5. Report the tolerance that separates omission from selection: a key that was
//    never there is simply ignored.
export type ForgivingKeyProfile = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    ForgivingKeyProfile["absentOnly"],
    { readonly id: string; name: string; email?: string; password: string }
  >
>;
type _05b = Expect<
  Equal<
    ForgivingKeyProfile["absentBeside"],
    { readonly id: string; name: string; email?: string }
  >
>;
type _05c = Expect<Equal<ForgivingKeyProfile["allAbsent"], { a: 1 }>>;
type _05d = Expect<Equal<ForgivingKeyProfile["everyKeyDomain"], never>>;
type _05e = Expect<Equal<ForgivingKeyProfile["emptySource"], {}>>;

// 6. Report the modifiers surviving, since the survivors are still read from the
//    source rather than rebuilt from scratch.
export type ModifierSurvivalProfile = TODO; // TODO(koan)

type _06a = Expect<
  Equal<ModifierSurvivalProfile["readonlyAndOptional"], { readonly id: string; email?: string }>
>;
type _06b = Expect<
  Equal<ModifierSurvivalProfile["readonlyKept"], { name: string; email?: string }>
>;
type _06c = Expect<
  Equal<
    ModifierSurvivalProfile["alreadyPartial"],
    { readonly id?: string; name?: string; email?: string }
  >
>;
type _06d = Expect<
  Equal<
    ModifierSurvivalProfile["alreadyReadonly"],
    { readonly id: string; readonly name: string; readonly email?: string }
  >
>;
type _06e = Expect<Equal<ModifierSurvivalProfile["mixedModifiers"], { readonly a?: 1 }>>;

// ─── Subtracting whole key domains ────────────────────────────────────

// 7. Report a broad filter removing an entire key domain in one step.
export type BroadFilterProfile = TODO; // TODO(koan)

type _07a = Expect<
  Equal<BroadFilterProfile["strings"], { 0: "zero"; 1: "one"; [givenToken]: boolean }>
>;
type _07b = Expect<Equal<BroadFilterProfile["numbers"], { label: string; [givenToken]: boolean }>>;
type _07c = Expect<
  Equal<BroadFilterProfile["symbols"], { 0: "zero"; 1: "one"; label: string }>
>;
type _07d = Expect<Equal<BroadFilterProfile["numbersAndSymbols"], { label: string }>>;
type _07e = Expect<Equal<BroadFilterProfile["everything"], {}>>;

// 8. Report the uncomfortable consequence of subtracting on the key union: a
//    literal filter cannot remove anything from an index signature, because the
//    signature's key type does not extend that literal.
export type IndexSignatureProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<IndexSignatureProfile["literalAgainstIndex"], string>>;
type _08b = Expect<Equal<IndexSignatureProfile["broadAgainstIndex"], {}>>;
type _08c = Expect<Equal<IndexSignatureProfile["numericIndex"], number>>;
type _08d = Expect<Equal<IndexSignatureProfile["broadNumericIndex"], {}>>;
type _08e = Expect<Equal<IndexSignatureProfile["fixedBesideIndex"], string | number>>;

// 9. Report numeric key spelling, where the string form of a numeric key is a
//    different key as far as subtraction is concerned.
export type NumericSpellingProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<NumericSpellingProfile["numericFilter"], { x: 1 }>>;
type _09b = Expect<Equal<NumericSpellingProfile["stringFilter"], { 0: "zero"; x: 1 }>>;
type _09c = Expect<Equal<NumericSpellingProfile["numericKeys"], 0 | "x">>;
type _09d = Expect<Equal<NumericSpellingProfile["extractedNumeric"], 0>>;
type _09e = Expect<Equal<NumericSpellingProfile["extractedString"], "x">>;

// ─── One surface, many branches, and the remapped shortcut ────────────

// 10. Report the subtractive form reading a union as one common surface, so it
//     can only ever subtract from the keys every branch shares.
export type UnionSurfaceProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<UnionSurfaceProfile["eventTag"], {}>>;
type _10b = Expect<Equal<UnionSurfaceProfile["variantTag"], { value: number | string }>>;
type _10c = Expect<Equal<UnionSurfaceProfile["variantValue"], { kind: "a" | "b" }>>;
type _10d = Expect<Equal<UnionSurfaceProfile["variantBoth"], {}>>;
type _10e = Expect<Equal<UnionSurfaceProfile["commonKeys"], "kind" | "value">>;

// 11. Report the distributing form keeping every branch's own keys.
export type DistributionProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<DistributionProfile["eventTag"], { x: number } | { key: string }>>;
type _11b = Expect<
  Equal<
    DistributionProfile["variantTag"],
    { value: number; a: 1 } | { value: string; b: 2 }
  >
>;
type _11c = Expect<
  Equal<
    DistributionProfile["variantValue"],
    { kind: "a"; a: 1 } | { kind: "b"; b: 2 }
  >
>;
type _11d = Expect<
  Equal<
    DistributionProfile["variantPayloads"],
    { kind: "a"; value: number } | { kind: "b"; value: string }
  >
>;
type _11e = Expect<Equal<DistributionProfile["nullableSource"], {} | { a: 1 }>>;

// 12. Report the remapped form being homomorphic, so it splits a union without
//     being told to — the memorable contrast with the subtractive form.
export type RemappedUnionProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<RemappedUnionProfile["remappedUnion"], { x: number } | { key: string }>>;
type _12b = Expect<Equal<RemappedUnionProfile["subtractiveUnion"], {}>>;
type _12c = Expect<
  Equal<
    RemappedUnionProfile["remappedVariant"],
    { value: number; a: 1 } | { value: string; b: 2 }
  >
>;
type _12d = Expect<
  Equal<RemappedUnionProfile["remappedBroadFilter"], { 0: "zero"; 1: "one"; [givenToken]: boolean }>
>;
type _12e = Expect<
  Equal<
    RemappedUnionProfile["remappedAbsent"],
    { kind: "click"; x: number } | { kind: "key"; key: string }
  >
>;

// 13. Report the top and bottom sources.
export type ExtremeSourceProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ExtremeSourceProfile["unknownSource"], {}>>;
type _13b = Expect<Equal<ExtremeSourceProfile["emptySource"], {}>>;
type _13c = Expect<Equal<ExtremeSourceProfile["neverDistributed"], never>>;
type _13d = Expect<Equal<ExtremeSourceProfile["objectKeys"], never>>;
type _13e = Expect<Equal<ExtremeSourceProfile["unknownKeys"], never>>;

// ─── Subtractions built on the subtraction ────────────────────────────

// 14. Build the reader for the keys that survive a subtraction.
export type SurvivingKeysOf<Source, Keys extends PropertyKey> = TODO; // TODO(koan)

type _14a = Expect<Equal<SurvivingKeysOf<GivenUser, "password">, "id" | "name" | "email">>;
type _14b = Expect<Equal<SurvivingKeysOf<GivenUser, keyof GivenUser>, never>>;
type _14c = Expect<Equal<SurvivingKeysOf<GivenUser, "missing">, keyof GivenUser>>;
type _14d = Expect<Equal<SurvivingKeysOf<GivenMixed, string>, 0 | 1 | typeof givenToken>>;
type _14e = Expect<Equal<SurvivingKeysOf<{}, "x">, never>>;

// 15. Build the value-directed subtraction: drop the properties whose value type
//     falls inside an unwanted domain.
export type OmitByValueOf<Source, Unwanted> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<OmitByValueOf<GivenUser, string>, { email?: string }>
>;
type _15b = Expect<Equal<OmitByValueOf<{ a: 1; b: "x"; c: 2 }, number>, { b: "x" }>>;
type _15c = Expect<Equal<OmitByValueOf<{}, string>, {}>>;
type _15d = Expect<Equal<OmitByValueOf<{ a: string }, number>, { a: string }>>;
type _15e = Expect<Equal<OmitByValueOf<{ a: 1; b: 2 }, 1 | 2>, {}>>;

// 16. Build the subtraction that removes properties whose value domain is empty,
//     which no key-based filter could express.
export type OmitNeverOf<Source> = TODO; // TODO(koan)

type _16a = Expect<Equal<OmitNeverOf<{ a: 1; b: never }>, { a: 1 }>>;
type _16b = Expect<Equal<OmitNeverOf<{ a: never }>, {}>>;
type _16c = Expect<Equal<OmitNeverOf<{}>, {}>>;
type _16d = Expect<Equal<OmitNeverOf<{ a: 1; b: 2 }>, { a: 1; b: 2 }>>;
type _16e = Expect<Equal<OmitNeverOf<{ readonly a?: 1; b: never }>, { readonly a?: 1 }>>;

// 17. Build the subtraction driven by a key tuple, which is the shape a
//     value-level call site supplies.
export type OmitFromTupleOf<
  Source,
  KeyTuple extends readonly PropertyKey[],
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<OmitFromTupleOf<GivenUser, ["password"]>, { readonly id: string; name: string; email?: string }>
>;
type _17b = Expect<
  Equal<
    OmitFromTupleOf<GivenUser, []>,
    { readonly id: string; name: string; email?: string; password: string }
  >
>;
type _17c = Expect<
  Equal<OmitFromTupleOf<GivenUser, ["email", "password"]>, { readonly id: string; name: string }>
>;
type _17d = Expect<
  Equal<
    OmitFromTupleOf<GivenUser, ["missing"]>,
    { readonly id: string; name: string; email?: string; password: string }
  >
>;
type _17e = Expect<Equal<OmitFromTupleOf<GivenMixed, [0, 1]>, { label: string; [givenToken]: boolean }>>;

// 18. Build the subtraction signature the packet exports. Its key tuple is a
//     broad `PropertyKey[]` rather than `(keyof Source)[]`, which is exactly the
//     tolerance the type-level form already has.
export type OmitRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    OmitRuntimeApi["omit"],
    <Source extends object, const Keys extends readonly PropertyKey[]>(
      source: Source,
      keys: Keys,
    ) => RebuiltOmit<Source, Keys[number]>
  >
>;
type _18b = Expect<
  Equal<
    ReturnType<typeof givenOmit<GivenUser, ["password"]>>,
    { readonly id: string; name: string; email?: string }
  >
>;
type _18c = Expect<
  Equal<
    ReturnType<typeof givenOmit<GivenUser, ["missing"]>>,
    { readonly id: string; name: string; email?: string; password: string }
  >
>;
type _18d = Expect<Equal<ReturnType<typeof givenOmit<{ a: 1; b: 2 }, ["a", "b"]>>, {}>>;
type _18e = Expect<
  Equal<
    {
      fromTuple: ReturnType<typeof givenOmit<{ a: 1; b: 2 }, ["b"]>>;
      fromUnion: RebuiltOmit<{ a: 1; b: 2 }, "b">;
    },
    { fromTuple: { a: 1 }; fromUnion: { a: 1 } }
  >
>;
