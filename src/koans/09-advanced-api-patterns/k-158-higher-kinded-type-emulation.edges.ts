import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type Apply,
  type ArrayLambda,
  type BoxLambda,
  type Compose,
  type Functor,
  type IdentityLambda,
  type Kind,
  type MapRecord,
  type MapTuple,
  type NullableLambda,
  type ToStringLambda,
  type TypeLambda,
  type URI,
  type URIToKind,
} from "./k-158-higher-kinded-type-emulation.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * This encoding is not a new language kind. Conditional inference cannot always
 * invert `Apply<F, A>` to recover A, unions of lambdas can widen aggressively,
 * and nothing enforces functor laws. A lambda may ignore its input slot or fix
 * it incompatibly; the compiler only checks the structural encoding.
 */

type IsAny<Value> = 0 extends 1 & Value ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;

interface ConstantLambda extends TypeLambda {
  readonly Out: "constant";
}

interface FixedStringLambda extends TypeLambda {
  readonly In: string;
  readonly Out: this["In"];
}

type InferAppliedInput<Value> =
  Value extends Apply<ArrayLambda, infer Input> ? Input : never;

// Pre-solved demonstrations capture the non-invertible boundary.
type _DemoApply = Expect<Equal<Apply<ArrayLambda, string>, readonly string[]>>;
type _DemoConstant = Expect<Equal<Apply<ConstantLambda, number>, "constant">>;
type _DemoFixedCollision = Expect<Equal<Apply<FixedStringLambda, number>, never>>;
type _DemoURIClosed = Expect<Equal<URI, keyof URIToKind<unknown>>>;
// The mapTwice tests provide explicit type arguments because Input is not reliably inferred backward through Apply.

// 1. Application with top, bottom, any, and fixed slots (1-8)
type _01 = Expect<Equal<Apply<IdentityLambda, never>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Apply<ArrayLambda, never>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Apply<NullableLambda, never>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Apply<ArrayLambda, unknown>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<IsAny<Apply<IdentityLambda, any>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Apply<ConstantLambda, number>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Apply<FixedStringLambda, string>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsNever<Apply<FixedStringLambda, number>>, TODO>>; // TODO(koan) @koan-error

// 2. Backward inference and lambda unions are weaker than direct constructors (9-16)
type _09 = Expect<Equal<InferAppliedInput<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<InferAppliedInput<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Apply<ArrayLambda | BoxLambda, string>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Apply<IdentityLambda | NullableLambda, number>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Apply<Compose<ArrayLambda, BoxLambda>, string>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Apply<Compose<BoxLambda, ArrayLambda>, string>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Apply<ToStringLambda, string | number>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Apply<ToStringLambda, object>, TODO>>; // TODO(koan) @koan-error

// 3. Mapping preserves container modifiers and exposes object surface quirks (17-23)
type _17 = Expect<Equal<MapTuple<BoxLambda, readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<MapTuple<BoxLambda, [first?: 1]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<MapRecord<ArrayLambda, { readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<MapRecord<ArrayLambda, { name?: string }>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<MapRecord<ConstantLambda, { a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<MapRecord<BoxLambda, never>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<MapTuple<ArrayLambda, never>, TODO>>; // TODO(koan) @koan-error

// 4. URI unions and functor types remain structural conventions (24-30)
type _24 = Expect<Equal<Kind<"array" | "box", string>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Kind<URI, never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Kind<"nullable", never>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<keyof URIToKind<unknown>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Parameters<Functor<ConstantLambda>["map"]>[0], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<Functor<ConstantLambda>["map"]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Functor<ConstantLambda> extends { map: Function } ? true : false, TODO>>; // TODO(koan) @koan-error
