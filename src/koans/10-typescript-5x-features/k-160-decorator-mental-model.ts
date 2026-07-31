import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 160 - THE STANDARD DECORATOR MENTAL MODEL
 * ===============================================
 *
 * TypeScript 5.0 implemented the current standard decorators model without the
 * `experimentalDecorators` flag. A decorator is called at class-definition time
 * with the decorated value (or `undefined` for a field) and a typed context. It
 * may observe the declaration, register initializers, or return a compatible
 * replacement. It is not the legacy target/key/descriptor protocol, and standard
 * decorators do not decorate parameters.
 *
 * Read a method decorator as: "receive this method and facts about its class
 * element; return nothing to keep it, or return another method with the same
 * receiver, parameter, and result contract." Decorator expressions evaluate in
 * source order, while stacked decorators apply from the closest decorator
 * outward. Initializers are a separate lifecycle hook.
 *
 * Feature ownership: ECMAScript decorator runtime/language semantics, exposed
 * through TypeScript's standard decorator context types and checking.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
 * - https://github.com/tc39/proposal-decorators
 */

export type AnyDecoratorContext =
  | ClassDecoratorContext
  | ClassMethodDecoratorContext
  | ClassGetterDecoratorContext
  | ClassSetterDecoratorContext
  | ClassFieldDecoratorContext
  | ClassAccessorDecoratorContext;

export type DecoratorKind = AnyDecoratorContext["kind"];

export type MemberDecoratorContext = Exclude<
  AnyDecoratorContext,
  ClassDecoratorContext
>;

export type ContextName<Context extends AnyDecoratorContext> =
  Context["name"];

export type Method<
  This,
  Args extends readonly unknown[],
  Result,
> = (this: This, ...args: Args) => Result;

export type StandardMethodDecorator<
  This,
  Args extends readonly unknown[],
  Result,
> = (
  value: Method<This, Args, Result>,
  context: ClassMethodDecoratorContext<This, Method<This, Args, Result>>,
) => Method<This, Args, Result> | void;

export type DecoratorReplacement<Decorator> =
  Decorator extends (...args: readonly unknown[]) => infer Result
    ? Exclude<Result, void>
    : never;

// Part 1: Every context carries a literal declaration kind.
type _01 = Expect<Equal<DecoratorKind, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ClassDecoratorContext["kind"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ClassMethodDecoratorContext["kind"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ClassFieldDecoratorContext["kind"], TODO>>; // TODO(koan) @koan-error

// Part 2: Member contexts expose names and placement facts.
type _05 = Expect<Equal<ClassDecoratorContext["name"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ClassMethodDecoratorContext["name"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ClassMethodDecoratorContext["static"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ClassMethodDecoratorContext["private"], TODO>>; // TODO(koan) @koan-error

// Part 3: Context accessors and initializers are typed capabilities.
type MethodContext = ClassMethodDecoratorContext<
  { count: number },
  (delta: number) => number
>;
type _09 = Expect<Equal<Parameters<MethodContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<MethodContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<MethodContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof MethodContext["access"], TODO>>; // TODO(koan) @koan-error

// Part 4: Replacements preserve the original callable contract.
type CounterMethod = Method<{ count: number }, [delta: number], number>;
type CounterDecorator = StandardMethodDecorator<
  { count: number },
  [delta: number],
  number
>;
type _13 = Expect<Equal<Parameters<CounterMethod>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ThisParameterType<CounterMethod>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<CounterDecorator>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<DecoratorReplacement<CounterDecorator>, TODO>>; // TODO(koan) @koan-error

// Part 5: Runtime traces expose definition, application, and invocation phases.
type _17 = Expect<Equal<Parameters<typeof traceMethod>[0], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof traceMethod>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof createDecoratedCounter>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<InstanceType<ReturnType<typeof createDecoratedCounter>>["add"], TODO>>; // TODO(koan) @koan-error

export function traceMethod(log: string[], label: string) {
  log.push(`evaluate:${label}`);
  return function <
    This,
    Args extends readonly unknown[],
    Result,
  >(
    original: Method<This, Args, Result>,
    context: ClassMethodDecoratorContext<This, Method<This, Args, Result>>,
  ): Method<This, Args, Result> {
    log.push(`apply:${label}:${String(context.name)}:${context.kind}`);
    return function (this: This, ...args: Args): Result {
      log.push(`enter:${label}`);
      const result = original.call(this, ...args);
      log.push(`exit:${label}`);
      return result;
    };
  };
}

export function traceClass(log: string[], label: string) {
  log.push(`evaluate:${label}`);
  return function <Class extends abstract new (...args: any[]) => object>(
    value: Class,
    context: ClassDecoratorContext<Class>,
  ): Class {
    log.push(`apply:${label}:${context.name}:${context.kind}`);
    return value;
  };
}

export function createDecoratedCounter(log: string[]) {
  @traceClass(log, "class")
  class Counter {
    count = 0;

    @traceMethod(log, "outer")
    @traceMethod(log, "inner")
    add(delta: number): number {
      this.count += delta;
      log.push("body:add");
      return this.count;
    }
  }

  return Counter;
}
