import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-139: opaque module types — constructions
 * =============================================================================
 *
 * A brand only holds if nobody else can write it down. An opaque module keeps the
 * unique-symbol key unexported, so outside the module the evidence is observable
 * but unnameable — and therefore unforgeable by structural means. That makes
 * opacity an API architecture rather than a type spelling: the real design is who
 * can construct a value, who can preserve one, and who can opt back out to the
 * raw representation. Two behaviours deserve attention. Unlike a literal beside
 * its base type, an opaque subtype is *not* absorbed by its representation in a
 * union — the union keeps both members even though everything in it is assignable
 * to the base. And two opaque types over the same representation intersect to
 * nothing at all, because their evidence properties disagree. Replace each `TODO`
 * with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// The key stays unexported: that unnameability is the entire mechanism.
declare const opaque: unique symbol;

// ─── The module's private vocabulary ──────────────────────────────────

// 1. Build the opaque money type: the representation intersected with a phantom
//    property keyed by the module's private symbol.
export type Cents = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    { outward: GivenExtends<Cents, number>; inward: GivenExtends<number, Cents> },
    { outward: true; inward: false }
  >
>;
type _01b = Expect<Equal<GivenExtends<number, Cents>, false>>;
type _01c = Expect<
  Equal<
    { held: Cents extends number ? number : never; inward: GivenExtends<number, Cents> },
    { held: number; inward: false }
  >
>;
type _01d = Expect<
  Equal<
    { symbolIsAKey: typeof opaque extends keyof Cents ? true : false; inward: GivenExtends<number, Cents> },
    { symbolIsAKey: true; inward: false }
  >
>;
type _01e = Expect<
  Equal<
    { distinct: Equal<Cents, number>; inward: GivenExtends<number, Cents> },
    { distinct: false; inward: false }
  >
>;

// 2. Build a second opaque type over the same representation, which is what makes
//    the distinction observable.
export type Meters = TODO; // TODO(koan)

type _02a = Expect<Equal<GivenExtends<Cents, Meters>, false>>;
type _02b = Expect<Equal<GivenExtends<Meters, Cents>, false>>;
type _02c = Expect<Equal<Equal<Cents, Meters>, false>>;
type _02d = Expect<
  Equal<
    { outward: GivenExtends<Meters, number>; inward: GivenExtends<number, Meters> },
    { outward: true; inward: false }
  >
>;
type _02e = Expect<Equal<Cents | Meters extends number ? true : false, true>>;

// 3. Build the opaque string type.
export type EmailAddress = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    { outward: GivenExtends<EmailAddress, string>; inward: GivenExtends<string, EmailAddress> },
    { outward: true; inward: false }
  >
>;
type _03b = Expect<Equal<GivenExtends<string, EmailAddress>, false>>;
type _03c = Expect<
  Equal<
    { distinct: Equal<EmailAddress, string>; inward: GivenExtends<string, EmailAddress> },
    { distinct: false; inward: false }
  >
>;
type _03d = Expect<
  Equal<
    { element: ReadonlyArray<EmailAddress>[number]; inward: GivenExtends<string, EmailAddress> },
    { element: EmailAddress; inward: false }
  >
>;
type _03e = Expect<
  Equal<
    { cleaned: NonNullable<EmailAddress | null | undefined>; inward: GivenExtends<string, EmailAddress> },
    { cleaned: EmailAddress; inward: false }
  >
>;

// 4. Build the opaque object type, where the representation is a shape rather
//    than a primitive.
export type SessionToken = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    {
      outward: GivenExtends<SessionToken, { readonly value: string }>;
      inward: GivenExtends<{ readonly value: string }, SessionToken>;
    },
    { outward: true; inward: false }
  >
>;
type _04b = Expect<Equal<GivenExtends<{ readonly value: string }, SessionToken>, false>>;
type _04c = Expect<Equal<SessionToken["value"], string>>;
type _04d = Expect<
  Equal<
    {
      hasValueKey: "value" extends keyof SessionToken ? true : false;
      inward: GivenExtends<{ readonly value: string }, SessionToken>;
    },
    { hasValueKey: true; inward: false }
  >
>;
type _04e = Expect<Equal<symbol extends keyof SessionToken ? true : false, false>>;

// ─── Where proof enters, stays, and leaves ────────────────────────────

// 5. Build the constructor signatures — the only place a proof can be created.
//    Each takes the raw representation and returns the opaque type.
export type ConstructorApi = TODO; // TODO(koan)

type _05a = Expect<
  Equal<ConstructorApi["makeCents"], (value: number) => Cents>
>;
type _05b = Expect<
  Equal<
    { produced: ReturnType<ConstructorApi["makeCents"]>; inward: GivenExtends<number, Cents> },
    { produced: Cents; inward: false }
  >
