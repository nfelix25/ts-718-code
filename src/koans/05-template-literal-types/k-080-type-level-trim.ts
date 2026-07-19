import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-080: type-level trim
 * =============================================================================
 *
 * Trimming is recursive affix removal over a declared whitespace alphabet. One
 * recursive branch consumes exactly one leading or trailing whitespace member;
 * the base branch returns the remaining text unchanged.
 *
 * I read
 *
 *   `S extends `${Whitespace}${infer Rest}` ? TrimLeft<Rest> : S`
 *
 * aloud as:
 *
 *   "If S begins with one recognized whitespace character, discard it and
 *    trim the remainder again; otherwise S is left-trimmed."
 *
 * `Trim<S>` composes left and right trimming. It never removes internal
 * whitespace. This lesson's alphabet is deliberately explicit: ASCII space,
 * tab, line feed, and carriage return. JavaScript `String.prototype.trim`
 * recognizes a larger Unicode set, so the runtime helper below uses the same
 * four-character contract as the types. A broad-input guard prevents recursive
 * pattern work on `string` and `any`, while literal unions still distribute.
 */

export type Whitespace = " " | "\t" | "\n" | "\r";
export type TrimLeft<Text extends string> = string extends Text
  ? Text
  : Text extends `${Whitespace}${infer Rest}`
    ? TrimLeft<Rest>
    : Text;
export type TrimRight<Text extends string> = string extends Text
  ? Text
  : Text extends `${infer Rest}${Whitespace}`
    ? TrimRight<Rest>
    : Text;
export type Trim<Text extends string> = TrimLeft<TrimRight<Text>>;
export type TrimLeftOnce<Text extends string> =
  Text extends `${Whitespace}${infer Rest}` ? Rest : Text;
export type TrimRightOnce<Text extends string> =
  Text extends `${infer Rest}${Whitespace}` ? Rest : Text;

const whitespace = new Set([" ", "\t", "\n", "\r"]);

export function trimLeft<const Text extends string>(text: Text): TrimLeft<Text> {
  let start = 0;
  while (start < text.length && whitespace.has(text[start]!)) start += 1;
  return text.slice(start) as TrimLeft<Text>;
}

export function trimRight<const Text extends string>(text: Text): TrimRight<Text> {
  let end = text.length;
  while (end > 0 && whitespace.has(text[end - 1]!)) end -= 1;
  return text.slice(0, end) as TrimRight<Text>;
}

export function trim<const Text extends string>(text: Text): Trim<Text> {
  return trimLeft(trimRight(text)) as Trim<Text>;
}

// Part 1: left trim consumes every recognized leading character.
type _Main01 = Expect<Equal<TrimLeft<"  value">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<TrimLeft<"\t\nvalue">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<TrimLeft<"value  ">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<TrimLeft<"">, TODO>>; // TODO(koan) @koan-error

// Part 2: right trim mirrors the recursion from the other end.
type _Main05 = Expect<Equal<TrimRight<"value  ">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<TrimRight<"value\r\n">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<TrimRight<"  value">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<TrimRight<"">, TODO>>; // TODO(koan) @koan-error

// Part 3: two-sided trim composes the one-sided utilities.
type _Main09 = Expect<Equal<Trim<"  value  ">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Trim<"\t value \n">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Trim<"value">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Trim<" \t\r\n">, TODO>>; // TODO(koan) @koan-error

// Part 4: internal whitespace is data, not an affix.
type _Main13 = Expect<Equal<Trim<"  hello world  ">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Trim<"\ta\tb\t">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Trim<"\nline one\nline two\n">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Trim<"a  b">, TODO>>; // TODO(koan) @koan-error

// Part 5: one-step and recursive removal answer different questions.
type _Main17 = Expect<Equal<TrimLeftOnce<"  value">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<TrimLeft<"  value">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<TrimRightOnce<"value  ">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Trim<" a " | " b ">, TODO>>; // TODO(koan) @koan-error
