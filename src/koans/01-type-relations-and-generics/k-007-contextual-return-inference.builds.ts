import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-007: Contextual and return-site inference — constructions
 * =============================================================================
 *
 * These constructions separate return-expression widening, output extraction,
 * and expected-type evidence. They carry inferred output through deferred
 * functions, arrays, promises, explicit type arguments, and annotated bindings,
 * while preserving the rule that context checks strong input evidence instead
 * of rewriting it. Replace each `TODO` with a type that satisfies all assertions
 * below.
 */

// ─── Return expressions as inference sites ───────────────────────────────────

// 1. Widen a primitive literal contributed by an ordinary return expression.
export type WidenReturn<Value> = TODO; // TODO(koan)

// 2. Build a factory whose result is widened or explicitly preserved.
export type FactoryView<
  Value,
  Preserve extends boolean,
> = TODO; // TODO(koan)

// 3. Build a factory returning the finite union of conditional branches.
export type ConditionalFactory<Left, Right> = TODO; // TODO(koan)

// 4. Build a factory with an explicitly declared return type.
export type AnnotatedFactory<Declared> = TODO; // TODO(koan)

// 5. Extract the candidate contributed by a factory return.
export type ReturnCandidate<Factory> = TODO; // TODO(koan)

// 6. Infer a mapper's output after checking its input relationship.
export type MapperOutput<Input, Mapper> = TODO; // TODO(koan)

// 7. Construct the result inferred by produce from its factory.
export type ProduceResult<Factory> = TODO; // TODO(koan)

// 8. Construct the result inferred by transform from input and mapper.
export type TransformResult<Input, Mapper> = TODO; // TODO(koan)

// ─── Output wrapped in larger results ─────────────────────────────────────────

// 9. Preserve a factory's output behind one deferred function layer.
export type DeferredResult<Factory> = TODO; // TODO(koan)

// 10. Preserve a factory's output inside a promise.
export type PromiseFromResult<Factory> = TODO; // TODO(koan)

// 11. Construct an empty-list result, using unknown when no context exists.
export type EmptyListResult<Element = unknown> = TODO; // TODO(koan)

// 12. Construct an output-only result, using unknown when no context exists.
export type OutputOnlyResult<Context = unknown> = TODO; // TODO(koan)

// ─── Generic signatures ───────────────────────────────────────────────────────

// 13. Construct the generic produce signature.
export type ProduceSignature = TODO; // TODO(koan)

// 14. Construct the generic transform signature with independent slots.
export type TransformSignature = TODO; // TODO(koan)

// 15. Construct the generic defer signature.
export type DeferSignature = TODO; // TODO(koan)

// 16. Construct the output-only empty-list signature.
export type EmptyListSignature = TODO; // TODO(koan)

// 17. Construct the bare output-only signature.
export type OutputOnlySignature = TODO; // TODO(koan)

// 18. Construct the generic promise-producing signature.
export type PromiseFromSignature = TODO; // TODO(koan)

// ─── Expected types as evidence ───────────────────────────────────────────────

// 19. Extract contextual element evidence from an array shell.
export type ArrayContextElement<Expected> = TODO; // TODO(koan)

// 20. Extract contextual output evidence from a function shell.
export type FunctionContextResult<Expected> = TODO; // TODO(koan)

// 21. Extract contextual output evidence from a promise shell.
export type PromiseContextValue<Expected> = TODO; // TODO(koan)

// 22. Construct an annotated binding's visible type after compatibility checking.
export type ContextualBinding<Expression, Declared> = TODO; // TODO(koan)

// 23. Retain strong inferred evidence when it is compatible with context.
export type StrongEvidence<Inferred, Expected> = TODO; // TODO(koan)

// 24. Fix a factory output explicitly, rejecting an incompatible factory.
export type ExplicitFactory<Factory, Chosen> = TODO; // TODO(koan)

// 25. Construct the contextual void view that discards a return value.
export type ContextualVoid<Arguments extends readonly unknown[]> = TODO; // TODO(koan)

