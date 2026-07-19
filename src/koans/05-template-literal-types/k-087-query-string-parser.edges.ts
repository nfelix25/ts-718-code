import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-087 edge cases: query-string parser
 * =============================================================================
 * Query grammars need explicit merge and decoding policies. These cases stress
 * duplicate overwrites, empty fields/keys, first-equals behavior, raw encoding,
 * scalar widening, union distribution, broad fallback, any/never, and the
 * difference between overwrite merging and impossible intersections.
 */

type ENum<S extends string> = S extends `${infer N extends number}` ? N : never;
type EScalar<S extends string> = S extends "true" ? true
  : S extends "false" ? false
  : S extends "null" ? null
  : S extends "undefined" ? undefined
  : ENum<S> extends never ? S : ENum<S>;
type EExpand<T> = { [K in keyof T]: T[K] };
type EMerge<A, B> = EExpand<Omit<A, keyof B> & B>;
type EEntry<S extends string> = S extends "" ? {}
  : S extends `${infer K}=${infer V}` ? K extends "" ? {} : { [P in K]: EScalar<V> }
  : { [P in S]: true };
type EBody<S extends string> = string extends S ? Record<string, string | number | boolean | null | undefined>
  : S extends `${infer H}&${infer R}` ? EMerge<EEntry<H>, EBody<R>> : EEntry<S>;
type EQuery<S extends string> = S extends unknown
  ? string extends S ? Record<string, string | number | boolean | null | undefined>
    : S extends `?${infer B}` ? EBody<B> : EBody<S>
  : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty body components are ignored, including a leading question mark alone.
type _E01 = Expect<Equal<EQuery<"">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EQuery<"?">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EQuery<"&">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EQuery<"&&a=1&&">, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EQuery<"=ignored&a=1">, TODO>>; // TODO(koan) @koan-error

// First equals separates key and value; later equals remain raw value text.
type _E06 = Expect<Equal<EQuery<"a=b=c">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EQuery<"a==">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EQuery<"=a=b">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EQuery<"a=">, TODO>>; // TODO(koan) @koan-error

// Right-biased merge differs from intersecting duplicate property objects.
type _E10 = Expect<Equal<EQuery<"a=1&a=2">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EQuery<"a=1&a=true">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EQuery<"flag&flag=false">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<({ a: 1 } & { a: 2 })["a"], TODO>>; // TODO(koan) @koan-error

// Raw grammar intentionally does not decode percent escapes or plus signs.
type _E14 = Expect<Equal<EQuery<"name=Ada+Lovelace">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EQuery<"name=Ada%20Lovelace">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EQuery<"path=a%2Fb">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EQuery<"encoded%20key=value">, TODO>>; // TODO(koan) @koan-error

// Noncanonical numeric recognition may widen the property value.
type _E18 = Expect<Equal<EQuery<"x=01">, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EQuery<"x=1e3">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EQuery<"x=0x10">, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EQuery<"x=NaN">, TODO>>; // TODO(koan) @koan-error

// Literal query unions distribute to alternative object shapes.
type _E22 = Expect<Equal<EQuery<"a=1" | "b=2">, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EQuery<"a=1" | "a=2">, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<keyof EQuery<"a=1" | "b=2">, TODO>>; // TODO(koan) @koan-error

// Broad and special inputs use explicit boundary behavior.
type _E25 = Expect<Equal<EQuery<string>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EQuery<`${string}=${string}`>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EQuery<never>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EIsAny<EQuery<any>>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EQuery<any>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<keyof EQuery<string>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: duplicate keys take the final parsed value.
type _DemoLastWins = Expect<Equal<EQuery<"a=1&b=2&a=3">, { a: 3; b: 2 }>>;

// Pre-solved: intersecting conflicting duplicates would produce never instead.
type _DemoIntersectionWrongPolicy = Expect<Equal<({ a: 1 } & { a: 2 })["a"], never>>;

// Pre-solved: decoding remains visibly outside this grammar.
type _DemoRaw = Expect<Equal<EQuery<"name=Ada+Lovelace">, { name: "Ada+Lovelace" }>>;

// Query parsing is constrained to string source text.
// @ts-expect-error An object is not a query-string source.
type InvalidQuery = EQuery<{ a: 1 }>;
