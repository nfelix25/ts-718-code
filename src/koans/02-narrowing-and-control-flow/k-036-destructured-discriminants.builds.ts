import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-036: destructured discriminants — constructions
 * =============================================================================
 *
 * These constructions preserve the relation between a destructured tag and
 * its sibling payload for objects, parameters, switches, renamed bindings, and
 * tuples. They also make the widening boundaries for mutable, separate, rest,
 * nested, original, and generic values explicit. Replace each `TODO` with a
 * type satisfying the assertions directly below it.
 */

type GivenAction =
  | { readonly kind: "text"; readonly payload: string }
  | { readonly kind: "count"; readonly payload: number };

type GivenResult =
  | { readonly ok: true; readonly value: string }
  | { readonly ok: false; readonly value: Error };

type GivenEvent =
  | { readonly type: "text"; readonly data: string }
  | { readonly type: "count"; readonly data: number }
  | { readonly type: "flag"; readonly data: boolean };

type GivenTuple =
  | readonly ["text", string]
  | readonly ["count", number]
  | readonly ["flag", boolean];

type GivenNested =
  | { readonly meta: { readonly kind: "a" }; readonly payload: string }
  | { readonly meta: { readonly kind: "b" }; readonly payload: number };

type GivenPayloadFor<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  Tag,
> =
  Extract<Union, Record<TagKey, Tag>> extends infer Member
    ? Member extends Record<PayloadKey, unknown>
      ? Member[PayloadKey]
      : never
    : never;

type GivenComplementPayload<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  Tag,
> =
  Exclude<Union, Extract<Union, Record<TagKey, Tag>>> extends infer Member
    ? Member extends Record<PayloadKey, unknown>
      ? Member[PayloadKey]
      : never
    : never;

type GivenTagPrimitive =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;

type GivenTupleBranch<
  Union extends readonly [PropertyKey, unknown],
  Tag extends PropertyKey,
> = Extract<Union, readonly [Tag, unknown]>;

type GivenTuplePayloadFor<
  Union extends readonly [PropertyKey, unknown],
  Tag extends PropertyKey,
> = GivenTupleBranch<Union, Tag>[1];

type GivenTupleRestMembers<
  Union extends readonly [unknown, ...unknown[]],
> = Union extends readonly [unknown, ...infer Rest] ? Rest : never;

type CorrelationFactors = {
  readonly stableBindings: boolean;
  readonly samePattern: boolean;
  readonly flatSiblings: boolean;
  readonly noRest: boolean;
};

type GivenCorrelated<Factors extends CorrelationFactors> =
  Factors extends {
    readonly stableBindings: true;
    readonly samePattern: true;
    readonly flatSiblings: true;
    readonly noRest: true;
  }
    ? true
    : false;

type GivenFactors = {
  readonly stableBindings: true;
  readonly samePattern: true;
  readonly flatSiblings: true;
  readonly noRest: true;
};

// ─── Object sibling correlation ────────────────────────────────────────────

// 1. Recover the tag and payload unions visible before either binding narrows.
export type DestructuredBindingTypes<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    DestructuredBindingTypes<GivenAction, "kind", "payload">,
    [tag: "text" | "count", payload: string | number]
  >
>;
type _01b = Expect<
  Equal<
    DestructuredBindingTypes<GivenResult, "ok", "value">,
    [tag: boolean, payload: string | Error]
  >
>;
type _01c = Expect<
  Equal<
    DestructuredBindingTypes<GivenEvent, "type", "data">,
    [tag: "text" | "count" | "flag", payload: string | number | boolean]
  >
>;
type _01d = Expect<
  Equal<
    DestructuredBindingTypes<
      { readonly kind: "only"; readonly payload: readonly [] },
      "kind",
      "payload"
    >,
    [tag: "only", payload: readonly []]
  >
>;

// 2. Select the sibling payload correlated with one object tag.
export type CorrelatedPayload<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  Tag,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    CorrelatedPayload<GivenAction, "kind", "payload", "text">,
    string
  >
>;
type _02b = Expect<
  Equal<
    CorrelatedPayload<GivenAction, "kind", "payload", "count">,
    number
  >
>;
type _02c = Expect<
  Equal<
    CorrelatedPayload<GivenEvent, "type", "data", "text" | "flag">,
    string | boolean
  >
>;
type _02d = Expect<
  Equal<
    CorrelatedPayload<GivenAction, "kind", "payload", "missing">,
    never
  >
>;

// 3. Construct both narrowed sibling bindings for one selected member.
export type CorrelatedSiblingPair<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  Tag,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    CorrelatedSiblingPair<GivenAction, "kind", "payload", "text">,
    [tag: "text", payload: string]
  >
