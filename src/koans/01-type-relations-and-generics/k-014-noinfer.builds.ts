import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-014: NoInfer — constructions
 * =============================================================================
 *
 * These constructions assign authority to selected generic positions while
 * keeping blocked positions available for checking. They cover loose versus
 * checked defaults, primary and callback ownership, state domains, missing
 * inference sources, defaults and constraints, transparent nested uses, and
 * validation of unions and structural values. Replace each `TODO` with a type
 * that satisfies the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

declare const givenAny: any;
const givenBroadChoices: string[] = ["a", "b"];
const givenFiniteChoices: Array<"open" | "closed"> = ["open", "closed"];
const givenRichFallback = { id: 2, extra: true };
const givenRichOutputFallback = { value: 0, extra: true };
declare const givenUnionKey: "id" | "active";

// ─── Competing and authoritative inference sites ────────────────────────────

// 1. Construct a loose default signature where both arguments infer the domain.
export type LooseChoiceSignature =
  TODO; // TODO(koan)

declare const givenLooseChoice: LooseChoiceSignature;
const looseMember = givenLooseChoice(["a"] as const, "a");
const looseWidened = givenLooseChoice(["a"] as const, "b");
const looseTraffic = givenLooseChoice(
  ["red", "yellow", "green"] as const,
  "blue",
);
const looseBroad = givenLooseChoice(givenBroadChoices, "outside");
type _01a = Expect<
  Equal<
    LooseChoiceSignature,
    <Choice extends string>(
      choices: readonly Choice[],
      fallback: Choice,
    ) => Choice
  >
>;
type _01b = Expect<Equal<typeof looseMember, "a">>;
type _01c = Expect<Equal<typeof looseWidened, "a" | "b">>;
type _01d = Expect<
  Equal<typeof looseTraffic, "red" | "yellow" | "green" | "blue">
>;
type _01e = Expect<Equal<typeof looseBroad, string>>;

// 2. Construct a checked default signature whose collection alone owns Choice.
export type CheckedChoiceSignature =
  TODO; // TODO(koan)

declare const givenCheckedChoice: CheckedChoiceSignature;
const checkedOne = givenCheckedChoice(["a"] as const, "a");
const checkedPair = givenCheckedChoice(["a", "b"] as const, "b");
const checkedTraffic = givenCheckedChoice(
  ["red", "yellow", "green"] as const,
  "green",
);
const checkedBroad = givenCheckedChoice(givenBroadChoices, "outside");
type _02a = Expect<
  Equal<
    CheckedChoiceSignature,
    <Choice extends string>(
      choices: readonly Choice[],
      fallback: NoInfer<Choice>,
    ) => Choice
  >
>;
type _02b = Expect<Equal<typeof checkedOne, "a">>;
type _02c = Expect<Equal<typeof checkedPair, "a" | "b">>;
type _02d = Expect<
  Equal<typeof checkedTraffic, "red" | "yellow" | "green">
>;
type _02e = Expect<Equal<typeof checkedBroad, string>>;

// 3. Construct a primary-owned fallback signature.
export type PreferPrimarySignature =
  TODO; // TODO(koan)

declare const givenPreferPrimary: PreferPrimarySignature;
const primaryNumber = givenPreferPrimary(1 as number, 2);
const primaryString = givenPreferPrimary("a" as string, "b");
const primaryObject = givenPreferPrimary({ id: 1 }, givenRichFallback);
const primaryTuple = givenPreferPrimary(
  [1, 2] as const,
  [1, 2] as const,
);
type _03a = Expect<
  Equal<
    PreferPrimarySignature,
    <Value>(primary: Value, fallback: NoInfer<Value>) => Value
  >
>;
type _03b = Expect<Equal<typeof primaryNumber, number>>;
type _03c = Expect<Equal<typeof primaryString, string>>;
type _03d = Expect<Equal<typeof primaryObject, { id: number }>>;
type _03e = Expect<Equal<typeof primaryTuple, readonly [1, 2]>>;

// 4. Let the callback own Output while its fallback only validates.
export type MapWithFallbackSignature =
  TODO; // TODO(koan)

declare const givenMapWithFallback: MapWithFallbackSignature;
const mappedNumber = givenMapWithFallback("42", Number, 0);
const mappedString = givenMapWithFallback(42, String, "unknown");
const mappedObject = givenMapWithFallback(
  1,
  (value: number) => ({ value }),
  givenRichOutputFallback,
);
const mappedLiteral = givenMapWithFallback(
  1,
  () => "ok" as const,
  "ok",
);
type _04a = Expect<
  Equal<
    MapWithFallbackSignature,
    <Input, Output>(
      value: Input,
      map: (value: Input) => Output,
      fallback: NoInfer<Output>,
    ) => Output
  >
