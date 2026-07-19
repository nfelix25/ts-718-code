import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-077 guided drills: template pattern inference
 * =============================================================================
 * Locate fixed text, verify the complete pattern, then assign each captured
 * substring according to delimiter and adjacency rules.
 */

type DAfter<S, P extends string> = S extends `${P}${infer R}` ? R : never;
type DBefore<S, P extends string> = S extends `${infer R}${P}` ? R : never;
type DSplit<S, D extends string> = S extends `${infer A}${D}${infer B}` ? [A, B] : never;
type DThree<S, D extends string> = S extends `${infer A}${D}${infer B}${D}${infer C}` ? [A, B, C] : never;
type DFirstRest<S> = S extends `${infer H}${infer R}` ? [H, R] : never;
type DWrapped<S, Open extends string, Close extends string> = S extends `${Open}${infer M}${Close}` ? M : never;

// Prefix capture succeeds only when the fixed leading text is present.
type _D01 = Expect<Equal<DAfter<"prevalue", "pre">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DAfter<"prefix", "pre">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DAfter<"pre", "pre">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DAfter<"value", "pre">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DAfter<"", "">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DAfter<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DAfter<"user:1", "user:">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DAfter<"team:2", "user:">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DAfter<"a1" | "a2", "a">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DAfter<"a1" | "b2", "a">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DAfter<string, "pre">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DAfter<`pre${string}`, "pre">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DAfter<never, "pre">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DAfter<"PREvalue", "pre">, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DAfter<"--x", "--">, TODO>>; // TODO(koan) @koan-error

// Suffix capture mirrors prefix capture from the other boundary.
type _D16 = Expect<Equal<DBefore<"index.ts", ".ts">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DBefore<"types.ts", ".ts">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DBefore<".ts", ".ts">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DBefore<"index.js", ".ts">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DBefore<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DBefore<"a!" | "b!", "!">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DBefore<"a!" | "b?", "!">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DBefore<string, ".ts">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DBefore<`${string}.ts`, ".ts">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DBefore<never, ".ts">, TODO>>; // TODO(koan) @koan-error

// Delimited capture partitions at the first usable delimiter.
type _D26 = Expect<Equal<DSplit<"a:b", ":">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DSplit<"a:b:c", ":">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DSplit<":b", ":">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DSplit<"a:", ":">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DSplit<":", ":">, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DSplit<"abc", ":">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DSplit<"a--b--c", "--">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DSplit<"a/b/c", "/">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DSplit<"a.1" | "b.2", ".">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DSplit<"a.1" | "missing", ".">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DSplit<string, ":">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DSplit<`${string}:${string}`, ":">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DSplit<never, ":">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DWrapped<"[value]", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DWrapped<"[]", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DWrapped<"[a][b]", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DWrapped<"value", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DWrapped<"<x>", "<", ">">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DWrapped<"(a:b)", "(", ")">, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DWrapped<"(a" | "(b)", "(", ")">, TODO>>; // TODO(koan) @koan-error

// Three-part and adjacent captures expose finer matching rules.
type _D46 = Expect<Equal<DThree<"a:b:c", ":">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DThree<"a:b:c:d", ":">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DThree<"a::c", ":">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DThree<":b:", ":">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DThree<"::", ":">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DThree<"a:b", ":">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DThree<"a/b/c/d", "/">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DThree<"a:b:c" | "x:y:z", ":">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DFirstRest<"Type">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DFirstRest<"T">, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DFirstRest<"">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DFirstRest<"ab" | "xy">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DFirstRest<string>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DFirstRest<never>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DFirstRest<"123">, TODO>>; // TODO(koan) @koan-error
