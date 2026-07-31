import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-006: Parameter-site inference — constructions
 * =============================================================================
 *
 * These constructions treat parameter types as patterns from which evidence is
 * extracted: directly, through object properties and arrays, from consumer
 * annotations, or across optional and rest sites. They then rebuild the generic
 * signatures that carry those candidates into contextual callbacks and result
 * types. Replace each `TODO` with a type that satisfies all assertions below.
 */

// ─── Extract candidates from parameter patterns ──────────────────────────────

// 1. Extract the candidate supplied at a direct parameter site.
export type DirectCandidate<Argument> = TODO; // TODO(koan)

// 2. Extract T by matching an argument against { value: T }.
export type BoxCandidate<Argument> = TODO; // TODO(koan)

// 3. Extract T by matching an argument against { payload: T; source: string }.
export type PayloadCandidate<Argument> = TODO; // TODO(koan)

// 4. Extract the element candidate supplied by an array or readonly tuple.
export type ArrayCandidate<Argument extends readonly unknown[]> = TODO; // TODO(koan)

// 5. Extract the parameter annotation contributed by a consumer callback.
export type ConsumerCandidate<Consumer> = TODO; // TODO(koan)

// 6. Extract the union candidate contributed across a rest argument tuple.
export type RestCandidate<Arguments extends readonly unknown[]> = TODO; // TODO(koan)

// 7. Follow a supplied key path to a deeper nested candidate.
export type PathCandidate<
  Shape,
  Path extends readonly PropertyKey[],
> = TODO; // TODO(koan)

// ─── Generic parameter-site signatures ───────────────────────────────────────

// 8. Construct the generic direct-site signature.
export type DirectSignature = TODO; // TODO(koan)

// 9. Construct the generic boxed-site signature.
export type BoxSignature = TODO; // TODO(koan)

// 10. Construct the generic payload-site signature.
export type PayloadSignature = TODO; // TODO(koan)

// 11. Construct the generic array-element-site signature.
export type FirstSignature = TODO; // TODO(koan)

// 12. Construct a signature where the value site contextually types the effect.
export type TapSignature = TODO; // TODO(koan)

// 13. Construct the callback-only inference signature.
export type ConsumerSignature = TODO; // TODO(koan)

// 14. Construct the optional parameter-site signature.
export type OptionalSignature = TODO; // TODO(koan)

// 15. Construct the homogeneous rest parameter-site signature.
export type GatherSignature = TODO; // TODO(koan)

// ─── Results and contextual views ────────────────────────────────────────────

// 16. Build the possible first result directly from a container type.
export type FirstFrom<Container extends readonly unknown[]> = TODO; // TODO(koan)

// 17. Return Value only when Effect can consume that contextual value.
export type TapResult<Value, Effect> = TODO; // TODO(koan)

// 18. Rebuild the normalized consumer returned from an annotated callback.
export type ConsumerResult<Consumer> = TODO; // TODO(koan)

// 19. Construct the optional result, defaulting an omitted evidence site to unknown.
export type OptionalResult<Candidate = unknown> = TODO; // TODO(koan)

// 20. Construct the homogeneous array result inferred from rest arguments.
export type GatherResult<Arguments extends readonly unknown[]> = TODO; // TODO(koan)

// 21. Construct the contextual type supplied to an unannotated effect parameter.
export type ContextualEffect<Value> = TODO; // TODO(koan)

// 22. Fix a parameter site to Chosen when Argument is compatible with it.
export type ExplicitSite<Argument, Chosen> = TODO; // TODO(koan)

// 23. Return a static annotated property type as the nested candidate.
export type PropertySite<
  Shape,
  Key extends keyof Shape,
> = TODO; // TODO(koan)

// ─── Missing and exceptional evidence ────────────────────────────────────────

// 24. Classify any, unknown, never, or an ordinary inferred candidate safely.
export type CandidateKind<Value> = TODO; // TODO(koan)

