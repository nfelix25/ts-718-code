import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 194 - STRICT BUILT-IN ITERATOR RETURNS
 * ============================================
 *
 * `next()` does not simply return a value. It returns a discriminated union:
 * `{ done?: false; value: TYield }` or
 * `{ done: true; value: TReturn }`.
 *
 * Historically, the default return channel of `Iterator` was `any`. Reading
 * `.value` before checking `done` therefore collapsed `TYield | any` to `any`
 * and hid misspellings and missing completion handling. TypeScript 5.6 added
 * the intrinsic `BuiltinIteratorReturn` and the
 * `strictBuiltinIteratorReturn` option. Under `strict`, built-in iterators use
 * `undefined` as their completion value, so an unchecked `.value` is
 * `TYield | undefined`.
 *
 * Custom generators are different: they can explicitly return a meaningful
 * final value. The correct habit is always to narrow the result with `done`
 * before treating its value as yielded data.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html#strict-builtin-iterator-checks-and---strictbuiltiniteratorreturn
 */

export function firstSetValue(values: Set<string>): string | undefined {
  const step = values.values().next();
  return step.done ? undefined : step.value;
}

export function drainIterator<T>(iterator: Iterator<T, undefined>): T[] {
  const output: T[] = [];
  while (true) {
    const step = iterator.next();
    if (step.done) return output;
    output.push(step.value);
  }
}

export function* wordsThenCount(): Generator<string, number, void> {
  yield "type";
  yield "system";
  return 2;
}

export function describeWordStep(
  step: IteratorResult<string, number>,
): string {
  return step.done ? `returned:${step.value}` : `yielded:${step.value}`;
}

export type BuiltinStringIterator =
  IteratorObject<string, BuiltinIteratorReturn, unknown>;

// Part 1: read IteratorResult as a done-discriminated union.
type _01 = Expect<Equal<IteratorResult<string, number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IteratorYieldResult<string>["done"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IteratorYieldResult<string>["value"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IteratorReturnResult<number>["value"], TODO>>; // TODO(koan) @koan-error

// Part 2: strict built-ins make completion visible.
type SetValueStep = ReturnType<ReturnType<Set<string>["values"]>["next"]>;
type _05 = Expect<Equal<BuiltinIteratorReturn, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<SetValueStep, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<SetValueStep["value"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<SetValueStep["done"], TODO>>; // TODO(koan) @koan-error

// Part 3: narrowing by done selects the correct value channel.
type _09 = Expect<Equal<Extract<SetValueStep, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<SetValueStep, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof firstSetValue>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<typeof firstSetValue>, TODO>>; // TODO(koan) @koan-error

// Part 4: custom iterators choose their own return channel.
type WordGenerator = ReturnType<typeof wordsThenCount>;
type WordStep = ReturnType<WordGenerator["next"]>;
type _13 = Expect<Equal<WordGenerator, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<WordStep["value"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<WordStep, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<WordStep, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error

// Part 5: consumers make completion policy explicit.
type _17 = Expect<Equal<Parameters<typeof drainIterator>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof drainIterator>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof describeWordStep>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof describeWordStep>, TODO>>; // TODO(koan) @koan-error
