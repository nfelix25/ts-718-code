import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-072 guided drills: accumulator recursion and performance
 * =============================================================================
 * Track the accumulator after each recursive call. Stop at the literal budget,
 * or at the exhausted input, and return the accumulated state directly.
 */

type DBuild<N extends number, A extends unknown[] = []> = A["length"] extends N
  ? A
  : DBuild<N, [...A, unknown]>;
type DReverse<T extends readonly unknown[], A extends unknown[] = []> =
  T extends readonly [infer H, ...infer R] ? DReverse<R, [H, ...A]> : A;
type DTake<T extends readonly unknown[], N extends number, A extends unknown[] = []> =
  A["length"] extends N
    ? A
    : T extends readonly [infer H, ...infer R]
      ? DTake<R, N, [...A, H]>
      : A;
type DDrop<T extends readonly unknown[], N extends number, Seen extends unknown[] = []> =
  Seen["length"] extends N
    ? T
    : T extends readonly [unknown, ...infer R]
      ? DDrop<R, N, [...Seen, unknown]>
      : [];
type DLength<S extends string, A extends unknown[] = []> =
  S extends `${infer _H}${infer R}` ? DLength<R, [...A, unknown]> : A["length"];
type DAwait<T, N extends number, Seen extends unknown[] = []> = Seen["length"] extends N
  ? T
  : T extends PromiseLike<infer V>
    ? DAwait<V, N, [...Seen, unknown]>
    : T;

// Building tuple numerals makes accumulator growth visible.
type _D01 = Expect<Equal<DBuild<0>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DBuild<1>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DBuild<2>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DBuild<3>["length"], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DBuild<5>[number], TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DBuild<10>["length"], TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DBuild<20>["length"], TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DBuild<32>["length"], TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DBuild<50>["length"], TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<[...DBuild<2>, ...DBuild<3>]["length"], TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DBuild<4> extends unknown[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<keyof DBuild<0>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DBuild<number>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DBuild<0 | 2>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DBuild<1 | 3>, TODO>>; // TODO(koan) @koan-error

// Reverse places each consumed head before the accumulated result.
type _D16 = Expect<Equal<DReverse<[]>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DReverse<[1]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DReverse<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DReverse<[1, 2, 3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DReverse<readonly ["a", true, 3]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DReverse<[[1], [2]]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DReverse<[never, unknown]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DReverse<[1 | 2, 3 | 4]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DReverse<[1, 2] | [3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DReverse<string[]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DReverse<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DReverse<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DReverse<[first?: string]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DReverse<never>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DReverse<readonly []>, TODO>>; // TODO(koan) @koan-error

// Take and drop share a counter but return opposite portions.
type _D31 = Expect<Equal<DTake<[1, 2, 3], 0>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DTake<[1, 2, 3], 1>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DTake<[1, 2, 3], 2>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DTake<[1, 2, 3], 3>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DTake<[1, 2, 3], 5>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DTake<[], 2>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DTake<readonly ["a", "b"], 1>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DDrop<[1, 2, 3], 0>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DDrop<[1, 2, 3], 1>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DDrop<[1, 2, 3], 2>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DDrop<[1, 2, 3], 3>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DDrop<[1, 2, 3], 5>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DDrop<[], 1>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DDrop<readonly ["a", "b"], 1>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<[...DTake<[1, 2, 3], 2>, ...DDrop<[1, 2, 3], 2>], TODO>>; // TODO(koan) @koan-error

// String counts and bounded awaiting expose the accumulator as a budget.
type _D46 = Expect<Equal<DLength<"">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DLength<"a">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DLength<"abc">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DLength<"type-level">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DLength<string>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DAwait<Promise<Promise<1>>, 0>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DAwait<Promise<Promise<1>>, 1>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DAwait<Promise<Promise<1>>, 2>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DAwait<Promise<Promise<1>>, 3>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DAwait<Promise<1> | 2, 1>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DAwait<Promise<1 | Promise<2>>, 1>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DAwait<unknown, 5>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DAwait<never, 5>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DAwait<Promise<string>, number>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DAwait<Promise<string>, 0 | 2>, TODO>>; // TODO(koan) @koan-error
