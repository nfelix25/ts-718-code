import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-026: truthiness narrowing — constructions
 * =============================================================================
 *
 * These constructions partition exact literals, broad primitives, objects,
 * unknown, any, and never by the truthiness TypeScript can represent. They use
 * those partitions to build logical-expression results, presence policies,
 * coercion evidence, nested property checks, generic fallbacks, and runtime
 * falsy values whose static models are broader. Replace each `TODO` with a type
 * that satisfies the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type GivenFalsyLiteral = false | 0 | 0n | "" | null | undefined;

type TruthyMember<Member> =
  Member extends GivenFalsyLiteral ? never : Member;

type FalsyMember<Member> =
  Member extends GivenFalsyLiteral
    ? Member
    : string extends Member
      ? Member
      : number extends Member
        ? Member
        : bigint extends Member
          ? Member
          : never;

type IsExactlyNonNullishTop<Value> =
  {} extends Value
    ? [Value] extends [{}] ? true : false
    : false;

type GivenTruthy<Value> =
  0 extends 1 & Value
    ? Value
    : [Value] extends [never]
      ? never
      : unknown extends Value
        ? {}
        : Value extends unknown
          ? TruthyMember<Value>
          : never;

type GivenFalsy<Value> =
  0 extends 1 & Value
    ? Value
    : [Value] extends [never]
      ? never
      : unknown extends Value
        ? Value
        : IsExactlyNonNullishTop<Value> extends true
          ? Value
          : Value extends unknown
            ? FalsyMember<Value>
            : never;

type GivenNullish<Value> =
  0 extends 1 & Value
    ? Value
    : unknown extends Value
      ? null | undefined
      : Extract<Value, null | undefined>;

type GivenNonNullish<Value> =
  0 extends 1 & Value
    ? Value
    : unknown extends Value
      ? {}
      : Exclude<Value, null | undefined>;

type PropertyTruthyValue<Source, Key extends PropertyKey> =
  Source extends null | undefined
    ? never
    : Key extends keyof Source
      ? GivenTruthy<Source[Key]>
      : never;

type FalsyRuntimeCase =
  | "NaN"
  | "negative-zero"
  | "zero-bigint"
  | "empty-string"
  | "false";

// ─── Exact and overlapping truthiness partitions ──────────────────────────

// 1. Construct the union of falsy values with literal type representations.
export type RepresentableFalsy =
  TODO; // TODO(koan)

type _01a = Expect<Equal<RepresentableFalsy, GivenFalsyLiteral>>;
type _01b = Expect<
  Equal<Extract<RepresentableFalsy, string | number | bigint>, "" | 0 | 0n>
>;
type _01c = Expect<
  Equal<Extract<RepresentableFalsy, null | undefined>, null | undefined>
>;
type _01d = Expect<
  Equal<Exclude<RepresentableFalsy, null | undefined>, false | 0 | 0n | "">
>;

// 2. Keep the portion TypeScript can retain on a truthy path.
export type TruthyPart<Value> =
  TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    TruthyPart<"" | "go" | 0 | 2 | false | true | 0n | 3n | null | undefined>,
    "go" | 2 | true | 3n
  >
>;
type _02b = Expect<Equal<TruthyPart<string | null>, string>>;
type _02c = Expect<Equal<TruthyPart<boolean | undefined>, true>>;
type _02d = Expect<
  Equal<TruthyPart<{ readonly id: number } | false | null>, { readonly id: number }>
>;
type _02e = Expect<Equal<TruthyPart<unknown>, {}>>;

// 3. Keep the portion TypeScript must retain on a falsy path.
export type FalsyPart<Value> =
  TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    FalsyPart<"" | "go" | 0 | 2 | false | true | 0n | 3n | null | undefined>,
    "" | 0 | false | 0n | null | undefined
  >
>;
type _03b = Expect<Equal<FalsyPart<string | null>, string | null>>;
type _03c = Expect<Equal<FalsyPart<number | undefined>, number | undefined>>;
type _03d = Expect<Equal<FalsyPart<boolean | undefined>, false | undefined>>;
type _03e = Expect<Equal<FalsyPart<readonly [] | null>, null>>;

