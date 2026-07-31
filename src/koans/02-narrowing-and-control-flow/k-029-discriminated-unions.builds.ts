import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-029: discriminated unions — constructions
 * =============================================================================
 *
 * These constructions first build object, boolean, numeric, symbol, and tuple
 * variants whose tags correlate with payloads, then select and consume those
 * variants through branches, switches, destructuring, filters, and lookups.
 * They also expose shared, broad, optional, nested, generic, unknown, and
 * structural-tag limits. Replace each `TODO` with a type that satisfies the
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

type Merge<Value> = {
  [Key in keyof Value]: Value[Key];
};

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

type GivenLiteralNotEqual<Source, Target> =
  Source extends Target ? never : Source;

type GivenSelect<
  Source,
  Key extends PropertyKey,
  Target,
> = 0 extends 1 & Source
  ? Source
  : Source extends unknown
    ? Key extends keyof Source
      ? [PairOverlap<Source[Key], Target>] extends [never] ? never : Source
      : never
    : never;

type GivenReject<
  Source,
  Key extends PropertyKey,
  Target,
> = 0 extends 1 & Source
  ? Source
  : Source extends unknown
    ? Key extends keyof Source
      ? [GivenLiteralNotEqual<Source[Key], Target>] extends [never]
        ? never
        : Source
      : Source
    : never;

type PropertyFrom<Member, Key extends PropertyKey> =
  Member extends unknown
    ? Key extends keyof Member ? Member[Key] : never
    : never;

type TupleValueAt<Member, Index extends PropertyKey> =
  Member extends readonly unknown[]
    ? Index extends number
      ? `${Index}` extends keyof Member
        ? Member[`${Index}` & keyof Member]
        : never
      : Index extends keyof Member ? Member[Index] : never
    : never;

type TruthyTagMembers<Source, Key extends PropertyKey> =
  Source extends unknown
    ? Key extends keyof Source
      ? [Source[Key] extends false | 0 | 0n | "" | null | undefined ? never : Source[Key]] extends [never]
        ? never
        : Source
      : never
    : never;

type FalsyTagMembers<Source, Key extends PropertyKey> =
  Source extends unknown
    ? Key extends keyof Source
      ? Source[Key] extends false | 0 | 0n | "" | null | undefined
        ? Source
        : never
      : Source
    : never;

type VariantCase = readonly [tag: unknown, result: unknown];

type GivenShape =
  | { readonly kind: "circle"; readonly radius: number }
  | { readonly kind: "square"; readonly side: number }
  | {
      readonly kind: "rectangle";
      readonly width: number;
      readonly height: number;
    };

type GivenShapeMap = {
  readonly circle: { readonly radius: number };
  readonly square: { readonly side: number };
  readonly rectangle: {
    readonly width: number;
    readonly height: number;
  };
};

type GivenRequest =
  | { readonly status: "idle" }
  | { readonly status: "loading"; readonly startedAt: number }
  | { readonly status: "success"; readonly data: string }
  | { readonly status: "failure"; readonly error: Error };

type GivenBooleanResult =
  | { readonly ok: true; readonly value: string }
  | { readonly ok: false; readonly error: string };

type GivenCommand =
  | readonly ["write", string]
  | readonly ["read", number]
  | readonly ["close"];

type GivenShared =
  | {
      readonly kind: "input";
      readonly mode: "text";
      readonly text: string;
    }
  | {
      readonly kind: "input";
      readonly mode: "file";
      readonly path: string;
    }
  | { readonly kind: "output"; readonly bytes: Uint8Array };

type GivenBroad =
  | { readonly kind: "known"; readonly value: number }
  | { readonly kind: string; readonly raw: unknown };

type GivenOptional =
  | { readonly kind: "fixed"; readonly value: number }
  | { readonly kind?: "loose"; readonly fallback: string };

type GivenMutable =
  | { kind: "text"; value: string }
  | { kind: "count"; value: number };

type GivenNested =
  | { readonly meta: { readonly kind: "a" }; readonly a: number }
  | { readonly meta: { readonly kind: "b" }; readonly b: string };

declare const givenOpenTag: unique symbol;
declare const givenCloseTag: unique symbol;

type GivenSymbolic =
  | { readonly tag: typeof givenOpenTag; readonly fd: number }
  | { readonly tag: typeof givenCloseTag; readonly reason: string };

