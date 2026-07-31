import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 182 - BOOLEAN COMPARISON NARROWING
 * ========================================
 *
 * A type predicate is a boolean result with extra control-flow meaning. Since
 * TypeScript 5.3, comparing that result directly with `true` or `false` keeps
 * the meaning instead of collapsing it to an unrelated boolean.
 *
 * Read `isText(entry) === true` aloud as "the predicate succeeded, therefore
 * entry is TextEntry." Read `isText(entry) === false` as "the predicate failed,
 * therefore exclude TextEntry." The reversed and `!==` forms carry the same
 * logical information.
 *
 * This improvement does not turn every boolean-returning function into a type
 * guard. The declared `value is T` relationship is what lets the checker connect
 * the comparison result back to the tested value.
 *
 * Feature ownership: TypeScript 5.3.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html#narrowing-on-comparisons-to-booleans
 */

export interface TextEntry {
  kind: "text";
  text: string;
}

export interface CountEntry {
  kind: "count";
  count: number;
}

export type Entry = TextEntry | CountEntry;

export function isTextEntry(entry: Entry): entry is TextEntry {
  return entry.kind === "text";
}

export function looksLikeText(entry: Entry): boolean {
  return entry.kind === "text";
}

export function describeCompared(entry: Entry): string {
  if (isTextEntry(entry) === true) {
    type _01 = Expect<Equal<typeof entry, TODO>>; // TODO(koan) @koan-error
    type _02 = Expect<Equal<typeof entry.text, TODO>>; // TODO(koan) @koan-error
    type _03 = Expect<Equal<Extract<Entry, TextEntry>, TODO>>; // TODO(koan) @koan-error
    type _04 = Expect<Equal<typeof isTextEntry, TODO>>; // TODO(koan) @koan-error
    return `text:${entry.text}`;
  }

  type _05 = Expect<Equal<typeof entry, TODO>>; // TODO(koan) @koan-error
  type _06 = Expect<Equal<typeof entry.count, TODO>>; // TODO(koan) @koan-error
  type _07 = Expect<Equal<Exclude<Entry, TextEntry>, TODO>>; // TODO(koan) @koan-error
  type _08 = Expect<Equal<typeof entry.kind, TODO>>; // TODO(koan) @koan-error
  return `count:${entry.count}`;
}

export function describeNegative(entry: Entry): string {
  if (isTextEntry(entry) === false) {
    type _09 = Expect<Equal<typeof entry, TODO>>; // TODO(koan) @koan-error
    type _10 = Expect<Equal<typeof entry.count, TODO>>; // TODO(koan) @koan-error
    type _11 = Expect<Equal<typeof entry.kind, TODO>>; // TODO(koan) @koan-error
    type _12 = Expect<Equal<Extract<Entry, CountEntry>, TODO>>; // TODO(koan) @koan-error
    return `count:${entry.count}`;
  }

  type _13 = Expect<Equal<typeof entry, TODO>>; // TODO(koan) @koan-error
  type _14 = Expect<Equal<typeof entry.text, TODO>>; // TODO(koan) @koan-error
  type _15 = Expect<Equal<typeof entry.kind, TODO>>; // TODO(koan) @koan-error
  type _16 = Expect<Equal<Exclude<Entry, CountEntry>, TODO>>; // TODO(koan) @koan-error
  return `text:${entry.text}`;
}

export function usesReversedComparison(entry: Entry): string {
  return true === isTextEntry(entry) ? entry.text : String(entry.count);
}

export function usesInequality(entry: Entry): string {
  return isTextEntry(entry) !== false ? entry.text : String(entry.count);
}

// Part 5: predicate and consumer surfaces remain inspectable.
type _17 = Expect<Equal<Parameters<typeof isTextEntry>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof isTextEntry>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof describeCompared>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof looksLikeText>, TODO>>; // TODO(koan) @koan-error
