import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-087: query-string parser — constructions
 * =============================================================================
 *
 * These constructions assemble a raw query-string grammar from constrained
 * scalar parsing, entry parsing, ampersand recursion, and an explicit
 * right-biased merge. They cover leading question marks, bare flags, ignored
 * empty fields and keys, first-equals capture, duplicate overwrites, literal
 * unions, broad and special inputs, and the deliberate choice not to decode
 * percent escapes or plus signs. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenQueryValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;

type GivenNumber<Text extends string> =
  Text extends `${infer Value extends number}` ? Value : never;

type GivenBigInt<Text extends string> =
  Text extends `${infer Digits}n`
    ? Digits extends `${infer Value extends bigint}`
      ? Value
      : never
    : never;

type GivenScalar<Text extends string> =
  Text extends "true"
    ? true
    : Text extends "false"
      ? false
      : Text extends "null"
        ? null
        : Text extends "undefined"
          ? undefined
          : GivenBigInt<Text> extends never
            ? GivenNumber<Text> extends never
              ? Text
              : GivenNumber<Text>
            : GivenBigInt<Text>;

type GivenExpand<Object> = {
  [Key in keyof Object]: Object[Key];
};

type GivenMerge<Left, Right> =
  GivenExpand<Omit<Left, keyof Right> & Right>;

type GivenEntry<Entry extends string> =
  Entry extends ""
    ? {}
    : Entry extends `${infer Key}=${infer Value}`
      ? Key extends ""
        ? {}
        : { [Name in Key]: GivenScalar<Value> }
      : { [Name in Entry]: true };

type GivenBody<Body extends string> =
  string extends Body
    ? Record<string, GivenQueryValue>
    : Body extends `${infer Head}&${infer Tail}`
      ? GivenMerge<GivenEntry<Head>, GivenBody<Tail>>
      : GivenEntry<Body>;

type GivenQuery<Text extends string> =
  Text extends unknown
    ? string extends Text
      ? Record<string, GivenQueryValue>
      : Text extends `?${infer Body}`
        ? GivenBody<Body>
        : GivenBody<Text>
    : never;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

// ─── Scalar and merge primitives ───────────────────────────────────────

// 1. Build the complete value domain declared by the raw query grammar.
export type QueryScalarDomain = TODO; // TODO(koan)

type _01a = Expect<Equal<QueryScalarDomain, GivenQueryValue>>;
type _01b = Expect<
  Equal<
    Extract<QueryScalarDomain, string | number | bigint>,
    string | number | bigint
  >
>;
type _01c = Expect<
  Equal<
    Extract<QueryScalarDomain, boolean | null | undefined>,
    boolean | null | undefined
  >
>;
type _01d = Expect<
  Equal<
    Exclude<
      QueryScalarDomain,
      string | number | bigint | boolean | null | undefined
    >,
    never
  >
>;
type _01e = Expect<Equal<GivenIsAny<QueryScalarDomain>, false>>;

// 2. Infer a number from fully numeric text and reject nonnumeric text.
export type ParseQueryNumber<Text extends string> = TODO; // TODO(koan)

type _02a = Expect<Equal<ParseQueryNumber<"42">, 42>>;
type _02b = Expect<Equal<ParseQueryNumber<"-3.5">, -3.5>>;
type _02c = Expect<Equal<ParseQueryNumber<"01">, number>>;
type _02d = Expect<
  Equal<ParseQueryNumber<"1" | "2" | "x">, 1 | 2>
>;
type _02e = Expect<
  Equal<ParseQueryNumber<"" | "NaN" | "Infinity">, never>
>;

// 3. Require an `n` suffix and infer a canonical bigint literal from its digits.
export type ParseQueryBigInt<Text extends string> = TODO; // TODO(koan)

type _03a = Expect<Equal<ParseQueryBigInt<"42n">, 42n>>;
type _03b = Expect<Equal<ParseQueryBigInt<"-42n">, -42n>>;
type _03c = Expect<Equal<ParseQueryBigInt<"42">, never>>;
type _03d = Expect<
  Equal<ParseQueryBigInt<"01n" | "3.14n" | "n">, never>
