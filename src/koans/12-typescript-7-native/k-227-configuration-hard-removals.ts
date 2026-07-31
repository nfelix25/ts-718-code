import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 227 - CONFIGURATION HARD REMOVALS
 * ========================================
 *
 * TypeScript 6 deprecations become TypeScript 7 hard errors or no-op behavior.
 * `ignoreDeprecations` cannot restore ES5 emit, legacy resolvers/modules, baseUrl
 * lookup roots, false interop/strict settings, old namespace syntax, or import
 * assertions.
 * 
 * I migrate the host contract rather than search for a replacement spelling: choose
 * ES2015+, NodeNext/bundler, ESNext/preserve, root-relative paths, always-on interop,
 * `namespace`, and import attributes.
 *
 * Official source:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */

export const rules = {
  "target-es5": { scenario: "target-es5", outcome: "es2015-plus", detail: "use a newer target or an external downlevel transform" },
  "moduleResolution-node10-classic": { scenario: "moduleResolution-node10-classic", outcome: "nodenext-or-bundler", detail: "match the actual host" },
  "module-amd-umd-system-none": { scenario: "module-amd-umd-system-none", outcome: "esnext-or-preserve", detail: "delegate bundling to bundlers" },
  "baseUrl": { scenario: "baseUrl", outcome: "root-relative-paths", detail: "paths resolve from the project root" },
  "interop-false": { scenario: "interop-false", outcome: "always-enabled", detail: "synthetic/default interop cannot be disabled" },
  "legacy-syntax": { scenario: "legacy-syntax", outcome: "modern-syntax", detail: "use namespace and import attributes with with" },
} as const;
export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];
export const scenarioList = ["target-es5", "moduleResolution-node10-classic", "module-amd-umd-system-none", "baseUrl", "interop-false", "legacy-syntax"] as const;

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

export type RemovedConfiguration =
  | "target:es5"
  | "moduleResolution:node10"
  | "moduleResolution:classic"
  | "module:amd"
  | "baseUrl"
  | "esModuleInterop:false";
export type ModernReplacement =
  | "target:es2015+"
  | "moduleResolution:nodenext"
  | "moduleResolution:bundler"
  | "module:esnext"
  | "root-relative-paths"
  | "interop:on";
export function migrationRequired(option: string): option is RemovedConfiguration {
  return new Set<string>(["target:es5", "moduleResolution:node10", "moduleResolution:classic", "module:amd", "baseUrl", "esModuleInterop:false"]).has(option);
}

// Part 1: identify the native/compiler-specific vocabulary.
type _01 = Expect<Equal<RemovedConfiguration, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ModernReplacement, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof migrationRequired>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof migrationRequired>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error

// Part 2: read the discriminated rule matrix.
type _p2_01 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p2_05 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error

// Part 3: calculate representative outcomes.
type _p3_01 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<OutcomeFor<"target-es5">, TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"moduleResolution-node10-classic">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"module-amd-umd-system-none">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"baseUrl">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"interop-false">, TODO>>; // TODO(koan) @koan-error

// Part 4: reflect the literal-preserving runtime boundary.
type _p4_01 = Expect<Equal<OutcomeFor<"legacy-syntax">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
