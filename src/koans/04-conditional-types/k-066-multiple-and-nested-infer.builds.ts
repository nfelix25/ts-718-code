import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-066: multiple and nested infer — constructions
 * =============================================================================
 *
 * These constructions capture several related positions in one structural
 * match, split variadic tuples, and follow captures through nested promises,
 * arrays, entries, functions, and returned properties. They emphasize that the
 * complete enclosing shape must match, repeated capture names combine
 * candidates rather than enforcing equality, and distributed union members
 * retain their own correlations. Replace each `TODO` with a type satisfying
 * the assertions directly below it.
 */

declare const givenToken: unique symbol;

interface GivenOverload {
  (value: string): number;
  (value: number): string;
}

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenPair<Value> =
  Value extends readonly [infer Left, infer Right] ? [Left, Right] : never;
type GivenSameCapture<Value> =
  Value extends readonly [infer Item, infer Item] ? Item : never;
type GivenPromiseArrayElement<Value> =
  Value extends PromiseLike<readonly (infer Element)[]> ? Element : never;
type GivenFunctionShape<Value> =
  Value extends (...args: infer Params) => infer Result
    ? [Params, Result]
    : never;

// ─── Exact multi-position tuple matching ─────────────────────────────────

// 1. Capture both positions of an exact readonly-compatible pair.
export type PairParts<Value> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<PairParts<[string, number]>, { left: string; right: number }>
>;
type _01b = Expect<
  Equal<PairParts<readonly ["id", 7]>, { left: "id"; right: 7 }>
>;
type _01c = Expect<
  Equal<
    PairParts<[1, "a"] | [2, "b"]>,
    { left: 1; right: "a" } | { left: 2; right: "b" }
  >
>;
type _01d = Expect<Equal<PairParts<[1, 2, 3]>, never>>;
type _01e = Expect<Equal<PairParts<string[]>, never>>;

// 2. Require both an exact pair cardinality and a mutable container.
export type MutablePairParts<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<MutablePairParts<[1, 2]>, [1, 2]>>;
type _02b = Expect<
  Equal<MutablePairParts<readonly [1, 2]>, never>
>;
type _02c = Expect<Equal<MutablePairParts<[1, 2?]>, never>>;
type _02d = Expect<Equal<MutablePairParts<[1, ...2[]]>, never>>;
type _02e = Expect<
  Equal<MutablePairParts<[1, 2] | readonly [3, 4]>, [1, 2]>
>;

// 3. Capture all three positions of an exact readonly-compatible triple.
export type TripleParts<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<TripleParts<[1, 2, 3]>, [1, 2, 3]>>;
type _03b = Expect<
  Equal<TripleParts<readonly ["a", true, Date]>, ["a", true, Date]>
>;
type _03c = Expect<Equal<TripleParts<[1, 2]>, never>>;
type _03d = Expect<Equal<TripleParts<[1, 2, 3, 4]>, never>>;
type _03e = Expect<
  Equal<TripleParts<[1, 2, 3] | ["x", "y", "z"]>, [1, 2, 3] | ["x", "y", "z"]>
>;

// 4. Reuse one infer name so covariant candidates combine into a union.
export type RepeatedPairCapture<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<RepeatedPairCapture<[1, 1]>, 1>>;
type _04b = Expect<Equal<RepeatedPairCapture<[1, 2]>, 1 | 2>>;
type _04c = Expect<
  Equal<RepeatedPairCapture<[string, number]>, string | number>
>;
type _04d = Expect<
  Equal<RepeatedPairCapture<readonly [true, false]>, boolean>
>;
type _04e = Expect<
  Equal<
    RepeatedPairCapture<[1, "a"] | [2, "b"]>,
    1 | 2 | "a" | "b"
  >
>;

// 5. Return an exact pair or a deliberate fallback when the whole shape fails.
export type PairOr<Value, Fallback> = TODO; // TODO(koan)

