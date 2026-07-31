import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-096: tuple to union — constructions
 * =============================================================================
 *
 * These constructions use numeric tuple indexing to turn ordered positions
 * into a normalized value union. They deliberately lose order, duplicates, and
 * cardinality, while preserving optional `undefined`, rest domains, and literal
 * vocabularies. Mapped tuple constructions add wrappers or index tags before
 * indexing so correlation survives. The exercises also cover readonly inputs,
 * tuple unions, widening, empty and never domains, any and unknown, and the
 * packet's runtime API boundaries. Replace each `TODO` with a type satisfying
 * the assertions directly below it.
 */

type GivenElement<Value extends readonly unknown[]> =
  Value[number];

type GivenBoxed<Value extends readonly unknown[]> = {
  [Key in keyof Value]: { value: Value[Key] };
}[number];

type GivenChoice<Value extends readonly unknown[]> = {
  [Key in keyof Value]: { index: Key; value: Value[Key] };
}[number];

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

const givenWideMethods = ["get", "post"];
const givenNarrowMethods = ["get", "post"] as const;
const givenStates = ["idle", "running", "done"] as const;
const givenCodes = [200, 404, 500] as const;

// ─── Element-union constructions ───────────────────────────────────────

// 1. Form the union observable at every numeric position in a tuple or array.
export type TupleElement<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _01a = Expect<Equal<TupleElement<[1, 2, 3]>, 1 | 2 | 3>>;
type _01b = Expect<
  Equal<TupleElement<[string, number, boolean]>, string | number | boolean>
>;
type _01c = Expect<
  Equal<TupleElement<readonly ["GET", "POST", "DELETE"]>, "GET" | "POST" | "DELETE">
>;
type _01d = Expect<Equal<TupleElement<[]>, never>>;
type _01e = Expect<
  Equal<TupleElement<[head: string, ...tail: number[]]>, string | number>
>;

// 2. Wrap each position's value before forming the position union.
export type BoxedTupleElements<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _02a = Expect<Equal<BoxedTupleElements<[]>, never>>;
type _02b = Expect<
  Equal<BoxedTupleElements<[1]>, { value: 1 }>
>;
type _02c = Expect<
  Equal<BoxedTupleElements<[1, 2]>, { value: 1 } | { value: 2 }>
>;
type _02d = Expect<
  Equal<
    BoxedTupleElements<readonly ["a", true]>,
    { value: "a" } | { value: true }
  >
>;
type _02e = Expect<
  Equal<
    BoxedTupleElements<[never, 1]>,
    { value: never } | { value: 1 }
  >
>;

// 3. Tag each position with its stringified index before forming the union.
export type TupleChoice<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _03a = Expect<Equal<TupleChoice<[]>, never>>;
type _03b = Expect<
  Equal<TupleChoice<[1]>, { index: "0"; value: 1 }>
>;
type _03c = Expect<
  Equal<
    TupleChoice<[1, "a"]>,
    { index: "0"; value: 1 } | { index: "1"; value: "a" }
  >
>;
type _03d = Expect<
  Equal<
    TupleChoice<readonly ["draft", 2, true]>,
    | { index: "0"; value: "draft" }
    | { index: "1"; value: 2 }
    | { index: "2"; value: true }
  >
>;
type _03e = Expect<
  Equal<
    TupleChoice<[never, 1]>,
    { index: "0"; value: never } | { index: "1"; value: 1 }
  >
>;

// 4. Select the tagged choice associated with one positional string key.
export type ChoiceAtIndex<
  Value extends readonly unknown[],
  Index extends `${number}`,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<ChoiceAtIndex<[1, "a"], "0">, { index: "0"; value: 1 }>
>;
type _04b = Expect<
  Equal<ChoiceAtIndex<[1, "a"], "1">, { index: "1"; value: "a" }>
>;
type _04c = Expect<
  Equal<ChoiceAtIndex<readonly ["x", true, 3], "2">, { index: "2"; value: 3 }>
>;
type _04d = Expect<Equal<ChoiceAtIndex<[], "0">, never>>;
type _04e = Expect<
  Equal<ChoiceAtIndex<[1] | [2, 3], "0">["value"], 1 | 2>
>;

// 5. Build an array whose members are limited to the tuple's element union.
export type TupleElementArray<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _05a = Expect<Equal<TupleElementArray<[]>, never[]>>;
type _05b = Expect<
  Equal<TupleElementArray<[1, 2]>, (1 | 2)[]>
>;
type _05c = Expect<
  Equal<TupleElementArray<readonly ["a", true]>, ("a" | true)[]>
