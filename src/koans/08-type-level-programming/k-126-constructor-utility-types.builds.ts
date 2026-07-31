import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-126: constructor utility types — constructions
 * =============================================================================
 *
 * Constructor reflection is function reflection pointed at a different signature
 * kind, and the choice of pattern is the whole design. Matching `abstract new`
 * lets these utilities read an abstract class — which is the point, since
 * reflecting on a base class is useful precisely when you cannot instantiate it —
 * while a runtime factory must still demand a concrete `new`. Everything else
 * rhymes with the call-signature utilities: the initialization tuple keeps its
 * labels and optional positions, a generic class loses its type arguments because
 * no construction has happened, and overloads expose only the last signature.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

class GivenUser {
  constructor(public id: string, public active = true) {}
}

abstract class GivenEntity {
  constructor(public readonly id: number) {}
  abstract label(): string;
}

class GivenBox<Value> {
  constructor(public value: Value) {}
}

class GivenPair<Left, Right> {
  constructor(public left: Left, public right: Right) {}
}

interface GivenForwardFactory {
  new (x: string): { text: string };
  new (x: number): { count: number };
}

interface GivenReverseFactory {
  new (x: number): { count: number };
  new (x: string): { text: string };
}

interface GivenOverloadedFactory {
  new (value: string): { kind: "text"; value: string };
  new (value: number): { kind: "count"; value: number };
  new (value: string | number): { kind: "text" | "count"; value: string | number };
}

type GivenCallableAndConstructable = (new (id: number) => { id: number }) &
  ((text: string) => boolean);

// Declared with the packet's own construction signature so a construction can
// be graded against a real call site.
declare function givenConstruct<Constructor extends new (...args: any[]) => any>(
  Constructor: Constructor,
  ...args: RebuiltConstructorParameters<Constructor>
): RebuiltInstanceType<Constructor>;

// ─── Reflecting on construction ───────────────────────────────────────

// 1. Build the initialization-tuple capture. Match `abstract new` so the utility
//    can read a class that cannot itself be instantiated.
//    `RebuiltConstructorParameters<new (id: string) => object>` is `[id: string]`.
export type RebuiltConstructorParameters<
  Constructor extends abstract new (...args: any[]) => any,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    RebuiltConstructorParameters<typeof GivenUser>,
    [id: string, active?: boolean | undefined]
  >
>;
type _01b = Expect<Equal<RebuiltConstructorParameters<new () => Date>, []>>;
type _01c = Expect<
  Equal<RebuiltConstructorParameters<new (...values: number[]) => object>, number[]>
>;
type _01d = Expect<Equal<RebuiltConstructorParameters<typeof GivenEntity>, [id: number]>>;
type _01e = Expect<Equal<RebuiltConstructorParameters<never>, never>>;

// 2. Build the constructed-instance capture.
export type RebuiltInstanceType<
  Constructor extends abstract new (...args: any[]) => any,
> = TODO; // TODO(koan)

type _02a = Expect<Equal<RebuiltInstanceType<typeof GivenUser>, GivenUser>>;
type _02b = Expect<Equal<RebuiltInstanceType<new () => Date>, Date>>;
type _02c = Expect<Equal<RebuiltInstanceType<typeof GivenEntity>, GivenEntity>>;
type _02d = Expect<
  Equal<RebuiltInstanceType<new (...args: [id: string]) => { id: string }>, { id: string }>
>;
type _02e = Expect<Equal<RebuiltInstanceType<never>, never>>;

// ─── Why the pattern says `abstract` ──────────────────────────────────

// 3. Report the assignability that makes the choice of pattern matter: an
//    abstract class is not a concrete constructor, but every concrete
//    constructor is an abstract one.
export type AbstractnessProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<AbstractnessProfile["abstractIsConcrete"], false>>;
type _03b = Expect<Equal<AbstractnessProfile["abstractIsAbstract"], true>>;
type _03c = Expect<Equal<AbstractnessProfile["concreteIsAbstract"], true>>;
type _03d = Expect<Equal<AbstractnessProfile["abstractSignatureIsConcrete"], false>>;
type _03e = Expect<Equal<AbstractnessProfile["concreteIsConcrete"], true>>;

