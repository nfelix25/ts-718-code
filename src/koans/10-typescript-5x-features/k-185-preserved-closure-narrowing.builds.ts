import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-185: preserved narrowing in closures — constructions
 * =============================================================================
 *
 * A closure may run at any time, so TypeScript used to widen every captured
 * variable back to its declared type. Since 5.4 it looks for the variable's
 * *last assignment*: if every path through that assignment establishes a
 * narrower type, the closure is created after it, and nothing writes the
 * variable from inside a function, the narrowing survives into the closure.
 *
 * The rule is deliberately conservative, and the three disqualifiers are what
 * this file models: a hoisted `function` declaration could run before the
 * assignment, a closure created earlier could too, and a write from inside any
 * nested function means the checker can no longer name a last assignment at all.
 * Build the decision, then read one captured variable through it.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── What an assignment establishes ───────────────────────────────────

// 1. Build the declared type of the variable the koan captures — the union a
//    closure would widen back to.
export type CapturedUnion = TODO; // TODO(koan)

type _01a = Expect<Equal<Exclude<CapturedUnion, string>, URL>>;
type _01b = Expect<Equal<Extract<CapturedUnion, string>, string>>;
type _01c = Expect<Equal<Extract<CapturedUnion, number>, never>>;
type _01d = Expect<
  Equal<
    {
      theNarrowedTypeFitsTheUnion: GivenExtends<URL, CapturedUnion>;
      butTheUnionDoesNotFitTheNarrowedType: GivenExtends<CapturedUnion, URL>;
    },
    { theNarrowedTypeFitsTheUnion: true; butTheUnionDoesNotFitTheNarrowedType: false }
  >
>;

// 2. Build what a plain assignment leaves behind: the written type, provided it
//    was assignable to the declaration in the first place.
export type AfterAssignment<Declared, Written> = TODO; // TODO(koan)

type _02a = Expect<Equal<AfterAssignment<CapturedUnion, URL>, URL>>;
type _02b = Expect<Equal<AfterAssignment<string | undefined, string>, string>>;
type _02c = Expect<Equal<AfterAssignment<CapturedUnion, number>, never>>;
type _02d = Expect<Equal<AfterAssignment<unknown, string>, string>>;

// 3. Build what `??=` leaves behind: the non-nullish part of the declaration,
//    plus whatever the fallback contributes.
export type NullishAssign<Declared, Fallback> = TODO; // TODO(koan)

type _03a = Expect<Equal<NullishAssign<string | undefined, string>, string>>;
type _03b = Expect<Equal<NullishAssign<number | undefined, "none">, number | "none">>;
type _03c = Expect<Equal<NullishAssign<string, never>, string>>;
type _03d = Expect<Equal<NullishAssign<undefined, 1>, 1>>;

// ─── The three things that can go wrong ───────────────────────────────

// 4. Build the closure forms a captured variable can be read from. Only the two
//    that cannot run before their own definition are candidates.
export type ClosureKind = TODO; // TODO(koan)

type _04a = Expect<Equal<ClosureKind, "arrow" | "functionExpression" | "hoistedDeclaration">>;
type _04b = Expect<Equal<Extract<ClosureKind, `hoisted${string}`>, "hoistedDeclaration">>;
type _04c = Expect<Equal<Exclude<ClosureKind, "hoistedDeclaration">, "arrow" | "functionExpression">>;
type _04d = Expect<Equal<Extract<ClosureKind, "generator">, never>>;

// 5. Build the first disqualifier: a hoisted declaration may be called before
//    the assignment it would depend on.
export type IsHoisted<Kind extends ClosureKind> = TODO; // TODO(koan)

type _05a = Expect<Equal<IsHoisted<"hoistedDeclaration">, true>>;
type _05b = Expect<Equal<IsHoisted<"arrow">, false>>;
type _05c = Expect<Equal<IsHoisted<"functionExpression">, false>>;
type _05d = Expect<Equal<IsHoisted<ClosureKind>, boolean>>;

// 6. Build the description of one capture: what the variable was declared as,
//    what its last assignment established, and the three facts the rule needs.
export type CaptureSite<
  Declared,
  Narrowed,
  Kind extends ClosureKind,
  CreatedAfterLastAssignment extends boolean,
  WrittenInsideAFunction extends boolean,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<CaptureSite<string | URL, URL, "arrow", true, false>["narrowed"], URL>>;
