import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-101: function argument tuples — constructions
 * =============================================================================
 *
 * These constructions expose parameter lists as tuples, transform their
 * required, optional, and rest positions, then rebuild call signatures without
 * changing result types. They also make the extraction limits around `this`,
 * generics, overloads, unions, and special function types explicit. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenAnyFunction =
  (...args: any[]) => unknown;

type GivenPrependArgument<
  Fn extends GivenAnyFunction,
  Value,
> = (...args: [value: Value, ...rest: Parameters<Fn>]) => ReturnType<Fn>;

type GivenAppendArgument<
  Fn extends GivenAnyFunction,
  Value,
> = (...args: [...rest: Parameters<Fn>, value: Value]) => ReturnType<Fn>;

type GivenDropFirstArgument<
  Fn extends GivenAnyFunction,
> = Fn extends (first: any, ...rest: infer Rest) => infer Result
  ? (...args: Rest) => Result
  : never;

type GivenDropLastArgument<
  Fn extends GivenAnyFunction,
> = Parameters<Fn> extends [...infer Init, unknown]
  ? (...args: Init) => ReturnType<Fn>
  : never;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

interface GivenOverloaded {
  (value: string): number;
  (value: number, radix: number): string;
}

type GivenUnionFunction =
  | ((value: string) => 1)
  | ((value: number, flag: boolean) => 2);

// ─── Extraction and signature rebuilding ─────────────────────────────

// 1. Extract the complete ordinary argument tuple from a function.
export type FunctionArguments<
  Fn extends GivenAnyFunction,
> = TODO; // TODO(koan)

type _01a = Expect<Equal<FunctionArguments<() => void>, []>>;
type _01b = Expect<
  Equal<FunctionArguments<(value: string) => void>, [value: string]>
>;
type _01c = Expect<
  Equal<
    FunctionArguments<(path: string, retries: number, force?: boolean) => void>,
    [path: string, retries: number, force?: boolean | undefined]
  >
>;
type _01d = Expect<
  Equal<FunctionArguments<(...values: number[]) => void>, number[]>
>;
type _01e = Expect<
  Equal<
    FunctionArguments<(head: string, ...tail: number[]) => void>,
    [head: string, ...tail: number[]]
  >
>;

// 2. Extract the function result while leaving the argument tuple irrelevant.
export type FunctionResult<
  Fn extends GivenAnyFunction,
> = TODO; // TODO(koan)

type _02a = Expect<Equal<FunctionResult<() => void>, void>>;
type _02b = Expect<
  Equal<FunctionResult<(value: string) => number>, number>
>;
type _02c = Expect<
  Equal<FunctionResult<(...values: number[]) => Promise<boolean>>, Promise<boolean>>
>;
type _02d = Expect<
  Equal<FunctionResult<((value: string) => 1) | ((value: number) => 2)>, 1 | 2>
>;
type _02e = Expect<Equal<FunctionResult<never>, never>>;

// 3. Prepend one required argument and retain the original result type.
export type PrependFunctionArgument<
  Fn extends GivenAnyFunction,
  Value,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<Parameters<PrependFunctionArgument<() => void, string>>, [value: string]>
>;
type _03b = Expect<
  Equal<
    Parameters<PrependFunctionArgument<(count: number) => boolean, Date>>,
    [value: Date, count: number]
  >
>;
type _03c = Expect<
  Equal<
    Parameters<PrependFunctionArgument<(count?: number) => void, string>>,
    [value: string, count?: number | undefined]
  >
>;
type _03d = Expect<
  Equal<
    Parameters<PrependFunctionArgument<(...values: number[]) => void, string>>,
    [value: string, ...values: number[]]
  >
>;
type _03e = Expect<
  Equal<
    ReturnType<PrependFunctionArgument<(count: number) => Promise<boolean>, Date>>,
    Promise<boolean>
  >
>;

