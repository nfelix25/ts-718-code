import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-229: native parity and performance capstone — constructions
 * =============================================================================
 *
 * A migration ends with two claims that have to be earned separately. Parity says
 * the same source revision produces the same diagnostics, the same declarations
 * and the same passing tests. Performance says repeated measurements on one
 * machine and one configuration got better — in wall time, in peak memory, or
 * both. Neither implies the other, and neither follows from architecture.
 *
 * Both need frozen inputs to mean anything: pin the revision, the configuration,
 * the dependencies and the machine, run the reference and the candidate against
 * exactly those, and record what you deliberately accepted. The one escape hatch
 * that survives is capability-shaped — keep the old package where a tool needs
 * it, and nowhere else. Build both claims and the evidence each one requires.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── Two independent claims ───────────────────────────────────────────

// 1. Build the claims a migration report makes.
export type MigrationClaim = TODO; // TODO(koan)

type _01a = Expect<Equal<MigrationClaim, "parity" | "performance">>;
type _01b = Expect<Equal<Exclude<MigrationClaim, "parity">, "performance">>;
type _01c = Expect<Equal<Extract<MigrationClaim, `p${string}`>, "parity" | "performance">>;
type _01d = Expect<Equal<Extract<MigrationClaim, "correctness">, never>>;

// 2. Build the evidence each claim is made of. They do not overlap, which is why
//    neither can be inferred from the other.
export type EvidenceFor<Claim extends MigrationClaim> = TODO; // TODO(koan)

type _02a = Expect<Equal<EvidenceFor<"parity">, "diagnostics" | "declarations" | "tests">>;
type _02b = Expect<Equal<EvidenceFor<"performance">, "wall time" | "peak memory">>;
type _02c = Expect<Equal<Extract<EvidenceFor<"parity">, EvidenceFor<"performance">>, never>>;
type _02d = Expect<
  Equal<
    EvidenceFor<MigrationClaim>,
    "diagnostics" | "declarations" | "tests" | "wall time" | "peak memory"
  >
>;

// 3. Build the inference nobody is entitled to: one claim from the other.
export type SupportsClaim<
  From extends MigrationClaim,
  To extends MigrationClaim,
> = TODO; // TODO(koan)

type _03a = Expect<Equal<SupportsClaim<"parity", "parity">, true>>;
type _03b = Expect<Equal<SupportsClaim<"parity", "performance">, false>>;
type _03c = Expect<Equal<SupportsClaim<"performance", "parity">, false>>;
type _03d = Expect<Equal<SupportsClaim<"performance", "performance">, true>>;

// ─── Frozen inputs ────────────────────────────────────────────────────

// 4. Build the things that have to be pinned before either claim means anything.
export type FrozenInput = TODO; // TODO(koan)

type _04a = Expect<
  Equal<FrozenInput, "source revision" | "configuration" | "dependencies" | "machine">
>;
type _04b = Expect<Equal<Extract<FrozenInput, `${string}s`>, "dependencies">>;
type _04c = Expect<
  Equal<Exclude<FrozenInput, "machine">, "source revision" | "configuration" | "dependencies">
>;
type _04d = Expect<Equal<Extract<FrozenInput, "weather">, never>>;

// 5. Build which claim each input matters for. The machine only matters for one
//    of them, which is also why a parity run can be done anywhere.
export type MattersFor<Input extends FrozenInput> = TODO; // TODO(koan)

type _05a = Expect<Equal<MattersFor<"machine">, "performance">>;
type _05b = Expect<Equal<MattersFor<"source revision">, "parity" | "performance">>;
type _05c = Expect<Equal<MattersFor<"configuration">, "parity" | "performance">>;
type _05d = Expect<Equal<Extract<MattersFor<"machine">, "parity">, never>>;

// 6. Build whether the inputs a run pinned are enough for a given claim.
export type InputsSufficientFor<
  Claim extends MigrationClaim,
  Pinned extends readonly FrozenInput[],
