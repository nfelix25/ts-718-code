import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-107 edge cases: recursion base cases and leaves
 * =============================================================================
 * Any must be intercepted before recursive conditionals, empty containers yield
 * never, unknown stops as an unknown leaf, and opaque-object policy determines
 * whether built-in method surfaces are traversed or preserved.
 */

type EP = string | number | boolean | bigint | symbol | null | undefined;
type EA = EP | Date | RegExp | ((...args: any[]) => unknown) | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type EAny<T> = 0 extends (1 & T) ? true : false;
type EL<T> = EAny<T> extends true ? any : T extends EA ? T : T extends readonly (infer E)[] ? EL<E> : T extends object ? { [K in keyof T]: EL<T[K]> }[keyof T] : T;

// Special top and bottom types follow deliberately different paths.
type _E01 = Expect<Equal<EAny<EL<any>>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EL<unknown>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EL<never>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EL<any[]> extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EL<unknown[]>, TODO>>; // TODO(koan) @koan-error

// Empty keys or element domains contribute no leaf values.
type _E06 = Expect<Equal<EL<{}>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EL<[]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EL<never[]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EL<Record<string, never>>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EL<{ value: never }>, TODO>>; // TODO(koan) @koan-error

// Optional properties contribute undefined through indexed read types.
type _E11 = Expect<Equal<EL<{ x?: string }>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EL<{ x?: never }>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EL<{ x?: unknown }>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EAny<EL<{ x?: any }>>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EL<{ x: string | undefined }>, TODO>>; // TODO(koan) @koan-error

// Opaque built-ins remain whole leaves rather than exposing their method values.
type _E16 = Expect<Equal<EL<Date>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EL<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EL<Set<boolean>>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EL<Promise<1>>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EL<() => string>, TODO>>; // TODO(koan) @koan-error

// Intersections and unions can change which branch is selected.
type _E21 = Expect<Equal<EL<{ x: 1 } & { y: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EL<{ x: 1 } | { y: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EL<Date & { tag: "x" }>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EL<string & { tag: "x" }>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EL<unknown | { x: 1 }>, TODO>>; // TODO(koan) @koan-error

// Runtime traversal needs a cycle policy independent of the static leaf union.
interface Cycle { value: number; next: Cycle }
type _E26 = Expect<Equal<EL<Cycle>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<Cycle["value"], TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<Cycle["next"], TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<keyof Cycle, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<Cycle extends { value: number; next: object } ? true : false, TODO>>; // TODO(koan) @koan-error

// Pre-solved: an empty object exposes no property leaves.
type _DemoEmptyObject = Expect<Equal<EL<{}>, never>>;

// Pre-solved: optional properties contribute undefined to the leaf union.
type _DemoOptional = Expect<Equal<EL<{ value?: string }>, string | undefined>>;

// Pre-solved: Date is retained as one opaque leaf by policy.
type _DemoDate = Expect<Equal<EL<Date>, Date>>;

declare function acceptsLeaves<T>(value: EL<T>): void;
// @ts-expect-error Object containers are traversed; the leaf is number, not the wrapper.
acceptsLeaves<{ value: number }>({ value: 1 });
