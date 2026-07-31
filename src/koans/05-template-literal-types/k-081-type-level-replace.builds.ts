import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-081: type-level replace — constructions
 * =============================================================================
 *
 * These constructions rewrite the leftmost match or recursively rewrite every
 * nonoverlapping match in the untouched tail. They cover deletion, empty-search
 * identity, no rescanning of inserted text, overlap behavior, input/search/
 * replacement unions, broad and framed inputs, any/never boundaries, and
 * downstream tuple and key transformations. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

declare const givenToken: unique symbol;

type GivenReplace<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  string extends Text
    ? Text
    : Search extends ""
      ? Text
      : Text extends `${infer Head}${Search}${infer Tail}`
        ? `${Head}${Replacement}${Tail}`
        : Text;

type GivenReplaceAll<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  string extends Text
    ? Text
    : Search extends ""
      ? Text
      : Text extends `${infer Head}${Search}${infer Tail}`
        ? `${Head}${Replacement}${GivenReplaceAll<Tail, Search, Replacement>}`
        : Text;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

// ─── First and recursive replacement ────────────────────────────────────

// 1. Rewrite only the leftmost nonempty search match.
export type Replace<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _01a = Expect<Equal<Replace<"a-b-c", "-", ":">, "a:b-c">>;
type _01b = Expect<Equal<Replace<"foo foo", "foo", "bar">, "bar foo">>;
type _01c = Expect<Equal<Replace<"unchanged", "x", "y">, "unchanged">>;
type _01d = Expect<Equal<Replace<"abc", "abc", "x">, "x">>;
type _01e = Expect<
  Equal<Replace<"a-b" | "c-d", "-", ":">, "a:b" | "c:d">
>;

// 2. Rewrite every left-to-right nonoverlapping match in the original tail.
export type ReplaceAll<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<ReplaceAll<"a-b-c", "-", ":">, "a:b:c">>;
type _02b = Expect<
  Equal<ReplaceAll<"foo foo foo", "foo", "bar">, "bar bar bar">
>;
type _02c = Expect<Equal<ReplaceAll<"unchanged", "x", "y">, "unchanged">>;
type _02d = Expect<
  Equal<ReplaceAll<"a::b::c", "::", ":">, "a:b:c">
>;
type _02e = Expect<
  Equal<ReplaceAll<"aaaaaaaaaa", "a", "b">, "bbbbbbbbbb">
>;

// 3. Delete only the first search match.
export type Remove<
  Text extends string,
  Search extends string,
> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<Remove<"a-b-c", "-">, "ab-c">>;
type _03b = Expect<Equal<Remove<"banana", "a">, "bnana">>;
type _03c = Expect<Equal<Remove<"abc", "abc">, "">>;
type _03d = Expect<Equal<Remove<"abc", "x">, "abc">>;
type _03e = Expect<
  Equal<Remove<"x" | "yx" | "plain", "x">, "" | "y" | "plain">
>;

// 4. Delete every nonoverlapping search match.
export type RemoveAll<
  Text extends string,
  Search extends string,
> =
  TODO; // TODO(koan)

type _04a = Expect<Equal<RemoveAll<"a-b-c", "-">, "abc">>;
type _04b = Expect<Equal<RemoveAll<"banana", "a">, "bnn">>;
type _04c = Expect<Equal<RemoveAll<"  a  b  ", " ">, "ab">>;
type _04d = Expect<Equal<RemoveAll<"aaa", "aa">, "a">>;
type _04e = Expect<Equal<RemoveAll<never, "x">, never>>;

// ─── Match-aware variations ─────────────────────────────────────────────

// 5. Report whether the algorithm has a nonempty search match to rewrite.
export type HasReplaceableSearch<
  Text extends string,
  Search extends string,
> =
  TODO; // TODO(koan)

type _05a = Expect<Equal<HasReplaceableSearch<"a-b", "-">, true>>;
type _05b = Expect<Equal<HasReplaceableSearch<"plain", "-">, false>>;
type _05c = Expect<Equal<HasReplaceableSearch<"abc", "">, false>>;
type _05d = Expect<
  Equal<HasReplaceableSearch<"a-b" | "plain", "-">, boolean>
>;
type _05e = Expect<Equal<HasReplaceableSearch<never, "-">, never>>;

// 6. Return every nonempty search candidate that independently occurs.
export type MatchingSearches<
  Text extends string,
  Search extends string,
> =
  TODO; // TODO(koan)

type _06a = Expect<
  Equal<MatchingSearches<"a-b", "a" | "b" | "x">, "a" | "b">
