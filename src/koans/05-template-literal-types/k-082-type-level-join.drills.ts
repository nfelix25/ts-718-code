import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-082 guided drills: type-level join
 * =============================================================================
 * Identify finite tuple cardinality first, stringify each member, and place one
 * separator only between a nonfinal head and the recursively joined tail.
 */

type DValue = string | number | bigint | boolean | null | undefined;
type DJoin<T extends readonly DValue[], S extends string> = number extends T["length"]
  ? string
  : T extends readonly []
    ? ""
    : T extends readonly [infer O extends DValue]
      ? `${O}`
      : T extends readonly [infer H extends DValue, ...infer R extends readonly DValue[]]
        ? `${H}${S}${DJoin<R, S>}`
        : string;

// Empty, singleton, and short string tuples establish separator placement.
type _D01 = Expect<Equal<DJoin<[], ",">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DJoin<["a"], ",">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DJoin<["a", "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DJoin<["a", "b", "c"], ",">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DJoin<readonly ["a", "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DJoin<["a", "b"], "/">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DJoin<["a", "b"], "::">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DJoin<["a", "b"], "">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DJoin<["", "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DJoin<["a", ""], ",">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DJoin<["", ""], ",">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DJoin<["a", "", "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DJoin<["users", "42", "posts"], "/">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DJoin<["a"], "long separator">, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DJoin<[], "long separator">, TODO>>; // TODO(koan) @koan-error

// Numeric, bigint, boolean, and nullish members interpolate literally.
type _D16 = Expect<Equal<DJoin<[1], ",">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DJoin<[1, 2, 3], ",">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DJoin<[-1, 2.5], "/">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DJoin<[1n, 2n], ":">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DJoin<[true, false], "|">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DJoin<[boolean], ",">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DJoin<[null], ",">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DJoin<[undefined], ",">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DJoin<[null, undefined], ",">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DJoin<["x", 1, true], "/">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DJoin<[1n, false, null], ":">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DJoin<[number, "px"], "">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DJoin<[bigint, "n"], "">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DJoin<["flag", boolean], ":">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DJoin<[null, "x", undefined], "-">, TODO>>; // TODO(koan) @koan-error

// Element and separator unions form template cross-products.
type _D31 = Expect<Equal<DJoin<["a" | "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DJoin<["a" | "b", "x"], ":">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DJoin<["a", "x" | "y"], ":">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DJoin<["a" | "b", "x" | "y"], ":">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DJoin<[1 | 2, 3 | 4], ",">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DJoin<[boolean, "x" | "y"], ":">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DJoin<["a", "b"], ":" | "/">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DJoin<["a" | "b", "x"], ":" | "/">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DJoin<["a", "b", "c"], ":" | "/">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DJoin<[never], ",">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DJoin<["a", never], ",">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DJoin<[never, "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DJoin<["a" | never, "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DJoin<["a", "b"], never>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DJoin<["a"], never>, TODO>>; // TODO(koan) @koan-error

// Broad arrays and nonfixed tuples cannot be enumerated exactly.
type _D46 = Expect<Equal<DJoin<string[], ",">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DJoin<readonly string[], ",">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DJoin<number[], ",">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DJoin<Array<string | number>, ",">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DJoin<[head: string, ...tail: string[]], ",">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DJoin<[only?: string], ",">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DJoin<readonly [], ",">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DJoin<never, ",">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DJoin<["a", "b", "c", "d", "e"], "-">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DJoin<["T", "y", "p", "e"], "">, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DJoin<["a", "b", "c"], ",">["length"], TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DJoin<["a", "b"], ","> extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DJoin<string[], ","> extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DJoin<["a", "b"], ","> | "a,b", TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DJoin<["a", "b"], `${number}`>, TODO>>; // TODO(koan) @koan-error
