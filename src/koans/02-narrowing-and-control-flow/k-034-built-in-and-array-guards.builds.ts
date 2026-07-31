import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-034: built-in and array guards — constructions
 * =============================================================================
 *
 * These constructions model the predicate surfaces of built-in classifiers,
 * preserve known array and tuple information, validate element collections,
 * and distinguish ordinary arrays from views and structural lookalikes. They
 * re-express the packet's control-flow results as reusable type operations.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type GivenPredicateTarget<Signature> =
  Signature extends (value: any) => value is infer Target ? Target : never;

type GivenArrayElement<Value> =
  Value extends readonly unknown[] ? Value[number] : never;

type ArrayFamily =
  | "ordinary-array"
  | "readonly-array"
  | "typed-array"
  | "array-like"
  | "other";

type ViewKind = "uint8" | "uint16" | "data";

// ─── Array.isArray and container branches ──────────────────────────────────

// 1. Build the exact predicate signature exposed by Array.isArray.
export type ArrayIsArraySignature = TODO; // TODO(koan)

type _01a = Expect<
  Equal<ArrayIsArraySignature, typeof Array.isArray>
>;
type _01b = Expect<
  Equal<Parameters<ArrayIsArraySignature>, [arg: any]>
>;
type _01c = Expect<Equal<ReturnType<ArrayIsArraySignature>, boolean>>;
type _01d = Expect<
  Equal<GivenPredicateTarget<ArrayIsArraySignature>, any[]>
>;

// 2. Classify an input, its guarded array branch, and that branch's element.
//    unknown → ["unknown", "ordinary", "any"]
export type ArrayGuardSpecialProfile<Source> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    ArrayGuardSpecialProfile<unknown>,
    ["unknown", "ordinary", "any"]
  >
>;
type _02b = Expect<
  Equal<ArrayGuardSpecialProfile<any>, ["any", "any", "any"]>
>;
type _02c = Expect<
  Equal<ArrayGuardSpecialProfile<never>, ["never", "never", "never"]>
>;
type _02d = Expect<
  Equal<
    ArrayGuardSpecialProfile<object | null>,
    ["ordinary", "ordinary", "any"]
  >
>;

// 3. Intersect a source type with the built-in guard's mutable any[] target.
export type ArrayGuardIntersection<Source> = TODO; // TODO(koan)

type _03a = Expect<Equal<ArrayGuardIntersection<unknown>, any[]>>;
type _03b = Expect<
  Equal<ArrayGuardIntersection<object | null>, object & any[]>
>;
type _03c = Expect<
  Equal<
    ArrayGuardIntersection<readonly string[]>,
    readonly string[] & any[]
  >
>;
type _03d = Expect<Equal<ArrayGuardIntersection<never>, never>>;

// 4. Select known ordinary array or tuple members from a concrete union.
export type KnownArrayMembers<Union> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<KnownArrayMembers<string[] | { id: string }>, string[]>
>;
type _04b = Expect<
  Equal<
    KnownArrayMembers<
      ["a", string] | ["b", number] | Date
    >,
    ["a", string] | ["b", number]
  >
>;
type _04c = Expect<
  Equal<
    KnownArrayMembers<readonly string[] | { id: number }>,
    readonly string[]
  >
>;
type _04d = Expect<
  Equal<KnownArrayMembers<Uint8Array | DataView>, never>
>;
type _04e = Expect<Equal<KnownArrayMembers<never>, never>>;

// 5. Select the complementary non-array members from a concrete union.
export type KnownNonArrayMembers<Union> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<KnownNonArrayMembers<string[] | { id: string }>, { id: string }>
>;
type _05b = Expect<
  Equal<
    KnownNonArrayMembers<[string, number] | Date | Set<number>>,
    Date | Set<number>
  >
>;
type _05c = Expect<
  Equal<
    KnownNonArrayMembers<readonly string[] | { id: number }>,
    { id: number }
  >
>;
type _05d = Expect<Equal<KnownNonArrayMembers<unknown>, unknown>>;
type _05e = Expect<Equal<KnownNonArrayMembers<never>, never>>;

