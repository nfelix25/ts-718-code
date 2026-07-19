import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-077 edge cases: template pattern inference
 * =============================================================================
 * Matching is structural and delimiter-driven. Empty captures, repeated
 * delimiters, broad strings, adjacent infer sites, distribution, and special
 * types reveal where parser intuition can diverge from the compiler's rules.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type ESplit<S, D extends string> = S extends `${infer A}${D}${infer B}` ? [A, B] : never;
type EThree<S, D extends string> = S extends `${infer A}${D}${infer B}${D}${infer C}` ? [A, B, C] : never;
type EAdjacent<S> = S extends `${infer A}${infer B}` ? [A, B] : never;
type ESurrounded<S> = S extends `[${infer M}]` ? M : never;

// Empty segments are legitimate captures when the fixed pattern still matches.
type _E01 = Expect<Equal<ESplit<":tail", ":">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ESplit<"head:", ":">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ESplit<":", ":">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EThree<"::", ":">, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EThree<":middle:", ":">, TODO>>; // TODO(koan) @koan-error

// Earlier infer sites use the earliest delimiter that permits the rest to match.
type _E06 = Expect<Equal<ESplit<"a:b:c", ":">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EThree<"a:b:c:d", ":">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ESplit<"a--b--c", "--">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EThree<"a--b--c--d", "--">, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ESurrounded<"[a][b]">, TODO>>; // TODO(koan) @koan-error

// Adjacent infer sites give the first site one leading segment and the second the rest.
type _E11 = Expect<Equal<EAdjacent<"abc">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EAdjacent<"a">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EAdjacent<"">, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EAdjacent<"🙂a">, TODO>>; // TODO(koan) @koan-error

// Naked input unions distribute, and nonmatching members contribute never.
type _E15 = Expect<Equal<ESplit<"a:1" | "b:2", ":">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<ESplit<"a:1" | "missing", ":">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EThree<"a:b:c" | "x:y", ":">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EAdjacent<"ab" | "xy">, TODO>>; // TODO(koan) @koan-error

// Broad string does not prove a delimiter exists; framed patterns can carry structure.
type _E19 = Expect<Equal<ESplit<string, ":">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ESplit<`${string}:${string}`, ":">, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<ESplit<`id:${string}`, ":">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EAdjacent<string>, TODO>>; // TODO(koan) @koan-error

// Never has zero members; any may produce broad inferred candidates.
type _E23 = Expect<Equal<ESplit<never, ":">, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EAdjacent<never>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EIsAny<ESplit<any, ":">>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EIsAny<EAdjacent<any>>, TODO>>; // TODO(koan) @koan-error

// Fixed casing and whitespace remain exact parts of the pattern.
type _E27 = Expect<Equal<ESplit<"A:B", ":">, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ESplit<" A : B ", ":">, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ESurrounded<"[ value ]">, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ESurrounded<"[value">, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a two-part pattern splits at the first usable delimiter.
type _DemoFirstDelimiter = Expect<Equal<ESplit<"a:b:c", ":">, ["a", "b:c"]>>;

// Pre-solved: empty captures are retained, not discarded.
type _DemoEmpty = Expect<Equal<EThree<":middle:", ":">, ["", "middle", ""]>>;

// Pre-solved: a nonmatching distributed member contributes never and disappears.
type _DemoFilteredUnion = Expect<Equal<ESplit<"a:1" | "missing", ":">, ["a", "1"]>>;

// Infer names from template patterns are scoped only to the matching true branch.
// @ts-expect-error `Captured` is unavailable outside its conditional branch.
type InvalidTemplateInferScope = Captured;
