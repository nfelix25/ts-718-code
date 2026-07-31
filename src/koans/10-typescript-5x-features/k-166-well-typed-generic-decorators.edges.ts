import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type DecoratedValue,
  type ExactCallableDecorator,
  type MethodParts,
  type TypedMethod,
  type TypedMethodDecorator,
  createGenericService,
} from "./k-166-well-typed-generic-decorators.js";

/** EDGE CASES: Parameters/ReturnType erase higher-rank correlation, overload reflection selects the last signature, unknown[] is often too strict for callable constraints, and implementation casts must stay behind precise public contracts. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type Receiver = { prefix: string };
type Identity = <Value>(value: Value) => Value;
type Pair = <Left, Right>(left: Left, right: Right) => [Left, Right];
type StringMethod = (this: Receiver, value: string) => string;
type AnyCallable = (this: Receiver, ...args: any[]) => any;
type UnknownCallable = (this: Receiver, ...args: unknown[]) => unknown;
type IdentityDecorator = ExactCallableDecorator<Receiver, Identity>;
type Service = InstanceType<ReturnType<typeof createGenericService>>;
declare const service: Service;

// Pre-solved demonstrations make the generic-correlation loss explicit.
type _DemoIdentityParameters = Expect<Equal<Parameters<Identity>, [value: unknown]>>;
type _DemoIdentityReturn = Expect<Equal<ReturnType<Identity>, unknown>>;
type _DemoExactValue = Expect<Equal<DecoratedValue<IdentityDecorator>, Identity>>;
type _DemoGenericCallPreserved = Expect<Equal<ReturnType<typeof service.identity<"x">>, "x">>;

// 1. Utility extraction sees unknown, while the exact callable remains generic (1-8)
type _01 = Expect<Equal<Parameters<Identity>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<Identity>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<MethodParts<Identity>["args"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<MethodParts<Identity>["result"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Parameters<Pair>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<Pair>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<DecoratedValue<IdentityDecorator>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<IdentityDecorator>, TODO>>; // TODO(koan) @koan-error

// 2. any[] accepts practical callable constraints; unknown[] rejects narrower inputs (9-16)
type _09 = Expect<Equal<Extends<StringMethod, AnyCallable>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<StringMethod, UnknownCallable>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Identity, (...args: any[]) => any>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<Identity, (...args: unknown[]) => unknown>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<IsAny<ReturnType<AnyCallable>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<UnknownCallable>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<TypedMethod<Receiver, never, string>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<TypedMethod<Receiver, [], never>>, TODO>>; // TODO(koan) @koan-error

// 3. Overloads reflect only their last signature, but exact capture keeps the set (17-23)
interface Overloaded {
  (this: Receiver, value: string): string;
  (this: Receiver, value: number): number;
}
type OverloadedDecorator = ExactCallableDecorator<Receiver, Overloaded>;
type _17 = Expect<Equal<Parameters<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<MethodParts<Overloaded>["args"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<MethodParts<Overloaded>["result"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<DecoratedValue<OverloadedDecorator>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnType<OverloadedDecorator>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<OverloadedDecorator, (value: Overloaded, context: any) => Overloaded | void>, TODO>>; // TODO(koan) @koan-error

// 4. Method variance, top/bottom results, and detached receivers remain sharp (24-30)
type BroadInput = TypedMethod<Receiver, [value: string | number], string>;
type NarrowInput = TypedMethod<Receiver, [value: "x"], string>;
type StringDecorator = TypedMethodDecorator<Receiver, [value: string], string>;
type _24 = Expect<Equal<Extends<BroadInput, StringMethod>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<NarrowInput, StringMethod>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ThisParameterType<StringMethod>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<OmitThisParameter<StringMethod>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Exclude<ReturnType<StringDecorator>, void>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<Exclude<ReturnType<TypedMethodDecorator<Receiver, [], unknown>>, void>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<Exclude<ReturnType<TypedMethodDecorator<Receiver, [], never>>, void>>, TODO>>; // TODO(koan) @koan-error