type GivenNumeric =
  | { readonly code: 0; readonly empty: true }
  | { readonly code: 1; readonly item: string }
  | { readonly code: 2; readonly items: readonly string[] };

type GivenTupleEvent =
  | readonly ["data", Uint8Array]
  | readonly ["error", Error]
  | readonly ["end"];

// ─── Building correlated variants ─────────────────────────────────────────

// 1. Attach one readonly literal tag to a payload object.
export type TaggedVariant<
  TagKey extends PropertyKey,
  Tag extends PropertyKey,
  Payload extends object,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    TaggedVariant<"kind", "circle", { readonly radius: number }>,
    { readonly kind: "circle"; readonly radius: number }
  >
>;
type _01b = Expect<
  Equal<
    TaggedVariant<"status", "loading", { readonly startedAt: number }>,
    { readonly status: "loading"; readonly startedAt: number }
  >
>;
type _01c = Expect<
  Equal<
    TaggedVariant<"code", 200, { readonly body?: string }>,
    { readonly code: 200; readonly body?: string }
  >
>;
type _01d = Expect<
  Equal<
    TaggedVariant<"tag", typeof givenOpenTag, { readonly fd: number }>,
    { readonly tag: typeof givenOpenTag; readonly fd: number }
  >
>;

// 2. Turn a property-keyed payload map into an object discriminated union.
export type VariantsFromMap<
  TagKey extends PropertyKey,
  Payloads extends { readonly [Tag in keyof Payloads]: object },
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<VariantsFromMap<"kind", GivenShapeMap>, GivenShape>
>;
type _02b = Expect<
  Equal<
    VariantsFromMap<
      "status",
      {
        readonly idle: {};
        readonly loading: { readonly startedAt: number };
        readonly success: { readonly data: string };
        readonly failure: { readonly error: Error };
      }
    >,
    GivenRequest
  >
>;
type _02c = Expect<
  Equal<
    VariantsFromMap<
      "code",
      {
        readonly 0: { readonly empty: true };
        readonly 1: { readonly item: string };
      }
    >,
    Extract<GivenNumeric, { code: 0 | 1 }>
  >
>;
type _02d = Expect<
  Equal<VariantsFromMap<"kind", {}>, never>
>;

// 3. Build a two-member union around true and false.
export type BooleanVariants<
  TagKey extends PropertyKey,
  TruePayload extends object,
  FalsePayload extends object,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    BooleanVariants<
      "ok",
      { readonly value: string },
      { readonly error: string }
    >,
    GivenBooleanResult
  >
>;
type _03b = Expect<
  Equal<
    BooleanVariants<
      "loaded",
      { readonly data: number },
      { readonly reason?: string }
    >,
    | { readonly loaded: true; readonly data: number }
    | { readonly loaded: false; readonly reason?: string }
  >
>;
type _03c = Expect<
  Equal<
    BooleanVariants<"enabled", {}, {}>,
    { readonly enabled: true } | { readonly enabled: false }
  >
>;
type _03d = Expect<
  Equal<
    BooleanVariants<
      typeof givenOpenTag,
      { readonly fd: number },
      { readonly reason: string }
    >,
    | { readonly [givenOpenTag]: true; readonly fd: number }
    | { readonly [givenOpenTag]: false; readonly reason: string }
  >
>;

// 4. Turn a tag-to-tail map into a readonly tuple discriminated union.
export type TupleVariantsFromMap<
  Payloads extends {
    readonly [Tag in keyof Payloads]: readonly unknown[];
  },
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    TupleVariantsFromMap<{
      readonly write: readonly [string];
      readonly read: readonly [number];
      readonly close: readonly [];
    }>,
    GivenCommand
  >
>;
type _04b = Expect<
  Equal<
    TupleVariantsFromMap<{
      readonly data: readonly [Uint8Array];
      readonly error: readonly [Error];
      readonly end: readonly [];
    }>,
    GivenTupleEvent
  >
>;
type _04c = Expect<
  Equal<
    TupleVariantsFromMap<{
      readonly 0: readonly [];
      readonly 1: readonly [string, boolean?];
    }>,
    readonly [0] | readonly [1, string, boolean?]
  >
>;
type _04d = Expect<Equal<TupleVariantsFromMap<{}>, never>>;

// ─── Selecting object union members ───────────────────────────────────────

// 5. Collect every tag value declared by members that carry TagKey.
export type TagValues<
  Union,
  TagKey extends PropertyKey,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<TagValues<GivenShape, "kind">, "circle" | "square" | "rectangle">