// 4. Report an abstract class being fully reflectable even though it cannot be
//    constructed, which is the reason the pattern is written the way it is.
export type AbstractReflectionProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<AbstractReflectionProfile["parameters"], [id: number]>>;
type _04b = Expect<Equal<AbstractReflectionProfile["instance"], GivenEntity>>;
type _04c = Expect<
  Equal<AbstractReflectionProfile["abstractSignatureParameters"], [id: string]>
>;
type _04d = Expect<
  Equal<AbstractReflectionProfile["abstractSignatureInstance"], { id: string }>
>;
type _04e = Expect<Equal<AbstractReflectionProfile["instanceMember"], number>>;

// ─── The initialization tuple ─────────────────────────────────────────

// 5. Report the tuple keeping the same fidelity a call signature's does,
//    including a parameter made optional by its own default value.
export type InitializationTupleProfile = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    InitializationTupleProfile["withDefault"],
    [id: string, active?: boolean | undefined]
  >
>;
type _05b = Expect<
  Equal<
    InitializationTupleProfile["declaredOptional"],
    [name: string, age?: number | undefined]
  >
>;
type _05c = Expect<Equal<InitializationTupleProfile["restOnly"], number[]>>;
type _05d = Expect<
  Equal<InitializationTupleProfile["writtenTuple"], [id: string, enabled?: boolean]>
>;
type _05e = Expect<Equal<InitializationTupleProfile["arity"], 1 | 2>>;

// ─── What construction would have decided ─────────────────────────────

// 6. Report a generic class losing its type arguments, since reflection happens
//    without ever constructing anything.
export type GenericErasureProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<GenericErasureProfile["boxParameters"], [value: unknown]>>;
type _06b = Expect<Equal<GenericErasureProfile["boxInstance"], GivenBox<unknown>>>;
type _06c = Expect<
  Equal<GenericErasureProfile["pairParameters"], [left: unknown, right: unknown]>
>;
type _06d = Expect<
  Equal<GenericErasureProfile["pairInstance"], GivenPair<unknown, unknown>>
>;
type _06e = Expect<Equal<GenericErasureProfile["boxValue"], unknown>>;

// 7. Report a generic construct signature behaving the same way, with a
//    constraint standing in where one is written.
export type GenericSignatureProfile = TODO; // TODO(koan)

type _07a = Expect<
  Equal<GenericSignatureProfile["unconstrainedParameters"], [value: unknown]>
>;
type _07b = Expect<
  Equal<GenericSignatureProfile["unconstrainedInstance"], { value: unknown }>
>;
type _07c = Expect<Equal<GenericSignatureProfile["constrainedParameters"], [value: string]>>;
type _07d = Expect<
  Equal<GenericSignatureProfile["constrainedInstance"], { value: string }>
>;
type _07e = Expect<Equal<GenericSignatureProfile["nestedInstance"], unknown[]>>;

// ─── Overloads and duality ────────────────────────────────────────────

// 8. Report the final construct signature being the one inference reads, for both
//    captures at once.
export type OverloadOrderProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<OverloadOrderProfile["forwardParameters"], [x: number]>>;
type _08b = Expect<Equal<OverloadOrderProfile["forwardInstance"], { count: number }>>;
type _08c = Expect<Equal<OverloadOrderProfile["reverseParameters"], [x: string]>>;
type _08d = Expect<Equal<OverloadOrderProfile["reverseInstance"], { text: string }>>;
type _08e = Expect<
  Equal<
    OverloadOrderProfile["threeOverloads"],
    { kind: "text" | "count"; value: string | number }
  >
>;

// 9. Report an intersection of construct signatures ordering like overloads.
export type IntersectionOrderProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<IntersectionOrderProfile["stringFirstParameters"], [x: number]>>;
type _09b = Expect<Equal<IntersectionOrderProfile["stringFirstInstance"], { b: 2 }>>;
type _09c = Expect<Equal<IntersectionOrderProfile["numberFirstInstance"], { a: 1 }>>;
type _09d = Expect<
  Equal<IntersectionOrderProfile["overloadedFactoryParameters"], [value: string | number]>
>;
type _09e = Expect<Equal<IntersectionOrderProfile["notAUnion"], false>>;

