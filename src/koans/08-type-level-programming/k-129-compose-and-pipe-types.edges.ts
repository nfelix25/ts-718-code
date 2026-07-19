import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  ComposeResult,
  IsPipeable,
  PipeResult,
  PipeStages,
} from "./k-129-compose-and-pipe-types.js";

/** EDGE CASES: never ambiguity, broad tuples, generic functions, unions, and arity. */

type PR<I, F extends readonly unknown[]> = PipeResult<I, F>;
type PS<I, F extends readonly unknown[]> = PipeStages<I, F>;
type OK<I, F extends readonly unknown[]> = IsPipeable<I, F>;
type CR<I, F extends readonly unknown[]> = ComposeResult<I, F>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoIdentity = Expect<Equal<PR<string, []>, string>>;
type _DemoValidNever = Expect<Equal<OK<string, [(x: string) => never]>, true>>;
type _DemoInvalidAlsoNever = Expect<Equal<PR<string, [(x: number) => boolean]>, never>>;
type _DemoInvalidFlag = Expect<Equal<OK<string, [(x: number) => boolean]>, false>>;
type _DemoBroadTupleCannotBeDecomposed = Expect<Equal<PR<string, unknown[]>, string>>;
type _DemoStagesIncludeInput = Expect<Equal<PS<string, [(x: string) => number]>, [string, number]>>;

// 1. never can be a valid output or an invalid sentinel (1-8)
type _01 = Expect<Equal<PR<string, [(x: string) => never]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<OK<string, [(x: string) => never]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<PR<string, [(x: number) => never]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<OK<string, [(x: number) => never]>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<PR<string, [(x: string) => never, (x: never) => 1]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<OK<string, [(x: string) => never, (x: never) => 1]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<PR<never, [(x: string) => 1]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<OK<never, [(x: string) => 1]>, TODO>>; // TODO(koan) @koan-error

// 2. Function union and intersection inference (9-16)
type _09 = Expect<Equal<PR<string, [((x: string) => 1) | ((x: string) => 2)]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<PR<string, [((x: string) => 1) & ((x: string) => 2)]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<PR<string, [((x: string) => 1) | ((x: number) => 2)]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<OK<string, [((x: string) => 1) | ((x: number) => 2)]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<PR<"x", [((x: string) => 1) | ((x: "x") => 2)]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CR<string, [((x: number) => 1) | ((x: boolean) => 2), (x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<PS<string, [((x: string) => 1) | ((x: string) => 2)]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<OK<string, [((x: string) => 1) & ((x: number) => 2)]>, TODO>>; // TODO(koan) @koan-error

// 3. Unary matching and generic functions (17-23)
type _17 = Expect<Equal<PR<string, [(x: string, optional?: number) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<OK<string, [(x: string, required: number) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<PR<string, [() => number]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<PR<string, [<T>(value: T) => T]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<PR<string, [<T extends string>(value: T) => T]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<PS<string, [<T>(value: T) => T, (value: unknown) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<OK<string, [<T>(value: T) => T, (value: string) => boolean]>, TODO>>; // TODO(koan) @koan-error

// 4. any, unknown, and broad tuple boundaries (24-30)
type _24 = Expect<Equal<IsAny<PR<any, []>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<IsAny<PR<string, [(x: string) => any]>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<PR<unknown, [(x: unknown) => string]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<OK<unknown, [(x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<PR<string, unknown[]>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<PS<string, unknown[]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<CR<string, unknown[]>, TODO>>; // TODO(koan) @koan-error
