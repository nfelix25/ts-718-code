import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  makeDefinedReader,
  makeTextReader,
  makeUrlReader,
  mapAgainstBase,
} from "./k-185-preserved-closure-narrowing.js";

/** EDGE CASES: preservation requires a non-hoisted closure created after the last assignment, any nested write blocks the optimization, branch joins must establish one narrow type, const captures use older stability rules, and generic values can retain Value when fallback assignment excludes undefined. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;

// Pre-solved real closure demonstrations establish the supported pattern.
function demo(value: string | undefined): () => number {
  value ??= "ready";
  return () => {
    type _DemoPreserved = Expect<Equal<typeof value, string>>;
    return value.length;
  };
}
void demo;

// 1. Last-assignment result types (1-8)
type _01 = Expect<Equal<Exclude<string | URL, string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Exclude<string | undefined, undefined>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<NonNullable<string | undefined>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<ReturnType<typeof makeUrlReader>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<ReturnType<typeof makeTextReader>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof mapAgainstBase>[number], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<ReturnType<typeof makeDefinedReader<number>>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<ReturnType<typeof makeDefinedReader<undefined>>>, TODO>>; // TODO(koan) @koan-error

// 2. Declared union versus closure result (9-15)
type _09 = Expect<Equal<Parameters<typeof makeUrlReader>[0], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<ReturnType<typeof makeUrlReader>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<URL, string | URL>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<string | URL, URL>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<typeof makeTextReader>[0], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<ReturnType<typeof makeTextReader>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<string | undefined, string>, TODO>>; // TODO(koan) @koan-error

// 3. Generic fallback boundaries (16-22)
type _16 = Expect<Equal<Parameters<typeof makeDefinedReader<string>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ReturnType<typeof makeDefinedReader<string>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<ReturnType<typeof makeDefinedReader<string>>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<ReturnType<typeof makeDefinedReader<null>>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof makeDefinedReader<never>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<IsNever<ReturnType<ReturnType<typeof makeDefinedReader<never>>>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<never, undefined>, TODO>>; // TODO(koan) @koan-error

// 4. Closure factories still expose ordinary function types (23-30)
type _23 = Expect<Equal<keyof ReturnType<typeof makeUrlReader>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<ReturnType<typeof makeUrlReader>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Parameters<ReturnType<typeof makeTextReader>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<ReturnType<typeof makeUrlReader>, Function>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<ReturnType<typeof makeTextReader>, () => string>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<() => string, ReturnType<typeof makeTextReader>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Awaited<ReturnType<ReturnType<typeof makeTextReader>>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<typeof mapAgainstBase>["length"], TODO>>; // TODO(koan) @koan-error
