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

/** EDGE CASES: erasable does not mean type-correct, JavaScript syntax and runtime support still matter, ambient/type-only namespaces differ from runtime namespaces, const enum still belongs to the enum family, assertions disappear without validation, verbatimModuleSyntax protects module intent, and the flag checks syntax rather than executing Node's stripper. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations of native-JavaScript replacements.
type _DemoDirection = Expect<Equal<Direction, "up" | "down" | "left" | "right">>;
type _DemoPoint = Expect<Equal<keyof Point, "x" | "y">>;
type _DemoClassifier = Expect<Equal<ReturnType<typeof classifyErasability>, ErasabilityCheck>>;
type _DemoCases = Expect<Equal<typeof erasabilityCases["length"], 5>>;

// 1. Erasure is not validation (1-7)
type _01 = Expect<Equal<Extract<SyntaxTransformKind, "type-assertion">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<SyntaxTransformKind, "type-annotation">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<SyntaxTransformKind, "interface">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<"type-assertion", SyntaxTransformKind>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<"type-assertion", "erasable">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof classifyErasability>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof classifyErasability>[0], TODO>>; // TODO(koan) @koan-error

// 2. Closed syntax models and unlisted variants (8-14)
type _08 = Expect<Equal<IsBroadString<SyntaxTransformKind>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extract<SyntaxTransformKind, "const-enum">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<IsNever<Extract<SyntaxTransformKind, "const-enum">>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<SyntaxTransformKind, "ambient-namespace">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsNever<Extract<SyntaxTransformKind, "ambient-namespace">>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Exclude<SyntaxTransformKind, SyntaxTransformKind>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsNever<Exclude<SyntaxTransformKind, SyntaxTransformKind>>, TODO>>; // TODO(koan) @koan-error

// 3. Runtime replacements have both value and type surfaces (15-21)
type _15 = Expect<Equal<typeof DirectionValues, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Direction, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<keyof typeof DirectionValues, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ConstructorParameters<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<InstanceType<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof InstanceType<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<Direction, string>, TODO>>; // TODO(koan) @koan-error

// 4. Case data is a policy model, not a parser (22-26)
type _22 = Expect<Equal<typeof erasabilityCases[number]["syntax"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<typeof erasabilityCases[number]["check"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ErasabilityCase["syntax"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ErasabilityCase["check"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof ErasabilityCase, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom relationships (27-30)
type _27 = Expect<Equal<Extends<never, ErasabilityCase>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, ErasabilityCase>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<ErasabilityCase, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsNever<Extract<ErasabilityCheck, never>>, TODO>>; // TODO(koan) @koan-error
