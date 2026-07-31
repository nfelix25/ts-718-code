import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type InitializerOf,
  type InitializerReceiver,
  bound,
  createInitializedController,
} from "./k-167-decorator-initializers.js";

/** EDGE CASES: initializer registration has a lifecycle window, method/field schedules differ, static receivers are constructors, arrow callbacks lose contextual this, and binding changes runtime ownership without changing method types. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Receiver = { count: number };
type Method = (this: Receiver, delta: number) => number;
type MethodContext = ClassMethodDecoratorContext<Receiver, Method>;
type FieldContext = ClassFieldDecoratorContext<Receiver, number | undefined>;
type AccessorContext = ClassAccessorDecoratorContext<Receiver, number>;
type MethodInitializer = InitializerOf<MethodContext>;
type Controller = InstanceType<ReturnType<typeof createInitializedController>>;

// Pre-solved demonstrations distinguish scheduling from value replacement.
type _DemoMethodInitializer = Expect<Equal<MethodInitializer, (this: Receiver) => void>>;
type _DemoDecoratorReturn = Expect<Equal<ReturnType<typeof bound>, void>>;
type _DemoFieldValue = Expect<Equal<ReturnType<FieldContext["access"]["get"]>, number | undefined>>;
type _DemoDeclaredMethod = Expect<Equal<Controller["handle"], (value: string) => string>>;

// 1. Callback receivers and ordinary parameters are different channels (1-8)
type _01 = Expect<Equal<ThisParameterType<MethodInitializer>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<MethodInitializer>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<MethodInitializer>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<OmitThisParameter<MethodInitializer>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<InitializerReceiver<MethodContext>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<InitializerReceiver<FieldContext>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<InitializerReceiver<AccessorContext>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<InitializerReceiver<{ addInitializer(initializer: () => void): void }>, TODO>>; // TODO(koan) @koan-error

// 2. Static and class initializers receive class values, not instances (9-16)
class Example {
  static value = 1;
  instance = "x";
}
type ExampleClass = typeof Example;
type ClassContext = ClassDecoratorContext<ExampleClass>;
type StaticContext = ClassMethodDecoratorContext<ExampleClass, () => number>;
type _09 = Expect<Equal<InitializerReceiver<ClassContext>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<InitializerReceiver<StaticContext>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<InitializerReceiver<ClassContext>, ExampleClass>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<InitializerReceiver<ClassContext>, Example>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ExampleClass["value"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<InstanceType<ExampleClass>["instance"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<ClassContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<ClassContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error

// 3. Adding work never changes the element's declared value type (17-23)
type _17 = Expect<Equal<ReturnType<MethodContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<FieldContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<AccessorContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Controller["handle"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Parameters<Controller["handle"]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Controller["status"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Controller["count"], TODO>>; // TODO(koan) @koan-error

// 4. Optional/never/unknown receivers and private/static flags stay explicit (24-30)
type NeverContext = ClassFieldDecoratorContext<never, string>;
type UnknownContext = ClassMethodDecoratorContext<unknown, () => void>;
type _24 = Expect<Equal<InitializerReceiver<NeverContext>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<InitializerReceiver<UnknownContext>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ReturnType<FieldContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<MethodContext["private"], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<MethodContext["static"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ClassDecoratorContext["name"], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<InitializerOf<never>, TODO>>; // TODO(koan) @koan-error
