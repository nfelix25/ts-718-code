import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, Cat, Consumer, Dog, Handler, Predicate, Producer } from "./k-143-contravariance.js";

/** EDGE CASES: method bivariance, optional/rest parameters, unions, any, unknown, never, and nested sign flips. */

type Extends<From, To> = [From] extends [To] ? true : false;
type MethodHandler<Value> = { handle(value: Value): void };

// Pre-solved demonstrations separate strict properties from the method exception.
type _DemoPropertyReverse = Expect<Equal<Extends<Handler<Animal>, Handler<Dog>>, true>>;
type _DemoPropertyUnsafe = Expect<Equal<Extends<Handler<Dog>, Handler<Animal>>, false>>;
type _DemoMethodBivariant = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<Animal>>, true>>;
// Method parameters are checked bivariantly for compatibility with common mutable APIs.

// 1. Method syntax weakens the strict function-property rule (1-8)
type _01 = Expect<Equal<Extends<MethodHandler<Animal>, MethodHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Handler<Animal>, Handler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Handler<Dog>, Handler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<{ handle(value: Cat): void }, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<{ handle: Consumer<Cat> }, Handler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<MethodHandler<Dog>["handle"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<Handler<Dog>["handle"]>, TODO>>; // TODO(koan) @koan-error

// 2. Optional, rest, and union parameters add compatibility dimensions (9-16)
type _09 = Expect<Equal<Extends<(value?: Animal) => void, (value: Dog) => void>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<(value: Animal) => void, (value?: Dog) => void>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<(...values: Animal[]) => void, (...values: Dog[]) => void>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<(...values: Dog[]) => void, (...values: Animal[]) => void>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<Consumer<Animal>, Consumer<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<Consumer<Dog | Cat>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<Consumer<Dog> | Consumer<Cat>>[0], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<Consumer<Dog> | Consumer<Cat>, Consumer<Animal>>, TODO>>; // TODO(koan) @koan-error

// 3. Nested inputs flip the direction once per negative position (17-23)
type _17 = Expect<Equal<Extends<Consumer<Producer<Animal>>, Consumer<Producer<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Consumer<Producer<Dog>>, Consumer<Producer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Consumer<Consumer<Dog>>, Consumer<Consumer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<Consumer<Consumer<Animal>>, Consumer<Consumer<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<Producer<Consumer<Animal>>, Producer<Consumer<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<Consumer<Consumer<Consumer<Animal>>>, Consumer<Consumer<Consumer<Dog>>>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<Consumer<Predicate<Dog>>, Consumer<Predicate<Animal>>>, TODO>>; // TODO(koan) @koan-error

// 4. Top, bottom, any, and void have asymmetric input behavior (24-30)
type _24 = Expect<Equal<Extends<Consumer<unknown>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Consumer<Dog>, Consumer<unknown>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<Consumer<never>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<Consumer<Dog>, Consumer<never>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<Consumer<any>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<Consumer<Dog>, Consumer<any>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<(value: Dog) => void, (value: never) => void>, TODO>>; // TODO(koan) @koan-error
