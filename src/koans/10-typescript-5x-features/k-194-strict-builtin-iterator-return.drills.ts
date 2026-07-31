import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type BuiltinStringIterator,
  describeWordStep,
  drainIterator,
  firstSetValue,
  wordsThenCount,
} from "./k-194-strict-builtin-iterator-return.js";

/** GUIDED DRILLS: repeat yield/return/next channels, result-union decomposition, built-in collection completion, generator completion, done discrimination, consumer signatures, and safe versus legacy value types. */

type YieldOf<Value> =
  Value extends Iterator<infer Yield, unknown, unknown> ? Yield : never;
type ReturnOf<Value> =
  Value extends Iterator<unknown, infer Return, unknown> ? Return : never;
type NextOf<Value> =
  Value extends Iterator<unknown, unknown, infer Next> ? Next : never;
type Extends<From, To> = [From] extends [To] ? true : false;

type StringStep = IteratorResult<string, undefined>;
type NumberStep = IteratorResult<number, undefined>;
type ExplicitStep = IteratorResult<string, 200>;
type ArrayValues = ReturnType<number[]["values"]>;
type MapEntries = ReturnType<Map<string, number>["entries"]>;
type WordGenerator = ReturnType<typeof wordsThenCount>;

// 1. The two result branches (1-10)
type _01 = Expect<Equal<IteratorYieldResult<string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IteratorReturnResult<number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IteratorYieldResult<string>["done"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IteratorReturnResult<number>["done"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<IteratorYieldResult<string>["value"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IteratorReturnResult<number>["value"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<StringStep["done"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<StringStep["value"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extract<StringStep, { done: true }>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<StringStep, { done?: false }>, TODO>>; // TODO(koan) @koan-error

// 2. Different yielded values, same strict completion (11-19)
type _11 = Expect<Equal<NumberStep["value"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<NumberStep, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extract<NumberStep, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ExplicitStep["value"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<ExplicitStep, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<ExplicitStep, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Exclude<StringStep["value"], undefined>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<StringStep["value"], undefined>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<NonNullable<StringStep["value"]>, TODO>>; // TODO(koan) @koan-error

// 3. BuiltinIteratorReturn under this strict project (20-28)
type _20 = Expect<Equal<BuiltinIteratorReturn, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<YieldOf<BuiltinStringIterator>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnOf<BuiltinStringIterator>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<NextOf<BuiltinStringIterator>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReturnType<BuiltinStringIterator["next"]>["value"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extract<ReturnType<BuiltinStringIterator["next"]>, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<ReturnType<BuiltinStringIterator["next"]>, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<BuiltinStringIterator, Iterator<string, undefined, unknown>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<BuiltinStringIterator, Iterable<string>>, TODO>>; // TODO(koan) @koan-error

// 4. Collection iterators adopt the strict intrinsic (29-40)
type _29 = Expect<Equal<YieldOf<ArrayValues>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnOf<ArrayValues>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<NextOf<ArrayValues>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<ReturnType<ArrayValues["next"]>["value"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<YieldOf<MapEntries>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReturnOf<MapEntries>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<NextOf<MapEntries>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ReturnType<MapEntries["next"]>["value"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<YieldOf<ReturnType<Set<boolean>["values"]>>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<ReturnOf<ReturnType<Set<boolean>["values"]>>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ReturnType<ReturnType<Set<boolean>["values"]>["next"]>["value"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<ReturnType<string[]["entries"]>["next"]>["value"], TODO>>; // TODO(koan) @koan-error

// 5. Explicit generator channels (41-50)
type _41 = Expect<Equal<YieldOf<WordGenerator>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnOf<WordGenerator>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<NextOf<WordGenerator>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<WordGenerator["next"]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<ReturnType<WordGenerator["next"]>["value"], TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Extract<ReturnType<WordGenerator["next"]>, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extract<ReturnType<WordGenerator["next"]>, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<WordGenerator["next"]>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Parameters<WordGenerator["return"]>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<ReturnType<WordGenerator[typeof Symbol.iterator]>, TODO>>; // TODO(koan) @koan-error

// 6. Safe consumers (51-60)
type _51 = Expect<Equal<Parameters<typeof firstSetValue>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<typeof firstSetValue>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<typeof drainIterator>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<typeof drainIterator>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<typeof drainIterator<string>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Parameters<typeof describeWordStep>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReturnType<typeof describeWordStep>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Parameters<typeof wordsThenCount>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ReturnType<typeof wordsThenCount>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<ReturnType<typeof wordsThenCount>, Iterator<string, number, void>>, TODO>>; // TODO(koan) @koan-error
