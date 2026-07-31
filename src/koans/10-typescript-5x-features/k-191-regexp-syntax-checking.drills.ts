import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type RegexCase,
  type RegexDiagnosticKind,
  assignmentPattern,
  compileDynamicPattern,
  identifierPattern,
  parseAssignment,
  regexCases,
  repeatedWordPattern,
} from "./k-191-regexp-syntax-checking.js";

/** GUIDED DRILLS: repeat RegExp instance/member types, nullable exec results, capture arrays/groups, diagnostic categories, valid feature families, target sensitivity, dynamic constructor signatures, and parser helper results. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Match = NonNullable<ReturnType<RegExp["exec"]>>;
type Groups = NonNullable<Match["groups"]>;

// RegExp surface (1-12)
type _01 = Expect<Equal<typeof identifierPattern, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof assignmentPattern, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<typeof repeatedWordPattern, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof RegExp, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<RegExp["source"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<RegExp["flags"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<RegExp["global"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<RegExp["unicode"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Parameters<RegExp["test"]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<RegExp["test"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<RegExp["exec"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<RegExp["exec"]>, TODO>>; // TODO(koan) @koan-error

// Match and group structures (13-24)
type _13 = Expect<Equal<Match, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Match[number], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Match["index"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Match["input"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Match["groups"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Groups, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Groups[string], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof Groups, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Exclude<ReturnType<RegExp["exec"]>, null>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extract<ReturnType<RegExp["exec"]>, null>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<NonNullable<Match["groups"]>[string], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Match["length"], TODO>>; // TODO(koan) @koan-error

// Diagnostic matrix (25-36)
type _25 = Expect<Equal<RegexDiagnosticKind, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<RegexDiagnosticKind, "valid">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Exclude<RegexDiagnosticKind, "valid">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<keyof RegexCase, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<RegexCase["source"], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<RegexCase["flags"], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<RegexCase["expected"], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<typeof regexCases, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<typeof regexCases[number], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extends<typeof regexCases[number], RegexCase>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Readonly<RegexCase>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Partial<RegexCase>["expected"], TODO>>; // TODO(koan) @koan-error

// Parse helper (37-48)
type Parsed = NonNullable<ReturnType<typeof parseAssignment>>;
type _37 = Expect<Equal<Parameters<typeof parseAssignment>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Parameters<typeof parseAssignment>[0], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ReturnType<typeof parseAssignment>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Parsed, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<keyof Parsed, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Parsed["key"], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Parsed["value"], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Extract<ReturnType<typeof parseAssignment>, null>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Exclude<ReturnType<typeof parseAssignment>, null>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Record<"key" | "value", string>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extends<Parsed, object>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Extends<object, Parsed>, TODO>>; // TODO(koan) @koan-error

// Dynamic constructor boundary (49-60)
type _49 = Expect<Equal<Parameters<typeof compileDynamicPattern>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Parameters<typeof compileDynamicPattern>[0], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<typeof compileDynamicPattern>[1], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<typeof compileDynamicPattern>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<ConstructorParameters<typeof RegExp>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<InstanceType<typeof RegExp>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Parameters<typeof RegExp>[0], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<ReturnType<typeof RegExp>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<ReturnType<typeof compileDynamicPattern>, RegExp>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<RegExp, object>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Awaited<ReturnType<typeof compileDynamicPattern>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<keyof ReturnType<typeof compileDynamicPattern>, TODO>>; // TODO(koan) @koan-error
