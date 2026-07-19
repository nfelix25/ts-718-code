import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-096 edge cases: tuple to union
 * =============================================================================
 * Numeric indexing is deliberately lossy. Empty, duplicate, optional, broad,
 * and special element domains reveal exactly what information survives and how
 * a mapped discriminant can retain correlation before the final union step.
 */

type EE<T extends readonly unknown[]> = T[number];
type ETagged<T extends readonly unknown[]> = { [K in keyof T]: { index: K; value: T[K] } }[number];
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty and never-valued positions normalize through never.
type _E01 = Expect<Equal<EE<[]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EE<[never]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EE<[never, 1]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<Equal<EE<[]>, EE<[never]>>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EE<never[]>, TODO>>; // TODO(koan) @koan-error

// Duplicates, order, and cardinality are irrecoverable from the union alone.
type _E06 = Expect<Equal<EE<[1, 1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<Equal<EE<[1, 2]>, EE<[2, 1]>>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<Equal<EE<[1]>, EE<[1, 1, 1]>>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<Equal<EE<[1, 2]>, EE<[1, 2, 1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<Equal<[1, 2], [2, 1]>, TODO>>; // TODO(koan) @koan-error

// Optional positions introduce undefined; explicit unions may already contain it.
type _E11 = Expect<Equal<EE<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EE<[value: string | undefined]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Equal<EE<[value?: string]>, EE<[value: string | undefined]>>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EE<[never?]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EIsAny<EE<[any?]>>, TODO>>; // TODO(koan) @koan-error

// Unknown absorbs unions and any poisons them.
type _E16 = Expect<Equal<EE<[unknown, 1]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EIsAny<EE<[any, 1]>>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EE<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EIsAny<EE<any[]>>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EE<never>, TODO>>; // TODO(koan) @koan-error

// Widened arrays lose literal vocabulary before numeric indexing happens.
const eWide = ["get", "post"];
const eNarrow = ["get", "post"] as const;
type _E21 = Expect<Equal<EE<typeof eWide>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EE<typeof eNarrow>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<Equal<EE<typeof eWide>, EE<typeof eNarrow>>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<typeof eWide["length"], TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<typeof eNarrow["length"], TODO>>; // TODO(koan) @koan-error

// Mapping a discriminant before indexing retains position/value correlation.
type Choices = ETagged<readonly ["a", 2, true]>;
type _E26 = Expect<Equal<Choices, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<Extract<Choices, { index: "0" }>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<Extract<Choices, { index: "1" }>["value"], TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<Extract<Choices, { value: true }>["index"], TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ETagged<[]>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: an empty tuple has no possible numeric element.
type _DemoEmpty = Expect<Equal<EE<[]>, never>>;

// Pre-solved: union construction removes duplicates and order.
type _DemoNormalized = Expect<Equal<EE<[1, 2, 1]>, 1 | 2>>;

// Pre-solved: readonly does not change observed element values.
type _DemoReadonly = Expect<Equal<EE<readonly [1, 2]>, EE<[1, 2]>>>;

declare function acceptVocabulary<Value extends readonly unknown[]>(values: Value, value: Value[number]): void;
// @ts-expect-error The candidate is outside the literal tuple vocabulary.
acceptVocabulary(["get", "post"] as const, "delete");
