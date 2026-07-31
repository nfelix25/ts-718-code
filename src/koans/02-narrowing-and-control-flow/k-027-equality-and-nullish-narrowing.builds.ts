import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-027: equality and nullish narrowing — constructions
 * =============================================================================
 *
 * These constructions select and exclude literals, remove nullish members,
 * compute equality overlap between two operands, and carry comparisons through
 * optional property paths. They distinguish strict and loose null checks,
 * preserve valid falsy data, model variable and reference overlap, keep
 * Object.is non-narrowing, and expose generic and special-type boundaries.
 * Replace each `TODO` with a type that satisfies the assertions directly below
 * it.
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

type GivenLiteralEqual<Source, Target> =
  0 extends 1 & Source
    ? Source
    : PairOverlap<Source, Target>;

type GivenLiteralNotEqual<Source, Target> =
  0 extends 1 & Source
    ? Source
    : Source extends Target ? never : Source;

type GivenLooseNullishTrue<Source> =
  0 extends 1 & Source
    ? Source
    : unknown extends Source
      ? null | undefined
      : Extract<Source, null | undefined>;

type GivenLooseNullishFalse<Source> =
  0 extends 1 & Source
    ? Source
    : unknown extends Source
      ? {}
      : Exclude<Source, null | undefined>;

type GivenFalsyLiteral = false | 0 | 0n | "" | null | undefined;

type FalsyMember<Member> =
  Member extends GivenFalsyLiteral
    ? Member
    : string extends Member
      ? Member
      : number extends Member
        ? Member
        : bigint extends Member
          ? Member
          : never;

type GivenTruthyPart<Value> =
  0 extends 1 & Value
    ? Value
    : [Value] extends [never]
      ? never
      : unknown extends Value
        ? {}
        : Value extends unknown
          ? Value extends GivenFalsyLiteral ? never : Value
          : never;

type GivenFalsyPart<Value> =
  0 extends 1 & Value
    ? Value
    : [Value] extends [never]
      ? never
      : unknown extends Value
        ? Value
        : Value extends unknown ? FalsyMember<Value> : never;

type GivenNullishFallback<Source, Fallback> =
  0 extends 1 & Source
    ? Source
    : GivenLooseNullishFalse<Source>
      | ([GivenLooseNullishTrue<Source>] extends [never] ? never : Fallback);

type GivenLogicalFallback<Source, Fallback> =
  0 extends 1 & Source
    ? Source
    : unknown extends Source
      ? {}
      : GivenTruthyPart<Source>
        | ([GivenFalsyPart<Source>] extends [never] ? never : Fallback);

type OptionalRead<Member, Key extends PropertyKey> =
  Member extends null | undefined
    ? undefined
    : Key extends keyof Member ? Member[Key] : undefined;

type GivenStatus = "idle" | "running" | "done";

type GivenResult =
  | { readonly kind: "ok"; readonly value: number }
  | { readonly kind: "error"; readonly error: Error }
  | null
  | undefined;

type GivenReferenceA = { readonly kind: "a"; readonly value: number };
type GivenReferenceB = { readonly kind: "b"; readonly value: string };
type GivenIdReference = { readonly id: number };

type LiteralCase = readonly [target: unknown, result: unknown];

// ─── Literal equality, inequality, and chains ──────────────────────────────

// 1. Keep the mutually compatible portion selected by one literal equality.
export type LiteralEqual<
  Source,
  Target,
> = TODO; // TODO(koan)

type _01a = Expect<Equal<LiteralEqual<GivenStatus, "idle">, "idle">>;
type _01b = Expect<Equal<LiteralEqual<0 | 1 | 2 | 3, 0>, 0>>;
type _01c = Expect<Equal<LiteralEqual<boolean | null, true>, true>>;
type _01d = Expect<Equal<LiteralEqual<string, "ready">, "ready">>;
type _01e = Expect<Equal<LiteralEqual<unknown, typeof Symbol.iterator>, typeof Symbol.iterator>>;

// 2. Remove only source members fully represented by the comparison target.
export type LiteralNotEqual<
  Source,
  Target,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<LiteralNotEqual<GivenStatus, "idle">, "running" | "done">
