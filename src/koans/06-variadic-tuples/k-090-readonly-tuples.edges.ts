import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-090 edge cases: readonly tuples
 * =============================================================================
 * Readonly is shallow as a type modifier, array covariance still matters, and
 * special types can obscure capability checks. These cases separate the outer
 * tuple's write surface from the mutability of values stored inside it.
 */

type EMutable<T extends readonly unknown[]> = { -readonly [K in keyof T]: T[K] };
type EReadonly<T extends readonly unknown[]> = { readonly [K in keyof T]: T[K] };
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Outer readonly does not recursively freeze referenced element types.
type MutableBox = { value: number };
type Shallow = readonly [box: MutableBox, nested: [number]];
type _E01 = Expect<Equal<Shallow[0], TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<Shallow[0]["value"], TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<Shallow[1], TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<Shallow[1] extends readonly number[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Readonly<MutableBox> extends Shallow[0] ? true : false, TODO>>; // TODO(koan) @koan-error

// Element variance and outer write capability are independent axes.
type _E06 = Expect<Equal<readonly ["a"] extends readonly [string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<readonly [string] extends readonly ["a"] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<["a"] extends readonly [string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<readonly ["a"] extends [string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<readonly never[] extends readonly string[] ? true : false, TODO>>; // TODO(koan) @koan-error

// Mapped conversion is idempotent and distributes over tuple unions.
type _E11 = Expect<Equal<EMutable<EMutable<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EReadonly<EReadonly<[1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EMutable<readonly [1] | readonly [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EReadonly<[1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EMutable<readonly never[]>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EReadonly<never[]>, TODO>>; // TODO(koan) @koan-error

// Removing outer readonly leaves nested readonly values untouched.
type DeepSource = readonly [readonly [1, 2], { readonly id: 1 }];
type _E17 = Expect<Equal<EMutable<DeepSource>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EMutable<DeepSource>[0], TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EMutable<DeepSource>[1], TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<Equal<EMutable<DeepSource>[0], [1, 2]>, TODO>>; // TODO(koan) @koan-error

// `any` and `never` require classification rather than naive equality.
type _E21 = Expect<Equal<EIsAny<EMutable<any>>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EIsAny<EReadonly<any>>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EMutable<never>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EReadonly<never>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EIsAny<(readonly [any])[number]>, TODO>>; // TODO(koan) @koan-error

// Key surfaces reveal missing mutation methods on readonly arrays.
type _E26 = Expect<Equal<"push" extends keyof [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<"push" extends keyof readonly [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<"map" extends keyof readonly [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<keyof [1, 2] extends keyof readonly [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<keyof readonly [1, 2] extends keyof [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a mutable tuple can satisfy a readonly tuple contract.
type _DemoMutableToReadonly = Expect<[1, 2] extends readonly [number, number] ? true : false>;

// Pre-solved: mapped removal changes only the outer tuple modifier.
type _DemoShallowRemoval = Expect<Equal<EMutable<readonly [readonly [1]]>, [readonly [1]]>>;

// Pre-solved: readonly tuples retain nonmutating array methods.
type _DemoMapExists = Expect<Equal<"map" extends keyof readonly [1, 2] ? true : false, true>>;

declare const frozenPair: readonly [1, 2];
// @ts-expect-error A readonly index cannot be assigned through this view.
frozenPair[0] = 1;
// @ts-expect-error Readonly tuples omit mutating array methods.
frozenPair.push(3);
