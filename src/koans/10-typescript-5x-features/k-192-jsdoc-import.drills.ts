import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type JSDocImport,
  type JSDocImportKind,
  type JSDocImportRuntimeEffect,
  type JSDocImportScope,
  type JSDocNamedImport,
  type JSDocNamespaceImport,
  defineNamedImport,
  defineNamespaceImport,
  namedModelImport,
  namespaceModelImport,
  referenceImportedType,
  renderJSDocImport,
} from "./k-192-jsdoc-import.js";

/** GUIDED DRILLS: repeat the type-space/runtime-space distinction through discriminants, literal-preserving builders, module/name extraction, generic instantiation, union filtering, rendering APIs, and assignability. */

type Extends<From, To> = [From] extends [To] ? true : false;
type ModuleOf<Spec> = Spec extends { from: infer Module } ? Module : never;
type NamesOf<Spec> = Spec extends JSDocNamedImport<string, infer Names>
  ? Names[number]
  : never;
type AliasOf<Spec> = Spec extends JSDocNamespaceImport<string, infer Alias>
  ? Alias
  : never;

const named = defineNamedImport("./domain.js", "Order", "OrderId", "Money");
const namespace = defineNamespaceImport("./domain.js", "domain");
const emptyNamed = defineNamedImport("./empty.js");

// 1. Core vocabulary (1-8)
type _01 = Expect<Equal<JSDocImportKind, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<JSDocImportKind, "named">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Exclude<JSDocImportKind, "named">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<JSDocImportScope, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<JSDocImportRuntimeEffect, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<JSDocImport["kind"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<JSDocImport, { kind: "named" }>["kind"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<JSDocImport, { kind: "namespace" }>["kind"], TODO>>; // TODO(koan) @koan-error

// 2. Named imports preserve each supplied literal (9-18)
type _09 = Expect<Equal<typeof named.kind, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof named.from, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof named.names, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof named.names[number], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<typeof named.names[0], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<typeof named.names[1], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<typeof named.names[2], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<keyof typeof named, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<NamesOf<typeof named>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ModuleOf<typeof named>, TODO>>; // TODO(koan) @koan-error

// 3. Namespace imports preserve a qualifier (19-27)
type _19 = Expect<Equal<typeof namespace.kind, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<typeof namespace.from, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<typeof namespace.alias, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof typeof namespace, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<AliasOf<typeof namespace>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ModuleOf<typeof namespace>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<NamesOf<typeof namespace>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<JSDocImport, { kind: "namespace" }>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Exclude<JSDocImport, { kind: "named" }>, TODO>>; // TODO(koan) @koan-error

// 4. Empty and broad named imports (28-35)
type _28 = Expect<Equal<typeof emptyNamed.names, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<typeof emptyNamed.names[number], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<NamesOf<typeof emptyNamed>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<JSDocNamedImport["from"], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<JSDocNamedImport["names"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<JSDocNamedImport["names"][number], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<JSDocNamespaceImport["from"], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<JSDocNamespaceImport["alias"], TODO>>; // TODO(koan) @koan-error

// 5. Generic instantiation reads aloud (36-43)
type _36 = Expect<Equal<JSDocNamedImport<"./a.js", readonly ["A"]>["from"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<JSDocNamedImport<"./a.js", readonly ["A"]>["names"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<NamesOf<JSDocNamedImport<"./a.js", readonly ["A", "B"]>>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ModuleOf<JSDocNamedImport<"./a.js", readonly ["A"]>>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<JSDocNamespaceImport<"./a.js", "a">["alias"], TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<AliasOf<JSDocNamespaceImport<"./a.js", "a">>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ModuleOf<JSDocNamespaceImport<"./a.js", "a">>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ModuleOf<JSDocImport>, TODO>>; // TODO(koan) @koan-error

// 6. Function surfaces (44-52)
type _44 = Expect<Equal<Parameters<typeof renderJSDocImport>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<ReturnType<typeof renderJSDocImport>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Parameters<typeof referenceImportedType>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<ReturnType<typeof referenceImportedType>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<typeof defineNamespaceImport>[0], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Parameters<typeof defineNamespaceImport>[1], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<ReturnType<typeof defineNamespaceImport>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<typeof defineNamedImport>[0], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<typeof defineNamedImport>, TODO>>; // TODO(koan) @koan-error

// 7. Assignability and shipped examples (53-60)
type _53 = Expect<Equal<Extends<typeof named, JSDocNamedImport>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extends<typeof namespace, JSDocNamespaceImport>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Extends<typeof named, JSDocImport>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extends<typeof namespace, JSDocImport>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<JSDocNamedImport, JSDocNamespaceImport>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<typeof namedModelImport.names[number], TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<typeof namespaceModelImport.alias, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ModuleOf<typeof namedModelImport | typeof namespaceModelImport>, TODO>>; // TODO(koan) @koan-error
