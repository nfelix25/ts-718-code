import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-033: inferred type predicates — constructions
 * =============================================================================
 *
 * These constructions derive predicate signatures only when a function has the
 * required syntax and an if-and-only-if refinement. They cover primitive,
 * instanceof, discriminant, generic nullish, truthiness, wrapped, negated, and
 * semantically one-way checks, then carry eligible or blocked signatures
 * through filter, find, and every. Replace each `TODO` with a type satisfying
 * the assertions directly below it.
 */

type InferenceFactors = {
  readonly singleReturn: boolean;
  readonly implicitReturnType: boolean;
  readonly unmutatedParameter: boolean;
  readonly iffRefinement: boolean;
};

type GivenEligible<Factors extends InferenceFactors> =
  Factors extends {
    readonly singleReturn: true;
    readonly implicitReturnType: true;
    readonly unmutatedParameter: true;
    readonly iffRefinement: true;
  }
    ? true
    : false;

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

type PredicateTarget<Signature> =
  Signature extends (value: any) => value is infer Target ? Target : never;

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

type TypeofCategory =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "function"
  | "object";

type TypeofTarget<Category extends TypeofCategory> =
  Category extends "string"
    ? string
    : Category extends "number"
      ? number
      : Category extends "bigint"
        ? bigint
        : Category extends "boolean"
          ? boolean
          : Category extends "symbol"
            ? symbol
            : Category extends "undefined"
              ? undefined
              : Category extends "function"
                ? Function
                : object | null;

type FalsyLiteral = false | 0 | 0n | "" | null | undefined;

type TruthyMember<Member> =
  Member extends FalsyLiteral ? never : Member;

type FalsyMember<Member> =
  Member extends FalsyLiteral
    ? Member
    : string extends Member
      ? Member
      : number extends Member
        ? Member
        : bigint extends Member
          ? Member
          : never;

type GivenTruthy<Source> =
  Source extends unknown ? TruthyMember<Source> : never;

type GivenFalsy<Source> =
  Source extends unknown ? FalsyMember<Source> : never;

type TruthyPredicateTarget<Source> =
  Extract<Source, GivenTruthy<Source>>;

type GivenEvent =
  | { readonly type: "open"; readonly id: string }
  | { readonly type: "close"; readonly code: number };

type GivenResult =
  | { readonly ok: true; readonly value: string }
  | { readonly ok: false; readonly error: Error };

type GivenFactors = {
  readonly singleReturn: true;
  readonly implicitReturnType: true;
  readonly unmutatedParameter: true;
  readonly iffRefinement: true;
};

// ─── Eligibility and inferred call signatures ─────────────────────────────

// 1. Build the predicate signature inference may synthesize.
export type InferredPredicate<
  Parameter,
  Target extends Parameter,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    InferredPredicate<unknown, string>,
    (value: unknown) => value is string
  >
>;
type _01b = Expect<
  Equal<
    InferredPredicate<string | number | boolean, string | number>,
    (value: string | number | boolean) => value is string | number
  >
>;
type _01c = Expect<
  Equal<
    InferredPredicate<GivenEvent, Extract<GivenEvent, { type: "open" }>>,
    (value: GivenEvent) => value is Extract<GivenEvent, { type: "open" }>
  >
>;
type _01d = Expect<
  Equal<
    InferredPredicate<object | null, object>,
    (value: object | null) => value is object
  >
>;

// 2. Decide whether every syntactic and semantic inference requirement holds.
export type InferenceEligible<Factors extends InferenceFactors> = TODO; // TODO(koan)

type _02a = Expect<Equal<InferenceEligible<GivenFactors>, true>>;
type _02b = Expect<
  Equal<
    InferenceEligible<Omit<GivenFactors, "singleReturn"> & { readonly singleReturn: false }>,
    false
  >
>;
type _02c = Expect<
  Equal<
    InferenceEligible<Omit<GivenFactors, "implicitReturnType"> & { readonly implicitReturnType: false }>,
    false
  >
>;
type _02d = Expect<
  Equal<
    InferenceEligible<Omit<GivenFactors, "unmutatedParameter"> & { readonly unmutatedParameter: false }>,
    false
  >
