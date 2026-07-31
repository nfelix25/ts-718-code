import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-023: typeof narrowing — constructions
 * =============================================================================
 *
 * These constructions model JavaScript's recognized typeof categories and use
 * them to keep or exclude members at positive, negative, chained, and early-exit
 * paths. They distinguish objects from functions, retain null in the object
 * branch, handle unknown/any/never, and separate source aliases from stored
 * category strings and type queries. Replace each `TODO` with a type satisfying
 * the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type RuntimeCategory =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";

type GivenCallableObject = (() => string) & { readonly label: "callable" };

type MatchKnown<Member, Category extends RuntimeCategory> =
  Member extends unknown
    ? Category extends "string"
      ? Member extends string ? Member : never
      : Category extends "number"
        ? Member extends number ? Member : never
        : Category extends "bigint"
          ? Member extends bigint ? Member : never
          : Category extends "boolean"
            ? Member extends boolean ? Member : never
            : Category extends "symbol"
              ? Member extends symbol ? Member : never
              : Category extends "undefined"
                ? Member extends undefined ? Member : never
                : Category extends "function"
                  ? Member extends Function ? Member : never
                  : Member extends null
                    ? Member
                    : Member extends Function
                      ? never
                      : Member extends object
                        ? Member
                        : never
    : never;

// ─── Runtime category vocabulary ────────────────────────────────────────────

// 1. Construct the union of recognized typeof comparison results.
export type TypeofResult =
  TODO; // TODO(koan)

type _01a = Expect<Equal<TypeofResult, RuntimeCategory>>;
type _01b = Expect<
  Equal<Extract<TypeofResult, "string" | "number">, "string" | "number">
>;
type _01c = Expect<
  Equal<Exclude<TypeofResult, "object" | "function">, "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined">
>;

// 2. Map a runtime category string to the broad type established by its guard.
export type CategoryType<Category extends RuntimeCategory> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<CategoryType<"string">, string>>;
type _02b = Expect<Equal<CategoryType<"number">, number>>;
type _02c = Expect<Equal<CategoryType<"undefined">, undefined>>;
type _02d = Expect<Equal<CategoryType<"function">, Function>>;
type _02e = Expect<Equal<CategoryType<"object">, object | null>>;

// ─── Positive and negative guards ───────────────────────────────────────────

// 3. Keep only members matching one positive typeof guard.
export type PositiveTypeof<
  Source,
  Category extends RuntimeCategory,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<PositiveTypeof<string | number | boolean, "string">, string>
>;
type _03b = Expect<
  Equal<PositiveTypeof<string | number | boolean, "number">, number>
>;
type _03c = Expect<
  Equal<PositiveTypeof<string | number | undefined, "undefined">, undefined>
>;
type _03d = Expect<
  Equal<PositiveTypeof<unknown, "symbol">, symbol>
>;
type _03e = Expect<
  Equal<PositiveTypeof<any, "string">, string>
>;

// 4. Exclude members matching one negative typeof guard.
export type NegativeTypeof<
  Source,
  Category extends RuntimeCategory,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<NegativeTypeof<string | number | undefined, "string">, number | undefined>
>;
type _04b = Expect<
  Equal<NegativeTypeof<string | number | boolean, "number">, string | boolean>
>;
type _04c = Expect<
  Equal<NegativeTypeof<string | undefined, "undefined">, string>
>;
type _04d = Expect<Equal<GivenKind<NegativeTypeof<unknown, "string">>, "unknown">>;

// 5. Accumulate two exclusions in the order encountered.
export type RemainingAfterTwo<
  Source,
  First extends RuntimeCategory,
  Second extends RuntimeCategory,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    RemainingAfterTwo<string | number | boolean, "string", "number">,
    boolean
  >
>;
type _05b = Expect<
  Equal<
    RemainingAfterTwo<string | number | boolean | undefined, "string", "number">,
    boolean | undefined
  >
>;
type _05c = Expect<
  Equal<RemainingAfterTwo<string | number, "string", "number">, never>
>;
type _05d = Expect<
  Equal<GivenKind<RemainingAfterTwo<unknown, "string", "number">>, "unknown">
>;

// 6. Consume an arbitrary ordered list of guarded categories.
export type RemainingAfter<
  Source,
  Categories extends readonly RuntimeCategory[],
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    RemainingAfter<
      string | number | boolean | bigint | undefined,
      ["string", "number", "boolean", "bigint"]
    >,
    undefined
  >
>;
type _06b = Expect<
  Equal<
    RemainingAfter<string | number | boolean, ["string", "number"]>,
    boolean
  >
>;
type _06c = Expect<
  Equal<RemainingAfter<string | number, []>, string | number>
>;
type _06d = Expect<
  Equal<RemainingAfter<never, ["string"]>, never>
>;

// ─── Object, null, and function categories ─────────────────────────────────

type Objectish =
  | { id: number }
  | readonly number[]
  | null
  | (() => string)
  | GivenCallableObject
  | string;

// 7. Keep object-category values, including null and arrays but not functions.
export type ObjectBranch<Source> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    ObjectBranch<Objectish>,
    { id: number } | readonly number[] | null
  >
>;
type _07b = Expect<Equal<ObjectBranch<{ id: number } | null>, { id: number } | null>>;
type _07c = Expect<Equal<ObjectBranch<readonly [1, 2] | string>, readonly [1, 2]>>;
type _07d = Expect<Equal<ObjectBranch<unknown>, object | null>>;

