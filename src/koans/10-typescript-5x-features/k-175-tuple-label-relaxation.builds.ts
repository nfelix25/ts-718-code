import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-175: tuple label relaxation — constructions
 * =============================================================================
 *
 * Before TypeScript 5.2, a tuple had to label all of its elements or none of
 * them. That rule made spreading awkward: combining a labelled tuple with an
 * unlabelled one had no legal spelling, so generic tuple manipulation kept
 * running into a syntax error rather than a type error. 5.2 dropped the
 * requirement — labels are now per element.
 *
 * The important thing to keep hold of is that labels never mattered to the type
 * system in the first place. They are documentation: they name a slot for
 * tooling and for destructuring, and two tuples that differ only in their labels
 * are the *same type*. Everything below is about that gap between what the
 * source says and what the checker compares. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── Mixing labelled and unlabelled elements ──────────────────────────

// 1. Build the pair where only the first element is named — a spelling that was
//    a syntax error before 5.2.
export type MixedPair<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<MixedPair<string>[0], string>>;
type _01b = Expect<Equal<MixedPair<string>[1], string>>;
type _01c = Expect<Equal<MixedPair<string>["length"], 2>>;
type _01d = Expect<Equal<MixedPair<string>[number], string>>;
type _01e = Expect<Equal<Equal<MixedPair<string>, [string, string]>, true>>;

// 2. Build the pair whose unlabelled element is also optional. Optionality is
//    real — it changes the length — while the label is not.
export type MixedOptional = TODO; // TODO(koan)

type _02a = Expect<Equal<MixedOptional[0], string>>;
type _02b = Expect<Equal<MixedOptional[1], boolean | undefined>>;
type _02c = Expect<Equal<MixedOptional["length"], 1 | 2>>;
type _02d = Expect<Equal<Equal<MixedOptional, [string, boolean?]>, true>>;
type _02e = Expect<
  Equal<
    {
      optionalityChangesTheLength: MixedOptional["length"];
      butARequiredPairHasOne: [id: string, flag: boolean]["length"];
    },
    { optionalityChangesTheLength: 1 | 2; butARequiredPairHasOne: 2 }
  >
>;

// 3. Build the tuple whose rest element is unlabelled while the leading ones are
//    named — the shape a variadic helper usually wants.
export type MixedRest<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<MixedRest<number>[0], number>>;
type _03b = Expect<Equal<MixedRest<number>[number], number>>;
type _03c = Expect<Equal<MixedRest<number>["length"], number>>;
type _03d = Expect<Equal<Equal<MixedRest<number>, [number, number, ...number[]]>, true>>;

// 4. Build the fully labelled version of the same shape, so the two can be
//    compared.
export type LabeledRest<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<LabeledRest<number>[0], number>>;
type _04b = Expect<Equal<LabeledRest<number>["length"], number>>;
type _04c = Expect<
  Equal<
    {
      labelsDoNotDistinguish: Equal<LabeledRest<number>, MixedRest<number>>;
      differentElementTypesDiffer: Equal<LabeledRest<number>, LabeledRest<string>>;
    },
    { labelsDoNotDistinguish: true; differentElementTypesDiffer: false }
  >
>;
type _04d = Expect<
  Equal<
    {
      labelsDoNotDistinguish: Equal<LabeledRest<number>, MixedRest<number>>;
      butElementTypesDo: Equal<LabeledRest<number>, LabeledRest<string>>;
    },
    { labelsDoNotDistinguish: true; butElementTypesDo: false }
  >
>;

// ─── Spreading tuples together ────────────────────────────────────────

// 5. Build the spread combinator — the operation that used to be unspellable
//    when the two sides disagreed about labelling.
export type SpreadTogether<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _05a = Expect<Equal<SpreadTogether<[boolean], [x: number, y: number]>, [boolean, x: number, y: number]>>;
type _05b = Expect<Equal<SpreadTogether<[], [x: number]>, [x: number]>>;
type _05c = Expect<Equal<SpreadTogether<[a: 1], []>, [a: 1]>>;
type _05d = Expect<Equal<SpreadTogether<[boolean], [x: number, y: number]>["length"], 3>>;
type _05e = Expect<Equal<SpreadTogether<[string], [number]>[number], string | number>>;

