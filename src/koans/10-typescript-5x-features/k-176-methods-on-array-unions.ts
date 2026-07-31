import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 176 - METHODS ON UNIONS OF ARRAYS
 * =======================================
 *
 * A value typed `string[] | number[]` is one array at runtime, but its method
 * property is a union of two separately generic method families. Before
 * TypeScript 5.2, calls such as `values.filter(...)` could fail because the
 * checker could not find one compatible overload to call.
 *
 * TypeScript 5.2 recognizes unions of arrays at a method call. It forms a
 * fallback array whose element is the union, then checks the call against that:
 * read `string[] | number[]` aloud as `(string | number)[]` for this call.
 * Fresh results therefore usually have `(string | number)[]`, not the original
 * `string[] | number[]` container union. Existing arrays are not rewritten,
 * and unsafe writes do not become valid.
 *
 * This is a pragmatic call-site rule, not a general law that combines every
 * union of generic containers. Knowing where precision is deliberately traded
 * for usability is the mental model.
 *
 * Feature ownership: TypeScript 5.2.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#easier-method-usage-for-unions-of-arrays
 */

export interface ComicChapter {
  type: "prologue" | "chapter";
  pages: number;
}

export interface AudioChapter {
  type: "prologue" | "chapter";
  duration: number;
}

export interface Comic {
  kind: "comic";
  chapters: ComicChapter[];
}

export interface Audiobook {
  kind: "audio";
  chapters: AudioChapter[];
}

export type Book = Comic | Audiobook;
export type ScalarArrays = string[] | number[];
export type ReadonlyScalarArrays = readonly string[] | readonly number[];

export type ElementOf<ArrayType extends readonly unknown[]> =
  ArrayType[number];

export type CombinedScalar = ElementOf<ScalarArrays>;
export type CombinedChapter = ElementOf<Book["chapters"]>;

export function filterTruthy(values: ScalarArrays): CombinedScalar[] {
  return values.filter(Boolean);
}

export function findFirst(
  values: ScalarArrays,
  predicate: (value: CombinedScalar) => boolean,
): CombinedScalar | undefined {
  return values.find(predicate);
}

export function hasMatch(
  values: ScalarArrays,
  predicate: (value: CombinedScalar) => boolean,
): boolean {
  return values.some(predicate);
}

export function allMatch(
  values: ReadonlyScalarArrays,
  predicate: (value: CombinedScalar) => boolean,
): boolean {
  return values.every(predicate);
}

export function describeAll(values: ReadonlyScalarArrays): string[] {
  return values.map((value) => `${typeof value}:${value}`);
}

export function totalPrintedLength(values: ReadonlyScalarArrays): number {
  return values.reduce<number>(
    (total, value) => total + String(value).length,
    0,
  );
}

export function findPrologue(book: Book): CombinedChapter | undefined {
  return book.chapters.find((chapter) => chapter.type === "prologue");
}

// Part 1: element unions are straightforward even when container unions are not.
type _01 = Expect<Equal<ElementOf<string[]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ElementOf<number[]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ElementOf<ScalarArrays>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<CombinedChapter, TODO>>; // TODO(koan) @koan-error

// Part 2: fresh array results use the combined element type.
type _05 = Expect<Equal<ReturnType<typeof filterTruthy>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof describeAll>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Awaited<ReturnType<typeof filterTruthy>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<typeof filterTruthy>[number], TODO>>; // TODO(koan) @koan-error

// Part 3: scalar-returning methods expose the combined element or one scalar.
type _09 = Expect<Equal<ReturnType<typeof findFirst>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<typeof hasMatch>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof allMatch>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof totalPrintedLength>, TODO>>; // TODO(koan) @koan-error

// Part 4: callback parameters are contextualized with the combined element.
type _13 = Expect<Equal<Parameters<typeof findFirst>[1], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<Parameters<typeof findFirst>[1]>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof allMatch>[0], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof findPrologue>, TODO>>; // TODO(koan) @koan-error

// Part 5: the source remains a union of containers despite the call fallback.
type _17 = Expect<Equal<ScalarArrays, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Book["chapters"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReadonlyScalarArrays[number], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof findPrologue>[0], TODO>>; // TODO(koan) @koan-error
