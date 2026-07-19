import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, Cat, Cell, Codec, Dog, Endomorphism } from "./k-144-invariance.js";

/** EDGE CASES: writable properties, method bivariance, unions, nesting, any, never, and unknown. */

type Extends<From, To> = [From] extends [To] ? true : false;
type PropertyCell<Value> = { value: Value };
type MethodCell<Value> = { get(): Value; set(value: Value): void };

// Pre-solved demonstrations distinguish sound invariance from checker compromises.
type _DemoStrict = Expect<Equal<Extends<Cell<Dog>, Cell<Animal>>, false>>;
type _DemoWritableProperty = Expect<Equal<Extends<PropertyCell<Dog>, PropertyCell<Animal>>, true>>;
type _DemoMethod = Expect<Equal<Extends<MethodCell<Dog>, MethodCell<Animal>>, true>>;
// Method bivariance and writable-property covariance can weaken apparent invariance.

// 1. Syntax determines whether both variance positions are enforced (1-8)
type _01 = Expect<Equal<Extends<Cell<Dog>, Cell<Animal>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Cell<Animal>, Cell<Dog>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<PropertyCell<Dog>, PropertyCell<Animal>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<PropertyCell<Animal>, PropertyCell<Dog>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<MethodCell<Dog>, MethodCell<Animal>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<MethodCell<Animal>, MethodCell<Dog>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<Cell<Dog>["set"]>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<MethodCell<Dog>["set"]>[0], TODO>>; // TODO(koan) @koan-error

// 2. Exact union identity is required when a parameter is both read and written (9-16)
type _09 = Expect<Equal<Extends<Cell<Dog>, Cell<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Cell<Dog | Cat>, Cell<Dog>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Cell<Dog | Cat>, Cell<Animal>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<Cell<Animal>, Cell<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<Codec<Dog | Cat>, Codec<Animal>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<Endomorphism<Dog>, Endomorphism<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<Cell<Dog | Cat>["get"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<Cell<Dog | Cat>["set"]>[0], TODO>>; // TODO(koan) @koan-error

// 3. Wrapping invariant types in covariant or contravariant shells does not reopen them (17-23)
type _17 = Expect<Equal<Extends<Promise<Cell<Dog>>, Promise<Cell<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<readonly Cell<Dog>[], readonly Cell<Animal>[]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<() => Cell<Dog>, () => Cell<Animal>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<(cell: Cell<Animal>) => void, (cell: Cell<Dog>) => void>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<Cell<Cell<Dog>>, Cell<Cell<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<Endomorphism<Endomorphism<Dog>>, Endomorphism<Endomorphism<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<{ value: Cell<Dog> }, { value: Cell<Animal> }>, TODO>>; // TODO(koan) @koan-error

// 4. any bypasses direction while never and unknown remain distinct (24-30)
type _24 = Expect<Equal<Extends<Cell<any>, Cell<Dog>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Cell<Dog>, Cell<any>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<Cell<never>, Cell<Dog>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<Cell<Dog>, Cell<never>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<Cell<unknown>, Cell<Dog>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<Cell<Dog>, Cell<unknown>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Equal<Cell<never>, Cell<never>>, TODO>>; // TODO(koan) @koan-error
