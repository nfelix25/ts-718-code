import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-063 edge cases: unknown in conditional types
 * =============================================================================
 * Unknown is safe top, but normalization, variance, wrappers, utilities, and
 * inference expose different consequences. These cases stress when unknown
 * erases a union, when intersections recover capabilities, and when no inference
 * pattern can be justified.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EIsUnknown<T> = EIsAny<T> extends true ? false : unknown extends T ? true : false;
type EMap<T> = T extends unknown ? { value: T } : never;
type EReturn<T> = T extends (...args: any[]) => infer R ? R : never;
type EElement<T> = T extends readonly (infer V)[] ? V : never;

// Union absorption can erase members before a distributive helper sees them.
type _E01 = Expect<Equal<EMap<string | number>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EMap<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EMap<unknown & string>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EMap<never>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<[unknown] extends [string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<[string] extends [unknown] ? true : false, TODO>>; // TODO(koan) @koan-error

// Function return and parameter positions reveal covariance/contravariance.
type _E07 = Expect<Equal<(() => string) extends (() => unknown) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<(() => unknown) extends (() => string) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<((value: unknown) => void) extends ((value: string) => void) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<((value: string) => void) extends ((value: unknown) => void) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<Promise<string> extends Promise<unknown> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<Promise<unknown> extends Promise<string> ? true : false, TODO>>; // TODO(koan) @koan-error

// Inference patterns fail safely when unknown proves no required structure.
type _E13 = Expect<Equal<EReturn<unknown>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EReturn<() => unknown>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EElement<unknown>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EElement<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EElement<readonly [unknown, string]>, TODO>>; // TODO(koan) @koan-error

// Standard utilities and structural views preserve safe uncertainty.
type _E18 = Expect<Equal<Awaited<unknown>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<NonNullable<unknown>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<Exclude<unknown, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<Extract<unknown, {}>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<keyof unknown, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<keyof (unknown & { id: string }), TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<Record<string, unknown>[string], TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<{ value?: unknown }["value"], TODO>>; // TODO(koan) @koan-error

// Detector ordering and normalized combinations complete the top-type model.
type _E26 = Expect<Equal<EIsUnknown<unknown>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsUnknown<any>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EIsUnknown<unknown | never>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EIsUnknown<unknown & {}>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EIsUnknown<unknown | any>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: unknown absorbs a union before distribution can preserve string.
type _DemoAbsorption = Expect<Equal<EMap<unknown | string>, { value: unknown }>>;

// Pre-solved: intersecting with a required shape recovers its safe keys.
type _DemoIntersection = Expect<Equal<keyof (unknown & { id: string }), "id">>;

// Pre-solved: unknown cannot satisfy a callable inference pattern.
type _DemoNoReturn = Expect<Equal<EReturn<unknown>, never>>;

declare const boundary: unknown;
// @ts-expect-error Unknown must be narrowed before property access.
boundary.profile;
