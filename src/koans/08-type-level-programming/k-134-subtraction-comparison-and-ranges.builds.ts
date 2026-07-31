import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-134: subtraction, comparison, and ranges — constructions
 * =============================================================================
 *
 * Counting tuple positions gave addition. Asking a sharper question about tuple
 * *shape* gives everything else: if one tuple starts with the whole of another,
 * the leftover measures the difference — and whether that prefix match succeeds
 * at all already answers "which is bigger?". So subtraction and ordering are the
 * same proof read two ways, and ranges follow from enumerating up to a bound and
 * subtracting the part below the start. Because the representation is natural
 * numbers only, subtraction has no negative result to return and reports `never`
 * on underflow — which is the same answer an invalid input gives, so the two are
 * indistinguishable from the result alone. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenIsNatural<Value extends number> = GivenIsAny<Value> extends true
  ? false
  : `${Value}` extends `-${string}` | `${string}.${string}`
    ? false
    : true;

type GivenBuild<Count extends number, Acc extends unknown[] = []> = Acc["length"] extends Count
  ? Acc
  : GivenBuild<Count, [...Acc, unknown]>;

type GivenTupleOf<Value extends number> = GivenIsNatural<Value> extends true
  ? GivenBuild<Value>
  : never;

export type Ordering = "lt" | "eq" | "gt";

// ─── One prefix proof, two answers ────────────────────────────────────

// 1. Build the single-literal subtraction: validate both operands, then try to
//    peel the second one's whole representation off the front of the first and
//    measure what is left.
//    `SubtractOneOf<7, 3>` is `4`; an underflow has no natural answer.
export type SubtractOneOf<Left extends number, Right extends number> = TODO; // TODO(koan)

type _01a = Expect<Equal<SubtractOneOf<5, 2>, 3>>;
type _01b = Expect<Equal<SubtractOneOf<5, 0>, 5>>;
type _01c = Expect<Equal<SubtractOneOf<5, 5>, 0>>;
type _01d = Expect<Equal<SubtractOneOf<2, 5>, never>>;
type _01e = Expect<Equal<SubtractOneOf<100, 99>, 1>>;

// 2. Build the guarded subtraction, which intercepts the uncountable operands and
//    then distributes over both positions.
export type SubtractOf<Left extends number, Right extends number> = TODO; // TODO(koan)

type _02a = Expect<Equal<SubtractOf<5, 2>, 3>>;
type _02b = Expect<Equal<SubtractOf<number, 1>, number>>;
type _02c = Expect<Equal<SubtractOf<any, 1>, number>>;
type _02d = Expect<Equal<SubtractOf<never, 1>, never>>;
type _02e = Expect<Equal<SubtractOf<5 | 6, 2>, 3 | 4>>;

// 3. Build the single-literal ordering from the very same prefix proof: a match
//    with nothing left over is equality, a match with a remainder means greater,
//    and a failed match means smaller.
export type CompareOneOf<Left extends number, Right extends number> = TODO; // TODO(koan)

type _03a = Expect<Equal<CompareOneOf<2, 5>, "lt">>;
type _03b = Expect<Equal<CompareOneOf<5, 5>, "eq">>;
type _03c = Expect<Equal<CompareOneOf<8, 5>, "gt">>;
type _03d = Expect<Equal<CompareOneOf<99, 100>, "lt">>;
type _03e = Expect<Equal<CompareOneOf<-1, 1>, never>>;

// 4. Build the guarded ordering, whose fallback is the whole ordering domain
//    rather than a single label.
export type CompareOf<Left extends number, Right extends number> = TODO; // TODO(koan)

type _04a = Expect<Equal<CompareOf<2, 5>, "lt">>;
type _04b = Expect<Equal<CompareOf<5, 5>, "eq">>;
type _04c = Expect<Equal<CompareOf<number, 1>, Ordering>>;
type _04d = Expect<Equal<CompareOf<any, 1>, Ordering>>;
type _04e = Expect<Equal<CompareOf<1 | 3, 2>, "lt" | "gt">>;

// 5. Build the boolean projection of the ordering, keeping the broad fallback
//    honest as `boolean` rather than a definite answer.
export type LessThanOf<Left extends number, Right extends number> = TODO; // TODO(koan)

type _05a = Expect<Equal<LessThanOf<2, 5>, true>>;
type _05b = Expect<Equal<LessThanOf<5, 2>, false>>;
type _05c = Expect<Equal<LessThanOf<5, 5>, false>>;
type _05d = Expect<Equal<LessThanOf<number, 1>, boolean>>;
type _05e = Expect<Equal<LessThanOf<1 | 3, 2>, boolean>>;

