import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-002: any, unknown, and never — constructions
 * =============================================================================
 *
 * These constructions build instruments for the top type, bottom type, and
 * checker escape hatch. They classify special types without asking for `any`
 * as an answer, encode their assignment and algebra laws, track them through
 * containers and utilities, and contain unchecked results at safe boundaries.
 * Replace each `TODO` with a type that satisfies all assertions below.
 */

// ─── Reliable detectors ──────────────────────────────────────────────────────

// 1. Detect exactly any without classifying unknown or never as any.
export type DetectAny<Value> = TODO; // TODO(koan)

// 2. Detect exactly never without distributing it away.
export type DetectNever<Value> = TODO; // TODO(koan)

// 3. Detect exactly unknown after excluding any.
export type DetectUnknown<Value> = TODO; // TODO(koan)

// 4. Classify a type as any, unknown, never, or ordinary.
export type SpecialKind<Value> = TODO; // TODO(koan)

// 5. Decide whether a type is outside all three special categories.
export type IsOrdinary<Value> = TODO; // TODO(koan)

// ─── Assignment direction and algebra ────────────────────────────────────────

// 6. Decide whether Source can flow into Target as a whole.
export type IsAssignable<Source, Target> = TODO; // TODO(koan)

// 7. Summarize the safe-top and bottom assignment directions for Value.
export type FlowSummary<Value> = TODO; // TODO(koan)

// 8. Classify the result of unioning Left and Right.
//    This constrains any absorption without ever requiring any as the answer.
export type UnionSpecialKind<Left, Right> = TODO; // TODO(koan)

// 9. Classify the result of intersecting Left and Right.
export type IntersectionSpecialKind<Left, Right> = TODO; // TODO(koan)

// ─── Guaranteed operations and nested special types ─────────────────────────

// 10. Return the property keys a reference of Value guarantees.
export type GuaranteedKeys<Value> = TODO; // TODO(koan)

// 11. Decide whether Value guarantees no property keys.
export type IsKeyless<Value> = TODO; // TODO(koan)

// 12. Classify a container itself rather than its element.
export type OuterSpecialKind<Container> = TODO; // TODO(koan)

// 13. Classify the exposed element of an array or tuple.
export type ElementSpecialKind<Container extends readonly unknown[]> = TODO; // TODO(koan)

// 14. Classify the recursively awaited result of a promise-like type.
export type AwaitedSpecialKind<Value> = TODO; // TODO(koan)

// 15. Classify the result promised by a function.
export type ReturnSpecialKind<
  Fn extends (...args: never[]) => unknown,
> = TODO; // TODO(koan)

// 16. Classify the union of values accepted by a function's parameters.
export type ParameterElementSpecialKind<
  Fn extends (...args: never[]) => unknown,
> = TODO; // TODO(koan)

// ─── Distribution and standard utility propagation ──────────────────────────

// 17. For each union member, classify whether it is a string.
export type DistributeStringKind<Value> = TODO; // TODO(koan)

// 18. Ask once whether the entire union is assignable to string.
export type WholeStringKind<Value> = TODO; // TODO(koan)

// 19. Classify the result of removing members assignable to Removed.
export type ExcludeSpecialKind<Value, Removed> = TODO; // TODO(koan)

// 20. Classify the result of retaining members assignable to Selected.
export type ExtractSpecialKind<Value, Selected> = TODO; // TODO(koan)

// 21. Classify the result of removing null and undefined.
export type NonNullableSpecialKind<Value> = TODO; // TODO(koan)

// ─── Equality policy and safe boundaries ─────────────────────────────────────

// 22. Apply the repository's strict equality policy to two types.
export type StrictlyEqual<Left, Right> = TODO; // TODO(koan)

// 23. Decide whether two types occupy the same special-type category.
export type SameSpecialKind<Left, Right> = TODO; // TODO(koan)

// 24. Implement the naive `extends any` check and preserve its never behavior.
//     The battery demonstrates why this is not an any detector.
export type ExtendsAny<Value> = TODO; // TODO(koan)

// 25. Replace an unchecked any with unknown while preserving all other inputs.
export type ContainAny<Value> = TODO; // TODO(koan)

