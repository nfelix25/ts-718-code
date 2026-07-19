import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-094 edge cases: head and tail
 * =============================================================================
 * The nonempty proof is the sharp edge. Never-valued heads, optional positions,
 * arrays, unions, and readonly inputs show what the pattern proves and what it
 * merely cannot distinguish after never branches have been filtered.
 */

type EH<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never;
type ET<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty failure and a present never head produce the same Head result.
type _E01 = Expect<Equal<EH<[]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EH<[never]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ET<[]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ET<[never]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Equal<EH<[]>, EH<[never]>>, TODO>>; // TODO(koan) @koan-error

// Ordinary arrays may be empty and therefore do not match the nonempty pattern.
type _E06 = Expect<Equal<EH<string[]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ET<string[]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EH<[string, ...string[]]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ET<[string, ...string[]]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EH<readonly unknown[]>, TODO>>; // TODO(koan) @koan-error

// Optional position zero is possible, not guaranteed.
type _E11 = Expect<Equal<EH<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ET<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EH<[value?: string, ...rest: number[]]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ET<[value?: string, ...rest: number[]]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EH<[required: string, optional?: number]>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<ET<[required: string, optional?: number]>, TODO>>; // TODO(koan) @koan-error

// Distribution filters nonmatching members and can hide which input failed.
type _E17 = Expect<Equal<EH<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EH<[never] | [1]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<ET<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ET<[1] | [2]>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<ET<[1, never] | [2, 3]>, TODO>>; // TODO(koan) @koan-error

// Decomposition creates a mutable tail shape unless readonly is reapplied.
type _E22 = Expect<Equal<ET<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<Readonly<ET<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<"push" extends keyof ET<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<readonly [2] extends ET<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Any requires classification; never distributes to no branches at all.
type _E26 = Expect<Equal<EIsAny<EH<any>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsAny<ET<any>>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EH<never>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ET<never>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EH<[unknown]>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a required prefix makes an open tuple decomposable.
type _DemoOpen = Expect<Equal<ET<[head: 0, ...tail: 1[]]>, 1[]>>;

// Pre-solved: readonly matching does not preserve readonly on inferred Tail.
type _DemoReadonlyLoss = Expect<Equal<ET<readonly [1, 2]>, [2]>>;

// Pre-solved: empty union members disappear from the distributed Head result.
type _DemoDistributed = Expect<Equal<EH<[] | [1] | [2, 3]>, 1 | 2>>;

declare function needsHead<T extends readonly [unknown, ...unknown[]]>(value: T): void;
// @ts-expect-error A plain array does not guarantee a first element.
needsHead([] as string[]);
