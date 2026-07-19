import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-042 drills: repeat add/remove operations, combinations, compositions, containers, and undefined values. */

type DMutable<T> = { -readonly [K in keyof T]: T[K] };
type DRequired<T> = { [K in keyof T]-?: T[K] };
type DReadonly<T> = { +readonly [K in keyof T]: T[K] };
type DOptional<T> = { [K in keyof T]+?: T[K] };
type DMutableRequired<T> = { -readonly [K in keyof T]-?: T[K] };
type DReadonlyOptional<T> = { +readonly [K in keyof T]+?: T[K] };

interface DSource { readonly id: number; readonly name?: string; active?: boolean; count: number }

// Group 1: Add readonly and optionality independently.
type _D001 = Expect<Equal<DReadonly<DSource>, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<DOptional<DSource>, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<DReadonlyOptional<DSource>, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<DReadonly<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<DOptional<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<DReadonlyOptional<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<DReadonly<{ id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<DOptional<{ readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<DReadonly<DOptional<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<DOptional<DReadonly<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<DReadonly<{}>, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<DOptional<{}>, TODO>>; // TODO(koan) @koan-error

// Group 2: Remove readonly and optionality independently.
type _D013 = Expect<Equal<DMutable<DSource>, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<DRequired<DSource>, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<DMutableRequired<DSource>, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<DMutable<{ readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<DRequired<{ id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<DMutableRequired<{ readonly id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<DMutable<{ readonly id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<DRequired<{ readonly id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<DMutable<DRequired<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<DRequired<DMutable<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<DMutable<{}>, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<DRequired<{}>, TODO>>; // TODO(koan) @koan-error

// Group 3: Same-axis composition is idempotent; opposite operations obey the last transform.
type _D025 = Expect<Equal<DMutable<DMutable<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<DReadonly<DReadonly<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<DRequired<DRequired<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<DOptional<DOptional<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<DMutable<DReadonly<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<DReadonly<DMutable<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<DRequired<DOptional<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<DOptional<DRequired<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<DMutableRequired<DReadonlyOptional<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<DReadonlyOptional<DMutableRequired<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<DMutable<DReadonlyOptional<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<DRequired<DReadonlyOptional<DSource>>, TODO>>; // TODO(koan) @koan-error

// Group 4: Optional markers and explicit undefined are separate dimensions.
interface DUndefined {
  optional?: string;
  explicit: string | undefined;
  both?: string | undefined;
  readonly fixed: number | undefined;
}
type _D037 = Expect<Equal<DRequired<DUndefined>, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<DRequired<DUndefined>["optional"], TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<DRequired<DUndefined>["explicit"], TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<DRequired<DUndefined>["both"], TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<DOptional<DUndefined>, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<DOptional<DUndefined>["explicit"], TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<DMutableRequired<DUndefined>, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<DReadonlyOptional<DUndefined>, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<Partial<DSource>, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<Required<DSource>, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<Readonly<DSource>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<DMutable<Readonly<DSource>>, TODO>>; // TODO(koan) @koan-error

// Group 5: Homomorphic modifier transforms specialize arrays and tuples.
type _D049 = Expect<Equal<DReadonly<string[]>, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<DMutable<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<DReadonly<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<DMutable<readonly ["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<DOptional<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<DRequired<[string?, number?]>, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<DReadonly<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<DMutable<string[]>, TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<DMutableRequired<readonly ["a"?, 1?]>, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<DReadonlyOptional<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<DMutableRequired<never>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<DReadonlyOptional<unknown>, TODO>>; // TODO(koan) @koan-error
