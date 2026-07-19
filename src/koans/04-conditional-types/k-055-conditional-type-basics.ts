import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-055: conditional type basics
 * =============================================================================
 *
 * A conditional type asks an assignability question at the type level:
 * `Check extends Constraint ? Then : Else`. If every value described by Check
 * can be used where Constraint is required, the result is Then; otherwise it is
 * Else.
 *
 * I read the expression aloud as:
 *
 *   "If Check is assignable to Constraint, produce Then; otherwise produce Else."
 *
 * This is not a runtime branch, nominal class test, or equality comparison.
 * It uses TypeScript's structural assignability rules. With fully concrete
 * types, the compiler can usually reduce the expression immediately. A union
 * written directly on the left is tested as a whole; later lessons explain why
 * a naked generic type parameter distributes instead. Branches may produce any
 * type: booleans, literals, objects, functions, or another use of the checked
 * type. Conditional APIs often need a runtime implementation cast because
 * control-flow analysis of a value does not rewrite the generic type parameter.
 */

export type IsString<T> = T extends string ? true : false;
export type Choose<Check, Constraint, Then, Else> =
  Check extends Constraint ? Then : Else;
export type BoxString<T> = T extends string ? { text: T } : { value: T };
export type ResultFor<Ok extends boolean, Value> =
  Ok extends true ? { ok: true; value: Value } : { ok: false; error: string };

export function boxString<T>(value: T): BoxString<T> {
  return (typeof value === "string" ? { text: value } : { value }) as BoxString<T>;
}

export function resultFor<Ok extends boolean, Value>(ok: Ok, value: Value): ResultFor<Ok, Value> {
  return (ok ? { ok: true, value } : { ok: false, error: String(value) }) as ResultFor<Ok, Value>;
}

export function stringOrLength<T extends string | readonly unknown[]>(value: T): T extends string ? string : number {
  return (typeof value === "string" ? value.toUpperCase() : value.length) as T extends string ? string : number;
}

// Part 1: Concrete primitive checks reduce directly to a selected branch.
type _Main01 = Expect<Equal<string extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<number extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<"literal" extends string ? "yes" : "no", TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<string extends "literal" ? "yes" : "no", TODO>>; // TODO(koan) @koan-error

// Part 2: Assignability, not equality, determines the answer.
type _Main05 = Expect<Equal<1 extends number ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<number extends 1 ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<readonly [1, 2] extends readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<readonly number[] extends readonly [number, number] ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 3: Structural object and callable checks use required capabilities.
type _Main09 = Expect<Equal<{ id: number; name: string } extends { id: number } ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<{ id: number } extends { id: number; name: string } ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<(() => string) extends (...args: never[]) => unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<string extends { length: number } ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 4: A concrete union on the left is checked as one complete type.
type _Main13 = Expect<Equal<(string | number) extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<("a" | "b") extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<(1 | 2) extends number ? "numeric" : "other", TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Choose<string | number, string | number, "inside", "outside">, TODO>>; // TODO(koan) @koan-error

// Part 5: Branches can construct related output types.
type _Main17 = Expect<Equal<BoxString<"hello">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<BoxString<42>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ResultFor<true, number>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ResultFor<false, number>, TODO>>; // TODO(koan) @koan-error
