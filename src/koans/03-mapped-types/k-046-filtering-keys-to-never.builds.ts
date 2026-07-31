import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-046: filtering keys to never — constructions
 * =============================================================================
 *
 * These constructions emit a source key when a predicate succeeds and remap it
 * to `never` when it fails. They cover key inclusion and exclusion, complete
 * value assignability versus overlap, optional-read normalization, modifier
 * preservation and transformation, any/never guards, all PropertyKey families,
 * index signatures, tuple positions, composition, and public/schema views.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

declare const givenSecret: unique symbol;

interface GivenBase {
  id: number;
  name: string;
  active: boolean;
  0: Date;
  [givenSecret]: bigint;
}

interface GivenValues {
  text: string;
  count: number;
  literal: 1;
  flag: boolean;
  maybeText: string | undefined;
  mixed: string | number;
  callback: () => void;
  top: unknown;
  bottom: never;
}

interface GivenModified {
  readonly id: number;
  readonly code?: string;
  label?: string;
  count?: number;
  explicit: string | undefined;
  active: boolean;
}

interface GivenSpecialValues {
  text: string;
  bottom: never;
  poison: any;
  top: unknown;
}

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;
type GivenIsNever<Value> = [Value] extends [never] ? true : false;

type GivenWithout<Source, Removed extends PropertyKey> = {
  [Key in keyof Source as Key extends Removed ? never : Key]: Source[Key];
};

type GivenOnly<Source, Included extends PropertyKey> = {
  [Key in keyof Source as Key extends Included ? Key : never]: Source[Key];
};

type GivenPickValue<Source, Value> = {
  [Key in keyof Source as
    Source[Key] extends Value ? Key : never]: Source[Key];
};

type GivenPickOverlap<Source, Value> = {
  [Key in keyof Source as
    Extract<Source[Key], Value> extends never ? never : Key]: Source[Key];
};

type GivenPickNonNullable<Source, Value> = {
  [Key in keyof Source as
    NonNullable<Source[Key]> extends Value ? Key : never]: Source[Key];
};

type GivenSafePickValue<Source, Value> = {
  [Key in keyof Source as
    GivenIsAny<Source[Key]> extends true
      ? never
      : [Source[Key]] extends [never]
        ? never
        : Source[Key] extends Value
          ? Key
          : never]: Source[Key];
};

// ─── Key-identity filters ──────────────────────────────────────────────────

// 1. Remove every source key assignable to the supplied key domain.
export type WithoutKeys<
  Source,
  Removed extends PropertyKey,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    WithoutKeys<GivenBase, "active" | "name">,
    { id: number; 0: Date; [givenSecret]: bigint }
  >
>;
type _01b = Expect<Equal<WithoutKeys<GivenBase, never>, GivenBase>>;
type _01c = Expect<Equal<WithoutKeys<GivenBase, PropertyKey>, {}>>;
type _01d = Expect<
  Equal<WithoutKeys<GivenBase, "missing">, GivenBase>
>;
type _01e = Expect<
  Equal<WithoutKeys<Record<string, number>, "secret">, Record<string, number>>
>;

// 2. Keep only source keys assignable to the supplied key domain.
export type OnlyKeys<
  Source,
  Included extends PropertyKey,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<OnlyKeys<GivenBase, "id" | "active">, { id: number; active: boolean }>
>;
type _02b = Expect<Equal<OnlyKeys<GivenBase, never>, {}>>;
type _02c = Expect<Equal<OnlyKeys<GivenBase, PropertyKey>, GivenBase>>;
type _02d = Expect<
  Equal<OnlyKeys<Record<string, number>, string>, Record<string, number>>
>;
type _02e = Expect<
  Equal<
    OnlyKeys<readonly ["left", "right"], "0" | "1">,
    { readonly "0": "left"; readonly "1": "right" }
  >
>;

// ─── Value predicates ──────────────────────────────────────────────────────

// 3. Keep properties whose complete indexed value is assignable to Value.
export type PickByValue<Source, Value> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    PickByValue<GivenValues, string>,
    { text: string; bottom: never }
  >
>;
type _03b = Expect<
  Equal<
    PickByValue<GivenValues, number>,
    { count: number; literal: 1; bottom: never }
  >
>;
type _03c = Expect<
  Equal<
    PickByValue<GivenValues, string | number>,
    {
      text: string;
      count: number;
      literal: 1;
      mixed: string | number;
      bottom: never;
    }
  >
>;
type _03d = Expect<Equal<PickByValue<GivenValues, unknown>, GivenValues>>;
type _03e = Expect<Equal<PickByValue<{}, string>, {}>>;

