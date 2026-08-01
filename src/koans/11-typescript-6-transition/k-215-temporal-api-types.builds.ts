import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-215: Temporal API types — constructions
 * =============================================================================
 *
 * `Date` conflates several ideas: an exact instant, a calendar date, a wall-clock
 * time, a time zone, and a mutable object. Temporal separates them, and the
 * separation is the API's whole content — a `PlainDate` has no time zone to be
 * wrong about, an `Instant` has no calendar to disagree with, and a `Duration` is
 * an amount rather than a point.
 *
 * TypeScript 6.0 ships `esnext.temporal` declarations. A declaration describes a
 * host capability; it does not create one, so a project that types against
 * Temporal still has to know whether the runtime has it. Build the concepts, the
 * information each one carries, and what a conversion between them needs that
 * the source does not have.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The concepts ─────────────────────────────────────────────────────

// 1. Build the pieces Temporal splits `Date` into.
export type TemporalConcept = TODO; // TODO(koan)

type _01a = Expect<
  Equal<TemporalConcept, "Instant" | "PlainDate" | "PlainTime" | "ZonedDateTime" | "Duration" | "Now">
>;
type _01b = Expect<Equal<Extract<TemporalConcept, `Plain${string}`>, "PlainDate" | "PlainTime">>;
type _01c = Expect<
  Equal<Exclude<TemporalConcept, `Plain${string}`>, "Instant" | "ZonedDateTime" | "Duration" | "Now">
>;
type _01d = Expect<Equal<Extract<TemporalConcept, "Date">, never>>;

// 2. Build what each concept is *about*, which is the distinction `Date` lost.
export type RoleOf<Concept extends TemporalConcept> = TODO; // TODO(koan)

type _02a = Expect<Equal<RoleOf<"Instant">, "timeline">>;
type _02b = Expect<Equal<RoleOf<"PlainDate">, "calendar-date">>;
type _02c = Expect<Equal<RoleOf<"Duration">, "amount">>;
type _02d = Expect<Equal<RoleOf<"Now">, "host-clock">>;
type _02e = Expect<
  Equal<RoleOf<TemporalConcept>, "timeline" | "calendar-date" | "wall-time" | "zoned" | "amount" | "host-clock">
>;

// 3. Build the declared type each concept names.
export type TypeFor<Concept extends TemporalConcept> = TODO; // TODO(koan)

type _03a = Expect<Equal<TypeFor<"Instant">, Temporal.Instant>>;
type _03b = Expect<Equal<TypeFor<"PlainDate">, Temporal.PlainDate>>;
type _03c = Expect<Equal<TypeFor<"Duration">, Temporal.Duration>>;
type _03d = Expect<Equal<TypeFor<"Instant">["epochNanoseconds"], bigint>>;
type _03e = Expect<Equal<TypeFor<"PlainDate">["year"], number>>;

// ─── What each one carries ────────────────────────────────────────────

// 4. Build the pieces of information a value can carry.
export type Component = TODO; // TODO(koan)

type _04a = Expect<Equal<Component, "date" | "time" | "zone" | "exactness">>;
type _04b = Expect<Equal<Exclude<Component, "zone">, "date" | "time" | "exactness">>;
type _04c = Expect<Equal<Extract<Component, "exactness">, "exactness">>;
type _04d = Expect<Equal<Extract<Component, "calendar">, never>>;

// 5. Build what each concept has. This table is the API: a `PlainDate` has no
//    zone, so no code can read one off it by mistake.
export type ComponentsOf<Concept extends TemporalConcept> = TODO; // TODO(koan)

type _05a = Expect<Equal<ComponentsOf<"Instant">, "exactness">>;
type _05b = Expect<Equal<ComponentsOf<"PlainDate">, "date">>;
type _05c = Expect<Equal<ComponentsOf<"ZonedDateTime">, "date" | "time" | "zone" | "exactness">>;
type _05d = Expect<Equal<ComponentsOf<"Duration">, never>>;
type _05e = Expect<Equal<Extract<ComponentsOf<"PlainDate">, "zone">, never>>;

// 6. Build the membership question, which is what a reviewer actually asks.
export type Carries<
  Concept extends TemporalConcept,
  Part extends Component,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<Carries<"ZonedDateTime", "zone">, true>>;
