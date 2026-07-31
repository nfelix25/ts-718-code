import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-078: prefix and suffix parsing — constructions
 * =============================================================================
 *
 * These constructions test, strip, add, and classify exact affixes. They cover
 * one-layer versus repeated removal, empty and overlapping affixes, input and
 * candidate-union distribution, broad and structurally framed strings,
 * ensuring one or both boundaries, and safe profiles for special inputs.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenStartsWith<
  Text,
  Prefix extends string,
> =
  Text extends `${Prefix}${string}` ? true : false;

type GivenEndsWith<
  Text,
  Suffix extends string,
> =
  Text extends `${string}${Suffix}` ? true : false;

type GivenStripPrefix<
  Text,
  Prefix extends string,
> =
  Text extends `${Prefix}${infer Rest}` ? Rest : never;

type GivenStripSuffix<
  Text,
  Suffix extends string,
> =
  Text extends `${infer Rest}${Suffix}` ? Rest : never;

type GivenMatchingPrefixes<
  Text,
  Prefix extends string,
> =
  Prefix extends unknown
    ? Text extends `${Prefix}${string}`
      ? Prefix
      : never
    : never;

type GivenMatchingSuffixes<
  Text,
  Suffix extends string,
> =
  Suffix extends unknown
    ? Text extends `${string}${Suffix}`
      ? Suffix
      : never
    : never;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

// ─── Testing and stripping one layer ────────────────────────────────────

// 1. Report whether each input member begins with any supplied prefix.
export type StartsWith<
  Text extends string,
  Prefix extends string,
> =
  TODO; // TODO(koan)

type _01a = Expect<Equal<StartsWith<"user:42", "user:">, true>>;
type _01b = Expect<Equal<StartsWith<"team:42", "user:">, false>>;
type _01c = Expect<Equal<StartsWith<"abc", "">, true>>;
type _01d = Expect<
  Equal<StartsWith<"abc" | "xyz", "a">, boolean>
>;
type _01e = Expect<
  Equal<StartsWith<"admin:user", "admin:" | "user:">, true>
>;

// 2. Report whether each input member ends with any supplied suffix.
export type EndsWith<
  Text extends string,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<EndsWith<"index.ts", ".ts">, true>>;
type _02b = Expect<Equal<EndsWith<"index.js", ".ts">, false>>;
type _02c = Expect<Equal<EndsWith<"abc", "">, true>>;
type _02d = Expect<
  Equal<EndsWith<"a.ts" | "b.js", ".ts">, boolean>
>;
type _02e = Expect<
  Equal<EndsWith<"index.test.ts", ".ts" | ".js">, true>
>;

// 3. Remove exactly one matching prefix and reject nonmatches.
export type StripPrefix<
  Text extends string,
  Prefix extends string,
> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<StripPrefix<"user:42", "user:">, "42">>;
type _03b = Expect<Equal<StripPrefix<"preprevalue", "pre">, "prevalue">>;
type _03c = Expect<Equal<StripPrefix<"abc", "">, "abc">>;
type _03d = Expect<
  Equal<StripPrefix<"a1" | "a2" | "b3", "a">, "1" | "2">
>;
type _03e = Expect<Equal<StripPrefix<"abc", "b">, never>>;

// 4. Remove exactly one matching suffix and reject nonmatches.
export type StripSuffix<
  Text extends string,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _04a = Expect<Equal<StripSuffix<"index.test.ts", ".ts">, "index.test">>;
type _04b = Expect<Equal<StripSuffix<"file.ts.ts", ".ts">, "file.ts">>;
type _04c = Expect<Equal<StripSuffix<"abc", "">, "abc">>;
type _04d = Expect<
  Equal<StripSuffix<"a!" | "b!" | "c?", "!">, "a" | "b">
>;
type _04e = Expect<Equal<StripSuffix<"index.js", ".ts">, never>>;

// 5. Remove one required prefix and suffix and return their middle.
export type StripAffixes<
  Text extends string,
  Prefix extends string,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _05a = Expect<Equal<StripAffixes<"[value]", "[", "]">, "value">>;
type _05b = Expect<Equal<StripAffixes<"[]", "[", "]">, "">>;
type _05c = Expect<Equal<StripAffixes<"[a][b]", "[", "]">, "a][b">>;
type _05d = Expect<
  Equal<StripAffixes<"<a:b>" | "<x>" | "missing", "<", ">">, "a:b" | "x">
