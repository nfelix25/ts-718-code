import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-079 edge cases: type-level split
 * =============================================================================
 * Split semantics depend on explicit base cases. These cases stress empty text,
 * empty and broad delimiters, union distribution, framed broad inputs, repeated
 * separators, any/never, character segmentation, and moderate recursion depth.
 */

type EChars<S extends string> = S extends `${infer H}${infer R}` ? [H, ...EChars<R>] : [];
type ESplit<S extends string, D extends string> = string extends S
  ? string[]
  : D extends ""
    ? EChars<S>
    : S extends `${infer H}${D}${infer R}`
      ? [H, ...ESplit<R, D>]
      : [S];
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty input differs according to whether the delimiter is empty.
type _E01 = Expect<Equal<ESplit<"", ",">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ESplit<"", "">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ESplit<",", ",">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ESplit<",,", ",">, TODO>>; // TODO(koan) @koan-error

// Leading, trailing, and consecutive separators preserve empty fields.
type _E05 = Expect<Equal<ESplit<",a", ",">, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ESplit<"a,", ",">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ESplit<",a,", ",">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ESplit<"a,,b", ",">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ESplit<"a,,,,b", ",">, TODO>>; // TODO(koan) @koan-error

// Input unions distribute through the recursive conditional.
type _E10 = Expect<Equal<ESplit<"a,b" | "c,d", ",">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<ESplit<"a,b" | "single", ",">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ESplit<"" | "a,b", ",">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ESplit<"ab" | "xy", "">, TODO>>; // TODO(koan) @koan-error

// Broad inputs and framed patterns expose different amounts of structure.
type _E14 = Expect<Equal<ESplit<string, ",">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ESplit<`${string},${string}`, ",">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<ESplit<`head,${string}`, ",">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ESplit<`${string},tail`, ",">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ESplit<string, "">, TODO>>; // TODO(koan) @koan-error

// Broad or union delimiters do not behave like one known literal separator.
type _E19 = Expect<Equal<ESplit<"a,b", string>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ESplit<"a,b", "," | ";">, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<ESplit<"a,b;c", "," | ";">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<ESplit<"a,b", never>, TODO>>; // TODO(koan) @koan-error

// Special inputs are handled by the broad guard and ordinary distribution.
type _E23 = Expect<Equal<ESplit<never, ",">, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EIsAny<ESplit<any, ",">>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<ESplit<any, ",">, TODO>>; // TODO(koan) @koan-error

// Character splitting follows template segmentation and supports moderate literals.
type _E26 = Expect<Equal<ESplit<"TypeScript", "">["length"], TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ESplit<"abcdefghij", "">[number], TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ESplit<"a,b,c,d,e,f,g,h,i,j", ",">["length"], TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ESplit<"aaaaaaaaaa", "">, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ESplit<"🙂a", "">, TODO>>; // TODO(koan) @koan-error

// Pre-solved: trailing separators preserve the empty final segment.
type _DemoTrailing = Expect<Equal<ESplit<"a,b,", ",">, ["a", "b", ""]>>;

// Pre-solved: an empty delimiter uses the character-specific branch.
type _DemoCharacters = Expect<Equal<ESplit<"abc", "">, ["a", "b", "c"]>>;

// Pre-solved: broad input returns an honest broad array fallback.
type _DemoBroad = Expect<Equal<ESplit<string, ",">, string[]>>;

// Split requires a string delimiter at the type boundary.
// @ts-expect-error Number is not a valid string delimiter.
type InvalidDelimiter = ESplit<"a1b", 1>;
