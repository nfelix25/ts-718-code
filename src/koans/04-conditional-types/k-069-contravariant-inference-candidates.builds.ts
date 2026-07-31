import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-069: contravariant inference candidates — constructions
 * =============================================================================
 *
 * These constructions reuse inferred variables in consumer parameter
 * positions, where candidates combine as intersections. They cover literal
 * overlap, structural accumulation, optional/rest/method syntax, tuple and
 * three-way consumers, outer distribution, mixed variance, nested arrays and
 * promises, and the runtime call contracts. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

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
type GivenSharedInput<Value> =
  Value extends {
    left: (value: infer Input) => unknown;
    right: (value: infer Input) => unknown;
  }
    ? Input
    : never;
type GivenMixedCandidate<Value> =
  Value extends {
    left: (value: infer Candidate) => infer Candidate;
    right: (value: infer Candidate) => infer Candidate;
  }
    ? Candidate
    : never;

// ─── Two-consumer intersections ─────────────────────────────────────────

// 1. Infer the input accepted by both required consumer properties.
export type SharedInput<Value> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    SharedInput<{
      left: (value: 1 | 2) => void;
      right: (value: 2 | 3) => void;
    }>,
    2
  >
>;
type _01b = Expect<
  Equal<
    SharedInput<{
      left: (value: string) => void;
      right: (value: "ok") => void;
    }>,
    "ok"
  >
>;
type _01c = Expect<
  Equal<
    SharedInput<{
      left: (value: string) => void;
      right: (value: number) => void;
    }>,
    never
  >
>;
type _01d = Expect<
  Equal<
    SharedInput<{
      left: (value: unknown) => void;
      right: (value: string) => void;
    }>,
    string
  >
>;
type _01e = Expect<
  Equal<
    SharedInput<{
      left: (value: never) => void;
      right: (value: string) => void;
    }>,
    never
  >
>;

// 2. Infer a shared input from two standalone handler type arguments.
export type SharedBetween<
  Left extends (value: any) => unknown,
  Right extends (value: any) => unknown,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    SharedBetween<
      (value: { id: number }) => void,
      (value: { name: string }) => void
    >,
    { id: number } & { name: string }
  >
>;
type _02b = Expect<
  Equal<
    SharedBetween<
      (value: readonly number[]) => void,
      (value: readonly [1, 2]) => void
    >,
    readonly number[] & readonly [1, 2]
  >
>;
type _02c = Expect<
  Equal<
    SharedBetween<
      (value: Map<string, unknown>) => void,
      (value: Map<string, number>) => void
    >,
    Map<string, unknown> & Map<string, number>
  >
>;
type _02d = Expect<
  Equal<
    SharedBetween<
      (value: Date) => void,
      (value: { getTime(): number }) => void
    >,
    Date & { getTime(): number }
  >
>;
type _02e = Expect<
  Equal<
    SharedBetween<
      (value: Function) => void,
      (value: (() => void)) => void
    >,
    Function & (() => void)
  >
>;

// 3. Report whether the complete required handler shape matched.
export type SharedInputState<Value> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    SharedInputState<{
      left: (value: 1 | 2) => void;
      right: (value: 2) => void;
    }>,
    { matched: true; input: 2 }
  >
>;
type _03b = Expect<
  Equal<
    SharedInputState<{
      left: (value: 1) => void;
      right?: (value: 1) => void;
    }>,
    { matched: false }
  >
>;
type _03c = Expect<
  Equal<
    SharedInputState<{
      readonly left: (value: 1 | 2) => void;
      readonly right: (value: 2) => void;
    }>,
    { matched: true; input: 2 }
  >
>;
type _03d = Expect<
  Equal<
    SharedInputState<
      | {
          left: (value: 1) => void;
          right: (value: 1) => void;
        }
      | { left: (value: 2) => void }
    >,
    { matched: true; input: 1 } | { matched: false }
  >
>;
type _03e = Expect<Equal<SharedInputState<never>, never>>;

// 4. Describe compatible and impossible structural intersections.
export type SharedObjectDetails<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    SharedObjectDetails<{
      left: (value: { id: number }) => void;
      right: (value: { name: string }) => void;
    }>,
    {
      impossible: false;
      input: { id: number } & { name: string };
      keys: "id" | "name";
    }
  >
