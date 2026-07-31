import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 209 - STRICT FAMILY UNPACKED
 * ===================================
 *
 * I treat `strict` as a versioned bundle, not as one mysterious switch. Each member
 * protects a different boundary: nullability, implicit `any`, receiver typing,
 * function-parameter variance, class initialization, or caught exceptions.
 * 
 * Read `StrictEffect<K>` aloud as: for strict-family member K, select the failure
 * mode that becomes visible. Unpacking the bundle lets me explain a diagnostic,
 * stage a migration, and avoid assuming that `strict: true` includes every adjacent
 * hardening flag.
 *
 * Official source:
 * - https://www.typescriptlang.org/tsconfig/strict.html
 */

export const rules = {
  "strictNullChecks": { scenario: "strictNullChecks", outcome: "nullability", detail: "null and undefined retain separate types" },
  "noImplicitAny": { scenario: "noImplicitAny", outcome: "implicit-any", detail: "unannotated unresolved values cannot become any" },
  "noImplicitThis": { scenario: "noImplicitThis", outcome: "receiver", detail: "untyped this values are diagnosed" },
  "strictFunctionTypes": { scenario: "strictFunctionTypes", outcome: "variance", detail: "function properties check parameter contravariance" },
  "strictPropertyInitialization": { scenario: "strictPropertyInitialization", outcome: "initialization", detail: "class fields need construction evidence" },
  "useUnknownInCatchVariables": { scenario: "useUnknownInCatchVariables", outcome: "unknown-catch", detail: "catch bindings require narrowing" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["strictNullChecks", "noImplicitAny", "noImplicitThis", "strictFunctionTypes", "strictPropertyInitialization", "useUnknownInCatchVariables"] as const;

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

export interface StrictFamily {
  strictNullChecks: true;
  noImplicitAny: true;
  noImplicitThis: true;
  strictFunctionTypes: true;
  strictPropertyInitialization: true;
  useUnknownInCatchVariables: true;
}
export type StrictMember = keyof StrictFamily;
export type StrictBundleValue = StrictFamily[StrictMember];
export const strictFamily: StrictFamily = {
  strictNullChecks: true,
  noImplicitAny: true,
  noImplicitThis: true,
  strictFunctionTypes: true,
  strictPropertyInitialization: true,
  useUnknownInCatchVariables: true,
};

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<StrictMember, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<StrictBundleValue, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof StrictFamily, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<StrictFamily["strictNullChecks"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<typeof strictFamily, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"strictNullChecks">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"noImplicitAny">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"noImplicitThis">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"strictFunctionTypes">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"strictPropertyInitialization">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<OutcomeFor<"useUnknownInCatchVariables">, TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
