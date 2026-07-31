import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-030: exhaustiveness and never — constructions
 * =============================================================================
 *
 * These constructions consume closed unions until no member remains, turn that
 * proof into handler tables and assert-never contracts, and contrast it with
 * reachable catch-alls, broad tags, generics, any, unknown, and casts. They also
 * exercise never as a function result, empty union, intersection absorber, key
 * space, collection element, and distributive-conditional input. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type PairOverlap<Left, Right> =
  Left extends unknown
    ? Right extends unknown
      ? Left extends Right
        ? Left
        : Right extends Left
          ? Right
          : never
      : never
    : never;

type GivenSelect<
  Source,
  Key extends PropertyKey,
  Target,
> = Source extends unknown
  ? Key extends keyof Source
    ? [PairOverlap<Source[Key], Target>] extends [never] ? never : Source
    : never
  : never;

type GivenReject<
  Source,
  Key extends PropertyKey,
  Target,
> = Source extends unknown
  ? Key extends keyof Source
    ? Source[Key] extends Target ? never : Source
    : Source
  : never;

type GivenTagValues<Source, Key extends PropertyKey> =
  Source extends unknown
    ? Key extends keyof Source ? Source[Key] : never
    : never;

type OptionalTaggedMembers<Source, Key extends PropertyKey> =
  Source extends unknown
    ? Key extends keyof Source
      ? {} extends Pick<Source, Key & keyof Source> ? Source : never
      : never
    : never;

type DistributedBranch<Value, Constraint> =
  Value extends Constraint ? "match" : "other";

type WrappedBranch<Value, Constraint> =
  [Value] extends [Constraint] ? "match" : "other";

type GivenShape =
  | { readonly kind: "circle"; readonly radius: number }
  | { readonly kind: "square"; readonly side: number }
  | {
      readonly kind: "rectangle";
      readonly width: number;
      readonly height: number;
    };

type GivenState =
  | { readonly state: "idle" }
  | { readonly state: "loading" }
  | { readonly state: "ready"; readonly value: string }
  | { readonly state: "failed"; readonly error: Error };

type GivenEvent =
  | { readonly type: "open"; readonly id: string }
  | { readonly type: "close"; readonly id: string }
  | { readonly type: "tick"; readonly at: number };

type GivenCommand =
  | readonly ["push", string]
  | readonly ["pop"]
  | readonly ["size"];

type GivenOpen =
  | { readonly kind: "fixed"; readonly value: number }
  | { readonly kind: string; readonly raw: unknown };

type GivenOptional =
  | { readonly kind: "fixed"; readonly value: number }
  | { readonly kind?: "loose"; readonly note: string };

// ─── Consuming closed member domains ───────────────────────────────────────

// 1. Remove a handled member set from a union.
export type RemainingMembers<
  Union,
  Handled,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<RemainingMembers<"red" | "green" | "blue", "red">, "green" | "blue">
>;
type _01b = Expect<
  Equal<RemainingMembers<true | false, true>, false>
>;
type _01c = Expect<
  Equal<RemainingMembers<0 | 1 | 2, 0 | 1>, 2>
>;
type _01d = Expect<
  Equal<
    RemainingMembers<GivenShape, Extract<GivenShape, { kind: "circle" }>>,
    Exclude<GivenShape, { kind: "circle" }>
  >
>;
type _01e = Expect<Equal<RemainingMembers<never, string>, never>>;

// 2. Apply an ordered tuple of handled members.
export type RemainingAfterMembers<
  Union,
  Handled extends readonly unknown[],
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    RemainingAfterMembers<"red" | "green" | "blue", ["red", "green", "blue"]>,
    never
  >
>;
type _02b = Expect<
  Equal<RemainingAfterMembers<boolean, [true, false]>, never>
>;
type _02c = Expect<
  Equal<RemainingAfterMembers<0 | 1 | 2, [0, 1]>, 2>
>;
type _02d = Expect<
  Equal<RemainingAfterMembers<"a" | "b", []>, "a" | "b">
>;
type _02e = Expect<Equal<RemainingAfterMembers<never, [string]>, never>>;

// 3. Report whether the handled member set covers the entire union.
export type IsExhaustive<
  Union,
  Handled,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<IsExhaustive<"red" | "green" | "blue", "red" | "green" | "blue">, true>
>;
type _03b = Expect<
  Equal<IsExhaustive<"red" | "green" | "blue", "red" | "green">, false>
