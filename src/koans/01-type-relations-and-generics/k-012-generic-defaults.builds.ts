import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-012: Generic defaults — constructions
 * =============================================================================
 *
 * These constructions model the result types, dependent selections, reusable
 * signatures, aliases, and constraint boundaries created by generic defaults.
 * Together they distinguish genuine omission from explicit or inferred evidence
 * and keep runtime optionality separate from type-argument fallback. Replace
 * each `TODO` with a type that satisfies the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

declare const givenSymbol: unique symbol;

// ─── Omission, evidence, and optional runtime values ────────────────────────

// 1. Produce the optional runtime result for a defaulted candidate.
export type OptionalValueResult<Candidate = string> =
  TODO; // TODO(koan)

type _01a = Expect<Equal<OptionalValueResult, string | undefined>>;
type _01b = Expect<Equal<OptionalValueResult<number>, number | undefined>>;
type _01c = Expect<Equal<OptionalValueResult<undefined>, undefined>>;
type _01d = Expect<Equal<OptionalValueResult<null>, null | undefined>>;
type _01e = Expect<
  Equal<OptionalValueResult<readonly [1, 2]>, readonly [1, 2] | undefined>
>;

// 2. Classify the candidate selected before runtime optionality is added.
export type SelectedCandidateKind<Candidate = string> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<SelectedCandidateKind, "ordinary">>;
type _02b = Expect<Equal<SelectedCandidateKind<undefined>, "ordinary">>;
type _02c = Expect<Equal<SelectedCandidateKind<never>, "never">>;
type _02d = Expect<Equal<SelectedCandidateKind<unknown>, "unknown">>;
type _02e = Expect<Equal<SelectedCandidateKind<any>, "any">>;

// 3. Classify the final result after the selected candidate is optionalized.
export type OptionalValueKind<Candidate = string> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<OptionalValueKind, "ordinary">>;
type _03b = Expect<Equal<OptionalValueKind<never>, "ordinary">>;
type _03c = Expect<Equal<OptionalValueKind<unknown>, "unknown">>;
type _03d = Expect<Equal<OptionalValueKind<any>, "any">>;

// ─── Dependent defaults ─────────────────────────────────────────────────────

// 4. Expose the two type arguments after the later default follows the first.
export type DependentSlots<First = string, Second = First> =
  TODO; // TODO(koan)

type _04a = Expect<Equal<DependentSlots, [string, string]>>;
type _04b = Expect<Equal<DependentSlots<number>, [number, number]>>;
type _04c = Expect<Equal<DependentSlots<undefined>, [undefined, undefined]>>;
type _04d = Expect<
  Equal<DependentSlots<"a" | "b">, ["a" | "b", "a" | "b"]>
>;
type _04e = Expect<
  Equal<DependentSlots<number, string>, [number, string]>
>;

// 5. Produce the runtime pair when both defaulted values may be absent.
export type DefaultPairResult<First = string, Second = First> =
  TODO; // TODO(koan)

type _05a = Expect<
  Equal<DefaultPairResult, [string | undefined, string | undefined]>
>;
type _05b = Expect<Equal<DefaultPairResult<never>, [undefined, undefined]>>;
type _05c = Expect<Equal<DefaultPairResult<unknown>, [unknown, unknown]>>;
type _05d = Expect<
  Equal<
    DefaultPairResult<"a" | "b", number>,
    ["a" | "b" | undefined, number | undefined]
  >
>;
type _05e = Expect<
  Equal<DefaultPairResult<null, undefined>, [null | undefined, undefined]>
>;

// 6. Classify both selected slots without allowing `any` to escape.
export type DependentSlotKinds<First = string, Second = First> =
  TODO; // TODO(koan)

type _06a = Expect<Equal<DependentSlotKinds, ["ordinary", "ordinary"]>>;
type _06b = Expect<Equal<DependentSlotKinds<never>, ["never", "never"]>>;
type _06c = Expect<Equal<DependentSlotKinds<unknown>, ["unknown", "unknown"]>>;
type _06d = Expect<Equal<DependentSlotKinds<any>, ["any", "any"]>>;
type _06e = Expect<
  Equal<DependentSlotKinds<any, number>, ["any", "ordinary"]>
>;

