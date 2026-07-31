import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-077: template pattern inference — constructions
 * =============================================================================
 *
 * These constructions run template literals in reverse: fixed prefixes,
 * suffixes, wrappers, and delimiters capture the text between them. They cover
 * empty captures, earliest usable delimiters, repeated and multi-character
 * delimiters, adjacent inference, union filtering, broad versus structurally
 * framed strings, capture reuse, and any/never/unknown boundaries. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenSplit<
  Text,
  Delimiter extends string,
> =
  Text extends `${infer Left}${Delimiter}${infer Right}`
    ? [Left, Right]
    : never;

type GivenThree<
  Text,
  Delimiter extends string,
> =
  Text extends
    `${infer First}${Delimiter}${infer Second}${Delimiter}${infer Third}`
      ? [First, Second, Third]
      : never;

type GivenFirstAndRest<Text> =
  Text extends `${infer First}${infer Rest}`
    ? [First, Rest]
    : never;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

// ─── Boundary captures ──────────────────────────────────────────────────

// 1. Remove a required prefix and return the unmatched remainder.
export type AfterPrefix<
  Text,
  Prefix extends string,
> =
  TODO; // TODO(koan)

type _01a = Expect<Equal<AfterPrefix<"user:42", "user:">, "42">>;
type _01b = Expect<Equal<AfterPrefix<"pre", "pre">, "">>;
type _01c = Expect<Equal<AfterPrefix<"abc", "">, "abc">>;
type _01d = Expect<
  Equal<AfterPrefix<"a1" | "a2" | "b3", "a">, "1" | "2">
>;
type _01e = Expect<
  Equal<AfterPrefix<`pre${string}`, "pre">, string>
>;

// 2. Remove a required suffix and return the unmatched beginning.
export type BeforeSuffix<
  Text,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<BeforeSuffix<"index.ts", ".ts">, "index">>;
type _02b = Expect<Equal<BeforeSuffix<".ts", ".ts">, "">>;
type _02c = Expect<Equal<BeforeSuffix<"abc", "">, "abc">>;
type _02d = Expect<
  Equal<BeforeSuffix<"a!" | "b!" | "c?", "!">, "a" | "b">
>;
type _02e = Expect<
  Equal<BeforeSuffix<`${string}.ts`, ".ts">, string>
>;

// 3. Capture text surrounded by required opening and closing delimiters.
export type Between<
  Text,
  Open extends string,
  Close extends string,
> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<Between<"[value]", "[", "]">, "value">>;
type _03b = Expect<Equal<Between<"[]", "[", "]">, "">>;
type _03c = Expect<Equal<Between<"[a][b]", "[", "]">, "a][b">>;
type _03d = Expect<
  Equal<Between<"(a:b)" | "(x)" | "missing", "(", ")">, "a:b" | "x">
>;
type _03e = Expect<Equal<Between<"value", "[", "]">, never>>;

// ─── Delimited captures ─────────────────────────────────────────────────

// 4. Split at the first usable occurrence of a delimiter.
export type SplitOnce<
  Text,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _04a = Expect<Equal<SplitOnce<"key:value", ":">, ["key", "value"]>>;
type _04b = Expect<Equal<SplitOnce<"a:b:c", ":">, ["a", "b:c"]>>;
type _04c = Expect<
  Equal<
    SplitOnce<":tail" | "head:" | ":", ":">,
    ["", "tail"] | ["head", ""] | ["", ""]
  >
>;
type _04d = Expect<
  Equal<SplitOnce<"a--b--c", "--">, ["a", "b--c"]>
>;
type _04e = Expect<
  Equal<SplitOnce<"a:1" | "b:2" | "missing", ":">, ["a", "1"] | ["b", "2"]>
>;

// 5. Capture three parts around the first two usable delimiters.
export type ThreeParts<
  Text,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _05a = Expect<Equal<ThreeParts<"a:b:c", ":">, ["a", "b", "c"]>>;
type _05b = Expect<Equal<ThreeParts<"a:b:c:d", ":">, ["a", "b", "c:d"]>>;
type _05c = Expect<
  Equal<ThreeParts<"::" | ":middle:", ":">, ["", "", ""] | ["", "middle", ""]>
>;
type _05d = Expect<
  Equal<ThreeParts<"a--b--c--d", "--">, ["a", "b", "c--d"]>
>;
type _05e = Expect<
  Equal<ThreeParts<"a:b:c" | "x:y", ":">, ["a", "b", "c"]>
>;

// 6. Give the first adjacent infer site one leading segment and the rest the tail.
export type FirstAndRest<Text> =
  TODO; // TODO(koan)

type _06a = Expect<Equal<FirstAndRest<"Type">, ["T", "ype"]>>;
type _06b = Expect<Equal<FirstAndRest<"T">, ["T", ""]>>;
type _06c = Expect<Equal<FirstAndRest<"">, never>>;
type _06d = Expect<
  Equal<FirstAndRest<"ab" | "xy">, ["a", "b"] | ["x", "y"]>
>;
type _06e = Expect<
  Equal<FirstAndRest<"🙂a">, ["🙂", "a"]>
>;

// 7. Give the first two adjacent infer sites one segment each.
export type FirstSecondRest<Text> =
  TODO; // TODO(koan)

type _07a = Expect<Equal<FirstSecondRest<"Type">, ["T", "y", "pe"]>>;
type _07b = Expect<Equal<FirstSecondRest<"Ty">, ["T", "y", ""]>>;
type _07c = Expect<Equal<FirstSecondRest<"T">, never>>;
type _07d = Expect<
  Equal<FirstSecondRest<"abc" | "xyz">, ["a", "b", "c"] | ["x", "y", "z"]>
