import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-199: never-initialized variables — constructions
 * =============================================================================
 *
 * Definite-assignment analysis asks whether a local has a value by the time it
 * is read. Inside one control-flow graph that question is answerable; inside a
 * nested function it is not, because nobody knows when the closure runs. So the
 * checker has always been optimistic there — if the variable is assigned
 * *somewhere*, a captured read is allowed.
 *
 * TypeScript 5.7 adds the one case optimism cannot rescue: a captured local with
 * no assignment anywhere at all. There is no timing under which that read is
 * fine, so it is now "used before being assigned". Everything else is unchanged,
 * which makes the evidence/read-site matrix the thing worth building — along
 * with the three fixes that make the question go away.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The matrix ───────────────────────────────────────────────────────

// 1. Build what the checker can find out about a local's assignments.
export type AssignmentEvidence = TODO; // TODO(koan)

type _01a = Expect<Equal<AssignmentEvidence, "none" | "conditional" | "definite" | "initializer">>;
type _01b = Expect<Equal<Exclude<AssignmentEvidence, "none">, "conditional" | "definite" | "initializer">>;
type _01c = Expect<Equal<Extract<AssignmentEvidence, "initializer">, "initializer">>;
type _01d = Expect<Equal<Extract<AssignmentEvidence, "declared">, never>>;

// 2. Build where the read happens, which is what decides whether the checker can
//    reason about ordering at all.
export type ReadLocation = TODO; // TODO(koan)

type _02a = Expect<Equal<ReadLocation, "same-scope" | "nested-function">>;
type _02b = Expect<Equal<Exclude<ReadLocation, "same-scope">, "nested-function">>;
type _02c = Expect<Equal<Extract<ReadLocation, "nested-function">, "nested-function">>;
type _02d = Expect<Equal<Extract<ReadLocation, "module-scope">, never>>;

// 3. Build the three verdicts.
export type InitializationCheck = TODO; // TODO(koan)

type _03a = Expect<Equal<InitializationCheck, "used-before-assigned" | "closure-optimistic" | "safe">>;
type _03b = Expect<Equal<Exclude<InitializationCheck, "safe">, "used-before-assigned" | "closure-optimistic">>;
type _03c = Expect<Equal<Extract<InitializationCheck, `closure${string}`>, "closure-optimistic">>;
type _03d = Expect<Equal<Extract<InitializationCheck, "unreachable">, never>>;

// 4. Build one row of the matrix.
export type InitializationCase<
  Evidence extends AssignmentEvidence,
  Location extends ReadLocation,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<InitializationCase<"none", "nested-function">["evidence"], "none">>;
type _04b = Expect<Equal<InitializationCase<"none", "nested-function">["location"], "nested-function">>;
type _04c = Expect<Equal<keyof InitializationCase<"definite", "same-scope">, "evidence" | "location">>;
type _04d = Expect<
  Equal<
    InitializationCase<AssignmentEvidence, "same-scope">["evidence"],
    "none" | "conditional" | "definite" | "initializer"
  >
>;

// 5. Build the rule. An initializer or a definite assignment is safe anywhere; a
//    conditional one is optimistic only across a function boundary; no
//    assignment at all is the case 5.7 added.
export type Classify<
  Evidence extends AssignmentEvidence,
  Location extends ReadLocation,
> = TODO; // TODO(koan)

type _05a = Expect<Equal<Classify<"initializer", "nested-function">, "safe">>;
type _05b = Expect<Equal<Classify<"definite", "same-scope">, "safe">>;
type _05c = Expect<Equal<Classify<"conditional", "nested-function">, "closure-optimistic">>;
type _05d = Expect<Equal<Classify<"conditional", "same-scope">, "used-before-assigned">>;
type _05e = Expect<Equal<Classify<"none", "nested-function">, "used-before-assigned">>;

// 6. Build the question a build asks: is this verdict a diagnostic?
export type IsError<Check extends InitializationCheck> = TODO; // TODO(koan)

