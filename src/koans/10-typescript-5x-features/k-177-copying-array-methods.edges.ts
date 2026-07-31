import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type CopyResult,
  replaceCopy,
  reverseCopy,
  sortCopy,
  spliceCopy,
} from "./k-177-copying-array-methods.js";

/** EDGE CASES: copying removes readonly at the result boundary but not from the source, tuples and labels collapse, replacement is element-constrained, copies are shallow, sparse slots densify, and runtime bounds still matter. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;

// Pre-solved demonstrations distinguish copying from deep immutability.
type _DemoReadonlyInput = Expect<Equal<Parameters<typeof reverseCopy<number>>[0], readonly number[]>>;
type _DemoMutableOutput = Expect<Equal<ReturnType<typeof reverseCopy<number>>, number[]>>;
type _DemoTupleCollapse = Expect<Equal<CopyResult<readonly [1, "x"]>, Array<1 | "x">>>;
type _DemoShallowElement = Expect<Equal<CopyResult<readonly [{ id: string }]>, Array<{ id: string }>>>;

// 1. Readonly is accepted, then intentionally removed from the result (1-8)
type _01 = Expect<Equal<Parameters<typeof reverseCopy<string>>[0], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<typeof reverseCopy<string>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<ReturnType<typeof reverseCopy<string>>, readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<readonly string[], ReturnType<typeof reverseCopy<string>>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Readonly<ReturnType<typeof sortCopy<number>>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<"push" extends keyof ReturnType<typeof spliceCopy<number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<"push" extends keyof Parameters<typeof spliceCopy<number>>[0] ? true : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<typeof replaceCopy<number>>, TODO>>; // TODO(koan) @koan-error

// 2. Positional tuple information is not a copying-method guarantee (9-16)
type LabeledTuple = readonly [name: string, score: number];
type _09 = Expect<Equal<CopyResult<LabeledTuple>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<CopyResult<LabeledTuple>["length"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<CopyResult<readonly [1]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<CopyResult<readonly [1]>, readonly [1]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<CopyResult<readonly [first?: "x"]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CopyResult<readonly [head: 1, ...tail: 2[]]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CopyResult<readonly []>[number], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<CopyResult<readonly [never]>, TODO>>; // TODO(koan) @koan-error

// 3. Values and comparators remain element-constrained (17-23)
type _17 = Expect<Equal<Parameters<typeof replaceCopy<"a" | "b">>[2], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<typeof spliceCopy<1 | 2>>[3], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof sortCopy<Date>>[1], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<Parameters<typeof sortCopy<Date>>[1]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Parameters<Parameters<typeof sortCopy<Date>>[1]>[0], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Parameters<typeof replaceCopy<never>>[2], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Parameters<typeof replaceCopy<unknown>>[2], TODO>>; // TODO(koan) @koan-error

// 4. Top/bottom element types and shallow containers expose limits (24-30)
type _24 = Expect<Equal<IsAny<ReturnType<typeof reverseCopy<any>>[number]>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof reverseCopy<unknown>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ReturnType<typeof reverseCopy<never>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<CopyResult<readonly ({ nested: string[] })[]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<CopyResult<readonly ({ nested: string[] })[]>[number]["nested"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Parameters<ReadonlyArray<number>["with"]>[0], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<ReadonlyArray<number>["toSpliced"]>, TODO>>; // TODO(koan) @koan-error