>;
type _02e = Expect<
  Equal<
    InferenceEligible<Omit<GivenFactors, "iffRefinement"> & { readonly iffRefinement: false }>,
    false
  >
>;

// 3. Construct the exact union of reasons inference is blocked.
export type InferenceBlockers<Factors extends InferenceFactors> = TODO; // TODO(koan)

type _03a = Expect<Equal<InferenceBlockers<GivenFactors>, never>>;
type _03b = Expect<
  Equal<
    InferenceBlockers<
      Omit<GivenFactors, "singleReturn"> & { readonly singleReturn: false }
    >,
    "multiple-returns"
  >
>;
type _03c = Expect<
  Equal<
    InferenceBlockers<
      Omit<GivenFactors, "implicitReturnType" | "unmutatedParameter"> & {
        readonly implicitReturnType: false;
        readonly unmutatedParameter: false;
      }
    >,
    "explicit-return-type" | "parameter-mutation"
  >
>;
type _03d = Expect<
  Equal<
    InferenceBlockers<
      {
        readonly singleReturn: false;
        readonly implicitReturnType: false;
        readonly unmutatedParameter: false;
        readonly iffRefinement: false;
      }
    >,
    | "multiple-returns"
    | "explicit-return-type"
    | "parameter-mutation"
    | "one-way-condition"
  >
>;

// 4. Choose a predicate or plain boolean signature from the inference factors.
export type InferredSignature<
  Parameter,
  Target extends Parameter,
  Factors extends InferenceFactors,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    InferredSignature<unknown, string, GivenFactors>,
    (value: unknown) => value is string
  >
>;
type _04b = Expect<
  Equal<
    InferredSignature<
      unknown,
      string,
      Omit<GivenFactors, "implicitReturnType"> & {
        readonly implicitReturnType: false;
      }
    >,
    (value: unknown) => boolean
  >
>;
type _04c = Expect<
  Equal<
    InferredSignature<
      string | number,
      string,
      Omit<GivenFactors, "unmutatedParameter"> & {
        readonly unmutatedParameter: false;
      }
    >,
    (value: string | number) => boolean
  >
>;
type _04d = Expect<
  Equal<
    InferredSignature<
      object | null,
      object,
      Omit<GivenFactors, "iffRefinement"> & {
        readonly iffRefinement: false;
      }
    >,
    (value: object | null) => boolean
  >
>;

// 5. Recover the parameter tuple, inferred target, and ordinary boolean result.
export type InferredSignatureProfile<
  Signature extends (...args: any[]) => boolean,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    InferredSignatureProfile<(value: unknown) => value is string>,
    [[value: unknown], string, boolean]
  >
>;
type _05b = Expect<
  Equal<
    InferredSignatureProfile<(value: unknown) => boolean>,
    [[value: unknown], never, boolean]
  >
>;
type _05c = Expect<
  Equal<
    InferredSignatureProfile<
      (value: GivenEvent) => value is Extract<GivenEvent, { type: "close" }>
    >,
    [
      [value: GivenEvent],
      Extract<GivenEvent, { type: "close" }>,
      boolean,
    ]
  >
>;
type _05d = Expect<
  Equal<
    InferredSignatureProfile<(value: any) => value is number>,
    [[value: any], number, boolean]
  >
>;

// ─── Refinement expressions that infer predicates ─────────────────────────

// 6. Build the inferred signature for one recognized typeof equality.
export type InferredTypeofPredicate<Category extends TypeofCategory> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    InferredTypeofPredicate<"string">,
    (value: unknown) => value is string
  >
>;
type _06b = Expect<
  Equal<
    InferredTypeofPredicate<"number">,
    (value: unknown) => value is number
  >
>;
type _06c = Expect<
  Equal<
    InferredTypeofPredicate<"function">,
    (value: unknown) => value is Function
  >
>;
type _06d = Expect<
  Equal<
    InferredTypeofPredicate<"object">,
    (value: unknown) => value is object | null
  >
>;
type _06e = Expect<
  Equal<
    InferredTypeofPredicate<"undefined">,
    (value: unknown) => value is undefined
  >
>;

// 7. Build the inferred signature for an instanceof expression.
export type InferredInstancePredicate<Instance extends object> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    InferredInstancePredicate<Date>,
    (value: unknown) => value is Date
  >
