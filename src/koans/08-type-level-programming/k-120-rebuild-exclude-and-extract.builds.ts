import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-120: rebuild Exclude and Extract — constructions
 * =============================================================================
 *
 * These two filters are the same conditional with its branches swapped, and all
 * of their behaviour comes from one property: a naked type parameter distributes,
 * so each constituent is asked independently whether it fits. That makes the test
 * assignability rather than equality — a subtype matches its supertype, a
 * readonly view matches a mutable one, and a wider parameter matches a narrower
 * callable. It also means the union is normalised before any filtering happens,
 * so `string | "x"` has already collapsed to `string` and there is no `"x"` left
 * to remove. Wrapping both sides in a tuple asks a completely different question:
 * does the whole union fit at once. Replace each `TODO` with a type satisfying
 * the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenAnimal = { name: string };
type GivenDog = { name: string; bark(): void };
type GivenCat = { name: string; meow(): void };

type GivenMutable = { value: number };
type GivenReadonly = { readonly value: number };
type GivenNarrow = { value: 1 };

type GivenNullary = () => void;
type GivenStringArgument = (value: string) => void;
type GivenUnknownArgument = (value: unknown) => void;

// Declared with the packet's own partitioning signature so a construction can
// be graded against a real call site.
declare function givenPartitionBy<Value, Selected extends Value>(
  values: readonly Value[],
  isSelected: (value: Value) => value is Selected,
): {
  extracted: RebuiltExtract<Value, Selected>[];
  excluded: RebuiltExclude<Value, Selected>[];
};

// ─── The two filters ──────────────────────────────────────────────────

// 1. Build the subtractive filter: for every constituent, erase it when it fits
//    the unwanted domain and keep it otherwise.
//    `RebuiltExclude<"a" | "b" | "c", "b">` is `"a" | "c"`.
export type RebuiltExclude<Union, Unwanted> = TODO; // TODO(koan)

type _01a = Expect<Equal<RebuiltExclude<"a" | "b" | "c", "b">, "a" | "c">>;
type _01b = Expect<Equal<RebuiltExclude<string | number | boolean, number>, string | boolean>>;
type _01c = Expect<Equal<RebuiltExclude<1 | 2 | 3, 1 | 3>, 2>>;
type _01d = Expect<Equal<RebuiltExclude<string | number, unknown>, never>>;
type _01e = Expect<Equal<RebuiltExclude<never, string>, never>>;

// 2. Build the complementary filter, which keeps exactly what the first one
//    erased.
export type RebuiltExtract<Union, Wanted> = TODO; // TODO(koan)

type _02a = Expect<Equal<RebuiltExtract<"a" | "b" | "c", "b">, "b">>;
type _02b = Expect<
  Equal<RebuiltExtract<string | number | boolean, number | boolean>, number | boolean>
>;
type _02c = Expect<Equal<RebuiltExtract<1 | 2 | 3, 1 | 3>, 1 | 3>>;
type _02d = Expect<Equal<RebuiltExtract<string | number, unknown>, string | number>>;
type _02e = Expect<Equal<RebuiltExtract<unknown, string>, never>>;

// 3. Build the non-distributive subtraction, which asks one question about the
//    whole union instead of one per constituent.
//    Hint: a one-element tuple around each side is enough to stop distribution.
export type WholeExcludeOf<Union, Unwanted> = TODO; // TODO(koan)

type _03a = Expect<Equal<WholeExcludeOf<string | number, string>, string | number>>;
type _03b = Expect<Equal<WholeExcludeOf<"a" | "b", string>, never>>;
type _03c = Expect<Equal<WholeExcludeOf<never, string>, never>>;
type _03d = Expect<Equal<WholeExcludeOf<string, string>, never>>;
type _03e = Expect<Equal<WholeExcludeOf<any, string>, never>>;

// 4. Build the non-distributive selection.
export type WholeExtractOf<Union, Wanted> = TODO; // TODO(koan)

type _04a = Expect<Equal<WholeExtractOf<string | number, string>, never>>;
type _04b = Expect<Equal<WholeExtractOf<"a" | "b", string>, "a" | "b">>;
type _04c = Expect<Equal<WholeExtractOf<never, string>, never>>;
type _04d = Expect<Equal<WholeExtractOf<string | number, unknown>, string | number>>;
type _04e = Expect<
  Equal<
    {
      anyFits: GivenIsAny<WholeExtractOf<any, string>>;
      partialFit: WholeExtractOf<string | number, string>;
    },
    { anyFits: true; partialFit: never }
  >
>;

// ─── Two halves of one partition ──────────────────────────────────────

// 5. Report the two filters partitioning a union between them.
export type ComplementarityProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<ComplementarityProfile["kept"], "b">>;
type _05b = Expect<Equal<ComplementarityProfile["dropped"], "a" | "c">>;
type _05c = Expect<Equal<ComplementarityProfile["keptAll"], 1 | 2 | 3>>;
type _05d = Expect<Equal<ComplementarityProfile["droppedAll"], never>>;
type _05e = Expect<Equal<ComplementarityProfile["rejoined"], 1 | 2 | 3>>;