type _05a = Expect<Equal<PairOr<[1, 2], "invalid">, [1, 2]>>;
type _05b = Expect<Equal<PairOr<[1], "invalid">, "invalid">>;
type _05c = Expect<
  Equal<PairOr<[1, 2] | [3] | string, "invalid">, [1, 2] | "invalid">
>;
type _05d = Expect<Equal<PairOr<[], null>, null>>;
type _05e = Expect<Equal<PairOr<never, null>, never>>;

// ─── Variadic tuple decomposition ────────────────────────────────────────

// 6. Capture a required tuple head and the complete remaining tuple.
export type HeadAndTail<Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<HeadAndTail<["a", 1, true]>, ["a", [1, true]]>
>;
type _06b = Expect<Equal<HeadAndTail<readonly [1]>, [1, []]>>;
type _06c = Expect<Equal<HeadAndTail<[]>, never>>;
type _06d = Expect<
  Equal<
    HeadAndTail<[head: string, ...tail: number[]]>,
    [string, number[]]
  >
>;
type _06e = Expect<
  Equal<HeadAndTail<[1, "a"] | [2, "b", true]>, [1, ["a"]] | [2, ["b", true]]>
>;

// 7. Capture required endpoints and preserve every middle position.
export type TupleEnds<Value> = TODO; // TODO(koan)

type _07a = Expect<Equal<TupleEnds<[1, 2]>, [1, [], 2]>>;
type _07b = Expect<Equal<TupleEnds<[1, 2, 3]>, [1, [2], 3]>>;
type _07c = Expect<
  Equal<
    TupleEnds<readonly ["a", true, 3, "z"]>,
    ["a", [true, 3], "z"]
  >
>;
type _07d = Expect<Equal<TupleEnds<[1]>, never>>;
type _07e = Expect<
  Equal<
    TupleEnds<[head: string, ...middle: boolean[], last: number]>,
    [string, boolean[], number]
  >
>;

// ─── Nested arrays and entry shapes ──────────────────────────────────────

// 8. Capture key and value unions from an array whose elements are pairs.
export type EntryParts<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<EntryParts<Array<[string, number]>>, [string, number]>
>;
type _08b = Expect<
  Equal<
    EntryParts<readonly [readonly ["id", 1], readonly ["name", "Ada"]]>,
    ["id" | "name", 1 | "Ada"]
  >
>;
type _08c = Expect<
  Equal<
    EntryParts<Array<[string, number] | [number, string]>>,
    [string | number, string | number]
  >
>;
type _08d = Expect<Equal<EntryParts<string[]>, never>>;
type _08e = Expect<Equal<EntryParts<[]>, [unknown, unknown]>>;

// 9. Require a promise-like whose fulfilled value is one exact pair.
export type PromisedPair<Value> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<PromisedPair<Promise<[string, number]>>, [string, number]>
>;
type _09b = Expect<
  Equal<PromisedPair<Promise<readonly [1, 2]>>, [1, 2]>
>;
type _09c = Expect<Equal<PromisedPair<Promise<[1]>>, never>>;
type _09d = Expect<
  Equal<PromisedPair<[Promise<1>, Promise<2>]>, never>
>;
type _09e = Expect<
  Equal<
    PromisedPair<Promise<[1, "a"]> | Promise<[2, "b"]>>,
    [1, "a"] | [2, "b"]
  >
>;

// 10. Capture an element only when a promise-like fulfills with an array.
export type PromiseArrayElement<Value> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<PromiseArrayElement<Promise<string[]>>, string>
>;
type _10b = Expect<
  Equal<PromiseArrayElement<Promise<readonly [1, 2]>>, 1 | 2>
>;
type _10c = Expect<
  Equal<
    PromiseArrayElement<Promise<string[]> | Promise<number[]>>,
    string | number
  >
>;
type _10d = Expect<
  Equal<PromiseArrayElement<Promise<string[]> | string[]>, string>
