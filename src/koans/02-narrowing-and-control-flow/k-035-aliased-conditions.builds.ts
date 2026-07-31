import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-035: aliased conditions — constructions
 * =============================================================================
 *
 * These constructions replay immutable Boolean evidence into true and false
 * branches, combine aliased facts, preserve discriminant correlation, and make
 * the stability and finite-depth rules explicit. They also model the forms and
 * writes that block replay. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type GivenPositive<Source, Target> =
  0 extends 1 & Source
    ? Target
    : unknown extends Source
      ? Target
      : Source extends unknown
        ? Source extends Target
          ? Source
          : Target extends Source
            ? Target
            : never
        : never;

type GivenNegative<Source, Target> =
  0 extends 1 & Source
    ? Source
    : unknown extends Source
      ? Source
      : Exclude<Source, Target>;

type ReplayFactors = {
  readonly readonlyAlias: boolean;
  readonly stableSource: boolean;
  readonly transparentExpression: boolean;
  readonly withinDepth: boolean;
};

type GivenReplayable<Factors extends ReplayFactors> =
  Factors extends {
    readonly readonlyAlias: true;
    readonly stableSource: true;
    readonly transparentExpression: true;
    readonly withinDepth: true;
  }
    ? true
    : false;

type GivenFactors = {
  readonly readonlyAlias: true;
  readonly stableSource: true;
  readonly transparentExpression: true;
  readonly withinDepth: true;
};

type AliasDepth = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type AliasForm =
  | "const-inferred"
  | "let"
  | "annotated"
  | "boolean-coercion"
  | "opaque-helper";

type GivenState =
  | { readonly state: "idle" }
  | { readonly state: "ready"; readonly data: string }
  | { readonly state: "failed"; readonly error: Error };

type GivenTuple =
  | readonly ["text", string]
  | readonly ["count", number]
  | readonly ["flag", boolean];

// ─── Direct aliases and Boolean composition ────────────────────────────────

// 1. Replay a guard alias into either branch of a still-stable source.
export type AliasGuardBranch<
  Source,
  Target extends Source,
  WhenTrue extends boolean,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<AliasGuardBranch<string | number, string, true>, string>
>;
type _01b = Expect<
  Equal<AliasGuardBranch<string | number, string, false>, number>
>;
type _01c = Expect<
  Equal<AliasGuardBranch<unknown, Date, true>, Date>
>;
type _01d = Expect<
  Equal<AliasGuardBranch<unknown, any[], true>, any[]>
>;
type _01e = Expect<
  Equal<AliasGuardBranch<never, never, false>, never>
>;

// 2. Narrow the immutable Boolean alias itself inside each branch.
export type AliasBooleanState<WhenTrue extends boolean> = TODO; // TODO(koan)

type _02a = Expect<Equal<AliasBooleanState<true>, true>>;
type _02b = Expect<Equal<AliasBooleanState<false>, false>>;
type _02c = Expect<Equal<AliasBooleanState<boolean>, boolean>>;
type _02d = Expect<Equal<AliasBooleanState<never>, never>>;

// 3. Replay a loose-nullish comparison into present and absent branches.
export type NullishAliasBranch<
  Source,
  Present extends boolean,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<NullishAliasBranch<string | null | undefined, true>, string>
>;
type _03b = Expect<
  Equal<
    NullishAliasBranch<string | null | undefined, false>,
    null | undefined
  >
>;
type _03c = Expect<
  Equal<NullishAliasBranch<unknown, true>, {}>
>;
type _03d = Expect<
  Equal<NullishAliasBranch<never, false>, never>
>;

// 4. Replay truthiness for an object-or-null source.
export type ObjectTruthinessBranch<
  Source extends object | null,
  Truthy extends boolean,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<ObjectTruthinessBranch<object | null, true>, object>
>;
type _04b = Expect<
  Equal<ObjectTruthinessBranch<object | null, false>, null>
>;
type _04c = Expect<
  Equal<
    ObjectTruthinessBranch<(() => void) | null, true>,
    () => void
  >
>;
type _04d = Expect<
  Equal<ObjectTruthinessBranch<null, true>, never>
>;

