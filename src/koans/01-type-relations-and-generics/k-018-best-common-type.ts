import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-018: Best common type
 * =============================================================================
 *
 * When one expression contains several candidate values, TypeScript looks for a
 * type that can represent every candidate. Array literals, conditional branches,
 * and some inferred generic collections use this best-common-type process. If
 * one candidate safely covers the others it may win; otherwise the checker often
 * forms a union. Mutable primitive literals widen before the final array type is
 * exposed.
 *
 * I read the type of `[a, b, c]` aloud as:
 *
 *   "Compare the static types of a, b, and c, choose an element type that accepts
 *    each one, then produce a mutable array of that element type."
 *
 * The algorithm does not search the entire inheritance graph for a convenient
 * ancestor that was never suggested. A contextual array annotation can supply
 * such a target. Object candidates may form unions with optional-looking absent
 * members, preserving which shapes appeared. `as const` asks for a readonly tuple
 * instead, retaining position and literal identity rather than finding one
 * homogeneous element type. Empty arrays, `any`, `unknown`, `never`, and nullish
 * candidates expose the sharpest boundaries.
 */

export function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}

export function last<T>(values: readonly T[]): T | undefined {
  return values.at(-1);
}

export function collect<T>(...values: T[]): T[] {
  return values;
}

export function copyList<T>(values: readonly T[]): T[] {
  return [...values];
}

// Part 1: Homogeneous primitive literals widen to ordinary element arrays.
const mainNumbers = [1, 2, 3];
const mainStrings = ["a", "b"];
const mainBooleans = [true, false];
const mainBigInts = [1n, 2n];
type _Main01 = Expect<Equal<typeof mainNumbers, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainStrings, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainBooleans, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainBigInts, TODO>>; // TODO(koan) @koan-error

// Part 2: Heterogeneous candidates produce element unions.
const mainStringNumber = [1, "a"];
const mainNullable = [1, null];
const mainOptional = ["a", undefined];
const mainThreeKinds = [1, "a", true];
type _Main05 = Expect<Equal<typeof mainStringNumber, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainNullable, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainOptional, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainThreeKinds, TODO>>; // TODO(koan) @koan-error

// Part 3: Related object candidates can share a shape or remain alternatives.
const mainSameShape = [{ id: 1 }, { id: 2 }];
const mainExtraShape = [{ id: 1 }, { id: 2, active: true }];
const mainDisjointShape = [{ left: 1 }, { right: "r" }];
const mainNestedShape = [{ data: { value: 1 } }, { data: { value: 2 } }];
type _Main09 = Expect<Equal<typeof mainSameShape, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainExtraShape, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainDisjointShape, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainNestedShape, TODO>>; // TODO(koan) @koan-error

// Part 4: Context may provide the common target.
class MainAnimal { animal = true; }
class MainDog extends MainAnimal { dog = true; }
class MainCat extends MainAnimal { cat = true; }
const mainInferredAnimals = [new MainDog(), new MainCat()];
const mainContextAnimals: MainAnimal[] = [new MainDog(), new MainCat()];
const mainContextObjects: Array<{ id: number }> = [{ id: 1 }, { id: 2, extra: true } as { id: number }];
const mainContextUnion: Array<string | number> = [1, "a"];
type _Main13 = Expect<Equal<typeof mainInferredAnimals, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainContextAnimals, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainContextObjects, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainContextUnion, TODO>>; // TODO(koan) @koan-error

// Part 5: Tuple preservation and generic consumption expose different views.
const mainTuple = ["ok", 200, true] as const;
const mainCopiedTuple = copyList(mainTuple);
const mainFirst = first([1, "a"]);
const mainCollected = collect<string | number>(1, "a");
type _Main17 = Expect<Equal<typeof mainTuple, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainCopiedTuple, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainFirst, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainCollected, TODO>>; // TODO(koan) @koan-error
