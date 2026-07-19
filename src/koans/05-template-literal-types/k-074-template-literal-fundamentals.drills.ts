import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-074 guided drills: template literal fundamentals
 * =============================================================================
 * Substitute each primitive type, preserve fixed text exactly, and distinguish
 * one literal representation from a broad family-of-strings pattern.
 */

type DValue = string | number | bigint | boolean | null | undefined;
type DText<T extends DValue> = `${T}`;
type DPrefix<T extends DValue> = `pre:${T}`;
type DSuffix<T extends DValue> = `${T}:post`;
type DWrap<T extends DValue> = `<${T}>`;
type DPair<A extends DValue, B extends DValue> = `${A}/${B}`;
type DMatches<Text extends string, Pattern extends string> = Text extends Pattern ? true : false;

// String substitutions preserve literals or widen to the broad string family.
type _D01 = Expect<Equal<DText<"">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DText<"a">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DText<"hello world">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DPrefix<"x">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DSuffix<"x">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DWrap<"x">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DText<string>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DPrefix<string>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DSuffix<string>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DWrap<string>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DPair<"a", "b">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DPair<string, "b">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DPair<"a", string>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DPair<string, string>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DText<never>, TODO>>; // TODO(koan) @koan-error

// Number substitutions include integers, signs, decimals, and broad numeric text.
type _D16 = Expect<Equal<DText<0>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DText<1>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DText<-1>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DText<3.14>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DText<-0.5>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DPrefix<42>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DSuffix<-7>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DWrap<2.5>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DText<number>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DPrefix<number>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DSuffix<number>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DPair<number, number>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DPair<"x", number>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DPair<number, "y">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DMatches<"42", `${number}`>, TODO>>; // TODO(koan) @koan-error

// Bigint and boolean substitutions have their own broad representations.
type _D31 = Expect<Equal<DText<0n>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DText<42n>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DText<-42n>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DPrefix<1n>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DText<bigint>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DSuffix<bigint>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DText<true>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DText<false>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DText<boolean>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DPrefix<boolean>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DWrap<true>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DPair<true, false>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DPair<"enabled", boolean>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DMatches<"true", `${boolean}`>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DMatches<"TRUE", `${boolean}`>, TODO>>; // TODO(koan) @koan-error

// Nullish substitutions and mixed structured strings complete the domain.
type _D46 = Expect<Equal<DText<null>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DText<undefined>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DPrefix<null>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DSuffix<undefined>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DPair<null, undefined>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DPair<"id", 42>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DPair<42, true>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DPair<1n, false>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DPair<undefined, "x">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DPair<string, number>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DPair<number, boolean>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DMatches<"pre:1", `pre:${number}`>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DMatches<"pre:x", `pre:${number}`>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DMatches<"undefined", `${undefined}`>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DMatches<"null", `${null}`>, TODO>>; // TODO(koan) @koan-error
