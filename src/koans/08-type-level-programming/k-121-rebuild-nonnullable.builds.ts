import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-121: rebuild NonNullable — constructions
 * =============================================================================
 *
 * The modern spelling is an intersection, not a filter: `Value & {}` keeps the
 * values that are both the original type and non-nullish. The trick is that `{}`
 * under strict null checking means "anything except `null` and `undefined`" —
 * primitives included — so it is emphatically not the same domain as `object`.
 * A distributive conditional removes the same members from an ordinary union,
 * but the two forms part ways on the top types: the intersection collapses
 * `unknown` to `{}` while the conditional leaves it alone. Removal is also
 * strictly outer — nothing inside a property, element, or fulfillment value is
 * touched. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenModel = { value?: string | null } | null;
type GivenUserId = string & { readonly __brand: "UserId" };

// Declared with the packet's own presence signature so a construction can be
// graded against a real call site.
declare function givenRequirePresent<Value>(
  value: Value,
  message?: string,
): RebuiltNonNullable<Value>;

// ─── Two spellings ────────────────────────────────────────────────────

// 1. Build the intersection form: the values that are both the original type and
//    non-nullish.
//    `RebuiltNonNullable<string | null>` is `string`.
export type RebuiltNonNullable<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<RebuiltNonNullable<string | null>, string>>;
type _01b = Expect<Equal<RebuiltNonNullable<number | undefined>, number>>;
type _01c = Expect<Equal<RebuiltNonNullable<boolean | null | undefined>, boolean>>;
type _01d = Expect<Equal<RebuiltNonNullable<null | undefined>, never>>;
type _01e = Expect<Equal<RebuiltNonNullable<unknown>, {}>>;

// 2. Build the conditional form, which filters the same ordinary members but
//    answers a different question at the top of the lattice.
export type ConditionalNonNullableOf<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<ConditionalNonNullableOf<string | null>, string>>;
type _02b = Expect<Equal<ConditionalNonNullableOf<number | undefined>, number>>;
type _02c = Expect<Equal<ConditionalNonNullableOf<{ id: 1 } | null | undefined>, { id: 1 }>>;
type _02d = Expect<Equal<ConditionalNonNullableOf<never>, never>>;
type _02e = Expect<Equal<ConditionalNonNullableOf<unknown>, unknown>>;

// ─── What `{}` actually means ─────────────────────────────────────────

// 3. Report the domain `{}` describes: everything except the two nullish values,
//    which is a much larger set than `object`.
export type EmptyObjectDomainProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<EmptyObjectDomainProfile["stringFits"], true>>;
type _03b = Expect<Equal<EmptyObjectDomainProfile["symbolFits"], true>>;
type _03c = Expect<Equal<EmptyObjectDomainProfile["nullFits"], false>>;
type _03d = Expect<Equal<EmptyObjectDomainProfile["undefinedFits"], false>>;
type _03e = Expect<Equal<EmptyObjectDomainProfile["stringIsNotObject"], false>>;

// 4. Report every non-nullish value surviving, including the falsy ones that a
//    runtime truthiness check would have thrown away.
export type SurvivorProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<SurvivorProfile["falsyPrimitives"], 0 | "" | false>>;
type _04b = Expect<Equal<SurvivorProfile["falsyWithNull"], 0 | "" | false>>;
type _04c = Expect<Equal<SurvivorProfile["object"], { id: string }>>;
type _04d = Expect<Equal<SurvivorProfile["callable"], () => void>>;
type _04e = Expect<Equal<SurvivorProfile["tuple"], readonly [1, 2]>>;

// 5. Report the two forms diverging on the top and bottom types, which is the
//    reason to know both spellings rather than only one.
export type TopAndBottomProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<TopAndBottomProfile["intersectionTop"], {}>>;
type _05b = Expect<Equal<TopAndBottomProfile["conditionalTop"], unknown>>;
type _05c = Expect<Equal<TopAndBottomProfile["intersectionAny"], true>>;
type _05d = Expect<Equal<TopAndBottomProfile["conditionalAny"], true>>;
type _05e = Expect<Equal<TopAndBottomProfile["intersectionBottom"], never>>;

// 6. Report `void`, which is neither nullish enough to be removed nor ordinary
//    enough to collapse: the intersection simply stays unresolved.
export type VoidProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<VoidProfile["intersection"], void & {}>>;
type _06b = Expect<Equal<VoidProfile["isNotVoid"], false>>;
type _06c = Expect<Equal<VoidProfile["isNotEmpty"], false>>;
type _06d = Expect<Equal<VoidProfile["conditional"], void>>;
type _06e = Expect<Equal<VoidProfile["voidAcceptsUndefined"], true>>;

// ─── Strictly outer removal ───────────────────────────────────────────

// 7. Report the removal reaching the value itself and nothing inside it.
export type ShallowRemovalProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<ShallowRemovalProfile["outerRemoved"], { value: null }>>;
type _07b = Expect<Equal<ShallowRemovalProfile["innerUntouched"], null>>;
type _07c = Expect<
  Equal<ShallowRemovalProfile["optionalInnerUntouched"], string | null | undefined>
>;
type _07d = Expect<Equal<ShallowRemovalProfile["appliedAgainInside"], string>>;
type _07e = Expect<Equal<ShallowRemovalProfile["modelOuter"], { value?: string | null }>>;

