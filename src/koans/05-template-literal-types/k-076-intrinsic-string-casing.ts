import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-076: intrinsic string casing
 * =============================================================================
 *
 * TypeScript provides four intrinsic string transforms. `Uppercase<S>` and
 * `Lowercase<S>` transform the whole string. `Capitalize<S>` and
 * `Uncapitalize<S>` transform only the first character-like segment and leave
 * the remainder untouched.
 *
 * I read `Capitalize<Lowercase<Name>>` aloud as:
 *
 *   "First lowercase every character in Name, then uppercase only the first
 *    character of that result."
 *
 * The intrinsics preserve literal precision and distribute across string
 * unions. They compose inside templates and mapped keys without manual
 * recursion. Non-letters are stable, the empty string remains empty, and
 * `never` stays never. Their casing follows JavaScript's locale-insensitive
 * string casing behavior rather than locale-aware UI rules; some Unicode
 * characters expand to multiple code points. Broad `string` remains a broad
 * transformed-string type, not one enumerable union. Use these tools for API
 * naming conventions, not human-language presentation logic.
 */

export type Screaming<Name extends string> = Uppercase<Name>;
export type Quiet<Name extends string> = Lowercase<Name>;
export type TitleStart<Name extends string> = Capitalize<Name>;
export type LowerStart<Name extends string> = Uncapitalize<Name>;
export type Pascalized<Name extends string> = Capitalize<Lowercase<Name>>;
export type GetterName<Key extends string> = `get${Capitalize<Key>}`;

export function screaming<const Text extends string>(text: Text): Screaming<Text> {
  return text.toUpperCase() as Screaming<Text>;
}

export function quiet<const Text extends string>(text: Text): Quiet<Text> {
  return text.toLowerCase() as Quiet<Text>;
}

export function titleStart<const Text extends string>(text: Text): TitleStart<Text> {
  if (text.length === 0) return text as TitleStart<Text>;
  return `${text[0]!.toUpperCase()}${text.slice(1)}` as TitleStart<Text>;
}

export function lowerStart<const Text extends string>(text: Text): LowerStart<Text> {
  if (text.length === 0) return text as LowerStart<Text>;
  return `${text[0]!.toLowerCase()}${text.slice(1)}` as LowerStart<Text>;
}

// Part 1: whole-string intrinsics transform every cased character.
type _Main01 = Expect<Equal<Uppercase<"typescript">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Uppercase<"Type-Script 5">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Lowercase<"TYPESCRIPT">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Lowercase<"Type-Script 5">, TODO>>; // TODO(koan) @koan-error

// Part 2: first-character intrinsics leave the tail exactly as written.
type _Main05 = Expect<Equal<Capitalize<"typescript">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<Capitalize<"tYPEscript">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Uncapitalize<"TypeScript">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Uncapitalize<"TYPESCRIPT">, TODO>>; // TODO(koan) @koan-error

// Part 3: unions are transformed member by member.
type _Main09 = Expect<Equal<Uppercase<"read" | "write">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Lowercase<"GET" | "POST">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Capitalize<"user" | "team">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<GetterName<"name" | "age">, TODO>>; // TODO(koan) @koan-error

// Part 4: composition order determines which characters are normalized.
type _Main13 = Expect<Equal<Pascalized<"hELLO">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Capitalize<Uppercase<"hello">>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Uncapitalize<Uppercase<"hello">>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Lowercase<Capitalize<"hELLO">>, TODO>>; // TODO(koan) @koan-error

// Part 5: empty and non-letter prefixes remain stable.
type _Main17 = Expect<Equal<Capitalize<"">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Uppercase<"123-!">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Capitalize<"1value">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Uppercase<never>, TODO>>; // TODO(koan) @koan-error
