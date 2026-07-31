import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type SuspiciousSyntax,
  type SyntacticCheckCase,
  type SyntacticCheckKind,
  classifySyntacticCheck,
  isBelowMaximum,
  syntacticCheckCases,
} from "./k-197-syntactic-truthy-nullish-checks.js";

/** EDGE CASES: the feature is syntax-driven rather than full constant folding, true/false/0/1 remain intentionally allowed, identifiers and calls can vary at runtime, precedence creates never-nullish booleans, parenthesization changes meaning, and intentional bad expressions must remain data in a solvable koan. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;
type DiagnosticKinds = Exclude<SyntacticCheckKind, "allowed-constant">;

// Pre-solved demonstrations of the closed diagnostic model.
type _DemoKinds = Expect<Equal<DiagnosticKinds, "always-truthy" | "always-nullish" | "never-nullish">>;
type _DemoAllowed = Expect<Equal<typeof syntacticCheckCases[3]["kind"], "allowed-constant">>;
type _DemoBooleanResult = Expect<Equal<ReturnType<typeof isBelowMaximum>, boolean>>;
type _DemoClassifier = Expect<Equal<ReturnType<typeof classifySyntacticCheck>, "diagnostic" | "allowed">>;

// 1. Allowed constants are an explicit carve-out (1-7)
type AllowedConstant = true | false | 0 | 1;
type _01 = Expect<Equal<AllowedConstant, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<AllowedConstant, boolean>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<AllowedConstant, number>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Exclude<AllowedConstant, boolean>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Exclude<AllowedConstant, number>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<AllowedConstant, boolean | number>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<2, AllowedConstant>, TODO>>; // TODO(koan) @koan-error

// 2. Closed cases cannot model every future diagnostic form (8-14)
type _08 = Expect<Equal<IsBroadString<SyntacticCheckKind>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<IsBroadString<SuspiciousSyntax>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<SyntacticCheckKind, "always-falsy">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<IsNever<Extract<SyntacticCheckKind, "always-falsy">>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Exclude<SyntacticCheckKind, SyntacticCheckKind>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<IsNever<Exclude<SyntacticCheckKind, SyntacticCheckKind>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<keyof SyntacticCheckCase, TODO>>; // TODO(koan) @koan-error

// 3. Precedence changes the type before coalescing (15-21)
type ComparisonResult = ReturnType<typeof isBelowMaximum>;
type _15 = Expect<Equal<ComparisonResult, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<ComparisonResult, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<IsNever<Extract<ComparisonResult, null | undefined>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<NonNullable<ComparisonResult>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof isBelowMaximum>[1], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<NonNullable<Parameters<typeof isBelowMaximum>[1]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<Parameters<typeof isBelowMaximum>[1], undefined>, TODO>>; // TODO(koan) @koan-error

// 4. Diagnostic data is not a live compiler invocation (22-26)
type _22 = Expect<Equal<typeof syntacticCheckCases[number]["syntax"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<typeof syntacticCheckCases[number]["kind"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof classifySyntacticCheck>[0], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof classifySyntacticCheck>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<typeof syntacticCheckCases[number], SyntacticCheckCase>, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom relationships (27-30)
type _27 = Expect<Equal<Extends<never, SyntacticCheckKind>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, SyntacticCheckKind>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<SyntacticCheckKind, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsNever<Extract<SuspiciousSyntax, never>>, TODO>>; // TODO(koan) @koan-error