// ─── Empty rest inference ───────────────────────────────────────────────────

// 7. Produce the collection whose empty-call element default is `never`.
export type CollectedResult<Element = never> =
  TODO; // TODO(koan)

type _07a = Expect<Equal<CollectedResult, never[]>>;
type _07b = Expect<Equal<CollectedResult<number>, number[]>>;
type _07c = Expect<Equal<CollectedResult<"a" | "b">, ("a" | "b")[]>>;
type _07d = Expect<Equal<CollectedResult<unknown>, unknown[]>>;
type _07e = Expect<
  Equal<CollectedResult<readonly [1, 2]>, (readonly [1, 2])[]>
>;

// 8. Classify the rest element selected before the array is constructed.
export type CollectionElementKind<Element = never> =
  TODO; // TODO(koan)

type _08a = Expect<Equal<CollectionElementKind, "never">>;
type _08b = Expect<Equal<CollectionElementKind<string>, "ordinary">>;
type _08c = Expect<Equal<CollectionElementKind<unknown>, "unknown">>;
type _08d = Expect<Equal<CollectionElementKind<any>, "any">>;

// ─── Rightmost defaults and constraints ─────────────────────────────────────

// 9. Build a registry while allowing the trailing value slot to stay omitted.
export type RegistryResult<
  Key extends PropertyKey = string,
  Value = unknown,
> = TODO; // TODO(koan)

type _09a = Expect<Equal<RegistryResult, Map<string, unknown>>>;
type _09b = Expect<Equal<RegistryResult<"id">, Map<"id", unknown>>>;
type _09c = Expect<
  Equal<RegistryResult<"id" | "count", number>, Map<"id" | "count", number>>
>;
type _09d = Expect<
  Equal<RegistryResult<typeof givenSymbol, boolean>, Map<typeof givenSymbol, boolean>>
>;
type _09e = Expect<Equal<RegistryResult<never>, Map<never, unknown>>>;

// 10. Preserve a constrained default or any richer valid candidate.
export type ConstrainedOptionResult<
  Candidate extends { mode: string } = { mode: "standard" },
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<ConstrainedOptionResult, { mode: "standard" } | undefined>
>;
type _10b = Expect<
  Equal<ConstrainedOptionResult<{ mode: string }>, { mode: string } | undefined>
>;
type _10c = Expect<
  Equal<
    ConstrainedOptionResult<{ mode: "custom"; retries: number }>,
    { mode: "custom"; retries: number } | undefined
  >
>;
type _10d = Expect<
  Equal<
    ConstrainedOptionResult<{ readonly mode: "safe"; readonly nested: { ok: true } }>,
    { readonly mode: "safe"; readonly nested: { ok: true } } | undefined
  >
>;

// 11. Select the mode supplied by the constrained default or candidate.
export type ConstrainedMode<
  Candidate extends { mode: string } = { mode: "standard" },
> = TODO; // TODO(koan)

type _11a = Expect<Equal<ConstrainedMode, "standard">>;
type _11b = Expect<Equal<ConstrainedMode<{ mode: string }>, string>>;
type _11c = Expect<Equal<ConstrainedMode<{ mode: "custom"; extra: 1 }>, "custom">>;
type _11d = Expect<
  Equal<
    ConstrainedMode<{ mode: "left" } | { mode: "right"; nested: true }>,
    "left" | "right"
  >
>;

// 12. Keep a valid candidate and reject an invalid one instead of retrying a default.
export type ConstraintOutcome<
  Candidate = { mode: "standard" },
> = TODO; // TODO(koan)

type _12a = Expect<Equal<ConstraintOutcome, { mode: "standard" }>>;
type _12b = Expect<
  Equal<ConstraintOutcome<{ mode: "custom"; extra: boolean }>, { mode: "custom"; extra: boolean }>
>;
type _12c = Expect<Equal<ConstraintOutcome<{ mode: number }>, never>>;
type _12d = Expect<Equal<ConstraintOutcome<never>, never>>;
type _12e = Expect<
  Equal<
    ConstraintOutcome<{ mode: "ok" } | { mode: 0 }>,
    { mode: "ok" }
  >
>; // The union distributes; an invalid member never becomes the default.

// ─── Reusable generic signatures ────────────────────────────────────────────