>;
type _05d = Expect<
  Equal<
    TupleElementArray<[value?: string]>,
    (string | undefined)[]
  >
>;
type _05e = Expect<
  Equal<TupleElementArray<readonly unknown[]>, unknown[]>
>;

// 6. Build a Set whose element type is the tuple's normalized value union.
export type TupleElementSet<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<TupleElementSet<[]>, Set<never>>>;
type _06b = Expect<
  Equal<TupleElementSet<[1, 1, 2]>, Set<1 | 2>>
>;
type _06c = Expect<
  Equal<
    TupleElementSet<readonly ["GET", "POST"]>,
    Set<"GET" | "POST">
  >
>;
type _06d = Expect<
  Equal<TupleElementSet<[value?: string]>, Set<string | undefined>>
>;
type _06e = Expect<
  Equal<TupleElementSet<readonly boolean[]>, Set<boolean>>
>;

// ─── Information loss and observation domains ─────────────────────────

// 7. Describe finite unions across literals, primitives, duplicates, and never.
export type FiniteElementProfile = TODO; // TODO(koan)

type _07a = Expect<
  Equal<FiniteElementProfile["literals"], 1 | 2 | 3>
>;
type _07b = Expect<
  Equal<
    FiniteElementProfile["primitives"],
    string | number | boolean
  >
>;
type _07c = Expect<
  Equal<FiniteElementProfile["duplicates"], 1 | 2>
>;
type _07d = Expect<Equal<FiniteElementProfile["neverPosition"], 1>>;
type _07e = Expect<
  Equal<FiniteElementProfile["overlapping"], 1 | 2 | 3>
>;

// 8. State which tuple facts cannot be recovered after numeric indexing.
export type ElementLossProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<ElementLossProfile["orderLost"], true>>;
type _08b = Expect<Equal<ElementLossProfile["duplicatesLost"], true>>;
type _08c = Expect<Equal<ElementLossProfile["cardinalityLost"], true>>;
type _08d = Expect<Equal<ElementLossProfile["unionIsTuple"], false>>;
type _08e = Expect<Equal<ElementLossProfile["tuplesStillDiffer"], false>>;

// 9. Show that readonly capability does not change numeric value observation.
export type ReadonlyElementProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ReadonlyElementProfile["mutable"], 1 | 2>>;
type _09b = Expect<Equal<ReadonlyElementProfile["readonly"], 1 | 2>>;
type _09c = Expect<Equal<ReadonlyElementProfile["equal"], true>>;
type _09d = Expect<
  Equal<ReadonlyElementProfile["readonlyArray"], string>
>;
type _09e = Expect<Equal<ReadonlyElementProfile["readonlyNever"], never>>;

// 10. Collect the observation domains contributed by optional and rest regions.
export type OptionalRestElementProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<OptionalRestElementProfile["optional"], string | undefined>
>;
type _10b = Expect<
  Equal<
    OptionalRestElementProfile["requiredOptional"],
    string | number | undefined
  >
>;
type _10c = Expect<
  Equal<OptionalRestElementProfile["trailing"], string | number>
>;
type _10d = Expect<
  Equal<OptionalRestElementProfile["leading"], string | number>
>;
type _10e = Expect<
  Equal<
    OptionalRestElementProfile["middle"],
    string | boolean | number
  >
>;

// 11. Flatten tuple unions and union-valued positions into the same value union.
export type TupleUnionElementProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<TupleUnionElementProfile["simple"], 1 | 2>>;
type _11b = Expect<Equal<TupleUnionElementProfile["empty"], 1>>;
type _11c = Expect<
  Equal<TupleUnionElementProfile["several"], 1 | 2 | 3 | 4>
>;
type _11d = Expect<
  Equal<TupleUnionElementProfile["positions"], 1 | 2 | 3 | 4>
>;
type _11e = Expect<
  Equal<TupleUnionElementProfile["open"], 1 | 2 | 3 | 4>
>;

// ─── Empty, special, and widened boundaries ────────────────────────────

// 12. Describe empty and never-valued inputs that normalize to never.
export type NeverElementProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<NeverElementProfile["empty"], never>>;
type _12b = Expect<Equal<NeverElementProfile["singleton"], never>>;
type _12c = Expect<Equal<NeverElementProfile["mixed"], 1>>;
type _12d = Expect<Equal<NeverElementProfile["array"], never>>;
type _12e = Expect<Equal<NeverElementProfile["whole"], never>>;

