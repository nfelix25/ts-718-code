import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 203 - GRANULAR RETURN-EXPRESSION CHECKS
 * =============================================
 *
 * `any` absorbs unions. In older compilers, a conditional expression with
 * branches `any` and `string` became `any`; only then was it compared with an
 * annotated `URL` return type, so a broken string branch escaped.
 *
 * TypeScript 5.8 special-cases conditional expressions directly inside return
 * statements. When the function has a declared return type, each branch is
 * checked against that type. Read it as "both the when-true expression and the
 * when-false expression must independently satisfy the return contract."
 *
 * This is contextual checking at the return site. It does not remove `any`, and
 * moving the conditional into an `any`-typed temporary can still discard the
 * evidence before the return. Precise inputs remain the stronger design.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html#granular-checks-for-branches-in-return-expressions
 */

export type ReturnExpressionSite =
  | "direct-annotated-return"
  | "temporary-then-return"
  | "inferred-return";

export type BranchCompatibility =
  | "both-compatible"
  | "true-branch-error"
  | "false-branch-error";

export interface ReturnBranchCase {
  site: ReturnExpressionSite;
  trueCompatible: boolean;
  falseCompatible: boolean;
}

export function classifyReturnBranches(
  entry: ReturnBranchCase,
): BranchCompatibility {
  if (!entry.trueCompatible) return "true-branch-error";
  if (!entry.falseCompatible) return "false-branch-error";
  return "both-compatible";
}

export function selectUrl(
  cached: unknown,
  raw: string,
  useCache: boolean,
): URL {
  return useCache && cached instanceof URL
    ? cached
    : new URL(raw);
}

export function selectLabel(
  preferred: string | undefined,
  fallback: string,
): string {
  return preferred !== undefined ? preferred : fallback;
}

export const granularReturnCases = [
  {
    site: "direct-annotated-return",
    trueCompatible: true,
    falseCompatible: false,
  },
  {
    site: "direct-annotated-return",
    trueCompatible: true,
    falseCompatible: true,
  },
  {
    site: "temporary-then-return",
    trueCompatible: true,
    falseCompatible: false,
  },
] as const satisfies readonly ReturnBranchCase[];

// Part 1: name the return contexts and branch outcomes.
type _01 = Expect<Equal<ReturnExpressionSite, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<BranchCompatibility, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<BranchCompatibility, `${string}error`>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Exclude<BranchCompatibility, `${string}error`>, TODO>>; // TODO(koan) @koan-error

// Part 2: branch compatibility is tracked independently.
type _05 = Expect<Equal<ReturnBranchCase["site"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnBranchCase["trueCompatible"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnBranchCase["falseCompatible"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof ReturnBranchCase, TODO>>; // TODO(koan) @koan-error

// Part 3: the diagnostic matrix preserves return-site distinctions.
type _09 = Expect<Equal<typeof granularReturnCases["length"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof granularReturnCases[number]["site"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof granularReturnCases[0]["falseCompatible"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof granularReturnCases[1]["falseCompatible"], TODO>>; // TODO(koan) @koan-error

// Part 4: corrected functions satisfy their declared return contract.
type _13 = Expect<Equal<Parameters<typeof selectUrl>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof selectUrl>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof selectLabel>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof selectLabel>, TODO>>; // TODO(koan) @koan-error

// Part 5: the classifier reports one branch at a time.
type _17 = Expect<Equal<Parameters<typeof classifyReturnBranches>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof classifyReturnBranches>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<ReturnExpressionSite, `${string}annotated${string}`>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Exclude<ReturnExpressionSite, "direct-annotated-return">, TODO>>; // TODO(koan) @koan-error
