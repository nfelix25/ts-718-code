import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type PointLike,
  Point,
  UndefinedMatcher,
  matchedUndefined,
  pointCoordinates,
} from "./k-183-symbol-hasinstance-narrowing.js";

/** GUIDED DRILLS: repeat matcher signatures, structural target versus instance type, computed-symbol reflection, prototype members, unknown narrowing, tuple results, and primitive custom matches. */

type Extends<From, To> = [From] extends [To] ? true : false;
type MatcherParameter<Matcher> =
  Matcher extends { [Symbol.hasInstance](value: infer Input): boolean }
    ? Input
    : never;
type PointInstance = InstanceType<typeof Point>;

// PointLike and Point structure (1-12)
type _01 = Expect<Equal<keyof PointLike, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<PointLike["x"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<PointLike["y"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof PointInstance, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<PointInstance["x"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<PointInstance["y"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<PointInstance["distanceFromOrigin"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<PointInstance["distanceFromOrigin"]>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<PointInstance, PointLike>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<PointLike, PointInstance>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<{ x: number; y: number }, PointLike>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<{ x: number }, PointLike>, TODO>>; // TODO(koan) @koan-error

// Symbol.hasInstance method surfaces (13-24)
type PointMatcher = typeof Point[typeof Symbol.hasInstance];
type UndefinedPredicate = typeof UndefinedMatcher[typeof Symbol.hasInstance];
type _13 = Expect<Equal<Parameters<PointMatcher>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<PointMatcher>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<PointMatcher>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<UndefinedPredicate>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Parameters<UndefinedPredicate>[0], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<UndefinedPredicate>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<MatcherParameter<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<MatcherParameter<typeof UndefinedMatcher>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<typeof Symbol.hasInstance extends keyof typeof Point ? true : false, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<typeof Symbol.hasInstance extends keyof PointInstance ? true : false, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<keyof typeof Point, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<keyof typeof UndefinedMatcher, TODO>>; // TODO(koan) @koan-error

// Structural versus nominal/prototype intuition (25-36)
type _25 = Expect<Equal<Extends<PointLike, object>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<PointInstance, object>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<PointInstance, PointLike>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<PointLike, PointInstance>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Exclude<keyof PointInstance, keyof PointLike>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extract<keyof PointInstance, keyof PointLike>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Pick<PointInstance, keyof PointLike>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Omit<PointInstance, keyof PointLike>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Extends<{ x: 1; y: 2 }, PointLike>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extends<{ x: "1"; y: 2 }, PointLike>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extends<null, PointLike>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Extends<unknown, PointLike>, TODO>>; // TODO(koan) @koan-error

// Consumer reflection (37-48)
type _37 = Expect<Equal<Parameters<typeof pointCoordinates>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Parameters<typeof pointCoordinates>[0], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ReturnType<typeof pointCoordinates>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Exclude<ReturnType<typeof pointCoordinates>, null>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Extract<ReturnType<typeof pointCoordinates>, null>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Parameters<typeof matchedUndefined>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ReturnType<typeof matchedUndefined>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<typeof pointCoordinates> extends readonly unknown[] | null ? true : false, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<NonNullable<ReturnType<typeof pointCoordinates>>[0], TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<NonNullable<ReturnType<typeof pointCoordinates>>[1], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<NonNullable<ReturnType<typeof pointCoordinates>>["length"], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Awaited<ReturnType<typeof matchedUndefined>>, TODO>>; // TODO(koan) @koan-error

// Unknown, primitive, and constructor relationships (49-60)
type _49 = Expect<Equal<Extract<unknown, PointLike>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Exclude<unknown, PointLike>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extract<unknown, undefined>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Exclude<unknown, undefined>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<ConstructorParameters<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<InstanceType<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ConstructorParameters<typeof UndefinedMatcher>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<InstanceType<typeof UndefinedMatcher>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<undefined, PointInstance>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<undefined, object>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<PointLike, unknown>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<never, PointLike>, TODO>>; // TODO(koan) @koan-error
