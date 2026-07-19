import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, BivariantCallback, Cat, Dog, MethodHandler, PropertyHandler, StrictCallback } from "./k-146-bivariance-methods-and-properties.js";

/** GUIDED DRILLS: hold value types constant while changing only callback declaration syntax. */

type Extends<From, To> = [From] extends [To] ? true : false;
type ReturningMethod<Input, Output> = { run(value: Input): Output };
type ReturningProperty<Input, Output> = { run: (value: Input) => Output };
type OptionalMethod<Value> = { run(value?: Value): void };
type OptionalProperty<Value> = { run: (value?: Value) => void };
type RestMethod<Value> = { run(...values: Value[]): void };
type RestProperty<Value> = { run: (...values: Value[]) => void };

// Strict function properties (1-15)
type _01 = Expect<Equal<Extends<PropertyHandler<Animal>, PropertyHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<PropertyHandler<Dog>, PropertyHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<PropertyHandler<Animal>, PropertyHandler<Cat>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<PropertyHandler<Cat>, PropertyHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<PropertyHandler<Dog | Cat>, PropertyHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<PropertyHandler<Dog>, PropertyHandler<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<PropertyHandler<unknown>, PropertyHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<PropertyHandler<Dog>, PropertyHandler<unknown>>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<PropertyHandler<never>, PropertyHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<PropertyHandler<Dog>, PropertyHandler<never>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<PropertyHandler<Dog>["handle"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<PropertyHandler<Dog>["handle"]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<StrictCallback<Animal>, StrictCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<StrictCallback<Dog>, StrictCallback<Animal>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Equal<PropertyHandler<Dog>["handle"], StrictCallback<Dog>>, TODO>>; // TODO(koan) @koan-error

// Bivariant methods (16-30)
type _16 = Expect<Equal<Extends<MethodHandler<Animal>, MethodHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<MethodHandler<Animal>, MethodHandler<Cat>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<MethodHandler<Cat>, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<MethodHandler<Dog | Cat>, MethodHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<MethodHandler<unknown>, MethodHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<unknown>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<MethodHandler<never>, MethodHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<never>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<MethodHandler<Dog>["handle"]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<MethodHandler<Dog>["handle"]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Equal<MethodHandler<Dog>["handle"], BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<MethodHandler<Dog>, PropertyHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<PropertyHandler<Dog>, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error

// The indexed bivariance callback (31-45)
type _31 = Expect<Equal<Extends<BivariantCallback<Animal>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Extends<BivariantCallback<Dog>, BivariantCallback<Animal>>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Extends<BivariantCallback<Cat>, BivariantCallback<Animal>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extends<BivariantCallback<Dog | Cat>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extends<BivariantCallback<Dog>, BivariantCallback<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Extends<StrictCallback<Animal>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Extends<StrictCallback<Dog>, BivariantCallback<Animal>>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Extends<BivariantCallback<Animal>, StrictCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Extends<BivariantCallback<Dog>, StrictCallback<Animal>>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Parameters<BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<ReturnType<BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Extends<BivariantCallback<unknown>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Extends<BivariantCallback<never>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Extends<BivariantCallback<any>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Equal<BivariantCallback<Dog>, MethodHandler<Dog>["handle"]>, TODO>>; // TODO(koan) @koan-error

// Returns, optional/rest parameters, and wrappers (46-60)
type _46 = Expect<Equal<Extends<ReturningMethod<Dog, Dog>, ReturningMethod<Animal, Animal>>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extends<ReturningMethod<Animal, Animal>, ReturningMethod<Dog, Dog>>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Extends<ReturningMethod<Dog, Animal>, ReturningMethod<Animal, Animal>>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Extends<ReturningMethod<Animal, Dog>, ReturningMethod<Dog, Animal>>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<ReturningProperty<Animal, Dog>, ReturningProperty<Dog, Animal>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<ReturningProperty<Dog, Dog>, ReturningProperty<Animal, Animal>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Parameters<ReturningMethod<Dog, Cat>["run"]>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<ReturnType<ReturningMethod<Dog, Cat>["run"]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Parameters<ReturningProperty<Dog, Cat>["run"]>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<ReturningProperty<Dog, Cat>["run"]>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extends<OptionalMethod<Dog>, OptionalMethod<Animal>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<OptionalProperty<Dog>, OptionalProperty<Animal>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<RestMethod<Dog>, RestMethod<Animal>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<RestProperty<Dog>, RestProperty<Animal>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<readonly MethodHandler<Dog>[], readonly MethodHandler<Animal>[] >, TODO>>; // TODO(koan) @koan-error

