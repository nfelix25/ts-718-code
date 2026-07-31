import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-092: rest tuple elements — constructions
 * =============================================================================
 *
 * These constructions place one variable region after, before, or between
 * fixed tuple positions. They preserve precise fixed positions while widening
 * length, expose the union assembled by numeric indexing, and model function
 * rest parameters. They also cover optional prefixes, readonly capability,
 * fixed-suffix ambiguity, minimum length through assignability, unions, and
 * never, any, and unknown rest domains. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenTrailing<Head, Tail> = [
  head: Head,
  ...tail: Tail[],
];

type GivenLeading<Head, Tail> = [
  ...head: Head[],
  tail: Tail,
];

type GivenMiddle<Head, Middle, Tail> = [
  head: Head,
  ...middle: Middle[],
  tail: Tail,
];

type GivenOptionalRest<Head, Tail> = [
  head?: Head,
  ...tail: Tail[],
];

// ─── Placing variable tuple regions ────────────────────────────────────

// 1. Build one fixed head followed by zero or more tail values.
export type TrailingRest<Head, Tail> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<TrailingRest<string, number>, [head: string, ...tail: number[]]>
>;
type _01b = Expect<
  Equal<TrailingRest<"x", never>, [head: "x", ...tail: never[]]>
>;
type _01c = Expect<
  Equal<TrailingRest<1, unknown>, [head: 1, ...tail: unknown[]]>
>;
type _01d = Expect<
  Equal<
    TrailingRest<"a" | "b", 1 | 2>,
    [head: "a" | "b", ...tail: (1 | 2)[]]
  >
>;
type _01e = Expect<
  Equal<TrailingRest<{}, []>["length"], number>
>;

// 2. Build zero or more leading values followed by one fixed tail.
export type LeadingRest<Head, Tail> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<LeadingRest<string, number>, [...head: string[], tail: number]>
>;
type _02b = Expect<
  Equal<LeadingRest<never, 1>, [...head: never[], tail: 1]>
>;
type _02c = Expect<
  Equal<LeadingRest<unknown, "end">[number], unknown>
>;
type _02d = Expect<
  Equal<
    LeadingRest<"a" | "b", 1 | 2>,
    [...head: ("a" | "b")[], tail: 1 | 2]
  >
>;
type _02e = Expect<Equal<LeadingRest<string, number>["length"], number>>;

// 3. Build one fixed head, one variable middle, and one fixed tail.
export type MiddleRest<Head, Middle, Tail> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    MiddleRest<string, boolean, number>,
    [head: string, ...middle: boolean[], tail: number]
  >
>;
type _03b = Expect<
  Equal<MiddleRest<1, never, 2>, [head: 1, ...middle: never[], tail: 2]>
>;
type _03c = Expect<
  Equal<MiddleRest<"start", unknown, "end">[0], "start">
>;
type _03d = Expect<
  Equal<
    MiddleRest<0, 1 | 2, 3>[number],
    0 | 1 | 2 | 3
  >
>;
type _03e = Expect<
  Equal<MiddleRest<string, boolean, number>["length"], number>
>;

// 4. Build an optional fixed head followed by a trailing rest.
export type OptionalRest<Head, Tail> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<OptionalRest<string, number>, [head?: string, ...tail: number[]]>
>;
type _04b = Expect<
  Equal<OptionalRest<string, number>[0], string | undefined>
>;
type _04c = Expect<
  Equal<OptionalRest<string, number>[1], number>
>;
type _04d = Expect<
  Equal<
    OptionalRest<string, number>[number],
    string | number | undefined
  >
>;
type _04e = Expect<Equal<OptionalRest<string, number>["length"], number>>;

// 5. Form the numeric element union of any tuple with a rest region.
export type RestTupleElements<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    RestTupleElements<[head: string, ...tail: number[]]>,
    string | number
  >
>;
type _05b = Expect<
  Equal<
    RestTupleElements<[...head: string[], tail: number]>,
    string | number
  >
>;
type _05c = Expect<
  Equal<
    RestTupleElements<
      [head: string, ...middle: boolean[], tail: number]
    >,
    string | boolean | number
  >
>;
type _05d = Expect<
  Equal<RestTupleElements<[...values: never[]]>, never>
>;
type _05e = Expect<
  Equal<
    RestTupleElements<[head: 0, ...tail: (1 | 2)[]]>,
    0 | 1 | 2
  >
>;

// 6. Read the widened length of an open rest tuple.
export type RestTupleLength<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<RestTupleLength<[head: string, ...tail: number[]]>, number>
>;
type _06b = Expect<
  Equal<RestTupleLength<[...head: string[], tail: number]>, number>
>;
type _06c = Expect<
  Equal<
    RestTupleLength<[head: string, ...middle: boolean[], tail: number]>,
    number
  >