type _06a = Expect<Equal<IsError<"used-before-assigned">, true>>;
type _06b = Expect<Equal<IsError<"closure-optimistic">, false>>;
type _06c = Expect<Equal<IsError<"safe">, false>>;
type _06d = Expect<Equal<IsError<InitializationCheck>, boolean>>;

// 7. Build the single row that 5.7 changed. Everything else reported exactly
//    what it reported before.
export type NewInThisRelease<
  Evidence extends AssignmentEvidence,
  Location extends ReadLocation,
> = TODO; // TODO(koan)

type _07a = Expect<Equal<NewInThisRelease<"none", "nested-function">, true>>;
type _07b = Expect<Equal<NewInThisRelease<"none", "same-scope">, false>>;
type _07c = Expect<Equal<NewInThisRelease<"conditional", "nested-function">, false>>;
type _07d = Expect<Equal<NewInThisRelease<"initializer", "nested-function">, false>>;

// 8. Build the condition under which the checker is still willing to be
//    optimistic — the behaviour this release deliberately kept.
export type AllowsOptimism<Evidence extends AssignmentEvidence> = TODO; // TODO(koan)

type _08a = Expect<Equal<AllowsOptimism<"conditional">, true>>;
type _08b = Expect<Equal<AllowsOptimism<"none">, false>>;
type _08c = Expect<Equal<AllowsOptimism<"definite">, false>>;
type _08d = Expect<Equal<AllowsOptimism<AssignmentEvidence>, boolean>>;

// 9. Build the read locations at which each evidence level is genuinely safe.
export type ReadsSafelyAt<Evidence extends AssignmentEvidence> = TODO; // TODO(koan)

type _09a = Expect<Equal<ReadsSafelyAt<"initializer">, "same-scope" | "nested-function">>;
type _09b = Expect<Equal<ReadsSafelyAt<"conditional">, "nested-function">>;
type _09c = Expect<Equal<ReadsSafelyAt<"none">, never>>;
type _09d = Expect<Equal<ReadsSafelyAt<"definite">, "same-scope" | "nested-function">>;

// ─── What the closure actually sees ───────────────────────────────────

// 10. Build the type a captured read produces. Only the honest case carries the
//     absence in the type, and it is the only one that survives every timing.
export type CapturedType<Value, Evidence extends AssignmentEvidence> = TODO; // TODO(koan)

type _10a = Expect<Equal<CapturedType<number, "initializer">, number>>;
type _10b = Expect<Equal<CapturedType<number, "conditional">, number | undefined>>;
type _10c = Expect<Equal<CapturedType<number, "none">, never>>;
type _10d = Expect<Equal<NonNullable<CapturedType<number, "conditional">>, number>>;

// ─── The three fixes ──────────────────────────────────────────────────

// 11. Build the ways out.
export type FixKind = TODO; // TODO(koan)

type _11a = Expect<Equal<FixKind, "initializeAtDeclaration" | "passTheValueIn" | "modelTheAbsence">>;
type _11b = Expect<Equal<Extract<FixKind, `model${string}`>, "modelTheAbsence">>;
type _11c = Expect<Equal<Exclude<FixKind, "modelTheAbsence">, "initializeAtDeclaration" | "passTheValueIn">>;
type _11d = Expect<Equal<Extract<FixKind, "assertDefinite">, never>>;

// 12. Build which fix each situation calls for.
export type FixFor<Evidence extends AssignmentEvidence> = TODO; // TODO(koan)

type _12a = Expect<Equal<FixFor<"none">, "initializeAtDeclaration">>;
type _12b = Expect<Equal<FixFor<"conditional">, "modelTheAbsence">>;
type _12c = Expect<Equal<FixFor<"definite">, "passTheValueIn">>;
type _12d = Expect<
  Equal<
    FixFor<AssignmentEvidence>,
    "initializeAtDeclaration" | "passTheValueIn" | "modelTheAbsence"
  >
>;

// 13. Build the factory that takes the value as a parameter — the fix that makes
//     the whole question disappear, because a parameter is always assigned.
export type PrinterFactory<Value> = TODO; // TODO(koan)

