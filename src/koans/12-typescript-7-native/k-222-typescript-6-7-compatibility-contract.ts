import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 222 - TYPESCRIPT 6/7 COMPATIBILITY CONTRACT
 * ==================================================
 *
 * The practical compatibility baseline is precise: code clean under TypeScript 6
 * with stable type ordering enabled and without deprecation suppression should compile
 * identically under TypeScript 7. That is a migration contract, not a claim that every
 * diagnostic string, emitted ordering, JavaScript heuristic, or public API is identical.
 * 
 * I make deprecations visible before comparing. A 6.0 build hidden behind
 * `ignoreDeprecations` has not established native readiness.
 *
 * Official source:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */

export const rules = {
  "ts6-clean-stable": { scenario: "ts6-clean-stable", outcome: "candidate", detail: "stable ordering and no deprecations establish the baseline" },
  "ts6-ignore-deprecations": { scenario: "ts6-ignore-deprecations", outcome: "not-ready", detail: "suppression hides TypeScript 7 hard errors" },
  "ts6-type-error": { scenario: "ts6-type-error", outcome: "fix-first", detail: "parity comparison starts from a clean 6.0 program" },
  "ts7-clean": { scenario: "ts7-clean", outcome: "compatible", detail: "the native compiler accepts the migrated program" },
  "diagnostic-text": { scenario: "diagnostic-text", outcome: "compare-carefully", detail: "wording and locations may differ without semantic drift" },
  "compiler-api": { scenario: "compiler-api", outcome: "separate-contract", detail: "CLI parity does not promise the old programmatic API" },
} as const;
export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];
export const scenarioList = ["ts6-clean-stable", "ts6-ignore-deprecations", "ts6-type-error", "ts7-clean", "diagnostic-text", "compiler-api"] as const;

export function assess<S extends Scenario>(scenario: S): RuleFor<S> {
  return rules[scenario];
}
export function explain(scenario: Scenario): string {
  const rule = rules[scenario];
  return `${rule.scenario}: ${rule.detail}`;
}
export function outcomes(): Outcome[] {
  return scenarioList.map(scenario => rules[scenario].outcome);
}

export interface CompatibilityEvidence {
  ts6Clean: boolean;
  stableOrdering: boolean;
  ignoredDeprecations: boolean;
}
export function nativeCandidate(evidence: CompatibilityEvidence): boolean {
  return evidence.ts6Clean && evidence.stableOrdering && !evidence.ignoredDeprecations;
}
export type CompatibilitySurface = "typecheck" | "emit" | "diagnostics" | "api";

// Part 1: identify the native/compiler-specific vocabulary.
type _01 = Expect<Equal<keyof CompatibilityEvidence, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<typeof nativeCandidate>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof nativeCandidate>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<CompatibilitySurface, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error

// Part 2: read the discriminated rule matrix.
type _p2_01 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p2_05 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error

// Part 3: calculate representative outcomes.
type _p3_01 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<OutcomeFor<"ts6-clean-stable">, TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"ts6-ignore-deprecations">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"ts6-type-error">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"ts7-clean">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"diagnostic-text">, TODO>>; // TODO(koan) @koan-error

// Part 4: reflect the literal-preserving runtime boundary.
type _p4_01 = Expect<Equal<OutcomeFor<"compiler-api">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
