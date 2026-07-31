import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type MethodContextOf,
  type MethodDecorator,
  type MethodReplacement,
  type MethodValue,
  countCalls,
  createDecoratedCalculator,
  logCalls,
  memoizeUnary,
  recordContext,
} from "./k-162-method-decorators.js";

/** GUIDED DRILLS: preserve receiver/arguments/results, inspect contexts, classify replacements, and reflect decorated methods. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Receiver = { offset: number };
type Add = MethodValue<Receiver, [left: number, right: number], number>;
type Greet = MethodValue<Receiver, [name: string, title?: string], string>;
type AsyncRead = MethodValue<Receiver, [id: string], Promise<number>>;
type AddDecorator = MethodDecorator<Receiver, [number, number], number>;
type AddContext = MethodContextOf<Add>;

// Method values and specialized contexts (1-15)
type _01 = Expect<Equal<Add, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ThisParameterType<Add>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<Add>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<Add>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Parameters<Greet>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<Greet>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<AsyncRead>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Awaited<ReturnType<AsyncRead>>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<AddContext["kind"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<AddContext["name"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<AddContext["static"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<AddContext["private"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<keyof AddContext["access"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<AddContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<AddContext["access"]["has"]>, TODO>>; // TODO(koan) @koan-error

// Decorator inputs and replacement recovery (16-30)
type _16 = Expect<Equal<Parameters<AddDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Parameters<AddDecorator>[1], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<AddDecorator>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<MethodReplacement<AddDecorator>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ThisParameterType<MethodReplacement<AddDecorator>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Parameters<MethodReplacement<AddDecorator>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnType<MethodReplacement<AddDecorator>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<MethodContextOf<Greet>["kind"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReturnType<MethodContextOf<Greet>["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<MethodContextOf<AsyncRead>["name"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<MethodContextOf<AsyncRead>["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<MethodContextOf<unknown>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<MethodContextOf<never>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<MethodReplacement<() => void>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<MethodReplacement<() => Add | void>, TODO>>; // TODO(koan) @koan-error

// Generic factories and memoizer reflection (31-45)
type _31 = Expect<Equal<Parameters<typeof logCalls>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<ReturnType<typeof logCalls>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Parameters<ReturnType<typeof logCalls>>[0], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Parameters<ReturnType<typeof logCalls>>[1]["kind"], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<ReturnType<ReturnType<typeof logCalls>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Parameters<typeof countCalls>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<ReturnType<typeof countCalls>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<ReturnType<ReturnType<typeof countCalls>>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Parameters<typeof memoizeUnary>[0], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Parameters<typeof memoizeUnary>[1]["kind"], TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<ReturnType<typeof memoizeUnary>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Parameters<typeof recordContext>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ReturnType<typeof recordContext>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<ReturnType<typeof recordContext>>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Extends<ReturnType<typeof logCalls>, (...args: any[]) => unknown>, TODO>>; // TODO(koan) @koan-error

// Decorated calculator instance and static method surfaces (46-60)
type CalculatorClass = ReturnType<typeof createDecoratedCalculator>;
type Calculator = InstanceType<CalculatorClass>;
type _46 = Expect<Equal<ConstructorParameters<CalculatorClass>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<keyof Calculator, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Calculator["offset"], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Calculator["add"], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Parameters<Calculator["add"]>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<ReturnType<Calculator["add"]>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Parameters<Calculator["double"]>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<ReturnType<Calculator["double"]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Parameters<Calculator["negate"]>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<Calculator["negate"]>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<CalculatorClass["square"], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Parameters<CalculatorClass["square"]>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<CalculatorClass["square"]>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<"#negate" extends keyof Calculator ? true : false, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<Calculator["add"], (left: number, right: number) => number>, TODO>>; // TODO(koan) @koan-error
