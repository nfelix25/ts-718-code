import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type JsonImportCheck,
  type JsonImportForm,
  type JsonModuleNamespace,
  type NodeNextJsonImportCase,
  jsonImportAttributes,
  nodeNextJsonCases,
  unwrapJsonModule,
  validateNodeNextJsonImport,
} from "./k-202-nodenext-json-imports.js";

/** EDGE CASES: validation is NodeNext-specific, attributes govern loading rather than JSON shape, namespace imports expose `.default`, object properties do not become named module exports, dynamic/import tooling still needs host support, resolveJsonModule concerns content typing, and the lesson model does not load a file. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations of the default-only module shape.
type _DemoNamespaceKey = Expect<Equal<keyof JsonModuleNamespace<{ version: number }>, "default">>;
type _DemoAttribute = Expect<Equal<ReturnType<typeof jsonImportAttributes>, { readonly type: "json" }>>;
type _DemoCheck = Expect<Equal<ReturnType<typeof validateNodeNextJsonImport>, JsonImportCheck>>;
type _DemoCases = Expect<Equal<typeof nodeNextJsonCases["length"], 4>>;

// 1. Object keys are not module export names (1-7)
type Payload = { version: number; nested: { enabled: boolean } };
type Namespace = JsonModuleNamespace<Payload>;
type _01 = Expect<Equal<keyof Payload, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof Namespace, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<keyof Namespace, "version">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsNever<Extract<keyof Namespace, "version">>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Namespace["default"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Namespace["default"]["version"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Namespace["default"]["nested"]["enabled"], TODO>>; // TODO(koan) @koan-error

// 2. Attribute presence does not validate payload schema (8-14)
type Attribute = ReturnType<typeof jsonImportAttributes>;
type _08 = Expect<Equal<Attribute["type"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<keyof Attribute, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Attribute, { type: string }>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Attribute, { schema: unknown }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<JsonModuleNamespace<unknown>["default"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<JsonModuleNamespace<never>["default"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsNever<JsonModuleNamespace<never>["default"]>, TODO>>; // TODO(koan) @koan-error

// 3. Closed import vocabulary and impossible forms (15-21)
type _15 = Expect<Equal<IsBroadString<JsonImportForm>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<JsonImportForm, "require">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<IsNever<Extract<JsonImportForm, "require">>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<JsonImportForm, JsonImportForm>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsNever<Exclude<JsonImportForm, JsonImportForm>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<"default", JsonImportForm>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<string, JsonImportForm>, TODO>>; // TODO(koan) @koan-error

// 4. Helpers model validation and default access only (22-26)
type _22 = Expect<Equal<Parameters<typeof validateNodeNextJsonImport>[0], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<typeof validateNodeNextJsonImport>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof unwrapJsonModule<Payload>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof unwrapJsonModule<Payload>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof NodeNextJsonImportCase, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom relationships (27-30)
type _27 = Expect<Equal<Extends<never, NodeNextJsonImportCase>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, NodeNextJsonImportCase>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<NodeNextJsonImportCase, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsNever<Extract<JsonImportCheck, never>>, TODO>>; // TODO(koan) @koan-error
