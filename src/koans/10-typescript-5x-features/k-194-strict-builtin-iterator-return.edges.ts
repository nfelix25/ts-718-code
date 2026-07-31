import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type BuiltinStringIterator,
  drainIterator,
  wordsThenCount,
} from "./k-194-strict-builtin-iterator-return.js";

/** EDGE CASES: legacy any completion poisons value reads, unknown forces proof without naming absence, never describes non-returning streams, optional done still discriminates, a generator can return a type unrelated to its yields, and strictBuiltinIteratorReturn applies to built-ins rather than rewriting every Iterator instantiation. */

type IsAny<Value> = 0 extends 1 & Value ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type Extends<From, To> = [From] extends [To] ? true : false;
type YieldOf<Value> =
  Value extends Iterator<infer Yield, unknown, unknown> ? Yield : never;
type ReturnOf<Value> =
  Value extends Iterator<unknown, infer Return, unknown> ? Return : never;

type LegacyStep = IteratorResult<string, any>;
type UnknownStep = IteratorResult<string, unknown>;
type NeverStep = IteratorResult<string, never>;
type WordGenerator = ReturnType<typeof wordsThenCount>;

// Pre-solved demonstrations of the safety gradient.
type _DemoLegacyPoison = Expect<Equal<IsAny<LegacyStep["value"]>, true>>;
type _DemoUnknownValue = Expect<Equal<UnknownStep["value"], unknown>>;
type _DemoNeverValue = Expect<Equal<NeverStep["value"], string>>;
type _DemoBuiltinReturn = Expect<Equal<ReturnOf<BuiltinStringIterator>, undefined>>;

// 1. any, unknown, and never completion channels (1-8)
type _01 = Expect<Equal<IsAny<LegacyStep["value"]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IsAny<Extract<LegacyStep, { done: true }>["value"]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<UnknownStep["value"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<UnknownStep, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<UnknownStep, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<NeverStep["value"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<NeverStep, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsNever<Extract<NeverStep, { done: true }>["value"]>, TODO>>; // TODO(koan) @koan-error

// 2. Built-in strictness versus explicit Iterator choices (9-15)
type _09 = Expect<Equal<BuiltinIteratorReturn, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnOf<BuiltinStringIterator>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Iterator<string> extends Iterator<string, any, any> ? true : false, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsAny<ReturnOf<Iterator<string>>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ReturnOf<Iterator<string, void>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnOf<Iterator<string, unknown>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnOf<Iterator<string, never>>, TODO>>; // TODO(koan) @koan-error

// 3. Done branches retain their own exact values (16-22)
type BuiltinStep = ReturnType<BuiltinStringIterator["next"]>;
type _16 = Expect<Equal<BuiltinStep["done"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<BuiltinStep["value"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<BuiltinStep, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<BuiltinStep, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<WordGenerator["next"]>["value"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<ReturnType<WordGenerator["next"]>, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extract<ReturnType<WordGenerator["next"]>, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error

// 4. Variance and consumer boundaries (23-27)
type _23 = Expect<Equal<Extends<IteratorObject<never, undefined>, IteratorObject<string, undefined>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<IteratorObject<string, undefined>, IteratorObject<unknown, undefined>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<IteratorObject<string, number>, IteratorObject<string, undefined>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<typeof drainIterator<string>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<typeof drainIterator<string>>, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom channel extraction (28-30)
type _28 = Expect<Equal<YieldOf<IteratorObject<never, undefined>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsNever<YieldOf<IteratorObject<never, undefined>>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<YieldOf<IteratorObject<unknown, undefined>>, TODO>>; // TODO(koan) @koan-error
