import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-079: type-level split
 * =============================================================================
 *
 * Splitting is recursive template parsing. Match the first delimiter, emit the
 * captured head, and recurse on the captured tail. If no delimiter remains,
 * the tail itself is the final segment.
 *
 * I read
 *
 *   `S extends `${infer Head}${D}${infer Tail}` ? [Head, ...Split<Tail, D>] : [S]`
 *
 * aloud as:
 *
 *   "If S contains D, take the first segment before D and prepend it to the
 *    recursive split of everything after D; otherwise return S as one segment."
 *
 * This lesson chooses JavaScript-like edge semantics deliberately. Empty fields
 * from leading, trailing, or consecutive nonempty delimiters are preserved.
 * Splitting the empty string by a nonempty delimiter yields `[""]`. An empty
 * delimiter switches to character decomposition, where the empty string yields
 * `[]`. Broad `string` cannot reveal finite segments and falls back to
 * `string[]`. These choices are part of the utility's contract; other valid
 * split utilities may choose different empty-input behavior.
 */

export type Characters<Text extends string> = Text extends `${infer Head}${infer Tail}`
  ? [Head, ...Characters<Tail>]
  : [];
export type Split<Text extends string, Delimiter extends string> = string extends Text
  ? string[]
  : Delimiter extends ""
    ? Characters<Text>
    : Text extends `${infer Head}${Delimiter}${infer Tail}`
      ? [Head, ...Split<Tail, Delimiter>]
      : [Text];
export type FirstSegment<Text extends string, Delimiter extends string> =
  Split<Text, Delimiter> extends [infer First extends string, ...unknown[]] ? First : never;
export type LastSegment<Text extends string, Delimiter extends string> =
  Split<Text, Delimiter> extends [...unknown[], infer Last extends string] ? Last : never;
export type SegmentUnion<Text extends string, Delimiter extends string> = Split<Text, Delimiter>[number];

export function split<const Text extends string, const Delimiter extends string>(
  text: Text,
  delimiter: Delimiter,
): Split<Text, Delimiter> {
  return text.split(delimiter) as Split<Text, Delimiter>;
}

export function firstSegment<const Text extends string, const Delimiter extends string>(
  text: Text,
  delimiter: Delimiter,
): FirstSegment<Text, Delimiter> {
  return text.split(delimiter)[0] as FirstSegment<Text, Delimiter>;
}

export function lastSegment<const Text extends string, const Delimiter extends string>(
  text: Text,
  delimiter: Delimiter,
): LastSegment<Text, Delimiter> {
  return text.split(delimiter).at(-1) as LastSegment<Text, Delimiter>;
}

// Part 1: a missing delimiter returns the whole input as one segment.
type _Main01 = Expect<Equal<Split<"abc", ",">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Split<"one", "/">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Split<"", ",">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Split<"a", "--">, TODO>>; // TODO(koan) @koan-error

// Part 2: recursion emits every delimited segment in order.
type _Main05 = Expect<Equal<Split<"a,b", ",">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<Split<"a,b,c", ",">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Split<"users/42/posts", "/">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Split<"a--b--c", "--">, TODO>>; // TODO(koan) @koan-error

// Part 3: empty fields from nonempty delimiters are preserved.
type _Main09 = Expect<Equal<Split<",a", ",">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Split<"a,", ",">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Split<"a,,b", ",">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Split<",", ",">, TODO>>; // TODO(koan) @koan-error

// Part 4: empty delimiter means character decomposition.
type _Main13 = Expect<Equal<Split<"Type", "">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Split<"T", "">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Split<"", "">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Split<"a-b", "">, TODO>>; // TODO(koan) @koan-error

// Part 5: the resulting tuple supports ordinary tuple queries.
type _Main17 = Expect<Equal<FirstSegment<"a/b/c", "/">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<LastSegment<"a/b/c", "/">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<SegmentUnion<"a/b/c", "/">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Split<string, ",">, TODO>>; // TODO(koan) @koan-error