// 10. Report a value carrying both signature kinds, where the two families of
//     utilities read past each other completely.
export type DualSignatureProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<DualSignatureProfile["constructorParameters"], [id: number]>>;
type _10b = Expect<Equal<DualSignatureProfile["instance"], { id: number }>>;
type _10c = Expect<Equal<DualSignatureProfile["callParameters"], [text: string]>>;
type _10d = Expect<Equal<DualSignatureProfile["callReturn"], boolean>>;
type _10e = Expect<Equal<DualSignatureProfile["sameThing"], false>>;

// 11. Report the top and bottom inputs.
export type ExtremeInputProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ExtremeInputProfile["anyParameters"], unknown[]>>;
type _11b = Expect<Equal<ExtremeInputProfile["anyInstance"], true>>;
type _11c = Expect<Equal<ExtremeInputProfile["neverParameters"], never>>;
type _11d = Expect<Equal<ExtremeInputProfile["neverInstance"], never>>;
type _11e = Expect<Equal<ExtremeInputProfile["anyInstanceMember"], unknown>>;

// ─── Surfaces built on the reflection ─────────────────────────────────

// 12. Build the predicate that separates the classes a factory could actually
//     instantiate from the ones it may only reflect on.
export type IsConcreteConstructorOf<Constructor> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    {
      concrete: IsConcreteConstructorOf<typeof GivenUser>;
      abstract: IsConcreteConstructorOf<typeof GivenEntity>;
    },
    { concrete: true; abstract: false }
  >
>;
type _12b = Expect<
  Equal<
    {
      concreteSignature: IsConcreteConstructorOf<new () => object>;
      abstractSignature: IsConcreteConstructorOf<abstract new () => object>;
    },
    { concreteSignature: true; abstractSignature: false }
  >
>;
type _12c = Expect<
  Equal<
    {
      plainFunction: IsConcreteConstructorOf<() => void>;
      generic: IsConcreteConstructorOf<typeof GivenBox>;
    },
    { plainFunction: false; generic: true }
  >
>;
type _12d = Expect<
  Equal<
    {
      dual: IsConcreteConstructorOf<GivenCallableAndConstructable>;
      object: IsConcreteConstructorOf<{ id: 1 }>;
    },
    { dual: true; object: false }
  >
>;
type _12e = Expect<
  Equal<
    {
      factory: IsConcreteConstructorOf<GivenForwardFactory>;
      bottom: IsConcreteConstructorOf<never>;
    },
    { factory: true; bottom: never }
  >
>;

// 13. Build the factory shape that produces a given instance from that instance's
//     own initialization tuple.
export type FactoryShapeOf<
  Constructor extends abstract new (...args: any[]) => any,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<FactoryShapeOf<new (id: string) => { id: string }>, (id: string) => { id: string }>
>;
type _13b = Expect<Equal<FactoryShapeOf<new () => Date>, () => Date>>;
type _13c = Expect<
  Equal<
    FactoryShapeOf<typeof GivenUser>,
    (id: string, active?: boolean | undefined) => GivenUser
  >
>;
type _13d = Expect<
  Equal<FactoryShapeOf<typeof GivenEntity>, (id: number) => GivenEntity>
>;
type _13e = Expect<
  Equal<Parameters<FactoryShapeOf<new (...values: number[]) => object>>, number[]>
>;

// 14. Build the construction signature the packet exports, which demands a
//     concrete `new` even though the reflection utilities accept more.
export type ConstructRuntimeApi = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    ConstructRuntimeApi["construct"],
    <Constructor extends new (...args: any[]) => any>(
      Constructor: Constructor,
      ...args: RebuiltConstructorParameters<Constructor>
    ) => RebuiltInstanceType<Constructor>
  >
>;
type _14b = Expect<Equal<ReturnType<typeof givenConstruct<typeof GivenUser>>, GivenUser>>;
type _14c = Expect<
  Equal<
    Parameters<typeof givenConstruct<typeof GivenUser>>,
    [Constructor: typeof GivenUser, id: string, active?: boolean | undefined]
  >
>;
type _14d = Expect<Equal<ReturnType<typeof givenConstruct<new () => Date>>, Date>>;
type _14e = Expect<
  Equal<
    {
      constructable: IsConcreteConstructorOf<typeof GivenUser>;
      reflectableOnly: IsConcreteConstructorOf<typeof GivenEntity>;
    },
    { constructable: true; reflectableOnly: false }
  >
>;
