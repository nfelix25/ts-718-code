import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-068: covariant inference candidates — constructions
 * =============================================================================
 *
 * These constructions reuse inferred variables in value-producing property,
 * tuple, return, array, and promise positions. Successful candidates combine
 * as unions inside each structural match, then ordinary union normalization
 * handles broad primitives, never, unknown, and any; outer unions still
 * distribute independently. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

declare const givenToken: unique symbol;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;
type GivenIsUnknown<Value> =
  GivenIsAny<Value> extends true
    ? false
    : unknown extends Value ? true : false;
type GivenCandidateProfile<Value> = [
  GivenIsAny<Value>,
  GivenIsNever<Value>,
  GivenIsUnknown<Value>,
  Value,
];
type GivenPropertyCandidates<Value> =
  Value extends { left: infer Candidate; right: infer Candidate }
    ? Candidate
    : never;
type GivenTupleCandidates<Value> =
  Value extends readonly [infer Candidate, infer Candidate]
    ? Candidate
    : never;
type GivenReturnCandidates<Value> =
  Value extends {
    left: (...args: any[]) => infer Candidate;
    right: (...args: any[]) => infer Candidate;
  }
    ? Candidate
    : never;
type GivenPromiseCandidates<Value> =
  Value extends readonly [
    PromiseLike<infer Candidate>,
    PromiseLike<infer Candidate>,
  ]
    ? Candidate
    : never;

// ─── Required property candidates ────────────────────────────────────────

// 1. Combine two required property-value candidates as a union.
export type PropertyCandidates<Value> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<PropertyCandidates<{ left: 1; right: 2 }>, 1 | 2>
>;
type _01b = Expect<
  Equal<PropertyCandidates<{ left: string; right: number }>, string | number>
>;
type _01c = Expect<
  Equal<PropertyCandidates<{ left: "a"; right: string }>, string>
>;
type _01d = Expect<
  Equal<PropertyCandidates<{ readonly left: 1; readonly right: 2 }>, 1 | 2>
>;
type _01e = Expect<
  Equal<PropertyCandidates<{ left: 1 }>, never>
>;

// 2. Combine three required property-value candidates.
export type TriplePropertyCandidates<Value> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    TriplePropertyCandidates<{ first: 1; second: 2; third: 3 }>,
    1 | 2 | 3
  >
>;
type _02b = Expect<
  Equal<
    TriplePropertyCandidates<{ first: "x"; second: string; third: "y" }>,
    string
  >
>;
type _02c = Expect<
  Equal<
    TriplePropertyCandidates<{ first: true; second: false; third: boolean }>,
    boolean
  >
>;
type _02d = Expect<
  Equal<
    TriplePropertyCandidates<{ first: 1; second: never; third: 2 }>,
    1 | 2
  >
>;
type _02e = Expect<
  Equal<
    TriplePropertyCandidates<{ first: 1; second: unknown; third: 2 }>,
    unknown
  >
>;

// 3. Combine values from two caller-selected required property keys.
export type KeyedCandidates<
  Value,
  LeftKey extends PropertyKey,
  RightKey extends PropertyKey,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<KeyedCandidates<{ a: 1; b: 2 }, "a", "b">, 1 | 2>
>;
type _03b = Expect<
  Equal<
    KeyedCandidates<{ name: "Ada"; count: number }, "name", "count">,
    "Ada" | number
  >
>;
type _03c = Expect<
  Equal<
    KeyedCandidates<{ 0: string; [givenToken]: Date }, 0, typeof givenToken>,
    string | Date
  >
>;
type _03d = Expect<
  Equal<KeyedCandidates<{ a: 1 }, "a", "b">, never>
>;
type _03e = Expect<
  Equal<
    KeyedCandidates<{ a: 1; b?: 2 }, "a", "b">,
    never
  >
>;

// 4. Preserve each side while also exposing its candidate union.
export type PropertyCandidateDetails<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    PropertyCandidateDetails<{ left: 1; right: "a" }>,
    { left: 1; right: "a"; candidates: 1 | "a" }
  >
