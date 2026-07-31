import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-067: constrained infer — constructions
 * =============================================================================
 *
 * These constructions combine capture and validation for tuple positions,
 * properties, returns, arrays, promises, and template-literal text. They show
 * that inline constraints filter rather than coerce, distributed union members
 * are tested independently, and textual primitive recognition can preserve a
 * literal, widen to a primitive, or reject a spelling. Replace each `TODO`
 * with a type satisfying the assertions directly below it.
 */

declare const givenToken: unique symbol;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;
type GivenNumber<Text> =
  Text extends `${infer Value extends number}` ? Value : never;
type GivenBigInt<Text> =
  Text extends `${infer Value extends bigint}` ? Value : never;
type GivenBoolean<Text> =
  Text extends `${infer Value extends boolean}` ? Value : never;
type GivenCaptureKind<Value, Constraint> =
  GivenIsAny<Value> extends true
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? "unknown"
        : Value extends Constraint
          ? "constraint"
          : "other";

// ─── Constrained structural captures ─────────────────────────────────────

// 1. Capture a required tuple head only when it is a string.
export type StringHead<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<StringHead<["name", 1]>, "name">>;
type _01b = Expect<
  Equal<StringHead<readonly [string, boolean]>, string>
>;
type _01c = Expect<Equal<StringHead<[42, "name"]>, never>>;
type _01d = Expect<Equal<StringHead<[]>, never>>;
type _01e = Expect<
  Equal<StringHead<["a", 1] | [2, "b"] | ["c"]>, "a" | "c">
>;

// 2. Rebuild the same string-head filter as capture followed by a nested test.
export type TwoStageStringHead<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<TwoStageStringHead<["a", 1]>, "a">>;
type _02b = Expect<Equal<TwoStageStringHead<[1, "a"]>, never>>;
type _02c = Expect<
  Equal<TwoStageStringHead<["a"] | ["b"]>, "a" | "b">
>;
type _02d = Expect<
  Equal<TwoStageStringHead<["a"] | [1]>, "a">
>;
type _02e = Expect<Equal<TwoStageStringHead<string[]>, never>>;

// 3. Capture a required tuple tail only when it is a number.
export type NumberTail<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<NumberTail<["a", 1]>, 1>>;
type _03b = Expect<Equal<NumberTail<[1, 2, 3]>, 3>>;
type _03c = Expect<Equal<NumberTail<[1, "x"]>, never>>;
type _03d = Expect<Equal<NumberTail<[]>, never>>;
type _03e = Expect<
  Equal<NumberTail<[1, 2] | ["x", "y"] | [true, 3]>, 2 | 3>
>;

// 4. Capture an exact pair only when its positions are string then number.
export type StringNumberPair<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<StringNumberPair<["items", 3]>, ["items", 3]>
>;
type _04b = Expect<
  Equal<StringNumberPair<readonly [string, number]>, [string, number]>
>;
type _04c = Expect<Equal<StringNumberPair<[1, "items"]>, never>>;
type _04d = Expect<Equal<StringNumberPair<["items", 3, true]>, never>>;
type _04e = Expect<
  Equal<
    StringNumberPair<["a", 1] | ["b", 2] | [3, "c"]>,
    ["a", 1] | ["b", 2]
  >
>;

// 5. Capture a required keyed property only when its value is a string.
export type StringProperty<
  Value,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<StringProperty<{ id: "user-1" }, "id">, "user-1">
>;
type _05b = Expect<
  Equal<StringProperty<{ readonly id: string }, "id">, string>
>;
type _05c = Expect<
  Equal<StringProperty<{ id: number }, "id">, never>
>;
type _05d = Expect<
  Equal<StringProperty<{ id?: string }, "id">, never>
>;
type _05e = Expect<
  Equal<
    StringProperty<
      { value: "a" } | { value: 1 } | { value: "b" },
      "value"
    >,
    "a" | "b"
  >
>;

// 6. Infer only string-domain keys from a required record shape.
export type LiteralStringKeys<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<LiteralStringKeys<{ id: number }>, "id">>;
type _06b = Expect<Equal<LiteralStringKeys<{ 0: string }>, string>>;
type _06c = Expect<
  Equal<LiteralStringKeys<Record<string, boolean>>, string>
>;
type _06d = Expect<
  Equal<
    LiteralStringKeys<{ id: number; 0: string; [givenToken]: Date }>,
    string
  >
>;
type _06e = Expect<
  Equal<LiteralStringKeys<{ id?: number }>, never>
>;

// 7. Capture a callable result only when that result is numeric.
export type NumberResult<Value> = TODO; // TODO(koan)