type _06b = Expect<Equal<Carries<"PlainDate", "zone">, false>>;
type _06c = Expect<Equal<Carries<"Instant", "exactness">, true>>;
type _06d = Expect<Equal<Carries<"PlainTime", "date">, false>>;

// ─── Converting between them ──────────────────────────────────────────

// 7. Build what a conversion is missing: the components the target needs and the
//    source does not have.
export type MissingFor<
  From extends TemporalConcept,
  To extends TemporalConcept,
> = TODO; // TODO(koan)

type _07a = Expect<Equal<MissingFor<"PlainDate", "ZonedDateTime">, "time" | "zone" | "exactness">>;
type _07b = Expect<Equal<MissingFor<"ZonedDateTime", "PlainDate">, never>>;
type _07c = Expect<Equal<MissingFor<"Instant", "PlainDate">, "date">>;
type _07d = Expect<Equal<MissingFor<"PlainDate", "PlainDate">, never>>;

// 8. Build the question that follows: can this conversion be done with nothing
//    but the value in hand?
export type ConversionNeedsInput<From extends TemporalConcept, To extends TemporalConcept> = TODO; // TODO(koan)

type _08a = Expect<Equal<ConversionNeedsInput<"PlainDate", "ZonedDateTime">, true>>;
type _08b = Expect<Equal<ConversionNeedsInput<"ZonedDateTime", "PlainDate">, false>>;
type _08c = Expect<Equal<ConversionNeedsInput<"ZonedDateTime", "Instant">, false>>;
type _08d = Expect<Equal<ConversionNeedsInput<"Instant", "ZonedDateTime">, true>>;

// ─── Arithmetic ───────────────────────────────────────────────────────

// 9. Build the signature of adding an amount to a point: the concept is
//    preserved, and a new value comes back.
export type AddSignature<Concept extends TemporalConcept> = TODO; // TODO(koan)

type _09a = Expect<Equal<ReturnType<AddSignature<"Instant">>, Temporal.Instant>>;
type _09b = Expect<Equal<ReturnType<AddSignature<"PlainDate">>, Temporal.PlainDate>>;
type _09c = Expect<Equal<Parameters<AddSignature<"Instant">>[0], Temporal.Duration>>;
type _09d = Expect<Equal<Parameters<AddSignature<"Instant">>["length"], 1>>;

// 10. Build the signature of subtracting two points, which produces the amount
//     between them rather than another point.
export type UntilSignature<Concept extends TemporalConcept> = TODO; // TODO(koan)

type _10a = Expect<Equal<ReturnType<UntilSignature<"Instant">>, Temporal.Duration>>;
type _10b = Expect<Equal<Parameters<UntilSignature<"PlainDate">>[0], Temporal.PlainDate>>;
type _10c = Expect<Equal<ReturnType<UntilSignature<"PlainDate">>["days"], number>>;
type _10d = Expect<
  Equal<Equal<ReturnType<AddSignature<"Instant">>, ReturnType<UntilSignature<"Instant">>>, false>
>;

// 11. Build the immutability every Temporal type has, which is the other half of
//     what `Date` got wrong.
export type Immutable<Value> = TODO; // TODO(koan)

type _11a = Expect<Equal<Immutable<{ year: number }>, { readonly year: number }>>;
type _11b = Expect<Equal<keyof Immutable<{ year: number; month: number }>, "year" | "month">>;
type _11c = Expect<Equal<Immutable<{ year: number }>["year"], number>>;
type _11d = Expect<
  Equal<
    {
      aMutableValueFitsTheReadonlyShape: GivenExtends<{ year: number }, Immutable<{ year: number }>>;
      andTheFieldIsReadonly: Immutable<{ year: number }>;
    },
    { aMutableValueFitsTheReadonlyShape: true; andTheFieldIsReadonly: { readonly year: number } }
  >
>;

// ─── Declarations are not a runtime ───────────────────────────────────

// 12. Build the claims a project might read into having the declarations.
export type Claim = TODO; // TODO(koan)

type _12a = Expect<
  Equal<Claim, "theTypesAreAvailable" | "theApiShapeIsChecked" | "theRuntimeImplementsIt" | "aPolyfillWasInstalled">