>;
type _03c = Expect<Equal<IsExhaustive<boolean, true | false>, true>>;
type _03d = Expect<Equal<IsExhaustive<0 | 1 | 2, 0 | 1>, false>>;
type _03e = Expect<Equal<IsExhaustive<never, never>, true>>;

// 4. Construct the maintenance report: exact missing members plus proof status.
export type ExhaustivenessReport<
  Union,
  Handled,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    ExhaustivenessReport<"red" | "green" | "blue", "red" | "green">,
    { readonly missing: "blue"; readonly exhaustive: false }
  >
>;
type _04b = Expect<
  Equal<
    ExhaustivenessReport<boolean, true | false>,
    { readonly missing: never; readonly exhaustive: true }
  >
>;
type _04c = Expect<
  Equal<
    ExhaustivenessReport<0 | 1 | 2, 0>,
    { readonly missing: 1 | 2; readonly exhaustive: false }
  >
>;
type _04d = Expect<
  Equal<
    ExhaustivenessReport<never, never>,
    { readonly missing: never; readonly exhaustive: true }
  >
>;

// 5. Build each handled member branch followed by the default remainder.
export type MemberCaseBranches<
  Union,
  Handled extends readonly unknown[],
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    MemberCaseBranches<"red" | "green" | "blue", ["red", "green"]>,
    ["red", "green", "blue"]
  >
>;
type _05b = Expect<
  Equal<MemberCaseBranches<boolean, [true, false]>, [true, false, never]>
>;
type _05c = Expect<
  Equal<MemberCaseBranches<0 | 1 | 2, [0, 1]>, [0, 1, 2]>
>;
type _05d = Expect<
  Equal<MemberCaseBranches<"a" | "b", []>, ["a" | "b"]>
>;

// ─── Discriminator and tuple exhaustiveness ────────────────────────────────

// 6. Consume object-union tags and return the default-branch remainder.
export type RemainingByTags<
  Union,
  TagKey extends PropertyKey,
  Tags extends readonly unknown[],
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    RemainingByTags<GivenShape, "kind", ["circle", "square", "rectangle"]>,
    never
  >
>;
type _06b = Expect<
  Equal<
    RemainingByTags<GivenState, "state", ["idle", "loading", "ready"]>,
    Extract<GivenState, { state: "failed" }>
  >
>;
type _06c = Expect<
  Equal<
    RemainingByTags<GivenEvent, "type", ["open", "close", "tick"]>,
    never
  >
>;
type _06d = Expect<
  Equal<RemainingByTags<GivenShape, "kind", []>, GivenShape>
>;
type _06e = Expect<
  Equal<
    RemainingByTags<GivenOpen, "kind", ["fixed"]>,
    Extract<GivenOpen, { raw: unknown }>
  >
>;

// 7. Prove tag exhaustiveness by checking that no object member remains.
export type IsTagExhaustive<
  Union,
  TagKey extends PropertyKey,
  Tags extends readonly unknown[],
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    IsTagExhaustive<GivenShape, "kind", ["circle", "square", "rectangle"]>,
    true
  >
>;
type _07b = Expect<
  Equal<
    IsTagExhaustive<GivenState, "state", ["idle", "loading", "ready"]>,
    false
  >
>;
type _07c = Expect<
  Equal<IsTagExhaustive<GivenOpen, "kind", ["fixed"]>, false>
>;
type _07d = Expect<
  Equal<IsTagExhaustive<never, "kind", []>, true>
>;

// 8. Require one readonly handler for every property-key tag in the union.
export type TagHandlerTable<
  Union,
  TagKey extends PropertyKey,
  Result,
> = TODO; // TODO(koan)

type GivenShapeHandlers = TagHandlerTable<GivenShape, "kind", number>;
type _08a = Expect<
  Equal<keyof GivenShapeHandlers, "circle" | "square" | "rectangle">
>;
type _08b = Expect<
  Equal<
    Parameters<GivenShapeHandlers["circle"]>,
    [value: Extract<GivenShape, { kind: "circle" }>]
  >
>;
type _08c = Expect<
  Equal<ReturnType<GivenShapeHandlers["rectangle"]>, number>
>;
type _08d = Expect<
  Equal<
    keyof TagHandlerTable<
      | { readonly code: 1; readonly one: string }
      | { readonly code: 2; readonly two: number },
      "code",
      string
    >,
    1 | 2
  >
>;
type _08e = Expect<
  Equal<keyof TagHandlerTable<never, "kind", string>, never>
>;

