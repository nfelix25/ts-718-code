import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 185 - PRESERVED NARROWING IN CLOSURES
 * ===========================================
 *
 * A closure may run later, so historically TypeScript often widened captured
 * variables back to their declared union. TypeScript 5.4 preserves a narrowing
 * in a non-hoisted closure when it can find the captured variable's last
 * assignment before that closure is created.
 *
 * Read the analysis as: "after this final write, every path establishes URL;
 * this arrow is created afterward; no nested function can write the variable;
 * therefore the arrow also sees URL."
 *
 * The rule is deliberately conservative. A later assignment, a write inside
 * any nested function, or a closure created before the last assignment prevents
 * preservation. `const` values already follow simpler stable-narrowing rules.
 *
 * Feature ownership: TypeScript 5.4.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html#preserved-narrowing-in-closures-following-last-assignments
 */

export function makeUrlReader(input: string | URL): () => string {
  if (typeof input === "string") {
    input = new URL(input);
  }

  type _01 = Expect<Equal<typeof input, TODO>>; // TODO(koan) @koan-error
  type _02 = Expect<Equal<typeof input.href, TODO>>; // TODO(koan) @koan-error

  return () => {
    type _03 = Expect<Equal<typeof input, TODO>>; // TODO(koan) @koan-error
    type _04 = Expect<Equal<typeof input.searchParams, TODO>>; // TODO(koan) @koan-error
    return input.href;
  };
}

export function makeTextReader(
  value: string | undefined,
): () => string {
  value ??= "fallback";

  type _05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _06 = Expect<Equal<typeof value.length, TODO>>; // TODO(koan) @koan-error

  return () => {
    type _07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _08 = Expect<Equal<ReturnType<typeof value.toUpperCase>, TODO>>; // TODO(koan) @koan-error
    return value.toUpperCase();
  };
}

export function mapAgainstBase(
  base: string | URL,
  paths: readonly string[],
): string[] {
  if (typeof base === "string") {
    base = new URL(base);
  }

  type _09 = Expect<Equal<typeof base, TODO>>; // TODO(koan) @koan-error
  type _10 = Expect<Equal<Parameters<typeof paths.map>[0], TODO>>; // TODO(koan) @koan-error

  return paths.map((path) => {
    type _11 = Expect<Equal<typeof base, TODO>>; // TODO(koan) @koan-error
    type _12 = Expect<Equal<typeof path, TODO>>; // TODO(koan) @koan-error
    return new URL(path, base).href;
  });
}

export function makeDefinedReader<Value>(
  value: Value | undefined,
  fallback: Value,
): () => Value {
  if (value === undefined) {
    value = fallback;
  }

  type _13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _14 = Expect<Equal<Exclude<Value | undefined, undefined>, TODO>>; // TODO(koan) @koan-error

  return () => {
    type _15 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _16 = Expect<Equal<ReturnType<typeof makeDefinedReader<Value>>, TODO>>; // TODO(koan) @koan-error
    return value;
  };
}

// Part 5: externally visible closure factories expose stable result contracts.
type _17 = Expect<Equal<ReturnType<typeof makeUrlReader>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<ReturnType<typeof makeUrlReader>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof makeTextReader>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof mapAgainstBase>, TODO>>; // TODO(koan) @koan-error