// 4. Append one required argument, normalizing earlier optional positions.
export type AppendFunctionArgument<
  Fn extends GivenAnyFunction,
  Value,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<Parameters<AppendFunctionArgument<() => void, string>>, [value: string]>
>;
type _04b = Expect<
  Equal<
    Parameters<AppendFunctionArgument<(count: number) => boolean, string>>,
    [count: number, value: string]
  >
>;
type _04c = Expect<
  Equal<
    Parameters<AppendFunctionArgument<(count?: number) => void, string>>,
    [count: number | undefined, value: string]
  >
>;
type _04d = Expect<
  Equal<
    Parameters<AppendFunctionArgument<(...values: number[]) => void, string>>,
    [...values: number[], value: string]
  >
>;
type _04e = Expect<
  Equal<
    ReturnType<AppendFunctionArgument<(count: number) => Promise<boolean>, Date>>,
    Promise<boolean>
  >
>;

// 5. Remove the first parameter matched by function-signature inference.
export type DropFirstFunctionArgument<
  Fn extends GivenAnyFunction,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    Parameters<DropFirstFunctionArgument<(value: string) => number>>,
    []
  >
>;
type _05b = Expect<
  Equal<
    Parameters<
      DropFirstFunctionArgument<(value: string, count: number) => boolean>
    >,
    [count: number]
  >
>;
type _05c = Expect<
  Equal<
    Parameters<
      DropFirstFunctionArgument<(head: string, ...tail: number[]) => boolean>
    >,
    number[]
  >
>;
type _05d = Expect<
  Equal<DropFirstFunctionArgument<(value?: string) => number>, () => number>
>;
type _05e = Expect<
  Equal<
    ReturnType<
      DropFirstFunctionArgument<(value: string, count: number) => boolean>
    >,
    boolean
  >
>;

// 6. Remove a guaranteed last argument and retain the preceding call shape.
export type DropLastFunctionArgument<
  Fn extends GivenAnyFunction,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    Parameters<DropLastFunctionArgument<(value: string) => number>>,
    []
  >
>;
type _06b = Expect<
  Equal<
    Parameters<
      DropLastFunctionArgument<(value: string, count: number) => boolean>
    >,
    [value: string]
  >
>;
type _06c = Expect<
  Equal<DropLastFunctionArgument<(value?: string) => number>, never>
>;
type _06d = Expect<
  Equal<DropLastFunctionArgument<(...values: number[]) => boolean>, never>
>;
type _06e = Expect<
  Equal<
    ReturnType<
      DropLastFunctionArgument<(value: string, count: number) => boolean>
    >,
    boolean
  >
>;

// 7. Remove both required endpoints by composing the given endpoint transforms.
export type DropFunctionEndpoints<
  Fn extends GivenAnyFunction,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    Parameters<
      DropFunctionEndpoints<(first: 1, middle: 2, last: 3) => 4>
    >,
    [middle: 2]
  >
>;
type _07b = Expect<
  Equal<
    Parameters<
      DropFunctionEndpoints<(first: 1, a: 2, b: 3, last: 4) => 5>
    >,
    [a: 2, b: 3]
  >
>;
type _07c = Expect<
  Equal<
    ReturnType<
      DropFunctionEndpoints<(first: 1, middle: 2, last: 3) => 4>
    >,
    4
  >
>;
type _07d = Expect<
  Equal<DropFunctionEndpoints<(first: 1, last?: 2) => 3>, never>
>;
type _07e = Expect<
  Equal<DropFunctionEndpoints<(...values: number[]) => boolean>, never>
>;

// ─── Parameter-shape transformations ─────────────────────────────────

// 8. Describe zero, optional, rest, labeled-rest, and `this` extraction.
export type ParameterShapeProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<ParameterShapeProfile["zero"], []>>;
type _08b = Expect<
  Equal<ParameterShapeProfile["optional"], [value?: string | undefined]>