>;
type _05e = Expect<Equal<StripAffixes<"abc", "", "">, "abc">>;

// ─── Ensuring boundaries ────────────────────────────────────────────────

// 6. Add a prefix only to input members that do not already begin with it.
export type EnsurePrefix<
  Text extends string,
  Prefix extends string,
> =
  TODO; // TODO(koan)

type _06a = Expect<Equal<EnsurePrefix<"user:42", "user:">, "user:42">>;
type _06b = Expect<Equal<EnsurePrefix<"42", "user:">, "user:42">>;
type _06c = Expect<Equal<EnsurePrefix<"", "id:">, "id:">>;
type _06d = Expect<
  Equal<EnsurePrefix<"x:a" | "b", "x:">, "x:a" | "x:b">
>;
type _06e = Expect<Equal<EnsurePrefix<"value", "">, "value">>;

// 7. Add a suffix only to input members that do not already end with it.
export type EnsureSuffix<
  Text extends string,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _07a = Expect<Equal<EnsureSuffix<"index.ts", ".ts">, "index.ts">>;
type _07b = Expect<Equal<EnsureSuffix<"index", ".ts">, "index.ts">>;
type _07c = Expect<Equal<EnsureSuffix<"", "!">, "!">>;
type _07d = Expect<
  Equal<EnsureSuffix<"a!" | "b", "!">, "a!" | "b!">
>;
type _07e = Expect<Equal<EnsureSuffix<"value", "">, "value">>;

// 8. Ensure both boundaries without duplicating either existing affix.
export type EnsureAffixes<
  Text extends string,
  Prefix extends string,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _08a = Expect<Equal<EnsureAffixes<"[x]", "[", "]">, "[x]">>;
type _08b = Expect<Equal<EnsureAffixes<"x]", "[", "]">, "[x]">>;
type _08c = Expect<Equal<EnsureAffixes<"[x", "[", "]">, "[x]">>;
type _08d = Expect<Equal<EnsureAffixes<"x", "[", "]">, "[x]">>;
type _08e = Expect<
  Equal<EnsureAffixes<"a" | "[b]", "[", "]">, "[a]" | "[b]">
>;

// ─── Candidate-by-candidate classification ──────────────────────────────

// 9. Return every prefix candidate that independently matches the text.
export type MatchingPrefixes<
  Text extends string,
  Prefix extends string,
> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<MatchingPrefixes<"user:42", "user:" | "team:">, "user:">
>;
type _09b = Expect<
  Equal<
    MatchingPrefixes<"admin:user:42", "admin:" | "admin:user:">,
    "admin:" | "admin:user:"
  >
>;
type _09c = Expect<
  Equal<MatchingPrefixes<"abc", "" | "a" | "ab" | "z">, "" | "a" | "ab">
>;
type _09d = Expect<
  Equal<MatchingPrefixes<"other", "user:" | "team:">, never>
>;
type _09e = Expect<Equal<MatchingPrefixes<"abc", never>, never>>;

// 10. Return every suffix candidate that independently matches the text.
export type MatchingSuffixes<
  Text extends string,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<MatchingSuffixes<"index.ts", ".ts" | ".js">, ".ts">
>;
type _10b = Expect<
  Equal<
    MatchingSuffixes<"index.test.ts", ".ts" | ".test.ts">,
    ".ts" | ".test.ts"
  >
>;
type _10c = Expect<
  Equal<MatchingSuffixes<"abc", "" | "c" | "bc" | "z">, "" | "c" | "bc">
>;
type _10d = Expect<
  Equal<MatchingSuffixes<"index", ".ts" | ".js">, never>
>;
type _10e = Expect<Equal<MatchingSuffixes<"abc", never>, never>>;

// ─── Repeated affixes ───────────────────────────────────────────────────

// 11. Apply one-layer prefix stripping twice.
export type StripPrefixTwice<
  Text extends string,
  Prefix extends string,
> =
  TODO; // TODO(koan)

type _11a = Expect<Equal<StripPrefixTwice<"preprevalue", "pre">, "value">>;
type _11b = Expect<Equal<StripPrefixTwice<"prepreprex", "pre">, "prex">>;
type _11c = Expect<Equal<StripPrefixTwice<"prex", "pre">, never>>;
type _11d = Expect<
  Equal<StripPrefixTwice<"preprea" | "prepreb", "pre">, "a" | "b">
