import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { DistributedOmit, KoanOmit } from "./k-119-rebuild-omit.js";

/** GUIDED DRILLS: vary complements, absent keys, modifiers, key domains, and distribution. */

type O<T, K extends PropertyKey> = KoanOmit<T, K>;
type DO<T, K extends PropertyKey> = DistributedOmit<T, K>;

// Key-complement fundamentals (1-12)
type _01 = Expect<Equal<O<{ a: 1 }, "a">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<O<{ a: 1 }, never>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<O<{ a: 1 }, "missing">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<O<{ a: 1; b: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<O<{ a: 1; b: 2 }, "b">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<O<{ a: 1; b: 2 }, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<O<{ a: 1; b: 2 }, never>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<O<{ a: 1; b: 2 }, PropertyKey>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<keyof O<{ a: 1; b: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<keyof O<{ a: 1; b: 2 }, never>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<O<{}, "a">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<O<unknown, "a">, TODO>>; // TODO(koan) @koan-error

// Complement identities and composition (13-24)
type Model = { id: string; count: number; state: "idle" | "busy"; nested: { ok: boolean } };
type _13 = Expect<Equal<O<Model, never>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<O<Model, keyof Model>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<O<Model, "nested">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<O<Model, "id" | "state">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<O<O<Model, "id">, "count">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<O<Model, "id" | "count">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<O<Model, Exclude<keyof Model, "id">>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<O<Model, Extract<keyof Model, "id" | "missing">>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<O<{ value: never; keep: 1 }, "keep">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<O<{ value: unknown; keep: 1 }, "keep">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<O<{ value: any; keep: 1 }, "keep">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<O<{ value: string | undefined; keep: 1 }, "keep">, TODO>>; // TODO(koan) @koan-error

// Modifier preservation (25-36)
type Source = { readonly id: string; name?: string; readonly flag?: boolean; count: number };
type _25 = Expect<Equal<O<Source, "count">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<O<Source, "name">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<O<Source, "flag">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<O<Source, "id">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<O<Source, "id" | "count">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<O<Readonly<Source>, "count">, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<O<Partial<Source>, "count">, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Required<O<Source, "count">>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Readonly<O<Source, "count">>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<O<{ a?: 1 | undefined; b: 2 }, "b">, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<O<{ readonly a: 1; b: 2 }, "b">, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<O<{ readonly a?: 1; b?: 2 }, never>, TODO>>; // TODO(koan) @koan-error

// Number, symbol, and index domains (37-48)
declare const first: unique symbol;
declare const second: unique symbol;
type Mixed = { 0: "zero"; 1?: "one"; name: string; [first]: 1; readonly [second]: 2 };
type _37 = Expect<Equal<O<Mixed, 0>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<O<Mixed, 1>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<O<Mixed, number>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<O<Mixed, string>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<O<Mixed, typeof first>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<O<Mixed, symbol>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<O<Mixed, number | symbol>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<O<Record<string, number>, "x">, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<O<Record<string, number>, string>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<O<Record<number, string>, number>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<O<{ [key: string]: number; fixed: 1 }, "fixed">, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<keyof O<Mixed, 0 | typeof first>, TODO>>; // TODO(koan) @koan-error

// Union surfaces and distribution (49-60)
type Variant = { kind: "a"; a: number; common: 0 } | { kind: "b"; b: string; common: 1 };
type _49 = Expect<Equal<O<Variant, "kind">, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<O<Variant, "common">, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<O<Variant, "kind" | "common">, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<DO<Variant, "kind">, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<DO<Variant, "common">, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<DO<Variant, "kind" | "common">, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<DO<Variant, "a">, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<DO<Variant, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<DO<Variant, "missing">, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<DO<Variant | null, "kind">, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<DO<never, "kind">, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<DO<{ a: 1 } | { b: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
