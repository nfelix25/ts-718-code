import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-031: user-defined type predicates — constructions
 * =============================================================================
 *
 * These constructions build predicate call signatures and derive the trusted
 * true and false branches they promise. They apply those contracts to generic
 * nullish and intersection guards, receiver predicates, wrappers, collection
 * overloads, composed structural checks, nested arrays, mutable aliases,
 * readonly inputs, and special source types. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type KnownPositive<Member, Target> =
  Member extends Target
    ? Member
    : Target extends Member
      ? Target
      : never;

type GivenPositive<Source, Target> =
  0 extends 1 & Source
    ? Target
    : unknown extends Source
      ? Target
      : Source extends unknown ? KnownPositive<Source, Target> : never;

type GivenNegative<Source, Target> =
  0 extends 1 & Source
    ? Source
    : unknown extends Source
      ? Source
      : Exclude<Source, Target>;

type PredicateTarget<Guard> =
  Guard extends (value: any) => value is infer Target ? Target : never;

type GivenAnimal =
  | { readonly kind: "fish"; swim(): void }
  | { readonly kind: "bird"; fly(): void };

type GivenResult =
  | { readonly ok: true; readonly value: string }
  | { readonly ok: false; readonly error: Error };

type GivenNamed = {
  readonly name: string;
};

type GivenActive = {
  readonly active: true;
};

interface GivenBox<Value> {
  value: Value | undefined;
}

// ─── Predicate contracts and trusted branches ─────────────────────────────

// 1. Build a predicate function whose target is assignable to its parameter.
export type Predicate<
  Parameter,
  Target extends Parameter,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<Predicate<unknown, string>, (value: unknown) => value is string>
>;
type _01b = Expect<
  Equal<
    Predicate<GivenAnimal, Extract<GivenAnimal, { kind: "fish" }>>,
    (value: GivenAnimal) => value is Extract<GivenAnimal, { kind: "fish" }>
  >
>;
type _01c = Expect<
  Equal<
    Predicate<GivenResult, Extract<GivenResult, { ok: true }>>,
    (value: GivenResult) => value is Extract<GivenResult, { ok: true }>
  >
>;
type _01d = Expect<
  Equal<
    Predicate<readonly unknown[], readonly string[]>,
    (value: readonly unknown[]) => value is readonly string[]
  >
>;

// 2. Recover a guard's parameter tuple, promised target, and boolean result.
export type PredicateProfile<
  Guard extends (...args: any[]) => boolean,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    PredicateProfile<(value: unknown) => value is string>,
    [[value: unknown], string, boolean]
  >
>;
type _02b = Expect<
  Equal<
    PredicateProfile<
      (value: GivenAnimal) => value is Extract<GivenAnimal, { kind: "bird" }>
    >,
    [[value: GivenAnimal], Extract<GivenAnimal, { kind: "bird" }>, boolean]
  >
>;
type _02c = Expect<
  Equal<
    PredicateProfile<(value: unknown) => boolean>,
    [[value: unknown], never, boolean]
  >
>; // A plain boolean function carries no predicate target.
type _02d = Expect<
  Equal<
    PredicateProfile<(value: readonly unknown[]) => value is readonly number[]>,
    [[value: readonly unknown[]], readonly number[], boolean]
  >
>;

// 3. Construct the branch trusted when the predicate returns true.
export type PositivePredicateBranch<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<PositivePredicateBranch<string | number | boolean, number>, number>
>;
type _03b = Expect<
  Equal<
    PositivePredicateBranch<
      GivenAnimal,
      Extract<GivenAnimal, { kind: "fish" }>
    >,
    Extract<GivenAnimal, { kind: "fish" }>
  >
>;
type _03c = Expect<
  Equal<PositivePredicateBranch<unknown, GivenNamed>, GivenNamed>
>;
type _03d = Expect<Equal<PositivePredicateBranch<any, string>, string>>;
type _03e = Expect<Equal<PositivePredicateBranch<never, never>, never>>;

// 4. Construct the branch trusted when the predicate returns false.
export type NegativePredicateBranch<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    NegativePredicateBranch<string | number | boolean, number>,
    string | boolean
  >
