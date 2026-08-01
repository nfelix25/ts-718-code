import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-217: the ES2025 Set, Iterator and Promise APIs — constructions
 * =============================================================================
 *
 * Three families landed together and they are worth reading as three different
 * *timings*. The set operations are eager: they walk both collections and hand
 * back a new `Set`, or a `boolean` for the relation tests. The iterator helpers
 * are lazy: `Iterator.from` wraps either protocol and `map` does nothing until
 * something pulls. `Promise.try` is the odd one out — it exists to normalise a
 * function's *three* possible behaviours (return a value, return a thenable,
 * throw synchronously) into one promise.
 *
 * The type-level content is the element types those operations produce, and it
 * is not uniform: union widens, intersection narrows, difference keeps the left
 * side, and the relation tests keep nothing at all. Build all three families.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── Eager, lazy, or normalising ──────────────────────────────────────

// 1. Build the families.
export type ApiFamily = TODO; // TODO(koan)

type _01a = Expect<Equal<ApiFamily, "set-operation" | "iterator-helper" | "promise-normalisation">>;
type _01b = Expect<Equal<Extract<ApiFamily, `${string}-helper`>, "iterator-helper">>;
type _01c = Expect<Equal<Exclude<ApiFamily, "promise-normalisation">, "set-operation" | "iterator-helper">>;
type _01d = Expect<Equal<Extract<ApiFamily, "regexp-escape">, never>>;

// 2. Build when each family does its work.
export type TimingOf<Family extends ApiFamily> = TODO; // TODO(koan)

type _02a = Expect<Equal<TimingOf<"set-operation">, "immediately">>;
type _02b = Expect<Equal<TimingOf<"iterator-helper">, "when consumed">>;
type _02c = Expect<Equal<TimingOf<"promise-normalisation">, "at the call, once">>;
type _02d = Expect<
  Equal<TimingOf<ApiFamily>, "immediately" | "when consumed" | "at the call, once">
>;

// ─── The set operations ───────────────────────────────────────────────

// 3. Build the union: either side's members, so the element types combine.
export type UnionResult<Left, Right> = TODO; // TODO(koan)

type _03a = Expect<Equal<UnionResult<string, number>, Set<string | number>>>;
type _03b = Expect<Equal<UnionResult<"a", "b">, Set<"a" | "b">>>;
type _03c = Expect<Equal<UnionResult<string, never>, Set<string>>>;
type _03d = Expect<Equal<ReturnType<UnionResult<string, number>["values"]>, SetIterator<string | number>>>;

// 4. Build the intersection: only shared members, so the element types meet.
export type IntersectionResult<Left, Right> = TODO; // TODO(koan)

type _04a = Expect<Equal<IntersectionResult<string | number, string>, Set<string>>>;
type _04b = Expect<Equal<IntersectionResult<string, string>, Set<string>>>;
type _04c = Expect<Equal<IntersectionResult<{ a: 1 }, { b: 2 }>, Set<{ a: 1 } & { b: 2 }>>>;
type _04d = Expect<
  Equal<Equal<IntersectionResult<string, number>, UnionResult<string, number>>, false>
>;

// 5. Build the difference: the left side minus whatever the right one had, which
//    cannot widen the element type and does not narrow it either.
export type DifferenceResult<Left, Right> = TODO; // TODO(koan)

type _05a = Expect<Equal<DifferenceResult<string, number>, Set<string>>>;
type _05b = Expect<Equal<DifferenceResult<"a" | "b", "b">, Set<"a" | "b">>>;
type _05c = Expect<Equal<DifferenceResult<string, unknown>, Set<string>>>;
type _05d = Expect<
  Equal<Equal<DifferenceResult<string, number>, IntersectionResult<string, number>>, false>
>;

// 6. Build the relation tests, which answer a question rather than producing a
//    collection — so no element type survives the call at all.
export type RelationTest = TODO; // TODO(koan)

