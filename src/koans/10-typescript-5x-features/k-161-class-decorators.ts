import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 161 - CLASS DECORATORS
 * ============================
 *
 * A standard class decorator receives the constructor and a
 * `ClassDecoratorContext`. Returning nothing preserves the constructor; returning
 * a compatible constructor replaces it. A subclass replacement can intercept
 * construction and add runtime behavior while retaining the original constructor
 * parameter and instance contract.
 *
 * The class declaration's static type does not grow when a decorator adds fields
 * or static members. Decorator typing proves substitutability, not type-level
 * macro expansion. `context.addInitializer` runs after the decorated class value
 * is finalized and uses that final class as `this`, which makes registration a
 * natural class-initializer use case.
 *
 * Feature ownership: standard ECMAScript decorator semantics and TypeScript's
 * class decorator context/replacement checking.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
 * - https://github.com/tc39/proposal-decorators
 */

export type Constructor<
  Instance = object,
  Args extends readonly unknown[] = any[],
> = new (...args: Args) => Instance;

export type StandardClassDecorator<Class extends Constructor> = (
  value: Class,
  context: ClassDecoratorContext<Class>,
) => Class | void;

export type ClassInstance<Class extends Constructor> =
  Class extends new (...args: any[]) => infer Instance ? Instance : never;

export type ClassArguments<Class extends Constructor> =
  Class extends new (...args: infer Args) => object ? Args : never;

export type ClassReplacement<Decorator> =
  Decorator extends (...args: any[]) => infer Result
    ? Exclude<Result, void>
    : never;

export function traceConstruction(log: string[]) {
  return function <Class extends Constructor>(
    value: Class,
    context: ClassDecoratorContext<Class>,
  ): Class {
    log.push(`decorate:${context.name}`);
    return class extends value {
      constructor(...args: any[]) {
        log.push(`construct:${context.name}:before`);
        super(...args);
        log.push(`construct:${context.name}:after`);
      }
    };
  };
}

export function addInstanceTag<const Tag extends string>(tag: Tag) {
  return function <Class extends Constructor>(
    value: Class,
    _context: ClassDecoratorContext<Class>,
  ): Class {
    return class extends value {
      readonly runtimeTag = tag;
    };
  };
}

export function registerClass(registry: Function[]) {
  return function <Class extends Constructor>(
    _value: Class,
    context: ClassDecoratorContext<Class>,
  ): void {
    context.addInitializer(function () {
      registry.push(this);
    });
  };
}

export function createDecoratedService(log: string[], registry: Function[]) {
  @registerClass(registry)
  @traceConstruction(log)
  @addInstanceTag("service")
  class Service {
    static readonly category = "service";

    constructor(readonly name: string) {}

    greet(): string {
      return `Hello, ${this.name}`;
    }
  }

  return Service;
}

type PlainService = new (name: string) => {
  readonly name: string;
  greet(): string;
};
type PlainDecorator = StandardClassDecorator<PlainService>;

// Part 1: A class value is its constructor/static side.
type _01 = Expect<Equal<Constructor<{ id: number }, [id: number]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ClassArguments<PlainService>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ClassInstance<PlainService>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<InstanceType<PlainService>, TODO>>; // TODO(koan) @koan-error

// Part 2: The class context describes the declaration and initializer hook.
type PlainContext = ClassDecoratorContext<PlainService>;
type _05 = Expect<Equal<PlainContext["kind"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<PlainContext["name"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<PlainContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<PlainContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error

// Part 3: Replacement constructors retain the original public contract.
type _09 = Expect<Equal<Parameters<PlainDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<PlainDecorator>[1], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<PlainDecorator>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ClassReplacement<PlainDecorator>, TODO>>; // TODO(koan) @koan-error

// Part 4: Factories retain generic constructor information.
type _13 = Expect<Equal<Parameters<typeof traceConstruction>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof traceConstruction>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof addInstanceTag>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof registerClass>, TODO>>; // TODO(koan) @koan-error

// Part 5: The decorated declaration preserves its declared class surface.
type DecoratedService = ReturnType<typeof createDecoratedService>;
type Service = InstanceType<DecoratedService>;
type _17 = Expect<Equal<ConstructorParameters<DecoratedService>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Service["name"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<Service["greet"]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<DecoratedService["category"], TODO>>; // TODO(koan) @koan-error
