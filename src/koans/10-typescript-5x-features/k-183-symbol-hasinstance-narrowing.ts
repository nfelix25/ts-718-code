import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 183 - SYMBOL.HASINSTANCE NARROWING
 * ========================================
 *
 * `instanceof` is customizable. If the right-hand value defines
 * `Symbol.hasInstance`, JavaScript calls that method instead of performing the
 * ordinary prototype-chain check.
 *
 * TypeScript 5.3 recognizes a type predicate on that method. Read
 * `value instanceof Point` aloud as "Point[Symbol.hasInstance](value) returned
 * true, so value has that predicate's target type." That target can be a
 * structural `PointLike`, not the actual `Point` instance type.
 *
 * This prevents an important mistake: a matching plain object may have `x` and
 * `y`, but it does not acquire Point prototype methods. The declared predicate
 * must match the runtime test honestly.
 *
 * Feature ownership: TypeScript 5.3.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html#instanceof-narrowing-through-symbolhasinstance
 */

export interface PointLike {
  x: number;
  y: number;
}

export class Point implements PointLike {
  constructor(
    public x: number,
    public y: number,
  ) {}

  distanceFromOrigin(): number {
    return Math.hypot(this.x, this.y);
  }

  static [Symbol.hasInstance](value: unknown): value is PointLike {
    return (
      typeof value === "object" &&
      value !== null &&
      "x" in value &&
      "y" in value &&
      typeof value.x === "number" &&
      typeof value.y === "number"
    );
  }
}

export class UndefinedMatcher {
  static [Symbol.hasInstance](value: unknown): value is undefined {
    return value === undefined;
  }
}

export function pointCoordinates(value: unknown): [number, number] | null {
  if (value instanceof Point) {
    type _01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _02 = Expect<Equal<typeof value.x, TODO>>; // TODO(koan) @koan-error
    type _03 = Expect<Equal<typeof value.y, TODO>>; // TODO(koan) @koan-error
    type _04 = Expect<Equal<keyof typeof value, TODO>>; // TODO(koan) @koan-error
    return [value.x, value.y];
  }

  type _05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _06 = Expect<Equal<Exclude<unknown, PointLike>, TODO>>; // TODO(koan) @koan-error
  type _07 = Expect<Equal<unknown extends typeof value ? true : false, TODO>>; // TODO(koan) @koan-error
  type _08 = Expect<Equal<keyof typeof value, TODO>>; // TODO(koan) @koan-error
  return null;
}

export function matchedUndefined(value: unknown): boolean {
  if (value instanceof UndefinedMatcher) {
    type _09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _10 = Expect<Equal<typeof value extends undefined ? true : false, TODO>>; // TODO(koan) @koan-error
    type _11 = Expect<Equal<Extract<unknown, undefined>, TODO>>; // TODO(koan) @koan-error
    type _12 = Expect<Equal<keyof typeof value, TODO>>; // TODO(koan) @koan-error
    return true;
  }

  type _13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _14 = Expect<Equal<unknown extends typeof value ? true : false, TODO>>; // TODO(koan) @koan-error
  type _15 = Expect<Equal<ReturnType<typeof UndefinedMatcher[typeof Symbol.hasInstance]>, TODO>>; // TODO(koan) @koan-error
  type _16 = Expect<Equal<Parameters<typeof UndefinedMatcher[typeof Symbol.hasInstance]>, TODO>>; // TODO(koan) @koan-error
  return false;
}

// Part 5: matcher predicates and class instances remain separate surfaces.
type _17 = Expect<Equal<InstanceType<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<PointLike extends Point ? true : false, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof pointCoordinates>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof matchedUndefined>, TODO>>; // TODO(koan) @koan-error
