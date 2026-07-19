import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-081 guided drills: type-level replace
 * =============================================================================
 * Find the leftmost match, distinguish one rewrite from recursive tail rewrites,
 * and remember that replacement text is inserted literally and never rescanned.
 */

type DReplace<S extends string, F extends string, T extends string> = string extends S
  ? S
  : F extends ""
    ? S
    : S extends `${infer H}${F}${infer R}`
      ? `${H}${T}${R}`
      : S;
type DReplaceAll<S extends string, F extends string, T extends string> = string extends S
  ? S
  : F extends ""
    ? S
    : S extends `${infer H}${F}${infer R}`
      ? `${H}${T}${DReplaceAll<R, F, T>}`
      : S;

// First replacement changes at most one leftmost match.
type _D01 = Expect<Equal<DReplace<"abc", "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DReplace<"abc", "b", "x">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DReplace<"abc", "c", "x">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DReplace<"abc", "x", "y">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DReplace<"aaa", "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DReplace<"abab", "ab", "x">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DReplace<"a-b-c", "-", ":">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DReplace<"foo foo", "foo", "bar">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DReplace<"index.test.ts", ".", "/">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DReplace<"abc", "abc", "x">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DReplace<"", "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DReplace<"abc", "", "x">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DReplace<"abc", "a", "">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DReplace<"a" | "b", "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DReplace<string, "a", "x">, TODO>>; // TODO(koan) @koan-error

// Replace-all recursively rewrites nonoverlapping matches in the original tail.
type _D16 = Expect<Equal<DReplaceAll<"abc", "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DReplaceAll<"aaa", "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DReplaceAll<"abab", "ab", "x">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DReplaceAll<"a-b-c", "-", ":">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DReplaceAll<"foo foo foo", "foo", "bar">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DReplaceAll<"index.test.ts", ".", "/">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DReplaceAll<"abc", "x", "y">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DReplaceAll<"", "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DReplaceAll<"abc", "", "x">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DReplaceAll<"a" | "b", "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DReplaceAll<"a-a" | "b-b", "-", ":">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DReplaceAll<string, "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DReplaceAll<never, "a", "x">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DReplaceAll<"a.b.c", ".", "::">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DReplaceAll<"one two three", " ", "-">, TODO>>; // TODO(koan) @koan-error

// Empty replacement removes first or all matches.
type _D31 = Expect<Equal<DReplace<"banana", "a", "">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DReplaceAll<"banana", "a", "">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DReplace<"a-b-c", "-", "">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DReplaceAll<"a-b-c", "-", "">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DReplaceAll<"aaaa", "aa", "">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DReplaceAll<"aaa", "aa", "">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DReplaceAll<"abc", "abc", "">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DReplaceAll<"abc", "x", "">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DReplaceAll<"  a  b  ", " ", "">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DReplaceAll<"a\nb\n", "\n", "">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DReplaceAll<"mississippi", "ss", "">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DReplaceAll<"111", "1", "">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DReplaceAll<"abc", "", "">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DReplaceAll<"x" | "yx", "x", "">, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DReplaceAll<"unchanged", "z", "">, TODO>>; // TODO(koan) @koan-error

// Inserted matches, overlaps, and structured conversions expose algorithm choices.
type _D46 = Expect<Equal<DReplaceAll<"a", "a", "aa">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DReplaceAll<"aa", "a", "aa">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DReplaceAll<"aaa", "aa", "x">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DReplaceAll<"aaaa", "aa", "x">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DReplaceAll<"aaaaa", "aa", "x">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DReplaceAll<"ababa", "aba", "x">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DReplaceAll<"x", "x", "x">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DReplaceAll<"xx", "x", "xx">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DReplaceAll<"a.b.c", ".", "/">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DReplaceAll<"a/b/c", "/", ".">, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DReplaceAll<"kebab-case-name", "-", "_">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DReplaceAll<"snake_case_name", "_", "-">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DReplaceAll<"a::b::c", "::", ":">, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DReplaceAll<"<x><x>", "<x>", "y">, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DReplaceAll<"aaaaaaaaaa", "a", "b">, TODO>>; // TODO(koan) @koan-error