>;
type _12b = Expect<Equal<Extract<Claim, `a${string}`>, "aPolyfillWasInstalled">>;
type _12c = Expect<
  Equal<Exclude<Claim, "theRuntimeImplementsIt" | "aPolyfillWasInstalled">, "theTypesAreAvailable" | "theApiShapeIsChecked">
>;
type _12d = Expect<Equal<Extract<Claim, "theClockIsAccurate">, never>>;

// 13. Build which of them the declarations settle.
export type SettledByDeclarations<TheClaim extends Claim> = TODO; // TODO(koan)

type _13a = Expect<Equal<SettledByDeclarations<"theTypesAreAvailable">, true>>;
type _13b = Expect<Equal<SettledByDeclarations<"theApiShapeIsChecked">, true>>;
type _13c = Expect<Equal<SettledByDeclarations<"theRuntimeImplementsIt">, false>>;
type _13d = Expect<Equal<SettledByDeclarations<"aPolyfillWasInstalled">, false>>;
type _13e = Expect<Equal<SettledByDeclarations<Claim>, boolean>>;

// 14. Build the shape a feature detection has to have, since the declarations
//     cannot answer the runtime question for you.
export type FeatureDetected<Present extends boolean, Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<FeatureDetected<true, Temporal.Instant>, Temporal.Instant>>;
type _14b = Expect<Equal<FeatureDetected<false, Temporal.Instant>, undefined>>;
type _14c = Expect<
  Equal<FeatureDetected<boolean, Temporal.Instant>, Temporal.Instant | undefined>
>;
type _14d = Expect<Equal<NonNullable<FeatureDetected<boolean, Temporal.Instant>>, Temporal.Instant>>;

// ─── What Date conflated ──────────────────────────────────────────────

// 15. Build the legacy type's position in the same table: one object carrying
//     everything, which is why it could always be read the wrong way.
export type LegacyComponents = TODO; // TODO(koan)

type _15a = Expect<Equal<LegacyComponents, "date" | "time" | "exactness">>;
type _15b = Expect<Equal<Extract<LegacyComponents, "zone">, never>>;
type _15c = Expect<
  Equal<Exclude<LegacyComponents, ComponentsOf<"PlainDate">>, "time" | "exactness">
>;
type _15d = Expect<Equal<Exclude<ComponentsOf<"ZonedDateTime">, LegacyComponents>, "zone">>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the separation: three concepts, three different sets of information.
export type SeparationProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<SeparationProfile["anInstantCarries"], "exactness">>;
type _16b = Expect<Equal<SeparationProfile["aPlainDateCarries"], "date">>;
type _16c = Expect<
  Equal<SeparationProfile["aZonedDateTimeCarries"], "date" | "time" | "zone" | "exactness">
>;
type _16d = Expect<Equal<SeparationProfile["aPlainDateHasNoZone"], false>>;
type _16e = Expect<Equal<SeparationProfile["andADurationIsNotAPointAtAll"], never>>;

// 17. Report a conversion in each direction, and what the awkward one needs.
export type ConversionProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<ConversionProfile["downwards"], false>>;
type _17b = Expect<Equal<ConversionProfile["upwards"], true>>;
type _17c = Expect<
  Equal<ConversionProfile["whatTheUpwardOneIsMissing"], "time" | "zone" | "exactness">
>;
type _17d = Expect<Equal<ConversionProfile["andTheZoneIsPartOfIt"], "zone">>;

// 18. Report one concept at a glance: its role, what it carries, what arithmetic
//     on it produces, and what the declarations did not promise.
export type TemporalReport<Concept extends TemporalConcept> = TODO; // TODO(koan)

type _18a = Expect<Equal<TemporalReport<"Instant">["role"], "timeline">>;
type _18b = Expect<Equal<TemporalReport<"Instant">["carries"], "exactness">>;
type _18c = Expect<Equal<TemporalReport<"PlainDate">["afterAdding"], Temporal.PlainDate>>;
type _18d = Expect<Equal<TemporalReport<"PlainDate">["betweenTwo"], Temporal.Duration>>;
type _18e = Expect<Equal<TemporalReport<"Instant">["runtimeGuaranteed"], false>>;
