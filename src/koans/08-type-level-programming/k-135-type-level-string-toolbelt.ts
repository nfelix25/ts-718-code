import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 135 - A TYPE-LEVEL STRING TOOLBELT
 * =========================================
 *
 * Template-literal pattern matching gives strings a head/tail structure much
 * like tuples. A trim removes one matching edge and recurses. A replacement
 * captures a prefix and suffix around a delimiter. Split turns repeated string
 * captures into a tuple; join folds that tuple back into a string.
 *
 * Read `Split<"a/b/c", "/">` aloud as: "capture text before the first slash,
 * then split the remainder by the same slash." Read `Join<["a", "b"], ".">`
 * as: "emit the head, emit a dot, and recursively join the tail." Composition
 * is the real point: small predictable transforms make larger protocols legible.
 */

type IsAny<T> = 0 extends 1 & T ? true : false;
type Whitespace = " " | "\n" | "\t";

export type TrimLeft<S extends string> = IsAny<S> extends true
  ? string
  : string extends S
    ? string
    : S extends `${Whitespace}${infer Rest}`
      ? TrimLeft<Rest>
      : S;

export type TrimRight<S extends string> = IsAny<S> extends true
  ? string
  : string extends S
    ? string
    : S extends `${infer Rest}${Whitespace}`
      ? TrimRight<Rest>
      : S;

export type Trim<S extends string> = TrimLeft<TrimRight<S>>;

export type Replace<
  S extends string,
  Search extends string,
  With extends string,
> = IsAny<S | Search | With> extends true
  ? string
  : string extends S | Search | With
    ? string
    : S extends unknown
      ? Search extends unknown
        ? Search extends ""
          ? S
          : S extends `${infer Head}${Search}${infer Tail}`
            ? `${Head}${With}${Tail}`
            : S
        : never
      : never;

type ReplaceAllOne<S extends string, Search extends string, With extends string> =
  S extends `${infer Head}${Search}${infer Tail}`
    ? `${Head}${With}${ReplaceAllOne<Tail, Search, With>}`
    : S;

export type ReplaceAll<
  S extends string,
  Search extends string,
  With extends string,
> = IsAny<S | Search | With> extends true
  ? string
  : string extends S | Search | With
    ? string
    : S extends unknown
      ? Search extends unknown
        ? Search extends "" ? S : ReplaceAllOne<S, Search, With>
        : never
      : never;

type SplitCharacters<S extends string> = S extends `${infer Head}${infer Tail}`
  ? [Head, ...SplitCharacters<Tail>]
  : [];

type SplitOne<S extends string, Separator extends string> = Separator extends ""
  ? SplitCharacters<S>
  : S extends ""
    ? []
    : S extends `${infer Head}${Separator}${infer Tail}`
      ? [Head, ...(Tail extends "" ? [""] : SplitOne<Tail, Separator>)]
      : [S];

export type Split<S extends string, Separator extends string> = IsAny<S | Separator> extends true
  ? string[]
  : string extends S | Separator
    ? string[]
    : S extends unknown
      ? Separator extends unknown
        ? SplitOne<S, Separator>
        : never
      : never;

type JoinOne<Parts extends readonly string[], Separator extends string> =
  Parts extends readonly []
    ? ""
    : Parts extends readonly [infer Only extends string]
      ? Only
      : Parts extends readonly [infer Head extends string, ...infer Tail extends string[]]
        ? `${Head}${Separator}${JoinOne<Tail, Separator>}`
        : string;

export type Join<Parts extends readonly string[], Separator extends string> =
  IsAny<Parts | Separator> extends true
    ? string
    : string extends Separator
      ? string
      : number extends Parts["length"]
        ? string
        : JoinOne<Parts, Separator>;

export type StringLength<S extends string> = Split<S, "">["length"];

export type SnakeToCamel<S extends string> = IsAny<S> extends true
  ? string
  : string extends S
    ? string
    : S extends `${infer Head}_${infer Tail}`
      ? `${Head}${Capitalize<SnakeToCamel<Tail>>}`
      : S;

// Part 1: Trimming peels matching boundary characters one at a time.
type _01 = Expect<Equal<TrimLeft<"  value">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<TrimRight<"value\n\t">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Trim<" \t value \n">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Trim<"already-clean">, TODO>>; // TODO(koan) @koan-error

// Part 2: Captured prefix and suffix distinguish first from repeated replacement.
type _05 = Expect<Equal<Replace<"a-b-c", "-", "/">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReplaceAll<"a-b-c", "-", "/">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReplaceAll<"bookkeeper", "oo", "u">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReplaceAll<"abc", "x", "!">, TODO>>; // TODO(koan) @koan-error

// Part 3: Split recursively materializes captures as tuple positions.
type _09 = Expect<Equal<Split<"a/b/c", "/">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Split<"single", "/">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Split<"abc", "">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Split<"", ",">, TODO>>; // TODO(koan) @koan-error

// Part 4: Join is the inverse-shaped fold over a finite tuple.
type _13 = Expect<Equal<Join<[], ".">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Join<["a"], ".">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Join<["a", "b", "c"], ".">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Join<Split<"a/b/c", "/">, ".">, TODO>>; // TODO(koan) @koan-error

// Part 5: Composition, literal unions, and broad inputs reveal the toolbelt's limits.
type _17 = Expect<Equal<StringLength<"koan">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<SnakeToCamel<"type_level_toolbelt">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Trim<" a " | " b ">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Split<string, ",">, TODO>>; // TODO(koan) @koan-error

export function trimText<const S extends string>(value: S): Trim<S> {
  return value.trim() as Trim<S>;
}

export function replaceAllText<
  const S extends string,
  const Search extends string,
  const With extends string,
>(value: S, search: Search, replacement: With): ReplaceAll<S, Search, With> {
  return (search === "" ? value : value.split(search).join(replacement)) as ReplaceAll<S, Search, With>;
}

export function splitText<const S extends string, const Separator extends string>(
  value: S,
  separator: Separator,
): Split<S, Separator> {
  return (value === "" && separator !== "" ? [] : value.split(separator)) as Split<S, Separator>;
}

export function joinText<
  const Parts extends readonly string[],
  const Separator extends string,
>(parts: Parts, separator: Separator): Join<Parts, Separator> {
  return parts.join(separator) as Join<Parts, Separator>;
}
