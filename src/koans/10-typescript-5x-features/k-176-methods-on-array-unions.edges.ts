import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type Book,
  type CombinedScalar,
  type ElementOf,
  type ReadonlyScalarArrays,
  type ScalarArrays,
  filterTruthy,
  findFirst,
  findPrologue,
} from "./k-176-methods-on-array-unions.js";

/** EDGE CASES: fresh results lose container correlation, mutation remains guarded, readonly arrays keep their read-only source contract, tuples lose positional precision, and top/bottom types alter the element union. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type MethodReturn<Arrays extends readonly unknown[]> =
  Arrays extends readonly unknown[] ? ElementOf<Arrays>[] : never;

// Pre-solved demonstrations make the precision trade explicit.
type _DemoCombined = Expect<Equal<ElementOf<ScalarArrays>, string | number>>;
type _DemoFresh = Expect<Equal<ReturnType<typeof filterTruthy>, Array<string | number>>>;
type _DemoNotContainerUnion = Expect<Equal<
  Extends<Array<string | number>, string[] | number[]>,
  false
>>;
type _DemoSourceUnchanged = Expect<Equal<Parameters<typeof filterTruthy>[0], ScalarArrays>>;

// 1. The fallback trades correlated containers for callable methods (1-8)
type _01 = Expect<Equal<ReturnType<typeof filterTruthy>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<ReturnType<typeof filterTruthy>, ScalarArrays>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<ScalarArrays, ReturnType<typeof filterTruthy>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<typeof filterTruthy>[0], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Parameters<typeof findFirst>[0], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof findFirst>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<MethodReturn<ScalarArrays>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<MethodReturn<string[] | number[]>[number], TODO>>; // TODO(koan) @koan-error

// 2. Reads combine safely; writes cannot choose a member's element type (9-15)
type PushArgument = Parameters<ScalarArrays["push"]>[0];
type _09 = Expect<Equal<ScalarArrays[number], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<PushArgument, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<string, PushArgument>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<number, PushArgument>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<CombinedScalar, PushArgument>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ScalarArrays["pop"] extends (...args: never[]) => infer Result ? Result : never, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReadonlyScalarArrays extends { push(...args: unknown[]): unknown } ? true : false, TODO>>; // TODO(koan) @koan-error

// 3. Tuples and empty arrays reveal lost shape (16-22)
type TupleUnion = [id: string, active: boolean] | [x: number, y: number];
type _16 = Expect<Equal<ElementOf<TupleUnion>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Array<ElementOf<TupleUnion>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Array<ElementOf<TupleUnion>>, TupleUnion>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ElementOf<[] | string[]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<MethodReturn<[] | string[]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ElementOf<readonly [] | readonly [1]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<(readonly [] | readonly [1])["length"], TODO>>; // TODO(koan) @koan-error

// 4. Domain correlation and top/bottom types remain sharp edges (23-30)
type _23 = Expect<Equal<Book["chapters"][number], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReturnType<typeof findPrologue>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Exclude<ReturnType<typeof findPrologue>, undefined>, Book["chapters"][number]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ElementOf<never[] | string[]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ElementOf<unknown[] | string[]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<IsAny<ElementOf<any[] | string[]>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ElementOf<readonly never[]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<readonly unknown[], ReadonlyScalarArrays>, TODO>>; // TODO(koan) @koan-error
