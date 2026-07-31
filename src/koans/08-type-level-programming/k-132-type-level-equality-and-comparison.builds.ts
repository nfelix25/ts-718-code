import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-132: type-level equality and comparison — constructions
 * =============================================================================
 *
 * "Are these the same type?" has more than one honest answer, and these
 * constructions build the layers. One-way assignability is directional. Asking it
 * both ways gives mutual assignability, which is what most people mean by equal —
 * and which cheerfully reports `true` for an intersection and the flattened object
 * it behaves like, or for a readonly property and a writable one. The
 * conditional-function trick is stricter: it compares how the checker *represents*
 * a type, so it separates cases mutual assignability cannot. Sitting on top of all
 * of it is `any`, which claims to be assignable in both directions to everything
 * and so must be intercepted before any of these answers can be trusted. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

// ─── Classifying the awkward inhabitants ──────────────────────────────

// 1. Build the `any` detector, which works because only `any` makes an
//    intersection with an unrelated literal absorb that literal.
//    Hint: `0 extends 1 & Value` is false for every type except `any`.
export type IsAnyOf<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<IsAnyOf<any>, true>>;
type _01b = Expect<Equal<IsAnyOf<unknown>, false>>;
type _01c = Expect<Equal<IsAnyOf<never>, false>>;
type _01d = Expect<Equal<IsAnyOf<string>, false>>;
type _01e = Expect<Equal<IsAnyOf<{ a: 1 }>, false>>;

// 2. Build the empty-domain detector, which needs distribution suppressed or it
//     would answer about nothing at all.
export type IsNeverOf<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<IsNeverOf<never>, true>>;
type _02b = Expect<Equal<IsNeverOf<string>, false>>;
type _02c = Expect<Equal<IsNeverOf<any>, false>>;
type _02d = Expect<Equal<IsNeverOf<unknown>, false>>;
type _02e = Expect<Equal<IsNeverOf<never | string>, false>>;

// 3. Build the top-type detector, which has to rule out `any` first and then
//    check that the type really is the unconstrained top rather than merely
//    something `unknown` happens to fit.
export type IsUnknownOf<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<IsUnknownOf<unknown>, true>>;
type _03b = Expect<Equal<IsUnknownOf<any>, false>>;
type _03c = Expect<Equal<IsUnknownOf<never>, false>>;
type _03d = Expect<Equal<IsUnknownOf<{}>, false>>;
type _03e = Expect<Equal<IsUnknownOf<string>, false>>;

// ─── Three notions of sameness ────────────────────────────────────────

// 4. Build the one-way question, with distribution suppressed so a union is asked
//    about as a whole.
export type AssignableOf<From, To> = TODO; // TODO(koan)

type _04a = Expect<Equal<AssignableOf<"x", string>, true>>;
type _04b = Expect<Equal<AssignableOf<string, "x">, false>>;
type _04c = Expect<Equal<AssignableOf<{ id: 1; name: string }, { id: number }>, true>>;
type _04d = Expect<Equal<AssignableOf<{ id: number }, { id: 1; name: string }>, false>>;
type _04e = Expect<Equal<AssignableOf<never, string>, true>>;

// 5. Build the symmetric question by asking the one-way question twice.
export type MutuallyAssignableOf<Left, Right> = TODO; // TODO(koan)

type _05a = Expect<Equal<MutuallyAssignableOf<{ a: 1 }, { a: 1 }>, true>>;
type _05b = Expect<Equal<MutuallyAssignableOf<"x", string>, false>>;
type _05c = Expect<Equal<MutuallyAssignableOf<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, true>>;
type _05d = Expect<Equal<MutuallyAssignableOf<{ readonly a: 1 }, { a: 1 }>, true>>;
type _05e = Expect<Equal<MutuallyAssignableOf<string[], Array<string>>, true>>;

// 6. Build the representational question — the repository's own notion of
//    identity — by comparing two conditional function types that differ only in
//    which type each one tests against.
export type StrictEqualOf<Left, Right> = TODO; // TODO(koan)

type _06a = Expect<Equal<StrictEqualOf<{ a: 1 }, { a: 1 }>, true>>;
type _06b = Expect<Equal<StrictEqualOf<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, false>>;
type _06c = Expect<Equal<StrictEqualOf<{ readonly a: 1 }, { a: 1 }>, false>>;
type _06d = Expect<Equal<StrictEqualOf<string[], Array<string>>, true>>;
type _06e = Expect<Equal<StrictEqualOf<any, string>, false>>;

