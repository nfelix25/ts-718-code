import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 195 - UNCHECKED SIDE-EFFECT IMPORTS
 * =========================================
 *
 * `import "./setup.js"` asks a module to execute without importing a binding.
 * Before TypeScript 5.6, a resolvable side-effect import was checked, but an
 * unresolved one could be silently ignored. That asymmetry hid misspellings.
 *
 * With `noUncheckedSideEffectImports`, read a binding-free import as "resolve
 * this module even though I do not consume an export." Missing modules now
 * produce the normal module-resolution diagnostic.
 *
 * Asset imports need an explicit type-system bridge. An ambient declaration
 * such as `declare module "*.css" {}` tells TypeScript that matching specifiers
 * are valid module shapes. It does not prove that a particular asset exists,
 * that a bundler can load it, or that the module performs the intended effect.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html#the---nouncheckedsideeffectimports-option
 */

export type SideEffectResolution =
  | "source-file"
  | "ambient-module"
  | "missing";

export type SideEffectCheck =
  | "checked-source"
  | "accepted-declaration"
  | "unresolved-error";

export interface SideEffectImportCase<
  Specifier extends string = string,
  Resolution extends SideEffectResolution = SideEffectResolution,
> {
  specifier: Specifier;
  resolution: Resolution;
}

export function auditSideEffectImport(
  entry: SideEffectImportCase,
): SideEffectCheck {
  if (entry.resolution === "source-file") return "checked-source";
  if (entry.resolution === "ambient-module") return "accepted-declaration";
  return "unresolved-error";
}

export function renderSideEffectImport(specifier: string): string {
  return `import ${JSON.stringify(specifier)};`;
}

export function ambientAssetPattern<const Extension extends string>(
  extension: Extension,
): `*.${Extension}` {
  return `*.${extension}`;
}

export const sideEffectCases = [
  { specifier: "./register.js", resolution: "source-file" },
  { specifier: "./button.css", resolution: "ambient-module" },
  { specifier: "./regitser.js", resolution: "missing" },
] as const satisfies readonly SideEffectImportCase[];

// Part 1: classify the three resolution outcomes.
type _01 = Expect<Equal<SideEffectResolution, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<SideEffectCheck, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<SideEffectImportCase["specifier"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<SideEffectImportCase["resolution"], TODO>>; // TODO(koan) @koan-error

// Part 2: literal case data preserves each compiler scenario.
type _05 = Expect<Equal<typeof sideEffectCases[number]["specifier"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<typeof sideEffectCases[number]["resolution"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<typeof sideEffectCases[0]["resolution"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof sideEffectCases[2]["resolution"], TODO>>; // TODO(koan) @koan-error

// Part 3: auditing maps resolution facts to compiler outcomes.
type _09 = Expect<Equal<Parameters<typeof auditSideEffectImport>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<typeof auditSideEffectImport>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<SideEffectCheck, `${string}error`>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Exclude<SideEffectCheck, `${string}error`>, TODO>>; // TODO(koan) @koan-error

// Part 4: side-effect syntax imports no local bindings.
type _13 = Expect<Equal<Parameters<typeof renderSideEffectImport>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof renderSideEffectImport>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof SideEffectImportCase, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<typeof sideEffectCases[number], TODO>>; // TODO(koan) @koan-error

// Part 5: wildcard declarations recognize asset suffixes.
const cssPattern = ambientAssetPattern("css");
type _17 = Expect<Equal<typeof cssPattern, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<typeof ambientAssetPattern>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof ambientAssetPattern>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<`*.${"css" | "svg"}`, TODO>>; // TODO(koan) @koan-error
