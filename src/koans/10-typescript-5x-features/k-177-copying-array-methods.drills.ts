import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type CopyResult,
  type CopyingMethod,
  replaceCopy,
  reverseCopy,
  sortCopy,
  spliceCopy,
} from "./k-177-copying-array-methods.js";

/** GUIDED DRILLS: repeat source/result mutability, method parameters, literal unions, tuple collapse, built-in signature reflection, and assignability contrasts across all four copying operations. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Pair = readonly [name: string, score: number];
type Statuses = readonly ("idle" | "busy")[];

// Wrapper inputs and results (1-12)
type _01 = Expect<Equal<Parameters<typeof reverseCopy<number>>[0], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<typeof reverseCopy<number>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof sortCopy<string>>[0], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof sortCopy<string>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Parameters<typeof spliceCopy<boolean>>[0], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof spliceCopy<boolean>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof replaceCopy<Date>>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<typeof replaceCopy<Date>>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<ReturnType<typeof reverseCopy<1 | 2>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<typeof sortCopy<"a" | "b">>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof spliceCopy<null | string>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof replaceCopy<undefined | number>>, TODO>>; // TODO(koan) @koan-error

// Operation-specific parameters (13-24)
type _13 = Expect<Equal<Parameters<typeof reverseCopy<number>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<typeof sortCopy<number>>[1], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<Parameters<typeof sortCopy<number>>[1]>[0], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<Parameters<typeof sortCopy<number>>[1]>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Parameters<typeof spliceCopy<string>>[1], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<typeof spliceCopy<string>>[2], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof spliceCopy<string>>[3], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof replaceCopy<string>>[1], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Parameters<typeof replaceCopy<string>>[2], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Parameters<typeof replaceCopy<1 | 2>>[2], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Parameters<typeof spliceCopy<1 | 2>>[3], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof sortCopy<Date>>[1], TODO>>; // TODO(koan) @koan-error

// CopyResult and tuple collapse (25-36)
type _25 = Expect<Equal<CopyResult<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<CopyResult<string[]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<CopyResult<Statuses>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<CopyResult<Pair>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<CopyResult<Pair>[number], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<CopyResult<readonly [1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<CopyResult<readonly []>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<CopyResult<readonly [value?: string]>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<CopyResult<readonly [head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extends<CopyResult<Pair>, Pair>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extends<Pair, CopyResult<Pair>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<CopyResult<readonly [true]>["length"], TODO>>; // TODO(koan) @koan-error

// Built-in method reflection (37-48)
type _37 = Expect<Equal<ReturnType<ReadonlyArray<number>["toReversed"]>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<ReturnType<ReadonlyArray<number>["toSorted"]>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ReturnType<ReadonlyArray<number>["toSpliced"]>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<ReadonlyArray<number>["with"]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<ReturnType<Array<string>["toReversed"]>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<Array<string>["toSorted"]>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ReturnType<Array<string>["toSpliced"]>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<Array<string>["with"]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Parameters<ReadonlyArray<number>["toSorted"]>[0], TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Parameters<ReadonlyArray<number>["with"]>[0], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Parameters<ReadonlyArray<number>["with"]>[1], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<CopyingMethod, TODO>>; // TODO(koan) @koan-error

// Mutability and structural relationships (49-60)
type _49 = Expect<Equal<Extends<number[], readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<readonly number[], number[]>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<ReturnType<typeof reverseCopy<number>>, readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Extends<readonly number[], ReturnType<typeof reverseCopy<number>>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<"push" extends keyof ReturnType<typeof reverseCopy<number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<"push" extends keyof Parameters<typeof reverseCopy<number>>[0] ? true : false, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<"toReversed" extends keyof readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<"toSorted" extends keyof readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<"toSpliced" extends keyof readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<"with" extends keyof readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Readonly<ReturnType<typeof sortCopy<number>>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ReturnType<typeof replaceCopy<number>>[number], TODO>>; // TODO(koan) @koan-error
