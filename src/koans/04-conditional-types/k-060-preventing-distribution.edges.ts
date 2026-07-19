import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-060 edge cases: preventing distribution
 * =============================================================================
 * Non-distribution changes quantifiers and result correlation. These cases cover
 * vacuous never, uncertain any, top unknown, one-sided wrapping in two-parameter
 * products, wrapper variance, optional aggregate contracts, and mixed states
 * admitted when a union is retained as one value.
 */

type EEvery<T, U> = [T] extends [U] ? true : false;
type ESome<T, U> = [Extract<T, U>] extends [never] ? false : true;
type EDistBox<T> = T extends unknown ? { value: T; same: T } : never;
type EWholeBox<T> = [T] extends [unknown] ? { value: T; same: T } : never;
type ELeftProduct<A, B> = A extends unknown ? [B] extends [unknown] ? [A, B] : never : never;
type ENeitherProduct<A, B> = [A] extends [unknown] ? [B] extends [unknown] ? [A, B] : never : never;

// Never makes every-member tests vacuously true and some-member tests false.
type _E01 = Expect<Equal<EEvery<never, string>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ESome<never, string>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EDistBox<never>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EWholeBox<never>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EEvery<any, string>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ESome<any, string>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EEvery<unknown, unknown>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EEvery<unknown, string>, TODO>>; // TODO(koan) @koan-error

// Wrapping one or both of two parameters controls product expansion.
type _E09 = Expect<Equal<ELeftProduct<"a" | "b", 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ENeitherProduct<"a" | "b", 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<ELeftProduct<never, 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ENeitherProduct<never, 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ELeftProduct<"a" | "b", never>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ENeitherProduct<"a" | "b", never>, TODO>>; // TODO(koan) @koan-error

// Different wrappers ask assignability through their own variance.
type _E15 = Expect<Equal<[{ x: 1 } | { y: 2 }] extends [{ x: number }] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<{ value: { x: 1 } | { y: 2 } } extends { value: { x: number } } ? true : false, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<(() => "a" | "b") extends (() => string) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<((value: "a" | "b") => void) extends ((value: "a") => void) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<Promise<"a" | 1> extends Promise<string> ? true : false, TODO>>; // TODO(koan) @koan-error

// Optional, readonly, and array aggregates require all members to fit.
type _E20 = Expect<Equal<EEvery<{ id: 1 } | { id?: 2 }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<ESome<{ id: 1 } | { id?: 2 }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EEvery<string[] | readonly string[], readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EEvery<string[] | readonly string[], string[]>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<ESome<string[] | readonly string[], string[]>, TODO>>; // TODO(koan) @koan-error

// Whole boxes admit cross-member combinations that distributed boxes reject.
type EPair = "a" | 1;
type _E25 = Expect<Equal<EDistBox<EPair>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EWholeBox<EPair>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<{ value: "a"; same: 1 } extends EDistBox<EPair> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<{ value: "a"; same: 1 } extends EWholeBox<EPair> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<keyof EDistBox<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EWholeBox<{ a: 1 } | { b: 2 }>["value"], TODO>>; // TODO(koan) @koan-error

// Pre-solved: every member of never satisfies a constraint vacuously.
type _DemoNeverEvery = Expect<Equal<EEvery<never, string>, true>>;

// Pre-solved: keeping B wrapped distributes A only.
type _DemoLeftOnly = Expect<Equal<ELeftProduct<"a" | "b", 1 | 2>, ["a", 1 | 2] | ["b", 1 | 2]>>;

// Pre-solved: a whole correlated box permits cross-member field combinations.
type _DemoWholeMix = Expect<Equal<{ value: "a"; same: 1 } extends EWholeBox<EPair> ? true : false, true>>;

// A distributed box preserves the relationship and rejects a cross-member mix.
// @ts-expect-error No distributed member pairs value "a" with same 1.
const invalidDistributed: EDistBox<EPair> = { value: "a", same: 1 };
void invalidDistributed;
