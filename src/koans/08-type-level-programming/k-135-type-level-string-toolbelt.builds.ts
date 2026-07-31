import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-135: a type-level string toolbelt — constructions
 * =============================================================================
 *
 * Template-literal patterns give a string the same head/tail structure a tuple
 * has, and once that clicks the whole toolbelt is one shape repeated: match an
 * edge or a delimiter, capture what surrounds it, recurse on the remainder. The
 * interesting decisions are all at the empty cases. An empty search pattern would
 * match everywhere and never terminate, so it has to be a deliberate no-op. An
 * empty input splits to no fields at all, while a trailing delimiter must still
 * produce the empty field after it — which is what makes split and join actual
 * inverses. And every operator needs a broad-string escape hatch, since `string`
 * has no head to peel. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenWhitespace = " " | "\n" | "\t";

// Declared with the packet's own signatures so constructions can be graded
// against real call sites.
declare function givenTrimText<const Text extends string>(value: Text): TrimOf<Text>;
declare function givenSplitText<const Text extends string, const Separator extends string>(
  value: Text,
  separator: Separator,
): SplitOf<Text, Separator>;

// ─── Peeling an edge ──────────────────────────────────────────────────

// 1. Build the left trim: peel one leading whitespace character and recurse.
export type TrimLeftOf<Text extends string> = TODO; // TODO(koan)

type _01a = Expect<Equal<TrimLeftOf<"  value">, "value">>;
type _01b = Expect<Equal<TrimLeftOf<"value">, "value">>;
type _01c = Expect<Equal<TrimLeftOf<"">, "">>;
type _01d = Expect<Equal<TrimLeftOf<" \t\nvalue">, "value">>;
type _01e = Expect<Equal<TrimLeftOf<string>, string>>;

// 2. Build the right trim, whose pattern puts the capture first.
export type TrimRightOf<Text extends string> = TODO; // TODO(koan)

type _02a = Expect<Equal<TrimRightOf<"value\n\t">, "value">>;
type _02b = Expect<Equal<TrimRightOf<"value">, "value">>;
type _02c = Expect<Equal<TrimRightOf<"">, "">>;
type _02d = Expect<Equal<TrimRightOf<"value   ">, "value">>;
type _02e = Expect<Equal<TrimRightOf<any>, string>>;

// 3. Build the two-sided trim by composing the two one-sided ones.
export type TrimOf<Text extends string> = TODO; // TODO(koan)

type _03a = Expect<Equal<TrimOf<" \t value \n">, "value">>;
type _03b = Expect<Equal<TrimOf<"already-clean">, "already-clean">>;
type _03c = Expect<Equal<TrimOf<"">, "">>;
type _03d = Expect<Equal<TrimOf<" \n\t ">, "">>;
type _03e = Expect<Equal<TrimOf<" a " | " b ">, "a" | "b">>;

// ─── Capturing around a delimiter ─────────────────────────────────────

// 4. Build the single replacement, which captures the text on either side of the
//    first match. An empty search has to be refused before the pattern is tried.
export type ReplaceOf<
  Text extends string,
  Search extends string,
  With extends string,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<ReplaceOf<"a-b-c", "-", "/">, "a/b-c">>;
type _04b = Expect<Equal<ReplaceOf<"abc", "x", "!">, "abc">>;
type _04c = Expect<Equal<ReplaceOf<"", "x", "y">, "">>;
type _04d = Expect<Equal<ReplaceOf<"abc", "", "x">, "abc">>;
type _04e = Expect<Equal<ReplaceOf<string, "-", "/">, string>>;

// 5. Build the repeating replacement's inner recursion, which reapplies itself to
//    whatever followed the match.
export type ReplaceAllOneOf<
  Text extends string,
  Search extends string,
  With extends string,
> = TODO; // TODO(koan)

type _05a = Expect<Equal<ReplaceAllOneOf<"a-b-c", "-", "/">, "a/b/c">>;
type _05b = Expect<Equal<ReplaceAllOneOf<"abc", "x", "!">, "abc">>;
type _05c = Expect<Equal<ReplaceAllOneOf<"bookkeeper", "oo", "u">, "bukkeeper">>;
type _05d = Expect<Equal<ReplaceAllOneOf<"aaaa", "aa", "a">, "aa">>;
type _05e = Expect<Equal<ReplaceAllOneOf<"", "x", "y">, "">>;

// 6. Build the guarded repeating replacement, keeping the empty-search no-op.
export type ReplaceAllOf<
  Text extends string,
  Search extends string,
  With extends string,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<ReplaceAllOf<"a-b-c", "-", "/">, "a/b/c">>;
