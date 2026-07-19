import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-071: recursive conditional types
 * =============================================================================
 *
 * A conditional type may call itself in one branch. Useful recursion has two
 * obligations: a base case that returns a result, and a recursive case that
 * consumes one structural layer so the base case becomes closer.
 *
 * I read
 *
 *   `T extends PromiseLike<infer V> ? Unwrap<V> : T`
 *
 * aloud as:
 *
 *   "If T has one promise layer, remove that layer and repeat with its value;
 *    otherwise T is the final value."
 *
 * Recursion can descend through containers, variadic tuples, or template
 * literal segments. The result may be a single leaf union or an accumulated
 * tuple, depending on what the true branch rebuilds. Naked checked parameters
 * distribute at every invocation, so unions can branch during recursive
 * descent. Readonly-compatible patterns accept mutable and readonly inputs.
 * Empty tuples and empty strings are natural base cases. Broad arrays and
 * broad strings need deliberate handling because they do not always reveal a
 * provably smaller literal structure.
 */

export type RecursiveAwait<T> = T extends PromiseLike<infer Value>
  ? RecursiveAwait<Value>
  : T;
export type DeepElement<T> = T extends readonly (infer Element)[]
  ? DeepElement<Element>
  : T;
export type FlattenTuple<T extends readonly unknown[]> = T extends readonly [infer Head, ...infer Tail]
  ? Head extends readonly unknown[]
    ? [...FlattenTuple<Head>, ...FlattenTuple<Tail>]
    : [Head, ...FlattenTuple<Tail>]
  : [];
export type StringCharacters<Text extends string> = Text extends `${infer Head}${infer Tail}`
  ? [Head, ...StringCharacters<Tail>]
  : [];

export function flattenDeep<const Values extends readonly unknown[]>(
  values: Values,
): FlattenTuple<Values> {
  const result: unknown[] = [];
  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...flattenDeep(value));
    } else {
      result.push(value);
    }
  }
  return result as FlattenTuple<Values>;
}

export async function awaitDeep<Value>(value: Value): Promise<RecursiveAwait<Value>> {
  return await value as RecursiveAwait<Value>;
}

export function characters<const Text extends string>(text: Text): StringCharacters<Text> {
  return [...text] as StringCharacters<Text>;
}

export function firstLeaf<const Values extends readonly unknown[]>(
  values: Values,
): DeepElement<Values> | undefined {
  const flattened = flattenDeep(values);
  return flattened[0] as DeepElement<Values> | undefined;
}

// Part 1: promise recursion removes layers until the base value remains.
type _Main01 = Expect<Equal<RecursiveAwait<string>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<RecursiveAwait<Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<RecursiveAwait<Promise<Promise<boolean>>>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<RecursiveAwait<Promise<string> | number>, TODO>>; // TODO(koan) @koan-error

// Part 2: array recursion returns the union of all reachable leaf types.
type _Main05 = Expect<Equal<DeepElement<string>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<DeepElement<number[][]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<DeepElement<readonly (readonly [1, "a"])[]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<DeepElement<[1, [2, [3]]]>, TODO>>; // TODO(koan) @koan-error

// Part 3: tuple recursion rebuilds a flat tuple while descending.
type _Main09 = Expect<Equal<FlattenTuple<[]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<FlattenTuple<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<FlattenTuple<[1, [2, 3], [[4]]]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<FlattenTuple<readonly [readonly ["a"], true]>, TODO>>; // TODO(koan) @koan-error

// Part 4: template recursion consumes one character on every step.
type _Main13 = Expect<Equal<StringCharacters<"">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<StringCharacters<"TS">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<StringCharacters<"type">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<StringCharacters<"a-b">, TODO>>; // TODO(koan) @koan-error

// Part 5: recursion composes across unions and container kinds.
type _Main17 = Expect<Equal<RecursiveAwait<Promise<1 | Promise<2>>>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<DeepElement<string[][] | number[][]>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<FlattenTuple<[[1] | [2], 3]>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<DeepElement<readonly []>, TODO>>; // TODO(koan) @koan-error
