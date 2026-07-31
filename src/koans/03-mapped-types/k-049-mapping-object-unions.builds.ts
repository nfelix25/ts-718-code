import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-049: mapping object unions — constructions
 * =============================================================================
 *
 * These constructions distinguish a generic homomorphic transform—which maps
 * each union member independently—from a detached loop over the keys common to
 * the whole union. They cover boxed and flagged variants, member extraction,
 * built-in modifier transforms, common views, Pick/Omit contrasts,
 * discriminant removal and prefixing, shallow values, containers, empty and
 * special members, broad domains, collisions, and composition. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenVariant =
  | { kind: "text"; value: string; length: number }
  | { kind: "count"; value: number; step: number };

type GivenShape =
  | { kind: "circle"; color: string; radius: number }
  | { kind: "square"; color: string; side: number };

type GivenBox<Source> = {
  [Key in keyof Source]: { value: Source[Key] };
};

type GivenFlags<Source> = {
  [Key in keyof Source]: boolean;
};

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;
type GivenIsNever<Value> = [Value] extends [never] ? true : false;

// ─── Homomorphic member transforms and extraction ──────────────────────────

// 1. Box every property of every union member independently.
export type BoxProperties<Source> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    BoxProperties<GivenShape>,
    | {
        kind: { value: "circle" };
        color: { value: string };
        radius: { value: number };
      }
    | {
        kind: { value: "square" };
        color: { value: string };
        side: { value: number };
      }
  >
>;
type _01b = Expect<
  Equal<
    BoxProperties<{ a: 1 } | { b: 2 }>,
    { a: { value: 1 } } | { b: { value: 2 } }
  >
>;
type _01c = Expect<
  Equal<
    BoxProperties<
      { common: 1; a: "a" } | { common: 2; b: "b" }
    >["common"],
    { value: 1 } | { value: 2 }
  >
>;
type _01d = Expect<
  Equal<BoxProperties<{ readonly id?: string }>, { readonly id?: { value: string | undefined } }>
>;
type _01e = Expect<
  Equal<
    BoxProperties<string | { value: number }>,
    string | { value: { value: number } }
  >
>;

// 2. Replace every member property with boolean while preserving alternatives.
export type FlagProperties<Source> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    FlagProperties<GivenShape>,
    | { kind: boolean; color: boolean; radius: boolean }
    | { kind: boolean; color: boolean; side: boolean }
  >
>;
type _02b = Expect<
  Equal<
    Extract<FlagProperties<GivenShape>, { radius: boolean }>,
    { kind: boolean; color: boolean; radius: boolean }
  >
>;
type _02c = Expect<
  Equal<
    FlagProperties<{ a: 1 } | { b: 2 }>,
    { a: boolean } | { b: boolean }
  >
>;
type _02d = Expect<Equal<FlagProperties<{}>, {}>>;

// 3. Extract one boxed member by its boxed discriminant value.
export type BoxedVariantByTag<
  Union,
  Tag extends PropertyKey,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    BoxedVariantByTag<GivenShape, "circle">,
    {
      kind: { value: "circle" };
      color: { value: string };
      radius: { value: number };
    }
  >
>;
type _03b = Expect<
  Equal<
    keyof BoxedVariantByTag<GivenShape, "square">,
    "kind" | "color" | "side"
  >
>;
type _03c = Expect<
  Equal<BoxedVariantByTag<GivenVariant, "text">["length"], { value: number }>
>;
type _03d = Expect<
  Equal<BoxedVariantByTag<GivenVariant, "missing">, never>
>;

// ─── Built-in transforms over unions ───────────────────────────────────────

// 4. Make every property optional within each separate union member.
export type PartialMembers<Source> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    PartialMembers<GivenShape>,
    | { kind?: "circle"; color?: string; radius?: number }
    | { kind?: "square"; color?: string; side?: number }
  >
>;
type _04b = Expect<
  Equal<
    Extract<PartialMembers<GivenShape>, { kind?: "circle" }>,
    { kind?: "circle"; color?: string; radius?: number }
  >