>;
type _04b = Expect<
  Equal<
    PropertyCandidateDetails<
      { left: 1; right: "a" } | { left: 2; right: "b" }
    >,
    | { left: 1; right: "a"; candidates: 1 | "a" }
    | { left: 2; right: "b"; candidates: 2 | "b" }
  >
>;
type _04c = Expect<
  Equal<
    PropertyCandidateDetails<{
      left: 1 | 2;
      right: "a" | "b";
    }>,
    {
      left: 1 | 2;
      right: "a" | "b";
      candidates: 1 | 2 | "a" | "b";
    }
  >
>;
type _04d = Expect<
  Equal<PropertyCandidateDetails<{ left: 1 }>, never>
>;
type _04e = Expect<
  Equal<
    PropertyCandidateDetails<{
      left: { id: 1 };
      right: { name: "Ada" };
    }>,
    {
      left: { id: 1 };
      right: { name: "Ada" };
      candidates: { id: 1 } | { name: "Ada" };
    }
  >
>;

// 5. Report required-shape success instead of silently returning never.
export type PropertyCandidateState<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    PropertyCandidateState<{ left: 1; right: 2 }>,
    { matched: true; candidates: 1 | 2 }
  >
>;
type _05b = Expect<
  Equal<
    PropertyCandidateState<{ left?: 1; right: 2 }>,
    { matched: false }
  >
>;
type _05c = Expect<
  Equal<
    PropertyCandidateState<{ left: 1 | undefined; right: 2 }>,
    { matched: true; candidates: 1 | 2 | undefined }
  >
>;
type _05d = Expect<
  Equal<
    PropertyCandidateState<
      { left: 1 } | { left: 2; right: 3 }
    >,
    { matched: false } | { matched: true; candidates: 2 | 3 }
  >
>;
type _05e = Expect<
  Equal<PropertyCandidateState<never>, never>
>;

// ─── Tuple and nested array candidates ───────────────────────────────────

// 6. Combine two exact readonly-compatible tuple positions.
export type TupleCandidates<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<TupleCandidates<[1, 2]>, 1 | 2>>;
type _06b = Expect<
  Equal<TupleCandidates<readonly ["a", true]>, "a" | true>
>;
type _06c = Expect<
  Equal<TupleCandidates<[never, "kept"]>, "kept">
>;
type _06d = Expect<
  Equal<TupleCandidates<[unknown, "lost"]>, unknown>
>;
type _06e = Expect<Equal<TupleCandidates<[1, 2, 3]>, never>>;

// 7. Combine three exact readonly-compatible tuple positions.
export type TripleTupleCandidates<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<TripleTupleCandidates<[1, 2, 3]>, 1 | 2 | 3>
>;
type _07b = Expect<
  Equal<
    TripleTupleCandidates<readonly ["a", string, "b"]>,
    string
  >
>;
type _07c = Expect<
  Equal<
    TripleTupleCandidates<
      [readonly [1], readonly [2], never]
    >,
    readonly [1] | readonly [2]
  >
>;
type _07d = Expect<
  Equal<TripleTupleCandidates<[1, never, 2]>, 1 | 2>
>;
type _07e = Expect<Equal<TripleTupleCandidates<[1, 2]>, never>>;

// 8. Combine element candidates from two nested readonly-compatible arrays.
export type ArrayCandidates<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<ArrayCandidates<[string[], number[]]>, string | number>
>;
type _08b = Expect<
  Equal<
    ArrayCandidates<readonly [readonly [1, 2], readonly [3, 4]]>,
    1 | 2 | 3 | 4
  >
>;
type _08c = Expect<
  Equal<ArrayCandidates<[["x"], string[]]>, string>
>;
type _08d = Expect<
  Equal<ArrayCandidates<[never[], boolean[]]>, boolean>
>;
type _08e = Expect<
  Equal<ArrayCandidates<[string[], number]>, never>
>;

// ─── Function return candidates ─────────────────────────────────────────

// 9. Combine candidates from two callable return positions.
export type ReturnCandidates<Value> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ReturnCandidates<{ left: () => 1; right: () => 2 }>, 1 | 2>
>;
type _09b = Expect<
  Equal<
    ReturnCandidates<{ left: () => string; right: () => number }>,
    string | number
  >
