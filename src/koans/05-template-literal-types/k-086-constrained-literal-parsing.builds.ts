import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-086: constrained literal parsing — constructions
 * =============================================================================
 *
 * These constructions use constrained template inference to recognize number,
 * bigint, and boolean candidates, then layer explicit scalar precedence and
 * `key=value` parsing. They distinguish canonical literals from widened
 * primitive candidates, require the bigint suffix, preserve fallback text,
 * retain field correlation, and cover unions, broad strings, any, never, and
 * delimiter ambiguity. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenNumber<Text extends string> =
  Text extends `${infer Value extends number}` ? Value : never;

type GivenBigInt<Text extends string> =
  Text extends `${infer Digits}n`
    ? Digits extends `${infer Value extends bigint}`
      ? Value
      : never
    : never;

type GivenBoolean<Text extends string> =
  Text extends `${infer Value extends boolean}` ? Value : never;

type GivenNullish<Text extends string> =
  Text extends "null"
    ? null
    : Text extends "undefined"
      ? undefined
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

type GivenField<Text extends string> =
  Text extends `${infer Key}=${infer Value}`
    ? { key: Key; value: GivenScalar<Value> }
    : never;

type GivenScalarKind<Text extends string> =
  Text extends unknown
    ? Text extends "true" | "false"
      ? "boolean"
      : Text extends "null"
        ? "null"
        : Text extends "undefined"
          ? "undefined"
          : GivenBigInt<Text> extends never
            ? GivenNumber<Text> extends never
              ? "string"
              : "number"
            : "bigint"
    : never;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

// ─── Constrained primitive recognizers ──────────────────────────────────

// 1. Infer a numeric literal or broad number from fully numeric text.
export type ParseNumber<Text extends string> = TODO; // TODO(koan)

type _01a = Expect<Equal<ParseNumber<"42">, 42>>;
type _01b = Expect<Equal<ParseNumber<"-3.5">, -3.5>>;
type _01c = Expect<Equal<ParseNumber<"0">, 0>>;
type _01d = Expect<
  Equal<ParseNumber<"1" | "2" | "x">, 1 | 2>
>;
type _01e = Expect<
  Equal<ParseNumber<"" | "NaN" | "Infinity" | "not-number">, never>
>;

// 2. Require an `n` suffix, then infer a bigint candidate from its digits.
export type ParseBigInt<Text extends string> = TODO; // TODO(koan)

type _02a = Expect<Equal<ParseBigInt<"42n">, 42n>>;
type _02b = Expect<Equal<ParseBigInt<"-42n">, -42n>>;
type _02c = Expect<Equal<ParseBigInt<"42">, never>>;
type _02d = Expect<Equal<ParseBigInt<"3.14n" | "xn" | "n">, never>>;
type _02e = Expect<
  Equal<ParseBigInt<"1n" | "2n">, 1n | 2n>
>;

// 3. Infer exactly the two lowercase boolean literal spellings.
export type ParseBoolean<Text extends string> = TODO; // TODO(koan)

type _03a = Expect<Equal<ParseBoolean<"true">, true>>;
type _03b = Expect<Equal<ParseBoolean<"false">, false>>;
type _03c = Expect<Equal<ParseBoolean<"true" | "false">, boolean>>;
type _03d = Expect<Equal<ParseBoolean<"true" | "x">, true>>;
type _03e = Expect<Equal<ParseBoolean<"TRUE" | "0" | string>, never>>;

// 4. Parse the two explicit nullish words and reject every other spelling.
export type ParseNullish<Text extends string> = TODO; // TODO(koan)

type _04a = Expect<Equal<ParseNullish<"null">, null>>;
type _04b = Expect<Equal<ParseNullish<"undefined">, undefined>>;
type _04c = Expect<
  Equal<ParseNullish<"null" | "undefined">, null | undefined>
>;
type _04d = Expect<Equal<ParseNullish<"NULL" | "void" | "">, never>>;
type _04e = Expect<Equal<ParseNullish<never>, never>>;

// ─── Ordered scalar and field parsing ───────────────────────────────────

// 5. Parse reserved words, suffixed bigint, number, then fallback text in order.
export type ParseScalar<Text extends string> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<ParseScalar<"true" | "false" | "null" | "undefined">, boolean | null | undefined>
>;
type _05b = Expect<Equal<ParseScalar<"42n" | "-42n">, 42n | -42n>>;
type _05c = Expect<Equal<ParseScalar<"42" | "-3.5">, 42 | -3.5>>;
type _05d = Expect<
  Equal<ParseScalar<"hello" | "TRUE" | "NaN" | "">, "hello" | "TRUE" | "NaN" | "">
>;
type _05e = Expect<
  Equal<ParseScalar<"true" | "42n" | "42" | "x">, true | 42n | 42 | "x">
>;

