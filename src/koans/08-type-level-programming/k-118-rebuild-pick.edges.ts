import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { DistributedPick, KoanPick } from "./k-118-rebuild-pick.js";

/** EDGE CASES: constraint domains, union correlation, modifiers, and top/bottom types. */

type P<T, K extends keyof T> = KoanPick<T, K>;
type DP<T, K extends PropertyKey> = DistributedPick<T, K>;
declare const key: unique symbol;

// Pre-solved demonstrations.
type _DemoNeverKeys = Expect<Equal<P<{ a: 1 }, never>, {}>>;
type _DemoModifiers = Expect<Equal<P<{ readonly a?: 1; b: 2 }, "a">, { readonly a?: 1 }>>;
type _DemoCommonUnionSurface = Expect<Equal<P<{ kind: "a" } | { kind: "b" }, "kind">, { kind: "a" | "b" }>>;
type _DemoDistributedCorrelation = Expect<Equal<DP<{ kind: "a" } | { kind: "b" }, "kind">, { kind: "a" } | { kind: "b" }>>;
type _DemoUnknownNeverKey = Expect<Equal<P<unknown, never>, {}>>;
type _DemoSymbolKey = Expect<Equal<P<{ [key]: 1; shown: 2 }, typeof key>, { [key]: 1 }>>;

// Invalid keys are rejected at the generic boundary, not silently dropped.
// @ts-expect-error "missing" does not extend keyof { a: 1 }.
type _InvalidKey = P<{ a: 1 }, "missing">;

// 1. Empty and special key domains (1-8)
type _01 = Expect<Equal<P<{}, never>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<P<unknown, never>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<P<never, never>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<P<any, never>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<P<any, "x">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<P<any, string>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof P<any, string>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof P<any, keyof any>, TODO>>; // TODO(koan) @koan-error

// 2. Union mapping can erase correlations (9-16)
type Variant = { kind: "a"; value: number } | { kind: "b"; value: string };
type _09 = Expect<Equal<P<Variant, "kind">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<P<Variant, "value">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<P<Variant, "kind" | "value">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<DP<Variant, "kind">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<DP<Variant, "value">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<DP<Variant, "kind" | "value">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<DP<Variant, "missing">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<DP<Variant | undefined, "kind" | "value">, TODO>>; // TODO(koan) @koan-error

// 3. Optionality and exact optional properties (17-23)
type _17 = Expect<Equal<P<{ a?: 1 }, "a">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<P<{ a: 1 | undefined }, "a">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<P<{ a?: 1 | undefined }, "a">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Required<P<{ a?: 1 }, "a">>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Partial<P<{ a: 1 }, "a">>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<P<{ readonly a?: 1 }, "a">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<P<{ readonly a: 1; b?: 2 }, keyof { readonly a: 1; b?: 2 }>, TODO>>; // TODO(koan) @koan-error

// 4. Index signatures and key normalization (24-30)
type _24 = Expect<Equal<P<Record<string, number>, "literal">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<P<Record<string, number>, string>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<P<Record<number, string>, 1>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<P<{ 0: "zero" }, 0>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<P<{ 0: "zero" }, Extract<"0", keyof { 0: "zero" }>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<P<{ [key]: 1; x: 2 }, typeof key>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<keyof P<{ [key]: 1; x: 2 }, typeof key | "x">, TODO>>; // TODO(koan) @koan-error
