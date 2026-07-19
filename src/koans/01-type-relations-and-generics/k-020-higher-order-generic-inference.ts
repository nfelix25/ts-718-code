import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-020: Higher-order generic inference
 * =============================================================================
 *
 * A higher-order function accepts or returns another function. Sometimes the
 * result must remain generic rather than choosing one T during the outer call.
 * Modern TypeScript can propagate a type parameter from a generic argument into
 * a returned function, preserving a relationship for each future invocation.
 *
 * I read the result of `compose(toArray, toBox)` aloud as:
 *
 *   "For every future T, accept a T, make T[], then box that exact T[]."
 *
 * This differs from returning `(value: unknown) => unknown`: a genuinely generic
 * function can be instantiated independently at string, number, and object calls.
 * An explicit broad annotation can erase that polymorphism even when the runtime
 * function is unchanged. Generic function values also have call signatures that
 * can be constrained, instantiated, passed through identity helpers, or captured
 * in closures. Partial application fixes only the parameters actually bound;
 * remaining argument tuples and results should keep their relationship.
 */

export function toArray<T>(value: T): T[] {
  return [value];
}

export function toBox<T>(value: T): { value: T } {
  return { value };
}

export function compose<Input, Middle, Output>(
  first: (value: Input) => Middle,
  second: (value: Middle) => Output,
): (value: Input) => Output {
  return (value) => second(first(value));
}

export function makeIdentity(): <T>(value: T) => T {
  return (value) => value;
}

export function bindFirst<First, Rest extends unknown[], Result>(
  fn: (first: First, ...rest: Rest) => Result,
  first: First,
): (...rest: Rest) => Result {
  return (...rest) => fn(first, ...rest);
}

export function lift<Input, Output>(
  transform: (value: Input) => Output,
): (values: readonly Input[]) => Output[] {
  return (values) => values.map(transform);
}

export function preserveGeneric<Fn extends <T>(value: T) => T>(fn: Fn): Fn {
  return fn;
}

// Part 1: A returned generic call signature is independently instantiated per call.
const mainIdentity = makeIdentity();
const mainIdentityNumber = mainIdentity(1);
const mainIdentityString = mainIdentity("a");
const mainIdentityObject = mainIdentity({ id: 1 });
const mainIdentityTuple = mainIdentity([1, "a"] as const);
type _Main01 = Expect<Equal<typeof mainIdentityNumber, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainIdentityString, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainIdentityObject, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainIdentityTuple, TODO>>; // TODO(koan) @koan-error

// Part 2: Composition can propagate genericity from generic arguments.
const mainBoxedArray = compose(toArray, toBox);
const mainBoxedNumber = mainBoxedArray(1);
const mainBoxedString = mainBoxedArray("a");
const mainBoxedObject = mainBoxedArray({ id: 1 });
const mainBoxedTuple = mainBoxedArray([1, "a"] as const);
type _Main05 = Expect<Equal<typeof mainBoxedNumber, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainBoxedString, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainBoxedObject, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainBoxedTuple, TODO>>; // TODO(koan) @koan-error

// Part 3: Concrete stages deliberately produce a monomorphic result.
const mainParseLength = compose((text: string) => text.trim(), (text) => text.length);
const mainPositiveText = compose((value: number) => value > 0, String);
const mainRecordId = compose((value: { id: number }) => value.id, String);
const mainArrayLength = compose(toArray, (values) => values.length);
type _Main09 = Expect<Equal<typeof mainParseLength, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainPositiveText, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainRecordId, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainArrayLength, TODO>>; // TODO(koan) @koan-error

// Part 4: Partial application fixes the bound prefix and preserves the rest tuple.
function mainFormat(prefix: string, value: number, suffix: string): string {
  return `${prefix}${value}${suffix}`;
}
const mainHashFormat = bindFirst(mainFormat, "#");
const mainHashValue = mainHashFormat(1, "!");
const mainAdder = bindFirst((left: number, right: number) => left + right, 10);
const mainAdded = mainAdder(5);
type _Main13 = Expect<Equal<typeof mainHashFormat, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainHashValue, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainAdder, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainAdded, TODO>>; // TODO(koan) @koan-error

// Part 5: Higher-order helpers can constrain or lift function relationships.
const mainPreservedIdentity = preserveGeneric(mainIdentity);
const mainPreserved = mainPreservedIdentity({ active: true });
const mainStringLengths = lift((text: string) => text.length);
const mainLengths = mainStringLengths(["a", "bb"]);
type _Main17 = Expect<Equal<typeof mainPreservedIdentity, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainPreserved, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainStringLengths, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainLengths, TODO>>; // TODO(koan) @koan-error
