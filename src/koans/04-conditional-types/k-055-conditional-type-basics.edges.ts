import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-055 edge cases: conditional type basics
 * =============================================================================
 * These are previews, not substitutes for the dedicated distribution and
 * special-type lessons. They establish that conditional results follow normal
 * assignability plus special reduction rules; apparent boolean questions may
 * therefore produce a branch union or never rather than one boolean literal.
 */

type EChoose<T, U, Y, N> = T extends U ? Y : N;
type EIsString<T> = T extends string ? true : false;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Literal special types and generic special types do not always reduce alike.
type _E01 = Expect<Equal<never extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EIsString<never>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EIsString<any>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<any extends string ? 1 : 2, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<unknown extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<unknown extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<string extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EIsAny<EChoose<any, string, 1, 2>>, TODO>>; // TODO(koan) @koan-error

// Empty-looking top-ish constraints differ under strict null checking.
type _E09 = Expect<Equal<string extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<null extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<undefined extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<() => void extends object ? true : false, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<42 extends object ? true : false, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<{} extends object ? true : false, TODO>>; // TODO(koan) @koan-error

// Structural checks ignore excess properties but respect optionality and unions.
type _E15 = Expect<Equal<{ x: 1; y: 2 } extends { x: number } ? true : false, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<{ x?: 1 } extends { x: 1 | undefined } ? true : false, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<{ x: 1 | undefined } extends { x?: 1 } ? true : false, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<{ readonly x: 1 } extends { x: number } ? true : false, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<({ x: 1 } | { y: 2 }) extends object ? true : false, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<({ x: 1 } | null) extends object ? true : false, TODO>>; // TODO(koan) @koan-error

// Callable variance and overload-like intersections use assignability too.
type _E21 = Expect<Equal<((x: unknown) => string) extends ((x: string) => unknown) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<((x: string) => string) extends ((x: unknown) => unknown) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<(() => "x") extends (() => string) ? true : false, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<(() => string) extends (() => "x") ? true : false, TODO>>; // TODO(koan) @koan-error

// Generic instantiation, booleans, and template patterns round out reduction.
type _E25 = Expect<Equal<EChoose<true, boolean, "yes", "no">, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EChoose<boolean, true, "yes", "no">, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EChoose<`id-${number}`, `id-${string}`, "yes", "no">, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EChoose<`id-${number}`, string, "yes", "no">, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EChoose<Promise<never>, Promise<unknown>, "yes", "no">, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EChoose<readonly [], readonly unknown[], "yes", "no">, TODO>>; // TODO(koan) @koan-error

// Pre-solved: literal never is assignable to every type.
type _DemoLiteralNever = Expect<Equal<never extends string ? true : false, true>>;

// Pre-solved: naked generic never distributes over zero union members.
type _DemoGenericNever = Expect<Equal<EIsString<never>, never>>;

// Pre-solved: any can preserve both possible conditional branches.
type _DemoAnyBranches = Expect<Equal<EIsString<any>, boolean>>;

// Conditional return types are not justified by value-level narrowing alone.
function invalidGenericReturn<T>(value: T): EIsString<T> {
  // @ts-expect-error A runtime guard does not resolve the generic conditional.
  return typeof value === "string";
}
void invalidGenericReturn;