>;
type _05b = Expect<
  Equal<
    TagValues<GivenRequest, "status">,
    "idle" | "loading" | "success" | "failure"
  >
>;
type _05c = Expect<Equal<TagValues<GivenBooleanResult, "ok">, boolean>>;
type _05d = Expect<
  Equal<TagValues<GivenOptional, "kind">, "fixed" | "loose" | undefined>
>;
type _05e = Expect<Equal<TagValues<never, "kind">, never>>;

// 6. Retain every member whose tag can equal Target.
export type SelectByTag<
  Union,
  TagKey extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<SelectByTag<GivenShape, "kind", "circle">, Extract<GivenShape, { kind: "circle" }>>
>;
type _06b = Expect<
  Equal<SelectByTag<GivenShared, "kind", "input">, Exclude<GivenShared, { kind: "output" }>>
>;
type _06c = Expect<
  Equal<SelectByTag<GivenBroad, "kind", "known">, GivenBroad>
>; // The broad string member can also equal "known".
type _06d = Expect<
  Equal<SelectByTag<GivenOptional, "kind", undefined>, Extract<GivenOptional, { kind?: "loose" }>>
>;
type _06e = Expect<Equal<SelectByTag<never, "kind", "circle">, never>>;

// 7. Retain every member whose tag can differ from Target.
export type RejectByTag<
  Union,
  TagKey extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<RejectByTag<GivenShape, "kind", "circle">, Exclude<GivenShape, { kind: "circle" }>>
>;
type _07b = Expect<
  Equal<RejectByTag<GivenShared, "kind", "input">, Extract<GivenShared, { kind: "output" }>>
>;
type _07c = Expect<
  Equal<RejectByTag<GivenBroad, "kind", "known">, Extract<GivenBroad, { raw: unknown }>>
>;
type _07d = Expect<
  Equal<RejectByTag<GivenOptional, "kind", undefined>, GivenOptional>
>;
type _07e = Expect<
  Equal<RejectByTag<GivenBooleanResult, "ok", true>, Extract<GivenBooleanResult, { ok: false }>>
>;

// 8. Build equal and unequal discriminant paths together.
export type TagPartition<
  Union,
  TagKey extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    TagPartition<GivenShape, "kind", "square">,
    [
      Extract<GivenShape, { kind: "square" }>,
      Exclude<GivenShape, { kind: "square" }>,
    ]
  >
>;
type _08b = Expect<
  Equal<
    TagPartition<GivenBooleanResult, "ok", true>,
    [
      Extract<GivenBooleanResult, { ok: true }>,
      Extract<GivenBooleanResult, { ok: false }>,
    ]
  >
>;
type _08c = Expect<
  Equal<
    TagPartition<GivenSymbolic, "tag", typeof givenOpenTag>,
    [
      Extract<GivenSymbolic, { tag: typeof givenOpenTag }>,
      Extract<GivenSymbolic, { tag: typeof givenCloseTag }>,
    ]
  >
>;
type _08d = Expect<
  Equal<TagPartition<never, "kind", "circle">, [never, never]>
>;

// 9. Retain members matching any tag in TargetTags.
export type SelectByTags<
  Union,
  TagKey extends PropertyKey,
  TargetTags,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    SelectByTags<GivenShape, "kind", "circle" | "square">,
    Exclude<GivenShape, { kind: "rectangle" }>
  >
>;
type _09b = Expect<
  Equal<
    SelectByTags<GivenRequest, "status", "success" | "failure">,
    Extract<GivenRequest, { status: "success" | "failure" }>
  >
>;
type _09c = Expect<
  Equal<SelectByTags<GivenNumeric, "code", 0 | 2>, Extract<GivenNumeric, { code: 0 | 2 }>>
>;
type _09d = Expect<
  Equal<SelectByTags<GivenShape, "kind", never>, never>
>;

// 10. Consume an ordered list of tags and return the final remainder.
export type RemainingAfterTags<
  Union,
  TagKey extends PropertyKey,
  Tags extends readonly unknown[],
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    RemainingAfterTags<GivenShape, "kind", ["circle", "square"]>,
    Extract<GivenShape, { kind: "rectangle" }>
  >
>;
type _10b = Expect<
  Equal<
    RemainingAfterTags<
      GivenRequest,
      "status",
      ["idle", "loading", "success"]
    >,
    Extract<GivenRequest, { status: "failure" }>
  >
