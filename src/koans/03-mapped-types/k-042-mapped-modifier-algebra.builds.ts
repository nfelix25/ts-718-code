import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-042: mapped modifier algebra — constructions
 * =============================================================================
 *
 * These constructions add, remove, and compose the readonly and optional
 * modifier axes independently. They cover exact optionality, explicit
 * undefined, shallow object transforms, structural assignability, specialized
 * array and tuple behavior, and update/default APIs. Replace each `TODO` with a
 * type satisfying the assertions directly below it.
 */

type GivenSource = {
  readonly id: number;
  readonly name?: string;
  active?: boolean;
  count: number;
};

type GivenUndefined = {
  optional?: string;
  explicit: string | undefined;
  both?: string | undefined;
  readonly fixed: number | undefined;
};

type GivenNested = {
  readonly config?: {
    readonly enabled: boolean;
    tags: readonly string[];
  };
};

type GivenMutable<Source> = {
  -readonly [Key in keyof Source]: Source[Key];
};

type GivenRequired<Source> = {
  [Key in keyof Source]-?: Source[Key];
};

type GivenReadonly<Source> = {
  +readonly [Key in keyof Source]: Source[Key];
};

type GivenOptional<Source> = {
  [Key in keyof Source]+?: Source[Key];
};

type GivenMutableRequired<Source> = {
  -readonly [Key in keyof Source]-?: Source[Key];
};

type GivenReadonlyOptional<Source> = {
  +readonly [Key in keyof Source]+?: Source[Key];
};

type ReadonlyOperation = "add" | "remove";
type OptionalOperation = "add" | "remove";

// ─── Adding and removing each modifier axis ────────────────────────────────

// 1. Force every source property to readonly while preserving optionality.
export type AddReadonly<Source> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    AddReadonly<GivenSource>,
    {
      readonly id: number;
      readonly name?: string;
      readonly active?: boolean;
      readonly count: number;
    }
  >
>;
type _01b = Expect<
  Equal<AddReadonly<{ id: number }>, { readonly id: number }>
>;
type _01c = Expect<
  Equal<AddReadonly<{ id?: number }>, { readonly id?: number }>
>;
type _01d = Expect<Equal<AddReadonly<{}>, {}>>;

// 2. Force every source property to optional while preserving readonly state.
export type AddOptional<Source> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    AddOptional<GivenSource>,
    {
      readonly id?: number;
      readonly name?: string;
      active?: boolean;
      count?: number;
    }
  >
>;
type _02b = Expect<Equal<AddOptional<{ id: number }>, { id?: number }>>;
type _02c = Expect<
  Equal<AddOptional<{ readonly id: number }>, { readonly id?: number }>
>;
type _02d = Expect<Equal<AddOptional<{}>, {}>>;

// 3. Force every source property to both readonly and optional.
export type AddReadonlyOptional<Source> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    AddReadonlyOptional<GivenSource>,
    {
      readonly id?: number;
      readonly name?: string;
      readonly active?: boolean;
      readonly count?: number;
    }
  >
>;
type _03b = Expect<
  Equal<
    AddReadonlyOptional<{ id: number }>,
    { readonly id?: number }
  >
>;
type _03c = Expect<
  Equal<
    AddReadonlyOptional<{ readonly id?: number }>,
    { readonly id?: number }
  >
>;
type _03d = Expect<Equal<AddReadonlyOptional<{}>, {}>>;

// 4. Remove readonly from every source property without changing optionality.
export type RemoveReadonly<Source> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    RemoveReadonly<GivenSource>,
    { id: number; name?: string; active?: boolean; count: number }
  >
>;
type _04b = Expect<
  Equal<RemoveReadonly<{ readonly id: number }>, { id: number }>
>;
type _04c = Expect<
  Equal<RemoveReadonly<{ readonly id?: number }>, { id?: number }>
>;
type _04d = Expect<Equal<RemoveReadonly<{}>, {}>>;

// 5. Remove optionality from every source property without changing readonly.
export type RemoveOptional<Source> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    RemoveOptional<GivenSource>,
    {
      readonly id: number;
      readonly name: string;
      active: boolean;
      count: number;
    }
  >
>;
type _05b = Expect<Equal<RemoveOptional<{ id?: number }>, { id: number }>>;
type _05c = Expect<
  Equal<
    RemoveOptional<{ readonly id?: number }>,
    { readonly id: number }
  >
