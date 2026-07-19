import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-087: query-string parser
 * =============================================================================
 *
 * A query parser composes several earlier tools: strip an optional `?`, split
 * recursively on `&`, split each field at the first `=`, parse scalar values,
 * and merge each one-property object into an accumulated result.
 *
 * This lesson declares a raw, non-decoding grammar:
 *
 * - `key=value` parses value through the scalar grammar.
 * - a bare `flag` becomes `{ flag: true }`.
 * - empty fields and empty keys are ignored.
 * - duplicate keys use the last occurrence.
 * - percent escapes and `+` remain literal text.
 *
 * I read `Merge<ParseEntry<Head>, ParseBody<Tail>>` aloud as:
 *
 *   "Parse the first ampersand field, recursively parse everything after it,
 *    then merge so the later tail object overrides a duplicate head key."
 *
 * The overwrite rule must be designed; intersecting `{ a: 1 } & { a: 2 }`
 * would make `a` impossible instead of choosing the last value. Literal query
 * unions distribute to alternative objects. Broad strings fall back to a
 * record whose values cover the declared scalar grammar.
 */

export type QueryValue = string | number | bigint | boolean | null | undefined;
type QueryNumber<Text extends string> = Text extends `${infer Value extends number}` ? Value : never;
type QueryBigInt<Text extends string> = Text extends `${infer Digits}n`
  ? Digits extends `${infer Value extends bigint}` ? Value : never
  : never;
export type ParseQueryScalar<Text extends string> = Text extends "true" ? true
  : Text extends "false" ? false
  : Text extends "null" ? null
  : Text extends "undefined" ? undefined
  : QueryBigInt<Text> extends never
    ? QueryNumber<Text> extends never ? Text : QueryNumber<Text>
    : QueryBigInt<Text>;
type Expand<Object> = { [Key in keyof Object]: Object[Key] };
type Merge<Left, Right> = Expand<Omit<Left, keyof Right> & Right>;
export type ParseQueryEntry<Entry extends string> = Entry extends ""
  ? {}
  : Entry extends `${infer Key}=${infer Value}`
    ? Key extends ""
      ? {}
      : { [Name in Key]: ParseQueryScalar<Value> }
    : { [Name in Entry]: true };
type ParseQueryBody<Body extends string> = string extends Body
  ? Record<string, QueryValue>
  : Body extends `${infer Head}&${infer Tail}`
    ? Merge<ParseQueryEntry<Head>, ParseQueryBody<Tail>>
    : ParseQueryEntry<Body>;
export type ParseQuery<Text extends string> = Text extends unknown
  ? string extends Text
    ? Record<string, QueryValue>
    : Text extends `?${infer Body}`
      ? ParseQueryBody<Body>
      : ParseQueryBody<Text>
  : never;

function parseRuntimeScalar(text: string): QueryValue {
  if (text === "true") return true;
  if (text === "false") return false;
  if (text === "null") return null;
  if (text === "undefined") return undefined;
  if (/^-?\d+n$/.test(text)) return BigInt(text.slice(0, -1));
  if (text.trim() !== "" && Number.isFinite(Number(text))) return Number(text);
  return text;
}

export function parseQuery<const Text extends string>(text: Text): ParseQuery<Text> {
  const result: Record<string, QueryValue> = {};
  const body = text.startsWith("?") ? text.slice(1) : text;
  for (const entry of body.split("&")) {
    if (entry === "") continue;
    const index = entry.indexOf("=");
    if (index === -1) {
      result[entry] = true;
      continue;
    }
    const key = entry.slice(0, index);
    if (key === "") continue;
    result[key] = parseRuntimeScalar(entry.slice(index + 1));
  }
  return result as ParseQuery<Text>;
}

// Part 1: one field becomes one correlated property.
type _Main01 = Expect<Equal<ParseQuery<"name=Ada">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<ParseQuery<"count=42">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ParseQuery<"enabled=true">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<ParseQuery<"limit=42n">, TODO>>; // TODO(koan) @koan-error

// Part 2: ampersand recursion merges independent fields.
type _Main05 = Expect<Equal<ParseQuery<"name=Ada&count=42">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<ParseQuery<"enabled=true&empty=null">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<ParseQuery<"a=1&b=2&c=3">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ParseQuery<"?name=Ada&count=42">, TODO>>; // TODO(koan) @koan-error

// Part 3: bare fields are boolean flags; empty fields and keys are ignored.
type _Main09 = Expect<Equal<ParseQuery<"debug">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ParseQuery<"debug&count=1">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ParseQuery<"">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ParseQuery<"&&=ignored&ok=1">, TODO>>; // TODO(koan) @koan-error

// Part 4: later duplicate keys overwrite earlier values.
type _Main13 = Expect<Equal<ParseQuery<"a=1&a=2">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ParseQuery<"a=true&a=text">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ParseQuery<"flag&flag=false">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ParseQuery<"a=1&b=2&a=3">, TODO>>; // TODO(koan) @koan-error

// Part 5: decoding is out of scope; unions and broad text keep honest shapes.
type _Main17 = Expect<Equal<ParseQuery<"name=Ada+Lovelace">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ParseQuery<"name=Ada%20Lovelace">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ParseQuery<"a=1" | "b=2">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ParseQuery<string>, TODO>>; // TODO(koan) @koan-error
