import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-092 edge cases: rest tuple elements
 * =============================================================================
 * Variable regions expose minimum length without encoding it in `length`, and
 * extreme rest element types reveal how the numeric index union is assembled.
 * Fixed suffixes also make direct numeric positions less precise than they look.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;

// `never[]` permits no present rest values but still gives an open rest shape.
type NeverTail = [head: "x", ...tail: never[]];
type _E01 = Expect<Equal<NeverTail[0], TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<NeverTail[1], TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<NeverTail[number], TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<NeverTail["length"], TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<["x"] extends NeverTail ? true : false, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<["x", never] extends NeverTail ? true : false, TODO>>; // TODO(koan) @koan-error

// Any and unknown have very different effects on the numeric element union.
type AnyTail = [head: "x", ...tail: any[]];
type UnknownTail = [head: "x", ...tail: unknown[]];
type _E07 = Expect<Equal<EIsAny<AnyTail[number]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EIsAny<UnknownTail[number]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<UnknownTail[number], TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<AnyTail["length"], TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<UnknownTail["length"], TODO>>; // TODO(koan) @koan-error

// A fixed suffix means a literal index may belong to the rest or the suffix.
type Suffix = [...names: string[], count: number];
type Middle = [start: boolean, ...names: string[], count: number];
type _E12 = Expect<Equal<Suffix[0], TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Suffix[1], TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<Suffix[number], TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<Middle[0], TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<Middle[1], TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<Middle[number], TODO>>; // TODO(koan) @koan-error

// Rest element unions and tuple unions normalize through numeric indexing.
type _E18 = Expect<Equal<[head: 0, ...tail: (1 | 2)[]][number], TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<([head: 0, ...tail: 1[]] | [head: "x", ...tail: 2[]])[number], TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<([head: 0, ...tail: 1[]] | [head: "x", ...tail: 2[]])["length"], TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<[...tail: (string | never)[]][number], TODO>>; // TODO(koan) @koan-error

// Readonly changes capability while leaving the rest region's value grammar.
type _E22 = Expect<Equal<readonly [head: string, ...tail: number[]] extends readonly unknown[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<[head: string, ...tail: number[]] extends readonly [string, ...number[]] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<readonly [head: string, ...tail: number[]] extends [string, ...number[]] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<(readonly [head: string, ...tail: number[]])[number], TODO>>; // TODO(koan) @koan-error

// Minimum length is visible through assignability, not through literal length.
type AtLeastTwo = [first: string, second: number, ...rest: boolean[]];
type _E26 = Expect<Equal<AtLeastTwo["length"], TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<[] extends AtLeastTwo ? true : false, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<["x"] extends AtLeastTwo ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<["x", 1] extends AtLeastTwo ? true : false, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<["x", 1, true, false] extends AtLeastTwo ? true : false, TODO>>; // TODO(koan) @koan-error

// Pre-solved: an open rest widens length even when no rest value is inhabited.
type _DemoNeverLength = Expect<Equal<[head: 1, ...tail: never[]]["length"], number>>;

// Pre-solved: a middle rest contributes to the numeric element union.
type _DemoMiddleUnion = Expect<Equal<[start: 0, ...middle: 1[], end: 2][number], 0 | 1 | 2>>;

// Pre-solved: the fixed prefix remains precise with an unknown tail.
type _DemoUnknownPrefix = Expect<Equal<[head: "x", ...tail: unknown[]][0], "x">>;

// @ts-expect-error A tuple type can contain only one rest element.
type TwoRests = [...strings: string[], ...numbers: number[]];
// @ts-expect-error A rest element type must be an array type.
type NonArrayRest = [...value: string];