>;
type _11e = Expect<Equal<StripPrefixTwice<"abc", "">, "abc">>;

// 12. Apply one-layer suffix stripping twice.
export type StripSuffixTwice<
  Text extends string,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _12a = Expect<Equal<StripSuffixTwice<"file.ts.ts", ".ts">, "file">>;
type _12b = Expect<Equal<StripSuffixTwice<"x.ts.ts.ts", ".ts">, "x.ts">>;
type _12c = Expect<Equal<StripSuffixTwice<"file.ts", ".ts">, never>>;
type _12d = Expect<
  Equal<StripSuffixTwice<"a!!" | "b!!", "!">, "a" | "b">
>;
type _12e = Expect<Equal<StripSuffixTwice<"abc", "">, "abc">>;

// 13. Recursively remove every repeated prefix, guarding the empty affix.
export type StripAllPrefixes<
  Text extends string,
  Prefix extends string,
> =
  TODO; // TODO(koan)

type _13a = Expect<Equal<StripAllPrefixes<"preprevalue", "pre">, "value">>;
type _13b = Expect<Equal<StripAllPrefixes<"prepreprex", "pre">, "x">>;
type _13c = Expect<Equal<StripAllPrefixes<"value", "pre">, "value">>;
type _13d = Expect<
  Equal<StripAllPrefixes<"prea" | "prepreb" | "c", "pre">, "a" | "b" | "c">
>;
type _13e = Expect<Equal<StripAllPrefixes<"abc", "">, "abc">>;

// 14. Recursively remove every repeated suffix, guarding the empty affix.
export type StripAllSuffixes<
  Text extends string,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _14a = Expect<Equal<StripAllSuffixes<"file.ts.ts", ".ts">, "file">>;
type _14b = Expect<Equal<StripAllSuffixes<"x.ts.ts.ts", ".ts">, "x">>;
type _14c = Expect<Equal<StripAllSuffixes<"file.js", ".ts">, "file.js">>;
type _14d = Expect<
  Equal<StripAllSuffixes<"a!" | "b!!" | "c", "!">, "a" | "b" | "c">
>;
type _14e = Expect<Equal<StripAllSuffixes<"abc", "">, "abc">>;

// ─── Combined and boundary profiles ─────────────────────────────────────

// 15. Classify each input as matching both, one, or neither affix.
export type AffixKind<
  Text extends string,
  Prefix extends string,
  Suffix extends string,
> =
  TODO; // TODO(koan)

type _15a = Expect<Equal<AffixKind<"[x]", "[", "]">, "both">>;
type _15b = Expect<Equal<AffixKind<"[x", "[", "]">, "prefix">>;
type _15c = Expect<Equal<AffixKind<"x]", "[", "]">, "suffix">>;
type _15d = Expect<Equal<AffixKind<"x", "[", "]">, "neither">>;
type _15e = Expect<
  Equal<AffixKind<"[a]" | "[b" | "c]" | "d", "[", "]">, "both" | "prefix" | "suffix" | "neither">
>;

// 16. Describe what broad and structurally framed string inputs prove.
export type BroadAffixProfile =
  TODO; // TODO(koan)

type _16a = Expect<Equal<BroadAffixProfile["startsBroad"], false>>;
type _16b = Expect<Equal<BroadAffixProfile["startsFramed"], true>>;
type _16c = Expect<Equal<BroadAffixProfile["endsFramed"], true>>;
type _16d = Expect<Equal<BroadAffixProfile["stripBroad"], never>>;
type _16e = Expect<
  Equal<
    Pick<BroadAffixProfile, "stripPrefixed" | "stripSuffixed">,
    { stripPrefixed: string; stripSuffixed: string }
  >
>;

// 17. Classify stripping and candidate matching over special inputs safely.
export type AffixSpecialProfile<
  Text,
  Affix extends string,
> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<AffixSpecialProfile<any, "a">, [false, false, false, false]>
>;
type _17b = Expect<
  Equal<AffixSpecialProfile<never, "a">, [false, true, false, true]>
>;
type _17c = Expect<
  Equal<AffixSpecialProfile<unknown, "a">, [false, true, false, true]>
>;
type _17d = Expect<
  Equal<AffixSpecialProfile<string, "a">, [false, true, false, true]>
>;
type _17e = Expect<
  Equal<AffixSpecialProfile<"abc", any>, [false, false, true, false]>
>;