// 26. Construct a deferred async result with two function/promise layers.
export type AsyncDeferred<Produced> = TODO; // TODO(koan)

// 27. Classify absent, bottom, escape-hatch, and ordinary output evidence safely.
export type OutputKind<Value> = TODO; // TODO(koan)

// ─── Assertions ───────────────────────────────────────────────────────────────

type _01a = Expect<Equal<WidenReturn<"made">, string>>;
type _01b = Expect<Equal<WidenReturn<1>, number>>;
type _01c = Expect<Equal<WidenReturn<true>, boolean>>;
type _01d = Expect<Equal<WidenReturn<1n>, bigint>>;
type _01e = Expect<
  Equal<WidenReturn<{ readonly id: "a" }>, { readonly id: "a" }>
>;

type _02a = Expect<
  Equal<FactoryView<"made", false>, () => string>
>;
type _02b = Expect<
  Equal<FactoryView<"made", true>, () => "made">
>;
type _02c = Expect<
  Equal<FactoryView<1, false>, () => number>
>;
type _02d = Expect<
  Equal<
    FactoryView<{ readonly id: "a" }, true>,
    () => { readonly id: "a" }
  >
>;

type _03a = Expect<
  Equal<ConditionalFactory<"a", "b">, () => "a" | "b">
>;
type _03b = Expect<
  Equal<ConditionalFactory<1, "a">, () => 1 | "a">
>;
type _03c = Expect<
  Equal<ConditionalFactory<never, "only">, () => "only">
>;
type _03d = Expect<
  Equal<
    ConditionalFactory<{ id: string }, { id: string; extra: true }>,
    () => { id: string } | { id: string; extra: true }
  >
>;

type _04a = Expect<
  Equal<AnnotatedFactory<"yes" | "no">, () => "yes" | "no">
>;
type _04b = Expect<
  Equal<AnnotatedFactory<string | number>, () => string | number>
>;
type _04c = Expect<
  Equal<AnnotatedFactory<readonly [1, 2]>, () => readonly [1, 2]>
>;
type _04d = Expect<Equal<AnnotatedFactory<never>, () => never>>;

type _05a = Expect<Equal<ReturnCandidate<() => string>, string>>;
type _05b = Expect<Equal<ReturnCandidate<() => "made">, "made">>;
type _05c = Expect<
  Equal<
    ReturnCandidate<() => { readonly id: "a" }>,
    { readonly id: "a" }
  >
>;
type _05d = Expect<Equal<ReturnCandidate<() => never>, never>>;
type _05e = Expect<Equal<ReturnCandidate<string>, never>>;

type _06a = Expect<
  Equal<MapperOutput<string, (input: string) => number>, number>
>;
type _06b = Expect<
  Equal<
    MapperOutput<number, (input: number) => { doubled: number }>,
    { doubled: number }
  >
>;
type _06c = Expect<
  Equal<
    MapperOutput<"x", (input: "x") => readonly ["done", 200]>,
    readonly ["done", 200]
  >
>;
type _06d = Expect<
  Equal<MapperOutput<number, (input: string) => boolean>, never>
>;

type _07a = Expect<Equal<ProduceResult<() => string>, string>>;
type _07b = Expect<Equal<ProduceResult<() => "exact">, "exact">>;
type _07c = Expect<
  Equal<
    ProduceResult<() => { id: string }>,
    { id: string }
  >
>;
type _07d = Expect<Equal<ProduceResult<() => never>, never>>;

type _08a = Expect<
  Equal<TransformResult<string, (input: string) => number>, number>
>;
type _08b = Expect<
  Equal<
    TransformResult<number, (input: number) => { doubled: number }>,
    { doubled: number }
  >
>;
type _08c = Expect<
  Equal<
    TransformResult<readonly [1, 2], (input: readonly [1, 2]) => 2>,
    2
  >
>;
type _08d = Expect<
  Equal<TransformResult<unknown, (input: unknown) => boolean>, boolean>
