import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  ExactGuardedPaths,
  GuardedDeepReadonly,
  GuardedPaths,
} from "./k-116-cyclic-types-and-visited-guards.js";

/** EDGE CASES: structural false positives, generic cycles, frontier leakage, and identity. */

type G<T, Seen = never> = GuardedPaths<T, Seen>;
type Stop<T, Seen = never> = GuardedPaths<T, Seen, "stop">;
type X<T, Seen = never> = ExactGuardedPaths<T, Seen>;
type R<T, Seen = never> = GuardedDeepReadonly<T, Seen>;
type IsAny<T> = 0 extends 1 & T ? true : false;

type Node = { id: number; next?: Node };

// Pre-solved demonstrations.
type _DemoShallowFrontier = Expect<Equal<G<Node>, "id" | "next" | "next.id" | "next.next">>;
type _DemoStopFrontier = Expect<Equal<Stop<Node>, "id" | "next">>;
type _DemoReadonlyFrontierLeaksOriginal = Expect<Equal<R<Node>["next"], Node | undefined>>;
type _DemoUnknownSeenStopsAssignableGuard = Expect<Equal<G<Node, unknown>, "id" | "next">>;
type _DemoExactUnknownDoesNotMatch = Expect<Equal<X<{ id: 1 }, unknown>, "id">>;
type _DemoAnyPathPolicy = Expect<Equal<G<any>, string>>;

// 1. Structural membership can stop strict supersets early (1-8)
type Narrow = { id: string };
type Wide = { id: string; nested: { value: number } };
type _01 = Expect<Equal<G<Wide, Narrow>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<X<Wide, Narrow>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Stop<Wide, Narrow>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<G<Narrow, Wide>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<X<Narrow, Wide>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<G<Wide, { id: unknown }>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<X<Wide, { id: unknown }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<G<Wide, object>, TODO>>; // TODO(koan) @koan-error

// 2. Seen union algebra and top types (9-16)
type _09 = Expect<Equal<G<Node, never>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<G<Node, unknown>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<X<Node, unknown>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<G<Node, any>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<X<Node, any>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<G<Node, Node | Date>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<X<Node, Node | Date>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Stop<Node, Node>, TODO>>; // TODO(koan) @koan-error

// 3. Arrays are an explicit leaf for paths but recurse in readonly transforms (17-23)
type RecursiveArray = Array<number | RecursiveArray>;
type _17 = Expect<Equal<G<RecursiveArray>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<G<{ items: RecursiveArray }>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<R<RecursiveArray>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<R<RecursiveArray>[number], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<R<readonly [Node]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<R<{ nodes: Node[] }>["nodes"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<R<{ nodes: Node[] }>["nodes"][number], TODO>>; // TODO(koan) @koan-error

// 4. Frontier policies trade completeness for termination (24-30)
type _24 = Expect<Equal<"next.id" extends G<Node> ? true : false, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<"next.next" extends G<Node> ? true : false, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<"next.next.id" extends G<Node> ? true : false, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<"next.id" extends Stop<Node> ? true : false, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<R<Node>["next"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsAny<R<any>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<R<never>, TODO>>; // TODO(koan) @koan-error