type _06b = Expect<Equal<CaptureSite<string | URL, URL, "arrow", true, false>["kind"], "arrow">>;
type _06c = Expect<
  Equal<
    keyof CaptureSite<string | URL, URL, "arrow", true, false>,
    "declared" | "narrowed" | "kind" | "createdAfterLastAssignment" | "writtenInsideAFunction"
  >
>;
type _06d = Expect<
  Equal<CaptureSite<string | URL, URL, "arrow", true, false>["declared"], string | URL>
>;

// 7. Build the decision itself. Any one of the three disqualifiers is enough to
//    lose the narrowing; all three must be clear to keep it.
export type Preserves<
  Site extends CaptureSite<unknown, unknown, ClosureKind, boolean, boolean>,
> = TODO; // TODO(koan)

type _07a = Expect<Equal<Preserves<CaptureSite<string | URL, URL, "arrow", true, false>>, true>>;
type _07b = Expect<
  Equal<Preserves<CaptureSite<string | URL, URL, "hoistedDeclaration", true, false>>, false>
>;
type _07c = Expect<Equal<Preserves<CaptureSite<string | URL, URL, "arrow", false, false>>, false>>;
type _07d = Expect<Equal<Preserves<CaptureSite<string | URL, URL, "arrow", true, true>>, false>>;

// 8. Build the type the closure body actually sees.
export type TypeInClosure<
  Site extends CaptureSite<unknown, unknown, ClosureKind, boolean, boolean>,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<TypeInClosure<CaptureSite<string | URL, URL, "arrow", true, false>>, URL>>;
type _08b = Expect<
  Equal<TypeInClosure<CaptureSite<string | URL, URL, "arrow", true, true>>, string | URL>
>;
type _08c = Expect<
  Equal<TypeInClosure<CaptureSite<string | undefined, string, "functionExpression", true, false>>, string>
>;
type _08d = Expect<
  Equal<
    TypeInClosure<CaptureSite<string | undefined, string, "hoistedDeclaration", true, false>>,
    string | undefined
  >
>;

// ─── Four captures, one qualifying ────────────────────────────────────

// 9. Build the case the release notes describe: an arrow created after the last
//    assignment, with no nested write anywhere.
export type PreservedSite = TODO; // TODO(koan)

type _09a = Expect<Equal<Preserves<PreservedSite>, true>>;
type _09b = Expect<Equal<TypeInClosure<PreservedSite>, URL>>;
type _09c = Expect<Equal<PreservedSite["narrowed"], URL>>;
type _09d = Expect<Equal<PreservedSite["declared"], string | URL>>;

// 10. Build the same capture read from a hoisted `function` declaration, which
//     could be called before the assignment ever runs.
export type HoistedSite = TODO; // TODO(koan)

type _10a = Expect<Equal<Preserves<HoistedSite>, false>>;
type _10b = Expect<Equal<TypeInClosure<HoistedSite>, string | URL>>;
type _10c = Expect<Equal<HoistedSite["kind"], "hoistedDeclaration">>;
type _10d = Expect<Equal<HoistedSite["createdAfterLastAssignment"], true>>;

// 11. Build the capture whose closure was created *before* the last assignment.
//     Nothing is wrong with the closure; it simply predates the fact.
export type CreatedTooEarlySite = TODO; // TODO(koan)

type _11a = Expect<Equal<Preserves<CreatedTooEarlySite>, false>>;
type _11b = Expect<Equal<TypeInClosure<CreatedTooEarlySite>, string | URL>>;
type _11c = Expect<Equal<CreatedTooEarlySite["createdAfterLastAssignment"], false>>;
type _11d = Expect<Equal<CreatedTooEarlySite["kind"], "arrow">>;

// 12. Build the capture that some nested function writes to. There is no "last"
//     assignment to reason from once a function can run one at any time.
export type WrittenInsideSite = TODO; // TODO(koan)