>;
type _04b = Expect<
  Equal<
    NegativePredicateBranch<
      GivenAnimal,
      Extract<GivenAnimal, { kind: "fish" }>
    >,
    Extract<GivenAnimal, { kind: "bird" }>
  >
>;
type _04c = Expect<
  Equal<NegativePredicateBranch<unknown, GivenNamed>, unknown>
>;
type _04d = Expect<
  Equal<NegativePredicateBranch<string | number, string | number>, never>
>;
type _04e = Expect<Equal<NegativePredicateBranch<never, never>, never>>;

// 5. Build both trusted control-flow paths together.
export type PredicatePartition<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    PredicatePartition<string | number | boolean, string | number>,
    [string | number, boolean]
  >
>;
type _05b = Expect<
  Equal<PredicatePartition<unknown, string>, [string, unknown]>
>;
type _05c = Expect<
  Equal<
    PredicatePartition<GivenResult, Extract<GivenResult, { ok: true }>>,
    [
      Extract<GivenResult, { ok: true }>,
      Extract<GivenResult, { ok: false }>,
    ]
  >
>;
type _05d = Expect<
  Equal<PredicatePartition<never, never>, [never, never]>
>;

// 6. Describe everything callers trust regardless of the predicate body.
export type TrustedPredicateOutcome<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    TrustedPredicateOutcome<string | number, string>,
    {
      readonly result: boolean;
      readonly whenTrue: string;
      readonly whenFalse: number;
    }
  >
>;
type _06b = Expect<
  Equal<
    TrustedPredicateOutcome<unknown, number[]>,
    {
      readonly result: boolean;
      readonly whenTrue: number[];
      readonly whenFalse: unknown;
    }
  >
>;
type _06c = Expect<
  Equal<
    TrustedPredicateOutcome<GivenAnimal, Extract<GivenAnimal, { kind: "fish" }>>,
    {
      readonly result: boolean;
      readonly whenTrue: Extract<GivenAnimal, { kind: "fish" }>;
      readonly whenFalse: Extract<GivenAnimal, { kind: "bird" }>;
    }
  >
>;
type _06d = Expect<
  Equal<
    TrustedPredicateOutcome<never, never>,
    {
      readonly result: boolean;
      readonly whenTrue: never;
      readonly whenFalse: never;
    }
  >
>;

// ─── Generic, intersection, and receiver predicates ────────────────────────

// 7. Build the generic predicate signature that removes null and undefined.
export type NonNullishPredicate =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    NonNullishPredicate,
    <Value>(value: Value) => value is NonNullable<Value>
  >
>;
type _07b = Expect<Equal<ReturnType<NonNullishPredicate>, boolean>>;

// 8. Construct the generic true branch of a non-nullish guard.
export type NonNullishBranch<Value> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<NonNullishBranch<string | number | null | undefined>, string | number>
>;
type _08b = Expect<
  Equal<NonNullishBranch<0 | false | "" | null | undefined>, 0 | false | "">
>;
type _08c = Expect<Equal<NonNullishBranch<unknown>, {}>>;
type _08d = Expect<
  Equal<NonNullishBranch<{ readonly id: number } | undefined>, { readonly id: number }>
>;
type _08e = Expect<Equal<NonNullishBranch<never>, never>>;

// 9. Build a generic predicate that adds structural evidence to its input.
export type IntersectionPredicate<Evidence extends object> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    IntersectionPredicate<{ readonly id: string }>,
    <Value>(value: Value) => value is Value & { readonly id: string }
  >
>;
type _09b = Expect<
  Equal<
    IntersectionPredicate<GivenNamed & GivenActive>,
    <Value>(value: Value) => value is Value & GivenNamed & GivenActive
  >
>;
type _09c = Expect<Equal<ReturnType<IntersectionPredicate<GivenNamed>>, boolean>>;
type _09d = Expect<
  Equal<
    IntersectionPredicate<Record<PropertyKey, unknown>>,
    <Value>(value: Value) => value is Value & Record<PropertyKey, unknown>
  >
>;