>;
type _04b = Expect<
  Equal<
    SharedObjectDetails<{
      left: (value: { kind: "user"; id: number }) => void;
      right: (value: { kind: "user"; name: string }) => void;
    }>,
    {
      impossible: false;
      input:
        & { kind: "user"; id: number }
        & { kind: "user"; name: string };
      keys: "kind" | "id" | "name";
    }
  >
>;
type _04c = Expect<
  Equal<
    SharedObjectDetails<{
      left: (value: { kind: "user" }) => void;
      right: (value: { kind: "admin" }) => void;
    }>,
    { impossible: true }
  >
>;
type _04d = Expect<
  Equal<
    SharedObjectDetails<{
      left: (value: object) => void;
      right: (value: { id: 1 }) => void;
    }>,
    {
      impossible: false;
      input: object & { id: 1 };
      keys: "id";
    }
  >
>;
type _04e = Expect<
  Equal<SharedObjectDetails<unknown>, { matched: false }>
>;

// ─── Tuple, arity, and method positions ──────────────────────────────────

// 5. Infer the input accepted by two tuple-held consumers.
export type TupleSharedInput<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    TupleSharedInput<
      [(value: 1 | 2) => void, (value: 2 | 3) => void]
    >,
    2
  >
>;
type _05b = Expect<
  Equal<
    TupleSharedInput<
      readonly [(value: string) => void, (value: "x") => void]
    >,
    "x"
  >
>;
type _05c = Expect<
  Equal<
    TupleSharedInput<
      [(value?: string) => void, (value: string) => void]
    >,
    string
  >
>;
type _05d = Expect<
  Equal<
    TupleSharedInput<
      [(...values: string[]) => void, (value: "ok") => void]
    >,
    "ok"
  >
>;
type _05e = Expect<
  Equal<TupleSharedInput<[(value: string) => void]>, never>
>;

// 6. Infer the input accepted by all three required consumers.
export type ThreeWayInput<Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    ThreeWayInput<{
      first: (value: 1 | 2 | 3) => void;
      second: (value: 2 | 3 | 4) => void;
      third: (value: 3 | 4 | 5) => void;
    }>,
    3
  >
>;
type _06b = Expect<
  Equal<
    ThreeWayInput<{
      first: (value: string) => void;
      second: (value: "a" | "b") => void;
      third: (value: "b" | "c") => void;
    }>,
    "b"
  >
>;
type _06c = Expect<
  Equal<
    ThreeWayInput<{
      first: (value: unknown) => void;
      second: (value: number) => void;
      third: (value: 1) => void;
    }>,
    1
  >
>;
type _06d = Expect<
  Equal<
    ThreeWayInput<{
      first: (value: { a: 1 }) => void;
      second: (value: { b: 2 }) => void;
      third: (value: { c: 3 }) => void;
    }>,
    { a: 1 } & { b: 2 } & { c: 3 }
  >
>;
type _06e = Expect<
  Equal<
    ThreeWayInput<{
      first: (value: 1) => void;
      second: (value: 1) => void;
    }>,
    never
  >
>;

// 7. Infer from the second parameter of two equal-arity consumers.
export type SecondParameterInput<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    SecondParameterInput<{
      left: (head: 1, value: string) => void;
      right: (head: 2, value: "ok") => void;
    }>,
    never
  >
>;
type _07b = Expect<
  Equal<
    SecondParameterInput<{
      left: (head: 1, value: 1 | 2) => void;
      right: (head: 2, value: 2 | 3) => void;
    }>,
    never
  >
>;
type _07c = Expect<
  Equal<
    SecondParameterInput<{
      left: (head: unknown, value: { id: 1 }) => void;
      right: (head: unknown, value: { name: "Ada" }) => void;
    }>,
    { id: 1 } & { name: "Ada" }
  >
>;
type _07d = Expect<
  Equal<
    SecondParameterInput<{
      left: (head: 1, value: string) => void;
      right: (value: string) => void;
    }>,
    never
  >
>;
type _07e = Expect<
  Equal<SecondParameterInput<unknown>, never>
>;

// 8. Infer intersected inputs from method syntax.
export type MethodSharedInput<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    MethodSharedInput<{
      left(value: 1 | 2): void;
      right(value: 2 | 3): void;
    }>,
    1 | 2 | 3
  >
