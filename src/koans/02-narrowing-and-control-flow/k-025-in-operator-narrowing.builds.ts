import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-025: in-operator narrowing — constructions
 * =============================================================================
 *
 * These constructions partition object unions by required, optional, absent,
 * inherited, indexed, and newly observed properties. They cover literal and
 * widened property keys, recursive control-flow paths, unknown after its object
 * guard, property reads, private brands, operand restrictions, and the
 * distinction between `in` evidence and `Object.hasOwn`. Replace each `TODO`
 * with a type that satisfies the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type DeclaredMembers<Source, Key extends PropertyKey> =
  Source extends unknown
    ? Key extends keyof Source ? Source : never
    : never;

type MembersWithoutRequiredKey<Source, Key extends PropertyKey> =
  Source extends unknown
    ? Key extends keyof Source
      ? {} extends Pick<Source, Key & keyof Source> ? Source : never
      : Source
    : never;

type GivenTrueStep<Source, Key extends PropertyKey> =
  0 extends 1 & Source
    ? Source
    : [DeclaredMembers<Source, Key>] extends [never]
      ? Source & Record<Key, unknown>
      : DeclaredMembers<Source, Key>;

type GivenFalseStep<Source, Key extends PropertyKey> =
  0 extends 1 & Source
    ? Source
    : MembersWithoutRequiredKey<Source, Key>;

type GivenObjectPart<Source> =
  0 extends 1 & Source
    ? object
    : unknown extends Source
      ? object
      : Extract<Source, object>;

type PropertyFrom<Member, Key extends PropertyKey> =
  Member extends unknown
    ? Key extends keyof Member ? Member[Key] : never
    : never;

type CallResult<Value> =
  Value extends (...args: any[]) => infer Result ? Result : never;

type GivenBrandTrue<Source, Brand extends object> =
  0 extends 1 & Source
    ? Brand
    : unknown extends Source
      ? Brand
      : Source extends unknown
        ? Source extends object
          ? Source extends Brand
            ? Source
            : Brand extends Source
              ? Brand
              : never
          : never
        : never;

type GivenBrandFalse<Source, Brand extends object> =
  0 extends 1 & Source
    ? Source
    : unknown extends Source
      ? Source
      : Source extends unknown
        ? Source extends Brand ? never : Source
        : never;

type KeyCase = readonly [key: PropertyKey, result: unknown];

type GivenFish = {
  readonly kind: "fish";
  swim(): string;
};

type GivenBird = {
  readonly kind: "bird";
  fly(): string;
};

type GivenHuman = {
  readonly kind: "human";
  readonly swim?: () => string;
  readonly fly?: () => string;
};

type GivenRequiredX = {
  readonly kind: "required";
  readonly x: number;
};

type GivenOptionalX = {
  readonly kind: "optional";
  readonly x?: number;
};

type GivenAbsentX = {
  readonly kind: "absent";
  readonly y: string;
};

type GivenAction =
  | { readonly kind: "run"; run(): number }
  | { readonly kind: "stop"; stop(): string }
  | { readonly kind: "pause"; pause(): boolean };

type GivenPayload =
  | { readonly text: string }
  | { readonly bytes: Uint8Array }
  | { readonly json: object }
  | { readonly error: Error };

declare const givenUniqueKey: unique symbol;

type GivenKeyed =
  | { readonly name: string }
  | { readonly 0: number }
  | { readonly [givenUniqueKey]: boolean }
  | { readonly [key: string]: Date };

interface GivenInherited {
  inherited(): string;
}

interface GivenDerived extends GivenInherited {
  readonly own: number;
}

declare class GivenBranded {
  private readonly brand: void;
  readonly value: string;
}

declare class GivenOtherBrand {
  private readonly otherBrand: void;
  readonly value: string;
}

// ─── Required, optional, absent, and unlisted keys ─────────────────────────

// 1. Classify a property as required, optional, or absent on each union member.
export type KeyStatus<
  Member,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _01a = Expect<Equal<KeyStatus<GivenRequiredX, "x">, "required">>;
type _01b = Expect<Equal<KeyStatus<GivenOptionalX, "x">, "optional">>;
type _01c = Expect<Equal<KeyStatus<GivenAbsentX, "x">, "absent">>;
type _01d = Expect<
  Equal<
    KeyStatus<GivenRequiredX | GivenOptionalX | GivenAbsentX, "x">,
    "required" | "optional" | "absent"
  >
>;
type _01e = Expect<
  Equal<KeyStatus<{ readonly [key: string]: Date }, "missing">, "required">
