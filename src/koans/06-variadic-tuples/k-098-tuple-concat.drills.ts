import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-098 guided drills: tuple concat
 * =============================================================================
 * Treat concat as an algebra first, then choose mutability and broad-input policy.
 * For open operands, reuse the normalization rules instead of inventing new ones.
 */

type DC<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];
type DRC<A extends readonly unknown[], B extends readonly unknown[]> = readonly [...A, ...B];
type DLC<A extends readonly unknown[], B extends readonly unknown[]> = A extends unknown[] ? [...A, ...B] : readonly [...A, ...B];
type DMany<C extends readonly (readonly unknown[])[]> = number extends C["length"] ? C[number][number][] : C extends readonly [infer H extends readonly unknown[], ...infer R extends readonly (readonly unknown[])[]] ? [...H, ...DMany<R>] : [];

// Empty identity and finite operands preserve every literal position.
type _D01 = Expect<Equal<DC<[], []>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DC<[], [1]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DC<[1], []>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DC<[1], [2]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DC<[1, 2], [3]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DC<[1], [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DC<[1, 2], [3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DC<[a: string], [b: number]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DC<readonly [1], readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DC<[never], [1]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DC<[unknown], [1]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DC<[1], [2]>[number], TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DC<[1], [2]>["length"], TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DC<[1, 2], [3]>[2], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DC<[], [value?: string]>, TODO>>; // TODO(koan) @koan-error

// Nested concat obeys empty identity and associativity.
type _D16 = Expect<Equal<DC<DC<[1], [2]>, [3]>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DC<[1], DC<[2], [3]>>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<Equal<DC<DC<[1], [2]>, [3]>, DC<[1], DC<[2], [3]>>>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DC<DC<[], [1]>, []>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DC<[1, 2], DC<[], [3, 4]>>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DC<DC<[1], []>, DC<[], [2]>>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DC<DC<[1], [2]>, DC<[3], [4]>>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DC<[1] | [2], [3]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DC<[1], [2] | [3]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DC<[1] | [2], [3] | [4]>, TODO>>; // TODO(koan) @koan-error

// Open and optional operands use tuple spread normalization.
type _D26 = Expect<Equal<DC<[0], 1[]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DC<0[], [1]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DC<0[], 1[]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DC<[0, ...1[]], [2]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DC<[0, ...1[]], 2[]>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DC<1[], [...2[], 3]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DC<[a?: 1], [b: 2]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DC<[a: 1], [b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DC<[a?: 1], [b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DC<[a?: 1, b?: 2], [c: 3]>, TODO>>; // TODO(koan) @koan-error

// Explicit output policies can ignore or follow input readonly capability.
type _D36 = Expect<Equal<DRC<[1], [2]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DRC<readonly [1], readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DLC<[1], [2]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DLC<[1], readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DLC<readonly [1], [2]>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DLC<readonly [1], readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<"push" extends keyof DC<readonly [1], readonly [2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<"push" extends keyof DRC<[1], [2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<"push" extends keyof DLC<[1], [2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<"push" extends keyof DLC<readonly [1], [2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// ConcatMany recursively consumes finite chunks and widens broad chunk arrays.
type _D46 = Expect<Equal<DMany<[]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DMany<[[1]]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DMany<[[1], [2]]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DMany<[[1], [], [2, 3]]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DMany<readonly [readonly [1], readonly [2, 3]]>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DMany<[[1], [2], [3], [4]]>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DMany<string[][]>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DMany<readonly (readonly number[])[]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DMany<([] | [1])[]>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DMany<never[]>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DMany<[[1], ...2[][]]>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DMany<[[1], [2]]>[number], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DMany<[[1], [2]]>["length"], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DMany<[[a: string], [b: number]]>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DMany<never>, TODO>>; // TODO(koan) @koan-error