// 26. Contain an any-returning function at unknown without changing safe results.
export type SafeReturn<
  Fn extends (...args: never[]) => unknown,
> = TODO; // TODO(koan)

// 27. Narrow Value by Evidence, but reject any instead of letting it leak.
export type SafeNarrow<Value, Evidence> = TODO; // TODO(koan)

// 28. Build a record that cannot contain a value at any selected key.
export type ImpossibleRecord<Keys extends PropertyKey> = TODO; // TODO(koan)

// 29. Classify a selected indexed value without exposing any directly.
export type IndexedValueSpecialKind<
  Value,
  Key extends keyof Value,
> = TODO; // TODO(koan)

// 30. Decide whether a function returning Actual can fill an Expected result.
//     A never-returning function succeeds because it produces no counterexample.
export type CanReturnAs<Actual, Expected> = TODO; // TODO(koan)

// ─── Assertions ───────────────────────────────────────────────────────────────

type _01a = Expect<Equal<DetectAny<any>, true>>;
type _01b = Expect<Equal<DetectAny<unknown>, false>>;
type _01c = Expect<Equal<DetectAny<never>, false>>;
type _01d = Expect<Equal<DetectAny<any & string>, true>>;
type _01e = Expect<Equal<DetectAny<any[]>, false>>;

type _02a = Expect<Equal<DetectNever<never>, true>>;
type _02b = Expect<Equal<DetectNever<string>, false>>;
type _02c = Expect<Equal<DetectNever<never[]>, false>>;
type _02d = Expect<Equal<DetectNever<never | string>, false>>;

type _03a = Expect<Equal<DetectUnknown<unknown>, true>>;
type _03b = Expect<Equal<DetectUnknown<any>, false>>;
type _03c = Expect<Equal<DetectUnknown<never>, false>>;
type _03d = Expect<Equal<DetectUnknown<unknown | string>, true>>;
type _03e = Expect<Equal<DetectUnknown<unknown & {}>, false>>;

type _04a = Expect<Equal<SpecialKind<any>, "any">>;
type _04b = Expect<Equal<SpecialKind<unknown>, "unknown">>;
type _04c = Expect<Equal<SpecialKind<never>, "never">>;
type _04d = Expect<Equal<SpecialKind<void>, "ordinary">>;
type _04e = Expect<Equal<SpecialKind<unknown[]>, "ordinary">>;

type _05a = Expect<Equal<IsOrdinary<string>, true>>;
type _05b = Expect<Equal<IsOrdinary<{}>, true>>;
type _05c = Expect<Equal<IsOrdinary<any>, false>>;
type _05d = Expect<Equal<IsOrdinary<never>, false>>;

type _06a = Expect<Equal<IsAssignable<string, unknown>, true>>;
type _06b = Expect<Equal<IsAssignable<unknown, string>, false>>;
type _06c = Expect<Equal<IsAssignable<never, string>, true>>;
type _06d = Expect<Equal<IsAssignable<string, never>, false>>;
type _06e = Expect<
  Equal<IsAssignable<readonly unknown[], unknown[]>, false>
>;

type _07a = Expect<
  Equal<
    FlowSummary<string>,
    {
      toUnknown: true;
      fromUnknown: false;
      fromNever: true;
      toNever: false;
    }
  >
>;
type _07b = Expect<
  Equal<
    FlowSummary<unknown>,
    {
      toUnknown: true;
      fromUnknown: true;
      fromNever: true;
      toNever: false;
    }
  >
>;
type _07c = Expect<
  Equal<
    FlowSummary<never>,
    {
      toUnknown: true;
      fromUnknown: false;
      fromNever: true;
      toNever: true;
    }
  >
>;

type _08a = Expect<Equal<UnionSpecialKind<string, never>, "ordinary">>;
type _08b = Expect<Equal<UnionSpecialKind<string, unknown>, "unknown">>;
type _08c = Expect<Equal<UnionSpecialKind<string, any>, "any">>;
type _08d = Expect<Equal<UnionSpecialKind<never, never>, "never">>;

