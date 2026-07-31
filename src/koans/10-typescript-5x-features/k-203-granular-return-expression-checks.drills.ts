import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type BranchCompatibility,
  type ReturnBranchCase,
  type ReturnExpressionSite,
  classifyReturnBranches,
  granularReturnCases,
  selectLabel,
  selectUrl,
} from "./k-203-granular-return-expression-checks.js";

/** GUIDED DRILLS: repeat return-site categories, per-branch outcomes, conditional diagnostic mapping, literal case extraction, corrected function contracts, and any/unknown/never contrasts. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type BranchCheck<
  TrueCompatible extends boolean,
  FalseCompatible extends boolean,
> =
  TrueCompatible extends false
    ? "true-branch-error"
    : FalseCompatible extends false
      ? "false-branch-error"
      : "both-compatible";
type SiteFor<Index extends keyof typeof granularReturnCases> =
  typeof granularReturnCases[Index] extends { site: infer Site } ? Site : never;

// 1. Return expression sites (1-10)
type _01 = Expect<Equal<ReturnExpressionSite, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<ReturnExpressionSite, "direct-annotated-return">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<ReturnExpressionSite, "temporary-then-return">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<ReturnExpressionSite, "inferred-return">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Exclude<ReturnExpressionSite, "direct-annotated-return">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<ReturnExpressionSite, `${string}annotated${string}`>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<ReturnExpressionSite, `${string}inferred${string}`>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<ReturnExpressionSite, `${string}temporary${string}`>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<ReturnExpressionSite, string>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<string, ReturnExpressionSite>, TODO>>; // TODO(koan) @koan-error

// 2. Branch outcomes (11-20)
type _11 = Expect<Equal<BranchCompatibility, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<BranchCompatibility, "both-compatible">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extract<BranchCompatibility, "true-branch-error">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<BranchCompatibility, "false-branch-error">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<BranchCompatibility, `${string}error`>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Exclude<BranchCompatibility, `${string}error`>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<BranchCompatibility, `true-${string}`>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<BranchCompatibility, `false-${string}`>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<BranchCompatibility, string>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof ReturnBranchCase, TODO>>; // TODO(koan) @koan-error

// 3. Conditional branch checking (21-30)
type _21 = Expect<Equal<BranchCheck<true, true>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<BranchCheck<true, false>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<BranchCheck<false, true>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<BranchCheck<false, false>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<BranchCheck<boolean, true>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<BranchCheck<true, boolean>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<BranchCheck<boolean, false>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<BranchCheck<false, boolean>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<BranchCheck<boolean, boolean>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<BranchCheck<boolean, boolean>, BranchCompatibility>, TODO>>; // TODO(koan) @koan-error

// 4. Diagnostic case matrix (31-41)
type _31 = Expect<Equal<typeof granularReturnCases["length"], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<typeof granularReturnCases[0]["site"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<typeof granularReturnCases[0]["trueCompatible"], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<typeof granularReturnCases[0]["falseCompatible"], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<typeof granularReturnCases[1]["site"], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<typeof granularReturnCases[1]["falseCompatible"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<typeof granularReturnCases[2]["site"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<typeof granularReturnCases[2]["falseCompatible"], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<typeof granularReturnCases[number]["site"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<SiteFor<0>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<SiteFor<2>, TODO>>; // TODO(koan) @koan-error

// 5. any, unknown, and never contrasts (42-51)
type _42 = Expect<Equal<IsAny<any | string>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<IsAny<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<unknown | string, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<never | string, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<IsNever<never | string>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<IsAny<any & string>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<unknown & string, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<never & string, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<IsNever<never & string>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<string, URL>, TODO>>; // TODO(koan) @koan-error

// 6. Corrected APIs and classifier (52-60)
type _52 = Expect<Equal<Parameters<typeof selectUrl>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<typeof selectUrl>[0], TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<typeof selectUrl>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Parameters<typeof selectLabel>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Parameters<typeof selectLabel>[0], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReturnType<typeof selectLabel>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Parameters<typeof classifyReturnBranches>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ReturnType<typeof classifyReturnBranches>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<ReturnType<typeof selectUrl>, URL>, TODO>>; // TODO(koan) @koan-error
