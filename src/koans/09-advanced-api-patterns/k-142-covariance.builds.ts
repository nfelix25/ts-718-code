import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-142: covariance — constructions
 * =============================================================================
 *
 * Covariance is the direction a type argument is allowed to move when the whole
 * type moves. A producer of `Dog` is a producer of `Animal` because every value
 * that comes out already satisfies the broader promise; the caller simply uses
 * fewer of the guarantees it was handed. Output positions — return types,
 * readonly fields, resolved promises, immutable elements — are where that
 * argument holds.
 *
 * The lesson is sharper when the direction is measured rather than asserted, so
 * the classifier below reports which of the four directions a constructor
 * actually has at a given pair of arguments. Run it over writable structures and
 * arrays and you will find TypeScript answering "covariant" for positions that
 * are not sound: mutable properties, arrays, and method-declared parameters are
 * deliberate compromises, not conclusions from the safety argument. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The hierarchy that supplies the direction ────────────────────────

// 1. Build the base of the hierarchy: a readonly discriminant covering every
//    member, plus the field they all share.
export type Animal = TODO; // TODO(koan)

type _01a = Expect<Equal<Animal["kind"], "animal" | "dog" | "cat">>;
type _01b = Expect<Equal<Animal["name"], string>>;
type _01c = Expect<Equal<keyof Animal, "kind" | "name">>;
type _01d = Expect<
  Equal<
    {
      baseIntoSharedField: GivenExtends<Animal, { readonly name: string }>;
      sharedFieldIntoBase: GivenExtends<{ readonly name: string }, Animal>;
    },
    { baseIntoSharedField: true; sharedFieldIntoBase: false }
  >
>;

// 2. Build the narrower member: the discriminant pinned to one literal, the
//    shared field kept, and one capability the base does not have.
export type Dog = TODO; // TODO(koan)

