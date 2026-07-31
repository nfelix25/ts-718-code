import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ConfigDirToken,
  type ConfigRelativePath,
  type ExpandedPathConfig,
  type SharedPathConfig,
  expandConfigDir,
  expandSharedPaths,
  sharedPathConfig,
} from "./k-190-configdir.js";

/** GUIDED DRILLS: repeat token/path recognition, tail extraction, shared option shapes, arrays and path mappings, runtime expansion signatures, derived project examples, and ordinary-relative-path contrasts. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Tail<Path> =
  Path extends `${ConfigDirToken}/${infer Rest}` ? Rest : never;
type IsConfigPath<Path extends string> =
  Path extends ConfigRelativePath ? true : false;

// Token and path recognition (1-12)
type _01 = Expect<Equal<ConfigDirToken, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ConfigRelativePath, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsConfigPath<"${configDir}/dist">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsConfigPath<"${configDir}/src">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<IsConfigPath<"${configDir}/">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsConfigPath<"./dist">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsConfigPath<"/dist">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsConfigPath<"dist">, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<"${configDir}/dist", ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<ConfigRelativePath, string>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<string, ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<`${ConfigDirToken}/dist`, TODO>>; // TODO(koan) @koan-error

// Tail extraction (13-24)
type _13 = Expect<Equal<Tail<"${configDir}/dist">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Tail<"${configDir}/types">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Tail<"${configDir}/src/*">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Tail<"${configDir}/node_modules/@types">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Tail<"${configDir}/custom-types">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Tail<"./dist">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Tail<string>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Tail<never>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Tail<ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Tail<"${configDir}/a" | "${configDir}/b">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extract<ConfigRelativePath, `${string}/dist`>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Exclude<"${configDir}/a" | "./b", ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error

// Shared option shapes (25-36)
type _25 = Expect<Equal<keyof SharedPathConfig, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<SharedPathConfig["outDir"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<SharedPathConfig["declarationDir"], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<SharedPathConfig["typeRoots"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<SharedPathConfig["typeRoots"][number], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<SharedPathConfig["paths"], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<SharedPathConfig["paths"][string], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<SharedPathConfig["paths"][string][number], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Readonly<SharedPathConfig>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Partial<SharedPathConfig>["outDir"], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Pick<SharedPathConfig, "outDir">, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Omit<SharedPathConfig, "paths">, TODO>>; // TODO(koan) @koan-error

// Concrete shared config (37-48)
type _37 = Expect<Equal<typeof sharedPathConfig, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<typeof sharedPathConfig.outDir, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<typeof sharedPathConfig.declarationDir, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<typeof sharedPathConfig.typeRoots, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<typeof sharedPathConfig.typeRoots[number], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<keyof typeof sharedPathConfig.paths, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<typeof sharedPathConfig.paths[string], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Tail<typeof sharedPathConfig.outDir>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Tail<typeof sharedPathConfig.declarationDir>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Extends<typeof sharedPathConfig, SharedPathConfig>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extends<SharedPathConfig, typeof sharedPathConfig>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Required<Partial<typeof sharedPathConfig>>, TODO>>; // TODO(koan) @koan-error

// Expansion APIs and portability (49-60)
type _49 = Expect<Equal<Parameters<typeof expandConfigDir>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Parameters<typeof expandConfigDir>[0], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<typeof expandConfigDir>[1], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<typeof expandConfigDir>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<typeof expandSharedPaths>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Parameters<typeof expandSharedPaths>[0], TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Parameters<typeof expandSharedPaths>[1], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<ReturnType<typeof expandSharedPaths>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReturnType<typeof expandSharedPaths>["outDir"], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<typeof expandSharedPaths>["typeRoots"][number], TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<ReturnType<typeof expandSharedPaths>, SharedPathConfig>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<ReturnType<typeof expandSharedPaths>, ExpandedPathConfig>, TODO>>; // TODO(koan) @koan-error
