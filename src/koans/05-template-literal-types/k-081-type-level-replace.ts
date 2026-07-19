import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-081: type-level replace
 * =============================================================================
 *
 * Replacement uses a template pattern to capture text before and after the
 * first search token. Rebuilding with the replacement token changes one match.
 * Replace-all repeats only on the untouched tail.
 *
 * I read
 *
 *   `S extends `${infer Head}${From}${infer Tail}`
 *      ? `${Head}${To}${ReplaceAll<Tail, From, To>}`
 *      : S`
 *
 * aloud as:
 *
 *   "Find the leftmost From, preserve Head, insert To, then replace remaining
 *    matches in the original Tail. If no match remains, preserve S."
 *
 * Recursing on Tail has two important consequences: inserted text is not
 * scanned again, and matches are nonoverlapping from left to right. Replacing
 * `"a"` with `"aa"` terminates. Replacing `"aa"` in `"aaa"` yields one match
 * plus the final `"a"`. An empty search token does not consume input, so this
 * utility declares it an identity operation. Broad strings return broadly, and
 * literal input unions distribute member by member.
 */

export type Replace<
  Text extends string,
  Search extends string,
  Replacement extends string,
> = string extends Text
  ? Text
  : Search extends ""
    ? Text
    : Text extends `${infer Head}${Search}${infer Tail}`
      ? `${Head}${Replacement}${Tail}`
      : Text;
export type ReplaceAll<
  Text extends string,
  Search extends string,
  Replacement extends string,
> = string extends Text
  ? Text
  : Search extends ""
    ? Text
    : Text extends `${infer Head}${Search}${infer Tail}`
      ? `${Head}${Replacement}${ReplaceAll<Tail, Search, Replacement>}`
      : Text;
export type Remove<Text extends string, Search extends string> = Replace<Text, Search, "">;
export type RemoveAll<Text extends string, Search extends string> = ReplaceAll<Text, Search, "">;

export function replace<
  const Text extends string,
  const Search extends string,
  const Replacement extends string,
>(text: Text, search: Search, replacement: Replacement): Replace<Text, Search, Replacement> {
  if (search === "") return text as Replace<Text, Search, Replacement>;
  return text.replace(search, replacement) as Replace<Text, Search, Replacement>;
}

export function replaceAll<
  const Text extends string,
  const Search extends string,
  const Replacement extends string,
>(text: Text, search: Search, replacement: Replacement): ReplaceAll<Text, Search, Replacement> {
  if (search === "") return text as ReplaceAll<Text, Search, Replacement>;
  return text.split(search).join(replacement) as ReplaceAll<Text, Search, Replacement>;
}

// Part 1: first replacement rewrites only the leftmost match.
type _Main01 = Expect<Equal<Replace<"a-b-c", "-", ":">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Replace<"foo foo", "foo", "bar">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Replace<"unchanged", "x", "y">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Replace<"abc", "abc", "x">, TODO>>; // TODO(koan) @koan-error

// Part 2: replace-all recursively processes every nonoverlapping match.
type _Main05 = Expect<Equal<ReplaceAll<"a-b-c", "-", ":">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<ReplaceAll<"foo foo foo", "foo", "bar">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<ReplaceAll<"unchanged", "x", "y">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReplaceAll<"aaaa", "a", "x">, TODO>>; // TODO(koan) @koan-error

// Part 3: empty replacement deletes matches.
type _Main09 = Expect<Equal<Remove<"a-b-c", "-">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<RemoveAll<"a-b-c", "-">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<RemoveAll<"banana", "a">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<RemoveAll<"abc", "x">, TODO>>; // TODO(koan) @koan-error

// Part 4: inserted matches are not scanned again.
type _Main13 = Expect<Equal<ReplaceAll<"a", "a", "aa">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ReplaceAll<"aa", "a", "aa">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ReplaceAll<"aaa", "aa", "x">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ReplaceAll<"aaaa", "aa", "x">, TODO>>; // TODO(koan) @koan-error

// Part 5: empty search, unions, and broad strings use explicit boundary rules.
type _Main17 = Expect<Equal<ReplaceAll<"abc", "", "x">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReplaceAll<"a-b" | "c-d", "-", ":">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReplaceAll<string, "-", ":">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReplaceAll<never, "-", ":">, TODO>>; // TODO(koan) @koan-error
