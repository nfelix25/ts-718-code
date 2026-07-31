import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-071: recursive conditional types — constructions
 * =============================================================================
 *
 * These constructions repeatedly consume promise, array, tuple, and template
 * literal layers until an explicit base case is reached. They cover
 * distribution during recursive calls, readonly compatibility, empty and
 * impossible inputs, precise tuple rebuilding, broad container policies,
 * special-type guards, and composition order. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenSafeAwait<Value> =
  GivenIsAny<Value> extends true
    ? Value
    : Value extends PromiseLike<infer Fulfilled>
      ? GivenSafeAwait<Fulfilled>
      : Value;
type GivenSafeLeaf<Value> =
  GivenIsAny<Value> extends true
    ? Value
    : Value extends readonly (infer Element)[]
      ? GivenSafeLeaf<Element>
      : Value;
type GivenFlatten<Tuple extends readonly unknown[]> =
  Tuple extends readonly [infer Head, ...infer Tail]
    ? Head extends readonly unknown[]
      ? [...GivenFlatten<Head>, ...GivenFlatten<Tail>]
      : [Head, ...GivenFlatten<Tail>]
    : [];
type GivenCharacters<Text extends string> =
  Text extends `${infer Head}${infer Tail}`
    ? [Head, ...GivenCharacters<Tail>]
    : [];

// ─── Recursive promise removal ───────────────────────────────────────────

// 1. Remove promise-like layers until a non-promise leaf remains.
export type RecursiveAwait<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<RecursiveAwait<string>, string>>;
type _01b = Expect<
  Equal<RecursiveAwait<Promise<number>>, number>
>;
type _01c = Expect<
  Equal<RecursiveAwait<Promise<Promise<boolean>>>, boolean>
>;
type _01d = Expect<
  Equal<RecursiveAwait<Promise<string> | number>, string | number>
>;
type _01e = Expect<
  Equal<RecursiveAwait<Promise<1 | Promise<2>>>, 1 | 2>
>;

// 2. Compare the packet recursion with built-in Awaited semantics.
export type AwaitComparison<Value> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    AwaitComparison<Promise<Promise<"done">>>,
    ["done", "done"]
  >
>;
type _02b = Expect<
  Equal<AwaitComparison<Promise<void>>, [void, void]>
>;
type _02c = Expect<
  Equal<AwaitComparison<Promise<never>>, [never, never]>
>;
type _02d = Expect<
  Equal<
    AwaitComparison<{
      then(onfulfilled: (value: "x") => unknown): unknown;
    }>,
    [
      {
        then(onfulfilled: (value: "x") => unknown): unknown;
      },
      "x",
    ]
  >
>;
type _02e = Expect<
  Equal<
    AwaitComparison<Promise<string> | number>,
    [string | number, string | number]
  >
>;

// 3. Classify recursive awaiting at any, never, unknown, and ordinary leaves.
export type AwaitSpecialProfile<Value> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<AwaitSpecialProfile<any>, [true, any]>
>;
type _03b = Expect<
  Equal<AwaitSpecialProfile<never>, [false, never]>
>;
type _03c = Expect<
  Equal<AwaitSpecialProfile<unknown>, [false, unknown]>
>;
type _03d = Expect<
  Equal<
    AwaitSpecialProfile<Promise<Promise<string>>>,
    [false, string]
  >
>;

// ─── Recursive array leaf extraction ─────────────────────────────────────

// 4. Descend through mutable or readonly arrays and union all reachable leaves.
export type DeepElement<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<DeepElement<string>, string>>;
type _04b = Expect<Equal<DeepElement<number[][]>, number>>;
type _04c = Expect<
  Equal<
    DeepElement<readonly (readonly [1, "a"])[]>,
    1 | "a"
  >
>;
type _04d = Expect<
  Equal<DeepElement<readonly [1, [2], [[3]]]>, 1 | 2 | 3>
>;
type _04e = Expect<
  Equal<DeepElement<string[][] | boolean[][]>, string | boolean>
>;

// 5. Classify leaf recursion at empty and special container boundaries.
export type LeafSpecialProfile<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<LeafSpecialProfile<any>, [true, any]>
>;
type _05b = Expect<
  Equal<LeafSpecialProfile<readonly []>, [false, never]>
>;
type _05c = Expect<
  Equal<LeafSpecialProfile<never[]>, [false, never]>
>;
type _05d = Expect<
  Equal<LeafSpecialProfile<unknown[]>, [false, unknown]>
