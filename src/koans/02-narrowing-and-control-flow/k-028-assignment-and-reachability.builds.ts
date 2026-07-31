import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-028: assignment and reachability — constructions
 * =============================================================================
 *
 * These constructions track a binding's declared contract separately from its
 * current observation, then join only states that can reach a program point.
 * They cover direct, logical, compound, destructured, and dotted writes;
 * snapshots; branches; returns, throws, continue, loops, aliases, closures,
 * catch variables, and finally overrides. Replace each `TODO` with a type that
 * satisfies the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type WidenPrimitive<Value> =
  Value extends string
    ? string
    : Value extends number
      ? number
      : Value extends bigint
        ? bigint
        : Value extends boolean
          ? boolean
          : Value extends symbol
            ? symbol
            : Value;

type GivenObservedWrite<Declared, Assigned> =
  0 extends 1 & Declared
    ? Declared
    : unknown extends Declared
      ? Declared
      : Assigned extends string
        ? string extends Declared ? string : Assigned
        : Assigned extends number
          ? number extends Declared ? number : Assigned
          : Assigned extends bigint
            ? bigint extends Declared ? bigint : Assigned
            : Assigned extends symbol
              ? symbol extends Declared ? symbol : Assigned
              : Assigned;

type GivenTruthyLiteral = Exclude<unknown, false | 0 | 0n | "" | null | undefined>;

type TruthyMember<Member> =
  Member extends false | 0 | 0n | "" | null | undefined ? never : Member;

type FalsyMember<Member> =
  Member extends false | 0 | 0n | "" | null | undefined
    ? Member
    : string extends Member
      ? Member
      : number extends Member
        ? Member
        : bigint extends Member
          ? Member
          : never;

type GivenTruthy<Value> =
  0 extends 1 & Value
    ? Value
    : unknown extends Value
      ? {}
      : Value extends unknown ? TruthyMember<Value> : never;

type GivenFalsy<Value> =
  0 extends 1 & Value
    ? Value
    : unknown extends Value
      ? Value
      : Value extends unknown ? FalsyMember<Value> : never;

type FlowPath<
  State,
  Reaches extends boolean,
  Result = never,
> = {
  readonly state: State;
  readonly reaches: Reaches;
  readonly result: Result;
};

type ReachableState<Path> =
  Path extends FlowPath<infer State, true, unknown> ? State : never;

type PathResult<Path> =
  Path extends FlowPath<unknown, boolean, infer Result> ? Result : never;

declare const givenUnassigned: unique symbol;
type GivenUnassigned = typeof givenUnassigned;
type GivenVariantA = { readonly kind: "a" };
type GivenVariantB = { readonly kind: "b" };

// ─── Declared contracts, writes, inference, and snapshots ─────────────────

// 1. Report whether Assigned satisfies the binding's declared contract.
export type AssignmentAccepted<
  Declared,
  Assigned,
> = TODO; // TODO(koan)

type _01a = Expect<Equal<AssignmentAccepted<string | number, string>, true>>;
type _01b = Expect<Equal<AssignmentAccepted<string | number, number>, true>>;
type _01c = Expect<Equal<AssignmentAccepted<string, number>, false>>;
type _01d = Expect<
  Equal<
    AssignmentAccepted<{ readonly kind: "a" } | { readonly kind: "b" }, { readonly kind: "a" }>,
    true
  >
>;
type _01e = Expect<Equal<AssignmentAccepted<readonly string[], Set<string>>, false>>;

// 2. Build the declared/current pair after one valid assignment.
//    Broad string, number, bigint, and symbol members are observed broadly.
export type WriteState<
  Declared,
  Assigned extends Declared,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    WriteState<string | number, "start">,
    { readonly declared: string | number; readonly observed: string }
  >
>;
type _02b = Expect<
  Equal<
    WriteState<string | number, 42>,
    { readonly declared: string | number; readonly observed: number }
  >
>;
type _02c = Expect<
  Equal<
    WriteState<"a" | "b", "a">,
    { readonly declared: "a" | "b"; readonly observed: "a" }
  >
>;
type _02d = Expect<
  Equal<
    WriteState<boolean | null, false>,
    { readonly declared: boolean | null; readonly observed: false }
  >
>;
type _02e = Expect<
  Equal<
    WriteState<unknown, 1>,
    { readonly declared: unknown; readonly observed: unknown }
  >
>;

// 3. Infer a mutable primitive broadly, but preserve a const primitive literal.
export type BindingInference<
  Initializer,
  Binding extends "let" | "const",
> = TODO; // TODO(koan)

type _03a = Expect<Equal<BindingInference<"text", "let">, string>>;
type _03b = Expect<Equal<BindingInference<"text", "const">, "text">>;
type _03c = Expect<Equal<BindingInference<1, "let">, number>>;
type _03d = Expect<Equal<BindingInference<false, "const">, false>>;
type _03e = Expect<Equal<BindingInference<1n | 2n, "let">, bigint>>;

