import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-051 edge cases: string, number, and symbol keys
 * =============================================================================
 * Static key identity and runtime property storage overlap without being the
 * same model. These cases stress numeric/string spelling, index signatures,
 * arrays and tuples, unique-symbol restrictions, broad symbols, special types,
 * reflection API return types, and collisions introduced by remapping.
 */

type EStrings<T> = Extract<keyof T, string>;
type ENumbers<T> = Extract<keyof T, number>;
type ESymbols<T> = Extract<keyof T, symbol>;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Numeric spelling is coerced at runtime but retains nuanced static identity.
type _E01 = Expect<Equal<keyof { 0: string }, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<keyof { "0": string }, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<{ 0: string }["0"], TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<{ "0": string }[0], TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<{ 0: string } extends { "0": string } ? true : false, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<{ [K in 0 | "0" as `${K}`]: K }["0"], TODO>>; // TODO(koan) @koan-error

// Index-signature syntax, Record, and intersections expose different domains.
type _E07 = Expect<Equal<keyof { [key: string]: boolean }, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<keyof Record<string, boolean>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<keyof { [index: number]: string }, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<keyof ({ [index: number]: string } & { label: boolean }), TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<keyof ({ [key: string]: number } | { fixed: 1 }), TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<keyof ({ [key: symbol]: Date } & { name: string }), TODO>>; // TODO(koan) @koan-error

// Arrays and tuples mix number indexing with named infrastructure members.
type _E13 = Expect<Equal<ENumbers<string[]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<Extract<EStrings<string[]>, "length" | "push">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<Extract<keyof [string, number], "0" | "1" | number>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<[string, number]["0"], TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<(readonly ["a", "b"])[number], TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ESymbols<readonly unknown[]>, TODO>>; // TODO(koan) @koan-error

declare const eOne: unique symbol;
declare const eTwo: unique symbol;
type ESymbolsObject = { [eOne]: 1; [eTwo]: 2 };

// Unique and broad symbols differ in finiteness, not runtime identity semantics.
type _E19 = Expect<Equal<keyof ESymbolsObject, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ESymbols<ESymbolsObject>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<keyof Record<symbol, unknown>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<Record<symbol, string>[typeof eOne], TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<keyof ({ [eOne]: 1 } | { [eTwo]: 2 }), TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<keyof ({ [eOne]: 1 } & { [eTwo]: 2 }), TODO>>; // TODO(koan) @koan-error

// Special types, reflection APIs, and broad remaps round out the key model.
type _E25 = Expect<Equal<EStrings<any>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<ENumbers<never>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ESymbols<unknown>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ReturnType<typeof Object.keys>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ReturnType<typeof Reflect.ownKeys>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EIsAny<{ [K in keyof any]: K }[string]>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a numeric literal key and its string spelling index the same slot.
type _DemoNumericRead = Expect<Equal<{ 0: "zero" }["0"], "zero">>;

// Pre-solved: Object.keys excludes symbols, while Reflect.ownKeys includes them.
type _DemoObjectKeys = Expect<Equal<ReturnType<typeof Object.keys>, string[]>>;
type _DemoReflectKeys = Expect<Equal<ReturnType<typeof Reflect.ownKeys>, (string | symbol)[]>>;

// Pre-solved: stringifying 0 and "0" merges their source values.
type DemoCollision = { [K in 0 | "0" as `${K}`]: K };
type _DemoCollision = Expect<Equal<DemoCollision["0"], 0 | "0">>;

// @ts-expect-error A unique symbol type is only valid on const-like identities.
let invalidUnique: unique symbol;

// @ts-expect-error The Symbol wrapper object is not a PropertyKey type.
type InvalidWrapperKey = Record<Symbol, string>;
