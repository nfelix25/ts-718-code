import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, Cat, Channel, Dog, Sink, Source } from "./k-145-variance-annotations.js";

/** EDGE CASES: annotation validation, stricter invariance, structural comparison, unions, and special types. */

type Extends<From, To> = [From] extends [To] ? true : false;

// @ts-expect-error `out` is dishonest when T is consumed by a strict function property.
type BadOutput<out Value> = { consume: (value: Value) => void };
// @ts-expect-error `in` is dishonest when T is produced.
type BadInput<in Value> = { produce: () => Value };
type StrictReadonly<in out Value> = { readonly value: Value };

// Pre-solved demonstrations: annotations validate usage and may be stricter than inference.
type _DemoOut = Expect<Equal<Extends<Source<Dog>, Source<Animal>>, true>>;
type _DemoIn = Expect<Equal<Extends<Sink<Animal>, Sink<Dog>>, true>>;
type _DemoInOut = Expect<Equal<Extends<Channel<Dog>, Channel<Animal>>, false>>;
type _DemoStricter = Expect<Equal<Extends<StrictReadonly<Dog>, StrictReadonly<Animal>>, false>>;

// 1. Explicit and inferred contracts agree for honest definitions (1-8)
type _01 = Expect<Equal<Extends<Source<Dog>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Source<Animal>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Sink<Animal>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Sink<Dog>, Sink<Animal>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<Channel<Dog>, Channel<Animal>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Channel<Animal>, Channel<Dog>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<Source<Dog>["get"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<Sink<Dog>["put"]>[0], TODO>>; // TODO(koan) @koan-error

// 2. `in out` may deliberately make an otherwise covariant structure stricter (9-16)
type _09 = Expect<Equal<Extends<StrictReadonly<Dog>, StrictReadonly<Animal>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<StrictReadonly<Animal>, StrictReadonly<Dog>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<StrictReadonly<Dog>, { readonly value: Animal }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<{ readonly value: Dog }, StrictReadonly<Animal>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<StrictReadonly<Dog>["value"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<StrictReadonly<Dog>, StrictReadonly<Dog>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<StrictReadonly<never>, StrictReadonly<Dog>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<StrictReadonly<unknown>, StrictReadonly<Dog>>, TODO>>; // TODO(koan) @koan-error

// 3. Nested annotations multiply signs; invariant inner constructors stop movement (17-23)
type _17 = Expect<Equal<Extends<Source<Sink<Animal>>, Source<Sink<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Sink<Source<Animal>>, Sink<Source<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Sink<Sink<Dog>>, Sink<Sink<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<Source<Channel<Dog>>, Source<Channel<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<Sink<Channel<Dog>>, Sink<Channel<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<Source<Dog | Cat>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<Sink<Animal>, Sink<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error

// 4. any, never, unknown, and unions still apply their ordinary assignability rules (24-30)
type _24 = Expect<Equal<Extends<Source<never>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Source<Dog>, Source<unknown>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<Sink<unknown>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<Sink<Dog>, Sink<never>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<Source<any>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<Sink<any>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<Channel<any>, Channel<Dog>>, TODO>>; // TODO(koan) @koan-error
