import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-052 guided drills: indexed access plus mapping
 * =============================================================================
 * Preserve the current K until the relationship has been encoded. Then index
 * the finished mapped table to collect a union. Contrast that result with the
 * Cartesian combinations admitted when `keyof T` is substituted too early.
 */

type DValues<T> = T[keyof T];
type DDescriptors<T> = { [K in keyof T]-?: { key: K; value: T[K] } };
type DEntries<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T];
type DLoose<T> = [keyof T, T[keyof T]];
type DInvert<T extends Record<PropertyKey, PropertyKey>> = { [K in keyof T as T[K]]: K };

interface DModel { id: number; name: string; active: boolean; tags: string[] }

// Indexed value unions from complete and selected key sets.
type _D01 = Expect<Equal<DValues<DModel>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DModel["id" | "name"], TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DModel["active" | "tags"], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DValues<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DValues<{ a: "x"; b: "x" }>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DValues<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DValues<{}>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DValues<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DValues<Record<number, boolean>>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DValues<readonly ["a", 1]>, TODO>>; // TODO(koan) @koan-error

declare const dToken: unique symbol;
interface DMixed { text: string; 0: number; [dToken]: boolean }

// Descriptor tables preserve one K/T[K] pair at every property.
type _D11 = Expect<Equal<DDescriptors<DModel>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DDescriptors<DModel>["id"], TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DDescriptors<DModel>["name"]["value"], TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DDescriptors<DModel>["active"]["key"], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DDescriptors<DModel>[keyof DModel], TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<DDescriptors<{ one: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DDescriptors<{ value: string | number }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DDescriptors<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DDescriptors<{ readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DDescriptors<DMixed>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DDescriptors<DMixed>[0], TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DDescriptors<DMixed>[typeof dToken], TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DDescriptors<{}>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DDescriptors<Record<string, Date>>[string], TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DDescriptors<Record<number, bigint>>[number], TODO>>; // TODO(koan) @koan-error

// Map-then-index creates correlated tuple unions.
type _D26 = Expect<Equal<DEntries<DModel>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<Extract<DEntries<DModel>, ["id", unknown]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<Extract<DEntries<DModel>, ["name", unknown]>[1], TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<Extract<DEntries<DModel>, ["tags", unknown]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DEntries<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DEntries<{ a: "x"; b: "x" }>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DEntries<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DEntries<{ readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DEntries<DMixed>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<Extract<DEntries<DMixed>, [0, unknown]>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<Extract<DEntries<DMixed>, [typeof dToken, unknown]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DEntries<{}>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DEntries<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DEntries<Record<number, boolean>>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DEntries<{ nested: { a: 1 }; list: string[] }>, TODO>>; // TODO(koan) @koan-error

// Loose pairs admit unrelated combinations because both slots are unions.
type _D41 = Expect<Equal<DLoose<DModel>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DLoose<DModel>[0], TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DLoose<DModel>[1], TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<["id", string] extends DLoose<DModel> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<["active", string[]] extends DLoose<DModel> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<["id", string] extends DEntries<DModel> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<["active", boolean] extends DEntries<DModel> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DLoose<{ a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DLoose<{}>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DLoose<DMixed>, TODO>>; // TODO(koan) @koan-error

// Value-driven remapping inverts finite PropertyKey lookup tables.
type _D51 = Expect<Equal<DInvert<{ ok: 200; missing: 404 }>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<keyof DInvert<{ ok: 200; missing: 404 }>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DInvert<{ a: "x"; b: "y" }>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DInvert<{ a: "same"; b: "same" }>["same"], TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DInvert<{ 0: "zero"; 1: "one" }>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DInvert<{ [dToken]: "token" }>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DInvert<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DInvert<{}>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DInvert<{ negative: -1; zero: 0 }>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DInvert<{ first: typeof dToken; second: "text" }>, TODO>>; // TODO(koan) @koan-error
