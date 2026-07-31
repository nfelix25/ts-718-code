import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 225 - LSP AND EDITOR ARCHITECTURE
 * ========================================
 *
 * The native language service speaks the standard Language Server Protocol instead
 * of centering the custom TSServer protocol. Its multithreaded server can serve
 * simultaneous completion, navigation, hover, diagnostics, and refactoring requests.
 * 
 * Protocol compatibility and TypeScript plugin compatibility are different. Editors
 * with LSP support can integrate the server, while embedded-language tools that need
 * the old programmatic API may still require TypeScript 6 until the new API arrives.
 *
 * Official source:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */

export const rules = {
  "transport": { scenario: "transport", outcome: "lsp", detail: "editors communicate through a standard protocol" },
  "requests": { scenario: "requests", outcome: "concurrent", detail: "multiple language operations can use native threads" },
  "diagnostics": { scenario: "diagnostics", outcome: "project-aware", detail: "the server maintains TypeScript project context" },
  "editor-features": { scenario: "editor-features", outcome: "broad", detail: "completion navigation hovers and refactors are present" },
  "tsserver-plugin": { scenario: "tsserver-plugin", outcome: "not-equivalent", detail: "legacy plugin hooks do not follow from LSP support" },
  "embedded-language": { scenario: "embedded-language", outcome: "api-blocked", detail: "some frameworks still depend on TypeScript 6 internals" },
} as const;
export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];
export const scenarioList = ["transport", "requests", "diagnostics", "editor-features", "tsserver-plugin", "embedded-language"] as const;

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

export type LspMethod =
  | "textDocument/completion"
  | "textDocument/hover"
  | "textDocument/definition"
  | "textDocument/rename";
export interface LspRequest<Params = unknown> {
  id: number;
  method: LspMethod;
  params: Params;
}
export function requestMethod(request: LspRequest): LspMethod {
  return request.method;
}

// Part 1: identify the native/compiler-specific vocabulary.
type _01 = Expect<Equal<LspMethod, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof LspRequest, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof requestMethod>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof requestMethod>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error

// Part 2: read the discriminated rule matrix.
type _p2_01 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p2_05 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error

// Part 3: calculate representative outcomes.
type _p3_01 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<OutcomeFor<"transport">, TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"requests">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"diagnostics">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"editor-features">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"tsserver-plugin">, TODO>>; // TODO(koan) @koan-error

// Part 4: reflect the literal-preserving runtime boundary.
type _p4_01 = Expect<Equal<OutcomeFor<"embedded-language">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