>;
type _05d = Expect<Equal<RemoveOptional<{}>, {}>>;

// 6. Remove both readonly and optionality from every source property.
export type RemoveReadonlyOptional<Source> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    RemoveReadonlyOptional<GivenSource>,
    { id: number; name: string; active: boolean; count: number }
  >
>;
type _06b = Expect<
  Equal<
    RemoveReadonlyOptional<{ readonly id?: number }>,
    { id: number }
  >
>;
type _06c = Expect<
  Equal<
    RemoveReadonlyOptional<{ readonly value?: string | undefined }>,
    { value: string | undefined }
  >
>;
type _06d = Expect<Equal<RemoveReadonlyOptional<{}>, {}>>;

// ─── Composition, order, and idempotence ───────────────────────────────────

// 7. Apply two readonly-axis operations; the second operation determines the state.
export type ReadonlyComposition<
  Source,
  First extends ReadonlyOperation,
  Second extends ReadonlyOperation,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<ReadonlyComposition<GivenSource, "add", "add">, GivenReadonly<GivenSource>>
>;
type _07b = Expect<
  Equal<ReadonlyComposition<GivenSource, "remove", "remove">, GivenMutable<GivenSource>>
>;
type _07c = Expect<
  Equal<ReadonlyComposition<GivenSource, "add", "remove">, GivenMutable<GivenSource>>
>;
type _07d = Expect<
  Equal<ReadonlyComposition<GivenSource, "remove", "add">, GivenReadonly<GivenSource>>
>;

// 8. Apply two optional-axis operations; the second operation determines presence.
export type OptionalComposition<
  Source,
  First extends OptionalOperation,
  Second extends OptionalOperation,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<OptionalComposition<GivenSource, "add", "add">, GivenOptional<GivenSource>>
>;
type _08b = Expect<
  Equal<OptionalComposition<GivenSource, "remove", "remove">, GivenRequired<GivenSource>>
>;
type _08c = Expect<
  Equal<OptionalComposition<GivenSource, "add", "remove">, GivenRequired<GivenSource>>
>;
type _08d = Expect<
  Equal<OptionalComposition<GivenSource, "remove", "add">, GivenOptional<GivenSource>>
>;

// 9. Apply the two extreme combined states in either order.
export type CombinedModifierState<
  Source,
  State extends "mutable-required" | "readonly-optional",
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    CombinedModifierState<GivenSource, "mutable-required">,
    { id: number; name: string; active: boolean; count: number }
  >
>;
type _09b = Expect<
  Equal<
    CombinedModifierState<GivenSource, "readonly-optional">,
    {
      readonly id?: number;
      readonly name?: string;
      readonly active?: boolean;
      readonly count?: number;
    }
  >
>;
type _09c = Expect<
  Equal<
    CombinedModifierState<{ readonly value?: never }, "mutable-required">,
    { value: never }
  >
>;
type _09d = Expect<
  Equal<CombinedModifierState<{}, "readonly-optional">, {}>
>;

// 10. Demonstrate same-axis idempotence for all four primitive transforms.
export type ModifierIdempotence<Source> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    ModifierIdempotence<GivenSource>,
    [
      mutable: GivenMutable<GivenSource>,
      readonly: GivenReadonly<GivenSource>,
      required: GivenRequired<GivenSource>,
      optional: GivenOptional<GivenSource>,
    ]
  >
>;
type _10b = Expect<
  Equal<
    ModifierIdempotence<{ readonly value?: string }>,
    [
      mutable: { value?: string },
      readonly: { readonly value?: string },
      required: { readonly value: string },
      optional: { readonly value?: string },
    ]
  >
>;
type _10c = Expect<
  Equal<
    ModifierIdempotence<{ value: string | undefined }>,
    [
      mutable: { value: string | undefined },
      readonly: { readonly value: string | undefined },
      required: { value: string | undefined },
      optional: { value?: string | undefined },
    ]
  >
>;
type _10d = Expect<
  Equal<
    ModifierIdempotence<{ only: never }>,
    [
      mutable: { only: never },
      readonly: { readonly only: never },
      required: { only: never },
      optional: { only?: never },
    ]
  >
>;

// ─── Exact optionality, undefined, and shallow object behavior ──────────────

