import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 214 - ES2025 LIB AND REGEXP.ESCAPE
 * =========================================
 *
 * `target` controls syntax transformation; `lib` controls the declarations assumed
 * to exist. TypeScript 6.0 accepts ES2025 for both and promotes settled APIs such as
 * `RegExp.escape`, Promise.try, iterator helpers, and modern Set methods from ESNext.
 * 
 * `RegExp.escape(text)` means: make this arbitrary text safe as a literal fragment
 * inside a newly constructed regular expression. It does not validate a complete
 * pattern and it does not add anchors or word boundaries for me.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#regexpescape
 */

export const rules = {
  "RegExp.escape": { scenario: "RegExp.escape", outcome: "es2025", detail: "escapes a literal regex fragment" },
  "Promise.try": { scenario: "Promise.try", outcome: "es2025", detail: "normalizes sync throws and returned values" },
  "Iterator.from": { scenario: "Iterator.from", outcome: "es2025", detail: "creates an iterator helper wrapper" },
  "Set.union": { scenario: "Set.union", outcome: "es2025", detail: "returns members from either set" },
  "Set.intersection": { scenario: "Set.intersection", outcome: "es2025", detail: "returns shared members" },
  "target-vs-lib": { scenario: "target-vs-lib", outcome: "separate", detail: "syntax output and declaration availability differ" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["RegExp.escape", "Promise.try", "Iterator.from", "Set.union", "Set.intersection", "target-vs-lib"] as const;

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

export type ES2025PromotedApi =
  | "RegExp.escape"
  | "Promise.try"
  | "Iterator.from"
  | "Set.union"
  | "Set.intersection";
export function literalPattern(text: string): RegExp {
  return new RegExp(RegExp.escape(text), "u");
}
export function containsLiteral(haystack: string, needle: string): boolean {
  return literalPattern(needle).test(haystack);
}
export const escapedMetacharacters = RegExp.escape("a+b?");

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<ES2025PromotedApi, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof RegExp.escape, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof RegExp.escape>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof RegExp.escape>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof literalPattern>, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<ReturnType<typeof containsLiteral>, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"RegExp.escape">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"Promise.try">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"Iterator.from">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"Set.union">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<OutcomeFor<"Set.intersection">, TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<OutcomeFor<"target-vs-lib">, TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
