import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-213: stable type ordering — constructions
 * =============================================================================
 *
 * The old checker often ordered union members and properties by internal
 * allocation IDs — whatever it happened to see first. A parallel native checker
 * cannot work that way, so TypeScript 7 sorts deterministically, and 6.0 ships
 * `stableTypeOrdering` as a probe for that algorithm before the move.
 *
 * The point to hold onto is that ordering is a *presentation* fact, not a
 * semantic one. `A | B` and `B | A` are the same type: mutually assignable,
 * identical under a structural comparison, and different only in what gets
 * printed in an error message or a declaration file. What the flag can genuinely
 * shake loose is inference that accidentally depended on the old order. Build the
 * ordering, the invariance, and the difference between the two.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The two orderings ────────────────────────────────────────────────

// 1. Build the ordering strategies a checker can use.
export type OrderingStrategy = TODO; // TODO(koan)

type _01a = Expect<Equal<OrderingStrategy, "encounter-based" | "deterministic">>;
type _01b = Expect<Equal<Exclude<OrderingStrategy, "deterministic">, "encounter-based">>;
type _01c = Expect<Equal<Extract<OrderingStrategy, "deterministic">, "deterministic">>;
type _01d = Expect<Equal<Extract<OrderingStrategy, "alphabetical">, never>>;

// 2. Build which strategy each compiler configuration uses.
export type StrategyFor<
  Configuration extends "legacy" | "stableFlag" | "native",
> = TODO; // TODO(koan)

type _02a = Expect<Equal<StrategyFor<"legacy">, "encounter-based">>;
type _02b = Expect<Equal<StrategyFor<"stableFlag">, "deterministic">>;
type _02c = Expect<Equal<StrategyFor<"native">, "deterministic">>;
type _02d = Expect<
  Equal<
    {
      theFlagAndTheNativeCheckerAgree: Equal<StrategyFor<"stableFlag">, StrategyFor<"native">>;
      andTheyBothSortDeterministically: StrategyFor<"native">;
    },
    { theFlagAndTheNativeCheckerAgree: true; andTheyBothSortDeterministically: "deterministic" }
  >
>;

// 3. Build why the native checker needs it: several workers must agree without
//    having seen the same files in the same order.
export type RequiresDeterminism<Checker extends "single-threaded" | "parallel"> = TODO; // TODO(koan)

type _03a = Expect<Equal<RequiresDeterminism<"parallel">, true>>;
type _03b = Expect<Equal<RequiresDeterminism<"single-threaded">, false>>;
type _03c = Expect<Equal<RequiresDeterminism<"parallel" | "single-threaded">, boolean>>;
type _03d = Expect<Equal<Equal<RequiresDeterminism<"parallel">, RequiresDeterminism<"single-threaded">>, false>>;

// ─── What ordering does not change ────────────────────────────────────

// 4. Build the pair the whole lesson turns on: one union written two ways.
export type ForwardUnion = TODO; // TODO(koan)

type _04a = Expect<Equal<ForwardUnion, "a" | "b" | "c">>;
type _04b = Expect<Equal<Exclude<ForwardUnion, "a">, "b" | "c">>;
type _04c = Expect<Equal<Extract<ForwardUnion, "c">, "c">>;
type _04d = Expect<Equal<Extract<ForwardUnion, "d">, never>>;

// 5. Build the same union in the other order.
export type ReversedUnion = TODO; // TODO(koan)

type _05a = Expect<Equal<ReversedUnion, "a" | "b" | "c">>;
type _05b = Expect<Equal<Exclude<ReversedUnion, "c">, "a" | "b">>;
type _05c = Expect<Equal<Extract<ReversedUnion, "a">, "a">>;
type _05d = Expect<Equal<Extract<ReversedUnion, "d">, never>>;

// 6. Build the comparison that shows the two are one type. Order is not part of
//    a union's identity, so nothing here can tell them apart.
export type OrderInvariance = TODO; // TODO(koan)

