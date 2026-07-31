import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-016: Generic methods and this — constructions
 * =============================================================================
 *
 * These constructions separate class-owned types, fresh method-owned types, and
 * receiver types. They build mapping, reduction, key selection, projection,
 * fluent receiver preservation, explicit fake-this signatures, invocation and
 * binding transformations, and extracted call surfaces. Replace each `TODO`
 * with a type that satisfies the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

interface GivenFluentBase {
  label(value: string): this;
  allLabels(): string[];
}

interface GivenSpecializedFluent extends GivenFluentBase {
  enabled: boolean;
  enable(): this;
}

type GivenModel = {
  id: number;
  name: string;
  active: boolean;
  optional?: Date;
};

// ─── Fresh generic method parameters ────────────────────────────────────────

// 1. Build a collection whose methods reuse Element and choose fresh results.
export type CollectionSurface<Element> =
  TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    CollectionSurface<number>,
    {
      readonly values: readonly number[];
      map<Result>(
        transform: (value: number, index: number) => Result,
      ): CollectionSurface<Result>;
      tap(effect: (value: number) => void): CollectionSurface<number>;
      reduce<Result>(
        initial: Result,
        combine: (result: Result, value: number) => Result,
      ): Result;
    }
  >
>;
type _01b = Expect<
  Equal<CollectionSurface<string>["values"], readonly string[]>
>;
type _01c = Expect<
  Equal<
    Parameters<CollectionSurface<boolean>["tap"]>,
    [effect: (value: boolean) => void]
  >
>;
type _01d = Expect<
  Equal<CollectionSurface<never>["values"], readonly never[]>
>;

// 2. Construct the independently generic map method for one element type.
export type MapMethod<Element> =
  TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    MapMethod<number>,
    <Result>(
      transform: (value: number, index: number) => Result,
    ) => CollectionSurface<Result>
  >
>;
type _02b = Expect<
  Equal<
    Parameters<MapMethod<string>>,
    [transform: (value: string, index: number) => unknown]
  >
>;
type _02c = Expect<
  Equal<
    ReturnType<MapMethod<boolean>>["values"],
    readonly unknown[]
  >
>;

// 3. Construct the independently generic reduce method.
export type ReduceMethod<Element> =
  TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    ReduceMethod<number>,
    <Result>(
      initial: Result,
      combine: (result: Result, value: number) => Result,
    ) => Result
  >
>;
type _03b = Expect<
  Equal<
    Parameters<ReduceMethod<string>>,
    [
      initial: unknown,
      combine: (result: unknown, value: string) => unknown,
    ]
  >
>;
type _03c = Expect<Equal<ReturnType<ReduceMethod<boolean>>, unknown>>;

// 4. Construct a side-effect method that returns its current receiver.
export type TapMethod<Element, Receiver> =
  TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    TapMethod<number, CollectionSurface<number>>,
    (
      this: CollectionSurface<number>,
      effect: (value: number) => void,
    ) => CollectionSurface<number>
  >
>;
type _04b = Expect<
  Equal<
    ThisParameterType<TapMethod<string, { tag: "words" }>>,
    { tag: "words" }
  >
>;
type _04c = Expect<
  Equal<
    Parameters<TapMethod<boolean, { tag: "flags" }>>,
    [effect: (value: boolean) => void]
  >
>;
type _04d = Expect<
  Equal<
    ReturnType<TapMethod<never, { tag: "empty" }>>,
    { tag: "empty" }
  >
>;

// ─── Related method parameters on a class-owned model ───────────────────────

// 5. Build the model surface with fresh key parameters on every method.
export type ModelSurface<Model extends object> =
  TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    ModelSurface<{ id: number; active: boolean }>,
    {
      value: { id: number; active: boolean };
      get<Key extends "id" | "active">(
        key: Key,
      ): { id: number; active: boolean }[Key];
      set<Key extends "id" | "active">(
        key: Key,
        value: { id: number; active: boolean }[Key],
      ): ModelSurface<{ id: number; active: boolean }>;
      project<Keys extends "id" | "active">(
        ...keys: Keys[]
      ): Pick<{ id: number; active: boolean }, Keys>;
    }
  >
>;
type _05b = Expect<
  Equal<ModelSurface<GivenModel>["value"], GivenModel>
>;
type _05c = Expect<
  Equal<
    ReturnType<ModelSurface<{ optional?: string }>["get"]>,
    string | undefined
  >
>;
type _05d = Expect<
  Equal<
    Parameters<ModelSurface<{ id: number }>["set"]>,
    [key: "id", value: number]
  >
>;

// 6. Construct the per-call related-key getter signature.
export type GetMethod<Model extends object> =
  TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    GetMethod<GivenModel>,
    <Key extends keyof GivenModel>(key: Key) => GivenModel[Key]
  >