// 9. Consume tuple heads and return the default-branch tuple remainder.
export type RemainingTupleHeads<
  Union,
  Heads extends readonly unknown[],
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    RemainingTupleHeads<GivenCommand, ["push", "pop", "size"]>,
    never
  >
>;
type _09b = Expect<
  Equal<
    RemainingTupleHeads<GivenCommand, ["push", "pop"]>,
    readonly ["size"]
  >
>;
type _09c = Expect<
  Equal<
    RemainingTupleHeads<
      readonly ["left", number] | readonly ["right", string],
      ["left"]
    >,
    readonly ["right", string]
  >
>;
type _09d = Expect<
  Equal<RemainingTupleHeads<GivenCommand, []>, GivenCommand>
>;

// 10. Classify whether a proposed tag domain is closed enough for a proof.
export type ExhaustiveDomainKind<
  Union,
  TagKey extends PropertyKey,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<ExhaustiveDomainKind<GivenShape, "kind">, "closed">
>;
type _10b = Expect<
  Equal<
    ExhaustiveDomainKind<
      { readonly ok: true } | { readonly ok: false },
      "ok"
    >,
    "closed"
  >
>;
type _10c = Expect<
  Equal<ExhaustiveDomainKind<GivenOpen, "kind">, "open">
>;
type _10d = Expect<
  Equal<ExhaustiveDomainKind<GivenOptional, "kind">, "optional">
>;
type _10e = Expect<
  Equal<ExhaustiveDomainKind<never, "kind">, "empty">
>;

// 11. Include a catch-all result only when a real remainder can reach it.
export type DefaultBranchResult<
  Remainder,
  HandledResult,
  FallbackResult,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<DefaultBranchResult<never, string, "fallback">, string>
>;
type _11b = Expect<
  Equal<
    DefaultBranchResult<Extract<GivenState, { state: "failed" }>, string, "other">,
    string
  >
>; // The literal fallback is absorbed by broad string.
type _11c = Expect<
  Equal<DefaultBranchResult<"blue", 1 | 2, 0>, 0 | 1 | 2>
>;
type _11d = Expect<
  Equal<DefaultBranchResult<unknown, "handled", "default">, "handled" | "default">
>;
type _11e = Expect<
  Equal<DefaultBranchResult<never, never, never>, never>
>;

// ─── Assert-never and never-returning APIs ─────────────────────────────────

// 12. Build the assertion helper's complete call signature.
export type AssertNeverSignature =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<Parameters<AssertNeverSignature>, [value: never]>
>;
type _12c = Expect<
  Equal<AssertNeverSignature, (value: never) => never>
>;

// 13. Report whether a value is proven impossible enough for assertNever.
export type CanAssertNever<Value> =
  TODO; // TODO(koan)

type _13a = Expect<Equal<CanAssertNever<never>, true>>;
type _13b = Expect<Equal<CanAssertNever<string>, false>>;
type _13c = Expect<Equal<CanAssertNever<unknown>, false>>;
type _13d = Expect<Equal<CanAssertNever<any>, false>>;
type _13e = Expect<Equal<CanAssertNever<never | string>, false>>;

// 14. Construct a never-returning function with an arbitrary parameter tuple.
export type NeverFunction<Args extends readonly unknown[]> =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<NeverFunction<[message: string]>, (message: string) => never>
>;
type _14b = Expect<
  Equal<NeverFunction<[]>, () => never>
>;
type _14c = Expect<
  Equal<
    NeverFunction<[code: number, cause?: Error]>,
    (code: number, cause?: Error) => never
  >
>;
type _14d = Expect<
  Equal<ReturnType<NeverFunction<[unknown]>>, never>
>;

// ─── Never algebra and conditional behavior ───────────────────────────────

// 15. Pair never's union identity with its intersection absorption.
export type NeverAlgebra<Value> =
  TODO; // TODO(koan)

type _15a = Expect<Equal<NeverAlgebra<string>, [string, never]>>;
type _15b = Expect<
  Equal<NeverAlgebra<number | boolean>, [number | boolean, never]>
>;
type _15c = Expect<
  Equal<NeverAlgebra<{ readonly id: string }>, [{ readonly id: string }, never]>
>;
type _15d = Expect<Equal<NeverAlgebra<unknown>, [unknown, never]>>;
type _15e = Expect<Equal<NeverAlgebra<never>, [never, never]>>;

// 16. Construct bottom-type subtype facts in both directions.
export type NeverRelations<Value> =
  TODO; // TODO(koan)