>;
type _03e = Expect<
  Equal<ParseQueryBigInt<"1n" | "2n">, 1n | 2n>
>;

// 4. Parse reserved words, bigint, number, then unchanged fallback text in order.
export type ParseQueryScalar<Text extends string> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    ParseQueryScalar<"true" | "false" | "null" | "undefined">,
    boolean | null | undefined
  >
>;
type _04b = Expect<
  Equal<ParseQueryScalar<"42n" | "-42n">, 42n | -42n>
>;
type _04c = Expect<
  Equal<ParseQueryScalar<"42" | "-3.5" | "01">, 42 | -3.5 | number>
>;
type _04d = Expect<
  Equal<
    ParseQueryScalar<"Ada" | "TRUE" | "NaN" | "">,
    "Ada" | "TRUE" | "NaN" | ""
  >
>;
type _04e = Expect<
  Equal<
    ParseQueryScalar<"true" | "42n" | "42" | "raw">,
    true | 42n | 42 | "raw"
  >
>;

// 5. Merge two object types so right-side keys overwrite left-side keys.
export type OverwriteMerge<Left, Right> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<OverwriteMerge<{ a: 1 }, { b: 2 }>, { a: 1; b: 2 }>
>;
type _05b = Expect<
  Equal<OverwriteMerge<{ a: 1 }, { a: 2 }>, { a: 2 }>
>;
type _05c = Expect<
  Equal<
    OverwriteMerge<{ a: 1; b: 2 }, { a: 3; c: 4 }>,
    { b: 2; a: 3; c: 4 }
  >
>;
type _05d = Expect<
  Equal<
    OverwriteMerge<{ readonly keep: 1; old?: 2 }, { old: 3 }>,
    { readonly keep: 1; old: 3 }
  >
>;
type _05e = Expect<
  Equal<
    OverwriteMerge<{ a: 1 }, { readonly b?: 2 }>,
    { a: 1; readonly b?: 2 }
  >
>;

// ─── Entry, body, and query construction ───────────────────────────────

// 6. Parse one query entry into a scalar property, flag, or ignored empty object.
export type ParseQueryEntry<Entry extends string> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<ParseQueryEntry<"name=Ada">, { name: "Ada" }>
>;
type _06b = Expect<
  Equal<
    ParseQueryEntry<"count=42" | "limit=42n" | "enabled=false">,
    { count: 42 } | { limit: 42n } | { enabled: false }
  >
>;
type _06c = Expect<Equal<ParseQueryEntry<"debug">, { debug: true }>>;
type _06d = Expect<Equal<ParseQueryEntry<"" | "=ignored">, {}>>;
type _06e = Expect<
  Equal<
    ParseQueryEntry<"a=b=c" | "name=">,
    { a: "b=c" } | { name: "" }
  >
>;

// 7. Recursively parse an ampersand body and let later entries overwrite earlier ones.
export type ParseQueryBody<Body extends string> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<ParseQueryBody<"name=Ada">, { name: "Ada" }>
>;
type _07b = Expect<
  Equal<
    ParseQueryBody<"name=Ada&count=42&enabled=true">,
    { name: "Ada"; count: 42; enabled: true }
  >
>;
type _07c = Expect<
  Equal<ParseQueryBody<"a=1&a=2">, { a: 2 }>
>;
type _07d = Expect<
  Equal<ParseQueryBody<"&&=ignored&ok=1&">, { ok: 1 }>
>;
type _07e = Expect<
  Equal<ParseQueryBody<string>, Record<string, GivenQueryValue>>
>;

// 8. Parse an optional leading question mark and distribute literal query unions.
export type ParseQuery<Text extends string> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<ParseQuery<"?name=Ada&count=42">, { name: "Ada"; count: 42 }>
>;
type _08b = Expect<
  Equal<ParseQuery<"debug&limit=42n">, { debug: true; limit: 42n }>
>;
type _08c = Expect<Equal<ParseQuery<"?">, {}>>;
type _08d = Expect<
  Equal<ParseQuery<"a=1" | "b=2">, { a: 1 } | { b: 2 }>
>;
type _08e = Expect<
  Equal<ParseQuery<string>, Record<string, GivenQueryValue>>