>;
type _02b = Expect<Equal<LiteralNotEqual<0 | 1 | 2 | 3, 3>, 0 | 1 | 2>>;
type _02c = Expect<Equal<LiteralNotEqual<boolean | null, true>, false | null>>;
type _02d = Expect<Equal<LiteralNotEqual<string, "ready">, string>>;
type _02e = Expect<Equal<LiteralNotEqual<never, "ready">, never>>;

// 3. Construct equal and unequal paths together.
export type LiteralEqualityPartition<
  Source,
  Target,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    LiteralEqualityPartition<"draft" | "sent" | "failed", "sent">,
    ["sent", "draft" | "failed"]
  >
>;
type _03b = Expect<
  Equal<LiteralEqualityPartition<0 | 1 | undefined, 0>, [0, 1 | undefined]>
>;
type _03c = Expect<
  Equal<LiteralEqualityPartition<string | null, null>, [null, string]>
>;
type _03d = Expect<
  Equal<LiteralEqualityPartition<unknown, "ready">, ["ready", unknown]>
>;
type _03e = Expect<
  Equal<LiteralEqualityPartition<never, "ready">, [never, never]>
>;

// 4. Accumulate failed literal comparisons as early-return exclusions.
export type RemainingAfterLiterals<
  Source,
  Targets extends readonly unknown[],
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<RemainingAfterLiterals<GivenStatus, ["idle"]>, "running" | "done">
>;
type _04b = Expect<
  Equal<RemainingAfterLiterals<GivenStatus, ["idle", "running"]>, "done">
>;
type _04c = Expect<
  Equal<RemainingAfterLiterals<0 | 1 | 2 | 3, [0, 3]>, 1 | 2>
>;
type _04d = Expect<Equal<RemainingAfterLiterals<GivenStatus, []>, GivenStatus>>;
type _04e = Expect<
  Equal<RemainingAfterLiterals<string, ["idle", "running"]>, string>
>; // Broad strings cannot spell either negative literal exclusion.

// 5. Dispatch through ordered literal/result pairs, then use the fallback.
export type LiteralDispatch<
  Source,
  Cases extends readonly LiteralCase[],
  Fallback,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    LiteralDispatch<
      GivenStatus,
      [
        readonly ["idle", "waiting"],
        readonly ["running", "active"],
      ],
      "complete"
    >,
    "waiting" | "active" | "complete"
  >
>;
type _05b = Expect<
  Equal<
    LiteralDispatch<
      0 | 1 | 2,
      [readonly [0, "zero"], readonly [1, "one"]],
      "other"
    >,
    "zero" | "one" | "other"
  >
>;
type _05c = Expect<
  Equal<
    LiteralDispatch<"sent", [readonly ["sent", true]], false>,
    true
  >
>;
type _05d = Expect<
  Equal<LiteralDispatch<"draft" | "sent", [], "unknown">, "unknown">
>;
type _05e = Expect<
  Equal<LiteralDispatch<never, [readonly ["idle", "waiting"]], "other">, never>
>;

// ─── Strict and loose nullish checks ───────────────────────────────────────

// 6. Separate one strict nullish literal from the rest of Source.
export type StrictNullishPartition<
  Source,
  Target extends null | undefined,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    StrictNullishPartition<string | null | undefined, null>,
    [null, string | undefined]
  >
>;
type _06b = Expect<
  Equal<
    StrictNullishPartition<string | null | undefined, undefined>,
    [undefined, string | null]
  >
>;
type _06c = Expect<
  Equal<StrictNullishPartition<0 | false | null, null>, [null, 0 | false]>
>;
type _06d = Expect<
  Equal<StrictNullishPartition<unknown, null>, [null, unknown]>
>;
type _06e = Expect<
  Equal<StrictNullishPartition<never, undefined>, [never, never]>
>;

// 7. Model `== null` or `== undefined` as matching both nullish values.
export type LooseNullishPartition<Source> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    LooseNullishPartition<string | 0 | false | null | undefined>,
    [null | undefined, string | 0 | false]
  >
>;
type _07b = Expect<
  Equal<LooseNullishPartition<string | null>, [null, string]>
>;
type _07c = Expect<
  Equal<LooseNullishPartition<unknown>, [null | undefined, {}]>