>;
type _04b = Expect<Equal<typeof mappedNumber, number>>;
type _04c = Expect<Equal<typeof mappedString, string>>;
type _04d = Expect<
  Equal<typeof mappedObject, { value: number }>
>;
type _04e = Expect<Equal<typeof mappedLiteral, "ok">>;

// 5. Infer a machine domain from states and only check its initial member.
export type StateMachineSignature =
  TODO; // TODO(koan)

declare const givenStateMachine: StateMachineSignature;
const idleMachine = givenStateMachine({
  states: ["idle"] as const,
  initial: "idle",
});
const trafficMachine = givenStateMachine({
  states: ["red", "yellow", "green"] as const,
  initial: "green",
});
const finiteMachine = givenStateMachine({
  states: givenFiniteChoices,
  initial: "open",
});
const broadMachine = givenStateMachine({
  states: givenBroadChoices,
  initial: "outside",
});
type _05a = Expect<
  Equal<
    StateMachineSignature,
    <State extends string>(config: {
      states: readonly State[];
      initial: NoInfer<State>;
    }) => State
  >
>;
type _05b = Expect<Equal<typeof idleMachine, "idle">>;
type _05c = Expect<
  Equal<typeof trafficMachine, "red" | "yellow" | "green">
>;
type _05d = Expect<Equal<typeof finiteMachine, "open" | "closed">>;
type _05e = Expect<Equal<typeof broadMachine, string>>;

// ─── When every candidate site is blocked ───────────────────────────────────

// 6. Construct a signature whose only occurrence of Value is blocked.
export type OnlyBlockedSignature =
  TODO; // TODO(koan)

declare const givenOnlyBlocked: OnlyBlockedSignature;
const blockedString = givenOnlyBlocked("a");
const blockedNumber = givenOnlyBlocked(1);
const blockedObject = givenOnlyBlocked({ id: 1 });
const blockedAny = givenOnlyBlocked(givenAny);
type _06a = Expect<
  Equal<
    OnlyBlockedSignature,
    <Value>(value: NoInfer<Value>) => Value
  >
>;
type _06b = Expect<Equal<GivenKind<typeof blockedString>, "unknown">>;
type _06c = Expect<Equal<GivenKind<typeof blockedNumber>, "unknown">>;
type _06d = Expect<Equal<GivenKind<typeof blockedObject>, "unknown">>;
type _06e = Expect<Equal<GivenKind<typeof blockedAny>, "unknown">>;

// 7. Supply a declared default when the optional input cannot infer Value.
export type BlockedDefaultSignature =
  TODO; // TODO(koan)

declare const givenBlockedDefault: BlockedDefaultSignature;
const blockedDefaultOmitted = givenBlockedDefault();
const blockedDefaultString = givenBlockedDefault("a");
const blockedDefaultUndefined = givenBlockedDefault(undefined);
const blockedDefaultAny = givenBlockedDefault(givenAny);
type _07a = Expect<
  Equal<
    BlockedDefaultSignature,
    <Value = string>(value?: NoInfer<Value>) => Value | undefined
  >
>;
type _07b = Expect<
  Equal<typeof blockedDefaultOmitted, string | undefined>
>;
type _07c = Expect<
  Equal<typeof blockedDefaultString, string | undefined>
>;
type _07d = Expect<
  Equal<typeof blockedDefaultUndefined, string | undefined>
>;
type _07e = Expect<
  Equal<typeof blockedDefaultAny, string | undefined>
>;

// 8. Fall back to the constraint when the only candidate site is blocked.
export type ConstrainedBlockedSignature =
  TODO; // TODO(koan)

declare const givenConstrainedBlocked: ConstrainedBlockedSignature;
const constrainedLiteral = givenConstrainedBlocked("a");
const constrainedBroad = givenConstrainedBlocked(
  givenBroadChoices[0]!,
);
const constrainedAny = givenConstrainedBlocked(givenAny);
type _08a = Expect<
  Equal<
    ConstrainedBlockedSignature,
    <Value extends string>(value: NoInfer<Value>) => Value
  >
>;
type _08b = Expect<Equal<typeof constrainedLiteral, string>>;
type _08c = Expect<Equal<typeof constrainedBroad, string>>;
type _08d = Expect<Equal<typeof constrainedAny, string>>;

// ─── Transparency and validation ────────────────────────────────────────────

// 9. Reproduce a selected type after passing through NoInfer.
export type TransparentNoInfer<Value> =
  TODO; // TODO(koan)