>;
type _10c = Expect<
  Equal<RemainingAfterTags<GivenNumeric, "code", [0, 1]>, Extract<GivenNumeric, { code: 2 }>>
>;
type _10d = Expect<
  Equal<RemainingAfterTags<GivenShape, "kind", []>, GivenShape>
>;
type _10e = Expect<
  Equal<RemainingAfterTags<never, "kind", ["circle"]>, never>
>;

// 11. Build every ordered switch case followed by its default remainder.
export type SwitchTagBranches<
  Union,
  TagKey extends PropertyKey,
  Tags extends readonly unknown[],
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    SwitchTagBranches<GivenShape, "kind", ["circle", "square"]>,
    [
      Extract<GivenShape, { kind: "circle" }>,
      Extract<GivenShape, { kind: "square" }>,
      Extract<GivenShape, { kind: "rectangle" }>,
    ]
  >
>;
type _11b = Expect<
  Equal<
    SwitchTagBranches<GivenNumeric, "code", [0, 1]>,
    [
      Extract<GivenNumeric, { code: 0 }>,
      Extract<GivenNumeric, { code: 1 }>,
      Extract<GivenNumeric, { code: 2 }>,
    ]
  >
>;
type _11c = Expect<
  Equal<
    SwitchTagBranches<GivenRequest, "status", []>,
    [GivenRequest]
  >
>;
type _11d = Expect<
  Equal<
    SwitchTagBranches<never, "kind", ["circle"]>,
    [never, never]
  >
>;

// ─── Correlated data and safe key access ───────────────────────────────────

// 12. Read one payload field from the selected member or subgroup.
export type CorrelatedField<
  Union,
  TagKey extends PropertyKey,
  Target,
  Field extends PropertyKey,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<CorrelatedField<GivenShape, "kind", "circle", "radius">, number>
>;
type _12b = Expect<
  Equal<CorrelatedField<GivenRequest, "status", "success", "data">, string>
>;
type _12c = Expect<
  Equal<CorrelatedField<GivenBooleanResult, "ok", false, "error">, string>
>;
type _12d = Expect<
  Equal<CorrelatedField<GivenShared, "kind", "input", "mode">, "text" | "file">
>;
type _12e = Expect<
  Equal<CorrelatedField<GivenShape, "kind", "circle", "side">, never>
>;

// 13. Construct the keys safe on every selected member.
export type AvailableKeysAfterTag<
  Union,
  TagKey extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    AvailableKeysAfterTag<GivenShape, "kind", "circle">,
    "kind" | "radius"
  >
>;
type _13b = Expect<
  Equal<
    AvailableKeysAfterTag<GivenShared, "kind", "input">,
    "kind" | "mode"
  >
>;
type _13c = Expect<
  Equal<
    AvailableKeysAfterTag<
      | { readonly kind: "same"; readonly left: string }
      | { readonly kind: "same"; readonly right: number },
      "kind",
      "same"
    >,
    "kind"
  >
>;
type _13d = Expect<
  Equal<
    AvailableKeysAfterTag<GivenShape, "kind", "missing">,
    string | number | symbol
  >
>;

// 14. Partition members by the runtime truthiness of a boolean or numeric tag.
export type TruthyTagPartition<
  Union,
  TagKey extends PropertyKey,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    TruthyTagPartition<GivenBooleanResult, "ok">,
    [
      Extract<GivenBooleanResult, { ok: true }>,
      Extract<GivenBooleanResult, { ok: false }>,
    ]
  >
>;
type _14b = Expect<
  Equal<
    TruthyTagPartition<Extract<GivenNumeric, { code: 0 | 1 }>, "code">,
    [
      Extract<GivenNumeric, { code: 1 }>,
      Extract<GivenNumeric, { code: 0 }>,
    ]
  >
>;
type _14c = Expect<
  Equal<
    TruthyTagPartition<
      { readonly tag: "" } | { readonly tag: "ready" },
      "tag"
    >,
    [{ readonly tag: "ready" }, { readonly tag: "" }]
  >
>;
type _14d = Expect<
  Equal<TruthyTagPartition<never, "ok">, [never, never]>
>;

// ─── Tuple heads and destructured correlations ─────────────────────────────

// 15. Select tuple members by their fixed head.
export type SelectTuple<
  Union,
  Target,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<SelectTuple<GivenCommand, "write">, readonly ["write", string]>
