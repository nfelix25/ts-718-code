import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanPartial, KoanRequired } from "./k-122-rebuild-partial-and-required.js";

/** EDGE CASES: exact optional writes, tuple optionality, shallow mapping, and top types. */

type P<T> = KoanPartial<T>;
type R<T> = KoanRequired<T>;

// Pre-solved demonstrations.
type _DemoRequiredOptional = Expect<Equal<R<{ value?: string }>, { value: string }>>;
type _DemoExplicitUndefinedRemains = Expect<Equal<R<{ value?: string | undefined }>, { value: string | undefined }>>;
type _DemoReadonlyOrthogonal = Expect<Equal<P<{ readonly id: string }>, { readonly id?: string }>>;
type _DemoShallow = Expect<Equal<P<{ nested: { id: string } }>, { nested?: { id: string } }>>;
type _DemoTuple = Expect<Equal<R<[a?: string, b?: number]>, [a: string, b: number]>>;
type _DemoUnknown = Expect<Equal<P<unknown>, {}>>;

// Under exact optional properties, absent does not imply writable undefined.
declare const partialText: P<{ text: string }>;
// @ts-expect-error text may be absent, but explicit undefined is not a valid write.
partialText.text = undefined;

// 1. Exact optional value domains (1-8)
type _01 = Expect<Equal<P<{ a: string }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<P<{ a: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<R<{ a?: string }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<R<{ a?: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<R<P<{ a: string }>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<R<P<{ a: string | undefined }>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<P<R<{ a?: string }>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<P<R<{ a?: string | undefined }>>, TODO>>; // TODO(koan) @koan-error

// 2. Tuples encode presence in their length domain (9-16)
type _09 = Expect<Equal<P<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<P<[string, number]>["length"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<R<[string?, number?]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<R<[string?, number?]>["length"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<P<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<R<readonly [1?, 2?]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<P<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<R<[head?: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error

// 3. Shallow mapping and index signatures (17-23)
type _17 = Expect<Equal<P<{ nested: { value: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<R<{ nested?: { value?: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<P<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<R<P<Record<string, number>>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<P<{ [key: string]: number; fixed: 1 }>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<R<{ [key: string]: number | undefined; fixed?: 1 }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<keyof P<Record<string, number>>, TODO>>; // TODO(koan) @koan-error

// 4. Special inputs and homomorphic union behavior (24-30)
type _24 = Expect<Equal<P<never>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<R<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<P<unknown>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<R<unknown>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<P<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<R<{ a?: 1 } | { b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<P<(() => void) & { meta: string }>, TODO>>; // TODO(koan) @koan-error