>;
type _07d = Expect<
  Equal<LooseNullishPartition<{ readonly id: number }>, [never, { readonly id: number }]>
>;
type _07e = Expect<Equal<LooseNullishPartition<never>, [never, never]>>;

// 8. Keep every non-nullish member without discarding 0, false, or empty text.
export type NullishPresent<Source> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    NullishPresent<string | 0 | false | null | undefined>,
    string | 0 | false
  >
>;
type _08b = Expect<Equal<NullishPresent<"" | null>, "">>;
type _08c = Expect<Equal<NullishPresent<unknown>, {}>>;
type _08d = Expect<
  Equal<NullishPresent<readonly string[] | undefined>, readonly string[]>
>;
type _08e = Expect<Equal<NullishPresent<never>, never>>;

// 9. Replace null and undefined with a fallback while preserving all other members.
export type NullishFallback<
  Source,
  Fallback,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<NullishFallback<number | null | undefined, 10>, number>
>;
type _09b = Expect<
  Equal<
    NullishFallback<"" | 0 | false | null | undefined, "fallback">,
    "" | 0 | false | "fallback"
  >
>;
type _09c = Expect<
  Equal<NullishFallback<readonly string[] | undefined, []>, readonly string[] | []>
>;
type _09d = Expect<Equal<NullishFallback<"ready", "fallback">, "ready">>;
type _09e = Expect<Equal<NullishFallback<null, 10>, 10>>;

// 10. Show the result difference between `??` and `||` for one source.
export type FallbackComparison<
  Source,
  Fallback,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    FallbackComparison<"" | 0 | false | null | undefined, "fallback">,
    ["" | 0 | false | "fallback", "fallback"]
  >
>;
type _10b = Expect<
  Equal<
    FallbackComparison<0 | 2 | undefined, "none">,
    [0 | 2 | "none", 2 | "none"]
  >
>;
type _10c = Expect<
  Equal<
    FallbackComparison<"" | "saved" | null, "none">,
    ["" | "saved" | "none", "saved" | "none"]
  >
>;
type _10d = Expect<
  Equal<FallbackComparison<readonly [] | undefined, "none">, [readonly [] | "none", readonly [] | "none"]>
>;

// ─── Equality between two variables ───────────────────────────────────────

// 11. Compute the mutually assignable possibilities shared by both operands.
export type EqualityOverlap<Left, Right> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<EqualityOverlap<string | number, string | boolean>, string>
>;
type _11b = Expect<
  Equal<EqualityOverlap<"a" | "b" | 1, "b" | "c" | 2>, "b">
>;
type _11c = Expect<
  Equal<EqualityOverlap<string | number, unknown>, string | number>
>;
type _11d = Expect<
  Equal<
    EqualityOverlap<GivenReferenceA | GivenReferenceB, GivenReferenceA>,
    GivenReferenceA
  >
>;
type _11e = Expect<Equal<EqualityOverlap<number, string>, never>>;

// 12. Narrow both equal operands to their shared overlap.
export type EqualOperandPair<Left, Right> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<EqualOperandPair<string | number, string | boolean>, [string, string]>
>;
type _12b = Expect<
  Equal<EqualOperandPair<"a" | "b" | 1, "b" | "c" | 2>, ["b", "b"]>
>;
type _12c = Expect<
  Equal<
    EqualOperandPair<GivenIdReference | null, GivenIdReference | undefined>,
    [GivenIdReference, GivenIdReference]
  >
>;
type _12d = Expect<Equal<EqualOperandPair<symbol, symbol>, [symbol, symbol]>>;
type _12e = Expect<Equal<EqualOperandPair<number, string>, [never, never]>>;

// 13. Preserve both declared operand types on the unequal variable path.
export type UnequalOperandPair<Left, Right> =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    UnequalOperandPair<string | number, string | boolean>,
    [string | number, string | boolean]
  >
>;
type _13b = Expect<
  Equal<
    UnequalOperandPair<"a" | "b" | 1, "b" | "c" | 2>,
    ["a" | "b" | 1, "b" | "c" | 2]
  >
>;
type _13c = Expect<
  Equal<
    UnequalOperandPair<{ readonly id: number }, { readonly id: number }>,
    [{ readonly id: number }, { readonly id: number }]
  >