>;
type _05c = Expect<Equal<Parameters<ConstructorApi["makeCents"]>, [value: number]>>;
type _05d = Expect<
  Equal<
    { produced: ReturnType<ConstructorApi["makeEmailAddress"]>; inward: GivenExtends<string, EmailAddress> },
    { produced: EmailAddress; inward: false }
  >
>;
type _05e = Expect<
  Equal<Parameters<ConstructorApi["makeSessionToken"]>, [value: string]>
>;

// 6. Build the operation signatures: one that preserves the proof and one that
//    deliberately gives it up.
export type OperationApi = TODO; // TODO(koan)

type _06a = Expect<Equal<OperationApi["addCents"], (left: Cents, right: Cents) => Cents>>;
type _06b = Expect<Equal<Parameters<OperationApi["addCents"]>, [left: Cents, right: Cents]>>;
type _06c = Expect<
  Equal<
    { preserved: ReturnType<OperationApi["addCents"]>; inward: GivenExtends<number, Cents> },
    { preserved: Cents; inward: false }
  >
>;
type _06d = Expect<Equal<ReturnType<OperationApi["centsValue"]>, number>>;
type _06e = Expect<
  Equal<
    { operandDomain: Parameters<OperationApi["addCents"]>[number]; inward: GivenExtends<number, Cents> },
    { operandDomain: Cents; inward: false }
  >
>;

// ─── What preserves evidence and what discards it ─────────────────────

// 7. Report the wrappers that preserve opacity because they preserve whatever
//    type they were handed.
export type PreservationProfile = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    { held: PreservationProfile["promiseFulfillment"]; inward: GivenExtends<number, Cents> },
    { held: Cents; inward: false }
  >
>;
type _07b = Expect<
  Equal<
    { held: PreservationProfile["arrayElement"]; inward: GivenExtends<string, EmailAddress> },
    { held: EmailAddress; inward: false }
  >
>;
type _07c = Expect<
  Equal<
    { held: PreservationProfile["cleanedNullable"]; inward: GivenExtends<number, Cents> },
    { held: Cents; inward: false }
  >
>;
type _07d = Expect<
  Equal<
    { held: PreservationProfile["insideReadonlyObject"]; inward: GivenExtends<number, Cents> },
    { held: Cents; inward: false }
  >
>;
type _07e = Expect<
  Equal<
    { held: PreservationProfile["extractedMember"]; inward: GivenExtends<number, Cents> },
    { held: Cents; inward: false }
  >
>;

// 8. Report the operations that discard it, because they produce a fresh value of
//    the raw representation and have no reason to reapply the proof.
export type ErasureProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<ErasureProfile["functionResult"], number>>;
type _08b = Expect<Equal<ErasureProfile["widenedByConditional"], number>>;
type _08c = Expect<Equal<ErasureProfile["interpolated"], string>>;
type _08d = Expect<Equal<ErasureProfile["unwrapped"], number>>;
type _08e = Expect<Equal<ErasureProfile["rawIsStillRaw"], false>>;

// ─── Union behaviour that is easy to guess wrong ──────────────────────

// 9. Report an opaque type NOT being absorbed by its own representation in a
//    union. Everything in the union is assignable to the base, yet both members
//    survive — unlike a literal beside its base type, which really does collapse.
export type UnionSurvivalProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<UnionSurvivalProfile["numericUnionCollapses"], false>>;
type _09b = Expect<Equal<UnionSurvivalProfile["stringUnionCollapses"], false>>;
type _09c = Expect<Equal<UnionSurvivalProfile["objectUnionCollapses"], false>>;
type _09d = Expect<Equal<UnionSurvivalProfile["literalReallyDoesCollapse"], true>>;
type _09e = Expect<Equal<UnionSurvivalProfile["allStillAssignable"], true>>;

// 10. Report filtering over those surviving unions, which behaves exactly as the
//     members' assignability says it should.
export type UnionFilterProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    { selected: UnionFilterProfile["extractedFromBase"]; inward: GivenExtends<number, Cents> },
    { selected: Cents; inward: false }
  >
>;
type _10b = Expect<
  Equal<
    { selected: UnionFilterProfile["extractedFromSibling"]; inward: GivenExtends<number, Cents> },
    { selected: Cents; inward: false }
  >
>;
type _10c = Expect<
  Equal<
    { selected: UnionFilterProfile["excludedSibling"]; inward: GivenExtends<number, Meters> },
    { selected: Meters; inward: false }
  >
>;
type _10d = Expect<Equal<UnionFilterProfile["baseAcceptsUnion"], true>>;
type _10e = Expect<Equal<UnionFilterProfile["unionAcceptsBase"], true>>;

