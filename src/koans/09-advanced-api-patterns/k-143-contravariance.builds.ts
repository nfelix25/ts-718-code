import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-143: contravariance — constructions
 * =============================================================================
 *
 * Contravariance is the same safety argument read from the other end. A function
 * that can handle every `Animal` is a safe stand-in wherever a `Dog` handler was
 * promised, because every value that will ever arrive is one it already accepts.
 * The reverse fails: a `Dog` handler asked to take an `Animal` may be handed a
 * `Cat` and call `bark` on it.
 *
 * The rule generalises by counting positions. Each parameter position is a
 * negative position, and each nesting into one flips the direction; two flips
 * cancel, which is why a consumer of consumers is covariant again. Two things
 * cut across it: method-declared parameters are compared bivariantly, so a
 * method handler answers "both directions" where a property handler answers
 * "one", and `any` sits on both sides of every comparison. Replace each `TODO`
 * with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The hierarchy the direction is measured against ──────────────────

// 1. Build the base: a readonly discriminant covering every member plus the
//    field they share.
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

// 2. Build the narrow member with the capability that makes accepting the wrong
//    input actually unsafe.
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

// 3. Build the sibling, which is the value a Dog-only handler must never see.
export type Cat = TODO; // TODO(koan)

type _03a = Expect<Equal<Cat["kind"], "cat">>;
type _03b = Expect<Equal<GivenExtends<Dog, Cat>, false>>;
type _03c = Expect<
  Equal<
    { siblingIntoBase: GivenExtends<Cat, Animal>; baseIntoSibling: GivenExtends<Animal, Cat> },
    { siblingIntoBase: true; baseIntoSibling: false }
  >
>;

// ─── The input positions ──────────────────────────────────────────────

// 4. Build the pure consumer: one parameter, nothing handed back. This is the
//    position the reversed rule is derived from.
export type Consumer<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    { accepts: Parameters<Consumer<Dog>>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: Dog; broadIntoNarrow: false }
  >
>;
type _04b = Expect<Equal<ReturnType<Consumer<Dog>>, void>>;
type _04c = Expect<
  Equal<
    {
      broadHandlerIntoNarrow: GivenExtends<Consumer<Animal>, Consumer<Dog>>;
      narrowHandlerIntoBroad: GivenExtends<Consumer<Dog>, Consumer<Animal>>;
    },
    { broadHandlerIntoNarrow: true; narrowHandlerIntoBroad: false }
  >
>;
type _04d = Expect<Equal<GivenExtends<Consumer<Dog>, Consumer<Animal>>, false>>;
type _04e = Expect<Equal<Parameters<Consumer<Dog>>["length"], 1>>;

// 5. Build the predicate. Returning something does not stop the parameter from
//    being an input position.
export type Predicate<Value> = TODO; // TODO(koan)

type _05a = Expect<Equal<ReturnType<Predicate<Dog>>, boolean>>;
type _05b = Expect<
  Equal<
    {
      broadIntoNarrowPredicate: GivenExtends<Predicate<Animal>, Predicate<Dog>>;
      narrowIntoBroadPredicate: GivenExtends<Predicate<Dog>, Predicate<Animal>>;
    },
    { broadIntoNarrowPredicate: true; narrowIntoBroadPredicate: false }
  >
>;
type _05c = Expect<Equal<GivenExtends<Predicate<Dog>, Predicate<Animal>>, false>>;
type _05d = Expect<
  Equal<
    { accepts: Parameters<Predicate<Dog>>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: Dog; broadIntoNarrow: false }
  >
>;

// 6. Build the comparator, which puts the argument in two input positions at
//    once. Two negative positions in parallel do not cancel — only nesting does.
export type Comparator<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<ReturnType<Comparator<Dog>>, number>>;
type _06b = Expect<
  Equal<
    { accepts: Parameters<Comparator<Dog>>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: [left: Dog, right: Dog]; broadIntoNarrow: false }
  >
>;
type _06c = Expect<
  Equal<
    {
      broadIntoNarrowComparator: GivenExtends<Comparator<Animal>, Comparator<Dog>>;
      narrowIntoBroadComparator: GivenExtends<Comparator<Dog>, Comparator<Animal>>;
    },
    { broadIntoNarrowComparator: true; narrowIntoBroadComparator: false }
  >
>;
type _06d = Expect<Equal<GivenExtends<Comparator<Dog>, Comparator<Animal>>, false>>;

