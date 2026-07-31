import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-079: type-level split — constructions
 * =============================================================================
 *
 * These constructions recursively consume delimiters into tuples, with a
 * separate character branch for the empty delimiter and an array fallback for
 * broad input. They preserve empty fields, support multi-character and union
 * delimiters, expose ordinary tuple queries, filter segments, and profile
 * framed broad strings plus any/never boundaries. Replace each `TODO` with a
 * type satisfying the assertions directly below it.
 */

type GivenCharacters<Text extends string> =
  Text extends `${infer Head}${infer Tail}`
    ? [Head, ...GivenCharacters<Tail>]
    : [];

type GivenSplit<
  Text extends string,
  Delimiter extends string,
> =
  string extends Text
    ? string[]
    : Delimiter extends ""
      ? GivenCharacters<Text>
      : Text extends `${infer Head}${Delimiter}${infer Tail}`
        ? [Head, ...GivenSplit<Tail, Delimiter>]
        : [Text];

type GivenFirst<
  Text extends string,
  Delimiter extends string,
> =
  GivenSplit<Text, Delimiter> extends [
    infer First extends string,
    ...unknown[],
  ]
    ? First
    : never;

type GivenLast<
  Text extends string,
  Delimiter extends string,
> =
  GivenSplit<Text, Delimiter> extends [
    ...unknown[],
    infer Last extends string,
  ]
    ? Last
    : never;

type GivenRemoveEmpty<Parts extends readonly string[]> =
  Parts extends readonly [
    infer Head extends string,
    ...infer Tail extends string[],
  ]
    ? Head extends ""
      ? GivenRemoveEmpty<Tail>
      : [Head, ...GivenRemoveEmpty<Tail>]
    : [];

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

type GivenExtends<Source, Target> =
  [Source] extends [Target] ? true : false;

// ─── Recursive splitting ────────────────────────────────────────────────

// 1. Decompose a literal into adjacent template-inferred character segments.
export type Characters<Text extends string> =
  TODO; // TODO(koan)

type _01a = Expect<Equal<Characters<"Type">, ["T", "y", "p", "e"]>>;
type _01b = Expect<Equal<Characters<"">, []>>;
type _01c = Expect<Equal<Characters<"a-b">, ["a", "-", "b"]>>;
type _01d = Expect<
  Equal<Characters<"ab" | "xy">, ["a", "b"] | ["x", "y"]>
>;
type _01e = Expect<Equal<Characters<"🙂a">, ["🙂", "a"]>>;

// 2. Split recursively, preserving empty fields and handling broad text first.
export type Split<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<Split<"abc", ",">, ["abc"]>>;
type _02b = Expect<Equal<Split<"a,b,c", ",">, ["a", "b", "c"]>>;
type _02c = Expect<
  Equal<Split<",a,,", ",">, ["", "a", "", ""]>
>;
type _02d = Expect<Equal<Split<"a--b--c", "--">, ["a", "b", "c"]>>;
type _02e = Expect<
  Equal<Split<"a,b" | "c,d" | "single", ",">, ["a", "b"] | ["c", "d"] | ["single"]>
>;

// ─── Tuple queries over split results ───────────────────────────────────

// 3. Extract the first segment when the split result is definitely nonempty.
export type FirstSegment<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<FirstSegment<"a/b/c", "/">, "a">>;
type _03b = Expect<Equal<FirstSegment<"/a/b", "/">, "">>;
type _03c = Expect<Equal<FirstSegment<"single", "/">, "single">>;
type _03d = Expect<
  Equal<FirstSegment<"a/b" | "x/y", "/">, "a" | "x">
>;
type _03e = Expect<Equal<FirstSegment<string, "/">, never>>;

// 4. Extract the last segment when the split result is definitely nonempty.
export type LastSegment<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _04a = Expect<Equal<LastSegment<"a/b/c", "/">, "c">>;
type _04b = Expect<Equal<LastSegment<"a/b/", "/">, "">>;
type _04c = Expect<Equal<LastSegment<"single", "/">, "single">>;
type _04d = Expect<
  Equal<LastSegment<"a/b" | "x/y", "/">, "b" | "y">
