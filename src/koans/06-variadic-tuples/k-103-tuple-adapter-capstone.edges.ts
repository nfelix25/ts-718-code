import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-103 edge cases: tuple adapter capstone
 * =============================================================================
 * Endpoint proofs interact with optionality, open rest regions, literal
 * assignability, unions, any/never, generic signatures, and overload inference.
 * The adapter rejects cases it cannot model exactly instead of dropping values.
 */

type EF = (...args: any[]) => unknown;
type EP<W extends readonly unknown[], P extends readonly unknown[]> = P extends readonly [] ? W : P extends readonly [infer PH, ...infer PT] ? W extends readonly [infer WH, ...infer WT] ? PH extends WH ? EP<WT, PT> : never : never : never;
type ES<W extends readonly unknown[], S extends readonly unknown[]> = S extends readonly [] ? W : S extends readonly [...infer SI, infer SL] ? W extends readonly [...infer WI, infer WL] ? SL extends WL ? ES<WI, SI> : never : never : never;
type EBP<F extends EF, P extends readonly unknown[]> = EP<Parameters<F>, P> extends infer R ? [R] extends [never] ? never : R extends readonly unknown[] ? (...args: R) => ReturnType<F> : never : never;
type EBS<F extends EF, S extends readonly unknown[]> = ES<Parameters<F>, S> extends infer R ? [R] extends [never] ? never : R extends readonly unknown[] ? (...args: R) => ReturnType<F> : never : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Literal bound values may narrow a broader accepted parameter type.
type _E01 = Expect<Equal<EP<[string, number], ["literal"]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EP<["literal", number], [string]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ES<[number, string], ["literal"]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ES<[number, "literal"], [string]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EP<[unknown, 1], ["x"]>, TODO>>; // TODO(koan) @koan-error

// Optional endpoint positions are possible, not guaranteed for binding proofs.
type _E06 = Expect<Equal<EP<[x?: string], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ES<[x?: string], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EP<[x: string, y?: number], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ES<[x: string, y?: number], [1]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ES<[x: string, y?: number], []>, TODO>>; // TODO(koan) @koan-error

// Open tails support proven prefixes but not fixed suffix removal.
type _E11 = Expect<Equal<EP<[head: string, ...tail: number[]], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EP<[head: string, ...tail: number[]], ["x", 1]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ES<[head: string, ...tail: number[]], [1]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EP<string[], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ES<[...head: string[], tail: number], [1]>, TODO>>; // TODO(koan) @koan-error

// Tuple unions distribute only where the naked recursive parameter appears.
type _E16 = Expect<Equal<EP<[string, 1] | [number, 2], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ES<[1, string] | [2, number], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EP<[] | [string], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EP<never, []>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ES<never, []>, TODO>>; // TODO(koan) @koan-error

// Any and never can erase or poison endpoint evidence.
type _E21 = Expect<Equal<EIsAny<EP<any, [1]>>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EIsAny<ES<any, [1]>>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EP<[any, 1], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<ES<[1, any], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EP<[never, 1], [never]>, TODO>>; // TODO(koan) @koan-error

// Generic and overloaded functions inherit Parameters/ReturnType information loss.
type Generic = <T>(value: T, count: number) => T;
interface Overloaded {
  (value: string): number;
  (value: number, radix: number): string;
}
type _E26 = Expect<Equal<Parameters<EBP<Generic, ["x"]>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ReturnType<EBP<Generic, ["x"]>>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<Parameters<EBP<Overloaded, [1]>>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<Parameters<EBS<Overloaded, [1]>>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ReturnType<EBS<Overloaded, [1]>>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: valid literal prefix binding returns only the unbound tail.
type _DemoPrefix = Expect<Equal<EP<[method: "GET" | "POST", path: string], ["GET"]>, [path: string]>>;

// Pre-solved: a mismatched endpoint rejects the complete adapter.
type _DemoMismatch = Expect<Equal<EBP<(x: string, y: number) => boolean, [1]>, never>>;

// Pre-solved: binding every required parameter produces a zero-argument function.
type _DemoComplete = Expect<Equal<Parameters<EBS<(x: string, y: number) => boolean, ["x", 1]>>, []>>;

declare const edgeFn: (method: "GET" | "POST", path: string) => string;
declare function acceptBound<F extends EF, P extends readonly unknown[]>(fn: F, ...prefix: P & (EBP<F, P> extends never ? never : unknown)): void;
// @ts-expect-error DELETE is not accepted by the function's first parameter.
acceptBound(edgeFn, "DELETE");
