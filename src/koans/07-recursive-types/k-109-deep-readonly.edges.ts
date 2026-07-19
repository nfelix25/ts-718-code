import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-109 edge cases: DeepReadonly
 * =============================================================================
 * Type-level readonly is a capability view, not runtime freezing. Opaque leaves
 * keep internal mutators, optionality remains optional, and structural variance
 * means readonly inputs and outputs need deliberate API boundaries.
 */

type EP = string | number | boolean | bigint | symbol | null | undefined;
type EA = EP | Date | RegExp | ((...args: any[]) => unknown) | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type EAny<T> = 0 extends (1 & T) ? true : false;
type ER<T> = EAny<T> extends true ? any : T extends EA ? T : T extends readonly unknown[] ? number extends T["length"] ? readonly ER<T[number]>[] : { readonly [K in keyof T]: ER<T[K]> } : T extends object ? { readonly [K in keyof T]: ER<T[K]> } : T;

// Readonly changes writes but preserves optional presence semantics.
type R = ER<{ nested?: { value: number } }>;
type _E01 = Expect<Equal<R["nested"], TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<NonNullable<R["nested"]>["value"], TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<{} extends R ? true : false, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<{ nested: { value: 1 } } extends R ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<{ nested: undefined } extends R ? true : false, TODO>>; // TODO(koan) @koan-error

// Discriminants remain required and readonly, unlike DeepPartial.
type State = { kind: "idle" } | { kind: "ready"; data: { value: number } };
type _E06 = Expect<Equal<ER<State>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ER<State>["kind"], TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<{} extends ER<State> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<{ kind: "ready"; data: { value: 1 } } extends ER<State> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<{ kind: "other" } extends ER<State> ? true : false, TODO>>; // TODO(koan) @koan-error

// Arrays and tuples both lose mutating methods but retain shape differences.
type _E11 = Expect<Equal<ER<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ER<number[]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ER<[1, 2]>["length"], TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ER<number[]>["length"], TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<"push" extends keyof ER<number[]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Opaque leaves retain mutating APIs by explicit policy.
type _E16 = Expect<Equal<ER<Date>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<"setTime" extends keyof ER<Date> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ER<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<"set" extends keyof ER<Map<string, number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<"add" extends keyof ER<Set<number>> ? true : false, TODO>>; // TODO(koan) @koan-error

// String, number, and symbol keys retain their identities and become readonly.
declare const token: unique symbol;
type Mixed = { 0: { id: number }; name: string; [token]: { active: boolean } };
type _E21 = Expect<Equal<ER<Mixed>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<ER<Mixed>[0], TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<ER<Mixed>[typeof token], TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<keyof ER<Mixed>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<ER<Record<string, { id: number }>>[string], TODO>>; // TODO(koan) @koan-error

// Special source types follow explicit boundaries.
type _E26 = Expect<Equal<EAny<ER<any>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ER<unknown>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ER<never>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ER<{}>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ER<Record<string, never>>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: object properties become recursively readonly.
type _DemoNested = Expect<Equal<ER<{ user: { id: number } }>, { readonly user: { readonly id: number } }>>;

// Pre-solved: mutable arrays become readonly arrays of transformed elements.
type _DemoArray = Expect<Equal<ER<Array<{ id: number }>>, readonly { readonly id: number }[]>>;

// Pre-solved: Date remains opaque and keeps its method surface.
type _DemoDate = Expect<Equal<ER<Date>, Date>>;

declare const readonlyValue: ER<{ nested: { value: number } }>;
// @ts-expect-error Deep readonly rejects writes at nested object layers.
readonlyValue.nested.value = 2;
