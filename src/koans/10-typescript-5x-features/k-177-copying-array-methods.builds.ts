import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-177: copying array methods — constructions
 * =============================================================================
 *
 * `toReversed`, `toSorted`, `toSpliced`, and `with` do what `reverse`, `sort`,
 * `splice`, and index assignment do, without touching the original. TypeScript
 * 5.2 shipped their declarations, and the interesting part is *where* it put
 * them: on `ReadonlyArray` as well as `Array`, because a method that does not
 * mutate has no reason to demand a mutable receiver.
 *
 * That placement is the whole lesson. A `readonly Element[]` can be sorted, and
 * the result is a fresh mutable `Element[]` — reading from an immutable source
 * and producing a writable copy. The mutating originals stay on `Array` only,
 * which is what makes `readonly` mean something rather than being a comment.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The result of a copy ─────────────────────────────────────────────

// 1. Build the result type these methods produce: a mutable array of whatever
//    the source held, regardless of how the source was declared.
export type CopyResult<ArrayType extends readonly unknown[]> = TODO; // TODO(koan)

type _01a = Expect<Equal<CopyResult<readonly number[]>, number[]>>;
type _01b = Expect<Equal<CopyResult<readonly [1, "two", true]>, (1 | "two" | true)[]>>;
type _01c = Expect<Equal<CopyResult<readonly []>, never[]>>;
type _01d = Expect<Equal<CopyResult<readonly ["a", "b"]>[number], "a" | "b">>;
type _01e = Expect<Equal<CopyResult<readonly [id: string, count: number]>, (string | number)[]>>;

// 2. Build the name of the family, so the four can be talked about together.
export type CopyingMethod = TODO; // TODO(koan)

type _02a = Expect<Equal<CopyingMethod, "toReversed" | "toSorted" | "toSpliced" | "with">>;
type _02b = Expect<Equal<Extract<CopyingMethod, "with">, "with">>;
type _02c = Expect<Equal<Extract<CopyingMethod, "sort">, never>>;
type _02d = Expect<
  Equal<
    {
      everyCopyingMethodIsOnReadonly: GivenExtends<CopyingMethod, keyof readonly number[]>;
      sortIsNotACopyingMethod: Extract<CopyingMethod, "sort">;
    },
    { everyCopyingMethodIsOnReadonly: true; sortIsNotACopyingMethod: never }
  >
>;

// 3. Build the name of the mutating family they replace.
export type MutatingMethod = TODO; // TODO(koan)

type _03a = Expect<Equal<MutatingMethod, "reverse" | "sort" | "splice">>;
type _03b = Expect<
  Equal<
    {
      everyMutatingMethodIsOnMutable: GivenExtends<MutatingMethod, keyof number[]>;
      sortIsNotACopyingMethod: Extract<CopyingMethod, "sort">;
    },
    { everyMutatingMethodIsOnMutable: true; sortIsNotACopyingMethod: never }
  >
>;
type _03c = Expect<Equal<GivenExtends<MutatingMethod, keyof readonly number[]>, false>>;
type _03d = Expect<Equal<Extract<MutatingMethod, CopyingMethod>, never>>;

// ─── Where the two families live ──────────────────────────────────────

// 4. Build the predicate that asks whether a method is available on a readonly
//    array — the question that separates the two families.
export type AvailableOnReadonly<Method extends PropertyKey> = TODO; // TODO(koan)

type _04a = Expect<Equal<AvailableOnReadonly<"toSorted">, true>>;
type _04b = Expect<Equal<AvailableOnReadonly<"sort">, false>>;
type _04c = Expect<Equal<AvailableOnReadonly<"with">, true>>;
type _04d = Expect<Equal<AvailableOnReadonly<"push">, false>>;
type _04e = Expect<Equal<AvailableOnReadonly<"map">, true>>;

// 5. Report the placement across both families at once. Every copying method is
//    on the readonly interface; not one of the mutating ones is.
export type PlacementProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<PlacementProfile["copyingOnReadonly"], true>>;
type _05b = Expect<Equal<PlacementProfile["mutatingOnReadonly"], false>>;
type _05c = Expect<Equal<PlacementProfile["copyingOnMutable"], true>>;
type _05d = Expect<Equal<PlacementProfile["mutatingOnMutable"], true>>;
type _05e = Expect<Equal<PlacementProfile["readonlyKeysAreASubset"], true>>;

// ─── The four signatures ──────────────────────────────────────────────

// 6. Build the reversing helper. It accepts a readonly source and produces a
//    mutable copy — the shape every one of the four shares.
export type ReverseCopy = TODO; // TODO(koan)