// 6. Report the union being normalised before any filtering runs, so a literal
//    absorbed by its own base type is no longer there to remove.
export type NormalizationProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<NormalizationProfile["absorbedExcluded"], string>>;
type _06b = Expect<Equal<NormalizationProfile["absorbedExtracted"], never>>;
type _06c = Expect<Equal<NormalizationProfile["numericAbsorbed"], number>>;
type _06d = Expect<Equal<NormalizationProfile["unknownAbsorbed"], unknown>>;
type _06e = Expect<Equal<NormalizationProfile["unknownAbsorbedExtract"], never>>;

// ─── Assignability, not equality ──────────────────────────────────────

// 7. Report the test being structural and directional: a subtype fits its
//    supertype, but not the other way around.
export type StructuralDirectionProfile = TODO; // TODO(koan)

type _07a = Expect<
  Equal<StructuralDirectionProfile["subtypesKept"], GivenDog | GivenCat>
>;
type _07b = Expect<Equal<StructuralDirectionProfile["subtypesDropped"], string>>;
type _07c = Expect<Equal<StructuralDirectionProfile["supertypeAgainstSubtype"], GivenDog>>;
type _07d = Expect<Equal<StructuralDirectionProfile["supertypeSurvives"], GivenAnimal>>;
type _07e = Expect<
  Equal<StructuralDirectionProfile["bothAgainstSupertype"], GivenAnimal | GivenDog>
>;

// 8. Report a superset matching its subset, which makes "extract the exact shape"
//    an unreachable request.
export type SupersetProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<SupersetProfile["bothMatch"], { a: 1 } | { a: 1; b: 2 }>>;
type _08b = Expect<Equal<SupersetProfile["noneSurvive"], never>>;
type _08c = Expect<Equal<SupersetProfile["narrowValueKept"], GivenNarrow>>;
type _08d = Expect<Equal<SupersetProfile["wideValueSurvives"], GivenMutable>>;
type _08e = Expect<
  Equal<SupersetProfile["againstWider"], GivenMutable | GivenNarrow>
>;

// 9. Report `readonly` being invisible to this test in both directions, because
//    property mutability does not affect object assignability.
export type ReadonlyVarianceProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ReadonlyVarianceProfile["mutableAgainstReadonly"], GivenMutable>>;
type _09b = Expect<Equal<ReadonlyVarianceProfile["mutableDropped"], string>>;
type _09c = Expect<Equal<ReadonlyVarianceProfile["readonlyAgainstMutable"], GivenReadonly>>;
type _09d = Expect<Equal<ReadonlyVarianceProfile["arraysAreDifferent"], never>>;
type _09e = Expect<Equal<ReadonlyVarianceProfile["arraysOneWay"], number[]>>;

// 10. Report callables, where a parameter that accepts more is still assignable
//     to one that accepts less.
export type CallableVarianceProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<CallableVarianceProfile["callablesKept"], GivenNullary | GivenStringArgument>
>;
type _10b = Expect<Equal<CallableVarianceProfile["nonCallableSurvives"], string>>;
type _10c = Expect<
  Equal<
    CallableVarianceProfile["widerParameterMatches"],
    GivenStringArgument | GivenUnknownArgument
  >
>;
type _10d = Expect<Equal<CallableVarianceProfile["noneSurvive"], never>>;
type _10e = Expect<
  Equal<CallableVarianceProfile["arityMatches"], GivenNullary | GivenStringArgument>
>;

// 11. Report array-shaped filters, where the readonly array is the broad domain.
export type ArrayFilterProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<ArrayFilterProfile["arraysKept"], readonly [1] | number[]>
>;
type _11b = Expect<Equal<ArrayFilterProfile["nonArraySurvives"], object>>;
type _11c = Expect<Equal<ArrayFilterProfile["tupleAgainstArray"], readonly [1]>>;
type _11d = Expect<Equal<ArrayFilterProfile["mutableOnly"], number[]>>;
type _11e = Expect<Equal<ArrayFilterProfile["emptyDomain"], never>>;

// ─── Asking about the whole union instead ─────────────────────────────

// 12. Report the tuple-wrapped tests, which never filter: they answer once and
//     return either the entire union or nothing.
export type WholeUnionProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<WholeUnionProfile["partialFitExcluded"], string | number>>;
type _12b = Expect<Equal<WholeUnionProfile["partialFitExtracted"], never>>;
type _12c = Expect<Equal<WholeUnionProfile["completeFitExcluded"], never>>;
type _12d = Expect<Equal<WholeUnionProfile["completeFitExtracted"], "a" | "b">>;
type _12e = Expect<Equal<WholeUnionProfile["topFilter"], string | number>>;

