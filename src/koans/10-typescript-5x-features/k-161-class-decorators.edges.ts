import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ClassArguments,
  type ClassInstance,
  type ClassReplacement,
  type Constructor,
  type StandardClassDecorator,
  createDecoratedService,
} from "./k-161-class-decorators.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * Class decorators are substitutive runtime transforms. Added runtime fields do
 * not rewrite the class declaration's type, and replacement constructors must
 * retain required static members as well as compatible construction/instances.
 * Assertions can still claim a replacement or finalized state that never exists.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type BaseInstance = { readonly id: number };
type BaseClass = {
  readonly kind: "base";
  new (id: number): BaseInstance;
};
type Decorator = StandardClassDecorator<BaseClass>;
type MissingStatic = new (id: number) => BaseInstance;
type WrongArgs = { readonly kind: "base"; new (id: string): BaseInstance };
type WiderInstance = {
  readonly kind: "base";
  new (id: number): BaseInstance & { readonly extra: true };
};
type Decorated = ReturnType<typeof createDecoratedService>;
type DecoratedInstance = InstanceType<Decorated>;

// Pre-solved demonstrations put runtime augmentation beside static preservation.
type _DemoHiddenTag = Expect<Equal<"runtimeTag" extends keyof DecoratedInstance ? true : false, false>>;
type _DemoStaticRequired = Expect<Equal<Extends<MissingStatic, BaseClass>, false>>;
type _DemoSubclassCompatible = Expect<Equal<Extends<WiderInstance, BaseClass>, true>>;
type _DemoInitializerThis = Expect<Equal<ThisParameterType<Parameters<ClassDecoratorContext<BaseClass>["addInitializer"]>[0]>, BaseClass>>;
// A runtime assertion is required to read runtimeTag because standard decorators do not act as type-level macros.

// 1. Runtime-added members remain absent from the declared surface (1-8)
type _01 = Expect<Equal<"runtimeTag" extends keyof DecoratedInstance ? true : false, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof DecoratedInstance, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Decorated["category"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<"category" extends keyof Decorated ? true : false, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ClassArguments<Decorated>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ClassInstance<Decorated>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<DecoratedInstance, { readonly runtimeTag: "service" }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<DecoratedInstance & { readonly runtimeTag: "service" }, DecoratedInstance>, TODO>>; // TODO(koan) @koan-error

// 2. Constructor arguments, instances, and static sides all constrain replacement (9-16)
type _09 = Expect<Equal<Extends<MissingStatic, BaseClass>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<WrongArgs, BaseClass>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<WiderInstance, BaseClass>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ClassArguments<MissingStatic>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ClassArguments<WrongArgs>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ClassInstance<WiderInstance>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<Decorator>[0], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<Decorator>, TODO>>; // TODO(koan) @koan-error

// 3. Class initializers receive the finalized constructor as this (17-23)
type Context = ClassDecoratorContext<BaseClass>;
type Initializer = Parameters<Context["addInitializer"]>[0];
type _17 = Expect<Equal<Context["name"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Context["kind"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ThisParameterType<Initializer>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<Initializer>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReturnType<Initializer>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof Context, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Context extends ClassDecoratorContext ? true : false, TODO>>; // TODO(koan) @koan-error

// 4. Void, never, any, and concrete-constructor boundaries (24-30)
type _24 = Expect<Equal<ClassReplacement<() => void>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ClassReplacement<() => never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsAny<ClassReplacement<() => any>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ClassReplacement<Decorator>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Constructor<object, []> extends abstract new () => object ? true : false, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<(abstract new () => object) extends Constructor<object, []> ? true : false, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ClassInstance<never>, TODO>>; // TODO(koan) @koan-error
