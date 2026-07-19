import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-097 edge cases: tuple length and indexing
 * =============================================================================
 * Stable finite indices are not the same as every valid runtime numeric index.
 * Optionality, open regions, union-key intersections, and special types expose
 * that boundary and prevent overconfident generic access helpers.
 */

type EK<T extends readonly unknown[]> = Exclude<keyof T, keyof readonly unknown[]>;
type EN<T> = T extends `${infer N extends number}` ? N : never;
type EI<T extends readonly unknown[]> = EN<EK<T>>;
type EDI<T extends readonly unknown[]> = T extends unknown ? EI<T> : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Optional positions are stable keys even when absent in a particular value.
type Optional = [head: string, tail?: number];
type _E01 = Expect<Equal<EI<Optional>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<Optional["length"], TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<Optional[1], TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<1 extends EI<Optional> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<["x"] extends Optional ? true : false, TODO>>; // TODO(koan) @koan-error

// Open tails have arbitrary numeric positions but only fixed prefix indices.
type OpenTail = [head: string, ...tail: number[]];
type _E06 = Expect<Equal<EI<OpenTail>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<OpenTail[number], TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<1 extends EI<OpenTail> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<1 extends keyof OpenTail ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<"1" extends keyof OpenTail ? true : false, TODO>>; // TODO(koan) @koan-error

// A leading rest shifts the suffix, so it has no stable literal numeric index.
type OpenHead = [...head: string[], tail: number];
type _E11 = Expect<Equal<EI<OpenHead>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<OpenHead[number], TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<OpenHead["length"], TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<0 extends keyof OpenHead ? true : false, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<"0" extends keyof OpenHead ? true : false, TODO>>; // TODO(koan) @koan-error

// keyof on a union keeps common structure; distribution gathers possibilities.
type DifferentLengths = [1] | [1, 2, 3];
type _E16 = Expect<Equal<EI<DifferentLengths>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EDI<DifferentLengths>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<DifferentLengths["length"], TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<DifferentLengths[number], TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EI<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EDI<[] | [1]>, TODO>>; // TODO(koan) @koan-error

// Any, never, and broad arrays need explicit interpretation.
type _E22 = Expect<Equal<EIsAny<EI<any>>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EI<never>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EI<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EI<any[]>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EIsAny<any[][number]>, TODO>>; // TODO(koan) @koan-error

// Numeric keyof membership is broader than tuple-specific string keys.
type _E27 = Expect<Equal<number extends keyof [] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<number extends keyof [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<"0" extends EK<[1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<0 extends EK<[1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Pre-solved: optional positions remain stable tuple-specific indices.
type _DemoOptionalIndex = Expect<Equal<EI<[a?: 1, b?: 2]>, 0 | 1>>;

// Pre-solved: only the fixed prefix of a trailing-rest tuple is stable.
type _DemoOpenPrefix = Expect<Equal<EI<[head: 0, ...tail: 1[]]>, 0>>;

// Pre-solved: distributed union indexing gathers every member's stable positions.
type _DemoDistributed = Expect<Equal<EDI<[1] | [1, 2, 3]>, 0 | 1 | 2>>;

declare const pair: readonly ["a", 1];
// @ts-expect-error A known finite tuple rejects an out-of-bounds literal index.
pair[2];
