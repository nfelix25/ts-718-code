import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-038: const assertions and narrowing — constructions
 * =============================================================================
 *
 * These constructions preserve literal evidence in objects, tuples, registries,
 * spreads, and factory results, then derive the closed unions that control-flow
 * analysis can discriminate. They also distinguish inline literal syntax from
 * referenced storage, validation, annotation, and runtime freezing. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenWiden<Value> =
  Value extends string
    ? string
    : Value extends number
      ? number
      : Value extends bigint
        ? bigint
        : Value extends boolean
          ? boolean
          : Value;

type GivenDeepConst<Value> =
  Value extends (...args: never[]) => unknown
    ? Value
    : Value extends readonly unknown[]
      ? { readonly [Key in keyof Value]: GivenDeepConst<Value[Key]> }
      : Value extends object
        ? { readonly [Key in keyof Value]: GivenDeepConst<Value[Key]> }
        : Value;

type GivenConstMerge<Base, Extra> = {
  readonly [Key in keyof Base | keyof Extra]:
    Key extends keyof Extra
      ? GivenDeepConst<Extra[Key]>
      : Key extends keyof Base
        ? GivenDeepConst<Base[Key]>
        : never;
};

type GivenConstFactoryResult<Tag extends PropertyKey, Payload> = {
  readonly kind: Tag;
  readonly payload: Payload;
};

type GivenAction =
  | { readonly type: "text"; readonly payload: "hello" }
  | { readonly type: "count"; readonly payload: 1 }
  | { readonly type: "empty"; readonly payload: null };

type ConstExpressionKind =
  | "string-literal"
  | "number-literal"
  | "boolean-literal"
  | "array-literal"
  | "object-literal"
  | "enum-member"
  | "conditional-branches"
  | "call-expression";

type ConstPolicy = "as-const" | "freeze" | "assertion" | "satisfies";

// ─── Literal preservation in objects and tuples ────────────────────────────

// 1. Widen one primitive literal as ordinary mutable inference would.
export type WidenLiteral<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<WidenLiteral<"text">, string>>;
type _01b = Expect<Equal<WidenLiteral<1>, number>>;
type _01c = Expect<Equal<WidenLiteral<true>, boolean>>;
type _01d = Expect<Equal<WidenLiteral<null>, null>>;
type _01e = Expect<Equal<WidenLiteral<never>, never>>;

// 2. Construct a readonly object whose primitive fields remain singleton literals.
export type ConstObject<
  Kind extends PropertyKey,
  Count extends number,
  Active extends boolean,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    ConstObject<"text", 1, true>,
    { readonly kind: "text"; readonly count: 1; readonly active: true }
  >
>;
type _02b = Expect<
  Equal<
    ConstObject<"count", 0, false>,
    { readonly kind: "count"; readonly count: 0; readonly active: false }
  >
>;
type _02c = Expect<
  Equal<
    ConstObject<42, -1, true>,
    { readonly kind: 42; readonly count: -1; readonly active: true }
  >
>;
type _02d = Expect<
  Equal<
    ConstObject<never, never, never>,
    { readonly kind: never; readonly count: never; readonly active: never }
  >
>;

// 3. Recursively const-preserve nested literal syntax.
export type DeepConstLiteral<Value> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    DeepConstLiteral<{ outer: { inner: { state: "ready" } } }>,
    {
      readonly outer: {
        readonly inner: { readonly state: "ready" };
      };
    }
  >
>;
type _03b = Expect<
  Equal<
    DeepConstLiteral<{ labels: ["a", "b"]; enabled: true }>,
    { readonly labels: readonly ["a", "b"]; readonly enabled: true }
  >
>;
type _03c = Expect<
  Equal<DeepConstLiteral<readonly []>, readonly []>
>;
type _03d = Expect<Equal<DeepConstLiteral<never>, never>>;

// 4. Preserve only a tag assertion while another mutable property stays widened.
export type SingleConstField<
  Kind extends PropertyKey,
  Payload,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<SingleConstField<"text", "value">, { kind: "text"; payload: string }>
>;
type _04b = Expect<
  Equal<SingleConstField<"count", 1>, { kind: "count"; payload: number }>
>;
type _04c = Expect<
  Equal<SingleConstField<"flag", true>, { kind: "flag"; payload: boolean }>
>;
type _04d = Expect<
  Equal<SingleConstField<never, never>, { kind: never; payload: never }>
>;

// 5. Convert a supplied tuple shape to its readonly const form.
export type ConstTuple<Items extends readonly unknown[]> =
  TODO; // TODO(koan)

type _05a = Expect<
  Equal<ConstTuple<["write", "file"]>, readonly ["write", "file"]>
>;
type _05b = Expect<
  Equal<ConstTuple<["a", 1, true]>, readonly ["a", 1, true]>
