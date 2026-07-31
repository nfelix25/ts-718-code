import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 216 - MAP UPSERT METHODS
 * ===============================
 *
 * `getOrInsert` returns an existing value or stores a supplied default.
 * `getOrInsertComputed` delays construction until the key is absent and passes the
 * key to the callback. Both return V, avoiding the `V | undefined` that follows a
 * plain `get` when absence has not been proven away.
 * 
 * The callback is synchronous and may have side effects. I choose the computed form
 * for expensive defaults, while remembering that TypeScript's declaration does not
 * make a multi-step operation atomic across workers or processes.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#new-types-for-upsert-methods-aka-getorinsert
 */

export const rules = {
  "getOrInsert-hit": { scenario: "getOrInsert-hit", outcome: "existing", detail: "returns the stored value" },
  "getOrInsert-miss": { scenario: "getOrInsert-miss", outcome: "insert-default", detail: "stores the eager default" },
  "computed-hit": { scenario: "computed-hit", outcome: "skip-callback", detail: "does not evaluate the factory" },
  "computed-miss": { scenario: "computed-miss", outcome: "compute-insert", detail: "calls the key-aware factory once" },
  "weak-map": { scenario: "weak-map", outcome: "supported", detail: "WeakMap receives the same two methods" },
  "concurrency": { scenario: "concurrency", outcome: "not-atomic", detail: "the type signature is not a synchronization primitive" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["getOrInsert-hit", "getOrInsert-miss", "computed-hit", "computed-miss", "weak-map", "concurrency"] as const;

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

export type NativeMapGetOrInsert<K, V> = Map<K, V>["getOrInsert"];
export type NativeMapGetOrInsertComputed<K, V> = Map<K, V>["getOrInsertComputed"];
export function getOrInsertComputed<K, V>(
  map: Map<K, V>,
  key: K,
  create: (key: K) => V,
): V {
  const existing = map.get(key);
  if (existing !== undefined || map.has(key)) return existing as V;
  const value = create(key);
  map.set(key, value);
  return value;
}

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<NativeMapGetOrInsert<string, number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<NativeMapGetOrInsert<string, number>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<NativeMapGetOrInsert<string, number>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<NativeMapGetOrInsertComputed<string, number>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof getOrInsertComputed<string, number>>, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"getOrInsert-hit">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"getOrInsert-miss">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"computed-hit">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"computed-miss">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"weak-map">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<OutcomeFor<"concurrency">, TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
