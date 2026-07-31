import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 220 - TYPESCRIPT 6 MIGRATION CAPSTONE
 * ============================================
 *
 * A TypeScript 6 migration is an evidence-gathering sequence. I pin explicit modern
 * defaults, enumerate ambient type packages, set rootDir, replace deprecated module
 * choices, run the stable-ordering comparison, and keep 6.0 available as the API
 * bridge while validating the native compiler.
 * 
 * The capstone models findings as actions rather than a single pass/fail bit. A
 * suppression such as `ignoreDeprecations: "6.0"` is temporary inventory control;
 * every suppressed option must still be removed before TypeScript 7.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#preparing-for-typescript-70
 */

export const rules = {
  "pin-defaults": { scenario: "pin-defaults", outcome: "configure", detail: "record strict module target and side-effect policy" },
  "enumerate-types": { scenario: "enumerate-types", outcome: "configure", detail: "list required ambient @types packages" },
  "set-root-dir": { scenario: "set-root-dir", outcome: "configure", detail: "make output structure intentional" },
  "remove-deprecations": { scenario: "remove-deprecations", outcome: "rewrite", detail: "replace options and legacy syntax" },
  "compare-ordering": { scenario: "compare-ordering", outcome: "diagnose", detail: "run stableTypeOrdering as a temporary probe" },
  "dual-compiler": { scenario: "dual-compiler", outcome: "verify", detail: "compare 6.0 and 7.0 diagnostics and declarations" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["pin-defaults", "enumerate-types", "set-root-dir", "remove-deprecations", "compare-ordering", "dual-compiler"] as const;

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

export type MigrationAction = "configure" | "rewrite" | "diagnose" | "verify";
export interface MigrationFinding {
  area: Scenario;
  action: MigrationAction;
  blocking: boolean;
}
export function blockingFindings(findings: readonly MigrationFinding[]): MigrationFinding[] {
  return findings.filter(finding => finding.blocking);
}
export function migrationReady(findings: readonly MigrationFinding[]): boolean {
  return blockingFindings(findings).length === 0;
}

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<MigrationAction, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof MigrationFinding, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof blockingFindings>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof blockingFindings>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof migrationReady>, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"pin-defaults">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"enumerate-types">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"set-root-dir">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"remove-deprecations">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"compare-ordering">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<OutcomeFor<"dual-compiler">, TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
