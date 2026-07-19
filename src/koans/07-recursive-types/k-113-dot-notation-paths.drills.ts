import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { DotPaths } from "./k-113-dot-notation-paths.js";

/**
 * GUIDED DRILLS
 * Vary one axis at a time: depth, width, optionality, unions, leaf policy,
 * records, and composition. Say each expected union aloud before replacing TODO.
 */

type D<T> = DotPaths<T>;

// Flat and nested shapes (1-12)
type _01 = Expect<Equal<D<{}>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<D<{ a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<D<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<D<{ a: { b: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<D<{ a: { b: { c: 1 } } }>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<D<{ a: { b: { c: { d: 1 } } } }>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<D<{ a: { x: 1; y: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<D<{ a: { x: 1 }; b: { y: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<D<{ a: { x: { p: 1 }; y: { q: 2 } } }>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<D<{ a: { b: 1 }; c: 2 }>, "a" | `a.${string}`>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Exclude<D<{ a: { b: 1 }; c: 2 }>, `a.${string}`>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<D<{ 0: { x: 1 }; named: 2 }>, TODO>>; // TODO(koan) @koan-error

// Optional, nullable, and readonly properties (13-24)
type _13 = Expect<Equal<D<{ a?: 1 }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<D<{ a?: { b: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<D<{ a: { b?: { c: 1 } } }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<D<{ a: null | { b: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<D<{ a: undefined | { b: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<D<{ a: false | { b: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<D<{ readonly a: { readonly b: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<D<Readonly<{ a: { b: 1 } }>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<D<Partial<{ a: { b: 1 }; c: { d: 2 } }>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<D<Required<{ a?: { b?: 1 } }>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<D<{ a: { b: string | undefined } }>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<D<{ a: { b: never } }>, TODO>>; // TODO(koan) @koan-error

// Leaves and containers (25-36)
type _25 = Expect<Equal<D<string>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<D<() => { hidden: 1 }>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<D<Date>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<D<RegExp>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<D<Promise<{ value: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<D<string[]>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<D<readonly [{ x: 1 }]>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<D<Map<string, { x: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<D<ReadonlyMap<string, { x: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<D<Set<{ x: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<D<WeakMap<object, { x: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<D<{ list: { x: 1 }[]; meta: { count: number } }>, TODO>>; // TODO(koan) @koan-error

// Object unions and intersections (37-48)
type _37 = Expect<Equal<D<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<D<{ a: { x: 1 } } | { a: { y: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<D<{ kind: "a"; a: 1 } | { kind: "b"; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Extract<D<{ a: { x: 1 } } | { b: { y: 2 } }>, `${string}.x`>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<D<{ a: 1 } & { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<D<{ a: { x: 1 } } & { b: { y: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<D<{ value: { a: 1 } | { b: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<D<{ value: { common: 0; a: 1 } | { common: 0; b: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<D<never>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<D<unknown>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<D<any>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<D<{ value: any }>, TODO>>; // TODO(koan) @koan-error

// Records and realistic models (49-60)
type _49 = Expect<Equal<D<Record<"a" | "b", { id: string }>>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<D<Record<string, { id: string }>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<D<{ [key: string]: number }>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<D<{ [key: string]: { enabled: boolean } }>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<D<{ user: { identity: { id: string }; roles: string[] } }>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<D<{ request: { headers: Record<string, string>; body: { id: number } } }>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<D<{ form: { name?: string; address?: { city: string } } }>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<D<{ config: { retry: { count: number; delay: number }; tags: string[] } }>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extract<D<{ api: { v1: { users: { enabled: boolean } } } }>, `api.v1.${string}`>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Exclude<D<{ public: { id: 1 }; private: { token: string } }>, `private.${string}`>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<D<Pick<{ a: { x: 1 }; b: { y: 2 } }, "a">>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<D<Omit<{ a: { x: 1 }; b: { y: 2 } }, "a">>, TODO>>; // TODO(koan) @koan-error
