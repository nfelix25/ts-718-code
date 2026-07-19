import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-077: template pattern inference
 * =============================================================================
 *
 * Template literal types can run in reverse. In a conditional pattern, fixed
 * text acts as a delimiter and `infer` variables capture the text occupying
 * the variable positions.
 *
 * I read
 *
 *   `S extends `${infer Left}:${infer Right}` ? [Left, Right] : never`
 *
 * aloud as:
 *
 *   "If S contains a colon in the required structure, capture the text before
 *    the matched colon as Left and the remaining text as Right; otherwise
 *    return never."
 *
 * Captures are strings unless constrained further. Empty captures are valid
 * when the surrounding fixed text still matches. With repeated delimiters,
 * earlier capture sites take the shortest portion that allows the remaining
 * pattern to match, so a two-part pattern splits at the first usable delimiter.
 * Adjacent infer sites have their own rule: the first captures one leading
 * character-like segment and the second receives the rest. Naked input unions
 * distribute, while broad `string` does not prove that a required delimiter is
 * present. This is compile-time structural matching, not runtime validation.
 */

export type AfterPrefix<Text, Prefix extends string> = Text extends `${Prefix}${infer Rest}`
  ? Rest
  : never;
export type BeforeSuffix<Text, Suffix extends string> = Text extends `${infer Rest}${Suffix}`
  ? Rest
  : never;
export type SplitOnce<Text, Delimiter extends string> =
  Text extends `${infer Left}${Delimiter}${infer Right}` ? [Left, Right] : never;
export type ThreeParts<Text, Delimiter extends string> =
  Text extends `${infer First}${Delimiter}${infer Second}${Delimiter}${infer Third}`
    ? [First, Second, Third]
    : never;
export type FirstAndRest<Text> = Text extends `${infer First}${infer Rest}`
  ? [First, Rest]
  : never;

export function removePrefix<const Text extends string, const Prefix extends string>(
  text: Text,
  prefix: Prefix,
): AfterPrefix<Text, Prefix> {
  return text.slice(prefix.length) as AfterPrefix<Text, Prefix>;
}

export function removeSuffix<const Text extends string, const Suffix extends string>(
  text: Text,
  suffix: Suffix,
): BeforeSuffix<Text, Suffix> {
  return text.slice(0, text.length - suffix.length) as BeforeSuffix<Text, Suffix>;
}

export function splitOnce<const Text extends string, const Delimiter extends string>(
  text: Text,
  delimiter: Delimiter,
): SplitOnce<Text, Delimiter> {
  const index = text.indexOf(delimiter);
  return [text.slice(0, index), text.slice(index + delimiter.length)] as SplitOnce<Text, Delimiter>;
}

export function firstAndRest<const Text extends string>(text: Text): FirstAndRest<Text> {
  return [text.slice(0, 1), text.slice(1)] as FirstAndRest<Text>;
}

// Part 1: fixed prefixes capture the unmatched remainder.
type _Main01 = Expect<Equal<AfterPrefix<"user:42", "user:">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<AfterPrefix<"prefix", "pre">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<AfterPrefix<"pre", "pre">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<AfterPrefix<"other", "pre">, TODO>>; // TODO(koan) @koan-error

// Part 2: fixed suffixes capture what precedes them.
type _Main05 = Expect<Equal<BeforeSuffix<"index.ts", ".ts">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<BeforeSuffix<"ready!", "!">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<BeforeSuffix<".ts", ".ts">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<BeforeSuffix<"index.js", ".ts">, TODO>>; // TODO(koan) @koan-error

// Part 3: two capture sites partition around a delimiter.
type _Main09 = Expect<Equal<SplitOnce<"key:value", ":">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<SplitOnce<"a:b:c", ":">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<SplitOnce<":tail", ":">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<SplitOnce<"missing", ":">, TODO>>; // TODO(koan) @koan-error

// Part 4: repeated delimiters support several named captures.
type _Main13 = Expect<Equal<ThreeParts<"a:b:c", ":">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ThreeParts<"a:b:c:d", ":">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ThreeParts<"a::c", ":">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ThreeParts<"a:b", ":">, TODO>>; // TODO(koan) @koan-error

// Part 5: adjacent captures and unions follow their own structural rules.
type _Main17 = Expect<Equal<FirstAndRest<"Type">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<FirstAndRest<"T">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<FirstAndRest<"">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<SplitOnce<"a:1" | "b:2", ":">, TODO>>; // TODO(koan) @koan-error
