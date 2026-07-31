import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 211 - MODERN COMPILER DEFAULTS
 * =====================================
 *
 * TypeScript 6.0 changes the zero-configuration starting point. I read defaults as
 * assumptions about a modern project, not as a substitute for checked-in config:
 * strict checking, ES modules, a current-year target, checked side-effect imports,
 * no automatic lib replacement, and no ambient `@types` enumeration.
 * 
 * A durable project spells out deployment-sensitive choices. Floating defaults are
 * convenient for experiments but can change meaning when the compiler changes.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#simple-default-changes
 */

export const rules = {
  "strict": { scenario: "strict", outcome: "true", detail: "strict checking is the default" },
  "module": { scenario: "module", outcome: "esnext", detail: "module emit defaults to ESNext" },
  "target": { scenario: "target", outcome: "es2025", detail: "target floats at the current-year edition" },
  "noUncheckedSideEffectImports": { scenario: "noUncheckedSideEffectImports", outcome: "true", detail: "side-effect imports are checked" },
  "libReplacement": { scenario: "libReplacement", outcome: "false", detail: "standard-lib package probing is disabled" },
  "types": { scenario: "types", outcome: "empty", detail: "ambient @types packages are opt-in" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["strict", "module", "target", "noUncheckedSideEffectImports", "libReplacement", "types"] as const;

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

export interface TypeScript6Defaults {
  strict: true;
  module: "esnext";
  target: "es2025";
  noUncheckedSideEffectImports: true;
  libReplacement: false;
  types: readonly [];
  rootDir: ".";
}
export const typescript6Defaults: TypeScript6Defaults = {
  strict: true,
  module: "esnext",
  target: "es2025",
  noUncheckedSideEffectImports: true,
  libReplacement: false,
  types: [],
  rootDir: ".",
};

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<keyof TypeScript6Defaults, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<TypeScript6Defaults["target"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<TypeScript6Defaults["types"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<typeof typescript6Defaults, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<typeof typescript6Defaults.types["length"], TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"strict">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"module">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"target">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"noUncheckedSideEffectImports">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"libReplacement">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<OutcomeFor<"types">, TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
