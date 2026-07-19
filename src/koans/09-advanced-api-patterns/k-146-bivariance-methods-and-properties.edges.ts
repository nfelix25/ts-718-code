import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, BivariantCallback, Cat, Dog, MethodHandler, PropertyHandler } from "./k-146-bivariance-methods-and-properties.js";

/** EDGE CASES: unsound method substitution, arity variants, return covariance, wrappers, and special types. */

type Extends<From, To> = [From] extends [To] ? true : false;
type OptionalMethod<V> = { run(value?: V): void };
type OptionalProperty<V> = { run: (value?: V) => void };
type RestMethod<V> = { run(...values: V[]): void };
type RestProperty<V> = { run: (...values: V[]) => void };
type TwoMethod<V> = { run(left: V, right: V): void };
type TwoProperty<V> = { run: (left: V, right: V) => void };
type ReturningMethod<I, O> = { run(value: I): O };

// Pre-solved demonstrations identify the exception precisely.
type _DemoStrictSafe = Expect<Equal<Extends<PropertyHandler<Animal>, PropertyHandler<Dog>>, true>>;
type _DemoStrictUnsafe = Expect<Equal<Extends<PropertyHandler<Dog>, PropertyHandler<Animal>>, false>>;
type _DemoMethodUnsafe = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<Animal>>, true>>;
type _DemoHackUnsafe = Expect<Equal<Extends<BivariantCallback<Dog>, BivariantCallback<Animal>>, true>>;
// The accepted narrow method can receive a Cat at runtime and fail when it calls bark.

// 1. Sound properties versus bivariant methods (1-8)
type _01 = Expect<Equal<Extends<PropertyHandler<Animal>, PropertyHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<PropertyHandler<Dog>, PropertyHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<MethodHandler<Animal>, MethodHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<BivariantCallback<Animal>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<BivariantCallback<Dog>, BivariantCallback<Animal>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<MethodHandler<Cat>, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<PropertyHandler<Cat>, PropertyHandler<Animal>>, TODO>>; // TODO(koan) @koan-error

// 2. Optional, rest, and multiple parameters (9-16)
type _09 = Expect<Equal<Extends<OptionalMethod<Dog>, OptionalMethod<Animal>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<OptionalProperty<Dog>, OptionalProperty<Animal>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<RestMethod<Dog>, RestMethod<Animal>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<RestProperty<Dog>, RestProperty<Animal>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<TwoMethod<Dog>, TwoMethod<Animal>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<TwoProperty<Dog>, TwoProperty<Animal>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<TwoMethod<Dog>["run"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<TwoProperty<Dog>["run"]>, TODO>>; // TODO(koan) @koan-error

// 3. Return covariance and wrappers still contribute (17-23)
type _17 = Expect<Equal<Extends<ReturningMethod<Dog, Dog>, ReturningMethod<Animal, Animal>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<ReturningMethod<Animal, Dog>, ReturningMethod<Dog, Animal>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<ReturningMethod<Dog, Animal>, ReturningMethod<Animal, Dog>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<ReturningMethod<Dog, Cat>["run"]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<Promise<MethodHandler<Dog>>, Promise<MethodHandler<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<readonly MethodHandler<Dog>[], readonly MethodHandler<Animal>[]>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<() => MethodHandler<Dog>, () => MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error

// 4. Top, bottom, any, and unions (24-30)
type _24 = Expect<Equal<Extends<MethodHandler<never>, MethodHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<MethodHandler<unknown>, MethodHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<PropertyHandler<never>, PropertyHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<PropertyHandler<unknown>, PropertyHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<BivariantCallback<any>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Parameters<BivariantCallback<Dog> | BivariantCallback<Cat>>[0], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<MethodHandler<Dog> | MethodHandler<Cat>, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error