type _07a = Expect<Equal<NumberResult<() => 42>, 42>>;
type _07b = Expect<
  Equal<NumberResult<(text: string) => number>, number>
>;
type _07c = Expect<Equal<NumberResult<() => string>, never>>;
type _07d = Expect<
  Equal<NumberResult<(() => 1) | (() => "x") | (() => 2)>, 1 | 2>
>;
type _07e = Expect<Equal<NumberResult<unknown>, never>>;

// 8. Capture a numeric result or contribute a chosen failure type.
export type NumberResultOr<Value, Fallback> = TODO; // TODO(koan)

type _08a = Expect<Equal<NumberResultOr<() => 1, "invalid">, 1>>;
type _08b = Expect<
  Equal<NumberResultOr<() => string, "invalid">, "invalid">
>;
type _08c = Expect<
  Equal<
    NumberResultOr<(() => 1) | (() => "x"), "invalid">,
    1 | "invalid"
  >
>;
type _08d = Expect<
  Equal<NumberResultOr<number, null>, null>
>;
type _08e = Expect<
  Equal<NumberResultOr<never, null>, never>
>;

// 9. Capture one array element candidate only when the whole candidate is string.
export type StringArrayElement<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<StringArrayElement<string[]>, string>>;
type _09b = Expect<
  Equal<StringArrayElement<readonly ["a", "b"]>, "a" | "b">
>;
type _09c = Expect<
  Equal<StringArrayElement<readonly ["a", 1]>, never>
>;
type _09d = Expect<Equal<StringArrayElement<readonly []>, never>>;
type _09e = Expect<
  Equal<StringArrayElement<string[] | number[]>, string>
>;

// 10. Capture one promise-like value constrained to string or number.
export type ScalarPromiseValue<Value> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<ScalarPromiseValue<Promise<"ready">>, "ready">
>;
type _10b = Expect<
  Equal<ScalarPromiseValue<Promise<number>>, number>
>;
type _10c = Expect<
  Equal<ScalarPromiseValue<Promise<boolean>>, never>
>;
type _10d = Expect<
  Equal<
    ScalarPromiseValue<Promise<1> | Promise<"a"> | Promise<Date>>,
    1 | "a"
  >
>;
type _10e = Expect<
  Equal<ScalarPromiseValue<Promise<Promise<string>>>, never>
>;

// ─── Numeric template recognition ────────────────────────────────────────

// 11. Interpret canonical numeric text as a literal numeric type.
export type ParseNumber<Text> = TODO; // TODO(koan)

type _11a = Expect<Equal<ParseNumber<"0">, 0>>;
type _11b = Expect<Equal<ParseNumber<"42">, 42>>;
type _11c = Expect<Equal<ParseNumber<"-3.5">, -3.5>>;
type _11d = Expect<Equal<ParseNumber<"forty-two">, never>>;
type _11e = Expect<
  Equal<ParseNumber<"1" | "2" | "x">, 1 | 2>
>;

// 12. Distinguish failed, widened, and literal numeric recognition.
export type NumberParseProfile<Text> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<NumberParseProfile<"42">, [false, false, 42]>
>;
type _12b = Expect<
  Equal<NumberParseProfile<"01">, [false, true, number]>
>;
type _12c = Expect<
  Equal<NumberParseProfile<"1e3">, [false, true, number]>
>;
type _12d = Expect<
  Equal<NumberParseProfile<" 1">, [false, true, number]>
>;
type _12e = Expect<
  Equal<NumberParseProfile<"NaN">, [true, false, never]>
>;

// 13. Accept numeric text only when the inferred value round-trips canonically.
export type CanonicalNumber<Text> = TODO; // TODO(koan)

type _13a = Expect<Equal<CanonicalNumber<"42">, 42>>;
type _13b = Expect<Equal<CanonicalNumber<"0x10">, never>>;
type _13c = Expect<Equal<CanonicalNumber<"1 ">, never>>;
type _13d = Expect<Equal<CanonicalNumber<"">, never>>;
type _13e = Expect<Equal<CanonicalNumber<"Infinity">, never>>;

// 14. Return recognized numeric text or an explicit fallback.
export type ParsedNumberOr<Text, Fallback> = TODO; // TODO(koan)

type _14a = Expect<Equal<ParsedNumberOr<"7", null>, 7>>;
type _14b = Expect<Equal<ParsedNumberOr<"x", null>, null>>;
type _14c = Expect<
  Equal<ParsedNumberOr<"1" | "x" | "2", "invalid">, 1 | 2 | "invalid">
>;
type _14d = Expect<Equal<ParsedNumberOr<string, false>, false>>;
type _14e = Expect<Equal<ParsedNumberOr<never, false>, never>>;

