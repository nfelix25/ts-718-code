import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  makeDefinedReader,
  makeTextReader,
  makeUrlReader,
  mapAgainstBase,
} from "./k-185-preserved-closure-narrowing.js";

/** GUIDED DRILLS: repeat post-assignment narrowed types, closure factory parameters/results, nullable elimination, generic fallbacks, array callback surfaces, URL members, and stable versus declared unions. */

type Extends<From, To> = [From] extends [To] ? true : false;
type FactoryResult<Factory extends (...args: never[]) => (...args: never[]) => unknown> =
  ReturnType<ReturnType<Factory>>;
type Maybe<Value> = Value | null | undefined;

// URL factory reflection (1-12)
type _01 = Expect<Equal<Parameters<typeof makeUrlReader>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<typeof makeUrlReader>[0], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof makeUrlReader>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<ReturnType<typeof makeUrlReader>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<ReturnType<typeof makeUrlReader>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<FactoryResult<typeof makeUrlReader>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Exclude<string | URL, string>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<string | URL, URL>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<URL["href"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<URL["searchParams"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<URL["toString"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ConstructorParameters<typeof URL>[0], TODO>>; // TODO(koan) @koan-error

// Text factory reflection (13-24)
type _13 = Expect<Equal<Parameters<typeof makeTextReader>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<typeof makeTextReader>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof makeTextReader>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<ReturnType<typeof makeTextReader>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<NonNullable<string | undefined>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<string | undefined, undefined>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<string | undefined, undefined>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<string["length"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReturnType<string["toUpperCase"]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<string, string | undefined>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<string | undefined, string>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<FactoryResult<typeof makeTextReader>, TODO>>; // TODO(koan) @koan-error

// Array callback and URL resolution (25-36)
type _25 = Expect<Equal<Parameters<typeof mapAgainstBase>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<typeof mapAgainstBase>[0], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Parameters<typeof mapAgainstBase>[1], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ReturnType<typeof mapAgainstBase>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<typeof mapAgainstBase>[number], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Parameters<Array<string>["map"]>[0], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Parameters<Parameters<Array<string>["map"]>[0]>[0], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Parameters<Parameters<Array<string>["map"]>[0]>[1], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<(readonly string[])[number], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Exclude<string | URL, string>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<InstanceType<typeof URL>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ReturnType<typeof mapAgainstBase>["length"], TODO>>; // TODO(koan) @koan-error

// Generic defined-reader factories (37-48)
type NumberReader = typeof makeDefinedReader<number>;
type ObjectReader = typeof makeDefinedReader<{ id: string }>;
type _37 = Expect<Equal<Parameters<NumberReader>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Parameters<NumberReader>[0], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Parameters<NumberReader>[1], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<NumberReader>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<ReturnType<ReturnType<NumberReader>>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Parameters<ObjectReader>[0], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Parameters<ObjectReader>[1], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<ReturnType<ObjectReader>>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<ReturnType<typeof makeDefinedReader<string>>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<ReturnType<ReturnType<typeof makeDefinedReader<string>>>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Exclude<number | undefined, undefined>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Exclude<{ id: string } | undefined, undefined>, TODO>>; // TODO(koan) @koan-error

// Nullable union repetition (49-60)
type _49 = Expect<Equal<NonNullable<Maybe<string>>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<NonNullable<Maybe<number>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<NonNullable<Maybe<URL>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Exclude<Maybe<string>, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extract<Maybe<string>, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extends<NonNullable<Maybe<string>>, Maybe<string>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Extends<Maybe<string>, NonNullable<Maybe<string>>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<NonNullable<never>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<NonNullable<unknown>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Exclude<unknown, undefined>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Exclude<never, undefined>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ReturnType<typeof makeDefinedReader<boolean>>, TODO>>; // TODO(koan) @koan-error
