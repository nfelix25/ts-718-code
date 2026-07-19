import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-090: readonly tuples
 * =============================================================================
 *
 * `readonly [A, B]` removes write capabilities while retaining position types
 * and finite length. It is still an ordinary array at runtime. The type means
 * "callers may observe A at position zero and B at position one, but this view
 * does not promise mutation methods or writable indices."
 *
 * Capability explains assignability: a mutable pair can be used where only
 * reads are allowed, but a readonly pair cannot be passed somewhere that may
 * write. Generic tuple utilities should therefore constrain inputs with
 * `readonly unknown[]` unless mutation is essential. A mapped `-readonly`
 * transform or a tuple spread can deliberately produce a mutable copy type.
 */

export type MutableTuple<Value extends readonly unknown[]> = {
  -readonly [Key in keyof Value]: Value[Key];
};

export type ReadonlyTuple<Value extends readonly unknown[]> = {
  readonly [Key in keyof Value]: Value[Key];
};

export function distanceFromOrigin(point: readonly [x: number, y: number]): number {
  return Math.hypot(point[0], point[1]);
}

export function readonlyPair<const A, const B>(first: A, second: B): readonly [first: A, second: B] {
  return [first, second];
}

export function mutableCopy<A, B>(pair: readonly [first: A, second: B]): [first: A, second: B] {
  return [...pair];
}

export function replaceFirst<A, B>(pair: readonly [A, B], first: A): [A, B] {
  return [first, pair[1]];
}

const mainLiteral = ["ready", 200] as const;

// Part 1: readonly retains position, element-union, and length information.
type _Main01 = Expect<Equal<typeof mainLiteral[0], TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainLiteral[1], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainLiteral[number], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainLiteral["length"], TODO>>; // TODO(koan) @koan-error

// Part 2: assignability follows the write capabilities each side promises.
type _Main05 = Expect<Equal<[1, 2] extends readonly [number, number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<readonly [1, 2] extends [number, number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<readonly [1, 2] extends readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Equal<[1, 2], readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error

// Part 3: mapped modifiers explicitly add and remove the capability.
type _Main09 = Expect<Equal<MutableTuple<readonly [1, "a"]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ReadonlyTuple<[1, "a"]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MutableTuple<[1, "a"]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ReadonlyTuple<readonly [1, "a"]>, TODO>>; // TODO(koan) @koan-error

// Part 4: a readonly constraint accepts both views without erasing shape.
type MainIdentity<T extends readonly unknown[]> = T;
type _Main13 = Expect<Equal<MainIdentity<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<MainIdentity<readonly [string, number]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<MainIdentity<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<MainIdentity<typeof mainLiteral>, TODO>>; // TODO(koan) @koan-error

// Part 5: runtime helpers expose readonly views or fresh mutable copies.
type _Main17 = Expect<Equal<ReturnType<typeof readonlyPair<"x", 1>>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof mutableCopy<"x", 1>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof replaceFirst<string, number>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Parameters<typeof distanceFromOrigin>[0], TODO>>; // TODO(koan) @koan-error