type _09a = Expect<Equal<IntersectionSpecialKind<string, unknown>, "ordinary">>;
type _09b = Expect<Equal<IntersectionSpecialKind<string, never>, "never">>;
type _09c = Expect<Equal<IntersectionSpecialKind<string, any>, "any">>;
type _09d = Expect<Equal<IntersectionSpecialKind<unknown, {}>, "ordinary">>;

type _10a = Expect<Equal<GuaranteedKeys<unknown>, never>>;
type _10b = Expect<
  Equal<GuaranteedKeys<any>, string | number | symbol>
>;
type _10c = Expect<
  Equal<GuaranteedKeys<never>, string | number | symbol>
>;
type _10d = Expect<Equal<GuaranteedKeys<{ id: string }>, "id">>;
type _10e = Expect<Equal<GuaranteedKeys<{ [key: string]: unknown }>, string | number>>;

type _11a = Expect<Equal<IsKeyless<unknown>, true>>;
type _11b = Expect<Equal<IsKeyless<{}>, true>>;
type _11c = Expect<Equal<IsKeyless<{ id: string }>, false>>;
type _11d = Expect<Equal<IsKeyless<any>, false>>;

type _12a = Expect<Equal<OuterSpecialKind<unknown[]>, "ordinary">>;
type _12b = Expect<Equal<OuterSpecialKind<any[]>, "ordinary">>;
type _12c = Expect<Equal<OuterSpecialKind<never[]>, "ordinary">>;
type _12d = Expect<Equal<OuterSpecialKind<never>, "never">>;

type _13a = Expect<Equal<ElementSpecialKind<unknown[]>, "unknown">>;
type _13b = Expect<Equal<ElementSpecialKind<any[]>, "any">>;
type _13c = Expect<Equal<ElementSpecialKind<never[]>, "never">>;
type _13d = Expect<Equal<ElementSpecialKind<readonly []>, "never">>;
type _13e = Expect<Equal<ElementSpecialKind<readonly [unknown, string]>, "unknown">>;

type _14a = Expect<
  Equal<AwaitedSpecialKind<Promise<unknown>>, "unknown">
>;
type _14b = Expect<Equal<AwaitedSpecialKind<Promise<any>>, "any">>;
type _14c = Expect<Equal<AwaitedSpecialKind<Promise<never>>, "never">>;
type _14d = Expect<
  Equal<AwaitedSpecialKind<Promise<Promise<string>>>, "ordinary">
>;

type _15a = Expect<Equal<ReturnSpecialKind<() => any>, "any">>;
type _15b = Expect<Equal<ReturnSpecialKind<() => unknown>, "unknown">>;
type _15c = Expect<Equal<ReturnSpecialKind<() => never>, "never">>;
type _15d = Expect<Equal<ReturnSpecialKind<() => void>, "ordinary">>;

type _16a = Expect<
  Equal<ParameterElementSpecialKind<(...values: any[]) => void>, "any">
>;
type _16b = Expect<
  Equal<ParameterElementSpecialKind<(...values: unknown[]) => void>, "unknown">
>;
type _16c = Expect<
  Equal<ParameterElementSpecialKind<(...values: never[]) => void>, "never">
>;
type _16d = Expect<
  Equal<ParameterElementSpecialKind<(value: string, count: number) => void>, "ordinary">
>;
type _16e = Expect<Equal<ParameterElementSpecialKind<() => void>, "never">>;

type _17a = Expect<
  Equal<DistributeStringKind<string | number>, "string" | "other">
>;
type _17b = Expect<Equal<DistributeStringKind<never>, never>>;
type _17c = Expect<
  Equal<DistributeStringKind<any>, "string" | "other">
>;
type _17d = Expect<Equal<DistributeStringKind<unknown>, "other">>;

type _18a = Expect<Equal<WholeStringKind<string | number>, "other">>;
type _18b = Expect<Equal<WholeStringKind<never>, "string">>;
type _18c = Expect<Equal<WholeStringKind<string>, "string">>;
type _18d = Expect<Equal<WholeStringKind<unknown>, "other">>;

type _19a = Expect<Equal<ExcludeSpecialKind<any, string>, "any">>;
type _19b = Expect<Equal<ExcludeSpecialKind<unknown, string>, "unknown">>;
type _19c = Expect<Equal<ExcludeSpecialKind<never, string>, "never">>;
type _19d = Expect<
  Equal<ExcludeSpecialKind<string | number, string>, "ordinary">
