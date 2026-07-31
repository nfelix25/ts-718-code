import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 177 - COPYING ARRAY METHODS
 * =================================
 *
 * `reverse`, `sort`, and `splice` mutate their receiver. ES2023 added copying
 * counterparts: `toReversed`, `toSorted`, and `toSpliced`, plus `with` for a
 * copied single-index replacement. TypeScript's ESNext library makes these
 * methods available on both mutable and readonly arrays.
 *
 * Read `readonly T[].toReversed(): T[]` aloud as: "I may only read the source,
 * so I create and return a new mutable array containing the same element type."
 * The methods preserve the element union, but they do not promise tuple length,
 * labels, or per-position types. They copy the array container, not its nested
 * objects.
 *
 * This lesson uses the native runtime methods. The repository's ESNext lib and
 * modern Node runtime therefore agree on both the type and runtime surfaces.
 *
 * Platform ownership: ES2023 array APIs, represented by TypeScript's standard
 * library declarations.
 *
 * Official sources:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#copying-array-methods
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with
 */

export function reverseCopy<Element>(
  values: readonly Element[],
): Element[] {
  return values.toReversed();
}

export function sortCopy<Element>(
  values: readonly Element[],
  compare: (left: Element, right: Element) => number,
): Element[] {
  return values.toSorted(compare);
}

export function spliceCopy<Element>(
  values: readonly Element[],
  start: number,
  deleteCount: number,
  ...items: Element[]
): Element[] {
  return values.toSpliced(start, deleteCount, ...items);
}

export function replaceCopy<Element>(
  values: readonly Element[],
  index: number,
  value: Element,
): Element[] {
  return values.with(index, value);
}

export type CopyingMethod =
  | "toReversed"
  | "toSorted"
  | "toSpliced"
  | "with";

export type CopyResult<ArrayType extends readonly unknown[]> =
  ArrayType[number][];

// Part 1: every copying operation returns a fresh mutable array.
type _01 = Expect<Equal<ReturnType<typeof reverseCopy<number>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<typeof sortCopy<string>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof spliceCopy<boolean>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof replaceCopy<Date>>, TODO>>; // TODO(koan) @koan-error

// Part 2: readonly sources are accepted without becoming mutable themselves.
type _05 = Expect<Equal<Parameters<typeof reverseCopy<number>>[0], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Parameters<typeof sortCopy<number>>[0], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof spliceCopy<number>>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<typeof replaceCopy<number>>[0], TODO>>; // TODO(koan) @koan-error

// Part 3: operation-specific arguments keep their normal contracts.
type _09 = Expect<Equal<Parameters<typeof sortCopy<number>>[1], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<typeof spliceCopy<string>>[1], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<typeof spliceCopy<string>>[3], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<typeof replaceCopy<string>>[2], TODO>>; // TODO(koan) @koan-error

// Part 4: tuple positions collapse to their element union.
type _13 = Expect<Equal<CopyResult<readonly [1, "two", true]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CopyResult<readonly []>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CopyResult<readonly ["a", "b"]>[number], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<CopyResult<readonly [id: string, count: number]>, TODO>>; // TODO(koan) @koan-error

// Part 5: the built-in method names and signatures are ordinary type members.
type _17 = Expect<Equal<CopyingMethod, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<"toSorted" extends keyof readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<ReadonlyArray<number>["toReversed"]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<Array<string>["with"]>, TODO>>; // TODO(koan) @koan-error
