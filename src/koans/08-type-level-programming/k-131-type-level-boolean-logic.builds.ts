import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-131: type-level boolean logic — constructions
 * =============================================================================
 *
 * Conditional types form a Boolean algebra, but with one extra inhabitant the
 * runtime version does not have: `boolean` itself, meaning "either row is
 * possible". A naked parameter distributes over it, so an operator applied to
 * `boolean` returns whichever results those two rows produce — which is why
 * `And<boolean, false>` collapses to a definite `false` while `And<boolean, true>`
 * stays undecided. The folds make the distinction explicit and deliberately
 * disagree: asking whether every flag is guaranteed true is not the same question
 * as asking whether any flag could be true, and an undecided flag answers them
 * differently. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

// Declared with the packet's own signatures so constructions can be graded
// against real call sites.
declare function givenChoose<const Condition extends boolean, Then, Else>(
  condition: Condition,
  whenTrue: Then,
  whenFalse: Else,
): IfOf<Condition, Then, Else>;
declare function givenAllTrue<const Flags extends readonly boolean[]>(
  flags: Flags,
): AllTrueOf<Flags>;
declare function givenAnyTrue<const Flags extends readonly boolean[]>(
  flags: Flags,
): AnyTrueOf<Flags>;

// ─── The operators ────────────────────────────────────────────────────

// 1. Build negation, which maps each possibility to the other.
export type NotOf<Value extends boolean> = TODO; // TODO(koan)

type _01a = Expect<Equal<NotOf<true>, false>>;
type _01b = Expect<Equal<NotOf<false>, true>>;
type _01c = Expect<Equal<NotOf<boolean>, boolean>>;
type _01d = Expect<Equal<NotOf<NotOf<true>>, true>>;
type _01e = Expect<Equal<NotOf<never>, never>>;

// 2. Build conjunction, short-circuiting on a false left operand.
export type AndOf<Left extends boolean, Right extends boolean> = TODO; // TODO(koan)

type _02a = Expect<Equal<AndOf<true, true>, true>>;
type _02b = Expect<Equal<AndOf<true, false>, false>>;
type _02c = Expect<Equal<AndOf<false, true>, false>>;
type _02d = Expect<Equal<AndOf<boolean, false>, false>>;
type _02e = Expect<Equal<AndOf<boolean, true>, boolean>>;

// 3. Build disjunction, short-circuiting on a true left operand.
export type OrOf<Left extends boolean, Right extends boolean> = TODO; // TODO(koan)

type _03a = Expect<Equal<OrOf<false, true>, true>>;
type _03b = Expect<Equal<OrOf<false, false>, false>>;
type _03c = Expect<Equal<OrOf<boolean, true>, true>>;
type _03d = Expect<Equal<OrOf<boolean, false>, boolean>>;
type _03e = Expect<Equal<OrOf<true, boolean>, true>>;

// 4. Build exclusive disjunction, which is negation applied conditionally.
export type XorOf<Left extends boolean, Right extends boolean> = TODO; // TODO(koan)

type _04a = Expect<Equal<XorOf<true, false>, true>>;
type _04b = Expect<Equal<XorOf<true, true>, false>>;
type _04c = Expect<Equal<XorOf<false, true>, true>>;
type _04d = Expect<Equal<XorOf<false, false>, false>>;
type _04e = Expect<Equal<XorOf<boolean, boolean>, boolean>>;

// 5. Build implication, which is the standard rewrite in terms of the operators
//    already built.
export type ImpliesOf<Left extends boolean, Right extends boolean> = TODO; // TODO(koan)

type _05a = Expect<Equal<ImpliesOf<true, false>, false>>;
type _05b = Expect<Equal<ImpliesOf<false, false>, true>>;
type _05c = Expect<Equal<ImpliesOf<true, true>, true>>;
type _05d = Expect<Equal<ImpliesOf<false, true>, true>>;
type _05e = Expect<Equal<ImpliesOf<boolean, false>, boolean>>;

// 6. Build the branch selector, which is the same conditional with arbitrary
//    result types instead of booleans.
export type IfOf<Condition extends boolean, Then, Else> = TODO; // TODO(koan)