// ─── Enumerating a bound ──────────────────────────────────────────────

// 6. Build the enumerator, which collects every index below a bound by using the
//    accumulator's own length as the next value.
export type EnumerateOf<Bound extends number, Acc extends number[] = []> = TODO; // TODO(koan)

type _06a = Expect<Equal<EnumerateOf<0>, never>>;
type _06b = Expect<Equal<EnumerateOf<1>, 0>>;
type _06c = Expect<Equal<EnumerateOf<4>, 0 | 1 | 2 | 3>>;
type _06d = Expect<Equal<EnumerateOf<2>, 0 | 1>>;
type _06e = Expect<Equal<EnumerateOf<6>, 0 | 1 | 2 | 3 | 4 | 5>>;

// 7. Build the inclusive range for one pair of literals: refuse a reversed range,
//    and otherwise subtract everything below the start from everything up to and
//    including the end.
//    Hint: an inclusive upper bound is the exclusive enumeration of one more.
export type RangeOneOf<Start extends number, End extends number> = TODO; // TODO(koan)

type _07a = Expect<Equal<RangeOneOf<0, 0>, 0>>;
type _07b = Expect<Equal<RangeOneOf<1, 4>, 1 | 2 | 3 | 4>>;
type _07c = Expect<Equal<RangeOneOf<3, 3>, 3>>;
type _07d = Expect<Equal<RangeOneOf<4, 1>, never>>;
type _07e = Expect<Equal<RangeOneOf<10, 15>, 10 | 11 | 12 | 13 | 14 | 15>>;

// 8. Build the half-open variant, which differs only in not extending the bound.
export type RangeExclusiveOneOf<Start extends number, End extends number> = TODO; // TODO(koan)

type _08a = Expect<Equal<RangeExclusiveOneOf<1, 4>, 1 | 2 | 3>>;
type _08b = Expect<Equal<RangeExclusiveOneOf<3, 3>, never>>;
type _08c = Expect<Equal<RangeExclusiveOneOf<0, 3>, 0 | 1 | 2>>;
type _08d = Expect<Equal<RangeExclusiveOneOf<4, 1>, never>>;
type _08e = Expect<Equal<RangeExclusiveOneOf<10, 15>, 10 | 11 | 12 | 13 | 14>>;

// 9. Build the guarded inclusive range.
export type RangeOf<Start extends number, End extends number> = TODO; // TODO(koan)

type _09a = Expect<Equal<RangeOf<1, 4>, 1 | 2 | 3 | 4>>;
type _09b = Expect<Equal<RangeOf<4, 1>, never>>;
type _09c = Expect<Equal<RangeOf<number, 3>, number>>;
type _09d = Expect<Equal<RangeOf<never, 3>, never>>;
type _09e = Expect<Equal<RangeOf<0, 20>["toString"] extends never ? 1 : 0, 0>>;

// ─── Where the representation runs out ────────────────────────────────

// 10. Report subtraction having no negative to return, so underflow and invalid
//     input are indistinguishable from the result alone.
export type UnderflowProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<UnderflowProfile["underflow"], never>>;
type _10b = Expect<Equal<UnderflowProfile["underflowAtZero"], never>>;
type _10c = Expect<Equal<UnderflowProfile["negativeLeft"], never>>;
type _10d = Expect<Equal<UnderflowProfile["negativeRight"], never>>;
type _10e = Expect<Equal<UnderflowProfile["fractional"], never>>;

// 11. Report the comparison and the ranges rejecting the same invalid inputs,
//     while a reversed range is a deliberate empty answer rather than an error.
export type InvalidInputProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<InvalidInputProfile["negativeCompare"], never>>;
type _11b = Expect<Equal<InvalidInputProfile["negativeRangeStart"], never>>;
type _11c = Expect<Equal<InvalidInputProfile["fractionalRangeEnd"], never>>;
type _11d = Expect<Equal<InvalidInputProfile["reversedRange"], never>>;
type _11e = Expect<Equal<InvalidInputProfile["reversedExclusive"], never>>;

// 12. Report the uncountable operands, where each operator falls back to the
//     broadest honest answer in its own result domain.
export type BroadFallbackProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<BroadFallbackProfile["subtraction"], number>>;
type _12b = Expect<Equal<BroadFallbackProfile["comparison"], Ordering>>;
type _12c = Expect<Equal<BroadFallbackProfile["lessThan"], boolean>>;
type _12d = Expect<Equal<BroadFallbackProfile["range"], number>>;
type _12e = Expect<Equal<BroadFallbackProfile["anySubtraction"], number>>;