>;
type _10e = Expect<
  Equal<PromiseArrayElement<Promise<[]>>, never>
>;

// 11. Capture an array element first, then inspect it as a promise-like.
export type ArrayPromiseValue<Value> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<ArrayPromiseValue<Array<Promise<string>>>, string>
>;
type _11b = Expect<
  Equal<
    ArrayPromiseValue<readonly [Promise<1>, Promise<2>]>,
    1 | 2
  >
>;
type _11c = Expect<
  Equal<ArrayPromiseValue<Array<Promise<string> | number>>, string>
>;
type _11d = Expect<
  Equal<ArrayPromiseValue<Promise<string[]>>, never>
>;
type _11e = Expect<Equal<ArrayPromiseValue<[]>, never>>;

// 12. Capture key and value unions through promise, array, and pair layers.
export type PromisedEntryParts<Value> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    PromisedEntryParts<Promise<Array<[string, number]>>>,
    [string, number]
  >
>;
type _12b = Expect<
  Equal<
    PromisedEntryParts<
      Promise<readonly [readonly ["id", 1], readonly ["active", true]]>
    >,
    ["id" | "active", 1 | true]
  >
>;
type _12c = Expect<
  Equal<PromisedEntryParts<Promise<string[]>>, never>
>;
type _12d = Expect<
  Equal<PromisedEntryParts<Array<Promise<[string, number]>>>, never>
>;

// ─── Correlated function and return-shape inference ──────────────────────

// 13. Capture a function's parameter tuple together with its result.
export type FunctionShape<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    FunctionShape<(id: number) => string>,
    { params: [id: number]; result: string }
  >
>;
type _13b = Expect<
  Equal<FunctionShape<() => void>, { params: []; result: void }>
>;
type _13c = Expect<
  Equal<
    FunctionShape<((value: 1) => "a") | ((value: 2) => "b")>,
    | { params: [value: 1]; result: "a" }
    | { params: [value: 2]; result: "b" }
  >
>;
type _13d = Expect<
  Equal<
    FunctionShape<GivenOverload>,
    { params: [value: number]; result: string }
  >
>;
type _13e = Expect<Equal<FunctionShape<string>, never>>;

// 14. Capture function parameters and the element type of its array result.
export type ReturnedArray<Value> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<ReturnedArray<() => string[]>, [[], string]>
>;
type _14b = Expect<
  Equal<
    ReturnedArray<(id: number) => readonly boolean[]>,
    [[id: number], boolean]
  >
>;
type _14c = Expect<
  Equal<
    ReturnedArray<(...values: string[]) => [number, boolean]>,
    [string[], number | boolean]
  >
>;
type _14d = Expect<Equal<ReturnedArray<() => []>, [[], never]>>;
type _14e = Expect<Equal<ReturnedArray<() => string>, never>>;

// 15. Capture a result, then inspect it for one required keyed property.
export type ReturnedProperty<Value, Key extends PropertyKey> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<ReturnedProperty<() => { id: number }, "id">, number>
>;
type _15b = Expect<
  Equal<
    ReturnedProperty<
      (name: string) => { name: string; active: boolean },
      "active"
    >,
    boolean
  >
>;
type _15c = Expect<
  Equal<ReturnedProperty<() => { id?: number }, "id">, never>
>;
type _15d = Expect<
  Equal<
    ReturnedProperty<() => { id: 1 } | { name: string }, "id">,
    1
  >
>;
type _15e = Expect<Equal<ReturnedProperty<string, "id">, never>>;

// 16. Capture an exact pair returned by a function.
export type ReturnedPair<Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    ReturnedPair<() => [string, number]>,
    { params: []; pair: [string, number] }
  >
>;
type _16b = Expect<
  Equal<
    ReturnedPair<(id: number) => readonly [1, "ok"]>,
    { params: [id: number]; pair: [1, "ok"] }
  >