>;
type _06d = Expect<
  Equal<RestTupleLength<[head: 1, ...tail: never[]]>, number>
>;
type _06e = Expect<
  Equal<RestTupleLength<readonly [...values: unknown[]]>, number>
>;

// ─── Function and helper tuple surfaces ────────────────────────────────

// 7. Extract the parameter tuple from a function with a rest parameter.
export type RestParameterTuple<
  FunctionType extends (...arguments_: never[]) => unknown,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    RestParameterTuple<(...values: number[]) => void>,
    number[]
  >
>;
type _07b = Expect<
  Equal<
    RestParameterTuple<(label: string, ...values: number[]) => void>,
    [label: string, ...values: number[]]
  >
>;
type _07c = Expect<
  Equal<
    RestParameterTuple<
      (...arguments_: [path: string, force?: boolean]) => void
    >,
    [path: string, force?: boolean]
  >
>;
type _07d = Expect<
  Equal<
    RestParameterTuple<(...arguments_: readonly [1, 2]) => void>,
    [1, 2]
  >
>;
type _07e = Expect<
  Equal<
    RestParameterTuple<(...arguments_: [1, ...2[]]) => void>[number],
    1 | 2
  >
>;

// 8. Build the command-line parameter tuple with one fixed command and string rest.
export type CommandArguments = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    CommandArguments,
    [command: string, ...arguments_: string[]]
  >
>;
type _08b = Expect<Equal<CommandArguments[0], string>>;
type _08c = Expect<Equal<CommandArguments[1], string>>;
type _08d = Expect<Equal<CommandArguments[number], string>>;
type _08e = Expect<Equal<CommandArguments["length"], number>>;

// 9. Build a string prefix and boolean suffix around a numeric rest region.
export type FramedNumbers = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    FramedNumbers,
    [prefix: string, ...values: number[], suffix: boolean]
  >
>;
type _09b = Expect<Equal<FramedNumbers[0], string>>;
type _09c = Expect<
  Equal<FramedNumbers[1], number | boolean>
>;
type _09d = Expect<
  Equal<FramedNumbers[number], string | number | boolean>
>;
type _09e = Expect<Equal<FramedNumbers["length"], number>>;

// 10. Build the summary helper's input and fixed result tuple surfaces.
export type SummaryHelperProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    SummaryHelperProfile["parameters"],
    [label: string, ...values: number[]]
  >
>;
type _10b = Expect<
  Equal<
    SummaryHelperProfile["result"],
    [label: string, total: number, count: number]
  >
>;
type _10c = Expect<
  Equal<SummaryHelperProfile["parameterElements"], string | number>
>;
type _10d = Expect<
  Equal<SummaryHelperProfile["resultElements"], string | number>
>;
type _10e = Expect<Equal<SummaryHelperProfile["resultLength"], 3>>;

// 11. Preserve a variadic literal argument list as the exact readonly tuple.
export type CollectResult<Values extends readonly unknown[]> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    CollectResult<readonly ["a", 1, true]>,
    readonly ["a", 1, true]
  >
>;
type _11b = Expect<Equal<CollectResult<readonly []>, readonly []>>;
type _11c = Expect<
  Equal<CollectResult<[string, ...number[]]>, [string, ...number[]]>
>;
type _11d = Expect<
  Equal<CollectResult<readonly unknown[]>[number], unknown>
>;
type _11e = Expect<
  Equal<CollectResult<readonly [never]>["length"], 1>
>;

// 12. Build a readonly trailing-rest view without changing its value grammar.
export type ReadonlyTrailingRest<Head, Tail> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    ReadonlyTrailingRest<string, number>,
    readonly [head: string, ...tail: number[]]
  >
>;
type _12b = Expect<
  Equal<ReadonlyTrailingRest<string, number>[0], string>
>;
type _12c = Expect<
  Equal<ReadonlyTrailingRest<string, number>[1], number>
>;
type _12d = Expect<
  Equal<
    ReadonlyTrailingRest<string, number>[number],
    string | number
  >
>;
type _12e = Expect<
  Equal<ReadonlyTrailingRest<string, number>["length"], number>
>;

// ─── Assignment and boundary profiles ─────────────────────────────────

// 13. Describe valid and invalid assignments to a fixed-head trailing rest.
export type TrailingAssignmentProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<TrailingAssignmentProfile["headOnly"], true>>;
type _13b = Expect<Equal<TrailingAssignmentProfile["several"], true>>;
type _13c = Expect<Equal<TrailingAssignmentProfile["missingHead"], false>>;
type _13d = Expect<Equal<TrailingAssignmentProfile["wrongHead"], false>>;
type _13e = Expect<Equal<TrailingAssignmentProfile["wrongTail"], false>>;

