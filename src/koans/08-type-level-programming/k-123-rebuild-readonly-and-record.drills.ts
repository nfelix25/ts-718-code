import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanReadonly, KoanRecord } from "./k-123-rebuild-readonly-and-record.js";

/** GUIDED DRILLS: vary modifiers, shallow values, containers, key domains, and composition. */

type RO<T> = KoanReadonly<T>;
type Rec<K extends PropertyKey, V> = KoanRecord<K, V>;

// Readonly object fundamentals (1-12)
type _01 = Expect<Equal<RO<{ a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<RO<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<RO<{}>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<RO<{ a?: 1 }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<RO<{ readonly a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<RO<RO<{ a: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof RO<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<RO<{ a: 1 }>["a"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<RO<{ a?: 1 }>["a"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Required<RO<{ a?: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Partial<RO<{ a: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<RO<Readonly<{ a: 1 }>>, TODO>>; // TODO(koan) @koan-error

// Shallow values, arrays, and tuples (13-24)
type _13 = Expect<Equal<RO<{ nested: { value: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<RO<{ nested: { value: 1 } }>["nested"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<RO<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<RO<readonly [string, number]>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<RO<[name: string, age?: number]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<RO<string[]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<RO<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<RO<Array<{ id: number }>>[number], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<RO<[]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<RO<readonly []>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<RO<{ list: number[] }>["list"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<RO<Promise<{ value: 1 }>>, TODO>>; // TODO(koan) @koan-error

// Finite Record vocabularies (25-36)
type _25 = Expect<Equal<Rec<"a", number>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Rec<"a" | "b", number>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Rec<"idle" | "busy" | "done", boolean>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Rec<never, number>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<keyof Rec<"a" | "b", number>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Rec<"a" | "b", number>["a"], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Rec<"a" | "b", 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Rec<"a", never>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Rec<"a", unknown>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Rec<"a", any>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Partial<Rec<"a" | "b", number>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<RO<Rec<"a" | "b", number>>, TODO>>; // TODO(koan) @koan-error

// Number, symbol, and broad key domains (37-48)
declare const first: unique symbol;
declare const second: unique symbol;
type _37 = Expect<Equal<Rec<0, string>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Rec<0 | 1, string>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Rec<typeof first, number>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Rec<typeof first | typeof second, number>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Rec<string, number>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Rec<number, string>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Rec<symbol, boolean>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Rec<string | number, unknown>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Rec<PropertyKey, unknown>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<keyof Rec<string, number>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<keyof Rec<number, string>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<keyof Rec<symbol, boolean>, TODO>>; // TODO(koan) @koan-error

// Composition, unions, and special sources (49-60)
type Variant = { kind: "a"; a: 1 } | { kind: "b"; b: 2 };
type _49 = Expect<Equal<RO<Variant>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<RO<never>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<RO<unknown>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<RO<any>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Rec<"a", RO<{ value: number }>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<RO<Rec<"a", { value: number }>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Required<RO<Rec<"a", number>>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Partial<RO<Rec<"a" | "b", number>>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Rec<keyof { a: 1; b: 2 }, string>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<RO<Rec<keyof Variant, string>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Rec<Extract<keyof any, string>, number>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Rec<Exclude<PropertyKey, symbol>, number>, TODO>>; // TODO(koan) @koan-error
