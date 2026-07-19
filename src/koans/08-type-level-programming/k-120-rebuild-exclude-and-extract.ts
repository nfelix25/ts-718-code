import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 120 - REBUILD EXCLUDE AND EXTRACT
 * ========================================
 *
 * `Exclude<T, U>` and `Extract<T, U>` are complementary filters over a union T.
 * A naked T distributes, so each constituent independently asks whether it is
 * assignable to U. Exclude sends matching members to never; Extract keeps them.
 *
 * Read `T extends U ? never : T` aloud as: "for every possible T, erase it when
 * T fits U, otherwise keep it." Swap the branches to Extract. Tuple wrapping
 * changes the question from constituent-by-constituent filtering to one test of
 * the complete union.
 */

export type KoanExclude<T, U> = T extends U ? never : T;
export type KoanExtract<T, U> = T extends U ? T : never;
export type WholeExclude<T, U> = [T] extends [U] ? never : T;
export type WholeExtract<T, U> = [T] extends [U] ? T : never;

// Part 1: Exclude subtracts assignable union members.
type _01 = Expect<Equal<KoanExclude<"a" | "b" | "c", "b">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanExclude<string | number | boolean, number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KoanExclude<1 | 2 | 3, 1 | 3>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanExclude<string | number, unknown>, TODO>>; // TODO(koan) @koan-error

// Part 2: Extract keeps the same matching members.
type _05 = Expect<Equal<KoanExtract<"a" | "b" | "c", "b">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanExtract<string | number | boolean, number | boolean>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KoanExtract<1 | 2 | 3, 1 | 3>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanExtract<string | number, unknown>, TODO>>; // TODO(koan) @koan-error

// Part 3: Assignability is structural and directional.
type Animal = { name: string };
type Dog = { name: string; bark(): void };
type Cat = { name: string; meow(): void };
type _09 = Expect<Equal<KoanExtract<Dog | Cat | string, Animal>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<KoanExclude<Dog | Cat | string, Animal>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<KoanExtract<Animal | Dog, Dog>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<KoanExclude<Animal | Dog, Dog>, TODO>>; // TODO(koan) @koan-error

// Part 4: Whole-union tests do not filter individual constituents.
type _13 = Expect<Equal<WholeExclude<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<WholeExtract<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<WholeExclude<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<WholeExtract<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error

// Part 5: Bottom and top types have distinct filter algebra.
type IsAny<T> = 0 extends 1 & T ? true : false;
type _17 = Expect<Equal<KoanExclude<never, string>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<KoanExtract<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<KoanExclude<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsAny<KoanExtract<any, string>>, TODO>>; // TODO(koan) @koan-error

export function partitionBy<T, S extends T>(
  values: readonly T[],
  isSelected: (value: T) => value is S,
): { extracted: KoanExtract<T, S>[]; excluded: KoanExclude<T, S>[] } {
  const extracted: S[] = [];
  const excluded: T[] = [];
  for (const value of values) {
    (isSelected(value) ? extracted : excluded).push(value as S & T);
  }
  return {
    extracted: extracted as KoanExtract<T, S>[],
    excluded: excluded as KoanExclude<T, S>[],
  };
}