>;
type _03b = Expect<
  Equal<
    CorrelatedSiblingPair<GivenResult, "ok", "value", true>,
    [tag: true, payload: string]
  >
>;
type _03c = Expect<
  Equal<
    CorrelatedSiblingPair<GivenResult, "ok", "value", false>,
    [tag: false, payload: Error]
  >
>;
type _03d = Expect<
  Equal<
    CorrelatedSiblingPair<GivenEvent, "type", "data", "count" | "flag">,
    [tag: "count" | "flag", payload: number | boolean]
  >
>;

// 4. Select the sibling payload from every member except one tag.
export type ComplementPayload<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  Tag,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    ComplementPayload<GivenAction, "kind", "payload", "text">,
    number
  >
>;
type _04b = Expect<
  Equal<
    ComplementPayload<GivenResult, "ok", "value", true>,
    Error
  >
>;
type _04c = Expect<
  Equal<
    ComplementPayload<GivenEvent, "type", "data", "text">,
    number | boolean
  >
>;
type _04d = Expect<
  Equal<
    ComplementPayload<GivenAction, "kind", "payload", "text" | "count">,
    never
  >
>;

// 5. Select the payload on either side of a Boolean discriminant.
export type BooleanDiscriminantPayload<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  WhenTrue extends boolean,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    BooleanDiscriminantPayload<GivenResult, "ok", "value", true>,
    string
  >
>;
type _05b = Expect<
  Equal<
    BooleanDiscriminantPayload<GivenResult, "ok", "value", false>,
    Error
  >
>;
type _05c = Expect<
  Equal<
    BooleanDiscriminantPayload<
      | { readonly valid: true; readonly item: number }
      | { readonly valid: false; readonly item: null },
      "valid",
      "item",
      true
    >,
    number
  >
>;
type _05d = Expect<
  Equal<
    BooleanDiscriminantPayload<
      | { readonly valid: true; readonly item: number }
      | { readonly valid: false; readonly item: null },
      "valid",
      "item",
      false
    >,
    null
  >
>;

// 6. Build a switch lookup from every tag to its correlated payload.
export type SwitchPayloadMap<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    SwitchPayloadMap<GivenAction, "kind", "payload">,
    { text: string; count: number }
  >
>;
type _06b = Expect<
  Equal<
    SwitchPayloadMap<GivenEvent, "type", "data">,
    { text: string; count: number; flag: boolean }
  >
>;
type _06c = Expect<
  Equal<
    SwitchPayloadMap<GivenResult, "ok", "value">,
    { true: string; false: Error }
  >
>;
type _06d = Expect<
  Equal<
    SwitchPayloadMap<
      { readonly kind: "only"; readonly payload: never },
      "kind",
      "payload"
    >,
    { only: never }
  >
>;

// 7. Rename the two bindings while retaining their selected relationship.
export type RenamedCorrelatedBindings<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  Tag,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    RenamedCorrelatedBindings<GivenAction, "kind", "payload", "text">,
    { readonly category: "text"; readonly data: string }
  >
>;
type _07b = Expect<
  Equal<
    RenamedCorrelatedBindings<GivenAction, "kind", "payload", "count">,
    { readonly category: "count"; readonly data: number }
  >
>;
type _07c = Expect<
  Equal<
    RenamedCorrelatedBindings<GivenEvent, "type", "data", "text" | "flag">,
    { readonly category: "text" | "flag"; readonly data: string | boolean }
  >
>;
type _07d = Expect<
  Equal<
    RenamedCorrelatedBindings<GivenAction, "kind", "payload", "missing">,
    { readonly category: "missing"; readonly data: never }
  >
>;

// 8. Preserve a named Boolean alias over a renamed discriminant.
export type RenamedAliasBranch<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  Tag,
  WhenTrue extends boolean,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    RenamedAliasBranch<GivenAction, "kind", "payload", "text", true>,
    string
  >
>;
type _08b = Expect<
  Equal<
    RenamedAliasBranch<GivenAction, "kind", "payload", "text", false>,
    number
  >
>;
type _08c = Expect<
  Equal<
    RenamedAliasBranch<GivenEvent, "type", "data", "flag", true>,
    boolean
  >
>;
type _08d = Expect<
  Equal<
    RenamedAliasBranch<GivenEvent, "type", "data", "flag", false>,
    string | number
  >
>;

// ─── Destructured parameters and tuples ────────────────────────────────────

// 9. Build a destructured-parameter handler, optional only when defaulted.
export type DestructuredParameterHandler<
  Union,
  Return,
  Defaulted extends boolean,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    DestructuredParameterHandler<GivenAction, string, false>,
    (value: GivenAction) => string
  >