// ─── Tuple detail and checked indexed access ───────────────────────────────

// 6. Pair an array's element-kind classification with its exact element type.
export type ArrayElementProfile<Values extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<ArrayElementProfile<any[]>, ["any", any]>
>;
type _06b = Expect<
  Equal<ArrayElementProfile<unknown[]>, ["unknown", unknown]>
>;
type _06c = Expect<
  Equal<
    ArrayElementProfile<readonly ["a", 1, true]>,
    ["ordinary", "a" | 1 | true]
  >
>;
type _06d = Expect<
  Equal<ArrayElementProfile<readonly []>, ["never", never]>
>;

// 7. Recover a tuple's first item, second item, and literal length.
export type TupleCoordinates<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<TupleCoordinates<[string, number]>, [string, number, 2]>
>;
type _07b = Expect<
  Equal<
    TupleCoordinates<readonly ["a", { readonly id: 1 }, false]>,
    ["a", { readonly id: 1 }, 3]
  >
>;
type _07c = Expect<
  Equal<TupleCoordinates<["a", string] | ["b", number]>, ["a" | "b", string | number, 2]>
>;
type _07d = Expect<
  Equal<TupleCoordinates<readonly []>, [never, never, 0]>
>;

// 8. Add the unchecked-index possibility to an array element.
export type IndexedArrayRead<Element> = TODO; // TODO(koan)

type _08a = Expect<Equal<IndexedArrayRead<string>, string | undefined>>;
type _08b = Expect<
  Equal<IndexedArrayRead<string | number>, string | number | undefined>
>;
type _08c = Expect<Equal<IndexedArrayRead<never>, undefined>>;
type _08d = Expect<
  Equal<IndexedArrayRead<{ readonly id: 1 }>, { readonly id: 1 } | undefined>
>;

// ─── Predicate-aware array methods ─────────────────────────────────────────

// 9. Construct the receiver type inside a successful every predicate branch.
export type EveryNarrowedReceiver<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<EveryNarrowedReceiver<unknown, string>, string[]>
>;
type _09b = Expect<
  Equal<
    EveryNarrowedReceiver<string | number | undefined, string | number>,
    Array<string | number>
  >
>;
type _09c = Expect<
  Equal<
    EveryNarrowedReceiver<
      { readonly ok: true } | { readonly ok: false },
      { readonly ok: true }
    >,
    Array<{ readonly ok: true }>
  >
>;
type _09d = Expect<
  Equal<EveryNarrowedReceiver<never, never>, never[]>
>;

// 10. Build every's true, false, and post-conditional receiver states.
export type EveryControlFlow<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    EveryControlFlow<unknown, string>,
    [whenTrue: string[], whenFalse: unknown[], after: unknown[]]
  >
>;
type _10b = Expect<
  Equal<
    EveryControlFlow<string | number, number>,
    [
      whenTrue: number[],
      whenFalse: Array<string | number>,
      after: Array<string | number>,
    ]
  >
>;
type _10c = Expect<
  Equal<
    EveryControlFlow<boolean | null, true>,
    [whenTrue: true[], whenFalse: Array<boolean | null>, after: Array<boolean | null>]
  >
>;
type _10d = Expect<
  Equal<
    EveryControlFlow<never, never>,
    [whenTrue: never[], whenFalse: never[], after: never[]]
  >
>;

// 11. Construct filter's new narrowed array without changing its receiver.
export type PredicateFilterResult<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _11a = Expect<Equal<PredicateFilterResult<unknown, string>, string[]>>;
type _11b = Expect<
  Equal<
    PredicateFilterResult<string | number | undefined, number>,
    number[]
  >
>;
type _11c = Expect<
  Equal<
    PredicateFilterResult<
      { readonly kind: "a" } | { readonly kind: "b" },
      { readonly kind: "b" }
    >,
    Array<{ readonly kind: "b" }>
  >
>;
type _11d = Expect<Equal<PredicateFilterResult<never, never>, never[]>>;