>;
type _07b = Expect<
  Equal<
    InferredInstancePredicate<Error>,
    (value: unknown) => value is Error
  >
>;
type _07c = Expect<
  Equal<
    InferredInstancePredicate<Map<string, number>>,
    (value: unknown) => value is Map<string, number>
  >
>;
type _07d = Expect<
  Equal<
    InferredInstancePredicate<readonly number[]>,
    (value: unknown) => value is readonly number[]
  >
>;

// 8. Build the inferred signature for a discriminant equality.
export type InferredDiscriminantPredicate<
  Union,
  Key extends keyof Union,
  Target,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    InferredDiscriminantPredicate<GivenEvent, "type", "open">,
    (value: GivenEvent) => value is Extract<GivenEvent, { type: "open" }>
  >
>;
type _08b = Expect<
  Equal<
    InferredDiscriminantPredicate<GivenResult, "ok", true>,
    (value: GivenResult) => value is Extract<GivenResult, { ok: true }>
  >
>;
type _08c = Expect<
  Equal<
    InferredDiscriminantPredicate<
      | { readonly code: 1; readonly one: string }
      | { readonly code: 2; readonly two: number },
      "code",
      2
    >,
    (
      value:
        | { readonly code: 1; readonly one: string }
        | { readonly code: 2; readonly two: number }
    ) => value is { readonly code: 2; readonly two: number }
  >
>;
type _08d = Expect<
  Equal<
    InferredDiscriminantPredicate<GivenEvent, "type", "missing">,
    (value: GivenEvent) => value is never
  >
>;

// 9. Build the precise generic signature for one nullish comparison.
export type InferredGenericNullishPredicate<
  Removed extends "undefined" | "null" | "both",
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    InferredGenericNullishPredicate<"undefined">,
    <Value>(
      value: Value | undefined
    ) => value is Value & ({} | null)
  >
>;
type _09b = Expect<
  Equal<
    InferredGenericNullishPredicate<"null">,
    <Value>(
      value: Value | null
    ) => value is Value & ({} | undefined)
  >
>;
type _09c = Expect<
  Equal<
    InferredGenericNullishPredicate<"both">,
    <Value>(
      value: Value | null | undefined
    ) => value is NonNullable<Value>
  >
>;
type _09d = Expect<
  Equal<ReturnType<InferredGenericNullishPredicate<"both">>, boolean>
>;

// 10. Construct the true branch supplied by an inferred predicate.
export type InferredPositiveBranch<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<InferredPositiveBranch<unknown, string>, string>
>;
type _10b = Expect<
  Equal<
    InferredPositiveBranch<string | number | boolean, string | number>,
    string | number
  >
>;
type _10c = Expect<
  Equal<
    InferredPositiveBranch<GivenEvent, Extract<GivenEvent, { type: "open" }>>,
    Extract<GivenEvent, { type: "open" }>
  >
>;
type _10d = Expect<Equal<InferredPositiveBranch<any, string>, string>>;
type _10e = Expect<Equal<InferredPositiveBranch<never, never>, never>>;

// 11. Construct the false branch supplied by an inferred predicate.
export type InferredNegativeBranch<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<InferredNegativeBranch<unknown, string>, unknown>
>;
type _11b = Expect<
  Equal<
    InferredNegativeBranch<string | number | boolean, string | number>,
    boolean
  >
>;
type _11c = Expect<
  Equal<
    InferredNegativeBranch<GivenEvent, Extract<GivenEvent, { type: "open" }>>,
    Extract<GivenEvent, { type: "close" }>
  >
>;
type _11d = Expect<
  Equal<InferredNegativeBranch<string | number, string | number>, never>
>;
type _11e = Expect<Equal<InferredNegativeBranch<never, never>, never>>;

// ─── Collection overload results ──────────────────────────────────────────

// 12. Construct filter's result for an inferred predicate or blocked boolean.
export type InferredFilterResult<
  Source,
  Target extends Source,
  Eligible extends boolean,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<InferredFilterResult<unknown, string, true>, string[]>
>;
type _12b = Expect<
  Equal<InferredFilterResult<unknown, string, false>, unknown[]>