// 6. Build the labelled coordinate pair and the unlabelled flag the spread is
//    demonstrated on.
export type LabeledCoordinates = TODO; // TODO(koan)

type _06a = Expect<Equal<LabeledCoordinates["length"], 2>>;
type _06b = Expect<Equal<LabeledCoordinates[0], number>>;
type _06c = Expect<Equal<Equal<LabeledCoordinates, [number, number]>, true>>;
type _06d = Expect<Equal<LabeledCoordinates[number], number>>;

// 7. Build the merged result, which mixes an unlabelled leading element with two
//    labelled ones.
export type MergedCoordinates = TODO; // TODO(koan)

type _07a = Expect<Equal<MergedCoordinates, [boolean, x: number, y: number]>>;
type _07b = Expect<Equal<MergedCoordinates[0], boolean>>;
type _07c = Expect<Equal<MergedCoordinates[1], number>>;
type _07d = Expect<Equal<MergedCoordinates["length"], 3>>;
type _07e = Expect<Equal<Equal<MergedCoordinates, [boolean, number, number]>, true>>;

// ─── Adding one element at a time ─────────────────────────────────────

// 8. Build the prepender, which names the element it adds while leaving the rest
//    of the tuple exactly as it was.
export type PrependLabeled<Head, Tail extends readonly unknown[]> = TODO; // TODO(koan)

type _08a = Expect<Equal<PrependLabeled<0, LabeledCoordinates>, [head: 0, x: number, y: number]>>;
type _08b = Expect<Equal<PrependLabeled<0, []>, [head: 0]>>;
type _08c = Expect<Equal<PrependLabeled<0, LabeledCoordinates>["length"], 3>>;
type _08d = Expect<Equal<PrependLabeled<string, [number]>[0], string>>;

// 9. Build the appender, the mirror image.
export type AppendLabeled<Prefix extends readonly unknown[], Last> = TODO; // TODO(koan)

type _09a = Expect<Equal<AppendLabeled<LabeledCoordinates, string>, [x: number, y: number, last: string]>>;
type _09b = Expect<Equal<AppendLabeled<[], string>, [last: string]>>;
type _09c = Expect<Equal<AppendLabeled<LabeledCoordinates, string>["length"], 3>>;
type _09d = Expect<Equal<AppendLabeled<[number], boolean>[1], boolean>>;

// ─── What labels are and are not ──────────────────────────────────────

// 10. Report the central fact: two tuples that differ only in labelling are the
//     same type, at every arity and in every position.
export type LabelIrrelevanceProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<LabelIrrelevanceProfile["onePosition"], true>>;
type _10b = Expect<Equal<LabelIrrelevanceProfile["twoPositions"], true>>;
type _10c = Expect<Equal<LabelIrrelevanceProfile["mixedAgainstBare"], true>>;
type _10d = Expect<Equal<LabelIrrelevanceProfile["restAgainstBare"], true>>;
type _10e = Expect<Equal<LabelIrrelevanceProfile["differentNamesStillAgree"], true>>;

// 11. Report what *does* distinguish two tuples, so the previous profile is not
//     mistaken for "tuples never differ".
export type RealDifferenceProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<RealDifferenceProfile["elementTypes"], false>>;
type _11b = Expect<Equal<RealDifferenceProfile["arity"], false>>;
type _11c = Expect<Equal<RealDifferenceProfile["optionality"], false>>;
type _11d = Expect<Equal<RealDifferenceProfile["readonlyModifier"], false>>;
type _11e = Expect<Equal<RealDifferenceProfile["order"], false>>;

// 12. Report how the length property reflects a tuple's shape — the one place
//     optionality and rest elements become visible as types.
export type LengthProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<LengthProfile["fixed"], 2>>;
type _12b = Expect<Equal<LengthProfile["withOptional"], 1 | 2>>;
type _12c = Expect<Equal<LengthProfile["withRest"], number>>;
type _12d = Expect<Equal<LengthProfile["empty"], 0>>;
type _12e = Expect<Equal<LengthProfile["afterSpread"], 3>>;

// ─── Where the relaxation is felt ─────────────────────────────────────

// 13. Build the parameter list that mixes all three: a named element, a bare
//     one, and a named optional. This is the signature the relaxation was really
//     for.
export type DescribePoint = TODO; // TODO(koan)