>;
type _04c = Expect<
  Equal<
    PartialMembers<
      { readonly kind: "saved"; note?: string }
      | { kind: "draft"; attempts?: number }
    >,
    | { readonly kind?: "saved"; note?: string }
    | { kind?: "draft"; attempts?: number }
  >
>;
type _04d = Expect<Equal<PartialMembers<never>, never>>;

// 5. Make every member property readonly without flattening alternatives.
export type ReadonlyMembers<Source> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    ReadonlyMembers<GivenShape>,
    | { readonly kind: "circle"; readonly color: string; readonly radius: number }
    | { readonly kind: "square"; readonly color: string; readonly side: number }
  >
>;
type _05b = Expect<
  Equal<
    Extract<ReadonlyMembers<GivenShape>, { readonly kind: "square" }>["side"],
    number
  >
>;
type _05c = Expect<
  Equal<
    keyof ReadonlyMembers<GivenShape>,
    "kind" | "color"
  >
>;
type _05d = Expect<Equal<ReadonlyMembers<never>, never>>;

// 6. Apply Required after Partial independently to every member.
export type RequiredPartialMembers<Source> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<RequiredPartialMembers<GivenShape>, GivenShape>
>;
type _06b = Expect<
  Equal<
    RequiredPartialMembers<
      { kind: "a"; value?: string | undefined }
      | { kind: "b"; count?: number }
    >,
    | { kind: "a"; value: string | undefined }
    | { kind: "b"; count: number }
  >
>;
type _06c = Expect<
  Equal<
    RequiredPartialMembers<{ readonly id: string } | { readonly name: string }>,
    { readonly id: string } | { readonly name: string }
  >
>;
type _06d = Expect<Equal<RequiredPartialMembers<never>, never>>;

// ─── Detached common-key views ──────────────────────────────────────────────

// 7. Recover only the keys safe on every union member.
export type CommonKeySet<Union> = TODO; // TODO(koan)

type _07a = Expect<Equal<CommonKeySet<GivenShape>, "kind" | "color">>;
type _07b = Expect<Equal<CommonKeySet<{ a: 1 } | { b: 2 }>, never>>;
type _07c = Expect<
  Equal<
    CommonKeySet<
      { kind: "one"; value: string; shared?: boolean }
      | { kind: "two"; value: number; shared: boolean }
      | { kind: "three"; value: Date; extra: bigint }
    >,
    "kind" | "value"
  >
>;
type _07d = Expect<Equal<CommonKeySet<{} | { id: string }>, never>>;
type _07e = Expect<Equal<CommonKeySet<never>, string | number | symbol>>;

// 8. Build one object containing each common key and its union-wide read type.
export type CommonValueView<
  Union,
  Keys extends keyof Union = keyof Union,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    CommonValueView<GivenShape>,
    { kind: "circle" | "square"; color: string }
  >
>;
type _08b = Expect<
  Equal<
    CommonValueView<GivenVariant>,
    { kind: "text" | "count"; value: string | number }
  >
>;
type _08c = Expect<
  Equal<
    CommonValueView<
      { kind: "left"; shared?: string }
      | { kind: "right"; shared: string }
    >,
    { kind: "left" | "right"; shared?: string }
  >
>;
type _08d = Expect<Equal<keyof CommonValueView<{ a: 1 } | { b: 2 }>, never>>;

// 9. Build one boolean object over the detached common key set.
export type ConcreteCommonFlags<
  Union,
  Keys extends keyof Union = keyof Union,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ConcreteCommonFlags<GivenShape>, { kind: boolean; color: boolean }>
>;
type _09b = Expect<
  Equal<ConcreteCommonFlags<GivenVariant>, { kind: boolean; value: boolean }>
>;
type _09c = Expect<
  Equal<keyof ConcreteCommonFlags<{ a: 1 } | { b: 2 }>, never>
>;
type _09d = Expect<Equal<ConcreteCommonFlags<{}>, {}>>;

// 10. Pick the common-key view rather than preserving outer alternatives.
export type CommonPick<Union> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    CommonPick<
      { kind: "a"; common: string; a: number }
      | { kind: "b"; common: string; b: boolean }
    >,
    { kind: "a" | "b"; common: string }
  >
