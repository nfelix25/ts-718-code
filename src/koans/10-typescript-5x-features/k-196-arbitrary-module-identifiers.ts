import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 196 - ARBITRARY MODULE IDENTIFIERS
 * ========================================
 *
 * A JavaScript module's external export name does not have to be a legal local
 * identifier. WebAssembly modules and generated code can expose names with
 * punctuation, spaces, or other spellings that JavaScript cannot bind directly.
 *
 * TypeScript 5.6 accepts the ECMAScript string-literal form:
 * export a local binding `as "external-name"`, then import
 * `"external-name" as localName`. Read it aloud as "the module boundary uses
 * this exact string; inside this file, use this legal identifier."
 *
 * The spelling is an exact module namespace key. This feature does not make
 * arbitrary strings legal variable names, and it does not guarantee that an
 * older transformer or runtime understands the syntax.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html#support-for-arbitrary-module-identifiers
 */

const addAtBoundary = (left: number, right: number): number => left + right;
const buildVersionAtBoundary = "7.0" as const;
const firstOrdinalAtBoundary = 1 as const;

export {
  firstOrdinalAtBoundary as "01",
  buildVersionAtBoundary as "build-version",
  addAtBoundary as "wasm:add",
};

export type ArbitraryExportName =
  | "wasm:add"
  | "build-version"
  | "01";

export interface ExportBindingCase<
  External extends string = string,
  Local extends string = string,
> {
  external: External;
  local: Local;
}

export const exportBindingCases = [
  { external: "wasm:add", local: "wasmAdd" },
  { external: "build-version", local: "buildVersion" },
  { external: "01", local: "firstOrdinal" },
] as const satisfies readonly ExportBindingCase[];

export function renderArbitraryImport(
  external: string,
  local: string,
  from: string,
): string {
  return `import { ${JSON.stringify(external)} as ${local} } from ${JSON.stringify(from)};`;
}

export function readBoundaryValue(
  name: ArbitraryExportName,
): number | string | ((left: number, right: number) => number) {
  if (name === "wasm:add") return addAtBoundary;
  if (name === "build-version") return buildVersionAtBoundary;
  return firstOrdinalAtBoundary;
}

type ThisModule = typeof import("./k-196-arbitrary-module-identifiers.js");

// Part 1: external names form ordinary string-literal unions.
type _01 = Expect<Equal<ArbitraryExportName, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<ArbitraryExportName, `${string}:${string}`>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<ArbitraryExportName, `${string}-${string}`>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<ArbitraryExportName, `${number}`>, TODO>>; // TODO(koan) @koan-error

// Part 2: the strings become exact module namespace keys.
type _05 = Expect<Equal<ThisModule["wasm:add"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ThisModule["build-version"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ThisModule["01"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<keyof ThisModule, ArbitraryExportName>, TODO>>; // TODO(koan) @koan-error

// Part 3: external and local names are separate data.
type _09 = Expect<Equal<ExportBindingCase["external"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ExportBindingCase["local"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof exportBindingCases[number]["external"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof exportBindingCases[number]["local"], TODO>>; // TODO(koan) @koan-error

// Part 4: generated import syntax still yields ordinary local bindings.
type _13 = Expect<Equal<Parameters<typeof renderArbitraryImport>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof renderArbitraryImport>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof ExportBindingCase, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<typeof exportBindingCases["length"], TODO>>; // TODO(koan) @koan-error

// Part 5: dynamic lookup sees the union of boundary values.
type _17 = Expect<Equal<Parameters<typeof readBoundaryValue>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof readBoundaryValue>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<Extract<ThisModule["wasm:add"], (...args: never[]) => unknown>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ThisModule[ArbitraryExportName], TODO>>; // TODO(koan) @koan-error
