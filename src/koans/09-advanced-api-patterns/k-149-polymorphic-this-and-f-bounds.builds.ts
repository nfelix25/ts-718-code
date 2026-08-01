import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-149: polymorphic this and F-bounds — constructions
 * =============================================================================
 *
 * There are two ways to say "the same type as me". A method returning `this`
 * says it structurally, and the answer is decided at the receiver: an inherited
 * method resolves to whatever the most-derived class was, so a chain never
 * degrades to the class that happened to declare the step. An F-bound —
 * `Self extends Comparable<Self>` — says it nominally-ish, by naming a parameter
 * and constraining it to a shape that mentions itself, which is what lets a
 * *generic* function relate several values to one identity.
 *
 * The classes are given here, since `this` types only exist inside class and
 * interface bodies. What you build is the F-bound vocabulary and everything that
 * inspects both mechanisms. Two things are worth watching: an F-bound is
 * structural, so a type that never heard of the interface can satisfy it, and it
 * does not force the parameter to be the implementing type — a class may declare
 * a *different* self and the constraint is still met. Replace each `TODO` with a
 * type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// The fluent hierarchy, exactly as the packet declares it.
declare class Fluent {
  readonly labels: string[];
  label(value: string): this;
  tap(effect: (value: this) => void): this;
}
declare class Command extends Fluent {
  readonly flags: string[];
  flag(value: string): this;
}
declare class DeployCommand extends Command {
  environment: string;
  to(environment: string): this;
}
declare class Child extends Command {
  child(): this;
}
declare class Grandchild extends Child {
  grandchild(): this;
}

// The F-bounded hierarchy, and one class that names someone else as its self.
declare abstract class Entity<Self extends Entity<Self>> {
  abstract copy(): Self;
  prefer(other: Self): Self;
}
declare class Version extends Entity<Version> {
  readonly value: number;
  copy(): Version;
  compare: (other: Version) => number;
}
declare class Priority {
  readonly value: number;
  compare: (other: Priority) => number;
}
declare class WrongEntity extends Entity<Version> {
  copy(): Version;
}

// A structural twin that never heard of the interface, and a near-miss.
type GivenStructuralVersion = { value: number; compare: (other: GivenStructuralVersion) => number };
type GivenWrongComparable = { compare: (other: Version) => number };

// ─── Saying "the same type as me" explicitly ──────────────────────────

// 1. Build the self-referential capability: something that can be compared with
//    another value of the type the parameter names.
export type Comparable<Self> = TODO; // TODO(koan)

