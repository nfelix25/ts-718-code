import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-017: Multiple inference candidates
 * =============================================================================
 *
 * Every occurrence of a type parameter can contribute evidence. When several
 * argument positions mention the same T, inference gathers candidates and tries
 * to choose one type that makes the whole call valid. The result depends on the
 * kind of site, its constraint, literal widening, and whether candidates can be
 * combined without inventing an unsafe relationship.
 *
 * I read `<T>(left: T, right: T)` aloud as:
 *
 *   "Collect candidates for the same T from both arguments, choose a common T,
 *    then check both arguments after substitution."
 *
 * A primitive constraint can retain a finite literal union. Unconstrained
 * mutable positions often choose widened primitives or common object shapes.
 * Covariant factory returns can contribute alternative result candidates. A
 * `never` expression contributes no inhabitants and rarely widens another
 * candidate; `any` can dominate the result; `unknown` requires a safely broad
 * choice. Explicit type arguments skip candidate selection but still check every
 * argument. The next lesson isolates best-common-type rules for collections.
 */

export function chooseLiteral<T extends string | number | boolean>(
  left: T,
  right: T,
): T {
  return Math.random() ? left : right;
}

export function samePair<T>(left: T, right: T): [T, T] {
  return [left, right];
}

export function fromFactories<T>(...factories: Array<() => T>): T[] {
  return factories.map((factory) => factory());
}

export function arrayAndFallback<T>(values: readonly T[], fallback: T): T {
  return values[0] ?? fallback;
}

export function mergeIdentified<T extends { id: string }>(left: T, right: T): T[] {
  return [left, right];
}

// Part 1: A primitive constraint can retain alternatives as a literal union.
const mainLetters = chooseLiteral("a", "b");
const mainNumbers = chooseLiteral(1, 2);
const mainBooleans = chooseLiteral(true, false);
const mainRepeated = chooseLiteral("a", "a");
type _Main01 = Expect<Equal<typeof mainLetters, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainNumbers, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainBooleans, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainRepeated, TODO>>; // TODO(koan) @koan-error

// Part 2: Unconstrained mutable parameter sites commonly choose widened types.
const mainNumberPair = samePair(1, 2);
const mainStringPair = samePair("a", "b");
const mainBooleanPair = samePair(true, false);
const mainObjectPair = samePair({ id: 1 }, { id: 2 });
type _Main05 = Expect<Equal<typeof mainNumberPair, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainStringPair, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainBooleanPair, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainObjectPair, TODO>>; // TODO(koan) @koan-error

// Part 3: Factory returns supply covariant result candidates.
const mainFactoryNumbers = fromFactories(() => 1 as const, () => 2 as const);
const mainFactoryStrings = fromFactories(() => "a" as const, () => "b" as const);
const mainFactoryObjects = fromFactories(() => ({ id: 1 }), () => ({ id: 2 }));
const mainFactoryMixed = fromFactories<1 | "a">(() => 1, () => "a");
type _Main09 = Expect<Equal<typeof mainFactoryNumbers, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainFactoryStrings, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainFactoryObjects, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainFactoryMixed, TODO>>; // TODO(koan) @koan-error

// Part 4: Nested element and fallback sites both contribute candidates.
const mainArrayLiteral = arrayAndFallback(["a", "b"] as const, "c");
const mainArrayWide = arrayAndFallback(["a", "b"], "c");
const mainNumberArray = arrayAndFallback([1, 2] as const, 0);
const mainExplicitArray = arrayAndFallback<string | number>([1, 2], "none");
type _Main13 = Expect<Equal<typeof mainArrayLiteral, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainArrayWide, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainNumberArray, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainExplicitArray, TODO>>; // TODO(koan) @koan-error

// Part 5: Constrained object candidates keep a shared admissible structure.
const mainIdentified = mergeIdentified({ id: "a", active: true }, { id: "b", active: false });
const mainRichIdentified = mergeIdentified(
  { id: "a", role: "admin" as const },
  { id: "b", role: "user" as const },
);
const mainExtraIdentified = { id: "a", extra: 1 };
const mainExplicitIdentified = mergeIdentified<{ id: string }>(mainExtraIdentified, { id: "b" });
const mainReadonlyIdentified = mergeIdentified({ id: "a" } as const, { id: "b" } as const);
type _Main17 = Expect<Equal<typeof mainIdentified, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainRichIdentified, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainExplicitIdentified, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainReadonlyIdentified, TODO>>; // TODO(koan) @koan-error
