import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 173 - EASIER UNDEFINED RETURNS
 * ====================================
 *
 * JavaScript returns `undefined` when execution reaches the end of a function.
 * TypeScript 5.1 lets an explicitly `undefined`-returning function mirror that
 * runtime fact without writing `return undefined`. It also contextually infers
 * `undefined` for a no-return callback when the expected return type is
 * `undefined`.
 *
 * `undefined` is still not `void`. A `void` callback intentionally ignores
 * whatever its implementation returns, so a number-returning function can be
 * assigned to `() => void`. A `() => undefined` contract promises a specific
 * result and rejects number-returning implementations.
 *
 * Async functions apply the same idea through `Promise<undefined>`, and callers
 * can observe the fulfilled `undefined` value.
 *
 * Feature ownership: TypeScript 5.1 return-statement and contextual-inference
 * refinements for undefined-returning functions.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html#easier-implicit-returns-for-undefined-returning-functions
 */

export type UndefinedCallback<Args extends readonly unknown[] = []> =
  (...args: Args) => undefined;

export type VoidCallback<Args extends readonly unknown[] = []> =
  (...args: Args) => void;

export type CallbackResult<Callback extends (...args: any[]) => any> =
  ReturnType<Callback>;

export function implicitlyUndefined(): undefined {}

export function recordUndefined(
  log: string[],
  value: string,
): undefined {
  log.push(value);
}

export function invokeUndefined(
  callback: () => undefined,
): undefined {
  return callback();
}

export function mapWithUndefined<Input>(
  values: readonly Input[],
  callback: (value: Input, index: number) => undefined,
): undefined[] {
  return values.map(callback);
}

export async function asynchronouslyUndefined(
  log: string[],
): Promise<undefined> {
  log.push("async-body");
}

export function createContextualCallbacks(log: string[]) {
  const undefinedCallback: () => undefined = () => {
    log.push("undefined");
  };

  const voidCallback: () => void = () => {
    log.push("void");
    return 42;
  };

  return { undefinedCallback, voidCallback };
}

type NoArgsUndefined = UndefinedCallback;
type StringUndefined = UndefinedCallback<[value: string]>;
type NoArgsVoid = VoidCallback;

// Part 1: Falling off the end can now fulfill an undefined contract.
type _01 = Expect<Equal<ReturnType<typeof implicitlyUndefined>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<typeof recordUndefined>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<NoArgsUndefined, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<CallbackResult<NoArgsUndefined>, TODO>>; // TODO(koan) @koan-error

// Part 2: Argument tuples remain independent from the return refinement.
type _05 = Expect<Equal<Parameters<StringUndefined>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<StringUndefined>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof recordUndefined>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<typeof invokeUndefined>, TODO>>; // TODO(koan) @koan-error

// Part 3: void and undefined describe different callback promises.
type _09 = Expect<Equal<ReturnType<NoArgsVoid>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<undefined extends void ? true : false, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<void extends undefined ? true : false, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<(() => number) extends NoArgsVoid ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 4: Contextual callback inference and generic mapping preserve undefined.
type Contextual = ReturnType<typeof createContextualCallbacks>;
type _13 = Expect<Equal<ReturnType<Contextual["undefinedCallback"]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<Contextual["voidCallback"]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof mapWithUndefined<number>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<typeof mapWithUndefined<string>>[1], TODO>>; // TODO(koan) @koan-error

// Part 5: Async completion wraps the same value in Promise.
type _17 = Expect<Equal<ReturnType<typeof asynchronouslyUndefined>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Awaited<ReturnType<typeof asynchronouslyUndefined>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof invokeUndefined>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof createContextualCallbacks>, TODO>>; // TODO(koan) @koan-error
