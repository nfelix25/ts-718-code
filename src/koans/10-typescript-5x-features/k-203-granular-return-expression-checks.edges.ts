import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type BranchCompatibility,
  type ReturnBranchCase,
  type ReturnExpressionSite,
  classifyReturnBranches,
  granularReturnCases,
  selectUrl,
} from "./k-203-granular-return-expression-checks.js";

/** EDGE CASES: the feature targets direct conditional returns with declared return types, any still poisons unions elsewhere, a temporary can erase branch evidence, inferred returns have no declared target, unknown forces narrowing, never disappears from unions, branch order affects which modeled diagnostic wins, and nested conditionals still require local reasoning. */

type IsAny<Value> = 0 extends 1 & Value ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type Extends<From, To> = [From] extends [To] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations of any absorption and the fixed API.
type _DemoAnyUnion = Expect<Equal<IsAny<any | string>, true>>;
type _DemoUnknownUnion = Expect<Equal<unknown | string, unknown>>;
type _DemoNeverUnion = Expect<Equal<never | string, string>>;
type _DemoUrlReturn = Expect<Equal<ReturnType<typeof selectUrl>, URL>>;

// 1. any can still erase evidence outside granular checking (1-7)
type _01 = Expect<Equal<IsAny<any | string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IsAny<any | URL>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsAny<any | never>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsAny<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<unknown | URL, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<never | URL, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsNever<never | URL>, TODO>>; // TODO(koan) @koan-error

// 2. Context determines whether branch granularity is available (8-14)
type _08 = Expect<Equal<Extract<ReturnExpressionSite, "direct-annotated-return">, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extract<ReturnExpressionSite, "temporary-then-return">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<ReturnExpressionSite, "inferred-return">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Exclude<ReturnExpressionSite, "direct-annotated-return">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsBroadString<ReturnExpressionSite>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<"direct-annotated-return", ReturnExpressionSite>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<string, ReturnExpressionSite>, TODO>>; // TODO(koan) @koan-error

// 3. Branch ordering in the lesson classifier (15-21)
type _15 = Expect<Equal<BranchCompatibility, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<typeof granularReturnCases[0]["trueCompatible"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<typeof granularReturnCases[0]["falseCompatible"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<typeof classifyReturnBranches>[0], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof classifyReturnBranches>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<BranchCompatibility, `true-${string}`>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<BranchCompatibility, `false-${string}`>, TODO>>; // TODO(koan) @koan-error

// 4. Corrected unknown input forces a runtime proof (22-26)
type _22 = Expect<Equal<Parameters<typeof selectUrl>[0], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Parameters<typeof selectUrl>[1], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof selectUrl>[2], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof selectUrl>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<unknown, URL>, TODO>>; // TODO(koan) @koan-error

// 5. Top/bottom and case-model relationships (27-30)
type _27 = Expect<Equal<Extends<never, ReturnBranchCase>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, ReturnBranchCase>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<ReturnBranchCase, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsNever<Extract<BranchCompatibility, never>>, TODO>>; // TODO(koan) @koan-error
