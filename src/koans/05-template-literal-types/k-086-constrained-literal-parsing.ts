import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-086: constrained literal parsing
 * =============================================================================
 *
 * Constrained template inference can convert captured text into number, bigint,
 * or boolean literal types. A useful parser layers those recognizers in an
 * explicit precedence order and preserves unmatched text as a string.
 *
 * I read
 *
 *   `S extends `${infer N extends number}` ? N : S`
 *
 * aloud as:
 *
 *   "Ask whether all of S can be captured as a number type. If so, return the
 *    inferred numeric candidate; otherwise preserve the original string."
 *
 * This lesson's scalar grammar recognizes exact `true`, `false`, `null`, and
 * `undefined`; bigint text must carry an `n` suffix; numeric capture comes next;
 * all other input is text. Parser order matters because bare integer text can
 * satisfy both number and bigint constraints. Canonical spellings often infer
 * exact literals. Accepted but noncanonical spellings such as leading zeroes,
 * exponent notation, or surrounding spaces may widen to broad `number`.
 * Structured `key=value` parsing composes delimiter inference with the scalar
 * parser while preserving each key's value.
 */

export type ParseNumber<Text extends string> =
  Text extends `${infer Value extends number}` ? Value : never;
export type ParseBigInt<Text extends string> = Text extends `${infer Digits}n`
  ? Digits extends `${infer Value extends bigint}`
    ? Value
    : never
  : never;
export type ParseBoolean<Text extends string> =
  Text extends `${infer Value extends boolean}` ? Value : never;
export type ParseScalar<Text extends string> = Text extends "true"
  ? true
  : Text extends "false"
    ? false
    : Text extends "null"
      ? null
      : Text extends "undefined"
        ? undefined
        : ParseBigInt<Text> extends never
          ? ParseNumber<Text> extends never
            ? Text
            : ParseNumber<Text>
          : ParseBigInt<Text>;
export type ParseField<Text extends string> =
  Text extends `${infer Key}=${infer Value}`
    ? { key: Key; value: ParseScalar<Value> }
    : never;

export function parseScalar<const Text extends string>(text: Text): ParseScalar<Text> {
  if (text === "true") return true as ParseScalar<Text>;
  if (text === "false") return false as ParseScalar<Text>;
  if (text === "null") return null as ParseScalar<Text>;
  if (text === "undefined") return undefined as ParseScalar<Text>;
  if (/^-?\d+n$/.test(text)) return BigInt(text.slice(0, -1)) as ParseScalar<Text>;
  if (text.trim() !== "" && Number.isFinite(Number(text))) return Number(text) as ParseScalar<Text>;
  return text as ParseScalar<Text>;
}

export function parseField<const Text extends `${string}=${string}`>(text: Text): ParseField<Text> {
  const index = text.indexOf("=");
  return {
    key: text.slice(0, index),
    value: parseScalar(text.slice(index + 1)),
  } as ParseField<Text>;
}

// Part 1: canonical numeric text produces numeric literal types.
type _Main01 = Expect<Equal<ParseNumber<"42">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<ParseNumber<"-3.5">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ParseNumber<"0">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<ParseNumber<"not-number">, TODO>>; // TODO(koan) @koan-error

// Part 2: this grammar requires an n suffix for bigint text.
type _Main05 = Expect<Equal<ParseBigInt<"42n">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<ParseBigInt<"-42n">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<ParseBigInt<"42">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ParseBigInt<"3.14n">, TODO>>; // TODO(koan) @koan-error

// Part 3: boolean parsing accepts exactly two lowercase spellings.
type _Main09 = Expect<Equal<ParseBoolean<"true">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ParseBoolean<"false">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ParseBoolean<"TRUE">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ParseBoolean<"1">, TODO>>; // TODO(koan) @koan-error

// Part 4: scalar precedence chooses one typed value or preserves text.
type _Main13 = Expect<Equal<ParseScalar<"true">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ParseScalar<"42n">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ParseScalar<"42">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ParseScalar<"hello">, TODO>>; // TODO(koan) @koan-error

// Part 5: delimiter parsing retains key and parsed-value correlation.
type _Main17 = Expect<Equal<ParseField<"count=42">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ParseField<"enabled=true">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ParseField<"name=Ada">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ParseField<"missing-delimiter">, TODO>>; // TODO(koan) @koan-error
