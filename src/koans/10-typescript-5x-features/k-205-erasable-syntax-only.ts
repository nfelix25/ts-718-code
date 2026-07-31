import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 205 - ERASABLE SYNTAX ONLY
 * ================================
 *
 * Native type-stripping runtimes remove TypeScript syntax but do not perform
 * TypeScript-specific JavaScript transforms. A type annotation can disappear;
 * an enum cannot, because TypeScript normally creates a runtime object for it.
 *
 * TypeScript 5.8's `erasableSyntaxOnly` option diagnoses constructs whose
 * TypeScript syntax has runtime behavior: enums, namespaces with runtime code,
 * parameter properties, and legacy `import =` / `export =` assignments.
 *
 * Read the rule as "after deleting type-only syntax, valid JavaScript with the
 * intended runtime behavior must remain." Pair it with
 * `verbatimModuleSyntax` so import syntax and type-only markers are preserved
 * deliberately rather than changed by import elision.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html#the---erasablesyntaxonly-option
 */

export type SyntaxTransformKind =
  | "type-annotation"
  | "interface"
  | "type-alias"
  | "type-only-import"
  | "type-assertion"
  | "generic-parameter"
  | "enum"
  | "runtime-namespace"
  | "parameter-property"
  | "import-equals"
  | "export-equals";

export type ErasabilityCheck = "erasable" | "requires-transform";

export interface ErasabilityCase<
  Syntax extends SyntaxTransformKind = SyntaxTransformKind,
  Check extends ErasabilityCheck = ErasabilityCheck,
> {
  syntax: Syntax;
  check: Check;
}

export function classifyErasability(
  syntax: SyntaxTransformKind,
): ErasabilityCheck {
  switch (syntax) {
    case "enum":
    case "runtime-namespace":
    case "parameter-property":
    case "import-equals":
    case "export-equals":
      return "requires-transform";
    default:
      return "erasable";
  }
}

export const Direction = {
  Up: "up",
  Down: "down",
  Left: "left",
  Right: "right",
} as const;

export type Direction = typeof Direction[keyof typeof Direction];

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export const erasabilityCases = [
  { syntax: "type-annotation", check: "erasable" },
  { syntax: "type-only-import", check: "erasable" },
  { syntax: "enum", check: "requires-transform" },
  { syntax: "runtime-namespace", check: "requires-transform" },
  { syntax: "parameter-property", check: "requires-transform" },
] as const satisfies readonly ErasabilityCase[];

// Part 1: classify strip-safe and transform-requiring syntax.
type _01 = Expect<Equal<SyntaxTransformKind, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ErasabilityCheck, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<ErasabilityCheck, "erasable">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Exclude<ErasabilityCheck, "erasable">, TODO>>; // TODO(koan) @koan-error

// Part 2: case data separates syntax from policy.
type _05 = Expect<Equal<ErasabilityCase["syntax"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ErasabilityCase["check"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof ErasabilityCase, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof erasabilityCases[number]["check"], TODO>>; // TODO(koan) @koan-error

// Part 3: a JavaScript-native object replaces an enum.
type _09 = Expect<Equal<keyof typeof Direction, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Direction, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof Direction.Up, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof Direction[keyof typeof Direction], TODO>>; // TODO(koan) @koan-error

// Part 4: explicit fields replace parameter properties.
type _13 = Expect<Equal<ConstructorParameters<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<InstanceType<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<InstanceType<typeof Point>["x"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<keyof InstanceType<typeof Point>, TODO>>; // TODO(koan) @koan-error

// Part 5: the classifier models the compiler option.
type _17 = Expect<Equal<Parameters<typeof classifyErasability>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof classifyErasability>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<SyntaxTransformKind, `${string}property`>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<SyntaxTransformKind, `${string}equals`>, TODO>>; // TODO(koan) @koan-error
