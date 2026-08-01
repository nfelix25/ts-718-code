import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-145: variance annotations — constructions
 * =============================================================================
 *
 * `out`, `in`, and `in out` write down a contract the compiler already has an
 * opinion about. They do not switch assignability on and off: the annotation is
 * checked against how the parameter is actually used, so `out` on a consumed
 * parameter is an error rather than a licence. What they do buy is documentation
 * and a faster comparison between two instantiations of the same alias.
 *
 * The annotated aliases are given here, because writing the annotation is the
 * one thing that cannot be expressed as a `TODO`. What you build is everything
 * that measures them: the unannotated counterparts, the classifier that reports
 * a direction, the mapping from a direction back to the keyword that states it,
 * and the check that says whether a declared keyword is honest. Watch
 * construction 11 in particular — `in out` can be *stricter* than what the
 * structure alone would have inferred. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// The annotated aliases, exactly as the packet declares them.
type Source<out Value> = { get: () => Value };
type Sink<in Value> = { put: (value: Value) => void };
type Channel<in out Value> = { get: () => Value; put: (value: Value) => void };
type StrictReadonly<in out Value> = { readonly value: Value };

// ─── The hierarchy the contracts are measured against ─────────────────

// 1. Build the base of the hierarchy.
export type Animal = TODO; // TODO(koan)

type _01a = Expect<Equal<Animal["kind"], "animal" | "dog" | "cat">>;
type _01b = Expect<Equal<keyof Animal, "kind" | "name">>;
type _01c = Expect<Equal<Animal["name"], string>>;

// 2. Build the narrow member.
export type Dog = TODO; // TODO(koan)