// 25. Classify an omitted site's safe default.
export type OmittedCandidateKind<Candidate = unknown> = TODO; // TODO(koan)

// 26. Construct the callback-only result when no annotation supplies evidence.
export type UnannotatedConsumer<Candidate = unknown> = TODO; // TODO(koan)

// ─── Assertions ───────────────────────────────────────────────────────────────

type _01a = Expect<Equal<DirectCandidate<"direct">, "direct">>;
type _01b = Expect<Equal<DirectCandidate<string>, string>>;
type _01c = Expect<Equal<DirectCandidate<1 | 2>, 1 | 2>>;
type _01d = Expect<Equal<DirectCandidate<never>, never>>;
type _01e = Expect<
  Equal<
    DirectCandidate<{ readonly id: "a" }>,
    { readonly id: "a" }
  >
>;

type _02a = Expect<Equal<BoxCandidate<{ value: 42 }>, 42>>;
type _02b = Expect<
  Equal<
    BoxCandidate<{ value: { id: string } }>,
    { id: string }
  >
>;
type _02c = Expect<
  Equal<
    BoxCandidate<{ readonly value: readonly [1, 2] }>,
    readonly [1, 2]
  >
>;
type _02d = Expect<Equal<BoxCandidate<{}>, never>>;
type _02e = Expect<
  Equal<BoxCandidate<{ value: "a" } | { value: 1 }>, "a" | 1>
>;

type _03a = Expect<
  Equal<PayloadCandidate<{ payload: "data"; source: string }>, "data">
>;
type _03b = Expect<
  Equal<
    PayloadCandidate<{
      payload: { readonly kind: "ready" };
      source: "api";
    }>,
    { readonly kind: "ready" }
  >
>;
type _03c = Expect<
  Equal<
    PayloadCandidate<{ payload: number[]; source: string; extra: true }>,
    number[]
  >
>; // Unrelated outer properties do not change the matched payload.
type _03d = Expect<
  Equal<PayloadCandidate<{ payload: string }>, never>
>;

type _04a = Expect<Equal<ArrayCandidate<number[]>, number>>;
type _04b = Expect<
  Equal<ArrayCandidate<readonly [1, 2, 3]>, 1 | 2 | 3>
>;
type _04c = Expect<
  Equal<ArrayCandidate<readonly [1, "a", true]>, 1 | "a" | true>
>;
type _04d = Expect<Equal<ArrayCandidate<readonly []>, never>>;
type _04e = Expect<
  Equal<
    ArrayCandidate<readonly [{ readonly id: "a" }, { readonly id: "b" }]>,
    { readonly id: "a" } | { readonly id: "b" }
  >
>;

type _05a = Expect<
  Equal<ConsumerCandidate<(value: string) => void>, string>
>;
type _05b = Expect<
  Equal<ConsumerCandidate<(value: string | number) => number>, string | number>
>;
type _05c = Expect<
  Equal<ConsumerCandidate<(value: { id: string }) => void>, { id: string }>
>;
type _05d = Expect<Equal<ConsumerCandidate<() => void>, unknown>>;
type _05e = Expect<Equal<ConsumerCandidate<string>, never>>;

type _06a = Expect<Equal<RestCandidate<[1, 2, 3]>, 1 | 2 | 3>>;
type _06b = Expect<Equal<RestCandidate<["a", "b"]>, "a" | "b">>;
type _06c = Expect<
  Equal<RestCandidate<[readonly [1, 2], readonly [3, 4]]>, readonly [1, 2] | readonly [3, 4]>
>;
type _06d = Expect<Equal<RestCandidate<[]>, never>>;

type GivenNested = {
  event: {
    payload: {
      readonly kind: "ready";
    };
  };
};

type _07a = Expect<
  Equal<PathCandidate<GivenNested, ["event", "payload", "kind"]>, "ready">
>;
type _07b = Expect<
  Equal<
    PathCandidate<GivenNested, ["event", "payload"]>,
    { readonly kind: "ready" }
  >