type _06a = Expect<Equal<ReturnType<RelationTest>, boolean>>;
type _06b = Expect<Equal<Parameters<RelationTest>[0], ReadonlySetLike<unknown>>>;
type _06c = Expect<Equal<Equal<RelationTest, Set<string>["isSubsetOf"]>, true>>;
type _06d = Expect<Equal<Equal<RelationTest, Set<string>["isDisjointFrom"]>, true>>;

// 7. Build the operation table, so the four shapes can be compared at once.
export type SetOperationResult<
  Operation extends "union" | "intersection" | "difference" | "isSubsetOf",
  Left,
  Right,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<SetOperationResult<"union", string, number>, Set<string | number>>
>;
type _07b = Expect<Equal<SetOperationResult<"intersection", string | number, string>, Set<string>>>;
type _07c = Expect<Equal<SetOperationResult<"difference", string, number>, Set<string>>>;
type _07d = Expect<Equal<SetOperationResult<"isSubsetOf", string, number>, boolean>>;

// ─── The iterator helpers ─────────────────────────────────────────────

// 8. Build what `Iterator.from` accepts: either protocol, because the point is to
//    stop caring which one you were handed.
export type FromInput<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<FromInput<string>, Iterator<string, unknown, undefined> | Iterable<string, unknown, undefined>>
>;
type _08b = Expect<
  Equal<Equal<FromInput<string>, Parameters<typeof Iterator.from<string>>[0]>, true>
>;
type _08c = Expect<
  Equal<
    {
      anArrayIsAcceptableBecauseItIsIterable: GivenExtends<string[], FromInput<string>>;
      andSoIsABareIterator: GivenExtends<Iterator<string, unknown, undefined>, FromInput<string>>;
      butNotAnArrayOfTheWrongElement: GivenExtends<number[], FromInput<string>>;
    },
    {
      anArrayIsAcceptableBecauseItIsIterable: true;
      andSoIsABareIterator: true;
      butNotAnArrayOfTheWrongElement: false;
    }
  >
>;
type _08d = Expect<Equal<GivenExtends<number, FromInput<string>>, false>>;

// 9. Build what it produces: the helper-bearing iterator object, whose completion
//    value is nothing.
export type FromResult<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<FromResult<string>, IteratorObject<string, undefined, unknown>>>;
type _09b = Expect<Equal<Equal<FromResult<string>, ReturnType<typeof Iterator.from<string>>>, true>>;
type _09c = Expect<Equal<ReturnType<FromResult<string>["toArray"]>, string[]>>;
type _09d = Expect<Equal<ReturnType<FromResult<string>["next"]>, IteratorResult<string, undefined>>>;

// 10. Build the lazy transform's signature, which returns another iterator rather
//     than a collection — nothing has been pulled yet.
export type LazyMap<Value> = TODO; // TODO(koan)

type _10a = Expect<Equal<ReturnType<LazyMap<string>>, IteratorObject<unknown, undefined, unknown>>>;
type _10b = Expect<Equal<Parameters<Parameters<LazyMap<string>>[0]>, [string, number]>>;
type _10c = Expect<Equal<Equal<LazyMap<string>, IteratorObject<string>["map"]>, true>>;
type _10d = Expect<Equal<Parameters<LazyMap<string>>["length"], 1>>;

// 11. Build the question that separates the two set/iterator families: has any
//     work happened by the time the call returns?
export type WorkDoneAtCall<Family extends ApiFamily> = TODO; // TODO(koan)

type _11a = Expect<Equal<WorkDoneAtCall<"set-operation">, true>>;
type _11b = Expect<Equal<WorkDoneAtCall<"iterator-helper">, false>>;
type _11c = Expect<Equal<WorkDoneAtCall<"promise-normalisation">, true>>;
type _11d = Expect<Equal<WorkDoneAtCall<ApiFamily>, boolean>>;

// ─── Promise.try ──────────────────────────────────────────────────────

