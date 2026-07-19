import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-058 edge cases: deferred generic conditionals
 * =============================================================================
 * Generic signatures preserve relations that utility types and implementations
 * may not be able to resolve. These cases stress constraint deferral, explicit
 * widening, higher-order generic preservation, ReturnType/Parameters views,
 * union and intersection instantiations, and special-type inputs.
 */

type EBox<T> = T extends string ? { text: T } : { value: T };
type EConstrained<T extends string | number> = T extends string ? "text" : "count";
type EIsAny<T> = 0 extends (1 & T) ? true : false;

function eBox<T>(value: T): EBox<T> {
  return (typeof value === "string" ? { text: value } : { value }) as EBox<T>;
}
function eConstrained<T extends string | number>(value: T): EConstrained<T> {
  return (typeof value === "string" ? "text" : "count") as EConstrained<T>;
}
function eIdentity<F>(fn: F): F { return fn; }
const ePreserved = eIdentity(eBox);

// Constraints restrict possible instantiations without choosing a branch early.
type _E01 = Expect<Equal<EConstrained<string>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EConstrained<number>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EConstrained<string | number>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ReturnType<typeof eConstrained>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Parameters<typeof eConstrained>, TODO>>; // TODO(koan) @koan-error

// Explicit type arguments can deliberately widen a more precise runtime value.
const e06 = eBox<string>("x");
const e07 = eBox<string | number>("x");
const e08 = eConstrained<string | number>(1);
type _E06 = Expect<Equal<typeof e06, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<typeof e07, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<typeof e08, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<typeof eBox<"x">, TODO>>; // TODO(koan) @koan-error

// Higher-order identity can preserve the entire pending generic relationship.
type _E10 = Expect<Equal<typeof ePreserved extends typeof eBox ? true : false, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<typeof eBox extends typeof ePreserved ? true : false, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EIsAny<ReturnType<typeof ePreserved>>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Parameters<typeof ePreserved>, TODO>>; // TODO(koan) @koan-error
const e14 = ePreserved("literal" as const);
const e15 = ePreserved(1 as const);
type _E14 = Expect<Equal<typeof e14, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<typeof e15, TODO>>; // TODO(koan) @koan-error

// Union and intersection instantiations reduce only after substitution.
type _E16 = Expect<Equal<EBox<"a" | 1>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EBox<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EBox<string & { readonly brand: true }>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EBox<never>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EBox<unknown>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EBox<any>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EIsAny<EBox<any>>, TODO>>; // TODO(koan) @koan-error

// Generic utility views use their own broad instantiation behavior.
type EGeneric = <T>(value: T) => EBox<T>;
type _E23 = Expect<Equal<EIsAny<ReturnType<EGeneric>>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<Parameters<EGeneric>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EGeneric extends (value: unknown) => unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EGeneric extends (value: string) => { text: string } ? true : false, TODO>>; // TODO(koan) @koan-error

// Branch-local value facts do not rewrite the generic T itself.
type EObserved<T> = T & string;
type _E27 = Expect<Equal<EObserved<string | number>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EBox<EObserved<string | number>>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EConstrained<"x" | 1>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EConstrained<never>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: an explicit broad type argument discards literal specialization.
type _DemoExplicitWide = Expect<Equal<typeof e06, { text: string }>>;

// Pre-solved: higher-order identity preserves the generic relation at calls.
type _DemoPreservedCall = Expect<Equal<typeof e14, { text: "literal" }>>;

// Pre-solved: naked generic never instantiates the conditional over zero members.
type _DemoNever = Expect<Equal<EBox<never>, never>>;

function invalidImplementation<T>(value: T): EBox<T> {
  if (typeof value === "string") {
    // @ts-expect-error Narrowing value does not resolve EBox<T> to its text branch.
    return { text: value };
  }
  // @ts-expect-error The fallback branch is likewise unresolved for generic T.
  return { value };
}
void invalidImplementation;
