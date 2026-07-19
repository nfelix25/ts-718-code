import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  DepthFuel,
  LensPathValue,
  PathLens,
  PathsToDepth,
} from "./k-117-depth-limits-and-path-lens-capstone.js";

/** EDGE CASES: off-by-one depth, broad numbers, union budgets, and finite approximation. */

type P<T, N extends number> = PathsToDepth<T, N>;
type V<T, Path extends string> = LensPathValue<T, Path>;
type IsAny<T> = 0 extends 1 & T ? true : false;
type Node = { id: number; next?: Node };

// Pre-solved demonstrations.
type _DemoZeroMeansNoSegments = Expect<Equal<P<{ a: 1 }, 0>, never>>;
type _DemoOneMeansRootKeys = Expect<Equal<P<{ a: { b: 1 } }, 1>, "a">>;
type _DemoTwoIncludesChild = Expect<Equal<P<{ a: { b: 1 } }, 2>, "a" | "a.b">>;
type _DemoCycleIsFinite = Expect<Equal<P<Node, 2>, "id" | "next" | "next.id" | "next.next">>;
type _DemoBroadDepthDefaults = Expect<Equal<DepthFuel<number>["length"], 5>>;
type _DemoUnionDepthDistributes = Expect<Equal<DepthFuel<1 | 3>["length"], 1 | 3>>;
type _DemoAnyPathPolicy = Expect<Equal<P<any, 2>, string>>;

// 1. Boundary and off-by-one behavior (1-8)
type Shape = { a: { b: { c: 1 } }; x: 2 };
type _01 = Expect<Equal<P<Shape, 0>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<P<Shape, 1>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<P<Shape, 2>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<P<Shape, 3>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<"a" extends P<Shape, 1> ? true : false, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<"a.b" extends P<Shape, 1> ? true : false, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<"a.b" extends P<Shape, 2> ? true : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<"a.b.c" extends P<Shape, 2> ? true : false, TODO>>; // TODO(koan) @koan-error

// 2. Broad and union depth parameters (9-16)
type _09 = Expect<Equal<DepthFuel<number>["length"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<P<Shape, number>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<DepthFuel<0 | 2>["length"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<P<Shape, 0 | 2>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<DepthFuel<1 | 3>["length"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<P<Shape, 1 | 3>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<DepthFuel<12>["length"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<P<Shape, 12>, TODO>>; // TODO(koan) @koan-error

// 3. Finite approximations of infinite shapes (17-23)
type _17 = Expect<Equal<P<Node, 1>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<P<Node, 2>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<P<Node, 4>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<"next.next.next.next" extends P<Node, 4> ? true : false, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<"next.next.next.next.id" extends P<Node, 4> ? true : false, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extract<P<Node, 3>, `next.next.${string}`>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Exclude<P<Node, 3>, `next.${string}`>, TODO>>; // TODO(koan) @koan-error

// 4. Value and lens boundaries (24-30)
type Model = { config?: { retries: 0 | 1 | 2 }; rows: { id: number }[] };
type _24 = Expect<Equal<V<Model, "config.retries">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<V<Model, "rows.0.id">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<"rows.0.id", P<Model, 5>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<PathLens<Model, "config.retries">["get"]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Parameters<PathLens<Model, "config.retries">["set"]>[1], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsAny<V<any, "x.y">>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<P<unknown, 5>, TODO>>; // TODO(koan) @koan-error
