import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-080: type-level trim — constructions
 * =============================================================================
 *
 * These constructions define an explicit four-character whitespace alphabet,
 * remove one or every recognized boundary character, and compose the two
 * recursive directions. They preserve internal text, distinguish excluded
 * whitespace-like characters, distribute over unions, guard broad and any
 * inputs, expose order and idempotence, and apply trimming to tuples. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenWhitespace = " " | "\t" | "\n" | "\r";

type GivenTrimLeft<Text extends string> =
  string extends Text
    ? Text
    : Text extends `${GivenWhitespace}${infer Rest}`
      ? GivenTrimLeft<Rest>
      : Text;

type GivenTrimRight<Text extends string> =
  string extends Text
    ? Text
    : Text extends `${infer Rest}${GivenWhitespace}`
      ? GivenTrimRight<Rest>
      : Text;

type GivenTrim<Text extends string> =
  GivenTrimLeft<GivenTrimRight<Text>>;

type GivenTrimLeftOnce<Text extends string> =
  Text extends `${GivenWhitespace}${infer Rest}` ? Rest : Text;

type GivenTrimRightOnce<Text extends string> =
  Text extends `${infer Rest}${GivenWhitespace}` ? Rest : Text;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

// ─── Alphabet and one-step operations ───────────────────────────────────

// 1. Construct the packet's exact recognized whitespace alphabet.
export type Whitespace =
  TODO; // TODO(koan)

type _01a = Expect<Equal<Whitespace, " " | "\t" | "\n" | "\r">>;
type _01b = Expect<
  Equal<Extract<Whitespace, " " | "\t">, " " | "\t">
>;
type _01c = Expect<Equal<Extract<Whitespace, "\u00a0">, never>>;
type _01d = Expect<Equal<Extract<Whitespace, "\v" | "\f">, never>>;
type _01e = Expect<Equal<Exclude<Whitespace, string>, never>>;

// 2. Report whether each candidate is one recognized whitespace character.
export type IsWhitespace<Character extends string> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<IsWhitespace<" " | "\t" | "\n" | "\r">, true>>;
type _02b = Expect<Equal<IsWhitespace<"\u00a0" | "\v" | "\f">, false>>;
type _02c = Expect<Equal<IsWhitespace<" " | "x">, boolean>>;
type _02d = Expect<Equal<IsWhitespace<"">, false>>;
type _02e = Expect<Equal<IsWhitespace<never>, never>>;

// 3. Remove at most one recognized leading whitespace character.
export type TrimLeftOnce<Text extends string> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<TrimLeftOnce<"  value">, " value">>;
type _03b = Expect<Equal<TrimLeftOnce<"\t value">, " value">>;
type _03c = Expect<Equal<TrimLeftOnce<"value">, "value">>;
type _03d = Expect<
  Equal<TrimLeftOnce<" a" | "\tb" | "c">, "a" | "b" | "c">
>;
type _03e = Expect<Equal<TrimLeftOnce<"">, "">>;

// 4. Remove at most one recognized trailing whitespace character.
export type TrimRightOnce<Text extends string> =
  TODO; // TODO(koan)

type _04a = Expect<Equal<TrimRightOnce<"value  ">, "value ">>;
type _04b = Expect<Equal<TrimRightOnce<"value\t">, "value">>;
type _04c = Expect<Equal<TrimRightOnce<"value">, "value">>;
type _04d = Expect<
  Equal<TrimRightOnce<"a " | "b\n" | "c">, "a" | "b" | "c">
>;
type _04e = Expect<Equal<TrimRightOnce<"">, "">>;

// ─── Recursive one-sided and two-sided trim ─────────────────────────────

// 5. Recursively remove every recognized leading boundary character.
export type TrimLeft<Text extends string> =
  TODO; // TODO(koan)

type _05a = Expect<Equal<TrimLeft<" \t\n\rvalue">, "value">>;
type _05b = Expect<Equal<TrimLeft<"   ">, "">>;
type _05c = Expect<Equal<TrimLeft<"value  ">, "value  ">>;
type _05d = Expect<
  Equal<TrimLeft<" a" | "\tb" | "plain">, "a" | "b" | "plain">
>;
type _05e = Expect<Equal<TrimLeft<string>, string>>;

// 6. Recursively remove every recognized trailing boundary character.
export type TrimRight<Text extends string> =
  TODO; // TODO(koan)

