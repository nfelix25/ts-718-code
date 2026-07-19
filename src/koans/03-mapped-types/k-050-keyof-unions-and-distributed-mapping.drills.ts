import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-050 guided drills: keyof unions and distributed mapping
 * =============================================================================
 * First compute the member key sets. Then decide whether the question asks for
 * their intersection (`keyof U`) or union (distribute `keyof`). Only after that
 * should you construct the mapped output.
 */

type DCommonKeys<T> = keyof T;
type DAllKeys<T> = T extends unknown ? keyof T : never;
type DCommonRecord<T, Value> = Record<keyof T, Value>;
type DDistributedRecord<T, Value> = T extends unknown ? Record<keyof T, Value> : never;
type DValueAt<T, K extends PropertyKey> = T extends unknown ? K extends keyof T ? T[K] : never : never;
type DOptionalView<T> = { [K in DAllKeys<T>]?: DValueAt<T, K> };

type DVariant =
  | { kind: "left"; common: string; left: number }
  | { kind: "right"; common: string; right: boolean };

// Common-key intersections across disjoint, overlapping, and nested unions.
type _D01 = Expect<Equal<DCommonKeys<DVariant>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<keyof ({ a: 1 } | { b: 2 }), TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<keyof ({ a: 1; c: 3 } | { b: 2; c: 4 }), TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<keyof ({ a: 1; b: 2 } | { a: 3 }), TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<keyof ({ kind: "a" } | { kind: "b" } | { kind: "c" }), TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DVariant["kind"], TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DVariant["common"], TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<keyof ({ nested: { a: 1 } } | { nested: { b: 2 } }), TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<({ nested: { a: 1 } } | { nested: { b: 2 } })["nested"], TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<keyof ({ x?: string } | { x: string; y: number }), TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<({ x?: string } | { x: string; y: number })["x"], TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<keyof ({ readonly id: 1 } | { id: 2 }), TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<keyof ({} | { id: string }), TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<keyof ({ 0: string; x: 1 } | { 0: number; y: 2 }), TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<({ 0: string; x: 1 } | { 0: number; y: 2 })[0], TODO>>; // TODO(koan) @koan-error

// Distributed keyof unions every member's contribution.
type _D16 = Expect<Equal<DAllKeys<DVariant>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DAllKeys<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DAllKeys<{ a: 1; c: 3 } | { b: 2; c: 4 }>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DAllKeys<{ a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DAllKeys<never>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DAllKeys<unknown>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DAllKeys<{}>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DAllKeys<{} | { id: string }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DAllKeys<{ x?: string } | { y?: number }>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DAllKeys<{ 0: string } | { 1: number }>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DAllKeys<{ readonly id: 1 } | { name: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DAllKeys<DVariant> & string, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<Extract<DAllKeys<DVariant>, "left" | "right">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<Exclude<DAllKeys<DVariant>, keyof DVariant>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DAllKeys<{ a: 1 } | { a: 2; b: 3 } | { c: 4 }>, TODO>>; // TODO(koan) @koan-error

// Common records and distributed records encode different outer structures.
type _D31 = Expect<Equal<DCommonRecord<DVariant, boolean>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<keyof DCommonRecord<DVariant, boolean>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DDistributedRecord<DVariant, boolean>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<keyof DDistributedRecord<DVariant, boolean>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<Extract<DDistributedRecord<DVariant, boolean>, { left: boolean }>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DCommonRecord<{ a: 1 } | { b: 2 }, 0>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DDistributedRecord<{ a: 1 } | { b: 2 }, 0>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<keyof DDistributedRecord<{ a: 1 } | { b: 2 }, 0>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DCommonRecord<{ a: 1; c: 3 } | { b: 2; c: 4 }, string>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DDistributedRecord<{ a: 1; c: 3 } | { b: 2; c: 4 }, string>, TODO>>; // TODO(koan) @koan-error

// Per-member value lookup and flattened optional views cover every key.
type _D41 = Expect<Equal<DValueAt<DVariant, "kind">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DValueAt<DVariant, "left">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DValueAt<DVariant, "right">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DValueAt<DVariant, "missing">, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DValueAt<{ a: 1 } | { a: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DValueAt<{ x?: string } | { x: number }, "x">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DOptionalView<DVariant>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<keyof DOptionalView<DVariant>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DOptionalView<DVariant>["left"], TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DOptionalView<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DOptionalView<{ x: string } | { x: number; y: boolean }>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<Required<DOptionalView<{ a: 1 } | { b: 2 }>>, TODO>>; // TODO(koan) @koan-error

declare const dOne: unique symbol;
declare const dTwo: unique symbol;
type DSymbolUnion = { [dOne]: string; common: 1 } | { [dTwo]: number; common: 2 };

// Symbol, broad-index, top, bottom, and poison inputs complete the matrix.
type _D53 = Expect<Equal<keyof DSymbolUnion, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DAllKeys<DSymbolUnion>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DValueAt<DSymbolUnion, typeof dOne>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DOptionalView<DSymbolUnion>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<keyof (Record<string, number> | { fixed: 1 }), TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DAllKeys<Record<string, number> | { fixed: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DAllKeys<unknown | { id: string }>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DAllKeys<any | { id: string }>, TODO>>; // TODO(koan) @koan-error
