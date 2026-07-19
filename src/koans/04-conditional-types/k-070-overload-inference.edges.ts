import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-070 edge cases: overload inference
 * =============================================================================
 * Overload order is observable in both call resolution and final-signature
 * inference. These cases contrast reordered intersections, summary signatures,
 * generics, explicit this parameters, special types, and implementation bodies.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EArgs<F> = F extends (...args: infer P) => unknown ? P : never;
type EReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type ESig<F> = F extends (...args: infer P) => infer R ? [P, R] : never;

// Intersection order determines the signature exposed to infer utilities.
type EForward = ((x: string) => 1) & ((x: number) => 2);
type EReverse = ((x: number) => 2) & ((x: string) => 1);
type _E01 = Expect<Equal<EArgs<EForward>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EReturn<EForward>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EArgs<EReverse>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EReturn<EReverse>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<ESig<EForward>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ESig<EReverse>, TODO>>; // TODO(koan) @koan-error

// A final summary signature intentionally trades correlation for a broad view.
interface ESummary {
  (x: string): number;
  (x: number): string;
  (x: string | number): string | number;
}
type _E07 = Expect<Equal<EArgs<ESummary>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EReturn<ESummary>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ESig<ESummary>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ReturnType<ESummary>, TODO>>; // TODO(koan) @koan-error

// Generic final signatures infer their broad placeholders.
interface EGenericLast {
  (x: string): number;
  <T>(x: T): T;
}
interface EConstrainedLast {
  (x: number): number;
  <T extends string>(x: T): T;
}
type _E11 = Expect<Equal<EArgs<EGenericLast>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EReturn<EGenericLast>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EArgs<EConstrainedLast>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EReturn<EConstrainedLast>, TODO>>; // TODO(koan) @koan-error

// Explicit this is omitted from Parameters but recoverable separately.
interface EThisOverload {
  (this: Date, x: number): string;
  (this: Map<string, number>, x: string): number;
}
type _E15 = Expect<Equal<EArgs<EThisOverload>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EReturn<EThisOverload>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ThisParameterType<EThisOverload>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<OmitThisParameter<EThisOverload>, TODO>>; // TODO(koan) @koan-error

// Unions distribute; intersections select their final signature.
type _E19 = Expect<Equal<EArgs<((x: 1) => "a") | ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EReturn<((x: 1) => "a") | ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EArgs<((x: 1) => "a") & ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EReturn<((x: 1) => "a") & ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error

// Special types can stop, erase, or poison final-signature inference.
type _E23 = Expect<Equal<EArgs<unknown>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EReturn<never>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EIsAny<EReturn<any>>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EIsAny<ReturnType<any>>, TODO>>; // TODO(koan) @koan-error

// The implementation signature is hidden once overload declarations exist.
declare function eRuntime(x: string): 1;
declare function eRuntime(x: number): 2;
type ERuntimeImplementation = (x: string | number) => 1 | 2;
type _E27 = Expect<Equal<EArgs<typeof eRuntime>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EReturn<typeof eRuntime>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EArgs<ERuntimeImplementation>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EReturn<ERuntimeImplementation>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: infer sees the last signature of an overload intersection.
type _DemoLast = Expect<Equal<ESig<EForward>, [[x: number], 2]>>;

// Pre-solved: a callable union is visited member by member.
type _DemoUnion = Expect<Equal<
  ESig<((x: 1) => "a") | ((x: 2) => "b")>,
  [[x: 1], "a"] | [[x: 2], "b"]
>>;

// Pre-solved: a summary overload exposes unions but not input-output correlation.
type _DemoSummary = Expect<Equal<ESig<ESummary>, [[x: string | number], string | number]>>;

// Calls must match a visible overload, not merely the hidden implementation body.
declare function visibleOnly(x: string): 1;
declare function visibleOnly(x: number): 2;
// @ts-expect-error No visible overload accepts a string-number union.
visibleOnly(Math.random() > 0.5 ? "x" : 1);
