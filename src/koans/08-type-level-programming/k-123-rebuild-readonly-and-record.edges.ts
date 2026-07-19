import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanReadonly, KoanRecord } from "./k-123-rebuild-readonly-and-record.js";

/** EDGE CASES: shallow capabilities, structural extra keys, index domains, and runtime freeze. */

type RO<T> = KoanReadonly<T>;
type Rec<K extends PropertyKey, V> = KoanRecord<K, V>;
declare const token: unique symbol;

// Pre-solved demonstrations.
type _DemoReadonlyOptional = Expect<Equal<RO<{ value?: number }>, { readonly value?: number }>>;
type _DemoReadonlyShallow = Expect<Equal<RO<{ nested: { value: number } }>["nested"], { value: number }>>;
type _DemoEmptyRecord = Expect<Equal<Rec<never, number>, {}>>;
type _DemoFiniteRecord = Expect<Equal<Rec<"a" | "b", number>, { a: number; b: number }>>;
type _DemoSymbolRecord = Expect<Equal<Rec<typeof token, 1>, { [token]: 1 }>>;
type _DemoUnknownReadonly = Expect<Equal<RO<unknown>, {}>>;

// Readonly is compile-time capability unless runtime code also freezes.
declare const readonlyValue: RO<{ nested: { value: number } }>;
// @ts-expect-error the outer property cannot be reassigned.
readonlyValue.nested = { value: 2 };
readonlyValue.nested.value = 2;

// 1. Shallow readonly boundaries (1-8)
type _01 = Expect<Equal<RO<{ nested: { value: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<RO<{ nested: { value: 1 } }>["nested"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<RO<{ list: number[] }>["list"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<RO<{ readonly existing: 1; mutable: 2 }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<RO<{ optional?: 1 }>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<RO<RO<{ value: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<RO<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<RO<string[]>, TODO>>; // TODO(koan) @koan-error

// 2. Record is total but not exact (9-16)
type _09 = Expect<Equal<Rec<never, string>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Rec<"a", string>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Rec<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Partial<Rec<"a" | "b", string>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Required<Partial<Rec<"a" | "b", string>>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Rec<"a", string> & { extra: number }, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof (Rec<"a", string> & { extra: number }), TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Rec<"a" | "b", never>, TODO>>; // TODO(koan) @koan-error

// 3. Broad key domains produce index signatures (17-23)
type _17 = Expect<Equal<Rec<string, number>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Rec<number, string>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Rec<symbol, boolean>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof Rec<string, number>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<keyof Rec<number, string>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof Rec<symbol, boolean>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Rec<PropertyKey, unknown>, TODO>>; // TODO(koan) @koan-error

// 4. Composition and special inputs (24-30)
type _24 = Expect<Equal<RO<Rec<"a" | "b", number>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Rec<"a" | "b", RO<{ value: number }>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<RO<unknown>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<RO<never>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<RO<any>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<RO<{ [token]: { value: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Rec<typeof token, RO<{ value: 1 }>>, TODO>>; // TODO(koan) @koan-error