// 12. Build the three things the wrapped function can do.
export type CallableOutcome = TODO; // TODO(koan)

type _12a = Expect<Equal<CallableOutcome, "returned a value" | "returned a thenable" | "threw">>;
type _12b = Expect<Equal<Extract<CallableOutcome, `returned${string}`>, "returned a value" | "returned a thenable">>;
type _12c = Expect<Equal<Exclude<CallableOutcome, `returned${string}`>, "threw">>;
type _12d = Expect<Equal<Extract<CallableOutcome, "never returned">, never>>;

// 13. Build what each outcome becomes once normalised. All three end up as one
//     settled promise, which is the entire point.
export type NormalisedTo<Outcome extends CallableOutcome, Value> = TODO; // TODO(koan)

type _13a = Expect<Equal<NormalisedTo<"returned a value", number>, "fulfilled">>;
type _13b = Expect<Equal<NormalisedTo<"returned a thenable", number>, "fulfilled">>;
type _13c = Expect<Equal<NormalisedTo<"threw", number>, "rejected">>;
type _13d = Expect<Equal<NormalisedTo<CallableOutcome, number>, "fulfilled" | "rejected">>;

// 14. Build the callable it accepts: one that may return the value or a thenable
//     of it, since both are normalised the same way.
export type TryCallable<Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<ReturnType<TryCallable<number>>, number | PromiseLike<number>>>;
type _14b = Expect<Equal<Parameters<TryCallable<number>>, []>>;
type _14c = Expect<
  Equal<Equal<TryCallable<number>, Parameters<typeof Promise.try<number, []>>[0]>, true>
>;
type _14d = Expect<Equal<Awaited<ReturnType<TryCallable<number>>>, number>>;

// 15. Build its result, which is a promise however the callable behaved.
export type TryResult<Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<TryResult<number>, Promise<number>>>;
type _15b = Expect<Equal<Awaited<TryResult<number>>, number>>;
type _15c = Expect<Equal<Equal<TryResult<number>, ReturnType<typeof Promise.try<number, []>>>, true>>;
type _15d = Expect<Equal<Awaited<TryResult<Promise<number>>>, number>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the four set operations' result shapes side by side.
export type SetProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<SetProfile["union"], Set<string | number>>>;
type _16b = Expect<Equal<SetProfile["intersection"], Set<string>>>;
type _16c = Expect<Equal<SetProfile["difference"], Set<string>>>;
type _16d = Expect<Equal<SetProfile["relation"], boolean>>;
type _16e = Expect<Equal<SetProfile["andAllOfThemRanImmediately"], true>>;

// 17. Report the iterator side, where nothing has happened yet.
export type IteratorProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<IteratorProfile["wrapped"], IteratorObject<string, undefined, unknown>>>;
type _17b = Expect<
  Equal<IteratorProfile["afterMapping"], IteratorObject<unknown, undefined, unknown>>
>;
type _17c = Expect<Equal<IteratorProfile["nothingHasBeenPulled"], false>>;
type _17d = Expect<Equal<IteratorProfile["andCollectingIsWhatFinallyDoes"], string[]>>;

// 18. Report one API at a glance: its family, when it works, and what it hands
//     back.
export type Es2025Report<Family extends ApiFamily, Left, Right> = TODO; // TODO(koan)

type _18a = Expect<Equal<Es2025Report<"set-operation", string, number>["timing"], "immediately">>;
type _18b = Expect<Equal<Es2025Report<"iterator-helper", string, number>["eager"], false>>;
type _18c = Expect<
  Equal<Es2025Report<"set-operation", string, number>["setResult"], Set<string | number>>
>;
type _18d = Expect<
  Equal<Es2025Report<"iterator-helper", string, number>["iteratorResult"], IteratorObject<string, undefined, unknown>>
>;
type _18e = Expect<
  Equal<Es2025Report<"promise-normalisation", string, number>["promiseResult"], Promise<string>>
>;
