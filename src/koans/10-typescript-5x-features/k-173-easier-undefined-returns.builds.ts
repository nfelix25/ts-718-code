import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-173: easier undefined returns — constructions
 * =============================================================================
 *
 * Since TypeScript 5.1, a function annotated `: undefined` may simply fall off
 * the end — no `return undefined;` needed — and a function whose contextual type
 * returns `undefined` may do the same. Before that, only `void` had the
 * privilege, which pushed people towards `void` even where `undefined` was the
 * honest answer.
 *
 * The two are still different types, and the difference is worth keeping
 * straight. `void` in a return position is a statement about the *caller*: it
 * will ignore whatever comes back, so anything may be returned. `undefined` is a
 * statement about the *value*: it is that specific value and nothing else. That
 * is why a `() => number` satisfies `() => void` and does not satisfy
 * `() => undefined`. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The two return types ─────────────────────────────────────────────

// 1. Build the callback that promises the value `undefined`.
export type UndefinedCallback<Args extends readonly unknown[] = []> = TODO; // TODO(koan)

type _01a = Expect<Equal<ReturnType<UndefinedCallback>, undefined>>;
type _01b = Expect<Equal<Parameters<UndefinedCallback>, []>>;
type _01c = Expect<Equal<Parameters<UndefinedCallback<[value: string]>>, [value: string]>>;
type _01d = Expect<Equal<UndefinedCallback<[value: string]>, (value: string) => undefined>>;

// 2. Build the callback that promises nothing about what comes back.
export type VoidCallback<Args extends readonly unknown[] = []> = TODO; // TODO(koan)

type _02a = Expect<Equal<ReturnType<VoidCallback>, void>>;
type _02b = Expect<Equal<Parameters<VoidCallback<[value: string]>>, [value: string]>>;
type _02c = Expect<
  Equal<
    {
      returningANumberFitsVoid: GivenExtends<() => number, VoidCallback>;
      andDoesNotFitUndefined: GivenExtends<() => number, UndefinedCallback>;
    },
    { returningANumberFitsVoid: true; andDoesNotFitUndefined: false }
  >
>;
type _02d = Expect<Equal<VoidCallback<[]>, () => void>>;

// 3. Build the result reader, so the two can be compared through one lens.
export type CallbackResult<Callback extends (...args: any[]) => any> = TODO; // TODO(koan)

type _03a = Expect<Equal<CallbackResult<UndefinedCallback>, undefined>>;
type _03b = Expect<Equal<CallbackResult<VoidCallback>, void>>;
type _03c = Expect<Equal<CallbackResult<() => number>, number>>;
type _03d = Expect<Equal<Equal<CallbackResult<UndefinedCallback>, CallbackResult<VoidCallback>>, false>>;

// ─── How the two relate ───────────────────────────────────────────────

// 4. Report the assignability between the two return types themselves. One
//    direction holds and the other does not, which is the entire asymmetry.
export type ReturnTypeRelationProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<ReturnTypeRelationProfile["undefinedIntoVoid"], true>>;
type _04b = Expect<Equal<ReturnTypeRelationProfile["voidIntoUndefined"], false>>;
type _04c = Expect<Equal<ReturnTypeRelationProfile["undefinedIsAValue"], true>>;
type _04d = Expect<Equal<ReturnTypeRelationProfile["voidIsNotAValue"], false>>;
type _04e = Expect<Equal<ReturnTypeRelationProfile["neitherIsNever"], true>>;

// 5. Report the same question at the *function* level, where the asymmetry
//    reverses. A function returning anything satisfies a `void` callback,
//    because the caller agreed to ignore the result.
export type CallbackRelationProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<CallbackRelationProfile["undefinedCallbackIntoVoidCallback"], true>>;
type _05b = Expect<Equal<CallbackRelationProfile["voidCallbackIntoUndefinedCallback"], false>>;
type _05c = Expect<Equal<CallbackRelationProfile["numberCallbackIntoVoidCallback"], true>>;
type _05d = Expect<Equal<CallbackRelationProfile["numberCallbackIntoUndefinedCallback"], false>>;
type _05e = Expect<Equal<CallbackRelationProfile["neverCallbackIntoBoth"], true>>;

// 6. Build the classifier that names which of the two a return type is — the
//    distinction the 5.1 change made worth stating precisely.
export type ReturnKind<Result> = TODO; // TODO(koan)

