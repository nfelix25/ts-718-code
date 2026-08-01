import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-158: higher-kinded type emulation — constructions
 * =============================================================================
 *
 * TypeScript can abstract over types, but it cannot take "some generic type
 * constructor `F<_>`" as a parameter. The workaround is to make the constructor
 * a *value* at the type level: an interface with a replaceable `In` slot and an
 * `Out` member computed through polymorphic `this`. Application is then just
 * intersection — write a new `In` and read `Out`.
 *
 * The lambda interfaces are given, because `this` types only exist in interface
 * and class bodies. What you build is the application operator and everything
 * around it, including the alternative encoding: a lookup table keyed by a URI,
 * which is simpler but closed. Watch what the encoding does *not* buy — nothing
 * enforces that a lambda uses its slot at all, a lambda that fixes `In`
 * incompatibly answers `never` rather than erroring, and inference cannot
 * reliably run backwards through an application. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;
type GivenIsNever<Value> = [Value] extends [never] ? true : false;

// The kind itself, and the lambdas written against it.
interface TypeLambda {
  readonly In: unknown;
  readonly Out: unknown;
}
interface IdentityLambda extends TypeLambda {
  readonly Out: this["In"];
}
interface ArrayLambda extends TypeLambda {
  readonly Out: readonly this["In"][];
}
interface BoxLambda extends TypeLambda {
  readonly Out: Box<this["In"]>;
}
interface NullableLambda extends TypeLambda {
  readonly Out: this["In"] | null;
}
interface PromiseLambda extends TypeLambda {
  readonly Out: Promise<this["In"]>;
}
interface ToStringLambda extends TypeLambda {
  readonly Out: this["In"] extends string | number | bigint | boolean | null | undefined
    ? `${this["In"]}`
    : never;
}
interface Compose<Outer extends TypeLambda, Inner extends TypeLambda> extends TypeLambda {
  readonly Out: Apply<Outer, Apply<Inner, this["In"]>>;
}

// Two lambdas that are legal encodings but bad abstractions.
interface GivenConstantLambda extends TypeLambda {
  readonly Out: "constant";
}
interface GivenFixedStringLambda extends TypeLambda {
  readonly In: string;
  readonly Out: this["In"];
}

// ─── Application ──────────────────────────────────────────────────────

// 1. Build the application operator: write the input into the lambda's slot and
//    read what the lambda computed. Intersection is what performs the
//    substitution, and the indexed access is what forces `Out` to be evaluated.
export type Apply<Lambda extends TypeLambda, Input> = TODO; // TODO(koan)

type _01a = Expect<Equal<Apply<IdentityLambda, string>, string>>;
type _01b = Expect<Equal<Apply<ArrayLambda, number>, readonly number[]>>;
type _01c = Expect<Equal<Apply<NullableLambda, Date>, Date | null>>;
type _01d = Expect<Equal<Apply<PromiseLambda, string>, Promise<string>>>;
type _01e = Expect<Equal<Apply<ToStringLambda, 42>, "42">>;

