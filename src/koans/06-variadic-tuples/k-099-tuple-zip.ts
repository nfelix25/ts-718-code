import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-099: tuple zip
 * =============================================================================
 *
 * Zip consumes two tuples in lockstep. When both inputs have heads, it emits a
 * pair and recurses on both tails. When either input is empty, it stops. The
 * runtime and type-level contract therefore use the shorter input's length.
 *
 * I read the recursive branch aloud as "pair LeftHead with RightHead, then put
 * Zip<LeftTail, RightTail> after that pair." A broad array does not guarantee a
 * head, so a finite-only recursion would misleadingly return `[]`; the public
 * type detects open length and falls back to `Array<[L[number], R[number]]>`.
 * An exact variant rejects finite inputs whose length domains differ.
 */

type ZipFinite<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = Left extends readonly [infer LeftHead, ...infer LeftTail]
  ? Right extends readonly [infer RightHead, ...infer RightTail]
    ? [[LeftHead, RightHead], ...ZipFinite<LeftTail, RightTail>]
    : []
  : [];

export type Zip<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = number extends Left["length"] | Right["length"]
  ? Array<[Left[number], Right[number]]>
  : ZipFinite<Left, Right>;

export type ZipExact<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = [Left["length"]] extends [Right["length"]]
  ? [Right["length"]] extends [Left["length"]] ? Zip<Left, Right> : never
  : never;

export function zip<
  const Left extends readonly unknown[],
  const Right extends readonly unknown[],
>(left: Left, right: Right): Zip<Left, Right> {
  const length = Math.min(left.length, right.length);
  return Array.from({ length }, (_, index) => [left[index], right[index]]) as unknown as Zip<Left, Right>;
}

export function zipExact<
  const Left extends readonly unknown[],
  const Right extends readonly unknown[],
>(left: Left, right: Right): ZipExact<Left, Right> {
  if (left.length !== right.length) throw new Error("zipExact requires equal lengths");
  return zip(left, right) as ZipExact<Left, Right>;
}

export function zipWithIndex<const Values extends readonly unknown[]>(
  values: Values,
): Zip<Values, number[]> {
  return zip(values, values.map((_, index) => index));
}

// Part 1: equal finite tuples pair every corresponding position.
type _Main01 = Expect<Equal<Zip<[], []>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Zip<[1], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Zip<[1, 2], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Zip<readonly [1, 2], readonly ["a", "b"]>, TODO>>; // TODO(koan) @koan-error

// Part 2: recursion stops as soon as either finite tuple is exhausted.
type _Main05 = Expect<Equal<Zip<[1], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<Zip<[1, 2], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Zip<[], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Zip<[1], []>, TODO>>; // TODO(koan) @koan-error

// Part 3: broad arrays receive an honest array-of-pairs fallback.
type _Main09 = Expect<Equal<Zip<number[], string[]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Zip<[1, 2], string[]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Zip<number[], readonly ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Zip<readonly boolean[], readonly number[]>, TODO>>; // TODO(koan) @koan-error

// Part 4: exact zip filters finite length mismatches.
type _Main13 = Expect<Equal<ZipExact<[1, 2], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ZipExact<[1], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ZipExact<[], []>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ZipExact<number[], string[]>, TODO>>; // TODO(koan) @koan-error

// Part 5: union inputs distribute and runtime helpers retain the same policy.
type _Main17 = Expect<Equal<Zip<[1] | [2, 3], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Zip<[1, 2], ["a"] | ["b", "c"]>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof zip<readonly [1, 2], readonly ["a", "b"]>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof zipExact<readonly [1, 2], readonly ["a", "b"]>>, TODO>>; // TODO(koan) @koan-error
