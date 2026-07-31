import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-020: Higher-order generic inference — constructions
 * =============================================================================
 *
 * These constructions build returned generic functions, genericity-preserving
 * and monomorphic compositions, constrained propagation, erased and instantiated
 * views, partial applications, lifted transforms, closure captures, and generic
 * preservation constraints. Replace each `TODO` with a type that satisfies the
 * assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

// ─── Returned and preserved generic call signatures ─────────────────────────

// 1. Construct a reusable identity that chooses a fresh type per call.
export type GenericIdentity =
  TODO; // TODO(koan)

type _01a = Expect<Equal<GenericIdentity, <Value>(value: Value) => Value>>;
type _01b = Expect<Equal<ReturnType<GenericIdentity>, unknown>>;
type _01c = Expect<
  Equal<GenericIdentity extends <Value>(value: Value) => Value ? true : false, true>
>;

// 2. Construct the factory that returns a still-generic identity.
export type IdentityFactory =
  TODO; // TODO(koan)

type _02a = Expect<
  Equal<IdentityFactory, () => <Value>(value: Value) => Value>
>;
type _02b = Expect<
  Equal<ReturnType<IdentityFactory>, <Value>(value: Value) => Value>
>;
type _02c = Expect<
  Equal<ReturnType<ReturnType<IdentityFactory>>, unknown>
>;

// 3. Build a generic scalar-to-array transform.
export type GenericToArray =
  TODO; // TODO(koan)

type _03a = Expect<
  Equal<GenericToArray, <Value>(value: Value) => Value[]>
>;
type _03b = Expect<Equal<ReturnType<GenericToArray>, unknown[]>>;
type _03c = Expect<
  Equal<GenericToArray extends <Value>(value: Value) => Value[] ? true : false, true>
>;

// 4. Build a generic value-to-box transform.
export type GenericToBox =
  TODO; // TODO(koan)

type _04a = Expect<
  Equal<GenericToBox, <Value>(value: Value) => { value: Value }>
>;
type _04b = Expect<
  Equal<ReturnType<GenericToBox>, { value: unknown }>
>;
type _04c = Expect<
  Equal<
    GenericToBox extends <Value>(value: Value) => { value: Value }
      ? true
      : false,
    true
  >
>;

// 5. Preserve a generic identity through a constrained higher-order helper.
export type PreserveGenericSignature =
  TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    PreserveGenericSignature,
    <Fn extends <Value>(value: Value) => Value>(fn: Fn) => Fn
  >
>;
type _05b = Expect<
  Equal<
    ReturnType<PreserveGenericSignature>,
    <Value>(value: Value) => Value
  >
>;
type _05c = Expect<
  Equal<
    Parameters<PreserveGenericSignature>,
    [fn: <Value>(value: Value) => Value]
  >
>;

// ─── Composition propagation, fixing, and erasure ───────────────────────────

// 6. Compose generic array and box stages while propagating one future Value.
export type GenericBoxedArray =
  TODO; // TODO(koan)

type _06a = Expect<
  Equal<GenericBoxedArray, <Value>(value: Value) => { value: Value[] }>
>;
type _06b = Expect<
  Equal<ReturnType<GenericBoxedArray>, { value: unknown[] }>
>;
type _06c = Expect<
  Equal<
    GenericBoxedArray extends <Value>(value: Value) => { value: Value[] }
      ? true
      : false,
    true
  >
>;

// 7. Compose generic box and array stages in the reverse order.
export type GenericArrayOfBoxes =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    GenericArrayOfBoxes,
    <Value>(value: Value) => Array<{ value: Value }>
  >
>;
type _07b = Expect<
  Equal<ReturnType<GenericArrayOfBoxes>, Array<{ value: unknown }>>
>;
type _07c = Expect<
  Equal<
    GenericArrayOfBoxes extends <Value>(value: Value) => Array<{ value: Value }>
      ? true
      : false,
    true
  >
>;

// 8. Build a monomorphic composition after concrete stages select all slots.
export type ConcreteComposition<Input, Middle, Output> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<ConcreteComposition<string, string, number>, (value: string) => number>
>;
type _08b = Expect<
  Equal<ConcreteComposition<number, boolean, string>, (value: number) => string>
>;
type _08c = Expect<
  Equal<
    ConcreteComposition<{ id: number }, number, string>,
    (value: { id: number }) => string
  >
>;
type _08d = Expect<
  Equal<ConcreteComposition<never, never[], number>, (value: never) => number>
>;

// 9. Propagate an object constraint into a returned generic composition.
export type ConstrainedBoxedArray =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    ConstrainedBoxedArray,
    <Value extends { id: string }>(value: Value) => { value: Value[] }
  >
>;
type _09b = Expect<
  Equal<
    ReturnType<ConstrainedBoxedArray>,
    { value: { id: string }[] }
  >
>;
type _09c = Expect<
  Equal<
    Parameters<ConstrainedBoxedArray>,
    [value: { id: string }]
  >
>;

// 10. Build the monomorphic view produced by explicitly erasing a generic stage.
export type ErasedBoxedArray =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<ErasedBoxedArray, (value: unknown) => { value: unknown[] }>
>;
type _10b = Expect<
  Equal<ReturnType<ErasedBoxedArray>, { value: unknown[] }>
>;
type _10c = Expect<
  Equal<Parameters<ErasedBoxedArray>, [value: unknown]>
>;

// 11. Construct the ordinary compose helper signature.
export type ComposeSignature =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ComposeSignature,
    <Input, Middle, Output>(
      first: (value: Input) => Middle,
      second: (value: Middle) => Output,
    ) => (value: Input) => Output
  >
