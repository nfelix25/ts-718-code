import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  ExactGuardedPaths,
  GuardedDeepReadonly,
  GuardedPaths,
} from "./k-116-cyclic-types-and-visited-guards.js";

/** GUIDED DRILLS: compare frontier modes, cycle shapes, and membership relations. */

type G<T, Seen = never> = GuardedPaths<T, Seen>;
type Stop<T, Seen = never> = GuardedPaths<T, Seen, "stop">;
type X<T, Seen = never> = ExactGuardedPaths<T, Seen>;
type R<T, Seen = never> = GuardedDeepReadonly<T, Seen>;
type IsAny<T> = 0 extends 1 & T ? true : false;

type Self = { value: number; self?: Self };
type Left = { left: string; right?: Right };
type Right = { right: number; left?: Left };
type Tree = { value: string; children: Tree[] };

// Self cycles and frontier policies (1-12)
type _01 = Expect<Equal<G<Self>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Stop<Self>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<G<Self>, `self.${string}`>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<Stop<Self>, `self.${string}`>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<"self.value" extends G<Self> ? true : false, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<"self.self" extends G<Self> ? true : false, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<"self.self.value" extends G<Self> ? true : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<"self.value" extends Stop<Self> ? true : false, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<G<Tree>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Stop<Tree>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<G<{ root: Self }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Stop<{ root: Self }>, TODO>>; // TODO(koan) @koan-error

// Mutual cycles (13-24)
type _13 = Expect<Equal<G<Left>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<G<Right>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Stop<Left>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Stop<Right>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<"right.left.left" extends G<Left> ? true : false, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<"right.left.right" extends G<Left> ? true : false, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<"right.left.left" extends Stop<Left> ? true : false, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<X<Left>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<X<Right>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<G<Left | Right>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Stop<Left | Right>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<X<Left | Right>, TODO>>; // TODO(koan) @koan-error

// Assignability versus exact membership (25-36)
type Base = { id: string };
type Extended = { id: string; details: { active: boolean } };
type Optional = { id: string; details?: { active: boolean } };
type _25 = Expect<Equal<G<Extended, Base>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<X<Extended, Base>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<G<Base, Extended>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<X<Base, Extended>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<G<Optional, Base>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<X<Optional, Base>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<G<Base, Optional>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<X<Base, Optional>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<G<Extended, Base | Date>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<X<Extended, Base | Date>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<G<Extended, never>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<X<Extended, never>, TODO>>; // TODO(koan) @koan-error

// Guarded readonly transforms (37-48)
type _37 = Expect<Equal<keyof R<Self>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<R<Self>["value"], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<R<Self>["self"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<R<Left>["right"], TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<R<{ node: Self }>["node"]["value"], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<R<{ list: readonly Self[] }>["list"], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<R<[Self, Self]>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<R<Date>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<R<unknown>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<R<never>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<IsAny<R<any>>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<R<Self | null>, TODO>>; // TODO(koan) @koan-error

// Acyclic repeats and special boundaries (49-60)
type Pair = { left: { id: number }; right: { id: number } };
type _49 = Expect<Equal<G<Pair>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<X<Pair>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<G<{ item: { id: 1 }; again: { id: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<G<{ list: Self[] }>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<G<{ date: Date; deep: { id: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<G<unknown>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<G<never>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<G<any>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<G<string | Self>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<G<Self, unknown>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<X<Self, unknown>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Stop<Self, Self>, TODO>>; // TODO(koan) @koan-error