>;
type _09b = Expect<
  Equal<
    DestructuredParameterHandler<GivenAction, string | number, true>,
    (value?: GivenAction) => string | number
  >
>;
type _09c = Expect<
  Equal<
    Parameters<DestructuredParameterHandler<GivenResult, string, false>>,
    [value: GivenResult]
  >
>;
type _09d = Expect<
  Equal<
    ReturnType<DestructuredParameterHandler<never, never, true>>,
    never
  >
>;

// 10. Construct the union returned after all parameter branches merge.
export type DestructuredHandlerReturn<
  Union,
  PayloadKey extends keyof Union,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<DestructuredHandlerReturn<GivenAction, "payload">, string | number>
>;
type _10b = Expect<
  Equal<DestructuredHandlerReturn<GivenResult, "value">, string | Error>
>;
type _10c = Expect<
  Equal<
    DestructuredHandlerReturn<GivenEvent, "data">,
    string | number | boolean
  >
>;
type _10d = Expect<
  Equal<
    DestructuredHandlerReturn<
      { readonly payload: readonly [] },
      "payload"
    >,
    readonly []
  >
>;

// 11. Select the payload correlated with a discriminated tuple head.
export type TuplePayloadFor<
  Union extends readonly [PropertyKey, unknown],
  Tag extends PropertyKey,
> = TODO; // TODO(koan)

type _11a = Expect<Equal<TuplePayloadFor<GivenTuple, "text">, string>>;
type _11b = Expect<Equal<TuplePayloadFor<GivenTuple, "count">, number>>;
type _11c = Expect<Equal<TuplePayloadFor<GivenTuple, "flag">, boolean>>;
type _11d = Expect<Equal<TuplePayloadFor<GivenTuple, "missing">, never>>;

// 12. Select either the matching discriminated tuple or its complement.
export type TupleCorrelationBranch<
  Union extends readonly [PropertyKey, unknown],
  Tag extends PropertyKey,
  WhenTrue extends boolean,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    TupleCorrelationBranch<GivenTuple, "text", true>,
    readonly ["text", string]
  >
>;
type _12b = Expect<
  Equal<
    TupleCorrelationBranch<GivenTuple, "text", false>,
    readonly ["count", number] | readonly ["flag", boolean]
  >
>;
type _12c = Expect<
  Equal<
    TupleCorrelationBranch<
      ["ok", string] | ["error", Error],
      "error",
      true
    >,
    ["error", Error]
  >
>;
type _12d = Expect<
  Equal<TupleCorrelationBranch<GivenTuple, "missing", true>, never>
>;

// 13. Build a switch lookup from tuple heads to their correlated payloads.
export type TuplePayloadMap<
  Union extends readonly [PropertyKey, unknown],
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    TuplePayloadMap<GivenTuple>,
    { text: string; count: number; flag: boolean }
  >
>;
type _13b = Expect<
  Equal<
    TuplePayloadMap<readonly ["ok", string] | readonly ["error", Error]>,
    { ok: string; error: Error }
  >
>;
type _13c = Expect<
  Equal<TuplePayloadMap<readonly ["only", never]>, { only: never }>
>;
type _13d = Expect<
  Equal<TuplePayloadMap<never>, {}>
>;

// 14. Construct the union produced by tuple-rest destructuring.
export type TupleRestMembers<
  Union extends readonly [unknown, ...unknown[]],
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    TupleRestMembers<["text", string] | ["count", number]>,
    [string] | [number]
  >
>;
type _14b = Expect<
  Equal<
    TupleRestMembers<GivenTuple>,
    [string] | [number] | [boolean]
  >
>;
type _14c = Expect<
  Equal<TupleRestMembers<readonly ["only"]>, []>
>;
type _14d = Expect<Equal<TupleRestMembers<never>, never>>;

// 15. Recover the still-wide first rest element after checking the separate head.
export type TupleRestPayload<
  Union extends readonly [unknown, ...unknown[]],
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    TupleRestPayload<["text", string] | ["count", number]>,
    string | number
  >
>;
type _15b = Expect<
  Equal<TupleRestPayload<GivenTuple>, string | number | boolean>
>;
type _15c = Expect<
  Equal<TupleRestPayload<readonly ["only"]>, never>
>;
type _15d = Expect<Equal<TupleRestPayload<never>, never>>;

// ─── Correlation requirements and widening boundaries ─────────────────────

// 16. Decide whether a destructuring shape records sibling correlation.
export type DestructuringCorrelated<
  Factors extends CorrelationFactors,
