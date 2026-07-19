import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-064 edge cases: infer basics
 * =============================================================================
 * Inference depends on the exact outer pattern. These cases stress readonly
 * compatibility, required versus optional properties, overloads, union member
 * filtering, special types, primitive structural matches, one-layer promises,
 * and the lexical scope of inferred variables.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EReadonlyElement<T> = T extends readonly (infer E)[] ? E : never;
type EMutableElement<T> = T extends (infer E)[] ? E : never;
type EReturn<T> = T extends (...args: any[]) => infer R ? R : never;
type EId<T> = T extends { id: infer I } ? I : never;
type EPromise<T> = T extends PromiseLike<infer V> ? V : never;
type EInstance<T> = T extends abstract new (...args: any[]) => infer I ? I : never;

// Readonly patterns accept both containers; mutable patterns reject readonly ones.
type _E01 = Expect<Equal<EReadonlyElement<string[]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EReadonlyElement<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EMutableElement<string[]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EMutableElement<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EMutableElement<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EReadonlyElement<string[] | readonly number[]>, TODO>>; // TODO(koan) @koan-error

// Required object patterns reject optional or absent properties member by member.
type _E07 = Expect<Equal<EId<{ id?: string }>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EId<{ id: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EId<{ readonly id: "x" }>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EId<{ id: 1 } | { id?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EId<{ id: 1 } | { name: "x" }>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EId<string>, TODO>>; // TODO(koan) @koan-error

interface EOverloaded {
  (value: string): number;
  (value: number): string;
}

// Function inference observes the last overload signature.
type _E13 = Expect<Equal<EReturn<EOverloaded>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ReturnType<EOverloaded>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EReturn<(() => 1) & (() => 2)>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EReturn<(() => string) | number>, TODO>>; // TODO(koan) @koan-error

// Any, never, and unknown interact with the pattern before capture.
type _E17 = Expect<Equal<EIsAny<EReadonlyElement<any>>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EIsAny<EReturn<any>>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EIsAny<EInstance<any>>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EReadonlyElement<never>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EReturn<never>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EId<unknown>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EPromise<unknown>, TODO>>; // TODO(koan) @koan-error

// Promise extraction is one layer; Awaited recursively follows thenables.
type _E24 = Expect<Equal<EPromise<Promise<Promise<string>>>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<Awaited<Promise<Promise<string>>>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EPromise<Promise<string> | number>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<Awaited<Promise<string> | number>, TODO>>; // TODO(koan) @koan-error

// Primitive wrappers and call/construct distinctions complete shape matching.
type _E28 = Expect<Equal<string extends { length: infer L } ? L : never, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EInstance<new () => Date>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EReturn<new () => Date>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: optional properties do not satisfy a required-property pattern.
type _DemoOptional = Expect<Equal<EId<{ id?: string }>, never>>;

// Pre-solved: a union member that fails the pattern contributes never.
type _DemoUnionFilter = Expect<Equal<EId<{ id: 1 } | { name: "x" }>, 1>>;

// Pre-solved: the simple Promise pattern extracts exactly one declared layer.
type _DemoPromiseLayer = Expect<Equal<EPromise<Promise<Promise<string>>>, Promise<string>>>;

// Infer variables exist only in a conditional pattern and its true branch.
// @ts-expect-error `Captured` is not in scope outside an infer declaration.
type InvalidInferScope = Captured;