// 4. Construct both control-flow paths in truthy-then-falsy order.
export type TruthinessPartition<Value> =
  TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    TruthinessPartition<"" | "ready" | 0 | 1 | false | true | null | undefined>,
    ["ready" | 1 | true, "" | 0 | false | null | undefined]
  >
>;
type _04b = Expect<
  Equal<TruthinessPartition<string | null>, [string, string | null]>
>;
type _04c = Expect<
  Equal<TruthinessPartition<symbol | undefined>, [symbol, undefined]>
>;
type _04d = Expect<
  Equal<TruthinessPartition<readonly string[] | undefined>, [readonly string[], undefined]>
>;
type _04e = Expect<Equal<TruthinessPartition<never>, [never, never]>>;

// 5. Report whether at least one value can inhabit the truthy branch.
export type CanBeTruthy<Value> =
  TODO; // TODO(koan)

type _05a = Expect<Equal<CanBeTruthy<"go" | "">, true>>;
type _05b = Expect<Equal<CanBeTruthy<"" | 0 | false | null>, false>>;
type _05c = Expect<Equal<CanBeTruthy<string>, true>>;
type _05d = Expect<Equal<CanBeTruthy<{}>, true>>;
type _05e = Expect<Equal<CanBeTruthy<never>, false>>;

// 6. Report whether at least one value can inhabit the falsy branch.
export type CanBeFalsy<Value> =
  TODO; // TODO(koan)

type _06a = Expect<Equal<CanBeFalsy<"go" | "">, true>>;
type _06b = Expect<
  Equal<CanBeFalsy<"go" | 1 | { readonly id: number }>, false>
>;
type _06c = Expect<Equal<CanBeFalsy<number>, true>>;
type _06d = Expect<Equal<CanBeFalsy<unknown>, true>>;
type _06e = Expect<Equal<CanBeFalsy<never>, false>>;

// 7. Classify a type as always truthy, always falsy, mixed, or unreachable.
export type TruthinessClass<Value> =
  TODO; // TODO(koan)

type _07a = Expect<Equal<TruthinessClass<"ready">, "always-truthy">>;
type _07b = Expect<Equal<TruthinessClass<"" | 0 | null>, "always-falsy">>;
type _07c = Expect<Equal<TruthinessClass<string>, "mixed">>;
type _07d = Expect<Equal<TruthinessClass<Boolean>, "always-truthy">>;
type _07e = Expect<Equal<TruthinessClass<never>, "never">>;

// 8. Choose the values retained by a truthy or nullish-presence policy.
export type PresentPart<
  Value,
  Policy extends "truthy" | "non-nullish",
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<PresentPart<"" | "saved" | null, "truthy">, "saved">
>;
type _08b = Expect<
  Equal<PresentPart<"" | "saved" | null, "non-nullish">, "" | "saved">
>;
type _08c = Expect<Equal<PresentPart<0 | 3 | undefined, "truthy">, 3>>;
type _08d = Expect<
  Equal<PresentPart<0 | 3 | undefined, "non-nullish">, 0 | 3>
>;
type _08e = Expect<Equal<PresentPart<unknown, "non-nullish">, {}>>;

// ─── Logical and conditional expression results ───────────────────────────

// 9. Preserve the left falsy part and add the right result when left can be truthy.
export type LogicalAndResult<Left, Right> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<LogicalAndResult<string | null | undefined, number>, string | number | null | undefined>
>;
type _09b = Expect<
  Equal<LogicalAndResult<0 | 1 | undefined, string>, 0 | string | undefined>
>;
type _09c = Expect<
  Equal<LogicalAndResult<false | { readonly id: number }, number>, false | number>
>;
type _09d = Expect<
  Equal<LogicalAndResult<readonly string[] | undefined, number>, number | undefined>
>;
type _09e = Expect<Equal<LogicalAndResult<0 | null, "right">, 0 | null>>;

// 10. Preserve the left truthy part and add fallback when left can be falsy.
export type LogicalOrResult<Left, Fallback> =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<LogicalOrResult<"" | "ok" | undefined, "default">, "ok" | "default">
>;
type _10b = Expect<
  Equal<LogicalOrResult<0 | 2 | null, "none">, 2 | "none">
>;
type _10c = Expect<
  Equal<
    LogicalOrResult<false | { readonly id: number }, { readonly id: 0 }>,
    { readonly id: number } | { readonly id: 0 }
  >