>;
type _10b = Expect<
  Equal<CommonPick<GivenShape>, { kind: "circle" | "square"; color: string }>
>;
type _10c = Expect<
  Equal<keyof CommonPick<{ a: 1 } | { b: 2 }>, never>
>;
type _10d = Expect<Equal<CommonPick<{}>, {}>>;

// ─── Remapping, Omit contrast, and correlation ─────────────────────────────

// 11. Remove `kind` independently from every union member.
export type RemoveDiscriminant<Source> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    RemoveDiscriminant<GivenShape>,
    | { color: string; radius: number }
    | { color: string; side: number }
  >
>;
type _11b = Expect<
  Equal<
    Extract<RemoveDiscriminant<GivenShape>, { radius: number }>,
    { color: string; radius: number }
  >
>;
type _11c = Expect<
  Equal<
    keyof RemoveDiscriminant<
      { kind: "a"; value: string } | { kind: "b"; value: string }
    >,
    "value"
  >
>;
type _11d = Expect<
  Equal<
    keyof RemoveDiscriminant<{ kind: "a" } | { kind: "b" }>,
    never
  >
>;
type _11e = Expect<
  Equal<RemoveDiscriminant<{ kind: "only"; id: string }>, { id: string }>
>;

// 12. Use built-in Omit, which constructs a detached common-key view.
export type CommonOmitDiscriminant<Union> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    CommonOmitDiscriminant<
      { kind: "a"; common: string; a: number }
      | { kind: "b"; common: string; b: boolean }
    >,
    { common: string }
  >
>;
type _12b = Expect<
  Equal<CommonOmitDiscriminant<GivenShape>, { color: string }>
>;
type _12c = Expect<
  Equal<
    CommonOmitDiscriminant<
      { kind: "left"; shared?: string }
      | { kind: "right"; shared: string }
    >,
    { shared?: string }
  >
>;
type _12d = Expect<
  Equal<keyof CommonOmitDiscriminant<{ kind: "a"; a: 1 } | { kind: "b"; b: 2 }>, never>
>;

// 13. Prefix every string key independently within each union member.
export type PrefixUnionKeys<Source> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    PrefixUnionKeys<GivenShape>,
    | { xKind: "circle"; xColor: string; xRadius: number }
    | { xKind: "square"; xColor: string; xSide: number }
  >
>;
type _13b = Expect<
  Equal<
    Extract<PrefixUnionKeys<GivenShape>, { xRadius: number }>,
    { xKind: "circle"; xColor: string; xRadius: number }
  >
>;
type _13c = Expect<
  Equal<
    PrefixUnionKeys<{ a: 1 } | { b: 2 }>,
    { xA: 1 } | { xB: 2 }
  >
>;
type _13d = Expect<Equal<PrefixUnionKeys<never>, never>>;

// ─── Shallow values, containers, and empty members ─────────────────────────

// 14. Box one common property without recursively transforming its value.
export type ShallowBoxedValue<
  Union,
  Key extends keyof Union,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    ShallowBoxedValue<
      { nested: { a: 1 } } | { nested: { b: 2 } },
      "nested"
    >,
    { value: { a: 1 } } | { value: { b: 2 } }
  >
>;
type _14b = Expect<
  Equal<
    ShallowBoxedValue<{ value: string } | { value: number }, "value">,
    { value: string } | { value: number }
  >
>;
type _14c = Expect<
  Equal<ShallowBoxedValue<{ list: string[] }, "list">, { value: string[] }>
>;
type _14d = Expect<
  Equal<ShallowBoxedValue<{ item: never }, "item">, { value: never }>
>;

// 15. Characterize homomorphic boxing of array and tuple containers.
export type ContainerBoxProfile<Container extends readonly unknown[]> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ContainerBoxProfile<string[]>,
    [boxed: Array<{ value: string }>, element: { value: string }, length: number]
  >
>;
type _15b = Expect<
  Equal<
    ContainerBoxProfile<string[] | number[]>[0],
    Array<{ value: string }> | Array<{ value: number }>
  >
