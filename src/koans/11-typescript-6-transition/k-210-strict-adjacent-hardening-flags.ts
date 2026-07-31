import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 210 - STRICT-ADJACENT HARDENING FLAGS
 * ============================================
 *
 * The strict bundle is a baseline, not the end of hardening. I opt into adjacent
 * flags when their stronger model matches the project: exact optional presence,
 * possibly-missing indexed reads, explicit overrides, index-signature access, and
 * fallthrough or unchecked switch behavior.
 * 
 * Read `HardeningEffect<K>` as a policy lookup. These flags deliberately remain
 * independent because they can uncover broad migrations or encode domain choices
 * that are not universally appropriate for every strict project.
 *
 * Official source:
 * - https://www.typescriptlang.org/tsconfig/
 */

export const rules = {
  "exactOptionalPropertyTypes": { scenario: "exactOptionalPropertyTypes", outcome: "presence", detail: "absence differs from present undefined" },
  "noUncheckedIndexedAccess": { scenario: "noUncheckedIndexedAccess", outcome: "indexed-undefined", detail: "open indexed reads include undefined" },
  "noPropertyAccessFromIndexSignature": { scenario: "noPropertyAccessFromIndexSignature", outcome: "index-syntax", detail: "index-signature keys use brackets" },
  "noImplicitOverride": { scenario: "noImplicitOverride", outcome: "override-intent", detail: "overrides state their relationship" },
  "noFallthroughCasesInSwitch": { scenario: "noFallthroughCasesInSwitch", outcome: "switch-flow", detail: "nonempty cases cannot fall through" },
  "noUncheckedSideEffectImports": { scenario: "noUncheckedSideEffectImports", outcome: "side-effect-resolution", detail: "binding-free imports must resolve" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["exactOptionalPropertyTypes", "noUncheckedIndexedAccess", "noPropertyAccessFromIndexSignature", "noImplicitOverride", "noFallthroughCasesInSwitch", "noUncheckedSideEffectImports"] as const;

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

export type HardeningFlag =
  | "exactOptionalPropertyTypes"
  | "noUncheckedIndexedAccess"
  | "noPropertyAccessFromIndexSignature"
  | "noImplicitOverride"
  | "noFallthroughCasesInSwitch"
  | "noUncheckedSideEffectImports";
export type StrictAloneEnables<Flag extends HardeningFlag> = false;
export function hardeningProfile(...flags: readonly HardeningFlag[]) {
  return new Set(flags);
}

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<HardeningFlag, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<StrictAloneEnables<"exactOptionalPropertyTypes">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof hardeningProfile>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<typeof hardeningProfile>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"exactOptionalPropertyTypes">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"noUncheckedIndexedAccess">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"noPropertyAccessFromIndexSignature">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"noImplicitOverride">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"noFallthroughCasesInSwitch">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"noUncheckedSideEffectImports">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
