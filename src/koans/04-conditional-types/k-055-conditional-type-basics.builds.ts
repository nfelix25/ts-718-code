import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-055: conditional type basics — constructions
 * =============================================================================
 *
 * These constructions turn structural assignability questions into booleans,
 * literals, correlated objects, and function-result types. They cover subtype
 * direction, complete union checks, primitive and structural capabilities,
 * readonly containers, tuple arity, callable variance, templates, promises,
 * special types, and the branch shapes used by the packet's runtime helpers.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenChoose<Check, Constraint, Then, Else> =
  Check extends Constraint ? Then : Else;
type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

// ─── Branch selection and assignability direction ─────────────────────────

// 1. Select one caller-supplied branch through a generic assignability check.
export type Choose<Check, Constraint, Then, Else> = TODO; // TODO(koan)

type _01a = Expect<Equal<Choose<string, string, "yes", "no">, "yes">>;
type _01b = Expect<Equal<Choose<number, string, "yes", "no">, "no">>;
type _01c = Expect<
  Equal<Choose<"a" | 1, string, { text: "a" }, { value: 1 }>, { text: "a" } | { value: 1 }>
>;
type _01d = Expect<Equal<Choose<never, unknown, 1, 0>, never>>;
type _01e = Expect<Equal<Choose<unknown, unknown, 1, 0>, 1>>;

// 2. Test a checked type as one complete unit without union distribution.
export type WholeChoose<Check, Constraint, Then, Else> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<WholeChoose<string | number, string, "inside", "outside">, "outside">
>;
type _02b = Expect<
  Equal<WholeChoose<"a" | "b", string, "inside", "outside">, "inside">
>;
type _02c = Expect<
  Equal<WholeChoose<1 | 3, 1 | 2, "inside", "outside">, "outside">
>;
type _02d = Expect<
  Equal<WholeChoose<never, string, "inside", "outside">, "inside">
>;

// 3. Return a boolean literal for structural assignability.
export type IsAssignable<Check, Constraint> = TODO; // TODO(koan)

type _03a = Expect<Equal<IsAssignable<"x", string>, true>>;
type _03b = Expect<Equal<IsAssignable<string, "x">, false>>;
type _03c = Expect<Equal<IsAssignable<symbol, PropertyKey>, true>>;
type _03d = Expect<Equal<IsAssignable<null, null | undefined>, true>>;
type _03e = Expect<Equal<IsAssignable<undefined, null>, false>>;

// 4. Compare assignability in both directions.
export type AssignabilityDirections<Specific, General> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<AssignabilityDirections<"x", string>, [true, false]>
>;
type _04b = Expect<
  Equal<AssignabilityDirections<1, number>, [true, false]>
>;
type _04c = Expect<
  Equal<
    AssignabilityDirections<readonly [1, 2], readonly number[]>,
    [true, false]
  >
>;
type _04d = Expect<
  Equal<
    AssignabilityDirections<`user-${number}`, string>,
    [true, false]
  >
>;
type _04e = Expect<
  Equal<
    AssignabilityDirections<Promise<never>, Promise<unknown>>,
    [true, false]
  >
>;

// ─── Primitive and structural capability checks ───────────────────────────

// 5. Determine whether every distributed member is a string.
export type IsString<Value> = TODO; // TODO(koan)

type _05a = Expect<Equal<IsString<"hello">, true>>;
type _05b = Expect<Equal<IsString<42>, false>>;
type _05c = Expect<Equal<IsString<string | number>, boolean>>;
type _05d = Expect<Equal<IsString<never>, never>>;
type _05e = Expect<Equal<IsString<unknown>, false>>;

// 6. Check whether a value type has a required numeric id capability.
export type HasRequiredId<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<HasRequiredId<{ id: number; name: string }>, true>>;
type _06b = Expect<Equal<HasRequiredId<{ id: 1 }>, true>>;
type _06c = Expect<Equal<HasRequiredId<{ id?: number }>, false>>;
type _06d = Expect<Equal<HasRequiredId<{ readonly id: number }>, true>>;
type _06e = Expect<
  Equal<HasRequiredId<{ id: number } | { name: string }>, boolean>
