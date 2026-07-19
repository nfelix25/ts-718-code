import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { IsUnion, KeysOfUnion, LastOf, MergeUnion, UnionSize, UnionToIntersection, UnionToTuple, ValueAt } from "./k-136-union-algorithms.js";

/** GUIDED DRILLS: classify unions, intersect members, inspect cardinality, and query object variants. */

// Union classification (1-12)
type _01 = Expect<Equal<IsUnion<string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IsUnion<"a">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsUnion<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsUnion<string | number>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<IsUnion<boolean>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsUnion<true>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsUnion<never>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsUnion<unknown>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<IsUnion<any>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<IsUnion<"a" | string>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<IsUnion<1 | number>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsUnion<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error

// Union-to-intersection conversion (13-24)
type _13 = Expect<Equal<UnionToIntersection<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<UnionToIntersection<{ x: string } | { x: string; y: number }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<UnionToIntersection<string>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<UnionToIntersection<string | number>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<UnionToIntersection<true | false>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<UnionToIntersection<unknown>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<UnionToIntersection<never>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<UnionToIntersection<(() => "a") | (() => "b")>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<UnionToIntersection<{ readonly x: 1 } | { y?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof UnionToIntersection<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<UnionToIntersection<1 | 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<UnionToIntersection<never | { a: 1 }>, TODO>>; // TODO(koan) @koan-error

// Last-member extraction and tuple inspection (25-36)
type _25 = Expect<Equal<LastOf<"only">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<LastOf<never>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<UnionToTuple<never>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<UnionToTuple<"a">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<UnionToTuple<"a" | "b">[number], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<UnionToTuple<1 | 2 | 3>[number], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<UnionToTuple<boolean>[number], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<UnionToTuple<string | number>[number], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<UnionToTuple<{ a: 1 } | { b: 2 }>[number], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<UnionToTuple<1 | 2>["length"], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<UnionToTuple<1 | 2 | 3>["length"], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Exclude<1 | 2 | 3, LastOf<1 | 2 | 3>> extends never ? true : false, TODO>>; // TODO(koan) @koan-error

// Union cardinality and normalization (37-48)
type _37 = Expect<Equal<UnionSize<never>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<UnionSize<"a">, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<UnionSize<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<UnionSize<"a" | "b" | "c">, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<UnionSize<1 | 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<UnionSize<boolean>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<UnionSize<string | number>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<UnionSize<"a" | string>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<UnionSize<1 | number>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<UnionSize<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<UnionSize<never | "a">, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<UnionSize<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error

// Keys and values across object unions (49-60)
type Variant = { kind: "a"; a: string; shared: 1 } | { kind: "b"; b: number; shared: 2 };
type _49 = Expect<Equal<keyof Variant, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<KeysOfUnion<Variant>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<ValueAt<Variant, "kind">, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ValueAt<Variant, "shared">, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<ValueAt<Variant, "a">, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ValueAt<Variant, "b">, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ValueAt<Variant, "missing">, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<keyof MergeUnion<Variant>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<MergeUnion<Variant>["kind"], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<MergeUnion<Variant>["a"], TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<KeysOfUnion<never>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<KeysOfUnion<{ 0: "zero" } | { name: string }>, TODO>>; // TODO(koan) @koan-error
