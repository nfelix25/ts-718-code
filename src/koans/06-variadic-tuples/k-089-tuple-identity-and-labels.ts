import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-089: tuple identity and labels
 * =============================================================================
 *
 * An array says which values may appear. A tuple says which value belongs at
 * each position and, for a finite tuple, how many positions exist. That extra
 * shape information is why indexing `[string, number]` at `0` produces
 * `string`, while indexing it with `number` produces `string | number`.
 *
 * Tuple labels such as `[key: string, value: number]` make signatures readable,
 * but they are not property names and do not create nominal identity. I read
 * `[x: number, y: number]` aloud as "a two-position tuple whose first position
 * is called x for humans and whose second is called y." At the type-system
 * level it remains mutually assignable with `[number, number]`.
 *
 * A useful structural tuple test asks whether `number` extends the `length`
 * property. Arrays have `length: number`; finite tuples have literal lengths.
 */

export type IsFiniteTuple<Value extends readonly unknown[]> =
  number extends Value["length"] ? false : true;

export type TupleIndexKeys<Value extends readonly unknown[]> =
  Exclude<keyof Value, keyof readonly unknown[]>;

export type Point = [x: number, y: number];
export type Entry<Value> = [key: string, value: Value];

export function makePoint<const X extends number, const Y extends number>(x: X, y: Y): [x: X, y: Y] {
  return [x, y];
}

export function formatEntry([key, value]: Entry<unknown>): string {
  return `${key}=${String(value)}`;
}

export function swapPair<A, B>(pair: readonly [first: A, second: B]): [first: B, second: A] {
  return [pair[1], pair[0]];
}

export function mapPoint(point: Point, transform: (coordinate: number) => number): Point {
  return [transform(point[0]), transform(point[1])];
}

// Part 1: literal positions preserve their individual element types.
type MainPair = [name: string, score: number];
type _Main01 = Expect<Equal<MainPair[0], TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainPair[1], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainPair[number], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<MainPair["length"], TODO>>; // TODO(koan) @koan-error

// Part 2: finite length distinguishes tuple shapes from ordinary arrays.
type _Main05 = Expect<Equal<IsFiniteTuple<[]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<IsFiniteTuple<[string]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<IsFiniteTuple<string[]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<IsFiniteTuple<readonly number[]>, TODO>>; // TODO(koan) @koan-error

// Part 3: labels communicate intent but do not affect structural equality.
type _Main09 = Expect<Equal<Equal<[x: number, y: number], [number, number]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Equal<[left: string], [right: string]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Point[0], TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<keyof Point extends keyof [number, number] ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 4: tuple-specific keys are positional string keys, not labels.
type _Main13 = Expect<Equal<TupleIndexKeys<[]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<TupleIndexKeys<[string]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<TupleIndexKeys<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<TupleIndexKeys<Point>, TODO>>; // TODO(koan) @koan-error

// Part 5: parameter tuples and inferred return tuples retain positional shape.
type MainParameters = Parameters<(path: string, retries: number) => void>;
type _Main17 = Expect<Equal<MainParameters, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainParameters["length"], TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof makePoint<3, 4>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof swapPair<string, number>>, TODO>>; // TODO(koan) @koan-error