type _06b = Expect<Equal<ReplaceAllOf<"abc", "", "x">, "abc">>;
type _06c = Expect<Equal<ReplaceAllOf<"a-b" | "c-d", "-", ".">, "a.b" | "c.d">>;
type _06d = Expect<Equal<ReplaceAllOf<"a-b", "-", "x" | "y">, "axb" | "ayb">>;
type _06e = Expect<Equal<ReplaceAllOf<string, "-", ".">, string>>;

// ─── Turning a string into a tuple ────────────────────────────────────

// 7. Build the character explosion, which is the empty-separator case of a split.
export type SplitCharactersOf<Text extends string> = TODO; // TODO(koan)

type _07a = Expect<Equal<SplitCharactersOf<"abc">, ["a", "b", "c"]>>;
type _07b = Expect<Equal<SplitCharactersOf<"">, []>>;
type _07c = Expect<Equal<SplitCharactersOf<"a">, ["a"]>>;
type _07d = Expect<Equal<SplitCharactersOf<"koan">["length"], 4>>;
type _07e = Expect<Equal<SplitCharactersOf<"abcdefghij">["length"], 10>>;

// 8. Build the single-literal split. An empty separator explodes characters, an
//    empty input yields no fields at all, and a trailing delimiter must still
//    produce the empty field that follows it.
export type SplitOneOf<Text extends string, Separator extends string> = TODO; // TODO(koan)

type _08a = Expect<Equal<SplitOneOf<"a/b/c", "/">, ["a", "b", "c"]>>;
type _08b = Expect<Equal<SplitOneOf<"single", "/">, ["single"]>>;
type _08c = Expect<Equal<SplitOneOf<"", ",">, []>>;
type _08d = Expect<Equal<SplitOneOf<"a,", ",">, ["a", ""]>>;
type _08e = Expect<Equal<SplitOneOf<"a,,b", ",">, ["a", "", "b"]>>;

// 9. Build the guarded split, whose broad fallback is a tuple's element type
//    rather than a string.
export type SplitOf<Text extends string, Separator extends string> = TODO; // TODO(koan)

type _09a = Expect<Equal<SplitOf<"a/b/c", "/">, ["a", "b", "c"]>>;
type _09b = Expect<Equal<SplitOf<"abc", "">, ["a", "b", "c"]>>;
type _09c = Expect<Equal<SplitOf<string, ",">, string[]>>;
type _09d = Expect<Equal<SplitOf<never, ",">, never>>;
type _09e = Expect<Equal<SplitOf<"a,b" | "c,d", ",">, ["a", "b"] | ["c", "d"]>>;

// ─── Folding a tuple back into a string ───────────────────────────────

// 10. Build the single-tuple join, which needs a separate one-element case so no
//     trailing separator is emitted.
export type JoinOneOf<
  Parts extends readonly string[],
  Separator extends string,
> = TODO; // TODO(koan)

type _10a = Expect<Equal<JoinOneOf<[], ".">, "">>;
type _10b = Expect<Equal<JoinOneOf<["a"], ".">, "a">>;
type _10c = Expect<Equal<JoinOneOf<["a", "b", "c"], ".">, "a.b.c">>;
type _10d = Expect<Equal<JoinOneOf<["", ""], ",">, ",">>;
type _10e = Expect<Equal<JoinOneOf<[], "">, "">>;

// 11. Build the guarded join, which cannot fold a tuple whose length is unknown.
export type JoinOf<
  Parts extends readonly string[],
  Separator extends string,
> = TODO; // TODO(koan)

type _11a = Expect<Equal<JoinOf<["a", "b", "c"], ".">, "a.b.c">>;
type _11b = Expect<Equal<JoinOf<[], ".">, "">>;
type _11c = Expect<Equal<JoinOf<string[], ".">, string>>;
type _11d = Expect<Equal<JoinOf<["a", "b"], string>, string>>;
type _11e = Expect<
  Equal<JoinOf<["a" | "b", "c" | "d"], ".">, "a.c" | "a.d" | "b.c" | "b.d">
>;

// 12. Report split and join being inverses, including across the empty fields a
//     naive split would have dropped.
export type RoundTripProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<RoundTripProfile["simple"], "a/b/c">>;
type _12b = Expect<Equal<RoundTripProfile["changedSeparator"], "a.b.c">>;
type _12c = Expect<Equal<RoundTripProfile["emptyFields"], "a,,b">>;
type _12d = Expect<Equal<RoundTripProfile["trailingField"], ["a", ""]>>;
type _12e = Expect<Equal<RoundTripProfile["leadingField"], ["", "a"]>>;

// ─── Composition ──────────────────────────────────────────────────────

// 13. Build the length reader, which is the character explosion measured.
//     Note that it counts UTF-16 code units, so a surrogate pair counts twice.
export type StringLengthOf<Text extends string> = TODO; // TODO(koan)