>;

type _09a = Expect<
  Equal<DeferredResult<() => string>, () => string>
>;
type _09b = Expect<
  Equal<DeferredResult<() => "later">, () => "later">
>;
type _09c = Expect<
  Equal<
    DeferredResult<() => { readonly ready: true }>,
    () => { readonly ready: true }
  >
>;
type _09d = Expect<
  Equal<DeferredResult<() => never>, () => never>
>;

type _10a = Expect<
  Equal<PromiseFromResult<() => number>, Promise<number>>
>;
type _10b = Expect<
  Equal<PromiseFromResult<() => 1>, Promise<1>>
>;
type _10c = Expect<
  Equal<
    PromiseFromResult<() => { readonly ok: true }>,
    Promise<{ readonly ok: true }>
  >
>;
type _10d = Expect<
  Equal<PromiseFromResult<() => never>, Promise<never>>
>;

type _11a = Expect<Equal<EmptyListResult, unknown[]>>;
type _11b = Expect<Equal<EmptyListResult<string>, string[]>>;
type _11c = Expect<
  Equal<EmptyListResult<"a" | "b">, ("a" | "b")[]>
>;
type _11d = Expect<Equal<EmptyListResult<never>, never[]>>;

type _12a = Expect<Equal<OutputOnlyResult, unknown>>;
type _12b = Expect<Equal<OutputOnlyResult<string>, string>>;
type _12c = Expect<
  Equal<OutputOnlyResult<{ id: string }>, { id: string }>
>;
type _12d = Expect<
  Equal<OutputOnlyResult<readonly [1, 2]>, readonly [1, 2]>
>;
type _12e = Expect<Equal<OutputOnlyResult<never>, never>>;

type _13a = Expect<
  Equal<
    ProduceSignature,
    <Value>(factory: () => Value) => Value
  >
>;
type _13b = Expect<Equal<ReturnType<ProduceSignature>, unknown>>;
type _13c = Expect<
  Equal<Parameters<ProduceSignature>, [factory: () => unknown]>
>;

type _14a = Expect<
  Equal<
    TransformSignature,
    <InputValue, OutputValue>(
      input: InputValue,
      mapper: (input: InputValue) => OutputValue,
    ) => OutputValue
  >
>;
type _14b = Expect<Equal<ReturnType<TransformSignature>, unknown>>;
type _14c = Expect<
  Equal<
    Parameters<TransformSignature>,
    [input: unknown, mapper: (input: unknown) => unknown]
  >
>;

type _15a = Expect<
  Equal<
    DeferSignature,
    <Value>(factory: () => Value) => () => Value
  >
>;
type _15b = Expect<
  Equal<ReturnType<DeferSignature>, () => unknown>
>;
type _15c = Expect<
  Equal<Parameters<DeferSignature>, [factory: () => unknown]>
>;

type _16a = Expect<
  Equal<EmptyListSignature, <Value>() => Value[]>
>;
type _16b = Expect<Equal<ReturnType<EmptyListSignature>, unknown[]>>;
type _16c = Expect<Equal<Parameters<EmptyListSignature>, []>>;

type _17a = Expect<
  Equal<OutputOnlySignature, <Value>() => Value>
>;
type _17b = Expect<Equal<ReturnType<OutputOnlySignature>, unknown>>;
type _17c = Expect<Equal<Parameters<OutputOnlySignature>, []>>;

type _18a = Expect<
  Equal<
    PromiseFromSignature,
    <Value>(factory: () => Value) => Promise<Value>
  >
>;
type _18b = Expect<
  Equal<ReturnType<PromiseFromSignature>, Promise<unknown>>
>;
type _18c = Expect<
  Equal<Parameters<PromiseFromSignature>, [factory: () => unknown]>
>;

type _19a = Expect<Equal<ArrayContextElement<string[]>, string>>;
type _19b = Expect<
  Equal<ArrayContextElement<readonly [1, 2]>, 1 | 2>