>;
type _16c = Expect<Equal<ReturnedPair<() => [1]>, never>>;
type _16d = Expect<Equal<ReturnedPair<() => string[]>, never>>;
type _16e = Expect<
  Equal<
    ReturnedPair<(() => [1, "a"]) | (() => [2, "b"])>,
    { params: []; pair: [1, "a"] } | { params: []; pair: [2, "b"] }
  >
>;

// 17. Capture a function result, then unwrap one promise-like layer.
export type ReturnedPromiseValue<Value> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    ReturnedPromiseValue<() => Promise<string>>,
    { params: []; fulfilled: string }
  >
>;
type _17b = Expect<
  Equal<
    ReturnedPromiseValue<(id: number) => Promise<{ id: number }>>,
    { params: [id: number]; fulfilled: { id: number } }
  >
>;
type _17c = Expect<
  Equal<
    ReturnedPromiseValue<() => Promise<Promise<number>>>,
    { params: []; fulfilled: Promise<number> }
  >
>;
type _17d = Expect<Equal<ReturnedPromiseValue<() => number>, never>>;
type _17e = Expect<
  Equal<
    ReturnedPromiseValue<(() => Promise<1>) | (() => 2)>,
    { params: []; fulfilled: 1 }
  >
>;

// 18. Follow function, promise, and required-property layers in stages.
export type ReturnedPromisedProperty<
  Value,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    ReturnedPromisedProperty<() => Promise<{ id: number }>, "id">,
    { params: []; property: number }
  >
>;
type _18b = Expect<
  Equal<
    ReturnedPromisedProperty<
      (name: string, active?: boolean) => Promise<{ name: string }>,
      "name"
    >,
    {
      params: [name: string, active?: boolean | undefined];
      property: string;
    }
  >
>;
type _18c = Expect<
  Equal<
    ReturnedPromisedProperty<() => Promise<{ id?: number }>, "id">,
    never
  >
>;
type _18d = Expect<
  Equal<ReturnedPromisedProperty<() => { id: number }, "id">, never>
>;
type _18e = Expect<
  Equal<
    ReturnedPromisedProperty<
      (() => Promise<{ id: 1 }>) | (() => Promise<{ name: "x" }>),
      "id"
    >,
    { params: []; property: 1 }
  >
>;

// ─── Special inputs and nested synthesis ─────────────────────────────────

// 19. Report whether special inputs poison three representative captures.
export type MultiInferSpecialFlags<Value> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<MultiInferSpecialFlags<any>, [false, false, false]>
>;
type _19b = Expect<
  Equal<MultiInferSpecialFlags<never>, [false, false, false]>
>;
type _19c = Expect<
  Equal<MultiInferSpecialFlags<unknown>, [false, false, false]>
>;
type _19d = Expect<
  Equal<
    MultiInferSpecialFlags<
      readonly [any, any] & PromiseLike<any> & (() => any)
    >,
    [true, false, true]
  >
>;

// 20. Classify several nested outer shapes while retaining captured evidence.
export type NestedInferenceKind<Value> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    NestedInferenceKind<Promise<readonly [1, 2]>>,
    { kind: "promised-array"; element: 1 | 2 }
  >
>;
type _20b = Expect<
  Equal<
    NestedInferenceKind<readonly [["id", 1], ["name", "Ada"]]>,
    {
      kind: "entries";
      key: "id" | "name";
      value: 1 | "Ada";
    }
  >
>;
type _20c = Expect<
  Equal<
    NestedInferenceKind<(id: number) => readonly boolean[]>,
    {
      kind: "returned-array";
      params: [id: number];
      element: boolean;
    }
  >
>;
type _20d = Expect<
  Equal<
    NestedInferenceKind<readonly [typeof givenToken, Date]>,
    {
      kind: "pair";
      left: typeof givenToken;
      right: Date;
    }
  >
>;
type _20e = Expect<Equal<NestedInferenceKind<unknown>, never>>;