>;
type _08b = Expect<
  Equal<
    MethodSharedInput<{
      left(value: string): void;
      right(value: number): void;
    }>,
    string | number
  >
>;
type _08c = Expect<
  Equal<
    MethodSharedInput<{
      left(value?: string): void;
      right(value: "ok"): void;
    }>,
    string | undefined
  >
>;
type _08d = Expect<
  Equal<
    MethodSharedInput<{
      left(value: { id: 1 }): void;
      right(value: { name: "Ada" }): void;
    }>,
    { id: 1 } | { name: "Ada" }
  >
>;

// 9. Expose how optional, rest, and zero-arity syntax changes candidates.
export type ParameterSyntaxProfile<Value> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    ParameterSyntaxProfile<{
      left: (value?: string) => void;
      right: (value: string) => void;
    }>,
    { input: string; includesUndefined: false }
  >
>;
type _09b = Expect<
  Equal<
    ParameterSyntaxProfile<{
      left: (value?: string) => void;
      right: (value?: "ok") => void;
    }>,
    { input: "ok" | undefined; includesUndefined: true }
  >
>;
type _09c = Expect<
  Equal<
    ParameterSyntaxProfile<{
      left: (...values: string[]) => void;
      right: (value: "ok") => void;
    }>,
    { input: "ok"; includesUndefined: false }
  >
>;
type _09d = Expect<
  Equal<
    ParameterSyntaxProfile<{
      left: () => void;
      right: (value: string) => void;
    }>,
    { input: string; includesUndefined: false }
  >
>;

// ─── Mixed variance and nested consumer shapes ──────────────────────────

// 10. Profile a candidate reused in both input and output positions.
export type MixedVarianceProfile<Value> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    MixedVarianceProfile<{
      left: (value: 1 | 2) => 1;
      right: (value: 2 | 3) => 2;
    }>,
    {
      isNever: true;
      accepts1: false;
      accepts2: false;
      accepts3: false;
    }
  >
>;
type _10b = Expect<
  Equal<
    MixedVarianceProfile<{
      left: (value: string) => "a";
      right: (value: "a") => string;
    }>,
    {
      isNever: true;
      accepts1: false;
      accepts2: false;
      accepts3: false;
    }
  >
>;
type _10c = Expect<
  Equal<
    MixedVarianceProfile<{
      left: (value: unknown) => 1;
      right: (value: number) => 2;
    }>,
    {
      isNever: false;
      accepts1: true;
      accepts2: true;
      accepts3: false;
    }
  >
>;
type _10d = Expect<
  Equal<
    MixedVarianceProfile<{
      left: (value: never) => never;
      right: (value: 1) => 1;
    }>,
    {
      isNever: true;
      accepts1: false;
      accepts2: false;
      accepts3: false;
    }
  >
>;

// 11. Infer the shared element type of two consumed readonly arrays.
export type SharedArrayElement<Value> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    SharedArrayElement<{
      left: (value: readonly (1 | 2)[]) => void;
      right: (value: readonly (2 | 3)[]) => void;
    }>,
    2
  >
>;
type _11b = Expect<
  Equal<
    SharedArrayElement<{
      left: (value: readonly unknown[]) => void;
      right: (value: readonly string[]) => void;
    }>,
    string
  >
>;
type _11c = Expect<
  // The deferred nested intersection is probed by membership, not spelling.
  Equal<
    [
      1 extends SharedArrayElement<{
        left: (value: readonly number[]) => void;
        right: (value: readonly [1, 2]) => void;
      }> ? true : false,
      2 extends SharedArrayElement<{
        left: (value: readonly number[]) => void;
        right: (value: readonly [1, 2]) => void;
      }> ? true : false,
      3 extends SharedArrayElement<{
        left: (value: readonly number[]) => void;
        right: (value: readonly [1, 2]) => void;
      }> ? true : false,
      string extends SharedArrayElement<{
        left: (value: readonly number[]) => void;
        right: (value: readonly [1, 2]) => void;
      }> ? true : false,
    ],
    [false, false, false, false]
  >
