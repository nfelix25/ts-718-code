import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 229 - NATIVE PARITY AND PERFORMANCE CAPSTONE
 * ===================================================
 *
 * A migration finishes with two independent claims: parity and performance. Parity
 * compares clean diagnostics, declarations, and runtime tests from a fixed source
 * revision. Performance compares repeated measurements on the same machine and
 * configuration, including time and peak memory.
 * 
 * I never infer correctness from speed or speed from architecture. I retain the
 * TypeScript 6 escape hatch only for known API/tooling needs, record any intentional
 * differences, and treat the future 7.1 API as a separate adoption decision.
 *
 * Official source:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */

export const rules = {
  "freeze-inputs": { scenario: "freeze-inputs", outcome: "baseline", detail: "pin source config dependencies and machine context" },
  "ts6-stable": { scenario: "ts6-stable", outcome: "reference", detail: "run clean 6.0 with stable ordering and no suppression" },
  "ts7-native": { scenario: "ts7-native", outcome: "candidate", detail: "run native checks and tests on the same revision" },
  "diagnostics-declarations": { scenario: "diagnostics-declarations", outcome: "parity", detail: "classify semantic versus textual differences" },
  "time-memory": { scenario: "time-memory", outcome: "measure", detail: "repeat wall time and peak memory observations" },
  "tooling-gaps": { scenario: "tooling-gaps", outcome: "document", detail: "retain TypeScript 6 only where capability requires it" },
} as const;
export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];
export const scenarioList = ["freeze-inputs", "ts6-stable", "ts7-native", "diagnostics-declarations", "time-memory", "tooling-gaps"] as const;

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

export interface CompilerMeasurement {
  compiler: "typescript-6" | "typescript-7";
  milliseconds: number;
  memoryMiB: number;
}
export function speedup(reference: CompilerMeasurement, candidate: CompilerMeasurement): number {
  return reference.milliseconds / candidate.milliseconds;
}
export interface ParityResult {
  diagnosticsMatch: boolean;
  declarationsEquivalent: boolean;
  runtimeGreen: boolean;
}
export function parityReady(result: ParityResult): boolean {
  return result.diagnosticsMatch && result.declarationsEquivalent && result.runtimeGreen;
}

// Part 1: identify the native/compiler-specific vocabulary.
type _01 = Expect<Equal<keyof CompilerMeasurement, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<typeof speedup>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof speedup>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof ParityResult, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof parityReady>, TODO>>; // TODO(koan) @koan-error

// Part 2: read the discriminated rule matrix.
type _p2_01 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_05 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error

// Part 3: calculate representative outcomes.
type _p3_01 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"freeze-inputs">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"ts6-stable">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"ts7-native">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"diagnostics-declarations">, TODO>>; // TODO(koan) @koan-error

// Part 4: reflect the literal-preserving runtime boundary.
type _p4_01 = Expect<Equal<OutcomeFor<"time-memory">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"tooling-gaps">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
