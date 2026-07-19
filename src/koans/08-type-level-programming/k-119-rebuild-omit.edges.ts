import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { DistributedOmit, KoanOmit, RemappedOmit } from "./k-119-rebuild-omit.js";

/** EDGE CASES: broad filters, index signatures, union correlation, and key spelling. */

type O<T, K extends PropertyKey> = KoanOmit<T, K>;
type DO<T, K extends PropertyKey> = DistributedOmit<T, K>;
declare const token: unique symbol;

// Pre-solved demonstrations.
type _DemoMissingIsNoOp = Expect<Equal<O<{ a: 1 }, "missing">, { a: 1 }>>;
type _DemoNeverIsIdentity = Expect<Equal<O<{ a: 1 }, never>, { a: 1 }>>;
type _DemoAllKeysIsEmpty = Expect<Equal<O<{ a: 1 }, PropertyKey>, {}>>;
type _DemoModifiersSurvive = Expect<Equal<O<{ readonly a?: 1; b: 2 }, "b">, { readonly a?: 1 }>>;
type _DemoNonDistributedUnion = Expect<Equal<O<{ kind: "a"; a: 1 } | { kind: "b"; b: 2 }, "kind">, {}>>;
type _DemoDistributedUnion = Expect<Equal<DO<{ kind: "a"; a: 1 } | { kind: "b"; b: 2 }, "kind">, { a: 1 } | { b: 2 }>>;
type _DemoRemappingIsHomomorphic = Expect<Equal<RemappedOmit<{ kind: "a"; a: 1 } | { kind: "b"; b: 2 }, "kind">, { a: 1 } | { b: 2 }>>;

// 1. Broad key filters (1-8)
type Mixed = { 0: "zero"; name: string; [token]: boolean };
type _01 = Expect<Equal<O<Mixed, string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<O<Mixed, number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<O<Mixed, symbol>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<O<Mixed, string | number>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<O<Mixed, PropertyKey>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<O<Mixed, never>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<O<Mixed, "missing">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof O<Mixed, string>, TODO>>; // TODO(koan) @koan-error

// 2. Index signatures cannot usually lose one literal key (9-16)
type _09 = Expect<Equal<O<Record<string, number>, "x">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<O<Record<string, number>, string>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<keyof O<Record<string, number>, "x">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof O<Record<string, number>, string>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<O<Record<number, string>, 0>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<O<Record<number, string>, number>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<O<{ [key: string]: number; fixed: 1 }, "fixed">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<O<{ [key: string]: number; fixed: 1 }, string>, TODO>>; // TODO(koan) @koan-error

// 3. Common union surfaces and correlation (17-23)
type Variant = { kind: "a"; value: number; a: 1 } | { kind: "b"; value: string; b: 2 };
type _17 = Expect<Equal<O<Variant, "kind">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<O<Variant, "value">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<O<Variant, "kind" | "value">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<DO<Variant, "kind">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<DO<Variant, "value">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<DO<Variant, "kind" | "value">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<DO<Variant, "a" | "b">, TODO>>; // TODO(koan) @koan-error

// 4. Numeric key spelling and special sources (24-30)
type _24 = Expect<Equal<O<{ 0: "zero"; x: 1 }, 0>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<O<{ 0: "zero"; x: 1 }, "0">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<O<unknown, "x">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<O<{}, "x">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<O<any, "x">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<DO<never, "x">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<DO<null | { a: 1 }, "missing">, TODO>>; // TODO(koan) @koan-error