>;
type _06b = Expect<
  Equal<MatchingSearches<"banana", "a" | "an" | "na" | "x">, "a" | "an" | "na">
>;
type _06c = Expect<
  Equal<MatchingSearches<"abc", "" | "a" | "bc">, "a" | "bc">
>;
type _06d = Expect<
  Equal<MatchingSearches<"plain", "x" | "y">, never>
>;
type _06e = Expect<Equal<MatchingSearches<"abc", never>, never>>;

// 7. Rewrite the first match, but reject a nonmatch instead of preserving it.
export type ReplaceOrNever<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _07a = Expect<Equal<ReplaceOrNever<"a-b-c", "-", ":">, "a:b-c">>;
type _07b = Expect<Equal<ReplaceOrNever<"plain", "-", ":">, never>>;
type _07c = Expect<Equal<ReplaceOrNever<"abc", "", "x">, never>>;
type _07d = Expect<
  Equal<ReplaceOrNever<"a-b" | "plain", "-", ":">, "a:b">
>;
type _07e = Expect<
  Equal<ReplaceOrNever<"a-b", "a" | "b", "x">, "x-b" | "a-x">
>;

// 8. Rewrite all matches, but reject an input with no initial match.
export type ReplaceAllOrNever<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<ReplaceAllOrNever<"a-b-c", "-", ":">, "a:b:c">
>;
type _08b = Expect<Equal<ReplaceAllOrNever<"plain", "-", ":">, never>>;
type _08c = Expect<Equal<ReplaceAllOrNever<"abc", "", "x">, never>>;
type _08d = Expect<
  Equal<ReplaceAllOrNever<"a-b" | "plain", "-", ":">, "a:b">
>;
type _08e = Expect<
  Equal<ReplaceAllOrNever<"aaaa", "aa", "x">, "xx">
>;

// ─── Applying replacement to larger structures ─────────────────────────

// 9. Replace all matches in every member of a string tuple.
export type ReplaceTuple<
  Values extends readonly string[],
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    ReplaceTuple<["a-b", "c-d", "plain"], "-", ":">,
    ["a:b", "c:d", "plain"]
  >
>;
type _09b = Expect<
  Equal<
    ReplaceTuple<readonly ["foo foo", "foo"], "foo", "bar">,
    readonly ["bar bar", "bar"]
  >
>;
type _09c = Expect<Equal<ReplaceTuple<[], "-", ":">, []>>;
type _09d = Expect<
  Equal<ReplaceTuple<string[], "-", ":">, string[]>
>;
type _09e = Expect<
  Equal<ReplaceTuple<["aa", "aaa"], "a", "aa">, ["aaaa", "aaaaaa"]>
>;

// 10. Replace all matches in string keys while preserving other keys and modifiers.
export type ReplaceKeys<
  ObjectType,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    ReplaceKeys<{ "first-name": string; "last-name": string }, "-", "_">,
    { first_name: string; last_name: string }
  >
>;
type _10b = Expect<
  Equal<
    ReplaceKeys<{ readonly "user-name"?: string }, "-", "_">,
    { readonly user_name?: string }
  >
>;
type _10c = Expect<
  Equal<
    ReplaceKeys<{ "a-b": 1; a_b: 2 }, "-", "_">,
    { a_b: 1 | 2 }
  >
>;
type _10d = Expect<
  Equal<
    ReplaceKeys<{ 1: boolean; [givenToken]: Date }, "-", "_">,
    { 1: boolean; [givenToken]: Date }
  >
>;
type _10e = Expect<Equal<ReplaceKeys<{}, "-", "_">, {}>>;

// 11. Build a reusable comparison of first, all, and deletion outcomes.
export type ReplaceSummary<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ReplaceSummary<"a-b-c", "-", ":">,
    {
      first: "a:b-c";
      all: "a:b:c";
      removeFirst: "ab-c";
      removeAll: "abc";
    }
  >
>;
type _11b = Expect<
  Equal<ReplaceSummary<"plain", "x", "y">["all"], "plain">
>;
type _11c = Expect<
  Equal<ReplaceSummary<"abc", "", "x">["first"], "abc">
>;
type _11d = Expect<
  Equal<
    ReplaceSummary<"a-a" | "b-b", "-", ":">["all"],
    "a:a" | "b:b"
  >
>;
type _11e = Expect<
  Equal<ReplaceSummary<"aaa", "aa", "x">["all"], "xa">
>;

// ─── Algorithm-choice profiles ──────────────────────────────────────────

