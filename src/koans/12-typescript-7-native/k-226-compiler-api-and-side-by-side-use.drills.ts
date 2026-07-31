import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type Outcome, type OutcomeFor, type Rule, type RuleFor, type Scenario,
  assess, explain, outcomes, scenarioList,
  type ToolCapability,
  type CompilerChoice,
  compilerFor
} from "./k-226-compiler-api-and-side-by-side-use.js";

/** GUIDED DRILLS: repeat native architecture vocabulary, scenario extraction, rule correlation, compiler/runtime distinctions, migration choices, function reflection, and structural comparisons. */

type _01 = Expect<Equal<ToolCapability, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<CompilerChoice, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<typeof compilerFor>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof compilerFor>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Scenario, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Outcome, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Rule, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof Rule, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Rule["scenario"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Rule["outcome"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Rule["detail"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<Scenario, "native-tsc">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extract<Scenario, "tsc6">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<Scenario, "legacy-api">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<Scenario, "lsp">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<Scenario, "embedded-tool">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<Scenario, "future-api">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<Scenario, "native-tsc">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Exclude<Scenario, "tsc6">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Exclude<Scenario, "legacy-api">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Exclude<Scenario, "lsp">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Exclude<Scenario, "embedded-tool">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Exclude<Scenario, "future-api">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<OutcomeFor<"native-tsc">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<OutcomeFor<"tsc6">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<OutcomeFor<"legacy-api">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<OutcomeFor<"lsp">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<OutcomeFor<"embedded-tool">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<OutcomeFor<"future-api">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<RuleFor<"native-tsc">["scenario"], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<RuleFor<"tsc6">["scenario"], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<RuleFor<"legacy-api">["scenario"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<RuleFor<"lsp">["scenario"], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<RuleFor<"embedded-tool">["scenario"], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<RuleFor<"future-api">["scenario"], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<RuleFor<"native-tsc">["outcome"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<RuleFor<"tsc6">["outcome"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<RuleFor<"legacy-api">["outcome"], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<RuleFor<"lsp">["outcome"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<RuleFor<"embedded-tool">["outcome"], TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<RuleFor<"future-api">["outcome"], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<RuleFor<"native-tsc">["detail"], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<RuleFor<"tsc6">["detail"], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<RuleFor<"legacy-api">["detail"], TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<RuleFor<"lsp">["detail"], TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<RuleFor<"embedded-tool">["detail"], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<RuleFor<"future-api">["detail"], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Extract<Rule, { scenario: "native-tsc" }>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Extract<Rule, { scenario: "tsc6" }>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extract<Rule, { scenario: "legacy-api" }>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extract<Rule, { scenario: "lsp" }>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Extract<Rule, { scenario: "embedded-tool" }>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extract<Rule, { scenario: "future-api" }>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<typeof scenarioList[number], TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<typeof scenarioList["length"], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<typeof scenarioList[0], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<typeof scenarioList[5], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Parameters<typeof assess>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ReturnType<typeof assess>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Parameters<typeof explain>, TODO>>; // TODO(koan) @koan-error
