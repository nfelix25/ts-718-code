import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 215 - TEMPORAL API TYPES
 * ===============================
 *
 * Temporal separates exact timeline instants from calendar dates, wall-clock times,
 * time zones, and durations. That separation prevents the overloaded mutable-Date
 * mental model from silently mixing concepts.
 * 
 * TypeScript 6.0 provides `esnext.temporal` declarations. Declarations describe a
 * host capability; they do not polyfill the runtime. I therefore keep runtime tests
 * feature-detected while type exercises use the real namespace and method signatures.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#new-types-for-temporal
 */

export const rules = {
  "Instant": { scenario: "Instant", outcome: "timeline", detail: "an exact nanosecond on the global timeline" },
  "PlainDate": { scenario: "PlainDate", outcome: "calendar-date", detail: "a date without time or zone" },
  "PlainTime": { scenario: "PlainTime", outcome: "wall-time", detail: "a clock time without date or zone" },
  "ZonedDateTime": { scenario: "ZonedDateTime", outcome: "zoned", detail: "an instant interpreted in a time zone and calendar" },
  "Duration": { scenario: "Duration", outcome: "amount", detail: "a signed amount used by arithmetic" },
  "Now": { scenario: "Now", outcome: "host-clock", detail: "entry points backed by the host clock" },
} as const;

export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];

export const scenarioList = ["Instant", "PlainDate", "PlainTime", "ZonedDateTime", "Duration", "Now"] as const;

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

export type TemporalInstantFactory = typeof Temporal.Instant.from;
export type TemporalNowInstant = ReturnType<typeof Temporal.Now.instant>;
export type TemporalDateInput = Parameters<typeof Temporal.PlainDate.from>[0];
export function addTemporalDuration(
  instant: Temporal.Instant,
  duration: Temporal.DurationLike,
): Temporal.Instant {
  return instant.add(duration);
}
export function hasTemporalRuntime(): boolean {
  return typeof globalThis.Temporal !== "undefined";
}

// Part 1: name the concrete vocabulary and feature-specific signatures.
type _01 = Expect<Equal<TemporalNowInstant, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<TemporalDateInput, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<TemporalInstantFactory>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<typeof addTemporalDuration>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof addTemporalDuration>, TODO>>; // TODO(koan) @koan-error

// Part 2: read the scenario matrix through indexed access.
type _p2_01 = Expect<Equal<ReturnType<typeof hasTemporalRuntime>, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error

// Part 3: evaluate representative scenario-to-outcome lookups.
type _p3_01 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"Instant">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"PlainDate">, TODO>>; // TODO(koan) @koan-error

// Part 4: preserve literal information through the runtime helpers.
type _p4_01 = Expect<Equal<OutcomeFor<"PlainTime">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"ZonedDateTime">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<OutcomeFor<"Duration">, TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<OutcomeFor<"Now">, TODO>>; // TODO(koan) @koan-error
type _p4_05 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
