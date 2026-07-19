import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  CurryArgs,
  CurryFunction,
  PartiallyApply,
  RemainingArgs,
} from "./k-130-curry-and-partial-application.js";

/** EDGE CASES: optional fallback, literal direction, rest prefixes, generics, and runtime arity. */

type C<F extends (...args: any[]) => any> = CurryFunction<F>;
type PA<F extends (...args: any[]) => any, B extends readonly unknown[]> = PartiallyApply<F, B>;
type RA<A extends readonly unknown[], B extends readonly unknown[]> = RemainingArgs<A, B>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoZeroEvaluates = Expect<Equal<C<() => 1>, 1>>;
type _DemoOptionalFallback = Expect<Equal<C<(x?: string) => number>, (x?: string) => number>>;
type _DemoRequiredThenOptional = Expect<Equal<C<(x: string, y?: number) => boolean>, (arg: string) => (y?: number) => boolean>>;
type _DemoNarrowCanBindBroad = Expect<Equal<RA<[string, number], ["x"]>, [number]>>;
type _DemoBroadCannotBindNarrow = Expect<Equal<RA<["x", number], [string]>, never>>;
type _DemoInvalidPartial = Expect<Equal<PA<(x: string) => number, [number]>, never>>;

// 1. Optional and rest tuples are not guaranteed unary heads (1-8)
type _01 = Expect<Equal<CurryArgs<[x?: string], number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<CurryArgs<[x: string, y?: number], boolean>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<CurryArgs<string[], boolean>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<CurryArgs<[head: string, ...tail: number[]], boolean>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<CurryArgs<[head?: string, ...tail: number[]], boolean>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<C<(...args: never[]) => number>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<C<(...args: unknown[]) => number>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<C<(...args: any[]) => number>, TODO>>; // TODO(koan) @koan-error

// 2. Prefix validation is directional (9-16)
type _09 = Expect<Equal<RA<[string], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<RA<["x"], [string]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<RA<[number], [1]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<RA<[1], [number]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<RA<[unknown], [string]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<RA<[never], [never]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<RA<[any], [Date]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<RA<[string], [any]>, TODO>>; // TODO(koan) @koan-error

// 3. Optional/rest partial prefixes and generic reflection (17-23)
type _17 = Expect<Equal<PA<(x?: string) => number, []>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<PA<(x?: string) => number, [string]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<PA<(head: string, ...tail: number[]) => boolean, [string]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<PA<(head: string, ...tail: number[]) => boolean, [string, number]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<C<<T>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<C<<T extends string>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<PA<<T>(value: T) => T, [string]>, TODO>>; // TODO(koan) @koan-error

// 4. any, never, this, and final-signature boundaries (24-30)
interface Overloaded { (x: string): 1; (x: number): 2 }
type _24 = Expect<Equal<IsAny<C<any>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<C<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<PA<never, []>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<C<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<PA<Overloaded, [number]>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<C<(this: { id: 1 }, value: string) => number>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<PA<(this: { id: 1 }, value: string) => number, [string]>, TODO>>; // TODO(koan) @koan-error
