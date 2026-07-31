import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 181 - SWITCH (TRUE) NARROWING
 * ===================================
 *
 * `switch (true)` turns each case expression into an ordered boolean guard.
 * It is often useful when the branches are ranges or unrelated predicates that
 * do not share one discriminant value. TypeScript 5.3 made control-flow
 * narrowing follow those guards.
 *
 * Read `case typeof value === "string"` aloud as "if this predicate is the
 * first true case, enter with value narrowed to string." Earlier failed cases
 * also contribute negative information to later branches, subject to ordinary
 * fallthrough and mutation rules.
 *
 * This is still a JavaScript switch: the first matching case wins, `break` or
 * `return` prevents fallthrough, and `default` receives what prior terminating
 * branches excluded.
 *
 * Feature ownership: TypeScript 5.3.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html#switch-true-narrowing
 */

export type InputValue = string | number | readonly unknown[] | null;
type IsAny<Value> = 0 extends 1 & Value ? true : false;

export function classifyValue(value: InputValue): string {
  switch (true) {
    case typeof value === "string": {
      type _01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      type _02 = Expect<Equal<typeof value.length, TODO>>; // TODO(koan) @koan-error
      type _03 = Expect<Equal<typeof value.toUpperCase, TODO>>; // TODO(koan) @koan-error
      type _04 = Expect<Equal<Extract<InputValue, string>, TODO>>; // TODO(koan) @koan-error
      return `text:${value.toUpperCase()}`;
    }
    case typeof value === "number": {
      type _05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      type _06 = Expect<Equal<ReturnType<typeof value.toFixed>, TODO>>; // TODO(koan) @koan-error
      type _07 = Expect<Equal<Extract<InputValue, number>, TODO>>; // TODO(koan) @koan-error
      type _08 = Expect<Equal<Exclude<InputValue, string | readonly unknown[] | null>, TODO>>; // TODO(koan) @koan-error
      return `number:${value.toFixed(1)}`;
    }
    case Array.isArray(value): {
      type _09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      type _10 = Expect<Equal<IsAny<typeof value[number]>, TODO>>; // TODO(koan) @koan-error
      type _11 = Expect<Equal<typeof value.length, TODO>>; // TODO(koan) @koan-error
      type _12 = Expect<Equal<Extract<InputValue, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
      return `array:${value.length}`;
    }
    default: {
      type _13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      type _14 = Expect<Equal<Exclude<InputValue, string | number | readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
      type _15 = Expect<Equal<typeof value extends null ? true : false, TODO>>; // TODO(koan) @koan-error
      type _16 = Expect<Equal<Extract<InputValue, null>, TODO>>; // TODO(koan) @koan-error
      return "null";
    }
  }
}

export type ScoreBand = "invalid" | "low" | "medium" | "high";

export function scoreBand(score: number | null): ScoreBand {
  switch (true) {
    case score === null:
      return "invalid";
    case score !== null && score < 40:
      return "low";
    case score !== null && score < 80:
      return "medium";
    default:
      return "high";
  }
}

// Part 5: externally visible function types remain ordinary unions/scalars.
type _17 = Expect<Equal<Parameters<typeof classifyValue>[0], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof classifyValue>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof scoreBand>[0], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof scoreBand>, TODO>>; // TODO(koan) @koan-error
