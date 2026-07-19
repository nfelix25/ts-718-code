import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, Cat, Dog, Producer, ReadonlyBox, Source } from "./k-142-covariance.js";

/** GUIDED DRILLS: establish subtyping, then lift it through output-only generic positions. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Puppy = Dog & { readonly young: true };

// Concrete subtype lattice (1-12)
type _01 = Expect<Equal<Extends<Dog, Animal>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Animal, Dog>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Cat, Animal>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Animal, Cat>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<Dog, Cat>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Cat, Dog>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<Puppy, Dog>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<Dog, Puppy>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<Dog | Cat, Animal>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Dog, Dog | Cat>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Animal, Dog | Cat>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<never, Dog>, TODO>>; // TODO(koan) @koan-error

// Producer return positions (13-28)
type _13 = Expect<Equal<Extends<Producer<Dog>, Producer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<Producer<Animal>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Producer<Cat>, Producer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<Producer<Puppy>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<Producer<Dog>, Producer<Puppy>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Producer<Dog>, Producer<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Producer<Dog | Cat>, Producer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<Producer<Animal>, Producer<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<Producer<never>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<Producer<Dog>, Producer<unknown>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<Producer<unknown>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReturnType<Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Parameters<Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<() => readonly [Dog], () => readonly Animal[]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<() => Promise<Dog>, () => Promise<Animal>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<() => ReadonlyBox<Dog>, () => ReadonlyBox<Animal>>, TODO>>; // TODO(koan) @koan-error

// Readonly boxes, sources, arrays, tuples, and Promises (29-44)
type _29 = Expect<Equal<Extends<ReadonlyBox<Dog>, ReadonlyBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<ReadonlyBox<Animal>, ReadonlyBox<Dog>>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Extends<ReadonlyBox<Puppy>, ReadonlyBox<Dog>>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Extends<Source<Dog>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Extends<Source<Animal>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extends<readonly Dog[], readonly Animal[]>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extends<readonly Animal[], readonly Dog[]>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Extends<readonly [Dog], readonly [Animal]>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Extends<readonly [Animal], readonly [Dog]>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Extends<Promise<Dog>, Promise<Animal>>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Extends<Promise<Animal>, Promise<Dog>>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Extends<ReadonlySet<Dog>, ReadonlySet<Animal>>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<ReadonlyBox<Dog>["value"], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<Source<Dog>["get"]>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<(readonly Dog[])[number], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Awaited<Promise<Dog>>, TODO>>; // TODO(koan) @koan-error

// Composition, unions, top, and bottom (45-60)
type _45 = Expect<Equal<Extends<ReadonlyBox<Producer<Dog>>, ReadonlyBox<Producer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Extends<Producer<ReadonlyBox<Dog>>, Producer<ReadonlyBox<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extends<Promise<readonly Dog[]>, Promise<readonly Animal[]>>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Extends<readonly Promise<Dog>[], readonly Promise<Animal>[]>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Extends<ReadonlyBox<Dog | Cat>, ReadonlyBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<ReadonlyBox<Dog>, ReadonlyBox<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<ReadonlyBox<never>, ReadonlyBox<Dog>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Extends<ReadonlyBox<Dog>, ReadonlyBox<unknown>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extends<ReadonlyBox<unknown>, ReadonlyBox<Dog>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extends<Promise<never>, Promise<Dog>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Extends<readonly never[], readonly Dog[]>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extends<Producer<Dog> | Producer<Cat>, Producer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<Producer<Dog | Cat>, Producer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<Producer<Dog> | Producer<Cat>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ReadonlyBox<Dog | Cat>["value"], TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Awaited<Promise<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