// 4. Keep properties with at least one union member overlapping Value.
export type PickByOverlap<Source, Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    PickByOverlap<GivenValues, string>,
    { text: string; maybeText: string | undefined; mixed: string | number }
  >
>;
type _04b = Expect<
  Equal<
    PickByOverlap<GivenValues, number>,
    { count: number; literal: 1; mixed: string | number }
  >
>;
type _04c = Expect<Equal<PickByOverlap<GivenValues, Date>, {}>>;
type _04d = Expect<
  Equal<
    PickByOverlap<{ value: string | number; flag: boolean }, string>,
    { value: string | number }
  >
>;
type _04e = Expect<Equal<PickByOverlap<{}, string>, {}>>;

// 5. Remove null and undefined before testing complete-value assignability.
export type PickByNonNullableValue<Source, Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    PickByNonNullableValue<GivenModified, string>,
    {
      readonly code?: string;
      label?: string;
      explicit: string | undefined;
    }
  >
>;
type _05b = Expect<
  Equal<
    PickByNonNullableValue<GivenModified, number>,
    { readonly id: number; count?: number }
  >
>;
type _05c = Expect<
  Equal<
    PickByNonNullableValue<
      {
        requiredText: string;
        optionalText?: string;
        absent: undefined;
      },
      string
    >,
    { requiredText: string; optionalText?: string; absent: undefined }
  >
>;
type _05d = Expect<
  Equal<
    PickByNonNullableValue<{ value: null | number; flag: boolean }, number>,
    { value: null | number }
  >
>;
type _05e = Expect<Equal<PickByNonNullableValue<{}, string>, {}>>;

// 6. Keep assignable values while explicitly rejecting any and never.
export type SafePickByValue<Source, Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<SafePickByValue<GivenSpecialValues, string>, { text: string }>
>;
type _06b = Expect<
  Equal<
    SafePickByValue<GivenSpecialValues, unknown>,
    { text: string; top: unknown }
  >
>;
type _06c = Expect<
  Equal<
    SafePickByValue<{ literal: 1; count: number; mixed: string | number }, number>,
    { literal: 1; count: number }
  >
>;
type _06d = Expect<Equal<SafePickByValue<{}, string>, {}>>;

// 7. Require both a string source key and a complete value assignable to Value.
export type PickStringKeysByValue<Source, Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    PickStringKeysByValue<GivenBase, string>,
    { name: string }
  >
>;
type _07b = Expect<
  Equal<
    PickStringKeysByValue<GivenBase, number | boolean>,
    { id: number; active: boolean }
  >
>;
type _07c = Expect<
  Equal<
    PickStringKeysByValue<
      { label?: string; 0: string; [givenSecret]: string },
      string | undefined
    >,
    { label?: string }
  >
>;
type _07d = Expect<Equal<PickStringKeysByValue<{}, string>, {}>>;

// ─── Modifier policy after filtering ───────────────────────────────────────

// 8. Filter by complete value and remove readonly from every survivor.
export type MutableValuePick<Source, Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<MutableValuePick<GivenModified, number>, { id: number }>
>;
type _08b = Expect<
  Equal<
    MutableValuePick<GivenModified, string | undefined>,
    { code?: string; label?: string; explicit: string | undefined }
  >
>;
type _08c = Expect<
  Equal<
    MutableValuePick<{ readonly a: 1; b: 2 }, number>,
    { a: 1; b: 2 }
  >
>;
type _08d = Expect<Equal<MutableValuePick<{}, string>, {}>>;

// 9. Filter after NonNullable and require every surviving property.
export type RequiredNonNullablePick<Source, Value> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    RequiredNonNullablePick<GivenModified, string>,
    {
      readonly code: string;
      label: string;
      explicit: string | undefined;
    }
  >
>;
type _09b = Expect<
  Equal<
    RequiredNonNullablePick<GivenModified, number>,
    { readonly id: number; count: number }
  >
>;
type _09c = Expect<
  Equal<
    RequiredNonNullablePick<{ value?: number | undefined }, number>,
    { value: number | undefined }
  >
>;
type _09d = Expect<Equal<RequiredNonNullablePick<{}, string>, {}>>;

// ─── PropertyKey families and broad domains ────────────────────────────────

// 10. Partition one source into its string, number, and symbol-keyed views.
export type KeyFamilyPartitions<Source> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    KeyFamilyPartitions<GivenBase>[0],
    { id: number; name: string; active: boolean }
  >
>;
type _10b = Expect<
  Equal<KeyFamilyPartitions<GivenBase>[1], { 0: Date }>
>;
type _10c = Expect<
  Equal<
    KeyFamilyPartitions<GivenBase>[2],
    { [givenSecret]: bigint }
  >
