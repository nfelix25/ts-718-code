import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-024: instanceof narrowing — constructions
 * =============================================================================
 *
 * These constructions turn constructor relations into positive, negative,
 * chained, hierarchical, and generic guard results. They also separate the
 * compiler's structural view of public instances from JavaScript's
 * prototype-sensitive runtime result, including private identity, subclasses,
 * boxed primitives, special source types, and invalid operands. Replace each
 * `TODO` with a type that satisfies the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type GivenConstructor<Instance extends object = object> =
  abstract new (...args: any[]) => Instance;

declare class GivenCircle {
  readonly kind: "circle";
  readonly radius: number;
  constructor(radius: number);
  area(): number;
}

declare class GivenRectangle {
  readonly kind: "rectangle";
  readonly width: number;
  readonly height: number;
  constructor(width: number, height: number);
  area(): number;
}

declare class GivenAnimal {
  readonly name: string;
  constructor(name: string);
  speak(): string;
}

declare class GivenDog extends GivenAnimal {
  bark(): string;
}

declare class GivenCat extends GivenAnimal {
  meow(): string;
}

declare abstract class GivenAbstractRecord {
  abstract readonly id: string;
}

declare class GivenSecretA {
  private readonly secretA: number;
  read(): number;
}

declare class GivenSecretB {
  private readonly secretB: number;
  read(): number;
}

type GivenCircleLookalike = {
  readonly kind: "circle";
  readonly radius: number;
  area(): number;
};

type KnownPositive<Member, Instance extends object> =
  Member extends object
    ? Member extends Instance
      ? Member
      : Instance extends Member
        ? Instance
        : never
    : never;

type KnownNegative<Member, Instance extends object> =
  Member extends object
    ? Member extends Instance ? never : Member
    : Member;

type PropertyFrom<Member, Key extends PropertyKey> =
  Member extends unknown
    ? Key extends keyof Member ? Member[Key] : never
    : never;

type CalledReturn<Member, Key extends PropertyKey> =
  Member extends unknown
    ? Key extends keyof Member
      ? Member[Key] extends (...args: any[]) => infer Result ? Result : never
      : never
    : never;

type InstanceCase = readonly [instance: object, result: unknown];

type DispatchOne<
  Member,
  Cases extends readonly InstanceCase[],
  Fallback,
> = Cases extends readonly [
  infer First extends InstanceCase,
  ...infer Rest extends InstanceCase[],
]
  ? First extends readonly [infer Instance extends object, infer Result]
    ? Member extends object
      ? Member extends Instance
        ? Result
        : DispatchOne<Member, Rest, Fallback>
      : DispatchOne<Member, Rest, Fallback>
    : never
  : Fallback;

// ─── Constructor relations ─────────────────────────────────────────────────

// 1. Build an abstract constructor with the supplied parameter tuple.
export type ConstructorOf<
  Instance extends object,
  Args extends unknown[] = [],
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<ConstructorOf<GivenCircle, [radius: number]>, abstract new (radius: number) => GivenCircle>
>;
type _01b = Expect<
  Equal<
    ConstructorOf<GivenRectangle, [width: number, height: number]>,
    abstract new (width: number, height: number) => GivenRectangle
  >
>;
type _01c = Expect<
  Equal<ConstructorOf<GivenAbstractRecord>, abstract new () => GivenAbstractRecord>
>;
type _01d = Expect<
  Equal<ConstructorOf<GivenAnimal, [name: string]>, abstract new (name: string) => GivenAnimal>
>;

// 2. Decide whether a value can serve as the right side of `instanceof`.
export type ValidInstanceofRight<Right> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<ValidInstanceofRight<DateConstructor>, true>>;
type _02b = Expect<Equal<ValidInstanceofRight<typeof GivenCircle>, true>>;
type _02c = Expect<Equal<ValidInstanceofRight<ConstructorOf<GivenAbstractRecord>>, true>>;
type _02d = Expect<Equal<ValidInstanceofRight<{ readonly prototype: Date }>, false>>;
type _02e = Expect<Equal<ValidInstanceofRight<() => Date>, false>>;

// 3. Recover the instance type established by a constructor.
export type ConstructorInstance<Constructor extends GivenConstructor> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<ConstructorInstance<DateConstructor>, Date>>;
type _03b = Expect<Equal<ConstructorInstance<ErrorConstructor>, Error>>;
type _03c = Expect<Equal<ConstructorInstance<typeof GivenCircle>, GivenCircle>>;
type _03d = Expect<
  Equal<ConstructorInstance<ConstructorOf<GivenAbstractRecord, [string]>>, GivenAbstractRecord>
