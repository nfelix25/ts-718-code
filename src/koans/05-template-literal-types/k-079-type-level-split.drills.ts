import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-079 guided drills: type-level split
 * =============================================================================
 * Consume one delimiter per recursive call, preserve every captured head, and
 * apply the explicit empty-delimiter and broad-input branches first.
 */

type DChars<S extends string> = S extends `${infer H}${infer R}` ? [H, ...DChars<R>] : [];
type DSplit<S extends string, D extends string> = string extends S
  ? string[]
  : D extends ""
    ? DChars<S>
    : S extends `${infer H}${D}${infer R}`
      ? [H, ...DSplit<R, D>]
      : [S];
type DFirst<S extends string, D extends string> = DSplit<S, D> extends [infer H, ...unknown[]] ? H : never;
type DLast<S extends string, D extends string> = DSplit<S, D> extends [...unknown[], infer L] ? L : never;

// Commas cover absent, single, repeated, and empty segments.
type _D01 = Expect<Equal<DSplit<"a", ",">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DSplit<"a,b", ",">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DSplit<"a,b,c", ",">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DSplit<"", ",">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DSplit<",", ",">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DSplit<",a", ",">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DSplit<"a,", ",">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DSplit<",a,", ",">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DSplit<"a,,b", ",">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DSplit<",,", ",">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DSplit<"a,b,c,d", ",">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DSplit<"a,b" | "c,d", ",">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DSplit<"a,b" | "single", ",">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DSplit<string, ",">, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DSplit<never, ",">, TODO>>; // TODO(koan) @koan-error

// Other one-character delimiters reuse the same recursion.
type _D16 = Expect<Equal<DSplit<"a/b/c", "/">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DSplit<"/a/b", "/">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DSplit<"a/b/", "/">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DSplit<"a.b.c", ".">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DSplit<"index.test.ts", ".">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DSplit<"a:b:c", ":">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DSplit<"a::c", ":">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DSplit<"a b c", " ">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DSplit<" a  b ", " ">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DSplit<"a-b-c", "-">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DSplit<"-a-", "-">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DSplit<"a|b|c", "|">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DSplit<"a\tb\t", "\t">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DSplit<"a\nb", "\n">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DSplit<"abc", "/">, TODO>>; // TODO(koan) @koan-error

// Multi-character delimiters are consumed as one fixed segment.
type _D31 = Expect<Equal<DSplit<"a--b--c", "--">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DSplit<"--a--", "--">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DSplit<"a::::b", "::">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DSplit<"a<>b<>c", "<>">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DSplit<"a -> b -> c", " -> ">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DSplit<"a...b", "...">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DSplit<"abc", "--">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DSplit<"aaaa", "aa">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DSplit<"xENDyEND", "END">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DSplit<"END", "END">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DSplit<"ENDEND", "END">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DSplit<"a--b" | "c--d", "--">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DSplit<`${string}--${string}`, "--">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DSplit<"a--b", string>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DSplit<"a--b", never>, TODO>>; // TODO(koan) @koan-error

// Empty delimiter and tuple queries turn strings into inspectable sequences.
type _D46 = Expect<Equal<DSplit<"", "">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DSplit<"a", "">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DSplit<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DSplit<"a-b", "">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DSplit<"aa", "">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DSplit<"ab" | "xy", "">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DFirst<"a/b/c", "/">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DLast<"a/b/c", "/">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DFirst<"/a", "/">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DLast<"a/", "/">, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DSplit<"a/b/c", "/">[number], TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DSplit<"a/b/c", "/">["length"], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DSplit<string, "/">[number], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DFirst<string, "/">, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DLast<string, "/">, TODO>>; // TODO(koan) @koan-error