>;
type _08c = Expect<Equal<ParameterShapeProfile["rest"], number[]>>;
type _08d = Expect<
  Equal<
    ParameterShapeProfile["labeledRest"],
    [value: string, count?: number]
  >
>;
type _08e = Expect<
  Equal<ParameterShapeProfile["explicitThis"], [value: number]>
>;

// 9. Describe prepending across empty, optional, rest, and special positions.
export type PrependArgumentProfile = TODO; // TODO(koan)

type _09a = Expect<
  Equal<PrependArgumentProfile["empty"], [value: string]>
>;
type _09b = Expect<
  Equal<
    PrependArgumentProfile["optional"],
    [value: string, value?: number | undefined]
  >
>;
type _09c = Expect<
  Equal<
    PrependArgumentProfile["rest"],
    [value: string, ...values: number[]]
  >
>;
type _09d = Expect<
  Equal<PrependArgumentProfile["neverValue"], [value: never]>
>;
type _09e = Expect<Equal<PrependArgumentProfile["length"], 2 | 3>>;

// 10. Describe appending across optional and open parameter lists.
export type AppendArgumentProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<AppendArgumentProfile["empty"], [value: string]>
>;
type _10b = Expect<
  Equal<
    AppendArgumentProfile["optional"],
    [value: number | undefined, value: string]
  >
>;
type _10c = Expect<
  Equal<
    AppendArgumentProfile["optionalTail"],
    [first: number, flag: boolean | undefined, value: string]
  >
>;
type _10d = Expect<
  Equal<
    AppendArgumentProfile["rest"],
    [...values: number[], value: string]
  >
>;
type _10e = Expect<
  Equal<
    AppendArgumentProfile["openPrefix"],
    [first: 1, ...rest: 2[], value: 4]
  >
>;

// 11. Contrast function-level first inference with required-last tuple matching.
export type DropArgumentProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    Parameters<DropArgumentProfile["firstRequired"]>,
    [second?: number | undefined]
  >
>;
type _11b = Expect<
  Equal<DropArgumentProfile["firstOptional"], () => boolean>
>;
type _11c = Expect<
  Equal<Parameters<DropArgumentProfile["lastRequired"]>, [first: string]>
>;
type _11d = Expect<Equal<DropArgumentProfile["lastOptional"], never>>;
type _11e = Expect<Equal<DropArgumentProfile["lastRest"], never>>;

// ─── Extraction limits and special function types ────────────────────

// 12. Keep an explicit `this` parameter separate from ordinary arguments.
export type ThisParameterProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    ThisParameterProfile["arguments"],
    [value: number, format?: string | undefined]
  >
>;
type _12b = Expect<Equal<ThisParameterProfile["receiver"], Date>>;
type _12c = Expect<
  Equal<
    ThisParameterProfile["omitted"],
    (value: number, format?: string | undefined) => string
  >
>;
type _12d = Expect<
  Equal<
    ThisParameterProfile["omittedArguments"],
    [value: number, format?: string | undefined]
  >
>;
type _12e = Expect<
  Equal<
    ThisParameterProfile["prepended"],
    [value: string, value: number, format?: string | undefined]
  >
>;

// 13. Describe how utility extraction widens generic call signatures.
export type GenericFunctionProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<GenericFunctionProfile["identityArguments"], [value: unknown]>
>;
type _13b = Expect<
  Equal<GenericFunctionProfile["identityResult"], unknown>
>;
type _13c = Expect<
  Equal<
    GenericFunctionProfile["pairArguments"],
    [left: unknown, right: unknown]
  >
>;
type _13d = Expect<
  Equal<GenericFunctionProfile["pairResult"], [unknown, unknown]>
>;
type _13e = Expect<
  Equal<GenericFunctionProfile["prepended"], [value: Date, value: unknown]>
>;

// 14. Observe the last declared call signature when extracting an overload set.
export type OverloadedFunctionProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    OverloadedFunctionProfile["arguments"],
    [value: number, radix: number]
  >