>;
type _05c = Expect<Equal<ConstTuple<[]>, readonly []>>;
type _05d = Expect<
  Equal<ConstTuple<readonly [null, undefined]>, readonly [null, undefined]>
>;

// 6. Recover a const tuple's first item, element union, and literal length.
export type ConstTupleProfile<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    ConstTupleProfile<readonly ["a", 1, true]>,
    [first: "a", element: "a" | 1 | true, length: 3]
  >
>;
type _06b = Expect<
  Equal<
    ConstTupleProfile<readonly ["write", "file"]>,
    [first: "write", element: "write" | "file", length: 2]
  >
>;
type _06c = Expect<
  Equal<
    ConstTupleProfile<readonly []>,
    [first: never, element: never, length: 0]
  >
>;
type _06d = Expect<
  Equal<
    ConstTupleProfile<readonly [null]>,
    [first: null, element: null, length: 1]
  >
>;

// 7. Deeply preserve each row of a nested tuple literal.
export type NestedConstTuple<Rows extends readonly (readonly unknown[])[]> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    NestedConstTuple<[["x", 1], ["y", 2]]>,
    readonly [readonly ["x", 1], readonly ["y", 2]]
  >
>;
type _07b = Expect<
  Equal<
    NestedConstTuple<[[true], [false]]>,
    readonly [readonly [true], readonly [false]]
  >
>;
type _07c = Expect<
  Equal<NestedConstTuple<[]>, readonly []>
>;
type _07d = Expect<
  Equal<
    NestedConstTuple<readonly [readonly []]>,
    readonly [readonly []]
  >
>;

// ─── Closed domains derived from const collections ─────────────────────────

// 8. Derive a closed union from the elements of a readonly collection.
export type ConstCollectionUnion<
  Collection extends readonly unknown[],
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<ConstCollectionUnion<readonly ["a", 1, true]>, "a" | 1 | true>
>;
type _08b = Expect<
  Equal<
    ConstCollectionUnion<readonly [{ readonly type: "a" }, { readonly type: "b" }]>,
    { readonly type: "a" } | { readonly type: "b" }
  >
>;
type _08c = Expect<
  Equal<ConstCollectionUnion<readonly []>, never>
>;
type _08d = Expect<
  Equal<ConstCollectionUnion<readonly [null, undefined, number]>, null | undefined | number>
>;

// 9. Recover a derived domain's tag and payload unions.
export type DerivedDomainProfile<
  Union,
  TagKey extends keyof Union,
  PayloadKey extends keyof Union,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    DerivedDomainProfile<GivenAction, "type", "payload">,
    [tags: "text" | "count" | "empty", payloads: "hello" | 1 | null]
  >
>;
type _09b = Expect<
  Equal<
    DerivedDomainProfile<
      | { readonly kind: "a"; readonly value: true }
      | { readonly kind: "b"; readonly value: false },
      "kind",
      "value"
    >,
    [tags: "a" | "b", payloads: boolean]
  >
>;
type _09c = Expect<
  Equal<
    DerivedDomainProfile<
      { readonly kind: "only"; readonly value: never },
      "kind",
      "value"
    >,
    [tags: "only", payloads: never]
  >
>;
type _09d = Expect<
  Equal<
    DerivedDomainProfile<
      { readonly kind: 0; readonly value: readonly [] },
      "kind",
      "value"
    >,
    [tags: 0, payloads: readonly []]
  >
>;

// 10. Select the correlated const member for one literal discriminator.
export type ConstDiscriminantMember<
  Union,
  Key extends keyof Union,
  Tag,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    ConstDiscriminantMember<GivenAction, "type", "text">,
    { readonly type: "text"; readonly payload: "hello" }
  >
>;
type _10b = Expect<
  Equal<
    ConstDiscriminantMember<GivenAction, "type", "count">,
    { readonly type: "count"; readonly payload: 1 }
  >
>;
type _10c = Expect<
  Equal<
    ConstDiscriminantMember<GivenAction, "type", "text" | "empty">,
    | { readonly type: "text"; readonly payload: "hello" }
    | { readonly type: "empty"; readonly payload: null }
  >
>;
type _10d = Expect<
  Equal<ConstDiscriminantMember<GivenAction, "type", "missing">, never>
>;

// 11. Recover a const registry's exact key and value unions.
export type ConstRegistryProfile<Registry extends object> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ConstRegistryProfile<{
      readonly text: { readonly type: "text"; readonly payload: "hello" };
      readonly count: { readonly type: "count"; readonly payload: 1 };
    }>,
    [
      keys: "text" | "count",
      values:
        | { readonly type: "text"; readonly payload: "hello" }
        | { readonly type: "count"; readonly payload: 1 },
    ]
  >