>;
type _06b = Expect<
  Equal<ReturnType<GetMethod<{ id: number }>>, number>
>;
type _06c = Expect<
  Equal<
    ReturnType<GetMethod<{ id: number; name: string }>>,
    string | number
  >
>;
type _06d = Expect<
  Equal<
    ReturnType<GetMethod<{ optional?: Date }>>,
    Date | undefined
  >
>;

// 7. Construct the related-key projection method signature.
export type ProjectMethod<Model extends object> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    ProjectMethod<GivenModel>,
    <Keys extends keyof GivenModel>(
      ...keys: Keys[]
    ) => Pick<GivenModel, Keys>
  >
>;
type _07b = Expect<
  Equal<
    ReturnType<ProjectMethod<{ id: number; active: boolean }>>,
    Pick<{ id: number; active: boolean }, "id" | "active">
  >
>;
type _07c = Expect<
  Equal<
    Parameters<ProjectMethod<{ id: number }>>,
    ("id")[]
  >
>;

// 8. Build the projection selected by a key set, defaulting omission to all keys.
export type ModelProjection<
  Model extends object,
  Keys extends keyof Model = keyof Model,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<ModelProjection<GivenModel, "id">, { id: number }>
>;
type _08b = Expect<
  Equal<
    ModelProjection<GivenModel, "id" | "active">,
    { id: number; active: boolean }
  >
>;
type _08c = Expect<
  Equal<
    ModelProjection<GivenModel, "optional">,
    { optional?: Date }
  >
>;
type _08d = Expect<Equal<ModelProjection<GivenModel, never>, {}>>;
type _08e = Expect<Equal<ModelProjection<GivenModel>, GivenModel>>;

// 9. Construct the related-key fluent setter signature.
export type SetMethod<Model extends object, Receiver> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    SetMethod<GivenModel, ModelSurface<GivenModel>>,
    <Key extends keyof GivenModel>(
      this: ModelSurface<GivenModel>,
      key: Key,
      value: GivenModel[Key],
    ) => ModelSurface<GivenModel>
  >
>;
type _09b = Expect<
  Equal<
    ThisParameterType<SetMethod<{ id: number }, { tag: "model" }>>,
    { tag: "model" }
  >
>;
type _09c = Expect<
  Equal<
    Parameters<SetMethod<{ id: number }, { tag: "model" }>>,
    [key: "id", value: number]
  >
>;
type _09d = Expect<
  Equal<
    ReturnType<SetMethod<{ optional?: string }, { tag: "optional" }>>,
    { tag: "optional" }
  >
>;

// ─── Polymorphic this and static receiver views ─────────────────────────────

// 10. Produce the receiver retained by an inherited fluent label call.
export type LabelResult<Receiver extends GivenFluentBase> =
  TODO; // TODO(koan)

type _10a = Expect<Equal<LabelResult<GivenFluentBase>, GivenFluentBase>>;
type _10b = Expect<
  Equal<LabelResult<GivenSpecializedFluent>, GivenSpecializedFluent>
>;
type _10c = Expect<
  Equal<
    LabelResult<GivenSpecializedFluent>["enabled"],
    boolean
  >
>;

// 11. Produce the specialized receiver retained by enable.
export type EnableResult<Receiver extends GivenSpecializedFluent> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<EnableResult<GivenSpecializedFluent>, GivenSpecializedFluent>
>;
type _11b = Expect<
  Equal<
    ReturnType<EnableResult<GivenSpecializedFluent>["label"]>,
    GivenSpecializedFluent
  >
>;
type _11c = Expect<
  Equal<EnableResult<GivenSpecializedFluent>["enabled"], boolean>
>;

// ─── Explicit receiver parameters ───────────────────────────────────────────

// 12. Construct a function with a checked, erased receiver parameter.
export type ReceiverFunction<
  Receiver,
  Args extends unknown[],
  Result,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    ReceiverFunction<{ prefix: string }, [value: number], string>,
    (this: { prefix: string }, value: number) => string
  >
>;
type _12b = Expect<
  Equal<
    ReceiverFunction<
      { factor: number },
      [value: number, text: string],
      string
    >,
    (
      this: { factor: number },
      value: number,
      text: string,
    ) => string
  >
>;
type _12c = Expect<
  Equal<
    ReceiverFunction<unknown, [], void>,
    (this: unknown) => void
  >
>;
type _12d = Expect<
  Equal<
    ReceiverFunction<{ value: 1 }, [1, 2], true>,
    (this: { value: 1 }, ...args: [1, 2]) => true
  >
>;