>;
type _12c = Expect<
  Equal<
    InferredFilterResult<string | number | undefined, string | number, true>,
    Array<string | number>
  >
>;
type _12d = Expect<
  Equal<
    InferredFilterResult<GivenEvent, Extract<GivenEvent, { type: "open" }>, true>,
    Array<Extract<GivenEvent, { type: "open" }>>
  >
>;
type _12e = Expect<
  Equal<InferredFilterResult<never, never, true>, never[]>
>;

// 13. Construct find's possibly absent result for inferred or blocked callbacks.
export type InferredFindResult<
  Source,
  Target extends Source,
  Eligible extends boolean,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<InferredFindResult<unknown, Date, true>, Date | undefined>
>;
type _13b = Expect<
  Equal<InferredFindResult<unknown, string, false>, unknown>
>;
type _13c = Expect<
  Equal<
    InferredFindResult<GivenEvent, Extract<GivenEvent, { type: "close" }>, true>,
    Extract<GivenEvent, { type: "close" }> | undefined
  >
>;
type _13d = Expect<
  Equal<InferredFindResult<string | number, number, false>, string | number | undefined>
>;

// 14. Build the collection and indexed element inside a successful every.
export type InferredEveryProfile<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<InferredEveryProfile<unknown, string>, [string[], string | undefined]>
>;
type _14b = Expect<
  Equal<InferredEveryProfile<unknown, number>, [number[], number | undefined]>
>;
type _14c = Expect<
  Equal<
    InferredEveryProfile<GivenEvent, Extract<GivenEvent, { type: "open" }>>,
    [
      Array<Extract<GivenEvent, { type: "open" }>>,
      Extract<GivenEvent, { type: "open" }> | undefined,
    ]
  >
>;
type _14d = Expect<
  Equal<InferredEveryProfile<never, never>, [never[], undefined]>
>;

// ─── Iff boundaries: truthiness, extra semantics, and wrappers ─────────────

// 15. Infer truthiness only when truthy and falsy partitions do not overlap.
export type InferredTruthinessSignature<Source> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    InferredTruthinessSignature<object | null>,
    (value: object | null) => value is object
  >
>;
type _15b = Expect<
  Equal<
    InferredTruthinessSignature<boolean | null>,
    (value: boolean | null) => value is true
  >
>;
type _15c = Expect<
  Equal<
    InferredTruthinessSignature<number | null>,
    (value: number | null) => boolean
  >
>;
type _15d = Expect<
  Equal<
    InferredTruthinessSignature<string | null>,
    (value: string | null) => boolean
  >
>;
type _15e = Expect<
  Equal<
    InferredTruthinessSignature<(() => void) | undefined>,
    (value: (() => void) | undefined) => value is () => void
  >
>;

// 16. Construct filter output from the inferred truthiness signature.
export type InferredTruthinessFilter<Source> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<InferredTruthinessFilter<object | null>, object[]>
>;
type _16b = Expect<
  Equal<InferredTruthinessFilter<boolean | null>, true[]>
>;
type _16c = Expect<
  Equal<InferredTruthinessFilter<number | null>, Array<number | null>>
>;
type _16d = Expect<
  Equal<InferredTruthinessFilter<string | null>, Array<string | null>>
>;
type _16e = Expect<
  Equal<
    InferredTruthinessFilter<readonly [] | null>,
    Array<readonly []>
  >
>;

// 17. Block inference when an extra semantic condition proves only true ⇒ Target.
export type SemanticConditionSignature<
  Source,
  Target extends Source,
  ExtraCondition extends boolean,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    SemanticConditionSignature<unknown, string, true>,
    (value: unknown) => boolean
  >
>; // e.g. string plus non-empty length.
type _17b = Expect<
  Equal<
    SemanticConditionSignature<unknown, number, true>,
    (value: unknown) => boolean
  >
>; // e.g. number plus positivity or finiteness.
type _17c = Expect<
  Equal<
    SemanticConditionSignature<unknown, string | number, false>,
    (value: unknown) => value is string | number
  >
>;
type _17d = Expect<
  Equal<
    SemanticConditionSignature<GivenEvent, Extract<GivenEvent, { type: "open" }>, false>,
    (value: GivenEvent) => value is Extract<GivenEvent, { type: "open" }>
  >
