import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { IsUnion, KeysOfUnion, LastOf, UnionSize, UnionToIntersection, UnionToTuple, ValueAt } from "./k-136-union-algorithms.js";

/** EDGE CASES: top/bottom types, normalization, unstable order, variance, and structural collapse. */

type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations: inspect stable properties, not compiler-selected order.
type _DemoNeverTuple = Expect<Equal<UnionToTuple<never>, []>>;
type _DemoMembership = Expect<Equal<UnionToTuple<"a" | "b">[number], "a" | "b">>;
type _DemoCardinality = Expect<Equal<UnionSize<"a" | "b">, 2>>;
type _DemoCollapsedLiteral = Expect<Equal<IsUnion<"a" | string>, false>>;
type _DemoIntersection = Expect<Equal<UnionToIntersection<{ a: 1 } | { b: 2 }>, { a: 1 } & { b: 2 }>>;
// Do not publish `LastOf<"a" | "b">` as an ordering contract; compiler versions may choose differently.

// 1. never, unknown, and any alter the algorithms' identities (1-8)
type _01 = Expect<Equal<IsUnion<never>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IsUnion<unknown>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsUnion<any>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<UnionToIntersection<never>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<UnionToIntersection<unknown>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsAny<UnionToIntersection<any>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<LastOf<never>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsAny<LastOf<any>>, TODO>>; // TODO(koan) @koan-error

// 2. Union normalization can erase apparent members before an algorithm runs (9-15)
type _09 = Expect<Equal<UnionSize<1 | 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<UnionSize<"a" | string>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<UnionSize<1 | number>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<UnionSize<string | unknown>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<UnionSize<never | "a">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsUnion<true | false>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<UnionToTuple<boolean>[number], TODO>>; // TODO(koan) @koan-error

// 3. Tuple membership and size are stable even when tuple order is not (16-22)
type _16 = Expect<Equal<UnionToTuple<"a" | "b" | "c">[number], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<UnionToTuple<"a" | "b" | "c">["length"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<"a" | "b", LastOf<"a" | "b">> extends never ? true : false, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<LastOf<"only">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<UnionToTuple<{ a: 1 } | { b: 2 }>[number], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<UnionSize<1 | 2 | 3 | 4 | 5>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<UnionToTuple<never>[number], TODO>>; // TODO(koan) @koan-error

// 4. Intersections and distributed object queries have structural surprises (23-30)
type _23 = Expect<Equal<UnionToIntersection<string | number>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<UnionToIntersection<{ x: 1 } | { x: 2 }>["x"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<keyof ({ a: 1 } | { b: 2 }), TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<KeysOfUnion<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ValueAt<{ a: 1 } | { b: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ValueAt<{ a: 1 } | { a: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<KeysOfUnion<any>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsAny<ValueAt<any, "x">>, TODO>>; // TODO(koan) @koan-error
