import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type Direction,
  type ErasabilityCase,
  type ErasabilityCheck,
  type SyntaxTransformKind,
  Direction as DirectionValues,
  Point,
  classifyErasability,
  erasabilityCases,
} from "./k-205-erasable-syntax-only.js";

/** GUIDED DRILLS: repeat erasable and transformed syntax families, conditional classification, literal case extraction, enum-object replacement, explicit class-field replacement, and structural/runtime relationships. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Check<Syntax extends SyntaxTransformKind> =
  Syntax extends
    | "enum"
    | "runtime-namespace"
    | "parameter-property"
    | "import-equals"
    | "export-equals"
    ? "requires-transform"
    : "erasable";
type CasesWith<Result extends ErasabilityCheck> =
  Extract<typeof erasabilityCases[number], { check: Result }>;

// 1. Erasable syntax family (1-10)
type _01 = Expect<Equal<Extract<SyntaxTransformKind, "type-annotation">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<SyntaxTransformKind, "interface">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<SyntaxTransformKind, "type-alias">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<SyntaxTransformKind, "type-only-import">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<SyntaxTransformKind, "type-assertion">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<SyntaxTransformKind, "generic-parameter">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<SyntaxTransformKind, `type-${string}`>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<SyntaxTransformKind, `${string}parameter`>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Check<"type-annotation">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Check<"generic-parameter">, TODO>>; // TODO(koan) @koan-error

// 2. Transform-requiring syntax family (11-21)
type _11 = Expect<Equal<Extract<SyntaxTransformKind, "enum">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<SyntaxTransformKind, "runtime-namespace">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extract<SyntaxTransformKind, "parameter-property">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<SyntaxTransformKind, "import-equals">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<SyntaxTransformKind, "export-equals">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<SyntaxTransformKind, `${string}equals`>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Check<"enum">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Check<"runtime-namespace">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Check<"parameter-property">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Check<"import-equals">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Check<"export-equals">, TODO>>; // TODO(koan) @koan-error

// 3. Outcome and distributive classification (22-31)
type _22 = Expect<Equal<ErasabilityCheck, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extract<ErasabilityCheck, "erasable">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Exclude<ErasabilityCheck, "erasable">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Check<"enum" | "interface">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Check<"type-alias" | "type-only-import">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Check<"enum" | "parameter-property">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Check<SyntaxTransformKind>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<Check<SyntaxTransformKind>, ErasabilityCheck>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<ErasabilityCheck, string>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<keyof ErasabilityCase, TODO>>; // TODO(koan) @koan-error

// 4. Literal case matrix (32-42)
type _32 = Expect<Equal<typeof erasabilityCases["length"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<typeof erasabilityCases[0]["syntax"], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<typeof erasabilityCases[0]["check"], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<typeof erasabilityCases[1]["syntax"], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<typeof erasabilityCases[1]["check"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<typeof erasabilityCases[2]["syntax"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<typeof erasabilityCases[2]["check"], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<typeof erasabilityCases[number]["syntax"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<typeof erasabilityCases[number]["check"], TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<CasesWith<"erasable">, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<CasesWith<"requires-transform">["syntax"], TODO>>; // TODO(koan) @koan-error

// 5. Const-object enum replacement (43-51)
type _43 = Expect<Equal<keyof typeof DirectionValues, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Direction, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<typeof DirectionValues.Up, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<typeof DirectionValues.Down, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<typeof DirectionValues.Left, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<typeof DirectionValues.Right, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<typeof DirectionValues[keyof typeof DirectionValues], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extract<Direction, "up">, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Exclude<Direction, "up">, TODO>>; // TODO(koan) @koan-error

// 6. Explicit fields and classifier (52-60)
type _52 = Expect<Equal<ConstructorParameters<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<InstanceType<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<keyof InstanceType<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<InstanceType<typeof Point>["x"], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<InstanceType<typeof Point>["y"], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<InstanceType<typeof Point>, { x: number; y: number }>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Parameters<typeof classifyErasability>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ReturnType<typeof classifyErasability>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<ReturnType<typeof classifyErasability>, ErasabilityCheck>, TODO>>; // TODO(koan) @koan-error
