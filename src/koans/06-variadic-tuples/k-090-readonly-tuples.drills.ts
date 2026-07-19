import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-090 guided drills: readonly tuples
 * =============================================================================
 * Separate observation from mutation. Check shape preservation first, then
 * assignability direction, inference, and deliberate conversion operations.
 */

type DMutable<T extends readonly unknown[]> = { -readonly [K in keyof T]: T[K] };
type DReadonly<T extends readonly unknown[]> = { readonly [K in keyof T]: T[K] };
type DSpread<T extends readonly unknown[]> = [...T];
type DAccept<T extends readonly unknown[]> = T;

// Readonly changes write capability, not positional observation.
type _D01 = Expect<Equal<(readonly [string, number])[0], TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<(readonly [string, number])[1], TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<(readonly [string, number])[number], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<(readonly [string, number])["length"], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<(readonly [])["length"], TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<(readonly [true])[number], TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<(readonly [1, 2, 3])[2], TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<(readonly number[])[number], TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<(readonly number[])["length"], TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<Equal<readonly [1, 2], readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error

// Mutable values provide enough capability for readonly consumers.
type _D11 = Expect<Equal<[1] extends readonly [number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<readonly [1] extends [number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<[1, 2] extends readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<readonly [1, 2] extends number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<number[] extends readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<readonly number[] extends number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<[] extends readonly [] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<readonly [] extends [] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<Equal<[string], readonly [string]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<Equal<string[], readonly string[]>, TODO>>; // TODO(koan) @koan-error

// Mapped modifiers preserve cardinality, labels, and element literals.
type _D21 = Expect<Equal<DMutable<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DMutable<readonly [1]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DMutable<readonly [1, "x"]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DMutable<[1, "x"]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DReadonly<[]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DReadonly<[1]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DReadonly<[1, "x"]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DReadonly<readonly [1, "x"]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DMutable<readonly [left: 1, right: 2]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DReadonly<[left: 1, right: 2]>, TODO>>; // TODO(koan) @koan-error

// Tuple spread creates a mutable tuple type from either source view.
type _D31 = Expect<Equal<DSpread<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DSpread<readonly [1]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DSpread<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DSpread<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DSpread<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DSpread<string[]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DSpread<readonly [name: string, count: number]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DSpread<readonly [true, false]>[number], TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DSpread<readonly [true, false]>["length"], TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<Equal<DSpread<readonly [1]>, readonly [1]>, TODO>>; // TODO(koan) @koan-error

// A readonly generic constraint preserves the argument's actual mutability.
type _D41 = Expect<Equal<DAccept<[]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DAccept<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DAccept<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DAccept<readonly [string, number]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DAccept<string[]>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DAccept<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DAccept<readonly [1, 2]>[0], TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DAccept<readonly [1, 2]>[number], TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DAccept<readonly [1, 2]>["length"], TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DMutable<DAccept<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error

// `as const` recursively narrows this literal expression into readonly shapes.
const dLiteral = [{ id: 1 }, ["a", "b"]] as const;
type _D51 = Expect<Equal<typeof dLiteral, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<typeof dLiteral[0], TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<typeof dLiteral[0]["id"], TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<typeof dLiteral[1], TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<typeof dLiteral[1][number], TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<typeof dLiteral["length"], TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DMutable<typeof dLiteral>[0], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DMutable<typeof dLiteral>[1], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DReadonly<DMutable<typeof dLiteral>>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DSpread<typeof dLiteral>[number], TODO>>; // TODO(koan) @koan-error