// 15. Parse two comma-separated canonical numeric fields independently.
export type ParseNumberPair<Text> = TODO; // TODO(koan)

type _15a = Expect<Equal<ParseNumberPair<"1,2">, [1, 2]>>;
type _15b = Expect<
  Equal<ParseNumberPair<"-3.5,0">, [-3.5, 0]>
>;
type _15c = Expect<Equal<ParseNumberPair<"1,x">, never>>;
type _15d = Expect<Equal<ParseNumberPair<"1,2,3">, never>>;
type _15e = Expect<
  Equal<ParseNumberPair<"1,2" | "3,4" | "x,5">, [1, 2] | [3, 4]>
>;

// ─── Bigint, boolean, and mixed primitive recognition ────────────────────

// 16. Interpret accepted bigint text without a runtime `n` suffix.
export type ParseBigInt<Text> = TODO; // TODO(koan)

type _16a = Expect<Equal<ParseBigInt<"0">, 0n>>;
type _16b = Expect<
  Equal<ParseBigInt<"9007199254740993">, 9007199254740993n>
>;
type _16c = Expect<Equal<ParseBigInt<"-42">, -42n>>;
type _16d = Expect<Equal<ParseBigInt<"3.14">, never>>;
type _16e = Expect<Equal<ParseBigInt<"42n">, never>>;

// 17. Distinguish canonical, widened, and rejected bigint spellings.
export type BigIntParseProfile<Text> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<BigIntParseProfile<"42">, [false, false, 42n]>
>;
type _17b = Expect<
  Equal<BigIntParseProfile<"01">, [true, false, never]>
>;
type _17c = Expect<
  Equal<BigIntParseProfile<"-0">, [false, true, bigint]>
>;
type _17d = Expect<
  Equal<BigIntParseProfile<"42n">, [true, false, never]>
>;
type _17e = Expect<
  Equal<BigIntParseProfile<"x">, [true, false, never]>
>;

// 18. Interpret exactly the two lowercase boolean spellings.
export type ParseBoolean<Text> = TODO; // TODO(koan)

type _18a = Expect<Equal<ParseBoolean<"true">, true>>;
type _18b = Expect<Equal<ParseBoolean<"false">, false>>;
type _18c = Expect<Equal<ParseBoolean<"TRUE">, never>>;
type _18d = Expect<Equal<ParseBoolean<"0">, never>>;
type _18e = Expect<
  Equal<ParseBoolean<"true" | "false" | "x">, boolean>
>;

// 19. Parse a `name=true|false` setting while preserving both captures.
export type BooleanSetting<Text> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    BooleanSetting<"debug=true">,
    { name: "debug"; enabled: true }
  >
>;
type _19b = Expect<
  Equal<
    BooleanSetting<"cache=false">,
    { name: "cache"; enabled: false }
  >
>;
type _19c = Expect<Equal<BooleanSetting<"debug=TRUE">, never>>;
type _19d = Expect<Equal<BooleanSetting<"=true">, { name: ""; enabled: true }>>;
type _19e = Expect<
  Equal<
    BooleanSetting<"a=true" | "b=false" | "c=1">,
    | { name: "a"; enabled: true }
    | { name: "b"; enabled: false }
  >
>;

// 20. Prefer numeric recognition, then bigint, then boolean recognition.
export type ParsedPrimitive<Text> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<ParsedPrimitive<"42">, { kind: "number"; value: 42 }>
>;
type _20b = Expect<
  Equal<ParsedPrimitive<"-3.5">, { kind: "number"; value: -3.5 }>
>;
type _20c = Expect<
  Equal<ParsedPrimitive<"true">, { kind: "boolean"; value: true }>
>;
type _20d = Expect<Equal<ParsedPrimitive<"x">, never>>;
type _20e = Expect<
  Equal<
    ParsedPrimitive<"1" | "false" | "x">,
    | { kind: "number"; value: 1 }
    | { kind: "boolean"; value: false }
  >
>;

// 21. Classify constrained parsing at any, never, unknown, and broad strings.
export type ConstrainedSpecialProfile<Text> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    ConstrainedSpecialProfile<any>,
    ["never", "never", "never"]
  >
>;
type _21b = Expect<
  Equal<
    ConstrainedSpecialProfile<never>,
    ["never", "never", "never"]
  >
>;
type _21c = Expect<
  Equal<
    ConstrainedSpecialProfile<unknown>,
    ["never", "never", "never"]
  >
>;
type _21d = Expect<
  Equal<
    ConstrainedSpecialProfile<string>,
    ["never", "never", "never"]
  >
>;