// ─── Unions across two positions ──────────────────────────────────────

// 13. Report both positions distributing, and the results then normalising so a
//     cross-product can collapse to fewer members than pairs.
export type DistributionProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<DistributionProfile["bothUnions"], 1 | 2 | 3>>;
type _13b = Expect<Equal<DistributionProfile["partialUnderflow"], 1>>;
type _13c = Expect<Equal<DistributionProfile["orderingUnion"], Ordering>>;
type _13d = Expect<Equal<DistributionProfile["straddlingOrder"], "lt" | "gt">>;
type _13e = Expect<Equal<DistributionProfile["straddlingBoolean"], boolean>>;

// 14. Report ranges distributing, where overlapping ranges merge into one
//     contiguous union.
export type RangeDistributionProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<RangeDistributionProfile["unionStart"], 1 | 2 | 3 | 4>>;
type _14b = Expect<Equal<RangeDistributionProfile["unionStartFromZero"], 0 | 1 | 2 | 3>>;
type _14c = Expect<Equal<RangeDistributionProfile["unionEnd"], 2 | 3 | 4>>;
type _14d = Expect<Equal<RangeDistributionProfile["exclusiveUnionStart"], 0 | 1 | 2>>;
type _14e = Expect<Equal<RangeDistributionProfile["singletonInclusive"], 3>>;

// ─── Surfaces built on the ordering ───────────────────────────────────

// 15. Build the bounds test that reports whether a literal falls inside an
//     inclusive range, which the range union answers directly.
export type IsWithinOf<
  Value extends number,
  Start extends number,
  End extends number,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<{ inside: IsWithinOf<2, 1, 4>; below: IsWithinOf<0, 1, 4> }, { inside: true; below: false }>
>;
type _15b = Expect<
  Equal<{ atStart: IsWithinOf<1, 1, 4>; atEnd: IsWithinOf<4, 1, 4> }, { atStart: true; atEnd: true }>
>;
type _15c = Expect<
  Equal<{ above: IsWithinOf<5, 1, 4>; singleton: IsWithinOf<3, 3, 3> }, { above: false; singleton: true }>
>;
type _15d = Expect<
  Equal<
    { reversedRange: IsWithinOf<2, 4, 1>; invalidValue: IsWithinOf<-1, 0, 4> },
    { reversedRange: false; invalidValue: false }
  >
>;
type _15e = Expect<
  Equal<
    { unionValue: IsWithinOf<1 | 5, 1, 4>; wholeUnionInside: IsWithinOf<1 | 2, 1, 4> },
    { unionValue: boolean; wholeUnionInside: true }
  >
>;

// 16. Build the clamping operator, which needs the ordering rather than the
//     arithmetic.
export type ClampOf<
  Value extends number,
  Low extends number,
  High extends number,
> = TODO; // TODO(koan)

type _16a = Expect<Equal<ClampOf<2, 1, 4>, 2>>;
type _16b = Expect<Equal<ClampOf<0, 1, 4>, 1>>;
type _16c = Expect<Equal<ClampOf<9, 1, 4>, 4>>;
type _16d = Expect<Equal<ClampOf<1, 1, 4>, 1>>;
type _16e = Expect<Equal<ClampOf<4, 1, 4>, 4>>;

// 17. Build the three signatures the packet exports. Note that the runtime forms
//     take plain `number` and defend themselves with checks, because the value
//     level has no literal to compute from.
export type RangeRuntimeApi = TODO; // TODO(koan)

type _17a = Expect<
  Equal<RangeRuntimeApi["subtractNatural"], (left: number, right: number) => number>
>;
type _17b = Expect<
  Equal<RangeRuntimeApi["compareNaturals"], (left: number, right: number) => Ordering>
>;
type _17c = Expect<
  Equal<RangeRuntimeApi["rangeInclusive"], (start: number, end: number) => number[]>
>;
type _17d = Expect<
  Equal<ReturnType<RangeRuntimeApi["compareNaturals"]>, "lt" | "eq" | "gt">
>;
type _17e = Expect<
  Equal<
    {
      runtimeResult: ReturnType<RangeRuntimeApi["rangeInclusive"]>;
      typeResult: RangeOf<1, 4>;
    },
    { runtimeResult: number[]; typeResult: 1 | 2 | 3 | 4 }
  >
>;
