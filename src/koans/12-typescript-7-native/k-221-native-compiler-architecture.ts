import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 221 - NATIVE COMPILER ARCHITECTURE
 * =========================================
 *
 * TypeScript 7 preserves the language while replacing the implementation. The Go
 * port follows the old compiler's structure closely, but native data layouts, shared
 * memory, and multiple threads let parsing, checking, and emitting scale differently.
 * 
 * I separate implementation facts from language facts: source types do not become
 * more or less sound because the compiler is native. What changes is the latency,
 * memory profile, concurrency model, executable surface, and room for optimization.
 *
 * Official source:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */

export const rules = {
  "implementation-language": { scenario: "implementation-language", outcome: "go", detail: "the compiler and language server are native Go programs" },
  "language-semantics": { scenario: "language-semantics", outcome: "preserved", detail: "the port aims to keep TypeScript behavior compatible" },
  "parsing": { scenario: "parsing", outcome: "parallel", detail: "files can largely be parsed independently" },
  "checking": { scenario: "checking", outcome: "worker-partitioned", detail: "fixed workers share inputs but hold checker views" },
  "emitting": { scenario: "emitting", outcome: "parallel", detail: "many file outputs can be produced independently" },
  "memory": { scenario: "memory", outcome: "shared-native", detail: "native layouts and shared memory reduce aggregate pressure" },
} as const;
export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];
export const scenarioList = ["implementation-language", "language-semantics", "parsing", "checking", "emitting", "memory"] as const;

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

export type CompilerStage = "parse" | "bind" | "check" | "emit";
export interface NativeArchitecture {
  implementation: "go";
  defaultCheckers: 4;
  sharedMemory: true;
  language: "typescript";
}
export const nativeArchitecture: NativeArchitecture = {
  implementation: "go",
  defaultCheckers: 4,
  sharedMemory: true,
  language: "typescript",
};
export function independentlyParallel(stage: CompilerStage): boolean {
  return stage === "parse" || stage === "emit";
}

// Part 1: identify the native/compiler-specific vocabulary.
type _01 = Expect<Equal<CompilerStage, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof NativeArchitecture, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<typeof nativeArchitecture, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<typeof independentlyParallel>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof independentlyParallel>, TODO>>; // TODO(koan) @koan-error

// Part 2: read the discriminated rule matrix.
type _p2_01 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_05 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error

// Part 3: calculate representative outcomes.
type _p3_01 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"implementation-language">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"language-semantics">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"parsing">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"checking">, TODO>>; // TODO(koan) @koan-error

// Part 4: reflect the literal-preserving runtime boundary.
type _p4_01 = Expect<Equal<OutcomeFor<"emitting">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"memory">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
