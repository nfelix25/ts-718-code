import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-053 guided drills: conditional property transformations
 * =============================================================================
 * For each property, identify whether the conditional sees a whole indexed
 * value or a distributed helper parameter. Then preserve the key and modifiers
 * unless a separate `as` expression explicitly filters that property.
 */

type DStringify<V> = V extends string | number | boolean ? string : V;
type DStringified<T> = { [K in keyof T]: DStringify<T[K]> };
type DWholeString<T> = { [K in keyof T]: T[K] extends string ? "text" : T[K] };
type DDistributedString<V> = V extends string ? "text" : V;
type DDistributed<T> = { [K in keyof T]: DDistributedString<T[K]> };
type DArrayElement<V> = V extends readonly (infer Element)[] ? Element : V;
type DAsync<T> = { [K in keyof T]: T[K] extends (...args: infer A) => infer R ? (...args: A) => Promise<Awaited<R>> : T[K] };
type DOnlyFunctions<T> = { [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K] };

interface DValues { text: string; count: number; flag: boolean; date: Date; data: object }

// Scalar and non-scalar conditional branches.
type _D01 = Expect<Equal<DStringified<DValues>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DStringified<DValues>["text"], TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DStringified<DValues>["count"], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DStringified<DValues>["flag"], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DStringified<DValues>["date"], TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DStringified<{ literal: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DStringified<{ literal: true }>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DStringified<{ value: bigint }>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DStringified<{ value: symbol }>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DStringified<{ value: null }>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DStringified<{ value: undefined }>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DStringified<{ value: unknown }>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DStringified<{ value: never }>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DStringified<{}>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<keyof DStringified<DValues>, TODO>>; // TODO(koan) @koan-error

interface DUnions { textOrNumber: string | number; textOrDate: string | Date; text: string; date: Date }

// Whole indexed checks versus distributed helper checks.
type _D16 = Expect<Equal<DWholeString<DUnions>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DWholeString<DUnions>["textOrNumber"], TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DDistributed<DUnions>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DDistributed<DUnions>["textOrNumber"], TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DDistributed<DUnions>["textOrDate"], TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DStringified<{ value: string | number }>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DStringified<{ value: string | Date }>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DWholeString<{ value: "a" | "b" }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DDistributed<{ value: string | never }>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DDistributed<{ value: unknown | string }>, TODO>>; // TODO(koan) @koan-error

interface DModified { readonly id: number; label?: string; maybe?: number; explicit: string | undefined }

// Homomorphic value transforms preserve source modifiers and optional reads.
type _D26 = Expect<Equal<DStringified<DModified>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DStringified<DModified>["label"], TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DWholeString<DModified>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DDistributed<DModified>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<Required<DStringified<DModified>>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<Readonly<DStringified<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<{ -readonly [K in keyof DStringified<DModified>]: DStringified<DModified>[K] }, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DStringified<readonly [1, "a", true]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DStringified<number[]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DStringified<Record<string, number>>, TODO>>; // TODO(koan) @koan-error

interface DService {
  version: string;
  load(id: number): string;
  save(value: string, force?: boolean): Promise<number>;
  reset(): void;
}

// Callable branches preserve arguments and await return values.
type _D36 = Expect<Equal<DAsync<DService>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<Parameters<DAsync<DService>["load"]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<ReturnType<DAsync<DService>["load"]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<Parameters<DAsync<DService>["save"]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<ReturnType<DAsync<DService>["save"]>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<ReturnType<DAsync<DService>["reset"]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DAsync<DService>["version"], TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DAsync<{ fn: (x: string) => Promise<Promise<number>> }>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DAsync<{ fn: (...values: number[]) => boolean }>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DAsync<{ fn?: (x: number) => string }>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DAsync<{ value: (() => string) | number }>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DAsync<{}>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DOnlyFunctions<DService>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<keyof DOnlyFunctions<DService>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DAsync<DOnlyFunctions<DService>>, TODO>>; // TODO(koan) @koan-error

// Value-never, key-never, composition, and value-dependent wrappers.
type _D51 = Expect<Equal<{ [K in keyof DValues]: DValues[K] extends Date ? never : DValues[K] }, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<keyof { [K in keyof DValues]: DValues[K] extends Date ? never : DValues[K] }, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<{ [K in keyof DValues as DValues[K] extends Date ? never : K]: DValues[K] }, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<keyof { [K in keyof DValues as DValues[K] extends Date ? never : K]: DValues[K] }, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DStringified<Pick<DValues, "count" | "date">>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<Partial<DStringified<DValues>>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DStringified<Partial<DValues>>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<{ [K in keyof DValues]: DValues[K] extends readonly unknown[] ? DValues[K][number] : DValues[K] }, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<{ [K in keyof { a: string[]; b: number }]: DArrayElement<{ a: string[]; b: number }[K]> }, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DAsync<DStringified<{ count: number; fn: () => string }>>, TODO>>; // TODO(koan) @koan-error
