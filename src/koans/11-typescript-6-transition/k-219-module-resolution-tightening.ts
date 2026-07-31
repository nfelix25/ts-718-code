import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 219 - MODULE RESOLUTION TIGHTENING
 * =========================================
 *
 * TypeScript 6.0 turns legacy module assumptions into explicit migration work.
 * Node10/classic resolution, AMD/UMD/System module emit, baseUrl lookup roots, false
 * interop modes, outFile, and import assertions no longer describe the platform the
 * native compiler is designed to optimize.
 * 
 * I choose resolution from the actual host: NodeNext for Node, bundler for a bundler.
 * `paths` may stand without `baseUrl`, package `imports` handles internal aliases,
 * and import attributes use `with`. Suppressing 6.0 deprecations only buys migration
 * time; it does not create TypeScript 7 support.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#breaking-changes-and-deprecations-in-typescript-60
 */

export const rules = {
  "moduleResolution-node10": { scenario: "moduleResolution-node10", outcome: "migrate", detail: "choose nodenext or bundler" },
  "moduleResolution-classic": { scenario: "moduleResolution-classic", outcome: "migrate", detail: "replace pre-Node lookup semantics" },
  "module-amd-umd-system": { scenario: "module-amd-umd-system", outcome: "migrate", detail: "use ESM/CommonJS plus a bundler" },
  "baseUrl": { scenario: "baseUrl", outcome: "remove-lookup-root", detail: "paths no longer need a base URL" },
  "import-assertions": { scenario: "import-assertions", outcome: "replace-with", detail: "use import attributes" },
  "outFile": { scenario: "outFile", outcome: "external-bundler", detail: "bundling belongs to dedicated tooling" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["moduleResolution-node10", "moduleResolution-classic", "module-amd-umd-system", "baseUrl", "import-assertions", "outFile"] as const;

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

export type ModernResolution = "nodenext" | "bundler";
export type ModernModuleEmit = "esnext" | "preserve" | "commonjs" | "node20" | "nodenext";
export function resolutionForHost(host: "node" | "bundler"): ModernResolution {
  return host === "node" ? "nodenext" : "bundler";
}
export type ImportAttributeSyntax = 'with { type: "json" }';

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<ModernResolution, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ModernModuleEmit, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof resolutionForHost>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<typeof resolutionForHost>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ImportAttributeSyntax, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"moduleResolution-node10">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"moduleResolution-classic">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"module-amd-umd-system">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"baseUrl">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"import-assertions">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<OutcomeFor<"outFile">, TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
