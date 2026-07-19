import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-040 drills: repeat finite, object-derived, dependent, generic, and broad key mappings. */

// Group 1: Finite literal unions expand into named properties.
type D001 = { [K in "a"]: number };
type D002 = { [K in "a" | "b"]: number };
type D003 = { [K in 0 | 1]: string };
declare const dSymbolA: unique symbol;
declare const dSymbolB: unique symbol;
type D004 = { [K in typeof dSymbolA | typeof dSymbolB]: boolean };
type _D001 = Expect<Equal<D001, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<D002, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<D003, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<D004, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<keyof D001, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<keyof D002, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<keyof D003, TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<keyof D004, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<D002["a"], TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<D003[0], TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<D004[typeof dSymbolA], TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<{ [K in never]: string }, TODO>>; // TODO(koan) @koan-error

// Group 2: keyof supplies the iteration domain of object shapes.
interface DUser { id: number; name: string; active: boolean }
interface DConfig { host: string; port: number }
type DFlags<T> = { [K in keyof T]: boolean };
type DStrings<T> = { [K in keyof T]: string };
type _D013 = Expect<Equal<DFlags<DUser>, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<DStrings<DUser>, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<DFlags<DConfig>, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<keyof DFlags<DUser>, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<keyof DStrings<DConfig>, TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<DFlags<{}>, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<DFlags<unknown>, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<DFlags<never>, TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<DFlags<{ 0: string; 1: number }>, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<DFlags<{ [dSymbolA]: string }>, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<DStrings<{ readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<DStrings<{ name?: string }>, TODO>>; // TODO(koan) @koan-error

// Group 3: K can determine each emitted value type.
type DIdentity<T> = { [K in keyof T]: T[K] };
type DKeyName<T> = { [K in keyof T]: K };
type DTupled<T> = { [K in keyof T]: [K, T[K]] };
type _D025 = Expect<Equal<DIdentity<DUser>, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<DIdentity<DConfig>, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<DKeyName<DUser>, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<DKeyName<DConfig>, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<DTupled<DUser>, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<DTupled<DConfig>, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<DIdentity<DUser>["id"], TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<DKeyName<DUser>["name"], TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<DTupled<DConfig>["port"], TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<DIdentity<{ value: string | number }>, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<DKeyName<{ 0: string }>, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<DTupled<{ [dSymbolA]: Date }>, TODO>>; // TODO(koan) @koan-error

// Group 4: Generic key domains behave like reusable Record constructors.
type DRecord<K extends PropertyKey, V> = { [P in K]: V };
type DKeyRecord<K extends PropertyKey> = { [P in K]: P };
type _D037 = Expect<Equal<DRecord<"x" | "y", number>, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<DRecord<1 | 2, string>, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<DRecord<typeof dSymbolA, boolean>, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<DRecord<never, string>, TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<DKeyRecord<"x" | "y">, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<DKeyRecord<1 | 2>, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<DKeyRecord<typeof dSymbolA>, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<keyof DRecord<string, number>, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<keyof DRecord<number, string>, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<keyof DRecord<symbol, boolean>, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<DRecord<PropertyKey, Date>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<PropertyKey, TODO>>; // TODO(koan) @koan-error

// Group 5: Broad domains, unions, intersections, and built-in Record comparisons.
type _D049 = Expect<Equal<{ [K in string]: number }, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<{ [K in number]: string }, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<{ [K in symbol]: boolean }, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<Record<"a" | "b", number>, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<Record<0 | 1, string>, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<Record<typeof dSymbolA, Date>, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<DRecord<"a", 1> & DRecord<"b", 2>, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<DRecord<"a" | "b", 1 | 2>["a"], TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<keyof DRecord<PropertyKey, unknown>, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<DRecord<keyof DUser, unknown>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<DIdentity<DRecord<"a", number>>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<DKeyName<DRecord<"a" | "b", unknown>>, TODO>>; // TODO(koan) @koan-error