> = TODO; // TODO(koan)

type _16a = Expect<Equal<DestructuringCorrelated<GivenFactors>, true>>;
type _16b = Expect<
  Equal<
    DestructuringCorrelated<
      Omit<GivenFactors, "stableBindings"> & { readonly stableBindings: false }
    >,
    false
  >
>;
type _16c = Expect<
  Equal<
    DestructuringCorrelated<
      Omit<GivenFactors, "samePattern"> & { readonly samePattern: false }
    >,
    false
  >
>;
type _16d = Expect<
  Equal<
    DestructuringCorrelated<
      Omit<GivenFactors, "flatSiblings"> & { readonly flatSiblings: false }
    >,
    false
  >
>;
type _16e = Expect<
  Equal<
    DestructuringCorrelated<
      Omit<GivenFactors, "noRest"> & { readonly noRest: false }
    >,
    false
  >
>;

// 17. Construct the exact union of reasons sibling correlation is unavailable.
export type DestructuringBlockers<
  Factors extends CorrelationFactors,
> = TODO; // TODO(koan)

type _17a = Expect<Equal<DestructuringBlockers<GivenFactors>, never>>;
type _17b = Expect<
  Equal<
    DestructuringBlockers<
      Omit<GivenFactors, "stableBindings"> & { readonly stableBindings: false }
    >,
    "mutable-bindings"
  >
>;
type _17c = Expect<
  Equal<
    DestructuringBlockers<
      Omit<GivenFactors, "samePattern" | "noRest"> & {
        readonly samePattern: false;
        readonly noRest: false;
      }
    >,
    "separate-reads" | "rest-binding"
  >
>;
type _17d = Expect<
  Equal<
    DestructuringBlockers<{
      readonly stableBindings: false;
      readonly samePattern: false;
      readonly flatSiblings: false;
      readonly noRest: false;
    }>,
    "mutable-bindings" | "separate-reads" | "nested-path" | "rest-binding"
  >
>;

// 18. Select a correlated payload only when the destructuring shape is eligible.
export type PayloadAfterTagCheck<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  Tag,
  Factors extends CorrelationFactors,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    PayloadAfterTagCheck<
      GivenAction,
      "kind",
      "payload",
      "text",
      GivenFactors
    >,
    string
  >
>;
type _18b = Expect<
  Equal<
    PayloadAfterTagCheck<
      GivenAction,
      "kind",
      "payload",
      "text",
      Omit<GivenFactors, "stableBindings"> & { readonly stableBindings: false }
    >,
    string | number
  >
>;
type _18c = Expect<
  Equal<
    PayloadAfterTagCheck<
      GivenEvent,
      "type",
      "data",
      "flag",
      Omit<GivenFactors, "noRest"> & { readonly noRest: false }
    >,
    string | number | boolean
  >
>;
type _18d = Expect<
  Equal<
    PayloadAfterTagCheck<
      { readonly kind: "only"; readonly payload: never },
      "kind",
      "payload",
      "only",
      GivenFactors
    >,
    never
  >
>;

// 19. Narrow the original union only when the guard is applied to that value.
export type OriginalValueBranch<
  Union,
  TagKey extends keyof Union,
  Tag,
  WholeValueGuard extends boolean,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    OriginalValueBranch<GivenAction, "kind", "text", true>,
    { readonly kind: "text"; readonly payload: string }
  >
>;
type _19b = Expect<
  Equal<
    OriginalValueBranch<GivenAction, "kind", "text", false>,
    GivenAction
  >
>;
type _19c = Expect<
  Equal<
    OriginalValueBranch<GivenEvent, "type", "flag", true>,
    { readonly type: "flag"; readonly data: boolean }
  >
>;
type _19d = Expect<
  Equal<
    OriginalValueBranch<GivenAction, "kind", "missing", true>,
    never
  >
>;

// 20. Remove the tag distributively to construct the object-rest union.
export type DestructuredRest<
  Union,
  Removed extends PropertyKey,
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    DestructuredRest<GivenAction, "kind">,
    { readonly payload: string } | { readonly payload: number }
  >
>;
type _20b = Expect<
  Equal<
    DestructuredRest<GivenResult, "ok">,
    { readonly value: string } | { readonly value: Error }
  >
>;
type _20c = Expect<
  Equal<
    DestructuredRest<
      { readonly type: "only"; readonly data: never },
      "type" | "data"
    >,
    {}
  >
>;
type _20d = Expect<Equal<DestructuredRest<never, "kind">, never>>;