// 4. Capture the current observation in a new immutable binding.
export type SnapshotObservation<Observed> =
  TODO; // TODO(koan)

type _04a = Expect<
  Equal<SnapshotObservation<number>, { readonly value: number }>
>;
type _04b = Expect<
  Equal<SnapshotObservation<"saved">, { readonly value: "saved" }>
>;
type _04c = Expect<
  Equal<
    SnapshotObservation<{ readonly id: number }>,
    { readonly value: { readonly id: number } }
  >
>;
type _04d = Expect<Equal<SnapshotObservation<never>, { readonly value: never }>>;

// ─── Branch joins and reachable paths ──────────────────────────────────────

// 5. Join every observation supplied by branches that meet.
export type JoinObservations<Paths extends readonly unknown[]> =
  TODO; // TODO(koan)

type _05a = Expect<Equal<JoinObservations<[string, number]>, string | number>>;
type _05b = Expect<Equal<JoinObservations<["first", "second"]>, "first" | "second">>;
type _05c = Expect<
  Equal<JoinObservations<[number, number, never]>, number>
>;
type _05d = Expect<Equal<JoinObservations<[string | undefined]>, string | undefined>>;
type _05e = Expect<Equal<JoinObservations<[]>, never>>;

// 6. Join only path states whose control flow reaches the merge point.
export type JoinReachableStates<Paths extends readonly FlowPath<unknown, boolean, unknown>[]> =
  TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    JoinReachableStates<
      [
        FlowPath<string, true>,
        FlowPath<number, true>,
        FlowPath<null, false, "missing">,
      ]
    >,
    string | number
  >
>;
type _06b = Expect<
  Equal<
    JoinReachableStates<
      [FlowPath<number, true>, FlowPath<string, false, number>]
    >,
    number
  >
>;
type _06c = Expect<
  Equal<JoinReachableStates<[FlowPath<never, false, never>]>, never>
>;
type _06d = Expect<Equal<JoinReachableStates<[]>, never>>;

// 7. Collect the return values from all reachable or ended function paths.
export type FunctionResults<Paths extends readonly FlowPath<unknown, boolean, unknown>[]> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    FunctionResults<
      [
        FlowPath<number, false, number>,
        FlowPath<number, false, number>,
      ]
    >,
    number
  >
>; // String input replacement and numeric input both return number.
type _07b = Expect<
  Equal<
    FunctionResults<
      [
        FlowPath<null, false, string>,
        FlowPath<number, false, string>,
        FlowPath<string, false, string>,
      ]
    >,
    string
  >
>;
type _07c = Expect<
  Equal<
    FunctionResults<
      [
        FlowPath<null, false, undefined>,
        FlowPath<string, false, never>,
        FlowPath<number, false, number>,
      ]
    >,
    number | undefined
  >
>;
type _07d = Expect<Equal<FunctionResults<[]>, never>>;

// ─── Replacement, exits, and definite assignment ──────────────────────────

// 8. Replace one narrowed portion before it rejoins the untouched remainder.
export type ReplaceNarrowed<
  Source,
  Selected,
  Replacement extends Source,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<ReplaceNarrowed<string | number, string, number>, number>
>;
type _08b = Expect<
  Equal<ReplaceNarrowed<string | number | null, null, string>, string | number>
>;
type _08c = Expect<
  Equal<
    ReplaceNarrowed<"idle" | "running" | "done", "idle", "running">,
    "running" | "done"
  >
>;
type _08d = Expect<
  Equal<
    ReplaceNarrowed<
      GivenVariantA | GivenVariantB,
      GivenVariantA,
      GivenVariantB
    >,
    GivenVariantB
  >
>;
type _08e = Expect<Equal<ReplaceNarrowed<never, never, never>, never>>;

// 9. Remove a union member whose branch returned, threw, broke, or continued.
export type RemainingAfterExit<
  Source,
  Exited,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<RemainingAfterExit<string | number | null, null>, string | number>
>;
type _09b = Expect<
  Equal<RemainingAfterExit<string | number, string>, number>
>;
type _09c = Expect<
  Equal<RemainingAfterExit<string | number | boolean, boolean>, string | number>
>;
type _09d = Expect<Equal<RemainingAfterExit<string, string>, never>>;
type _09e = Expect<Equal<RemainingAfterExit<never, string>, never>>;

// 10. Apply an ordered series of ended-path exclusions.
export type RemainingAfterExits<
  Source,
  Exited extends readonly unknown[],
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    RemainingAfterExits<string | number | null, [null, string]>,
    number
  >
>;
type _10b = Expect<
  Equal<
    RemainingAfterExits<string | number | boolean | undefined, [undefined, boolean]>,
    string | number
  >
