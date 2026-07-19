import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-101 edge cases: function argument tuples
 * =============================================================================
 * Function extraction is lossy for generic and overloaded signatures, `this`
 * is not an ordinary argument tuple position, and optional endpoints cannot be
 * removed by patterns that require a present value.
 */

type EF = (...args: any[]) => unknown;
type EPre<F extends EF, V> = (...args: [V, ...Parameters<F>]) => ReturnType<F>;
type EDropFirst<F extends EF> = F extends (first: any, ...rest: infer R) => infer O ? (...args: R) => O : never;
type EDropLast<F extends EF> = Parameters<F> extends [...infer I, unknown] ? (...args: I) => ReturnType<F> : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Optional positions are not guaranteed endpoints for decomposition.
type _E01 = Expect<Equal<EDropFirst<(x?: string) => number>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EDropLast<(x?: string) => number>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EDropLast<(x: string, y?: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<Parameters<EDropFirst<(x: string, y?: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EDropLast<(...x: number[]) => boolean>, TODO>>; // TODO(koan) @koan-error

// A declared this parameter is tracked separately from Parameters.
type WithThis = (this: Date, value: number, format?: string) => string;
type _E06 = Expect<Equal<Parameters<WithThis>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ThisParameterType<WithThis>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<OmitThisParameter<WithThis>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<Parameters<OmitThisParameter<WithThis>>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<Parameters<EPre<WithThis, string>>, TODO>>; // TODO(koan) @koan-error

// Generic signatures widen when captured by Parameters and ReturnType.
type Generic = <T>(value: T) => T;
type GenericPair = <A, B>(a: A, b: B) => [A, B];
type _E11 = Expect<Equal<Parameters<Generic>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ReturnType<Generic>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Parameters<GenericPair>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ReturnType<GenericPair>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<Parameters<EPre<Generic, Date>>, TODO>>; // TODO(koan) @koan-error

// Overload extraction observes the last declared call signature.
interface Overloaded {
  (value: string): number;
  (value: number, radix: number): string;
}
type _E16 = Expect<Equal<Parameters<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ReturnType<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<Parameters<EPre<Overloaded, Date>>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<Parameters<EDropFirst<Overloaded>>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<Parameters<EDropLast<Overloaded>>, TODO>>; // TODO(koan) @koan-error

// Union call signatures distribute through Parameters and conditional transforms.
type UnionFn = ((x: string) => 1) | ((x: number, y: boolean) => 2);
type _E21 = Expect<Equal<Parameters<UnionFn>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<ReturnType<UnionFn>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<Parameters<EDropFirst<UnionFn>>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EDropLast<UnionFn>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<Parameters<EPre<UnionFn, Date>>, TODO>>; // TODO(koan) @koan-error

// Special function types need classification around utility boundaries.
type _E26 = Expect<Equal<Parameters<never>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsAny<Parameters<any>[number]>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EDropFirst<never>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EDropLast<never>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EIsAny<ReturnType<any>>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: Parameters excludes an explicit this parameter.
type _DemoThis = Expect<Equal<Parameters<(this: Date, x: number) => void>, [x: number]>>;

// Pre-solved: generic identity extraction loses the per-call type parameter.
type _DemoGeneric = Expect<Equal<Parameters<<T>(x: T) => T>, [x: unknown]>>;

// Pre-solved: optional final parameters do not match a required-last pattern.
type _DemoOptionalLast = Expect<Equal<EDropLast<(x: string, y?: number) => void>, never>>;

declare function requiredPair(a: string, b: number): void;
// @ts-expect-error A parameter tuple still enforces the original second argument.
const invalidArgs: Parameters<typeof requiredPair> = ["x"];
