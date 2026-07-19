import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-068 edge cases: covariant inference candidates
 * =============================================================================
 * Candidate collection is followed by normal union normalization. These cases
 * separate an outer distributed union from repeated positions inside one
 * match, then stress broad types, impossible candidates, and nested containers.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type ECandidates<T> = T extends { left: infer U; right: infer U } ? U : never;
type EReturns<T> = T extends { left: () => infer U; right: () => infer U } ? U : never;
type EPromises<T> = T extends readonly [PromiseLike<infer U>, PromiseLike<infer U>] ? U : never;

// Broad candidates absorb narrower literals through ordinary union algebra.
type _E01 = Expect<Equal<ECandidates<{ left: "a"; right: "b" }>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ECandidates<{ left: "a"; right: string }>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ECandidates<{ left: 1; right: number }>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ECandidates<{ left: true; right: boolean }>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<ECandidates<{ left: 1; right: 1 | 2 }>, TODO>>; // TODO(koan) @koan-error

// Bottom disappears, top absorbs, and any poisons the candidate union.
type _E06 = Expect<Equal<ECandidates<{ left: never; right: "x" }>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ECandidates<{ left: never; right: never }>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ECandidates<{ left: unknown; right: "x" }>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EIsAny<ECandidates<{ left: any; right: "x" }>>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EIsAny<ECandidates<any>>, TODO>>; // TODO(koan) @koan-error

// Outer union distribution is distinct from collection inside one object.
type Correlated = { left: 1; right: "a" } | { left: 2; right: "b" };
type Uncorrelated = { left: 1 | 2; right: "a" | "b" };
type _E11 = Expect<Equal<ECandidates<Correlated>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ECandidates<Uncorrelated>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ECandidates<{ left: 1; right: "a" } | { left: never; right: "b" }>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ECandidates<{ left: 1 } | { left: 2; right: 3 }>, TODO>>; // TODO(koan) @koan-error

// Required outer shapes and modifiers determine whether candidates are collected.
type _E15 = Expect<Equal<ECandidates<{ readonly left: 1; readonly right: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<ECandidates<{ left?: 1; right: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ECandidates<{ left: 1 | undefined; right: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ECandidates<unknown>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<ECandidates<never>, TODO>>; // TODO(koan) @koan-error

// Return and promise positions obey the same covariant candidate rule.
type _E20 = Expect<Equal<EReturns<{ left: () => 1; right: () => 2 }>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EReturns<{ left: () => never; right: () => "x" }>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EReturns<{ left: () => unknown; right: () => "x" }>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EIsAny<EReturns<{ left: () => any; right: () => "x" }>>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EPromises<[Promise<1>, Promise<2>]>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EPromises<[Promise<never>, Promise<2>]>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EPromises<[Promise<unknown>, Promise<2>]>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsAny<EPromises<[Promise<any>, Promise<2>]>>, TODO>>; // TODO(koan) @koan-error

// Structural candidates can remain a union even when their shapes overlap.
type _E28 = Expect<Equal<ECandidates<{ left: { id: 1 }; right: { name: "x" } }>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ECandidates<{ left: { id: 1 }; right: object }>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ECandidates<{ left: readonly [1]; right: readonly [2] }>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: unequal covariant candidates combine; equality is not required.
type _DemoUnion = Expect<Equal<ECandidates<{ left: 1; right: 2 }>, 1 | 2>>;

// Pre-solved: never is the identity element of the resulting candidate union.
type _DemoNever = Expect<Equal<ECandidates<{ left: never; right: "kept" }>, "kept">>;

// Pre-solved: outer distribution and inner collection both contribute members.
type _DemoOuterUnion = Expect<Equal<ECandidates<Correlated>, 1 | 2 | "a" | "b">>;

// Infer declarations are type syntax and cannot appear in a value annotation.
// @ts-expect-error `infer` is permitted only in an extends clause of a conditional type.
declare const invalidInferValue: infer Value;
