import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-223: checker and builder parallelism — constructions
 * =============================================================================
 *
 * Two knobs control how much of a build happens at once, and they are not the
 * same knob. Checker workers divide the checking of one project — four by
 * default, one if you want to remove duplicated checker work, more if a very
 * large program justifies the memory. Builder concurrency divides *projects*:
 * independent references can be built at the same time.
 *
 * They multiply. A build with four checkers and three builders can have twelve
 * workers in flight, which is the number that matters for memory rather than for
 * wall time — the two are not proportional, because the dependency graph decides
 * how much of the builder concurrency is usable at all. Build both knobs, their
 * product, and the serial floor underneath.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── Counting with tuples ─────────────────────────────────────────────

// 1. Build the counter a type-level multiplication needs: a tuple of the given
//    length.
export type Repeat<
  Count extends number,
  Filled extends readonly unknown[] = [],
> = TODO; // TODO(koan)

type _01a = Expect<Equal<Repeat<0>, []>>;
type _01b = Expect<Equal<Repeat<3>["length"], 3>>;
type _01c = Expect<Equal<Repeat<1>, [unknown]>>;
type _01d = Expect<Equal<Repeat<4>["length"], 4>>;

// 2. Build addition over those tuples.
export type Add<Left extends number, Right extends number> = TODO; // TODO(koan)

type _02a = Expect<Equal<Add<1, 2>, 3>>;
type _02b = Expect<Equal<Add<0, 4>, 4>>;
type _02c = Expect<Equal<Add<4, 0>, 4>>;
type _02d = Expect<Equal<Add<2, 2>, 4>>;

// 3. Build multiplication as repeated concatenation. Accumulate in a tuple
//    rather than a number: a computed `number` is not usable as a type argument
//    constrained to `number` until it is resolved.
export type Multiply<
  Left extends number,
  Right extends number,
  Accumulated extends readonly unknown[] = [],
  Remaining extends readonly unknown[] = Repeat<Right>,
> = TODO; // TODO(koan)

type _03a = Expect<Equal<Multiply<4, 3>, 12>>;
type _03b = Expect<Equal<Multiply<1, 1>, 1>>;
type _03c = Expect<Equal<Multiply<4, 0>, 0>>;
type _03d = Expect<Equal<Multiply<0, 3>, 0>>;
type _03e = Expect<Equal<Multiply<2, 5>, 10>>;

// ─── The two knobs ────────────────────────────────────────────────────

// 4. Build the settings, so they can be talked about separately.
export type ConcurrencySetting = TODO; // TODO(koan)

type _04a = Expect<Equal<ConcurrencySetting, "checkers" | "builders">>;
type _04b = Expect<Equal<Exclude<ConcurrencySetting, "checkers">, "builders">>;
type _04c = Expect<Equal<Extract<ConcurrencySetting, "builders">, "builders">>;
type _04d = Expect<Equal<Extract<ConcurrencySetting, "emitters">, never>>;

// 5. Build what each one divides. This is the distinction the two knobs exist
//    to keep apart.
export type Divides<Setting extends ConcurrencySetting> = TODO; // TODO(koan)

type _05a = Expect<Equal<Divides<"checkers">, "one project's checking">>;
type _05b = Expect<Equal<Divides<"builders">, "the projects themselves">>;
type _05c = Expect<Equal<Divides<ConcurrencySetting>, "one project's checking" | "the projects themselves">>;
type _05d = Expect<Equal<Equal<Divides<"checkers">, Divides<"builders">>, false>>;

// 6. Build the default the native compiler starts with.
export type DefaultCount<Setting extends ConcurrencySetting> = TODO; // TODO(koan)

type _06a = Expect<Equal<DefaultCount<"checkers">, 4>>;
type _06b = Expect<Equal<DefaultCount<"builders">, 1>>;
type _06c = Expect<Equal<DefaultCount<ConcurrencySetting>, 4 | 1>>;
type _06d = Expect<Equal<Multiply<DefaultCount<"checkers">, DefaultCount<"builders">>, 4>>;

// 7. Build the worst-case worker count, which is where the two knobs meet.
export type PeakWorkers<
  Checkers extends number,
  Builders extends number,
> = TODO; // TODO(koan)

type _07a = Expect<Equal<PeakWorkers<4, 3>, 12>>;
type _07b = Expect<Equal<PeakWorkers<1, 1>, 1>>;
type _07c = Expect<Equal<PeakWorkers<4, 1>, 4>>;
type _07d = Expect<Equal<PeakWorkers<2, 2>, 4>>;

// ─── What each setting is for ─────────────────────────────────────────

// 8. Build the reason to turn checkers down to one: the workers duplicate some
//    checking, and one worker does not.
export type CheckerTradeoff<Count extends number> = TODO; // TODO(koan)

type _08a = Expect<Equal<CheckerTradeoff<1>, "no duplicated checker work">>;
type _08b = Expect<Equal<CheckerTradeoff<4>, "more parallelism, more memory">>;
type _08c = Expect<Equal<CheckerTradeoff<8>, "more parallelism, more memory">>;
type _08d = Expect<Equal<Equal<CheckerTradeoff<1>, CheckerTradeoff<4>>, false>>;

// 9. Build what limits builder concurrency: the dependency graph, not the
//    setting. A chain of projects cannot use more than one builder at a time.
export type UsableBuilders<
  Independent extends number,
  Configured extends number,
> = TODO; // TODO(koan)

