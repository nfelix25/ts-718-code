import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ComposableMethod,
  type ComposableMethodDecorator,
  type DecoratorFactory,
  composeMethodDecorators,
} from "./k-165-decorator-factories-and-composition.js";

/** EDGE CASES: evaluation and application run in opposite orders, void preserves the current replacement, noncommutative wrappers reveal order, and generic wrappers have async/overload/any limits. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type Receiver = { count: number };
type Unary = ComposableMethod<Receiver, [value: number], number>;
type UnaryDecorator = ComposableMethodDecorator<Receiver, [value: number], number>;
type Observer = (
  value: Unary,
  context: ClassMethodDecoratorContext<Receiver, Unary>,
) => void;
type NeverDecorator = (
  value: Unary,
  context: ClassMethodDecoratorContext<Receiver, Unary>,
) => never;
type AsyncMethod = ComposableMethod<Receiver, [value: number], Promise<number>>;
type AsyncDecorator = ComposableMethodDecorator<Receiver, [value: number], Promise<number>>;

// Pre-solved demonstrations state the order model before the stress assertions.
type _DemoFactoryArguments = Expect<Equal<Parameters<DecoratorFactory<[label: string], UnaryDecorator>>, [label: string]>>;
type _DemoVoidObserver = Expect<Equal<ReturnType<Observer>, void>>;
type _DemoCompositionResult = Expect<Equal<ReturnType<typeof composeMethodDecorators<Receiver, [number], number>>, UnaryDecorator>>;
type _DemoAsyncResult = Expect<Equal<ReturnType<AsyncMethod>, Promise<number>>>;

// 1. Factory calls and decorator calls are separate type layers (1-8)
type Factory = DecoratorFactory<
  [label: string, enabled?: boolean],
  UnaryDecorator
>;
type _01 = Expect<Equal<Parameters<Factory>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<Factory>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<ReturnType<Factory>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<ReturnType<Factory>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Parameters<Factory>[1], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<(label: string) => UnaryDecorator, Factory>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<(label: string, enabled: boolean) => UnaryDecorator, Factory>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<() => UnaryDecorator, Factory>, TODO>>; // TODO(koan) @koan-error

// 2. Void and never returns have very different composition meanings (9-16)
type _09 = Expect<Equal<ReturnType<Observer>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<NeverDecorator>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Observer, UnaryDecorator>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<NeverDecorator, UnaryDecorator>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Exclude<ReturnType<UnaryDecorator>, void>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Exclude<ReturnType<Observer>, void>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Exclude<ReturnType<NeverDecorator>, void>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<typeof composeMethodDecorators<Receiver, [number], number>>, TODO>>; // TODO(koan) @koan-error

// 3. Async wrappers preserve Promise, but generic "exit" code need not await it (17-23)
type _17 = Expect<Equal<Parameters<AsyncMethod>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<AsyncMethod>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<AsyncDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<AsyncDecorator>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Exclude<ReturnType<AsyncDecorator>, void>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnType<Exclude<ReturnType<AsyncDecorator>, void>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<AsyncDecorator, UnaryDecorator>, TODO>>; // TODO(koan) @koan-error

// 4. Overloads, any, never, and empty stacks expose reflection limits (24-30)
interface Overloaded {
  (this: Receiver, value: string): string;
  (this: Receiver, value: number): number;
}
type AnyDecorator = ComposableMethodDecorator<Receiver, any, any>;
type NeverMethodDecorator = ComposableMethodDecorator<Receiver, [], never>;
type EmptyComposition = ReturnType<typeof composeMethodDecorators<Receiver, [number], number>>;
type _24 = Expect<Equal<Parameters<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsAny<ReturnType<Exclude<ReturnType<AnyDecorator>, void>>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<Exclude<ReturnType<NeverMethodDecorator>, void>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Parameters<EmptyComposition>[0], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<EmptyComposition>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<EmptyComposition, UnaryDecorator>, TODO>>; // TODO(koan) @koan-error