>;

type _20a = Expect<Equal<ExtractSpecialKind<any, string>, "any">>;
type _20b = Expect<Equal<ExtractSpecialKind<unknown, string>, "never">>;
type _20c = Expect<Equal<ExtractSpecialKind<never, string>, "never">>;
type _20d = Expect<
  Equal<ExtractSpecialKind<string | number, string>, "ordinary">
>;

type _21a = Expect<Equal<NonNullableSpecialKind<any>, "any">>;
type _21b = Expect<Equal<NonNullableSpecialKind<unknown>, "ordinary">>;
type _21c = Expect<Equal<NonNullableSpecialKind<never>, "never">>;
type _21d = Expect<
  Equal<NonNullableSpecialKind<string | null | undefined>, "ordinary">
>;

type _22a = Expect<Equal<StrictlyEqual<any, any>, true>>;
type _22b = Expect<Equal<StrictlyEqual<any, string>, false>>;
type _22c = Expect<Equal<StrictlyEqual<any, unknown>, false>>;
type _22d = Expect<Equal<StrictlyEqual<never, never>, true>>;
type _22e = Expect<Equal<StrictlyEqual<unknown, never>, false>>;

type _23a = Expect<Equal<SameSpecialKind<string, Date>, true>>;
type _23b = Expect<Equal<SameSpecialKind<unknown, unknown | string>, true>>;
type _23c = Expect<Equal<SameSpecialKind<any, unknown>, false>>;
type _23d = Expect<Equal<SameSpecialKind<never, never[]>, false>>;

type _24a = Expect<Equal<ExtendsAny<string>, true>>;
type _24b = Expect<Equal<ExtendsAny<unknown>, true>>;
type _24c = Expect<Equal<ExtendsAny<any>, true>>;
type _24d = Expect<Equal<ExtendsAny<never>, never>>;

type _25a = Expect<Equal<ContainAny<any>, unknown>>;
type _25b = Expect<Equal<ContainAny<unknown>, unknown>>;
type _25c = Expect<Equal<ContainAny<string>, string>>;
type _25d = Expect<Equal<ContainAny<never>, never>>;
type _25e = Expect<Equal<ContainAny<any[]>, any[]>>;

type _26a = Expect<Equal<SafeReturn<() => any>, unknown>>;
type _26b = Expect<Equal<SafeReturn<() => string>, string>>;
type _26c = Expect<Equal<SafeReturn<() => unknown>, unknown>>;
type _26d = Expect<Equal<SafeReturn<() => never>, never>>;

type _27a = Expect<Equal<SafeNarrow<unknown, string>, never>>;
type _27b = Expect<Equal<SafeNarrow<any, string>, never>>;
type _27c = Expect<Equal<SafeNarrow<string | number, string>, string>>;
type _27d = Expect<Equal<SafeNarrow<never, string>, never>>;
type _27e = Expect<
  Equal<SafeNarrow<{ id: string } | null, object>, { id: string }>
>;

type _28a = Expect<
  Equal<ImpossibleRecord<string>, Record<string, never>>
>;
type _28b = Expect<
  Equal<ImpossibleRecord<"id" | "name">, { id: never; name: never }>
>;
type _28c = Expect<Equal<ImpossibleRecord<never>, {}>>;

type _29a = Expect<
  Equal<IndexedValueSpecialKind<{ [key: string]: unknown }, string>, "unknown">
>;
type _29b = Expect<
  Equal<IndexedValueSpecialKind<{ [key: string]: never }, string>, "never">
>;
type _29c = Expect<
  Equal<IndexedValueSpecialKind<{ unchecked: any }, "unchecked">, "any">
>;
type _29d = Expect<
  Equal<IndexedValueSpecialKind<{ id: string }, "id">, "ordinary">
>;

type _30a = Expect<Equal<CanReturnAs<never, string>, true>>;
type _30b = Expect<Equal<CanReturnAs<string, unknown>, true>>;
type _30c = Expect<Equal<CanReturnAs<unknown, string>, false>>;
type _30d = Expect<Equal<CanReturnAs<void, string>, false>>;