type _12a = Expect<Equal<Preserves<WrittenInsideSite>, false>>;
type _12b = Expect<Equal<TypeInClosure<WrittenInsideSite>, string | URL>>;
type _12c = Expect<Equal<WrittenInsideSite["writtenInsideAFunction"], true>>;
type _12d = Expect<Equal<WrittenInsideSite["createdAfterLastAssignment"], true>>;

// ─── What the factory publishes ───────────────────────────────────────

// 13. Build the closure a factory hands back. Whatever the analysis decided
//     inside, this signature is all a caller sees.
export type ReaderOf<Value> = TODO; // TODO(koan)

type _13a = Expect<Equal<ReturnType<ReaderOf<string>>, string>>;
type _13b = Expect<Equal<Parameters<ReaderOf<string>>, []>>;
type _13c = Expect<Equal<ReturnType<ReaderOf<URL>>, URL>>;
type _13d = Expect<
  Equal<
    {
      aReaderIsAFunction: GivenExtends<ReaderOf<string>, Function>;
      butNotEveryFunctionIsAReader: GivenExtends<(input: string) => void, ReaderOf<string>>;
    },
    { aReaderIsAFunction: true; butNotEveryFunctionIsAReader: false }
  >
>;

// 14. Build the factory around it.
export type FactoryOf<Input, Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<Parameters<FactoryOf<CapturedUnion, string>>[0], string | URL>>;
type _14b = Expect<Equal<ReturnType<FactoryOf<CapturedUnion, string>>, () => string>>;
type _14c = Expect<Equal<ReturnType<ReturnType<FactoryOf<CapturedUnion, string>>>, string>>;
type _14d = Expect<Equal<Parameters<FactoryOf<CapturedUnion, string>>["length"], 1>>;

// 15. Build the generic factory that defaults a possibly-absent value. Its
//     result is `Value` whatever `Value` turns out to be — including a `Value`
//     that is itself `undefined`, where the fallback buys nothing.
export type DefaultedReader<Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<Parameters<DefaultedReader<string>>, [string | undefined, string]>>;
type _15b = Expect<Equal<ReturnType<ReturnType<DefaultedReader<string>>>, string>>;
type _15c = Expect<Equal<ReturnType<ReturnType<DefaultedReader<undefined>>>, undefined>>;
type _15d = Expect<Equal<Parameters<DefaultedReader<never>>, [undefined, never]>>;

// 16. Build the operator that strips the absence a fallback was meant to remove,
//     and notice it disagrees with the signature above exactly when `Value`
//     already contained `undefined`.
export type StrippedFallback<Value> = TODO; // TODO(koan)

type _16a = Expect<Equal<StrippedFallback<string>, string>>;
type _16b = Expect<Equal<StrippedFallback<string | undefined>, string>>;
type _16c = Expect<Equal<StrippedFallback<undefined>, never>>;
type _16d = Expect<Equal<StrippedFallback<null>, null>>;

// 17. Report the four captures side by side: one qualifies, three widen.
export type PreservationProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<PreservationProfile["theArrowAfterTheLastWrite"], true>>;
type _17b = Expect<Equal<PreservationProfile["theHoistedDeclaration"], false>>;
type _17c = Expect<Equal<PreservationProfile["theClosureCreatedTooEarly"], false>>;
type _17d = Expect<Equal<PreservationProfile["theVariableWrittenInsideAFunction"], false>>;
type _17e = Expect<Equal<PreservationProfile["andAllThreeFailuresWidenTheSameWay"], true>>;

// 18. Report one capture at a glance: what the code outside the closure sees,
//     what the closure body sees, and whether anything was lost crossing in.
export type ClosureReport<
  Site extends CaptureSite<unknown, unknown, ClosureKind, boolean, boolean>,
> = TODO; // TODO(koan)

type _18a = Expect<Equal<ClosureReport<PreservedSite>["inside"], URL>>;
type _18b = Expect<Equal<ClosureReport<PreservedSite>["widenedBackToTheDeclaration"], false>>;
type _18c = Expect<Equal<ClosureReport<HoistedSite>["inside"], string | URL>>;
type _18d = Expect<Equal<ClosureReport<HoistedSite>["widenedBackToTheDeclaration"], true>>;
type _18e = Expect<Equal<ClosureReport<WrittenInsideSite>["outside"], URL>>;
