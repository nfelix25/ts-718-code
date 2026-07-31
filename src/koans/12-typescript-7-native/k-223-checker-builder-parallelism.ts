import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 223 - CHECKER AND BUILDER PARALLELISM
 * ============================================
 *
 * `--checkers` controls type-checker workers; `--builders` controls concurrent
 * project-reference builders. Their resource use can multiply because each builder
 * may own several checker workers. More parallelism can reduce time while increasing
 * peak memory and duplicated checker work.
 * 
 * `--singleThreaded` is the diagnostic baseline: it disables parallel parsing,
 * checking, and emitting. I benchmark settings on the actual CI machine instead of
 * assuming the largest worker count is fastest.
 *
 * Official source:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */

export const rules = {
  "checkers-default": { scenario: "checkers-default", outcome: "four", detail: "TypeScript 7 starts with four checker workers" },
  "checkers-one": { scenario: "checkers-one", outcome: "checker-serial", detail: "one checker removes duplicated checker work" },
  "checkers-many": { scenario: "checkers-many", outcome: "memory-tradeoff", detail: "more workers may improve large builds at a cost" },
  "builders": { scenario: "builders", outcome: "project-parallel", detail: "independent project references can build concurrently" },
  "combined": { scenario: "combined", outcome: "multiplicative", detail: "checker and builder counts multiply potential workers" },
  "single-threaded": { scenario: "single-threaded", outcome: "fully-serial", detail: "parse check and emit all run on one thread" },
} as const;
export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];
export const scenarioList = ["checkers-default", "checkers-one", "checkers-many", "builders", "combined", "single-threaded"] as const;

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

export interface Parallelism {
  checkers: number;
  builders: number;
  singleThreaded: boolean;
}
export function potentialCheckers(config: Parallelism): number {
  return config.singleThreaded ? 1 : config.checkers * config.builders;
}
export function validParallelism(config: Parallelism): boolean {
  return Number.isInteger(config.checkers) && Number.isInteger(config.builders)
    && config.checkers > 0 && config.builders > 0;
}

// Part 1: identify the native/compiler-specific vocabulary.
type _01 = Expect<Equal<keyof Parallelism, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<typeof potentialCheckers>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof potentialCheckers>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof validParallelism>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error

// Part 2: read the discriminated rule matrix.
type _p2_01 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p2_05 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error

// Part 3: calculate representative outcomes.
type _p3_01 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<OutcomeFor<"checkers-default">, TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"checkers-one">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"checkers-many">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"builders">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"combined">, TODO>>; // TODO(koan) @koan-error

// Part 4: reflect the literal-preserving runtime boundary.
type _p4_01 = Expect<Equal<OutcomeFor<"single-threaded">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
