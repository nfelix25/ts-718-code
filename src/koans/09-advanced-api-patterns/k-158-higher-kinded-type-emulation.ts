import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 158 - HIGHER-KINDED TYPE EMULATION
 * ========================================
 *
 * TypeScript can abstract over values and types, but it cannot directly declare
 * a parameter meaning "some generic type constructor F<_>." We emulate that
 * missing kind with a type-lambda interface: `In` is a replaceable slot and
 * `Out` is computed through polymorphic `this`. Intersecting a lambda with a new
 * `In` slot performs application.
 *
 * Read `Apply<ArrayLambda, string>` aloud as: "take ArrayLambda, replace its In
 * member with string, then read Out." This is structural encoding machinery,
 * not native HKT syntax. URI lookup tables are simpler for a closed constructor
 * family; type lambdas compose more freely but have sharper inference edges.
 */

export interface TypeLambda {
  readonly In: unknown;
  readonly Out: unknown;
}

export type Apply<
  Lambda extends TypeLambda,
  Input,
> = (Lambda & { readonly In: Input })["Out"];

export type Box<Value> = Readonly<{
  value: Value;
}>;

export interface IdentityLambda extends TypeLambda {
  readonly Out: this["In"];
}

export interface ArrayLambda extends TypeLambda {
  readonly Out: readonly this["In"][];
}

export interface BoxLambda extends TypeLambda {
  readonly Out: Box<this["In"]>;
}

export interface NullableLambda extends TypeLambda {
  readonly Out: this["In"] | null;
}

export interface PromiseLambda extends TypeLambda {
  readonly Out: Promise<this["In"]>;
}

export interface ToStringLambda extends TypeLambda {
  readonly Out: this["In"] extends string | number | bigint | boolean | null | undefined
    ? `${this["In"]}`
    : never;
}

export interface Compose<
  Outer extends TypeLambda,
  Inner extends TypeLambda,
> extends TypeLambda {
  readonly Out: Apply<Outer, Apply<Inner, this["In"]>>;
}

export type MapTuple<
  Lambda extends TypeLambda,
  Inputs extends readonly unknown[],
> = {
  [Index in keyof Inputs]: Apply<Lambda, Inputs[Index]>;
};

export type MapRecord<
  Lambda extends TypeLambda,
  Input extends object,
> = {
  [Key in keyof Input]: Apply<Lambda, Input[Key]>;
};

export interface URIToKind<Input> {
  readonly array: readonly Input[];
  readonly box: Box<Input>;
  readonly nullable: Input | null;
  readonly promise: Promise<Input>;
}

export type URI = keyof URIToKind<unknown>;

export type Kind<
  Constructor extends URI,
  Input,
> = URIToKind<Input>[Constructor];

export interface Functor<Lambda extends TypeLambda> {
  map<Input, Output>(
    value: Apply<Lambda, Input>,
    transform: (input: Input) => Output,
  ): Apply<Lambda, Output>;
}

// Part 1: Applying a lambda fills one generic constructor slot.
type _01 = Expect<Equal<Apply<IdentityLambda, string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Apply<ArrayLambda, number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Apply<BoxLambda, boolean>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Apply<NullableLambda, Date>, TODO>>; // TODO(koan) @koan-error

// Part 2: Lambdas map across type-level containers.
type _05 = Expect<Equal<MapTuple<ArrayLambda, readonly [string, number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<MapTuple<BoxLambda, [1, "two"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<MapRecord<NullableLambda, { id: number; name: string }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<MapRecord<PromiseLambda, { ready: boolean }>, TODO>>; // TODO(koan) @koan-error

// Part 3: Composition feeds one lambda's output into another.
type BoxedArray = Compose<BoxLambda, ArrayLambda>;
type ArrayOfBoxes = Compose<ArrayLambda, BoxLambda>;
type _09 = Expect<Equal<Apply<BoxedArray, string>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Apply<ArrayOfBoxes, string>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Apply<Compose<NullableLambda, PromiseLambda>, number>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Apply<ToStringLambda, 42>, TODO>>; // TODO(koan) @koan-error

// Part 4: URI lookup is a closed-family alternative.
type _13 = Expect<Equal<URI, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Kind<"array", string>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Kind<"box", number>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Kind<"nullable", boolean>, TODO>>; // TODO(koan) @koan-error

// Part 5: Runtime functors use the emulated constructor relation.
type _17 = Expect<Equal<Parameters<Functor<ArrayLambda>["map"]>[0], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<Functor<BoxLambda>["map"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<typeof arrayFunctor, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof mapTwice<ArrayLambda, number, string, number>>, TODO>>; // TODO(koan) @koan-error

export const arrayFunctor: Functor<ArrayLambda> = {
  map: (value, transform) => value.map(transform),
};

export const boxFunctor: Functor<BoxLambda> = {
  map: (value, transform) => ({ value: transform(value.value) }),
};

export const nullableFunctor: Functor<NullableLambda> = {
  map: (value, transform) => value === null ? null : transform(value),
};

export function mapTwice<
  Lambda extends TypeLambda,
  Input,
  Middle,
  Output,
>(
  functor: Functor<Lambda>,
  value: Apply<Lambda, Input>,
  first: (input: Input) => Middle,
  second: (middle: Middle) => Output,
): Apply<Lambda, Output> {
  return functor.map(functor.map(value, first), second);
}