type _06a = Expect<Equal<TrimRight<"value \t\n\r">, "value">>;
type _06b = Expect<Equal<TrimRight<"\t\n">, "">>;
type _06c = Expect<Equal<TrimRight<"  value">, "  value">>;
type _06d = Expect<
  Equal<TrimRight<"a " | "b\t" | "plain">, "a" | "b" | "plain">
>;
type _06e = Expect<Equal<TrimRight<string>, string>>;

// 7. Compose recursive right and left trimming without touching the interior.
export type Trim<Text extends string> =
  TODO; // TODO(koan)

type _07a = Expect<Equal<Trim<" \tvalue\r\n ">, "value">>;
type _07b = Expect<Equal<Trim<"  hello  world  ">, "hello  world">>;
type _07c = Expect<Equal<Trim<" \t\r\n">, "">>;
type _07d = Expect<
  Equal<Trim<" a " | " b " | "plain">, "a" | "b" | "plain">
>;
type _07e = Expect<Equal<Trim<"                    value                    ">, "value">>;

// 8. Compose recursive left and right trimming in the reverse order.
export type ReverseTrim<Text extends string> =
  TODO; // TODO(koan)

type _08a = Expect<Equal<ReverseTrim<"  value  ">, "value">>;
type _08b = Expect<Equal<ReverseTrim<"\ta\tb\t">, "a\tb">>;
type _08c = Expect<Equal<ReverseTrim<" \t\r\n">, "">>;
type _08d = Expect<
  Equal<ReverseTrim<" a " | " b ">, "a" | "b">
>;
type _08e = Expect<Equal<ReverseTrim<string>, string>>;

// ─── Derived trim utilities ─────────────────────────────────────────────

// 9. Trim each member and discard members that become the empty string.
export type TrimmedNonEmpty<Text extends string> =
  TODO; // TODO(koan)

type _09a = Expect<Equal<TrimmedNonEmpty<" value ">, "value">>;
type _09b = Expect<Equal<TrimmedNonEmpty<" \t\r\n">, never>>;
type _09c = Expect<
  Equal<TrimmedNonEmpty<" a " | " " | " b " | "">, "a" | "b">
>;
type _09d = Expect<Equal<TrimmedNonEmpty<"a  b">, "a  b">>;
type _09e = Expect<Equal<TrimmedNonEmpty<never>, never>>;

// 10. Trim every member of a string tuple while preserving tuple readonlyness.
export type TrimTuple<Values extends readonly string[]> =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<TrimTuple<[" a ", "\tb\n", "plain"]>, ["a", "b", "plain"]>
>;
type _10b = Expect<
  Equal<TrimTuple<readonly [" a ", " b "]>, readonly ["a", "b"]>
>;
type _10c = Expect<Equal<TrimTuple<[]>, []>>;
type _10d = Expect<Equal<TrimTuple<string[]>, string[]>>;
type _10e = Expect<
  Equal<TrimTuple<[" ", " a  b ", "\u00a0x\u00a0"]>, ["", "a  b", "\u00a0x\u00a0"]>
>;

// 11. Compare one-step progress with the completed recursive results.
export type OneStepTrimProfile<Text extends string> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    OneStepTrimProfile<"  value  ">,
    {
      leftOnce: " value  ";
      leftAll: "value  ";
      rightOnce: "  value ";
      rightAll: "  value";
    }
  >
>;
type _11b = Expect<
  Equal<OneStepTrimProfile<"value">["leftOnce"], "value">
>;
type _11c = Expect<
  Equal<OneStepTrimProfile<"\t value">["leftAll"], "value">
>;
type _11d = Expect<
  Equal<OneStepTrimProfile<"value\r\n">["rightAll"], "value">
>;
type _11e = Expect<
  Equal<
    OneStepTrimProfile<" a " | " b ">["leftOnce"],
    "a " | "b "
  >
>;

// 12. Return both valid composition orders for the same finite input.
export type TrimOrderProfile<Text extends string> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<TrimOrderProfile<"  value  ">, ["value", "value"]>
>;
type _12b = Expect<
  Equal<TrimOrderProfile<"  a  b  ">, ["a  b", "a  b"]>
>;
type _12c = Expect<Equal<TrimOrderProfile<"">, ["", ""]>>;
type _12d = Expect<
  Equal<TrimOrderProfile<" a " | " b ">, ["a" | "b", "a" | "b"]>