>;

// 9. Parse each query entry in a tuple while preserving tuple readonlyness.
export type ParseQueryEntryTuple<Entries extends readonly string[]> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    ParseQueryEntryTuple<["name=Ada", "count=42", "debug"]>,
    [{ name: "Ada" }, { count: 42 }, { debug: true }]
  >
>;
type _09b = Expect<
  Equal<
    ParseQueryEntryTuple<readonly ["limit=42n", "empty=null"]>,
    readonly [{ limit: 42n }, { empty: null }]
  >
>;
type _09c = Expect<Equal<ParseQueryEntryTuple<[]>, []>>;
type _09d = Expect<
  Equal<ParseQueryEntryTuple<["", "=ignored"]>, [{}, {}]>
>;
type _09e = Expect<
  Equal<
    ParseQueryEntryTuple<["a=b=c", "name="]>,
    [{ a: "b=c" }, { name: "" }]
  >
>;

// 10. Collect every key present in each alternative of a query union.
export type QueryKeys<Text extends string> = TODO; // TODO(koan)

type _10a = Expect<Equal<QueryKeys<"name=Ada">, "name">>;
type _10b = Expect<
  Equal<QueryKeys<"a=1&b=2&c=3">, "a" | "b" | "c">
>;
type _10c = Expect<
  Equal<QueryKeys<"a=1" | "b=2">, "a" | "b">
>;
type _10d = Expect<Equal<QueryKeys<"" | "?">, never>>;
type _10e = Expect<Equal<QueryKeys<string>, string>>;

// ─── Grammar policies and failure modes ────────────────────────────────

// 11. Describe first-equals capture and empty-side behavior for representative entries.
export type EntryDelimiterProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<EntryDelimiterProfile["several"], { a: "b=c" }>
>;
type _11b = Expect<
  Equal<EntryDelimiterProfile["doubleEquals"], { a: "=" }>
>;
type _11c = Expect<
  Equal<EntryDelimiterProfile["emptyValue"], { name: "" }>
>;
type _11d = Expect<Equal<EntryDelimiterProfile["emptyKey"], {}>>;
type _11e = Expect<
  Equal<EntryDelimiterProfile["flag"], { debug: true }>
>;

// 12. Describe empty body components, including a leading question mark alone.
export type EmptyQueryProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<EmptyQueryProfile["empty"], {}>>;
type _12b = Expect<Equal<EmptyQueryProfile["question"], {}>>;
type _12c = Expect<Equal<EmptyQueryProfile["ampersand"], {}>>;
type _12d = Expect<Equal<EmptyQueryProfile["repeated"], {}>>;
type _12e = Expect<
  Equal<EmptyQueryProfile["aroundValue"], { a: 1 }>
>;

// 13. Show the final value selected by several duplicate-key sequences.
export type DuplicateQueryProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<DuplicateQueryProfile["number"], { a: 2 }>
>;
type _13b = Expect<
  Equal<DuplicateQueryProfile["changeKind"], { a: true }>
>;
type _13c = Expect<
  Equal<DuplicateQueryProfile["flagThenValue"], { flag: false }>
>;
type _13d = Expect<
  Equal<DuplicateQueryProfile["valueThenFlag"], { flag: true }>
>;
type _13e = Expect<
  Equal<DuplicateQueryProfile["interleaved"], { a: 3; b: 2 }>
>;

// 14. Contrast right-biased overwrite results with conflicting intersections.
export type MergePolicyProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<MergePolicyProfile["overwriteNumber"], { a: 2 }>
>;
type _14b = Expect<
  Equal<MergePolicyProfile["overwriteKind"], { a: true }>
>;
type _14c = Expect<
  Equal<MergePolicyProfile["intersectionValue"], never>
>;
type _14d = Expect<
  Equal<MergePolicyProfile["disjoint"], { a: 1; b: 2 }>
>;
type _14e = Expect<
  Equal<MergePolicyProfile["threeKeys"], { a: 1; b: 3; c: 4 }>
>;

// 15. Preserve percent escapes and plus signs as raw key and value text.
export type RawEncodingProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<RawEncodingProfile["plusValue"], { name: "Ada+Lovelace" }>
>;
type _15b = Expect<
  Equal<RawEncodingProfile["escapedSpace"], { name: "Ada%20Lovelace" }>
