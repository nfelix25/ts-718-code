import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type MethodContextOf,
  type MethodDecorator,
  type MethodReplacement,
  type MethodValue,
} from "./k-162-method-decorators.js";

/**
 * EDGE CASES: replacements obey strict function direction, private names stay contextual, overload reflection is lossy, and detached receivers remain a runtime concern.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type Receiver = { value: number };
type Original = MethodValue<Receiver, [input: string], number>;
type Decorator = MethodDecorator<Receiver, [string], number>;
type BroadInput = MethodValue<Receiver, [input: string | number], number>;
type NarrowInput = MethodValue<Receiver, [input: "fixed"], number>;
type BroadOutput = MethodValue<Receiver, [input: string], number | string>;
type NarrowOutput = MethodValue<Receiver, [input: string], 1>;
type AsyncMethod = MethodValue<Receiver, [id: string], Promise<number>>;

interface Overloaded {
  (input: string): string;
  (input: number): number;
}

// Pre-solved demonstrations summarize safe replacement direction.
type _DemoBroadInput = Expect<Equal<Extends<BroadInput, Original>, true>>;
type _DemoNarrowInput = Expect<Equal<Extends<NarrowInput, Original>, false>>;
type _DemoNarrowOutput = Expect<Equal<Extends<NarrowOutput, Original>, true>>;
type _DemoBroadOutput = Expect<Equal<Extends<BroadOutput, Original>, false>>;

// 1. Parameter and result variance constrain wrappers (1-8)
type _01 = Expect<Equal<Extends<BroadInput, Original>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<NarrowInput, Original>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<NarrowOutput, Original>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<BroadOutput, Original>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<MethodReplacement<Decorator>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<MethodReplacement<Decorator>, Original>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<Decorator>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<Decorator>, TODO>>; // TODO(koan) @koan-error

// 2. Receiver, private name, and access facts remain explicit (9-16)
type Context = MethodContextOf<Original>;
type _09 = Expect<Equal<ThisParameterType<Original>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Context["name"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Context["private"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Context["static"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<Context["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<Context["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<Context["access"]["has"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<keyof Context["access"], TODO>>; // TODO(koan) @koan-error

// 3. Async and overloaded method reflection has its own rules (17-23)
type _17 = Expect<Equal<ReturnType<AsyncMethod>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Awaited<ReturnType<AsyncMethod>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<MethodContextOf<AsyncMethod>["kind"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReturnType<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<MethodContextOf<Overloaded>["name"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<MethodContextOf<Overloaded>["access"]["get"]>, TODO>>; // TODO(koan) @koan-error

// 4. Void, never, any, and union methods (24-30)
type UnionMethod = Original | AsyncMethod;
type _24 = Expect<Equal<MethodReplacement<() => void>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<MethodReplacement<() => never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsAny<MethodReplacement<() => any>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<MethodContextOf<never>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<MethodContextOf<unknown>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Parameters<UnionMethod>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<UnionMethod>, TODO>>; // TODO(koan) @koan-error