type _13a = Expect<Equal<StringLengthOf<"koan">, 4>>;
type _13b = Expect<Equal<StringLengthOf<"">, 0>>;
type _13c = Expect<Equal<StringLengthOf<"A">, 1>>;
type _13d = Expect<Equal<StringLengthOf<"abcdefghij">, 10>>;
type _13e = Expect<Equal<StringLengthOf<string>, number>>;

// 14. Build the case converter, which recurses on the tail and capitalises what
//     comes back.
export type SnakeToCamelOf<Text extends string> = TODO; // TODO(koan)

type _14a = Expect<Equal<SnakeToCamelOf<"type_level_toolbelt">, "typeLevelToolbelt">>;
type _14b = Expect<Equal<SnakeToCamelOf<"single">, "single">>;
type _14c = Expect<Equal<SnakeToCamelOf<"one_two_three_four_five">, "oneTwoThreeFourFive">>;
type _14d = Expect<Equal<SnakeToCamelOf<"a_b" | "c_d">, "aB" | "cD">>;
type _14e = Expect<Equal<SnakeToCamelOf<string>, string>>;

// ─── Where the patterns stop working ──────────────────────────────────

// 15. Report the empty-pattern policies, each of which exists to keep a recursion
//     from matching forever.
export type EmptyPatternProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<EmptyPatternProfile["emptySearchReplace"], "abc">>;
type _15b = Expect<Equal<EmptyPatternProfile["emptySearchReplaceAll"], "abc">>;
type _15c = Expect<Equal<EmptyPatternProfile["emptySeparatorSplit"], ["a", "b", "c"]>>;
type _15d = Expect<Equal<EmptyPatternProfile["emptyInputSplit"], []>>;
type _15e = Expect<Equal<EmptyPatternProfile["emptyPartsJoin"], "">>;

// 16. Report the broad and empty inputs, where each operator falls back into its
//     own result domain rather than trying to pattern match.
export type BroadInputProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<BroadInputProfile["broadTrim"], string>>;
type _16b = Expect<Equal<BroadInputProfile["anyTrim"], string>>;
type _16c = Expect<Equal<BroadInputProfile["emptyTrim"], never>>;
type _16d = Expect<Equal<BroadInputProfile["broadReplace"], string>>;
type _16e = Expect<Equal<BroadInputProfile["broadSplit"], string[]>>;

// 17. Report every position distributing, so unions in the text, the search, or
//     the replacement all multiply the results.
export type DistributionProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<DistributionProfile["textUnion"], "a.b" | "c.d">>;
type _17b = Expect<Equal<DistributionProfile["searchUnion"], "axb" | "x-b">>;
type _17c = Expect<Equal<DistributionProfile["replacementUnion"], "axb" | "ayb">>;
type _17d = Expect<Equal<DistributionProfile["splitUnion"], ["a", "b"] | ["c", "d"]>>;
type _17e = Expect<
  Equal<DistributionProfile["joinUnion"], "a.c" | "a.d" | "b.c" | "b.d">
>;

// 18. Report first-match replacement differing from repeated replacement, and
//     repeated replacement consuming greedily enough that overlaps are not
//     revisited.
export type ReplacementReachProfile = TODO; // TODO(koan)

type _18a = Expect<Equal<ReplacementReachProfile["firstOnly"], "a/b-c">>;
type _18b = Expect<Equal<ReplacementReachProfile["everyMatch"], "a/b/c">>;
type _18c = Expect<Equal<ReplacementReachProfile["overlapping"], "aa">>;
type _18d = Expect<Equal<ReplacementReachProfile["multiCharacter"], "bukkeeper">>;
type _18e = Expect<Equal<ReplacementReachProfile["noMatch"], "abc">>;

// ─── The exported surface ─────────────────────────────────────────────

// 19. Build the four signatures the packet exports, whose `const` parameters keep
//     the literal text from widening before any of these transforms can run.
export type StringRuntimeApi = TODO; // TODO(koan)

type _19a = Expect<
  Equal<StringRuntimeApi["trimText"], <const Text extends string>(value: Text) => TrimOf<Text>>
>;
type _19b = Expect<
  Equal<
    StringRuntimeApi["splitText"],
    <const Text extends string, const Separator extends string>(
      value: Text,
      separator: Separator,
    ) => SplitOf<Text, Separator>
  >
>;
type _19c = Expect<Equal<ReturnType<typeof givenTrimText<" value ">>, "value">>;
type _19d = Expect<
  Equal<ReturnType<typeof givenSplitText<"a/b/c", "/">>, ["a", "b", "c"]>
>;
type _19e = Expect<
  Equal<
    {
      split: ReturnType<typeof givenSplitText<"a,,b", ",">>;
      rejoined: JoinOf<ReturnType<typeof givenSplitText<"a,,b", ",">>, ",">;
    },
    { split: ["a", "", "b"]; rejoined: "a,,b" }
  >
>;