>; // Structurally identical objects may still be different references.
type _13d = Expect<Equal<UnequalOperandPair<never, string>, [never, string]>>;

// 14. Report whether the operands have any statically overlapping possibility.
export type EqualityPossible<Left, Right> =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<EqualityPossible<string | number, string | boolean>, true>
>;
type _14b = Expect<
  Equal<EqualityPossible<"a" | 1, "b" | 2>, false>
>;
type _14c = Expect<
  Equal<EqualityPossible<{ readonly id: number }, { readonly id: number }>, true>
>;
type _14d = Expect<Equal<EqualityPossible<symbol, symbol>, true>>;
type _14e = Expect<Equal<EqualityPossible<never, unknown>, false>>;

// ─── Optional chains and property equality ─────────────────────────────────

// 15. Retain owners whose optional-chain read can equal Target.
export type OptionalOwnerEqual<
  Source,
  Key extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<OptionalOwnerEqual<GivenResult, "kind", "ok">, Extract<GivenResult, { kind: "ok" }>>
>;
type _15b = Expect<
  Equal<OptionalOwnerEqual<GivenResult, "kind", undefined>, null | undefined>
>;
type _15c = Expect<
  Equal<
    OptionalOwnerEqual<{ readonly name?: string } | null | undefined, "name", undefined>,
    { readonly name?: string } | null | undefined
  >
>;
type _15d = Expect<
  Equal<
    OptionalOwnerEqual<{ readonly code: 200 | 404 }, "code", 200>,
    { readonly code: 200 | 404 }
  >
>;
type _15e = Expect<
  Equal<OptionalOwnerEqual<never, "kind", "ok">, never>
>;

// 16. Retain owners whose optional-chain read can differ from Target.
export type OptionalOwnerNotEqual<
  Source,
  Key extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    OptionalOwnerNotEqual<GivenResult, "kind", "ok">,
    Extract<GivenResult, { kind: "error" }> | null | undefined
  >
>;
type _16b = Expect<
  Equal<
    OptionalOwnerNotEqual<{ readonly name?: string } | null | undefined, "name", undefined>,
    { readonly name?: string }
  >
>;
type _16c = Expect<
  Equal<
    OptionalOwnerNotEqual<{ readonly code: 200 | 404 }, "code", 200>,
    { readonly code: 200 | 404 }
  >
>;
type _16d = Expect<
  Equal<OptionalOwnerNotEqual<null | undefined, "name", undefined>, never>
>;
type _16e = Expect<
  Equal<OptionalOwnerNotEqual<never, "kind", "ok">, never>
>;

// 17. Build the compared property value on its equal or unequal path.
export type ComparedPropertyValue<
  Source,
  Key extends PropertyKey,
  Target,
  Branch extends "equal" | "unequal",
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    ComparedPropertyValue<{ readonly code: 200 | 404 }, "code", 200, "equal">,
    200
  >
>;
type _17b = Expect<
  Equal<
    ComparedPropertyValue<{ readonly code: 200 | 404 }, "code", 200, "unequal">,
    404
  >
>;
type _17c = Expect<
  Equal<
    ComparedPropertyValue<{ readonly name?: string } | null, "name", undefined, "unequal">,
    string
  >
>;
type _17d = Expect<
  Equal<
    ComparedPropertyValue<readonly [string?, number?], 0, undefined, "equal">,
    undefined
  >
>;
type _17e = Expect<
  Equal<
    ComparedPropertyValue<readonly [string?, number?], 0, undefined, "unequal">,
    string
  >
>;

// ─── Comparator APIs, coercion, and special types ──────────────────────────

// 18. Apply strict-equality evidence, but preserve Source for Object.is.
export type ComparatorEvidence<
  Source,
  Target,
  Comparator extends "strict" | "Object.is",
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<ComparatorEvidence<string | null, null, "strict">, null>
>;
type _18b = Expect<
  Equal<ComparatorEvidence<string | null, null, "Object.is">, string | null>
>;
type _18c = Expect<
  Equal<ComparatorEvidence<Date | RegExp, Date, "strict">, Date>
>;
type _18d = Expect<
  Equal<ComparatorEvidence<Date | RegExp, Date, "Object.is">, Date | RegExp>