type _13a = Expect<Equal<Parameters<PrinterFactory<number>>, [number]>>;
type _13b = Expect<Equal<ReturnType<PrinterFactory<number>>, () => string>>;
type _13c = Expect<Equal<ReturnType<ReturnType<PrinterFactory<number>>>, string>>;
type _13d = Expect<Equal<Parameters<ReturnType<PrinterFactory<number>>>, []>>;

// 14. Build the factory that admits the absence instead, and therefore has to
//     handle it.
export type OptionalPrinterFactory<Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<Parameters<OptionalPrinterFactory<number>>, [number | undefined]>>;
type _14b = Expect<Equal<ReturnType<ReturnType<OptionalPrinterFactory<number>>>, string>>;
type _14c = Expect<
  Equal<NonNullable<Parameters<OptionalPrinterFactory<number>>[0]>, number>
>;
type _14d = Expect<
  Equal<
    {
      theOptionalFormAcceptsAPlainValueToo: GivenExtends<
        PrinterFactory<number | undefined>,
        OptionalPrinterFactory<number>
      >;
      butTheStrictFormRejectsTheAbsence: GivenExtends<
        PrinterFactory<number>,
        OptionalPrinterFactory<number>
      >;
    },
    { theOptionalFormAcceptsAPlainValueToo: true; butTheStrictFormRejectsTheAbsence: false }
  >
>;

// ─── Reading the matrix back ──────────────────────────────────────────

// 15. Report the four rows the koan collects.
export type CaseProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<CaseProfile["noAssignmentReadInAClosure"], "used-before-assigned">>;
type _15b = Expect<Equal<CaseProfile["aConditionalAssignmentReadInAClosure"], "closure-optimistic">>;
type _15c = Expect<Equal<CaseProfile["theSameConditionalReadInPlace"], "used-before-assigned">>;
type _15d = Expect<Equal<CaseProfile["anInitializerReadAnywhere"], "safe">>;
type _15e = Expect<Equal<CaseProfile["andOnlyOneOfThemIsNew"], true>>;

// 16. Report what the closure boundary costs. The same evidence is read
//     differently on each side of it — and no assignment at all is now wrong on
//     both.
export type ScopeProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ScopeProfile["conditionalInPlace"], "used-before-assigned">>;
type _16b = Expect<Equal<ScopeProfile["conditionalInAClosure"], "closure-optimistic">>;
type _16c = Expect<Equal<ScopeProfile["theBoundaryChangesTheVerdict"], false>>;
type _16d = Expect<Equal<ScopeProfile["butNotForAVariableNeverAssigned"], true>>;

// 17. Report the fixes against the situations that call for them.
export type FixProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<FixProfile["forAVariableNeverAssigned"], "initializeAtDeclaration">>;
type _17b = Expect<Equal<FixProfile["forAConditionalAssignment"], "modelTheAbsence">>;
type _17c = Expect<Equal<FixProfile["theStrictFactoryTakes"], number>>;
type _17d = Expect<Equal<FixProfile["theHonestFactoryTakes"], number | undefined>>;
type _17e = Expect<Equal<FixProfile["andBothReturnTheSameThing"], true>>;

// 18. Report one captured read at a glance: the verdict, whether it is reported,
//     what the closure would see, and what to do about it.
export type InitializationReport<
  Value,
  Evidence extends AssignmentEvidence,
  Location extends ReadLocation,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<InitializationReport<number, "none", "nested-function">["verdict"], "used-before-assigned">
>;
type _18b = Expect<Equal<InitializationReport<number, "none", "nested-function">["reported"], true>>;
type _18c = Expect<
  Equal<InitializationReport<number, "conditional", "nested-function">["seenInTheClosure"], number | undefined>
>;
type _18d = Expect<
  Equal<InitializationReport<number, "conditional", "nested-function">["newInThisRelease"], false>
>;
type _18e = Expect<Equal<InitializationReport<number, "none", "nested-function">["fix"], "initializeAtDeclaration">>;
