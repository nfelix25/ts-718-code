import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, Cat, Dog, Producer, ReadonlyBox, Source } from "./k-142-covariance.js";

/** EDGE CASES: writable unsoundness, method returns, nested positions, union producers, any, never, and unknown. */

type Extends<From, To> = [From] extends [To] ? true : false;

type MutableBox<Value> = { value: Value };
type ConsumerAndProducer<Value> = { get(): Value; set(value: Value): void };

// Pre-solved demonstrations state the sound output-only rule and a TypeScript compromise.
type _DemoProducer = Expect<Equal<Extends<Producer<Dog>, Producer<Animal>>, true>>;
type _DemoReadonly = Expect<Equal<Extends<ReadonlyBox<Dog>, ReadonlyBox<Animal>>, true>>;
type _DemoMutableProperty = Expect<Equal<Extends<MutableBox<Dog>, MutableBox<Animal>>, true>>;
// Writable object properties and arrays are treated covariantly, which permits unsound mutation.

// 1. Writable structures look covariant to the checker despite mutation risk (1-8)
type _01 = Expect<Equal<Extends<MutableBox<Dog>, MutableBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<MutableBox<Animal>, MutableBox<Dog>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Dog[], Animal[]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Animal[], Dog[]>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<[Dog], [Animal]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Map<string, Dog>, Map<string, Animal>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<Set<Dog>, Set<Animal>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<ConsumerAndProducer<Dog>, ConsumerAndProducer<Animal>>, TODO>>; // TODO(koan) @koan-error

// 2. Return positions stay covariant through methods, overload-like intersections, and nesting (9-16)
type _09 = Expect<Equal<Extends<{ get(): Dog }, { get(): Animal }>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<{ get: () => Dog }, { get: () => Animal }>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Source<Dog>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<Producer<Producer<Dog>>, Producer<Producer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<Producer<readonly Dog[]>, Producer<readonly Animal[]>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<ReadonlyBox<Promise<Dog>>, ReadonlyBox<Promise<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<() => Dog | Cat, () => Animal>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<(() => Dog) | (() => Cat), () => Animal>, TODO>>; // TODO(koan) @koan-error

// 3. Union placement changes reflection even when assignability agrees (17-23)
type _17 = Expect<Equal<ReturnType<(() => Dog) | (() => Cat)>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<() => Dog | Cat>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Producer<Dog>, Producer<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<Producer<Dog | Cat>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<ReadonlyBox<Dog> | ReadonlyBox<Cat>, ReadonlyBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<(ReadonlyBox<Dog> | ReadonlyBox<Cat>)["value"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReadonlyBox<Dog | Cat>["value"], TODO>>; // TODO(koan) @koan-error

// 4. Top, bottom, any, and void define unusual covariance endpoints (24-30)
type _24 = Expect<Equal<Extends<Producer<never>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Producer<Dog>, Producer<unknown>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<Producer<unknown>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<Producer<any>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<Producer<Dog>, Producer<any>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<Producer<Dog>, Producer<void>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<ReadonlyBox<never>, ReadonlyBox<unknown>>, TODO>>; // TODO(koan) @koan-error
