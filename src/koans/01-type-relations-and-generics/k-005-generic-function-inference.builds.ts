import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-005: Generic function inference — constructions
 * =============================================================================
 *
 * These constructions make the relationships behind generic calls explicit:
 * one inferred candidate is substituted through results, independent parameters
 * stay independent, nested positions contribute element or callback candidates,
 * and a generic function value can remain generic or be instantiated to a
 * concrete signature. Replace each `TODO` with a type that satisfies all
 * assertions below.
 */

// ─── Candidate substitution ──────────────────────────────────────────────────

// 1. Preserve a call-site candidate unchanged.
export type IdentityResult<Candidate> = TODO; // TODO(koan)

// 2. Substitute Candidate into a box property.
export type BoxResult<Candidate> = TODO; // TODO(koan)

// 3. Substitute one candidate into both slots of a pair.
export type DuplicateResult<Candidate> = TODO; // TODO(koan)

// 4. Preserve two independent candidates in their corresponding tuple slots.
export type PairResult<Left, Right> = TODO; // TODO(koan)

// 5. Construct the possible result of reading the first inferred element.
export type FirstResult<Element> = TODO; // TODO(koan)

// ─── Reusable generic call signatures ────────────────────────────────────────

// 6. Construct a generic identity signature.
export type GenericIdentity = TODO; // TODO(koan)

// 7. Construct a generic boxing signature.
export type GenericBox = TODO; // TODO(koan)

// 8. Construct a generic duplication signature.
export type GenericDuplicate = TODO; // TODO(koan)

// 9. Construct a generic pair signature with independent parameters.
export type GenericPair = TODO; // TODO(koan)

// 10. Construct a generic first-element signature accepting readonly inputs.
export type GenericFirst = TODO; // TODO(koan)

// 11. Construct a generic map signature relating callback input and output.
export type GenericMap = TODO; // TODO(koan)

// 12. Construct a generic factory-consuming signature.
export type GenericFactory = TODO; // TODO(koan)

// 13. Construct the non-generic unknown-to-unknown view that forgets correlation.
export type UnknownUnary = TODO; // TODO(koan)

// ─── Instantiation expressions ───────────────────────────────────────────────

// 14. Instantiate identity for one explicitly chosen type.
export type IdentityInstantiation<Chosen> = TODO; // TODO(koan)

// 15. Instantiate boxing for one explicitly chosen type.
export type BoxInstantiation<Chosen> = TODO; // TODO(koan)

// 16. Instantiate a pair for two explicitly chosen, independent types.
export type PairInstantiation<Left, Right> = TODO; // TODO(koan)

// 17. Instantiate first-element inference for a chosen element type.
export type FirstInstantiation<Element> = TODO; // TODO(koan)

// 18. Instantiate map for chosen input and output types.
export type MapInstantiation<Input, Output> = TODO; // TODO(koan)

// 19. Instantiate factory inference for one chosen produced type.
export type FactoryInstantiation<Produced> = TODO; // TODO(koan)

// ─── Nested inference sites and boundaries ───────────────────────────────────

// 20. Infer the element candidate exposed by an array or readonly tuple.
export type ElementCandidate<Container extends readonly unknown[]> = TODO; // TODO(koan)

// 21. Infer the complete first-element result directly from a container.
export type FirstFromContainer<Container extends readonly unknown[]> = TODO; // TODO(koan)

// 22. Infer a callback's output after verifying its input relationship.
export type CallbackOutput<
  Input,
  Transform,
> = TODO; // TODO(koan)

// 23. Infer the value produced by a zero-argument factory.
export type FactoryOutput<Factory> = TODO; // TODO(koan)

// 24. Classify a candidate without ever making `any` an expected answer.
export type CandidateKind<Value> = TODO; // TODO(koan)

// 25. Classify the safe default used when no inference candidate exists.
export type NoCandidateKind<Default = unknown> = TODO; // TODO(koan)

// 26. Use an explicit type argument when the argument satisfies it; reject it
//     otherwise. The chosen type, not the narrower argument, becomes the result.
export type ExplicitChoice<Argument, Chosen> = TODO; // TODO(koan)