>;
type _10d = Expect<
  Equal<keyof KeyFamilyPartitions<{}>[0 | 1 | 2], never>
>;

// 11. Pair the included and excluded views for one key domain.
export type KeyDomainProfile<
  Source,
  Domain extends PropertyKey,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    KeyDomainProfile<Record<string, number>, string>,
    [included: Record<string, number>, excluded: {}]
  >
>;
type _11b = Expect<
  Equal<
    KeyDomainProfile<Record<string, number>, "secret">,
    [included: {}, excluded: Record<string, number>]
  >
>;
type _11c = Expect<
  Equal<
    KeyDomainProfile<Record<number, string>, number>,
    [included: Record<number, string>, excluded: {}]
  >
>;
type _11d = Expect<
  Equal<
    KeyDomainProfile<GivenBase, string | typeof givenSecret>,
    [
      included: {
        id: number;
        name: string;
        active: boolean;
        [givenSecret]: bigint;
      },
      excluded: { 0: Date },
    ]
  >
>;

// 12. Extract selected string-form tuple positions into a plain object.
export type TuplePositions<
  Source extends readonly unknown[],
  Positions extends `${number}`,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    TuplePositions<readonly ["left", "right"], "0" | "1">,
    { readonly "0": "left"; readonly "1": "right" }
  >
>;
type _12b = Expect<
  Equal<
    TuplePositions<[name?: string, count?: number], "0">,
    { "0"?: string }
  >
>;
type _12c = Expect<
  Equal<TuplePositions<readonly ["a", 1, true], "1">, { readonly "1": 1 }>
>;
type _12d = Expect<Equal<TuplePositions<readonly [], "0">, {}>>;

// ─── Filter composition ────────────────────────────────────────────────────

// 13. Remove one domain, then keep only a second domain from the survivors.
export type OnlyAfterWithout<
  Source,
  Removed extends PropertyKey,
  Included extends PropertyKey,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    OnlyAfterWithout<GivenBase, "active", "id" | "active">,
    { id: number }
  >
>;
type _13b = Expect<
  Equal<
    OnlyAfterWithout<GivenBase, "name", string>,
    { id: number; active: boolean }
  >
>;
type _13c = Expect<
  Equal<OnlyAfterWithout<GivenBase, PropertyKey, PropertyKey>, {}>
>;
type _13d = Expect<Equal<OnlyAfterWithout<{}, "x", "y">, {}>>;

// 14. Keep one domain, then remove a subset from that result.
export type WithoutAfterOnly<
  Source,
  Included extends PropertyKey,
  Removed extends PropertyKey,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    WithoutAfterOnly<GivenBase, "id" | "name", "name">,
    { id: number }
  >
>;
type _14b = Expect<
  Equal<
    WithoutAfterOnly<GivenBase, string, "active">,
    { id: number; name: string }
  >
>;
type _14c = Expect<
  Equal<WithoutAfterOnly<GivenBase, never, PropertyKey>, {}>
>;
type _14d = Expect<Equal<WithoutAfterOnly<{}, "x", "x">, {}>>;

// 15. Remove named properties before selecting by complete value.
export type ValuePickAfterWithout<
  Source,
  Removed extends PropertyKey,
  Value,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ValuePickAfterWithout<GivenValues, "literal", number>,
    { count: number; bottom: never }
  >
>;
type _15b = Expect<
  Equal<
    ValuePickAfterWithout<GivenValues, "text", string>,
    { bottom: never }
  >
>;
type _15c = Expect<
  Equal<
    ValuePickAfterWithout<GivenValues, never, boolean>,
    { flag: boolean; bottom: never }
  >
>;
type _15d = Expect<Equal<ValuePickAfterWithout<{}, "x", string>, {}>>;

// 16. Select overlapping values, then remove named survivors.
export type OverlapAfterWithout<
  Source,
  Value,
  Removed extends PropertyKey,
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    OverlapAfterWithout<GivenValues, string, "text">,
    { maybeText: string | undefined; mixed: string | number }
  >
>;
type _16b = Expect<
  Equal<
    OverlapAfterWithout<GivenValues, number, "mixed">,
    { count: number; literal: 1 }
  >
>;
type _16c = Expect<
  Equal<OverlapAfterWithout<GivenValues, Date, PropertyKey>, {}>
>;
type _16d = Expect<Equal<OverlapAfterWithout<{}, string, "x">, {}>>;

// 17. Normalize nullish values, then keep only named survivors.
export type OnlyAfterNonNullablePick<
  Source,
  Value,
  Included extends PropertyKey,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    OnlyAfterNonNullablePick<GivenModified, string, "code" | "explicit">,
    { readonly code?: string; explicit: string | undefined }
  >
