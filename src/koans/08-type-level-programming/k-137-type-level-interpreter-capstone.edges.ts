import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Add, Concat, Equals, Eval, Failure, If, Let, Literal, Ok, Variable } from "./k-137-type-level-interpreter-capstone.js";

/** EDGE CASES: lazy branches, left-first failures, shadowing, broad values, unions, any, and recursion. */

type IsAny<T> = 0 extends 1 & T ? true : false;
type ResultValue<Result> = Result extends Ok<infer Value> ? Value : never;

// Pre-solved demonstrations expose evaluation strategy rather than only final values.
type _DemoLazyThen = Expect<Equal<Eval<If<Literal<true>, Literal<1>, Variable<"missing">>>, Ok<1>>>;
type _DemoLeftFailure = Expect<Equal<Eval<Add<Variable<"left">, Variable<"right">>>, Failure<"unbound:left">>>;
type _DemoShadow = Expect<Equal<Eval<Let<"x", Literal<1>, Let<"x", Literal<2>, Variable<"x">>>>, Ok<2>>>;
type _DemoBroadAdd = Expect<Equal<Eval<Add<Literal<number>, Literal<1>>>, Ok<number>>>;
type _DemoExplicitError = Expect<Equal<Eval<Concat<Literal<1>, Literal<2>>>, Failure<"type:concat">>>;

// 1. Branches are lazy, while binary operands evaluate left to right (1-8)
type _01 = Expect<Equal<Eval<If<Literal<true>, Literal<1>, Variable<"bad">>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Eval<If<Literal<false>, Variable<"bad">, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Eval<If<Literal<boolean>, Literal<1>, Variable<"bad">>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Eval<Add<Variable<"left">, Variable<"right">>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Eval<Add<Literal<"bad">, Variable<"right">>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Eval<Add<Literal<1>, Variable<"right">>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Eval<Equals<Variable<"left">, Variable<"right">>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Eval<If<Variable<"flag">, Literal<1>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error

// 2. Binding is lexical, immutable, and shadowed by the nearest let (9-16)
type _09 = Expect<Equal<Eval<Let<"x", Literal<1>, Variable<"x">>, { x: 9 }>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Eval<Let<"x", Variable<"outer">, Variable<"x">>, { outer: 3 }>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Eval<Let<"x", Literal<1>, Let<"x", Literal<2>, Variable<"x">>>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Eval<Let<"x", Literal<1>, Let<"y", Variable<"x">, Variable<"y">>>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Eval<Let<"x", Variable<"x">, Variable<"x">>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Eval<Let<"x", Variable<"x">, Variable<"x">>, { x: 4 }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Eval<Let<"x", Literal<1>, Variable<"y">>, { y: 2 }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Eval<Let<"x", Literal<1>, Add<Variable<"x">, Variable<"x">>>>, TODO>>; // TODO(koan) @koan-error

// 3. Broad and union values model uncertainty without pretending to know a literal (17-23)
type _17 = Expect<Equal<Eval<Literal<number>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Eval<Add<Literal<number>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Eval<Concat<Literal<string>, Literal<"x">>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Eval<Equals<Literal<number>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Eval<If<Literal<boolean>, Literal<1>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Eval<Literal<1> | Literal<2>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Eval<Add<Literal<1 | 2>, Literal<10>>>, TODO>>; // TODO(koan) @koan-error

// 4. any, never, invalid domains, and deeper programs mark the interpreter's limits (24-30)
type _24 = Expect<Equal<IsAny<ResultValue<Eval<Literal<any>>>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Eval<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Eval<Add<Literal<1.5>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Eval<Add<Literal<-1>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Eval<If<Literal<1>, Literal<true>, Literal<false>>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Eval<Let<"x", Literal<1>, Let<"y", Add<Variable<"x">, Literal<2>>, Add<Variable<"y">, Literal<3>>>>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ResultValue<Eval<Equals<Literal<"x">, Literal<"x">>>>, TODO>>; // TODO(koan) @koan-error