>;
type _10c = Expect<
  Equal<RemainingAfterExits<"a" | "b" | "c", ["a", "b"]>, "c">
>;
type _10d = Expect<
  Equal<RemainingAfterExits<string | number, []>, string | number>
>;
type _10e = Expect<Equal<RemainingAfterExits<never, [string]>, never>>;

// 11. Join an unchanged path with a path that performed an assignment.
export type OptionalBranchWrite<
  Before,
  Assigned,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<OptionalBranchWrite<number, string>, string | number>
>;
type _11b = Expect<
  Equal<OptionalBranchWrite<undefined, string>, string | undefined>
>;
type _11c = Expect<
  Equal<OptionalBranchWrite<"initial", "changed">, "initial" | "changed">
>;
type _11d = Expect<
  Equal<
    OptionalBranchWrite<{ readonly kind: "a" }, { readonly kind: "b" }>,
    { readonly kind: "a" } | { readonly kind: "b" }
  >
>;

// 12. Retain the pre-loop state only when zero iterations are possible.
export type LoopObservation<
  Before,
  Body,
  MinimumIterations extends 0 | 1,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<LoopObservation<undefined, string, 0>, string | undefined>
>;
type _12b = Expect<
  Equal<LoopObservation<number, string, 0>, string | number>
>;
type _12c = Expect<Equal<LoopObservation<number, string, 1>, string>>;
type _12d = Expect<
  Equal<LoopObservation<undefined, never, 0>, undefined>
>;
type _12e = Expect<
  Equal<
    LoopObservation<{ readonly state: "before" }, { readonly state: "body" }, 1>,
    { readonly state: "body" }
  >
>;

// 13. Keep the portion that reaches the rest of a loop body after continue.
export type ContinueRemainder<
  Source,
  Continued,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<ContinueRemainder<string | number, number>, string>
>;
type _13b = Expect<
  Equal<ContinueRemainder<string | number | boolean, boolean>, string | number>
>;
type _13c = Expect<
  Equal<ContinueRemainder<"stop" | "go", "stop">, "go">
>;
type _13d = Expect<Equal<ContinueRemainder<never, number>, never>>;

// 14. Report whether every joined path assigned a value.
export type AllPathsAssigned<
  Observations,
  Unassigned = GivenUnassigned,
> = TODO; // TODO(koan)

type _14a = Expect<Equal<AllPathsAssigned<string | number>, true>>;
type _14b = Expect<
  Equal<AllPathsAssigned<string | GivenUnassigned>, false>
>;
type _14c = Expect<
  Equal<AllPathsAssigned<GivenUnassigned>, false>
>;
type _14d = Expect<Equal<AllPathsAssigned<never>, true>>;
type _14e = Expect<
  Equal<AllPathsAssigned<string | undefined, undefined>, false>
>;

// ─── Destructuring and assignment operators ───────────────────────────────

// 15. Observe the indexed source member assigned by array destructuring.
export type DestructuredElement<
  Declared,
  Source extends readonly unknown[],
  Index extends keyof Source,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<DestructuredElement<string | number, readonly [number], 0>, number>
>;
type _15b = Expect<
  Equal<DestructuredElement<string | number, readonly ["next"], 0>, string>
>;
type _15c = Expect<
  Equal<DestructuredElement<"a" | "b", readonly ["a"], 0>, "a">
>;
type _15d = Expect<
  Equal<DestructuredElement<string, readonly [number], 0>, never>
>;
type _15e = Expect<
  Equal<DestructuredElement<unknown, readonly [{ readonly id: 1 }], 0>, unknown>
>;

// 16. Observe the source property assigned by object destructuring.
export type DestructuredProperty<
  Declared,
  Source,
  Key extends keyof Source,
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    DestructuredProperty<string | number, { readonly value: string }, "value">,
    string
  >
>;
type _16b = Expect<
  Equal<
    DestructuredProperty<string | number, { readonly value: 2 }, "value">,
    number
  >
>;
type _16c = Expect<
  Equal<
    DestructuredProperty<
      { readonly kind: "a" } | { readonly kind: "b" },
      { readonly value: { readonly kind: "b" } },
      "value"
    >,
    { readonly kind: "b" }
  >
>;
type _16d = Expect<
  Equal<DestructuredProperty<string, { readonly value: number }, "value">, never>
>;

// 17. Build the observation after ||= or ??=.
export type LogicalAssignmentObservation<
  Current,
  Fallback,
  Operator extends "||=" | "??=",
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<LogicalAssignmentObservation<string | undefined, string, "||=">, string>
>;
type _17b = Expect<
  Equal<
    LogicalAssignmentObservation<"" | "ready" | undefined, "fallback", "||=">,
    "ready" | "fallback"
  >
