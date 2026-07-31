import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type RegexCase,
  type RegexDiagnosticKind,
  assignmentPattern,
  compileDynamicPattern,
  regexCases,
} from "./k-191-regexp-syntax-checking.js";

/** EDGE CASES: only literal syntax is compiler-parsed, constructors defer invalid strings to runtime, target controls newer features, captures remain broadly typed rather than pattern-specific, missing groups are possible, global/sticky regexes mutate lastIndex, and diagnostic categories are compiler behavior rather than RegExp types. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;

// Pre-solved diagnostic cases kept as data rather than invalid source syntax.
type _DemoCases = Expect<Equal<typeof regexCases[number], RegexCase>>;
type _DemoExecNullable = Expect<Equal<ReturnType<typeof assignmentPattern.exec>, RegExpExecArray | null>>;
type _DemoDynamicTyped = Expect<Equal<ReturnType<typeof compileDynamicPattern>, RegExp>>;
type _DemoOpenGroups = Expect<Equal<NonNullable<RegExpExecArray["groups"]>[string], string>>;

// 1. Literal checking does not refine the RegExp instance type (1-8)
type _01 = Expect<Equal<typeof assignmentPattern, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<typeof assignmentPattern.exec>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<NonNullable<ReturnType<typeof assignmentPattern.exec>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<NonNullable<ReturnType<typeof assignmentPattern.exec>>[number], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<NonNullable<ReturnType<typeof assignmentPattern.exec>>["groups"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<NonNullable<NonNullable<ReturnType<typeof assignmentPattern.exec>>["groups"]>[string], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<RegExp["lastIndex"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<RegExp["global"], TODO>>; // TODO(koan) @koan-error

// 2. Dynamic construction remains runtime validation (9-15)
type _09 = Expect<Equal<Parameters<typeof compileDynamicPattern>[0], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<typeof compileDynamicPattern>[1], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof compileDynamicPattern>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ConstructorParameters<typeof RegExp>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<InstanceType<typeof RegExp>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<string, Parameters<typeof compileDynamicPattern>[0]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<RegExp, ReturnType<typeof compileDynamicPattern>>, TODO>>; // TODO(koan) @koan-error

// 3. Diagnostic categories are an external compiler matrix (16-22)
type _16 = Expect<Equal<RegexDiagnosticKind, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Exclude<RegexDiagnosticKind, "valid">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<RegexDiagnosticKind, "target-too-old">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<RegexCase["expected"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<typeof regexCases[number]["expected"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<keyof RegexCase, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Required<Partial<RegexCase>>, TODO>>; // TODO(koan) @koan-error

// 4. Bottom/unknown and capture openness (23-30)
type _23 = Expect<Equal<IsNever<Extract<RegexDiagnosticKind, "other">>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<never, RegexDiagnosticKind>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<unknown, RegexDiagnosticKind>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof RegExpExecArray, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<RegExpExecArray[number], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<RegExpExecArray["groups"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<NonNullable<RegExpExecArray["groups"]>[string], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extract<ReturnType<RegExp["exec"]>, null>, TODO>>; // TODO(koan) @koan-error