>;
type _15c = Expect<
  Equal<RawEncodingProfile["escapedSlash"], { path: "a%2Fb" }>
>;
type _15d = Expect<
  Equal<RawEncodingProfile["escapedKey"], { "encoded%20key": "value" }>
>;
type _15e = Expect<
  Equal<RawEncodingProfile["mixed"], { q: "a+b"; path: "x%2Fy" }>
>;

// 16. Show widening for noncanonical numeric text and fallback for rejected text.
export type QueryNumericProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<QueryNumericProfile["leadingZero"], { x: number }>
>;
type _16b = Expect<
  Equal<QueryNumericProfile["exponent"], { x: number }>
>;
type _16c = Expect<Equal<QueryNumericProfile["hex"], { x: number }>>;
type _16d = Expect<Equal<QueryNumericProfile["nan"], { x: "NaN" }>>;
type _16e = Expect<
  Equal<
    QueryNumericProfile["mixed"],
    { x: 42n; y: -3.5; z: "Infinity" }
  >
>;

// ─── Union, broad, and special boundaries ──────────────────────────────

// 17. Preserve alternative object shapes when literal query text is a union.
export type QueryUnionProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<QueryUnionProfile["disjoint"], { a: 1 } | { b: 2 }>
>;
type _17b = Expect<
  Equal<QueryUnionProfile["shared"], { a: 1 } | { a: 2 }>
>;
type _17c = Expect<
  Equal<QueryUnionProfile["flag"], { a: 1 } | { debug: true }>
>;
type _17d = Expect<
  Equal<QueryUnionProfile["empty"], { a: 1 } | {}>
>;
type _17e = Expect<
  Equal<QueryUnionProfile["prefixed"], { a: 1 } | { b: 2 }>
>;

// 18. Describe broad entry, body, query, and structurally framed text behavior.
export type BroadQueryProfile = TODO; // TODO(koan)

type _18a = Expect<
  Equal<BroadQueryProfile["entry"], Record<string, true>>
>;
type _18b = Expect<
  Equal<BroadQueryProfile["body"], Record<string, GivenQueryValue>>
>;
type _18c = Expect<
  Equal<BroadQueryProfile["query"], Record<string, GivenQueryValue>>
>;
type _18d = Expect<
  Equal<BroadQueryProfile["framed"], Record<string, string>>
>;
type _18e = Expect<
  Equal<BroadQueryProfile["prefixed"], Record<string, GivenQueryValue>>
>;

// 19. Classify never and any at each public parsing boundary without returning any.
export type SpecialQueryProfile<Text extends string> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<SpecialQueryProfile<never>, [false, true, false, true, false, true]>
>;
type _19b = Expect<
  Equal<SpecialQueryProfile<any>, [false, false, false, false, false, false]>
>;
type _19c = Expect<
  Equal<SpecialQueryProfile<string>, [false, false, false, false, false, false]>
>;
type _19d = Expect<
  Equal<SpecialQueryProfile<"">, [false, false, false, false, false, false]>
>;
type _19e = Expect<
  Equal<
    SpecialQueryProfile<`${string}=${string}`>,
    [false, false, false, false, false, false]
  >
>;

// 20. Build one view of the scalar, entry, body, and complete query interpretations.
export type QuerySummary<Text extends string> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    QuerySummary<"count=42">,
    {
      scalar: "count=42";
      entry: { count: 42 };
      body: { count: 42 };
      query: { count: 42 };
      keys: "count";
    }
  >
>;
type _20b = Expect<
  Equal<QuerySummary<"debug">["entry" | "query"], { debug: true }>
>;
type _20c = Expect<
  Equal<
    QuerySummary<"a=1&a=2">["body" | "query"],
    { a: 2 }
  >
>;
type _20d = Expect<
  Equal<QuerySummary<"?a=1">["query" | "keys"], { a: 1 } | "a">
>;
type _20e = Expect<
  Equal<
    QuerySummary<string>["query"],
    Record<string, GivenQueryValue>
  >
>;