>;
type _11d = Expect<
  Equal<
    SharedArrayElement<{
      left: (value: readonly never[]) => void;
      right: (value: readonly string[]) => void;
    }>,
    never
  >
>;
type _11e = Expect<
  Equal<
    SharedArrayElement<{
      left: (value: readonly string[]) => void;
      right: (value: number) => void;
    }>,
    never
  >
>;

// 12. Infer a shared promise input, then inspect its awaited value.
export type SharedPromiseDetails<Value> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    SharedPromiseDetails<{
      left: (value: Promise<1 | 2>) => void;
      right: (value: Promise<2 | 3>) => void;
    }>,
    {
      input: Promise<1 | 2> & Promise<2 | 3>;
      awaited: 2 | 3;
    }
  >
>;
type _12b = Expect<
  Equal<
    SharedPromiseDetails<{
      left: (value: Promise<unknown>) => void;
      right: (value: Promise<string>) => void;
    }>,
    {
      input: Promise<unknown> & Promise<string>;
      awaited: string;
    }
  >
>;
type _12c = Expect<
  Equal<
    SharedPromiseDetails<{
      left: (value: Promise<never>) => void;
      right: (value: Promise<string>) => void;
    }>,
    {
      input: Promise<never> & Promise<string>;
      awaited: string;
    }
  >
>;
type _12d = Expect<
  Equal<
    SharedPromiseDetails<{
      left: (value: Promise<{ id: 1 }>) => void;
      right: (value: Promise<{ name: "Ada" }>) => void;
    }>,
    {
      input: Promise<{ id: 1 }> & Promise<{ name: "Ada" }>;
      awaited: { name: "Ada" };
    }
  >
>;
type _12e = Expect<
  Equal<
    SharedPromiseDetails<{
      left: (value: Promise<string>) => void;
      right: (value: number) => void;
    }>,
    {
      input: Promise<string> & number;
      awaited: string;
    }
  >
>;

// 13. Infer shared callback results consumed by two outer functions.
export type SharedCallbackResult<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    SharedCallbackResult<{
      left: (callback: () => 1 | 2) => void;
      right: (callback: () => 2 | 3) => void;
    }>,
    2
  >
>;
type _13b = Expect<
  Equal<
    SharedCallbackResult<{
      left: (callback: () => unknown) => void;
      right: (callback: () => string) => void;
    }>,
    string
  >
>;
type _13c = Expect<
  Equal<
    SharedCallbackResult<{
      left: (callback: () => { id: 1 }) => void;
      right: (callback: () => { name: "Ada" }) => void;
    }>,
    { id: 1 } & { name: "Ada" }
  >
>;
type _13d = Expect<
  Equal<
    SharedCallbackResult<{
      left: (callback: () => never) => void;
      right: (callback: () => 1) => void;
    }>,
    never
  >
>;

// ─── Distribution, special types, and runtime contracts ─────────────────

// 14. Preserve each distributed outer member as a shared-input record.
export type DistributedSharedInput<Value> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    DistributedSharedInput<
      | {
          left: (value: 1 | 2) => void;
          right: (value: 2) => void;
        }
      | {
          left: (value: 3 | 4) => void;
          right: (value: 4) => void;
        }
    >,
    { input: 2 } | { input: 4 }
  >
>;
type _14b = Expect<
  Equal<
    DistributedSharedInput<
      | {
          left: (value: string) => void;
          right: (value: "x") => void;
        }
      | {
          left: (value: number) => void;
          right: (value: 1) => void;
        }
    >,
    { input: "x" } | { input: 1 }
  >
>;
type _14c = Expect<
  Equal<
    DistributedSharedInput<
      | {
          left: (value: 1) => void;
          right: (value: 1) => void;
        }
      | { left: (value: 2) => void }
    >,
    { input: 1 }
  >
>;
type _14d = Expect<
  Equal<DistributedSharedInput<unknown>, never>
>;
type _14e = Expect<
  Equal<DistributedSharedInput<never>, never>
>;

// 15. Classify special shared-input intersections without exposing raw any.
export type ContravariantSpecialProfile<Value> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ContravariantSpecialProfile<{
      left: (value: any) => void;
      right: (value: string) => void;
    }>,
    [true, false, false, any]
  >
>;
type _15b = Expect<
  Equal<
    ContravariantSpecialProfile<any>,
    [false, false, true, unknown]
  >
