import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-052 edge cases: indexed access plus mapping
 * =============================================================================
 * Correlation depends on both the mapped table and the final index operation.
 * These cases stress optional properties, modifier removal, unions, containers,
 * broad indexes, special types, and value-to-key inversion collisions.
 */

type EValues<T> = T[keyof T];
type EEntries<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T];
type ELeakyEntries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
type ELoose<T> = [keyof T, T[keyof T]];
type EInvert<T extends Record<PropertyKey, PropertyKey>> = { [K in keyof T as T[K]]: K };
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Optional mapped properties leak undefined when the intermediate table is read.
type _E01 = Expect<Equal<EEntries<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ELeakyEntries<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EEntries<{ required: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ELeakyEntries<{ a?: 1; b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Exclude<ELeakyEntries<{ a?: 1 }>, undefined>, TODO>>; // TODO(koan) @koan-error

type EVariant = { kind: "a"; a: number } | { kind: "b"; b: string };

// A union table can only be indexed directly through keys common to its members.
type _E06 = Expect<Equal<EValues<EVariant>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EEntries<EVariant>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EEntries<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ELoose<EVariant>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<["kind", number] extends ELoose<EVariant> ? true : false, TODO>>; // TODO(koan) @koan-error

// Arrays and tuples bring numeric indices plus named container properties.
type _E11 = Expect<Equal<EValues<readonly ["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<Extract<EEntries<readonly ["a", 1]>, ["0", unknown]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Extract<EEntries<readonly ["a", 1]>, ["length", unknown]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<Extract<EEntries<string[]>, [number, unknown]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EValues<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EEntries<Record<number, boolean>>, TODO>>; // TODO(koan) @koan-error

declare const eToken: unique symbol;
interface EMixed { text: string; 0: number; [eToken]: boolean }

// All PropertyKey families retain correlation in the mapped table.
type _E17 = Expect<Equal<EEntries<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<Extract<EEntries<EMixed>, [typeof eToken, unknown]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EValues<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ELoose<EMixed>, TODO>>; // TODO(koan) @koan-error

// Empty, top, bottom, and poison types affect both map and final index.
type _E21 = Expect<Equal<EEntries<{}>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EEntries<unknown>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EEntries<never>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EIsAny<EValues<any>>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EIsAny<EEntries<any>>, TODO>>; // TODO(koan) @koan-error

// Inversion merges duplicate destinations and widens broad value domains.
type _E26 = Expect<Equal<EInvert<{ a: "same"; b: "same" }>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EInvert<{ a: "same"; b: "same" }>["same"], TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<keyof EInvert<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EInvert<{ zero: 0; text: "0" }>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EInvert<{ token: typeof eToken; name: "token" }>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: map then index retains exact pairs.
type DemoEntries = EEntries<{ id: number; name: string }>;
type _DemoEntries = Expect<Equal<DemoEntries, ["id", number] | ["name", string]>>;

// Pre-solved: removing optionality from the table prevents an extra union member.
type _DemoNoLeak = Expect<Equal<EEntries<{ value?: string }>, ["value", string | undefined]>>;

// Pre-solved: duplicate inverted values merge source keys statically.
type DemoCollision = EInvert<{ first: "same"; second: "same" }>;
type _DemoCollision = Expect<Equal<DemoCollision["same"], "first" | "second">>;

// Values used as destinations must be PropertyKeys.
type InvalidInvert = {
  // @ts-expect-error Object values cannot become mapped property names.
  [K in keyof { bad: { nested: true } } as { bad: { nested: true } }[K]]: K
};
