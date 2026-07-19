import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { DistributedPick, KoanPick } from "./k-118-rebuild-pick.js";

/** GUIDED DRILLS: vary selected keys, modifiers, key domains, records, and unions. */

type P<T, K extends keyof T> = KoanPick<T, K>;
type DP<T, K extends PropertyKey> = DistributedPick<T, K>;

// Key-set fundamentals (1-12)
type _01 = Expect<Equal<P<{ a: 1 }, "a">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<P<{ a: 1; b: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<P<{ a: 1; b: 2 }, "b">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<P<{ a: 1; b: 2 }, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<P<{ a: 1; b: 2 }, never>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<P<{ a: 1; b: 2 }, keyof { a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof P<{ a: 1; b: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof P<{ a: 1; b: 2 }, never>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<P<{}, never>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<P<unknown, never>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<P<never, never>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<P<any, "x">, TODO>>; // TODO(koan) @koan-error

// Value lookup and composition (13-24)
type Model = { id: string; count: number; state: "idle" | "busy"; nested: { ok: boolean } };
type _13 = Expect<Equal<P<Model, "id">["id"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<P<Model, "count">["count"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<P<Model, "state">["state"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<P<Model, "nested">["nested"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<P<P<Model, "id" | "count">, "id">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<P<Model, Extract<keyof Model, "id" | "missing">>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<P<Model, Exclude<keyof Model, "nested">>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<P<Model, keyof Model>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<P<{ value: never }, "value">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<P<{ value: unknown }, "value">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<P<{ value: any }, "value">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<P<{ value: string | undefined }, "value">, TODO>>; // TODO(koan) @koan-error

// Modifier preservation (25-36)
type Source = { readonly id: string; name?: string; readonly flag?: boolean; count: number };
type _25 = Expect<Equal<P<Source, "id">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<P<Source, "name">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<P<Source, "flag">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<P<Source, "id" | "name" | "flag">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Required<P<Source, "name">>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Readonly<P<Source, "count">>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Partial<P<Source, "count">>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<P<Readonly<Source>, "count">, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<P<Required<Source>, "name">, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<P<Partial<Source>, "id" | "count">, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<P<{ a?: 1 | undefined }, "a">, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<P<{ readonly a: 1; b: 2 }, keyof { readonly a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error

// Number, symbol, and index-signature keys (37-48)
declare const first: unique symbol;
declare const second: unique symbol;
type Mixed = { 0: "zero"; 1?: "one"; name: string; [first]: 1; readonly [second]: 2 };
type _37 = Expect<Equal<P<Mixed, 0>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<P<Mixed, 1>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<P<Mixed, 0 | 1>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<P<Mixed, typeof first>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<P<Mixed, typeof second>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<P<Mixed, typeof first | typeof second>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<P<Record<string, number>, "x">, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<P<Record<number, string>, 0>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<P<{ [key: string]: number; fixed: 1 }, "fixed">, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<P<{ [key: string]: number }, string>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<P<{ [key: number]: string }, number>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<keyof P<Mixed, 0 | typeof first>, TODO>>; // TODO(koan) @koan-error

// Union surfaces and distributed picks (49-60)
type Variant = { kind: "a"; a: number; common: 0 } | { kind: "b"; b: string; common: 1 };
type _49 = Expect<Equal<P<Variant, "kind">, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<P<Variant, "common">, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<P<Variant, "kind" | "common">, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<DP<Variant, "kind">, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<DP<Variant, "common">, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<DP<Variant, "kind" | "common">, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<DP<Variant, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<DP<Variant, "kind" | "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<DP<Variant, "missing">, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<DP<Variant | null, "kind">, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<DP<never, "kind">, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<DP<{ a: 1 } | { b: 2 }, "a" | "b">, TODO>>; // TODO(koan) @koan-error