type _13a = Expect<Equal<Parameters<DescribePoint>, [x: number, number, label?: string]>>;
type _13b = Expect<Equal<ReturnType<DescribePoint>, string>>;
type _13c = Expect<Equal<Parameters<DescribePoint>["length"], 2 | 3>>;
type _13d = Expect<Equal<Parameters<DescribePoint>[2], string | undefined>>;
type _13e = Expect<Equal<Equal<Parameters<DescribePoint>, [number, number, string?]>, true>>;

// 14. Build the variadic collector, whose parameter list names its first element
//     and leaves the rest bare.
export type CollectValues = TODO; // TODO(koan)

type _14a = Expect<Equal<Parameters<CollectValues>, [first: unknown, unknown, ...unknown[]]>>;
type _14b = Expect<Equal<ReturnType<CollectValues>, unknown[]>>;
type _14c = Expect<
  Equal<
    {
      variadicLength: Parameters<CollectValues>["length"];
      differentElementTypesDiffer: Equal<LabeledRest<number>, LabeledRest<string>>;
    },
    { variadicLength: number; differentElementTypesDiffer: false }
  >
>;
type _14d = Expect<
  Equal<
    {
      firstArgument: Parameters<CollectValues>[0];
      differentElementTypesDiffer: Equal<LabeledRest<number>, LabeledRest<string>>;
    },
    { firstArgument: unknown; differentElementTypesDiffer: false }
  >
>;

// 15. Build the runtime prepender's signature, so the type-level operation and
//     the value-level one can be checked against each other.
export type PrependRuntime = TODO; // TODO(koan)

type _15a = Expect<Equal<Parameters<PrependRuntime>["length"], 2>>;
type _15b = Expect<Equal<ReturnType<typeof prependZero>, [head: 0, x: number, y: number]>>;
type _15c = Expect<Equal<ReturnType<typeof prependZero>["length"], 3>>;
type _15d = Expect<
  Equal<
    {
      valueLevelMatchesTypeLevel: Equal<ReturnType<typeof prependZero>, PrependLabeled<0, LabeledCoordinates>>;
      andLabelsStillDoNotMatter: Equal<ReturnType<typeof prependZero>, [0, number, number]>;
    },
    { valueLevelMatchesTypeLevel: true; andLabelsStillDoNotMatter: true }
  >
>;

declare const prependZero: (head: 0, tail: LabeledCoordinates) => PrependLabeled<0, LabeledCoordinates>;

// ─── Reading a tuple's shape ──────────────────────────────────────────

// 16. Build the predicate that says whether a tuple has a fixed length — the
//     question optionality and rest elements answer differently.
export type IsFixedLength<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _16a = Expect<Equal<IsFixedLength<LabeledCoordinates>, true>>;
type _16b = Expect<Equal<IsFixedLength<MixedRest<number>>, false>>;
type _16c = Expect<Equal<IsFixedLength<[]>, true>>;
type _16d = Expect<Equal<IsFixedLength<number[]>, false>>;

// 17. Build the operator that strips every label — which, since labels are not
//     part of the type, is the identity in every way that matters.
export type Unlabeled<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _17a = Expect<Equal<Unlabeled<LabeledCoordinates>, [number, number]>>;
type _17b = Expect<
  Equal<
    {
      strippingChangesNothing: Equal<Unlabeled<LabeledCoordinates>, LabeledCoordinates>;
      differentElementTypesDiffer: Equal<LabeledRest<number>, LabeledRest<string>>;
    },
    { strippingChangesNothing: true; differentElementTypesDiffer: false }
  >
>;
type _17c = Expect<Equal<Unlabeled<MixedOptional>["length"], 1 | 2>>;
type _17d = Expect<Equal<Unlabeled<[]>, []>>;

// 18. Report one tuple at a glance: what it holds, how long it is, and whether
//     any of that depends on the labels.
export type TupleReport<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _18a = Expect<Equal<TupleReport<LabeledCoordinates>["elements"], number>>;
type _18b = Expect<Equal<TupleReport<LabeledCoordinates>["length"], 2>>;
type _18c = Expect<Equal<TupleReport<LabeledCoordinates>["fixed"], true>>;
type _18d = Expect<Equal<TupleReport<LabeledCoordinates>["labelsAreIrrelevant"], true>>;
type _18e = Expect<Equal<TupleReport<MixedRest<number>>["fixed"], false>>;