>;
type _10d = Expect<Equal<LogicalOrResult<unknown, "fallback">, {}>>;
type _10e = Expect<Equal<LogicalOrResult<"ready", "fallback">, "ready">>;

// 11. Replace only null and undefined, preserving other falsy data.
export type NullishCoalesceResult<Left, Fallback> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<NullishCoalesceResult<string | null | undefined, "fallback">, string>
>;
type _11b = Expect<
  Equal<NullishCoalesceResult<0 | 2 | undefined, "none">, 0 | 2 | "none">
>;
type _11c = Expect<
  Equal<NullishCoalesceResult<false | null, true>, false | true>
>;
type _11d = Expect<
  Equal<NullishCoalesceResult<readonly [] | undefined, "missing">, readonly [] | "missing">
>;
type _11e = Expect<Equal<NullishCoalesceResult<"ready", "fallback">, "ready">>;

// 12. Include only the ternary branches reachable by the source's truthiness.
export type ConditionalResult<
  Source,
  WhenTruthy,
  WhenFalsy,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<ConditionalResult<0 | 1 | 2 | null, "present", "absent">, "present" | "absent">
>;
type _12b = Expect<
  Equal<ConditionalResult<"ready", number, string>, number>
>;
type _12c = Expect<
  Equal<ConditionalResult<"" | null, number, string>, string>
>;
type _12d = Expect<
  Equal<ConditionalResult<Boolean, "truthy", "falsy">, "truthy">
>;
type _12e = Expect<
  Equal<ConditionalResult<never, "truthy", "falsy">, never>
>;

// 13. Pair `Boolean(value)` with the more precise type of `!!value`.
export type CoercionProfile<Value> =
  TODO; // TODO(koan)

type _13a = Expect<Equal<CoercionProfile<"ready">, [boolean, true]>>;
type _13b = Expect<Equal<CoercionProfile<"" | null>, [boolean, false]>>;
type _13c = Expect<Equal<CoercionProfile<string | null>, [boolean, boolean]>>;
type _13d = Expect<Equal<CoercionProfile<readonly []>, [boolean, true]>>;
type _13e = Expect<Equal<CoercionProfile<unknown>, [boolean, boolean]>>;

// 14. Model which condition forms feed narrowing evidence back to the source.
export type ConditionEvidence<
  Source,
  Form extends "direct" | "double-negation" | "Boolean-call",
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<ConditionEvidence<string | null, "direct">, string>
>;
type _14b = Expect<
  Equal<ConditionEvidence<string | null, "double-negation">, string>
>;
type _14c = Expect<
  Equal<ConditionEvidence<string | null, "Boolean-call">, string | null>
>;
type _14d = Expect<
  Equal<ConditionEvidence<unknown, "direct">, {}>
>;
type _14e = Expect<
  Equal<ConditionEvidence<boolean | undefined, "double-negation">, true>
>;

// ─── Optional and nested property truthiness ───────────────────────────────

// 15. Keep the truthy portion of one optional or nullable property.
export type TruthyPropertyValue<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<TruthyPropertyValue<{ readonly name: string } | undefined, "name">, string>
>;
type _15b = Expect<
  Equal<
    TruthyPropertyValue<{ readonly child?: { readonly id: number } } | null, "child">,
    { readonly id: number }
  >
>;
type _15c = Expect<
  Equal<TruthyPropertyValue<{ readonly count?: 0 | 2 }, "count">, 2>
>;
type _15d = Expect<
  Equal<TruthyPropertyValue<{ readonly enabled?: boolean }, "enabled">, true>
>;
type _15e = Expect<
  Equal<TruthyPropertyValue<{ readonly tags: readonly [] }, "tags">, readonly []>
>;

// 16. Follow a property path and truthiness-check the value at its end.
export type TruthyPathValue<
  Source,
  Path extends readonly PropertyKey[],
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    TruthyPathValue<
      { readonly child?: { readonly id: 0 | 7 } } | null,
      ["child", "id"]
    >,
    7
  >
>;
type _16b = Expect<
  Equal<
    TruthyPathValue<
      { readonly user?: { readonly profile?: { readonly name: string } } },
      ["user", "profile", "name"]
    >,
    string
  >
>;
type _16c = Expect<
  Equal<TruthyPathValue<{ readonly value: "" | "ok" }, ["value"]>, "ok">
