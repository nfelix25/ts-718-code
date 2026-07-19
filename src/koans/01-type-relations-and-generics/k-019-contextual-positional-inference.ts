import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-019: Contextual positional inference
 * =============================================================================
 *
 * Contextual typing flows inward from a known parameter shape. When a generic
 * call first learns that Input is number, an unannotated callback parameter in
 * `(value: Input) => Output` is contextually number. Its returned expression can
 * then infer Output. Each position has a role: earlier value arguments may seed
 * callback inputs, one callback's output may seed the next stage, and tuple
 * positions preserve separate types even when their values appear together.
 *
 * I read `pipe(value, first, second)` aloud as:
 *
 *   "Infer Input from value; use Input to type first's parameter; infer Middle
 *    from first's return; use Middle to type second's parameter; infer Output."
 *
 * Context is not a cast. An explicit callback annotation must remain compatible
 * with the position it occupies. Destructuring receives context recursively.
 * Expected return types can provide additional evidence, but strong argument
 * evidence is still checked rather than rewritten. Modern TypeScript also
 * performs left-to-right inference within many context-sensitive object and
 * callback structures, reducing the need for annotations when producer and
 * consumer positions are arranged coherently.
 */

export function inspectPair<Left, Right, Result>(
  pair: readonly [Left, Right],
  inspect: (left: Left, right: Right) => Result,
): Result {
  return inspect(pair[0], pair[1]);
}

export function zipWith<Left, Right, Result>(
  left: readonly Left[],
  right: readonly Right[],
  combine: (left: Left, right: Right, index: number) => Result,
): Result[] {
  const length = Math.min(left.length, right.length);
  return Array.from({ length }, (_, index) => combine(left[index]!, right[index]!, index));
}

export function pipeThree<Input, Middle, Output>(
  value: Input,
  first: (value: Input) => Middle,
  second: (value: Middle) => Output,
): Output {
  return second(first(value));
}

export function produceAndConsume<Value, Result>(config: {
  produce: () => Value;
  consume: (value: Value) => Result;
}): Result {
  return config.consume(config.produce());
}

export function visitArgs<Args extends readonly unknown[], Result>(
  args: Args,
  visit: (...args: Args) => Result,
): Result {
  return visit(...args);
}

// Part 1: Tuple positions contextually type separate callback parameters.
const mainPairText = inspectPair([1, "a"] as const, (number, text) => `${text}:${number}`);
const mainPairNumber = inspectPair(["a", true] as const, (text, flag) => flag ? text.length : 0);
const mainPairObject = inspectPair([{ id: 1 }, ["x"]] as const, (record, tags) => ({ id: record.id, tag: tags[0] }));
const mainPairDestructured = inspectPair([[1, 2], { active: true }] as const, ([first], { active }) => active ? first : 0);
type _Main01 = Expect<Equal<typeof mainPairText, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainPairNumber, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainPairObject, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainPairDestructured, TODO>>; // TODO(koan) @koan-error

// Part 2: Parallel collection positions determine callback inputs.
const mainZippedText = zipWith([1, 2], ["a", "b"], (number, text) => `${number}:${text}`);
const mainZippedFlags = zipWith([1, 2], [true, false], (number, flag) => flag && number > 0);
const mainZippedObjects = zipWith([{ id: 1 }], [{ name: "Ada" }], (left, right) => ({ ...left, ...right }));
const mainZippedIndexes = zipWith(["a"], [true], (text, flag, index) => [text, flag, index] as const);
type _Main05 = Expect<Equal<typeof mainZippedText, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainZippedFlags, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainZippedObjects, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainZippedIndexes, TODO>>; // TODO(koan) @koan-error

// Part 3: Pipeline inference proceeds from one stage into the next.
const mainPipelineText = pipeThree(1, (number) => number.toFixed(2), (text) => text.length);
const mainPipelineObject = pipeThree("Ada", (name) => ({ name }), (record) => record.name.length);
const mainPipelineArray = pipeThree(2, (count) => Array.from({ length: count }, (_, index) => index), (values) => values.join(","));
const mainPipelineLiteral = pipeThree(1, () => "ready" as const, (state) => ({ state }));
type _Main09 = Expect<Equal<typeof mainPipelineText, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainPipelineObject, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainPipelineArray, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainPipelineLiteral, TODO>>; // TODO(koan) @koan-error

// Part 4: Object-literal producer output contextually types the consumer.
const mainConsumedNumber = produceAndConsume({ produce: () => 1, consume: (value) => value.toFixed() });
const mainConsumedObject = produceAndConsume({ produce: () => ({ id: 1 }), consume: (value) => value.id });
const mainConsumedTuple = produceAndConsume({ produce: () => ["a", 1] as const, consume: ([text, number]) => text.repeat(number) });
const mainConsumedLiteral = produceAndConsume({ produce: () => "ready" as const, consume: (value) => value });
type _Main13 = Expect<Equal<typeof mainConsumedNumber, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainConsumedObject, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainConsumedTuple, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainConsumedLiteral, TODO>>; // TODO(koan) @koan-error

// Part 5: A tuple can contextually type an entire callback rest list.
const mainArgsText = visitArgs([1, "a"] as const, (number, text) => `${number}:${text}`);
const mainArgsObject = visitArgs([{ id: 1 }, true] as const, (record, flag) => flag ? record.id : 0);
const mainArgsEmpty = visitArgs([] as const, () => "empty" as const);
const mainArgsExplicit = visitArgs<readonly [number, string], boolean>([1, "a"], (number, text) => number > text.length);
type _Main17 = Expect<Equal<typeof mainArgsText, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainArgsObject, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainArgsEmpty, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainArgsExplicit, TODO>>; // TODO(koan) @koan-error