// 7. Report the two symmetric notions disagreeing, which is the whole reason the
//    stricter one exists.
export type SamenessDisagreementProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<SamenessDisagreementProfile["intersectionMutual"], true>>;
type _07b = Expect<Equal<SamenessDisagreementProfile["intersectionStrict"], false>>;
type _07c = Expect<Equal<SamenessDisagreementProfile["readonlyMutual"], true>>;
type _07d = Expect<Equal<SamenessDisagreementProfile["readonlyStrict"], false>>;
type _07e = Expect<Equal<SamenessDisagreementProfile["aliasesAgree"], true>>;

// 8. Report optionality being representationally distinct from an explicit
//    `undefined` in the value domain.
export type OptionalityIdentityProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<OptionalityIdentityProfile["optionalVersusUndefined"], false>>;
type _08b = Expect<Equal<OptionalityIdentityProfile["optionalMutual"], false>>;
type _08c = Expect<Equal<OptionalityIdentityProfile["optionalVersusOptional"], true>>;
type _08d = Expect<Equal<OptionalityIdentityProfile["readonlyTupleStrict"], false>>;
type _08e = Expect<Equal<OptionalityIdentityProfile["readonlyTupleMutual"], false>>;

// ─── Naming the direction ─────────────────────────────────────────────

// 9. Build the unguarded relation label, which trusts the comparisons directly.
export type RawRelationOf<Left, Right> = TODO; // TODO(koan)

type _09a = Expect<Equal<RawRelationOf<"x", string>, "subtype">>;
type _09b = Expect<Equal<RawRelationOf<string, "x">, "supertype">>;
type _09c = Expect<Equal<RawRelationOf<string, string>, "equal">>;
type _09d = Expect<Equal<RawRelationOf<string, number>, "incomparable">>;
type _09e = Expect<Equal<RawRelationOf<any, string>, "subtype">>;

// 10. Build the guarded relation, which refuses to answer about `any` at all
//     rather than reporting the contradiction the raw form reports.
export type RelationOf<Left, Right> = TODO; // TODO(koan)

type _10a = Expect<Equal<RelationOf<"x", string>, "subtype">>;
type _10b = Expect<Equal<RelationOf<string, "x">, "supertype">>;
type _10c = Expect<Equal<RelationOf<string, string>, "equal">>;
type _10d = Expect<Equal<RelationOf<any, string>, "indeterminate">>;
type _10e = Expect<Equal<RelationOf<string, any>, "indeterminate">>;

// 11. Report the contradiction that makes the guard necessary: `any` is
//     assignable in both directions to everything, yet identical to nothing.
export type AnyParadoxProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<AnyParadoxProfile["anyIntoString"], true>>;
type _11b = Expect<Equal<AnyParadoxProfile["stringIntoAny"], true>>;
type _11c = Expect<Equal<AnyParadoxProfile["mutual"], true>>;
type _11d = Expect<Equal<AnyParadoxProfile["strict"], false>>;
type _11e = Expect<Equal<AnyParadoxProfile["rawLabel"], "subtype">>;

// ─── The ends of the lattice ──────────────────────────────────────────

// 12. Report the bottom and top types sitting at opposite ends, each comparable
//     to everything but in opposite directions.
export type LatticeEndsProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<LatticeEndsProfile["bottomIntoAnything"], true>>;
type _12b = Expect<Equal<LatticeEndsProfile["anythingIntoBottom"], false>>;
type _12c = Expect<Equal<LatticeEndsProfile["bottomLabel"], "subtype">>;
type _12d = Expect<Equal<LatticeEndsProfile["anythingIntoTop"], true>>;
type _12e = Expect<Equal<LatticeEndsProfile["topLabel"], "supertype">>;

// 13. Report unions comparing by their whole domain rather than member by member,
//     and "incomparable" meaning only that neither direction holds.
export type UnionAndIncomparabilityProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<UnionAndIncomparabilityProfile["unionIntoBase"], "subtype">>;
type _13b = Expect<Equal<UnionAndIncomparabilityProfile["baseIntoUnion"], "supertype">>;
type _13c = Expect<Equal<UnionAndIncomparabilityProfile["disjointPrimitives"], "incomparable">>;
type _13d = Expect<Equal<UnionAndIncomparabilityProfile["disjointObjects"], "incomparable">>;
type _13e = Expect<Equal<UnionAndIncomparabilityProfile["overlapExists"], true>>;

