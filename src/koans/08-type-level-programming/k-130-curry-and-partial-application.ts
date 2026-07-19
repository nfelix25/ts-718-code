import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 130 - CURRY AND PARTIAL APPLICATION
 * ========================================
 *
 * Currying consumes a guaranteed parameter tuple one head at a time, producing
 * nested unary functions until no parameters remain. Partial application consumes
 * a supplied prefix and returns one function for the remaining suffix.
 *
 * Read `CurryArgs<[H, ...T], R>` aloud as: "accept one H, then curry T toward R."
 * Optional and open-rest tuples are not guaranteed nonempty, so the recursion
 * falls back to one function accepting that unresolved tail. For partial binding,
 * each bound value must be assignable to the corresponding original parameter.
 */

export type CurryArgs<Args extends readonly unknown[], Result> =
  Args extends readonly []
    ? Result
    : Args extends readonly [infer Head, ...infer Tail]
      ? (arg: Head) => CurryArgs<Tail, Result>
      : (...args: Args) => Result;

export type CurryFunction<F extends (...args: any[]) => any> = CurryArgs<Parameters<F>, ReturnType<F>>;

export type RemainingArgs<
  All extends readonly unknown[],
  Bound extends readonly unknown[],
> = Bound extends readonly []
  ? All
  : All extends readonly [infer Expected, ...infer RestAll]
    ? Bound extends readonly [infer Actual, ...infer RestBound]
      ? Actual extends Expected
        ? RemainingArgs<RestAll, RestBound>
        : never
      : All
    : never;

export type PartiallyApply<
  F extends (...args: any[]) => any,
  Bound extends readonly unknown[],
> = RemainingArgs<Parameters<F>, Bound> extends infer Rest
  ? [Rest] extends [never]
    ? never
    : Rest extends readonly unknown[]
      ? (...args: Rest) => ReturnType<F>
      : never
  : never;

type Format = (name: string, count: number, active: boolean) => string;

// Part 1: Curry fixed required tuples one position at a time.
type _01 = Expect<Equal<CurryFunction<() => number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<CurryFunction<(value: string) => number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<CurryFunction<(name: string, count: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<CurryFunction<Format>, TODO>>; // TODO(koan) @koan-error

// Part 2: Optional and rest tails stay callable as a group.
type _05 = Expect<Equal<CurryFunction<(value?: string) => number>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<CurryFunction<(name: string, count?: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<CurryFunction<(...values: number[]) => number>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<CurryFunction<(head: string, ...tail: number[]) => boolean>, TODO>>; // TODO(koan) @koan-error

// Part 3: Partial application removes a valid prefix.
type _09 = Expect<Equal<PartiallyApply<Format, []>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<PartiallyApply<Format, [string]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<PartiallyApply<Format, [string, number]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<PartiallyApply<Format, [string, number, boolean]>, TODO>>; // TODO(koan) @koan-error

// Part 4: Narrow values may bind broad parameters; incompatible prefixes fail.
type _13 = Expect<Equal<RemainingArgs<[string, number], ["Ada"]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<RemainingArgs<["Ada", number], [string]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<PartiallyApply<Format, [number]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<PartiallyApply<Format, [string, number, boolean, Date]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Generic and overloaded functions inherit reflection limits.
interface Overloaded {
  (value: string): 1;
  (value: number): 2;
}
type IsAny<T> = 0 extends 1 & T ? true : false;
type _17 = Expect<Equal<CurryFunction<<T>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<CurryFunction<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsAny<CurryFunction<any>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<CurryFunction<never>, TODO>>; // TODO(koan) @koan-error

export function curryN<F extends (...args: any[]) => any>(
  fn: F,
  arity = fn.length,
): CurryFunction<F> {
  const collect = (received: unknown[]): unknown =>
    received.length >= arity
      ? fn(...received)
      : (next: unknown) => collect([...received, next]);
  return (arity === 0 ? fn() : collect([])) as CurryFunction<F>;
}

export function partial<F extends (...args: any[]) => any, const Bound extends readonly unknown[]>(
  fn: F,
  ...bound: Bound
): PartiallyApply<F, Bound> {
  return ((...rest: unknown[]) => fn(...bound, ...rest)) as PartiallyApply<F, Bound>;
}