// 7. Build the handler whose callback is a *property*. Under strict function
//    types, a function-typed property gets the full directional check.
export type Handler<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    { accepts: Parameters<Handler<Dog>["handle"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: [value: Dog]; broadIntoNarrow: false }
  >
>;
type _07b = Expect<
  Equal<
    {
      broadIntoNarrowHandler: GivenExtends<Handler<Animal>, Handler<Dog>>;
      narrowIntoBroadHandler: GivenExtends<Handler<Dog>, Handler<Animal>>;
    },
    { broadIntoNarrowHandler: true; narrowIntoBroadHandler: false }
  >
>;
type _07c = Expect<Equal<GivenExtends<Handler<Dog>, Handler<Animal>>, false>>;
type _07d = Expect<Equal<GivenExtends<{ handle: Consumer<Cat> }, Handler<Animal>>, false>>;

// 8. Build the same handler with the callback declared as a *method*. The
//    parameter is now compared bivariantly, and the unsafe direction is
//    accepted along with the safe one.
export type MethodHandler<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    {
      methodNarrowIntoBroad: GivenExtends<MethodHandler<Dog>, MethodHandler<Animal>>;
      propertyNarrowIntoBroad: GivenExtends<Handler<Dog>, Handler<Animal>>;
    },
    { methodNarrowIntoBroad: true; propertyNarrowIntoBroad: false }
  >
>;
type _08b = Expect<
  Equal<
    {
      methodBroadIntoNarrow: GivenExtends<MethodHandler<Animal>, MethodHandler<Dog>>;
      bareConsumerNarrowIntoBroad: GivenExtends<Consumer<Dog>, Consumer<Animal>>;
    },
    { methodBroadIntoNarrow: true; bareConsumerNarrowIntoBroad: false }
  >
>;
type _08c = Expect<
  Equal<
    {
      siblingMethodAccepted: GivenExtends<{ handle(value: Cat): void }, MethodHandler<Animal>>;
      siblingPropertyRefused: GivenExtends<{ handle: Consumer<Cat> }, Handler<Animal>>;
    },
    { siblingMethodAccepted: true; siblingPropertyRefused: false }
  >
>;
type _08d = Expect<
  Equal<
    {
      propertyRefusesUnsafe: GivenExtends<Handler<Dog>, Handler<Animal>>;
      methodAcceptsUnsafe: GivenExtends<MethodHandler<Dog>, MethodHandler<Animal>>;
    },
    { propertyRefusesUnsafe: false; methodAcceptsUnsafe: true }
  >
>;

// ─── Measuring and predicting the direction ───────────────────────────

// 9. Build the classifier that names a direction from the two assignability
//    answers, so every claim below can be checked rather than asserted.
export type DirectionOf<AtNarrow, AtBroad> = TODO; // TODO(koan)

type _09a = Expect<Equal<DirectionOf<Consumer<Dog>, Consumer<Animal>>, "contravariant">>;
type _09b = Expect<Equal<DirectionOf<Predicate<Dog>, Predicate<Animal>>, "contravariant">>;
type _09c = Expect<Equal<DirectionOf<Handler<Dog>, Handler<Animal>>, "contravariant">>;
type _09d = Expect<Equal<DirectionOf<MethodHandler<Dog>, MethodHandler<Animal>>, "bivariant">>;
type _09e = Expect<Equal<DirectionOf<Dog, Cat>, "invariant">>;

// 10. Build the flip. One negative position reverses whatever direction the
//     position inside it had.
export type FlipDirection<Direction> = TODO; // TODO(koan)

type _10a = Expect<Equal<FlipDirection<"covariant">, "contravariant">>;
type _10b = Expect<Equal<FlipDirection<"contravariant">, "covariant">>;
type _10c = Expect<Equal<FlipDirection<FlipDirection<"covariant">>, "covariant">>;

// 11. Build the sign calculator over a nesting path, where each step says
//     whether the argument sits in an input or an output position at that
//     depth. An empty path is the starting direction.
export type SignOf<Path extends readonly ("in" | "out")[]> = TODO; // TODO(koan)

type _11a = Expect<Equal<SignOf<[]>, "covariant">>;
type _11b = Expect<Equal<SignOf<["in"]>, "contravariant">>;
type _11c = Expect<Equal<SignOf<["in", "in"]>, "covariant">>;
type _11d = Expect<Equal<SignOf<["in", "out"]>, "contravariant">>;
type _11e = Expect<Equal<SignOf<["in", "in", "in"]>, "contravariant">>;

// 12. Report the nesting, checking the calculator against what the checker
//     actually does. A consumer of producers keeps one flip; a consumer of
//     consumers cancels back to covariant; three levels flip again.
export type NestingProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<NestingProfile["consumerOfProducer"], "contravariant">>;
type _12b = Expect<Equal<NestingProfile["consumerOfConsumer"], "covariant">>;
type _12c = Expect<Equal<NestingProfile["producerOfConsumer"], "contravariant">>;
type _12d = Expect<Equal<NestingProfile["threeDeep"], "contravariant">>;
type _12e = Expect<Equal<NestingProfile["predicted"], "covariant">>;

type Producer<Value> = () => Value;

// 13. Report the parameter shapes. Arity and optionality ride along with the
//     directional check: a target may always be given a stand-in that accepts
//     more, never one that demands more.
export type ParameterShapeProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ParameterShapeProfile["optionalBroadIntoRequiredNarrow"], true>>;
type _13b = Expect<Equal<ParameterShapeProfile["requiredBroadIntoOptionalNarrow"], false>>;
type _13c = Expect<Equal<ParameterShapeProfile["restBroadIntoRestNarrow"], true>>;
type _13d = Expect<Equal<ParameterShapeProfile["restNarrowIntoRestBroad"], false>>;
type _13e = Expect<Equal<ParameterShapeProfile["fewerParametersAccepted"], true>>;

// 14. Report the endpoints, which are the mirror image of the covariant ones.
//     The top type is the most useful input and the bottom type the least, and
//     `any` sits on both sides at once.
export type EndpointProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<EndpointProfile["topInputIntoAnything"], true>>;
type _14b = Expect<Equal<EndpointProfile["anythingIntoTopInput"], false>>;
type _14c = Expect<Equal<EndpointProfile["bottomInputIntoAnything"], false>>;
type _14d = Expect<Equal<EndpointProfile["anythingIntoBottomInput"], true>>;
type _14e = Expect<Equal<EndpointProfile["anyBothWays"], "bivariant">>;

// 15. Report unions. A union in the parameter is a wider input, so it moves the
//     same way the base does — but a union of consumers is not a consumer of a
//     union, because no single member accepts everything.
export type UnionProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<UnionProfile["broadIntoUnionInput"], true>>;
type _15b = Expect<Equal<UnionProfile["unionInputIntoMember"], true>>;
type _15c = Expect<Equal<UnionProfile["memberIntoUnionInput"], false>>;
type _15d = Expect<Equal<UnionProfile["unionOfConsumersIntoBroad"], false>>;
type _15e = Expect<
  Equal<
    { reflected: UnionProfile["reflectedParameter"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { reflected: Dog | Cat; broadIntoNarrow: false }
  >
>;

// ─── Travelling against the direction on purpose ──────────────────────

// 16. Build the contramap signatures. Widening an input is not something a
//     constraint can do — the only way is to supply a projection that turns the
//     wider value into the one the consumer already accepts.
export type ContramapApi = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    { produced: ReturnType<ContramapApi["contramap"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { produced: Consumer<unknown>; broadIntoNarrow: false }
  >
>;
type _16b = Expect<Equal<ReturnType<ContramapApi["filterWith"]>, unknown[]>>;
type _16c = Expect<
  Equal<
    { demanded: Parameters<ContramapApi["filterWith"]>[1]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { demanded: Predicate<unknown>; broadIntoNarrow: false }
  >
>;
type _16d = Expect<Equal<Parameters<ContramapApi["contramap"]>["length"], 2>>;

// 17. Build the type-level contramap: from a consumer and a wider input, the
//     signature of the projection that would bridge them and the consumer it
//     yields. Watch what the pattern matches: a zero-argument producer still
//     fits `(value: infer Input) => void`, because arity is lenient in that
//     direction and a `void` return accepts any result — so the input infers as
//     `unknown` rather than failing.
export type Contramapped<Consuming, Wider> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { produced: ReturnType<Contramapped<Consumer<Dog>, Animal>>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { produced: Consumer<Animal>; broadIntoNarrow: false }
  >
>;
type _17b = Expect<
  Equal<
    { bridge: Parameters<Contramapped<Consumer<Dog>, Animal>>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { bridge: (value: Animal) => Dog; broadIntoNarrow: false }
  >
>;
type _17c = Expect<Equal<Contramapped<string, Animal>, never>>;
type _17d = Expect<
  Equal<
    {
      producerStillMatches: Parameters<Contramapped<Producer<Dog>, Animal>>[0];
      broadIntoNarrow: GivenExtends<Animal, Dog>;
    },
    { producerStillMatches: (value: Animal) => unknown; broadIntoNarrow: false }
  >
>;
type _17e = Expect<Equal<Contramapped<{ handled: Dog }, Animal>, never>>;

// 18. Build the record of handlers over an event map. Every field is an input
//     position, so the whole record inherits the reversed direction at once.
export type Handlers<Events> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    { field: Handlers<{ click: Dog }>["click"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { field: Consumer<Dog>; broadIntoNarrow: false }
  >
>;
type _18b = Expect<Equal<keyof Handlers<{ click: Dog; hover: Cat }>, "click" | "hover">>;
type _18c = Expect<
  Equal<
    {
      broadRecordIntoNarrow: GivenExtends<Handlers<{ click: Animal }>, Handlers<{ click: Dog }>>;
      narrowRecordIntoBroad: GivenExtends<Handlers<{ click: Dog }>, Handlers<{ click: Animal }>>;
    },
    { broadRecordIntoNarrow: true; narrowRecordIntoBroad: false }
  >
>;
type _18d = Expect<Equal<GivenExtends<Handlers<{ click: Dog }>, Handlers<{ click: Animal }>>, false>>;
type _18e = Expect<Equal<DirectionOf<Handlers<{ click: Dog }>, Handlers<{ click: Animal }>>, "contravariant">>;
