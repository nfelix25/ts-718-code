import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-062: any in conditional types — constructions
 * =============================================================================
 *
 * These constructions distinguish branch ambiguity from results poisoned by
 * any. They build the standard detector, literal-branch checks, guarded
 * categories, poison profiles, container and callable inference views, indexed
 * and mapped value checks, wrapper comparisons, and a boundary sanitizer. Every
 * any-valued result is observed through a non-any enclosing structure so the
 * TODO sentinel cannot satisfy an assertion vacuously. Replace each `TODO` with
 * a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenBranch<Value> =
  Value extends string ? "string" : "other";
type GivenKeep<Value, Constraint> =
  Value extends Constraint ? Value : never;
type GivenPreserveOrBox<Value> =
  Value extends string ? Value : { value: Value };

// ─── Detection, branch ambiguity, and guarded classification ──────────────

// 1. Detect exactly any without classifying unknown, never, or containers as any.
export type IsAny<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<IsAny<any>, true>>;
type _01b = Expect<Equal<IsAny<unknown>, false>>;
type _01c = Expect<Equal<IsAny<never>, false>>;
type _01d = Expect<Equal<IsAny<string>, false>>;
type _01e = Expect<Equal<IsAny<any[] | Promise<any>>, false>>;

// 2. Preserve both literal branches when the checked type is uncertain any.
export type BranchChoice<Value, Constraint, Yes, No> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<BranchChoice<any, string, "yes", "no">, "yes" | "no">
>;
type _02b = Expect<
  Equal<BranchChoice<any, never, "bottom", "not">, "bottom" | "not">
>;
type _02c = Expect<
  Equal<BranchChoice<any, unknown, "top", "not">, "top">
>;
type _02d = Expect<
  Equal<BranchChoice<any, any, "same", "different">, "same">
>;
type _02e = Expect<
  Equal<BranchChoice<never, string, "yes", "no">, never>
>;

// 3. Compare naked, wrapped, and reverse assignability for one source and target.
export type AnyAssignabilityProfile<Value, Target> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<AnyAssignabilityProfile<any, string>, [boolean, true, true]>
>;
type _03b = Expect<
  Equal<AnyAssignabilityProfile<any, never>, [boolean, false, never]>
>;
type _03c = Expect<
  Equal<AnyAssignabilityProfile<any, unknown>, [true, true, true]>
>;
type _03d = Expect<
  Equal<AnyAssignabilityProfile<unknown, string>, [false, false, true]>
>;

// 4. Guard any before ordinary string/number/other classification.
export type SafeCategory<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<SafeCategory<any>, "any">>;
type _04b = Expect<Equal<SafeCategory<unknown>, "other">>;
type _04c = Expect<Equal<SafeCategory<string>, "string">>;
type _04d = Expect<Equal<SafeCategory<number>, "number">>;
type _04e = Expect<Equal<SafeCategory<boolean>, "other">>;

// 5. Sanitize any to unknown while preserving all trustworthy input types.
export type AnyToUnknown<Value> = TODO; // TODO(koan)

type _05a = Expect<Equal<AnyToUnknown<any>, unknown>>;
type _05b = Expect<Equal<AnyToUnknown<unknown>, unknown>>;
type _05c = Expect<Equal<AnyToUnknown<string>, string>>;
type _05d = Expect<Equal<AnyToUnknown<never>, never>>;
type _05e = Expect<Equal<AnyToUnknown<any[]>, any[]>>;

// ─── Poison-returning conditionals and normalization ──────────────────────

// 6. Keep assignable members, allowing a returned checked type to carry poison.
export type Keep<Value, Constraint> = TODO; // TODO(koan)

type _06a = Expect<Equal<Keep<string | number, string>, string>>;
type _06b = Expect<Equal<Keep<"a" | 1 | "b", string>, "a" | "b">>;
type _06c = Expect<Equal<Keep<unknown, string>, never>>;
type _06d = Expect<Equal<Keep<never, string>, never>>;

// 7. Preserve strings directly and box every other distributed member.
export type PreserveOrBox<Value> = TODO; // TODO(koan)

