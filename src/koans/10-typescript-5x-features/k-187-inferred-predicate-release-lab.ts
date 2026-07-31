import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 187 - INFERRED PREDICATE RELEASE LAB
 * ==========================================
 *
 * TypeScript 5.5 can infer `value is T` from a simple boolean-returning function
 * when true and false exactly partition the parameter type. This lab moves from
 * the inference rules into sustained collection and domain-model use.
 *
 * Read `const isSuccess = result => result.status === "success"` as both a
 * runtime boolean function and, when the proof succeeds, a reusable predicate.
 * `filter` and `find` then select their narrowing overloads automatically.
 *
 * The proof remains if-and-only-if. Extra semantic conditions, parameter
 * mutation, multiple returns, explicit `: boolean`, or indirection through
 * `Boolean(...)` usually produce a plain boolean function. ReturnType alone
 * always reports boolean; the predicate relationship lives in the call
 * signature and control-flow behavior.
 *
 * Feature ownership: TypeScript 5.5.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#inferred-type-predicates
 */

export type ApiResult =
  | { status: "success"; value: string }
  | { status: "failure"; error: Error }
  | { status: "pending"; startedAt: number };

export const isSuccess = (result: ApiResult) =>
  result.status === "success";

export const isFailure = (result: ApiResult) =>
  result.status === "failure";

export const isPresent = <Value>(
  value: Value | null | undefined,
) => value != null;

export const isStringValue = (value: unknown) =>
  typeof value === "string";

export function successfulValues(results: readonly ApiResult[]): string[] {
  return results.filter(isSuccess).map((result) => result.value);
}

export function firstFailure(
  results: readonly ApiResult[],
): Extract<ApiResult, { status: "failure" }> | undefined {
  return results.find(isFailure);
}

export function compactValues<Value>(
  values: readonly (Value | null | undefined)[],
): Value[] {
  return values.filter(isPresent);
}

const sampleResults: ApiResult[] = [
  { status: "success", value: "ready" },
  { status: "pending", startedAt: 1 },
];
const successes = sampleResults.filter(isSuccess);
const failures = sampleResults.filter(isFailure);
const strings = ([1, "two", null] as unknown[]).filter(isStringValue);
const present = ["a", undefined, null, "b"].filter(isPresent);

// Part 1: discriminant checks become reusable predicates.
type _01 = Expect<Equal<typeof isSuccess, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof isFailure, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof isSuccess>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<typeof isSuccess>[0], TODO>>; // TODO(koan) @koan-error

// Part 2: filter selects its predicate overload.
type _05 = Expect<Equal<typeof successes, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<typeof successes[number], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<typeof failures, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof failures[number], TODO>>; // TODO(koan) @koan-error

// Part 3: primitive and generic inferred guards compose with collections.
type _09 = Expect<Equal<typeof strings, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof strings[number], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof present, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof present[number], TODO>>; // TODO(koan) @koan-error

// Part 4: find and mapping expose narrowed domain payloads.
type _13 = Expect<Equal<ReturnType<typeof firstFailure>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Exclude<ReturnType<typeof firstFailure>, undefined>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof successfulValues>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof compactValues<number>>, TODO>>; // TODO(koan) @koan-error

// Part 5: generic predicate signatures retain the caller's Value.
type _17 = Expect<Equal<typeof isPresent, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof isPresent<string>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof isPresent<string>>[0], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof isStringValue>, TODO>>; // TODO(koan) @koan-error
