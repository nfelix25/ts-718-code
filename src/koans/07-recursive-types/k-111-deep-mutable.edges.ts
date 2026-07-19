import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-111 edge cases: DeepMutable
 * =============================================================================
 * Removing readonly does not require optional fields, widen literals, or clone
 * runtime aliases. Opaque leaves stay shared, and structural assignability still
 * permits readonly-looking values to flow through some mutable object shapes.
 */

type EP = string | number | boolean | bigint | symbol | null | undefined;
type EA = EP | Date | RegExp | ((...args: any[]) => unknown) | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type EAny<T> = 0 extends (1 & T) ? true : false;
type EM<T> = EAny<T> extends true ? any : T extends EA ? T : T extends readonly unknown[] ? number extends T["length"] ? EM<T[number]>[] : { -readonly [K in keyof T]: EM<T[K]> } : T extends object ? { -readonly [K in keyof T]: EM<T[K]> } : T;

// Optionality remains independent from removed readonly capability.
type M = EM<{ readonly nested?: { readonly value: number } }>;
type _E01 = Expect<Equal<M, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<M["nested"], TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<{} extends M ? true : false, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<{ nested: undefined } extends M ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<{ nested: { value: 1 } } extends M ? true : false, TODO>>; // TODO(koan) @koan-error

// Literal domains remain narrow even when their positions become writable.
type _E06 = Expect<Equal<EM<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EM<readonly [1, 2]>[0], TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<[2, 1] extends EM<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<[1, 2] extends EM<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<"push" extends keyof EM<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Opaque built-ins already expose their own mutation APIs.
type _E11 = Expect<Equal<EM<Date>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<"setTime" extends keyof EM<Date> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EM<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<"set" extends keyof EM<Map<string, number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<"add" extends keyof EM<Set<number>> ? true : false, TODO>>; // TODO(koan) @koan-error

// Object and array assignability can be surprising around readonly sources.
type _E16 = Expect<Equal<{ readonly x: number } extends { x: number } ? true : false, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<readonly number[] extends number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<readonly [1, 2] extends [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EM<readonly number[]> extends number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EM<readonly [1, 2]> extends [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error

// String, number, and symbol keys retain identity while losing readonly.
declare const token: unique symbol;
type Mixed = { readonly 0: { readonly id: number }; readonly name: string; readonly [token]: { readonly active: boolean } };
type _E21 = Expect<Equal<EM<Mixed>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EM<Mixed>[0], TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EM<Mixed>[typeof token], TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<keyof EM<Mixed>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EM<Readonly<Record<string, { readonly id: number }>>>[string], TODO>>; // TODO(koan) @koan-error

// Special source types retain explicit boundary behavior.
type _E26 = Expect<Equal<EAny<EM<any>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EM<unknown>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EM<never>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EM<{}>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EM<Record<string, never>>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: nested readonly properties become writable without widening values.
type _DemoNested = Expect<Equal<EM<{ readonly user: { readonly id: 1 } }>, { user: { id: 1 } }>>;

// Pre-solved: readonly arrays become mutable arrays of transformed elements.
type _DemoArray = Expect<Equal<EM<readonly { readonly id: number }[]>, { id: number }[]>>;

// Pre-solved: optionality remains optional.
type _DemoOptional = Expect<Equal<EM<{ readonly value?: string }>, { value?: string }>>;

declare let mutableValue: EM<{ readonly nested: { readonly value: number } }>;
mutableValue.nested.value = 2;
