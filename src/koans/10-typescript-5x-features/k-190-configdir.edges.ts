import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ConfigDirToken,
  type ConfigRelativePath,
  type SharedPathConfig,
  expandConfigDir,
  expandSharedPaths,
} from "./k-190-configdir.js";

/** EDGE CASES: configDir is compiler context rather than process state, ordinary relative paths keep base-file relativity, only supported path fields substitute, multiple tokens can occur in the runtime model, separator normalization remains host work, broad strings lose token proof, and expanded strings no longer literally start with the token. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Tail<Path> =
  Path extends `${ConfigDirToken}/${infer Rest}` ? Rest : never;
type IsNever<Value> = [Value] extends [never] ? true : false;

// Pre-solved demonstrations establish token versus ordinary path.
type _DemoTokenPath = Expect<Equal<"${configDir}/dist" extends ConfigRelativePath ? true : false, true>>;
type _DemoRelativePath = Expect<Equal<"./dist" extends ConfigRelativePath ? true : false, false>>;
type _DemoTail = Expect<Equal<Tail<"${configDir}/dist">, "dist">>;
type _DemoBroadString = Expect<Equal<string extends ConfigRelativePath ? true : false, false>>;

// 1. Token matching and widening (1-8)
type _01 = Expect<Equal<ConfigDirToken, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ConfigRelativePath, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<"${configDir}/dist", ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<"./dist", ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<string, ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<ConfigRelativePath, string>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Tail<string>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsNever<Tail<"./dist">>, TODO>>; // TODO(koan) @koan-error

// 2. Arrays/mappings preserve token paths structurally (9-15)
type _09 = Expect<Equal<SharedPathConfig["typeRoots"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<SharedPathConfig["typeRoots"][number], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<SharedPathConfig["paths"][string], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<SharedPathConfig["paths"][string][number], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Tail<SharedPathConfig["typeRoots"][number]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReadonlyArray<ConfigRelativePath>[number], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Record<string, readonly ConfigRelativePath[]>[string], TODO>>; // TODO(koan) @koan-error

// 3. Runtime model returns strings while config shape stays templated (16-22)
type _16 = Expect<Equal<ReturnType<typeof expandConfigDir>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<ReturnType<typeof expandConfigDir>, ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof expandSharedPaths>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof expandSharedPaths>["outDir"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof expandSharedPaths>[1], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Parameters<typeof expandConfigDir>[0], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Parameters<typeof expandConfigDir>[1], TODO>>; // TODO(koan) @koan-error

// 4. Bottom/union template behavior (23-30)
type _23 = Expect<Equal<Tail<never>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<IsNever<Tail<never>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Tail<"${configDir}/a" | "${configDir}/b">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<"${configDir}/a" | "./b", ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Exclude<"${configDir}/a" | "./b", ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<never, ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<unknown, ConfigRelativePath>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<keyof SharedPathConfig, TODO>>; // TODO(koan) @koan-error
