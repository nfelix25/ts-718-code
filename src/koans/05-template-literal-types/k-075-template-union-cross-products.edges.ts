import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-075 edge cases: template union cross-products
 * =============================================================================
 * Product expansion obeys union algebra before and after string construction.
 * These cases stress zero-choice slots, duplicate normalization, broad framed
 * families, boolean expansion, correlation loss, and moderate product growth.
 */

type EPair<A extends string | number | boolean, B extends string | number | boolean> = `${A}:${B}`;
type ETriple<A extends string, B extends string, C extends string> = `${A}/${B}/${C}`;
type EMatch<S extends string, P extends string> = S extends P ? true : false;

// Never in any slot produces a product with zero members.
type _E01 = Expect<Equal<EPair<never, "x">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EPair<"a", never>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EPair<never, never>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ETriple<never, "x", "1">, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<ETriple<"a", never, "1">, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ETriple<"a", "x", never>, TODO>>; // TODO(koan) @koan-error

// Duplicate inputs and duplicate outputs normalize to one union member.
type _E07 = Expect<Equal<EPair<"a" | "a", "x">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EPair<"a", "x" | "x">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EPair<"a" | never, "x" | never>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EPair<"a" | "b", "x"> | "a:x", TODO>>; // TODO(koan) @koan-error

// Boolean is already a two-member union and multiplies like any other slot.
type _E11 = Expect<Equal<EPair<boolean, "x">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EPair<"x", boolean>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EPair<boolean, boolean>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<`${boolean}-${"a" | "b"}`, TODO>>; // TODO(koan) @koan-error

// Broad slots remain framed patterns and absorb literal alternatives in that slot.
type _E15 = Expect<Equal<EPair<string, "x">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EPair<string | "a", "x">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EPair<"a", string | "x">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EPair<number, "px" | "rem">, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EMatch<"12:px", EPair<number, "px" | "rem">>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EMatch<"x:px", EPair<number, "px" | "rem">>, TODO>>; // TODO(koan) @koan-error

// A product admits every pairing; explicit unions can retain domain correlation.
type Correlated = "get:user" | "set:team";
type Product = EPair<"get" | "set", "user" | "team">;
type _E21 = Expect<Equal<Exclude<Product, Correlated>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<Extract<Product, Correlated>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<Correlated extends Product ? true : false, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<Product extends Correlated ? true : false, TODO>>; // TODO(koan) @koan-error

// Moderate products are exact but grow multiplicatively.
type Four = "a" | "b" | "c" | "d";
type _E25 = Expect<Equal<ETriple<Four, "x", "1">, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<ETriple<Four, "x" | "y", "1">, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ETriple<Four, "x" | "y", "1" | "2">, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EMatch<"d/y/2", ETriple<Four, "x" | "y", "1" | "2">>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EMatch<"e/y/2", ETriple<Four, "x" | "y", "1" | "2">>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ETriple<Four, "x" | "y", "1" | "2"> extends string ? true : false, TODO>>; // TODO(koan) @koan-error

// Pre-solved: two choices by two choices yields all four combinations.
type _DemoFour = Expect<Equal<
  EPair<"a" | "b", "x" | "y">,
  "a:x" | "a:y" | "b:x" | "b:y"
>>;

// Pre-solved: never is a zero-cardinality slot and annihilates the template.
type _DemoZero = Expect<Equal<ETriple<"a", never, "1">, never>>;

// Pre-solved: products lose the two-pair correlation encoded explicitly above.
type _DemoExtraPairs = Expect<Equal<Exclude<Product, Correlated>, "get:team" | "set:user">>;

// A product cannot be assigned to a narrower correlated union.
declare const product: Product;
// @ts-expect-error Product may be one of the two cross-pairs.
const correlated: Correlated = product;