// 8. Remove JavaScript's null object after the separate equality check.
export type NonNullObjectBranch<Source> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    NonNullObjectBranch<Objectish>,
    { id: number } | readonly number[]
  >
>;
type _08b = Expect<
  Equal<NonNullObjectBranch<{ id: number } | null>, { id: number }>
>;
type _08c = Expect<Equal<NonNullObjectBranch<null>, never>>;
type _08d = Expect<Equal<NonNullObjectBranch<unknown>, object>>;

// 9. Keep callable values in the separate function category.
export type FunctionBranch<Source> =
  TODO; // TODO(koan)

type _09a = Expect<Equal<FunctionBranch<Objectish>, (() => string) | GivenCallableObject>>;
type _09b = Expect<Equal<FunctionBranch<() => number>, () => number>>;
type _09c = Expect<Equal<FunctionBranch<{ id: number } | string>, never>>;
type _09d = Expect<Equal<FunctionBranch<unknown>, Function>>;

// ─── unknown, any, never, and alias behavior ────────────────────────────────

// 10. Classify a positive branch without allowing `any` to escape.
export type PositiveBranchKind<
  Source,
  Category extends RuntimeCategory,
> = TODO; // TODO(koan)

type _10a = Expect<Equal<PositiveBranchKind<unknown, "string">, "ordinary">>;
type _10b = Expect<Equal<PositiveBranchKind<any, "number">, "ordinary">>;
type _10c = Expect<Equal<PositiveBranchKind<never, "string">, "never">>;
type _10d = Expect<
  Equal<PositiveBranchKind<string | number, "boolean">, "never">
>;

// 11. Classify an unmatched branch for special source types.
export type NegativeBranchKind<
  Source,
  Category extends RuntimeCategory,
> = TODO; // TODO(koan)

type _11a = Expect<Equal<NegativeBranchKind<unknown, "string">, "unknown">>;
type _11b = Expect<Equal<NegativeBranchKind<any, "string">, "any">>;
type _11c = Expect<Equal<NegativeBranchKind<never, "string">, "never">>;
type _11d = Expect<
  Equal<NegativeBranchKind<string | number, "string">, "ordinary">
>;

// 12. Reproduce the current static type read by a type-position typeof query.
export type StaticTypeQuery<Current> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<StaticTypeQuery<string | number>, string | number>
>;
type _12b = Expect<Equal<StaticTypeQuery<string>, string>>;
type _12c = Expect<Equal<StaticTypeQuery<unknown>, unknown>>;
type _12d = Expect<Equal<StaticTypeQuery<never>, never>>;

// 13. Store a category string without back-propagating it into the source type.
export type StoredCategoryView<Source> =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    StoredCategoryView<string | number>,
    { source: string | number; category: RuntimeCategory }
  >
>;
type _13b = Expect<
  Equal<
    StoredCategoryView<unknown>,
    { source: unknown; category: RuntimeCategory }
  >
>;
type _13c = Expect<
  Equal<StoredCategoryView<never>, { source: never; category: RuntimeCategory }>
>;

// ─── API result construction from narrowed paths ────────────────────────────

// 14. Double numbers and uppercase strings after their respective guards.
export type DoubleOrUppercase<Source> =
  TODO; // TODO(koan)

type _14a = Expect<Equal<DoubleOrUppercase<number>, number>>;
type _14b = Expect<Equal<DoubleOrUppercase<string>, string>>;
type _14c = Expect<
  Equal<DoubleOrUppercase<string | number>, string | number>
>;
type _14d = Expect<Equal<DoubleOrUppercase<boolean>, never>>;

// 15. Call a function member and otherwise preserve the original member.
export type CallIfFunction<Source> =
  TODO; // TODO(koan)

type _15a = Expect<Equal<CallIfFunction<() => number>, number>>;
type _15b = Expect<Equal<CallIfFunction<string>, string>>;
type _15c = Expect<
  Equal<CallIfFunction<(() => number) | string>, number | string>
>;
type _15d = Expect<
  Equal<CallIfFunction<() => { id: number }>, { id: number }>
>;

// 16. Produce the numeric object-key-count result after null exclusion.
export type ObjectKeyCountResult<Source> =
  TODO; // TODO(koan)

type _16a = Expect<Equal<ObjectKeyCountResult<object>, number>>;
type _16b = Expect<Equal<ObjectKeyCountResult<object | null>, number>>;
type _16c = Expect<Equal<ObjectKeyCountResult<unknown>, number>>;

// 17. Normalize all surviving text/number/undefined branches to string.
export type NormalizedText<Source extends string | number | undefined> =
  TODO; // TODO(koan)

type _17a = Expect<Equal<NormalizedText<string>, string>>;
type _17b = Expect<Equal<NormalizedText<number>, string>>;
type _17c = Expect<Equal<NormalizedText<undefined>, string>>;
type _17d = Expect<
  Equal<NormalizedText<string | number | undefined>, string>
>;

// 18. Produce the exhaustively described runtime-category result.
export type PrimitiveDescription<Source> =
  TODO; // TODO(koan)

type _18a = Expect<Equal<PrimitiveDescription<unknown>, string>>;
type _18b = Expect<
  Equal<PrimitiveDescription<string | number | null>, string>
>;
type _18c = Expect<Equal<PrimitiveDescription<never>, string>>;
