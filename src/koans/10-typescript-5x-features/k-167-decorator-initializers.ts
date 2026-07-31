import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 167 - DECORATOR INITIALIZERS
 * ==================================
 *
 * `context.addInitializer` schedules work; it does not run that work while the
 * decorator is applying. Member kind and placement determine the schedule.
 * Instance method initializers run for every new instance before instance
 * fields. A field or auto-accessor's extra initializers run immediately after
 * that element is initialized. Static member initializers run on the class, and
 * a class decorator initializer runs once with the finalized constructor.
 *
 * Initializers receive their target as `this`. That receiver is the instance for
 * instance elements and the constructor for static/class work. This is why the
 * standard `@bound` pattern can install an own, bound method before user field
 * initialization and before the constructor body.
 *
 * Read `addInitializer(function () { ... })` aloud as: "after decoration,
 * schedule this receiver-aware callback at this element kind's initialization
 * point."
 *
 * Feature ownership: standard ECMAScript decorator initializer lifecycle and
 * TypeScript's receiver-aware `addInitializer` context signatures.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
 * - https://github.com/tc39/proposal-decorators
 */

export type InitializerOf<Context> =
  Context extends { addInitializer(initializer: infer Initializer): void }
    ? Initializer
    : never;

export type InitializerReceiver<Context> =
  ThisParameterType<InitializerOf<Context>>;

export type AnyClass = abstract new (...args: any[]) => object;

export function bound<
  This extends object,
  Args extends readonly unknown[],
  Result,
>(
  _original: (this: This, ...args: Args) => Result,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Result
  >,
): void {
  if (context.private) {
    throw new TypeError("@bound requires a public method");
  }

  context.addInitializer(function () {
    const method = context.access.get(this);
    Object.defineProperty(this, context.name, {
      configurable: true,
      writable: true,
      value: method.bind(this),
    });
  });
}

export function recordMethodInitializer(log: string[]) {
  return function <This extends object, Method extends (this: This, ...args: any[]) => any>(
    _original: Method,
    context: ClassMethodDecoratorContext<This, Method>,
  ): void {
    context.addInitializer(function () {
      log.push(`method-extra:${String(context.name)}:${context.access.has(this)}`);
    });
  };
}

export function recordFieldLifecycle(log: string[]) {
  return function <This, Value>(
    _value: undefined,
    context: ClassFieldDecoratorContext<This, Value>,
  ): void {
    context.addInitializer(function () {
      log.push(`field-extra:${String(context.name)}:${String(context.access.get(this))}`);
    });
  };
}

export function recordAccessorLifecycle(log: string[]) {
  return function <This, Value>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): void {
    context.addInitializer(function () {
      log.push(`accessor-extra:${String(context.name)}:${String(context.access.get(this))}`);
    });
  };
}

export function registerClass(registry: AnyClass[], log: string[]) {
  return function <Class extends AnyClass>(
    _value: Class,
    context: ClassDecoratorContext<Class>,
  ): void {
    context.addInitializer(function () {
      registry.push(this);
      log.push(`class-extra:${context.name}`);
    });
  };
}

function initialize<Value>(
  log: string[],
  event: string,
  value: Value,
): Value {
  log.push(event);
  return value;
}

export function createInitializedController(log: string[]) {
  class Controller {
    @recordMethodInitializer(log)
    @bound
    handle(value: string): string {
      return `${this.prefix}:${value}`;
    }

    @recordFieldLifecycle(log)
    status = initialize(log, "field-value:status", "ready");

    @recordAccessorLifecycle(log)
    accessor count = initialize(log, "accessor-value:count", 1);

    constructor(readonly prefix: string) {
      log.push("constructor-body");
    }
  }

  return Controller;
}

export function createRegisteredController(
  registry: AnyClass[],
  log: string[],
) {
  @registerClass(registry, log)
  class Controller {
    static category = "registered";
  }

  return Controller;
}

type Receiver = { value: number };
type MethodContext = ClassMethodDecoratorContext<
  Receiver,
  (delta: number) => number
>;
type FieldContext = ClassFieldDecoratorContext<Receiver, number>;
type AccessorContext = ClassAccessorDecoratorContext<Receiver, number>;

// Part 1: Every context exposes a receiver-aware initializer callback.
type _01 = Expect<Equal<Parameters<MethodContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<MethodContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<InitializerOf<MethodContext>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<InitializerReceiver<MethodContext>, TODO>>; // TODO(koan) @koan-error

// Part 2: Field and accessor callbacks use the same receiver, at later points.
type _05 = Expect<Equal<InitializerOf<FieldContext>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<InitializerReceiver<FieldContext>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<InitializerOf<AccessorContext>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<InitializerReceiver<AccessorContext>, TODO>>; // TODO(koan) @koan-error

// Part 3: Class initializers receive the constructor rather than an instance.
class Example {
  value = 1;
}
type ExampleClassContext = ClassDecoratorContext<typeof Example>;
type _09 = Expect<Equal<InitializerOf<ExampleClassContext>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<InitializerReceiver<ExampleClassContext>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<ExampleClassContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<ExampleClassContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error

// Part 4: Initializer-based decorators return void and preserve declarations.
type _13 = Expect<Equal<ReturnType<typeof bound>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<ReturnType<typeof recordMethodInitializer>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<ReturnType<typeof recordFieldLifecycle>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<ReturnType<typeof registerClass>>, TODO>>; // TODO(koan) @koan-error

// Part 5: The class surface stays unchanged despite new per-instance behavior.
type ControllerClass = ReturnType<typeof createInitializedController>;
type Controller = InstanceType<ControllerClass>;
type _17 = Expect<Equal<ConstructorParameters<ControllerClass>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<Controller["handle"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Controller["status"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Controller["count"], TODO>>; // TODO(koan) @koan-error