// 5. Select the side of a required-property `in` alias.
export type InAliasBranch<
  Union,
  Key extends PropertyKey,
  HasKey extends boolean,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    InAliasBranch<{ id: string } | { name: string }, "id", true>,
    { id: string }
  >
>;
type _05b = Expect<
  Equal<
    InAliasBranch<{ id: string } | { name: string }, "id", false>,
    { name: string }
  >
>;
type _05c = Expect<
  Equal<
    InAliasBranch<
      { x: number; y: number } | { name: string } | { id: number },
      "x",
      true
    >,
    { x: number; y: number }
  >
>;
type _05d = Expect<
  Equal<InAliasBranch<never, "id", true>, never>
>;

// 6. Combine two positive guard aliases with && and select either branch.
export type CompoundAndBranch<
  Source,
  Left extends Source,
  Right extends Source,
  WhenTrue extends boolean,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    CompoundAndBranch<
      string | number | null,
      string | number,
      string,
      true
    >,
    string
  >
>;
type _06b = Expect<
  Equal<
    CompoundAndBranch<
      string | number | null,
      string | number,
      string,
      false
    >,
    number | null
  >
>;
type _06c = Expect<
  Equal<
    CompoundAndBranch<
      { readonly id: string } | { readonly name: string } | null,
      { readonly id: string } | { readonly name: string },
      { readonly id: string },
      true
    >,
    { readonly id: string }
  >
>;
type _06d = Expect<
  Equal<CompoundAndBranch<never, never, never, true>, never>
>;

// 7. Combine two guard aliases with || and select either branch.
export type CompoundOrBranch<
  Source,
  Left extends Source,
  Right extends Source,
  WhenTrue extends boolean,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    CompoundOrBranch<string | number | boolean, string, number, true>,
    string | number
  >
>;
type _07b = Expect<
  Equal<
    CompoundOrBranch<string | number | boolean, string, number, false>,
    boolean
  >
>;
type _07c = Expect<
  Equal<
    CompoundOrBranch<
      "idle" | "ready" | "failed",
      "ready",
      "failed",
      true
    >,
    "ready" | "failed"
  >
>;
type _07d = Expect<
  Equal<CompoundOrBranch<never, never, never, false>, never>
>;

// 8. Replay a negated guard alias, swapping its positive and negative facts.
export type NegatedAliasBranch<
  Source,
  Target extends Source,
  WhenTrue extends boolean,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<NegatedAliasBranch<string | number, string, true>, number>
>;
type _08b = Expect<
  Equal<NegatedAliasBranch<string | number, string, false>, string>
>;
type _08c = Expect<
  Equal<
    NegatedAliasBranch<string | number | boolean, string | number, true>,
    boolean
  >
>;
type _08d = Expect<
  Equal<NegatedAliasBranch<unknown, string, false>, string>
>;

// 9. Construct the branch where none of a union of aliased facts holds.
export type NeitherAliasBranch<Source, Excluded extends Source> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    NeitherAliasBranch<string | number | null | undefined, string | number>,
    null | undefined
  >
>;
type _09b = Expect<
  Equal<
    NeitherAliasBranch<"idle" | "ready" | "failed", "ready" | "failed">,
    "idle"
  >
>;
type _09c = Expect<
  Equal<NeitherAliasBranch<string | number, string | number>, never>
>;
type _09d = Expect<Equal<NeitherAliasBranch<never, never>, never>>;

// ─── Correlated discriminants and stable locations ─────────────────────────

// 10. Replay one object-discriminant equality without losing member correlation.
export type DiscriminantAliasBranch<
  Union,
  Key extends keyof Union,
  Tag,
  WhenTrue extends boolean,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    DiscriminantAliasBranch<GivenState, "state", "ready", true>,
    { readonly state: "ready"; readonly data: string }
  >
>;
type _10b = Expect<
  Equal<
    DiscriminantAliasBranch<GivenState, "state", "ready", false>,
    | { readonly state: "idle" }
    | { readonly state: "failed"; readonly error: Error }
  >
>;
type _10c = Expect<
  Equal<
    DiscriminantAliasBranch<GivenState, "state", "failed", true>,
    { readonly state: "failed"; readonly error: Error }
  >
