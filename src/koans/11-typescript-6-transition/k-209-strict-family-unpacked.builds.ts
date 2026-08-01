import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-209: the strict family unpacked — constructions
 * =============================================================================
 *
 * `strict` is a versioned bundle, not a switch. Its six members each guard a
 * different boundary — nullability, implicit `any`, the receiver, function
 * parameter variance, class field initialization, and the type of a caught
 * exception — and each one can be turned on by itself. That is what makes a
 * staged migration possible and what makes a diagnostic explainable: the
 * question is never "is strict on" but "which member reported this".
 *
 * The bundle is also not everything. Several hardening flags people assume are
 * included are deliberately outside it, so `strict: true` leaves those boundaries
 * open. Build the membership, the boundary each member protects, what a partial
 * migration still leaves unguarded, and the observable type-level effect of the
 * three members that have one.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;

// ─── The bundle ───────────────────────────────────────────────────────

// 1. Build the six members of the family.
export type StrictMember = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    StrictMember,
    | "strictNullChecks"
    | "noImplicitAny"
    | "noImplicitThis"
    | "strictFunctionTypes"
    | "strictPropertyInitialization"
    | "useUnknownInCatchVariables"
  >
>;
type _01b = Expect<
  Equal<Extract<StrictMember, `noImplicit${string}`>, "noImplicitAny" | "noImplicitThis">
>;
type _01c = Expect<
  Equal<Extract<StrictMember, `strict${string}`>, "strictNullChecks" | "strictFunctionTypes" | "strictPropertyInitialization">
>;
type _01d = Expect<Equal<Extract<StrictMember, "noUncheckedIndexedAccess">, never>>;

// 2. Build the boundaries they guard.
export type Boundary = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    Boundary,
    "nullability" | "implicit-any" | "receiver" | "variance" | "initialization" | "unknown-catch"
  >
>;
type _02b = Expect<Equal<Extract<Boundary, `${string}-${string}`>, "implicit-any" | "unknown-catch">>;
type _02c = Expect<
  Equal<Exclude<Boundary, `${string}-${string}`>, "nullability" | "receiver" | "variance" | "initialization">
>;
type _02d = Expect<Equal<Extract<Boundary, "indexing">, never>>;

// 3. Build the mapping. One member, one boundary — which is why a diagnostic can
//    always be attributed to a single flag.
export type BoundaryFor<Member extends StrictMember> = TODO; // TODO(koan)

type _03a = Expect<Equal<BoundaryFor<"strictNullChecks">, "nullability">>;
type _03b = Expect<Equal<BoundaryFor<"noImplicitThis">, "receiver">>;
type _03c = Expect<Equal<BoundaryFor<"strictFunctionTypes">, "variance">>;
type _03d = Expect<Equal<BoundaryFor<"useUnknownInCatchVariables">, "unknown-catch">>;
type _03e = Expect<
  Equal<
    BoundaryFor<StrictMember>,
    "nullability" | "implicit-any" | "receiver" | "variance" | "initialization" | "unknown-catch"
  >
>;

// 4. Build the inverse lookup, which is the question you actually ask when a
//    diagnostic appears.
export type MemberProtecting<TheBoundary extends Boundary> = TODO; // TODO(koan)

type _04a = Expect<Equal<MemberProtecting<"nullability">, "strictNullChecks">>;
type _04b = Expect<Equal<MemberProtecting<"variance">, "strictFunctionTypes">>;
type _04c = Expect<Equal<MemberProtecting<"unknown-catch">, "useUnknownInCatchVariables">>;
type _04d = Expect<
  Equal<MemberProtecting<"receiver" | "initialization">, "noImplicitThis" | "strictPropertyInitialization">
>;

// 5. Build the family as a settings object — the shape `strict: true` amounts to.
export type StrictFamily = TODO; // TODO(koan)

type _05a = Expect<Equal<keyof StrictFamily, StrictMember>>;
type _05b = Expect<Equal<StrictFamily["strictNullChecks"], true>>;
type _05c = Expect<Equal<StrictFamily[keyof StrictFamily], true>>;
type _05d = Expect<Equal<Extract<StrictFamily["noImplicitAny"], false>, never>>;

// ─── A partial migration ──────────────────────────────────────────────

