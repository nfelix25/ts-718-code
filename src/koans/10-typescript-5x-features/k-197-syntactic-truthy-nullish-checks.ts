import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 197 - SYNTACTIC TRUTHY AND NULLISH CHECKS
 * ===============================================
 *
 * Some legal JavaScript expressions are almost certainly mistakes: a RegExp
 * literal used directly as an `if` condition, an arrow function written where
 * `>=` was intended, or `value < maximum ?? fallback`, whose comparison runs
 * before `??` and therefore produces a non-nullish boolean.
 *
 * TypeScript 5.6 diagnoses several of these from syntax alone. Read the check as
 * "this expression form is always truthy, or this `??` right side is
 * unreachable." It is not a general theorem prover and it deliberately allows
 * the common constants `true`, `false`, `0`, and `1`.
 *
 * The suspicious programs below are data, not live expressions. That preserves
 * the lesson contract: only TODO assertions fail. The executable functions show
 * the parenthesized call/comparison forms the author usually intended.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html#disallowed-nullish-and-truthy-checks
 */

export type SyntacticCheckKind =
  | "always-truthy"
  | "always-nullish"
  | "never-nullish"
  | "allowed-constant";

export type SuspiciousSyntax =
  | "regex-condition"
  | "arrow-condition"
  | "comparison-before-coalesce"
  | "misplaced-parenthesis";

export interface SyntacticCheckCase<
  Syntax extends string = string,
  Kind extends SyntacticCheckKind = SyntacticCheckKind,
> {
  syntax: Syntax;
  kind: Kind;
}

export const syntacticCheckCases = [
  { syntax: "if (/hex/)", kind: "always-truthy" },
  { syntax: "if (value => 0)", kind: "always-truthy" },
  { syntax: "value < maximum ?? 100", kind: "never-nullish" },
  { syntax: "while (true)", kind: "allowed-constant" },
] as const satisfies readonly SyntacticCheckCase[];

export function hasHexDigits(input: string): boolean {
  return /0x[0-9a-f]+/i.test(input);
}

export function isAtLeast(value: number, minimum: number): boolean {
  return value >= minimum;
}

export function isBelowMaximum(
  value: number,
  maximum: number | undefined,
): boolean {
  return value < (maximum ?? 100);
}

export function classifySyntacticCheck(
  entry: SyntacticCheckCase,
): "diagnostic" | "allowed" {
  return entry.kind === "allowed-constant" ? "allowed" : "diagnostic";
}

// Part 1: name the compiler's outcome categories.
type _01 = Expect<Equal<SyntacticCheckKind, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<SuspiciousSyntax, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<SyntacticCheckCase["syntax"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<SyntacticCheckCase["kind"], TODO>>; // TODO(koan) @koan-error

// Part 2: keep intentionally bad programs in a typed matrix.
type _05 = Expect<Equal<typeof syntacticCheckCases["length"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<typeof syntacticCheckCases[number]["kind"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<typeof syntacticCheckCases[0]["kind"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof syntacticCheckCases[3]["kind"], TODO>>; // TODO(koan) @koan-error

// Part 3: corrected forms perform a test or comparison.
type _09 = Expect<Equal<Parameters<typeof hasHexDigits>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<typeof hasHexDigits>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<typeof isAtLeast>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof isAtLeast>, TODO>>; // TODO(koan) @koan-error

// Part 4: parentheses make nullish fallback happen before comparison.
type _13 = Expect<Equal<Parameters<typeof isBelowMaximum>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof isBelowMaximum>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<NonNullable<Parameters<typeof isBelowMaximum>[1]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<Parameters<typeof isBelowMaximum>[1], undefined>, TODO>>; // TODO(koan) @koan-error

// Part 5: diagnostics are distinct from deliberate constant guards.
type _17 = Expect<Equal<Parameters<typeof classifySyntacticCheck>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof classifySyntacticCheck>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<SyntacticCheckKind, `${string}truthy`>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Exclude<SyntacticCheckKind, "allowed-constant">, TODO>>; // TODO(koan) @koan-error