// 6. Parse the first equals-delimited key and scalar value into an object.
export type ParseField<Text extends string> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<ParseField<"count=42">, { key: "count"; value: 42 }>
>;
type _06b = Expect<
  Equal<ParseField<"enabled=true">, { key: "enabled"; value: true }>
>;
type _06c = Expect<
  Equal<ParseField<"name=Ada">, { key: "name"; value: "Ada" }>
>;
type _06d = Expect<
  Equal<ParseField<"a=b=c">, { key: "a"; value: "b=c" }>
>;
type _06e = Expect<Equal<ParseField<"missing-delimiter">, never>>;

// 7. Parse a field into a correlated key and scalar-value tuple.
export type ParseFieldTuple<Text extends string> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<ParseFieldTuple<"count=42">, [key: "count", value: 42]>
>;
type _07b = Expect<
  Equal<ParseFieldTuple<"limit=42n">, [key: "limit", value: 42n]>
>;
type _07c = Expect<
  Equal<ParseFieldTuple<"=null">, [key: "", value: null]>
>;
type _07d = Expect<
  Equal<ParseFieldTuple<"name=">, [key: "name", value: ""]>
>;
type _07e = Expect<
  Equal<
    ParseFieldTuple<"a=1" | "b=false">,
    [key: "a", value: 1] | [key: "b", value: false]
  >
>;

// 8. Classify the precedence branch selected for each scalar text member.
export type ScalarKind<Text extends string> = TODO; // TODO(koan)

type _08a = Expect<Equal<ScalarKind<"true" | "false">, "boolean">>;
type _08b = Expect<Equal<ScalarKind<"null" | "undefined">, "null" | "undefined">>;
type _08c = Expect<Equal<ScalarKind<"42n">, "bigint">>;
type _08d = Expect<Equal<ScalarKind<"42" | "01">, "number">>;
type _08e = Expect<
  Equal<ScalarKind<"true" | "42n" | "42" | "x">, "boolean" | "bigint" | "number" | "string">
>;

// ─── Parsing collections ────────────────────────────────────────────────

// 9. Parse every member of a string tuple while preserving tuple readonlyness.
export type ParseScalarTuple<Values extends readonly string[]> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ParseScalarTuple<["true", "42", "42n", "x"]>, [true, 42, 42n, "x"]>
>;
type _09b = Expect<
  Equal<ParseScalarTuple<readonly ["null", "undefined"]>, readonly [null, undefined]>
>;
type _09c = Expect<Equal<ParseScalarTuple<[]>, []>>;
type _09d = Expect<Equal<ParseScalarTuple<string[]>, string[]>>;
type _09e = Expect<
  Equal<ParseScalarTuple<["01", "NaN", ""]>, [number, "NaN", ""]>
>;

// 10. Map a union of fields to parsed values keyed by each captured field key.
type GivenFieldKey<Field extends string> =
  GivenField<Field> extends infer Parsed
    ? Parsed extends { key: infer Key extends PropertyKey }
      ? Key
      : never
    : never;

type GivenFieldValue<Field extends string> =
  GivenField<Field> extends infer Parsed
    ? Parsed extends { value: infer Value }
      ? Value
      : never
    : never;

export type ParsedFieldMap<Fields extends string> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    ParsedFieldMap<"count=42" | "enabled=true" | "name=Ada">,
    { count: 42; enabled: true; name: "Ada" }
  >
>;
type _10b = Expect<
  Equal<ParsedFieldMap<"limit=42n" | "empty=null">, { limit: 42n; empty: null }>
>;
type _10c = Expect<
  Equal<ParsedFieldMap<"missing" | "a=1">, { a: 1 }>
>;
type _10d = Expect<
  Equal<ParsedFieldMap<"x=1" | "x=2">, { x: 1 | 2 }>
>;
type _10e = Expect<Equal<ParsedFieldMap<never>, {}>>;

// ─── Candidate precision and precedence profiles ────────────────────────

// 11. Describe exact numeric literals produced by canonical spellings.
export type CanonicalNumberProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<CanonicalNumberProfile["zero"], 0>>;
type _11b = Expect<Equal<CanonicalNumberProfile["positive"], 42>>;
type _11c = Expect<Equal<CanonicalNumberProfile["negative"], -42>>;
type _11d = Expect<Equal<CanonicalNumberProfile["decimal"], 3.14>>;
type _11e = Expect<Equal<CanonicalNumberProfile["negativeDecimal"], -0.5>>;

// 12. Describe accepted noncanonical numbers and rejected numeric-looking text.
export type NonCanonicalNumberProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    Pick<NonCanonicalNumberProfile, "leadingZero" | "exponent" | "hex">,
    { leadingZero: number; exponent: number; hex: number }
  >
>;
type _12b = Expect<
  Equal<
    Pick<NonCanonicalNumberProfile, "leadingSpace" | "trailingSpace">,
    { leadingSpace: number; trailingSpace: number }
  >