// 27. Extract the static candidate contributed by one annotated object property.
export type PropertyCandidate<
  Shape,
  Key extends keyof Shape,
> = TODO; // TODO(koan)

// 28. Preserve two function values—including generic ones—as independent values.
export type PairFunctionValues<Left, Right> = TODO; // TODO(koan)

// ─── Assertions ───────────────────────────────────────────────────────────────

type _01a = Expect<Equal<IdentityResult<"ready">, "ready">>;
type _01b = Expect<Equal<IdentityResult<string>, string>>;
type _01c = Expect<Equal<IdentityResult<1 | 2>, 1 | 2>>;
type _01d = Expect<Equal<IdentityResult<never>, never>>;
type _01e = Expect<
  Equal<
    IdentityResult<{ readonly kind: "event" }>,
    { readonly kind: "event" }
  >
>;

type _02a = Expect<
  Equal<BoxResult<"inside">, { value: "inside" }>
>;
type _02b = Expect<
  Equal<BoxResult<{ id: string }>, { value: { id: string } }>
>;
type _02c = Expect<
  Equal<
    BoxResult<readonly [1, 2]>,
    { value: readonly [1, 2] }
  >
>;
type _02d = Expect<Equal<BoxResult<never>, { value: never }>>;

type _03a = Expect<Equal<DuplicateResult<3>, [3, 3]>>;
type _03b = Expect<Equal<DuplicateResult<string>, [string, string]>>;
type GivenReadonlyCount = { readonly count: 1 };
type _03c = Expect<
  Equal<
    DuplicateResult<GivenReadonlyCount>,
    [GivenReadonlyCount, GivenReadonlyCount]
  >
>;
type _03d = Expect<Equal<DuplicateResult<never>, [never, never]>>;

type _04a = Expect<Equal<PairResult<string, number>, [string, number]>>;
type _04b = Expect<Equal<PairResult<"left", 1>, ["left", 1]>>;
type _04c = Expect<
  Equal<PairResult<null, undefined>, [null, undefined]>
>;
type _04d = Expect<
  Equal<
    PairResult<readonly [1, 2], { readonly ready: true }>,
    [readonly [1, 2], { readonly ready: true }]
  >
>;
type _04e = Expect<Equal<PairResult<never, unknown>, [never, unknown]>>;

type _05a = Expect<Equal<FirstResult<string>, string | undefined>>;
type _05b = Expect<Equal<FirstResult<1 | 2>, 1 | 2 | undefined>>;
type _05c = Expect<Equal<FirstResult<never>, undefined>>;
type _05d = Expect<
  Equal<
    FirstResult<{ id: string }>,
    { id: string } | undefined
  >
>;

type _06a = Expect<
  Equal<GenericIdentity, <Value>(value: Value) => Value>
>;
type _06b = Expect<
  Equal<
    GenericIdentity,
    <Value extends unknown>(value: Value) => Value
  >
>;

type _07a = Expect<
  Equal<
    GenericBox,
    <Value>(value: Value) => { value: Value }
  >
>;
type _07b = Expect<
  Equal<
    ReturnType<GenericBox>,
    { value: unknown }
  >
>; // Inspecting an uninstantiated generic erases its unknown candidate.

type _08a = Expect<
  Equal<
    GenericDuplicate,
    <Value>(value: Value) => [Value, Value]
  >
>;
type _08b = Expect<
  Equal<ReturnType<GenericDuplicate>, [unknown, unknown]>
>;

type _09a = Expect<
  Equal<
    GenericPair,
    <A, B>(left: A, right: B) => [A, B]
  >
>;
type _09b = Expect<
  Equal<ReturnType<GenericPair>, [unknown, unknown]>
>;
type _09c = Expect<
  Equal<Parameters<GenericPair>, [left: unknown, right: unknown]>
>;

type _10a = Expect<
  Equal<
    GenericFirst,
    <Value>(values: readonly Value[]) => Value | undefined
  >
>;
type _10b = Expect<
  Equal<ReturnType<GenericFirst>, unknown>
