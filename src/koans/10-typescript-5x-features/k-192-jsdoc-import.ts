import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 192 - THE JSDOC @import TAG
 * =================================
 *
 * In a checked JavaScript file, I sometimes need a type from another module
 * without loading that module at runtime. A normal ECMAScript import is a
 * runtime operation. Before TypeScript 5.5, the runtime-free alternatives were
 * repeated `import("./module").Type` expressions or local `@typedef` aliases.
 *
 * TypeScript 5.5 added a JSDoc tag whose payload reads like an ECMAScript
 * import: "import these names from this module for type checking." Named and
 * namespace forms place names in the JavaScript file's type space, but the
 * entire declaration remains a comment and emits no runtime import.
 *
 * This TypeScript lesson models and renders those comment forms. The builders
 * preserve literal module names and imported names so the type assertions can
 * expose every moving part. The rendered strings belong in `.js` files checked
 * by TypeScript; they are not themselves module-loading operations.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#the-jsdoc-import-tag
 */

export type JSDocImportKind = "named" | "namespace";
export type JSDocImportScope = "file";
export type JSDocImportRuntimeEffect = "none";

export interface JSDocNamedImport<
  Module extends string = string,
  Names extends readonly string[] = readonly string[],
> {
  kind: "named";
  from: Module;
  names: Names;
}

export interface JSDocNamespaceImport<
  Module extends string = string,
  Alias extends string = string,
> {
  kind: "namespace";
  from: Module;
  alias: Alias;
}

export type JSDocImport =
  | JSDocNamedImport
  | JSDocNamespaceImport;

export function defineNamedImport<
  const Module extends string,
  const Names extends readonly string[],
>(
  from: Module,
  ...names: Names
): JSDocNamedImport<Module, Names> {
  return { kind: "named", from, names };
}

export function defineNamespaceImport<
  const Module extends string,
  const Alias extends string,
>(
  from: Module,
  alias: Alias,
): JSDocNamespaceImport<Module, Alias> {
  return { kind: "namespace", from, alias };
}

export function renderJSDocImport(spec: JSDocImport): string {
  if (spec.kind === "named") {
    return `/** @import { ${spec.names.join(", ")} } from "${spec.from}" */`;
  }
  return `/** @import * as ${spec.alias} from "${spec.from}" */`;
}

export function referenceImportedType(
  spec: JSDocImport,
  name: string,
): string {
  return spec.kind === "namespace" ? `${spec.alias}.${name}` : name;
}

export const namedModelImport = defineNamedImport(
  "./models.js",
  "User",
  "UserId",
);
export const namespaceModelImport = defineNamespaceImport(
  "./models.js",
  "models",
);

// Part 1: identify the two supported mental models.
type _01 = Expect<Equal<JSDocImportKind, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<JSDocImportScope, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<JSDocImportRuntimeEffect, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<JSDocImport["kind"], TODO>>; // TODO(koan) @koan-error

// Part 2: read a named import as module plus a tuple of type names.
type _05 = Expect<Equal<typeof namedModelImport.kind, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<typeof namedModelImport.from, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<typeof namedModelImport.names, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof namedModelImport.names[number], TODO>>; // TODO(koan) @koan-error

// Part 3: read a namespace import as module plus a type-space qualifier.
type _09 = Expect<Equal<typeof namespaceModelImport.kind, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof namespaceModelImport.from, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof namespaceModelImport.alias, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof typeof namespaceModelImport, TODO>>; // TODO(koan) @koan-error

// Part 4: builders preserve literals while renderers return runtime strings.
type _13 = Expect<Equal<Parameters<typeof defineNamedImport>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof defineNamedImport>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof renderJSDocImport>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof renderJSDocImport>, TODO>>; // TODO(koan) @koan-error

// Part 5: references differ, but both forms remain runtime-free comments.
type _17 = Expect<Equal<Parameters<typeof referenceImportedType>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof referenceImportedType>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<JSDocNamedImport["names"][number], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<JSDocNamespaceImport["alias"], TODO>>; // TODO(koan) @koan-error