type _07a = Expect<Equal<PreserveOrBox<string>, string>>;
type _07b = Expect<Equal<PreserveOrBox<number>, { value: number }>>;
type _07c = Expect<
  Equal<PreserveOrBox<"x" | 1>, "x" | { value: 1 }>
>;
type _07d = Expect<Equal<PreserveOrBox<never>, never>>;

// 8. Classify poison from filters, branch-preservation, unions, and intersections.
export type PoisonProfile<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<PoisonProfile<any>[0], true>>;
type _08b = Expect<Equal<PoisonProfile<any>[1], true>>;
type _08c = Expect<Equal<PoisonProfile<any>[2], true>>;
type _08d = Expect<Equal<PoisonProfile<any>[3], true>>;
type _08e = Expect<Equal<PoisonProfile<any>[4], false>>;
type _08f = Expect<
  Equal<PoisonProfile<unknown>, [false, false, false, false, false]>
>;
type _08g = Expect<
  Equal<PoisonProfile<never>, [false, false, false, false, false]>
>;
type _08h = Expect<
  Equal<PoisonProfile<number>, [false, false, false, false, false]>
>;

// 9. Classify any after union and intersection normalization.
export type AnyAlgebraProfile<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<AnyAlgebraProfile<any>[0], true>>;
type _09b = Expect<Equal<AnyAlgebraProfile<any>[1], true>>;
type _09c = Expect<Equal<AnyAlgebraProfile<any>[2], false>>;
type _09d = Expect<Equal<AnyAlgebraProfile<any>[3], true>>;
type _09e = Expect<Equal<AnyAlgebraProfile<any>[4], false>>;
type _09f = Expect<Equal<AnyAlgebraProfile<any>[5], true>>;
type _09g = Expect<
  Equal<AnyAlgebraProfile<unknown>, [false, false, false, false, false, false]>
>;
type _09h = Expect<
  Equal<AnyAlgebraProfile<string>, [false, false, false, false, false, false]>
>;
type _09i = Expect<
  Equal<AnyAlgebraProfile<never>, [false, false, false, false, false, false]>
>;

// 10. Report unsafe utility results through detector booleans and safe labels.
export type UtilityPoisonProfile<Value> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<UtilityPoisonProfile<any>, [true, true, true, true]>
>;
type _10b = Expect<
  Equal<UtilityPoisonProfile<unknown>, [false, false, false, false]>
>;
type _10c = Expect<
  Equal<
    UtilityPoisonProfile<string | null>,
    [false, false, false, false]
  >
>;
type _10d = Expect<
  Equal<UtilityPoisonProfile<never>, [false, false, false, false]>
>;

// ─── Containers, promises, callables, and indexed values ──────────────────

// 11. Distinguish an any element from an array type that is itself non-any.
export type ArrayAnyProfile<
  ArrayType extends readonly unknown[],
> = TODO; // TODO(koan)

type _11a = Expect<Equal<ArrayAnyProfile<any[]>, [false, true, false]>>;
type _11b = Expect<
  Equal<ArrayAnyProfile<unknown[]>, [false, false, false]>
>;
type _11c = Expect<
  Equal<ArrayAnyProfile<readonly [any, string]>, [false, true, false]>
>;
type _11d = Expect<
  Equal<ArrayAnyProfile<readonly []>, [false, false, true]>
>;

// 12. Distinguish an any resolution from a promise type that is itself non-any.
export type PromiseAnyProfile<
  PromiseType extends Promise<unknown>,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<PromiseAnyProfile<Promise<any>>, [false, true, "any"]>
>;
type _12b = Expect<
  Equal<PromiseAnyProfile<Promise<unknown>>, [false, false, unknown]>
>;
type _12c = Expect<
  Equal<PromiseAnyProfile<Promise<string>>, [false, false, string]>
>;
type _12d = Expect<
  Equal<PromiseAnyProfile<Promise<never>>, [false, false, never]>
>;

// 13. Infer a callable return, including poison inferred from any.
export type InferReturn<Value> = TODO; // TODO(koan)

type _13a = Expect<Equal<InferReturn<() => string>, string>>;
type _13b = Expect<Equal<InferReturn<() => never>, never>>;
type _13c = Expect<
  Equal<InferReturn<(() => 1) | (() => 2)>, 1 | 2>