>; // unknown absorbs the possible undefined in an uninstantiated view.
type _10c = Expect<
  Equal<Parameters<GenericFirst>, [values: readonly unknown[]]>
>;

type _11a = Expect<
  Equal<
    GenericMap,
    <A, B>(value: A, transform: (value: A) => B) => B
  >
>;
type _11b = Expect<Equal<ReturnType<GenericMap>, unknown>>;
type _11c = Expect<
  Equal<
    Parameters<GenericMap>,
    [value: unknown, transform: (value: unknown) => unknown]
  >
>;

type _12a = Expect<
  Equal<
    GenericFactory,
    <Value>(factory: () => Value) => Value
  >
>;
type _12b = Expect<Equal<ReturnType<GenericFactory>, unknown>>;
type _12c = Expect<
  Equal<Parameters<GenericFactory>, [factory: () => unknown]>
>;

type _13a = Expect<
  Equal<UnknownUnary, (value: unknown) => unknown>
>;
type _13b = Expect<Equal<Parameters<UnknownUnary>, [value: unknown]>>;
type _13c = Expect<Equal<ReturnType<UnknownUnary>, unknown>>;
type _13d = Expect<Equal<Equal<UnknownUnary, GenericIdentity>, false>>;

type _14a = Expect<
  Equal<IdentityInstantiation<string>, (value: string) => string>
>;
type _14b = Expect<
  Equal<IdentityInstantiation<Date>, (value: Date) => Date>
>;
type _14c = Expect<
  Equal<IdentityInstantiation<never>, (value: never) => never>
>;

type _15a = Expect<
  Equal<
    BoxInstantiation<number>,
    (value: number) => { value: number }
  >
>;
type _15b = Expect<
  Equal<
    BoxInstantiation<readonly [1, 2]>,
    (value: readonly [1, 2]) => { value: readonly [1, 2] }
  >
>;
type _15c = Expect<
  Equal<
    BoxInstantiation<unknown>,
    (value: unknown) => { value: unknown }
  >
>;

type _16a = Expect<
  Equal<
    PairInstantiation<string, number>,
    (left: string, right: number) => [string, number]
  >
>;
type _16b = Expect<
  Equal<
    PairInstantiation<"a" | "b", 1 | 2>,
    (left: "a" | "b", right: 1 | 2) => ["a" | "b", 1 | 2]
  >
>;
type _16c = Expect<
  Equal<
    PairInstantiation<unknown, string>,
    (left: unknown, right: string) => [unknown, string]
  >
>;

type _17a = Expect<
  Equal<
    FirstInstantiation<string>,
    (values: readonly string[]) => string | undefined
  >
>;
type _17b = Expect<
  Equal<
    FirstInstantiation<1 | 2>,
    (values: readonly (1 | 2)[]) => 1 | 2 | undefined
  >
>;
type _17c = Expect<
  Equal<
    FirstInstantiation<never>,
    (values: readonly never[]) => undefined
  >
>;

type _18a = Expect<
  Equal<
    MapInstantiation<string, number>,
    (value: string, transform: (value: string) => number) => number
  >
>;
type _18b = Expect<
  Equal<
    MapInstantiation<number, { doubled: number }>,
    (
      value: number,
      transform: (value: number) => { doubled: number },
    ) => { doubled: number }
  >
>;
type _18c = Expect<
  Equal<
    MapInstantiation<"x", readonly ["x"]>,
    (
      value: "x",
      transform: (value: "x") => readonly ["x"],
    ) => readonly ["x"]
  >
>;

type _19a = Expect<
  Equal<
    FactoryInstantiation<string>,
    (factory: () => string) => string
  >
>;
type _19b = Expect<
  Equal<
    FactoryInstantiation<"made">,
    (factory: () => "made") => "made"
  >
>;
type _19c = Expect<
  Equal<
    FactoryInstantiation<never>,
    (factory: () => never) => never
  >
>;

type _20a = Expect<
  Equal<ElementCandidate<readonly ["a", "b"]>, "a" | "b">
>;
type _20b = Expect<Equal<ElementCandidate<number[]>, number>>;
type _20c = Expect<
  Equal<ElementCandidate<readonly [1, "a", true]>, 1 | "a" | true>
