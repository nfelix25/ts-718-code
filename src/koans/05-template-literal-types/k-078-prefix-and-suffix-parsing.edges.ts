import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-078 edge cases: prefix and suffix parsing
 * =============================================================================
 * Affixes can be empty, overlap, repeat, widen, or appear in unions. These cases
 * separate testing from stripping and whole-union substitution from explicit
 * candidate-by-candidate classification.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EStarts<S extends string, P extends string> = S extends `${P}${string}` ? true : false;
type EStripStart<S extends string, P extends string> = S extends `${P}${infer R}` ? R : never;
type EStripEnd<S extends string, P extends string> = S extends `${infer R}${P}` ? R : never;
type EMatchesStart<S extends string, P extends string> = P extends unknown
  ? S extends `${P}${string}` ? P : never
  : never;
type EMatchesEnd<S extends string, P extends string> = P extends unknown
  ? S extends `${string}${P}` ? P : never
  : never;

// Empty affixes always match and stripping them preserves the original text.
type _E01 = Expect<Equal<EStarts<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EStripStart<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EStripEnd<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EStarts<"", "">, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EStripStart<"", "">, TODO>>; // TODO(koan) @koan-error

// One match removes one layer even when affixes repeat.
type _E06 = Expect<Equal<EStripStart<"preprevalue", "pre">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EStripEnd<"file.ts.ts", ".ts">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EStripStart<EStripStart<"preprevalue", "pre">, "pre">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EStripEnd<EStripEnd<"file.ts.ts", ".ts">, ".ts">, TODO>>; // TODO(koan) @koan-error

// Overlapping candidates can all match and remain a union of candidate names.
type _E10 = Expect<Equal<EMatchesStart<"admin:user:1", "admin:" | "admin:user:">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EMatchesStart<"abc", "a" | "ab" | "abc">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EMatchesEnd<"index.test.ts", ".ts" | ".test.ts">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EMatchesEnd<"abc", "c" | "bc" | "abc">, TODO>>; // TODO(koan) @koan-error

// Case, punctuation, and whitespace are exact.
type _E14 = Expect<Equal<EStarts<"User:1", "user:">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EStarts<" user:1", "user:">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EStripStart<"user::1", "user:">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EStripEnd<"file.ts ", ".ts">, TODO>>; // TODO(koan) @koan-error

// Broad strings do not prove a literal affix; framed broad strings do.
type _E18 = Expect<Equal<EStarts<string, "pre">, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EStarts<`pre${string}`, "pre">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EStripStart<`pre${string}`, "pre">, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EStripEnd<`${string}.ts`, ".ts">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EMatchesStart<`pre${string}`, "pre" | "x">, TODO>>; // TODO(koan) @koan-error

// Input unions distribute; affix unions classify only when made naked explicitly.
type _E23 = Expect<Equal<EStripStart<"a1" | "a2", "a">, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EStripStart<"a1" | "b2", "a">, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EMatchesStart<"abc", "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EMatchesStart<"abc", never>, TODO>>; // TODO(koan) @koan-error

// Special types retain conditional behavior and should be guarded before APIs.
type _E27 = Expect<Equal<EStripStart<never, "a">, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EIsAny<EStripStart<any, "a">>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EIsAny<EMatchesStart<"abc", any>>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EMatchesEnd<never, ".ts">, TODO>>; // TODO(koan) @koan-error

// Pre-solved: stripping removes exactly one repeated prefix.
type _DemoOneLayer = Expect<Equal<EStripStart<"preprevalue", "pre">, "prevalue">>;

// Pre-solved: every overlapping prefix candidate is retained.
type _DemoOverlaps = Expect<Equal<
  EMatchesStart<"abc", "a" | "ab" | "abc" | "z">,
  "a" | "ab" | "abc"
>>;

// Pre-solved: a framed broad string proves its fixed prefix.
type _DemoFramed = Expect<Equal<EStarts<`pre${string}`, "pre">, true>>;

// Runtime text cannot be asserted as stripped without checking the affix first.
declare const broadText: string;
// @ts-expect-error A broad string does not prove the `pre` prefix structurally.
const definitelyPrefixed: `pre${string}` = broadText;