type _06a = Expect<Equal<IfOf<true, "yes", "no">, "yes">>;
type _06b = Expect<Equal<IfOf<false, "yes", "no">, "no">>;
type _06c = Expect<Equal<IfOf<boolean, "yes", "no">, "yes" | "no">>;
type _06d = Expect<Equal<IfOf<boolean, 1, 1>, 1>>;
type _06e = Expect<Equal<IfOf<boolean, never, 1>, 1>>;

// ─── The extra inhabitant ─────────────────────────────────────────────

// 7. Report the truth table collapsing where one row already decides the answer,
//    and staying undecided where it does not.
export type UndecidedCollapseProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<UndecidedCollapseProfile["andWithFalse"], false>>;
type _07b = Expect<Equal<UndecidedCollapseProfile["andWithTrue"], boolean>>;
type _07c = Expect<Equal<UndecidedCollapseProfile["orWithTrue"], true>>;
type _07d = Expect<Equal<UndecidedCollapseProfile["orWithFalse"], boolean>>;
type _07e = Expect<Equal<UndecidedCollapseProfile["negated"], boolean>>;

// 8. Report the algebraic identities surviving an undecided operand, and the
//    branch selector collapsing when both branches agree.
export type IdentityProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<IdentityProfile["andIdentity"], boolean>>;
type _08b = Expect<Equal<IdentityProfile["orIdentity"], boolean>>;
type _08c = Expect<Equal<IdentityProfile["doubleNegation"], boolean>>;
type _08d = Expect<Equal<IdentityProfile["xorOfUndecided"], boolean>>;
type _08e = Expect<Equal<IdentityProfile["branchesAgree"], "yes" | "no">>;

// 9. Report the two inhabitants that are not booleans at all, where `any` takes
//    both branches and `never` takes none.
export type ExtremeOperandProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ExtremeOperandProfile["negatedAny"], boolean>>;
type _09b = Expect<Equal<ExtremeOperandProfile["negatedNever"], never>>;
type _09c = Expect<Equal<ExtremeOperandProfile["andWithAny"], boolean>>;
type _09d = Expect<Equal<ExtremeOperandProfile["andWithNever"], never>>;
type _09e = Expect<Equal<ExtremeOperandProfile["branchOnNever"], never>>;

// ─── Folding a tuple of flags ─────────────────────────────────────────

// 10. Build the universal fold. Its empty-tuple identity is `true`, a broad
//     `boolean[]` cannot be inspected at all, and an undecided flag is not a
//     guarantee — so it fails the fold.
//     Hint: `[Head] extends [true]` asks whether the flag is guaranteed true,
//     which is a different question from `Head extends true`.
export type AllTrueOf<Flags extends readonly boolean[]> = TODO; // TODO(koan)

type _10a = Expect<Equal<AllTrueOf<[]>, true>>;
type _10b = Expect<Equal<AllTrueOf<[true, true, true]>, true>>;
type _10c = Expect<Equal<AllTrueOf<[true, false, true]>, false>>;
type _10d = Expect<Equal<AllTrueOf<[boolean]>, false>>;
type _10e = Expect<Equal<AllTrueOf<boolean[]>, boolean>>;

// 11. Build the existential fold, whose empty-tuple identity is `false` and which
//     treats an undecided flag as a genuine possibility.
//     Hint: `true extends Head` asks whether the flag could be true.
export type AnyTrueOf<Flags extends readonly boolean[]> = TODO; // TODO(koan)

type _11a = Expect<Equal<AnyTrueOf<[]>, false>>;
type _11b = Expect<Equal<AnyTrueOf<[false, false, true]>, true>>;
type _11c = Expect<Equal<AnyTrueOf<[false, false]>, false>>;
type _11d = Expect<Equal<AnyTrueOf<[boolean]>, true>>;
type _11e = Expect<Equal<AnyTrueOf<boolean[]>, boolean>>;

// 12. Report the two folds deliberately disagreeing about an undecided flag,
//     which is the whole reason they are separate operators.
export type GuaranteedVersusPossibleProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<GuaranteedVersusPossibleProfile["allWithUndecided"], false>>;
type _12b = Expect<Equal<GuaranteedVersusPossibleProfile["anyWithUndecided"], true>>;
type _12c = Expect<Equal<GuaranteedVersusPossibleProfile["allAfterTrue"], false>>;
type _12d = Expect<Equal<GuaranteedVersusPossibleProfile["anyAfterFalse"], true>>;
type _12e = Expect<Equal<GuaranteedVersusPossibleProfile["theyDisagree"], false>>;