// 10. Construct the true-branch intersection promised by a generic guard.
export type IntersectionBranch<
  Value,
  Evidence extends object,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    IntersectionBranch<unknown, { readonly id: string }>,
    { readonly id: string }
  >
>;
type _10b = Expect<
  Equal<
    IntersectionBranch<{ readonly name: string }, { readonly active: true }>,
    { readonly name: string } & { readonly active: true }
  >
>;
type _10c = Expect<
  Equal<
    IntersectionBranch<string | { readonly name: string }, { readonly id: string }>,
    (string | { readonly name: string }) & { readonly id: string }
  >
>;
type _10d = Expect<
  Equal<IntersectionBranch<never, { readonly id: string }>, never>
>;

// 11. Build a `this is` method signature for a receiver refinement.
export type ThisPredicate<
  Receiver,
  Evidence extends object,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ThisPredicate<GivenBox<string>, { value: string }>,
    (this: GivenBox<string>) => this is GivenBox<string> & { value: string }
  >
>;
type _11b = Expect<
  Equal<
    ThisParameterType<ThisPredicate<GivenBox<number>, { value: number }>>,
    GivenBox<number>
  >
>;
type _11c = Expect<
  Equal<ReturnType<ThisPredicate<GivenBox<number>, { value: number }>>, boolean>
>;
type _11d = Expect<
  Equal<
    ThisPredicate<{ readonly state: "open" | "closed" }, { readonly state: "open" }>,
    (
      this: { readonly state: "open" | "closed" }
    ) => this is { readonly state: "open" | "closed" } & { readonly state: "open" }
  >
>;

// 12. Construct the receiver type on the successful `this` predicate path.
export type ThisPredicateBranch<
  Receiver,
  Evidence extends object,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    ThisPredicateBranch<GivenBox<string>, { value: string }>,
    GivenBox<string> & { value: string }
  >
>;
type _12b = Expect<
  Equal<
    ThisPredicateBranch<GivenBox<number>, { value: number }>[
      "value"
    ],
    number
  >
>;
type _12c = Expect<
  Equal<
    ThisPredicateBranch<
      { readonly state: "open" | "closed" },
      { readonly state: "open" }
    >["state"],
    "open"
  >
>;
type _12d = Expect<
  Equal<ThisPredicateBranch<never, { value: string }>, never>
>;

// ─── Wrappers and predicate-aware collection overloads ────────────────────

// 13. Preserve the predicate relation or erase it behind a boolean wrapper.
export type GuardWrapper<
  Parameter,
  Target extends Parameter,
  Mode extends "predicate" | "boolean",
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    GuardWrapper<unknown, string, "predicate">,
    (value: unknown) => value is string
  >
>;
type _13b = Expect<
  Equal<
    GuardWrapper<unknown, string, "boolean">,
    (value: unknown) => boolean
  >
>;
type _13c = Expect<
  Equal<
    GuardWrapper<GivenAnimal, Extract<GivenAnimal, { kind: "fish" }>, "predicate">,
    (value: GivenAnimal) => value is Extract<GivenAnimal, { kind: "fish" }>
  >
>;
type _13d = Expect<
  Equal<
    ReturnType<GuardWrapper<unknown, number, "predicate">>,
    boolean
  >
>;

// 14. Apply caller-side evidence according to the wrapper's public signature.
export type WrapperEvidence<
  Source,
  Target extends Source,
  Mode extends "predicate" | "boolean",
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<WrapperEvidence<unknown, string, "predicate">, string>
>;
type _14b = Expect<
  Equal<WrapperEvidence<unknown, string, "boolean">, unknown>
>;
type _14c = Expect<
  Equal<
    WrapperEvidence<
      string | number | boolean,
      string | number,
      "predicate"
    >,
    string | number
  >
>;
type _14d = Expect<
  Equal<
    WrapperEvidence<
      string | number | boolean,
      string | number,
      "boolean"
    >,
    string | number | boolean
  >
>;

// 15. Construct the array returned by predicate-aware or boolean-only filter.
export type FilterGuardResult<
  Source,
  Target extends Source,
  Mode extends "predicate" | "boolean",
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<FilterGuardResult<unknown, string, "predicate">, string[]>
>;
type _15b = Expect<
  Equal<FilterGuardResult<unknown, string, "boolean">, unknown[]>
