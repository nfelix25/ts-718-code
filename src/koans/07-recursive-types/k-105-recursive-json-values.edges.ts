import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-105 edge cases: recursive JSON values
 * =============================================================================
 * Static JsonValue is necessarily an approximation. It cannot refine number to
 * finite values, prove density or acyclicity, inspect prototypes, or ensure that
 * an unknown runtime value came from JSON.parse.
 */

type EP = string | number | boolean | null;
type EV = EP | EO | EA;
interface EO { readonly [key: string]: EV }
interface EA extends ReadonlyArray<EV> {}
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// The number type includes values that strict runtime validation rejects.
type _E01 = Expect<Equal<typeof NaN extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<typeof Infinity extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<-0 extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<number extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<bigint extends EV ? true : false, TODO>>; // TODO(koan) @koan-error

// Optional undefined can make an otherwise JSON-shaped object incompatible.
type _E06 = Expect<Equal<{ x?: string } extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<{ x?: string | undefined } extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<{ x: string | undefined } extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<{ readonly x: string } extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<Record<string, never> extends EV ? true : false, TODO>>; // TODO(koan) @koan-error

// Built-in objects and prototypes may stringify but are outside the clean model.
type _E11 = Expect<Equal<Date extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<Map<string, string> extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Set<number> extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<RegExp extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<Error extends EV ? true : false, TODO>>; // TODO(koan) @koan-error

// Symbol keys are invisible to the string index grammar.
declare const secret: unique symbol;
type SymbolObject = { x: 1; [secret]: 2 };
type _E16 = Expect<Equal<SymbolObject extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<keyof EO, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<symbol extends keyof EO ? true : false, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<number extends keyof EO ? true : false, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<string extends keyof EO ? true : false, TODO>>; // TODO(koan) @koan-error

// Structural recursion cannot reject aliases or cyclic runtime references.
interface CyclicObject { readonly self: CyclicObject }
type _E21 = Expect<Equal<CyclicObject extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EA extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<readonly EA[] extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EO["self"], TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EO[string], TODO>>; // TODO(koan) @koan-error

// Any, unknown, and never need explicit boundary handling.
type _E26 = Expect<Equal<EIsAny<any & EV>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<unknown extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<never extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<unknown[] extends EV ? true : false, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<never[] extends EV ? true : false, TODO>>; // TODO(koan) @koan-error

// Pre-solved: undefined is not a JSON value.
type _DemoUndefined = Expect<Equal<undefined extends EV ? true : false, false>>;

// Pre-solved: deeply nested arrays remain JSON when every leaf is valid.
type _DemoNested = Expect<readonly [1, readonly ["x", readonly [null]]] extends EV ? true : false>;

// Pre-solved: the static number branch cannot exclude NaN.
type _DemoNaN = Expect<Equal<typeof NaN extends EV ? true : false, true>>;

declare function acceptsJson(value: EV): void;
// @ts-expect-error BigInt is not part of the JSON primitive grammar.
acceptsJson({ count: 1n });
