import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-065 edge cases: function-type inference
 * =============================================================================
 * Function patterns preserve tuple mechanics but do not enumerate overloads.
 * This section contrasts unions with overload intersections, isolates explicit
 * `this`, and probes generic signatures, optional/rest positions, and the
 * special types that can erase useful information.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EArgs<F> = F extends (...args: infer P) => unknown ? P : never;
type EResult<F> = F extends (...args: any[]) => infer R ? R : never;
type ESignature<F> = F extends (...args: infer P) => infer R ? [P, R] : never;
type EThis<F> = ThisParameterType<F>;
type EWithoutThis<F> = OmitThisParameter<F>;
type ECtorArgs<C> = C extends abstract new (...args: infer P) => unknown ? P : never;

// Naked conditionals distribute over unions and preserve signature correlation.
type _E01 = Expect<Equal<EArgs<((x: 1) => "a") | ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EResult<((x: 1) => "a") | ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ESignature<((x: 1) => "a") | ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EArgs<(() => 0) | ((x: 1) => 1)>, TODO>>; // TODO(koan) @koan-error

// Overload declarations and callable intersections expose the final signature.
interface EOverload {
  (value: string): number;
  (value: number, radix?: number): string;
}
type _E05 = Expect<Equal<EArgs<EOverload>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EResult<EOverload>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EArgs<((x: 1) => "a") & ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EResult<((x: 1) => "a") & ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error

// Optional and rest tuples do not always satisfy fixed first/last patterns.
type EFirst<P extends readonly unknown[]> = P extends [infer H, ...unknown[]] ? H : never;
type ELast<P extends readonly unknown[]> = P extends [...unknown[], infer L] ? L : never;
type _E09 = Expect<Equal<EFirst<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ELast<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EFirst<string[]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ELast<string[]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EFirst<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ELast<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error

// An explicit this parameter is captured separately and omitted from arguments.
type EMethod = (this: { count: number }, delta: number) => number;
type _E15 = Expect<Equal<EThis<EMethod>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EArgs<EMethod>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EWithoutThis<EMethod>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EThis<(value: string) => number>, TODO>>; // TODO(koan) @koan-error

// Generic signatures often infer broad placeholders, not one call's types.
type EIdentity = <T>(value: T) => T;
type EPair = <A, B>(left: A, right: B) => [A, B];
type _E19 = Expect<Equal<EArgs<EIdentity>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EResult<EIdentity>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EArgs<EPair>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EResult<EPair>, TODO>>; // TODO(koan) @koan-error

// Special types either stop the match, distribute over zero members, or poison it.
type _E23 = Expect<Equal<EArgs<unknown>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EArgs<never>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EIsAny<EArgs<any>>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EIsAny<EResult<any>>, TODO>>; // TODO(koan) @koan-error

// Call and construct signatures remain different structural contracts.
type EHybrid = { (x: string): number; new (x: number): Date };
type _E27 = Expect<Equal<EArgs<EHybrid>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ECtorArgs<EHybrid>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EArgs<DateConstructor>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ECtorArgs<() => Date>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a `this` parameter never occupies a runtime argument position.
type _DemoThis = Expect<Equal<EArgs<EMethod>, [delta: number]>>;

// Pre-solved: a correlated union remains a union of signature pairs.
type _DemoCorrelation = Expect<Equal<
  ESignature<((x: 1) => "a") | ((x: 2) => "b")>,
  [[x: 1], "a"] | [[x: 2], "b"]
>>;

// Pre-solved: inference from an overload set uses its last declared signature.
type _DemoOverload = Expect<Equal<EResult<EOverload>, string>>;

// Parameters must be a callable type; arbitrary structural objects are rejected.
// @ts-expect-error An object without a call signature violates the constraint.
type InvalidParameters = Parameters<{ label: string }>;
