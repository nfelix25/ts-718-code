import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type PointLike,
  Point,
  UndefinedMatcher,
  pointCoordinates,
} from "./k-183-symbol-hasinstance-narrowing.js";

/** EDGE CASES: a custom matcher can admit non-instances and primitives, the predicate target need not expose prototype methods, false branches from unknown stay unknown, lying predicates are unsound, and the static/instance sides own different members. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type PointInstance = InstanceType<typeof Point>;

// Pre-solved demonstrations establish target versus instance.
type _DemoInstanceHasMethod = Expect<Equal<"distanceFromOrigin" extends keyof PointInstance ? true : false, true>>;
type _DemoLikeLacksMethod = Expect<Equal<"distanceFromOrigin" extends keyof PointLike ? true : false, false>>;
type _DemoLikeNotInstance = Expect<Equal<PointLike extends PointInstance ? true : false, false>>;
type _DemoPrimitiveTarget = Expect<Equal<ReturnType<typeof UndefinedMatcher[typeof Symbol.hasInstance]>, boolean>>;

// 1. Structural matches need not be constructed instances (1-8)
type _01 = Expect<Equal<Extends<{ x: number; y: number }, PointLike>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<{ x: number; y: number }, PointInstance>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<PointInstance, PointLike>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<PointLike, PointInstance>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Exclude<keyof PointInstance, keyof PointLike>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<keyof PointInstance, keyof PointLike>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<PointInstance["distanceFromOrigin"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<"distanceFromOrigin" extends keyof PointLike ? true : false, TODO>>; // TODO(koan) @koan-error

// 2. The constructor's static side owns the matcher (9-15)
type _09 = Expect<Equal<typeof Symbol.hasInstance extends keyof typeof Point ? true : false, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof Symbol.hasInstance extends keyof PointInstance ? true : false, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<typeof Point[typeof Symbol.hasInstance]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof Point[typeof Symbol.hasInstance]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<typeof UndefinedMatcher[typeof Symbol.hasInstance]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof UndefinedMatcher[typeof Symbol.hasInstance]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof typeof Point, TODO>>; // TODO(koan) @koan-error

// 3. Starting from unknown limits complementary narrowing (16-22)
type _16 = Expect<Equal<Extract<unknown, PointLike>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Exclude<unknown, PointLike>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<unknown, undefined>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Exclude<unknown, undefined>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<unknown, PointLike>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<PointLike, unknown>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof unknown, TODO>>; // TODO(koan) @koan-error

// 4. Bottom types and public results retain ordinary rules (23-30)
type _23 = Expect<Equal<IsNever<Extract<never, PointLike>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<IsNever<Exclude<never, PointLike>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<never, PointLike>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ReturnType<typeof pointCoordinates>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<NonNullable<ReturnType<typeof pointCoordinates>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<NonNullable<ReturnType<typeof pointCoordinates>>["length"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ConstructorParameters<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<PointInstance["distanceFromOrigin"]>, TODO>>; // TODO(koan) @koan-error