>;

// 4. Pair a constructor's complete parameter tuple with its instance.
export type ConstructorProfile<Constructor extends GivenConstructor> =
  TODO; // TODO(koan)

type _04a = Expect<
  Equal<ConstructorProfile<typeof GivenCircle>, [[radius: number], GivenCircle]>
>;
type _04b = Expect<
  Equal<
    ConstructorProfile<typeof GivenRectangle>,
    [[width: number, height: number], GivenRectangle]
  >
>;
type _04c = Expect<
  Equal<ConstructorProfile<typeof GivenAnimal>, [[name: string], GivenAnimal]>
>;
type _04d = Expect<
  Equal<
    ConstructorProfile<ConstructorOf<GivenAbstractRecord, [id: string, revision?: number]>>,
    [[id: string, revision?: number], GivenAbstractRecord]
  >
>;

// ─── Positive, negative, and combined branches ─────────────────────────────

// 5. Keep the source values compatible with one constructor instance.
export type PositiveInstanceof<
  Source,
  Instance extends object,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<PositiveInstanceof<Date | Error | string, Date>, Date>
>;
type _05b = Expect<
  Equal<PositiveInstanceof<GivenDog | GivenCat | Date, GivenAnimal>, GivenDog | GivenCat>
>;
type _05c = Expect<
  Equal<PositiveInstanceof<GivenAnimal | Date, GivenDog>, GivenDog>
>;
type _05d = Expect<Equal<PositiveInstanceof<unknown, RegExp>, RegExp>>;
type _05e = Expect<Equal<PositiveInstanceof<any, Error>, Error>>;

// 6. Remove the source values eliminated by one constructor check.
export type NegativeInstanceof<
  Source,
  Instance extends object,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<NegativeInstanceof<Date | Error | string, Date>, Error | string>
>;
type _06b = Expect<
  Equal<NegativeInstanceof<GivenDog | GivenCat | Date, GivenAnimal>, Date>
>;
type _06c = Expect<
  Equal<NegativeInstanceof<GivenAnimal | Date, GivenDog>, GivenAnimal | Date>
>;
type _06d = Expect<Equal<NegativeInstanceof<unknown, Date>, unknown>>;
type _06e = Expect<Equal<NegativeInstanceof<never, Date>, never>>;

// 7. Construct the true and false branches together.
export type InstancePartition<
  Source,
  Instance extends object,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<InstancePartition<Date | Error | string, Date>, [Date, Error | string]>
>;
type _07b = Expect<
  Equal<InstancePartition<string | String, String>, [String, string]>
>;
type _07c = Expect<
  Equal<
    InstancePartition<GivenDog | GivenCat | Date, GivenAnimal>,
    [GivenDog | GivenCat, Date]
  >
>;
type _07d = Expect<Equal<InstancePartition<unknown, Date>, [Date, unknown]>>;
type _07e = Expect<Equal<InstancePartition<never, Date>, [never, never]>>;

// 8. Keep members matching at least one instance type in a constructor OR-chain.
export type AnyInstance<
  Source,
  Instances extends readonly object[],
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    AnyInstance<Date | Error | RegExp | string, [Date, Error]>,
    Date | Error
  >
>;
type _08b = Expect<
  Equal<
    AnyInstance<GivenCircle | GivenRectangle | Date, [GivenCircle, GivenRectangle]>,
    GivenCircle | GivenRectangle
  >
>;
type _08c = Expect<Equal<AnyInstance<Date | string, []>, never>>;
type _08d = Expect<Equal<AnyInstance<unknown, [Date, Error]>, Date | Error>>;

// 9. Apply every failed constructor check and return the remaining source.
export type RemainingAfterInstances<
  Source,
  Instances extends readonly object[],
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<RemainingAfterInstances<Date | Error | RegExp, [Date, Error]>, RegExp>
>;
type _09b = Expect<
  Equal<
    RemainingAfterInstances<Date | Error | RegExp | URL, [Date, Error, RegExp]>,
    URL
  >
>;
type _09c = Expect<
  Equal<RemainingAfterInstances<Date | Error, []>, Date | Error>
>;
type _09d = Expect<
  Equal<RemainingAfterInstances<unknown, [Date, Error, RegExp]>, unknown>
>;
type _09e = Expect<Equal<RemainingAfterInstances<never, [Date]>, never>>;

// 10. Build each ordered else-if branch followed by the final remainder.
export type SequentialInstanceBranches<
  Source,
  Instances extends readonly object[],
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    SequentialInstanceBranches<
      Date | Error | RegExp | URL,
      [Date, Error, RegExp]
    >,
    [Date, Error, RegExp, URL]
  >