// 11. Make every property present without removing explicit undefined members.
export type ConcreteUndefinedValues<Source> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ConcreteUndefinedValues<GivenUndefined>,
    {
      optional: string;
      explicit: string | undefined;
      both: string | undefined;
      readonly fixed: number | undefined;
    }
  >
>;
type _11b = Expect<
  Equal<ConcreteUndefinedValues<GivenUndefined>["optional"], string>
>;
type _11c = Expect<
  Equal<
    ConcreteUndefinedValues<GivenUndefined>["explicit"],
    string | undefined
  >
>;
type _11d = Expect<
  Equal<
    ConcreteUndefinedValues<GivenUndefined>["both"],
    string | undefined
  >
>;

// 12. Recover an indexed read after adding optionality to a property.
export type OptionalizedRead<
  Source,
  Key extends keyof Source,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<OptionalizedRead<{ value: string }, "value">, string | undefined>
>;
type _12b = Expect<
  Equal<
    OptionalizedRead<{ value: string | undefined }, "value">,
    string | undefined
  >
>;
type _12c = Expect<
  Equal<OptionalizedRead<{ value?: string }, "value">, string | undefined>
>;
type _12d = Expect<
  Equal<OptionalizedRead<{ readonly fixed: number }, "fixed">, number | undefined>
>;

// 13. Record structural assignability between mutable and readonly object views.
export type ReadonlyAssignability<
  Mutable extends object,
  ReadonlyView extends object,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    ReadonlyAssignability<
      { x: number; y: number },
      { readonly x: number; readonly y: number }
    >,
    [mutableToReadonly: true, readonlyToMutable: true]
  >
>;
type _13b = Expect<
  Equal<
    ReadonlyAssignability<{ value: string }, { readonly value: string }>,
    [mutableToReadonly: true, readonlyToMutable: true]
  >
>;
type _13c = Expect<
  Equal<
    ReadonlyAssignability<{}, {}>,
    [mutableToReadonly: true, readonlyToMutable: true]
  >
>;
type _13d = Expect<
  Equal<
    ReadonlyAssignability<{ value: never }, { readonly value: never }>,
    [mutableToReadonly: true, readonlyToMutable: true]
  >
>;

// 14. Remove outer modifiers while leaving a nested value's own modifiers intact.
export type ShallowMutableRequired<Source> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    ShallowMutableRequired<GivenNested>,
    {
      config: {
        readonly enabled: boolean;
        tags: readonly string[];
      };
    }
  >
>;
type _14b = Expect<
  Equal<
    ShallowMutableRequired<GivenNested>["config"],
    { readonly enabled: boolean; tags: readonly string[] }
  >
>;
type _14c = Expect<
  Equal<
    ShallowMutableRequired<{ readonly child?: { readonly value: 1 } }>,
    { child: { readonly value: 1 } }
  >
>;
type _14d = Expect<
  Equal<ShallowMutableRequired<{ readonly only?: never }>, { only: never }>
>;

// ─── Container-aware modifier transforms ───────────────────────────────────

// 15. Add or remove readonly on an array container.
export type ArrayMutability<
  ArrayType extends readonly unknown[],
  Mode extends "readonly" | "mutable",
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<ArrayMutability<string[], "readonly">, readonly string[]>
>;
type _15b = Expect<
  Equal<ArrayMutability<readonly string[], "mutable">, string[]>
>;
type _15c = Expect<
  Equal<ArrayMutability<readonly string[], "readonly">, readonly string[]>
>;
type _15d = Expect<
  Equal<ArrayMutability<never[], "mutable">, never[]>
>;

// 16. Add or remove readonly on a tuple container without losing positions.
export type TupleMutability<
  Tuple extends readonly unknown[],
  Mode extends "readonly" | "mutable",
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<TupleMutability<[string, number], "readonly">, readonly [string, number]>
>;
type _16b = Expect<
  Equal<TupleMutability<readonly ["a", 1], "mutable">, ["a", 1]>
>;
type _16c = Expect<
  Equal<
    TupleMutability<readonly [name: string, count?: number], "mutable">,
    [name: string, count?: number]
  >
>;
type _16d = Expect<
  Equal<TupleMutability<readonly [], "mutable">, []>
>;

// 17. Add or remove optionality on tuple positions.
export type TuplePresence<
  Tuple extends readonly unknown[],
  Mode extends "optional" | "required",
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<TuplePresence<[string, number], "optional">, [string?, number?]>
>;
type _17b = Expect<
  Equal<TuplePresence<[string?, number?], "required">, [string, number]>
