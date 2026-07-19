import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-095 edge cases: last and init
 * =============================================================================
 * Right decomposition depends on a fixed suffix. These cases contrast fixed and
 * open endings, show never filtering, and expose readonly loss on inferred Init.
 */

type EL<T extends readonly unknown[]> = T extends readonly [...unknown[], infer L] ? L : never;
type EI<T extends readonly unknown[]> = T extends readonly [...infer I, unknown] ? I : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty failure and a present never last value collapse to the same result.
type _E01 = Expect<Equal<EL<[]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EL<[never]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EI<[]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EI<[never]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Equal<EL<[]>, EL<[never]>>, TODO>>; // TODO(koan) @koan-error

// Arrays and trailing rests have no guaranteed fixed final position.
type _E06 = Expect<Equal<EL<string[]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EI<string[]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EL<[string, ...string[]]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EI<[string, ...string[]]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EL<readonly unknown[]>, TODO>>; // TODO(koan) @koan-error

// Optional final positions are possible rather than required.
type _E11 = Expect<Equal<EL<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EI<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EL<[head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EI<[head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EL<[head: string, ...rest: number[]]>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EI<[head: string, ...rest: number[]]>, TODO>>; // TODO(koan) @koan-error

// A fixed suffix after an open region restores the proof.
type _E17 = Expect<Equal<EL<[...rest: string[], end: number]>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EI<[...rest: string[], end: number]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EL<[start: boolean, ...rest: string[], end: number]>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EI<[start: boolean, ...rest: string[], end: number]>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EI<[...rest: never[], end: 1]>, TODO>>; // TODO(koan) @koan-error

// Inferred Init is mutable unless readonly is explicitly reconstructed.
type _E22 = Expect<Equal<EI<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<Readonly<EI<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<"push" extends keyof EI<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<readonly [1] extends EI<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Any and never need explicit classification around conditional inference.
type _E26 = Expect<Equal<EIsAny<EL<any>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsAny<EI<any>>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EL<never>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EI<never>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EL<[unknown]>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a leading rest with fixed suffix has an exact last type.
type _DemoFixedSuffix = Expect<Equal<EL<[...names: string[], count: number]>, number>>;

// Pre-solved: readonly matching does not preserve readonly on inferred Init.
type _DemoReadonlyLoss = Expect<Equal<EI<readonly [1, 2]>, [1]>>;

// Pre-solved: open-ended union branches disappear from distributed Last.
type _DemoDistributed = Expect<Equal<EL<string[] | [1] | [...2[], 3]>, 1 | 3>>;

declare function needsLast<T extends readonly [...unknown[], unknown]>(value: T): void;
// @ts-expect-error A plain array does not guarantee a final element.
needsLast([] as string[]);
