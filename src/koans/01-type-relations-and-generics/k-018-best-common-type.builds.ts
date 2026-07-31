import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-018: Best common type — constructions
 * =============================================================================
 *
 * These constructions build mutable common-element arrays, object alternatives,
 * contextual targets, candidate-based subtype choices, preserved tuples, and
 * the generic views used to read, collect, and copy them. They also cover empty,
 * nullish, `never`, `any`, `unknown`, unchecked lookup, inheritance, and
 * function-candidate boundaries. Replace each `TODO` with a type that satisfies
 * the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

class GivenAnimal {
  animal = true;
}

class GivenDog extends GivenAnimal {
  dog = true;
}

class GivenCat extends GivenAnimal {
  cat = true;
}

class GivenPoodle extends GivenDog {
  poodle = true;
}

// ─── Mutable primitive and union element arrays ─────────────────────────────

// 1. Widen mutable primitive literals while preserving non-primitives.
export type WidenArrayCandidate<Value> =
  TODO; // TODO(koan)

type _01a = Expect<Equal<WidenArrayCandidate<1 | 2>, number>>;
type _01b = Expect<Equal<WidenArrayCandidate<"a" | "b">, string>>;
type _01c = Expect<Equal<WidenArrayCandidate<true | false>, boolean>>;
type _01d = Expect<Equal<WidenArrayCandidate<1n | 2n>, bigint>>;
type _01e = Expect<
  Equal<WidenArrayCandidate<{ id: 1 }>, { id: 1 }>
>;

// 2. Build a homogeneous mutable array from its widened candidate union.
export type HomogeneousArray<Candidate> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<HomogeneousArray<1 | 2 | 3>, number[]>>;
type _02b = Expect<Equal<HomogeneousArray<"a" | "b">, string[]>>;
type _02c = Expect<Equal<HomogeneousArray<true | false>, boolean[]>>;
type _02d = Expect<Equal<HomogeneousArray<1n | 2n>, bigint[]>>;

// 3. Build an array whose unrelated candidate categories remain a union.
export type MixedArray<Candidates> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<MixedArray<1 | "a">, (number | string)[]>>;
type _03b = Expect<
  Equal<MixedArray<1 | "a" | true>, (number | string | boolean)[]>
>;
type _03c = Expect<
  Equal<MixedArray<1 | null>, (number | null)[]>
>;
type _03d = Expect<
  Equal<MixedArray<"a" | undefined>, (string | undefined)[]>
>;
type _03e = Expect<
  Equal<MixedArray<null | undefined>, (null | undefined)[]>
>;

// 4. Produce the shared-shape object collection after member values widen.
export type ObjectArray<Element> =
  TODO; // TODO(koan)

type _04a = Expect<
  Equal<ObjectArray<{ id: number }>, { id: number }[]>
>;
type _04b = Expect<
  Equal<
    ObjectArray<{ data: { value: number } }>,
    { data: { value: number } }[]
  >
>;
type _04c = Expect<
  Equal<ObjectArray<{ value: string | number }>, { value: string | number }[]>
>;
type _04d = Expect<Equal<ObjectArray<Date>, Date[]>>;

// ─── Object alternatives and contextual targets ─────────────────────────────

type CompleteAlternative<Current, Other> =
  Current & {
    [Key in Exclude<keyof Other, keyof Current>]?: never;
  };

// 5. Preserve both object shapes and mark each absent key as optional-never.
export type ObjectAlternatives<Left, Right> =
  TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    ObjectAlternatives<{ left: number }, { right: string }>[number]["left"],
    number | undefined
  >
>;
type _05b = Expect<
  Equal<
    ObjectAlternatives<{ left: number }, { right: string }>[number]["right"],
    string | undefined
  >
>;
type _05c = Expect<
  Equal<
    [
      ObjectAlternatives<
        { id: number },
        { id: number; active: boolean }
      >[number]["id"],
      ObjectAlternatives<
        { id: number },
        { id: number; active: boolean }
      >[number]["active"],
    ],
    [number, boolean | undefined]
  >
>;
type _05d = Expect<
  Equal<ObjectAlternatives<{}, {}>, ({} | {})[]>