>;
type _11b = Expect<
  Equal<ReturnType<ComposeSignature>, (value: unknown) => unknown>
>;

// ─── Instantiation and broad views ──────────────────────────────────────────

// 12. Fix a generic identity to one explicitly selected argument.
export type InstantiatedIdentity<Value> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<InstantiatedIdentity<string>, (value: string) => string>
>;
type _12b = Expect<
  Equal<InstantiatedIdentity<number>, (value: number) => number>
>;
type _12c = Expect<
  Equal<
    InstantiatedIdentity<readonly [1, 2]>,
    (value: readonly [1, 2]) => readonly [1, 2]
  >
>;
type _12d = Expect<
  Equal<InstantiatedIdentity<never>, (value: never) => never>
>;

// 13. Fix a generic array transform without invoking it.
export type InstantiatedArray<Value> =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<InstantiatedArray<string>, (value: string) => string[]>
>;
type _13b = Expect<
  Equal<InstantiatedArray<number | string>, (value: number | string) => (number | string)[]>
>;
type _13c = Expect<
  Equal<InstantiatedArray<unknown>, (value: unknown) => unknown[]>
>;
type _13d = Expect<
  Equal<InstantiatedArray<never>, (value: never) => never[]>
>;

// 14. Build a broad monomorphic identity view that erases correlation.
export type ErasedIdentity =
  TODO; // TODO(koan)

type _14a = Expect<Equal<ErasedIdentity, (value: unknown) => unknown>>;
type _14b = Expect<Equal<ReturnType<ErasedIdentity>, unknown>>;
type _14c = Expect<Equal<Parameters<ErasedIdentity>, [value: unknown]>>;

// ─── Partial application and remaining tuples ───────────────────────────────

// 15. Remove only the bound first parameter and preserve the remaining tuple.
export type BoundFirst<Rest extends unknown[], Result> =
  TODO; // TODO(koan)

type _15a = Expect<
  Equal<BoundFirst<[value: number, suffix: string], string>, (value: number, suffix: string) => string>
>;
type _15b = Expect<
  Equal<BoundFirst<[right: number], number>, (right: number) => number>
>;
type _15c = Expect<
  Equal<BoundFirst<[yes: string, no: string], string>, (yes: string, no: string) => string>
>;
type _15d = Expect<
  Equal<BoundFirst<string[], Array<number | string>>, (...rest: string[]) => Array<number | string>>
>;

// 16. Construct the complete bind-first helper signature.
export type BindFirstSignature =
  TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    BindFirstSignature,
    <First, Rest extends unknown[], Result>(
      fn: (first: First, ...rest: Rest) => Result,
      first: First,
    ) => (...rest: Rest) => Result
  >
>;
type _16b = Expect<
  Equal<ReturnType<BindFirstSignature>, (...rest: unknown[]) => unknown>
>;

// 17. Model the ordinary helper's loss when partially applying a generic pair.
export type BoundGenericPair =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<BoundGenericPair, (right: unknown) => [unknown, unknown]>
>;
type _17b = Expect<
  Equal<ReturnType<BoundGenericPair>, [unknown, unknown]>
>;
type _17c = Expect<
  Equal<Parameters<BoundGenericPair>, [right: unknown]>
>;

// ─── Lifted collection transforms and closure capture ───────────────────────

// 18. Lift a scalar relationship over a readonly input collection.
export type LiftedTransform<Input, Output> =
  TODO; // TODO(koan)

type _18a = Expect<
  Equal<LiftedTransform<number, string>, (values: readonly number[]) => string[]>
>;
type _18b = Expect<
  Equal<
    LiftedTransform<{ id: number }, number>,
    (values: readonly { id: number }[]) => number[]
  >
>;
type _18c = Expect<
  Equal<
    LiftedTransform<string, readonly [string]>,
    (values: readonly string[]) => (readonly [string])[]
  >
>;
type _18d = Expect<
  Equal<LiftedTransform<never, never>, (values: readonly never[]) => never[]>
>;

// 19. Construct the complete lift helper signature.
export type LiftSignature =
  TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    LiftSignature,
    <Input, Output>(
      transform: (value: Input) => Output,
    ) => (values: readonly Input[]) => Output[]
  >
>;
type _19b = Expect<
  Equal<ReturnType<LiftSignature>, (values: readonly unknown[]) => unknown[]>
>;

// 20. Capture a selected value type inside a returned closure.
export type CapturedClosure<Value, Result> =
  TODO; // TODO(koan)

type _20a = Expect<
  Equal<CapturedClosure<number, string>, (value: number) => () => string>
>;
type _20b = Expect<
  Equal<
    CapturedClosure<{ id: number }, { id: number }>,
    (value: { id: number }) => () => { id: number }
  >
>;
type _20c = Expect<
  Equal<CapturedClosure<unknown, unknown>, (value: unknown) => () => unknown>
>;
type _20d = Expect<
  Equal<CapturedClosure<never, never>, (value: never) => () => never>
>;

// 21. Classify a lifted or composed result without allowing `any` to escape.
export type HigherOrderResultKind<Result> =
  TODO; // TODO(koan)

type _21a = Expect<Equal<HigherOrderResultKind<number[]>, "ordinary">>;
type _21b = Expect<Equal<HigherOrderResultKind<any>, "any">>;
type _21c = Expect<Equal<HigherOrderResultKind<unknown>, "unknown">>;
type _21d = Expect<Equal<HigherOrderResultKind<never>, "never">>;