>;

// 7. Check whether a type is non-primitive under the object constraint.
export type IsObject<Value> = TODO; // TODO(koan)

type _07a = Expect<Equal<IsObject<{ id: string }>, true>>;
type _07b = Expect<Equal<IsObject<() => void>, true>>;
type _07c = Expect<Equal<IsObject<readonly []>, true>>;
type _07d = Expect<Equal<IsObject<string | null>, false>>;
type _07e = Expect<Equal<IsObject<{ x: 1 } | null>, boolean>>;

// 8. Check whether a value belongs to the non-nullish empty-object domain.
export type IsNonNullish<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<IsNonNullish<string>, true>>;
type _08b = Expect<Equal<IsNonNullish<0>, true>>;
type _08c = Expect<Equal<IsNonNullish<() => void>, true>>;
type _08d = Expect<Equal<IsNonNullish<null>, false>>;
type _08e = Expect<Equal<IsNonNullish<undefined>, false>>;

// 9. Check whether a type supplies a readonly array capability.
export type IsReadonlyArray<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<IsReadonlyArray<readonly [1, 2]>, true>>;
type _09b = Expect<Equal<IsReadonlyArray<number[]>, true>>;
type _09c = Expect<Equal<IsReadonlyArray<readonly []>, true>>;
type _09d = Expect<Equal<IsReadonlyArray<string>, false>>;
type _09e = Expect<Equal<IsReadonlyArray<never[]>, true>>;

// 10. Check whether a container guarantees exactly two tuple positions.
export type IsReadonlyPair<Value> = TODO; // TODO(koan)

type _10a = Expect<Equal<IsReadonlyPair<readonly [1, 2]>, true>>;
type _10b = Expect<Equal<IsReadonlyPair<[string, boolean]>, true>>;
type _10c = Expect<Equal<IsReadonlyPair<readonly number[]>, false>>;
type _10d = Expect<Equal<IsReadonlyPair<readonly []>, false>>;
type _10e = Expect<Equal<IsReadonlyPair<readonly [1]>, false>>;

// 11. Check whether a type supplies a callable signature.
export type IsCallable<Value> = TODO; // TODO(koan)

type _11a = Expect<Equal<IsCallable<() => string>, true>>;
type _11b = Expect<Equal<IsCallable<(value: string) => void>, true>>;
type _11c = Expect<Equal<IsCallable<{ call: () => void }>, false>>;
type _11d = Expect<Equal<IsCallable<Function>, false>>;
type _11e = Expect<Equal<IsCallable<(() => string) | number>, boolean>>;

// 12. Test full function assignability, including parameter and return variance.
export type IsFunctionAssignable<Source, Target> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<IsFunctionAssignable<() => "x", () => string>, true>
>;
type _12b = Expect<
  Equal<IsFunctionAssignable<() => string, () => "x">, false>
>;
type _12c = Expect<
  Equal<
    IsFunctionAssignable<(value: unknown) => string, (value: string) => unknown>,
    true
  >
>;
type _12d = Expect<
  Equal<
    IsFunctionAssignable<(value: string) => string, (value: unknown) => unknown>,
    false
  >
>;

// 13. Check whether a source object satisfies an intersection or union target.
export type StructuralTargetProfile<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<StructuralTargetProfile<{ x: number; y: number }>, [true, true]>
>;
type _13b = Expect<
  Equal<StructuralTargetProfile<{ x: number }>, [false, true]>
>;
type _13c = Expect<
  Equal<StructuralTargetProfile<{ y: number }>, [false, true]>
>;
type _13d = Expect<Equal<StructuralTargetProfile<{}>, [false, false]>>;

// ─── Branches that construct related output ───────────────────────────────

// 14. Box strings with a text key and all other values with a value key.
export type BoxString<Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<BoxString<"hello">, { text: "hello" }>>;
type _14b = Expect<Equal<BoxString<42>, { value: 42 }>>;
type _14c = Expect<
  Equal<
    BoxString<"x" | 1>,
    { text: "x" } | { value: 1 }
  >