// 11. Report two opaque types over the same representation intersecting to
//     nothing, because their evidence properties cannot both hold.
export type IntersectionProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<IntersectionProfile["siblings"], never>>;
type _11b = Expect<Equal<IntersectionProfile["siblingsAreEmpty"], true>>;
type _11c = Expect<
  Equal<
    { result: IntersectionProfile["withOwnRepresentation"]; inward: GivenExtends<number, Cents> },
    { result: Cents; inward: false }
  >
>;
type _11d = Expect<Equal<IntersectionProfile["withOwnRepresentationIsNotEmpty"], false>>;
type _11e = Expect<
  Equal<
    { result: IntersectionProfile["selfIntersection"]; inward: GivenExtends<number, Cents> },
    { result: Cents; inward: false }
  >
>;

// ─── Variance around the boundary ─────────────────────────────────────

// 12. Report function variance across the boundary: a consumer of the raw
//     representation accepts opaque values, and a producer of opaque values
//     satisfies a consumer expecting the raw one.
export type VarianceProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<VarianceProfile["rawConsumerIntoOpaqueConsumer"], true>>;
type _12b = Expect<Equal<VarianceProfile["opaqueConsumerIntoRawConsumer"], false>>;
type _12c = Expect<Equal<VarianceProfile["opaqueProducerIntoRawProducer"], true>>;
type _12d = Expect<Equal<VarianceProfile["rawProducerIntoOpaqueProducer"], false>>;
type _12e = Expect<Equal<VarianceProfile["unwrapperAcceptsConstructed"], true>>;

// ─── Surfaces built on the boundary ───────────────────────────────────

// 13. Build the predicate that reports whether a type carries this module's
//     evidence — something only code that can name the key is able to ask.
export type IsOpaqueOf<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<{ opaqueValue: IsOpaqueOf<Cents>; raw: IsOpaqueOf<number> }, { opaqueValue: true; raw: false }>
>;
type _13b = Expect<
  Equal<
    { stringOpaque: IsOpaqueOf<EmailAddress>; rawString: IsOpaqueOf<string> },
    { stringOpaque: true; rawString: false }
  >
>;
type _13c = Expect<
  Equal<
    { objectOpaque: IsOpaqueOf<SessionToken>; rawObject: IsOpaqueOf<{ readonly value: string }> },
    { objectOpaque: true; rawObject: false }
  >
>;
type _13d = Expect<
  Equal<
    { sibling: IsOpaqueOf<Meters>; unionOfOpaques: IsOpaqueOf<Cents | Meters> },
    { sibling: true; unionOfOpaques: true }
  >
>;
type _13e = Expect<
  Equal<
    { mixedUnion: IsOpaqueOf<Cents | number>; empty: IsOpaqueOf<never> },
    { mixedUnion: boolean; empty: never }
  >
>;

// 14. Build the reader that names which opaque identity a value carries, which is
//     the module-internal counterpart of the tag reader from the previous packet.
export type OpaqueTagOf<Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<OpaqueTagOf<Cents>, "Cents">>;
type _14b = Expect<Equal<OpaqueTagOf<Meters>, "Meters">>;
type _14c = Expect<Equal<OpaqueTagOf<number>, never>>;
type _14d = Expect<Equal<OpaqueTagOf<Cents | Meters>, "Cents" | "Meters">>;
type _14e = Expect<Equal<OpaqueTagOf<SessionToken>, "SessionToken">>;

// 15. Build the full exported surface, which is the actual design: construction,
//     preservation, and a single deliberate exit back to the representation.
export type OpaqueModuleApi = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    keyof OpaqueModuleApi,
    "makeEmailAddress" | "makeCents" | "makeMeters" | "makeSessionToken" | "addCents" | "centsValue"
  >
>;
type _15b = Expect<
  Equal<
    { entry: ReturnType<OpaqueModuleApi["makeCents"]>; inward: GivenExtends<number, Cents> },
    { entry: Cents; inward: false }
  >
>;
type _15c = Expect<
  Equal<
    { preserved: ReturnType<OpaqueModuleApi["addCents"]>; inward: GivenExtends<number, Cents> },
    { preserved: Cents; inward: false }
  >
>;
type _15d = Expect<Equal<ReturnType<OpaqueModuleApi["centsValue"]>, number>>;
type _15e = Expect<
  Equal<
    {
      entersAsRaw: Parameters<OpaqueModuleApi["makeCents"]>[0];
      leavesAsRaw: ReturnType<OpaqueModuleApi["centsValue"]>;
      staysOpaqueBetween: ReturnType<OpaqueModuleApi["addCents"]>;
    },
    { entersAsRaw: number; leavesAsRaw: number; staysOpaqueBetween: Cents }
  >
>;
