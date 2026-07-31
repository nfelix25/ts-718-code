import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-017: Multiple inference candidates — constructions
 * =============================================================================
 *
 * These constructions gather evidence from repeated direct parameters,
 * covariant factories, nested array elements, fallbacks, and constrained object
 * positions. They also isolate literal unions, widening, explicit selection,
 * special candidates, structural views, and contextual checking. Replace each
 * `TODO` with a type that satisfies the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

declare const givenNever: never;
declare const givenAny: any;
declare const givenUnknown: unknown;
const givenBroadString: string = "broad";

// ─── Candidate-gathering signatures ─────────────────────────────────────────

// 1. Construct the constrained primitive chooser signature.
export type ChooseLiteralSignature =
  TODO; // TODO(koan)

declare const givenChooseLiteral: ChooseLiteralSignature;
const chosenLetters = givenChooseLiteral("a", "b");
const chosenNumbers = givenChooseLiteral(1, 2);
const chosenBooleans = givenChooseLiteral(true, false);
const chosenNever = givenChooseLiteral(givenNever, "a");
type _01a = Expect<
  Equal<
    ChooseLiteralSignature,
    <Value extends string | number | boolean>(
      left: Value,
      right: Value,
    ) => Value
  >
>;
type _01b = Expect<Equal<typeof chosenLetters, "a" | "b">>;
type _01c = Expect<Equal<typeof chosenNumbers, 1 | 2>>;
type _01d = Expect<Equal<typeof chosenBooleans, true | false>>;
type _01e = Expect<Equal<typeof chosenNever, "a">>;

// 2. Construct the repeated unconstrained parameter signature.
export type SamePairSignature =
  TODO; // TODO(koan)

declare const givenSamePair: SamePairSignature;
const pairedNumbers = givenSamePair(1, 2);
const pairedStrings = givenSamePair("a", "b");
const pairedObjects = givenSamePair({ id: 1 }, { id: 2 });
const pairedAny = givenSamePair(givenAny, 1);
type _02a = Expect<
  Equal<
    SamePairSignature,
    <Value>(left: Value, right: Value) => [Value, Value]
  >
>;
type _02b = Expect<Equal<typeof pairedNumbers, [number, number]>>;
type _02c = Expect<Equal<typeof pairedStrings, [string, string]>>;
type _02d = Expect<
  Equal<typeof pairedObjects[0], { id: number }>
>;
type _02e = Expect<Equal<GivenKind<typeof pairedAny>, "ordinary">>;

// 3. Construct the covariant factory-candidate signature.
export type FromFactoriesSignature =
  TODO; // TODO(koan)

declare const givenFromFactories: FromFactoriesSignature;
const factoryNumbers = givenFromFactories(
  () => 1 as const,
  () => 2 as const,
);
const factoryStrings = givenFromFactories(
  () => "a" as const,
  () => "b" as const,
);
const factoryObjects = givenFromFactories(
  () => ({ id: 1 }),
  () => ({ id: 2 }),
);
const factoryNever = givenFromFactories(
  () => givenNever,
  () => "a" as const,
);
type _03a = Expect<
  Equal<
    FromFactoriesSignature,
    <Value>(...factories: Array<() => Value>) => Value[]
  >
>;
type _03b = Expect<Equal<typeof factoryNumbers, (1 | 2)[]>>;
type _03c = Expect<Equal<typeof factoryStrings, ("a" | "b")[]>>;
type _03d = Expect<Equal<typeof factoryObjects, { id: number }[]>>;
type _03e = Expect<Equal<typeof factoryNever, "a"[]>>;

// 4. Construct the nested array-element plus direct fallback signature.
export type ArrayFallbackSignature =
  TODO; // TODO(koan)

declare const givenArrayFallback: ArrayFallbackSignature;
const literalFallback = givenArrayFallback(["a", "b"] as const, "c");
const wideFallback = givenArrayFallback(["a", "b"], "c");
const numberFallback = givenArrayFallback([1, 2] as const, 0);
const unknownFallback = givenArrayFallback(
  [givenUnknown],
  1,
);
type _04a = Expect<
  Equal<
    ArrayFallbackSignature,
    <Value>(values: readonly Value[], fallback: Value) => Value
  >
