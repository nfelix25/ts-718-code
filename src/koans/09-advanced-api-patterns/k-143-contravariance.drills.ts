import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, Cat, Comparator, Consumer, Dog, Handler, Predicate, Producer } from "./k-143-contravariance.js";

/** GUIDED DRILLS: reverse subtype direction through input positions and count nested flips. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Puppy = Dog & { readonly young: true };

// Concrete subtype direction (1-12)
type _01 = Expect<Equal<Extends<Dog, Animal>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Animal, Dog>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Cat, Animal>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Animal, Cat>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<Puppy, Dog>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Dog, Puppy>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<Dog | Cat, Animal>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<Dog, Dog | Cat>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<unknown, Animal>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Animal, unknown>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<never, Animal>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<Animal, never>, TODO>>; // TODO(koan) @koan-error

// Unary consumer parameters (13-28)
type _13 = Expect<Equal<Extends<Consumer<Animal>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<Consumer<Dog>, Consumer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Consumer<Animal>, Consumer<Cat>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<Consumer<Dog>, Consumer<Puppy>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<Consumer<Puppy>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Consumer<Dog | Cat>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Consumer<Animal>, Consumer<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<Consumer<Dog>, Consumer<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<Consumer<unknown>, Consumer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<Consumer<unknown>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<Consumer<Animal>, Consumer<unknown>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<Consumer<never>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Consumer<Dog>, Consumer<never>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Parameters<Consumer<Dog>>[0], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ReturnType<Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error

// Predicates, comparators, and handler properties (29-44)
type _29 = Expect<Equal<Extends<Predicate<Animal>, Predicate<Dog>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<Predicate<Dog>, Predicate<Animal>>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Extends<Comparator<Animal>, Comparator<Dog>>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Extends<Comparator<Dog>, Comparator<Animal>>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Parameters<Comparator<Dog>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReturnType<Predicate<Dog>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extends<Handler<Animal>, Handler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Extends<Handler<Dog>, Handler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Handler<Dog>["handle"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Parameters<Handler<Dog>["handle"]>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Extends<{ callback: Consumer<Animal> }, { callback: Consumer<Dog> }>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Extends<{ callback: Consumer<Dog> }, { callback: Consumer<Animal> }>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Extends<readonly Consumer<Animal>[], readonly Consumer<Dog>[]>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Extends<Promise<Consumer<Animal>>, Promise<Consumer<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Extends<Consumer<Animal> | Consumer<Dog>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Parameters<Consumer<Animal> | Consumer<Dog>>[0], TODO>>; // TODO(koan) @koan-error

// Nested variance positions (45-60)
type _45 = Expect<Equal<Extends<Consumer<Producer<Animal>>, Consumer<Producer<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Extends<Consumer<Producer<Dog>>, Consumer<Producer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extends<Producer<Consumer<Animal>>, Producer<Consumer<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Extends<Producer<Consumer<Dog>>, Producer<Consumer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Extends<Consumer<Consumer<Dog>>, Consumer<Consumer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<Consumer<Consumer<Animal>>, Consumer<Consumer<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<Consumer<Consumer<Puppy>>, Consumer<Consumer<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Extends<Producer<Producer<Dog>>, Producer<Producer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extends<Consumer<readonly Animal[]>, Consumer<readonly Dog[]>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extends<Consumer<readonly Dog[]>, Consumer<readonly Animal[]>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Extends<Consumer<Promise<Animal>>, Consumer<Promise<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extends<Consumer<Promise<Dog>>, Consumer<Promise<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<Readonly<{ consume: Consumer<Animal> }>, Readonly<{ consume: Consumer<Dog> }>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<Producer<Comparator<Animal>>, Producer<Comparator<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<Consumer<Comparator<Dog>>, Consumer<Comparator<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<Consumer<Consumer<Consumer<Animal>>>, Consumer<Consumer<Consumer<Dog>>>>, TODO>>; // TODO(koan) @koan-error
