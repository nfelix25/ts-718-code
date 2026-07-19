import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Join, Replace, ReplaceAll, SnakeToCamel, Split, StringLength, Trim, TrimLeft, TrimRight } from "./k-135-type-level-string-toolbelt.js";

/** GUIDED DRILLS: peel boundaries, capture substitutions, recurse over delimiters, and compose transforms. */

// Boundary trimming (1-12)
type _01 = Expect<Equal<TrimLeft<" value">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<TrimLeft<"   value">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<TrimLeft<"\n\tvalue">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<TrimLeft<"value ">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<TrimRight<"value ">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<TrimRight<"value\n\t">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<TrimRight<" value">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Trim<"  value  ">, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Trim<"\n value\t">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Trim<"">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Trim<" ">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Trim<" a " | " b ">, TODO>>; // TODO(koan) @koan-error

// First and repeated replacement (13-24)
type _13 = Expect<Equal<Replace<"a-b-c", "-", "/">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReplaceAll<"a-b-c", "-", "/">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Replace<"aaaa", "aa", "b">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReplaceAll<"aaaa", "aa", "b">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Replace<"hello", "x", "!">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReplaceAll<"hello", "l", "">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReplaceAll<"one one", "one", "two">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Replace<"abc", "", "x">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReplaceAll<"abc", "", "x">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReplaceAll<"a-b" | "c-d", "-", ".">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReplaceAll<"a-b", "-" | "a", "x">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReplaceAll<"a-b", "-", "x" | "y">, TODO>>; // TODO(koan) @koan-error

// Splitting strings into finite tuples (25-40)
type _25 = Expect<Equal<Split<"a,b,c", ",">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Split<"a", ",">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Split<"", ",">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Split<"a,", ",">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Split<",a", ",">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Split<"a,,b", ",">, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Split<"a--b--c", "--">, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Split<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Split<"a", "">, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Split<"", "">, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Split<"a,b" | "c,d", ",">, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Split<"a,b", "," | ";">, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Split<string, ",">, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Split<"a,b", string>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Split<any, ",">, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Split<never, ",">, TODO>>; // TODO(koan) @koan-error

// Joining finite tuples (41-52)
type _41 = Expect<Equal<Join<[], ",">, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Join<["a"], ",">, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Join<["a", "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Join<["a", "b", "c"], "">, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Join<["", "a", ""], "-">, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Join<readonly ["a", "b"], ".">, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Join<["a" | "b", "c"], ".">, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Join<["a", "b"], "." | "/">, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Join<string[], ",">, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Join<readonly string[], ",">, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Join<any, ",">, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Join<["a", "b"], string>, TODO>>; // TODO(koan) @koan-error

// Composition and derived transforms (53-60)
type _53 = Expect<Equal<Join<Split<"a/b/c", "/">, ".">, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Split<Join<["a", "b"], ",">, ",">, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<StringLength<"">, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<StringLength<"abc">, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<StringLength<"a" | "ab">, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<SnakeToCamel<"hello_world">, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<SnakeToCamel<"alreadyCamel">, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<SnakeToCamel<"one_two_three">, TODO>>; // TODO(koan) @koan-error