type _09a = Expect<Equal<TransparentNoInfer<string>, string>>;
type _09b = Expect<
  Equal<TransparentNoInfer<"a" | "b">, "a" | "b">
>;
type _09c = Expect<
  Equal<TransparentNoInfer<{ id: number }>, { id: number }>
>;
type _09d = Expect<Equal<TransparentNoInfer<never>, never>>;
type _09e = Expect<Equal<TransparentNoInfer<unknown>, unknown>>;

// 10. Classify a blocked special type without allowing `any` to escape.
export type BlockedKind<Value> =
  TODO; // TODO(koan)

type _10a = Expect<Equal<BlockedKind<string>, "ordinary">>;
type _10b = Expect<Equal<BlockedKind<never>, "never">>;
type _10c = Expect<Equal<BlockedKind<unknown>, "unknown">>;
type _10d = Expect<Equal<BlockedKind<any>, "any">>;

// 11. Keep a fallback only when the whole candidate is assignable to authority.
export type ValidateFallback<Authority, Candidate> =
  TODO; // TODO(koan)

type _11a = Expect<Equal<ValidateFallback<string, "a">, "a">>;
type _11b = Expect<Equal<ValidateFallback<string, number>, never>>;
type _11c = Expect<
  Equal<ValidateFallback<string, "a" | 1>, never>
>; // Tuple wrapping makes the whole union validate together.
type _11d = Expect<
  Equal<
    ValidateFallback<{ id: number }, { id: 1; extra: true }>,
    { id: 1; extra: true }
  >
>;
type _11e = Expect<Equal<ValidateFallback<unknown, string>, string>>;

// 12. Validate each union member independently against the authority.
export type ValidateEachFallback<Authority, Candidate> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<ValidateEachFallback<string, "a" | 1>, "a">
>;
type _12b = Expect<
  Equal<ValidateEachFallback<number, 1 | 2 | "x">, 1 | 2>
>;
type _12c = Expect<
  Equal<
    ValidateEachFallback<{ id: number }, { id: 1 } | { name: string }>,
    { id: 1 }
  >
>;
type _12d = Expect<Equal<ValidateEachFallback<string, never>, never>>;

// ─── Multiple and nested authority sources ──────────────────────────────────

// 13. Infer from two const primary sites while blocking only the fallback.
export type AuthoritativePairSignature =
  TODO; // TODO(koan)

declare const givenAuthoritativePair: AuthoritativePairSignature;
const stringAuthority = givenAuthoritativePair("a", "b", "a");
const numberAuthority = givenAuthoritativePair(1, 2, 1);
const booleanAuthority = givenAuthoritativePair(true, false, true);
const broadAuthority = givenAuthoritativePair(
  givenBroadChoices[0]!,
  "b",
  "fallback",
);
type _13a = Expect<
  Equal<
    AuthoritativePairSignature,
    <const Value>(
      left: Value,
      right: Value,
      fallback: NoInfer<Value>,
    ) => Value
  >
>;
type _13b = Expect<Equal<typeof stringAuthority, "a" | "b">>;
type _13c = Expect<Equal<typeof numberAuthority, 1 | 2>>;
type _13d = Expect<Equal<typeof booleanAuthority, true | false>>;
type _13e = Expect<Equal<typeof broadAuthority, string>>;

// 14. Infer authority through a readonly collection's element position.
export type ArrayAuthoritativeSignature =
  TODO; // TODO(koan)

declare const givenArrayAuthoritative: ArrayAuthoritativeSignature;
const numberElement = givenArrayAuthoritative([1, 2], 0);
const literalElement = givenArrayAuthoritative(
  ["a", "b"] as const,
  "a",
);
const broadElement = givenArrayAuthoritative(
  givenBroadChoices,
  "outside",
);
const finiteElement = givenArrayAuthoritative(
  givenFiniteChoices,
  "closed",
);
type _14a = Expect<
  Equal<
    ArrayAuthoritativeSignature,
    <Value>(
      values: readonly Value[],
      fallback: NoInfer<Value>,
    ) => Value
  >
>;
type _14b = Expect<Equal<typeof numberElement, number>>;
type _14c = Expect<Equal<typeof literalElement, "a" | "b">>;
type _14d = Expect<Equal<typeof broadElement, string>>;
type _14e = Expect<Equal<typeof finiteElement, "open" | "closed">>;

// 15. Infer a property through source and key, then check its fallback.
export type KeyFallbackSignature =
  TODO; // TODO(koan)