>;
type _15c = Expect<
  Equal<
    FilterGuardResult<string | number | undefined, string | number, "predicate">,
    Array<string | number>
  >
>;
type _15d = Expect<
  Equal<
    FilterGuardResult<
      number | boolean | null | undefined,
      number | boolean,
      "boolean"
    >,
    Array<number | boolean | null | undefined>
  >
>; // `filter(Boolean)` has no user-defined predicate signature.
type _15e = Expect<
  Equal<FilterGuardResult<never, never, "predicate">, never[]>
>;

// 16. Construct the possibly absent result of predicate-aware or boolean find.
export type FindGuardResult<
  Source,
  Target extends Source,
  Mode extends "predicate" | "boolean",
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<FindGuardResult<unknown, string, "predicate">, string | undefined>
>;
type _16b = Expect<
  Equal<FindGuardResult<unknown, string, "boolean">, unknown>
>; // `unknown | undefined` simplifies to unknown.
type _16c = Expect<
  Equal<
    FindGuardResult<string | number, number, "predicate">,
    number | undefined
  >
>;
type _16d = Expect<
  Equal<
    FindGuardResult<GivenAnimal, Extract<GivenAnimal, { kind: "bird" }>, "predicate">,
    Extract<GivenAnimal, { kind: "bird" }> | undefined
  >
>;

// 17. Build the collection and indexed-element views inside a successful every.
export type EveryGuardProfile<
  Source,
  Target extends Source,
  Container extends "mutable" | "readonly",
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<EveryGuardProfile<unknown, string, "mutable">, [string[], string | undefined]>
>;
type _17b = Expect<
  Equal<
    EveryGuardProfile<unknown, number, "readonly">,
    [readonly number[], number | undefined]
  >
>;
type _17c = Expect<
  Equal<
    EveryGuardProfile<string | number, string, "mutable">,
    [string[], string | undefined]
  >
>;
type _17d = Expect<
  Equal<EveryGuardProfile<never, never, "readonly">, [readonly never[], undefined]>
>;

// 18. Construct the element array kept by a negated predicate.
export type RejectedGuardFilter<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    RejectedGuardFilter<string | number | boolean, string>,
    Array<number | boolean>
  >
>;
type _18b = Expect<
  Equal<RejectedGuardFilter<unknown, string>, unknown[]>
>;
type _18c = Expect<
  Equal<
    RejectedGuardFilter<GivenAnimal, Extract<GivenAnimal, { kind: "fish" }>>,
    Array<Extract<GivenAnimal, { kind: "bird" }>>
  >
>;
type _18d = Expect<
  Equal<RejectedGuardFilter<string, string>, never[]>
>;

// ─── Composed objects, arrays, legality, and mutation ──────────────────────

// 19. Build a predicate whose successful target satisfies two guard promises.
export type ComposedPredicate<
  Source,
  First extends Source,
  Second extends Source,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    ComposedPredicate<unknown, GivenNamed, GivenActive>,
    (value: unknown) => value is GivenNamed & GivenActive
  >
>;
type _19b = Expect<
  Equal<
    ComposedPredicate<
      GivenAnimal,
      Extract<GivenAnimal, { kind: "fish" }>,
      { readonly kind: "fish"; swim(): void }
    >,
    (
      value: GivenAnimal
    ) => value is Extract<GivenAnimal, { kind: "fish" }> & {
      readonly kind: "fish";
      swim(): void;
    }
  >
>;
type _19c = Expect<
  Equal<ReturnType<ComposedPredicate<unknown, GivenNamed, GivenActive>>, boolean>
>;
type _19d = Expect<
  Equal<
    PredicateTarget<ComposedPredicate<unknown, GivenNamed, GivenActive>>,
    GivenNamed & GivenActive
  >
>;

// 20. Read a field promised by the predicate target.
export type GuardedProperty<
  Target,
  Key extends keyof Target,
> = TODO; // TODO(koan)

