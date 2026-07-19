import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-082: type-level join
 * =============================================================================
 *
 * Join is tuple recursion that rebuilds a string. The empty tuple returns the
 * empty string. A singleton returns its interpolated element without a
 * separator. A longer tuple emits the head, one separator, and the recursive
 * join of the tail.
 *
 * I read
 *
 *   `T extends [infer H, ...infer R] ? `${H}${Sep}${Join<R, Sep>}` : ...`
 *
 * aloud as:
 *
 *   "For a tuple with more than one element, stringify the head, append one
 *    separator, and join the remaining finite tuple."
 *
 * Finite tuple shape is what makes the result exact. A broad array has unknown
 * length and unknown members, so this utility honestly falls back to `string`.
 * Literal unions in elements or the separator form template cross-products.
 * `never` in an interpolated position annihilates that branch. The interpolation
 * domain matches template literals. Native `Array.prototype.join` treats null
 * and undefined as empty strings; the runtime helper deliberately maps through
 * `String` first so its result matches type-level `"null"` and `"undefined"`.
 */

export type Joinable = string | number | bigint | boolean | null | undefined;
export type Join<Values extends readonly Joinable[], Separator extends string> =
  number extends Values["length"]
    ? string
    : Values extends readonly []
      ? ""
      : Values extends readonly [infer Only extends Joinable]
        ? `${Only}`
        : Values extends readonly [
            infer Head extends Joinable,
            ...infer Tail extends readonly Joinable[],
          ]
          ? `${Head}${Separator}${Join<Tail, Separator>}`
          : string;
export type Csv<Values extends readonly Joinable[]> = Join<Values, ",">;
export type Path<Values extends readonly Joinable[]> = Join<Values, "/">;
export type Dotted<Values extends readonly Joinable[]> = Join<Values, ".">;

export function join<
  const Values extends readonly Joinable[],
  const Separator extends string,
>(values: Values, separator: Separator): Join<Values, Separator> {
  return values.map((value) => String(value)).join(separator) as Join<Values, Separator>;
}

export function csv<const Values extends readonly Joinable[]>(values: Values): Csv<Values> {
  return join(values, ",");
}

export function path<const Values extends readonly Joinable[]>(values: Values): Path<Values> {
  return join(values, "/");
}

// Part 1: empty and singleton tuples establish the base cases.
type _Main01 = Expect<Equal<Join<[], ",">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Join<["a"], ",">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Join<[42], ",">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Join<readonly [true], "/">, TODO>>; // TODO(koan) @koan-error

// Part 2: recursive cases place exactly one separator between elements.
type _Main05 = Expect<Equal<Join<["a", "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<Join<["a", "b", "c"], "/">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Join<readonly ["users", 42, "posts"], "/">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Join<[1, 2, 3], " + ">, TODO>>; // TODO(koan) @koan-error

// Part 3: empty separators concatenate without adding text.
type _Main09 = Expect<Equal<Join<["T", "S"], "">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Join<[1, 2, 3], "">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Join<[], "">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Join<["only"], "">, TODO>>; // TODO(koan) @koan-error

// Part 4: every legal interpolation primitive retains its string representation.
type _Main13 = Expect<Equal<Join<[true, false], "|">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Join<[1n, 2n], ":">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Join<[null, undefined], ",">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Join<["x", null, 1, false], "/">, TODO>>; // TODO(koan) @koan-error

// Part 5: literal unions expand; broad arrays fall back honestly.
type _Main17 = Expect<Equal<Join<["a" | "b", "x" | "y"], ":">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Join<["a", "b"], ":" | "/">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Join<string[], ",">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Join<readonly number[], ",">, TODO>>; // TODO(koan) @koan-error
