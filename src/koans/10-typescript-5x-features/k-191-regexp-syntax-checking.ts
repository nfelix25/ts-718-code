import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 191 - REGEXP LITERAL SYNTAX CHECKING
 * ==========================================
 *
 * TypeScript 5.5 began parsing regular-expression literals deeply enough to
 * diagnose unmatched delimiters, invalid flags, missing numeric or named
 * capture groups, and features newer than the configured ECMAScript target.
 *
 * Read the feature as "the compiler validates literal regex syntax while it
 * parses this source file." TypeScript does not downlevel regex semantics and
 * does not perform the same validation on a string passed to `new RegExp`.
 *
 * The valid literals below are executable examples. Invalid examples are kept
 * as strings in a diagnostic matrix so this learner packet fails only through
 * its intended koan assertions. A real invalid literal would be an unsolvable
 * syntax diagnostic, not a TODO.
 *
 * Compiler diagnostic ownership: TypeScript 5.5.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#regular-expression-syntax-checking
 */

export const identifierPattern = /^[A-Za-z_$][\w$]*$/u;
export const assignmentPattern =
  /^(?<key>[A-Za-z_$][\w$]*)=(?<value>.*)$/u;
export const repeatedWordPattern = /\b(\w+)\s+\1\b/iu;

export type RegexDiagnosticKind =
  | "unexpected-token"
  | "missing-group"
  | "invalid-flag"
  | "target-too-old"
  | "valid";

export interface RegexCase {
  source: string;
  flags: string;
  expected: RegexDiagnosticKind;
}

export const regexCases: readonly RegexCase[] = [
  { source: "(unclosed", flags: "u", expected: "unexpected-token" },
  { source: "(a)\\2", flags: "u", expected: "missing-group" },
  { source: "(?<name>a)\\k<missing>", flags: "u", expected: "missing-group" },
  { source: "a", flags: "z", expected: "invalid-flag" },
  { source: "(?<name>a)", flags: "u", expected: "valid" },
];

export function parseAssignment(
  input: string,
): { key: string; value: string } | null {
  const match = assignmentPattern.exec(input);
  if (!match?.groups) return null;
  return {
    key: match.groups["key"]!,
    value: match.groups["value"]!,
  };
}

export function compileDynamicPattern(
  source: string,
  flags = "",
): RegExp {
  return new RegExp(source, flags);
}

// Part 1: literals have the ordinary RegExp runtime type.
type _01 = Expect<Equal<typeof identifierPattern, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof assignmentPattern, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<typeof repeatedWordPattern, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<InstanceType<typeof RegExp>, TODO>>; // TODO(koan) @koan-error

// Part 2: match APIs retain nullable and capture-group surfaces.
type _05 = Expect<Equal<ReturnType<typeof assignmentPattern.exec>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<NonNullable<ReturnType<typeof assignmentPattern.exec>>["groups"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<typeof identifierPattern.test>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<typeof repeatedWordPattern.test>, TODO>>; // TODO(koan) @koan-error

// Part 3: the diagnostic matrix separates compiler failure categories.
type _09 = Expect<Equal<RegexDiagnosticKind, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<RegexCase["source"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<RegexCase["flags"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<RegexCase["expected"], TODO>>; // TODO(koan) @koan-error

// Part 4: parsed named groups require ordinary null/undefined checks.
type _13 = Expect<Equal<Parameters<typeof parseAssignment>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof parseAssignment>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<NonNullable<ReturnType<typeof parseAssignment>>["key"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<NonNullable<ReturnType<typeof parseAssignment>>["value"], TODO>>; // TODO(koan) @koan-error

// Part 5: dynamic construction is typed but its string is not compiler-parsed.
type _17 = Expect<Equal<Parameters<typeof compileDynamicPattern>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof compileDynamicPattern>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ConstructorParameters<typeof RegExp>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<typeof regexCases[number], TODO>>; // TODO(koan) @koan-error