>;
type _10d = Expect<
  Equal<
    DiscriminantAliasBranch<GivenState, "state", "missing", true>,
    never
  >
>;

// 11. Replay a disjunction of discriminant aliases as a selected member union.
export type DiscriminantAliasUnion<
  Union,
  Key extends keyof Union,
  Tags,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    DiscriminantAliasUnion<GivenState, "state", "ready" | "failed">,
    | { readonly state: "ready"; readonly data: string }
    | { readonly state: "failed"; readonly error: Error }
  >
>;
type _11b = Expect<
  Equal<
    DiscriminantAliasUnion<GivenState, "state", "idle">,
    { readonly state: "idle" }
  >
>;
type _11c = Expect<
  Equal<
    DiscriminantAliasUnion<GivenState, "state", "idle" | "missing">,
    { readonly state: "idle" }
  >
>;
type _11d = Expect<
  Equal<DiscriminantAliasUnion<never, never, "ready">, never>
>;

// 12. Replay a tuple-discriminant equality and preserve its correlated payload.
export type TupleAliasBranch<
  Union extends readonly [PropertyKey, unknown],
  Tag extends PropertyKey,
  WhenTrue extends boolean,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    TupleAliasBranch<GivenTuple, "text", true>,
    readonly ["text", string]
  >
>;
type _12b = Expect<
  Equal<
    TupleAliasBranch<GivenTuple, "text", false>,
    readonly ["count", number] | readonly ["flag", boolean]
  >
>;
type _12c = Expect<
  Equal<
    TupleAliasBranch<GivenTuple, "count", true>[1],
    number
  >
>;
type _12d = Expect<
  Equal<TupleAliasBranch<GivenTuple, "missing", true>, never>
>;

// 13. Pair a non-null container with its defined optional property value.
export type StablePropertyAlias<
  Container,
  Property,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    StablePropertyAlias<{ name?: string } | null, string | undefined>,
    [container: { name?: string }, property: string]
  >
>;
type _13b = Expect<
  Equal<
    StablePropertyAlias<
      { readonly meta?: { readonly id: number } } | undefined,
      { readonly id: number } | undefined
    >,
    [
      container: { readonly meta?: { readonly id: number } },
      property: { readonly id: number },
    ]
  >
>;
type _13c = Expect<
  Equal<
    StablePropertyAlias<object | null, undefined>,
    [container: object, property: never]
  >
>;
type _13d = Expect<
  Equal<
    StablePropertyAlias<never, never>,
    [container: never, property: never]
  >
>;

// 14. Preserve an indexed snapshot's own refinement independently of its array.
export type IndexedSnapshotAlias<
  Element,
  Target extends Element,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    IndexedSnapshotAlias<unknown, string>,
    [snapshot: string, sourceElement: unknown]
  >
>;
type _14b = Expect<
  Equal<
    IndexedSnapshotAlias<string | number, number>,
    [snapshot: number, sourceElement: string | number | undefined]
  >
>;
type _14c = Expect<
  Equal<
    IndexedSnapshotAlias<{ readonly id: 1 } | null, { readonly id: 1 }>,
    [snapshot: { readonly id: 1 }, sourceElement: { readonly id: 1 } | null | undefined]
  >
>;
type _14d = Expect<
  Equal<
    IndexedSnapshotAlias<never, never>,
    [snapshot: never, sourceElement: undefined]
  >
>;

// 15. Partition a collection using the true and false sides of one guard alias.
export type AliasPartition<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    AliasPartition<string | number, string>,
    [accepted: string[], rejected: number[]]
  >
>;
type _15b = Expect<
  Equal<
    AliasPartition<string | number | boolean, string | boolean>,
    [accepted: Array<string | boolean>, rejected: number[]]
  >
>;
type _15c = Expect<
  Equal<
    AliasPartition<unknown, Date>,
    [accepted: Date[], rejected: unknown[]]
  >
>;
type _15d = Expect<
  Equal<
    AliasPartition<null | undefined, null>,
    [accepted: null[], rejected: undefined[]]
  >
>;

// ─── Replay requirements, depth, and invalidation ──────────────────────────