>;
type _18e = Expect<
  Equal<ComparatorEvidence<unknown, "ready", "strict">, "ready">
>;

// 19. Keep conservative candidates for coercive loose equality.
//     Only `== null` receives a precise two-member special case.
export type LooseEqualityCandidates<
  Source,
  Target,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    LooseEqualityCandidates<string | number | false | null | undefined, null>,
    null | undefined
  >
>;
type _19b = Expect<
  Equal<
    LooseEqualityCandidates<string | number | false | null | undefined, 0>,
    string | number | false
  >
>;
type _19c = Expect<
  Equal<
    LooseEqualityCandidates<string | number | false | null | undefined, false>,
    string | number | false
  >
>;
type _19d = Expect<
  Equal<LooseEqualityCandidates<string | number, "1">, string | number>
>;
type _19e = Expect<
  Equal<LooseEqualityCandidates<unknown, 0>, {}>
>;

// 20. Classify a strict equal branch without allowing `any` to escape.
export type StrictEqualKind<
  Source,
  Target,
> = TODO; // TODO(koan)

type _20a = Expect<Equal<StrictEqualKind<any, "ready">, "any">>;
type _20b = Expect<Equal<StrictEqualKind<unknown, "ready">, "ordinary">>;
type _20c = Expect<Equal<StrictEqualKind<never, undefined>, "never">>;
type _20d = Expect<Equal<StrictEqualKind<number, string>, "never">>;
type _20e = Expect<
  Equal<StrictEqualKind<string | number, string | boolean>, "ordinary">
>;

// 21. Classify the positive `== null` branch for special and ordinary sources.
export type LooseNullishKind<Source> =
  TODO; // TODO(koan)

type _21a = Expect<Equal<LooseNullishKind<any>, "any">>;
type _21b = Expect<Equal<LooseNullishKind<unknown>, "ordinary">>;
type _21c = Expect<Equal<LooseNullishKind<never>, "never">>;
type _21d = Expect<Equal<LooseNullishKind<string>, "never">>;
type _21e = Expect<
  Equal<LooseNullishKind<string | null | undefined>, "ordinary">
>;

// 22. Construct the intersection exposed by a generic equality branch.
export type GenericEqualityBranch<
  Value,
  Target,
> = TODO; // TODO(koan)

type _22a = Expect<Equal<GenericEqualityBranch<unknown, undefined>, undefined>>;
type _22b = Expect<
  Equal<GenericEqualityBranch<string | undefined, undefined>, undefined>
>;
type _22c = Expect<
  Equal<GenericEqualityBranch<"a" | "b", "b" | "c">, "b">
>;
type _22d = Expect<
  Equal<
    GenericEqualityBranch<GivenIdReference | null, GivenIdReference>,
    (GivenIdReference | null) & GivenIdReference
  >
>;
type _22e = Expect<Equal<GenericEqualityBranch<never, string>, never>>;

// 23. Build the public result of generic `value == null ? undefined : value`.
export type GenericNullishReturn<Value> =
  TODO; // TODO(koan)

type _23a = Expect<Equal<GenericNullishReturn<string>, string | undefined>>;
type _23b = Expect<
  Equal<GenericNullishReturn<0 | false>, 0 | false | undefined>
>;
type _23c = Expect<
  Equal<
    GenericNullishReturn<{ readonly id: number }>,
    { readonly id: number } | undefined
  >
>;
type _23d = Expect<Equal<GenericNullishReturn<null>, null | undefined>>;
type _23e = Expect<Equal<GenericNullishReturn<never>, undefined>>;

// 24. Pair an operand's static type with both equality API result types.
export type ComparisonApiProfile<Operand> =
  TODO; // TODO(koan)

type _24a = Expect<Equal<ComparisonApiProfile<number>, [number, boolean, boolean]>>;
type _24b = Expect<Equal<ComparisonApiProfile<0>, [0, boolean, boolean]>>;
type _24c = Expect<Equal<ComparisonApiProfile<Number>, [Number, boolean, boolean]>>;
type _24d = Expect<Equal<ComparisonApiProfile<symbol>, [symbol, boolean, boolean]>>;
type _24e = Expect<
  Equal<ComparisonApiProfile<{ readonly id: 1 }>, [{ readonly id: 1 }, boolean, boolean]>
>;