type _06a = Expect<Equal<OrderInvariance["identical"], true>>;
type _06b = Expect<Equal<OrderInvariance["forwardIntoReversed"], true>>;
type _06c = Expect<Equal<OrderInvariance["reversedIntoForward"], true>>;
type _06d = Expect<Equal<OrderInvariance["sameAfterExclusion"], true>>;

// 7. Build the same check for object properties, where declaration order is even
//    more obviously a matter of typing habits.
export type PropertyOrderInvariance = TODO; // TODO(koan)

type _07a = Expect<Equal<PropertyOrderInvariance["identical"], true>>;
type _07b = Expect<Equal<PropertyOrderInvariance["sameKeys"], true>>;
type _07c = Expect<Equal<PropertyOrderInvariance["mutuallyAssignable"], true>>;
type _07d = Expect<Equal<keyof PropertyOrderInvariance, "identical" | "sameKeys" | "mutuallyAssignable">>;

// ─── What ordering does change ────────────────────────────────────────

// 8. Build the thing that *is* order-dependent: the text a printer produces.
export type PrintUnion<Members extends readonly string[]> = TODO; // TODO(koan)

type _08a = Expect<Equal<PrintUnion<["a", "b", "c"]>, "a | b | c">>;
type _08b = Expect<Equal<PrintUnion<["c", "b", "a"]>, "c | b | a">>;
type _08c = Expect<Equal<PrintUnion<["a"]>, "a">>;
type _08d = Expect<Equal<PrintUnion<[]>, "never">>;

// 9. Build the two printings of the same type, and the fact that only the text
//    differs.
export type PrintingProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<PrintingProfile["asWrittenForward"], "a | b | c">>;
type _09b = Expect<Equal<PrintingProfile["asWrittenReversed"], "c | b | a">>;
type _09c = Expect<Equal<PrintingProfile["theTextsDiffer"], false>>;
type _09d = Expect<Equal<PrintingProfile["butTheTypesDoNot"], true>>;

// 10. Build the sort a deterministic checker applies, so the printed form stops
//     depending on who saw what first.
export type SortTwo<Left extends string, Right extends string> = TODO; // TODO(koan)

type _10a = Expect<Equal<SortTwo<"a", "b">, ["a", "b"]>>;
type _10b = Expect<Equal<SortTwo<"a", "a">, ["a"]>>;
type _10c = Expect<Equal<SortTwo<"ab", "a">, ["a", "ab"]>>;
type _10d = Expect<Equal<SortTwo<"b", "a">, ["b", "a"]>>;

// ─── The migration probe ──────────────────────────────────────────────

// 11. Build what turning the flag on can surface. Only one of these is a real
//     problem; the rest is noise you have to read past.
export type ProbeFinding = TODO; // TODO(koan)

type _11a = Expect<Equal<ProbeFinding, "review-noise" | "order-dependent-inference" | "no-difference">>;
type _11b = Expect<Equal<Extract<ProbeFinding, `order-${string}`>, "order-dependent-inference">>;
type _11c = Expect<Equal<Exclude<ProbeFinding, "no-difference">, "review-noise" | "order-dependent-inference">>;
type _11d = Expect<Equal<Extract<ProbeFinding, "runtime-change">, never>>;

// 12. Build the classification: a printed difference alone is noise, and a
//     changed inferred type is not.
export type ClassifyDifference<
  PrintedChanged extends boolean,
  InferredChanged extends boolean,
> = TODO; // TODO(koan)

type _12a = Expect<Equal<ClassifyDifference<true, false>, "review-noise">>;
type _12b = Expect<Equal<ClassifyDifference<true, true>, "order-dependent-inference">>;
type _12c = Expect<Equal<ClassifyDifference<false, false>, "no-difference">>;
type _12d = Expect<Equal<ClassifyDifference<false, true>, "order-dependent-inference">>;