// 13. Construct the optional-value signature with its omission default.
export type OptionalValueSignature =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    OptionalValueSignature,
    <Candidate = string>(value?: Candidate) => Candidate | undefined
  >
>;
type _13b = Expect<Equal<Parameters<OptionalValueSignature>, [value?: unknown]>>;
type _13c = Expect<Equal<ReturnType<OptionalValueSignature>, unknown>>;

// 14. Construct the two-parameter signature with a dependent trailing default.
export type DefaultPairSignature =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    DefaultPairSignature,
    <First = string, Second = First>(
      first?: First,
      second?: Second,
    ) => [First | undefined, Second | undefined]
  >
>;
type _14b = Expect<
  Equal<Parameters<DefaultPairSignature>, [first?: unknown, second?: unknown]>
>;
type _14c = Expect<
  Equal<ReturnType<DefaultPairSignature>, [unknown, unknown]>
>;

// 15. Construct the rest signature whose empty-call element defaults to `never`.
export type CollectDefaultSignature =
  TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    CollectDefaultSignature,
    <Element = never>(...values: Element[]) => Element[]
  >
>;
type _15b = Expect<Equal<ReturnType<CollectDefaultSignature>, unknown[]>>;

// 16. Construct the registry factory with two rightmost optional type slots.
export type RegistryFactorySignature =
  TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    RegistryFactorySignature,
    <Key extends PropertyKey = string, Value = unknown>() => Map<Key, Value>
  >
>;
type _16b = Expect<Equal<Parameters<RegistryFactorySignature>, []>>;
type _16c = Expect<
  Equal<ReturnType<RegistryFactorySignature>, Map<PropertyKey, unknown>>
>;

// 17. Construct the constrained optional-value signature and legal default.
export type ConstrainedOptionSignature =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    ConstrainedOptionSignature,
    <Candidate extends { mode: string } = { mode: "standard" }>(
      value?: Candidate,
    ) => Candidate | undefined
  >
>;
type _17b = Expect<
  Equal<
    Parameters<ConstrainedOptionSignature>,
    [value?: { mode: string } | undefined]
  >
>;
type _17c = Expect<
  Equal<ReturnType<ConstrainedOptionSignature>, { mode: string } | undefined>
>;

// ─── Defaulted aliases ──────────────────────────────────────────────────────

// 18. Build a container whose omitted value type is the safe top type.
export type DefaultContainer<Value = unknown> =
  TODO; // TODO(koan)

type _18a = Expect<Equal<DefaultContainer, { value: unknown }>>;
type _18b = Expect<Equal<DefaultContainer<number>, { value: number }>>;
type _18c = Expect<
  Equal<DefaultContainer<readonly [1, 2]>, { value: readonly [1, 2] }>
>;
type _18d = Expect<Equal<DefaultContainer<never>, { value: never }>>;

// 19. Build an alias whose right slot follows the final left selection.
export type DefaultPairAlias<Left = string, Right = Left> =
  TODO; // TODO(koan)

type _19a = Expect<Equal<DefaultPairAlias, [string, string]>>;
type _19b = Expect<Equal<DefaultPairAlias<number>, [number, number]>>;
type _19c = Expect<
  Equal<DefaultPairAlias<number, string>, [number, string]>
>;
type _19d = Expect<
  Equal<DefaultPairAlias<"a" | "b">, ["a" | "b", "a" | "b"]>
>;
type _19e = Expect<Equal<DefaultPairAlias<never>, [never, never]>>;

// 20. Build a constrained alias whose omitted key is `string`.
export type DefaultConstrainedMap<
  Key extends PropertyKey = string,
> = TODO; // TODO(koan)

type _20a = Expect<Equal<DefaultConstrainedMap, Map<string, unknown>>>;
type _20b = Expect<Equal<DefaultConstrainedMap<"id">, Map<"id", unknown>>>;
type _20c = Expect<Equal<DefaultConstrainedMap<number>, Map<number, unknown>>>;
type _20d = Expect<
  Equal<DefaultConstrainedMap<typeof givenSymbol>, Map<typeof givenSymbol, unknown>>
>;
type _20e = Expect<Equal<DefaultConstrainedMap<never>, Map<never, unknown>>>;
