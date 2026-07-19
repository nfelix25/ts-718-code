import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-103 guided drills: tuple adapter capstone
 * =============================================================================
 * Validate bound values one endpoint at a time. Only rebuild a function after
 * the recursive tuple proof returns a non-never remainder.
 */

type DF = (...args: any[]) => unknown;
type DPrefix<W extends readonly unknown[], P extends readonly unknown[]> = P extends readonly [] ? W : P extends readonly [infer PH, ...infer PT] ? W extends readonly [infer WH, ...infer WT] ? PH extends WH ? DPrefix<WT, PT> : never : never : never;
type DSuffix<W extends readonly unknown[], S extends readonly unknown[]> = S extends readonly [] ? W : S extends readonly [...infer SI, infer SL] ? W extends readonly [...infer WI, infer WL] ? SL extends WL ? DSuffix<WI, SI> : never : never : never;
type DR<T extends readonly unknown[], A extends readonly unknown[] = []> = T extends readonly [infer H, ...infer R] ? DR<R, [H, ...A]> : A;
type DBP<F extends DF, P extends readonly unknown[]> = DPrefix<Parameters<F>, P> extends infer R ? [R] extends [never] ? never : R extends readonly unknown[] ? (...args: R) => ReturnType<F> : never : never;
type DBS<F extends DF, S extends readonly unknown[]> = DSuffix<Parameters<F>, S> extends infer R ? [R] extends [never] ? never : R extends readonly unknown[] ? (...args: R) => ReturnType<F> : never : never;
type DFlip<F extends DF> = Parameters<F> extends Required<Parameters<F>> ? (...args: DR<Parameters<F>>) => ReturnType<F> : never;

type Base = (a: string, b: number, c: boolean, d: Date) => Promise<"done">;

// Prefix removal consumes zero through all valid leading positions.
type _D01 = Expect<Equal<DPrefix<Parameters<Base>, []>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DPrefix<Parameters<Base>, ["x"]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DPrefix<Parameters<Base>, ["x", 1]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DPrefix<Parameters<Base>, ["x", 1, true]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DPrefix<Parameters<Base>, ["x", 1, true, Date]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DPrefix<Parameters<Base>, [1]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DPrefix<Parameters<Base>, ["x", "bad"]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DPrefix<Parameters<Base>, ["x", 1, false, Date, "extra"]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DPrefix<[], []>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DPrefix<[], [1]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DPrefix<[1 | 2, 3], [1]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DPrefix<[1 | 2, 3], [3]>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DPrefix<readonly [1, 2], readonly [1]>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DPrefix<[never, 1], [never]>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DPrefix<[unknown, 1], ["x"]>, TODO>>; // TODO(koan) @koan-error

// Suffix removal mirrors the proof from the final position.
type _D16 = Expect<Equal<DSuffix<Parameters<Base>, []>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DSuffix<Parameters<Base>, [Date]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DSuffix<Parameters<Base>, [true, Date]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DSuffix<Parameters<Base>, [1, false, Date]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DSuffix<Parameters<Base>, ["x", 1, true, Date]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DSuffix<Parameters<Base>, ["bad"]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DSuffix<Parameters<Base>, [1, Date]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DSuffix<Parameters<Base>, [0, "x", 1, true, Date]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DSuffix<[], []>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DSuffix<[], [1]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DSuffix<[1, 2 | 3], [2]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DSuffix<[1, 2 | 3], [4]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DSuffix<readonly [1, 2], readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DSuffix<[1, never], [never]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DSuffix<[1, unknown], ["x"]>, TODO>>; // TODO(koan) @koan-error

// Rebuilt bind signatures retain only unbound parameters and original result.
type _D31 = Expect<Equal<Parameters<DBP<Base, []>>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<Parameters<DBP<Base, ["x"]>>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<Parameters<DBP<Base, ["x", 1]>>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<Parameters<DBP<Base, ["x", 1, true, Date]>>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<ReturnType<DBP<Base, ["x", 1]>>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DBP<Base, [1]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<Parameters<DBS<Base, []>>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<Parameters<DBS<Base, [Date]>>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<Parameters<DBS<Base, [true, Date]>>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<Parameters<DBS<Base, ["x", 1, true, Date]>>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<ReturnType<DBS<Base, [Date]>>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DBS<Base, ["bad"]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<Parameters<DBP<(x: string, y?: number) => void, ["a"]>>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DBP<(x?: string) => void, ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DBS<(x: string, y?: number) => void, [1]>, TODO>>; // TODO(koan) @koan-error

// Flipping fixed required parameters reverses their complete tuple.
type _D46 = Expect<Equal<Parameters<DFlip<() => void>>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<Parameters<DFlip<(x: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<Parameters<DFlip<(x: string, y: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<Parameters<DFlip<Base>>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<ReturnType<DFlip<Base>>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DFlip<(x?: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DFlip<(x: string, y?: number) => void>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<Parameters<DFlip<(...x: [a: 1, b: 2]) => 3>>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<Parameters<DFlip<DFlip<(a: 1, b: 2, c: 3) => 4>>>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<ReturnType<DFlip<DFlip<(a: 1, b: 2) => 3>>>, TODO>>; // TODO(koan) @koan-error

// Adapter composition can bind one end and then transform the remainder.
type PrefixBound = DBP<Base, ["x"]>;
type SuffixBound = DBS<Base, [Date]>;
type _D56 = Expect<Equal<Parameters<PrefixBound>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<Parameters<DBS<PrefixBound, [Date]>>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<Parameters<SuffixBound>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<Parameters<DBP<SuffixBound, ["x"]>>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<Parameters<DFlip<DBS<DBP<Base, ["x"]>, [Date]>>>, TODO>>; // TODO(koan) @koan-error
