import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-110 edge cases: DeepRequired
 * =============================================================================
 * Requiredness removes omission, not undefined values. Index signatures are
 * already conceptually total at the type level, unions remain separate shapes,
 * and defaults are a runtime source of missing values rather than a type trick.
 */

type EP = string | number | boolean | bigint | symbol | null | undefined;
type EA = EP | Date | RegExp | ((...args: any[]) => unknown) | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type EAny<T> = 0 extends (1 & T) ? true : false;
type ER<T> = EAny<T> extends true ? any : T extends EA ? T : T extends readonly unknown[] ? number extends T["length"] ? T extends unknown[] ? ER<T[number]>[] : readonly ER<T[number]>[] : { [K in keyof T]-?: ER<T[K]> } : T extends object ? { [K in keyof T]-?: ER<T[K]> } : T;

// Optional syntax and explicit undefined separate after -? removal.
type _E01 = Expect<Equal<ER<{ x?: string }>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ER<{ x?: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ER<{ x: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<{ x: undefined } extends ER<{ x?: string }> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<{ x: undefined } extends ER<{ x?: string | undefined }> ? true : false, TODO>>; // TODO(koan) @koan-error

// Requiredness preserves readonly rather than making properties writable.
type _E06 = Expect<Equal<ER<{ readonly x?: { readonly y?: number } }>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ER<readonly [a?: 1, b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<"push" extends keyof ER<readonly [a?: 1]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ER<readonly [a?: 1]>["length"], TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<readonly [1] extends ER<readonly [a?: 1]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Broad arrays have no optional position modifiers to remove.
type _E11 = Expect<Equal<ER<string[]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ER<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ER<Array<{ id?: number }>>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ER<readonly { id?: number }[]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ER<[head?: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error

// Index signatures recurse through values but do not enumerate concrete keys.
declare const token: unique symbol;
type _E16 = Expect<Equal<ER<Record<string, { id?: number }>>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ER<Record<string, { id?: number }>>[string], TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ER<{ [token]?: { id?: number } }>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<ER<{ [token]?: { id?: number } }>[typeof token], TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<keyof ER<{ [token]?: { id?: number } }>, TODO>>; // TODO(koan) @koan-error

// Union shapes stay distributed and are not merged into one all-key object.
type U = { kind: "a"; a?: number } | { kind: "b"; b?: string };
type _E21 = Expect<Equal<ER<U>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<keyof ER<U>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<ER<U>["kind"], TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<{ kind: "a"; a: 1 } extends ER<U> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<{ kind: "a" } extends ER<U> ? true : false, TODO>>; // TODO(koan) @koan-error

// Special source types retain explicit boundary behavior.
type _E26 = Expect<Equal<EAny<ER<any>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ER<unknown>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ER<never>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ER<{}>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ER<{ x?: never }>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: optional nested keys become required recursively.
type _DemoNested = Expect<Equal<ER<{ user?: { id?: number } }>, { user: { id: number } }>>;

// Pre-solved: explicit undefined remains in a required value domain.
type _DemoUndefined = Expect<Equal<ER<{ value?: string | undefined }>, { value: string | undefined }>>;

// Pre-solved: readonly is orthogonal to requiredness.
type _DemoReadonly = Expect<Equal<ER<{ readonly x?: number }>, { readonly x: number }>>;

declare const requiredValue: ER<{ nested?: { value?: number } }>;
// @ts-expect-error Requiredness prevents omitting the nested branch.
const missingNested: typeof requiredValue = {};
