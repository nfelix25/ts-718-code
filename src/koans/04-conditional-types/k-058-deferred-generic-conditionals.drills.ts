import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-058 guided drills: deferred generic conditionals
 * =============================================================================
 * Separate the generic declaration from each instantiation. At the declaration,
 * keep the conditional pending; at a call, substitute the inferred or explicit
 * type argument and then reduce it.
 */

type DBox<T> = T extends string ? { text: T } : { value: T };
type DLabel<T extends string | number | boolean> = T extends string ? "string" : T extends number ? "number" : "boolean";
type DFirst<T extends string | readonly unknown[]> = T extends readonly (infer E)[] ? E | undefined : T;
type DIsAny<T> = 0 extends (1 & T) ? true : false;

function dBox<T>(value: T): DBox<T> {
  return (typeof value === "string" ? { text: value } : { value }) as DBox<T>;
}
function dLabel<T extends string | number | boolean>(value: T): DLabel<T> {
  return typeof value as DLabel<T>;
}
function dFirst<T extends string | readonly unknown[]>(value: T): DFirst<T> {
  return (Array.isArray(value) ? value[0] : value) as DFirst<T>;
}

// Direct alias instantiation supplies the evidence needed for reduction.
type _D01 = Expect<Equal<DBox<string>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DBox<"x">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DBox<number>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DBox<1>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DBox<boolean>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DBox<{}>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DLabel<string>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DLabel<number>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DLabel<boolean>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DLabel<"x">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DFirst<"whole">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DFirst<readonly ["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DFirst<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DFirst<string[]>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DBox<string | number>, TODO>>; // TODO(koan) @koan-error

// Inferred call-site type arguments specialize returned conditionals.
const d16 = dBox("x" as const);
const d17 = dBox(1 as const);
const d18 = dBox(true as const);
const d19 = dBox("x" as string);
const d20 = dBox(1 as number);
const d21 = dBox("" as string | number);
const d22 = dLabel("x" as const);
const d23 = dLabel(1 as const);
const d24 = dLabel(false as const);
const d25 = dLabel("" as string | number);
type _D16 = Expect<Equal<typeof d16, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<typeof d17, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<typeof d18, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<typeof d19, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<typeof d20, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<typeof d21, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<typeof d22, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<typeof d23, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<typeof d24, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<typeof d25, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<typeof dBox<"explicit">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DIsAny<ReturnType<typeof dBox>>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<Parameters<typeof dBox>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<ReturnType<typeof dLabel>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<Parameters<typeof dLabel>, TODO>>; // TODO(koan) @koan-error

// Constraints bound T but calls still select distinct outcomes.
const d31 = dFirst("whole" as const);
const d32 = dFirst(["a", 1] as const);
const d33 = dFirst([] as const);
const d34 = dFirst([1, 2] as number[]);
const d35 = dFirst("" as string | readonly number[]);
type _D31 = Expect<Equal<typeof d31, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<typeof d32, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<typeof d33, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<typeof d34, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<typeof d35, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DFirst<string | readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DLabel<string | boolean>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DLabel<number | boolean>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DLabel<string | number | boolean>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<ReturnType<typeof dFirst>, TODO>>; // TODO(koan) @koan-error

// Generic function values preserve a pending relation in their signatures.
type DBoxer = <T>(value: T) => DBox<T>;
type DLabeler = <T extends string | number | boolean>(value: T) => DLabel<T>;
type _D41 = Expect<Equal<typeof dBox extends DBoxer ? true : false, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DBoxer extends typeof dBox ? true : false, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<typeof dLabel extends DLabeler ? true : false, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DIsAny<ReturnType<DBoxer>>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<Parameters<DBoxer>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<ReturnType<DLabeler>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<Parameters<DLabeler>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DBoxer extends (value: string) => unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DLabeler extends (value: number) => unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<typeof dFirst extends <T extends string | readonly unknown[]>(value: T) => DFirst<T> ? true : false, TODO>>; // TODO(koan) @koan-error

// Overload surfaces specialize while utility types inspect the last signature.
function dOverload(value: string): { text: string };
function dOverload(value: number): { value: number };
function dOverload(value: string | number): { text: string } | { value: number } {
  return typeof value === "string" ? { text: value } : { value };
}
const d51 = dOverload("x");
const d52 = dOverload(1);
type _D51 = Expect<Equal<typeof d51, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<typeof d52, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<ReturnType<typeof dOverload>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<Parameters<typeof dOverload>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<typeof dOverload extends (value: string) => { text: string } ? true : false, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<typeof dOverload extends (value: number) => { value: number } ? true : false, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DBox<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DBox<1 | 2>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DLabel<"x" | 1>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DFirst<readonly [1, 2] | "x">, TODO>>; // TODO(koan) @koan-error
