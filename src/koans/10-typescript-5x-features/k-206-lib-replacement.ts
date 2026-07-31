import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 206 - LIB REPLACEMENT
 * ===========================
 *
 * TypeScript ships declaration files for JavaScript and host APIs selected by
 * `lib`. Since 4.5, a package named `@typescript/lib-*` can replace one of those
 * bundled files, which is useful for pinning a DOM declaration version.
 *
 * Replacement lookup has a cost even when unused: the compiler probes and
 * watches `node_modules` in case a matching package appears. TypeScript 5.8's
 * `libReplacement` flag lets a project explicitly disable that behavior.
 *
 * Read the options independently. `lib` chooses which library families are in
 * the program. `libReplacement` chooses whether those selected families may be
 * sourced from replacement packages. Neither option installs runtime globals.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html#the---libreplacement-flag
 */

export type StandardLibFamily = "dom" | "es2024" | "webworker";
export type LibReplacementSetting = "enabled" | "disabled";
export type ReplacementPackageState = "installed" | "missing";
export type LibDeclarationSource = "replacement-package" | "bundled-lib";

export type ReplacementPackageName<Lib extends string> =
  `@typescript/lib-${Lowercase<Lib>}`;

export interface LibResolutionCase<
  Lib extends StandardLibFamily = StandardLibFamily,
> {
  lib: Lib;
  replacement: LibReplacementSetting;
  packageState: ReplacementPackageState;
}

export function replacementPackageName<const Lib extends string>(
  lib: Lib,
): ReplacementPackageName<Lib> {
  return `@typescript/lib-${lib.toLowerCase()}` as ReplacementPackageName<Lib>;
}

export function resolveLibDeclarations(
  entry: LibResolutionCase,
): LibDeclarationSource {
  return entry.replacement === "enabled" &&
    entry.packageState === "installed"
    ? "replacement-package"
    : "bundled-lib";
}

export const libResolutionCases = [
  { lib: "dom", replacement: "enabled", packageState: "installed" },
  { lib: "dom", replacement: "enabled", packageState: "missing" },
  { lib: "dom", replacement: "disabled", packageState: "installed" },
  { lib: "es2024", replacement: "enabled", packageState: "installed" },
] as const satisfies readonly LibResolutionCase[];

// Part 1: separate selected libraries from replacement policy.
type _01 = Expect<Equal<StandardLibFamily, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<LibReplacementSetting, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReplacementPackageState, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<LibDeclarationSource, TODO>>; // TODO(koan) @koan-error

// Part 2: replacement packages follow a naming convention.
type _05 = Expect<Equal<ReplacementPackageName<"dom">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReplacementPackageName<"ES2024">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<typeof replacementPackageName<"dom">>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<typeof replacementPackageName>, TODO>>; // TODO(koan) @koan-error

// Part 3: case data keeps lookup and installation independent.
type _09 = Expect<Equal<LibResolutionCase["lib"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<LibResolutionCase["replacement"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<LibResolutionCase["packageState"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof LibResolutionCase, TODO>>; // TODO(koan) @koan-error

// Part 4: literal cases preserve fallback paths.
type _13 = Expect<Equal<typeof libResolutionCases["length"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<typeof libResolutionCases[number]["lib"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<typeof libResolutionCases[0]["packageState"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<typeof libResolutionCases[2]["replacement"], TODO>>; // TODO(koan) @koan-error

// Part 5: the resolver returns declarations, not runtime capabilities.
type _17 = Expect<Equal<Parameters<typeof resolveLibDeclarations>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof resolveLibDeclarations>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<LibDeclarationSource, `${string}package`>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Exclude<LibDeclarationSource, `${string}package`>, TODO>>; // TODO(koan) @koan-error
