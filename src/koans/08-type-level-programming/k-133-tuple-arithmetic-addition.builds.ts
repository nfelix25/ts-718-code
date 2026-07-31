import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-133: tuple arithmetic — addition — constructions
 * =============================================================================
 *
 * The checker cannot evaluate numeric expressions, but it can count tuple
 * positions — so a natural number is represented by a tuple of that length, and
 * addition is concatenation followed by reading `length` back. Everything that
 * makes this practical is a policy decision at the edges. Only naturals can be
 * materialised, so negatives and fractions have to be rejected *before* the
 * recursion starts or it would never terminate. A broad `number` has no length to
 * build and falls back to `number`. And because both operands are naked type
 * parameters, literal unions distribute into a full cross-product — which then
 * normalises, so `Add<1 | 3, 1 | 3>` has three members, not four. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// Declared with the packet's own signatures so constructions can be graded
// against real call sites.
declare function givenAdd<const Left extends number, const Right extends number>(
  left: Left,
  right: Right,
): AddOf<Left, Right>;
declare function givenSum<const Values extends readonly number[]>(
  values: Values,
): SumOf<Values>;

// ─── Representing a number ────────────────────────────────────────────

// 1. Build the validity test that must run before any tuple is materialised.
//    Hint: the decimal spelling of the literal is the easiest thing to pattern
//    match — a leading minus or an embedded dot disqualifies it.
export type IsNaturalOf<Value extends number> = TODO; // TODO(koan)

type _01a = Expect<Equal<IsNaturalOf<4>, true>>;
type _01b = Expect<Equal<IsNaturalOf<0>, true>>;
type _01c = Expect<Equal<IsNaturalOf<-1>, false>>;
type _01d = Expect<Equal<IsNaturalOf<1.5>, false>>;
type _01e = Expect<Equal<IsNaturalOf<-1.5>, false>>;

// 2. Build the counter that materialises a natural as that many tuple positions.
//    Hint: grow an accumulator until its own `length` reaches the target.
export type BuildTupleOf<
  Count extends number,
  Accumulated extends unknown[] = [],
> = TODO; // TODO(koan)

type _02a = Expect<Equal<BuildTupleOf<0>, []>>;
type _02b = Expect<Equal<BuildTupleOf<1>, [unknown]>>;
type _02c = Expect<Equal<BuildTupleOf<3>["length"], 3>>;
type _02d = Expect<Equal<BuildTupleOf<3>, [unknown, unknown, unknown]>>;
type _02e = Expect<Equal<BuildTupleOf<10>["length"], 10>>;

// 3. Build the guarded representation: intercept the types that cannot be
//    counted, distribute over a literal union, and reject anything that is not a
//    natural.
export type TupleOfNumber<Value extends number> = TODO; // TODO(koan)

type _03a = Expect<Equal<TupleOfNumber<0>, []>>;
type _03b = Expect<Equal<TupleOfNumber<3>["length"], 3>>;
type _03c = Expect<Equal<TupleOfNumber<-1>, never>>;
type _03d = Expect<Equal<TupleOfNumber<1.5>, never>>;
type _03e = Expect<Equal<TupleOfNumber<number>["length"], number>>;

// ─── Adding by concatenating ──────────────────────────────────────────

// 4. Build addition: concatenate both representations and read the length back.
//    Guard the uncountable operands first, then distribute over both so a union
//    on either side produces every combination.
//    `AddOf<2, 3>` is `5`.
export type AddOf<Left extends number, Right extends number> = TODO; // TODO(koan)

type _04a = Expect<Equal<AddOf<0, 0>, 0>>;
type _04b = Expect<Equal<AddOf<0, 5>, 5>>;
type _04c = Expect<Equal<AddOf<2, 3>, 5>>;
type _04d = Expect<Equal<AddOf<8, 7>, 15>>;
type _04e = Expect<Equal<AddOf<25, 25>, 50>>;

// 5. Build the successor, which is addition with one operand already fixed.
export type IncrementOf<Value extends number> = TODO; // TODO(koan)

type _05a = Expect<Equal<IncrementOf<0>, 1>>;
type _05b = Expect<Equal<IncrementOf<9>, 10>>;
type _05c = Expect<Equal<IncrementOf<99>, 100>>;
type _05d = Expect<Equal<IncrementOf<1 | 2 | 3>, 2 | 3 | 4>>;
type _05e = Expect<Equal<IncrementOf<number>, number>>;

// 6. Build the fold over a tuple of numbers, carrying a running total.
export type SumOf<
  Values extends readonly number[],
  Total extends number = 0,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<SumOf<[]>, 0>>;
type _06b = Expect<Equal<SumOf<[1, 2, 3, 4]>, 10>>;
type _06c = Expect<Equal<SumOf<[10, 20, 30]>, 60>>;
type _06d = Expect<Equal<SumOf<readonly [1, 2, 3, 4, 5]>, 15>>;
type _06e = Expect<Equal<SumOf<number[]>, number>>;

// ─── The representation's boundaries ──────────────────────────────────

// 7. Report the values that cannot be represented, rejected before the counter
//    ever runs.
export type UnrepresentableProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<UnrepresentableProfile["negative"], never>>;
type _07b = Expect<Equal<UnrepresentableProfile["fraction"], never>>;
type _07c = Expect<Equal<UnrepresentableProfile["negativeFraction"], never>>;
type _07d = Expect<Equal<UnrepresentableProfile["negativeAddend"], never>>;
type _07e = Expect<Equal<UnrepresentableProfile["fractionalAddend"], never>>;