// 13. Classify unknown absorption and any poisoning without intending any.
export type ExtremeElementProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ExtremeElementProfile["unknownTuple"], unknown>>;
type _13b = Expect<Equal<ExtremeElementProfile["anyTupleIsAny"], true>>;
type _13c = Expect<Equal<ExtremeElementProfile["unknownArray"], unknown>>;
type _13d = Expect<Equal<ExtremeElementProfile["anyArrayIsAny"], true>>;
type _13e = Expect<
  Equal<ExtremeElementProfile["optionalAnyIsAny"], true>
>;

// 14. Contrast a widened array literal with an `as const` vocabulary.
export type VocabularyWideningProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<VocabularyWideningProfile["wide"], string>>;
type _14b = Expect<
  Equal<VocabularyWideningProfile["narrow"], "get" | "post">
>;
type _14c = Expect<Equal<VocabularyWideningProfile["equal"], false>>;
type _14d = Expect<Equal<VocabularyWideningProfile["wideLength"], number>>;
type _14e = Expect<Equal<VocabularyWideningProfile["narrowLength"], 2>>;

// ─── Correlation and runtime API boundaries ────────────────────────────

// 15. Retain position/value correlation for a representative mapped choice union.
export type ChoiceCorrelationProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ChoiceCorrelationProfile["choices"],
    | { index: "0"; value: "a" }
    | { index: "1"; value: 2 }
    | { index: "2"; value: true }
  >
>;
type _15b = Expect<
  Equal<
    ChoiceCorrelationProfile["zero"],
    { index: "0"; value: "a" }
  >
>;
type _15c = Expect<Equal<ChoiceCorrelationProfile["oneValue"], 2>>;
type _15d = Expect<Equal<ChoiceCorrelationProfile["trueIndex"], "2">>;
type _15e = Expect<Equal<ChoiceCorrelationProfile["empty"], never>>;

// 16. Build unions and mapped wrappers from two const vocabularies.
export type ConstVocabularyProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    ConstVocabularyProfile["states"],
    "idle" | "running" | "done"
  >
>;
type _16b = Expect<
  Equal<ConstVocabularyProfile["codes"], 200 | 404 | 500>
>;
type _16c = Expect<
  Equal<
    ConstVocabularyProfile["combined"],
    "idle" | "running" | "done" | 200 | 404 | 500
  >
>;
type _16d = Expect<
  Equal<
    ConstVocabularyProfile["boxedStates"],
    { value: "idle" } | { value: "running" } | { value: "done" }
  >
>;
type _16e = Expect<
  Equal<
    ConstVocabularyProfile["taggedCodes"],
    | { index: "0"; value: 200 }
    | { index: "1"; value: 404 }
    | { index: "2"; value: 500 }
  >
>;

// 17. Build the type surfaces exposed by the packet's tuple-driven runtime APIs.
export type TupleRuntimeApiProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<TupleRuntimeApiProfile["candidate"], unknown>>;
type _17b = Expect<
  Equal<
    TupleRuntimeApiProfile["predicateNarrowed"],
    "GET" | "POST" | "DELETE"
  >
>;
type _17c = Expect<
  Equal<
    TupleRuntimeApiProfile["set"],
    Set<"GET" | "POST" | "DELETE">
  >
>;
type _17d = Expect<
  Equal<
    TupleRuntimeApiProfile["indexed"],
    "GET" | "POST" | "DELETE" | undefined
  >
>;
type _17e = Expect<
  Equal<
    TupleRuntimeApiProfile["selected"],
    ("GET" | "POST" | "DELETE")[]
  >
>;

// 18. Build one element, loss, and correlation view for any tuple or array.
export type TupleElementSummary<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    TupleElementSummary<readonly ["draft", 2, true]>,
    {
      value: readonly ["draft", 2, true];
      elements: "draft" | 2 | true;
      boxed:
        | { value: "draft" }
        | { value: 2 }
        | { value: true };
      choices:
        | { index: "0"; value: "draft" }
        | { index: "1"; value: 2 }
        | { index: "2"; value: true };
      length: 3;
    }
  >
>;
type _18b = Expect<
  Equal<
    TupleElementSummary<[]>["elements" | "boxed" | "choices" | "length"],
    0
  >
>;
type _18c = Expect<
  Equal<
    TupleElementSummary<[value?: string]>["elements" | "length"],
    string | undefined | 0 | 1
  >
>;
type _18d = Expect<
  Equal<
    TupleElementSummary<[head: 1, ...tail: 2[]]>["elements" | "length"],
    1 | 2 | number
  >
>;
type _18e = Expect<
  Equal<
    TupleElementSummary<[1, 2] | [3, 4]>["elements" | "length"],
    1 | 2 | 3 | 4
  >
>;
