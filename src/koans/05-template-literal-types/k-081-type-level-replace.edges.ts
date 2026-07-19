import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-081 edge cases: type-level replace
 * =============================================================================
 * Progress requires a nonempty search token. These cases stress empty search,
 * inserted matches, nonoverlapping behavior, search/replacement unions, broad
 * and framed inputs, any/never, deletion, and finite recursive workloads.
 */

type EReplace<S extends string, F extends string, T extends string> = string extends S
  ? S
  : F extends ""
    ? S
    : S extends `${infer H}${F}${infer R}` ? `${H}${T}${R}` : S;
type EReplaceAll<S extends string, F extends string, T extends string> = string extends S
  ? S
  : F extends ""
    ? S
    : S extends `${infer H}${F}${infer R}` ? `${H}${T}${EReplaceAll<R, F, T>}` : S;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty search is explicitly identity for both algorithms.
type _E01 = Expect<Equal<EReplace<"abc", "", "x">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EReplaceAll<"abc", "", "x">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EReplaceAll<"", "", "x">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EReplaceAll<"abc", "", "">, TODO>>; // TODO(koan) @koan-error

// Inserted text is not recursively rescanned.
type _E05 = Expect<Equal<EReplaceAll<"a", "a", "aa">, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EReplaceAll<"aa", "a", "aa">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EReplaceAll<"x", "x", "x">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EReplaceAll<"xx", "x", "xx">, TODO>>; // TODO(koan) @koan-error

// Matches are left-to-right and nonoverlapping.
type _E09 = Expect<Equal<EReplaceAll<"aaa", "aa", "x">, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EReplaceAll<"aaaa", "aa", "x">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EReplaceAll<"aaaaa", "aa", "x">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EReplaceAll<"ababa", "aba", "x">, TODO>>; // TODO(koan) @koan-error

// Empty replacement deletes matches under the same nonoverlap rule.
type _E13 = Expect<Equal<EReplace<"banana", "a", "">, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EReplaceAll<"banana", "a", "">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EReplaceAll<"aaa", "aa", "">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EReplaceAll<"aaaa", "aa", "">, TODO>>; // TODO(koan) @koan-error

// Literal input unions distribute; broad inputs return through the guard.
type _E17 = Expect<Equal<EReplaceAll<"a-b" | "c-d", "-", ":">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EReplaceAll<"a-b" | "plain", "-", ":">, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EReplaceAll<string, "-", ":">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EReplaceAll<`${string}-${string}`, "-", ":">, TODO>>; // TODO(koan) @koan-error

// Search and replacement unions interact with template expansion and distribution.
type _E21 = Expect<Equal<EReplace<"a-b", "a" | "b", "x">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EReplaceAll<"a-b", "a" | "b", "x">, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EReplace<"a", "a", "x" | "y">, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EReplaceAll<"aa", "a", "x" | "y">, TODO>>; // TODO(koan) @koan-error

// Never and any retain their ordinary boundary behavior.
type _E25 = Expect<Equal<EReplaceAll<never, "a", "x">, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EIsAny<EReplaceAll<any, "a", "x">>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EReplaceAll<"abc", never, "x">, TODO>>; // TODO(koan) @koan-error

// Moderate recursive input remains exact and interactive.
type _E28 = Expect<Equal<EReplaceAll<"aaaaaaaaaa", "a", "b">, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EReplaceAll<"a-a-a-a-a-a-a-a-a-a", "-", "">, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EReplaceAll<"one two three four five", " ", "-">, TODO>>; // TODO(koan) @koan-error

// Pre-solved: first replacement stops after the first match.
type _DemoFirst = Expect<Equal<EReplace<"a-b-c", "-", ":">, "a:b-c">>;

// Pre-solved: inserted matches are preserved rather than recursively consumed.
type _DemoNoRescan = Expect<Equal<EReplaceAll<"aa", "a", "aa">, "aaaa">>;

// Pre-solved: overlapping searches use nonoverlapping left-to-right matches.
type _DemoOverlap = Expect<Equal<EReplaceAll<"aaa", "aa", "x">, "xa">>;

// Replace arguments are constrained to strings.
// @ts-expect-error A numeric replacement token is outside the string domain.
type InvalidReplacement = EReplaceAll<"a", "a", 1>;