>;
type _17c = Expect<
  Equal<LogicalAssignmentObservation<string | null, string, "??=">, string>
>;
type _17d = Expect<
  Equal<
    LogicalAssignmentObservation<0 | 2 | null, 5, "??=">,
    0 | 2 | 5
  >
>;
type _17e = Expect<
  Equal<LogicalAssignmentObservation<readonly [] | undefined, [], "??=">, readonly [] | []>
>;

// 18. Construct the result observation of primitive `+=`.
export type CompoundAddObservation<Left, Right> =
  TODO; // TODO(koan)

type _18a = Expect<Equal<CompoundAddObservation<number, number>, number>>;
type _18b = Expect<Equal<CompoundAddObservation<string, number>, string>>;
type _18c = Expect<Equal<CompoundAddObservation<number, string>, string>>;
type _18d = Expect<Equal<CompoundAddObservation<bigint, bigint>, bigint>>;
type _18e = Expect<Equal<CompoundAddObservation<number, bigint>, never>>;

// ─── Dotted writes, aliases, callbacks, exceptions, and special types ─────

// 19. Replace one observed property while preserving every mapped modifier.
export type PropertyWriteObservation<
  ObjectType,
  Key extends keyof ObjectType,
  Assigned extends ObjectType[Key],
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    PropertyWriteObservation<{ value: string | number }, "value", "text">,
    { value: string }
  >
>;
type _19b = Expect<
  Equal<
    PropertyWriteObservation<{ value: string | number }, "value", 2>,
    { value: number }
  >
>;
type _19c = Expect<
  Equal<
    PropertyWriteObservation<
      { readonly value: string | number; readonly label?: string },
      "value",
      2
    >,
    { readonly value: number; readonly label?: string }
  >
>; // readonly and optional modifiers are preserved.
type _19d = Expect<
  Equal<
    PropertyWriteObservation<{ first: string | number; second: boolean }, "first", "next">,
    { first: string; second: boolean }
  >
>;

// 20. Restore the declared property type after a write through an alias.
export type AfterAliasMutation<DeclaredProperty> =
  TODO; // TODO(koan)

type _20a = Expect<Equal<AfterAliasMutation<string | number>, string | number>>;
type _20b = Expect<
  Equal<
    AfterAliasMutation<{ readonly kind: "a" } | { readonly kind: "b" }>,
    { readonly kind: "a" } | { readonly kind: "b" }
  >
>;
type _20c = Expect<
  Equal<AfterAliasMutation<readonly string[] | Set<string>>, readonly string[] | Set<string>>
>;
type _20d = Expect<Equal<AfterAliasMutation<unknown>, unknown>>;

// 21. Preserve a narrowing in a closure only when no possible write invalidates it.
export type ClosureObservation<
  Declared,
  Narrowed,
  MayWrite extends boolean,
> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<ClosureObservation<string | number, string, false>, string>
>;
type _21b = Expect<
  Equal<ClosureObservation<string | number, string, true>, string | number>
>;
type _21c = Expect<
  Equal<
    ClosureObservation<{ readonly id: number } | null, { readonly id: number }, false>,
    { readonly id: number }
  >
>;
type _21d = Expect<
  Equal<ClosureObservation<boolean | undefined, true, true>, boolean | undefined>
>;

// 22. Let an always-running finally write determine the outgoing observation.
export type FinallyObservation<
  TryObservation,
  FinallyWrite,
> = TODO; // TODO(koan)

type _22a = Expect<Equal<FinallyObservation<string, number>, number>>;
type _22b = Expect<
  Equal<FinallyObservation<string | number, boolean>, boolean>
>;
type _22c = Expect<
  Equal<
    FinallyObservation<{ readonly phase: "try" }, { readonly phase: "finally" }>,
    { readonly phase: "finally" }
  >
>;
type _22d = Expect<Equal<FinallyObservation<never, "cleanup">, "cleanup">>;

// 23. Construct the binding type supplied by useUnknownInCatchVariables.
export type CatchObservation =
  TODO; // TODO(koan)

type _23a = Expect<Equal<CatchObservation, unknown>>;
type _23b = Expect<Equal<GivenKind<CatchObservation>, "unknown">>;
type _23c = Expect<Equal<CatchObservation & string, string>>;

// 24. Classify an observation without allowing any to satisfy assertions.
export type ObservationKind<Observed> =
  TODO; // TODO(koan)

type _24a = Expect<Equal<ObservationKind<any>, "any">>;
type _24b = Expect<Equal<ObservationKind<unknown>, "unknown">>;
type _24c = Expect<Equal<ObservationKind<never>, "never">>;
type _24d = Expect<Equal<ObservationKind<string | number>, "ordinary">>;
type _24e = Expect<Equal<ObservationKind<string | never>, "ordinary">>;