>;
type _15b = Expect<
  Equal<SelectTuple<GivenTupleEvent, "data">, readonly ["data", Uint8Array]>
>;
type _15c = Expect<
  Equal<
    SelectTuple<GivenTupleEvent, "data" | "error">,
    readonly ["data", Uint8Array] | readonly ["error", Error]
  >
>;
type _15d = Expect<Equal<SelectTuple<GivenCommand, "missing">, never>>;

// 16. Read a correlated tuple position after selecting its head.
export type TuplePayload<
  Union,
  Target,
  Index extends PropertyKey,
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<TuplePayload<GivenCommand, "write", 1>, string>
>;
type _16b = Expect<
  Equal<TuplePayload<GivenCommand, "read", 1>, number>
>;
type _16c = Expect<
  Equal<TuplePayload<GivenTupleEvent, "error", 1>, Error>
>;
type _16d = Expect<
  Equal<TuplePayload<GivenCommand, "close", 1>, never>
>;

// 17. Preserve the correlation between a destructured tag and payload field.
export type DestructuredCorrelation<
  Union,
  TagKey extends PropertyKey,
  Target,
  PayloadKey extends PropertyKey,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    DestructuredCorrelation<GivenMutable, "kind", "text", "value">,
    [tag: "text", payload: string]
  >
>;
type _17b = Expect<
  Equal<
    DestructuredCorrelation<GivenMutable, "kind", "count", "value">,
    [tag: "count", payload: number]
  >
>;
type _17c = Expect<
  Equal<
    DestructuredCorrelation<GivenShared, "mode", "file", "path">,
    [tag: "file", payload: string]
  >
>;
type _17d = Expect<
  Equal<
    DestructuredCorrelation<GivenShape, "kind", "circle", "side">,
    [tag: "circle", payload: never]
  >
>;

// ─── Weak tags, unknown, nesting, and generics ─────────────────────────────

// 18. Classify one proposed discriminator as literal, broad, optional, or missing.
export type DiscriminantQuality<
  Member,
  TagKey extends PropertyKey,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<DiscriminantQuality<{ readonly kind: "fixed" }, "kind">, "literal">
>;
type _18b = Expect<
  Equal<DiscriminantQuality<{ readonly kind: string }, "kind">, "broad">
>;
type _18c = Expect<
  Equal<DiscriminantQuality<{ readonly kind?: "loose" }, "kind">, "optional">
>;
type _18d = Expect<
  Equal<DiscriminantQuality<{ readonly value: number }, "kind">, "missing">
>;
type _18e = Expect<
  Equal<
    DiscriminantQuality<GivenOptional, "kind">,
    "literal" | "optional"
  >
>;

// 19. Add only the literal property proven on an otherwise unknown object.
export type UnknownTagEvidence<
  TagKey extends PropertyKey,
  Tag,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    UnknownTagEvidence<"kind", "ready">,
    object & Record<"kind", "ready">
  >
>;
type _19b = Expect<
  Equal<UnknownTagEvidence<"code", 200>, object & Record<"code", 200>>
>;
type _19c = Expect<
  Equal<
    UnknownTagEvidence<typeof givenOpenTag, true>,
    object & Record<typeof givenOpenTag, true>
  >
>;
type _19d = Expect<
  Equal<PropertyFrom<UnknownTagEvidence<"kind", "ready">, "kind">, "ready">
>;

// 20. Narrow a nested tag value while preserving the containing union.
export type NestedTagEvidence<
  Source,
  OuterKey extends PropertyKey,
  TagKey extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    NestedTagEvidence<GivenNested, "meta", "kind", "a">,
    [owner: GivenNested, nestedTag: "a"]
  >
>;
type _20b = Expect<
  Equal<
    NestedTagEvidence<GivenNested, "meta", "kind", "b">,
    [owner: GivenNested, nestedTag: "b"]
  >
>;
type _20c = Expect<
  Equal<
    NestedTagEvidence<GivenNested, "meta", "kind", "missing">,
    [owner: GivenNested, nestedTag: never]
  >
>;
type _20d = Expect<
  Equal<
    NestedTagEvidence<{ readonly meta?: { readonly kind: "a" } }, "meta", "kind", "a">,
    [owner: { readonly meta?: { readonly kind: "a" } }, nestedTag: "a"]
  >
>;

// 21. Construct the intersection retained inside a generic tag check.
export type GenericTagEvidence<
  Value,
  TagKey extends PropertyKey,
  Tag,
> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    GenericTagEvidence<GivenShape, "kind", "circle">,
    GivenShape & Record<"kind", "circle">
  >
>;
type _21b = Expect<
  Equal<
    GenericTagEvidence<GivenMutable, "kind", "text">,
    GivenMutable & Record<"kind", "text">
  >
>;
type _21c = Expect<
  Equal<
    GenericTagEvidence<{ readonly id: number }, "kind", "known">,
    { readonly id: number } & Record<"kind", "known">
  >
>;
type _21d = Expect<
  Equal<GenericTagEvidence<never, "kind", "known">, never>
>;

// ─── Collections, structural membership, and special values ───────────────

// 22. Construct the element array returned by a tag-based filter.
export type FilteredByTag<
  Union,
  TagKey extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _22a = Expect<
  Equal<
    FilteredByTag<GivenRequest, "status", "failure">,
    Array<Extract<GivenRequest, { status: "failure" }>>
  >
>;
type _22b = Expect<
  Equal<
    FilteredByTag<GivenShape, "kind", "circle">,
    Array<Extract<GivenShape, { kind: "circle" }>>
  >
>;
type _22c = Expect<
  Equal<
    FilteredByTag<GivenNumeric, "code", 1 | 2>,
    Array<Extract<GivenNumeric, { code: 1 | 2 }>>
  >
>;
type _22d = Expect<
  Equal<FilteredByTag<GivenShape, "kind", "missing">, never[]>
>;

// 23. Partition an optional array or map lookup by a tag check.
export type OptionalLookupPartition<
  Value,
  TagKey extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _23a = Expect<
  Equal<
    OptionalLookupPartition<GivenShape | undefined, "kind", "circle">,
    [
      Extract<GivenShape, { kind: "circle" }>,
      Exclude<GivenShape, { kind: "circle" }> | undefined,
    ]
  >
>;
type _23b = Expect<
  Equal<
    OptionalLookupPartition<GivenRequest | undefined, "status", "failure">,
    [
      Extract<GivenRequest, { status: "failure" }>,
      Exclude<GivenRequest, { status: "failure" }> | undefined,
    ]
  >
>;
type _23c = Expect<
  Equal<
    OptionalLookupPartition<GivenTupleEvent | undefined, 0, "data">,
    [readonly ["data", Uint8Array], Exclude<GivenTupleEvent, readonly ["data", Uint8Array]> | undefined]
  >
>;
type _23d = Expect<
  Equal<OptionalLookupPartition<undefined, "kind", "circle">, [never, undefined]>
>;

// 24. Report whether a structural candidate can inhabit the union.
export type StructuralMemberAccepted<
  Union,
  Candidate,
> = TODO; // TODO(koan)

type _24a = Expect<
  Equal<
    StructuralMemberAccepted<GivenShape, { readonly kind: "circle"; readonly radius: number }>,
    true
  >
>;
type _24b = Expect<
  Equal<
    StructuralMemberAccepted<
      GivenShape,
      { readonly kind: "circle"; readonly radius: number; readonly id: string }
    >,
    true
  >
>; // Extra fields do not create nominal identity.
type _24c = Expect<
  Equal<
    StructuralMemberAccepted<GivenShape, { readonly kind: "circle"; readonly side: number }>,
    false
  >
>;
type _24d = Expect<
  Equal<
    StructuralMemberAccepted<GivenBooleanResult, { readonly ok: true; readonly error: string }>,
    false
  >
>;
type _24e = Expect<
  Equal<StructuralMemberAccepted<never, { readonly kind: "circle" }>, false>
>;

// 25. Classify a selected branch without allowing `any` to satisfy assertions.
export type SelectedBranchKind<
  Union,
  TagKey extends PropertyKey,
  Target,
> = TODO; // TODO(koan)

type _25a = Expect<Equal<SelectedBranchKind<any, "kind", "x">, "any">>;
type _25b = Expect<
  Equal<SelectedBranchKind<GivenShape, "kind", "circle">, "ordinary">
>;
type _25c = Expect<
  Equal<SelectedBranchKind<GivenShape, "kind", "missing">, "never">
>;
type _25d = Expect<
  Equal<
    SelectedBranchKind<UnknownTagEvidence<"kind", unknown>, "kind", "known">,
    "ordinary"
  >
>;
type _25e = Expect<
  Equal<SelectedBranchKind<never, "kind", "circle">, "never">
>;