>;
type _09c = Expect<
  Equal<
    ReturnCandidates<{ left: () => "x"; right: () => string }>,
    string
  >
>;
type _09d = Expect<
  Equal<
    ReturnCandidates<{ left: () => void; right: () => undefined }>,
    void
  >
>;
type _09e = Expect<
  Equal<ReturnCandidates<{ left: () => 1; right: string }>, never>
>;

// 10. Combine candidates from three callable return positions.
export type TripleReturnCandidates<Value> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    TripleReturnCandidates<{
      first: () => 1;
      second: () => 2;
      third: () => 3;
    }>,
    1 | 2 | 3
  >
>;
type _10b = Expect<
  Equal<
    TripleReturnCandidates<{
      first: () => "x";
      second: () => string;
      third: () => "y";
    }>,
    string
  >
>;
type _10c = Expect<
  Equal<
    TripleReturnCandidates<{
      first: () => never;
      second: () => false;
      third: () => true;
    }>,
    boolean
  >
>;
type _10d = Expect<
  Equal<
    TripleReturnCandidates<{
      first: () => { id: 1 };
      second: () => { name: "Ada" };
      third: () => object;
    }>,
    object
  >
>;

// 11. Combine array-element candidates produced by two functions.
export type ReturnedArrayCandidates<Value> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ReturnedArrayCandidates<{
      left: () => string[];
      right: () => number[];
    }>,
    string | number
  >
>;
type _11b = Expect<
  Equal<
    ReturnedArrayCandidates<{
      left: () => readonly [1, 2];
      right: () => readonly [3, 4];
    }>,
    1 | 2 | 3 | 4
  >
>;
type _11c = Expect<
  Equal<
    ReturnedArrayCandidates<{
      left: () => never[];
      right: () => boolean[];
    }>,
    boolean
  >
>;
type _11d = Expect<
  Equal<
    ReturnedArrayCandidates<{
      left: () => string[];
      right: () => number;
    }>,
    never
  >
>;

// ─── Promise fulfillment candidates ─────────────────────────────────────

// 12. Combine fulfillment candidates from two promise-like tuple positions.
export type PromiseCandidates<Value> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<PromiseCandidates<[Promise<1>, Promise<2>]>, 1 | 2>
>;
type _12b = Expect<
  Equal<
    PromiseCandidates<readonly [Promise<string>, Promise<number>]>,
    string | number
  >
>;
type _12c = Expect<
  Equal<PromiseCandidates<[Promise<never>, Promise<boolean>]>, boolean>
>;
type _12d = Expect<
  Equal<PromiseCandidates<[Promise<unknown>, Promise<1>]>, unknown>
>;
type _12e = Expect<
  Equal<PromiseCandidates<[Promise<1>, number]>, never>
>;

// 13. Combine nested array elements from two promise fulfillment positions.
export type PromisedArrayCandidates<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    PromisedArrayCandidates<[Promise<string[]>, Promise<number[]>]>,
    string | number
  >
>;
type _13b = Expect<
  Equal<
    PromisedArrayCandidates<
      [Promise<readonly [1, 2]>, Promise<readonly [3, 4]>]
    >,
    1 | 2 | 3 | 4
  >
>;
type _13c = Expect<
  Equal<
    PromisedArrayCandidates<[Promise<never[]>, Promise<boolean[]>]>,
    boolean
  >
>;
type _13d = Expect<
  Equal<
    PromisedArrayCandidates<[Promise<string[]>, Promise<number>]>,
    never
  >
>;

// ─── Candidate normalization and synthesis ──────────────────────────────

// 14. Classify property candidates after ordinary union normalization.
export type PropertyCandidateProfile<Value> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    PropertyCandidateProfile<{ left: never; right: "x" }>,
    [false, false, false, "x"]
  >
>;
type _14b = Expect<
  Equal<
    PropertyCandidateProfile<{ left: unknown; right: "x" }>,
    [false, false, true, unknown]
  >
>;
type _14c = Expect<
  Equal<
    PropertyCandidateProfile<{ left: any; right: "x" }>,
    [true, false, false, any]
  >
>;
type _14d = Expect<
  Equal<
    PropertyCandidateProfile<any>,
    [false, false, true, unknown]
  >
