import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Join, Replace, ReplaceAll, SnakeToCamel, Split, StringLength, Trim } from "./k-135-type-level-string-toolbelt.js";

/** EDGE CASES: empty patterns, union products, broad strings, never, Unicode code units, and recursion. */

// Pre-solved demonstrations explain the conventions chosen by this toolbelt.
type _DemoEmptyInput = Expect<Equal<Split<"", ",">, []>>;
type _DemoEmptySeparator = Expect<Equal<Split<"abc", "">, ["a", "b", "c"]>>;
type _DemoEmptySearchNoOp = Expect<Equal<ReplaceAll<"abc", "", "x">, "abc">>;
type _DemoTrailingField = Expect<Equal<Split<"a,", ",">, ["a", ""]>>;
type _DemoBroadSplit = Expect<Equal<Split<string, ",">, string[]>>;
type _DemoRoundTrip = Expect<Equal<Join<Split<"a/b/c", "/">, "/">, "a/b/c">>;
// This character is one UTF-16 code unit; emoji can occupy two and surprise StringLength.
type _DemoCodeUnitLength = Expect<Equal<StringLength<"A">, 1>>;

// 1. Empty strings and empty patterns require explicit base cases (1-8)
type _01 = Expect<Equal<Trim<"">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Trim<" \n\t ">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Replace<"", "x", "y">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Replace<"abc", "", "x">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReplaceAll<"abc", "", "x">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Split<"", ",">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Split<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Join<[], "">, TODO>>; // TODO(koan) @koan-error

// 2. Delimiter placement preserves empty captured fields (9-15)
type _09 = Expect<Equal<Split<",", ",">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Split<",a", ",">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Split<"a,", ",">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Split<"a,,b", ",">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Join<["", ""], ",">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Join<Split<"a,,b", ",">, ",">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReplaceAll<"aaaa", "aa", "a">, TODO>>; // TODO(koan) @koan-error

// 3. Unions distribute and template interpolation forms cross-products (16-22)
type _16 = Expect<Equal<Trim<" a " | " b ">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ReplaceAll<"a-b" | "c-d", "-", ".">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReplaceAll<"a-b", "-" | "a", "x">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReplaceAll<"a-b", "-", "x" | "y">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Split<"a,b" | "c,d", ",">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Join<["a" | "b", "c" | "d"], ".">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<SnakeToCamel<"a_b" | "c_d">, TODO>>; // TODO(koan) @koan-error

// 4. Broad strings, any, never, and recursive size boundaries (23-30)
type _23 = Expect<Equal<Trim<string>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Trim<any>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Trim<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ReplaceAll<string, "-", ".">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Split<string, ",">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Split<never, ",">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<StringLength<"abcdefghij">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<SnakeToCamel<"one_two_three_four_five">, TODO>>; // TODO(koan) @koan-error