>;
type _10b = Expect<
  Equal<
    SequentialInstanceBranches<Date | Error, [RegExp, Date]>,
    [never, Date, Error]
  >
>;
type _10c = Expect<
  Equal<SequentialInstanceBranches<Date | Error, []>, [Date | Error]>
>;
type _10d = Expect<
  Equal<SequentialInstanceBranches<unknown, [Date, Error]>, [Date, Error, unknown]>
>;

// ─── Class hierarchies and identity ────────────────────────────────────────

// 11. Partition a hierarchy into derived, other-base, and outside-base values.
export type HierarchyPartition<
  Source,
  Base extends object,
  Derived extends Base,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    HierarchyPartition<GivenDog | GivenCat | Date, GivenAnimal, GivenDog>,
    [GivenDog, GivenCat, Date]
  >
>;
type _11b = Expect<
  Equal<
    HierarchyPartition<GivenAnimal | Date, GivenAnimal, GivenDog>,
    [GivenDog, GivenAnimal, Date]
  >
>; // A broad base type remains broad on the negative derived path.
type _11c = Expect<
  Equal<HierarchyPartition<GivenDog, GivenAnimal, GivenDog>, [GivenDog, never, never]>
>;
type _11d = Expect<
  Equal<HierarchyPartition<Date, GivenAnimal, GivenDog>, [never, never, Date]>
>;

// 12. Keep values satisfying both constructor relations in an AND-chain.
export type AllInstances<
  Source,
  First extends object,
  Second extends object,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<AllInstances<GivenDog | GivenCat | Date, GivenAnimal, GivenDog>, GivenDog>
>;
type _12b = Expect<
  Equal<AllInstances<GivenDog | GivenCat, GivenDog, GivenAnimal>, GivenDog>
>;
type _12c = Expect<Equal<AllInstances<Date | Error, Date, Error>, never>>;
type _12d = Expect<Equal<AllInstances<unknown, GivenAnimal, GivenDog>, GivenDog>>;

// 13. Report static assignability beside the always-boolean runtime check type.
export type StaticAndRuntimeFacts<
  Candidate,
  Instance extends object,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<StaticAndRuntimeFacts<GivenCircle, GivenCircle>, [true, boolean]>
>;
type _13b = Expect<
  Equal<StaticAndRuntimeFacts<GivenCircleLookalike, GivenCircle>, [true, boolean]>
>; // A public structural lookalike is statically compatible.
type _13c = Expect<
  Equal<StaticAndRuntimeFacts<{ readonly label: string }, GivenCircle>, [false, boolean]>
>;
type _13d = Expect<
  Equal<StaticAndRuntimeFacts<GivenSecretB, GivenSecretA>, [false, boolean]>
>; // Separate private declarations create distinct identities.
type _13e = Expect<
  Equal<StaticAndRuntimeFacts<GivenDog, GivenAnimal>, [true, boolean]>
>;

// 14. Classify whether the left operand contains a checkable runtime value.
export type InstanceofOperandKind<Value> =
  TODO; // TODO(koan)

type _14a = Expect<Equal<InstanceofOperandKind<Date>, "allowed">>;
type _14b = Expect<Equal<InstanceofOperandKind<Date | string>, "allowed">>;
type _14c = Expect<Equal<InstanceofOperandKind<unknown>, "allowed">>;
type _14d = Expect<Equal<InstanceofOperandKind<string | number>, "rejected">>;
type _14e = Expect<Equal<InstanceofOperandKind<never>, "rejected">>;

// ─── Special inputs and generic guards ─────────────────────────────────────

// 15. Classify a positive branch without allowing source `any` to escape.
export type PositiveInstanceKind<
  Source,
  Instance extends object,
> = TODO; // TODO(koan)

type _15a = Expect<Equal<PositiveInstanceKind<unknown, Date>, "ordinary">>;
type _15b = Expect<Equal<PositiveInstanceKind<any, Date>, "ordinary">>;
type _15c = Expect<Equal<PositiveInstanceKind<never, Date>, "never">>;
type _15d = Expect<Equal<PositiveInstanceKind<string, Date>, "never">>;
type _15e = Expect<
  Equal<PositiveInstanceKind<Date | Error, Date>, "ordinary">
>;

// 16. Classify the unmatched branch for unknown, any, never, and unions.
export type NegativeInstanceKind<
  Source,
  Instance extends object,
> = TODO; // TODO(koan)