> = TODO; // TODO(koan)

type _06a = Expect<Equal<InputsSufficientFor<"parity", ["source revision"]>, true>>;
type _06b = Expect<Equal<InputsSufficientFor<"performance", ["source revision"]>, false>>;
type _06c = Expect<
  Equal<InputsSufficientFor<"performance", ["source revision", "machine"]>, true>
>;
type _06d = Expect<Equal<InputsSufficientFor<"parity", []>, false>>;

// ─── The parity comparison ────────────────────────────────────────────

// 7. Build the kinds of difference a parity run can turn up.
export type DifferenceKind = TODO; // TODO(koan)

type _07a = Expect<Equal<DifferenceKind, "semantic" | "textual" | "none">>;
type _07b = Expect<Equal<Exclude<DifferenceKind, "none">, "semantic" | "textual">>;
type _07c = Expect<Equal<Extract<DifferenceKind, "semantic">, "semantic">>;
type _07d = Expect<Equal<Extract<DifferenceKind, "cosmetic">, never>>;

// 8. Build what each kind does to the parity claim. Only one of the three can
//    break it.
export type BreaksParity<Kind extends DifferenceKind> = TODO; // TODO(koan)

type _08a = Expect<Equal<BreaksParity<"semantic">, true>>;
type _08b = Expect<Equal<BreaksParity<"textual">, false>>;
type _08c = Expect<Equal<BreaksParity<"none">, false>>;
type _08d = Expect<Equal<BreaksParity<DifferenceKind>, boolean>>;

// 9. Build the parity verdict for a whole run.
export type ParityVerdict<Found extends readonly DifferenceKind[]> = TODO; // TODO(koan)

type _09a = Expect<Equal<ParityVerdict<[]>, "holds">>;
type _09b = Expect<Equal<ParityVerdict<["none"]>, "holds">>;
type _09c = Expect<Equal<ParityVerdict<["textual"]>, "holds, with recorded differences">>;
type _09d = Expect<Equal<ParityVerdict<["textual", "semantic"]>, "broken">>;

// 10. Build the obligation a textual difference leaves: it has to be written
//     down, because an unrecorded difference is indistinguishable from a bug.
export type MustBeRecorded<Kind extends DifferenceKind> = TODO; // TODO(koan)

type _10a = Expect<Equal<MustBeRecorded<"textual">, true>>;
type _10b = Expect<Equal<MustBeRecorded<"semantic">, false>>;
type _10c = Expect<Equal<MustBeRecorded<"none">, false>>;
type _10d = Expect<Equal<MustBeRecorded<DifferenceKind>, boolean>>;

// ─── The performance comparison ───────────────────────────────────────

// 11. Build what a performance run measures.
export type Measurement = TODO; // TODO(koan)

type _11a = Expect<Equal<Measurement, "wall time" | "peak memory">>;
type _11b = Expect<Equal<Exclude<Measurement, "wall time">, "peak memory">>;
type _11c = Expect<
  Equal<
    {
      theMeasurementsAreThePerformanceEvidence: Equal<Measurement, EvidenceFor<"performance">>;
      andThereAreExactlyTwo: Measurement;
    },
    {
      theMeasurementsAreThePerformanceEvidence: true;
      andThereAreExactlyTwo: "wall time" | "peak memory";
    }
  >
>;
type _11d = Expect<Equal<Extract<Measurement, "cpu count">, never>>;

// 12. Build the direction each measurement moved.
export type Direction = TODO; // TODO(koan)

type _12a = Expect<Equal<Direction, "better" | "worse" | "unchanged">>;
type _12b = Expect<Equal<Exclude<Direction, "unchanged">, "better" | "worse">>;
type _12c = Expect<Equal<Extract<Direction, "better">, "better">>;
type _12d = Expect<Equal<Extract<Direction, "faster">, never>>;

