import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-138: branded types — constructions
 * =============================================================================
 *
 * Structural typing says two identical shapes are the same type. A brand buys
 * back the distinction by intersecting the representation with a phantom
 * property keyed by a unique symbol — evidence that exists only in the static
 * model and vanishes at runtime. The result is deliberately one-directional: a
 * branded value still satisfies every API expecting the raw representation,
 * while a raw value cannot masquerade as a checked one. Two things are worth
 * being honest about. Keying the tags by a *record* rather than a literal lets a
 * value accumulate several independent proofs instead of collapsing to `never`.
 * And the brand is still structural: anything that can name the symbol can
 * reproduce the type exactly, so a constructor is a trust boundary by convention,
 * not by force. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenExtends<From, To> = [From] extends [To] ? true : false;

export declare const brand: unique symbol;

// ─── The evidence ─────────────────────────────────────────────────────

// 1. Build the brand: the representation intersected with a phantom property
//    whose value records the tag. Keying the tag inside a record — rather than
//    storing the tag literal directly — is what lets brands stack.
//    `BrandOf<string, "user-id">` is a string carrying evidence named "user-id".
export type BrandOf<Value, Tag extends PropertyKey> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    {
      outward: GivenExtends<BrandOf<string, "user-id">, string>;
      inward: GivenExtends<string, BrandOf<string, "user-id">>;
    },
    { outward: true; inward: false }
  >
>;
type _01b = Expect<Equal<GivenExtends<string, BrandOf<string, "user-id">>, false>>;
type _01c = Expect<
  Equal<
    {
      outward: GivenExtends<BrandOf<number, "positive">, number>;
      inward: GivenExtends<number, BrandOf<number, "positive">>;
    },
    { outward: true; inward: false }
  >
>;
type _01d = Expect<Equal<GivenExtends<number, BrandOf<number, "positive">>, false>>;
type _01e = Expect<
  Equal<
    {
      carriesTheSymbol: typeof brand extends keyof BrandOf<string, "user-id"> ? true : false;
      inward: GivenExtends<string, BrandOf<string, "user-id">>;
    },
    { carriesTheSymbol: true; inward: false }
  >
>;

// 2. Build the tag reader, which recovers the names of every proof a value
//    carries.
export type BrandTagsOf<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<BrandTagsOf<BrandOf<string, "user-id">>, "user-id">>;
type _02b = Expect<Equal<BrandTagsOf<string>, never>>;
type _02c = Expect<
  Equal<BrandTagsOf<BrandOf<BrandOf<number, "positive">, "integer">>, "positive" | "integer">
>;
type _02d = Expect<Equal<BrandTagsOf<BrandOf<unknown, "x">>, "x">>;
type _02e = Expect<Equal<BrandTagsOf<never | BrandOf<string, "user-id">>, "user-id">>;

// 3. Build the membership test for one particular proof.
export type HasBrandOf<Value, Tag extends PropertyKey> = TODO; // TODO(koan)

type _03a = Expect<Equal<HasBrandOf<BrandOf<string, "user-id">, "user-id">, true>>;
type _03b = Expect<Equal<HasBrandOf<BrandOf<string, "user-id">, "order-id">, false>>;
type _03c = Expect<Equal<HasBrandOf<string, "user-id">, false>>;
type _03d = Expect<Equal<HasBrandOf<unknown, "x">, false>>;
type _03e = Expect<
  Equal<HasBrandOf<BrandOf<BrandOf<number, "positive">, "integer">, "integer">, true>
>;

// 4. Build the concrete identifiers the packet models, which is where the whole
//    point becomes visible: two identical representations that are not
//    interchangeable.
export type UserId = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    { outward: GivenExtends<UserId, string>; inward: GivenExtends<string, UserId> },
    { outward: true; inward: false }
  >
>;
type _04b = Expect<Equal<GivenExtends<string, UserId>, false>>;
type _04c = Expect<Equal<BrandTagsOf<UserId>, "user-id">>;
type _04d = Expect<Equal<HasBrandOf<UserId, "user-id">, true>>;
type _04e = Expect<Equal<UserId extends string ? true : false, true>>;

// 5. Build a second identifier over the same representation.
export type OrderId = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    { outward: GivenExtends<OrderId, string>; inward: GivenExtends<string, OrderId> },
    { outward: true; inward: false }
  >
>;
type _05b = Expect<Equal<GivenExtends<UserId, OrderId>, false>>;
type _05c = Expect<Equal<GivenExtends<OrderId, UserId>, false>>;
type _05d = Expect<Equal<Equal<UserId, OrderId>, false>>;
type _05e = Expect<Equal<BrandTagsOf<OrderId>, "order-id">>;

// ─── One direction only ───────────────────────────────────────────────

