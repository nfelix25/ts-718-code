import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Add, Concat, Equals, Eval, Failure, If, Let, Literal, Ok, Variable } from "./k-137-type-level-interpreter-capstone.js";

/** GUIDED DRILLS: evaluate AST leaves, operators, branches, bindings, and explicit failures. */

// Literals and environment lookup (1-12)
type _01 = Expect<Equal<Eval<Literal<0>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Eval<Literal<42>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Eval<Literal<"">>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Eval<Literal<"koan">>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Eval<Literal<true>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Eval<Literal<false>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Eval<Variable<"x">, { x: 1 }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Eval<Variable<"name">, { name: "Ada" }>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Eval<Variable<"flag">, { flag: true; extra: 2 }>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Eval<Variable<"missing">>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Eval<Variable<"x">, Readonly<{ x: 2 }>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Eval<Variable<"x">, Record<string, number>>, TODO>>; // TODO(koan) @koan-error

// Numeric addition and string concatenation (13-28)
type _13 = Expect<Equal<Eval<Add<Literal<0>, Literal<0>>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Eval<Add<Literal<0>, Literal<5>>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Eval<Add<Literal<2>, Literal<3>>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Eval<Add<Literal<5>, Literal<8>>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Eval<Add<Add<Literal<1>, Literal<2>>, Literal<3>>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Eval<Add<Literal<number>, Literal<1>>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Eval<Add<Literal<-1>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Eval<Add<Literal<1>, Literal<"2">>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Eval<Concat<Literal<"a">, Literal<"b">>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Eval<Concat<Literal<"type">, Literal<"script">>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Eval<Concat<Literal<"">, Literal<"x">>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Eval<Concat<Literal<string>, Literal<"x">>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Eval<Concat<Literal<"x">, Literal<string>>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Eval<Concat<Literal<"x">, Literal<1>>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Eval<Add<Variable<"x">, Literal<1>>, { x: 4 }>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Eval<Concat<Variable<"x">, Literal<"!">>, { x: "hi" }>, TODO>>; // TODO(koan) @koan-error

// Equality results (29-40)
type _29 = Expect<Equal<Eval<Equals<Literal<1>, Literal<1>>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Eval<Equals<Literal<1>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Eval<Equals<Literal<"a">, Literal<"a">>>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Eval<Equals<Literal<"a">, Literal<"b">>>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Eval<Equals<Literal<true>, Literal<false>>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Eval<Equals<Literal<1>, Literal<"1">>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Eval<Equals<Literal<number>, Literal<1>>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Eval<Equals<Literal<string>, Literal<"a">>>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Eval<Equals<Literal<boolean>, Literal<true>>>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Eval<Equals<Variable<"x">, Literal<2>>, { x: 2 }>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Eval<Equals<Variable<"x">, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Eval<Equals<Add<Literal<1>, Literal<1>>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error

// Conditional evaluation (41-50)
type _41 = Expect<Equal<Eval<If<Literal<true>, Literal<1>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Eval<If<Literal<false>, Literal<1>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Eval<If<Literal<boolean>, Literal<1>, Literal<2>>>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Eval<If<Equals<Literal<1>, Literal<1>>, Literal<"yes">, Literal<"no">>>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Eval<If<Equals<Literal<1>, Literal<2>>, Literal<"yes">, Literal<"no">>>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Eval<If<Literal<"truthy">, Literal<1>, Literal<0>>>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Eval<If<Variable<"flag">, Literal<1>, Literal<0>>, { flag: true }>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Eval<If<Variable<"flag">, Literal<1>, Literal<0>>>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Eval<If<Literal<true>, Literal<1>, Variable<"bad">>>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Eval<If<Literal<false>, Variable<"bad">, Literal<2>>>, TODO>>; // TODO(koan) @koan-error

// Let bindings, shadowing, and failure propagation (51-60)
type _51 = Expect<Equal<Eval<Let<"x", Literal<1>, Variable<"x">>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Eval<Let<"x", Literal<1>, Add<Variable<"x">, Literal<2>>>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Eval<Let<"x", Literal<"a">, Concat<Variable<"x">, Literal<"b">>>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Eval<Let<"x", Literal<1>, Let<"y", Literal<2>, Add<Variable<"x">, Variable<"y">>>>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Eval<Let<"x", Literal<1>, Let<"x", Literal<2>, Variable<"x">>>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Eval<Let<"x", Variable<"missing">, Literal<1>>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Eval<Add<Variable<"missing">, Literal<"bad">>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Eval<Add<Literal<"bad">, Variable<"missing">>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Eval<Literal<1>> extends Ok<infer Value> ? Value : never, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Eval<Variable<"x">> extends Failure<infer Message> ? Message : never, TODO>>; // TODO(koan) @koan-error