// 13. Build the performance verdict, which needs both measurements rather than
//     the flattering one.
export type PerformanceVerdict<
  Time extends Direction,
  Memory extends Direction,
> = TODO; // TODO(koan)

type _13a = Expect<Equal<PerformanceVerdict<"better", "better">, "improved">>;
type _13b = Expect<Equal<PerformanceVerdict<"better", "worse">, "regressed">>;
type _13c = Expect<Equal<PerformanceVerdict<"unchanged", "unchanged">, "unchanged">>;
type _13d = Expect<Equal<PerformanceVerdict<"unchanged", "better">, "improved">>;
type _13e = Expect<Equal<PerformanceVerdict<"worse", "better">, "regressed">>;

// ─── The remaining escape hatch ───────────────────────────────────────

// 14. Build the reasons a project might keep the previous compiler.
export type RetentionReason = TODO; // TODO(koan)

type _14a = Expect<Equal<RetentionReason, "programmatic api" | "framework tooling" | "habit">>;
type _14b = Expect<
  Equal<Exclude<RetentionReason, "habit">, "programmatic api" | "framework tooling">
>;
type _14c = Expect<Equal<Extract<RetentionReason, "habit">, "habit">>;
type _14d = Expect<Equal<Extract<RetentionReason, "performance">, never>>;

// 15. Build which reasons justify keeping it. Capability does; comfort does not.
export type Justified<Reason extends RetentionReason> = TODO; // TODO(koan)

type _15a = Expect<Equal<Justified<"programmatic api">, true>>;
type _15b = Expect<Equal<Justified<"framework tooling">, true>>;
type _15c = Expect<Equal<Justified<"habit">, false>>;
type _15d = Expect<Equal<Justified<RetentionReason>, boolean>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the two claims and what each one is made of.
export type ClaimProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<ClaimProfile["parityEvidence"], "diagnostics" | "declarations" | "tests">
>;
type _16b = Expect<Equal<ClaimProfile["performanceEvidence"], "wall time" | "peak memory">>;
type _16c = Expect<Equal<ClaimProfile["theyShareNothing"], never>>;
type _16d = Expect<Equal<ClaimProfile["andNeitherImpliesTheOther"], false>>;

// 17. Report a run that found only wording differences and got faster — the good
//     outcome, stated precisely enough to be worth something.
export type SuccessfulRunProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<SuccessfulRunProfile["parity"], "holds, with recorded differences">>;
type _17b = Expect<Equal<SuccessfulRunProfile["recordingRequired"], true>>;
type _17c = Expect<Equal<SuccessfulRunProfile["performance"], "improved">>;
type _17d = Expect<Equal<SuccessfulRunProfile["inputsWereEnoughForParity"], true>>;
type _17e = Expect<Equal<SuccessfulRunProfile["butNotForPerformance"], false>>;

// 18. Report a whole migration at a glance: both verdicts, whether the evidence
//     supports them, and whether anything is still being kept for a bad reason.
export type CapstoneReport<
  Found extends readonly DifferenceKind[],
  Time extends Direction,
  Memory extends Direction,
  Pinned extends readonly FrozenInput[],
  Reason extends RetentionReason,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    CapstoneReport<["textual"], "better", "better", ["source revision", "machine"], "programmatic api">["parity"],
    "holds, with recorded differences"
  >
>;
type _18b = Expect<
  Equal<
    CapstoneReport<["textual"], "better", "better", ["source revision", "machine"], "programmatic api">["performance"],
    "improved"
  >
>;
type _18c = Expect<
  Equal<
    CapstoneReport<[], "better", "better", ["source revision"], "habit">["performanceEvidenceIsSound"],
    false
  >
>;
type _18d = Expect<
  Equal<CapstoneReport<[], "better", "better", ["source revision"], "habit">["retentionJustified"], false>
>;
type _18e = Expect<
  Equal<CapstoneReport<["semantic"], "better", "better", ["source revision", "machine"], "framework tooling">["parity"], "broken">
>;