type _16a = Expect<Equal<NegativeInstanceKind<unknown, Date>, "unknown">>;
type _16b = Expect<Equal<NegativeInstanceKind<any, Date>, "any">>;
type _16c = Expect<Equal<NegativeInstanceKind<never, Date>, "never">>;
type _16d = Expect<Equal<NegativeInstanceKind<Date, Date>, "never">>;
type _16e = Expect<
  Equal<NegativeInstanceKind<Date | Error, Date>, "ordinary">
>;

// 17. Build the public result of a generic constructor guard.
//     The input may fail at runtime, so the instance is paired with absence.
export type GenericGuardResult<
  Value,
  Constructor extends GivenConstructor,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<GenericGuardResult<unknown, DateConstructor>, Date | undefined>
>;
type _17b = Expect<
  Equal<GenericGuardResult<never, DateConstructor>, Date | undefined>
>; // The public return is still determined by the constructor argument.
type _17c = Expect<
  Equal<GenericGuardResult<string, StringConstructor>, String | undefined>
>;
type _17d = Expect<
  Equal<GenericGuardResult<GivenCircle, typeof GivenCircle>, GivenCircle | undefined>
>;
type _17e = Expect<
  Equal<GenericGuardResult<any, ErrorConstructor>, Error | undefined>
>;

// ─── APIs exposed by guarded branches ──────────────────────────────────────

// 18. Read a property exposed after a successful constructor check.
export type GuardedProperty<
  Source,
  Instance extends object,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<GuardedProperty<Date | string, Date, "getTime">, Date["getTime"]>
>;
type _18b = Expect<
  Equal<GuardedProperty<Error | string, Error, "message">, string>
>;
type _18c = Expect<
  Equal<
    GuardedProperty<GivenCircle | GivenRectangle, GivenCircle, "radius">,
    number
  >
>;
type _18d = Expect<
  Equal<GuardedProperty<Map<string, number> | Set<boolean>, Map<string, number>, "size">, number>
>;
type _18e = Expect<
  Equal<GuardedProperty<string, Date, "getTime">, never>
>;

// 19. Call a method exposed by the successful constructor branch.
export type GuardedMethodResult<
  Source,
  Instance extends object,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<GuardedMethodResult<Date | string, Date, "toISOString">, string>
>;
type _19b = Expect<
  Equal<
    GuardedMethodResult<GivenCircle | GivenRectangle, GivenCircle, "area">,
    number
  >
>;
type _19c = Expect<
  Equal<GuardedMethodResult<GivenDog | GivenCat, GivenDog, "bark">, string>
>;
type _19d = Expect<
  Equal<GuardedMethodResult<RegExp | URL, RegExp, "exec">, RegExpExecArray | null>
>;
type _19e = Expect<
  Equal<GuardedMethodResult<Error, Date, "toISOString">, never>
>;

// 20. Map every source member to the result of its true or false branch.
export type InstanceBranchResult<
  Source,
  Instance extends object,
  WhenInstance,
  Otherwise,
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    InstanceBranchResult<Date | string, Date, "date", "text">,
    "date" | "text"
  >
>;
type _20b = Expect<
  Equal<
    InstanceBranchResult<GivenDog | GivenCat, GivenDog, "bark", "meow">,
    "bark" | "meow"
  >
>;
type _20c = Expect<
  Equal<InstanceBranchResult<Date, Date, number, string>, number>
>;
type _20d = Expect<
  Equal<
    InstanceBranchResult<GivenAnimal, GivenDog, "dog", "other-animal">,
    "dog" | "other-animal"
  >
>;
type _20e = Expect<
  Equal<InstanceBranchResult<never, Date, "date", "other">, never>
>;

// 21. Dispatch each member through an ordered constructor/result table.
export type InstanceDispatch<
  Source,
  Cases extends readonly InstanceCase[],
  Fallback,
> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    InstanceDispatch<
      Date | Error | RegExp | URL,
      [
        readonly [Date, "date"],
        readonly [Error, "error"],
        readonly [RegExp, "regexp"],
      ],
      "url"
    >,
    "date" | "error" | "regexp" | "url"
  >
>;
type _21b = Expect<
  Equal<
    InstanceDispatch<Date, [readonly [Date, number], readonly [Error, string]], boolean>,
    number
  >
>;
type _21c = Expect<
  Equal<InstanceDispatch<Error, [readonly [Date, "date"]], "fallback">, "fallback">
>;
type _21d = Expect<
  Equal<InstanceDispatch<Date | Error, [], "none">, "none">
>;
type _21e = Expect<
  Equal<
    InstanceDispatch<
      GivenDog,
      [readonly [GivenAnimal, "animal"], readonly [GivenDog, "dog"]],
      "other"
    >,
    "animal"
  >
>; // First-match ordering mirrors an else-if chain.
