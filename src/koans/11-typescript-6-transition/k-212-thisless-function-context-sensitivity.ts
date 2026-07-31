import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 212 - THIS-LESS FUNCTION CONTEXT SENSITIVITY
 * ===================================================
 *
 * Generic inference temporarily skips context-sensitive functions because checking
 * their parameters may itself require the type argument being inferred. Before 6.0,
 * method syntax was conservatively treated as context-sensitive because methods have
 * an implicit `this`, even when their bodies never read it.
 * 
 * TypeScript 6.0 inspects the body: a method that never uses `this` can contribute
 * inference candidates earlier. Read the flow as: gather independent evidence first,
 * fix T, then contextually type consumers. A real `this` dependency still needs the
 * conservative path.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#less-context-sensitivity-on-this-less-functions
 */

export const rules = {
  "arrow-consumer-first": { scenario: "arrow-consumer-first", outcome: "inferred", detail: "arrow functions have no implicit this" },
  "method-consumer-first": { scenario: "method-consumer-first", outcome: "inferred-in-6", detail: "a this-less method contributes earlier" },
  "method-uses-this": { scenario: "method-uses-this", outcome: "context-sensitive", detail: "receiver use can depend on the object type" },
  "explicit-consumer-parameter": { scenario: "explicit-consumer-parameter", outcome: "explicit", detail: "annotation removes the inference cycle" },
  "callback-before-value": { scenario: "callback-before-value", outcome: "later-argument", detail: "the later value supplies T" },
  "no-independent-candidate": { scenario: "no-independent-candidate", outcome: "unknown", detail: "no usable evidence leaves the safe top type" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["arrow-consumer-first", "method-consumer-first", "method-uses-this", "explicit-consumer-parameter", "callback-before-value", "no-independent-candidate"] as const;

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

export function callIt<T>(shape: {
  produce: (value: number) => T;
  consume: (value: T) => void;
}): T {
  const value = shape.produce(21);
  shape.consume(value);
  return value;
}
export const inferredFromReversedMethods = callIt({
  consume(value) {
    value.toFixed();
  },
  produce(value: number) {
    return value * 2;
  },
});
export function callbackThenValue<T>(callback: (value: T) => string, value: T): string {
  return callback(value);
}
export const inferredFromLaterArgument = callbackThenValue(value => value.toFixed(), 42);

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<typeof inferredFromReversedMethods, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof inferredFromLaterArgument, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof callIt<number>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<typeof callbackThenValue<number>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"arrow-consumer-first">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"method-consumer-first">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"method-uses-this">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"explicit-consumer-parameter">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"callback-before-value">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"no-independent-candidate">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
