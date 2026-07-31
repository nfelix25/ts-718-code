import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 190 - THE ${configDir} CONFIGURATION TOKEN
 * ===============================================
 *
 * A shared tsconfig often contains path-valued options. Ordinary relative paths
 * are resolved relative to the file that declared them, which makes a base
 * config awkward when every extending project wants its own `dist` or custom
 * type directory.
 *
 * TypeScript 5.5 introduced `${configDir}` in supported path fields. Read
 * `"${configDir}/dist"` as "start at the directory of the configuration being
 * compiled, then append dist." A derived config can therefore reuse one base
 * config without repeating project-relative paths.
 *
 * This is TypeScript configuration substitution, not shell interpolation and
 * not a general placeholder for arbitrary string options. The token's value is
 * supplied by the compiler from config context.
 *
 * Compiler configuration ownership: TypeScript 5.5.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#the-configdir-template-variable-for-configuration-files
 */

export type ConfigDirToken = "${configDir}";
export type ConfigRelativePath = `${ConfigDirToken}/${string}`;

export interface SharedPathConfig {
  outDir: ConfigRelativePath;
  declarationDir: ConfigRelativePath;
  typeRoots: readonly ConfigRelativePath[];
  paths: Readonly<Record<string, readonly ConfigRelativePath[]>>;
}

export interface ExpandedPathConfig {
  outDir: string;
  declarationDir: string;
  typeRoots: readonly string[];
  paths: Readonly<Record<string, readonly string[]>>;
}

export const sharedPathConfig: SharedPathConfig = {
  outDir: "${configDir}/dist",
  declarationDir: "${configDir}/types",
  typeRoots: [
    "${configDir}/node_modules/@types",
    "${configDir}/custom-types",
  ],
  paths: {
    "@app/*": ["${configDir}/src/*"],
  },
};

export function expandConfigDir(
  template: string,
  configDirectory: string,
): string {
  return template.replaceAll("${configDir}", configDirectory);
}

export function expandSharedPaths(
  config: SharedPathConfig,
  configDirectory: string,
): ExpandedPathConfig {
  const expand = (path: ConfigRelativePath): string =>
    expandConfigDir(path, configDirectory);

  return {
    outDir: expand(config.outDir),
    declarationDir: expand(config.declarationDir),
    typeRoots: config.typeRoots.map(expand),
    paths: Object.fromEntries(
      Object.entries(config.paths).map(([alias, paths]) => [
        alias,
        paths.map(expand),
      ]),
    ),
  };
}

// Part 1: the token is a literal configuration placeholder.
type _01 = Expect<Equal<ConfigDirToken, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ConfigRelativePath, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<"${configDir}/dist" extends ConfigRelativePath ? true : false, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<"./dist" extends ConfigRelativePath ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 2: path-valued options can share the same anchor.
type _05 = Expect<Equal<SharedPathConfig["outDir"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<SharedPathConfig["declarationDir"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<SharedPathConfig["typeRoots"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<SharedPathConfig["paths"], TODO>>; // TODO(koan) @koan-error

// Part 3: the concrete base config preserves template literals.
type _09 = Expect<Equal<typeof sharedPathConfig, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof sharedPathConfig.outDir, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof sharedPathConfig.typeRoots[number], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof typeof sharedPathConfig.paths, TODO>>; // TODO(koan) @koan-error

// Part 4: expansion is an ordinary string operation in this runtime model.
type _13 = Expect<Equal<Parameters<typeof expandConfigDir>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof expandConfigDir>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof expandSharedPaths>[0], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof expandSharedPaths>, TODO>>; // TODO(koan) @koan-error

// Part 5: template path pieces remain available to type-level parsing.
type Tail<Path extends ConfigRelativePath> =
  Path extends `${ConfigDirToken}/${infer Rest}` ? Rest : never;
type _17 = Expect<Equal<Tail<"${configDir}/dist">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Tail<"${configDir}/src/*">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof SharedPathConfig, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<SharedPathConfig["typeRoots"][number], TODO>>; // TODO(koan) @koan-error