>;
type _15c = Expect<
  Equal<
    ContainerBoxProfile<readonly ["a", 1]>,
    [
      boxed: readonly [{ value: "a" }, { value: 1 }],
      element: { value: "a" } | { value: 1 },
      length: 2,
    ]
  >
>;
type _15d = Expect<
  Equal<
    ContainerBoxProfile<readonly []>,
    [boxed: readonly [], element: never, length: 0]
  >
>;

// 16. Expose the common keys and recoverable boxed member around an empty
//     alternative.
export type EmptyMemberProfile<Union> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    EmptyMemberProfile<{} | { id: string }>,
    [commonKeys: never, idMember: { id: { value: string } }]
  >
>;
type _16b = Expect<
  Equal<
    EmptyMemberProfile<{ id: string } | { id: string; name: string }>,
    [
      commonKeys: "id",
      idMember:
        | { id: { value: string } }
        | { id: { value: string }; name: { value: string } },
    ]
  >
>;
type _16c = Expect<
  Equal<EmptyMemberProfile<{}>, [commonKeys: never, idMember: never]>
>;
type _16d = Expect<
  Equal<EmptyMemberProfile<never>, [commonKeys: string | number | symbol, idMember: never]>
>;

// ─── Special and broad unions, collisions, and composition ─────────────────

// 17. Classify boxing after unknown, never, and any have affected the union.
export type SpecialBoxProfile<Source> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    SpecialBoxProfile<unknown | { id: string }>,
    [resultIsAny: false, resultIsNever: false, keys: never]
  >
>;
type _17b = Expect<
  Equal<
    SpecialBoxProfile<never>,
    [
      resultIsAny: false,
      resultIsNever: true,
      keys: string | number | symbol,
    ]
  >
>;
type _17c = Expect<
  Equal<
    SpecialBoxProfile<any | { id: string }>,
    [
      resultIsAny: false,
      resultIsNever: false,
      keys: string | number | symbol,
    ]
  >
>;
type _17d = Expect<
  Equal<
    SpecialBoxProfile<unknown>,
    [resultIsAny: false, resultIsNever: false, keys: never]
  >
>;

// 18. Flag a union containing a broad string index member and a fixed member.
export type BroadUnionFlags<Value> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    BroadUnionFlags<number>,
    Record<string, boolean> | { fixed: boolean }
  >
>;
type _18b = Expect<Equal<keyof BroadUnionFlags<number>, "fixed">>;
type _18c = Expect<
  Equal<
    Extract<BroadUnionFlags<number>, { fixed: boolean }>,
    { fixed: boolean }
  >
>;
type _18d = Expect<
  Equal<BroadUnionFlags<never>, Record<string, boolean> | { fixed: boolean }>
>;

// 19. Collapse all detached common keys onto one `all` destination.
export type CollapseCommonKeys<
  Union,
  Keys extends keyof Union = keyof Union,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    CollapseCommonKeys<GivenShape>,
    { all: string }
  >
>;
type _19b = Expect<
  Equal<
    CollapseCommonKeys<GivenVariant>,
    { all: string | number }
  >
>;
type _19c = Expect<
  Equal<
    CollapseCommonKeys<{ value: 1 } | { value: 2 }>,
    { all: 1 | 2 }
  >
>;
type _19d = Expect<
  Equal<CollapseCommonKeys<{ only: never }>, { all: never }>
>;

// 20. Apply Readonly after boxing while preserving the boxed alternatives.
export type ReadonlyBoxed<Source> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    ReadonlyBoxed<GivenShape>,
    | {
        readonly kind: { value: "circle" };
        readonly color: { value: string };
        readonly radius: { value: number };
      }
    | {
        readonly kind: { value: "square" };
        readonly color: { value: string };
        readonly side: { value: number };
      }
  >
>;
type _20b = Expect<
  Equal<
    Extract<ReadonlyBoxed<GivenShape>, { readonly radius: { value: number } }>["kind"],
    { value: "circle" }
  >
>;
type _20c = Expect<
  Equal<ReadonlyBoxed<{ readonly id?: string }>, { readonly id?: { value: string | undefined } }>
>;
type _20d = Expect<Equal<ReadonlyBoxed<never>, never>>;
