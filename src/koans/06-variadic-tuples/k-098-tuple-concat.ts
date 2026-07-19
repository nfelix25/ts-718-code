import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-098: tuple concat
 * =============================================================================
 *
 * Concatenation packages tuple spreading into a reusable type operation.
 * `Concat<A, B>` preserves the order and finite positions of both operands, and
 * inherits spread normalization for optional or open shapes. The empty tuple is
 * an identity and grouping does not change a finite result: concatenation is
 * associative at the type level as well as at runtime.
 *
 * Mutability is an API policy, not something spreads infer for us. A fresh
 * `[...A, ...B]` is mutable; `readonly [...A, ...B]` promises a readonly view;
 * a conditional policy can follow the left operand. Recursive `ConcatMany`
 * consumes finite chunks, while broad chunk arrays require an array fallback.
 */

export type Concat<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = [...Left, ...Right];

export type ReadonlyConcat<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = readonly [...Left, ...Right];

export type ConcatLikeLeft<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = Left extends unknown[] ? [...Left, ...Right] : readonly [...Left, ...Right];

export type ConcatMany<Chunks extends readonly (readonly unknown[])[]> =
  number extends Chunks["length"]
    ? Chunks[number][number][]
    : Chunks extends readonly [
      infer Head extends readonly unknown[],
      ...infer Tail extends readonly (readonly unknown[])[],
    ]
      ? [...Head, ...ConcatMany<Tail>]
      : [];

export function concat<
  const Left extends readonly unknown[],
  const Right extends readonly unknown[],
>(left: Left, right: Right): Concat<Left, Right> {
  return [...left, ...right] as Concat<Left, Right>;
}

export function concatMany<
  const Chunks extends readonly (readonly unknown[])[],
>(...chunks: Chunks): ConcatMany<Chunks> {
  return chunks.flat() as ConcatMany<Chunks>;
}

export function concatReadonly<
  const Left extends readonly unknown[],
  const Right extends readonly unknown[],
>(left: Left, right: Right): ReadonlyConcat<Left, Right> {
  return [...left, ...right];
}

// Part 1: empty identity and finite concatenation preserve exact positions.
type _Main01 = Expect<Equal<Concat<[], []>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Concat<[], [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Concat<[1, 2], []>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Concat<[1, 2], ["a", true]>, TODO>>; // TODO(koan) @koan-error

// Part 2: grouping is irrelevant for finite concatenation.
type LeftGrouped = Concat<Concat<[1], [2]>, [3]>;
type RightGrouped = Concat<[1], Concat<[2], [3]>>;
type _Main05 = Expect<Equal<LeftGrouped, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<RightGrouped, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Equal<LeftGrouped, RightGrouped>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<LeftGrouped["length"], TODO>>; // TODO(koan) @koan-error

// Part 3: output readonly behavior follows the selected policy.
type _Main09 = Expect<Equal<Concat<readonly [1], readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ReadonlyConcat<[1], [2]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ConcatLikeLeft<[1], readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ConcatLikeLeft<readonly [1], [2]>, TODO>>; // TODO(koan) @koan-error

// Part 4: open and optional operands retain spread normalization.
type _Main13 = Expect<Equal<Concat<[head: string], number[]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Concat<string[], [tail: number]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Concat<string[], number[]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Concat<[value?: string], [count: number]>, TODO>>; // TODO(koan) @koan-error

// Part 5: recursive concatenation scales the same algebra to many chunks.
type _Main17 = Expect<Equal<ConcatMany<[]>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ConcatMany<[[1], [2, 3], [], [4]]>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof concatMany<readonly [readonly [1], readonly ["a", true]]>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ConcatMany<string[][]>, TODO>>; // TODO(koan) @koan-error