type _02a = Expect<Equal<Dog["kind"], "dog">>;
type _02b = Expect<
  Equal<
    { narrowIntoBroad: GivenExtends<Dog, Animal>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _02c = Expect<Equal<GivenExtends<Animal, Dog>, false>>;

// 3. Build the sibling.
export type Cat = TODO; // TODO(koan)

type _03a = Expect<Equal<Cat["kind"], "cat">>;
type _03b = Expect<Equal<GivenExtends<Dog, Cat>, false>>;
type _03c = Expect<
  Equal<
    { siblingIntoBase: GivenExtends<Cat, Animal>; baseIntoSibling: GivenExtends<Animal, Cat> },
    { siblingIntoBase: true; baseIntoSibling: false }
  >
>;

// ─── The same structures without the annotation ───────────────────────

// 4. Build the unannotated counterpart of `Source<out Value>`: the value only
//    comes out.
export type InferredSource<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    { produced: ReturnType<InferredSource<Dog>["get"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { produced: Dog; broadIntoNarrow: false }
  >
>;
type _04b = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<InferredSource<Dog>, InferredSource<Animal>>;
      broadIntoNarrow: GivenExtends<InferredSource<Animal>, InferredSource<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _04c = Expect<Equal<GivenExtends<InferredSource<Animal>, InferredSource<Dog>>, false>>;
type _04d = Expect<Equal<Equal<InferredSource<Dog>, Source<Dog>>, true>>;

// 5. Build the unannotated counterpart of `Sink<in Value>`: the value only goes
//    in.
export type InferredSink<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    { consumed: Parameters<InferredSink<Dog>["put"]>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { consumed: Dog; broadIntoNarrow: false }
  >
>;
type _05b = Expect<
  Equal<
    {
      broadIntoNarrowSink: GivenExtends<InferredSink<Animal>, InferredSink<Dog>>;
      narrowIntoBroadSink: GivenExtends<InferredSink<Dog>, InferredSink<Animal>>;
    },
    { broadIntoNarrowSink: true; narrowIntoBroadSink: false }
  >
>;
type _05c = Expect<Equal<GivenExtends<InferredSink<Dog>, InferredSink<Animal>>, false>>;
type _05d = Expect<Equal<Equal<InferredSink<Dog>, Sink<Dog>>, true>>;

// 6. Build the unannotated counterpart of `Channel<in out Value>`, where the
//    value crosses in both directions.
export type InferredChannel<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<GivenExtends<InferredChannel<Dog>, InferredChannel<Animal>>, false>>;
type _06b = Expect<Equal<GivenExtends<InferredChannel<Animal>, InferredChannel<Dog>>, false>>;
type _06c = Expect<Equal<keyof InferredChannel<Dog>, "get" | "put">>;
type _06d = Expect<Equal<Equal<InferredChannel<Dog>, Channel<Dog>>, true>>;

// ─── Reading a contract off the type ──────────────────────────────────

// 7. Build the classifier that reports a direction from the two assignability
//    answers.
export type DirectionOf<AtNarrow, AtBroad> = TODO; // TODO(koan)

type _07a = Expect<Equal<DirectionOf<Source<Dog>, Source<Animal>>, "covariant">>;
type _07b = Expect<Equal<DirectionOf<Sink<Dog>, Sink<Animal>>, "contravariant">>;
type _07c = Expect<Equal<DirectionOf<Channel<Dog>, Channel<Animal>>, "invariant">>;
type _07d = Expect<Equal<DirectionOf<Dog, Dog>, "bivariant">>;
type _07e = Expect<Equal<DirectionOf<Dog, Cat>, "invariant">>;

// 8. Build the mapping from a measured direction back to the keyword that would
//    state it. A parameter that moves in both directions is not constrained by
//    any of the three.
export type AnnotationFor<Direction> = TODO; // TODO(koan)

type _08a = Expect<Equal<AnnotationFor<"covariant">, "out">>;
type _08b = Expect<Equal<AnnotationFor<"contravariant">, "in">>;
type _08c = Expect<Equal<AnnotationFor<"invariant">, "in out">>;
type _08d = Expect<Equal<AnnotationFor<"bivariant">, "unconstrained">>;
type _08e = Expect<Equal<AnnotationFor<DirectionOf<Source<Dog>, Source<Animal>>>, "out">>;

// 9. Build the honesty check: a declared keyword is honest exactly when it is
//    the keyword the measurement produces.
export type CheckAnnotation<Declared, Measured> = TODO; // TODO(koan)

type _09a = Expect<Equal<CheckAnnotation<"out", DirectionOf<Source<Dog>, Source<Animal>>>, "honest">>;
type _09b = Expect<Equal<CheckAnnotation<"in", DirectionOf<Sink<Dog>, Sink<Animal>>>, "honest">>;
type _09c = Expect<Equal<CheckAnnotation<"in out", DirectionOf<Channel<Dog>, Channel<Animal>>>, "honest">>;
type _09d = Expect<Equal<CheckAnnotation<"out", DirectionOf<Sink<Dog>, Sink<Animal>>>, "dishonest">>;
type _09e = Expect<Equal<CheckAnnotation<"in", DirectionOf<Source<Dog>, Source<Animal>>>, "dishonest">>;

// ─── What the annotation does and does not change ─────────────────────

// 10. Report the agreement. For an honest definition the annotated alias and its
//     unannotated twin measure identically, and the two are the same type.
export type AgreementProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<AgreementProfile["annotatedSource"], "covariant">>;
type _10b = Expect<Equal<AgreementProfile["inferredSource"], "covariant">>;
type _10c = Expect<Equal<AgreementProfile["annotatedSink"], "contravariant">>;
type _10d = Expect<Equal<AgreementProfile["inferredSink"], "contravariant">>;
type _10e = Expect<Equal<AgreementProfile["sameType"], true>>;

// 11. Build the unannotated twin of `StrictReadonly<in out Value>` — a readonly
//     property and nothing else. The structure alone is an output position, so
//     inference calls it covariant, while the declared `in out` holds the
//     annotated alias to exactness. An annotation may be stricter than what was
//     inferred; it may not be looser.
export type InferredReadonly<Value> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    {
      inferredIsCovariant: DirectionOf<InferredReadonly<Dog>, InferredReadonly<Animal>>;
      declaredIsInvariant: DirectionOf<StrictReadonly<Dog>, StrictReadonly<Animal>>;
    },
    { inferredIsCovariant: "covariant"; declaredIsInvariant: "invariant" }
  >
>;
type _11b = Expect<
  Equal<
    {
      inferredNarrowIntoBroad: GivenExtends<InferredReadonly<Dog>, InferredReadonly<Animal>>;
      inferredBroadIntoNarrow: GivenExtends<InferredReadonly<Animal>, InferredReadonly<Dog>>;
    },
    { inferredNarrowIntoBroad: true; inferredBroadIntoNarrow: false }
  >
>;
type _11c = Expect<Equal<GivenExtends<StrictReadonly<Dog>, StrictReadonly<Animal>>, false>>;
type _11d = Expect<
  Equal<
    { stored: InferredReadonly<Dog>["value"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { stored: Dog; broadIntoNarrow: false }
  >
>;
type _11e = Expect<
  Equal<
    {
      strictIntoStructural: GivenExtends<StrictReadonly<Dog>, InferredReadonly<Animal>>;
      structuralIntoStrict: GivenExtends<InferredReadonly<Dog>, StrictReadonly<Animal>>;
      strictIntoItsOwnBroader: GivenExtends<StrictReadonly<Dog>, StrictReadonly<Animal>>;
    },
    { strictIntoStructural: true; structuralIntoStrict: true; strictIntoItsOwnBroader: false }
  >
>;

// 12. Report what the annotated aliases expose. The keyword constrains
//     assignability, not the shape: the accessors read back exactly as written.
export type AccessProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    { produced: AccessProfile["sourceProduces"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { produced: Dog; broadIntoNarrow: false }
  >
>;
type _12b = Expect<
  Equal<
    { consumed: AccessProfile["sinkConsumes"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { consumed: Dog; broadIntoNarrow: false }
  >
>;
type _12c = Expect<Equal<AccessProfile["channelKeys"], "get" | "put">>;
type _12d = Expect<
  Equal<
    { stored: AccessProfile["strictStores"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { stored: Dog; broadIntoNarrow: false }
  >
>;

// 13. Report nesting. The declared signs multiply exactly the way the inferred
//     ones do: a sink inside a source keeps one flip, a sink inside a sink
//     cancels, and an invariant argument stops the movement wherever it sits.
export type NestingProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<NestingProfile["sinkInsideSource"], true>>;
type _13b = Expect<Equal<NestingProfile["sourceInsideSink"], true>>;
type _13c = Expect<Equal<NestingProfile["sinkInsideSink"], true>>;
type _13d = Expect<Equal<NestingProfile["channelInsideSource"], false>>;
type _13e = Expect<Equal<NestingProfile["channelInsideSink"], false>>;

// 14. Report unions, which follow the declared direction with no special
//     handling.
export type UnionProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<UnionProfile["unionSourceIntoBase"], true>>;
type _14b = Expect<Equal<UnionProfile["memberSourceIntoUnion"], true>>;
type _14c = Expect<Equal<UnionProfile["baseSinkIntoUnion"], true>>;
type _14d = Expect<Equal<UnionProfile["memberChannelIntoUnion"], false>>;

// 15. Report the endpoints, which move opposite ways for `out` and `in`, and
//     `any`, which is exempt from every declared contract.
export type EndpointProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<EndpointProfile["bottomSource"], true>>;
type _15b = Expect<Equal<EndpointProfile["topSource"], true>>;
type _15c = Expect<Equal<EndpointProfile["topSink"], true>>;
type _15d = Expect<Equal<EndpointProfile["bottomSink"], true>>;
type _15e = Expect<Equal<EndpointProfile["anyChannel"], "bivariant">>;

// 16. Report the structural relationship between the three aliases at one
//     argument. A channel has everything a source has and everything a sink
//     has, so it flows into both — and then keeps flowing along each one's
//     declared direction.
export type CompositionProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<CompositionProfile["channelIntoSource"], true>>;
type _16b = Expect<Equal<CompositionProfile["channelIntoSink"], true>>;
type _16c = Expect<Equal<CompositionProfile["sourceIntoChannel"], false>>;
type _16d = Expect<Equal<CompositionProfile["channelIntoBroaderSource"], true>>;

// ─── Using the annotated aliases ──────────────────────────────────────

// 17. Build the API signatures. Every operation is generic in the argument, so
//     the caller pins it and the declared contracts never have to be bent.
export type ChannelApi = TODO; // TODO(koan)

type _17a = Expect<Equal<ReturnType<ChannelApi["makeSource"]>, Source<unknown>>>;
type _17b = Expect<Equal<ReturnType<ChannelApi["makeSink"]>, Sink<unknown>>>;
type _17c = Expect<Equal<ReturnType<ChannelApi["transfer"]>, void>>;
type _17d = Expect<Equal<Parameters<ChannelApi["transfer"]>[1], Sink<unknown>>>;
type _17e = Expect<Equal<ReturnType<ChannelApi["makeChannel"]>, Channel<unknown>>>;

// 18. Build the record of sources over a value map, which inherits the declared
//     `out` contract field by field.
export type Sources<Values> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    { field: Sources<{ pet: Dog }>["pet"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { field: Source<Dog>; broadIntoNarrow: false }
  >
>;
type _18b = Expect<Equal<keyof Sources<{ pet: Dog; other: Cat }>, "pet" | "other">>;
type _18c = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<Sources<{ pet: Dog }>, Sources<{ pet: Animal }>>;
      broadIntoNarrow: GivenExtends<Sources<{ pet: Animal }>, Sources<{ pet: Dog }>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _18d = Expect<Equal<DirectionOf<Sources<{ pet: Dog }>, Sources<{ pet: Animal }>>, "covariant">>;
type _18e = Expect<Equal<CheckAnnotation<"out", DirectionOf<Sources<{ pet: Dog }>, Sources<{ pet: Animal }>>>, "honest">>;
