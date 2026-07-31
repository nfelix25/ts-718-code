import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 199 - NEVER-INITIALIZED VARIABLES
 * =======================================
 *
 * Definite-assignment analysis asks whether a local has a value before it is
 * read. Within one control-flow graph, TypeScript already catches branches that
 * forget an assignment. Nested functions are harder because the checker does
 * not know when the closure will run, so it historically took an optimistic
 * view when a captured variable might be assigned.
 *
 * TypeScript 5.7 adds a firm lower bound: if a captured local has no assignment
 * anywhere, optimism cannot help. A read in the nested function is now a
 * "used before being assigned" error. A possible assignment still retains the
 * lenient closure behavior; this feature does not solve arbitrary call timing.
 *
 * Invalid examples are modeled as data so only learner assertions fail. The
 * executable examples show the durable fixes: initialize immediately, pass the
 * value into the closure, or represent absence in the type and handle it.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html#checks-for-never-initialized-variables
 */

export type AssignmentEvidence =
  | "none"
  | "conditional"
  | "definite"
  | "initializer";

export type ReadLocation = "same-scope" | "nested-function";

export type InitializationCheck =
  | "used-before-assigned"
  | "closure-optimistic"
  | "safe";

export interface InitializationCase<
  Evidence extends AssignmentEvidence = AssignmentEvidence,
  Location extends ReadLocation = ReadLocation,
> {
  evidence: Evidence;
  location: Location;
}

export function classifyInitialization(
  entry: InitializationCase,
): InitializationCheck {
  if (entry.evidence === "definite" || entry.evidence === "initializer") {
    return "safe";
  }
  if (entry.evidence === "conditional" && entry.location === "nested-function") {
    return "closure-optimistic";
  }
  return "used-before-assigned";
}

export function createResultPrinter(value: number): () => string {
  return () => `result:${value}`;
}

export function createOptionalPrinter(
  value: number | undefined,
): () => string {
  return () => value === undefined ? "result:missing" : `result:${value}`;
}

export const initializationCases = [
  { evidence: "none", location: "nested-function" },
  { evidence: "conditional", location: "nested-function" },
  { evidence: "conditional", location: "same-scope" },
  { evidence: "initializer", location: "nested-function" },
] as const satisfies readonly InitializationCase[];

// Part 1: name evidence, read sites, and outcomes.
type _01 = Expect<Equal<AssignmentEvidence, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReadLocation, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<InitializationCheck, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Exclude<InitializationCheck, "safe">, TODO>>; // TODO(koan) @koan-error

// Part 2: the case model keeps assignment and read facts separate.
type _05 = Expect<Equal<InitializationCase["evidence"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<InitializationCase["location"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof InitializationCase, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<InitializationCase<"none", "nested-function">, TODO>>; // TODO(koan) @koan-error

// Part 3: literal cases preserve the 5.7 boundary.
type _09 = Expect<Equal<typeof initializationCases["length"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof initializationCases[number]["evidence"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof initializationCases[0]["evidence"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof initializationCases[1]["evidence"], TODO>>; // TODO(koan) @koan-error

// Part 4: classification remains a compiler-policy model.
type _13 = Expect<Equal<Parameters<typeof classifyInitialization>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof classifyInitialization>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<InitializationCheck, `${string}assigned`>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<InitializationCheck, `${string}optimistic`>, TODO>>; // TODO(koan) @koan-error

// Part 5: fixes make value availability explicit.
type _17 = Expect<Equal<Parameters<typeof createResultPrinter>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof createResultPrinter>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof createOptionalPrinter>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<ReturnType<typeof createOptionalPrinter>>, TODO>>; // TODO(koan) @koan-error