// 8. Report the uncountable operands, where the honest answer is the broad type
//    rather than an attempt to build an infinite tuple.
export type UncountableProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<UncountableProfile["broadRepresentation"], number>>;
type _08b = Expect<Equal<UncountableProfile["broadAddend"], number>>;
type _08c = Expect<Equal<UncountableProfile["anyAddend"], number>>;
type _08d = Expect<Equal<UncountableProfile["emptyAddend"], never>>;
type _08e = Expect<Equal<UncountableProfile["broadInFold"], number>>;

// ─── Unions become cross-products ─────────────────────────────────────

// 9. Report both operands distributing, so a union on either side multiplies the
//    number of results.
export type CrossProductProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<CrossProductProfile["leftUnion"], 11 | 12>>;
type _09b = Expect<Equal<CrossProductProfile["rightUnion"], 11 | 21>>;
type _09c = Expect<Equal<CrossProductProfile["bothUnions"], 11 | 12 | 21 | 22>>;
type _09d = Expect<Equal<CrossProductProfile["representationUnion"], 1 | 3>>;
type _09e = Expect<Equal<CrossProductProfile["incrementedUnion"], 2 | 3 | 4>>;

// 10. Report the cross-product then normalising, so repeated sums collapse and
//     the result can have fewer members than the number of combinations.
export type NormalizationProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<NormalizationProfile["overlappingSums"], 0 | 1 | 2>>;
type _10b = Expect<Equal<NormalizationProfile["adjacentRanges"], 3 | 4 | 5>>;
type _10c = Expect<Equal<NormalizationProfile["evenSpacing"], 2 | 4 | 6>>;
type _10d = Expect<Equal<NormalizationProfile["foldedUnion"], 2 | 3 | 4>>;
type _10e = Expect<Equal<NormalizationProfile["absorbedEmpty"], 3>>;

// ─── Composition ──────────────────────────────────────────────────────

// 11. Report addition composing associatively and commutatively, which it should
//     since concatenation length does not care about order.
export type AlgebraProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<AlgebraProfile["rightNested"], 9>>;
type _11b = Expect<Equal<AlgebraProfile["leftNested"], 9>>;
type _11c = Expect<Equal<AlgebraProfile["commutes"], true>>;
type _11d = Expect<Equal<AlgebraProfile["zeroIdentity"], 7>>;
type _11e = Expect<Equal<AlgebraProfile["foldMatchesNesting"], true>>;

// 12. Report the fold's own boundaries: an empty tuple is the additive identity,
//     an uncountable element poisons the total, and a broad tuple cannot be
//     walked at all.
export type FoldBoundaryProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<FoldBoundaryProfile["empty"], 0>>;
type _12b = Expect<Equal<FoldBoundaryProfile["singleton"], 7>>;
type _12c = Expect<Equal<FoldBoundaryProfile["withEmptyElement"], never>>;
type _12d = Expect<Equal<FoldBoundaryProfile["withBroadElement"], number>>;
type _12e = Expect<Equal<FoldBoundaryProfile["broadTuple"], number>>;

// ─── Surfaces built on the arithmetic ─────────────────────────────────

// 13. Build the doubling operator, which needs no new machinery.
export type DoubleOf<Value extends number> = TODO; // TODO(koan)

type _13a = Expect<Equal<DoubleOf<0>, 0>>;
type _13b = Expect<Equal<DoubleOf<5>, 10>>;
type _13c = Expect<Equal<DoubleOf<25>, 50>>;
type _13d = Expect<Equal<DoubleOf<1 | 2>, 2 | 3 | 4>>;
type _13e = Expect<Equal<DoubleOf<number>, number>>;

// 14. Build the length-preserving concatenation reader, which shows that the
//     arithmetic and the tuple operations are the same thing viewed twice.
export type ConcatLengthOf<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _14a = Expect<Equal<ConcatLengthOf<[1, 2], [3]>, 3>>;
type _14b = Expect<Equal<ConcatLengthOf<[], []>, 0>>;
type _14c = Expect<Equal<ConcatLengthOf<[1], []>, 1>>;
type _14d = Expect<Equal<ConcatLengthOf<readonly [1, 2], readonly [3, 4]>, 4>>;
type _14e = Expect<
  Equal<
    { viaTuples: ConcatLengthOf<TupleOfNumber<2>, TupleOfNumber<3>>; viaAddition: AddOf<2, 3> },
    { viaTuples: 5; viaAddition: 5 }
  >
>;

// 15. Build the two signatures the packet exports, whose `const` parameters are
//     what keep the literal numbers from widening to `number` and losing the
//     computed result.
export type ArithmeticRuntimeApi = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ArithmeticRuntimeApi["add"],
    <const Left extends number, const Right extends number>(
      left: Left,
      right: Right,
    ) => AddOf<Left, Right>
  >
>;
type _15b = Expect<
  Equal<
    ArithmeticRuntimeApi["sum"],
    <const Values extends readonly number[]>(values: Values) => SumOf<Values>
  >
>;
type _15c = Expect<Equal<ReturnType<typeof givenAdd<2, 3>>, 5>>;
type _15d = Expect<Equal<ReturnType<typeof givenSum<[1, 2, 3, 4]>>, 10>>;
type _15e = Expect<
  Equal<
    {
      widened: ReturnType<typeof givenAdd<number, 3>>;
      literal: ReturnType<typeof givenAdd<2, 3>>;
    },
    { widened: number; literal: 5 }
  >
>;