type _06a = Expect<Equal<ReturnType<ReverseCopy>, unknown[]>>;
type _06b = Expect<Equal<Parameters<ReverseCopy>[0], readonly unknown[]>>;
type _06c = Expect<Equal<Parameters<ReverseCopy>["length"], 1>>;
type _06d = Expect<
  Equal<
    {
      sourceIsReadonly: Parameters<ReverseCopy>[0];
      resultIsMutable: ReturnType<ReverseCopy>;
    },
    { sourceIsReadonly: readonly unknown[]; resultIsMutable: unknown[] }
  >
>;

// 7. Build the sorting helper, whose comparator sees the element type both ways
//    round.
export type SortCopy = TODO; // TODO(koan)

type _07a = Expect<Equal<ReturnType<SortCopy>, unknown[]>>;
type _07b = Expect<Equal<Parameters<SortCopy>[1], (left: unknown, right: unknown) => number>>;
type _07c = Expect<Equal<Parameters<SortCopy>["length"], 2>>;
type _07d = Expect<Equal<ReturnType<Parameters<SortCopy>[1]>, number>>;

// 8. Build the splicing helper, whose replacement items arrive as a rest
//    parameter of the element type.
export type SpliceCopy = TODO; // TODO(koan)

type _08a = Expect<Equal<ReturnType<SpliceCopy>, unknown[]>>;
type _08b = Expect<Equal<Parameters<SpliceCopy>[1], number>>;
type _08c = Expect<
  Equal<
    {
      restItem: Parameters<SpliceCopy>[3];
      sortIsNotACopyingMethod: Extract<CopyingMethod, "sort">;
    },
    { restItem: unknown; sortIsNotACopyingMethod: never }
  >
>;
type _08d = Expect<
  Equal<
    {
      arity: Parameters<SpliceCopy>["length"];
      sortIsNotACopyingMethod: Extract<CopyingMethod, "sort">;
    },
    { arity: number; sortIsNotACopyingMethod: never }
  >
>;

// 9. Build the single-index replacement helper — the copying counterpart of an
//    index assignment.
export type ReplaceCopy = TODO; // TODO(koan)

type _09a = Expect<Equal<ReturnType<ReplaceCopy>, unknown[]>>;
type _09b = Expect<
  Equal<
    {
      replacementValue: Parameters<ReplaceCopy>[2];
      sortIsNotACopyingMethod: Extract<CopyingMethod, "sort">;
    },
    { replacementValue: unknown; sortIsNotACopyingMethod: never }
  >
>;
type _09c = Expect<Equal<Parameters<ReplaceCopy>["length"], 3>>;
type _09d = Expect<Equal<Parameters<ReplaceCopy>[1], number>>;

// ─── What the library actually declares ───────────────────────────────

// 10. Report the copying methods as they appear on `ReadonlyArray`. Each one
//     hands back a mutable array, which is what makes them useful for turning an
//     immutable value into something you may then modify.
export type ReadonlyArrayProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<ReadonlyArrayProfile["reversed"], number[]>>;
type _10b = Expect<Equal<ReadonlyArrayProfile["sorted"], number[]>>;
type _10c = Expect<Equal<ReadonlyArrayProfile["spliced"], number[]>>;
type _10d = Expect<Equal<ReadonlyArrayProfile["replaced"], number[]>>;
type _10e = Expect<
  Equal<ReadonlyArrayProfile["comparator"], ((a: number, b: number) => number) | undefined>
>;

// 11. Report the same methods on the mutable interface, which inherits them
//     unchanged — the copy is a copy either way.
export type MutableArrayProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<MutableArrayProfile["reversedCopy"], string[]>>;
type _11b = Expect<Equal<MutableArrayProfile["reversedInPlace"], string[]>>;
type _11c = Expect<Equal<MutableArrayProfile["replacedCopy"], string[]>>;
type _11d = Expect<Equal<MutableArrayProfile["replacementArguments"], [index: number, value: string]>>;
type _11e = Expect<Equal<MutableArrayProfile["bothResultsAreMutable"], true>>;

// ─── What the copy loses ──────────────────────────────────────────────

// 12. Report what happens to a tuple. These methods are declared on the array
//     interfaces, so a tuple source produces a plain array of its element union
//     — the positions are gone.
export type TupleProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<TupleProfile["source"], readonly [id: string, count: number]>>;
type _12b = Expect<Equal<TupleProfile["copied"], (string | number)[]>>;
type _12c = Expect<Equal<TupleProfile["sourceLength"], 2>>;
type _12d = Expect<Equal<TupleProfile["copiedLength"], number>>;
type _12e = Expect<Equal<TupleProfile["positionsAreLost"], false>>;

