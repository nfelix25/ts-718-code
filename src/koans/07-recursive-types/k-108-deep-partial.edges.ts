import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-108 edge cases: DeepPartial
 * =============================================================================
 * Patch types weaken discriminants, exact optional writes still differ from
 * reads, arrays need a merge policy, and built-ins must stop before their method
 * surfaces are recursively optionalized.
 */

type EP = string | number | boolean | bigint | symbol | null | undefined;
type EA = EP | Date | RegExp | ((...args: any[]) => unknown) | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type EAny<T> = 0 extends (1 & T) ? true : false;
type ED<T> = EAny<T> extends true ? any : T extends EA ? T : T extends readonly unknown[] ? number extends T["length"] ? T extends unknown[] ? ED<T[number]>[] : readonly ED<T[number]>[] : { [K in keyof T]?: ED<T[K]> } : T extends object ? { [K in keyof T]?: ED<T[K]> } : T;

// Optional reads include undefined while exact optional writes remain constrained.
type P = ED<{ nested: { value: number } }>;
type _E01 = Expect<Equal<P["nested"], TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<NonNullable<P["nested"]>["value"], TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<{ nested: undefined } extends P ? true : false, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<{} extends P ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<{ nested: {} } extends P ? true : false, TODO>>; // TODO(koan) @koan-error

// Partializing a discriminated union makes the tag itself optional.
type State = { kind: "idle" } | { kind: "ready"; data: { value: number } };
type _E06 = Expect<Equal<ED<State>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ED<State>["kind"], TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<{} extends ED<State> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<{ kind: "ready"; data: {} } extends ED<State> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<{ kind: "other" } extends ED<State> ? true : false, TODO>>; // TODO(koan) @koan-error

// Tuple optionality and array element transformation are distinct policies.
type _E11 = Expect<Equal<ED<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ED<number[]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ED<[1, 2]>["length"], TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ED<number[]>["length"], TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ED<readonly [1, 2]> extends readonly unknown[] ? true : false, TODO>>; // TODO(koan) @koan-error

// Atomic policy keeps method-bearing values intact.
type _E16 = Expect<Equal<ED<Date>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ED<() => string>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ED<Map<string, { id: number }>>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<ED<Promise<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ED<{ date: Date; data: { id: number } }>, TODO>>; // TODO(koan) @koan-error

// Index signatures and symbols participate through their declared keys.
declare const token: unique symbol;
type Indexed = { [key: string]: { value: number } };
type Symbolic = { [token]: { value: number }; name: string };
type _E21 = Expect<Equal<ED<Indexed>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<ED<Indexed>[string], TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<ED<Symbolic>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<ED<Symbolic>[typeof token], TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<keyof ED<Symbolic>, TODO>>; // TODO(koan) @koan-error

// Special source types follow explicit boundaries.
type _E26 = Expect<Equal<EAny<ED<any>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ED<unknown>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ED<never>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ED<{}>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ED<Record<string, never>>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: nested object keys become optional recursively.
type _DemoNested = Expect<Equal<ED<{ user: { id: number } }>, { user?: { id?: number } }>>;

// Pre-solved: a mutable array remains mutable while its elements transform.
type _DemoArray = Expect<Equal<ED<Array<{ id: number }>>, Array<{ id?: number }>>>;

// Pre-solved: Date is an opaque identity leaf.
type _DemoDate = Expect<Equal<ED<Date>, Date>>;

declare const exactPatch: ED<{ nested: { value: number } }>;
// @ts-expect-error Exact optional properties reject explicitly writing undefined.
exactPatch.nested = undefined;
