import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { ApprovedPaths, PathValue, SafePathValue } from "./k-114-value-by-path.js";

/** EDGE CASES: parsing ambiguity, branch filtering, broad strings, and vocabulary boundaries. */

type V<T, P extends string> = PathValue<T, P>;
type S<T, P extends string> = SafePathValue<T, P>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoStrictFilters = Expect<Equal<V<{ a: 1 } | { b: 2 }, "a">, 1>>;
type _DemoSafeRetainsAbsence = Expect<Equal<S<{ a: 1 } | { b: 2 }, "a">, 1 | undefined>>;
type _DemoOptionalDeepStrict = Expect<Equal<V<{ a?: { b: 1 } }, "a.b">, 1>>;
type _DemoOptionalDeepSafe = Expect<Equal<S<{ a?: { b: 1 } }, "a.b">, 1 | undefined>>;
type _DemoTupleParserCanIndex = Expect<Equal<V<[{ x: 1 }], "0.x">, 1>>;
type _DemoTupleVocabularyStops = Expect<Equal<Extract<"0.x", ApprovedPaths<[{ x: 1 }]>>, never>>;
type _DemoAnyMustBeClassified = Expect<Equal<IsAny<V<any, "x">>, true>>;

// 1. Dot syntax is ambiguous when raw keys contain dots (1-8)
type _01 = Expect<Equal<V<{ "a.b": 1 }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<S<{ "a.b": 1 }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<V<{ a: { b: 2 }; "a.b": 1 }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<V<{ "": 1 }, "">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<V<{ a: { "": 1 } }, "a.">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<V<{ ".": 1 }, ".">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<V<Record<string, number>, "a.b">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<S<Record<string, number>, "a.b">, TODO>>; // TODO(koan) @koan-error

// 2. Strict filtering versus safe absence (9-16)
type _09 = Expect<Equal<V<{ a: 1 } | {}, "a">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<S<{ a: 1 } | {}, "a">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<V<{ a: { b: 1 } } | { a: null }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<S<{ a: { b: 1 } } | { a: null }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<V<{ a: { b: 1 } } | { a: undefined }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<S<{ a: { b: 1 } } | { a: undefined }, "a.b">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<V<{ a: never }, "a.x">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<S<{ a: never }, "a.x">, TODO>>; // TODO(koan) @koan-error

// 3. Broad and special inputs (17-23)
type _17 = Expect<Equal<V<unknown, "x">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<S<unknown, "x">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<V<never, "x">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<S<never, "x">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<IsAny<V<any, "x.y">>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<IsAny<S<any, "x.y">>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<V<{ x: any }, "x.y"> extends any ? IsAny<V<{ x: any }, "x.y">> : false, TODO>>; // TODO(koan) @koan-error

// 4. The parser knows more structural paths than the approved vocabulary (24-30)
type _24 = Expect<Equal<V<{ list: [{ id: 1 }] }, "list.0.id">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extract<"list.0.id", ApprovedPaths<{ list: [{ id: 1 }] }>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<V<{ map: Map<string, number> }, "map.size">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extract<"map.size", ApprovedPaths<{ map: Map<string, number> }>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<V<{ date: Date }, "date.getTime">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extract<"date.getTime", ApprovedPaths<{ date: Date }>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<V<{ fn: (() => 1) & { meta: 2 } }, "fn.meta">, TODO>>; // TODO(koan) @koan-error