type _06a = Expect<Equal<ReturnKind<void>, "ignored by the caller">>;
type _06b = Expect<Equal<ReturnKind<undefined>, "the value undefined">>;
type _06c = Expect<Equal<ReturnKind<never>, "never returns">>;
type _06d = Expect<Equal<ReturnKind<number>, "a real value">>;
type _06e = Expect<Equal<ReturnKind<undefined | number>, "a real value">>;

// ─── The functions the change enables ─────────────────────────────────

// 7. Build the API of functions that fall off the end while promising
//    `undefined`. Each one is legal only because of the 5.1 relaxation.
export type ImplicitUndefinedApi = TODO; // TODO(koan)

type _07a = Expect<Equal<ReturnType<ImplicitUndefinedApi["implicitlyUndefined"]>, undefined>>;
type _07b = Expect<Equal<Parameters<ImplicitUndefinedApi["recordUndefined"]>, [log: string[], value: string]>>;
type _07c = Expect<Equal<ReturnType<ImplicitUndefinedApi["recordUndefined"]>, undefined>>;
type _07d = Expect<
  Equal<Parameters<ImplicitUndefinedApi["invokeUndefined"]>, [callback: () => undefined]>
>;
type _07e = Expect<Equal<ReturnType<ImplicitUndefinedApi["invokeUndefined"]>, undefined>>;

// 8. Build the mapping helper, where the callback's `undefined` result becomes
//    the element type of the array — which is exactly the kind of place `void`
//    would have been wrong.
export type MapWithUndefined = TODO; // TODO(koan)

type _08a = Expect<Equal<ReturnType<MapWithUndefined>, undefined[]>>;
type _08b = Expect<Equal<ReturnType<MapWithUndefined>[number], undefined>>;
type _08c = Expect<Equal<Parameters<MapWithUndefined>["length"], 2>>;
type _08d = Expect<
  Equal<
    {
      elementIsTheValue: ReturnType<MapWithUndefined>[number];
      whichVoidCouldNotHaveExpressed: Equal<ReturnType<MapWithUndefined>[number], void>;
    },
    { elementIsTheValue: undefined; whichVoidCouldNotHaveExpressed: false }
  >
>;

// 9. Build the asynchronous case. `async` wraps the annotation, so a function
//    promising `undefined` produces a promise of `undefined`.
export type AsynchronouslyUndefined = TODO; // TODO(koan)

type _09a = Expect<Equal<ReturnType<AsynchronouslyUndefined>, Promise<undefined>>>;
type _09b = Expect<Equal<Awaited<ReturnType<AsynchronouslyUndefined>>, undefined>>;
type _09c = Expect<Equal<Parameters<AsynchronouslyUndefined>, [log: string[], value: string]>>;
type _09d = Expect<
  Equal<
    {
      awaitedIsTheValue: Awaited<ReturnType<AsynchronouslyUndefined>>;
      andNotVoid: Equal<Awaited<ReturnType<AsynchronouslyUndefined>>, void>;
    },
    { awaitedIsTheValue: undefined; andNotVoid: false }
  >
>;

// ─── Contextual typing ────────────────────────────────────────────────

// 10. Build the record of contextually-typed callbacks — the other half of the
//     5.1 change, where the annotation comes from the surrounding type rather
//     than from the function itself.
export type ContextualCallbacks = TODO; // TODO(koan)

type _10a = Expect<Equal<ReturnType<ContextualCallbacks["undefinedCallback"]>, undefined>>;
type _10b = Expect<Equal<ReturnType<ContextualCallbacks["voidCallback"]>, void>>;
type _10c = Expect<Equal<keyof ContextualCallbacks, "undefinedCallback" | "voidCallback">>;
type _10d = Expect<
  Equal<
    Equal<
      ReturnType<ContextualCallbacks["undefinedCallback"]>,
      ReturnType<ContextualCallbacks["voidCallback"]>
    >,
    false
  >
>;

// 11. Report which callback slot accepts what. The `void` slot takes anything;
//     the `undefined` slot takes only what genuinely produces `undefined`.
export type SlotAcceptanceProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<SlotAcceptanceProfile["undefinedSlotTakesUndefined"], true>>;
type _11b = Expect<Equal<SlotAcceptanceProfile["undefinedSlotTakesNumber"], false>>;
type _11c = Expect<Equal<SlotAcceptanceProfile["voidSlotTakesUndefined"], true>>;
type _11d = Expect<Equal<SlotAcceptanceProfile["voidSlotTakesNumber"], true>>;
type _11e = Expect<Equal<SlotAcceptanceProfile["bothTakeNever"], true>>;

