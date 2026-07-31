import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 162 - METHOD DECORATORS
 * =============================
 *
 * A method decorator is a higher-order function over a complete call contract:
 * receiver, parameter tuple, and result. A safe wrapper forwards `this`, forwards
 * every argument, and returns the original result unchanged unless its declared
 * decorator contract explicitly permits another compatible implementation.
 *
 * `ClassMethodDecoratorContext` distinguishes instance/static and public/private
 * members and exposes an access object. The context describes placement; it does
 * not weaken the replacement signature. Stacked wrappers compose inside out and
 * later invocation travels through the outermost replacement first.
 *
 * Feature ownership: standard ECMAScript method decorators and TypeScript's
 * generic method/context replacement checking.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
 * - https://github.com/tc39/proposal-decorators
 */

export type MethodValue<
  This,
  Args extends readonly unknown[],
  Result,
> = (this: This, ...args: Args) => Result;

export type MethodDecorator<
  This,
  Args extends readonly unknown[],
  Result,
> = (
  value: MethodValue<This, Args, Result>,
  context: ClassMethodDecoratorContext<
    This,
    MethodValue<This, Args, Result>
  >,
) => MethodValue<This, Args, Result> | void;

export type MethodContextOf<Method> =
  Method extends MethodValue<infer This, infer Args, infer Result>
    ? ClassMethodDecoratorContext<This, MethodValue<This, Args, Result>>
    : never;

export type MethodReplacement<Decorator> =
  Decorator extends (...args: any[]) => infer Result
    ? Exclude<Result, void>
    : never;

export function logCalls(log: string[], label: string) {
  return function <This, Args extends readonly unknown[], Result>(
    original: MethodValue<This, Args, Result>,
    context: ClassMethodDecoratorContext<This, MethodValue<This, Args, Result>>,
  ): MethodValue<This, Args, Result> {
    return function (this: This, ...args: Args): Result {
      log.push(`${label}:${String(context.name)}:args:${JSON.stringify(args)}`);
      const result = original.call(this, ...args);
      log.push(`${label}:${String(context.name)}:result:${JSON.stringify(result)}`);
      return result;
    };
  };
}

export function countCalls(counter: { count: number }) {
  return function <This, Args extends readonly unknown[], Result>(
    original: MethodValue<This, Args, Result>,
    _context: ClassMethodDecoratorContext<This, MethodValue<This, Args, Result>>,
  ): MethodValue<This, Args, Result> {
    return function (this: This, ...args: Args): Result {
      counter.count += 1;
      return original.call(this, ...args);
    };
  };
}

export function memoizeUnary<This extends object, Input, Result>(
  original: (this: This, input: Input) => Result,
  _context: ClassMethodDecoratorContext<This, (input: Input) => Result>,
): (this: This, input: Input) => Result {
  const byInstance = new WeakMap<This, Map<Input, Result>>();
  return function (this: This, input: Input): Result {
    const cache = byInstance.get(this) ?? new Map<Input, Result>();
    byInstance.set(this, cache);
    if (cache.has(input)) return cache.get(input) as Result;
    const result = original.call(this, input);
    cache.set(input, result);
    return result;
  };
}

export function recordContext(log: string[]) {
  return function <This, Args extends readonly unknown[], Result>(
    _original: MethodValue<This, Args, Result>,
    context: ClassMethodDecoratorContext<This, MethodValue<This, Args, Result>>,
  ): void {
    log.push(`${String(context.name)}:${context.static}:${context.private}`);
  };
}

export function createDecoratedCalculator(
  log: string[],
  counter: { count: number },
  bodyCalls: { count: number },
) {
  class Calculator {
    constructor(readonly offset: number) {}

    @countCalls(counter)
    @logCalls(log, "call")
    add(left: number, right: number): number {
      return this.offset + left + right;
    }

    @memoizeUnary
    double(value: number): number {
      bodyCalls.count += 1;
      return value * 2;
    }

    @recordContext(log)
    static square(value: number): number {
      return value ** 2;
    }

    @recordContext(log)
    #negate(value: number): number {
      return -value;
    }

    negate(value: number): number {
      return this.#negate(value);
    }
  }

  return Calculator;
}

type Receiver = { offset: number };
type Add = MethodValue<Receiver, [left: number, right: number], number>;
type AddDecorator = MethodDecorator<Receiver, [left: number, right: number], number>;
type AddContext = MethodContextOf<Add>;

// Part 1: The decorated value retains receiver, tuple, and result.
type _01 = Expect<Equal<ThisParameterType<Add>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<Add>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<Add>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<AddDecorator>[0], TODO>>; // TODO(koan) @koan-error

// Part 2: The context is specialized to that same method.
type _05 = Expect<Equal<AddContext["kind"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<AddContext["name"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<AddContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<AddContext["access"]["has"]>, TODO>>; // TODO(koan) @koan-error

// Part 3: Replacement extraction preserves the complete callable type.
type _09 = Expect<Equal<ReturnType<AddDecorator>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<MethodReplacement<AddDecorator>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<MethodReplacement<AddDecorator>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ThisParameterType<MethodReplacement<AddDecorator>>, TODO>>; // TODO(koan) @koan-error

// Part 4: Factories remain generic across different methods.
type _13 = Expect<Equal<Parameters<typeof logCalls>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof logCalls>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof memoizeUnary>[0], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof countCalls>, TODO>>; // TODO(koan) @koan-error

// Part 5: The decorated class keeps declared method signatures.
type CalculatorClass = ReturnType<typeof createDecoratedCalculator>;
type Calculator = InstanceType<CalculatorClass>;
type _17 = Expect<Equal<Parameters<Calculator["add"]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<Calculator["double"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<CalculatorClass["square"]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof Calculator, TODO>>; // TODO(koan) @koan-error