>;

// 6. Build the array view supplied directly by contextual typing.
export type ContextArray<Element> =
  TODO; // TODO(koan)

type _06a = Expect<Equal<ContextArray<GivenAnimal>, GivenAnimal[]>>;
type _06b = Expect<
  Equal<ContextArray<string | number>, (string | number)[]>
>;
type _06c = Expect<
  Equal<
    ContextArray<{ id: number; active?: boolean }>,
    { id: number; active?: boolean }[]
  >
>;
type _06d = Expect<Equal<ContextArray<unknown>, unknown[]>>;

// 7. Keep unrelated sibling candidates as an element union.
export type CandidateUnionArray<Left, Right> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<CandidateUnionArray<GivenDog, GivenCat>, (GivenDog | GivenCat)[]>
>;
type _07b = Expect<
  Equal<CandidateUnionArray<1, "a">, (1 | "a")[]>
>;
type _07c = Expect<
  Equal<
    CandidateUnionArray<{ a: number }, { b: string }>,
    ({ a: number } | { b: string })[]
  >
>;
type _07d = Expect<Equal<CandidateUnionArray<never, string>, string[]>>;

// 8. Choose an existing broader candidate when one candidate covers the other.
export type BestExistingCandidate<Left, Right> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<BestExistingCandidate<GivenPoodle, GivenDog>, GivenDog[]>
>;
type _08b = Expect<
  Equal<BestExistingCandidate<GivenDog, GivenPoodle>, GivenDog[]>
>;
type _08c = Expect<
  Equal<BestExistingCandidate<GivenDog, GivenCat>, (GivenDog | GivenCat)[]>
>;
type _08d = Expect<
  Equal<BestExistingCandidate<"a", string>, string[]>
>;

// ─── Tuple preservation and generic consumption ─────────────────────────────

// 9. Preserve candidate positions and literals as a readonly tuple.
export type PreservedTuple<Items extends readonly unknown[]> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<PreservedTuple<[1, 2]>, readonly [1, 2]>
>;
type _09b = Expect<
  Equal<PreservedTuple<["ok", 200, true]>, readonly ["ok", 200, true]>
>;
type _09c = Expect<
  Equal<
    PreservedTuple<[{ id: 1 }, { id: 2 }]>,
    readonly [{ id: 1 }, { id: 2 }]
  >
>;
type _09d = Expect<Equal<PreservedTuple<[]>, readonly []>>;

// 10. Project the element union observed through a tuple.
export type TupleElement<Items extends readonly unknown[]> =
  TODO; // TODO(koan)

type _10a = Expect<Equal<TupleElement<readonly [1, 2]>, 1 | 2>>;
type _10b = Expect<
  Equal<TupleElement<readonly ["ok", 200, true]>, "ok" | 200 | true>
>;
type _10c = Expect<Equal<TupleElement<readonly []>, never>>;
type _10d = Expect<
  Equal<TupleElement<readonly [{ id: 1 }, { id: 2 }]>, { id: 1 } | { id: 2 }>
>;

// 11. Copy a readonly collection into a mutable array of its element type.
export type CopiedList<Element> =
  TODO; // TODO(koan)

type _11a = Expect<Equal<CopiedList<1 | 2>, (1 | 2)[]>>;
type _11b = Expect<
  Equal<CopiedList<"ok" | 200>, ("ok" | 200)[]>
>;
type _11c = Expect<Equal<CopiedList<never>, never[]>>;
type _11d = Expect<Equal<CopiedList<unknown>, unknown[]>>;

// 12. Produce the potentially absent result of a boundary read.
export type BoundaryResult<Element> =
  TODO; // TODO(koan)

type _12a = Expect<Equal<BoundaryResult<number>, number | undefined>>;
type _12b = Expect<
  Equal<BoundaryResult<string | number>, string | number | undefined>
>;
type _12c = Expect<Equal<BoundaryResult<never>, undefined>>;
type _12d = Expect<Equal<BoundaryResult<unknown>, unknown>>;

// 13. Produce the mutable result returned by a generic rest collector.
export type CollectedList<Element> =
  TODO; // TODO(koan)