>;
type _04b = Expect<
  Equal<typeof literalFallback, "a" | "b" | "c">
>;
type _04c = Expect<Equal<typeof wideFallback, string>>;
type _04d = Expect<Equal<typeof numberFallback, 0 | 1 | 2>>;
type _04e = Expect<Equal<GivenKind<typeof unknownFallback>, "unknown">>;

// 5. Construct the constrained identified-object merger signature.
export type MergeIdentifiedSignature =
  TODO; // TODO(koan)

declare const givenMergeIdentified: MergeIdentifiedSignature;
const mergedBasic = givenMergeIdentified({ id: "a" }, { id: "b" });
const mergedActive = givenMergeIdentified(
  { id: "a", active: true },
  { id: "b", active: false },
);
const mergedRoles = givenMergeIdentified(
  { id: "a", role: "admin" as const },
  { id: "b", role: "user" as const },
);
const mergedReadonly = givenMergeIdentified(
  { id: "a" } as const,
  { id: "b" } as const,
);
type _05a = Expect<
  Equal<
    MergeIdentifiedSignature,
    <Value extends { id: string }>(
      left: Value,
      right: Value,
    ) => Value[]
  >
>;
type _05b = Expect<Equal<typeof mergedBasic, { id: string }[]>>;
type _05c = Expect<
  Equal<typeof mergedActive, { id: string; active: boolean }[]>
>;
type _05d = Expect<
  Equal<
    typeof mergedRoles,
    (
      | { id: string; role: "admin" }
      | { id: string; role: "user" }
    )[]
  >
>;
type _05e = Expect<
  Equal<
    typeof mergedReadonly,
    (
      | { readonly id: "a" }
      | { readonly id: "b" }
    )[]
  >
>;

// ─── Candidate result construction ──────────────────────────────────────────

type Primitive = string | number | boolean;

// 6. Combine finite constrained primitive candidates without widening them.
export type LiteralCandidates<
  Left extends Primitive,
  Right extends Primitive,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<LiteralCandidates<"a", "b">, "a" | "b">>;
type _06b = Expect<Equal<LiteralCandidates<1, 2>, 1 | 2>>;
type _06c = Expect<
  Equal<LiteralCandidates<true, false>, true | false>
>;
type _06d = Expect<Equal<LiteralCandidates<"a", "a">, "a">>;
type _06e = Expect<Equal<LiteralCandidates<never, "a">, "a">>;

// 7. Widen primitive candidates selected by ordinary mutable positions.
export type WidenPrimitive<Value> =
  TODO; // TODO(koan)

type _07a = Expect<Equal<WidenPrimitive<"a">, string>>;
type _07b = Expect<Equal<WidenPrimitive<1 | 2>, number>>;
type _07c = Expect<Equal<WidenPrimitive<true | false>, boolean>>;
type _07d = Expect<Equal<WidenPrimitive<1n | 2n>, bigint>>;
type _07e = Expect<
  Equal<WidenPrimitive<{ id: 1 }>, { id: 1 }>
>;

// 8. Build the repeated pair after one substitution has been selected.
export type SamePairResult<Value> =
  TODO; // TODO(koan)

type _08a = Expect<Equal<SamePairResult<number>, [number, number]>>;
type _08b = Expect<Equal<SamePairResult<string>, [string, string]>>;
type _08c = Expect<
  Equal<SamePairResult<{ id: number }>[0], { id: number }>
>;
type _08d = Expect<Equal<SamePairResult<unknown>, [unknown, unknown]>>;
type _08e = Expect<Equal<SamePairResult<never>, [never, never]>>;

// 9. Build the array returned after factory candidates select one result type.
export type FactoryResults<Value> =
  TODO; // TODO(koan)

type _09a = Expect<Equal<FactoryResults<1 | 2>, (1 | 2)[]>>;
type _09b = Expect<Equal<FactoryResults<"a" | "b">, ("a" | "b")[]>>;
type _09c = Expect<
  Equal<FactoryResults<{ id: number }>, { id: number }[]>