// 14. Report callables, where the parameter direction is the opposite of the
//     return direction.
export type CallableVarianceProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<CallableVarianceProfile["broaderParameterIntoNarrower"], true>>;
type _14b = Expect<Equal<CallableVarianceProfile["narrowerParameterIntoBroader"], false>>;
type _14c = Expect<Equal<CallableVarianceProfile["parameterLabel"], "subtype">>;
type _14d = Expect<Equal<CallableVarianceProfile["returnLabel"], "subtype">>;
type _14e = Expect<Equal<CallableVarianceProfile["tupleLabel"], "supertype">>;

// ─── Surfaces built on the comparisons ────────────────────────────────

// 15. Build the classifier that names which awkward inhabitant a type is, before
//     any ordinary comparison is attempted.
export type ClassifyOf<Value> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<{ top: ClassifyOf<any>; bottom: ClassifyOf<never> }, { top: "any"; bottom: "never" }>
>;
type _15b = Expect<
  Equal<
    { unknownValue: ClassifyOf<unknown>; primitive: ClassifyOf<string> },
    { unknownValue: "unknown"; primitive: "ordinary" }
  >
>;
type _15c = Expect<
  Equal<
    { emptyObject: ClassifyOf<{}>; literal: ClassifyOf<"x"> },
    { emptyObject: "ordinary"; literal: "ordinary" }
  >
>;
type _15d = Expect<
  Equal<
    { union: ClassifyOf<string | number>; callable: ClassifyOf<() => void> },
    { union: "ordinary"; callable: "ordinary" }
  >
>;
type _15e = Expect<
  Equal<
    { absorbed: ClassifyOf<never | string>; stillTop: ClassifyOf<unknown | string> },
    { absorbed: "ordinary"; stillTop: "unknown" }
  >
>;

// 16. Build the trustworthiness test that reports whether an ordinary comparison
//     between two types can be believed at all.
export type IsComparableOf<Left, Right> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    { ordinary: IsComparableOf<string, number>; withAny: IsComparableOf<any, string> },
    { ordinary: true; withAny: false }
  >
>;
type _16b = Expect<
  Equal<
    { anyOnRight: IsComparableOf<string, any>; bothAny: IsComparableOf<any, any> },
    { anyOnRight: false; bothAny: false }
  >
>;
type _16c = Expect<
  Equal<
    { bottom: IsComparableOf<never, string>; top: IsComparableOf<unknown, string> },
    { bottom: true; top: true }
  >
>;
type _16d = Expect<
  Equal<
    {
      comparable: IsComparableOf<"x", string>;
      labelAgrees: RelationOf<"x", string>;
    },
    { comparable: true; labelAgrees: "subtype" }
  >
>;
type _16e = Expect<
  Equal<
    {
      notComparable: IsComparableOf<any, string>;
      labelRefuses: RelationOf<any, string>;
    },
    { notComparable: false; labelRefuses: "indeterminate" }
  >
>;

// 17. Build the value-comparison signature the packet exports, which is a
//     separate operation over values and says nothing about their types.
export type ComparisonRuntimeApi = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    ComparisonRuntimeApi["compareValues"],
    (left: unknown, right: unknown) => "same" | "different"
  >
>;
type _17b = Expect<
  Equal<ReturnType<ComparisonRuntimeApi["compareValues"]>, "same" | "different">
>;
type _17c = Expect<
  Equal<Parameters<ComparisonRuntimeApi["compareValues"]>, [left: unknown, right: unknown]>
>;
type _17d = Expect<
  Equal<
    {
      runtimeAnswer: ReturnType<ComparisonRuntimeApi["compareValues"]>;
      typeAnswer: RelationOf<string, string>;
    },
    { runtimeAnswer: "same" | "different"; typeAnswer: "equal" }
  >
>;
type _17e = Expect<
  Equal<
    {
      acceptsAnything: Parameters<ComparisonRuntimeApi["compareValues"]>[0];
      saysNothingAboutTypes: IsComparableOf<any, any>;
    },
    { acceptsAnything: unknown; saysNothingAboutTypes: false }
  >
>;