>;

// 2. Construct the true branch of a literal-key `in` check.
export type PositiveIn<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<PositiveIn<GivenFish | GivenBird, "swim">, GivenFish>
>;
type _02b = Expect<
  Equal<
    PositiveIn<GivenFish | GivenBird | GivenHuman, "swim">,
    GivenFish | GivenHuman
  >
>;
type _02c = Expect<
  Equal<
    PositiveIn<GivenRequiredX | GivenOptionalX | GivenAbsentX, "x">,
    GivenRequiredX | GivenOptionalX
  >
>;
type _02d = Expect<
  Equal<PositiveIn<object, "id">, object & Record<"id", unknown>>
>;
type _02e = Expect<Equal<PositiveIn<never, "id">, never>>;

// 3. Construct the false branch, retaining optional and absent members.
export type NegativeIn<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<NegativeIn<GivenFish | GivenBird, "swim">, GivenBird>
>;
type _03b = Expect<
  Equal<
    NegativeIn<GivenFish | GivenBird | GivenHuman, "swim">,
    GivenBird | GivenHuman
  >
>;
type _03c = Expect<
  Equal<
    NegativeIn<GivenRequiredX | GivenOptionalX | GivenAbsentX, "x">,
    GivenOptionalX | GivenAbsentX
  >
>;
type _03d = Expect<Equal<NegativeIn<object, "id">, object>>;
type _03e = Expect<Equal<NegativeIn<never, "id">, never>>;

// 4. Build both paths of the property-existence check together.
export type InPartition<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<InPartition<GivenFish | GivenBird, "fly">, [GivenBird, GivenFish]>
>;
type _04b = Expect<
  Equal<
    InPartition<GivenRequiredX | GivenOptionalX | GivenAbsentX, "x">,
    [GivenRequiredX | GivenOptionalX, GivenOptionalX | GivenAbsentX]
  >
>;
type _04c = Expect<
  Equal<
    InPartition<object, "name">,
    [object & Record<"name", unknown>, object]
  >
>;
type _04d = Expect<
  Equal<
    InPartition<GivenDerived | { readonly label: string }, "inherited">,
    [GivenDerived, { readonly label: string }]
  >
>; // Declared inherited members participate in `in` narrowing.
type _04e = Expect<Equal<InPartition<never, "x">, [never, never]>>;

// ─── OR, AND, chained, and early-exit paths ────────────────────────────────

// The GivenTrueStep and GivenFalseStep helpers are supplied machinery for the
// recursive constructions in this section.

// 5. Retain members that may carry at least one key in an OR-chain.
export type AnyPresentKey<
  Source,
  Keys extends readonly PropertyKey[],
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<AnyPresentKey<GivenAction, ["run", "stop"]>, Extract<GivenAction, { kind: "run" | "stop" }>>
>;
type _05b = Expect<
  Equal<
    AnyPresentKey<GivenFish | GivenBird | GivenHuman, ["swim", "fly"]>,
    GivenFish | GivenBird | GivenHuman
  >
>;
type _05c = Expect<
  Equal<AnyPresentKey<GivenPayload, ["text", "bytes", "json"]>, Exclude<GivenPayload, { error: Error }>>
>;
type _05d = Expect<Equal<AnyPresentKey<GivenAction, []>, never>>;

// 6. Accumulate successful property checks in an AND-chain.
export type AllPresentKeys<
  Source,
  Keys extends readonly PropertyKey[],
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    AllPresentKeys<GivenFish | GivenBird | GivenHuman, ["swim", "fly"]>,
    GivenHuman
  >
>;
type _06b = Expect<
  Equal<AllPresentKeys<GivenFish | GivenHuman, ["swim"]>, GivenFish | GivenHuman>
>;
type _06c = Expect<
  Equal<
    AllPresentKeys<{ readonly a: number }, ["a", "b"]>,
    { readonly a: number } & Record<"b", unknown>
  >
>;
type _06d = Expect<Equal<AllPresentKeys<GivenAction, []>, GivenAction>>;
type _06e = Expect<Equal<AllPresentKeys<never, ["run"]>, never>>;

// 7. Accumulate failed checks as early-return exclusions.
export type RemainingAfterKeys<
  Source,
  Keys extends readonly PropertyKey[],
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<RemainingAfterKeys<GivenPayload, ["text", "bytes"]>, Extract<GivenPayload, { json: object } | { error: Error }>>
>;
type _07b = Expect<
  Equal<RemainingAfterKeys<GivenPayload, ["text", "bytes", "json"]>, { readonly error: Error }>
