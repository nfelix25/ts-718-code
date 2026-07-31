import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type DecoratedValue,
  type ExactCallableDecorator,
  type MethodParts,
  type TypedMethod,
  type TypedMethodDecorator,
  auditExactCallable,
  auditMethod,
  createAuditedBox,
  createGenericService,
  requireNonEmptyFirst,
} from "./k-166-well-typed-generic-decorators.js";

/** GUIDED DRILLS: repeatedly preserve receiver/arguments/result, contrast exact-callable capture, inspect generic factories, and reflect monomorphic, async, generic, and captured-type methods. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Receiver = { prefix: string; count: number };
type Zero = TypedMethod<Receiver, [], void>;
type Unary = TypedMethod<Receiver, [value: number], number>;
type Optional = TypedMethod<Receiver, [value: string, limit?: number], string>;
type Async = TypedMethod<Receiver, [id: string], Promise<{ id: string }>>;
type UnaryDecorator = TypedMethodDecorator<Receiver, [value: number], number>;
type OptionalDecorator = TypedMethodDecorator<Receiver, [value: string, limit?: number], string>;
type AsyncDecorator = TypedMethodDecorator<Receiver, [id: string], Promise<{ id: string }>>;

// Receiver, tuple, result, and conditional extraction (1-15)
type _01 = Expect<Equal<ThisParameterType<Zero>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<Zero>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<Zero>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<MethodParts<Unary>["this"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<MethodParts<Unary>["args"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<MethodParts<Unary>["result"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<MethodParts<Optional>["args"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<MethodParts<Optional>["result"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<MethodParts<Async>["args"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<MethodParts<Async>["result"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<MethodParts<string>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<TypedMethod<Receiver, [boolean], Date>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<TypedMethod<Receiver, [boolean], Date>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<TypedMethod<Receiver, [boolean], Date>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ThisParameterType<TypedMethod<Receiver, [boolean], Date>>, TODO>>; // TODO(koan) @koan-error

// Specialized generic decorator contracts (16-30)
type UnaryContext = Parameters<UnaryDecorator>[1];
type OptionalContext = Parameters<OptionalDecorator>[1];
type AsyncContext = Parameters<AsyncDecorator>[1];
type _16 = Expect<Equal<Parameters<UnaryDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Parameters<UnaryDecorator>[1], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<UnaryDecorator>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<OptionalDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<OptionalDecorator>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Parameters<AsyncDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnType<AsyncDecorator>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<UnaryContext["kind"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReturnType<UnaryContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Parameters<UnaryContext["access"]["has"]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<OptionalContext["name"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<OptionalContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<AsyncContext["static"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<AsyncContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<AsyncContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error

// Exact callable identity and factory shapes (31-45)
type Identity = <Value>(value: Value) => Value;
type Pair = <Left, Right>(left: Left, right: Right) => [Left, Right];
type IdentityDecorator = ExactCallableDecorator<Receiver, Identity>;
type PairDecorator = ExactCallableDecorator<Receiver, Pair>;
type _31 = Expect<Equal<DecoratedValue<IdentityDecorator>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<ReturnType<IdentityDecorator>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<DecoratedValue<PairDecorator>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReturnType<PairDecorator>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Parameters<Identity>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ReturnType<Identity>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Parameters<Pair>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<ReturnType<Pair>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Parameters<typeof auditMethod>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<typeof auditMethod>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Parameters<typeof auditExactCallable>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<typeof auditExactCallable>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Parameters<typeof requireNonEmptyFirst>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<typeof requireNonEmptyFirst>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Extends<IdentityDecorator, (value: Identity, context: any) => Identity | void>, TODO>>; // TODO(koan) @koan-error

// Decorated service and captured generic box surfaces (46-60)
type ServiceClass = ReturnType<typeof createGenericService>;
type Service = InstanceType<ServiceClass>;
declare const service: Service;
type NumberBoxClass = ReturnType<typeof createAuditedBox<number>>;
type NumberBox = InstanceType<NumberBoxClass>;
type ObjectBoxClass = ReturnType<typeof createAuditedBox<{ id: string }>>;
type ObjectBox = InstanceType<ObjectBoxClass>;
type _46 = Expect<Equal<ConstructorParameters<ServiceClass>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<keyof Service, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<Service["format"]>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<ReturnType<Service["format"]>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Parameters<Service["increment"]>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<ReturnType<Service["increment"]>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<typeof service.identity<42>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<Service["greet"]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ConstructorParameters<NumberBoxClass>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<NumberBox["value"], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Parameters<NumberBox["set"]>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReturnType<NumberBox["set"]>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ObjectBox["value"], TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Parameters<ObjectBox["set"]>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ReturnType<ObjectBox["set"]>, TODO>>; // TODO(koan) @koan-error