// 12. Construct find's narrowed result while retaining possible absence.
export type PredicateFindResult<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<PredicateFindResult<unknown, string>, string | undefined>
>;
type _12b = Expect<
  Equal<
    PredicateFindResult<string | number | boolean, number | boolean>,
    number | boolean | undefined
  >
>;
type _12c = Expect<
  Equal<
    PredicateFindResult<
      { readonly kind: "a" } | { readonly kind: "b" },
      { readonly kind: "a" }
    >,
    { readonly kind: "a" } | undefined
  >
>;
type _12d = Expect<Equal<PredicateFindResult<never, never>, undefined>>;

// 13. Keep some's receiver at its original element type.
export type SomeReceiver<Source> = TODO; // TODO(koan)

type _13a = Expect<Equal<SomeReceiver<unknown>, unknown[]>>;
type _13b = Expect<
  Equal<SomeReceiver<string | number>, Array<string | number>>
>;
type _13c = Expect<
  Equal<SomeReceiver<{ readonly id: 1 }>, Array<{ readonly id: 1 }>>
>;
type _13d = Expect<Equal<SomeReceiver<never>, never[]>>;

// 14. Record what vacuous every proves—and that it does not prove non-emptiness.
export type EveryVacuityProfile<Target> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    EveryVacuityProfile<string>,
    [result: boolean, first: string | undefined, nonEmpty: false]
  >
>;
type _14b = Expect<
  Equal<
    EveryVacuityProfile<string | number>,
    [result: boolean, first: string | number | undefined, nonEmpty: false]
  >
>;
type _14c = Expect<
  Equal<
    EveryVacuityProfile<readonly []>,
    [result: boolean, first: readonly [] | undefined, nonEmpty: false]
  >
>;
type _14d = Expect<
  Equal<
    EveryVacuityProfile<never>,
    [result: boolean, first: undefined, nonEmpty: false]
  >
>;

// 15. Pair a refined receiver with a wider mutable alias that can stale it.
export type EveryAliasProfile<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    EveryAliasProfile<unknown, string>,
    [receiver: string[], alias: unknown[]]
  >
>;
type _15b = Expect<
  Equal<
    EveryAliasProfile<string | number, string>,
    [receiver: string[], alias: Array<string | number>]
  >
>;
type _15c = Expect<
  Equal<
    EveryAliasProfile<boolean | null, true>,
    [receiver: true[], alias: Array<boolean | null>]
  >
>;
type _15d = Expect<
  Equal<
    EveryAliasProfile<never, never>,
    [receiver: never[], alias: never[]]
  >
>;

// ─── Views and non-predicate numeric classifiers ───────────────────────────

// 16. Build the exact predicate signature exposed by ArrayBuffer.isView.
export type ArrayBufferViewSignature = TODO; // TODO(koan)

type _16a = Expect<
  Equal<ArrayBufferViewSignature, typeof ArrayBuffer.isView>
>;
type _16b = Expect<
  Equal<Parameters<ArrayBufferViewSignature>, [arg: any]>
>;
type _16c = Expect<Equal<ReturnType<ArrayBufferViewSignature>, boolean>>;
type _16d = Expect<
  Equal<GivenPredicateTarget<ArrayBufferViewSignature>, ArrayBufferView>
>;

// 17. Select typed-array and DataView members from a concrete union.
export type KnownViewMembers<Union> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<KnownViewMembers<Uint8Array | Date>, Uint8Array>
>;
type _17b = Expect<
  Equal<KnownViewMembers<DataView | Set<number>>, DataView>
>;
type _17c = Expect<
  Equal<
    KnownViewMembers<Uint8Array | Uint16Array | DataView>,
    Uint8Array | Uint16Array | DataView
  >
>;
type _17d = Expect<Equal<KnownViewMembers<string[]>, never>>;
type _17e = Expect<Equal<KnownViewMembers<never>, never>>;

// 18. Construct a precise instanceof target for a selected view kind.
export type SpecificView<Kind extends ViewKind> = TODO; // TODO(koan)