>;
type _04e = Expect<Equal<LastSegment<string, "/">, never>>;

// 5. Collect every segment position into a union.
export type SegmentUnion<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _05a = Expect<Equal<SegmentUnion<"a/b/c", "/">, "a" | "b" | "c">>;
type _05b = Expect<Equal<SegmentUnion<"/a/", "/">, "" | "a">>;
type _05c = Expect<
  Equal<SegmentUnion<"a,b" | "c,d", ",">, "a" | "b" | "c" | "d">
>;
type _05d = Expect<Equal<SegmentUnion<"", "">, never>>;
type _05e = Expect<Equal<SegmentUnion<string, "/">, string>>;

// 6. Return the tuple length, or broad number for an array fallback.
export type SegmentCount<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _06a = Expect<Equal<SegmentCount<"a/b/c", "/">, 3>>;
type _06b = Expect<Equal<SegmentCount<"/a/", "/">, 3>>;
type _06c = Expect<Equal<SegmentCount<"", ",">, 1>>;
type _06d = Expect<Equal<SegmentCount<"", "">, 0>>;
type _06e = Expect<Equal<SegmentCount<string, "/">, number>>;

// 7. Separate the first segment from the remaining segment tuple.
export type HeadAndTailSegments<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<HeadAndTailSegments<"a/b/c", "/">, [head: "a", tail: ["b", "c"]]>
>;
type _07b = Expect<
  Equal<HeadAndTailSegments<"/a", "/">, [head: "", tail: ["a"]]>
>;
type _07c = Expect<
  Equal<HeadAndTailSegments<"single", "/">, [head: "single", tail: []]>
>;
type _07d = Expect<
  Equal<
    HeadAndTailSegments<"a/b" | "x/y", "/">,
    [head: "a", tail: ["b"]] | [head: "x", tail: ["y"]]
  >
>;
type _07e = Expect<Equal<HeadAndTailSegments<string, "/">, never>>;

// 8. Separate all leading segments from the final segment.
export type InitAndLastSegments<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<InitAndLastSegments<"a/b/c", "/">, [init: ["a", "b"], last: "c"]>
>;
type _08b = Expect<
  Equal<InitAndLastSegments<"a/", "/">, [init: ["a"], last: ""]>
>;
type _08c = Expect<
  Equal<InitAndLastSegments<"single", "/">, [init: [], last: "single"]>
>;
type _08d = Expect<
  Equal<
    InitAndLastSegments<"a/b" | "x/y", "/">,
    [init: ["a"], last: "b"] | [init: ["x"], last: "y"]
  >
>;
type _08e = Expect<Equal<InitAndLastSegments<string, "/">, never>>;

// ─── Segment transformations and predicates ─────────────────────────────

// 9. Split and recursively discard only empty-string segments.
export type NonEmptySegments<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<NonEmptySegments<",a,,b,", ",">, ["a", "b"]>
>;
type _09b = Expect<Equal<NonEmptySegments<",,", ",">, []>>;
type _09c = Expect<
  Equal<NonEmptySegments<"a,b" | ",c,", ",">, ["a", "b"] | ["c"]>
>;
type _09d = Expect<Equal<NonEmptySegments<"abc", ",">, ["abc"]>>;
type _09e = Expect<Equal<NonEmptySegments<string, ",">, string[]>>;

// 10. Report whether each candidate occurs in the segment union.
export type ContainsSegment<
  Text extends string,
  Delimiter extends string,
  Candidate extends string,
> =
  TODO; // TODO(koan)

type _10a = Expect<Equal<ContainsSegment<"a/b/c", "/", "b">, true>>;
type _10b = Expect<Equal<ContainsSegment<"a/b/c", "/", "x">, false>>;
type _10c = Expect<Equal<ContainsSegment<"/a/", "/", "">, true>>;
type _10d = Expect<
  Equal<ContainsSegment<"a/b/c", "/", "a" | "x">, boolean>