>;
type _07c = Expect<
  Equal<
    RemainingAfterKeys<
      GivenRequiredX | GivenOptionalX | GivenAbsentX,
      ["x"]
    >,
    GivenOptionalX | GivenAbsentX
  >
>;
type _07d = Expect<Equal<RemainingAfterKeys<GivenPayload, []>, GivenPayload>>;
type _07e = Expect<Equal<RemainingAfterKeys<never, ["text"]>, never>>;

// 8. Build every ordered else-if branch followed by the final remainder.
export type SequentialKeyBranches<
  Source,
  Keys extends readonly PropertyKey[],
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    SequentialKeyBranches<GivenPayload, ["text", "bytes", "json"]>,
    [
      { readonly text: string },
      { readonly bytes: Uint8Array },
      { readonly json: object },
      { readonly error: Error },
    ]
  >
>;
type _08b = Expect<
  Equal<
    SequentialKeyBranches<GivenAction, ["stop", "run"]>,
    [
      Extract<GivenAction, { kind: "stop" }>,
      Extract<GivenAction, { kind: "run" }>,
      Extract<GivenAction, { kind: "pause" }>,
    ]
  >
>;
type _08c = Expect<
  Equal<SequentialKeyBranches<GivenPayload, []>, [GivenPayload]>
>;
type _08d = Expect<
  Equal<
    SequentialKeyBranches<
      GivenRequiredX | GivenOptionalX | GivenAbsentX,
      ["x"]
    >,
    [GivenRequiredX | GivenOptionalX, GivenOptionalX | GivenAbsentX]
  >
>;

// ─── Unknown, unlisted properties, and guarded APIs ────────────────────────

// 9. First retain non-null objects, then add one observed property.
export type ObjectGuardedIn<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ObjectGuardedIn<unknown, "name">, object & Record<"name", unknown>>
>;
type _09b = Expect<
  Equal<
    ObjectGuardedIn<object | null | string, "count">,
    object & Record<"count", unknown>
  >
>;
type _09c = Expect<
  Equal<
    ObjectGuardedIn<{ readonly id: number } | null, "id">,
    { readonly id: number }
  >
>;
type _09d = Expect<
  Equal<
    ObjectGuardedIn<unknown, typeof givenUniqueKey>,
    object & Record<typeof givenUniqueKey, unknown>
  >
>;
type _09e = Expect<Equal<ObjectGuardedIn<never, "id">, never>>;

// 10. Read the property type available on the positive branch.
export type PresentPropertyValue<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    PresentPropertyValue<GivenRequiredX | GivenOptionalX | GivenAbsentX, "x">,
    number | undefined
  >
>; // Presence does not remove undefined from an optional property read.
type _10b = Expect<
  Equal<
    PresentPropertyValue<GivenFish | GivenBird | GivenHuman, "swim">,
    (() => string) | undefined
  >
>;
type _10c = Expect<Equal<PresentPropertyValue<object, "name">, unknown>>;
type _10d = Expect<
  Equal<PresentPropertyValue<GivenKeyed, 0>, number | Date>
>;
type _10e = Expect<
  Equal<PresentPropertyValue<GivenKeyed, typeof givenUniqueKey>, boolean>
>;

// 11. Call a method made available by the successful key check.
export type PresentMethodResult<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<PresentMethodResult<GivenFish | GivenBird, "swim">, string>
>;
type _11b = Expect<
  Equal<PresentMethodResult<GivenAction, "run">, number>
>;
type _11c = Expect<
  Equal<PresentMethodResult<GivenAction, "stop">, string>
>;
type _11d = Expect<
  Equal<PresentMethodResult<GivenAction, "pause">, boolean>
>;
type _11e = Expect<Equal<PresentMethodResult<object, "missing">, never>>;

// 12. Add the failed-check result to a guarded property-returning API.
export type PropertyGuardResult<
  Source,
  Key extends PropertyKey,
  Missing = undefined,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<PropertyGuardResult<Error | { readonly code: number }, "code">, number | undefined>
>;
type _12b = Expect<
  Equal<
    PropertyGuardResult<
      { readonly email: string } | { readonly phone: string },
      "email",
      "no-email"
    >,
    string | "no-email"
  >
>;
type _12c = Expect<
  Equal<PropertyGuardResult<object, "name">, unknown>
>; // `unknown | undefined` simplifies to unknown.
type _12d = Expect<
  Equal<PropertyGuardResult<GivenOptionalX, "x", null>, number | undefined | null>
