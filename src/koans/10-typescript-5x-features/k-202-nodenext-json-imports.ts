import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 202 - VALIDATED JSON IMPORTS IN NodeNext
 * ==============================================
 *
 * Node's ESM loader gives JSON modules a specific runtime contract. Under
 * `module: "nodenext"`, TypeScript 5.7 validates that contract instead of
 * accepting import shapes that Node would reject.
 *
 * First, an ESM JSON import needs `with { type: "json" }`. Second, JSON has one
 * default export. A default import reads the value directly; a namespace import
 * reads it through `.default`; named imports are not synthesized from object
 * properties.
 *
 * Read this as module-shape validation, not JSON-schema validation. TypeScript
 * can infer the contents of a resolved JSON file, but the attribute and default
 * export rules answer how Node exposes that value.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html#validated-json-imports-in---module-nodenext
 */

export type JsonImportForm = "default" | "namespace" | "named";
export type JsonAttributeState = "present" | "missing";
export type JsonAccessForm = "direct-default" | "namespace-default" | "named";
export type JsonImportCheck =
  | "valid"
  | "missing-json-attribute"
  | "default-export-only";

export interface NodeNextJsonImportCase {
  form: JsonImportForm;
  attribute: JsonAttributeState;
  access: JsonAccessForm;
}

export interface JsonModuleNamespace<Value> {
  default: Value;
}

export function validateNodeNextJsonImport(
  entry: NodeNextJsonImportCase,
): JsonImportCheck {
  if (entry.attribute === "missing") return "missing-json-attribute";
  if (
    (entry.form === "default" && entry.access === "direct-default") ||
    (entry.form === "namespace" && entry.access === "namespace-default")
  ) {
    return "valid";
  }
  return "default-export-only";
}

export function jsonImportAttributes(): { readonly type: "json" } {
  return { type: "json" };
}

export function unwrapJsonModule<Value>(
  namespace: JsonModuleNamespace<Value>,
): Value {
  return namespace.default;
}

export const nodeNextJsonCases = [
  { form: "default", attribute: "present", access: "direct-default" },
  { form: "namespace", attribute: "present", access: "namespace-default" },
  { form: "default", attribute: "missing", access: "direct-default" },
  { form: "named", attribute: "present", access: "named" },
] as const satisfies readonly NodeNextJsonImportCase[];

// Part 1: describe import syntax and compiler outcomes.
type _01 = Expect<Equal<JsonImportForm, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<JsonAttributeState, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<JsonAccessForm, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<JsonImportCheck, TODO>>; // TODO(koan) @koan-error

// Part 2: the case separates form, attribute, and access.
type _05 = Expect<Equal<NodeNextJsonImportCase["form"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<NodeNextJsonImportCase["attribute"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<NodeNextJsonImportCase["access"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof NodeNextJsonImportCase, TODO>>; // TODO(koan) @koan-error

// Part 3: literal cases retain each rule violation.
type _09 = Expect<Equal<typeof nodeNextJsonCases["length"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof nodeNextJsonCases[number]["form"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof nodeNextJsonCases[2]["attribute"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof nodeNextJsonCases[3]["form"], TODO>>; // TODO(koan) @koan-error

// Part 4: JSON attributes and namespaces have precise shapes.
type _13 = Expect<Equal<ReturnType<typeof jsonImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof jsonImportAttributes>["type"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<JsonModuleNamespace<{ version: number }>["default"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<keyof JsonModuleNamespace<unknown>, TODO>>; // TODO(koan) @koan-error

// Part 5: validation and unwrapping are separate operations.
type _17 = Expect<Equal<Parameters<typeof validateNodeNextJsonImport>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof validateNodeNextJsonImport>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof unwrapJsonModule>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof unwrapJsonModule>, TODO>>; // TODO(koan) @koan-error