// 13. Report the readonly-ness crossing. The source may be immutable and the
//     result never is, which is exactly the asymmetry that makes these methods
//     worth having.
export type MutabilityProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<MutabilityProfile["sourceAcceptsMutable"], true>>;
type _13b = Expect<Equal<MutabilityProfile["sourceAcceptsReadonly"], true>>;
type _13c = Expect<Equal<MutabilityProfile["resultIsMutable"], true>>;
type _13d = Expect<Equal<MutabilityProfile["resultIsNotReadonlyOnly"], false>>;
type _13e = Expect<Equal<MutabilityProfile["soACopyMayThenBeMutated"], true>>;

// ─── Choosing between the two families ────────────────────────────────

// 14. Build the mapping from a mutating method to its copying counterpart — the
//     migration table.
export type CopyingCounterpart<Method extends MutatingMethod> = TODO; // TODO(koan)

type _14a = Expect<Equal<CopyingCounterpart<"reverse">, "toReversed">>;
type _14b = Expect<Equal<CopyingCounterpart<"sort">, "toSorted">>;
type _14c = Expect<Equal<CopyingCounterpart<"splice">, "toSpliced">>;
type _14d = Expect<Equal<CopyingCounterpart<MutatingMethod>, "toReversed" | "toSorted" | "toSpliced">>;
type _14e = Expect<
  Equal<
    {
      counterpartsAreCopyingMethods: GivenExtends<CopyingCounterpart<MutatingMethod>, CopyingMethod>;
      sortIsNotACopyingMethod: Extract<CopyingMethod, "sort">;
    },
    { counterpartsAreCopyingMethods: true; sortIsNotACopyingMethod: never }
  >
>;

// 15. Build the gate that admits a source only when a given method may be called
//     on it — the type-level version of the error a readonly array produces.
export type CallableOn<ArrayType extends readonly unknown[], Method extends PropertyKey> = TODO; // TODO(koan)

type _15a = Expect<Equal<CallableOn<readonly number[], "toSorted">, readonly number[]>>;
type _15b = Expect<Equal<CallableOn<readonly number[], "sort">, never>>;
type _15c = Expect<Equal<CallableOn<number[], "sort">, number[]>>;
type _15d = Expect<Equal<CallableOn<number[], "toSorted">, number[]>>;

// 16. Build the operator that describes a whole record's arrays after copying —
//     what a "freeze then work on copies" transform would produce.
export type CopiedArrays<Owner> = TODO; // TODO(koan)

type _16a = Expect<Equal<CopiedArrays<{ values: readonly number[] }>, { values: number[] }>>;
type _16b = Expect<Equal<CopiedArrays<{ values: readonly [1, 2]; name: string }>, { values: (1 | 2)[]; name: string }>>;
type _16c = Expect<Equal<CopiedArrays<{ name: string }>, { name: string }>>;
type _16d = Expect<Equal<keyof CopiedArrays<{ a: readonly string[]; b: number }>, "a" | "b">>;

// 17. Build the filter that finds the readonly arrays in a record — the members
//     these methods exist for.
export type ReadonlyArrayKeys<Owner> = TODO; // TODO(koan)

type _17a = Expect<Equal<ReadonlyArrayKeys<{ a: readonly number[]; b: number[] }>, "a">>;
type _17b = Expect<Equal<ReadonlyArrayKeys<{ a: number[]; b: string }>, never>>;
type _17c = Expect<Equal<ReadonlyArrayKeys<{ a: readonly [1, 2] }>, "a">>;
type _17d = Expect<Equal<ReadonlyArrayKeys<Record<never, never>>, never>>;

// 18. Report one source at a glance: what may be called on it, what a copy would
//     produce, and whether the copy may then be mutated.
export type SourceReport<ArrayType extends readonly unknown[]> = TODO; // TODO(koan)

type _18a = Expect<Equal<SourceReport<readonly number[]>["copyingAvailable"], true>>;
type _18b = Expect<Equal<SourceReport<readonly number[]>["mutatingAvailable"], false>>;
type _18c = Expect<Equal<SourceReport<number[]>["mutatingAvailable"], true>>;
type _18d = Expect<Equal<SourceReport<readonly [1, 2]>["copy"], (1 | 2)[]>>;
type _18e = Expect<Equal<SourceReport<readonly number[]>["copyIsMutable"], true>>;