type _02a = Expect<Equal<Dog["kind"], "dog">>;
type _02b = Expect<Equal<ReturnType<Dog["bark"]>, string>>;
type _02c = Expect<
  Equal<
    { narrowIntoBroad: GivenExtends<Dog, Animal>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _02d = Expect<Equal<GivenExtends<Animal, Dog>, false>>;
type _02e = Expect<Equal<keyof Dog, "kind" | "name" | "bark">>;

// 3. Build the sibling member, which shares the base but not the capability.
export type Cat = TODO; // TODO(koan)

type _03a = Expect<Equal<Cat["kind"], "cat">>;
type _03b = Expect<
  Equal<
    { siblingIntoBase: GivenExtends<Cat, Animal>; baseIntoSibling: GivenExtends<Animal, Cat> },
    { siblingIntoBase: true; baseIntoSibling: false }
  >
>;
type _03c = Expect<Equal<GivenExtends<Dog, Cat>, false>>;
type _03d = Expect<Equal<GivenExtends<Cat, Dog>, false>>;

// ─── The output positions ─────────────────────────────────────────────

// 4. Build the pure producer — a function that takes nothing and hands the value
//    back. This is the position the whole rule is derived from.
export type Producer<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    { produced: ReturnType<Producer<Dog>>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { produced: Dog; broadIntoNarrow: false }
  >
>;
type _04b = Expect<Equal<Parameters<Producer<Dog>>, []>>;
type _04c = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<Producer<Dog>, Producer<Animal>>;
      broadIntoNarrow: GivenExtends<Producer<Animal>, Producer<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _04d = Expect<Equal<GivenExtends<Producer<Animal>, Producer<Dog>>, false>>;
type _04e = Expect<Equal<GivenExtends<Producer<Dog | Cat>, Producer<Dog>>, false>>;

// 5. Build the immutable single-slot container. A readonly property is an output
//    position for the same reason a return type is.
export type ReadonlyBox<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    { stored: ReadonlyBox<Dog>["value"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { stored: Dog; broadIntoNarrow: false }
  >
>;
type _05b = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<ReadonlyBox<Dog>, ReadonlyBox<Animal>>;
      broadIntoNarrow: GivenExtends<ReadonlyBox<Animal>, ReadonlyBox<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _05c = Expect<Equal<GivenExtends<ReadonlyBox<Animal>, ReadonlyBox<Dog>>, false>>;
type _05d = Expect<
  Equal<
    { stored: (ReadonlyBox<Dog> | ReadonlyBox<Cat>)["value"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { stored: Dog | Cat; broadIntoNarrow: false }
  >
>;

// 6. Build the read-only source, which offers the same value through both an
//    accessor method and a readonly field.
export type Source<Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    { current: Source<Dog>["current"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { current: Dog; broadIntoNarrow: false }
  >
>;
type _06b = Expect<
  Equal<
    { read: ReturnType<Source<Dog>["get"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { read: Dog; broadIntoNarrow: false }
  >
>;
type _06c = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<Source<Dog>, Source<Animal>>;
      broadIntoNarrow: GivenExtends<Source<Animal>, Source<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _06d = Expect<Equal<keyof Source<Dog>, "get" | "current">>;

// ─── Measuring the direction instead of assuming it ───────────────────

// 7. Build the classifier that names the direction from the two assignability
//    answers alone: one way, the other way, both, or neither.
export type DirectionOf<AtNarrow, AtBroad> = TODO; // TODO(koan)

type _07a = Expect<Equal<DirectionOf<Producer<Dog>, Producer<Animal>>, "covariant">>;
type _07b = Expect<Equal<DirectionOf<(value: Dog) => void, (value: Animal) => void>, "contravariant">>;
type _07c = Expect<Equal<DirectionOf<Dog, Dog>, "bivariant">>;
type _07d = Expect<Equal<DirectionOf<Dog, Cat>, "invariant">>;
type _07e = Expect<Equal<DirectionOf<ReadonlyBox<Dog>, ReadonlyBox<Animal>>, "covariant">>;

// 8. Build the writable single-slot container, so the classifier can be pointed
//    at a position the safety argument does not actually cover.
export type MutableBox<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<DirectionOf<MutableBox<Dog>, MutableBox<Animal>>, "covariant">>;
type _08b = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<MutableBox<Dog>, MutableBox<Animal>>;
      broadIntoNarrow: GivenExtends<MutableBox<Animal>, MutableBox<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _08c = Expect<Equal<GivenExtends<MutableBox<Animal>, MutableBox<Dog>>, false>>;
type _08d = Expect<
  Equal<
    {
      writableMatchesReadonly: Equal<
        DirectionOf<MutableBox<Dog>, MutableBox<Animal>>,
        DirectionOf<ReadonlyBox<Dog>, ReadonlyBox<Animal>>
      >;
      broadIntoNarrow: GivenExtends<Animal, Dog>;
    },
    { writableMatchesReadonly: true; broadIntoNarrow: false }
  >
>;

// 9. Build the accessor pair whose writer is declared as a *method*. Method
//    parameters are compared bivariantly, so the input position does not pull
//    the verdict away from covariant.
export type MethodPair<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<DirectionOf<MethodPair<Dog>, MethodPair<Animal>>, "covariant">>;
type _09b = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<MethodPair<Dog>, MethodPair<Animal>>;
      broadIntoNarrow: GivenExtends<MethodPair<Animal>, MethodPair<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _09c = Expect<Equal<GivenExtends<MethodPair<Animal>, MethodPair<Dog>>, false>>;
type _09d = Expect<Equal<Parameters<MethodPair<Dog>["set"]>, [value: Dog]>>;

// 10. Build the same pair with the writer declared as a *property*. Now the
//     input position is compared contravariantly, the two directions disagree,
//     and the constructor is invariant.
export type PropertyPair<Value> = TODO; // TODO(koan)

type _10a = Expect<Equal<DirectionOf<PropertyPair<Dog>, PropertyPair<Animal>>, "invariant">>;
type _10b = Expect<Equal<GivenExtends<PropertyPair<Dog>, PropertyPair<Animal>>, false>>;
type _10c = Expect<Equal<GivenExtends<PropertyPair<Animal>, PropertyPair<Dog>>, false>>;
type _10d = Expect<Equal<Equal<DirectionOf<PropertyPair<Dog>, PropertyPair<Animal>>, DirectionOf<MethodPair<Dog>, MethodPair<Animal>>>, false>>;

// 11. Report the whole survey at one pair of arguments. Three of these are
//     covariant because the values only come out; three are covariant because
//     the checker chose convenience over soundness.
export type VarianceReport = TODO; // TODO(koan)

type _11a = Expect<Equal<VarianceReport["producer"], "covariant">>;
type _11b = Expect<Equal<VarianceReport["readonlyBox"], "covariant">>;
type _11c = Expect<Equal<VarianceReport["source"], "covariant">>;
type _11d = Expect<Equal<VarianceReport["mutableBox"], "covariant">>;
type _11e = Expect<Equal<VarianceReport["propertyPair"], "invariant">>;

// ─── Where the direction holds and where it is a compromise ───────────

// 12. Report the containers. Immutable ones are covariant on the argument;
//     mutable ones are treated the same way despite the write position.
export type ContainerProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ContainerProfile["readonlyArray"], "covariant">>;
type _12b = Expect<Equal<ContainerProfile["mutableArray"], "covariant">>;
type _12c = Expect<Equal<ContainerProfile["tuple"], "covariant">>;
type _12d = Expect<Equal<ContainerProfile["set"], "covariant">>;
type _12e = Expect<Equal<ContainerProfile["promise"], "covariant">>;

// 13. Report nesting. Covariance composes: an output position inside another
//     output position keeps the direction, however deep it goes.
export type NestingProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<NestingProfile["producerOfProducer"], true>>;
type _13b = Expect<Equal<NestingProfile["producerOfReadonlyArray"], true>>;
type _13c = Expect<Equal<NestingProfile["boxOfPromise"], true>>;
type _13d = Expect<Equal<NestingProfile["boxOfProducer"], true>>;
type _13e = Expect<Equal<NestingProfile["reversedAtDepth"], false>>;

// 14. Report unions. A union of narrow values still flows into the base, and a
//     single member still flows into a union that contains it — but nothing
//     flows back down.
export type UnionProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<UnionProfile["unionInsideIntoBase"], true>>;
type _14b = Expect<Equal<UnionProfile["memberIntoUnion"], true>>;
type _14c = Expect<Equal<UnionProfile["unionIntoMember"], false>>;
type _14d = Expect<Equal<UnionProfile["unionOfBoxesIntoBase"], true>>;
type _14e = Expect<Equal<UnionProfile["unionOfProducersIntoBase"], true>>;

// 15. Report the endpoints. The bottom type sits underneath every argument, the
//     top type sits above all of them, `any` sits on both sides at once, and a
//     `void` return accepts any value because the caller agreed to ignore it.
export type EndpointProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<EndpointProfile["bottomIntoAnything"], true>>;
type _15b = Expect<Equal<EndpointProfile["anythingIntoTop"], true>>;
type _15c = Expect<Equal<EndpointProfile["topIntoAnything"], false>>;
type _15d = Expect<Equal<EndpointProfile["anyBothWays"], "bivariant">>;
type _15e = Expect<Equal<EndpointProfile["intoVoidReturn"], true>>;

// 16. Report what reflection sees. Assignability treats a union of producers and
//     a producer of a union the same way, and `ReturnType` collapses both to the
//     same union — the difference is in the type, not in the answer.
export type ReflectionProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    { reflected: ReflectionProfile["fromUnionOfSignatures"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { reflected: Dog | Cat; broadIntoNarrow: false }
  >
>;
type _16b = Expect<
  Equal<
    { reflected: ReflectionProfile["fromSignatureOfUnion"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { reflected: Dog | Cat; broadIntoNarrow: false }
  >
>;
type _16c = Expect<Equal<ReflectionProfile["bothAssignable"], true>>;
type _16d = Expect<
  Equal<
    { reflected: ReflectionProfile["boxedUnion"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { reflected: Dog | Cat; broadIntoNarrow: false }
  >
>;

// ─── Using the direction on purpose ───────────────────────────────────

// 17. Build the widening helpers. One states the direction as a constraint and
//     changes nothing at runtime; the other moves the argument by mapping it,
//     which is the only way to travel against the direction.
export type WidenApi = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { widened: ReturnType<WidenApi["widen"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { widened: Producer<unknown>; broadIntoNarrow: false }
  >
>;
type _17b = Expect<
  Equal<
    { mapped: ReturnType<WidenApi["map"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { mapped: Producer<unknown>; broadIntoNarrow: false }
  >
>;
type _17c = Expect<Equal<Parameters<WidenApi["map"]>[0], Producer<unknown>>>;
type _17d = Expect<
  Equal<
    { widened: ReturnType<typeof widenDog>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { widened: Producer<Animal>; broadIntoNarrow: false }
  >
>;
type _17e = Expect<
  Equal<
    { mapped: ReturnType<typeof nameOf>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { mapped: Producer<string>; broadIntoNarrow: false }
  >
>;

declare const widenDog: (producer: Producer<Dog>) => Producer<Animal>;
declare const nameOf: (producer: Producer<Dog>) => Producer<string>;

// 18. Build the mapper that turns a record of values into a record of producers
//     of those values, so the whole record inherits the direction one field at a
//     time.
export type Producers<Values> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    { field: Producers<{ pet: Dog }>["pet"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { field: Producer<Dog>; broadIntoNarrow: false }
  >
>;
type _18b = Expect<Equal<keyof Producers<{ pet: Dog; other: Cat }>, "pet" | "other">>;
type _18c = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<Producers<{ pet: Dog }>, Producers<{ pet: Animal }>>;
      broadIntoNarrow: GivenExtends<Producers<{ pet: Animal }>, Producers<{ pet: Dog }>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _18d = Expect<Equal<GivenExtends<Producers<{ pet: Animal }>, Producers<{ pet: Dog }>>, false>>;
type _18e = Expect<Equal<DirectionOf<Producers<{ pet: Dog }>, Producers<{ pet: Animal }>>, "covariant">>;