// 13. Report the distributive filters on the top and bottom types, where an
//     empty union has nothing to distribute over and `any` takes both branches.
export type DistributiveExtremeProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<DistributiveExtremeProfile["emptyExcluded"], never>>;
type _13b = Expect<Equal<DistributiveExtremeProfile["emptyExtracted"], never>>;
type _13c = Expect<Equal<DistributiveExtremeProfile["topExcluded"], unknown>>;
type _13d = Expect<Equal<DistributiveExtremeProfile["topExtracted"], never>>;
type _13e = Expect<Equal<DistributiveExtremeProfile["anyExtracted"], true>>;

// 14. Report the same extremes under the tuple-wrapped tests, where `any` stops
//     taking both branches and the two filters swap which one it satisfies.
export type WholeExtremeProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<WholeExtremeProfile["anyExcluded"], never>>;
type _14b = Expect<Equal<WholeExtremeProfile["anyExtracted"], true>>;
type _14c = Expect<Equal<WholeExtremeProfile["emptyExcluded"], never>>;
type _14d = Expect<Equal<WholeExtremeProfile["emptyExtracted"], never>>;
type _14e = Expect<Equal<WholeExtremeProfile["topExcluded"], unknown>>;

// ─── Filters built on the filters ─────────────────────────────────────

// 15. Build the nullish subtraction that the standard library calls NonNullable.
export type NonNullableOf<Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<NonNullableOf<string | null>, string>>;
type _15b = Expect<Equal<NonNullableOf<string | null | undefined>, string>>;
type _15c = Expect<Equal<NonNullableOf<null | undefined>, never>>;
type _15d = Expect<Equal<NonNullableOf<never>, never>>;
type _15e = Expect<Equal<NonNullableOf<string | 0 | false>, string | 0 | false>>;

// 16. Build the symmetric difference: the members that belong to exactly one of
//     two unions.
export type SymmetricDifferenceOf<Left, Right> = TODO; // TODO(koan)

type _16a = Expect<Equal<SymmetricDifferenceOf<1 | 2, 2 | 3>, 1 | 3>>;
type _16b = Expect<Equal<SymmetricDifferenceOf<1 | 2, 1 | 2>, never>>;
type _16c = Expect<Equal<SymmetricDifferenceOf<never, 1 | 2>, 1 | 2>>;
type _16d = Expect<Equal<SymmetricDifferenceOf<"a", "b">, "a" | "b">>;
type _16e = Expect<Equal<SymmetricDifferenceOf<1 | 2 | 3, 2>, 1 | 3>>;

// 17. Build the containment test that reports whether every member of one union
//     is present in another.
//     Hint: nothing is left over exactly when the subtraction is empty.
export type IsSubsetOf<Candidate, Container> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { subset: IsSubsetOf<1 | 2, 1 | 2 | 3>; superset: IsSubsetOf<1 | 2 | 3, 1 | 2> },
    { subset: true; superset: false }
  >
>;
type _17b = Expect<
  Equal<
    { equal: IsSubsetOf<"a" | "b", "a" | "b">; disjoint: IsSubsetOf<"a", "b"> },
    { equal: true; disjoint: false }
  >
>;
type _17c = Expect<
  Equal<
    { empty: IsSubsetOf<never, 1>; intoEmpty: IsSubsetOf<1, never> },
    { empty: true; intoEmpty: false }
  >
>;
type _17d = Expect<
  Equal<
    { literalIntoBase: IsSubsetOf<"a" | "b", string>; baseIntoLiteral: IsSubsetOf<string, "a"> },
    { literalIntoBase: true; baseIntoLiteral: false }
  >
>;
type _17e = Expect<
  Equal<
    { intoTop: IsSubsetOf<string | number, unknown>; subtypes: IsSubsetOf<GivenDog, GivenAnimal> },
    { intoTop: true; subtypes: true }
  >
>;

// 18. Build the partitioning signature the packet exports, whose two result
//     arrays are the two halves this packet's filters compute.
export type PartitionRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    PartitionRuntimeApi["partitionBy"],
    <Value, Selected extends Value>(
      values: readonly Value[],
      isSelected: (value: Value) => value is Selected,
    ) => {
      extracted: RebuiltExtract<Value, Selected>[];
      excluded: RebuiltExclude<Value, Selected>[];
    }
  >
>;
type _18b = Expect<
  Equal<ReturnType<typeof givenPartitionBy<"a" | "b" | "c", "b">>["extracted"], "b"[]>
>;
type _18c = Expect<
  Equal<ReturnType<typeof givenPartitionBy<"a" | "b" | "c", "b">>["excluded"], ("a" | "c")[]>
>;
type _18d = Expect<
  Equal<
    {
      keys: keyof ReturnType<typeof givenPartitionBy<1 | 2, 1>>;
      excluded: ReturnType<typeof givenPartitionBy<1 | 2, 1>>["excluded"];
    },
    { keys: "extracted" | "excluded"; excluded: 2[] }
  >
>;
type _18e = Expect<
  Equal<
    {
      kept: ReturnType<typeof givenPartitionBy<GivenDog | string, GivenDog>>["extracted"];
      dropped: ReturnType<typeof givenPartitionBy<GivenDog | string, GivenDog>>["excluded"];
    },
    { kept: GivenDog[]; dropped: string[] }
  >
>;