type _13a = Expect<Equal<CollectedList<number>, number[]>>;
type _13b = Expect<
  Equal<CollectedList<string | number>, (string | number)[]>
>;
type _13c = Expect<Equal<CollectedList<never>, never[]>>;
type _13d = Expect<Equal<CollectedList<readonly [1, 2]>, (readonly [1, 2])[]>>;

// ─── Empty and special candidates ───────────────────────────────────────────

// 14. Build the mutable copy of a preserved empty tuple.
export type EmptyTupleCopy =
  TODO; // TODO(koan)

type _14a = Expect<Equal<EmptyTupleCopy, never[]>>;
type _14b = Expect<Equal<EmptyTupleCopy[number], never>>;

// 15. Classify the common element without allowing `any` to escape.
export type CommonElementKind<Element> =
  TODO; // TODO(koan)

type _15a = Expect<Equal<CommonElementKind<number>, "ordinary">>;
type _15b = Expect<Equal<CommonElementKind<any>, "any">>;
type _15c = Expect<Equal<CommonElementKind<unknown>, "unknown">>;
type _15d = Expect<Equal<CommonElementKind<never>, "never">>;

// 16. Add unchecked-index absence to an inferred element union.
export type UncheckedElement<Element> =
  TODO; // TODO(koan)

type _16a = Expect<Equal<UncheckedElement<number>, number | undefined>>;
type _16b = Expect<
  Equal<
    UncheckedElement<{ kind: "a" } | { kind: "b" }>,
    { kind: "a" } | { kind: "b" } | undefined
  >
>;
type _16c = Expect<Equal<UncheckedElement<never>, undefined>>;
type _16d = Expect<Equal<UncheckedElement<unknown>, unknown>>;

// ─── Function candidates ────────────────────────────────────────────────────

// 17. Preserve alternative function candidates when no context joins returns.
export type FunctionAlternatives<Left, Right> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    FunctionAlternatives<number, string>,
    Array<(() => number) | (() => string)>
  >
>;
type _17b = Expect<
  Equal<FunctionAlternatives<1, 2>, Array<(() => 1) | (() => 2)>>
>;
type _17c = Expect<
  Equal<
    FunctionAlternatives<{ a: 1 }, { b: 2 }>,
    Array<(() => { a: 1 }) | (() => { b: 2 })>
  >
>;

// 18. Build the contextual function array returning one value union.
export type ContextFunctions<Result> =
  TODO; // TODO(koan)

type _18a = Expect<
  Equal<ContextFunctions<string | number>, Array<() => string | number>>
>;
type _18b = Expect<
  Equal<ContextFunctions<1 | 2>, Array<() => 1 | 2>>
>;
type _18c = Expect<Equal<ContextFunctions<unknown>, Array<() => unknown>>>;
type _18d = Expect<Equal<ContextFunctions<never>, Array<() => never>>>;

// ─── Generic collection signatures ──────────────────────────────────────────

// 19. Construct the potentially absent first/last reader signature.
export type BoundaryReaderSignature =
  TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    BoundaryReaderSignature,
    <Element>(values: readonly Element[]) => Element | undefined
  >
>;
type _19b = Expect<Equal<ReturnType<BoundaryReaderSignature>, unknown>>;
type _19c = Expect<
  Equal<Parameters<BoundaryReaderSignature>, [values: readonly unknown[]]>
>;

// 20. Construct the explicit or inferred rest collector signature.
export type CollectSignature =
  TODO; // TODO(koan)

type _20a = Expect<
  Equal<CollectSignature, <Element>(...values: Element[]) => Element[]>
>;
type _20b = Expect<Equal<ReturnType<CollectSignature>, unknown[]>>;

// 21. Construct the readonly-to-mutable list copy signature.
export type CopyListSignature =
  TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    CopyListSignature,
    <Element>(values: readonly Element[]) => Element[]
  >
>;
type _21b = Expect<Equal<ReturnType<CopyListSignature>, unknown[]>>;
type _21c = Expect<
  Equal<Parameters<CopyListSignature>, [values: readonly unknown[]]>
>;
