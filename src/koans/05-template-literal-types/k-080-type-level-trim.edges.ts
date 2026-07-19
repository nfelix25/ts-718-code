import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-080 edge cases: type-level trim
 * =============================================================================
 * Whitespace is a domain decision, not a universal compiler set. These cases
 * stress excluded characters, union distribution, broad/any guards, never,
 * one-step versus recursive behavior, internal preservation, and long literals.
 */

type EWS = " " | "\t" | "\n" | "\r";
type ELeft<S extends string> = string extends S ? S : S extends `${EWS}${infer R}` ? ELeft<R> : S;
type ERight<S extends string> = string extends S ? S : S extends `${infer R}${EWS}` ? ERight<R> : S;
type ETrim<S extends string> = ELeft<ERight<S>>;
type ELeftOnce<S extends string> = S extends `${EWS}${infer R}` ? R : S;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// All recognized boundary whitespace can reduce to the empty base case.
type _E01 = Expect<Equal<ETrim<"">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ETrim<" ">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ETrim<"\t\n\r ">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ETrim<"  \t  ">, TODO>>; // TODO(koan) @koan-error

// Internal whitespace remains even when it belongs to the trim alphabet.
type _E05 = Expect<Equal<ETrim<" a b ">, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ETrim<"\ta\tb\t">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ETrim<"\na\nb\n">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ETrim<"  a  b  ">, TODO>>; // TODO(koan) @koan-error

// Excluded whitespace-like characters are ordinary data for this utility.
type _E09 = Expect<Equal<ETrim<"\u00a0value\u00a0">, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ETrim<"\vvalue\v">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<ETrim<"\fvalue\f">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ETrim<" \u00a0value\u00a0 ">, TODO>>; // TODO(koan) @koan-error

// Literal input unions distribute; broad strings return through the guard.
type _E13 = Expect<Equal<ETrim<" a " | " b ">, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ETrim<" a " | "plain">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ETrim<string>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<ETrim<` ${string} `>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ETrim<never>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EIsAny<ETrim<any>>, TODO>>; // TODO(koan) @koan-error

// One-step removal exposes progress without finishing the operation.
type _E19 = Expect<Equal<ELeftOnce<"   value">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ELeft<ELeftOnce<"   value">>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<ELeftOnce<"value">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<ELeftOnce<"\t value">, TODO>>; // TODO(koan) @koan-error

// Composition order agrees for ordinary finite literals.
type _E23 = Expect<Equal<ELeft<ERight<"  value  ">>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<ERight<ELeft<"  value  ">>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<ELeft<ERight<"  a b  ">>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<ERight<ELeft<"  a b  ">>, TODO>>; // TODO(koan) @koan-error

// Moderate repeated input demonstrates finite recursive termination.
type _E27 = Expect<Equal<ETrim<"          value          ">, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ETrim<"                    value                    ">, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ETrim<"\t\n\r                    value                    \r\n\t">, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ETrim<"                    ">, TODO>>; // TODO(koan) @koan-error

// Pre-solved: trimming removes boundaries but preserves internal runs.
type _DemoInternal = Expect<Equal<ETrim<"  hello  world  ">, "hello  world">>;

// Pre-solved: excluded no-break space is not silently treated as ASCII whitespace.
type _DemoExplicitAlphabet = Expect<Equal<ETrim<"\u00a0value\u00a0">, "\u00a0value\u00a0">>;

// Pre-solved: broad strings take the nonrecursive fallback.
type _DemoBroad = Expect<Equal<ETrim<string>, string>>;

// Trim is deliberately constrained to string inputs.
// @ts-expect-error Number cannot be trimmed by a template string utility.
type InvalidTrim = ETrim<42>;
