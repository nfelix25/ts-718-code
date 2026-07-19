import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-061 edge cases: never in conditional types
 * =============================================================================
 * Never is empty, but containers or properties containing never are not empty
 * types themselves. These cases stress intersections, keyof and mapping, infer,
 * variance positions, promises, empty tuples, and exhaustiveness remainders.
 */

type EIsNever<T> = [T] extends [never] ? true : false;
type EKeep<T, U> = T extends U ? T : never;
type EInferReturn<T> = T extends (...args: any[]) => infer R ? R : never;
type ERemaining<All, Handled> = All extends Handled ? never : All;

// Intersections and unions simplify before never detection.
type _E01 = Expect<Equal<EIsNever<string & number>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EIsNever<string & never>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EIsNever<string | never>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EIsNever<unknown & never>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EIsNever<any & never>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EIsNever<any>, TODO>>; // TODO(koan) @koan-error

// keyof and mapped behavior do not mean the source has runtime values.
type _E07 = Expect<Equal<keyof never, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<{ [K in keyof never]: K }, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<{ [K in never]: K }, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<Record<never, string>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<keyof Record<never, string>, TODO>>; // TODO(koan) @koan-error

// Containers holding never still have container structure.
type _E12 = Expect<Equal<EIsNever<never[]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<never[][number], TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EIsNever<[never]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<[never]["length"], TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EIsNever<[]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<[][number], TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EIsNever<Promise<never>>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<Awaited<Promise<never>>, TODO>>; // TODO(koan) @koan-error

// Inference and function positions expose never differently.
type _E20 = Expect<Equal<EInferReturn<() => never>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EInferReturn<never>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<(() => never) extends (() => string) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<((value: string) => void) extends ((value: never) => void) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<((value: never) => void) extends ((value: string) => void) ? true : false, TODO>>; // TODO(koan) @koan-error

type EState = "idle" | "loading" | "success" | "failure";

// Filtering to a remainder models exhaustiveness.
type _E25 = Expect<Equal<ERemaining<EState, "idle" | "loading">, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<ERemaining<EState, EState>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsNever<ERemaining<EState, EState>>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EKeep<EState, "success" | "failure">, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<Exclude<EState, EState>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<Extract<EState, never>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: an empty tuple exists but has never as its element union.
type _DemoEmptyTuple = Expect<Equal<EIsNever<[]>, false>>;
type _DemoEmptyElement = Expect<Equal<[][number], never>>;

// Pre-solved: a never-returning function is usable where any return is expected.
type _DemoNeverReturn = Expect<Equal<(() => never) extends (() => string) ? true : false, true>>;

// Pre-solved: handling every state leaves no remainder.
type _DemoExhaustive = Expect<Equal<ERemaining<EState, EState>, never>>;

const impossibleValue: { value: never } = {
  // @ts-expect-error A never-valued slot cannot be populated.
  value: "impossible",
};
void impossibleValue;