// 8. Report containers keeping their nullable contents.
export type ContainerProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<ContainerProfile["arrayOuter"], Array<string | null>>>;
type _08b = Expect<Equal<ContainerProfile["arrayElement"], string | null>>;
type _08c = Expect<Equal<ContainerProfile["promiseOuter"], Promise<string | null>>>;
type _08d = Expect<Equal<ContainerProfile["fulfillment"], string | null>>;
type _08e = Expect<Equal<ContainerProfile["cleanedElement"], string>>;

// ─── Algebra of the intersection ──────────────────────────────────────

// 9. Report the intersection being idempotent and leaving branded and already
//    non-nullish types exactly as it found them.
export type IdempotenceProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<IdempotenceProfile["twice"], string>>;
type _09b = Expect<Equal<IdempotenceProfile["branded"], GivenUserId>>;
type _09c = Expect<Equal<IdempotenceProfile["alreadyIntersected"], string>>;
type _09d = Expect<Equal<IdempotenceProfile["alreadyClean"], string>>;
type _09e = Expect<Equal<IdempotenceProfile["impossible"], never>>;

// 10. Report the intersection composing with further intersections, since the
//     result is still an ordinary type to intersect with.
export type CompositionProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<CompositionProfile["withObject"], object>>;
type _10b = Expect<Equal<CompositionProfile["withNumber"], string & number>>;
type _10c = Expect<Equal<CompositionProfile["conditionalWithEmpty"], string & {}>>;
type _10d = Expect<Equal<CompositionProfile["bothForms"], true>>;
type _10e = Expect<Equal<CompositionProfile["bothFormsOnTop"], false>>;

// ─── Surfaces built on the removal ────────────────────────────────────

// 11. Build the predicate that reports whether a type admits a nullish value at
//     all.
//     Hint: comparing the type with its cleaned form answers this in one step.
export type IsNullableOf<Value> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    { nullable: IsNullableOf<string | null>; clean: IsNullableOf<string> },
    { nullable: true; clean: false }
  >
>;
type _11b = Expect<
  Equal<
    { undefinable: IsNullableOf<string | undefined>; falsy: IsNullableOf<0 | ""> },
    { undefinable: true; falsy: false }
  >
>;
type _11c = Expect<
  Equal<
    { onlyNullish: IsNullableOf<null>; empty: IsNullableOf<never> },
    { onlyNullish: true; empty: false }
  >
>;
type _11d = Expect<
  Equal<
    { top: IsNullableOf<unknown>; object: IsNullableOf<{ id: 1 }> },
    { top: true; object: false }
  >
>;
type _11e = Expect<
  Equal<
    { branded: IsNullableOf<GivenUserId>; brandedNullable: IsNullableOf<GivenUserId | null> },
    { branded: false; brandedNullable: true }
  >
>;

// 12. Build the key filter that names the properties whose declared value can be
//     nullish, which is the set a validator would have to check.
export type NullableKeysOf<Model> = TODO; // TODO(koan)

type _12a = Expect<Equal<NullableKeysOf<{ a: string | null; b: number }>, "a">>;
type _12b = Expect<Equal<NullableKeysOf<{ a: string; b: number }>, never>>;
type _12c = Expect<Equal<NullableKeysOf<{}>, never>>;
type _12d = Expect<
  Equal<NullableKeysOf<{ a: string | null; b: number | undefined }>, "a" | "b">
>;
type _12e = Expect<Equal<NullableKeysOf<{ a?: string }>, "a">>;

// 13. Build the shallow cleaner that removes nullish values from every property
//     without descending into them.
export type NonNullableValuesOf<Model> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<NonNullableValuesOf<{ a: string | null; b: number }>, { a: string; b: number }>
>;
type _13b = Expect<Equal<NonNullableValuesOf<{}>, {}>>;
type _13c = Expect<
  Equal<
    NonNullableValuesOf<{ nested: { inner: string | null } | null }>,
    { nested: { inner: string | null } }
  >
>;
type _13d = Expect<
  Equal<NonNullableValuesOf<{ readonly a?: string | null }>, { readonly a?: string }>
>;
type _13e = Expect<Equal<NonNullableValuesOf<{ a: null }>, { a: never }>>;

// 14. Build the assertion signature the packet exports, whose predicate narrows
//     the argument in place rather than returning a new value.
export type PresenceRuntimeApi = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    PresenceRuntimeApi["assertPresent"],
    <Value>(value: Value, message?: string) => asserts value is RebuiltNonNullable<Value>
  >
>;
type _14b = Expect<
  Equal<
    PresenceRuntimeApi["requirePresent"],
    <Value>(value: Value, message?: string) => RebuiltNonNullable<Value>
  >
>;
type _14c = Expect<
  Equal<ReturnType<typeof givenRequirePresent<string | null>>, string>
>;
type _14d = Expect<
  Equal<ReturnType<typeof givenRequirePresent<{ id: 1 } | undefined>>, { id: 1 }>
>;
type _14e = Expect<
  Equal<
    {
      cleaned: ReturnType<typeof givenRequirePresent<0 | "" | null>>;
      stillFalsy: RebuiltNonNullable<0 | "" | null>;
    },
    { cleaned: 0 | ""; stillFalsy: 0 | "" }
  >
>;