>;
type _17c = Expect<
  Equal<
    TuplePresence<readonly ["a", 1], "optional">,
    readonly ["a"?, 1?]
  >
>;
type _17d = Expect<
  Equal<TuplePresence<readonly [], "required">, readonly []>
>;

// 18. Apply both modifier axes to a tuple container.
export type TupleCombinedState<
  Tuple extends readonly unknown[],
  State extends "mutable-required" | "readonly-optional",
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    TupleCombinedState<readonly ["a"?, 1?], "mutable-required">,
    ["a", 1]
  >
>;
type _18b = Expect<
  Equal<
    TupleCombinedState<[string, number], "readonly-optional">,
    readonly [string?, number?]
  >
>;
type _18c = Expect<
  Equal<
    TupleCombinedState<readonly [], "mutable-required">,
    []
  >
>;
type _18d = Expect<
  Equal<
    TupleCombinedState<[never], "readonly-optional">,
    readonly [never?]
  >
>;

// ─── Utility aliases, special inputs, and update/default APIs ──────────────

// 19. Pair custom modifier transforms with their built-in utility equivalents.
export type BuiltinModifierProfile<Source> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    BuiltinModifierProfile<GivenSource>,
    [
      optional: Partial<GivenSource>,
      partial: Partial<GivenSource>,
      readonly: Readonly<GivenSource>,
      builtinReadonly: Readonly<GivenSource>,
      required: Required<GivenSource>,
      builtinRequired: Required<GivenSource>,
    ]
  >
>;
type _19b = Expect<
  Equal<
    BuiltinModifierProfile<{ readonly value?: string }>[0],
    { readonly value?: string }
  >
>;
type _19c = Expect<
  Equal<
    BuiltinModifierProfile<{ readonly value?: string }>[4],
    { readonly value: string }
  >
>;
type _19d = Expect<
  Equal<
    BuiltinModifierProfile<{ only: never }>,
    [
      optional: { only?: never },
      partial: { only?: never },
      readonly: { readonly only: never },
      builtinReadonly: { readonly only: never },
      required: { only: never },
      builtinRequired: { only: never },
    ]
  >
>;

// 20. Recover key domains after combined transforms over never, unknown, and {}.
export type ModifierSpecialProfile<Source> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    ModifierSpecialProfile<never>,
    [sourceKeys: PropertyKey, mutableRequiredKeys: PropertyKey, readonlyOptionalKeys: PropertyKey]
  >
>;
type _20b = Expect<
  Equal<
    ModifierSpecialProfile<unknown>,
    [sourceKeys: never, mutableRequiredKeys: never, readonlyOptionalKeys: never]
  >
>;
type _20c = Expect<
  Equal<
    ModifierSpecialProfile<{}>,
    [sourceKeys: never, mutableRequiredKeys: never, readonlyOptionalKeys: never]
  >
>;
type _20d = Expect<
  Equal<
    ModifierSpecialProfile<{ readonly only?: never }>,
    [sourceKeys: "only", mutableRequiredKeys: "only", readonlyOptionalKeys: "only"]
  >
>;

// 21. Construct the partial update accepted by a shallow merge API.
export type UpdateShape<Source extends object> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    UpdateShape<{ name: string; active: boolean }>,
    { name?: string; active?: boolean }
  >
>;
type _21b = Expect<
  Equal<UpdateShape<{ readonly id: number }>, { readonly id?: number }>
>;
type _21c = Expect<
  Equal<
    UpdateShape<{ value: string | undefined }>,
    { value?: string | undefined }
  >
>;
type _21d = Expect<Equal<UpdateShape<{}>, {}>>;

// 22. Construct mutable required defaults for every source property.
export type RequiredDefaults<Source extends object> = TODO; // TODO(koan)

type _22a = Expect<
  Equal<
    RequiredDefaults<{ name?: string; count: number }>,
    { name: string; count: number }
  >
>;
type _22b = Expect<
  Equal<
    RequiredDefaults<{ readonly id?: number }>,
    { id: number }
  >
>;
type _22c = Expect<
  Equal<
    RequiredDefaults<{ value?: string | undefined }>,
    { value: string | undefined }
  >
>;
type _22d = Expect<Equal<RequiredDefaults<{}>, {}>>;
