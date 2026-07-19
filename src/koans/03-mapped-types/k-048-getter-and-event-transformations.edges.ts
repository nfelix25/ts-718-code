import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-048 edge cases: getter and event transformations
 * =============================================================================
 * Generated APIs encode policy, not just syntax. These cases stress whether
 * methods are optional, whether readonly survives, which key families receive
 * names, how normalized names collide, and how callable parameter types retain
 * union, unknown, never, and any source values.
 */

type EGetters<T> = {
  -readonly [K in keyof T as K extends string ? `get${Capitalize<K>}` : never]-?: () => T[K]
};
type EPreservedGetters<T> = {
  [K in keyof T as K extends string ? `get${Capitalize<K>}` : never]: () => T[K]
};
type ESetters<T> = {
  -readonly [K in keyof T as K extends string ? `set${Capitalize<K>}` : never]-?: (value: T[K]) => void
};
type EChanges<T> = {
  -readonly [K in keyof T as K extends string ? `${K}Changed` : never]-?: (next: T[K], previous: T[K]) => void
};
type EIsAny<T> = 0 extends (1 & T) ? true : false;

interface EOptionalModel {
  readonly required: number;
  readonly optional?: string;
  explicit: string | undefined;
}

// Generated required methods differ from mappings that preserve source modifiers.
type _E01 = Expect<Equal<EGetters<EOptionalModel>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EPreservedGetters<EOptionalModel>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ReturnType<EGetters<EOptionalModel>["getOptional"]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<Parameters<ESetters<EOptionalModel>["setOptional"]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Parameters<EChanges<EOptionalModel>["optionalChanged"]>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ReturnType<EGetters<EOptionalModel>["getExplicit"]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<keyof Required<EPreservedGetters<EOptionalModel>>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<Readonly<EGetters<EOptionalModel>>, TODO>>; // TODO(koan) @koan-error

// Capitalization collisions merge callable value types at one destination.
type EGetterCollision = EGetters<{ name: string; Name: number }>;
type EEventCollision = { [K in "state" | "State" as `${Capitalize<K>}Changed`]: (value: K) => void };
type _E09 = Expect<Equal<EGetterCollision, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EGetterCollision["getName"], TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<ReturnType<EGetterCollision["getName"]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EEventCollision["StateChanged"], TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EGetters<{ getName: string }>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<keyof (EGetters<{ x: 1 }> & ESetters<{ x: 1 }> & EChanges<{ x: 1 }>), TODO>>; // TODO(koan) @koan-error

declare const eSymbol: unique symbol;
interface EMixed {
  text: string;
  0: number;
  [eSymbol]: boolean;
}

// Text naming filters non-string keys; a separate branch can preserve them.
type _E15 = Expect<Equal<EGetters<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<keyof EChanges<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<{ [K in keyof EMixed as K extends string ? `get${Capitalize<K>}` : K]: () => EMixed[K] }, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<{ [K in keyof EMixed as K extends number ? `get${K}` : never]: () => EMixed[K] }, TODO>>; // TODO(koan) @koan-error

// Broad, empty, function, tuple, and special values widen or collapse surfaces.
type _E19 = Expect<Equal<keyof EGetters<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<keyof EChanges<Record<string, boolean>>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EChanges<Record<string, boolean>>[`${string}Changed`], TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EGetters<{}>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EGetters<unknown>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EGetters<never>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EIsAny<EGetters<any>>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<keyof EGetters<() => void>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<keyof EGetters<readonly ["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<Parameters<ESetters<{ value: string | number }>["setValue"]>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<Parameters<EChanges<{ value: unknown }>["valueChanged"]>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<Parameters<EChanges<{ value: never }>["valueChanged"]>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: removing optionality creates a required method, not a default value.
type DemoRequiredGetter = EGetters<{ label?: string }>;
type _DemoRequiredGetter = Expect<Equal<keyof DemoRequiredGetter, "getLabel">>;

// Pre-solved: generated names can be used to derive a finite event-name union.
type DemoEvents = keyof EChanges<{ count: number; active: boolean }>;
type _DemoEvents = Expect<Equal<DemoEvents, "countChanged" | "activeChanged">>;

// Pre-solved: numeric and symbol fields are absent under the string-only policy.
type DemoMixedGetterKeys = keyof EGetters<EMixed>;
type _DemoMixedGetterKeys = Expect<Equal<DemoMixedGetterKeys, "getText">>;

// A callback using the wrong generated value type is rejected.
const invalidHandler: EChanges<{ count: number }> = {
  // @ts-expect-error The generated count handler receives numbers, not strings.
  countChanged: (next: string) => { void next; },
};
void invalidHandler;