type _16a = Expect<Equal<NeverRelations<string>, [true, false]>>;
type _16b = Expect<Equal<NeverRelations<unknown>, [true, false]>>;
type _16c = Expect<Equal<NeverRelations<never>, [true, true]>>;
type _16d = Expect<
  Equal<NeverRelations<{ readonly id: string }>, [true, false]>
>;

// 17. Construct the key space TypeScript assigns to never.
export type NeverKeySpace =
  TODO; // TODO(koan)

type _17a = Expect<Equal<NeverKeySpace, string | number | symbol>>;
type _17b = Expect<Equal<Extract<NeverKeySpace, string>, string>>;
type _17c = Expect<Equal<Exclude<NeverKeySpace, symbol>, string | number>>;

// 18. Build mutable, readonly, and element views of a never collection.
export type NeverCollectionProfile =
  TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    NeverCollectionProfile,
    [mutable: never[], readonlyValues: readonly never[], element: never]
  >
>;
type _18b = Expect<Equal<NeverCollectionProfile[0][number], never>>;
type _18c = Expect<Equal<NeverCollectionProfile[1][number], never>>;

// 19. Compare distributive and tuple-wrapped conditional evaluation.
export type ConditionalProfile<
  Value,
  Constraint,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<ConditionalProfile<never, string>, [never, "match"]>
>;
type _19b = Expect<
  Equal<
    ConditionalProfile<string | number, string>,
    ["match" | "other", "other"]
  >
>;
type _19c = Expect<
  Equal<ConditionalProfile<string, unknown>, ["match", "match"]>
>;
type _19d = Expect<
  Equal<ConditionalProfile<unknown, string>, ["other", "other"]>
>;
type _19e = Expect<
  Equal<ConditionalProfile<never, never>, [never, "match"]>
>;

// 20. Collect branch return types; never-returning branches disappear naturally.
export type ReturnUnion<Results extends readonly unknown[]> =
  TODO; // TODO(koan)

type _20a = Expect<
  Equal<ReturnUnion<[string, never, number]>, string | number>
>;
type _20b = Expect<
  Equal<ReturnUnion<["zero", "one", never]>, "zero" | "one">
>;
type _20c = Expect<
  Equal<ReturnUnion<[undefined, never, string]>, string | undefined>
>;
type _20d = Expect<Equal<ReturnUnion<[never, never]>, never>>;
type _20e = Expect<Equal<ReturnUnion<[]>, never>>;

// ─── Unsafe boundaries and non-concrete domains ────────────────────────────

// 21. Model a double assertion that preserves the declared facade or fabricates never.
export type AssertionBoundary<
  Declared,
  Assertion extends "declared" | "never",
> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<AssertionBoundary<GivenState, "declared">, GivenState>
>;
type _21b = Expect<
  Equal<AssertionBoundary<GivenState, "never">, never>
>;
type _21c = Expect<
  Equal<AssertionBoundary<{ readonly state: "future" }, "declared">, { readonly state: "future" }>
>;
type _21d = Expect<
  Equal<AssertionBoundary<unknown, "never">, never>
>;

// 22. Preserve a generic subtype when a concrete-union proof cannot consume it.
export type GenericRemainder<
  Value extends Constraint,
  Constraint,
> = TODO; // TODO(koan)

type _22a = Expect<
  Equal<GenericRemainder<GivenState, GivenState>, GivenState>
>;
type _22b = Expect<
  Equal<
    GenericRemainder<
      GivenState & { readonly traceId: string },
      GivenState
    >,
    GivenState & { readonly traceId: string }
  >
>;
type _22c = Expect<
  Equal<GenericRemainder<"a", "a" | "b">, "a">
>;
type _22d = Expect<
  Equal<GenericRemainder<never, GivenState>, never>
>;

// 23. Classify the missing-case remainder without letting any look exhaustive.
export type RemainderKind<
  Union,
  Handled,
> = TODO; // TODO(koan)

type _23a = Expect<
  Equal<
    RemainderKind<"red" | "green" | "blue", "red" | "green" | "blue">,
    "never"
  >
>;
type _23b = Expect<
  Equal<
    RemainderKind<"red" | "green" | "blue", "red" | "green">,
    "ordinary"
  >
>;
type _23c = Expect<Equal<RemainderKind<any, "handled">, "any">>;
type _23d = Expect<Equal<RemainderKind<unknown, string>, "unknown">>;
type _23e = Expect<Equal<RemainderKind<never, string>, "never">>;