type _09a = Expect<Equal<UsableBuilders<3, 3>, 3>>;
type _09b = Expect<Equal<UsableBuilders<1, 4>, 1>>;
type _09c = Expect<Equal<UsableBuilders<4, 2>, 2>>;
type _09d = Expect<Equal<UsableBuilders<0, 4>, 0>>;

// 10. Build the actual peak, which uses the usable builder count rather than the
//     configured one.
export type ActualPeak<
  Checkers extends number,
  Builders extends number,
  Independent extends number,
> = TODO; // TODO(koan)

type _10a = Expect<Equal<ActualPeak<4, 3, 3>, 12>>;
type _10b = Expect<Equal<ActualPeak<4, 3, 1>, 4>>;
type _10c = Expect<Equal<ActualPeak<1, 3, 3>, 3>>;
type _10d = Expect<Equal<ActualPeak<4, 4, 0>, 0>>;

// ─── The serial floor ─────────────────────────────────────────────────

// 11. Build the fully serial configuration, which is what both knobs at one
//     amounts to.
export type IsFullySerial<
  Checkers extends number,
  Builders extends number,
> = TODO; // TODO(koan)

type _11a = Expect<Equal<IsFullySerial<1, 1>, true>>;
type _11b = Expect<Equal<IsFullySerial<4, 1>, false>>;
type _11c = Expect<Equal<IsFullySerial<1, 3>, false>>;
type _11d = Expect<Equal<IsFullySerial<4, 3>, false>>;

// 12. Build what runs on one thread when it is: every phase, one after another.
export type SerialPhases = TODO; // TODO(koan)

type _12a = Expect<Equal<SerialPhases, ["parse", "check", "emit"]>>;
type _12b = Expect<Equal<SerialPhases["length"], 3>>;
type _12c = Expect<Equal<SerialPhases[number], "parse" | "check" | "emit">>;
type _12d = Expect<Equal<SerialPhases[1], "check">>;

// ─── What the numbers mean ────────────────────────────────────────────

// 13. Build the two things a worker count is evidence about.
export type Consequence = TODO; // TODO(koan)

type _13a = Expect<Equal<Consequence, "peak memory" | "wall time">>;
type _13b = Expect<Equal<Exclude<Consequence, "wall time">, "peak memory">>;
type _13c = Expect<Equal<Extract<Consequence, `${string}time`>, "wall time">>;
type _13d = Expect<Equal<Extract<Consequence, "output size">, never>>;

// 14. Build how well the worker count predicts each one. Memory scales with the
//     workers; wall time depends on the graph, so it does not.
export type PredictedBy<TheConsequence extends Consequence> = TODO; // TODO(koan)

type _14a = Expect<Equal<PredictedBy<"peak memory">, "the worker count">>;
type _14b = Expect<Equal<PredictedBy<"wall time">, "the dependency graph">>;
type _14c = Expect<
  Equal<PredictedBy<Consequence>, "the worker count" | "the dependency graph">
>;
type _14d = Expect<Equal<Equal<PredictedBy<"peak memory">, PredictedBy<"wall time">>, false>>;

// 15. Build the advice for one situation, which is the practical output: raise
//     the knob that is actually the bottleneck.
export type AdviceFor<Bottleneck extends "one huge project" | "many small projects" | "memory">
  = TODO; // TODO(koan)

type _15a = Expect<Equal<AdviceFor<"one huge project">, "raise checkers">>;
type _15b = Expect<Equal<AdviceFor<"many small projects">, "raise builders">>;
type _15c = Expect<Equal<AdviceFor<"memory">, "lower both">>;
type _15d = Expect<
  Equal<
    AdviceFor<"one huge project" | "memory">,
    "raise checkers" | "lower both"
  >
>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the default configuration.
export type DefaultProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<DefaultProfile["checkers"], 4>>;
type _16b = Expect<Equal<DefaultProfile["builders"], 1>>;
type _16c = Expect<Equal<DefaultProfile["peak"], 4>>;
type _16d = Expect<Equal<DefaultProfile["serial"], false>>;
type _16e = Expect<Equal<DefaultProfile["andTheCheckersDivide"], "one project's checking">>;

// 17. Report a build whose graph cannot use the builders it was given.
export type GraphBoundProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<GraphBoundProfile["configured"], 12>>;
type _17b = Expect<Equal<GraphBoundProfile["usableBuilders"], 1>>;
type _17c = Expect<Equal<GraphBoundProfile["actual"], 4>>;
type _17d = Expect<
  Equal<GraphBoundProfile["andWallTimeWasNeverTheWorkerCountsToPredict"], "the dependency graph">
>;

// 18. Report one configuration at a glance: its worst case, its actual peak, and
//     whether it is serial at all.
export type ConcurrencyReport<
  Checkers extends number,
  Builders extends number,
  Independent extends number,
> = TODO; // TODO(koan)

type _18a = Expect<Equal<ConcurrencyReport<4, 3, 3>["configuredPeak"], 12>>;
type _18b = Expect<Equal<ConcurrencyReport<4, 3, 1>["actualPeak"], 4>>;
type _18c = Expect<Equal<ConcurrencyReport<1, 1, 1>["serial"], true>>;
type _18d = Expect<Equal<ConcurrencyReport<1, 1, 1>["checkerTradeoff"], "no duplicated checker work">>;
type _18e = Expect<Equal<ConcurrencyReport<4, 3, 3>["memoryFollows"], "the worker count">>;
