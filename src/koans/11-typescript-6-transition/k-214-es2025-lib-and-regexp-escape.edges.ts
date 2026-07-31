import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type Outcome,
  type OutcomeFor,
  type Rule,
  type RuleFor,
  type Scenario,
  allOutcomes,
  assess,
  scenarioList,
  type ES2025PromotedApi,
  literalPattern,
  containsLiteral,
  escapedMetacharacters
} from "./k-214-es2025-lib-and-regexp-escape.js";

/** EDGE CASES: separate compiler behavior from library declarations and host runtime support; keep correlation by narrowing the rule union; remember that broad strings erase a closed scenario vocabulary; and treat never, unknown, deprecations, and migration-only flags deliberately. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved anchors: the matrix is closed, literal-preserving, and total.
type _DemoClosed = Expect<Equal<IsBroadString<Scenario>, false>>;
type _DemoTotal = Expect<Equal<typeof scenarioList[number], Scenario>>;
type _DemoBottom = Expect<Equal<IsNever<never>, true>>;

type _01 = Expect<Equal<ES2025PromotedApi, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof RegExp.escape, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof RegExp.escape>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof RegExp.escape>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof literalPattern>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof containsLiteral>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<Scenario, "not-a-scenario">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsNever<Extract<Scenario, "not-a-scenario">>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Exclude<Scenario, "RegExp.escape">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Exclude<Scenario, "target-vs-lib">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<IsNever<Extract<Scenario, never>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<never, Scenario>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<unknown, Scenario>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<Scenario, unknown>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Scenario, string>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<string, Scenario>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<IsBroadString<Scenario>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<IsBroadString<string>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extract<Rule, { scenario: "RegExp.escape" }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Exclude<Rule, { scenario: "RegExp.escape" }>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<OutcomeFor<"RegExp.escape">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<OutcomeFor<"target-vs-lib">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<typeof assess>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Parameters<typeof allOutcomes>, TODO>>; // TODO(koan) @koan-error