>;
type _05e = Expect<
  Equal<LeafSpecialProfile<unknown>, [false, unknown]>
>;

// 6. Build the return type of the packet's recursive `firstLeaf` helper.
export type FirstLeaf<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<FirstLeaf<readonly [["first"], "second"]>, "first" | "second" | undefined>
>;
type _06b = Expect<
  Equal<FirstLeaf<readonly [1, [2, [3]]]>, 1 | 2 | 3 | undefined>
>;
type _06c = Expect<Equal<FirstLeaf<readonly []>, undefined>>;
type _06d = Expect<Equal<FirstLeaf<string[][]>, string | undefined>>;
type _06e = Expect<Equal<FirstLeaf<unknown[]>, unknown>>;

// 7. Remove array layers first, then recursively await the resulting leaves.
export type LeafThenAwait<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<LeafThenAwait<Promise<string>[][]>, string>
>;
type _07b = Expect<
  Equal<
    LeafThenAwait<readonly [Promise<1>, [Promise<2>]]>,
    1 | 2
  >
>;
type _07c = Expect<
  Equal<
    LeafThenAwait<Array<Promise<string> | number[]>>,
    string | number
  >
>;
type _07d = Expect<Equal<LeafThenAwait<readonly []>, never>>;

// 8. Recursively await first, then remove array layers from the result.
export type AwaitThenLeaf<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<AwaitThenLeaf<Promise<string[][]>>, string>
>;
type _08b = Expect<
  Equal<AwaitThenLeaf<Promise<readonly [1, [2]]>>, 1 | 2>
>;
type _08c = Expect<
  Equal<AwaitThenLeaf<Array<Promise<string>>>, Promise<string>>
>;
type _08d = Expect<
  Equal<AwaitThenLeaf<Promise<string[]> | number[][]>, string | number>
>;
type _08e = Expect<Equal<AwaitThenLeaf<never>, never>>;

// ─── Recursive tuple rebuilding ─────────────────────────────────────────

// 9. Remove every nested finite tuple layer while preserving leaf order.
export type FlattenTuple<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _09a = Expect<Equal<FlattenTuple<[]>, []>>;
type _09b = Expect<
  Equal<FlattenTuple<[1, 2, 3]>, [1, 2, 3]>
>;
type _09c = Expect<
  Equal<FlattenTuple<[1, [2, 3], [[4]]]>, [1, 2, 3, 4]>
>;
type _09d = Expect<
  Equal<
    FlattenTuple<readonly [readonly ["a"], true]>,
    ["a", true]
  >
>;
type _09e = Expect<
  Equal<
    FlattenTuple<[[1] | [2], 3]>,
    [1, 3] | [2, 3]
  >
>;

// 10. Flatten finite tuples precisely and retain a useful broad-array fallback.
export type ArrayAwareFlatten<
  Values extends readonly unknown[],
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<ArrayAwareFlatten<[1, [2, [3]]]>, [1, 2, 3]>
>;
type _10b = Expect<
  Equal<
    ArrayAwareFlatten<readonly [readonly ["a"], true]>,
    ["a", true]
  >
>;
type _10c = Expect<
  Equal<ArrayAwareFlatten<string[]>, string[]>
>;
type _10d = Expect<
  Equal<ArrayAwareFlatten<string[][]>, string[]>
>;
type _10e = Expect<
  Equal<ArrayAwareFlatten<readonly []>, []>
>;

// 11. Expose a flat tuple, its leaf union, and its length together.
export type FlattenProfile<
  Tuple extends readonly unknown[],
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<FlattenProfile<[]>, [[], never, 0]>
>;
type _11b = Expect<
  Equal<
    FlattenProfile<[1, [2, 3], 4]>,
    [[1, 2, 3, 4], 1 | 2 | 3 | 4, 4]
  >
>;
type _11c = Expect<
  Equal<
    FlattenProfile<readonly [readonly ["a", "b"], true]>,
    [["a", "b", true], "a" | "b" | true, 3]
  >
>;
type _11d = Expect<
  Equal<FlattenProfile<string[]>, [[], never, 0]>
>;
type _11e = Expect<
  Equal<
    FlattenProfile<[[never], 1]>,
    [never, never, never]
  >
>;

// ─── Recursive template-literal decomposition ───────────────────────────

// 12. Consume one literal character segment at a time into a tuple.
export type StringCharacters<Text extends string> = TODO; // TODO(koan)