>;
type _16d = Expect<
  Equal<TruthyPathValue<{ readonly id: number } | null, []>, { readonly id: number }>
>;
type _16e = Expect<
  Equal<TruthyPathValue<{ readonly id: number }, ["missing"]>, never>
>;

// ─── Special types and generic values ──────────────────────────────────────

// 17. Classify the true branch without allowing `any` to pass assertions.
export type TruthyPartKind<Value> =
  TODO; // TODO(koan)

type _17a = Expect<Equal<TruthyPartKind<unknown>, "ordinary">>;
type _17b = Expect<Equal<TruthyPartKind<any>, "any">>;
type _17c = Expect<Equal<TruthyPartKind<never>, "never">>;
type _17d = Expect<Equal<TruthyPartKind<"" | null>, "never">>;
type _17e = Expect<Equal<TruthyPartKind<string | null>, "ordinary">>;

// 18. Classify the false branch for unknown, any, never, and exact literals.
export type FalsyPartKind<Value> =
  TODO; // TODO(koan)

type _18a = Expect<Equal<FalsyPartKind<unknown>, "unknown">>;
type _18b = Expect<Equal<FalsyPartKind<any>, "any">>;
type _18c = Expect<Equal<FalsyPartKind<never>, "never">>;
type _18d = Expect<Equal<FalsyPartKind<"ready" | 1>, "never">>;
type _18e = Expect<Equal<FalsyPartKind<string | null>, "ordinary">>;

// 19. Build the generic truthy refinement used inside `if (value)`.
export type GenericTruthy<Value> =
  TODO; // TODO(koan)

type _19a = Expect<Equal<GenericTruthy<unknown>, {}>>;
type _19b = Expect<Equal<GenericTruthy<string | null>, string>>;
type _19c = Expect<
  Equal<GenericTruthy<{ readonly id: number } | undefined>, { readonly id: number }>
>;
type _19d = Expect<Equal<GenericTruthy<null | undefined>, never>>;
type _19e = Expect<Equal<GenericTruthy<never>, never>>;

// 20. Construct the public result of generic `value || undefined`.
export type GenericTruthyFallback<Value> =
  TODO; // TODO(koan)

type _20a = Expect<Equal<GenericTruthyFallback<string>, string | undefined>>;
type _20b = Expect<
  Equal<GenericTruthyFallback<0 | 1>, 0 | 1 | undefined>
>;
type _20c = Expect<
  Equal<
    GenericTruthyFallback<{ readonly id: number }>,
    { readonly id: number } | undefined
  >
>;
type _20d = Expect<Equal<GenericTruthyFallback<null>, null | undefined>>;
type _20e = Expect<Equal<GenericTruthyFallback<never>, undefined>>;

// 21. Map runtime falsy cases to the static types TypeScript can spell.
export type FalsyRuntimeRepresentation<Case extends FalsyRuntimeCase> =
  TODO; // TODO(koan)

type _21a = Expect<Equal<FalsyRuntimeRepresentation<"NaN">, number>>;
type _21b = Expect<Equal<FalsyRuntimeRepresentation<"negative-zero">, 0>>;
type _21c = Expect<Equal<FalsyRuntimeRepresentation<"zero-bigint">, 0n>>;
type _21d = Expect<Equal<FalsyRuntimeRepresentation<"empty-string">, "">>;
type _21e = Expect<Equal<FalsyRuntimeRepresentation<"false">, false>>;

// 22. Evaluate an ordered `a || b || ... || fallback` type chain.
export type FirstTruthy<
  Values extends readonly unknown[],
  Fallback,
> = TODO; // TODO(koan)

type _22a = Expect<
  Equal<FirstTruthy<["", 0, false, "ready"], "fallback">, "ready">
>;
type _22b = Expect<
  Equal<FirstTruthy<[null | "first", undefined | "second"], "fallback">, "first" | "second" | "fallback">
>;
type _22c = Expect<
  Equal<FirstTruthy<[0 | 1, 2 | undefined], 3>, 1 | 2 | 3>
>;
type _22d = Expect<
  Equal<FirstTruthy<[readonly [], "unreachable"], "fallback">, readonly []>
>;
type _22e = Expect<Equal<FirstTruthy<[], "fallback">, "fallback">>;