declare const givenKeyFallback: KeyFallbackSignature;
const idFallback = givenKeyFallback({ id: 1 }, "id", 0);
const nameFallback = givenKeyFallback(
  { id: 1, name: "Ada" },
  "name",
  "unknown",
);
const unionFallback = givenKeyFallback(
  { id: 1, active: true },
  givenUnionKey,
  0,
);
const optionalSource: { note?: string } = {};
const optionalFallback = givenKeyFallback(
  optionalSource,
  "note",
  undefined,
);
type _15a = Expect<
  Equal<
    KeyFallbackSignature,
    <Source, Key extends keyof Source>(
      source: Source,
      key: Key,
      fallback: NoInfer<Source[Key]>,
    ) => Source[Key]
  >
>;
type _15b = Expect<Equal<typeof idFallback, number>>;
type _15c = Expect<Equal<typeof nameFallback, string>>;
type _15d = Expect<
  Equal<typeof unionFallback, number | boolean>
>;
type _15e = Expect<
  Equal<typeof optionalFallback, string | undefined>
>;

// 16. Infer a model from primary and check a partial patch afterward.
export type PrimaryPatchSignature =
  TODO; // TODO(koan)

declare const givenPrimaryPatch: PrimaryPatchSignature;
const patchedUser = givenPrimaryPatch(
  { id: 1, name: "Ada" },
  { name: "Grace" },
);
const patchedNested = givenPrimaryPatch(
  { config: { mode: "strict" }, active: true },
  { active: false },
);
const patchedReadonly = givenPrimaryPatch(
  { fixed: 1 } as const,
  { fixed: 1 },
);
const patchedOptional = givenPrimaryPatch(
  {} as { note?: string; count: number },
  { note: "ready" },
);
type _16a = Expect<
  Equal<
    PrimaryPatchSignature,
    <Model>(
      primary: Model,
      patch: NoInfer<Partial<Model>>,
    ) => Model
  >
>;
type _16b = Expect<
  Equal<typeof patchedUser, { id: number; name: string }>
>;
type _16c = Expect<
  Equal<
    typeof patchedNested,
    { config: { mode: string }; active: boolean }
  >
>;
type _16d = Expect<
  Equal<typeof patchedReadonly, { readonly fixed: 1 }>
>;
type _16e = Expect<
  Equal<typeof patchedOptional, { note?: string; count: number }>
>;

// ─── Reusable nested positions ──────────────────────────────────────────────

// 17. Build a state configuration with a validation-only initial field.
export type StateConfig<State extends string> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    StateConfig<"idle" | "running">,
    {
      states: readonly ("idle" | "running")[];
      initial: "idle" | "running";
    }
  >
>;
type _17b = Expect<
  Equal<StateConfig<string>, { states: readonly string[]; initial: string }>
>;
type _17c = Expect<
  Equal<StateConfig<never>, { states: readonly never[]; initial: never }>
>;
type _17d = Expect<
  Equal<
    StateConfig<"a">,
    { states: readonly "a"[]; initial: "a" }
  >
>;

// 18. Build a mapper configuration whose fallback cannot own Output.
export type OutputConfig<Input, Output> =
  TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    OutputConfig<string, number>,
    { map: (value: string) => number; fallback: number }
  >
>;
type _18b = Expect<
  Equal<
    OutputConfig<number, { value: number }>,
    {
      map: (value: number) => { value: number };
      fallback: { value: number };
    }
  >
>;
type _18c = Expect<
  Equal<
    OutputConfig<readonly [1, 2], "ok" | "error">,
    {
      map: (value: readonly [1, 2]) => "ok" | "error";
      fallback: "ok" | "error";
    }
  >
>;
type _18d = Expect<
  Equal<
    OutputConfig<unknown, never>,
    { map: (value: unknown) => never; fallback: never }
  >
>;

// 19. Pair an explicitly selected public type with its blocked checking view.
export type ExplicitSelection<Selected> =
  TODO; // TODO(koan)

type _19a = Expect<
  Equal<ExplicitSelection<string>, [selected: string, checked: string]>
>;
type _19b = Expect<
  Equal<
    ExplicitSelection<"a" | "b">,
    [selected: "a" | "b", checked: "a" | "b"]
  >
>;
type _19c = Expect<
  Equal<
    ExplicitSelection<{ id: number }>,
    [selected: { id: number }, checked: { id: number }]
  >
>;
type _19d = Expect<
  Equal<ExplicitSelection<unknown>, [selected: unknown, checked: unknown]>
>;

// 20. Build a factory whose blocked input leaves its result candidate unknown.
export type BlockedFactorySignature =
  TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    BlockedFactorySignature,
    <Value>(fallback: NoInfer<Value>) => () => Value
  >
>;
type _20b = Expect<
  Equal<ReturnType<BlockedFactorySignature>, () => unknown>
>;
