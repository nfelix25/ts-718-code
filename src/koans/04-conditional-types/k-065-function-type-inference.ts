import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-065: function-type inference
 * =============================================================================
 *
 * A function type is a structure with several useful positions: an explicit
 * `this` receiver, a parameter tuple, and a return value. Conditional types
 * can pattern-match those positions and name them with `infer`.
 *
 * I read `F extends (...args: infer P) => infer R ? [P, R] : never` as:
 *
 *   "If F is callable, capture its complete argument list as tuple P and its
 *    result as R; otherwise produce never."
 *
 * Capturing the tuple preserves order, optional elements, rest elements, and
 * labels. Once I have P, ordinary tuple patterns can ask for its first or last
 * member. A `this` parameter is contextual metadata rather than a runtime
 * argument, so it is not included in P. Construct signatures use `new` and
 * require a separate pattern. Union inputs distribute; overload collections
 * are intersections, where inference observes the final signature instead of
 * calculating every overload.
 */

export type ParametersOf<F> = F extends (...args: infer Params) => unknown ? Params : never;
export type ResultOf<F> = F extends (...args: any[]) => infer Result ? Result : never;
export type SignatureOf<F> = F extends (...args: infer Params) => infer Result
  ? { params: Params; result: Result }
  : never;
export type FirstParameter<F> = ParametersOf<F> extends [infer First, ...unknown[]]
  ? First
  : never;
export type ConstructorParametersOf<C> = C extends abstract new (...args: infer Params) => unknown
  ? Params
  : never;

export function invoke<F extends (...args: any[]) => any>(
  fn: F,
  ...args: ParametersOf<F>
): ResultOf<F> {
  return fn(...args) as ResultOf<F>;
}

export function bindFirst<First, Rest extends unknown[], Result>(
  fn: (first: First, ...rest: Rest) => Result,
  first: First,
): (...rest: Rest) => Result {
  return (...rest) => fn(first, ...rest);
}

export function construct<C extends abstract new (...args: any[]) => any>(
  Constructor: C,
  ...args: ConstructorParametersOf<C>
): InstanceType<C> {
  return new (Constructor as unknown as new (
    ...values: ConstructorParametersOf<C>
  ) => InstanceType<C>)(...args);
}

// Part 1: infer captures the complete parameter list as a tuple.
type _Main01 = Expect<Equal<ParametersOf<() => void>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<ParametersOf<(id: number) => string>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ParametersOf<(id: number, active?: boolean) => void>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<ParametersOf<(...names: string[]) => void>, TODO>>; // TODO(koan) @koan-error

// Part 2: parameter tuples can be pattern-matched again.
type _Main05 = Expect<Equal<FirstParameter<(name: string, count: number) => void>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<FirstParameter<() => void>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<FirstParameter<(value?: Date) => void>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ParametersOf<(this: Map<string, number>, key: string) => number>, TODO>>; // TODO(koan) @koan-error

// Part 3: several infer variables describe a signature in one pass.
type _Main09 = Expect<Equal<SignatureOf<(id: number) => string>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<SignatureOf<() => Promise<boolean>>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<SignatureOf<((x: string) => number) | ((x: number) => string)>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<SignatureOf<{ label: string }>, TODO>>; // TODO(koan) @koan-error

// Part 4: construct signatures expose their own parameter tuple.
class MainAccount {
  constructor(readonly id: number, readonly label = "account") {}
}
abstract class MainShape {
  constructor(readonly color: string) {}
  abstract area(): number;
}
type _Main13 = Expect<Equal<ConstructorParametersOf<typeof MainAccount>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ConstructorParametersOf<typeof MainShape>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ConstructorParametersOf<new () => Date>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ConstructorParametersOf<() => Date>, TODO>>; // TODO(koan) @koan-error

// Part 5: distribution and overloads follow conditional-type rules.
interface MainOverload {
  (value: string): number;
  (value: number, radix?: number): string;
}
type _Main17 = Expect<Equal<ParametersOf<((x: string) => 1) | ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ResultOf<((x: string) => 1) | ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ParametersOf<MainOverload>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ResultOf<MainOverload>, TODO>>; // TODO(koan) @koan-error