type _12a = Expect<Equal<StringCharacters<"">, []>>;
type _12b = Expect<Equal<StringCharacters<"TS">, ["T", "S"]>>;
type _12c = Expect<
  Equal<StringCharacters<"type">, ["t", "y", "p", "e"]>
>;
type _12d = Expect<
  Equal<StringCharacters<"a-b">, ["a", "-", "b"]>
>;
type _12e = Expect<
  Equal<StringCharacters<"a b">, ["a", " ", "b"]>
>;

// 13. Return the union of literal characters emitted by recursion.
export type CharacterUnion<Text extends string> = TODO; // TODO(koan)

type _13a = Expect<Equal<CharacterUnion<"A">, "A">>;
type _13b = Expect<
  Equal<CharacterUnion<"ABC">, "A" | "B" | "C">
>;
type _13c = Expect<
  Equal<CharacterUnion<"aa">, "a">
>;
type _13d = Expect<
  Equal<CharacterUnion<"x/y">, "x" | "/" | "y">
>;
type _13e = Expect<Equal<CharacterUnion<"">, never>>;

// 14. Count the characters emitted by recursive decomposition.
export type CharacterCount<Text extends string> = TODO; // TODO(koan)

type _14a = Expect<Equal<CharacterCount<"">, 0>>;
type _14b = Expect<Equal<CharacterCount<"a">, 1>>;
type _14c = Expect<Equal<CharacterCount<"Type">, 4>>;
type _14d = Expect<Equal<CharacterCount<"123">, 3>>;
type _14e = Expect<Equal<CharacterCount<" ">, 1>>;

// 15. Expose deliberate behavior for broad and finite string inputs.
export type StringRecursionProfile<Text extends string> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<StringRecursionProfile<string>, [[], never, 0]>
>;
type _15b = Expect<
  Equal<
    StringRecursionProfile<`${number}`>,
    [[`${number}`], `${number}`, 1]
  >
>;
type _15c = Expect<
  Equal<
    StringRecursionProfile<"ABC">,
    [["A", "B", "C"], "A" | "B" | "C", 3]
  >
>;
type _15d = Expect<
  Equal<StringRecursionProfile<"">, [[], never, 0]>
>;

// 16. Split literal text recursively on a nonempty delimiter.
export type SplitText<
  Text extends string,
  Delimiter extends string,
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<SplitText<"a/b/c", "/">, ["a", "b", "c"]>
>;
type _16b = Expect<
  Equal<SplitText<"one--two--three", "--">, ["one", "two", "three"]>
>;
type _16c = Expect<
  Equal<SplitText<"plain", "/">, ["plain"]>
>;
type _16d = Expect<Equal<SplitText<"", "/">, [""]>>;
type _16e = Expect<Equal<SplitText<"abc", "">, never>>;

// ─── Recursive multi-container synthesis ────────────────────────────────

// 17. Record promise and array layers in their recursive encounter order.
export type ContainerTrace<Value> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<ContainerTrace<string>, ["leaf", string]>
>;
type _17b = Expect<
  Equal<
    ContainerTrace<Promise<string[][]>>,
    ["promise", "array", "array", "leaf", string]
  >
>;
type _17c = Expect<
  Equal<
    ContainerTrace<readonly [Promise<1>, Promise<2>]>,
    | ["array", "promise", "leaf", 1]
    | ["array", "promise", "leaf", 2]
  >
>;
type _17d = Expect<
  Equal<
    ContainerTrace<Promise<1> | number[]>,
    ["promise", "leaf", 1] | ["array", "leaf", number]
  >
>;
type _17e = Expect<
  Equal<ContainerTrace<readonly []>, ["array", "never"]>
>;

// 18. Remove promise and array layers recursively regardless of their order.
export type DeepContainerValue<Value> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<DeepContainerValue<Promise<string[][]>>, string>
>;
type _18b = Expect<
  Equal<
    DeepContainerValue<Array<Promise<1> | readonly [2, Promise<3>]>>,
    1 | 2 | 3
  >
>;
type _18c = Expect<
  Equal<
    DeepContainerValue<
      Promise<readonly [Promise<"a">, readonly ["b"]]>
    >,
    "a" | "b"
  >
>;
type _18d = Expect<
  Equal<DeepContainerValue<readonly []>, never>
>;
type _18e = Expect<Equal<DeepContainerValue<unknown>, unknown>>;