>;
type _15c = Expect<
  Equal<
    ContravariantSpecialProfile<{
      left: (value: unknown) => void;
      right: (value: string) => void;
    }>,
    [false, false, false, string]
  >
>;
type _15d = Expect<
  Equal<
    ContravariantSpecialProfile<{
      left: (value: never) => void;
      right: (value: string) => void;
    }>,
    [false, true, false, never]
  >
>;
type _15e = Expect<
  Equal<
    ContravariantSpecialProfile<unknown>,
    [false, true, false, never]
  >
>;

// 16. Classify tagged property, tuple, and method consumer sources.
export type ContravariantSource<Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    ContravariantSource<{
      kind: "properties";
      left: (value: 1 | 2) => void;
      right: (value: 2 | 3) => void;
    }>,
    { kind: "properties"; input: 2 }
  >
>;
type _16b = Expect<
  Equal<
    ContravariantSource<{
      kind: "tuple";
      handlers: readonly [
        (value: string) => void,
        (value: "ok") => void,
      ];
    }>,
    { kind: "tuple"; input: "ok" }
  >
>;
type _16c = Expect<
  Equal<
    ContravariantSource<{
      kind: "methods";
      left(value: { id: 1 }): void;
      right(value: { name: "Ada" }): void;
    }>,
    {
      kind: "methods";
      input: { id: 1 } | { name: "Ada" };
    }
  >
>;
type _16d = Expect<
  Equal<
    ContravariantSource<
      | {
          kind: "properties";
          left: (value: 1 | 2) => void;
          right: (value: 2) => void;
        }
      | {
          kind: "tuple";
          handlers: [(value: 3 | 4) => void, (value: 4) => void];
        }
    >,
    { kind: "properties"; input: 2 } | { kind: "tuple"; input: 4 }
  >
>;
type _16e = Expect<Equal<ContravariantSource<unknown>, never>>;

// 17. Capture the shared input and both result types for `callBoth`.
export type CallBothContract<Value> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    CallBothContract<{
      left: (value: 1 | 2) => number;
      right: (value: 2 | 3) => string;
    }>,
    { input: 2; results: [number, string] }
  >
>;
type _17b = Expect<
  Equal<
    CallBothContract<{
      left: (value: { id: number }) => number;
      right: (value: { name: string }) => string;
    }>,
    {
      input: { id: number } & { name: string };
      results: [number, string];
    }
  >
>;
type _17c = Expect<
  Equal<
    CallBothContract<{
      left: (value: unknown) => 1;
      right: (value: "x") => 2;
    }>,
    { input: "x"; results: [1, 2] }
  >
>;
type _17d = Expect<
  Equal<
    CallBothContract<{
      left: (value: string) => 1;
      right: number;
    }>,
    never
  >
>;
type _17e = Expect<
  Equal<
    CallBothContract<{
      left: (value: { id?: number }) => "optional";
      right: (value: { id: number }) => "required";
    }>,
    {
      input: { id?: number } & { id: number };
      results: ["optional", "required"];
    }
  >
>;

// 18. Capture the shared input and all result types for `callThree`.
export type CallThreeContract<Value> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    CallThreeContract<{
      first: (value: 1 | 2 | 3) => "first";
      second: (value: 2 | 3 | 4) => "second";
      third: (value: 3 | 4 | 5) => "third";
    }>,
    {
      input: 3;
      results: ["first", "second", "third"];
    }
  >
>;
type _18b = Expect<
  Equal<
    CallThreeContract<{
      first: (value: unknown) => 1;
      second: (value: number) => 2;
      third: (value: 42) => 3;
    }>,
    { input: 42; results: [1, 2, 3] }
  >
>;
type _18c = Expect<
  Equal<
    CallThreeContract<{
      first: (value: { a: 1 }) => "a";
      second: (value: { b: 2 }) => "b";
      third: (value: { c: 3 }) => "c";
    }>,
    {
      input: { a: 1 } & { b: 2 } & { c: 3 };
      results: ["a", "b", "c"];
    }
  >
>;
type _18d = Expect<
  Equal<
    CallThreeContract<{
      first: (value: 1) => 1;
      second: (value: 1) => 2;
    }>,
    never
  >
>;