>;
type _12e = Expect<
  Equal<PropertyGuardResult<never, "x">, undefined>
>;

// ─── Literal keys, widened keys, and key spaces ────────────────────────────

// 13. Narrow only for a literal or unique key; widened key variables preserve Source.
export type LiteralKeyNarrowing<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    LiteralKeyNarrowing<GivenKeyed, "name">,
    { readonly name: string } | { readonly [key: string]: Date }
  >
>;
type _13b = Expect<Equal<LiteralKeyNarrowing<GivenKeyed, string>, GivenKeyed>>;
type _13c = Expect<Equal<LiteralKeyNarrowing<GivenKeyed, number>, GivenKeyed>>;
type _13d = Expect<Equal<LiteralKeyNarrowing<GivenKeyed, symbol>, GivenKeyed>>;
type _13e = Expect<
  Equal<
    LiteralKeyNarrowing<GivenKeyed, typeof givenUniqueKey>,
    { readonly [givenUniqueKey]: boolean }
  >
>;

// 14. Construct the keys available without first narrowing a union.
export type CommonKeys<Union> =
  TODO; // TODO(koan)

type _14a = Expect<Equal<CommonKeys<GivenKeyed>, never>>;
type _14b = Expect<
  Equal<CommonKeys<GivenFish | GivenBird | GivenHuman>, "kind">
>;
type _14c = Expect<
  Equal<
    CommonKeys<
      { readonly id: number; readonly name: string }
      | { readonly id: string; readonly active: boolean }
    >,
    "id"
  >
>;
type _14d = Expect<Equal<CommonKeys<{}>, never>>;

// 15. Distribute first to collect every key declared by any union member.
export type AllMemberKeys<Union> =
  TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    AllMemberKeys<GivenFish | GivenBird | GivenHuman>,
    "kind" | "swim" | "fly"
  >
>;
type _15b = Expect<
  Equal<AllMemberKeys<GivenPayload>, "text" | "bytes" | "json" | "error">
>;
type _15c = Expect<
  Equal<
    AllMemberKeys<{ readonly 0: number } | { readonly name: string }>,
    0 | "name"
  >
>;
type _15d = Expect<Equal<AllMemberKeys<never>, never>>;

// ─── Operand rules and alternative existence checks ───────────────────────

// 16. Classify whether a proposed left operand is wholly a property-key type.
export type InKeyOperandKind<Key> =
  TODO; // TODO(koan)

type _16a = Expect<Equal<InKeyOperandKind<"name">, "allowed">>;
type _16b = Expect<Equal<InKeyOperandKind<number>, "allowed">>;
type _16c = Expect<Equal<InKeyOperandKind<symbol>, "allowed">>;
type _16d = Expect<Equal<InKeyOperandKind<object>, "rejected">>;
type _16e = Expect<Equal<InKeyOperandKind<never>, "rejected">>;

// 17. Classify whether a proposed right operand is already object-like.
export type InRightOperandKind<Value> =
  TODO; // TODO(koan)

type _17a = Expect<Equal<InRightOperandKind<object>, "allowed">>;
type _17b = Expect<Equal<InRightOperandKind<() => void>, "allowed">>;
type _17c = Expect<Equal<InRightOperandKind<unknown>, "rejected">>;
type _17d = Expect<Equal<InRightOperandKind<string>, "rejected">>;
type _17e = Expect<Equal<InRightOperandKind<object | null>, "rejected">>;

// 18. Apply narrowing for `in`, but preserve Source for `Object.hasOwn`.
export type EvidenceByOperation<
  Source,
  Key extends PropertyKey,
  Operation extends "in" | "hasOwn",
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<EvidenceByOperation<GivenFish | GivenBird, "swim", "in">, GivenFish>
>;
type _18b = Expect<
  Equal<
    EvidenceByOperation<GivenFish | GivenBird, "swim", "hasOwn">,
    GivenFish | GivenBird
  >
>;
type _18c = Expect<
  Equal<EvidenceByOperation<object, "toString", "in">, object & Record<"toString", unknown>>
>;
type _18d = Expect<
  Equal<EvidenceByOperation<object, "toString", "hasOwn">, object>
>;

// ─── Private brands and special source types ───────────────────────────────

// 19. Partition an object source using a lexically available private brand.
export type PrivateBrandPartition<
  Source,
  Brand extends object,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    PrivateBrandPartition<GivenBranded | { readonly label: string }, GivenBranded>,
    [GivenBranded, { readonly label: string }]
  >
