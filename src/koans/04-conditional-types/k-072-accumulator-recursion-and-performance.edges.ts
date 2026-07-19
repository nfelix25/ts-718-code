import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-072 edge cases: accumulator recursion and performance
 * =============================================================================
 * Accumulators improve shape and often compiler behavior, but literal-oriented
 * recursion still has boundaries. These cases stress broad and union budgets,
 * finite tuples versus arrays, explicit depth fallbacks, distribution, and
 * moderate compile-time workloads that remain suitable for an interactive repo.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EBuild<N extends number, A extends unknown[] = []> = A["length"] extends N
  ? A
  : EBuild<N, [...A, unknown]>;
type EReverse<T extends readonly unknown[], A extends unknown[] = []> =
  T extends readonly [infer H, ...infer R] ? EReverse<R, [H, ...A]> : A;
type ELength<S extends string, A extends unknown[] = []> =
  S extends `${infer _H}${infer R}` ? ELength<R, [...A, unknown]> : A["length"];
type EAwait<T, N extends number, Seen extends unknown[] = []> = Seen["length"] extends N
  ? T
  : T extends PromiseLike<infer V>
    ? EAwait<V, N, [...Seen, unknown]>
    : T;

// Broad and union counters compare against the current accumulator as a whole.
type _E01 = Expect<Equal<EBuild<number>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EBuild<0 | 2>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EBuild<1 | 3>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EBuild<2 | 4>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EBuild<10>["length"], TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EBuild<50>["length"], TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EBuild<100>["length"], TODO>>; // TODO(koan) @koan-error

// Tuple decomposition does not consume broad arrays or optional-only tuples the same way.
type _E08 = Expect<Equal<EReverse<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EReverse<readonly [1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EReverse<string[]>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EReverse<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EReverse<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EReverse<[only?: string]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EReverse<[1, 2] | [3, 4]>, TODO>>; // TODO(koan) @koan-error

// Literal strings reveal finite progress; broad string patterns do not.
type _E15 = Expect<Equal<ELength<"">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<ELength<"abc">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ELength<string>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ELength<`${number}`>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<ELength<"a" | "bc">, TODO>>; // TODO(koan) @koan-error

// A depth budget returns the still-wrapped remainder when it is exhausted.
type DeepPromise = PromiseLike<PromiseLike<PromiseLike<PromiseLike<"done">>>>;
type _E20 = Expect<Equal<EAwait<DeepPromise, 0>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EAwait<DeepPromise, 1>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EAwait<DeepPromise, 2>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EAwait<DeepPromise, 3>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EAwait<DeepPromise, 4>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EAwait<DeepPromise, 10>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EAwait<DeepPromise, number>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EAwait<DeepPromise, 1 | 3>, TODO>>; // TODO(koan) @koan-error

// Special input types keep their ordinary conditional behavior under a budget.
type _E28 = Expect<Equal<EAwait<unknown, 3>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EAwait<never, 3>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EIsAny<EAwait<any, 0>>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: accumulator state directly records a moderate stress length.
type _DemoModerateBuild = Expect<Equal<EBuild<100>["length"], 100>>;

// Pre-solved: broad number makes the initial zero-length accumulator satisfy the stop check.
type _DemoBroadBudget = Expect<Equal<EBuild<number>, []>>;

// Pre-solved: a depth budget exposes the unprocessed promise remainder.
type _DemoBounded = Expect<Equal<EAwait<DeepPromise, 2>, PromiseLike<PromiseLike<"done">>>>;

// Tuple naturals do not represent negative lengths.
// @ts-expect-error A negative literal cannot satisfy a tuple length during finite recursion.
type InvalidNegativeBuild = EBuild<-1>;