>;
type _14e = Expect<
  Equal<
    PropertyCandidateProfile<{ left: never; right: never }>,
    [false, true, false, never]
  >
>;

// 15. Classify return candidates at the same normalization boundaries.
export type ReturnCandidateProfile<Value> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ReturnCandidateProfile<{ left: () => never; right: () => 1 }>,
    [false, false, false, 1]
  >
>;
type _15b = Expect<
  Equal<
    ReturnCandidateProfile<{ left: () => unknown; right: () => 1 }>,
    [false, false, true, unknown]
  >
>;
type _15c = Expect<
  Equal<
    ReturnCandidateProfile<{ left: () => any; right: () => 1 }>,
    [true, false, false, any]
  >
>;
type _15d = Expect<
  Equal<
    ReturnCandidateProfile<any>,
    [false, false, true, unknown]
  >
>;
type _15e = Expect<
  Equal<ReturnCandidateProfile<unknown>, [false, true, false, never]>
>;

// 16. Classify promise candidates at the same normalization boundaries.
export type PromiseCandidateProfile<Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    PromiseCandidateProfile<[Promise<never>, Promise<2>]>,
    [false, false, false, 2]
  >
>;
type _16b = Expect<
  Equal<
    PromiseCandidateProfile<[Promise<unknown>, Promise<2>]>,
    [false, false, true, unknown]
  >
>;
type _16c = Expect<
  Equal<
    PromiseCandidateProfile<[Promise<any>, Promise<2>]>,
    [true, false, false, any]
  >
>;
type _16d = Expect<
  Equal<
    PromiseCandidateProfile<any>,
    [false, false, true, unknown]
  >
>;
type _16e = Expect<
  Equal<PromiseCandidateProfile<never>, [false, true, false, never]>
>;

// 17. Classify several covariant source shapes and retain their candidate union.
export type CovariantSource<Value> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    CovariantSource<{ left: 1; right: "a" }>,
    { kind: "properties"; candidates: 1 | "a" }
  >
>;
type _17b = Expect<
  Equal<
    CovariantSource<[Promise<1>, Promise<2>]>,
    { kind: "promises"; candidates: 1 | 2 }
  >
>;
type _17c = Expect<
  Equal<
    CovariantSource<[string[], number[]]>,
    { kind: "arrays"; candidates: string | number }
  >
>;
type _17d = Expect<
  Equal<
    CovariantSource<readonly [true, "ready"]>,
    { kind: "tuple"; candidates: true | "ready" }
  >
>;
type _17e = Expect<Equal<CovariantSource<unknown>, never>>;

// 18. Build the result arrays of all four packet runtime collectors.
export type RuntimeCollections<
  Properties,
  Tuple,
  Returns,
  Promises,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    RuntimeCollections<
      { left: "id"; right: 7 },
      readonly [true, "ready"],
      { left: () => "ok"; right: () => 200 },
      readonly [Promise<"done">, Promise<204>]
    >,
    {
      properties: ("id" | 7)[];
      tuple: (true | "ready")[];
      returns: ("ok" | 200)[];
      promises: ("done" | 204)[];
    }
  >
>;
type _18b = Expect<
  Equal<
    RuntimeCollections<
      { left: "a"; right: string },
      [1, number],
      { left: () => true; right: () => boolean },
      [Promise<1>, Promise<number>]
    >,
    {
      properties: string[];
      tuple: number[];
      returns: boolean[];
      promises: number[];
    }
  >
>;
type _18c = Expect<
  Equal<
    RuntimeCollections<
      { left: never; right: 1 },
      [never, "x"],
      { left: () => never; right: () => false },
      [Promise<never>, Promise<Date>]
    >,
    {
      properties: 1[];
      tuple: "x"[];
      returns: false[];
      promises: Date[];
    }
  >
>;
type _18d = Expect<
  Equal<
    RuntimeCollections<
      { left: 1 },
      [1, 2, 3],
      { left: () => 1; right: string },
      [Promise<1>, number]
    >,
    {
      properties: never[];
      tuple: never[];
      returns: never[];
      promises: never[];
    }
  >
>;
