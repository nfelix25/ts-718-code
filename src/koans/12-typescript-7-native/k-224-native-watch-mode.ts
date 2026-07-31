import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 224 - NATIVE WATCH MODE
 * ==============================
 *
 * TypeScript 7 rebuilds watch mode on a Go port of Parcel's watcher foundation.
 * The watcher owns cross-platform file events; the compiler still owns why a path
 * matters, which graph nodes become invalid, and what must be rechecked.
 * 
 * Fast startup does not eliminate invalidation design. Generated outputs, dependency
 * directories, atomic-save patterns, and project references still determine how much
 * work follows a single filesystem event.
 *
 * Official source:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */

export const rules = {
  "watch-foundation": { scenario: "watch-foundation", outcome: "parcel-port", detail: "a self-contained Go watcher handles file events" },
  "cross-platform": { scenario: "cross-platform", outcome: "stable-events", detail: "the port targets consistent operating-system behavior" },
  "pure-polling": { scenario: "pure-polling", outcome: "too-expensive", detail: "large dependency trees made polling unsuitable" },
  "change-event": { scenario: "change-event", outcome: "invalidate", detail: "affected graph state must be recomputed" },
  "project-reference": { scenario: "project-reference", outcome: "propagate", detail: "public output changes can affect dependents" },
  "resource-profile": { scenario: "resource-profile", outcome: "improved", detail: "native watch reduces large-project overhead" },
} as const;
export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];
export const scenarioList = ["watch-foundation", "cross-platform", "pure-polling", "change-event", "project-reference", "resource-profile"] as const;

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

export type WatchEventKind = "create" | "change" | "delete";
export interface WatchEvent {
  kind: WatchEventKind;
  path: string;
}
export function invalidatesProgram(event: WatchEvent): boolean {
  return /\.(?:[cm]?[jt]sx?|json)$/.test(event.path);
}
export function coalesceWatchEvents(events: readonly WatchEvent[]): WatchEvent[] {
  return [...new Map(events.map(event => [event.path, event])).values()];
}

// Part 1: identify the native/compiler-specific vocabulary.
type _01 = Expect<Equal<WatchEventKind, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof WatchEvent, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof invalidatesProgram>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof invalidatesProgram>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof coalesceWatchEvents>, TODO>>; // TODO(koan) @koan-error

// Part 2: read the discriminated rule matrix.
type _p2_01 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_05 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error

// Part 3: calculate representative outcomes.
type _p3_01 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"watch-foundation">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"cross-platform">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"pure-polling">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"change-event">, TODO>>; // TODO(koan) @koan-error

// Part 4: reflect the literal-preserving runtime boundary.
type _p4_01 = Expect<Equal<OutcomeFor<"project-reference">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"resource-profile">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