>;
type _11b = Expect<
  Equal<
    ConstRegistryProfile<{ readonly only: readonly [] }>,
    [keys: "only", values: readonly []]
  >
>;
type _11c = Expect<
  Equal<ConstRegistryProfile<{}>, [keys: never, values: never]>
>;
type _11d = Expect<
  Equal<
    ConstRegistryProfile<{ readonly 0: "zero"; readonly 1: "one" }>,
    [keys: 0 | 1, values: "zero" | "one"]
  >
>;

// ─── Spreads, references, checking, and factories ──────────────────────────

// 12. Merge a spread base with const-preserved overriding literal fields.
export type ConstSpread<Base, Extra> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    ConstSpread<{ readonly kind: "base"; readonly value: 1 }, { extra: true }>,
    { readonly kind: "base"; readonly value: 1; readonly extra: true }
  >
>;
type _12b = Expect<
  Equal<
    ConstSpread<{ readonly kind: "base"; readonly count: 1 }, { count: 2 }>,
    { readonly kind: "base"; readonly count: 2 }
  >
>;
type _12c = Expect<
  Equal<
    ConstSpread<{}, { nested: { enabled: true } }>,
    { readonly nested: { readonly enabled: true } }
  >
>;
type _12d = Expect<Equal<ConstSpread<{}, {}>, {}>>;

// 13. Keep referenced storage mutable while deeply preserving inline syntax.
export type ReferenceAndLiteral<
  Referenced,
  Literal,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    ReferenceAndLiteral<
      { count: number; labels: string[] },
      { count: 1; labels: ["a"] }
    >,
    {
      readonly shared: { count: number; labels: string[] };
      readonly literal: { readonly count: 1; readonly labels: readonly ["a"] };
    }
  >
>;
type _13b = Expect<
  Equal<
    ReferenceAndLiteral<{ count: number }, { enabled: true }>,
    {
      readonly shared: { count: number };
      readonly literal: { readonly enabled: true };
    }
  >
>;
type _13c = Expect<
  Equal<
    ReferenceAndLiteral<string[], []>,
    { readonly shared: string[]; readonly literal: readonly [] }
  >
>;
type _13d = Expect<
  Equal<
    ReferenceAndLiteral<never, never>,
    { readonly shared: never; readonly literal: never }
  >
>;

// 14. Preserve exactly the type already available from a referenced expression.
export type ConstReferencedValue<Available> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<ConstReferencedValue<string>, { readonly value: string }>
>;
type _14b = Expect<
  Equal<ConstReferencedValue<"text">, { readonly value: "text" }>
>;
type _14c = Expect<
  Equal<ConstReferencedValue<"a" | "b">, { readonly value: "a" | "b" }>
>;
type _14d = Expect<
  Equal<ConstReferencedValue<number>, { readonly value: number }>
>;

// 15. Const-preserve a value only when it satisfies the supplied shape.
export type CheckedConst<Value, Shape> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    CheckedConst<
      { kind: "text"; payload: "hello" },
      { kind: "text" | "count"; payload: string | number }
    >,
    { readonly kind: "text"; readonly payload: "hello" }
  >
>;
type _15b = Expect<
  Equal<
    CheckedConst<
      { kind: "missing"; payload: true },
      { kind: "text" | "count"; payload: string | number }
    >,
    never
  >
>;
type _15c = Expect<
  Equal<
    CheckedConst<{ kind: "a"; enabled: true }, { kind: "a" | "b"; enabled: boolean }>,
    { readonly kind: "a"; readonly enabled: true }
  >
>;
type _15d = Expect<Equal<CheckedConst<never, {}>, never>>;

// 16. Contrast a const-preserved value with an explicitly annotated shape.
export type ConstVsAnnotation<Value, Shape> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    ConstVsAnnotation<
      { kind: "a"; enabled: true },
      { kind: "a" | "b"; enabled: boolean }
    >,
    [
      constValue: { readonly kind: "a"; readonly enabled: true },
      annotated: { kind: "a" | "b"; enabled: boolean },
    ]
  >
>;
type _16b = Expect<
  Equal<
    ConstVsAnnotation<["a", 1], Array<string | number>>,
    [constValue: readonly ["a", 1], annotated: Array<string | number>]
  >
>;
type _16c = Expect<
  Equal<
    ConstVsAnnotation<{ value: null }, { value: unknown }>,
    [constValue: { readonly value: null }, annotated: { value: unknown }]
  >
>;
type _16d = Expect<
  Equal<ConstVsAnnotation<never, never>, [constValue: never, annotated: never]>
>;

// 17. Build a factory result with a fixed readonly tag and dynamic payload.
export type ConstFactoryResult<Tag extends PropertyKey, Payload> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    ConstFactoryResult<"text", string>,
    { readonly kind: "text"; readonly payload: string }
  >