>;
type _14d = Expect<Equal<BoxString<never>, never>>;
type _14e = Expect<Equal<BoxString<unknown>, { value: unknown }>>;

// 15. Box structural objects separately from scalar values.
export type BoxObject<Value> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<BoxObject<{ id: string }>, { object: { id: string } }>
>;
type _15b = Expect<Equal<BoxObject<readonly []>, { object: readonly [] }>>;
type _15c = Expect<Equal<BoxObject<() => void>, { object: () => void }>>;
type _15d = Expect<Equal<BoxObject<null>, { scalar: null }>>;
type _15e = Expect<
  Equal<
    BoxObject<{ id: 1 } | 0>,
    { object: { id: 1 } } | { scalar: 0 }
  >
>;

// 16. Construct success and failure result objects from a boolean flag.
export type ResultFor<Ok extends boolean, Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<ResultFor<true, number>, { ok: true; value: number }>
>;
type _16b = Expect<
  Equal<ResultFor<false, number>, { ok: false; error: string }>
>;
type _16c = Expect<
  Equal<
    ResultFor<boolean, "payload">,
    | { ok: true; value: "payload" }
    | { ok: false; error: string }
  >
>;
type _16d = Expect<Equal<ResultFor<never, string>, never>>;

// 17. Produce the runtime helper's result for strings and readonly arrays.
export type StringOrLength<
  Value extends string | readonly unknown[],
> = TODO; // TODO(koan)

type _17a = Expect<Equal<StringOrLength<"typescript">, string>>;
type _17b = Expect<Equal<StringOrLength<readonly [1, 2, 3]>, number>>;
type _17c = Expect<Equal<StringOrLength<string | readonly unknown[]>, string | number>>;
type _17d = Expect<Equal<StringOrLength<readonly []>, number>>;

// 18. Reuse the checked input in either an array branch or scalar branch.
export type RepeatIfNumber<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<RepeatIfNumber<1>, 1[]>>;
type _18b = Expect<Equal<RepeatIfNumber<"x">, "x">>;
type _18c = Expect<Equal<RepeatIfNumber<1 | "x">, 1[] | "x">>;
type _18d = Expect<Equal<RepeatIfNumber<never>, never>>;

// ─── Templates, promises, and special reduction ───────────────────────────

// 19. Classify strings matching an id-number template pattern.
export type IsNumericId<Value> = TODO; // TODO(koan)

type _19a = Expect<Equal<IsNumericId<"id-42">, true>>;
type _19b = Expect<Equal<IsNumericId<"id-name">, false>>;
type _19c = Expect<Equal<IsNumericId<`id-${number}`>, true>>;
type _19d = Expect<Equal<IsNumericId<string>, false>>;
type _19e = Expect<Equal<IsNumericId<"id-1" | "user-1">, boolean>>;

// 20. Classify promise covariance against an unknown payload.
export type IsPromiseLike<Value> = TODO; // TODO(koan)

type _20a = Expect<Equal<IsPromiseLike<Promise<string>>, true>>;
type _20b = Expect<Equal<IsPromiseLike<Promise<never>>, true>>;
type _20c = Expect<Equal<IsPromiseLike<Promise<unknown>>, true>>;
type _20d = Expect<Equal<IsPromiseLike<{ then: () => void }>, false>>;
type _20e = Expect<Equal<IsPromiseLike<string>, false>>;

// 21. Classify special generic conditional results without expecting raw any.
export type SpecialConditionalProfile<Value> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<SpecialConditionalProfile<any>, [true, false, false, 1 | 2]>
>;
type _21b = Expect<
  Equal<SpecialConditionalProfile<never>, [false, false, true, never]>
>;
type _21c = Expect<
  Equal<SpecialConditionalProfile<unknown>, [false, false, false, 2]>
>;
type _21d = Expect<
  Equal<SpecialConditionalProfile<string>, [false, false, false, 1]>
>;