// 16. Decide whether all requirements for replaying an alias still hold.
export type AliasReplayEligible<Factors extends ReplayFactors> = TODO; // TODO(koan)

type _16a = Expect<Equal<AliasReplayEligible<GivenFactors>, true>>;
type _16b = Expect<
  Equal<
    AliasReplayEligible<
      Omit<GivenFactors, "readonlyAlias"> & { readonly readonlyAlias: false }
    >,
    false
  >
>;
type _16c = Expect<
  Equal<
    AliasReplayEligible<
      Omit<GivenFactors, "stableSource"> & { readonly stableSource: false }
    >,
    false
  >
>;
type _16d = Expect<
  Equal<
    AliasReplayEligible<
      Omit<GivenFactors, "transparentExpression"> & {
        readonly transparentExpression: false;
      }
    >,
    false
  >
>;
type _16e = Expect<
  Equal<
    AliasReplayEligible<
      Omit<GivenFactors, "withinDepth"> & { readonly withinDepth: false }
    >,
    false
  >
>;

// 17. Construct the exact union of reasons alias replay is blocked.
export type AliasReplayBlockers<Factors extends ReplayFactors> = TODO; // TODO(koan)

type _17a = Expect<Equal<AliasReplayBlockers<GivenFactors>, never>>;
type _17b = Expect<
  Equal<
    AliasReplayBlockers<
      Omit<GivenFactors, "readonlyAlias"> & { readonly readonlyAlias: false }
    >,
    "mutable-alias"
  >
>;
type _17c = Expect<
  Equal<
    AliasReplayBlockers<
      Omit<GivenFactors, "stableSource" | "transparentExpression"> & {
        readonly stableSource: false;
        readonly transparentExpression: false;
      }
    >,
    "source-write" | "opaque-expression"
  >
>;
type _17d = Expect<
  Equal<
    AliasReplayBlockers<{
      readonly readonlyAlias: false;
      readonly stableSource: false;
      readonly transparentExpression: false;
      readonly withinDepth: false;
    }>,
    "mutable-alias" | "source-write" | "opaque-expression" | "depth-limit"
  >
>;

// 18. Narrow only when every alias replay requirement is satisfied.
export type ReplayGuardedBranch<
  Source,
  Target extends Source,
  Factors extends ReplayFactors,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<ReplayGuardedBranch<string | number, string, GivenFactors>, string>
>;
type _18b = Expect<
  Equal<
    ReplayGuardedBranch<
      string | number,
      string,
      Omit<GivenFactors, "stableSource"> & { readonly stableSource: false }
    >,
    string | number
  >
>;
type _18c = Expect<
  Equal<
    ReplayGuardedBranch<
      unknown,
      Date,
      Omit<GivenFactors, "transparentExpression"> & {
        readonly transparentExpression: false;
      }
    >,
    unknown
  >
>;
type _18d = Expect<
  Equal<ReplayGuardedBranch<never, never, GivenFactors>, never>
>;

// Given machinery: the compiler's measured replay-depth budget.
type GivenDepthReplayable<Depth extends AliasDepth> =
  Depth extends 0 | 1 | 2 | 3 | 4 ? true : false;

// 19. Mark direct through four-hop aliases replayable, and deeper aliases opaque.
export type AliasDepthReplayable<Depth extends AliasDepth> =
  TODO; // TODO(koan)

type _19a = Expect<Equal<AliasDepthReplayable<0>, true>>;
type _19b = Expect<Equal<AliasDepthReplayable<4>, true>>;
type _19c = Expect<Equal<AliasDepthReplayable<5>, false>>;
type _19d = Expect<Equal<AliasDepthReplayable<6>, false>>;
type _19e = Expect<Equal<AliasDepthReplayable<4 | 5>, boolean>>;

// 20. Apply a guard target only while its alias chain remains within the limit.
export type ReplayAtDepth<
  Source,
  Target extends Source,
  Depth extends AliasDepth,
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<ReplayAtDepth<string | number, string, 0>, string>
>;
type _20b = Expect<
  Equal<ReplayAtDepth<string | number, string, 4>, string>
>;
type _20c = Expect<
  Equal<ReplayAtDepth<string | number, string, 5>, string | number>