>;
type _10e = Expect<Equal<ContainsSegment<"", "", "">, false>>;

// 11. Describe whether a split preserves empty fields and how many it has.
export type EmptyFieldProfile<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    EmptyFieldProfile<",a,,", ",">,
    {
      segments: ["", "a", "", ""];
      empty: "";
      hasEmpty: true;
      count: 4;
    }
  >
>;
type _11b = Expect<
  Equal<EmptyFieldProfile<"a,b", ",">["hasEmpty"], false>
>;
type _11c = Expect<
  Equal<EmptyFieldProfile<"", ",">["segments"], [""]>
>;
type _11d = Expect<
  Equal<EmptyFieldProfile<"", "">["segments"], []>
>;
type _11e = Expect<
  Equal<EmptyFieldProfile<",,", ",">["count"], 3>
>;

// ─── Broad, delimiter, and special-input boundaries ─────────────────────

// 12. Describe how much structure broad and framed broad inputs retain.
export type BroadSplitProfile =
  TODO; // TODO(koan)

type _12a = Expect<Equal<BroadSplitProfile["broad"], string[]>>;
type _12b = Expect<
  Equal<BroadSplitProfile["framed"], [string, ...string[]]>
>;
type _12c = Expect<
  Equal<BroadSplitProfile["fixedHead"], ["head", ...string[]]>
>;
type _12d = Expect<
  Equal<BroadSplitProfile["fixedTail"], [string, "tail"]>
>;
type _12e = Expect<
  Equal<BroadSplitProfile["broadCharacters"], string[]>
>;

// 13. Describe broad, union, never, and multi-character delimiter behavior.
export type DelimiterProfile =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<DelimiterProfile["broad"], ["a", "b"]>
>;
type _13b = Expect<
  Equal<DelimiterProfile["unionOnePresent"], ["a", "b"] | ["a,b"]>
>;
type _13c = Expect<
  Equal<
    DelimiterProfile["unionBothPresent"],
    ["a", "b;c"] | ["a,b", "c"]
  >
>;
type _13d = Expect<
  Equal<
    Pick<DelimiterProfile, "absent" | "neverDelimiter">,
    { absent: ["abc"]; neverDelimiter: never }
  >
>;
type _13e = Expect<
  Equal<DelimiterProfile["repeatedMulti"], ["", "", ""]>
>;

// 14. Classify split results over any, never, broad, and literal text safely.
export type SplitSpecialProfile<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<SplitSpecialProfile<any, ",">, [false, false, true, true]>
>;
type _14b = Expect<
  Equal<SplitSpecialProfile<never, ",">, [false, true, true, false]>
>;
type _14c = Expect<
  Equal<SplitSpecialProfile<string, ",">, [false, false, true, true]>
>;
type _14d = Expect<
  Equal<SplitSpecialProfile<"a,b", ",">, [false, false, true, false]>
>;
type _14e = Expect<
  Equal<
    SplitSpecialProfile<"a,b" | "c,d", ",">,
    [false, false, true, false]
  >
>;

// 15. Build one reusable summary of the split and its tuple-derived facts.
export type SplitSummary<
  Text extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    SplitSummary<"users/42/posts", "/">,
    {
      segments: ["users", "42", "posts"];
      first: "users";
      last: "posts";
      members: "users" | "42" | "posts";
      count: 3;
    }
  >
>;
type _15b = Expect<
  Equal<
    SplitSummary<"/a/", "/">["segments"],
    ["", "a", ""]
  >
>;
type _15c = Expect<
  Equal<
    SplitSummary<"Type", "">["segments"],
    ["T", "y", "p", "e"]
  >
>;
type _15d = Expect<
  Equal<
    Pick<SplitSummary<"", "">, "segments" | "first" | "last" | "count">,
    { segments: []; first: never; last: never; count: 0 }
  >
>;
type _15e = Expect<
  Equal<
    SplitSummary<string, ",">,
    {
      segments: string[];
      first: never;
      last: never;
      members: string;
      count: number;
    }
  >
>;
