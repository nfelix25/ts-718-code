import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AnyDecoratorContext,
  type ContextName,
  type DecoratorKind,
  type DecoratorReplacement,
  type Method,
  type StandardMethodDecorator,
} from "./k-160-decorator-mental-model.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * Standard decorators are not legacy experimental decorators. Methods receive a
 * value and context, fields receive `undefined` and may return an initializer,
 * and no standard parameter decorator context exists. Compatible replacement
 * signatures matter even though decorator execution happens at runtime.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type LegacyMethodDecorator = (
  target: object,
  key: string | symbol,
  descriptor: PropertyDescriptor,
) => void;
type StandardFieldDecorator<This, Value> = (
  value: undefined,
  context: ClassFieldDecoratorContext<This, Value>,
) => ((this: This, initialValue: Value) => Value) | void;
type Receiver = { value: number };
type NumberMethod = Method<Receiver, [delta: number], number>;
type NumberDecorator = StandardMethodDecorator<Receiver, [delta: number], number>;

// Pre-solved demonstrations separate the standard and legacy protocols.
type _DemoStandardArity = Expect<Equal<Parameters<NumberDecorator>["length"], 2>>;
type _DemoLegacyArity = Expect<Equal<Parameters<LegacyMethodDecorator>["length"], 3>>;
type _DemoFieldValue = Expect<Equal<Parameters<StandardFieldDecorator<Receiver, number>>[0], undefined>>;
type _DemoNoParameterKind = Expect<Equal<Extract<DecoratorKind, "parameter">, never>>;
// Decoration occurs during class definition; returned method wrappers run only when the method is later invoked.

// 1. Standard versus legacy call shapes (1-8)
type _01 = Expect<Equal<Parameters<NumberDecorator>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<LegacyMethodDecorator>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<NumberDecorator>["length"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<LegacyMethodDecorator>["length"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<DecoratorKind, "parameter">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<DecoratorKind, "method">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<NumberDecorator, LegacyMethodDecorator>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<LegacyMethodDecorator, NumberDecorator>, TODO>>; // TODO(koan) @koan-error

// 2. Fields receive undefined and return per-instance initializer functions (9-16)
type FieldDecorator = StandardFieldDecorator<Receiver, number>;
type FieldInitializer = DecoratorReplacement<FieldDecorator>;
type _09 = Expect<Equal<Parameters<FieldDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<FieldDecorator>[1]["kind"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<FieldInitializer, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<FieldInitializer>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ThisParameterType<FieldInitializer>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<FieldInitializer>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof ClassFieldDecoratorContext<Receiver, number>["access"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<ClassFieldDecoratorContext<Receiver, number>["access"]["set"]>, TODO>>; // TODO(koan) @koan-error

// 3. Context unions expose only common surface until narrowed (17-23)
type _17 = Expect<Equal<keyof AnyDecoratorContext, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<AnyDecoratorContext["kind"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ContextName<AnyDecoratorContext>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ClassMethodDecoratorContext["name"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ClassMethodDecoratorContext["private"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ClassMethodDecoratorContext["static"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ClassDecoratorContext["name"], TODO>>; // TODO(koan) @koan-error

// 4. Replacement compatibility and top/bottom types (24-30)
type WrongArgs = Method<Receiver, [text: string], number>;
type WrongResult = Method<Receiver, [delta: number], string>;
type _24 = Expect<Equal<Extends<NumberMethod, DecoratorReplacement<NumberDecorator>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<WrongArgs, NumberMethod>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<WrongResult, NumberMethod>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<DecoratorReplacement<() => void>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<DecoratorReplacement<() => never>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsAny<DecoratorReplacement<() => any>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ContextName<never>, TODO>>; // TODO(koan) @koan-error