>;
type _17b = Expect<
  Equal<
    OnlyAfterNonNullablePick<GivenModified, number, "id" | "count">,
    { readonly id: number; count?: number }
  >
>;
type _17c = Expect<
  Equal<
    OnlyAfterNonNullablePick<GivenModified, string, never>,
    {}
  >
>;
type _17d = Expect<Equal<OnlyAfterNonNullablePick<{}, string, "x">, {}>>;

// ─── Public views, partitions, and special predicates ──────────────────────

// 18. Remove credential fields from any compatible user shape.
export type PublicUserView<
  User extends {
    id: unknown;
    name?: unknown;
    password: unknown;
    token: unknown;
  },
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    PublicUserView<{
      id: number;
      name: string;
      password: string;
      token: string;
    }>,
    { id: number; name: string }
  >
>;
type _18b = Expect<
  Equal<
    PublicUserView<{
      readonly id: 1;
      name?: string;
      password: string;
      token: string;
      active: boolean;
    }>,
    { readonly id: 1; name?: string; active: boolean }
  >
>;
type _18c = Expect<
  Equal<
    keyof PublicUserView<{
      id: number;
      name: string;
      password: string;
      token: string;
      role: "admin";
    }>,
    "id" | "name" | "role"
  >
>;
type _18d = Expect<
  Equal<
    PublicUserView<{
      id: never;
      name: unknown;
      password: undefined;
      token: null;
    }>,
    { id: never; name: unknown }
  >
>;

// 19. Partition properties into complete-value matches and non-matches.
export type ValuePartition<Source, Value> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    ValuePartition<{ name: string; count: number; active: boolean }, number>,
    [
      matching: { count: number },
      remaining: { name: string; active: boolean },
    ]
  >
>;
type _19b = Expect<
  Equal<
    ValuePartition<GivenModified, string | undefined>,
    [
      matching: {
        readonly code?: string;
        label?: string;
        explicit: string | undefined;
      },
      remaining: {
        readonly id: number;
        count?: number;
        active: boolean;
      },
    ]
  >
>;
type _19c = Expect<
  Equal<
    ValuePartition<{ value: never; top: unknown }, string>,
    [matching: { value: never }, remaining: { top: unknown }]
  >
>;
type _19d = Expect<
  Equal<keyof ValuePartition<{}, string>[0 | 1], never>
>;

// 20. Compare the raw extends filter with its any/never-safe counterpart.
export type SpecialSelectionProfile<Source, Value> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    SpecialSelectionProfile<GivenSpecialValues, string>,
    [
      raw: { text: string; bottom: never; poison: any },
      safe: { text: string },
    ]
  >
>;
type _20b = Expect<
  Equal<
    SpecialSelectionProfile<GivenSpecialValues, never>,
    [
      raw: { bottom: never; poison: any },
      safe: {},
    ]
  >
>;
type _20c = Expect<
  Equal<
    SpecialSelectionProfile<GivenSpecialValues, unknown>,
    [
      raw: GivenSpecialValues,
      safe: { text: string; top: unknown },
    ]
  >
>;
type _20d = Expect<
  Equal<
    keyof SpecialSelectionProfile<{ value: string | number }, string>[0],
    never
  >
>;
type _20e = Expect<
  Equal<
    keyof SpecialSelectionProfile<{ value: string | number }, string>[1],
    never
  >
>;

// 21. Decide whether a proposed remapped destination is a valid PropertyKey
//     domain.
export type FilterDestinationAllowed<Destination> = TODO; // TODO(koan)

type _21a = Expect<Equal<FilterDestinationAllowed<"value">, true>>;
type _21b = Expect<
  Equal<FilterDestinationAllowed<string | number | symbol>, true>
>;
type _21c = Expect<
  Equal<FilterDestinationAllowed<{ source: "value" }>, false>
>;
type _21d = Expect<
  Equal<FilterDestinationAllowed<"value" | { source: "value" }>, false>
>;

// 22. Classify whether a special source produces never, an empty map, or
//     surviving properties under a whole-value filter.
export type SpecialSourceFilterKind<Source, Value> = TODO; // TODO(koan)

type _22a = Expect<
  Equal<SpecialSourceFilterKind<unknown, string>, "empty">
>;
type _22b = Expect<
  Equal<SpecialSourceFilterKind<never, string>, "never">
>;
type _22c = Expect<Equal<SpecialSourceFilterKind<{}, string>, "empty">>;
type _22d = Expect<
  Equal<SpecialSourceFilterKind<GivenValues, string>, "populated">
>;