// 13. Report the empty flag domain, where `never` is vacuously assignable to
//     `true` and so passes the universal fold while failing the existential one.
export type EmptyFlagProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<EmptyFlagProfile["allOfNever"], true>>;
type _13b = Expect<Equal<EmptyFlagProfile["anyOfNever"], false>>;
type _13c = Expect<Equal<EmptyFlagProfile["allOfEmpty"], true>>;
type _13d = Expect<Equal<EmptyFlagProfile["anyOfEmpty"], false>>;
type _13e = Expect<Equal<EmptyFlagProfile["broadLength"], boolean>>;

// ─── Policies built on the algebra ────────────────────────────────────

// 14. Build the guarantee test that distinguishes a decided flag from an
//     undecided one, which the operators above cannot express on their own.
export type IsDecidedOf<Value extends boolean> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    { decidedTrue: IsDecidedOf<true>; undecided: IsDecidedOf<boolean> },
    { decidedTrue: true; undecided: false }
  >
>;
type _14b = Expect<
  Equal<
    { decidedFalse: IsDecidedOf<false>; fromAnd: IsDecidedOf<AndOf<boolean, false>> },
    { decidedFalse: true; fromAnd: true }
  >
>;
type _14c = Expect<
  Equal<
    { fromOr: IsDecidedOf<OrOf<boolean, true>>; fromUndecidedAnd: IsDecidedOf<AndOf<boolean, true>> },
    { fromOr: true; fromUndecidedAnd: false }
  >
>;
type _14d = Expect<
  Equal<
    { empty: IsDecidedOf<never>; negatedUndecided: IsDecidedOf<NotOf<boolean>> },
    { empty: true; negatedUndecided: false }
  >
>;
type _14e = Expect<
  Equal<
    { fromAllFold: IsDecidedOf<AllTrueOf<[boolean]>>; fromBroadFold: IsDecidedOf<AllTrueOf<boolean[]>> },
    { fromAllFold: true; fromBroadFold: false }
  >
>;

// 15. Build the n-ary conjunction over a tuple of pairs, which is the shape a
//     policy check takes once several conditions have to hold together.
export type CanProceedOf<
  Authenticated extends boolean,
  Valid extends boolean,
  NotExpired extends boolean,
> = TODO; // TODO(koan)

type _15a = Expect<Equal<CanProceedOf<true, true, true>, true>>;
type _15b = Expect<Equal<CanProceedOf<true, false, true>, false>>;
type _15c = Expect<Equal<CanProceedOf<false, true, true>, false>>;
type _15d = Expect<Equal<CanProceedOf<true, true, boolean>, boolean>>;
type _15e = Expect<
  Equal<IfOf<CanProceedOf<true, false, true>, "publish", "reject">, "reject">
>;

// 16. Build the three signatures the packet exports, whose `const` flag
//     parameters are what keep the literal booleans from widening.
export type LogicRuntimeApi = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    LogicRuntimeApi["choose"],
    <const Condition extends boolean, Then, Else>(
      condition: Condition,
      whenTrue: Then,
      whenFalse: Else,
    ) => IfOf<Condition, Then, Else>
  >
>;
type _16b = Expect<
  Equal<
    LogicRuntimeApi["allTrue"],
    <const Flags extends readonly boolean[]>(flags: Flags) => AllTrueOf<Flags>
  >
>;
type _16c = Expect<
  Equal<ReturnType<typeof givenChoose<true, "yes", "no">>, "yes">
>;
type _16d = Expect<
  Equal<ReturnType<typeof givenAllTrue<[true, true]>>, true>
>;
type _16e = Expect<
  Equal<
    {
      allOfMixed: ReturnType<typeof givenAllTrue<[true, false]>>;
      anyOfMixed: ReturnType<typeof givenAnyTrue<[true, false]>>;
    },
    { allOfMixed: false; anyOfMixed: true }
  >
>;