>;
type _19c = Expect<
  Equal<ArrayContextElement<Array<{ id: string }>>, { id: string }>
>;
type _19d = Expect<Equal<ArrayContextElement<readonly []>, never>>;
type _19e = Expect<Equal<ArrayContextElement<string>, never>>;

type _20a = Expect<
  Equal<FunctionContextResult<() => number>, number>
>;
type _20b = Expect<
  Equal<FunctionContextResult<() => "a" | "b">, "a" | "b">
>;
type _20c = Expect<
  Equal<
    FunctionContextResult<() => { id: string }>,
    { id: string }
  >
>;
type _20d = Expect<Equal<FunctionContextResult<() => never>, never>>;
type _20e = Expect<Equal<FunctionContextResult<string>, never>>;

type _21a = Expect<
  Equal<PromiseContextValue<Promise<string>>, string>
>;
type _21b = Expect<
  Equal<PromiseContextValue<Promise<readonly [1, 2]>>, readonly [1, 2]>
>;
type _21c = Expect<
  Equal<
    PromiseContextValue<Promise<{ id: string }>>,
    { id: string }
  >
>;
type _21d = Expect<
  Equal<PromiseContextValue<Promise<never>>, never>
>;
type _21e = Expect<Equal<PromiseContextValue<string>, never>>;

type _22a = Expect<
  Equal<ContextualBinding<"a", string>, string>
>;
type _22b = Expect<
  Equal<
    ContextualBinding<{ id: string; extra: true }, { id: string }>,
    { id: string }
  >
>;
type _22c = Expect<
  Equal<
    ContextualBinding<readonly [1, 2], readonly [number, number]>,
    readonly [number, number]
  >
>;
type _22d = Expect<
  Equal<ContextualBinding<number, string>, never>
>;

type _23a = Expect<Equal<StrongEvidence<1, number>, 1>>;
type _23b = Expect<
  Equal<StrongEvidence<{ id: "a" }, { id: string }>, { id: "a" }>
>;
type _23c = Expect<
  Equal<StrongEvidence<"a", string | number>, "a">
>;
type _23d = Expect<
  Equal<StrongEvidence<number, string>, never>
>;
type _23e = Expect<Equal<StrongEvidence<never, unknown>, never>>;

type _24a = Expect<
  Equal<ExplicitFactory<() => "exact", string>, string>
>;
type _24b = Expect<
  Equal<
    ExplicitFactory<() => readonly [1, 2], readonly [1, 2]>,
    readonly [1, 2]
  >
>;
type _24c = Expect<
  Equal<ExplicitFactory<() => 1, string>, never>
>;
type _24d = Expect<
  Equal<ExplicitFactory<() => never, unknown>, unknown>
>;

type _25a = Expect<
  Equal<ContextualVoid<[]>, () => void>
>;
type _25b = Expect<
  Equal<ContextualVoid<[value: string]>, (value: string) => void>
>;
type _25c = Expect<
  Equal<
    ContextualVoid<[id: number, label?: string]>,
    (id: number, label?: string) => void
  >
>;
type _25d = Expect<
  Equal<ContextualVoid<readonly []>, () => void>
>;

type _26a = Expect<
  Equal<AsyncDeferred<number>, () => Promise<number>>
>;
type _26b = Expect<
  Equal<AsyncDeferred<1>, () => Promise<1>>
>;
type _26c = Expect<
  Equal<
    AsyncDeferred<{ readonly ready: true }>,
    () => Promise<{ readonly ready: true }>
  >
>;
type _26d = Expect<
  Equal<AsyncDeferred<never>, () => Promise<never>>
>;

type _27a = Expect<Equal<OutputKind<any>, "any">>;
type _27b = Expect<Equal<OutputKind<unknown>, "unknown">>;
type _27c = Expect<Equal<OutputKind<never>, "never">>;
type _27d = Expect<Equal<OutputKind<string | number>, "ordinary">>;
type _27e = Expect<Equal<OutputKind<Promise<string>>, "ordinary">>;