// 13. Extract only the fake receiver type from a function.
export type ReceiverOf<FunctionType> =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    ReceiverOf<(this: { prefix: string }, value: number) => string>,
    { prefix: string }
  >
>;
type _13b = Expect<
  Equal<ReceiverOf<(this: { factor: number }) => void>, { factor: number }>
>;
type _13c = Expect<Equal<ReceiverOf<(value: number) => string>, unknown>>;

// 14. Remove the fake receiver while preserving runtime arguments and result.
export type WithoutReceiver<FunctionType> =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    WithoutReceiver<
      (this: { prefix: string }, value: number) => string
    >,
    (value: number) => string
  >
>;
type _14b = Expect<
  Equal<
    WithoutReceiver<
      (this: { factor: number }, value: number, text: string) => boolean
    >,
    (value: number, text: string) => boolean
  >
>;
type _14c = Expect<
  Equal<
    WithoutReceiver<(value: number) => string>,
    (value: number) => string
  >
>;

// 15. Extract runtime parameters, which never include the fake receiver.
export type RuntimeArguments<
  FunctionType extends (...args: any[]) => any,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    RuntimeArguments<
      (this: { prefix: string }, value: number) => string
    >,
    [value: number]
  >
>;
type _15b = Expect<
  Equal<
    RuntimeArguments<
      (this: { factor: number }, value: number, text: string) => string
    >,
    [value: number, text: string]
  >
>;
type _15c = Expect<
  Equal<RuntimeArguments<(this: unknown) => void>, []>
>;
type _15d = Expect<
  Equal<
    RuntimeArguments<(this: unknown, ...values: string[]) => void>,
    string[]
  >
>;

// 16. Construct the receiver-aware invocation helper signature.
export type InvokeWithSignature =
  TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    InvokeWithSignature,
    <Receiver, Args extends unknown[], Result>(
      fn: (this: Receiver, ...args: Args) => Result,
      receiver: Receiver,
      ...args: Args
    ) => Result
  >
>;
type _16b = Expect<Equal<ReturnType<InvokeWithSignature>, unknown>>;
type _16c = Expect<
  Equal<
    Parameters<InvokeWithSignature>,
    [
      fn: (this: unknown, ...args: unknown[]) => unknown,
      receiver: unknown,
      ...args: unknown[],
    ]
  >
>;

// ─── Binding and extraction ─────────────────────────────────────────────────

// 17. Produce the fully receiver-bound callable type.
export type BoundFunction<FunctionType> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    BoundFunction<
      (this: { prefix: string }, value: number, suffix: string) => string
    >,
    (value: number, suffix: string) => string
  >
>;
type _17b = Expect<
  Equal<
    BoundFunction<(this: { factor: number }) => number>,
    () => number
  >
>;
type _17c = Expect<
  Equal<
    BoundFunction<(this: unknown, value: readonly [1, 2]) => true>,
    (value: readonly [1, 2]) => true
  >
>;

// 18. Bind the receiver and first runtime argument, leaving only the tail.
export type BindFirstArgument<FunctionType> =
  TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    BindFirstArgument<
      (this: { prefix: string }, value: number, suffix: string) => string
    >,
    (suffix: string) => string
  >
>;
type _18b = Expect<
  Equal<
    BindFirstArgument<
      (this: { factor: number }, value: number, text: string, flag: boolean) => Date
    >,
    (text: string, flag: boolean) => Date
  >
>;
type _18c = Expect<
  Equal<
    BindFirstArgument<(this: unknown, value: number) => void>,
    () => void
  >
>;
type _18d = Expect<
  Equal<BindFirstArgument<(this: unknown) => void>, never>
>;

// 19. Build the call signature retained after a prototype method is extracted.
export type ExtractedMethod<Argument, Result> =
  TODO; // TODO(koan)

type _19a = Expect<
  Equal<ExtractedMethod<string, string>, (value: string) => string>
>;
type _19b = Expect<
  Equal<ExtractedMethod<number, boolean>, (value: number) => boolean>
>;
type _19c = Expect<
  Equal<
    ExtractedMethod<readonly [1, 2], { ok: true }>,
    (value: readonly [1, 2]) => { ok: true }
  >
>;
type _19d = Expect<
  Equal<Parameters<ExtractedMethod<never, void>>, [value: never]>
>;

// 20. Classify a special method result without allowing `any` to escape.
export type MethodResultKind<Result> =
  TODO; // TODO(koan)

type _20a = Expect<Equal<MethodResultKind<number | string>, "ordinary">>;
type _20b = Expect<Equal<MethodResultKind<any>, "any">>;
type _20c = Expect<Equal<MethodResultKind<unknown>, "unknown">>;
type _20d = Expect<Equal<MethodResultKind<never>, "never">>;