type _20a = Expect<Equal<GuardedProperty<GivenNamed, "name">, string>>;
type _20b = Expect<Equal<GuardedProperty<GivenActive, "active">, true>>;
type _20c = Expect<
  Equal<GuardedProperty<GivenNamed & GivenActive, "name">, string>
>;
type _20d = Expect<
  Equal<
    GuardedProperty<{ readonly value?: number }, "value">,
    number | undefined
  >
>;
type _20e = Expect<
  Equal<GuardedProperty<Record<PropertyKey, unknown>, "missing">, unknown>
>;

// 21. Build a guard that validates both array identity and every element.
export type ArrayPredicate<Element> =
  TODO; // TODO(koan)

type _21a = Expect<
  Equal<ArrayPredicate<number>, (value: unknown) => value is number[]>
>;
type _21b = Expect<
  Equal<ArrayPredicate<string>, (value: unknown) => value is string[]>
>;
type _21c = Expect<
  Equal<
    ArrayPredicate<{ readonly id: string }>,
    (value: unknown) => value is Array<{ readonly id: string }>
  >
>;
type _21d = Expect<Equal<ReturnType<ArrayPredicate<never>>, boolean>>;

// 22. Report whether a predicate target is legal for its parameter type.
export type PredicateContractValid<
  Parameter,
  Target,
> = TODO; // TODO(koan)

type _22a = Expect<Equal<PredicateContractValid<unknown, string>, true>>;
type _22b = Expect<Equal<PredicateContractValid<string, number>, false>>;
type _22c = Expect<
  Equal<
    PredicateContractValid<GivenAnimal, Extract<GivenAnimal, { kind: "fish" }>>,
    true
  >
>;
type _22d = Expect<
  Equal<PredicateContractValid<readonly unknown[], readonly string[]>, true>
>;
type _22e = Expect<
  Equal<PredicateContractValid<string | number, boolean>, false>
>;

// 23. Preserve the narrowed view until a possible alias mutation restores Source.
export type GuardMutationObservation<
  Source,
  Narrowed,
  AliasMayMutate extends boolean,
> = TODO; // TODO(koan)

type _23a = Expect<
  Equal<
    GuardMutationObservation<unknown[], string[], false>,
    string[]
  >
>;
type _23b = Expect<
  Equal<
    GuardMutationObservation<unknown[], string[], true>,
    unknown[]
  >
>;
type _23c = Expect<
  Equal<
    GuardMutationObservation<GivenAnimal, Extract<GivenAnimal, { kind: "fish" }>, false>,
    Extract<GivenAnimal, { kind: "fish" }>
  >
>;
type _23d = Expect<
  Equal<
    GuardMutationObservation<GivenAnimal, Extract<GivenAnimal, { kind: "fish" }>, true>,
    GivenAnimal
  >
>;

// 24. Build a predicate that preserves readonly array safety.
export type ReadonlyArrayPredicate<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _24a = Expect<
  Equal<
    ReadonlyArrayPredicate<unknown, string>,
    (value: readonly unknown[]) => value is readonly string[]
  >
>;
type _24b = Expect<
  Equal<
    Parameters<ReadonlyArrayPredicate<string | number, string>>,
    [value: readonly (string | number)[]]
  >
>;
type _24d = Expect<
  Equal<ReturnType<ReadonlyArrayPredicate<unknown, number>>, boolean>
>;

// 25. Classify either predicate branch without allowing any to satisfy assertions.
export type PredicateBranchKind<
  Source,
  Target extends Source,
  Branch extends "true" | "false",
> = TODO; // TODO(koan)

type _25a = Expect<
  Equal<PredicateBranchKind<any, string, "true">, "ordinary">
>;
type _25b = Expect<
  Equal<PredicateBranchKind<any, string, "false">, "any">
>;
type _25c = Expect<
  Equal<PredicateBranchKind<unknown, string, "true">, "ordinary">
>;
type _25d = Expect<
  Equal<PredicateBranchKind<unknown, string, "false">, "unknown">
>;
type _25e = Expect<
  Equal<PredicateBranchKind<never, never, "true">, "never">
>;
