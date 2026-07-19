import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-087 guided drills: query-string parser
 * =============================================================================
 * Parse fields independently, recurse over ampersands, and apply the explicit
 * right-biased merge so later duplicate keys replace earlier properties.
 */

type DNum<S extends string> = S extends `${infer N extends number}` ? N : never;
type DBig<S extends string> = S extends `${infer D}n` ? D extends `${infer B extends bigint}` ? B : never : never;
type DScalar<S extends string> = S extends "true" ? true
  : S extends "false" ? false
  : S extends "null" ? null
  : S extends "undefined" ? undefined
  : DBig<S> extends never ? DNum<S> extends never ? S : DNum<S> : DBig<S>;
type DExpand<T> = { [K in keyof T]: T[K] };
type DMerge<A, B> = DExpand<Omit<A, keyof B> & B>;
type DEntry<S extends string> = S extends "" ? {}
  : S extends `${infer K}=${infer V}` ? K extends "" ? {} : { [P in K]: DScalar<V> }
  : { [P in S]: true };
type DBody<S extends string> = string extends S ? Record<string, string | number | bigint | boolean | null | undefined>
  : S extends `${infer H}&${infer R}` ? DMerge<DEntry<H>, DBody<R>> : DEntry<S>;
type DQuery<S extends string> = S extends unknown
  ? string extends S ? Record<string, string | number | bigint | boolean | null | undefined>
    : S extends `?${infer B}` ? DBody<B> : DBody<S>
  : never;

// Entry parsing handles typed values, flags, empty sides, and first equals.
type _D01 = Expect<Equal<DEntry<"name=Ada">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DEntry<"count=42">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DEntry<"enabled=true">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DEntry<"disabled=false">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DEntry<"empty=null">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DEntry<"missing=undefined">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DEntry<"limit=42n">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DEntry<"debug">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DEntry<"">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DEntry<"=ignored">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DEntry<"name=">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DEntry<"a=b=c">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DEntry<"x=01">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DEntry<"x=NaN">, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DEntry<"x=TRUE">, TODO>>; // TODO(koan) @koan-error

// Query bodies merge one, two, and many distinct fields.
type _D16 = Expect<Equal<DQuery<"name=Ada">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DQuery<"name=Ada&count=42">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DQuery<"a=1&b=2&c=3">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DQuery<"enabled=true&empty=null">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DQuery<"debug&count=1">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DQuery<"debug&verbose">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DQuery<"?name=Ada">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DQuery<"?name=Ada&count=42">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DQuery<"?debug">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DQuery<"?">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DQuery<"">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DQuery<"&">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DQuery<"&&">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DQuery<"a=1&&b=2&">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DQuery<"=x&a=1">, TODO>>; // TODO(koan) @koan-error

// Right-biased merge makes the final duplicate occurrence authoritative.
type _D31 = Expect<Equal<DQuery<"a=1&a=2">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DQuery<"a=1&a=true">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DQuery<"a=true&a=text">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DQuery<"flag&flag=false">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DQuery<"flag=false&flag">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DQuery<"a=1&b=2&a=3">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DQuery<"a=1&a=2&a=3">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DQuery<"a=1&b=2&b=3&a=4">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DQuery<"a=1&a=">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DQuery<"a=&a=1">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DQuery<"debug&debug">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DQuery<"a=1&=ignored&a=2">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DQuery<"a=1&&a=2">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DQuery<"a=1&a=2&b=3">["a"], TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<keyof DQuery<"a=1&a=2&b=3">, TODO>>; // TODO(koan) @koan-error

// Raw encoding, unions, broad text, and special types finish the parser boundary.
type _D46 = Expect<Equal<DQuery<"name=Ada+Lovelace">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DQuery<"name=Ada%20Lovelace">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DQuery<"path=a%2Fb">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DQuery<"a=1" | "b=2">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DQuery<"a=1" | "a=2">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DQuery<"a=1" | "debug">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DQuery<"a=1" | "">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DQuery<string>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DQuery<`${string}=${string}`>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DQuery<never>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DQuery<any>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DQuery<"x=1e3">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DQuery<"x=0x10">, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DQuery<"x=42n&y=false&z=null">, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DQuery<"a=b=c&d=e=f">, TODO>>; // TODO(koan) @koan-error