>;

// 18. Infer through a positive guard wrapper; negate only expressible complements.
export type WrappedGuardSignature<
  Parameter,
  Target extends Parameter,
  Negated extends boolean,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    WrappedGuardSignature<unknown, string, false>,
    (value: unknown) => value is string
  >
>;
type _18b = Expect<
  Equal<
    WrappedGuardSignature<unknown, string, true>,
    (value: unknown) => boolean
  >
>;
type _18c = Expect<
  Equal<
    WrappedGuardSignature<string | number | boolean, string, true>,
    (value: string | number | boolean) => value is number | boolean
  >
>;
type _18d = Expect<
  Equal<
    WrappedGuardSignature<GivenEvent, Extract<GivenEvent, { type: "open" }>, true>,
    (value: GivenEvent) => value is Extract<GivenEvent, { type: "close" }>
  >
>;

// ─── Generic collections, special inputs, and signature inspection ─────────

// 19. Construct a generic filter result for each nullish comparison.
export type InferredGenericFilterResult<
  Value,
  Removed extends "undefined" | "null" | "both",
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    InferredGenericFilterResult<string | number, "undefined">,
    Array<string | number>
  >
>;
type _19b = Expect<
  Equal<
    InferredGenericFilterResult<string | number | null, "undefined">,
    Array<string | number | null>
  >
>;
type _19c = Expect<
  Equal<
    InferredGenericFilterResult<string | number | undefined, "null">,
    Array<string | number | undefined>
  >
>;
type _19d = Expect<
  Equal<
    InferredGenericFilterResult<string | number | null | undefined, "both">,
    Array<string | number>
  >
>;
type _19e = Expect<
  Equal<InferredGenericFilterResult<never, "both">, never[]>
>;

// 20. Build the exact typeof-string inference boundary for special parameters.
export type SpecialInputSignature<
  ParameterKind extends "unknown" | "any" | "never",
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    SpecialInputSignature<"unknown">,
    (value: unknown) => value is string
  >
>;
type _20b = Expect<
  Equal<
    SpecialInputSignature<"any">,
    (value: any) => value is string
  >
>;
type _20c = Expect<
  Equal<
    SpecialInputSignature<"never">,
    (value: never) => boolean
  >
>;
type _20d = Expect<
  Equal<ReturnType<SpecialInputSignature<"any">>, boolean>
>;

// 21. Pair a signature's ordinary return with its inferred target, if any.
export type InferredReturnProfile<
  Signature extends (...args: any[]) => boolean,
> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    InferredReturnProfile<(value: unknown) => value is string>,
    [boolean, string]
  >
>;
type _21b = Expect<
  Equal<
    InferredReturnProfile<(value: unknown) => boolean>,
    [boolean, never]
  >
>;
type _21c = Expect<
  Equal<
    InferredReturnProfile<(value: any) => value is number>,
    [boolean, number]
  >
>;
type _21d = Expect<
  Equal<
    InferredReturnProfile<() => boolean>,
    [boolean, never]
  >
>;

// 22. Classify the public API selected by the inference factors.
export type InferenceKind<Factors extends InferenceFactors> = TODO; // TODO(koan)

type _22a = Expect<Equal<InferenceKind<GivenFactors>, "predicate">>;
type _22b = Expect<
  Equal<
    InferenceKind<
      Omit<GivenFactors, "singleReturn"> & { readonly singleReturn: false }
    >,
    "boolean"
  >
>;
type _22c = Expect<
  Equal<
    InferenceKind<
      Omit<GivenFactors, "implicitReturnType"> & {
        readonly implicitReturnType: false;
      }
    >,
    "boolean"
  >
>;
type _22d = Expect<
  Equal<
    InferenceKind<
      Omit<GivenFactors, "iffRefinement"> & {
        readonly iffRefinement: false;
      }
    >,
    "boolean"
  >
>;
type _22e = Expect<
  Equal<
    InferenceKind<
      Omit<GivenFactors, "unmutatedParameter"> & {
        readonly unmutatedParameter: false;
      }
    >,
    "boolean"
  >
>;