>;
type _17b = Expect<
  Equal<
    ConstFactoryResult<"count", number>,
    { readonly kind: "count"; readonly payload: number }
  >
>;
type _17c = Expect<
  Equal<
    ConstFactoryResult<"empty", null>,
    { readonly kind: "empty"; readonly payload: null }
  >
>;
type _17d = Expect<
  Equal<
    ConstFactoryResult<never, never>,
    { readonly kind: never; readonly payload: never }
  >
>;

// 18. Construct the discriminated union produced by several const factories.
export type ConstFactoryUnion<
  Tags extends PropertyKey,
  Payload,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    ConstFactoryUnion<"text" | "count", string | number>,
    | { readonly kind: "text"; readonly payload: string | number }
    | { readonly kind: "count"; readonly payload: string | number }
  >
>;
type _18b = Expect<
  Equal<
    ConstFactoryUnion<"only", readonly []>,
    { readonly kind: "only"; readonly payload: readonly [] }
  >
>;
type _18c = Expect<Equal<ConstFactoryUnion<never, string>, never>>;
type _18d = Expect<
  Equal<
    ConstFactoryUnion<1 | 2, boolean>,
    | { readonly kind: 1; readonly payload: boolean }
    | { readonly kind: 2; readonly payload: boolean }
  >
>;

// ─── Tuple commands and const-assertion boundaries ─────────────────────────

// 19. Select the correlated payload from a readonly discriminated tuple.
export type ConstTuplePayload<
  Union extends readonly [PropertyKey, unknown],
  Tag extends PropertyKey,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    ConstTuplePayload<
      readonly ["write", string] | readonly ["read", number],
      "write"
    >,
    string
  >
>;
type _19b = Expect<
  Equal<
    ConstTuplePayload<
      readonly ["write", string] | readonly ["read", number],
      "read"
    >,
    number
  >
>;
type _19c = Expect<
  Equal<
    ConstTuplePayload<readonly ["a", 1] | readonly ["b", 2], "a" | "b">,
    1 | 2
  >
>;
type _19d = Expect<
  Equal<ConstTuplePayload<readonly ["only", never], "missing">, never>
>;

// 20. Build a readonly computed property from a preserved key and value.
export type ConstComputedProperty<
  Key extends PropertyKey,
  Value,
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<ConstComputedProperty<"field", "value">, { readonly field: "value" }>
>;
type _20b = Expect<
  Equal<
    ConstComputedProperty<"x" | "y", 1>,
    { readonly x: 1; readonly y: 1 }
  >
>;
type _20c = Expect<
  Equal<ConstComputedProperty<42, true>, { readonly 42: true }>
>;
type _20d = Expect<Equal<ConstComputedProperty<never, never>, {}>>;

// 21. Construct the exact readonly tuple for nullish and non-literal numeric values.
export type SpecialConstTuple<NumberValue extends number> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<SpecialConstTuple<number>, readonly [null, undefined, number]>
>;
type _21b = Expect<
  Equal<SpecialConstTuple<1>, readonly [null, undefined, 1]>
>;
type _21c = Expect<
  Equal<SpecialConstTuple<0 | 1>, readonly [null, undefined, 0 | 1]>
>;
type _21d = Expect<
  Equal<SpecialConstTuple<never>, readonly [null, undefined, never]>
>;

// 22. Decide whether a syntax category directly accepts a const assertion.
export type ConstExpressionEligible<
  Kind extends ConstExpressionKind,
> = TODO; // TODO(koan)

type _22a = Expect<Equal<ConstExpressionEligible<"object-literal">, true>>;
type _22b = Expect<Equal<ConstExpressionEligible<"array-literal">, true>>;
type _22c = Expect<Equal<ConstExpressionEligible<"enum-member">, true>>;
type _22d = Expect<Equal<ConstExpressionEligible<"call-expression">, false>>;
type _22e = Expect<
  Equal<ConstExpressionEligible<"string-literal" | "call-expression">, boolean>
>;

// 23. Record readonly view, runtime freezing, and validation for each policy.
export type ConstPolicyProfile<Policy extends ConstPolicy> = TODO; // TODO(koan)

type _23a = Expect<
  Equal<
    ConstPolicyProfile<"as-const">,
    [readonlyView: true, runtimeFrozen: false, validates: false]
  >
>;
type _23b = Expect<
  Equal<
    ConstPolicyProfile<"freeze">,
    [readonlyView: true, runtimeFrozen: true, validates: false]
  >
>;
type _23c = Expect<
  Equal<
    ConstPolicyProfile<"assertion">,
    [readonlyView: true, runtimeFrozen: false, validates: false]
  >
>;
type _23d = Expect<
  Equal<
    ConstPolicyProfile<"satisfies">,
    [readonlyView: false, runtimeFrozen: false, validates: true]
  >
>;