>;
type _07e = Expect<
  Equal<FirstSecondRest<"🙂a">, ["🙂", "a", ""]>
>;

// ─── Reusing and qualifying captures ────────────────────────────────────

// 8. Turn a delimited string into a record named by its two captures.
export type KeyValueRecord<
  Text,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<KeyValueRecord<"name:Ada", ":">, { key: "name"; value: "Ada" }>
>;
type _08b = Expect<
  Equal<KeyValueRecord<":empty", ":">, { key: ""; value: "empty" }>
>;
type _08c = Expect<
  Equal<KeyValueRecord<"a:b:c", ":">, { key: "a"; value: "b:c" }>
>;
type _08d = Expect<
  Equal<
    KeyValueRecord<"a=1" | "b=2", "=">,
    { key: "a"; value: "1" } | { key: "b"; value: "2" }
  >
>;
type _08e = Expect<Equal<KeyValueRecord<"missing", ":">, never>>;

// 9. Return split captures on a match, or preserve the original input.
export type SplitOrSelf<
  Text,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _09a = Expect<Equal<SplitOrSelf<"a:b", ":">, ["a", "b"]>>;
type _09b = Expect<Equal<SplitOrSelf<"missing", ":">, "missing">>;
type _09c = Expect<
  Equal<SplitOrSelf<"a:1" | "missing", ":">, ["a", "1"] | "missing">
>;
type _09d = Expect<Equal<SplitOrSelf<"", ":">, "">>;
type _09e = Expect<Equal<SplitOrSelf<never, ":">, never>>;

// 10. Report whether every distributed member contains the delimiter pattern.
export type HasDelimiter<
  Text,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _10a = Expect<Equal<HasDelimiter<"a:b", ":">, true>>;
type _10b = Expect<Equal<HasDelimiter<"missing", ":">, false>>;
type _10c = Expect<Equal<HasDelimiter<":", ":">, true>>;
type _10d = Expect<
  Equal<HasDelimiter<"a:1" | "missing", ":">, boolean>
>;
type _10e = Expect<Equal<HasDelimiter<never, ":">, never>>;

// 11. Filter a union to its original delimiter-bearing members.
export type DelimitedMembers<
  Text,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<DelimitedMembers<"a:1" | "b:2", ":">, "a:1" | "b:2">
>;
type _11b = Expect<
  Equal<DelimitedMembers<"a:1" | "missing" | "b:2", ":">, "a:1" | "b:2">
>;
type _11c = Expect<
  Equal<DelimitedMembers<"a--b" | "a-b", "--">, "a--b">
>;
type _11d = Expect<Equal<DelimitedMembers<string, ":">, never>>;
type _11e = Expect<Equal<DelimitedMembers<never, ":">, never>>;

// 12. Remove a fixed prefix, then split the remaining text once.
export type SplitAfterPrefix<
  Text,
  Prefix extends string,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<SplitAfterPrefix<"user:name:Ada", "user:", ":">, ["name", "Ada"]>
>;
type _12b = Expect<
  Equal<SplitAfterPrefix<"user::tail", "user:", ":">, ["", "tail"]>
>;
type _12c = Expect<
  Equal<SplitAfterPrefix<"user:a:b:c", "user:", ":">, ["a", "b:c"]>
>;
type _12d = Expect<
  Equal<
    SplitAfterPrefix<"user:a:1" | "team:b:2", "user:", ":">,
    ["a", "1"]
  >
>;
type _12e = Expect<
  Equal<SplitAfterPrefix<`user:${string}:${string}`, "user:", ":">, [string, string]>
>;

// 13. Swap the two captured parts while retaining the delimiter.
export type SwapDelimited<
  Text,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _13a = Expect<Equal<SwapDelimited<"a:b", ":">, "b:a">>;
type _13b = Expect<Equal<SwapDelimited<"a:b:c", ":">, "b:c:a">>;
type _13c = Expect<
  Equal<SwapDelimited<":tail" | "head:", ":">, "tail:" | ":head">
>;
type _13d = Expect<
  Equal<SwapDelimited<"a=1" | "b=2", "=">, "1=a" | "2=b">
>;
type _13e = Expect<Equal<SwapDelimited<"missing", ":">, never>>;

// ─── Combined and special-input profiles ────────────────────────────────

// 14. Describe two-part, three-part, adjacency, and match results together.
export type DelimiterProfile<
  Text,
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    DelimiterProfile<"a:b:c", ":">,
    {
      split: ["a", "b:c"];
      three: ["a", "b", "c"];
      adjacent: ["a", ":b:c"];
      hasDelimiter: true;
    }
  >
>;
type _14b = Expect<
  Equal<DelimiterProfile<":", ":">["split"], ["", ""]>
>;
type _14c = Expect<
  Equal<DelimiterProfile<"missing", ":">["three"], never>
>;
type _14d = Expect<
  Equal<
    DelimiterProfile<"a:1" | "missing", ":">["split"],
    ["a", "1"]
  >
>;
type _14e = Expect<
  Equal<DelimiterProfile<string, ":">["hasDelimiter"], false>
>;

// 15. Classify split and adjacent inference over special input types safely.
export type PatternSpecialProfile<Text> =
  TODO; // TODO(koan)

type _15a = Expect<
  Equal<PatternSpecialProfile<any>, [false, false, false, false]>
>;
type _15b = Expect<
  Equal<PatternSpecialProfile<never>, [false, true, false, true]>
>;
type _15c = Expect<
  Equal<PatternSpecialProfile<unknown>, [false, true, false, true]>
>;
type _15d = Expect<
  Equal<PatternSpecialProfile<string>, [false, true, false, true]>
>;
type _15e = Expect<
  Equal<PatternSpecialProfile<"a:b">, [false, false, false, false]>
>;