// 6. Report the asymmetry that makes a brand useful: evidence flows outward to
//    every raw-representation API, and nothing flows back in.
export type DirectionalityProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<DirectionalityProfile["brandedIntoRaw"], true>>;
type _06b = Expect<Equal<DirectionalityProfile["rawIntoBranded"], false>>;
type _06c = Expect<Equal<DirectionalityProfile["numericBrandedIntoRaw"], true>>;
type _06d = Expect<Equal<DirectionalityProfile["numericRawIntoBranded"], false>>;
type _06e = Expect<Equal<DirectionalityProfile["unionIntoRaw"], true>>;

// 7. Report two brands over the same representation staying mutually
//    incompatible, which is the distinction structural typing would otherwise
//    have erased.
export type DistinctnessProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<DistinctnessProfile["userIntoOrder"], false>>;
type _07b = Expect<Equal<DistinctnessProfile["orderIntoUser"], false>>;
type _07c = Expect<Equal<DistinctnessProfile["identical"], false>>;
type _07d = Expect<
  Equal<
    {
      extracted: DistinctnessProfile["extractedFromUnion"];
      inward: GivenExtends<string, UserId>;
    },
    { extracted: UserId; inward: false }
  >
>;
type _07e = Expect<Equal<DistinctnessProfile["bothStillStrings"], true>>;

// ─── Proofs that stack ────────────────────────────────────────────────

// 8. Report tags accumulating rather than conflicting, which is exactly what the
//    record-valued phantom property buys.
export type AccumulationProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<AccumulationProfile["twoTags"], "positive" | "integer">>;
type _08b = Expect<
  Equal<AccumulationProfile["threeTags"], "positive" | "integer" | "finite">
>;
type _08c = Expect<Equal<AccumulationProfile["hasFirst"], true>>;
type _08d = Expect<Equal<AccumulationProfile["hasSecond"], true>>;
type _08e = Expect<Equal<AccumulationProfile["hasNeither"], false>>;

// 9. Report a more-proven value being usable wherever a less-proven one is
//    expected, but not the other way around.
export type ProofOrderingProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ProofOrderingProfile["moreIntoLess"], true>>;
type _09b = Expect<Equal<ProofOrderingProfile["lessIntoMore"], false>>;
type _09c = Expect<Equal<ProofOrderingProfile["stackedIntoRaw"], true>>;
type _09d = Expect<Equal<ProofOrderingProfile["stackedIntoSingle"], true>>;
type _09e = Expect<Equal<ProofOrderingProfile["singleIntoStacked"], false>>;

// ─── Still structural underneath ──────────────────────────────────────

// 10. Report the brand being reproducible by anything that can name the symbol.
//     The constructor is a trust boundary by convention; the type system cannot
//     enforce that no one else writes the same intersection.
export type ForgeryProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<ForgeryProfile["handWrittenIsIdentical"], true>>;
type _10b = Expect<Equal<ForgeryProfile["handWrittenIsAssignable"], true>>;
type _10c = Expect<Equal<ForgeryProfile["handWrittenPassesTest"], true>>;
type _10d = Expect<Equal<ForgeryProfile["symbolIsAKey"], true>>;
type _10e = Expect<Equal<ForgeryProfile["carriesTheProperty"], true>>;

// 11. Report the evidence surviving every ordinary generic container, because
//     those containers preserve whatever type they were given.
export type PreservationProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    { element: PreservationProfile["arrayElement"]; inward: GivenExtends<string, UserId> },
    { element: UserId; inward: false }
  >
>;
type _11b = Expect<
  Equal<
    {
      fulfillment: PreservationProfile["promiseFulfillment"];
      inward: GivenExtends<string, OrderId>;
    },
    { fulfillment: OrderId; inward: false }
  >
>;
type _11c = Expect<
  Equal<
    {
      held: PreservationProfile["insideReadonlyObject"];
      inward: GivenExtends<string, UserId>;
    },
    { held: UserId; inward: false }
  >
>;
type _11d = Expect<Equal<PreservationProfile["readonlyKeepsTags"], "user-id">>;
type _11e = Expect<
  Equal<
    {
      intersected: PreservationProfile["intersectedWithRaw"];
      inward: GivenExtends<string, UserId>;
    },
    { intersected: UserId; inward: false }
  >
>;

// 12. Report where the evidence is discarded: any operation that produces a fresh
//     value of the raw representation has no reason to carry it forward.
export type ErasureProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ErasureProfile["functionResult"], string>>;
type _12b = Expect<Equal<ErasureProfile["widenedByConditional"], number>>;
type _12c = Expect<Equal<ErasureProfile["rawStillHasNoTags"], never>>;
type _12d = Expect<Equal<ErasureProfile["rawFailsTheTest"], false>>;
type _12e = Expect<Equal<ErasureProfile["objectKeys"], "id" | typeof brand>>;

// ─── Unions and the extremes ──────────────────────────────────────────