>;
type _13d = Expect<Equal<InferReturn<unknown>, never>>;

// 14. Infer callable arguments, including the unknown-array view inferred from any.
export type InferArguments<Value> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<InferArguments<(value: string, count?: number) => void>, [value: string, count?: number | undefined]>
>;
type _14b = Expect<
  Equal<InferArguments<(...values: boolean[]) => void>, boolean[]>
>;
type _14c = Expect<Equal<InferArguments<any>, unknown[]>>;
type _14d = Expect<Equal<InferArguments<unknown>, never>>;

// 15. Observe callable utility poison without directly expecting any.
export type CallableAnyProfile<Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<CallableAnyProfile<any>[0], false>>;
type _15b = Expect<Equal<CallableAnyProfile<any>[1], boolean>>;
type _15c = Expect<Equal<CallableAnyProfile<any>[2], unknown[]>>;
type _15d = Expect<
  Equal<
    CallableAnyProfile<() => string>,
    [false, false, []]
  >
>;
type _15e = Expect<
  Equal<
    CallableAnyProfile<(value: any) => unknown>,
    [false, false, [value: any]]
  >
>;
type _15f = Expect<
  Equal<CallableAnyProfile<unknown>, [false, false, never]>
>;

// 16. Classify an indexed value independently from its enclosing source.
export type IndexedAnyProfile<
  Source,
  Key extends keyof Source,
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<IndexedAnyProfile<any, string>, [true, true, false]>
>;
type _16b = Expect<
  Equal<IndexedAnyProfile<{ value: any }, "value">, [false, true, false]>
>;
type _16c = Expect<
  Equal<
    IndexedAnyProfile<Record<string, any>, string>,
    [false, true, false]
  >
>;
type _16d = Expect<
  Equal<IndexedAnyProfile<{ value: never }, "value">, [false, false, true]>
>;

// ─── Mapped poison, wrappers, and safe boundary views ──────────────────────

// 17. Map each property through literal branches without returning the property type.
export type BranchProperties<Source> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    BranchProperties<{ text: string; count: number }>,
    { text: "string"; count: "other" }
  >
>;
type _17b = Expect<
  Equal<
    BranchProperties<{ poison: any; value: unknown }>,
    { poison: "string" | "other"; value: "other" }
  >
>;
type _17c = Expect<
  Equal<
    BranchProperties<{ readonly optional?: string }>,
    { readonly optional?: "other" }
  >
>;
type _17d = Expect<Equal<BranchProperties<{}>, {}>>;

// 18. Return property members from a conditional and classify the whole value domain.
export type PropertyPoisonProfile<Source> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    PropertyPoisonProfile<{ text: string; count: number }>,
    [false, false, string | number]
  >
>;
type _18b = Expect<
  Equal<
    PropertyPoisonProfile<{ poison: any; value: string }>,
    [true, true, "any"]
  >
>;
type _18c = Expect<
  Equal<PropertyPoisonProfile<{ value: unknown }>, [false, false, unknown]>
>;
type _18d = Expect<
  Equal<PropertyPoisonProfile<{}>, [false, false, never]>
>;

// 19. Compare any through tuple, object, return, parameter, and promise wrappers.
export type AnyWrapperProfile<Value, Target> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<AnyWrapperProfile<any, string>, [true, true, true, true, true]>
>;
type _19b = Expect<
  Equal<AnyWrapperProfile<any, never>, [false, false, false, true, false]>
>;
type _19c = Expect<
  Equal<AnyWrapperProfile<unknown, string>, [false, false, false, true, false]>
>;
type _19d = Expect<
  Equal<AnyWrapperProfile<string, unknown>, [true, true, true, false, true]>
>;

// 20. Build a safe boundary view that reports any before exposing a sanitized value.
export type SafeBoundary<Value> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<SafeBoundary<any>, { category: "any"; value: unknown }>
>;
type _20b = Expect<
  Equal<SafeBoundary<string>, { category: "string"; value: string }>
>;
type _20c = Expect<
  Equal<SafeBoundary<unknown>, { category: "other"; value: unknown }>
>;
type _20d = Expect<
  Equal<SafeBoundary<number>, { category: "other"; value: number }>
>;
