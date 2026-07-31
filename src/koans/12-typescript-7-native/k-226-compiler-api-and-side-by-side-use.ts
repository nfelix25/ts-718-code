import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 226 - COMPILER API AND SIDE-BY-SIDE USE
 * ==============================================
 *
 * TypeScript 7.0 ships the native `tsc` and LSP server but no stable programmatic
 * compiler API. Tools that create Programs, inspect ASTs, or embed the language
 * service must retain TypeScript 6 through `@typescript/typescript6` or an npm alias.
 * 
 * I select a compiler per capability: native CLI for project checks, TypeScript 6 for
 * legacy API consumers, and both in CI while migrating. The planned 7.1 API is a
 * future contract, so I do not code against assumptions about its shape.
 *
 * Official source:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */

export const rules = {
  "native-tsc": { scenario: "native-tsc", outcome: "typescript-7", detail: "use the native executable for fast project checks" },
  "tsc6": { scenario: "tsc6", outcome: "typescript-6", detail: "the compatibility package exposes a nonconflicting CLI" },
  "legacy-api": { scenario: "legacy-api", outcome: "typescript-6", detail: "programmatic consumers need the exported 6.0 API" },
  "lsp": { scenario: "lsp", outcome: "typescript-7", detail: "editors can use the native standard-protocol server" },
  "embedded-tool": { scenario: "embedded-tool", outcome: "evaluate", detail: "framework tooling may depend on old internals" },
  "future-api": { scenario: "future-api", outcome: "typescript-7.1", detail: "wait for the documented new API contract" },
} as const;
export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];
export const scenarioList = ["native-tsc", "tsc6", "legacy-api", "lsp", "embedded-tool", "future-api"] as const;

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

export type ToolCapability = "cli" | "lsp" | "legacy-api" | "embedded-language";
export type CompilerChoice = "typescript-7" | "typescript-6" | "evaluate";
export function compilerFor(capability: ToolCapability): CompilerChoice {
  if (capability === "legacy-api") return "typescript-6";
  if (capability === "embedded-language") return "evaluate";
  return "typescript-7";
}

// Part 1: identify the native/compiler-specific vocabulary.
type _01 = Expect<Equal<ToolCapability, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<CompilerChoice, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof compilerFor>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof compilerFor>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error

// Part 2: read the discriminated rule matrix.
type _p2_01 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p2_05 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error

// Part 3: calculate representative outcomes.
type _p3_01 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<OutcomeFor<"native-tsc">, TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"tsc6">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"legacy-api">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"lsp">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"embedded-tool">, TODO>>; // TODO(koan) @koan-error

// Part 4: reflect the literal-preserving runtime boundary.
type _p4_01 = Expect<Equal<OutcomeFor<"future-api">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
