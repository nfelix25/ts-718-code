import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 217 - SET, ITERATOR, AND PROMISE ES2025 APIS
 * ===================================================
 *
 * ES2025 consolidates several previously ESNext-only library surfaces. Set algebra
 * returns new sets, iterator helpers stay lazy until consumed, and `Promise.try`
 * normalizes a callback that may return a value, promise, or throw synchronously.
 * 
 * I read their signatures for evaluation strategy as well as element types: Set
 * operations are eager collections, iterator transformations are pull-based, and
 * Promise.try always crosses an asynchronous Promise boundary.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#es2025-option-for-target-and-lib
 */

export const rules = {
  "Set.union": { scenario: "Set.union", outcome: "eager-set", detail: "returns a new union set" },
  "Set.difference": { scenario: "Set.difference", outcome: "eager-set", detail: "returns members absent from the other set" },
  "Set.isSubsetOf": { scenario: "Set.isSubsetOf", outcome: "boolean-relation", detail: "tests a subset relationship" },
  "Iterator.from": { scenario: "Iterator.from", outcome: "lazy-iterator", detail: "wraps iterable and iterator inputs" },
  "Iterator.map": { scenario: "Iterator.map", outcome: "lazy-transform", detail: "maps when the iterator is consumed" },
  "Promise.try": { scenario: "Promise.try", outcome: "promise-normalization", detail: "adopts values, promises, and throws" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["Set.union", "Set.difference", "Set.isSubsetOf", "Iterator.from", "Iterator.map", "Promise.try"] as const;

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

export type NumberSetUnion = Set<number>["union"];
export type IteratorFrom = typeof Iterator.from;
export type PromiseTry = typeof Promise.try;
export function unionValues(left: Set<number>, right: Set<number>): number[] {
  return [...left.union(right)].sort((a, b) => a - b);
}
export function doubledIterator(values: Iterable<number>): number[] {
  return Iterator.from(values).map(value => value * 2).toArray();
}

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<Parameters<NumberSetUnion>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<NumberSetUnion>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<typeof Iterator.from, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<typeof Promise.try, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof unionValues>, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<ReturnType<typeof doubledIterator>, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"Set.union">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"Set.difference">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"Set.isSubsetOf">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"Iterator.from">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<OutcomeFor<"Iterator.map">, TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<OutcomeFor<"Promise.try">, TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
