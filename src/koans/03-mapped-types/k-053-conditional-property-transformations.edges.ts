import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-053 edge cases: conditional property transformations
 * =============================================================================
 * The mapped loop is straightforward; conditional semantics create the sharp
 * edges. These cases isolate whole versus distributed checks, any/never/unknown,
 * optional properties, callable unions and overloads, modifier preservation,
 * object-union mapping, and the difference between an impossible value and a
 * removed property.
 */

type EBranch<V> = V extends string ? "text" : "other";
type EWhole<T> = { [K in keyof T]: T[K] extends string ? "text" : "other" };
type EDistributed<T> = { [K in keyof T]: EBranch<T[K]> };
type EAsyncValue<V> = V extends (...args: infer A) => infer R ? (...args: A) => Promise<Awaited<R>> : V;
type EAsync<T> = { [K in keyof T]: EAsyncValue<T[K]> };
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Special values behave differently in inline and helper conditionals.
type _E01 = Expect<Equal<EWhole<{ value: string | number }>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EDistributed<{ value: string | number }>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EBranch<never>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EWhole<{ value: never }>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EBranch<unknown>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EBranch<any>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EIsAny<EDistributed<any>>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EDistributed<unknown>, TODO>>; // TODO(koan) @koan-error

interface EOptional {
  required: string;
  optional?: string;
  explicit: string | undefined;
  maybeFn?: (x: number) => string;
}

// Optional indexed values introduce undefined into conditional inputs.
type _E09 = Expect<Equal<EWhole<EOptional>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EDistributed<EOptional>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EAsync<EOptional>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EAsync<EOptional>["maybeFn"], TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Required<EAsync<EOptional>>, TODO>>; // TODO(koan) @koan-error

// Callable unions distribute only through a helper's naked parameter.
type ECallableUnion = (() => string) | number;
type _E14 = Expect<Equal<{ value: ECallableUnion }["value"] extends (...args: any[]) => any ? true : false, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EAsyncValue<ECallableUnion>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EAsync<{ value: ECallableUnion }>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EAsyncValue<((x: string) => number) | ((x: number) => string)>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EAsyncValue<never>, TODO>>; // TODO(koan) @koan-error

interface EOverloaded {
  (value: string): number;
  (value: number): string;
}

// Inference from overloads uses the implementation-facing last signature.
type _E19 = Expect<Equal<EAsyncValue<EOverloaded>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<Parameters<EAsyncValue<EOverloaded>>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<ReturnType<EAsyncValue<EOverloaded>>, TODO>>; // TODO(koan) @koan-error

type EVariant = { kind: "a"; value: string; a: number } | { kind: "b"; value: number; b: boolean };

// Homomorphic mapping retains object-union alternatives and modifiers.
type _E22 = Expect<Equal<EDistributed<EVariant>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<Extract<EDistributed<EVariant>, { kind: "text" }>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EAsync<readonly [{ fn: () => string }]>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EDistributed<{ readonly value?: string }>, TODO>>; // TODO(koan) @koan-error

// A never value retains its key; an as-never destination removes the key.
type EValueNever = { [K in keyof { a: string; b: number }]: K extends "a" ? never : K };
type EKeyNever = { [K in keyof { a: string; b: number } as K extends "a" ? never : K]: K };
type _E26 = Expect<Equal<EValueNever, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<keyof EValueNever, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EKeyNever, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<keyof EKeyNever, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<Partial<EKeyNever>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: the inline union check is all-or-nothing.
type _DemoWhole = Expect<Equal<EWhole<{ value: string | number }>, { value: "other" }>>;

// Pre-solved: the helper distributes and preserves one result per union member.
type _DemoDistributed = Expect<Equal<EDistributed<{ value: string | number }>, { value: "text" | "other" }>>;

// Pre-solved: a never-valued property remains visible to keyof.
type _DemoNeverKey = Expect<Equal<keyof EValueNever, "a" | "b">>;

const invalidNeverValue: EValueNever = {
  // @ts-expect-error A retained property with value never cannot be populated.
  a: "a",
  b: "b",
};
void invalidNeverValue;