// ─── Where the choice matters ─────────────────────────────────────────

// 12. Report the positions where `void` and `undefined` behave differently.
//     Anywhere the result is *used* rather than ignored, only `undefined` is
//     honest.
export type UsageProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<UsageProfile["asAnArrayElement"][number], undefined>>;
type _12b = Expect<Equal<UsageProfile["asAVoidArrayElement"][number], void>>;
type _12c = Expect<Equal<UsageProfile["theyDiffer"], false>>;
type _12d = Expect<Equal<UsageProfile["inAUnion"], undefined | number>>;
type _12e = Expect<Equal<UsageProfile["voidInAUnionIsUnusual"], false>>;

// 13. Report how the two interact with optionality, which is where `undefined`
//     turns up whether it was asked for or not.
export type OptionalityProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<OptionalityProfile["optionalPropertyReads"], number | undefined>>;
type _13b = Expect<Equal<OptionalityProfile["soUndefinedIsAlreadyThere"], true>>;
type _13c = Expect<Equal<OptionalityProfile["nonNullableRemovesIt"], number>>;
type _13d = Expect<Equal<OptionalityProfile["voidIsNotWhatOptionalityProduces"], false>>;

// 14. Build the operator that converts a `void`-returning signature into an
//     honest `undefined`-returning one — the migration the 5.1 change makes
//     painless.
export type WithUndefinedReturn<Callback> = TODO; // TODO(koan)

type _14a = Expect<Equal<WithUndefinedReturn<VoidCallback>, () => undefined>>;
type _14b = Expect<
  Equal<WithUndefinedReturn<VoidCallback<[value: string]>>, (value: string) => undefined>
>;
type _14c = Expect<Equal<ReturnType<WithUndefinedReturn<VoidCallback>>, undefined>>;
type _14d = Expect<Equal<WithUndefinedReturn<string>, never>>;

// 15. Build its inverse, which is the direction that always works — every
//     result may be widened to `void`.
export type WithVoidReturn<Callback> = TODO; // TODO(koan)

type _15a = Expect<Equal<WithVoidReturn<UndefinedCallback>, () => void>>;
type _15b = Expect<Equal<WithVoidReturn<() => number>, () => void>>;
type _15c = Expect<
  Equal<
    {
      wideningAlwaysFits: GivenExtends<() => number, WithVoidReturn<() => number>>;
      narrowingDoesNot: GivenExtends<() => number, WithUndefinedReturn<VoidCallback>>;
    },
    { wideningAlwaysFits: true; narrowingDoesNot: false }
  >
>;
type _15d = Expect<Equal<WithVoidReturn<string>, never>>;

// 16. Build the predicate that flags a signature whose `void` is hiding a real
//     value — the code-review question this feature makes answerable.
export type HidesAValue<Callback> = TODO; // TODO(koan)

type _16a = Expect<Equal<HidesAValue<VoidCallback>, true>>;
type _16b = Expect<Equal<HidesAValue<UndefinedCallback>, false>>;
type _16c = Expect<Equal<HidesAValue<() => number>, false>>;
type _16d = Expect<Equal<HidesAValue<string>, false>>;

// 17. Build the filter that finds every `void`-returning member of a record —
//     the audit that turns "should this be undefined?" into a list.
export type VoidReturningKeys<Owner> = TODO; // TODO(koan)

type _17a = Expect<Equal<VoidReturningKeys<ContextualCallbacks>, "voidCallback">>;
type _17b = Expect<Equal<VoidReturningKeys<{ a: UndefinedCallback; b: UndefinedCallback }>, never>>;
type _17c = Expect<Equal<VoidReturningKeys<{ a: VoidCallback; b: () => number }>, "a">>;
type _17d = Expect<Equal<VoidReturningKeys<Record<never, never>>, never>>;

// 18. Report one signature at a glance: what it returns, what that means, and
//     what it would look like stated the other way.
export type SignatureReport<Callback extends (...args: any[]) => any> = TODO; // TODO(koan)

type _18a = Expect<Equal<SignatureReport<VoidCallback>["kind"], "ignored by the caller">>;
type _18b = Expect<Equal<SignatureReport<UndefinedCallback>["kind"], "the value undefined">>;
type _18c = Expect<Equal<SignatureReport<VoidCallback>["asUndefined"], () => undefined>>;
type _18d = Expect<Equal<SignatureReport<UndefinedCallback>["asVoid"], () => void>>;
type _18e = Expect<Equal<SignatureReport<() => number>["kind"], "a real value">>;