>;
type _07c = Expect<Equal<PathCandidate<GivenNested, []>, GivenNested>>;
type _07d = Expect<
  Equal<PathCandidate<GivenNested, ["event", "missing"]>, never>
>;

type _08a = Expect<
  Equal<DirectSignature, <Value>(value: Value) => Value>
>;
type _08b = Expect<Equal<ReturnType<DirectSignature>, unknown>>;
type _08c = Expect<
  Equal<Parameters<DirectSignature>, [value: unknown]>
>;

type _09a = Expect<
  Equal<
    BoxSignature,
    <Value>(box: { value: Value }) => Value
  >
>;
type _09b = Expect<
  Equal<Parameters<BoxSignature>, [box: { value: unknown }]>
>;
type _09c = Expect<Equal<ReturnType<BoxSignature>, unknown>>;

type _10a = Expect<
  Equal<
    PayloadSignature,
    <Value>(event: { payload: Value; source: string }) => Value
  >
>;
type _10b = Expect<
  Equal<
    Parameters<PayloadSignature>,
    [event: { payload: unknown; source: string }]
  >
>;
type _10c = Expect<Equal<ReturnType<PayloadSignature>, unknown>>;

type _11a = Expect<
  Equal<
    FirstSignature,
    <Value>(items: readonly Value[]) => Value | undefined
  >
>;
type _11b = Expect<
  Equal<Parameters<FirstSignature>, [items: readonly unknown[]]>
>;
type _11c = Expect<Equal<ReturnType<FirstSignature>, unknown>>;

type _12a = Expect<
  Equal<
    TapSignature,
    <Value>(
      value: Value,
      effect: (value: Value) => void,
    ) => Value
  >
>;
type _12b = Expect<
  Equal<
    Parameters<TapSignature>,
    [value: unknown, effect: (value: unknown) => void]
  >
>;
type _12c = Expect<Equal<ReturnType<TapSignature>, unknown>>;

type _13a = Expect<
  Equal<
    ConsumerSignature,
    <Value>(
      consumer: (value: Value) => void,
    ) => (value: Value) => void
  >
>;
type _13b = Expect<
  Equal<
    Parameters<ConsumerSignature>,
    [consumer: (value: unknown) => void]
  >
>;
type _13c = Expect<
  Equal<ReturnType<ConsumerSignature>, (value: unknown) => void>
>;

type _14a = Expect<
  Equal<
    OptionalSignature,
    <Value>(value?: Value) => Value | undefined
  >
>;
type _14b = Expect<
  Equal<Parameters<OptionalSignature>, [value?: unknown]>
>;
type _14c = Expect<Equal<ReturnType<OptionalSignature>, unknown>>;

type _15a = Expect<
  Equal<
    GatherSignature,
    <Value>(...values: Value[]) => Value[]
  >
>;
type _15c = Expect<Equal<ReturnType<GatherSignature>, unknown[]>>;

type _16a = Expect<
  Equal<FirstFrom<readonly [1, 2, 3]>, 1 | 2 | 3 | undefined>
>;
type _16b = Expect<
  Equal<FirstFrom<readonly string[]>, string | undefined>
>;
type _16c = Expect<Equal<FirstFrom<readonly []>, undefined>>;
type _16d = Expect<
  Equal<
    FirstFrom<readonly [{ id: string }]>,
    { id: string } | undefined
  >
>;

type _17a = Expect<
  Equal<TapResult<string, (value: string) => void>, string>
>;
type _17b = Expect<
  Equal<TapResult<1 | 2, (value: 1 | 2) => unknown>, 1 | 2>
>;
type _17c = Expect<
  Equal<TapResult<number, (value: string) => void>, never>
>;
type _17d = Expect<
  Equal<TapResult<readonly [1, 2], (value: readonly [1, 2]) => void>, readonly [1, 2]>
>;

