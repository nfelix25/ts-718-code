import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ClassArguments,
  type ClassInstance,
  type ClassReplacement,
  type Constructor,
  type StandardClassDecorator,
  addInstanceTag,
  createDecoratedService,
  registerClass,
  traceConstruction,
} from "./k-161-class-decorators.js";

/**
 * GUIDED DRILLS
 * =============
 *
 * Move repeatedly between constructor values, instance types, class contexts,
 * compatible decorator returns, and the final decorated declaration. Keep the
 * static side and instance side separate throughout.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type ServiceInstance = {
  readonly name: string;
  greet(): string;
};
type ServiceClass = {
  readonly category: "service";
  new (name: string): ServiceInstance;
};
type ServiceDecorator = StandardClassDecorator<ServiceClass>;
type ServiceContext = ClassDecoratorContext<ServiceClass>;

// Constructor, argument, instance, and static-side reflection (1-15)
type _01 = Expect<Equal<Constructor, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Constructor<{ id: number }, [id: number]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ConstructorParameters<Constructor<{ id: number }, [id: number]>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<InstanceType<Constructor<{ id: number }, [id: number]>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ClassArguments<ServiceClass>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ClassInstance<ServiceClass>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ConstructorParameters<ServiceClass>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<InstanceType<ServiceClass>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<ServiceClass["category"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<keyof ServiceClass, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<keyof ServiceInstance, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<ServiceInstance["greet"]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ReturnType<ServiceInstance["greet"]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<ServiceClass, Constructor<ServiceInstance, [string]>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Constructor<ServiceInstance, [string]>, ServiceClass>, TODO>>; // TODO(koan) @koan-error

// Class context and initializer callback signatures (16-30)
type _16 = Expect<Equal<ServiceContext["kind"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ServiceContext["name"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<keyof ServiceContext, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<ServiceContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<ServiceContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ThisParameterType<Parameters<ServiceContext["addInitializer"]>[0]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Parameters<Parameters<ServiceContext["addInitializer"]>[0]>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<Parameters<ServiceContext["addInitializer"]>[0]>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ClassDecoratorContext["kind"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ClassDecoratorContext["name"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<ClassDecoratorContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ServiceContext extends ClassDecoratorContext ? true : false, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ClassDecoratorContext<ServiceClass>["name"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ThisParameterType<Parameters<ClassDecoratorContext<ServiceClass>["addInitializer"]>[0]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<Parameters<ClassDecoratorContext<ServiceClass>["addInitializer"]>[0]>, TODO>>; // TODO(koan) @koan-error

// Decorator inputs, outputs, and factory types (31-45)
type _31 = Expect<Equal<Parameters<ServiceDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Parameters<ServiceDecorator>[1], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<ReturnType<ServiceDecorator>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ClassReplacement<ServiceDecorator>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<ClassArguments<ClassReplacement<ServiceDecorator>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ClassInstance<ClassReplacement<ServiceDecorator>>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Parameters<typeof traceConstruction>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<ReturnType<typeof traceConstruction>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Parameters<typeof addInstanceTag>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<typeof addInstanceTag>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Parameters<typeof registerClass>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<typeof registerClass>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Parameters<ReturnType<typeof traceConstruction>>[0], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Parameters<ReturnType<typeof traceConstruction>>[1]["kind"], TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<ReturnType<ReturnType<typeof registerClass>>, TODO>>; // TODO(koan) @koan-error

// Final decorated class, instance, and relationship checks (46-60)
type Decorated = ReturnType<typeof createDecoratedService>;
type DecoratedInstance = InstanceType<Decorated>;
type _46 = Expect<Equal<Decorated, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<ConstructorParameters<Decorated>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Decorated["category"], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<keyof Decorated, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<keyof DecoratedInstance, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<DecoratedInstance["name"], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<DecoratedInstance["greet"], TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<DecoratedInstance["greet"]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<DecoratedInstance["greet"]>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<"runtimeTag" extends keyof DecoratedInstance ? true : false, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extends<Decorated, Constructor<DecoratedInstance, [string]>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<DecoratedInstance, ServiceInstance>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<Decorated, ServiceClass>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ClassArguments<Decorated>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ClassInstance<Decorated>, TODO>>; // TODO(koan) @koan-error
