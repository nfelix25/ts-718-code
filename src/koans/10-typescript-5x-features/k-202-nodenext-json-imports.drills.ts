import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type JsonAccessForm,
  type JsonAttributeState,
  type JsonImportCheck,
  type JsonImportForm,
  type JsonModuleNamespace,
  type NodeNextJsonImportCase,
  jsonImportAttributes,
  nodeNextJsonCases,
  unwrapJsonModule,
  validateNodeNextJsonImport,
} from "./k-202-nodenext-json-imports.js";

/** GUIDED DRILLS: repeat form/attribute/access dimensions, conditional validation, literal case extraction, default-only namespace shapes, attribute records, generic unwrapping, and structural assignability. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Check<
  Form extends JsonImportForm,
  Attribute extends JsonAttributeState,
  Access extends JsonAccessForm,
> =
  Attribute extends "missing"
    ? "missing-json-attribute"
    : Form extends "default"
      ? Access extends "direct-default"
        ? "valid"
        : "default-export-only"
      : Form extends "namespace"
        ? Access extends "namespace-default"
          ? "valid"
          : "default-export-only"
        : "default-export-only";
type CaseFor<Form extends JsonImportForm> =
  Extract<typeof nodeNextJsonCases[number], { form: Form }>;

// 1. Import forms and attributes (1-10)
type _01 = Expect<Equal<JsonImportForm, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<JsonImportForm, "default">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<JsonImportForm, "namespace">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<JsonImportForm, "named">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Exclude<JsonImportForm, "named">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<JsonAttributeState, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<JsonAttributeState, "present">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Exclude<JsonAttributeState, "present">, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<JsonImportForm, string>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<JsonAttributeState, string>, TODO>>; // TODO(koan) @koan-error

// 2. Access forms and checks (11-20)
type _11 = Expect<Equal<JsonAccessForm, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<JsonAccessForm, `${string}default`>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extract<JsonAccessForm, "named">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<JsonImportCheck, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<JsonImportCheck, "valid">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<JsonImportCheck, `${string}attribute`>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<JsonImportCheck, `${string}only`>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<JsonImportCheck, "valid">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<JsonAccessForm, string>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<JsonImportCheck, string>, TODO>>; // TODO(koan) @koan-error

// 3. Conditional rule matrix (21-32)
type _21 = Expect<Equal<Check<"default", "present", "direct-default">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Check<"default", "missing", "direct-default">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Check<"default", "present", "named">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Check<"namespace", "present", "namespace-default">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Check<"namespace", "missing", "namespace-default">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Check<"namespace", "present", "direct-default">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Check<"named", "present", "named">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Check<"named", "missing", "named">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Check<JsonImportForm, "present", "direct-default">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Check<"default", JsonAttributeState, "direct-default">, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Check<"namespace", "present", JsonAccessForm>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Check<JsonImportForm, JsonAttributeState, JsonAccessForm>, TODO>>; // TODO(koan) @koan-error

// 4. Literal case matrix (33-44)
type _33 = Expect<Equal<typeof nodeNextJsonCases["length"], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<typeof nodeNextJsonCases[0]["form"], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<typeof nodeNextJsonCases[0]["attribute"], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<typeof nodeNextJsonCases[0]["access"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<typeof nodeNextJsonCases[1]["form"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<typeof nodeNextJsonCases[1]["access"], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<typeof nodeNextJsonCases[2]["attribute"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<typeof nodeNextJsonCases[3]["form"], TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<CaseFor<"default">, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<CaseFor<"namespace">, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<CaseFor<"named">, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<typeof nodeNextJsonCases[number]["form"], TODO>>; // TODO(koan) @koan-error

// 5. Attribute and namespace shapes (45-53)
type Config = { version: number; name: string };
type ConfigModule = JsonModuleNamespace<Config>;
type _45 = Expect<Equal<ReturnType<typeof jsonImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<ReturnType<typeof jsonImportAttributes>["type"], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<keyof ReturnType<typeof jsonImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<ConfigModule["default"], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<ConfigModule["default"]["version"], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<ConfigModule["default"]["name"], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<keyof ConfigModule, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<JsonModuleNamespace<unknown>["default"], TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<JsonModuleNamespace<never>["default"], TODO>>; // TODO(koan) @koan-error

// 6. Runtime model helpers (54-60)
type _54 = Expect<Equal<Parameters<typeof validateNodeNextJsonImport>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<typeof validateNodeNextJsonImport>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Parameters<typeof unwrapJsonModule<Config>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReturnType<typeof unwrapJsonModule<Config>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<typeof unwrapJsonModule<unknown>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<ConfigModule, JsonModuleNamespace<unknown>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<NodeNextJsonImportCase, { form: JsonImportForm }>, TODO>>; // TODO(koan) @koan-error