type _18a = Expect<Equal<SpecificView<"uint8">, Uint8Array>>;
type _18b = Expect<Equal<SpecificView<"uint16">, Uint16Array>>;
type _18c = Expect<Equal<SpecificView<"data">, DataView>>;
type _18d = Expect<
  Equal<SpecificView<"uint8" | "data">, Uint8Array | DataView>
>;

// 19. Build the boolean-only signature shared by the Number classifiers.
export type NumberClassifierSignature = TODO; // TODO(koan)

type _19a = Expect<
  Equal<NumberClassifierSignature, typeof Number.isFinite>
>;
type _19b = Expect<
  Equal<Parameters<NumberClassifierSignature>, [number: unknown]>
>;
type _19c = Expect<Equal<ReturnType<NumberClassifierSignature>, boolean>>;
type _19d = Expect<
  Equal<GivenPredicateTarget<NumberClassifierSignature>, never>
>;

// 20. Classify a boolean-returning signature as predicate-aware or boolean-only.
export type BuiltInClassifierKind<
  Signature extends (...args: any[]) => boolean,
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<BuiltInClassifierKind<typeof Array.isArray>, "predicate">
>;
type _20b = Expect<
  Equal<BuiltInClassifierKind<typeof ArrayBuffer.isView>, "predicate">
>;
type _20c = Expect<
  Equal<BuiltInClassifierKind<typeof Number.isFinite>, "boolean">
>;
type _20d = Expect<
  Equal<BuiltInClassifierKind<typeof Number.isNaN>, "boolean">
>;

// ─── Runtime families and validated boundaries ─────────────────────────────

// 21. Classify ordinary arrays, ArrayBuffer views, and all other values.
export type CollectionKind<Value> = TODO; // TODO(koan)

type _21a = Expect<Equal<CollectionKind<string[]>, "array">>;
type _21b = Expect<Equal<CollectionKind<Uint8Array>, "view">>;
type _21c = Expect<Equal<CollectionKind<DataView>, "view">>;
type _21d = Expect<
  Equal<CollectionKind<{ 0: string; length: 1 }>, "other">
>;
type _21e = Expect<
  Equal<
    CollectionKind<string[] | Uint16Array | Set<number>>,
    "array" | "view" | "other"
  >
>;

// 22. Model Array.isArray's runtime brand result for explicit container families.
export type RuntimeArrayBrand<Family extends ArrayFamily> = TODO; // TODO(koan)

type _22a = Expect<Equal<RuntimeArrayBrand<"ordinary-array">, true>>;
type _22b = Expect<Equal<RuntimeArrayBrand<"readonly-array">, true>>;
type _22c = Expect<Equal<RuntimeArrayBrand<"typed-array">, false>>;
type _22d = Expect<Equal<RuntimeArrayBrand<"array-like">, false>>;
type _22e = Expect<
  Equal<
    RuntimeArrayBrand<"ordinary-array" | "typed-array" | "other">,
    boolean
  >
>;

// 23. Normalize a value to an array while preserving existing arrays and tuples.
export type NormalizeToArray<Value> = TODO; // TODO(koan)

type _23a = Expect<Equal<NormalizeToArray<string>, string[]>>;
type _23b = Expect<Equal<NormalizeToArray<number[]>, number[]>>;
type _23c = Expect<
  Equal<NormalizeToArray<readonly ["a", 1]>, readonly ["a", 1]>
>;
type _23d = Expect<
  Equal<NormalizeToArray<string | number[]>, string[] | number[]>
>;
type _23e = Expect<Equal<NormalizeToArray<unknown>, unknown[]>>;

// 24. Build a domain guard that validates both array branding and every element.
export type ValidatedListGuard<Element> = TODO; // TODO(koan)

type _24a = Expect<
  Equal<ValidatedListGuard<string>, (value: unknown) => value is string[]>
>;
type _24b = Expect<
  Equal<ValidatedListGuard<number>, (value: unknown) => value is number[]>
>;
type _24c = Expect<
  Equal<
    ValidatedListGuard<string | number>,
    (value: unknown) => value is Array<string | number>
  >
>;
type _24d = Expect<
  Equal<ValidatedListGuard<never>, (value: unknown) => value is never[]>
>;
