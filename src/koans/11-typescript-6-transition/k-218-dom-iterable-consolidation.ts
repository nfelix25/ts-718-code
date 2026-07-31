import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 218 - DOM ITERABLE CONSOLIDATION
 * =======================================
 *
 * TypeScript 6.0 folds `dom.iterable` and `dom.asynciterable` declarations into
 * `dom`. Modern DOM collections therefore expose iterator members when only the DOM
 * lib is selected; the two old granular lib names remain accepted as empty shims.
 * 
 * This is declaration selection, not runtime feature detection. A server project
 * should not add DOM merely to silence an error, and a browser target still needs the
 * appropriate runtime APIs even when iteration is type-visible.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#the-dom-lib-now-contains-domiterable-and-domasynciterable
 */

export const rules = {
  "dom": { scenario: "dom", outcome: "includes-iterables", detail: "NodeList and HTMLCollection expose iteration" },
  "dom.iterable": { scenario: "dom.iterable", outcome: "empty-shim", detail: "the old lib name remains accepted" },
  "dom.asynciterable": { scenario: "dom.asynciterable", outcome: "empty-shim", detail: "the old async lib name remains accepted" },
  "NodeList": { scenario: "NodeList", outcome: "iterable", detail: "for-of receives Node values" },
  "FormData": { scenario: "FormData", outcome: "iterable", detail: "entries expose key-value pairs" },
  "runtime": { scenario: "runtime", outcome: "separate", detail: "declarations do not install browser globals" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["dom", "dom.iterable", "dom.asynciterable", "NodeList", "FormData", "runtime"] as const;

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

export interface IterableDomCollection<Element> extends Iterable<Element> {
  readonly length: number;
  item(index: number): Element | null;
}
export function collectDomLike<Element>(
  collection: IterableDomCollection<Element>,
): Element[] {
  return [...collection];
}
export function domLibSelection(): readonly ["dom"] {
  return ["dom"];
}

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<keyof IterableDomCollection<string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<typeof collectDomLike<string>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof collectDomLike<string>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof domLibSelection>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"dom">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"dom.iterable">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"dom.asynciterable">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"NodeList">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"FormData">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"runtime">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
