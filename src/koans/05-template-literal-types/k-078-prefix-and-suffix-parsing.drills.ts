import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-078 guided drills: prefix and suffix parsing
 * =============================================================================
 * Test exact affixes, remove one layer, preserve empty middles, and distribute
 * explicitly when classifying a union of candidate affixes.
 */

type DStarts<S extends string, P extends string> = S extends `${P}${string}` ? true : false;
type DEnds<S extends string, P extends string> = S extends `${string}${P}` ? true : false;
type DStripStart<S extends string, P extends string> = S extends `${P}${infer R}` ? R : never;
type DStripEnd<S extends string, P extends string> = S extends `${infer R}${P}` ? R : never;
type DMiddle<S extends string, P extends string, Q extends string> = S extends `${P}${infer M}${Q}` ? M : never;
type DEnsureStart<S extends string, P extends string> = DStarts<S, P> extends true ? S : `${P}${S}`;
type DMatchingStarts<S extends string, P extends string> = P extends unknown
  ? S extends `${P}${string}` ? P : never
  : never;
type DMatchingEnds<S extends string, P extends string> = P extends unknown
  ? S extends `${string}${P}` ? P : never
  : never;

// Prefix and suffix predicates are exact and case-sensitive.
type _D01 = Expect<Equal<DStarts<"abc", "a">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DStarts<"abc", "ab">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DStarts<"abc", "abc">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DStarts<"abc", "abcd">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DStarts<"abc", "b">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DStarts<"abc", "A">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DStarts<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DEnds<"abc", "c">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DEnds<"abc", "bc">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DEnds<"abc", "abc">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DEnds<"abc", "zabc">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DEnds<"abc", "b">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DEnds<"abc", "C">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DEnds<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DStarts<"" , "">, TODO>>; // TODO(koan) @koan-error

// Strip operations remove one exact layer and reject nonmatches.
type _D16 = Expect<Equal<DStripStart<"abc", "a">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DStripStart<"abc", "ab">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DStripStart<"abc", "abc">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DStripStart<"abc", "b">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DStripStart<"preprex", "pre">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DStripStart<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DStripStart<"a1" | "a2", "a">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DStripStart<"a1" | "b2", "a">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DStripEnd<"abc", "c">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DStripEnd<"abc", "bc">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DStripEnd<"abc", "abc">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DStripEnd<"abc", "b">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DStripEnd<"x.ts.ts", ".ts">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DStripEnd<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DStripEnd<"a!" | "b?", "!">, TODO>>; // TODO(koan) @koan-error

// Two affixes capture a middle and ensure can add a missing prefix.
type _D31 = Expect<Equal<DMiddle<"[x]", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DMiddle<"[]", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DMiddle<"[a][b]", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DMiddle<"<x>", "<", ">">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DMiddle<"(a:b)", "(", ")">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DMiddle<"[x", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DMiddle<"x]", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DMiddle<"abc", "", "">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DEnsureStart<"x", "pre:">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DEnsureStart<"pre:x", "pre:">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DEnsureStart<"prepre:x", "pre:">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DEnsureStart<"", "pre:">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DEnsureStart<"x", "">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DEnsureStart<"a" | "b", "x:">, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DEnsureStart<"x:a" | "b", "x:">, TODO>>; // TODO(koan) @koan-error

// Candidate classification distributes over the affix union explicitly.
type _D46 = Expect<Equal<DMatchingStarts<"abc", "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DMatchingStarts<"abc", "a" | "ab">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DMatchingStarts<"abc", "" | "a" | "z">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DMatchingStarts<"user:1", "user:" | "team:">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DMatchingStarts<"other", "user:" | "team:">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DMatchingEnds<"index.test.ts", ".ts" | ".test.ts">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DMatchingEnds<"index.ts", ".ts" | ".js">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DMatchingEnds<"index", "" | ".ts">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DMatchingEnds<"index", ".ts" | ".js">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DMatchingStarts<"abc", never>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DMatchingEnds<"abc", never>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DMatchingStarts<never, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DStripStart<`${string}.ts`, string>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DStripEnd<`${string}.ts`, ".ts">, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DStarts<string, "pre">, TODO>>; // TODO(koan) @koan-error