// 6. Build the settings a staged migration actually has: some members on, the
//    rest not yet.
export type PartialStrict<Enabled extends readonly StrictMember[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<PartialStrict<["strictNullChecks"]>["strictNullChecks"], true>>;
type _06b = Expect<Equal<PartialStrict<["strictNullChecks"]>["noImplicitAny"], false>>;
type _06c = Expect<Equal<keyof PartialStrict<[]>, StrictMember>>;
type _06d = Expect<Equal<PartialStrict<[]>[StrictMember], false>>;

// 7. Build the boundary coverage a partial migration gives you.
export type ProtectedBoundaries<
  Enabled extends readonly StrictMember[],
> = TODO; // TODO(koan)

type _07a = Expect<Equal<ProtectedBoundaries<["strictNullChecks"]>, "nullability">>;
type _07b = Expect<
  Equal<ProtectedBoundaries<["strictNullChecks", "noImplicitAny"]>, "nullability" | "implicit-any">
>;
type _07c = Expect<Equal<ProtectedBoundaries<[]>, never>>;
type _07d = Expect<Equal<ProtectedBoundaries<["useUnknownInCatchVariables"]>, "unknown-catch">>;

// 8. Build what is still open, which is the useful half of the report.
export type UnprotectedBoundaries<Enabled extends readonly StrictMember[]> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    UnprotectedBoundaries<["strictNullChecks"]>,
    "implicit-any" | "receiver" | "variance" | "initialization" | "unknown-catch"
  >
>;
type _08b = Expect<
  Equal<
    UnprotectedBoundaries<[]>,
    "nullability" | "implicit-any" | "receiver" | "variance" | "initialization" | "unknown-catch"
  >
>;
type _08c = Expect<
  Equal<
    UnprotectedBoundaries<
      [
        "strictNullChecks",
        "noImplicitAny",
        "noImplicitThis",
        "strictFunctionTypes",
        "strictPropertyInitialization",
        "useUnknownInCatchVariables",
      ]
    >,
    never
  >
>;
type _08d = Expect<
  Equal<Extract<UnprotectedBoundaries<["strictNullChecks"]>, "nullability">, never>
>;

// 9. Build the question "is this the same as strict: true?".
export type IsFullyStrict<Enabled extends readonly StrictMember[]> = TODO; // TODO(koan)

type _09a = Expect<Equal<IsFullyStrict<[]>, false>>;
type _09b = Expect<Equal<IsFullyStrict<["strictNullChecks"]>, false>>;
type _09c = Expect<
  Equal<
    IsFullyStrict<
      [
        "strictNullChecks",
        "noImplicitAny",
        "noImplicitThis",
        "strictFunctionTypes",
        "strictPropertyInitialization",
        "useUnknownInCatchVariables",
      ]
    >,
    true
  >
>;
type _09d = Expect<Equal<IsFullyStrict<["strictNullChecks", "noImplicitAny"]>, false>>;

// ─── What the bundle leaves out ───────────────────────────────────────

// 10. Build the hardening flags that are *not* in the family, however strict
//     they sound.
export type StrictAdjacentFlag = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    StrictAdjacentFlag,
    | "noUncheckedIndexedAccess"
    | "exactOptionalPropertyTypes"
    | "noImplicitOverride"
    | "noPropertyAccessFromIndexSignature"
  >
>;
type _10b = Expect<Equal<Extract<StrictAdjacentFlag, StrictMember>, never>>;
type _10c = Expect<
  Equal<Extract<StrictAdjacentFlag, `no${string}`>, "noUncheckedIndexedAccess" | "noImplicitOverride" | "noPropertyAccessFromIndexSignature">
>;
type _10d = Expect<Equal<Extract<StrictAdjacentFlag, "strictNullChecks">, never>>;

// 11. Build the membership test, which is the answer to "I set strict, why is
//     this still allowed?".
export type IncludedInStrict<Flag extends StrictMember | StrictAdjacentFlag> = TODO; // TODO(koan)

type _11a = Expect<Equal<IncludedInStrict<"strictNullChecks">, true>>;
type _11b = Expect<Equal<IncludedInStrict<"useUnknownInCatchVariables">, true>>;
type _11c = Expect<Equal<IncludedInStrict<"noUncheckedIndexedAccess">, false>>;
type _11d = Expect<Equal<IncludedInStrict<"exactOptionalPropertyTypes">, false>>;
type _11e = Expect<Equal<IncludedInStrict<StrictAdjacentFlag>, false>>;

// ─── What three of them do to types ───────────────────────────────────

// 12. Build the effect of the nullability member: with it off, `null` and
//     `undefined` are absorbed into every other type.
export type UnderNullChecks<Declared, On extends boolean> = TODO; // TODO(koan)

type _12a = Expect<Equal<UnderNullChecks<string | null, true>, string | null>>;
type _12b = Expect<Equal<UnderNullChecks<string | null, false>, string>>;
type _12c = Expect<Equal<UnderNullChecks<string | undefined, false>, string>>;
type _12d = Expect<Equal<UnderNullChecks<null, false>, never>>;

// 13. Build the effect of the catch member.
export type CatchVariableType<On extends boolean> = TODO; // TODO(koan)

type _13a = Expect<Equal<CatchVariableType<true>, unknown>>;
type _13b = Expect<
  Equal<
    {
      theLooseCatchVariableIsAny: IsAny<CatchVariableType<false>>;
      butTheStrictOneIsUnknown: CatchVariableType<true>;
    },
    { theLooseCatchVariableIsAny: true; butTheStrictOneIsUnknown: unknown }
  >
>;
type _13c = Expect<Equal<IsAny<CatchVariableType<true>>, false>>;
type _13d = Expect<
  Equal<
    {
      theStrictOneForcesANarrowing: GivenExtends<CatchVariableType<true>, Error>;
      theLooseOneDoesNot: GivenExtends<CatchVariableType<false>, Error>;
    },
    { theStrictOneForcesANarrowing: false; theLooseOneDoesNot: true }
  >
>;

// 14. Build the effect of the variance member: with it on, a function property's
//     parameters are checked contravariantly.
export type ParameterCheck<On extends boolean> = TODO; // TODO(koan)

type _14a = Expect<Equal<ParameterCheck<true>, "contravariant">>;
type _14b = Expect<Equal<ParameterCheck<false>, "bivariant">>;
type _14c = Expect<Equal<ParameterCheck<boolean>, "contravariant" | "bivariant">>;
type _14d = Expect<Equal<Equal<ParameterCheck<true>, ParameterCheck<false>>, false>>;

// 15. Build the assignability that member decides, so the effect can be seen
//     rather than named: a handler taking the wider type is the one that fits.
export type HandlerFits<Wider, Narrower> = TODO; // TODO(koan)

type _15a = Expect<Equal<HandlerFits<string, "a">["widerIntoNarrowerSlot"], true>>;
type _15b = Expect<Equal<HandlerFits<string, "a">["narrowerIntoWiderSlot"], false>>;
type _15c = Expect<Equal<keyof HandlerFits<string, "a">, "widerIntoNarrowerSlot" | "narrowerIntoWiderSlot">>;
type _15d = Expect<
  Equal<HandlerFits<string, string>, { widerIntoNarrowerSlot: true; narrowerIntoWiderSlot: true }>
>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the family as a table: every member with the boundary it guards.
export type FamilyProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<FamilyProfile["strictNullChecks"], "nullability">>;
type _16b = Expect<Equal<FamilyProfile["noImplicitAny"], "implicit-any">>;
type _16c = Expect<Equal<FamilyProfile["strictPropertyInitialization"], "initialization">>;
type _16d = Expect<Equal<keyof FamilyProfile, StrictMember>>;
type _16e = Expect<
  Equal<
    FamilyProfile[StrictMember],
    "nullability" | "implicit-any" | "receiver" | "variance" | "initialization" | "unknown-catch"
  >
>;

// 17. Report a migration that has done the first two steps: what it has covered,
//     what it has not, and how far from `strict: true` it still is.
export type MigrationProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<MigrationProfile["covered"], "nullability" | "implicit-any">>;
type _17b = Expect<
  Equal<MigrationProfile["stillOpen"], "receiver" | "variance" | "initialization" | "unknown-catch">
>;
type _17c = Expect<Equal<MigrationProfile["finished"], false>>;
type _17d = Expect<Equal<MigrationProfile["settings"]["noImplicitThis"], false>>;
type _17e = Expect<Equal<MigrationProfile["andNoAdjacentFlagCameWithIt"], false>>;

// 18. Report one member at a glance: what it guards, whether a given migration
//     has it, and what it does to a type when it is on.
export type StrictMemberReport<
  Member extends StrictMember,
  Enabled extends readonly StrictMember[],
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<StrictMemberReport<"strictNullChecks", ["strictNullChecks"]>["guards"], "nullability">
>;
type _18b = Expect<Equal<StrictMemberReport<"strictNullChecks", ["strictNullChecks"]>["enabled"], true>>;
type _18c = Expect<Equal<StrictMemberReport<"noImplicitAny", ["strictNullChecks"]>["covered"], false>>;
type _18d = Expect<
  Equal<StrictMemberReport<"strictNullChecks", ["strictNullChecks"]>["nullableStringBecomes"], string | null>
>;
type _18e = Expect<
  Equal<
    {
      theCatchMemberWasNotEnabled: IsAny<
        StrictMemberReport<"strictNullChecks", ["strictNullChecks"]>["caughtValueBecomes"]
      >;
      soTheReportedBoundaryIsStillOpen: Extract<
        StrictMemberReport<"strictNullChecks", ["strictNullChecks"]>["guards"],
        "unknown-catch"
      >;
    },
    { theCatchMemberWasNotEnabled: true; soTheReportedBoundaryIsStillOpen: never }
  >
>;