// 13. Report the queries distributing over a union of brands, so a tag question
//     about a mixed union is honestly undecided.
export type UnionQueryProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<UnionQueryProfile["tagsOfUnion"], "user-id" | "order-id">>;
type _13b = Expect<Equal<UnionQueryProfile["someMemberHasIt"], boolean>>;
type _13c = Expect<Equal<UnionQueryProfile["noMemberHasIt"], false>>;
type _13d = Expect<
  Equal<
    { extracted: UnionQueryProfile["extractedMember"]; inward: GivenExtends<string, UserId> },
    { extracted: UserId; inward: false }
  >
>;
type _13e = Expect<Equal<UnionQueryProfile["absorbedEmpty"], "user-id">>;

// 14. Report branding a union representation, which brands the whole union rather
//     than each member — so it is not assignable to the brand of one member.
export type UnionRepresentationProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<UnionRepresentationProfile["tagSurvives"], "token">>;
type _14b = Expect<Equal<UnionRepresentationProfile["notAssignableToNarrower"], false>>;
type _14c = Expect<Equal<UnionRepresentationProfile["narrowerIntoWider"], true>>;
type _14d = Expect<Equal<UnionRepresentationProfile["stillTheRawUnion"], true>>;
type _14e = Expect<Equal<UnionRepresentationProfile["hasItsTag"], true>>;

// 15. Report the extreme representations, where an intersection either absorbs
//     the brand entirely or collapses to nothing.
export type ExtremeRepresentationProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<ExtremeRepresentationProfile["brandedAny"], true>>;
type _15b = Expect<Equal<ExtremeRepresentationProfile["brandedNever"], never>>;
type _15c = Expect<Equal<ExtremeRepresentationProfile["brandedUnknownTags"], "x">>;
type _15d = Expect<Equal<ExtremeRepresentationProfile["brandedUnknownIsStillTop"], true>>;
type _15e = Expect<Equal<ExtremeRepresentationProfile["unknownHasNoTags"], false>>;

// ─── Surfaces built on the evidence ───────────────────────────────────

// 16. Build the reader that recovers the underlying representation, which is what
//     a serialiser or a formatting boundary actually needs.
//     Hint: inference cannot decompose an intersection, so there is no way to
//     `infer` the raw half back out of a brand — dispatch on the representation
//     domains instead.
export type UnbrandOf<Value> = TODO; // TODO(koan)

type _16a = Expect<Equal<UnbrandOf<UserId>, string>>;
type _16b = Expect<Equal<UnbrandOf<BrandOf<number, "positive">>, number>>;
type _16c = Expect<Equal<UnbrandOf<string>, string>>;
type _16d = Expect<
  Equal<UnbrandOf<BrandOf<BrandOf<number, "positive">, "integer">>, number>
>;
type _16e = Expect<Equal<UnbrandOf<UserId | OrderId>, string>>;

// 17. Build the predicate that reports whether a value carries any evidence at
//     all, which is how a boundary decides that validation still has to run.
export type IsBrandedOf<Value> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<{ branded: IsBrandedOf<UserId>; raw: IsBrandedOf<string> }, { branded: true; raw: false }>
>;
type _17b = Expect<
  Equal<
    { stacked: IsBrandedOf<BrandOf<BrandOf<number, "positive">, "integer">>; number: IsBrandedOf<number> },
    { stacked: true; number: false }
  >
>;
type _17c = Expect<
  Equal<
    { union: IsBrandedOf<UserId | OrderId>; top: IsBrandedOf<unknown> },
    { union: true; top: false }
  >
>;
type _17d = Expect<
  Equal<
    { object: IsBrandedOf<{ id: string }>; brandedObject: IsBrandedOf<BrandOf<{ id: string }, "entity">> },
    { object: false; brandedObject: true }
  >
>;
type _17e = Expect<
  Equal<
    { unbranded: IsBrandedOf<UnbrandOf<UserId>>; original: IsBrandedOf<UserId> },
    { unbranded: false; original: true }
  >
>;

// 18. Build the constructor signatures the packet exports. The generic brander is
//     an unchecked assertion by design — the validating constructors are where a
//     real proof is actually established.
export type BrandRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    BrandRuntimeApi["brandValue"],
    <Value, Tag extends PropertyKey>(value: Value) => BrandOf<Value, Tag>
  >
>;
type _18b = Expect<Equal<BrandRuntimeApi["makeUserId"], (value: string) => UserId>>;
type _18c = Expect<
  Equal<
    {
      constructed: ReturnType<BrandRuntimeApi["makeUserId"]>;
      inward: GivenExtends<string, UserId>;
    },
    { constructed: UserId; inward: false }
  >
>;
type _18d = Expect<Equal<Parameters<BrandRuntimeApi["formatUserPath"]>, [id: UserId]>>;
type _18e = Expect<
  Equal<
    {
      constructorTakesRaw: Parameters<BrandRuntimeApi["makeUserId"]>[0];
      consumerDemandsProof: Parameters<BrandRuntimeApi["formatUserPath"]>[0];
      formattingLosesIt: ReturnType<BrandRuntimeApi["formatUserPath"]>;
    },
    { constructorTakesRaw: string; consumerDemandsProof: UserId; formattingLosesIt: string }
  >
>;
