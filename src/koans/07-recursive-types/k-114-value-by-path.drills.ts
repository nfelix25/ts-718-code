import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { PathValue, SafePathValue } from "./k-114-value-by-path.js";

/** GUIDED DRILLS: parse one segment, then vary depth, unions, absence, and containers. */

type V<T, P extends string> = PathValue<T, P>;
type S<T, P extends string> = SafePathValue<T, P>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Direct and nested lookup (1-12)
type _01 = Expect<Equal<V<{ a: 1 }, "a">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<V<{ a: 1; b: 2 }, "b">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<V<{ a: { b: 1 } }, "a">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<V<{ a: { b: 1 } }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<V<{ a: { b: { c: 1 } } }, "a.b.c">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<V<{ a: { b: { c: { d: 1 } } } }, "a.b.c.d">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<V<{ a: { x: 1; y: 2 } }, "a.y">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<V<{ a: { x: 1 }; b: { y: 2 } }, "b.y">, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<V<Readonly<{ a: { b: 1 } }>, "a.b">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<V<{ readonly a: { readonly b: 1 } }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<V<{ a: { b: string | number } }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<V<{ a: { b: never } }, "a.b">, TODO>>; // TODO(koan) @koan-error

// Invalid and partial paths (13-24)
type _13 = Expect<Equal<V<{ a: 1 }, "b">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<V<{ a: 1 }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<V<{ a: { b: 1 } }, "a.c">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<V<{ a: { b: 1 } }, "b.a">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<S<{ a: 1 }, "b">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<S<{ a: 1 }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<S<{ a: { b: 1 } }, "a.c">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<V<{ a: { b: 1 } }, "a">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<V<{ a: { b: 1 } }, "">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<V<{ "": 1 }, "">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<V<{ "a.b": 1 }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<V<Record<string, number>, "anything">, TODO>>; // TODO(koan) @koan-error

// Optional and nullish propagation (25-36)
type _25 = Expect<Equal<V<{ a?: 1 }, "a">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<S<{ a?: 1 }, "a">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<V<{ a?: { b: 1 } }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<S<{ a?: { b: 1 } }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<V<{ a: null | { b: 1 } }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<S<{ a: null | { b: 1 } }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<V<{ a: undefined | { b: 1 } }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<S<{ a: undefined | { b: 1 } }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<S<null | { a: 1 }, "a">, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<S<undefined | { a: 1 }, "a">, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<S<null | undefined, "a">, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<S<{ a: { b?: { c: 1 } } }, "a.b.c">, TODO>>; // TODO(koan) @koan-error

// Union branches (37-48)
type _37 = Expect<Equal<V<{ a: 1 } | { a: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<V<{ a: 1 } | { b: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<S<{ a: 1 } | { b: 2 }, "a">, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<V<{ a: { x: 1 } } | { a: { y: 2 } }, "a.x">, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<S<{ a: { x: 1 } } | { a: { y: 2 } }, "a.x">, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<V<{ kind: "a"; data: { x: 1 } } | { kind: "b"; data: { y: 2 } }, "kind">, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<V<{ kind: "a"; data: { x: 1 } } | { kind: "b"; data: { y: 2 } }, "data.x">, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<S<{ kind: "a"; data: { x: 1 } } | { kind: "b"; data: { y: 2 } }, "data.x">, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<V<never, "a">, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<V<unknown, "a">, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<IsAny<V<any, "a.b">>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<IsAny<S<any, "a.b">>, TODO>>; // TODO(koan) @koan-error

// Tuple, array, function, and built-in surfaces (49-60)
type _49 = Expect<Equal<V<[{ x: 1 }], "0.x">, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<V<readonly [{ x: 1 }, { y: 2 }], "1.y">, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<V<Array<{ x: 1 }>, "0.x">, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<V<{ list: [{ x: 1 }] }, "list.0.x">, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<V<{ list: { x: 1 }[] }, "list.length">, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<V<{ date: Date }, "date.getTime">, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<V<{ promise: Promise<1> }, "promise.then">, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<V<{ map: Map<string, number> }, "map.size">, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<V<{ set: Set<string> }, "set.size">, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<V<{ fn: (x: number) => string }, "fn">, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<V<{ nested: { fn: (x: number) => string } }, "nested.fn">, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ReturnType<V<{ fn: (x: number) => string }, "fn">>, TODO>>; // TODO(koan) @koan-error
