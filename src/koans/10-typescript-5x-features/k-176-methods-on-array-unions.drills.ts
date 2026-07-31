import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AudioChapter,
  type Audiobook,
  type Book,
  type CombinedChapter,
  type CombinedScalar,
  type Comic,
  type ComicChapter,
  type ElementOf,
  type ReadonlyScalarArrays,
  type ScalarArrays,
  allMatch,
  describeAll,
  filterTruthy,
  findFirst,
  findPrologue,
  hasMatch,
  totalPrintedLength,
} from "./k-176-methods-on-array-unions.js";

/** GUIDED DRILLS: repeat element extraction, fresh-result widening, scalar-returning calls, readonly sources, domain unions, and callback reflection until the fallback rule is automatic. */

type Extends<From, To> = [From] extends [To] ? true : false;
type TextOrDates = string[] | Date[];
type LiteralArrays = Array<"a" | "b"> | Array<1 | 2>;

// Element extraction across array unions (1-12)
type _01 = Expect<Equal<ElementOf<string[]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ElementOf<number[]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ElementOf<boolean[] | bigint[]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ElementOf<readonly symbol[] | readonly Date[]>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ElementOf<ScalarArrays>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ElementOf<ReadonlyScalarArrays>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ElementOf<TextOrDates>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ElementOf<LiteralArrays>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<ElementOf<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ElementOf<[1, 2] | ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ElementOf<Array<{ id: string }> | Array<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<CombinedScalar, TODO>>; // TODO(koan) @koan-error

// Fresh array results combine elements (13-24)
type _13 = Expect<Equal<ReturnType<typeof filterTruthy>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof filterTruthy>[number], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<ReturnType<typeof filterTruthy>, ScalarArrays>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<ScalarArrays, ReturnType<typeof filterTruthy>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ReturnType<typeof describeAll>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof describeAll>[number], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<ReturnType<typeof describeAll>, readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<ReturnType<typeof filterTruthy>, readonly CombinedScalar[]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Array<CombinedScalar>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReadonlyArray<CombinedScalar>[number], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Array<ElementOf<TextOrDates>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Array<ElementOf<LiteralArrays>>, TODO>>; // TODO(koan) @koan-error

// Scalar and boolean method results (25-36)
type _25 = Expect<Equal<ReturnType<typeof findFirst>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Exclude<ReturnType<typeof findFirst>, undefined>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extract<ReturnType<typeof findFirst>, undefined>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ReturnType<typeof hasMatch>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<typeof allMatch>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<typeof totalPrintedLength>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Parameters<typeof findFirst>[0], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Parameters<typeof hasMatch>[0], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Parameters<typeof allMatch>[0], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Parameters<typeof totalPrintedLength>[0], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Parameters<typeof findFirst>[1], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ReturnType<Parameters<typeof hasMatch>[1]>, TODO>>; // TODO(koan) @koan-error

// Domain-model array unions (37-48)
type _37 = Expect<Equal<Book["chapters"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Comic["chapters"], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Audiobook["chapters"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ElementOf<Comic["chapters"]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<ElementOf<Audiobook["chapters"]>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<CombinedChapter, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ReturnType<typeof findPrologue>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Exclude<ReturnType<typeof findPrologue>, undefined>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Extends<ComicChapter, CombinedChapter>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Extends<AudioChapter, CombinedChapter>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extends<CombinedChapter, ComicChapter>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<typeof findPrologue>, TODO>>; // TODO(koan) @koan-error

// Container identity versus combined element views (49-60)
type _49 = Expect<Equal<ScalarArrays, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<ReadonlyScalarArrays, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<ScalarArrays, Array<CombinedScalar>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Extends<Array<CombinedScalar>, ScalarArrays>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extends<ReadonlyScalarArrays, ReadonlyArray<CombinedScalar>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extends<ReadonlyArray<CombinedScalar>, ReadonlyScalarArrays>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<keyof ScalarArrays, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<ScalarArrays[number], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReadonlyScalarArrays[number], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ScalarArrays["length"], TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ReadonlyScalarArrays["length"], TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<ScalarArrays, ReadonlyScalarArrays>, TODO>>; // TODO(koan) @koan-error
