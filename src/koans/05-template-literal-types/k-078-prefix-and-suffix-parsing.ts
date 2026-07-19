import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-078: prefix and suffix parsing
 * =============================================================================
 *
 * Prefix and suffix patterns are the smallest reusable string parsers. A fixed
 * affix can be tested, removed, added when absent, or used to classify text.
 * The fixed segment proves structure; an inferred segment returns the remainder.
 *
 * I read
 *
 *   `S extends `${Prefix}${infer Rest}` ? Rest : never`
 *
 * aloud as:
 *
 *   "If S starts with exactly Prefix, capture everything after that one prefix
 *    as Rest; otherwise reject it."
 *
 * A single match removes one layer, not every repeated layer. The empty string
 * is a prefix and suffix of every string, so stripping it changes nothing.
 * Affix candidate unions need an explicit distributive helper when I want to
 * ask which individual candidates match; a template containing the whole union
 * describes alternatives but does not automatically return the candidate name.
 * Overlapping candidates may all match. Runtime functions must check the affix
 * before using a type assertion, because conditional types do not validate
 * arbitrary runtime strings.
 */

export type StartsWith<Text extends string, Prefix extends string> =
  Text extends `${Prefix}${string}` ? true : false;
export type EndsWith<Text extends string, Suffix extends string> =
  Text extends `${string}${Suffix}` ? true : false;
export type StripPrefix<Text extends string, Prefix extends string> =
  Text extends `${Prefix}${infer Rest}` ? Rest : never;
export type StripSuffix<Text extends string, Suffix extends string> =
  Text extends `${infer Rest}${Suffix}` ? Rest : never;
export type StripAffixes<Text extends string, Prefix extends string, Suffix extends string> =
  Text extends `${Prefix}${infer Middle}${Suffix}` ? Middle : never;
export type EnsurePrefix<Text extends string, Prefix extends string> =
  Text extends `${Prefix}${string}` ? Text : `${Prefix}${Text}`;
export type MatchingPrefixes<Text extends string, Prefix extends string> = Prefix extends unknown
  ? Text extends `${Prefix}${string}`
    ? Prefix
    : never
  : never;

export function stripPrefix<const Text extends string, const Prefix extends string>(
  text: Text,
  prefix: Prefix,
): StripPrefix<Text, Prefix> {
  if (!text.startsWith(prefix)) throw new Error(`Expected prefix: ${prefix}`);
  return text.slice(prefix.length) as StripPrefix<Text, Prefix>;
}

export function stripSuffix<const Text extends string, const Suffix extends string>(
  text: Text,
  suffix: Suffix,
): StripSuffix<Text, Suffix> {
  if (!text.endsWith(suffix)) throw new Error(`Expected suffix: ${suffix}`);
  return text.slice(0, text.length - suffix.length) as StripSuffix<Text, Suffix>;
}

export function stripAffixes<
  const Text extends string,
  const Prefix extends string,
  const Suffix extends string,
>(text: Text, prefix: Prefix, suffix: Suffix): StripAffixes<Text, Prefix, Suffix> {
  if (!text.startsWith(prefix) || !text.endsWith(suffix)) {
    throw new Error(`Expected ${prefix}...${suffix}`);
  }
  return text.slice(prefix.length, text.length - suffix.length) as StripAffixes<Text, Prefix, Suffix>;
}

export function ensurePrefix<const Text extends string, const Prefix extends string>(
  text: Text,
  prefix: Prefix,
): EnsurePrefix<Text, Prefix> {
  return (text.startsWith(prefix) ? text : `${prefix}${text}`) as EnsurePrefix<Text, Prefix>;
}

// Part 1: affix predicates return literal booleans for literal inputs.
type _Main01 = Expect<Equal<StartsWith<"user:42", "user:">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<StartsWith<"team:42", "user:">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<EndsWith<"index.ts", ".ts">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<EndsWith<"index.js", ".ts">, TODO>>; // TODO(koan) @koan-error

// Part 2: stripping removes exactly one matching affix.
type _Main05 = Expect<Equal<StripPrefix<"user:42", "user:">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<StripPrefix<"preprevalue", "pre">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<StripSuffix<"index.test.ts", ".ts">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<StripSuffix<"index.js", ".ts">, TODO>>; // TODO(koan) @koan-error

// Part 3: prefix and suffix can frame one captured middle.
type _Main09 = Expect<Equal<StripAffixes<"[value]", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<StripAffixes<"<a:b>", "<", ">">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<StripAffixes<"[]", "[", "]">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<StripAffixes<"[value", "[", "]">, TODO>>; // TODO(koan) @koan-error

// Part 4: ensuring is idempotent when the prefix already exists.
type _Main13 = Expect<Equal<EnsurePrefix<"user:42", "user:">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<EnsurePrefix<"42", "user:">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<EnsurePrefix<"", "id:">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<EnsurePrefix<"value", "">, TODO>>; // TODO(koan) @koan-error

// Part 5: candidate unions classify every matching prefix independently.
type _Main17 = Expect<Equal<MatchingPrefixes<"user:42", "user:" | "team:">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MatchingPrefixes<"admin:user:42", "admin:" | "admin:user:">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MatchingPrefixes<"other", "user:" | "team:">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MatchingPrefixes<"anything", "" | "x">, TODO>>; // TODO(koan) @koan-error
