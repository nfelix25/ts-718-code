import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-096 guided drills: tuple to union
 * =============================================================================
 * Replace the numeric index with every admitted position, union the results,
 * and normalize duplicates and never. Keep undefined from optional observations.
 */

type DE<T extends readonly unknown[]> = T[number];
type DBoxed<T extends readonly unknown[]> = { [K in keyof T]: { value: T[K] } }[number];
type DTagged<T extends readonly unknown[]> = { [K in keyof T]: [K, T[K]] }[number];

// Finite tuple elements become normalized unions.
type _D01 = Expect<Equal<DE<[]>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DE<[1]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DE<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DE<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DE<["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DE<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DE<[true, false]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DE<[null, undefined]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DE<[1, 1, 1]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DE<[1, never, 2]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DE<[unknown, 1]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DE<[1 | 2, 2 | 3]>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<Equal<DE<[1, 2]>, DE<[2, 1]>>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<Equal<DE<[1, 1, 2]>, DE<[1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<Equal<DE<[1, 2]>, [1, 2]>, TODO>>; // TODO(koan) @koan-error

// Readonly affects capabilities, not numeric element observation.
type _D16 = Expect<Equal<DE<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DE<readonly [1]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DE<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<Equal<DE<[1, 2]>, DE<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DE<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DE<string[]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DE<readonly never[]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DE<readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DE<readonly (1 | 2)[]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DE<readonly [name: string, count: number]>, TODO>>; // TODO(koan) @koan-error

// Optional and rest positions contribute every possible observation.
type _D26 = Expect<Equal<DE<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DE<[a: string, b?: number]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DE<[a?: string, b?: number]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DE<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DE<[...head: string[], tail: number]>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DE<[head: string, ...middle: boolean[], tail: number]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DE<[head?: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DE<[...tail: never[]]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DE<[head: 1, ...tail: never[]]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DE<[head: 1, ...tail: unknown[]]>, TODO>>; // TODO(koan) @koan-error

// Tuple unions and union-valued positions flatten to the same result union.
type _D36 = Expect<Equal<DE<[1] | [2]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DE<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DE<[1, 2] | [3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DE<[1 | 3, 2 | 4]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<Equal<DE<[1, 2] | [3, 4]>, DE<[1 | 3, 2 | 4]>>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DE<never>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DE<[never] | [1]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DE<string[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DE<readonly ["a", "b"] | readonly ["c"]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DE<[1, ...2[]] | [3, ...4[]]>, TODO>>; // TODO(koan) @koan-error

// Mapped tuples can retain a wrapper or index correlation before unioning.
type _D46 = Expect<Equal<DBoxed<[]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DBoxed<[1]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DBoxed<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DBoxed<readonly ["a", true]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DBoxed<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DTagged<[]>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DTagged<[1]>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DTagged<[1, "a"]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<Extract<DTagged<[1, "a"]>, ["0", unknown]>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<Extract<DTagged<[1, "a"]>, ["1", unknown]>[1], TODO>>; // TODO(koan) @koan-error

// Const vocabularies are a common practical source for element unions.
const dStates = ["idle", "running", "done"] as const;
const dCodes = [200, 404, 500] as const;
type _D56 = Expect<Equal<DE<typeof dStates>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DE<typeof dCodes>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DE<typeof dStates> | DE<typeof dCodes>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DBoxed<typeof dStates>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DTagged<typeof dCodes>, TODO>>; // TODO(koan) @koan-error
