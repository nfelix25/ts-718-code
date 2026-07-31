import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-091: optional tuple elements — constructions
 * =============================================================================
 *
 * These constructions model trailing positions that may be omitted. They pin
 * down the resulting read types and length unions, distinguish omission from
 * explicitly supplied `undefined` under exact optional checking, and preserve
 * tuple identity through homomorphic optional and required mappings. They also
 * cover labels, readonly tuples, parameter tuples, tuple unions, never and any,
 * unchecked array reads, optional-before-rest behavior, and multiple optional
 * suffixes. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenOptional<Value extends readonly unknown[]> = {
  [Key in keyof Value]?: Value[Key];
};

type GivenRequired<Value extends readonly unknown[]> = {
  [Key in keyof Value]-?: Value[Key];
};

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

declare const givenStringArray: string[];
declare const givenOptionalString: [value?: string];

type GivenOptionalThenRest = [
  label?: string,
  ...codes: number[],
];

// ─── Building and observing optional positions ─────────────────────────

// 1. Build a pair whose second labeled position may be omitted.
export type BuildOptionalPair<First, Second> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    BuildOptionalPair<string, number>,
    [first: string, second?: number]
  >
>;
type _01b = Expect<
  Equal<BuildOptionalPair<1, 2>, [first: 1, second?: 2]>
>;
type _01c = Expect<
  Equal<
    BuildOptionalPair<never, unknown>,
    [first: never, second?: unknown]
  >
>;
type _01d = Expect<
  Equal<
    BuildOptionalPair<"a" | "b", true | false>,
    [first: "a" | "b", second?: boolean]
  >
>;
type _01e = Expect<
  Equal<BuildOptionalPair<{}, []>["length"], 1 | 2>
>;

// 2. Build one required position followed by two optional positions.
export type BuildOptionalSuffix<Head, Middle, Tail> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    BuildOptionalSuffix<string, number, boolean>,
    [head: string, middle?: number, tail?: boolean]
  >
>;
type _02b = Expect<
  Equal<BuildOptionalSuffix<1, 2, 3>["length"], 1 | 2 | 3>
>;
type _02c = Expect<
  Equal<
    BuildOptionalSuffix<"x", 1, true>[number],
    "x" | 1 | true | undefined
  >
>;
type _02d = Expect<
  Equal<
    BuildOptionalSuffix<never, never, never>,
    [head: never, middle?: never, tail?: never]
  >
>;
type _02e = Expect<
  Equal<
    BuildOptionalSuffix<unknown, {}, []>[2],
    [] | undefined
  >
>;

// 3. Read the observed type at a known optional-tuple key.
export type OptionalTupleAt<
  Value extends readonly unknown[],
  Key extends keyof Value,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<OptionalTupleAt<[value?: string], 0>, string | undefined>
>;
type _03b = Expect<
  Equal<
    OptionalTupleAt<[first: string, second?: number], 0>,
    string
  >
>;
type _03c = Expect<
  Equal<
    OptionalTupleAt<[first: string, second?: number], 1>,
    number | undefined
  >
>;
type _03d = Expect<
  Equal<OptionalTupleAt<readonly [value?: 1], 0>, 1 | undefined>
>;
type _03e = Expect<
  Equal<OptionalTupleAt<[value?: never], 0>, undefined>
>;

// 4. Form the union observable through an arbitrary numeric tuple index.
export type OptionalTupleElements<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<OptionalTupleElements<[value?: string]>, string | undefined>
>;
type _04b = Expect<
  Equal<
    OptionalTupleElements<[first: string, second?: number]>,
    string | number | undefined
  >
>;
type _04c = Expect<
  Equal<
    OptionalTupleElements<[a: string, b?: number, c?: boolean]>,
    string | number | boolean | undefined
  >
>;
type _04d = Expect<
  Equal<OptionalTupleElements<readonly []>, never>
>;
type _04e = Expect<
  Equal<OptionalTupleElements<[value?: never]>, undefined>
>;

// 5. Enumerate every permitted cardinality through the tuple length type.
export type OptionalTupleLength<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _05a = Expect<Equal<OptionalTupleLength<[value?: string]>, 0 | 1>>;
type _05b = Expect<
  Equal<
    OptionalTupleLength<[first: string, second?: number]>,
    1 | 2
  >
>;
type _05c = Expect<
  Equal<
    OptionalTupleLength<[a: string, b?: number, c?: boolean]>,
    1 | 2 | 3
  >
>;
type _05d = Expect<
  Equal<OptionalTupleLength<readonly [value?: 1]>, 0 | 1>
>;
type _05e = Expect<
  Equal<OptionalTupleLength<GivenOptionalThenRest>, number>
>;

// ─── Homomorphic tuple transformations ─────────────────────────────────

// 6. Make every tuple position optional while preserving labels and readonly.
export type OptionalTuple<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<OptionalTuple<[]>, []>>;
type _06b = Expect<
  Equal<OptionalTuple<[string]>, [string?]>
>;
type _06c = Expect<
  Equal<
    OptionalTuple<[name: string, count: number]>,
    [name?: string, count?: number]
  >
