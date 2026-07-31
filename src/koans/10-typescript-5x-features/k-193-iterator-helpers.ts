import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 193 - ITERATOR HELPERS
 * ===========================
 *
 * An iterable can produce an iterator, and an iterator can produce one result
 * at a time. Those protocols are deliberately tiny. They do not promise array
 * conveniences such as `map` or `filter`.
 *
 * The ECMAScript Iterator Helpers proposal adds a runtime `Iterator` object and
 * lazy helper methods to native iterator objects. TypeScript 5.6 modeled those
 * values with `IteratorObject<T, TReturn, TNext>`. Read that type aloud as "an
 * iterator of T that is itself iterable and carries the native helper surface."
 *
 * Most transformations are lazy: building a chain does not pull an input.
 * Terminal operations such as `toArray`, `reduce`, `find`, `some`, and `every`
 * consume it. `Iterator.from` adapts an existing iterable or iterator into the
 * helper-bearing runtime shape.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html#iterator-helper-methods
 */

export function lazyNumberLabels(
  values: Iterable<number>,
): IteratorObject<string, undefined, unknown> {
  return Iterator.from(values)
    .filter((value) => value % 2 === 0)
    .map((value, index) => `${index}:${value}`)
    .take(3);
}

export function collectNumberLabels(values: Iterable<number>): string[] {
  return lazyNumberLabels(values).toArray();
}

export function sumNumbers(values: Iterable<number>): number {
  return Iterator.from(values).reduce((total, value) => total + value, 0);
}

export function firstLongWord(
  values: Iterable<string>,
  minimum: number,
): string | undefined {
  return Iterator.from(values).find((value) => value.length >= minimum);
}

export function duplicateWords(values: Iterable<string>): string[] {
  return Iterator.from(values)
    .flatMap((value) => [value, value.toUpperCase()])
    .toArray();
}

export function mapEntries<K, V>(
  map: Map<K, V>,
): Array<readonly [V, K]> {
  return map.entries().map(([key, value]) => [value, key] as const).toArray();
}

// Part 1: separate the protocol from the native helper-bearing object.
type _01 = Expect<Equal<Iterator<number>["next"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IteratorObject<number>["next"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IteratorObject<number>[typeof Symbol.iterator], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof Pick<IteratorObject<number>, "map" | "filter" | "take">, TODO>>; // TODO(koan) @koan-error

// Part 2: lazy transformations preserve or change the element type.
type _05 = Expect<Equal<ReturnType<typeof lazyNumberLabels>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<ReturnType<typeof lazyNumberLabels>["next"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<typeof collectNumberLabels>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<typeof collectNumberLabels>, TODO>>; // TODO(koan) @koan-error

// Part 3: terminal operations produce ordinary values.
type _09 = Expect<Equal<ReturnType<typeof sumNumbers>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<typeof sumNumbers>[0], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof firstLongWord>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<typeof firstLongWord>, TODO>>; // TODO(koan) @koan-error

// Part 4: one input can expand into many lazy outputs.
type _13 = Expect<Equal<ReturnType<typeof duplicateWords>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<typeof duplicateWords>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<IteratorObject<string>["toArray"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<IteratorObject<string>["some"]>, TODO>>; // TODO(koan) @koan-error

// Part 5: built-in collection iterators carry helpers too.
type StringNumberEntries = ReturnType<Map<string, number>["entries"]>;
type _17 = Expect<Equal<StringNumberEntries, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<StringNumberEntries["toArray"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof mapEntries<string, number>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof mapEntries<string, number>>, TODO>>; // TODO(koan) @koan-error
