import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-080 guided drills: type-level trim
 * =============================================================================
 * Consume one recognized boundary character per recursive step. Stop at the
 * first non-whitespace boundary and never inspect the string's interior.
 */

type DWS = " " | "\t" | "\n" | "\r";
type DLeft<S extends string> = string extends S ? S : S extends `${DWS}${infer R}` ? DLeft<R> : S;
type DRight<S extends string> = string extends S ? S : S extends `${infer R}${DWS}` ? DRight<R> : S;
type DTrim<S extends string> = DLeft<DRight<S>>;
type DLeftOne<S extends string> = S extends `${DWS}${infer R}` ? R : S;
type DRightOne<S extends string> = S extends `${infer R}${DWS}` ? R : S;

// Left trimming recognizes each alphabet member and repeated mixtures.
type _D01 = Expect<Equal<DLeft<" value">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DLeft<"  value">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DLeft<"\tvalue">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DLeft<"\nvalue">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DLeft<"\rvalue">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DLeft<" \t\n\rvalue">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DLeft<"value">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DLeft<"value ">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DLeft<"">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DLeft<"   ">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DLeft<"\t\n">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DLeft<" a b ">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DLeft<" a" | " b">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DLeft<string>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DLeft<never>, TODO>>; // TODO(koan) @koan-error

// Right trimming mirrors all boundary cases.
type _D16 = Expect<Equal<DRight<"value ">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DRight<"value  ">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DRight<"value\t">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DRight<"value\n">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DRight<"value\r">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DRight<"value \t\n\r">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DRight<"value">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DRight<" value">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DRight<"">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DRight<"   ">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DRight<"\t\n">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DRight<" a b ">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DRight<"a " | "b ">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DRight<string>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DRight<never>, TODO>>; // TODO(koan) @koan-error

// Two-sided trimming preserves internal whitespace and handles all-whitespace text.
type _D31 = Expect<Equal<DTrim<" value ">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DTrim<"  value  ">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DTrim<"\tvalue\n">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DTrim<" \t\nvalue\r ">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DTrim<"hello world">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DTrim<"  hello world  ">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DTrim<"a  b">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DTrim<"\ta\tb\t">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DTrim<"\nline one\nline two\n">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DTrim<"">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DTrim<" ">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DTrim<" \t\n\r ">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DTrim<" a " | " b ">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DTrim<string>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DTrim<never>, TODO>>; // TODO(koan) @koan-error

// One-step removal makes recursive progress visible.
type _D46 = Expect<Equal<DLeftOne<"  value">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DLeftOne<" value">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DLeftOne<"value">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DRightOne<"value  ">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DRightOne<"value ">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DRightOne<"value">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DLeft<DLeftOne<"  value">>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DRight<DRightOne<"value  ">>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DTrim<"\u00a0value\u00a0">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DTrim<"\vvalue\v">, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DTrim<"\fvalue\f">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DTrim<"\t value \t">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DTrim<"  a  b  ">, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DTrim<"0123456789">, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DTrim<"                    value                    ">, TODO>>; // TODO(koan) @koan-error