>;
type _12e = Expect<
  Equal<TrimOrderProfile<string>, [string, string]>
>;

// 13. Demonstrate that trimming a completed result is idempotent.
export type TrimIdempotenceProfile<Text extends string> =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<TrimIdempotenceProfile<"  value  ">, ["value", "value", "value  ", "  value"]>
>;
type _13b = Expect<
  Equal<TrimIdempotenceProfile<"plain">, ["plain", "plain", "plain", "plain"]>
>;
type _13c = Expect<
  Equal<TrimIdempotenceProfile<"   ">, ["", "", "", ""]>
>;
type _13d = Expect<
  Equal<
    TrimIdempotenceProfile<" a " | " b ">[0],
    "a" | "b"
  >
>;
type _13e = Expect<
  Equal<TrimIdempotenceProfile<string>, [string, string, string, string]>
>;

// ─── Alphabet boundaries and special inputs ─────────────────────────────

// 14. Show that excluded whitespace-like characters remain ordinary data.
export type ExcludedWhitespaceProfile =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<ExcludedWhitespaceProfile["noBreak"], "\u00a0value\u00a0">
>;
type _14b = Expect<
  Equal<ExcludedWhitespaceProfile["verticalTab"], "\vvalue\v">
>;
type _14c = Expect<
  Equal<ExcludedWhitespaceProfile["formFeed"], "\fvalue\f">
>;
type _14d = Expect<
  Equal<ExcludedWhitespaceProfile["recognizedOutside"], "\u00a0value\u00a0">
>;
type _14e = Expect<
  Equal<ExcludedWhitespaceProfile["mixedInterior"], "\u00a0 value \u00a0">
>;

// 15. Describe broad and structurally framed string trimming.
export type BroadTrimProfile =
  TODO; // TODO(koan)

type _15a = Expect<Equal<BroadTrimProfile["leftBroad"], string>>;
type _15b = Expect<Equal<BroadTrimProfile["rightBroad"], string>>;
type _15c = Expect<Equal<BroadTrimProfile["bothBroad"], string>>;
type _15d = Expect<Equal<BroadTrimProfile["framedBoth"], string>>;
type _15e = Expect<Equal<BroadTrimProfile["framedMixed"], string>>;

// 16. Classify broad-guard results for any, never, string, and literals safely.
export type TrimSpecialProfile<Text extends string> =
  TODO; // TODO(koan)

type _16a = Expect<
  Equal<TrimSpecialProfile<any>, [true, true, true, false]>
>;
type _16b = Expect<
  Equal<TrimSpecialProfile<never>, [false, false, false, true]>
>;
type _16c = Expect<
  Equal<TrimSpecialProfile<string>, [false, false, false, false]>
>;
type _16d = Expect<
  Equal<TrimSpecialProfile<" value ">, [false, false, false, false]>
>;
type _16e = Expect<
  Equal<
    TrimSpecialProfile<" a " | " b ">,
    [false, false, false, false]
  >
>;

// 17. Build a reusable view of every stage of trimming one input.
export type TrimSummary<Text extends string> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    TrimSummary<"  value  ">,
    {
      original: "  value  ";
      leftOnce: " value  ";
      rightOnce: "  value ";
      left: "value  ";
      right: "  value";
      both: "value";
    }
  >
>;
type _17b = Expect<
  Equal<TrimSummary<"a  b">["both"], "a  b">
>;
type _17c = Expect<
  Equal<TrimSummary<" \t\r\n">["both"], "">
>;
type _17d = Expect<
  Equal<TrimSummary<" a " | " b ">["both"], "a" | "b">
>;
type _17e = Expect<
  Equal<TrimSummary<string>["both"], string>
>;

// 18. Classify which recognized boundaries are present before trimming.
export type WhitespaceBoundary<
  Text extends string,
> =
  TODO; // TODO(koan)

type _18a = Expect<Equal<WhitespaceBoundary<" value ">, "both">>;
type _18b = Expect<Equal<WhitespaceBoundary<" value">, "left">>;
type _18c = Expect<Equal<WhitespaceBoundary<"value ">, "right">>;
type _18d = Expect<
  Equal<WhitespaceBoundary<"value" | "">, "neither">
>;
type _18e = Expect<
  Equal<
    WhitespaceBoundary<" a " | "b " | "\tc" | "plain">,
    "both" | "right" | "left" | "neither"
  >
>;