>;
type _06d = Expect<
  Equal<
    OptionalTuple<readonly [name: string, count: number]>,
    readonly [name?: string, count?: number]
  >
>;
type _06e = Expect<
  Equal<OptionalTuple<[1, 2, 3]>["length"], 0 | 1 | 2 | 3>
>;

// 7. Make every declared tuple position required again.
export type RequiredTuple<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _07a = Expect<Equal<RequiredTuple<[]>, []>>;
type _07b = Expect<
  Equal<RequiredTuple<[value?: string]>, [value: string]>
>;
type _07c = Expect<
  Equal<
    RequiredTuple<[name?: string, count?: number]>,
    [name: string, count: number]
  >
>;
type _07d = Expect<
  Equal<
    RequiredTuple<readonly [name?: string, count?: number]>,
    readonly [name: string, count: number]
  >
>;
type _07e = Expect<
  Equal<
    RequiredTuple<[value?: string | undefined]>,
    [value: string]
  >
>;

// 8. Extract an optional-parameter list as its labeled tuple type.
export type OptionalParameterTuple<
  FunctionType extends (...arguments_: never[]) => unknown,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<OptionalParameterTuple<() => void>, []>>;
type _08b = Expect<
  Equal<
    OptionalParameterTuple<(value?: string) => void>,
    [value?: string | undefined]
  >
>;
type _08c = Expect<
  Equal<
    OptionalParameterTuple<(path: string, radix?: number) => void>,
    [path: string, radix?: number | undefined]
  >
>;
type _08d = Expect<
  Equal<
    OptionalParameterTuple<
      (path: string, encoding?: "utf8" | "ascii") => void
    >[1],
    "utf8" | "ascii" | undefined
  >
>;
type _08e = Expect<
  Equal<
    OptionalParameterTuple<
      (path: string, encoding?: "utf8" | "ascii") => void
    >["length"],
    1 | 2
  >
>;

// 9. Build a readonly optional pair while retaining labels and exact omission.
export type BuildReadonlyOptionalPair<First, Second> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    BuildReadonlyOptionalPair<string, number>,
    readonly [first: string, second?: number]
  >
>;
type _09b = Expect<
  Equal<BuildReadonlyOptionalPair<1, 2>[0], 1>
>;
type _09c = Expect<
  Equal<BuildReadonlyOptionalPair<1, 2>[1], 2 | undefined>
>;
type _09d = Expect<
  Equal<BuildReadonlyOptionalPair<1, 2>["length"], 1 | 2>
>;
type _09e = Expect<
  Equal<
    GivenRequired<BuildReadonlyOptionalPair<1, 2>>,
    readonly [first: 1, second: 2]
  >
>;

// ─── Exact optional semantics and identity ─────────────────────────────

// 10. Describe omission, present values, and explicit undefined assignability.
export type ExactOptionalProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<ExactOptionalProfile["omitOne"], true>>;
type _10b = Expect<Equal<ExactOptionalProfile["supplyOne"], true>>;
type _10c = Expect<
  Equal<ExactOptionalProfile["explicitUndefined"], false>
>;
type _10d = Expect<Equal<ExactOptionalProfile["explicitAllowed"], true>>;
type _10e = Expect<Equal<ExactOptionalProfile["missingRequired"], false>>;

// 11. Compare a one-position optional tuple with an explicit shape union.
export type OptionalUnionProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<OptionalUnionProfile["optionalToUnion"], false>
>;
type _11b = Expect<
  Equal<OptionalUnionProfile["unionToOptional"], true>
>;
type _11c = Expect<Equal<OptionalUnionProfile["strictlyEqual"], false>>;
type _11d = Expect<Equal<OptionalUnionProfile["optionalLength"], 0 | 1>>;
type _11e = Expect<Equal<OptionalUnionProfile["unionElements"], string>>;

// 12. Distinguish omission-only optionality from an explicit undefined domain.
export type UndefinedDomainProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<UndefinedDomainProfile["omissionRead"], string | undefined>
>;
type _12b = Expect<
  Equal<UndefinedDomainProfile["explicitRead"], string | undefined>
>;
type _12c = Expect<
  Equal<UndefinedDomainProfile["omissionAcceptsUndefined"], false>
>;
type _12d = Expect<
  Equal<UndefinedDomainProfile["explicitAcceptsUndefined"], true>
>;
type _12e = Expect<Equal<UndefinedDomainProfile["typesEqual"], false>>;

// 13. Describe an optional never position that can only be absent.
export type OptionalNeverProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<OptionalNeverProfile["read"], undefined>>;
type _13b = Expect<Equal<OptionalNeverProfile["elements"], undefined>>;
type _13c = Expect<Equal<OptionalNeverProfile["length"], 0 | 1>>;
type _13d = Expect<Equal<OptionalNeverProfile["omitted"], true>>;
type _13e = Expect<
  Equal<OptionalNeverProfile["explicitUndefined"], false>
>;

