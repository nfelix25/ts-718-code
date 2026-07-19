import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-067: constrained infer
 * =============================================================================
 *
 * An inferred variable can carry an `extends` constraint at the capture site.
 * The pattern succeeds only when the captured candidate satisfies that
 * constraint, and the true branch knows the narrower type immediately.
 *
 * I read `T extends readonly [infer H extends string, ...unknown[]] ? H : never`
 * aloud as:
 *
 *   "If T is a nonempty readonly tuple whose first member can be captured as a
 *    string, return that string member; otherwise return never."
 *
 * This is often the direct form of a two-stage operation: capture a value and
 * then test it. It is particularly powerful in template literal patterns,
 * where `${infer N extends number}` asks TypeScript to interpret matched text
 * as a numeric literal type. The conversion is type-level pattern recognition,
 * not JavaScript's full runtime parser. Noncanonical text can widen or fail, so
 * exact spellings matter. Union inputs still distribute member by member.
 */

export type StringHead<T> = T extends readonly [infer Head extends string, ...unknown[]]
  ? Head
  : never;
export type NumberResult<F> = F extends (...args: any[]) => (infer Result extends number)
  ? Result
  : never;
export type StringId<T> = T extends { id: infer Id extends string } ? Id : never;
export type ParseNumber<S> = S extends `${infer Value extends number}` ? Value : never;
export type ParseBigInt<S> = S extends `${infer Value extends bigint}` ? Value : never;
export type ParseBoolean<S> = S extends `${infer Value extends boolean}` ? Value : never;

export function firstString<const Values extends readonly [string, ...unknown[]]>(
  values: Values,
): StringHead<Values> {
  return values[0] as StringHead<Values>;
}

export function parseNumber<const Text extends string>(text: Text): ParseNumber<Text> {
  return Number(text) as ParseNumber<Text>;
}

export function parseBigInt<const Text extends string>(text: Text): ParseBigInt<Text> {
  return BigInt(text) as ParseBigInt<Text>;
}

export function parseBoolean<const Text extends "true" | "false">(
  text: Text,
): ParseBoolean<Text> {
  return (text === "true") as ParseBoolean<Text>;
}

// Part 1: a tuple capture can require a string candidate immediately.
type _Main01 = Expect<Equal<StringHead<["name", 1]>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<StringHead<readonly [string, boolean]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<StringHead<[42, "name"]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<StringHead<[]>, TODO>>; // TODO(koan) @koan-error

// Part 2: constrained return capture filters callable results.
type _Main05 = Expect<Equal<NumberResult<() => 42>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<NumberResult<(text: string) => number>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<NumberResult<() => string>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<NumberResult<(() => 1) | (() => "x")>, TODO>>; // TODO(koan) @koan-error

// Part 3: property capture can validate and preserve a literal identifier.
type _Main09 = Expect<Equal<StringId<{ id: "user-1" }>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<StringId<{ readonly id: string }>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<StringId<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<StringId<{ id?: string }>, TODO>>; // TODO(koan) @koan-error

// Part 4: template captures can reify canonical numeric text.
type _Main13 = Expect<Equal<ParseNumber<"42">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ParseNumber<"-3.5">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ParseNumber<"forty-two">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ParseBigInt<"9007199254740993">, TODO>>; // TODO(koan) @koan-error

// Part 5: boolean parsing accepts exactly its two literal spellings.
type _Main17 = Expect<Equal<ParseBoolean<"true">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ParseBoolean<"false">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ParseBoolean<"TRUE">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ParseNumber<"1" | "2" | "x">, TODO>>; // TODO(koan) @koan-error
