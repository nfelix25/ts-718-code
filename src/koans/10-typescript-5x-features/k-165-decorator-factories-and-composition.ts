import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 165 - DECORATOR FACTORIES AND COMPOSITION
 * ===============================================
 *
 * A decorator factory is ordinary code that runs when its expression is
 * evaluated and returns the decorator that will later be applied. In a stack,
 * expressions evaluate from top to bottom, but decorators apply from the member
 * outward: the closest decorator replaces first, then the one above wraps that
 * replacement. Calling the finished method enters the outermost wrapper first.
 *
 * Read `composeMethodDecorators(outer, inner)` aloud as: "apply `inner` to the
 * original, then apply `outer` to what `inner` returned." A `void` result means
 * "keep the current value", not "erase the method". Composition therefore folds
 * right to left and carries the latest replacement through every step.
 *
 * Feature ownership: standard ECMAScript decorator evaluation/application
 * ordering and TypeScript's checking of configurable decorator factories.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
 * - https://github.com/tc39/proposal-decorators
 */

export type ComposableMethod<
  This,
  Args extends readonly unknown[],
  Result,
> = (this: This, ...args: Args) => Result;

export type ComposableMethodDecorator<
  This,
  Args extends readonly unknown[],
  Result,
> = (
  value: ComposableMethod<This, Args, Result>,
  context: ClassMethodDecoratorContext<
    This,
    ComposableMethod<This, Args, Result>
  >,
) => ComposableMethod<This, Args, Result> | void;

export type DecoratorFactory<Config extends readonly unknown[], Decorator> =
  (...config: Config) => Decorator;

export function composeMethodDecorators<
  This,
  Args extends readonly unknown[],
  Result,
>(
  ...decorators: readonly ComposableMethodDecorator<This, Args, Result>[]
): ComposableMethodDecorator<This, Args, Result> {
  return function (original, context) {
    let current = original;
    for (let index = decorators.length - 1; index >= 0; index -= 1) {
      current = decorators[index]!(current, context) ?? current;
    }
    return current;
  };
}

export function around(log: string[], label: string) {
  log.push(`factory:${label}`);

  return function <This, Args extends readonly unknown[], Result>(
    original: ComposableMethod<This, Args, Result>,
    context: ClassMethodDecoratorContext<
      This,
      ComposableMethod<This, Args, Result>
    >,
  ): ComposableMethod<This, Args, Result> {
    log.push(`apply:${label}:${String(context.name)}`);

    return function (this: This, ...args: Args): Result {
      log.push(`enter:${label}`);
      try {
        const result = original.call(this, ...args);
        log.push(`exit:${label}`);
        return result;
      } catch (error) {
        log.push(`throw:${label}`);
        throw error;
      }
    };
  };
}

export function observeOnly(log: string[], label: string) {
  log.push(`factory:${label}`);

  return function <This, Args extends readonly unknown[], Result>(
    _original: ComposableMethod<This, Args, Result>,
    context: ClassMethodDecoratorContext<
      This,
      ComposableMethod<This, Args, Result>
    >,
  ): void {
    log.push(`observe:${label}:${String(context.name)}`);
  };
}

export function mapNumberResult(
  log: string[],
  label: string,
  transform: (value: number) => number,
) {
  log.push(`factory:${label}`);

  return function <This, Args extends readonly unknown[]>(
    original: ComposableMethod<This, Args, number>,
    context: ClassMethodDecoratorContext<
      This,
      ComposableMethod<This, Args, number>
    >,
  ): ComposableMethod<This, Args, number> {
    log.push(`apply:${label}:${String(context.name)}`);
    return function (this: This, ...args: Args): number {
      return transform(original.call(this, ...args));
    };
  };
}

export function createStackedWorker(log: string[]) {
  class Worker {
    @around(log, "outer")
    @around(log, "inner")
    run(value: number): number {
      log.push("body:run");
      return value * 2;
    }

    @around(log, "failure-outer")
    @around(log, "failure-inner")
    fail(): never {
      log.push("body:fail");
      throw new Error("expected failure");
    }
  }

  return Worker;
}

export function createManuallyComposedWorker(log: string[]) {
  const composed = composeMethodDecorators(
    around(log, "outer"),
    observeOnly(log, "observer"),
    around(log, "inner"),
  );

  class Worker {
    @composed
    run(value: number): number {
      log.push("body:run");
      return value + 1;
    }
  }

  return Worker;
}

export function createTransformedCalculator(log: string[]) {
  class Calculator {
    @mapNumberResult(log, "add-three", (value) => value + 3)
    @mapNumberResult(log, "double", (value) => value * 2)
    calculate(value: number): number {
      return value;
    }
  }

  return Calculator;
}

type Receiver = { prefix: string };
type Format = ComposableMethod<
  Receiver,
  [value: number, suffix?: string],
  string
>;
type FormatDecorator = ComposableMethodDecorator<
  Receiver,
  [value: number, suffix?: string],
  string
>;

// Part 1: A composable decorator preserves one complete method contract.
type _01 = Expect<Equal<Parameters<Format>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ThisParameterType<Format>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<Format>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<FormatDecorator>[0], TODO>>; // TODO(koan) @koan-error

// Part 2: Factories separate configuration arguments from decorator arguments.
type AroundFactory = DecoratorFactory<
  [log: string[], label: string],
  ReturnType<typeof around>
>;
type _05 = Expect<Equal<Parameters<AroundFactory>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<AroundFactory>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof around>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<ReturnType<typeof around>>[1]["kind"], TODO>>; // TODO(koan) @koan-error

// Part 3: Composition consumes decorators and returns one decorator.
type _09 = Expect<Equal<Parameters<typeof composeMethodDecorators<Receiver, [number], string>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<typeof composeMethodDecorators<Receiver, [number], string>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<FormatDecorator>[1]["name"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<FormatDecorator>, TODO>>; // TODO(koan) @koan-error

// Part 4: Configurable result wrappers specialize their result contract.
type _13 = Expect<Equal<Parameters<typeof mapNumberResult>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<ReturnType<typeof mapNumberResult>>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<ReturnType<typeof mapNumberResult>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<ReturnType<ReturnType<typeof mapNumberResult>>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Stacking and manual composition preserve declared class surfaces.
type Stacked = InstanceType<ReturnType<typeof createStackedWorker>>;
type Composed = InstanceType<ReturnType<typeof createManuallyComposedWorker>>;
type _17 = Expect<Equal<Parameters<Stacked["run"]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<Stacked["fail"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<Composed["run"]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<InstanceType<ReturnType<typeof createTransformedCalculator>>["calculate"]>, TODO>>; // TODO(koan) @koan-error