>;
type _20d = Expect<
  Equal<ReplayAtDepth<unknown, Date, 6>, unknown>
>;

// 21. Separate a reassigned current variable from an immutable guarded snapshot.
export type SnapshotAfterSourceWrite<
  Original,
  Assigned,
  Target extends Original,
> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    SnapshotAfterSourceWrite<string | number, number, string>,
    [current: number, snapshotWhenTrue: string, snapshotAfter: string | number]
  >
>;
type _21b = Expect<
  Equal<
    SnapshotAfterSourceWrite<object | null, null, object>,
    [current: null, snapshotWhenTrue: object, snapshotAfter: object | null]
  >
>;
type _21c = Expect<
  Equal<
    SnapshotAfterSourceWrite<unknown, 2, Date>,
    [current: 2, snapshotWhenTrue: Date, snapshotAfter: unknown]
  >
>;
type _21d = Expect<
  Equal<
    SnapshotAfterSourceWrite<never, never, never>,
    [current: never, snapshotWhenTrue: never, snapshotAfter: never]
  >
>;

// 22. Pair a property before its write with the assigned type after the write.
export type PropertyWriteProfile<
  Property,
  Assigned,
  Target extends Property,
> = TODO; // TODO(koan)

type _22a = Expect<
  Equal<
    PropertyWriteProfile<string | number, string | number, string>,
    [beforeWrite: string, afterWrite: string | number]
  >
>;
type _22b = Expect<
  Equal<
    PropertyWriteProfile<object | null, null, object>,
    [beforeWrite: object, afterWrite: null]
  >
>;
type _22c = Expect<
  Equal<
    PropertyWriteProfile<unknown, boolean, Date>,
    [beforeWrite: Date, afterWrite: boolean]
  >
>;
type _22d = Expect<
  Equal<
    PropertyWriteProfile<never, never, never>,
    [beforeWrite: never, afterWrite: never]
  >
>;

// 23. Decide whether an alias declaration form preserves guard provenance.
export type AliasFormReplayable<Form extends AliasForm> = TODO; // TODO(koan)

type _23a = Expect<Equal<AliasFormReplayable<"const-inferred">, true>>;
type _23b = Expect<Equal<AliasFormReplayable<"let">, false>>;
type _23c = Expect<Equal<AliasFormReplayable<"annotated">, false>>;
type _23d = Expect<Equal<AliasFormReplayable<"boolean-coercion">, false>>;
type _23e = Expect<Equal<AliasFormReplayable<"opaque-helper">, false>>;

// 24. Narrow through an inferred const alias, but not through opaque forms.
export type AliasFormBranch<
  Source,
  Target extends Source,
  Form extends AliasForm,
> = TODO; // TODO(koan)

type _24a = Expect<
  Equal<AliasFormBranch<string | number, string, "const-inferred">, string>
>;
type _24b = Expect<
  Equal<AliasFormBranch<string | number, string, "let">, string | number>
>;
type _24c = Expect<
  Equal<AliasFormBranch<string | number, string, "annotated">, string | number>
>;
type _24d = Expect<
  Equal<
    AliasFormBranch<unknown, Date, "boolean-coercion">,
    unknown
  >
>;
type _24e = Expect<
  Equal<AliasFormBranch<unknown, any[], "opaque-helper">, unknown>
>;

// 25. Classify special input kinds in the source, true branch, and false branch.
export type SpecialAliasProfile<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _25a = Expect<
  Equal<
    SpecialAliasProfile<unknown, string>,
    [source: "unknown", whenTrue: "ordinary", whenFalse: "unknown"]
  >
>;
type _25b = Expect<
  Equal<
    SpecialAliasProfile<any, string>,
    [source: "any", whenTrue: "ordinary", whenFalse: "any"]
  >
>;
type _25c = Expect<
  Equal<
    SpecialAliasProfile<never, never>,
    [source: "never", whenTrue: "never", whenFalse: "never"]
  >
>;
type _25d = Expect<
  Equal<
    SpecialAliasProfile<string | number, string>,
    [source: "ordinary", whenTrue: "ordinary", whenFalse: "ordinary"]
  >
>;