// 14. Classify optional any observations without using any as an intended answer.
export type OptionalAnyProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<OptionalAnyProfile["readIsAny"], true>>;
type _14b = Expect<Equal<OptionalAnyProfile["elementsAreAny"], true>>;
type _14c = Expect<Equal<OptionalAnyProfile["length"], 0 | 1>>;
type _14d = Expect<Equal<OptionalAnyProfile["requiredLength"], 1>>;
type _14e = Expect<Equal<OptionalAnyProfile["requiredReadIsAny"], true>>;

// ─── Multiple suffixes, indexing, and rest interaction ─────────────────

// 15. Describe every observation and cardinality of a multi-optional suffix.
export type MultiOptionalProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    MultiOptionalProfile["tuple"],
    [head: string, middle?: number, tail?: boolean]
  >
>;
type _15b = Expect<Equal<MultiOptionalProfile["length"], 1 | 2 | 3>>;
type _15c = Expect<
  Equal<
    MultiOptionalProfile["elements"],
    string | number | boolean | undefined
  >
>;
type _15d = Expect<Equal<MultiOptionalProfile["one"], true>>;
type _15e = Expect<Equal<MultiOptionalProfile["three"], true>>;

// 16. Contrast unchecked expression reads with pure indexed-access types.
export type UncheckedReadProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<UncheckedReadProfile["arrayExpression"], string>
>;
type _16b = Expect<
  Equal<UncheckedReadProfile["optionalExpression"], string | undefined>
>;
type _16c = Expect<
  Equal<UncheckedReadProfile["arrayIndexedType"], string>
>;
type _16d = Expect<
  Equal<UncheckedReadProfile["optionalIndexedType"], string | undefined>
>;
type _16e = Expect<
  Equal<UncheckedReadProfile["expressionReadsEqual"], false>
>;

// 17. Build an optional label followed by an arbitrary numeric rest.
export type OptionalThenRest = TODO; // TODO(koan)

type _17a = Expect<Equal<OptionalThenRest["length"], number>>;
type _17b = Expect<
  Equal<OptionalThenRest[number], string | number | undefined>
>;
type _17c = Expect<
  Equal<
    [OptionalThenRest, [] extends OptionalThenRest ? true : false],
    [GivenOptionalThenRest, true]
  >
>;
type _17d = Expect<
  Equal<
    [
      OptionalThenRest,
      ["x", 1, 2] extends OptionalThenRest ? true : false,
    ],
    [GivenOptionalThenRest, true]
  >
>;
type _17e = Expect<
  Equal<
    [OptionalThenRest, [1, 2] extends OptionalThenRest ? true : false],
    [GivenOptionalThenRest, false]
  >
>;

// 18. Describe optional-parameter extraction and making those positions required.
export type OptionalParameterProfile = TODO; // TODO(koan)

type _18a = Expect<Equal<OptionalParameterProfile["none"], []>>;
type _18b = Expect<
  Equal<
    OptionalParameterProfile["one"],
    [value?: string | undefined]
  >
>;
type _18c = Expect<
  Equal<
    OptionalParameterProfile["two"],
    [value: string, radix?: number | undefined]
  >
>;
type _18d = Expect<
  Equal<OptionalParameterProfile["twoLength"], 1 | 2>
>;
type _18e = Expect<
  Equal<
    OptionalParameterProfile["requiredTwo"],
    [value: string, radix: number]
  >
>;

// 19. Build the packet's range and point-argument shapes with optional suffixes.
export type OptionalHelperProfile = TODO; // TODO(koan)

type _19a = Expect<
  Equal<OptionalHelperProfile["range"], [start: number, end?: number]>
>;
type _19b = Expect<
  Equal<
    OptionalHelperProfile["point"],
    [x: number, y: number, label?: string]
  >
>;
type _19c = Expect<
  Equal<
    OptionalHelperProfile["optionalPair"],
    [first: string, second?: number]
  >
>;
type _19d = Expect<
  Equal<OptionalHelperProfile["rangeElements"], number | undefined>
>;
type _19e = Expect<
  Equal<OptionalHelperProfile["pointLength"], 2 | 3>
>;

// 20. Build one view of reads, length, and mapped conversions for any tuple.
export type OptionalTupleSummary<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    OptionalTupleSummary<[name: string, count: number]>,
    {
      optional: [name?: string, count?: number];
      required: [name: string, count: number];
      optionalLength: 0 | 1 | 2;
      optionalElements: string | number | undefined;
      readonlyPreserved: true;
    }
  >
>;
type _20b = Expect<
  Equal<
    OptionalTupleSummary<[]>["optional" | "required" | "optionalLength"],
    [] | 0
  >
>;
type _20c = Expect<
  Equal<
    OptionalTupleSummary<readonly [1, 2]>["optional" | "required"],
    readonly [1?, 2?] | readonly [1, 2]
  >
>;
type _20d = Expect<
  Equal<
    OptionalTupleSummary<[never]>["optionalElements" | "optionalLength"],
    undefined | 0 | 1
  >
>;
type _20e = Expect<
  Equal<
    OptionalTupleSummary<[1] | [1, 2]>["optionalLength"],
    0 | 1 | 2
  >
>;