// 12. Show that inserted search text is retained rather than rescanned.
export type NoRescanProfile<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _12a = Expect<Equal<NoRescanProfile<"a", "a", "aa">, ["aa", "aa"]>>;
type _12b = Expect<Equal<NoRescanProfile<"aa", "a", "aa">, ["aaa", "aaaa"]>>;
type _12c = Expect<Equal<NoRescanProfile<"x", "x", "x">, ["x", "x"]>>;
type _12d = Expect<Equal<NoRescanProfile<"xx", "x", "xx">, ["xxx", "xxxx"]>>;
type _12e = Expect<
  Equal<NoRescanProfile<"a" | "aa", "a", "aa">, ["aa" | "aaa", "aa" | "aaaa"]>
>;

// 13. Show left-to-right, nonoverlapping behavior for multi-character searches.
export type NonOverlapProfile<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _13a = Expect<Equal<NonOverlapProfile<"aaa", "aa", "x">, ["xa", "a"]>>;
type _13b = Expect<Equal<NonOverlapProfile<"aaaa", "aa", "x">, ["xx", ""]>>;
type _13c = Expect<Equal<NonOverlapProfile<"aaaaa", "aa", "x">, ["xxa", "a"]>>;
type _13d = Expect<Equal<NonOverlapProfile<"ababa", "aba", "x">, ["xba", "ba"]>>;
type _13e = Expect<
  Equal<NonOverlapProfile<"aaaa" | "aaa", "aa", "x">, ["xx" | "xa", "" | "a"]>
>;

// 14. Describe search-union and replacement-union expansion.
export type TokenUnionProfile<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    TokenUnionProfile<"a-b", "a" | "b", "x">["first"],
    "x-b" | "a-x"
  >
>;
type _14b = Expect<
  Equal<
    TokenUnionProfile<"a-b", "a" | "b", "x">["all"],
    "x-b" | "a-x"
  >
>;
type _14c = Expect<
  Equal<TokenUnionProfile<"a", "a", "x" | "y">["all"], "x" | "y">
>;
type _14d = Expect<
  Equal<
    TokenUnionProfile<"aa", "a", "x" | "y">["all"],
    "xx" | "xy" | "yx" | "yy"
  >
>;
type _14e = Expect<
  Equal<TokenUnionProfile<"abc", never, "x">["all"], never>
>;

// 15. Pin the explicit identity rule for every empty-search variation.
export type EmptySearchProfile<
  Text extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _15a = Expect<
  Equal<EmptySearchProfile<"abc", "x">, ["abc", "abc", "abc", "abc"]>
>;
type _15b = Expect<
  Equal<EmptySearchProfile<"", "x">, ["", "", "", ""]>
>;
type _15c = Expect<
  Equal<
    EmptySearchProfile<"a" | "b", "x">,
    ["a" | "b", "a" | "b", "a" | "b", "a" | "b"]
  >
>;
type _15d = Expect<
  Equal<EmptySearchProfile<string, "x">, [string, string, string, string]>
>;
type _15e = Expect<
  Equal<EmptySearchProfile<never, "x">, [never, never, never, never]>
>;

// ─── Broad and special boundaries ───────────────────────────────────────

// 16. Describe broad and structurally framed inputs under both algorithms.
export type BroadReplaceProfile =
  TODO; // TODO(koan)

type _16a = Expect<Equal<BroadReplaceProfile["firstBroad"], string>>;
type _16b = Expect<Equal<BroadReplaceProfile["allBroad"], string>>;
type _16c = Expect<
  Equal<BroadReplaceProfile["firstFramed"], `${string}:${string}`>
>;
type _16d = Expect<
  Equal<BroadReplaceProfile["allFramed"], `${string}:${string}`>
>;
type _16e = Expect<
  Equal<BroadReplaceProfile["removeFramed"], string>
>;

// 17. Classify any and never results without requiring a raw-any answer.
export type ReplaceSpecialProfile<
  Text extends string,
  Search extends string,
  Replacement extends string,
> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<ReplaceSpecialProfile<any, "a", "x">, [true, false]>
>;
type _17b = Expect<
  Equal<ReplaceSpecialProfile<never, "a", "x">, [false, true]>
>;
type _17c = Expect<
  Equal<ReplaceSpecialProfile<string, "a", "x">, [false, false]>
>;
type _17d = Expect<
  Equal<ReplaceSpecialProfile<"abc", never, "x">, [false, true]>
>;
type _17e = Expect<
  Equal<ReplaceSpecialProfile<"abc", "a", never>, [false, true]>
>;
