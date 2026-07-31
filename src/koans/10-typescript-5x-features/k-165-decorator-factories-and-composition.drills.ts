import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ComposableMethod,
  type ComposableMethodDecorator,
  type DecoratorFactory,
  around,
  composeMethodDecorators,
  createManuallyComposedWorker,
  createStackedWorker,
  createTransformedCalculator,
  mapNumberResult,
  observeOnly,
} from "./k-165-decorator-factories-and-composition.js";

/** GUIDED DRILLS: repeat factory/decorator separation, right-to-left replacement folding, generic wrapper preservation, configurable transforms, and final class reflection. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Receiver = { base: number };
type Unary = ComposableMethod<Receiver, [value: number], number>;
type Binary = ComposableMethod<Receiver, [left: number, right: number], number>;
type AsyncUnary = ComposableMethod<Receiver, [value: number], Promise<number>>;
type UnaryDecorator = ComposableMethodDecorator<Receiver, [value: number], number>;
type BinaryDecorator = ComposableMethodDecorator<Receiver, [left: number, right: number], number>;
type AsyncDecorator = ComposableMethodDecorator<Receiver, [value: number], Promise<number>>;
type UnaryContext = ClassMethodDecoratorContext<Receiver, Unary>;

// Method and decorator preservation contracts (1-15)
type _01 = Expect<Equal<Parameters<Unary>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ThisParameterType<Unary>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<Unary>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<Binary>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<AsyncUnary>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Parameters<UnaryDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<UnaryDecorator>[1], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<UnaryDecorator>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Parameters<BinaryDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<BinaryDecorator>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<AsyncDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<AsyncDecorator>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<UnaryContext["kind"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<UnaryContext["name"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<UnaryContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error

// Factory configuration and returned decorator reflection (16-30)
type Around = ReturnType<typeof around>;
type Observer = ReturnType<typeof observeOnly>;
type NumberMapper = ReturnType<typeof mapNumberResult>;
type ExampleFactory = DecoratorFactory<[label: string, count?: number], UnaryDecorator>;
type _16 = Expect<Equal<Parameters<typeof around>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ReturnType<typeof around>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<Around>[0], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<Around>[1]["kind"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<Around>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Parameters<typeof observeOnly>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnType<Observer>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Parameters<typeof mapNumberResult>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<NumberMapper>[0], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<NumberMapper>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<ExampleFactory>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<ExampleFactory>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<Around, ComposableMethodDecorator<any, any, any>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<Observer, ComposableMethodDecorator<any, any, any>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<Observer>, TODO>>; // TODO(koan) @koan-error

// Manual composition signatures and right-fold ingredients (31-45)
type UnaryComposition = typeof composeMethodDecorators<Receiver, [value: number], number>;
type BinaryComposition = typeof composeMethodDecorators<Receiver, [left: number, right: number], number>;
type _31 = Expect<Equal<Parameters<UnaryComposition>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<ReturnType<UnaryComposition>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Parameters<ReturnType<UnaryComposition>>[0], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReturnType<ReturnType<UnaryComposition>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Parameters<BinaryComposition>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ReturnType<BinaryComposition>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Parameters<ReturnType<BinaryComposition>>[0], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Parameters<Parameters<ReturnType<BinaryComposition>>[1]["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ReturnType<ReturnType<BinaryComposition>>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Equal<Parameters<UnaryDecorator>[0], Unary>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Extends<UnaryDecorator, (...args: any[]) => Unary | void>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Extends<ReturnType<UnaryComposition>, UnaryDecorator>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Parameters<UnaryContext["access"]["has"]>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Parameters<UnaryContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<ReturnType<UnaryContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error

// Decorated runtime-class surfaces (46-60)
type StackedClass = ReturnType<typeof createStackedWorker>;
type Stacked = InstanceType<StackedClass>;
type ComposedClass = ReturnType<typeof createManuallyComposedWorker>;
type Composed = InstanceType<ComposedClass>;
type CalculatorClass = ReturnType<typeof createTransformedCalculator>;
type Calculator = InstanceType<CalculatorClass>;
type _46 = Expect<Equal<ConstructorParameters<StackedClass>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<keyof Stacked, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<Stacked["run"]>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<ReturnType<Stacked["run"]>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Parameters<Stacked["fail"]>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<ReturnType<Stacked["fail"]>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ConstructorParameters<ComposedClass>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<keyof Composed, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Parameters<Composed["run"]>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<Composed["run"]>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<keyof Calculator, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Parameters<Calculator["calculate"]>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<Calculator["calculate"]>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<Calculator, { calculate(value: number): number }>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<keyof CalculatorClass, TODO>>; // TODO(koan) @koan-error