>;
type _12c = Expect<
  Equal<NonCanonicalNumberProfile["negativeZero"], number>
>;
type _12d = Expect<Equal<NonCanonicalNumberProfile["nan"], never>>;
type _12e = Expect<Equal<NonCanonicalNumberProfile["infinity"], never>>;

// 13. Describe canonical, noncanonical, missing, and invalid bigint suffix forms.
export type BigIntCandidateProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<BigIntCandidateProfile["zero"], 0n>>;
type _13b = Expect<Equal<BigIntCandidateProfile["positive"], 42n>>;
type _13c = Expect<Equal<BigIntCandidateProfile["negative"], -42n>>;
type _13d = Expect<
  Equal<BigIntCandidateProfile["leadingZero"], never>
>;
type _13e = Expect<
  Equal<
    Pick<BigIntCandidateProfile, "missingSuffix" | "decimal" | "emptyDigits">,
    { missingSuffix: never; decimal: never; emptyDigits: never }
  >
>;

// 14. Expose the selected kind and result for representative precedence cases.
export type ScalarPrecedenceProfile<Text extends string> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    ScalarPrecedenceProfile<"true">,
    { kind: "boolean"; value: true; numberCandidate: never; bigintCandidate: never; booleanCandidate: true }
  >
>;
type _14b = Expect<
  Equal<
    ScalarPrecedenceProfile<"42n">,
    { kind: "bigint"; value: 42n; numberCandidate: never; bigintCandidate: 42n; booleanCandidate: never }
  >
>;
type _14c = Expect<
  Equal<
    ScalarPrecedenceProfile<"42">,
    { kind: "number"; value: 42; numberCandidate: 42; bigintCandidate: never; booleanCandidate: never }
  >
>;
type _14d = Expect<
  Equal<ScalarPrecedenceProfile<"NaN">["value"], "NaN">
>;
type _14e = Expect<
  Equal<ScalarPrecedenceProfile<"">["kind"], "string">
>;

// 15. Pin empty captures and first-equals behavior in field parsing.
export type FieldDelimiterProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<FieldDelimiterProfile["emptyKey"], { key: ""; value: 42 }>
>;
type _15b = Expect<
  Equal<FieldDelimiterProfile["emptyValue"], { key: "name"; value: "" }>
>;
type _15c = Expect<
  Equal<FieldDelimiterProfile["several"], { key: "a"; value: "b=c" }>
>;
type _15d = Expect<Equal<FieldDelimiterProfile["missing"], never>>;
type _15e = Expect<
  Equal<
    FieldDelimiterProfile["union"],
    { key: "a"; value: 1 } | { key: "b"; value: 2 }
  >
>;

// ─── Broad and special inputs ───────────────────────────────────────────

// 16. Describe broad scalar and structurally framed broad field parsing.
export type BroadParserProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<BroadParserProfile["number"], never>>;
type _16b = Expect<Equal<BroadParserProfile["bigint"], never>>;
type _16c = Expect<Equal<BroadParserProfile["boolean"], never>>;
type _16d = Expect<
  Equal<Pick<BroadParserProfile, "scalar" | "field">, { scalar: string; field: never }>
>;
type _16e = Expect<
  Equal<BroadParserProfile["framedField"], { key: string; value: string }>
>;

// 17. Classify scalar, numeric, and field parsing over special inputs safely.
export type ParserSpecialProfile<Text extends string> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<ParserSpecialProfile<any>, [true, false, false, true, false, false]>
>;
type _17b = Expect<
  Equal<ParserSpecialProfile<never>, [false, true, false, true, false, true]>
>;
type _17c = Expect<
  Equal<ParserSpecialProfile<string>, [false, false, false, true, false, true]>
>;
type _17d = Expect<
  Equal<ParserSpecialProfile<"x">, [false, false, false, true, false, true]>
>;
type _17e = Expect<
  Equal<
    ParserSpecialProfile<`${string}=${string}`>,
    [false, false, false, true, false, false]
  >
>;

// 18. Build one reusable view of every parser result for a text input.
export type ParserSummary<Text extends string> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    ParserSummary<"42">,
    {
      text: "42";
      number: 42;
      bigint: never;
      boolean: never;
      nullish: never;
      scalar: 42;
      kind: "number";
      field: never;
    }
  >
>;
type _18b = Expect<
  Equal<ParserSummary<"42n">["scalar" | "kind"], 42n | "bigint">
>;
type _18c = Expect<
  Equal<ParserSummary<"null">["nullish" | "scalar"], null>
>;
type _18d = Expect<
  Equal<
    ParserSummary<"count=42">["field"],
    { key: "count"; value: 42 }
  >
>;
type _18e = Expect<
  Equal<ParserSummary<"hello">["scalar" | "kind"], "hello" | "string">
>;