// 2. Build the container one of the lambdas wraps its input in.
export type Box<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<Box<number>, { readonly value: number }>>;
type _02b = Expect<Equal<Box<number>["value"], number>>;
type _02c = Expect<Equal<keyof Box<number>, "value">>;
type _02d = Expect<
  Equal<
    { applied: Apply<BoxLambda, boolean>; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { applied: Box<boolean>; objectHasNoStringForm: true }
  >
>;

// ─── Mapping a lambda across a structure ──────────────────────────────

// 3. Build the tuple mapper: apply the lambda at every position, keeping the
//    tuple's own shape — length, labels, readonly, and optionality.
export type MapTuple<Lambda extends TypeLambda, Inputs extends readonly unknown[]> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    MapTuple<ArrayLambda, readonly [string, number, boolean]>,
    readonly [readonly string[], readonly number[], readonly boolean[]]
  >
>;
type _03b = Expect<Equal<MapTuple<BoxLambda, [1, "two"]>, [Box<1>, Box<"two">]>>;
type _03c = Expect<Equal<MapTuple<BoxLambda, [first?: 1]>, [first?: Box<1 | undefined>]>>;
type _03d = Expect<Equal<MapTuple<IdentityLambda, [string, number]>, [string, number]>>;
type _03e = Expect<Equal<MapTuple<ArrayLambda, []>, []>>;

// 4. Build the record mapper. It is homomorphic, so `readonly` and `?` ride
//    through — and an optional property's value type carries `undefined` into
//    the application.
export type MapRecord<Lambda extends TypeLambda, Input extends object> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<MapRecord<NullableLambda, { id: number; name: string }>, { id: number | null; name: string | null }>
>;
type _04b = Expect<Equal<MapRecord<PromiseLambda, { ready: boolean }>, { ready: Promise<boolean> }>>;
type _04c = Expect<Equal<MapRecord<ArrayLambda, { readonly id: number }>, { readonly id: readonly number[] }>>;
type _04d = Expect<Equal<MapRecord<ArrayLambda, { name?: string }>, { name?: readonly (string | undefined)[] }>>;
type _04e = Expect<Equal<keyof MapRecord<BoxLambda, { a: 1; b: 2 }>, "a" | "b">>;

// ─── The closed alternative ───────────────────────────────────────────

// 5. Build the lookup table: one entry per constructor in a closed family, each
//    written directly rather than through a slot.
export type URIToKind<Input> = TODO; // TODO(koan)

type _05a = Expect<Equal<URIToKind<string>["array"], readonly string[]>>;
type _05b = Expect<
  Equal<
    { entry: URIToKind<number>["box"]; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { entry: Box<number>; objectHasNoStringForm: true }
  >
>;
type _05c = Expect<Equal<URIToKind<boolean>["nullable"], boolean | null>>;
type _05d = Expect<Equal<URIToKind<Date>["promise"], Promise<Date>>>;
type _05e = Expect<Equal<keyof URIToKind<string>, "array" | "box" | "nullable" | "promise">>;

// 6. Build the name of the family — the whole point of the closed encoding is
//    that this set is enumerable.
export type URI = TODO; // TODO(koan)

type _06a = Expect<Equal<URI, "array" | "box" | "nullable" | "promise">>;
type _06b = Expect<Equal<Extract<URI, "box">, "box">>;
type _06c = Expect<Equal<Exclude<URI, "array" | "box">, "nullable" | "promise">>;

// 7. Build the lookup application: choose a constructor by name and an input,
//    and read the entry.
export type Kind<Constructor extends URI, Input> = TODO; // TODO(koan)

type _07a = Expect<Equal<Kind<"array", string>, readonly string[]>>;
type _07b = Expect<
  Equal<
    { looked: Kind<"box", number>; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { looked: Box<number>; objectHasNoStringForm: true }
  >
>;
type _07c = Expect<Equal<Kind<"nullable", boolean>, boolean | null>>;
type _07d = Expect<Equal<Kind<"promise", Date>, Promise<Date>>>;
type _07e = Expect<
  Equal<
    { lookedUpTwice: Kind<"array" | "box", string>; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { lookedUpTwice: readonly string[] | Box<string>; objectHasNoStringForm: true }
  >
>;

// 8. Build the abstraction the whole encoding exists for: an interface generic
//    in a *constructor*, whose method relates the container at one input to the
//    container at another.
export type Functor<Lambda extends TypeLambda> = TODO; // TODO(koan)

type _08a = Expect<Equal<keyof Functor<ArrayLambda>, "map">>;
type _08b = Expect<Equal<Parameters<Functor<ArrayLambda>["map"]>[0], readonly unknown[]>>;
type _08c = Expect<
  Equal<
    { mapped: ReturnType<Functor<BoxLambda>["map"]>; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { mapped: Box<unknown>; objectHasNoStringForm: true }
  >
>;
type _08d = Expect<Equal<Parameters<Functor<ArrayLambda>["map"]>["length"], 2>>;
type _08e = Expect<Equal<ReturnType<typeof mapNumbers>, readonly string[]>>;

declare const mapNumbers: (
  value: Apply<ArrayLambda, number>,
  transform: (input: number) => string,
) => Apply<ArrayLambda, string>;

// ─── What the encoding computes ───────────────────────────────────────

// 9. Report application across the lambda family at one input, so the shapes
//    can be compared side by side.
export type ApplicationProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ApplicationProfile["identity"], string>>;
type _09b = Expect<Equal<ApplicationProfile["array"], readonly string[]>>;
type _09c = Expect<
  Equal<
    { boxed: ApplicationProfile["box"]; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { boxed: Box<string>; objectHasNoStringForm: true }
  >
>;
type _09d = Expect<Equal<ApplicationProfile["nullable"], string | null>>;
type _09e = Expect<Equal<ApplicationProfile["promise"], Promise<string>>>;

// 10. Report composition. Applying the composed lambda is the same as applying
//     the inner one and then the outer one — and the order is visible in the
//     result, so the two orderings are different types.
export type CompositionProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    { composed: CompositionProfile["boxOfArrays"]; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { composed: Box<readonly string[]>; objectHasNoStringForm: true }
  >
>;
type _10b = Expect<Equal<CompositionProfile["arrayOfBoxes"], readonly Box<string>[]>>;
type _10c = Expect<Equal<CompositionProfile["nullablePromise"], Promise<number> | null>>;
type _10d = Expect<Equal<CompositionProfile["ordersDiffer"], false>>;
type _10e = Expect<Equal<CompositionProfile["composedWithIdentity"], readonly string[]>>;

// 11. Report the special inputs. The slot is an ordinary type position, so the
//     bottom and top types flow through the lambda's body exactly as they would
//     through a hand-written constructor.
export type SpecialInputProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<SpecialInputProfile["identityOfBottom"], never>>;
type _11b = Expect<Equal<SpecialInputProfile["arrayOfBottom"], readonly never[]>>;
type _11c = Expect<Equal<SpecialInputProfile["nullableOfBottom"], null>>;
type _11d = Expect<Equal<SpecialInputProfile["arrayOfTop"], readonly unknown[]>>;
type _11e = Expect<Equal<SpecialInputProfile["identityOfAnythingStaysAny"], true>>;

// 12. Report what the encoding does not enforce. A lambda may ignore its slot
//     entirely, and one that pins `In` to an incompatible type does not error —
//     the intersection is simply empty and the application answers `never`.
export type UnenforcedProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<UnenforcedProfile["ignoresItsInput"], "constant">>;
type _12b = Expect<Equal<UnenforcedProfile["ignoresItsInputAgain"], "constant">>;
type _12c = Expect<Equal<UnenforcedProfile["fixedSlotAtItsOwnType"], string>>;
type _12d = Expect<Equal<UnenforcedProfile["fixedSlotAtAnother"], true>>;
type _12e = Expect<Equal<UnenforcedProfile["ignoringIsIndistinguishable"], true>>;

// 13. Build the backward reader — the operation a native kind would give for
//     free. It works when the pattern is written out concretely, which is
//     exactly the limitation: the application has to be re-derived by hand.
export type InferAppliedInput<Value> = TODO; // TODO(koan)

type _13a = Expect<Equal<InferAppliedInput<readonly string[]>, string>>;
type _13b = Expect<Equal<InferAppliedInput<readonly number[]>, number>>;
type _13c = Expect<Equal<InferAppliedInput<Box<string>>, never>>;
type _13d = Expect<Equal<InferAppliedInput<string>, never>>;

// 14. Report unions of lambdas. Application distributes over them, so a union of
//     constructors produces a union of containers rather than an error —
//     convenient, and also a place where precision quietly leaks away.
export type LambdaUnionProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    { distributed: LambdaUnionProfile["twoContainers"]; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { distributed: readonly string[] | Box<string>; objectHasNoStringForm: true }
  >
>;
type _14b = Expect<Equal<LambdaUnionProfile["identityBesideNullable"], number | null>>;
type _14c = Expect<Equal<LambdaUnionProfile["collapsed"], true>>;
type _14d = Expect<Equal<LambdaUnionProfile["stillOneContainer"], readonly string[]>>;

// 15. Report the string-producing lambda, whose body is a conditional rather
//     than a wrapper — so the slot's type decides whether there is any output at
//     all, and a union input distributes through it.
export type ConditionalLambdaProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<ConditionalLambdaProfile["fromLiteral"], "42">>;
type _15b = Expect<Equal<ConditionalLambdaProfile["fromUnion"], `${string}` | `${number}`>>;
type _15c = Expect<Equal<ConditionalLambdaProfile["fromObject"], never>>;
type _15d = Expect<Equal<ConditionalLambdaProfile["fromBoolean"], "true">>;

// 16. Report the two encodings against each other at the same constructors. They
//     compute the same containers; the difference is that one is closed and
//     enumerable while the other composes.
export type EncodingProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<EncodingProfile["lambdaArray"], readonly string[]>>;
type _16b = Expect<Equal<EncodingProfile["lookupArray"], readonly string[]>>;
type _16c = Expect<Equal<EncodingProfile["theyAgree"], true>>;
type _16d = Expect<Equal<EncodingProfile["familyIsEnumerable"], "array" | "box" | "nullable" | "promise">>;
type _16e = Expect<Equal<EncodingProfile["lookupCannotCompose"], true>>;

// ─── Programming against a constructor ────────────────────────────────

// 17. Build the signature that consumes a functor generically — the thing that
//     is impossible without the encoding, because it abstracts over the
//     container as well as over its contents.
export type FunctorApi = TODO; // TODO(koan)

type _17a = Expect<Equal<Parameters<FunctorApi["mapTwice"]>["length"], 4>>;
type _17b = Expect<Equal<ReturnType<typeof mapArrayTwice>, readonly string[]>>;
type _17c = Expect<Equal<Parameters<typeof mapArrayTwice>[1], readonly number[]>>;
type _17d = Expect<
  Equal<
    { demanded: Parameters<typeof mapArrayTwice>[0]; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { demanded: Functor<ArrayLambda>; objectHasNoStringForm: true }
  >
>;

declare const mapArrayTwice: (
  functor: Functor<ArrayLambda>,
  value: Apply<ArrayLambda, number>,
  first: (input: number) => boolean,
  second: (middle: boolean) => string,
) => Apply<ArrayLambda, string>;

// 18. Report one constructor end to end: what it produces at an input, what it
//     produces mapped across a structure, and what the closed encoding calls
//     the same thing.
export type ConstructorReport<Lambda extends TypeLambda, Input> = TODO; // TODO(koan)

type _18a = Expect<Equal<ConstructorReport<ArrayLambda, string>["applied"], readonly string[]>>;
type _18b = Expect<
  Equal<ConstructorReport<ArrayLambda, string>["overATuple"], [readonly string[], readonly string[]]>
>;
type _18c = Expect<Equal<ConstructorReport<BoxLambda, number>["overARecord"], { only: Box<number> }>>;
type _18d = Expect<
  Equal<
    { twiceOver: ConstructorReport<BoxLambda, number>["composedWithItself"]; objectHasNoStringForm: GivenIsNever<Apply<ToStringLambda, object>> },
    { twiceOver: Box<Box<number>>; objectHasNoStringForm: true }
  >
>;
type _18e = Expect<Equal<ConstructorReport<IdentityLambda, string>["composedWithItself"], string>>;
