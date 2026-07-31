import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 213 - STABLE TYPE ORDERING
 * =================================
 *
 * The old compiler often ordered unions and properties by internal allocation IDs.
 * Parallel native checking cannot depend on encounter order, so TypeScript 7 sorts
 * internal objects deterministically. TypeScript 6.0 exposes `stableTypeOrdering`
 * as a migration probe for the native ordering algorithm.
 * 
 * I compare semantic assignability separately from textual declaration order. The
 * flag may reveal inference that accidentally depended on order and may cost up to
 * roughly 25 percent, so it is a diagnostic bridge rather than a permanent feature.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#the---stabletypeordering-flag
 */

export const rules = {
  "legacy-order": { scenario: "legacy-order", outcome: "encounter-based", detail: "internal IDs can influence display order" },
  "stable-flag": { scenario: "stable-flag", outcome: "native-compatible", detail: "6.0 uses the 7.0 ordering strategy" },
  "native-order": { scenario: "native-order", outcome: "deterministic", detail: "parallel checkers agree on content ordering" },
  "declaration-diff": { scenario: "declaration-diff", outcome: "review-noise", detail: "equivalent unions can print differently" },
  "inference-diff": { scenario: "inference-diff", outcome: "explicit-annotation", detail: "order-sensitive inference needs evidence" },
  "long-term-config": { scenario: "long-term-config", outcome: "remove-probe", detail: "the bridge flag is not a permanent setting" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["legacy-order", "stable-flag", "native-order", "declaration-diff", "inference-diff", "long-term-config"] as const;

export function assess<S extends Scenario>(scenario: S): RuleFor<S> {
  return rules[scenario];
}

export function describeScenario(scenario: Scenario): string {
  const rule = rules[scenario];
  return `${rule.scenario}: ${rule.detail}`;
}

export function allOutcomes(): Outcome[] {
  return scenarioList.map(scenario => rules[scenario].outcome);
}

export type LegacyPrintedUnion = 100 | 500;
export type NativePrintedUnion = 500 | 100;
export type SemanticallyEqualOrdering =
  [LegacyPrintedUnion] extends [NativePrintedUnion]
    ? [NativePrintedUnion] extends [LegacyPrintedUnion] ? true : false
    : false;
export function explicitOrderingBoundary<T>(value: T): T {
  return value;
}

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<LegacyPrintedUnion, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<NativePrintedUnion, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<SemanticallyEqualOrdering, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof explicitOrderingBoundary<string>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"legacy-order">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"stable-flag">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"native-order">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"declaration-diff">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"inference-diff">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"long-term-config">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