>;
type _20d = Expect<Equal<ElementCandidate<readonly []>, never>>;
type _20e = Expect<
  Equal<
    ElementCandidate<readonly [{ readonly id: "a" }, { readonly id: "b" }]>,
    { readonly id: "a" } | { readonly id: "b" }
  >
>;

type _21a = Expect<
  Equal<FirstFromContainer<readonly ["a", "b"]>, "a" | "b" | undefined>
>;
type _21b = Expect<
  Equal<FirstFromContainer<readonly number[]>, number | undefined>
>;
type _21c = Expect<Equal<FirstFromContainer<readonly []>, undefined>>;
type _21d = Expect<
  Equal<
    FirstFromContainer<readonly [readonly [1], readonly [2, 3]]>,
    readonly [1] | readonly [2, 3] | undefined
  >
>;

type _22a = Expect<
  Equal<CallbackOutput<string, (value: string) => number>, number>
>;
type _22b = Expect<
  Equal<
    CallbackOutput<number, (value: number) => { doubled: number }>,
    { doubled: number }
  >
>;
type _22c = Expect<
  Equal<
    CallbackOutput<"x", (value: "x") => readonly ["x"]>,
    readonly ["x"]
  >
>;
type _22d = Expect<
  Equal<CallbackOutput<string, (value: number) => boolean>, never>
>;

type _23a = Expect<Equal<FactoryOutput<() => string>, string>>;
type _23b = Expect<Equal<FactoryOutput<() => "made">, "made">>;
type _23c = Expect<
  Equal<
    FactoryOutput<() => { readonly kind: "made" }>,
    { readonly kind: "made" }
  >
>;
type _23d = Expect<Equal<FactoryOutput<() => never>, never>>;
type _23e = Expect<Equal<FactoryOutput<string>, never>>;

type _24a = Expect<Equal<CandidateKind<any>, "any">>;
type _24b = Expect<Equal<CandidateKind<unknown>, "unknown">>;
type _24c = Expect<Equal<CandidateKind<never>, "never">>;
type _24d = Expect<Equal<CandidateKind<string | number>, "ordinary">>;
type _24e = Expect<Equal<CandidateKind<{}>, "ordinary">>;

type _25a = Expect<Equal<NoCandidateKind, "unknown">>;
type _25b = Expect<Equal<NoCandidateKind<never>, "never">>;
type _25c = Expect<Equal<NoCandidateKind<string>, "ordinary">>;
type _25d = Expect<Equal<NoCandidateKind<any>, "any">>;

type _26a = Expect<Equal<ExplicitChoice<"ready", string>, string>>;
type _26b = Expect<Equal<ExplicitChoice<1, number>, number>>;
type _26c = Expect<
  Equal<ExplicitChoice<"a", "a" | "b">, "a" | "b">
>;
type _26d = Expect<Equal<ExplicitChoice<number, string>, never>>;
type _26e = Expect<Equal<ExplicitChoice<never, unknown>, unknown>>;

type GivenAnnotated = {
  kind: "a" | "b";
  count?: number;
};

type _27a = Expect<
  Equal<PropertyCandidate<GivenAnnotated, "kind">, "a" | "b">
>;
type _27b = Expect<
  Equal<PropertyCandidate<GivenAnnotated, "count">, number | undefined>
>;
type _27c = Expect<
  Equal<PropertyCandidate<{ readonly exact: "yes" }, "exact">, "yes">
>;
type _27d = Expect<
  Equal<PropertyCandidate<{ impossible: never }, "impossible">, never>
>;

type _28a = Expect<
  Equal<PairFunctionValues<GenericIdentity, GenericBox>, [GenericIdentity, GenericBox]>
>;
type _28b = Expect<
  Equal<
    PairFunctionValues<IdentityInstantiation<Date>, FactoryInstantiation<string>>,
    [
      (value: Date) => Date,
      (factory: () => string) => string,
    ]
  >
>;
type _28c = Expect<
  Equal<PairFunctionValues<() => never, (value: unknown) => void>, [
    () => never,
    (value: unknown) => void,
  ]>
>;