// 13. Build what to do about each finding.
export type ActionFor<Finding extends ProbeFinding> = TODO; // TODO(koan)

type _13a = Expect<Equal<ActionFor<"order-dependent-inference">, "annotate the inference site">>;
type _13b = Expect<Equal<ActionFor<"review-noise">, "accept the new baseline">>;
type _13c = Expect<Equal<ActionFor<"no-difference">, "nothing">>;
type _13d = Expect<
  Equal<ActionFor<ProbeFinding>, "annotate the inference site" | "accept the new baseline" | "nothing">
>;

// 14. Build the annotation that fixes an order-dependent inference — writing the
//     type down is what makes the order stop mattering.
export type Annotated<Declared> = TODO; // TODO(koan)

type _14a = Expect<Equal<Annotated<ForwardUnion>["declared"], "a" | "b" | "c">>;
type _14b = Expect<Equal<Annotated<ForwardUnion>["inferred"], false>>;
type _14c = Expect<
  Equal<
    {
      theWrittenTypeIsTheSameEitherWay: Equal<
        Annotated<ForwardUnion>["declared"],
        Annotated<ReversedUnion>["declared"]
      >;
      andItIsTheUnionItself: Annotated<ForwardUnion>["declared"];
    },
    { theWrittenTypeIsTheSameEitherWay: true; andItIsTheUnionItself: "a" | "b" | "c" }
  >
>;
type _14d = Expect<Equal<keyof Annotated<ForwardUnion>, "declared" | "inferred">>;

// 15. Build the lifecycle of the flag itself: it is a bridge, so a project that
//     has crossed it should take the plank with it.
export type FlagLifecycle<Phase extends "before" | "probing" | "after"> = TODO; // TODO(koan)

type _15a = Expect<Equal<FlagLifecycle<"before">, "not set">>;
type _15b = Expect<Equal<FlagLifecycle<"probing">, "temporarily on">>;
type _15c = Expect<Equal<FlagLifecycle<"after">, "removed">>;
type _15d = Expect<Equal<FlagLifecycle<"before" | "after">, "not set" | "removed">>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report what a checker's ordering is under each configuration, and that two
//     of the three already agree.
export type StrategyProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<StrategyProfile["legacy"], "encounter-based">>;
type _16b = Expect<Equal<StrategyProfile["withTheFlag"], "deterministic">>;
type _16c = Expect<Equal<StrategyProfile["native"], "deterministic">>;
type _16d = Expect<Equal<StrategyProfile["theFlagMatchesTheNativeChecker"], true>>;
type _16e = Expect<Equal<StrategyProfile["andTheNativeCheckerNeedsIt"], true>>;

// 17. Report a probe run that only moved text around.
export type NoiseProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<NoiseProfile["before"], "c | b | a">>;
type _17b = Expect<Equal<NoiseProfile["after"], "a | b | c">>;
type _17c = Expect<Equal<NoiseProfile["finding"], "review-noise">>;
type _17d = Expect<Equal<NoiseProfile["action"], "accept the new baseline">>;
type _17e = Expect<Equal<NoiseProfile["andTheTypeItselfIsUnchanged"], true>>;

// 18. Report one probe result at a glance: what changed, what that means, and
//     what to do next.
export type OrderingReport<
  PrintedChanged extends boolean,
  InferredChanged extends boolean,
  Phase extends "before" | "probing" | "after",
> = TODO; // TODO(koan)

type _18a = Expect<Equal<OrderingReport<true, false, "probing">["finding"], "review-noise">>;
type _18b = Expect<Equal<OrderingReport<true, false, "probing">["action"], "accept the new baseline">>;
type _18c = Expect<Equal<OrderingReport<true, false, "probing">["flag"], "temporarily on">>;
type _18d = Expect<Equal<OrderingReport<true, false, "after">["typeIdentityChanged"], false>>;
type _18e = Expect<
  Equal<OrderingReport<true, true, "probing">["finding"], "order-dependent-inference">
>;
