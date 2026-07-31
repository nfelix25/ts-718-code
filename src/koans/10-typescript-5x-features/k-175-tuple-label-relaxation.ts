import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 175 - TUPLE LABEL RELAXATION AND PRESERVATION
 * ===================================================
 *
 * Tuple labels document positions in hovers, signatures, and completions. They
 * do not become property keys and do not affect assignability. Before TypeScript
 * 5.2, a tuple had to label every element or none of them. That restriction also
 * forced the checker to discard labels when labeled and unlabeled tuples were
 * spread together.
 *
 * TypeScript 5.2 permits `[first: T, T]`, unlabeled rest elements after labeled
 * heads, and mixed spreads while retaining the labels that exist. Optional
 * labeled syntax puts `?` on the label (`label?: T`); unlabeled syntax puts it on
 * the type (`T?`).
 *
 * Read a label aloud as "documentation for this index", not "a named field".
 * Consequently `Equal<[x: number], [number]>` is true: our assertion toolkit can
 * verify structure and preservation-producing transformations, but not the
 * editor-only spelling of a label.
 *
 * Feature ownership: TypeScript 5.2 tuple syntax and type-display preservation.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#named-and-anonymous-tuple-elements
 */

export type MixedPair<Value> = [first: Value, Value];
export type MixedOptional = [id: string, boolean?];
export type MixedRest<Value> = [first: Value, second: Value, ...Value[]];
export type LabeledRest<Value> =
  [first: Value, second: Value, ...rest: Value[]];

export type SpreadTogether<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = [...Left, ...Right];

export type PrependLabeled<
  Head,
  Tail extends readonly unknown[],
> = [head: Head, ...Tail];

export type AppendLabeled<
  Prefix extends readonly unknown[],
  Last,
> = [...Prefix, last: Last];

export type LabeledCoordinates = [x: number, y: number];
export type UnlabeledFlag = [boolean];
export type MergedCoordinates =
  SpreadTogether<UnlabeledFlag, LabeledCoordinates>;

export function describePoint(
  ...point: [x: number, number, label?: string]
): string {
  const [x, y, label = "point"] = point;
  return `${label}(${x},${y})`;
}

export function collectValues<Value>(
  ...values: [first: Value, Value, ...Value[]]
): Value[] {
  return [...values];
}

export function prependRuntime<Head, Tail extends readonly unknown[]>(
  head: Head,
  tail: Tail,
): [head: Head, ...Tail] {
  return [head, ...tail];
}

export function appendRuntime<Prefix extends readonly unknown[], Last>(
  prefix: Prefix,
  last: Last,
): [...Prefix, last: Last] {
  return [...prefix, last];
}

// Part 1: Mixed labels retain ordinary tuple indexing and length.
type _01 = Expect<Equal<MixedPair<string>[0], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<MixedPair<string>[1], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<MixedPair<string>["length"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<MixedPair<string>[number], TODO>>; // TODO(koan) @koan-error

// Part 2: Optional and rest elements follow their normal structural rules.
type _05 = Expect<Equal<MixedOptional[0], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<MixedOptional[1], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<MixedOptional["length"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<MixedRest<number>[number], TODO>>; // TODO(koan) @koan-error

// Part 3: Spreads can combine labeled and unlabeled sources.
type _09 = Expect<Equal<MergedCoordinates, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<MergedCoordinates[0], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<MergedCoordinates[1], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<MergedCoordinates[2], TODO>>; // TODO(koan) @koan-error

// Part 4: Generic prepend and append retain tuple shape.
type _13 = Expect<Equal<PrependLabeled<0, LabeledCoordinates>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<AppendLabeled<LabeledCoordinates, string>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof prependRuntime<0, LabeledCoordinates>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof appendRuntime<LabeledCoordinates, "end">>, TODO>>; // TODO(koan) @koan-error

// Part 5: Function parameter tuples expose structure, not label identity.
type _17 = Expect<Equal<Parameters<typeof describePoint>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof describePoint>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof collectValues<number>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Equal<[x: number], [number]>, TODO>>; // TODO(koan) @koan-error