// 14. Describe minimum and boundary checking for leading and middle rest shapes.
export type LeadingMiddleAssignmentProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<LeadingMiddleAssignmentProfile["leadingSuffixOnly"], true>
>;
type _14b = Expect<
  Equal<LeadingMiddleAssignmentProfile["leadingSeveral"], true>
>;
type _14c = Expect<
  Equal<LeadingMiddleAssignmentProfile["middleNoValues"], true>
>;
type _14d = Expect<
  Equal<LeadingMiddleAssignmentProfile["middleSeveral"], true>
>;
type _14e = Expect<
  Equal<LeadingMiddleAssignmentProfile["middleWrongOrder"], false>
>;

// 15. Describe omission and the inability to shift numeric rest values into the head.
export type OptionalRestAssignmentProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<OptionalRestAssignmentProfile["empty"], true>>;
type _15b = Expect<Equal<OptionalRestAssignmentProfile["headOnly"], true>>;
type _15c = Expect<
  Equal<OptionalRestAssignmentProfile["headAndTail"], true>
>;
type _15d = Expect<
  Equal<OptionalRestAssignmentProfile["numbersCannotSkipHead"], false>
>;
type _15e = Expect<
  Equal<OptionalRestAssignmentProfile["explicitUndefined"], false>
>;

// 16. Describe a never tail that is open in shape but has no present rest value.
export type NeverRestProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<NeverRestProfile["first"], "x">>;
type _16b = Expect<Equal<NeverRestProfile["second"], never>>;
type _16c = Expect<Equal<NeverRestProfile["elements"], "x">>;
type _16d = Expect<Equal<NeverRestProfile["length"], number>>;
type _16e = Expect<Equal<NeverRestProfile["headOnly"], true>>;

// 17. Classify the numeric element union for any and unknown rest domains.
export type ExtremeRestProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<ExtremeRestProfile["anyElementsAreAny"], true>
>;
type _17b = Expect<
  Equal<ExtremeRestProfile["unknownElementsAreAny"], false>
>;
type _17c = Expect<Equal<ExtremeRestProfile["unknownElements"], unknown>>;
type _17d = Expect<Equal<ExtremeRestProfile["anyLength"], number>>;
type _17e = Expect<Equal<ExtremeRestProfile["unknownLength"], number>>;

// 18. Show how a fixed suffix makes early literal indices ambiguous.
export type FixedSuffixIndexProfile = TODO; // TODO(koan)

type _18a = Expect<
  Equal<FixedSuffixIndexProfile["leadingZero"], string | number>
>;
type _18b = Expect<
  Equal<FixedSuffixIndexProfile["leadingOne"], string | number>
>;
type _18c = Expect<
  Equal<FixedSuffixIndexProfile["leadingElements"], string | number>
>;
type _18d = Expect<Equal<FixedSuffixIndexProfile["middleZero"], boolean>>;
type _18e = Expect<
  Equal<FixedSuffixIndexProfile["middleOne"], string | number>
>;

// 19. Express a two-position minimum through assignment checks, not literal length.
export type MinimumLengthProfile = TODO; // TODO(koan)

type _19a = Expect<Equal<MinimumLengthProfile["length"], number>>;
type _19b = Expect<Equal<MinimumLengthProfile["empty"], false>>;
type _19c = Expect<Equal<MinimumLengthProfile["one"], false>>;
type _19d = Expect<Equal<MinimumLengthProfile["two"], true>>;
type _19e = Expect<Equal<MinimumLengthProfile["many"], true>>;

// 20. Build one positional and capability view for any rest-bearing tuple.
export type RestTupleSummary<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    RestTupleSummary<[head: string, ...tail: number[]]>,
    {
      value: [head: string, ...tail: number[]];
      first: string;
      elements: string | number;
      length: number;
      readonlyCompatible: true;
      mutableCompatible: true;
    }
  >
>;
type _20b = Expect<
  Equal<
    RestTupleSummary<readonly [head: string, ...tail: number[]]>[
      "readonlyCompatible" | "mutableCompatible"
    ],
    boolean
  >
>;
type _20c = Expect<
  Equal<
    RestTupleSummary<[...head: string[], tail: number]>[
      "first" | "elements"
    ],
    string | number
  >
>;
type _20d = Expect<
  Equal<
    RestTupleSummary<[head: 1, ...tail: never[]]>[
      "elements" | "length"
    ],
    1 | number
  >
>;
type _20e = Expect<
  Equal<
    RestTupleSummary<
      [head: 0, ...tail: 1[]] | [head: "x", ...tail: 2[]]
    >["elements" | "length"],
    0 | 1 | "x" | 2 | number
  >
>;