>;
type _19b = Expect<
  Equal<PrivateBrandPartition<object, GivenBranded>, [GivenBranded, object]>
>;
type _19c = Expect<
  Equal<
    PrivateBrandPartition<GivenBranded | GivenOtherBrand, GivenBranded>,
    [GivenBranded, GivenOtherBrand]
  >
>;
type _19d = Expect<
  Equal<PrivateBrandPartition<never, GivenBranded>, [never, never]>
>;

// 20. Construct the return type of a private-brand inspection helper.
export type PrivateBrandGuardResult<
  Source,
  Brand extends object,
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<PrivateBrandGuardResult<object, GivenBranded>, GivenBranded | undefined>
>;
type _20b = Expect<
  Equal<
    PrivateBrandGuardResult<GivenBranded | GivenOtherBrand, GivenBranded>,
    GivenBranded | undefined
  >
>;
type _20c = Expect<
  Equal<PrivateBrandGuardResult<GivenOtherBrand, GivenBranded>, undefined>
>;
type _20d = Expect<
  Equal<PrivateBrandGuardResult<never, GivenBranded>, undefined>
>;

// 21. Classify the true branch without allowing `any` to satisfy assertions.
export type PositiveInKind<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _21a = Expect<Equal<PositiveInKind<any, "id">, "any">>;
type _21b = Expect<Equal<PositiveInKind<object, "id">, "ordinary">>;
type _21c = Expect<Equal<PositiveInKind<never, "id">, "never">>;
type _21d = Expect<
  Equal<PositiveInKind<GivenFish | GivenBird, "swim">, "ordinary">
>;
type _21e = Expect<
  Equal<PositiveInKind<GivenFish | GivenBird, "missing">, "ordinary">
>;

// 22. Classify the false branch for any, never, full, and partial exclusions.
export type NegativeInKind<
  Source,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _22a = Expect<Equal<NegativeInKind<any, "id">, "any">>;
type _22b = Expect<Equal<NegativeInKind<never, "id">, "never">>;
type _22c = Expect<Equal<NegativeInKind<GivenFish, "swim">, "never">>;
type _22d = Expect<
  Equal<NegativeInKind<GivenFish | GivenBird, "swim">, "ordinary">
>;
type _22e = Expect<Equal<NegativeInKind<object, "id">, "ordinary">>;

// ─── Branch outputs and ordered dispatch ───────────────────────────────────

// 23. Map required, optional, absent, and unlisted members to branch results.
export type InBranchResult<
  Source,
  Key extends PropertyKey,
  WhenPresent,
  WhenAbsent,
> = TODO; // TODO(koan)

type _23a = Expect<
  Equal<
    InBranchResult<GivenFish | GivenBird, "swim", "swimming", "flying">,
    "swimming" | "flying"
  >
>;
type _23b = Expect<
  Equal<
    InBranchResult<
      GivenRequiredX | GivenOptionalX | GivenAbsentX,
      "x",
      "present",
      "absent"
    >,
    "present" | "absent"
  >
>;
type _23c = Expect<
  Equal<InBranchResult<GivenRequiredX, "x", number, string>, number>
>;
type _23d = Expect<
  Equal<InBranchResult<object, "id", "has-id", "no-id">, "has-id" | "no-id">
>;
type _23e = Expect<
  Equal<InBranchResult<never, "id", "present", "absent">, never>
>;

// 24. Dispatch through an ordered key/result table and then the fallback.
export type KeyDispatch<
  Source,
  Cases extends readonly KeyCase[],
  Fallback,
> = TODO; // TODO(koan)

type _24a = Expect<
  Equal<
    KeyDispatch<
      GivenPayload,
      [
        readonly ["text", "text"],
        readonly ["bytes", "bytes"],
        readonly ["json", "json"],
      ],
      "error"
    >,
    "text" | "bytes" | "json" | "error"
  >
>;
type _24b = Expect<
  Equal<
    KeyDispatch<
      GivenAction,
      [readonly ["run", number], readonly ["stop", string]],
      boolean
    >,
    number | string | boolean
  >
>;
type _24c = Expect<
  Equal<
    KeyDispatch<
      GivenRequiredX | GivenOptionalX | GivenAbsentX,
      [readonly ["x", "has-x"]],
      "no-x"
    >,
    "has-x" | "no-x"
  >
>;
type _24d = Expect<
  Equal<KeyDispatch<GivenPayload, [], "fallback">, "fallback">
>;
type _24e = Expect<
  Equal<KeyDispatch<never, [readonly ["text", "text"]], "other">, never>
>;
