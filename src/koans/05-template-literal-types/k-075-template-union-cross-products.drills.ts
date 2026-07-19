import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-075 guided drills: template union cross-products
 * =============================================================================
 * Enumerate each independent slot, multiply the choices, then normalize any
 * duplicate strings. Keep explicit correlated unions separate from products.
 */

type DPair<A extends string | number | boolean, B extends string | number | boolean> = `${A}:${B}`;
type DTriple<A extends string, B extends string, C extends string> = `${A}-${B}-${C}`;
type DQuad<A extends string, B extends string, C extends string, D extends string> = `${A}${B}${C}${D}`;
type DProductOnly<A extends string, B extends string, Correlated extends string> = Exclude<`${A}:${B}`, Correlated>;

// One union-valued slot emits one string per distinct member.
type _D01 = Expect<Equal<`x${"a" | "b"}`, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<`${"a" | "b"}x`, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DPair<"a" | "b", "x">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DPair<"a", "x" | "y">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DPair<1 | 2, "x">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DPair<"x", 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DPair<boolean, "flag">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DPair<"flag", boolean>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DPair<true | false, "x">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DPair<"same" | "same", "x">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DPair<never, "x">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DPair<"x", never>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<`${null | undefined}`, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<`v${1 | 2 | 3}`, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<`${"red" | "green" | "blue"}!`, TODO>>; // TODO(koan) @koan-error

// Two union slots form their full Cartesian product.
type _D16 = Expect<Equal<DPair<"a" | "b", "x" | "y">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DPair<"a" | "b" | "c", "x" | "y">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DPair<"get" | "post", "users" | "teams">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DPair<1 | 2, 3 | 4>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DPair<boolean, boolean>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DPair<"x" | "y", boolean>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DPair<1 | 2, boolean>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<`${"a" | "b"}/${"x" | "y"}`, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<`(${"a" | "b"},${1 | 2})`, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<`${"on" | "off"}-${true | false}`, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DPair<string, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DPair<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DPair<number, "px" | "rem">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DPair<"row" | "col", number>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DPair<never, never>, TODO>>; // TODO(koan) @koan-error

// Three and four slots multiply again; keep the member sets modest.
type _D31 = Expect<Equal<DTriple<"a" | "b", "x", "1">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DTriple<"a", "x" | "y", "1">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DTriple<"a", "x", "1" | "2">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DTriple<"a" | "b", "x" | "y", "1">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DTriple<"a" | "b", "x", "1" | "2">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DTriple<"a", "x" | "y", "1" | "2">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DTriple<"a" | "b", "x" | "y", "1" | "2">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DTriple<"get" | "set", "user" | "team", "sync" | "async">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DTriple<never, "x", "1">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DTriple<"a", never, "1">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DTriple<"a", "x", never>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DQuad<"a" | "b", "1" | "2", "x", "!">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DQuad<"a" | "b", "1" | "2", "x" | "y", "!">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DQuad<"a", "1", "x", "!">, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DQuad<"a", never, "x", "!">, TODO>>; // TODO(koan) @koan-error

// Explicit correlated strings and full products answer different questions.
type _D46 = Expect<Equal<"get:user" | "set:team", TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DPair<"get" | "set", "user" | "team">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DProductOnly<"get" | "set", "user" | "team", "get:user" | "set:team">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<Extract<DPair<"get" | "set", "user" | "team">, "get:user" | "set:team">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<Exclude<DPair<"get" | "set", "user" | "team">, "get:user">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DPair<"read" | "write", "file" | "db"> extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<"read:file" extends DPair<"read" | "write", "file" | "db"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<"delete:file" extends DPair<"read" | "write", "file" | "db"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DPair<"a" | "b", "x" | "y"> | "a:x", TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DPair<"a" | never, "x" | "y">, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DPair<"a" | "a", "x" | "x">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DPair<string, string>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DPair<`${number}`, "px" | "rem">, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DTriple<string, "x" | "y", "1" | "2">, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DTriple<"a" | "b", string, "1">, TODO>>; // TODO(koan) @koan-error