>;
type _14b = Expect<Equal<OverloadedFunctionProfile["result"], string>>;
type _14c = Expect<
  Equal<
    OverloadedFunctionProfile["prepended"],
    [value: Date, value: number, radix: number]
  >
>;
type _14d = Expect<
  Equal<OverloadedFunctionProfile["droppedFirst"], [radix: number]>
>;
type _14e = Expect<
  Equal<OverloadedFunctionProfile["droppedLast"], [value: number]>
>;

// 15. Describe distribution and whole-union tuple inference for union functions.
export type UnionFunctionProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    UnionFunctionProfile["arguments"],
    [value: string] | [value: number, flag: boolean]
  >
>;
type _15b = Expect<Equal<UnionFunctionProfile["result"], 1 | 2>>;
type _15c = Expect<
  Equal<UnionFunctionProfile["droppedFirst"], [] | [flag: boolean]>
>;
type _15d = Expect<
  Equal<
    UnionFunctionProfile["droppedLast"],
    (...args: [] | [value: number]) => 1 | 2
  >
>;
type _15e = Expect<
  Equal<
    UnionFunctionProfile["prepended"],
    [value: Date, value: string]
      | [value: Date, value: number, flag: boolean]
  >
>;

// 16. Classify `never` and `any` at utility-type boundaries.
export type SpecialFunctionProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<SpecialFunctionProfile["neverArguments"], never>>;
type _16b = Expect<
  Equal<SpecialFunctionProfile["anyArgumentIsAny"], false>
>;
type _16c = Expect<
  Equal<SpecialFunctionProfile["neverDropFirst"], never>
>;
type _16d = Expect<
  Equal<SpecialFunctionProfile["neverDropLast"], (...args: unknown[]) => never>
>;
type _16e = Expect<
  Equal<SpecialFunctionProfile["anyResultIsAny"], true>
>;

// 17. Rebuild and compose signatures while keeping one result type throughout.
export type RebuiltSignatureProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    RebuiltSignatureProfile["prependArguments"],
    [value: Date, path: string, count: number]
  >
>;
type _17b = Expect<
  Equal<
    RebuiltSignatureProfile["appendArguments"],
    [path: string, count: number, value: AbortSignal]
  >
>;
type _17c = Expect<
  Equal<RebuiltSignatureProfile["dropFirstArguments"], [count: number]>
>;
type _17d = Expect<
  Equal<RebuiltSignatureProfile["dropLastArguments"], [path: string]>
>;
type _17e = Expect<
  Equal<RebuiltSignatureProfile["composedResult"], Promise<boolean>>
>;

// 18. Build the runtime signatures for invoking, binding, and adding trace context.
export type ArgumentRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    ArgumentRuntimeApi["invoke"],
    <Args extends unknown[], Result>(
      fn: (...args: Args) => Result,
      args: Args,
    ) => Result
  >
>;
type _18b = Expect<
  Equal<
    ArgumentRuntimeApi["bindFirst"],
    <First, Rest extends unknown[], Result>(
      fn: (first: First, ...rest: Rest) => Result,
      first: First,
    ) => (...rest: Rest) => Result
  >
>;
type _18c = Expect<
  Equal<
    ArgumentRuntimeApi["bindLast"],
    <Prefix extends unknown[], Last, Result>(
      fn: (...args: [...Prefix, Last]) => Result,
      last: Last,
    ) => (...args: Prefix) => Result
  >
>;
type _18d = Expect<
  Equal<
    ArgumentRuntimeApi["withTrace"],
    <Args extends unknown[], Result>(
      fn: (...args: Args) => Result,
    ) => (traceId: string, ...args: Args) => Result
  >
>;
type _18e = Expect<
  Equal<ReturnType<ArgumentRuntimeApi["invoke"]>, unknown>
>;