>;
type _09d = Expect<Equal<FactoryResults<unknown>, unknown[]>>;
type _09e = Expect<Equal<FactoryResults<never>, never[]>>;

// 10. Combine nested element evidence with a direct fallback candidate.
export type NestedFallbackCandidate<Element, Fallback> =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<NestedFallbackCandidate<"a" | "b", "c">, "a" | "b" | "c">
>;
type _10b = Expect<
  Equal<NestedFallbackCandidate<number, 0>, number>
>;
type _10c = Expect<
  Equal<NestedFallbackCandidate<never, "empty">, "empty">
>;
type _10d = Expect<
  Equal<NestedFallbackCandidate<unknown, string>, unknown>
>;

// 11. Produce the constrained object collection after T is selected.
export type IdentifiedResults<Value extends { id: string }> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<IdentifiedResults<{ id: string }>, { id: string }[]>
>;
type _11b = Expect<
  Equal<
    IdentifiedResults<{ id: string; active: boolean }>,
    { id: string; active: boolean }[]
  >
>;
type _11c = Expect<
  Equal<
    IdentifiedResults<{ readonly id: "a" | "b" }>,
    { readonly id: "a" | "b" }[]
  >
>;
type _11d = Expect<
  Equal<
    IdentifiedResults<{ id: string; data: unknown }>,
    { id: string; data: unknown }[]
  >
>;

// ─── Explicit choice, special types, and context ─────────────────────────────

// 12. Classify the candidate that wins without allowing `any` to escape.
export type CandidateKind<Value> =
  TODO; // TODO(koan)

type _12a = Expect<Equal<CandidateKind<number>, "ordinary">>;
type _12b = Expect<Equal<CandidateKind<any>, "any">>;
type _12c = Expect<Equal<CandidateKind<unknown>, "unknown">>;
type _12d = Expect<Equal<CandidateKind<never>, "never">>;

// 13. Build a repeated pair from an explicitly selected public type.
export type ExplicitPair<Selected> =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<ExplicitPair<1 | 2>, [1 | 2, 1 | 2]>
>;
type _13b = Expect<
  Equal<ExplicitPair<string | number>, [string | number, string | number]>
>;
type _13c = Expect<Equal<ExplicitPair<unknown>, [unknown, unknown]>>;
type _13d = Expect<Equal<ExplicitPair<never>, [never, never]>>;

// 14. Build factory results from an explicitly selected element type.
export type ExplicitFactoryResults<Selected> =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<ExplicitFactoryResults<1 | "a">, (1 | "a")[]>
>;
type _14b = Expect<Equal<ExplicitFactoryResults<unknown>, unknown[]>>;
type _14c = Expect<Equal<ExplicitFactoryResults<never>, never[]>>;
type _14d = Expect<
  Equal<
    ExplicitFactoryResults<readonly [1] | readonly [2]>,
    (readonly [1] | readonly [2])[]
  >
>;

// 15. Expose only the explicitly selected structural view of a stored candidate.
export type StoredExplicitView<
  Selected,
  Candidate extends Selected,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    StoredExplicitView<{ id: number }, { id: number; extra: true }>,
    { id: number }
  >
>;
type _15b = Expect<
  Equal<StoredExplicitView<string, "a">, string>
>;
type _15c = Expect<
  Equal<StoredExplicitView<unknown, { id: 1 }>, unknown>
>;
type _15d = Expect<
  Equal<
    StoredExplicitView<{ readonly id: string }, { readonly id: "a" }>,
    { readonly id: string }
  >
>;

// 16. Keep a selected result only when a surrounding context can accept it.
export type ContextChecked<Selected, Context> =
  TODO; // TODO(koan)

type _16a = Expect<Equal<ContextChecked<number, string | number>, number>>;
type _16b = Expect<
  Equal<ContextChecked<readonly [number, number], readonly [number, number]>, readonly [number, number]>
>;
type _16c = Expect<Equal<ContextChecked<string, unknown>, string>>;
type _16d = Expect<Equal<ContextChecked<string, number>, never>>;
type _16e = Expect<Equal<ContextChecked<never, string>, never>>;