// 21. Keep a rest payload wide even after its separately extracted tag narrows.
export type RestPayloadAfterTag<
  Union,
  PayloadKey extends keyof Union,
  Tag,
> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<RestPayloadAfterTag<GivenAction, "payload", "text">, string | number>
>;
type _21b = Expect<
  Equal<RestPayloadAfterTag<GivenAction, "payload", "count">, string | number>
>;
type _21c = Expect<
  Equal<
    RestPayloadAfterTag<GivenEvent, "data", "flag">,
    string | number | boolean
  >
>;
type _21d = Expect<
  Equal<
    RestPayloadAfterTag<
      { readonly kind: "only"; readonly payload: never },
      "payload",
      "only"
    >,
    never
  >
>;

// 22. Pair a narrowed separate tag read with its uncorrelated payload read.
export type SeparateReadProfile<
  Union,
  PayloadKey extends keyof Union,
  Tag,
> = TODO; // TODO(koan)

type _22a = Expect<
  Equal<
    SeparateReadProfile<GivenAction, "payload", "text">,
    [checkedTag: "text", separatePayload: string | number]
  >
>;
type _22b = Expect<
  Equal<
    SeparateReadProfile<GivenResult, "value", true>,
    [checkedTag: true, separatePayload: string | Error]
  >
>;
type _22c = Expect<
  Equal<
    SeparateReadProfile<GivenEvent, "data", "flag">,
    [checkedTag: "flag", separatePayload: string | number | boolean]
  >
>;
type _22d = Expect<
  Equal<
    SeparateReadProfile<
      { readonly payload: readonly [] },
      "payload",
      "only"
    >,
    [checkedTag: "only", separatePayload: readonly []]
  >
>;

// 23. Keep independently mutable tag and payload bindings at their full unions.
export type MutableBindingProfile<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
> = TODO; // TODO(koan)

type _23a = Expect<
  Equal<
    MutableBindingProfile<GivenAction, "kind", "payload">,
    [
      tag: "text" | "count",
      payload: string | number,
      payloadUnderTagCheck: string | number,
    ]
  >
>;
type _23b = Expect<
  Equal<
    MutableBindingProfile<GivenResult, "ok", "value">,
    [tag: boolean, payload: string | Error, payloadUnderTagCheck: string | Error]
  >
>;
type _23c = Expect<
  Equal<
    MutableBindingProfile<GivenEvent, "type", "data">,
    [
      tag: "text" | "count" | "flag",
      payload: string | number | boolean,
      payloadUnderTagCheck: string | number | boolean,
    ]
  >
>;
type _23d = Expect<
  Equal<
    MutableBindingProfile<
      { readonly kind: "only"; readonly payload: never },
      "kind",
      "payload"
    >,
    [tag: "only", payload: never, payloadUnderTagCheck: never]
  >
>;

// 24. Narrow a nested metadata object while leaving its outer sibling wide.
export type NestedSiblingProfile<Tag extends "a" | "b"> = TODO; // TODO(koan)

type _24a = Expect<
  Equal<
    NestedSiblingProfile<"a">,
    [meta: { readonly kind: "a" }, payload: string | number]
  >
>;
type _24b = Expect<
  Equal<
    NestedSiblingProfile<"b">,
    [meta: { readonly kind: "b" }, payload: string | number]
  >
>;
type _24c = Expect<
  Equal<
    NestedSiblingProfile<"a" | "b">,
    [
      meta: { readonly kind: "a" } | { readonly kind: "b" },
      payload: string | number,
    ]
  >
>;
type _24d = Expect<
  Equal<NestedSiblingProfile<never>, [meta: never, payload: string | number]>
>;

// 25. Preserve narrowed generic siblings while leaving the generic original intact.
export type GenericSiblingProfile<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
  Tag,
> = TODO; // TODO(koan)

type _25a = Expect<
  Equal<
    GenericSiblingProfile<GivenAction, "kind", "payload", "text">,
    [tag: "text", payload: string, original: GivenAction]
  >
>;
type _25b = Expect<
  Equal<
    GenericSiblingProfile<GivenEvent, "type", "data", "flag">,
    [tag: "flag", payload: boolean, original: GivenEvent]
  >
>;
type _25c = Expect<
  Equal<
    GenericSiblingProfile<
      { readonly kind: "text"; readonly payload: string },
      "kind",
      "payload",
      "text"
    >,
    [
      tag: "text",
      payload: string,
      original: { readonly kind: "text"; readonly payload: string },
    ]
  >
>;
type _25d = Expect<
  Equal<
    GenericSiblingProfile<GivenAction, "kind", "payload", "missing">,
    [tag: "missing", payload: never, original: GivenAction]
  >
>;