type _01a = Expect<Equal<keyof Comparable<Version>, "compare">>;
type _01b = Expect<
  Equal<
    { demanded: Parameters<Comparable<Version>["compare"]>[0]; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { demanded: Version; wrongSelfRefused: false }
  >
>;
type _01c = Expect<Equal<ReturnType<Comparable<Version>["compare"]>, number>>;
type _01d = Expect<
  Equal<
    {
      versionClosesTheLoop: GivenExtends<Version, Comparable<Version>>;
      priorityDoesNotCloseVersions: GivenExtends<Priority, Comparable<Version>>;
    },
    { versionClosesTheLoop: true; priorityDoesNotCloseVersions: false }
  >
>;

// 2. Build the predicate that asks whether a type closes the loop: can it be
//    compared with itself? The brackets matter — a union has to satisfy the
//    bound as a whole, not member by member.
export type SatisfiesSelf<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<SatisfiesSelf<Version>, true>>;
type _02b = Expect<Equal<SatisfiesSelf<Priority>, true>>;
type _02c = Expect<Equal<SatisfiesSelf<GivenWrongComparable>, false>>;
type _02d = Expect<Equal<SatisfiesSelf<Fluent>, false>>;
type _02e = Expect<Equal<SatisfiesSelf<Version | Priority>, false>>;

// 3. Build the gate that keeps a type only when it closes the loop — the
//    type-level form of the constraint a generic function would write.
export type SelfBound<Value> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    { admitted: SelfBound<Version>; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { admitted: Version; wrongSelfRefused: false }
  >
>;
type _03b = Expect<Equal<SelfBound<GivenWrongComparable>, never>>;
type _03c = Expect<Equal<SelfBound<Version | Priority>, never>>;
type _03d = Expect<Equal<SelfBound<Fluent>, never>>;

// 4. Build the reader that recovers whichever self an F-bounded base was
//    instantiated with — which is not always the class that extends it.
export type EntitySelf<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    { recovered: EntitySelf<Version>; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { recovered: Version; wrongSelfRefused: false }
  >
>;
type _04b = Expect<
  Equal<
    { recovered: EntitySelf<WrongEntity>; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { recovered: Version; wrongSelfRefused: false }
  >
>;
type _04c = Expect<Equal<EntitySelf<never>, never>>;
type _04d = Expect<Equal<EntitySelf<Priority>, never>>;

// ─── Inspecting the other mechanism ───────────────────────────────────

// 5. Build the test that asks whether one member hands the receiver back. The
//    rest-parameter pattern matches any arity, so it works on every member.
export type ReturnsSelf<Owner, Key extends keyof Owner> = TODO; // TODO(koan)

type _05a = Expect<Equal<ReturnsSelf<DeployCommand, "label">, true>>;
type _05b = Expect<Equal<ReturnsSelf<DeployCommand, "to">, true>>;
type _05c = Expect<Equal<ReturnsSelf<DeployCommand, "environment">, false>>;
type _05d = Expect<Equal<ReturnsSelf<Version, "copy">, true>>;
type _05e = Expect<Equal<ReturnsSelf<Version, "compare">, false>>;

// 6. Build the operator that collects every chainable member of a receiver — the
//    set a fluent chain can move through without ever leaving the type.
export type SelfReturningKeys<Owner> = TODO; // TODO(koan)

type _06a = Expect<Equal<SelfReturningKeys<Fluent>, "label" | "tap">>;
type _06b = Expect<Equal<SelfReturningKeys<Command>, "label" | "tap" | "flag">>;
type _06c = Expect<Equal<SelfReturningKeys<DeployCommand>, "label" | "tap" | "flag" | "to">>;
type _06d = Expect<Equal<SelfReturningKeys<Grandchild>, "label" | "tap" | "flag" | "child" | "grandchild">>;
type _06e = Expect<Equal<SelfReturningKeys<Version>, "copy" | "prefer">>;

// ─── What each mechanism actually promises ────────────────────────────

// 7. Report polymorphic `this`. The declaring class is irrelevant; every answer
//    is the receiver the member was reached through.
export type PolymorphicThisProfile = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    { returned: PolymorphicThisProfile["atTheDeclaringClass"]; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { returned: Fluent; wrongSelfRefused: false }
  >
>;
type _07b = Expect<
  Equal<
    { returned: PolymorphicThisProfile["atTheSubclass"]; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { returned: Command; wrongSelfRefused: false }
  >
>;
type _07c = Expect<
  Equal<
    { returned: PolymorphicThisProfile["atTheGrandchild"]; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { returned: DeployCommand; wrongSelfRefused: false }
  >
>;
type _07d = Expect<Equal<Equal<PolymorphicThisProfile["ownMethod"], DeployCommand>, true>>;
type _07e = Expect<Equal<Equal<PolymorphicThisProfile["inheritedMethodKeepsTheCapability"], DeployCommand>, true>>;

// 8. Report the depth of the specialisation. Each level down re-answers every
//    inherited member, and the answer keeps every capability added along the
//    way.
export type InheritanceProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<InheritanceProfile["oneLevel"], true>>;
type _08b = Expect<Equal<InheritanceProfile["twoLevels"], true>>;
type _08c = Expect<Equal<InheritanceProfile["inheritedOwnMethod"], true>>;
type _08d = Expect<Equal<InheritanceProfile["stillReachesTheParent"], true>>;
type _08e = Expect<Equal<InheritanceProfile["parentDoesNotReachBack"], false>>;

// 9. Report what reflection sees around a `this` return. There is no explicit
//    `this` parameter to find, the argument list is untouched, and a union
//    receiver answers with a union of receivers.
export type ReflectionProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ReflectionProfile["thisParameter"], unknown>>;
type _09b = Expect<Equal<ReflectionProfile["arguments"], [value: string]>>;
type _09c = Expect<
  Equal<
    { returned: ReflectionProfile["unionReceiver"]; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { returned: Command | DeployCommand; wrongSelfRefused: false }
  >
>;
type _09d = Expect<
  Equal<
    { callback: ReflectionProfile["callbackSeesTheReceiver"]; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { callback: (value: DeployCommand) => void; wrongSelfRefused: false }
  >
>;

// 10. Report the F-bound. It is an ordinary structural constraint, so a type
//     that never mentioned the interface satisfies it, and one that names
//     somebody else's type as its comparison partner does not.
export type FBoundProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<FBoundProfile["implementingClass"], true>>;
type _10b = Expect<Equal<FBoundProfile["unrelatedClass"], true>>;
type _10c = Expect<Equal<FBoundProfile["structuralTwin"], true>>;
type _10d = Expect<Equal<FBoundProfile["namesSomebodyElse"], false>>;
type _10e = Expect<Equal<FBoundProfile["noCompareAtAll"], false>>;

// 11. Report the loophole. Extending an F-bounded base does not force the
//     parameter to be the extending class, so a subclass can claim a self it is
//     not — and still satisfy the base, because the base only ever asked about
//     the self it was told.
export type WrongSelfProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    { declared: WrongSelfProfile["declaredSelf"]; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { declared: Version; wrongSelfRefused: false }
  >
>;
type _11b = Expect<Equal<WrongSelfProfile["itIsNotItself"], false>>;
type _11c = Expect<Equal<WrongSelfProfile["satisfiesTheSelfItNamed"], true>>;
type _11d = Expect<Equal<WrongSelfProfile["alsoSatisfiesItsOwn"], true>>;
type _11e = Expect<Equal<WrongSelfProfile["copyHandsBackTheOtherType"], true>>;

// 12. Report the union problem, which is the reason the bracket in construction
//     2 is not optional. A union of two self-comparable types is not itself
//     self-comparable: neither member accepts the other.
export type UnionSelfProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<UnionSelfProfile["eachMemberAlone"], true>>;
type _12b = Expect<Equal<UnionSelfProfile["theUnion"], false>>;
type _12c = Expect<Equal<UnionSelfProfile["gateRejectsIt"], never>>;
type _12d = Expect<Equal<UnionSelfProfile["memberIntoUnionComparable"], false>>;

// 13. Report the special types. `never` satisfies every bracketed constraint
//     vacuously, `any` satisfies everything by construction, and `unknown`
//     satisfies nothing that demands a member. The self extractor is the odd one
//     out: pointed at `any` it takes both branches and comes back with something
//     that is no longer `any`.
export type SpecialTypeProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<SpecialTypeProfile["bottom"], true>>;
type _13b = Expect<Equal<SpecialTypeProfile["top"], false>>;
type _13c = Expect<Equal<SpecialTypeProfile["anything"], true>>;
type _13d = Expect<Equal<SpecialTypeProfile["selfOfAnythingIsNotAny"], false>>;
type _13e = Expect<Equal<SpecialTypeProfile["selfOfBottom"], never>>;

// ─── Carrying a self through a generic API ────────────────────────────

// 14. Build the generic signatures. The self parameter is what ties two
//     arguments and the result to one identity — something a `this` return
//     cannot do, because it only ever speaks about the receiver.
export type SelfApi = TODO; // TODO(koan)

type _14a = Expect<Equal<Parameters<SelfApi["maxSelf"]>["length"], 2>>;
type _14b = Expect<Equal<Parameters<SelfApi["cloneSelf"]>["length"], 1>>;
type _14c = Expect<
  Equal<
    { pinned: ReturnType<typeof maxVersions>; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { pinned: Version; wrongSelfRefused: false }
  >
>;
type _14d = Expect<
  Equal<
    { pinned: Parameters<typeof maxVersions>; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { pinned: [left: Version, right: Version]; wrongSelfRefused: false }
  >
>;

declare const maxVersions: (left: Version, right: Version) => Version;

// 15. Report what the F-bounded members promise once the self is pinned. Both
//     the argument and the result are the chosen self, which is exactly the
//     relation a `this` return could not have expressed.
export type PinnedSelfProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<Equal<PinnedSelfProfile["copyResult"], Version>, true>>;
type _15b = Expect<Equal<Equal<PinnedSelfProfile["preferArgument"], Version>, true>>;
type _15c = Expect<Equal<Equal<PinnedSelfProfile["preferResult"], Version>, true>>;
type _15d = Expect<Equal<Equal<PinnedSelfProfile["compareArgument"], Version>, true>>;
type _15e = Expect<Equal<PinnedSelfProfile["compareResult"], number>>;

// 16. Build the fold that walks a tuple of self-comparable values and reports
//     the one identity they all share, or nothing when they disagree.
export type CommonSelf<Values extends readonly unknown[]> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    { agreed: CommonSelf<[Version, Version]>; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { agreed: Version; wrongSelfRefused: false }
  >
>;
type _16b = Expect<Equal<CommonSelf<[Version, Priority]>, never>>;
type _16c = Expect<Equal<CommonSelf<[]>, never>>;
type _16d = Expect<Equal<CommonSelf<[GivenWrongComparable]>, never>>;
type _16e = Expect<
  Equal<
    { agreed: CommonSelf<[Version, Version, Version]>; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { agreed: Version; wrongSelfRefused: false }
  >
>;

// 17. Report the chainable surface of each receiver — what a fluent chain can
//     actually reach, and how it grows down the hierarchy.
export type ChainProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<ChainProfile["atTheBase"], "label" | "tap">>;
type _17b = Expect<Equal<ChainProfile["atTheSubclass"], "label" | "tap" | "flag">>;
type _17c = Expect<Equal<ChainProfile["atTheLeaf"], "label" | "tap" | "flag" | "to">>;
type _17d = Expect<
  Equal<
    {
      baseKeysSurvive: ChainProfile["growsMonotonically"];
      leafKeysAreNotAllInTheBase: GivenExtends<SelfReturningKeys<DeployCommand>, SelfReturningKeys<Fluent>>;
    },
    { baseKeysSurvive: true; leafKeysAreNotAllInTheBase: false }
  >
>;

// 18. Report both mechanisms side by side for one type: what its `this` returns
//     resolve to, whether it closes the F-bound, and which self it named.
export type SelfReport<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<SelfReport<Version>["closesTheBound"], true>>;
type _18b = Expect<
  Equal<
    { named: SelfReport<Version>["namedSelf"]; wrongSelfRefused: SatisfiesSelf<GivenWrongComparable> },
    { named: Version; wrongSelfRefused: false }
  >
>;
type _18c = Expect<Equal<SelfReport<Version>["chainable"], "copy" | "prefer">>;
type _18d = Expect<Equal<SelfReport<DeployCommand>["closesTheBound"], false>>;
type _18e = Expect<Equal<SelfReport<DeployCommand>["chainable"], "label" | "tap" | "flag" | "to">>;