type _18a = Expect<
  Equal<
    ConsumerResult<(value: string) => number>,
    (value: string) => void
  >
>;
type _18b = Expect<
  Equal<
    ConsumerResult<(value: string | number) => void>,
    (value: string | number) => void
  >
>;
type _18c = Expect<
  Equal<
    ConsumerResult<(value: { id: string }) => void>,
    (value: { id: string }) => void
  >
>;
type _18d = Expect<Equal<ConsumerResult<string>, never>>;

type _19a = Expect<Equal<OptionalResult, unknown>>;
type _19b = Expect<Equal<OptionalResult<string>, string | undefined>>;
type _19c = Expect<
  Equal<OptionalResult<"a" | "b">, "a" | "b" | undefined>
>;
type _19d = Expect<Equal<OptionalResult<never>, undefined>>;

type _20a = Expect<Equal<GatherResult<[1, 2, 3]>, (1 | 2 | 3)[]>>;
type _20b = Expect<Equal<GatherResult<["a", "b"]>, ("a" | "b")[]>>;
type _20c = Expect<Equal<GatherResult<[]>, never[]>>;
type _20d = Expect<
  Equal<
    GatherResult<[readonly [1, 2], readonly [3, 4]]>,
    (readonly [1, 2] | readonly [3, 4])[]
  >
>;

type _21a = Expect<
  Equal<ContextualEffect<string>, (value: string) => void>
>;
type _21b = Expect<
  Equal<ContextualEffect<1 | 2>, (value: 1 | 2) => void>
>;
type _21c = Expect<
  Equal<
    ContextualEffect<{ readonly id: "a" }>,
    (value: { readonly id: "a" }) => void
  >
>;
type _21d = Expect<
  Equal<ContextualEffect<unknown>, (value: unknown) => void>
>;

type _22a = Expect<Equal<ExplicitSite<"a", string>, string>>;
type _22b = Expect<Equal<ExplicitSite<1, number>, number>>;
type _22c = Expect<
  Equal<ExplicitSite<"a", "a" | "b">, "a" | "b">
>;
type _22d = Expect<Equal<ExplicitSite<number, string>, never>>;
type _22e = Expect<Equal<ExplicitSite<never, unknown>, unknown>>;

type GivenAnnotated = {
  payload: { kind: "a" | "b" };
  optional?: number;
};

type _23a = Expect<
  Equal<PropertySite<GivenAnnotated, "payload">, { kind: "a" | "b" }>
>;
type _23b = Expect<
  Equal<PropertySite<GivenAnnotated, "optional">, number | undefined>
>;
type _23c = Expect<
  Equal<PropertySite<{ readonly exact: "yes" }, "exact">, "yes">
>;
type _23d = Expect<
  Equal<PropertySite<{ impossible: never }, "impossible">, never>
>;

type _24a = Expect<Equal<CandidateKind<any>, "any">>;
type _24b = Expect<Equal<CandidateKind<unknown>, "unknown">>;
type _24c = Expect<Equal<CandidateKind<never>, "never">>;
type _24d = Expect<Equal<CandidateKind<string | number>, "ordinary">>;
type _24e = Expect<Equal<CandidateKind<readonly []>, "ordinary">>;

type _25a = Expect<Equal<OmittedCandidateKind, "unknown">>;
type _25b = Expect<Equal<OmittedCandidateKind<string>, "ordinary">>;
type _25c = Expect<Equal<OmittedCandidateKind<never>, "never">>;
type _25d = Expect<Equal<OmittedCandidateKind<any>, "any">>;

type _26a = Expect<
  Equal<UnannotatedConsumer, (value: unknown) => void>
>;
type _26b = Expect<
  Equal<UnannotatedConsumer<string>, (value: string) => void>
>;
type _26c = Expect<
  Equal<
    UnannotatedConsumer<{ id: string }>,
    (value: { id: string }) => void
  >
>;
type _26d = Expect<
  Equal<UnannotatedConsumer<never>, (value: never) => void>
>;
