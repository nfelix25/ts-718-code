import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, Cat, Channel, Dog, InferredChannel, InferredSink, InferredSource, Sink, Source } from "./k-145-variance-annotations.js";

/** GUIDED DRILLS: read explicit variance signs and compare them with structurally inferred equivalents. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Puppy = Dog & { readonly young: true };

// Explicit covariance (1-15)
type _01 = Expect<Equal<Extends<Source<Dog>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Source<Animal>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Source<Cat>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Source<Puppy>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<Source<Dog>, Source<Puppy>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Source<Dog>, Source<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<Source<Dog | Cat>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<Source<never>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<Source<Dog>, Source<unknown>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Source<unknown>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<Source<Dog>["get"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<Source<Dog>["get"]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<Source<Dog>, InferredSource<Animal>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<InferredSource<Dog>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Equal<Source<Dog>, InferredSource<Dog>>, TODO>>; // TODO(koan) @koan-error

// Explicit contravariance (16-30)
type _16 = Expect<Equal<Extends<Sink<Animal>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<Sink<Dog>, Sink<Animal>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Sink<Animal>, Sink<Cat>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Sink<Dog>, Sink<Puppy>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<Sink<Puppy>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<Sink<Dog | Cat>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<Sink<Animal>, Sink<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<Sink<unknown>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<Sink<Dog>, Sink<never>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Sink<never>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<Sink<Dog>["put"]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<Sink<Dog>["put"]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<Sink<Animal>, InferredSink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<InferredSink<Animal>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Equal<Sink<Dog>, InferredSink<Dog>>, TODO>>; // TODO(koan) @koan-error

// Explicit invariance (31-44)
type _31 = Expect<Equal<Extends<Channel<Dog>, Channel<Dog>>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Extends<Channel<Dog>, Channel<Animal>>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Extends<Channel<Animal>, Channel<Dog>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extends<Channel<Puppy>, Channel<Dog>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extends<Channel<Dog>, Channel<Puppy>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Extends<Channel<Dog>, Channel<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Extends<Channel<Dog | Cat>, Channel<Animal>>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Extends<Channel<never>, Channel<Dog>>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Extends<Channel<unknown>, Channel<Dog>>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<Channel<Dog>["get"]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Parameters<Channel<Dog>["put"]>[0], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Extends<Channel<Dog>, InferredChannel<Animal>>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Extends<InferredChannel<Dog>, Channel<Animal>>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Equal<Channel<Dog>, InferredChannel<Dog>>, TODO>>; // TODO(koan) @koan-error

// Nested signs and wrappers (45-60)
type _45 = Expect<Equal<Extends<Source<Source<Dog>>, Source<Source<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Extends<Source<Sink<Animal>>, Source<Sink<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extends<Source<Sink<Dog>>, Source<Sink<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Extends<Sink<Source<Animal>>, Sink<Source<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Extends<Sink<Source<Dog>>, Sink<Source<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<Sink<Sink<Dog>>, Sink<Sink<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<Sink<Sink<Animal>>, Sink<Sink<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Extends<Source<Channel<Dog>>, Source<Channel<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extends<Sink<Channel<Animal>>, Sink<Channel<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extends<Promise<Source<Dog>>, Promise<Source<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Extends<readonly Sink<Animal>[], readonly Sink<Dog>[]>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extends<() => Sink<Animal>, () => Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<(source: Source<Animal>) => void, (source: Source<Dog>) => void>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<Source<Dog> | Source<Cat>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ReturnType<Source<Dog> | Source<Cat>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Parameters<Sink<Dog>["put"] | Sink<Cat>["put"]>[0], TODO>>; // TODO(koan) @koan-error
