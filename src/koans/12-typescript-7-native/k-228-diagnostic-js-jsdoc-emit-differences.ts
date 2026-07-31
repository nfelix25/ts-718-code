import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 228 - DIAGNOSTIC, JS/JSDOC, AND EMIT DIFFERENCES
 * =======================================================
 *
 * Compatibility is semantic, not byte-for-byte identity. TypeScript 7 template
 * literal inference consumes Unicode code points, so an astral character stays whole
 * instead of splitting into UTF-16 surrogates. JavaScript checking also drops several
 * Closure/JSDoc-specific heuristics in favor of TypeScript-like rules.
 * 
 * I review changed diagnostics and declarations rather than snapshotting wording.
 * For JavaScript I use `typeof` for value-derived types, explicit typedefs, real class
 * syntax, `any` instead of bare `?`, and TypeScript-style function signatures.
 *
 * Official source:
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */

export const rules = {
  "template-unicode": { scenario: "template-unicode", outcome: "code-point", detail: "template inference keeps an astral character whole" },
  "js-value-as-type": { scenario: "js-value-as-type", outcome: "use-typeof", detail: "values require typeof in type positions" },
  "js-enum": { scenario: "js-enum", outcome: "typedef-value-union", detail: "JSDoc enum no longer receives special analysis" },
  "js-question": { scenario: "js-question", outcome: "use-any", detail: "standalone question mark is unsupported" },
  "js-constructor": { scenario: "js-constructor", outcome: "use-class", detail: "a JSDoc class tag does not create a constructor" },
  "declaration-diagnostic": { scenario: "declaration-diagnostic", outcome: "review-semantics", detail: "ordering and wording may differ" },
} as const;
export type Scenario = keyof typeof rules;
export type Rule = typeof rules[Scenario];
export type Outcome = Rule["outcome"];
export type RuleFor<S extends Scenario> = typeof rules[S];
export type OutcomeFor<S extends Scenario> = RuleFor<S>["outcome"];
export const scenarioList = ["template-unicode", "js-value-as-type", "js-enum", "js-question", "js-constructor", "declaration-diagnostic"] as const;

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

export type HeadTail<S extends string> =
  S extends `${infer Head}${infer Tail}` ? [Head, Tail] : never;
export type UnicodeHeadTail = HeadTail<"😀abc">;
export type JavaScriptMigration =
  | "typeof-value"
  | "typedef-union"
  | "any"
  | "class"
  | "typescript-function-syntax";
export function firstCodePoint(value: string): string | undefined {
  return Array.from(value)[0];
}

// Part 1: identify the native/compiler-specific vocabulary.
type _01 = Expect<Equal<UnicodeHeadTail, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<HeadTail<"a">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<JavaScriptMigration, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<typeof firstCodePoint>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof firstCodePoint>, TODO>>; // TODO(koan) @koan-error

// Part 2: read the discriminated rule matrix.
type _p2_01 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _p2_02 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _p2_03 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _p2_04 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _p2_05 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error

// Part 3: calculate representative outcomes.
type _p3_01 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _p3_02 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _p3_03 = Expect<Equal<OutcomeFor<"template-unicode">, TODO>>; // TODO(koan) @koan-error
type _p3_04 = Expect<Equal<OutcomeFor<"js-value-as-type">, TODO>>; // TODO(koan) @koan-error
type _p3_05 = Expect<Equal<OutcomeFor<"js-enum">, TODO>>; // TODO(koan) @koan-error
type _p3_06 = Expect<Equal<OutcomeFor<"js-question">, TODO>>; // TODO(koan) @koan-error

// Part 4: reflect the literal-preserving runtime boundary.
type _p4_01 = Expect<Equal<OutcomeFor<"js-constructor">, TODO>>; // TODO(koan) @koan-error
type _p4_02 = Expect<Equal<OutcomeFor<"declaration-diagnostic">, TODO>>; // TODO(koan) @koan-error
type _p4_03 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _p4_04 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
