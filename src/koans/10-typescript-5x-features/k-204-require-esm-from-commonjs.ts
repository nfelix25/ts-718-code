import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 204 - REQUIRE ESM FROM COMMONJS
 * =====================================
 *
 * Historically, ESM could import CommonJS, but CommonJS could not synchronously
 * `require()` ESM. Modern Node relaxed that boundary for synchronous ESM graphs.
 * TypeScript 5.8 models the behavior under `module: "nodenext"` and no longer
 * rejects those require calls solely because the target is ESM.
 *
 * The runtime restriction matters: an ESM module, or anything it imports, must
 * not use top-level await when loaded synchronously with `require`. Dynamic
 * `import()` remains the asynchronous bridge.
 *
 * Read NodeNext as "track the current Node behavior." It is a moving mode.
 * Stable `node18` intentionally keeps the older rule; later stable modes can
 * freeze newer behavior. Compiler acceptance also cannot prove an entire runtime
 * dependency graph has no top-level await.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html#support-for-require-of-ecmascript-modules-in---module-nodenext
 */

export type NodeModuleMode = "node18" | "nodenext";
export type NodeRuntimeLine = "node18" | "node22-plus";
export type EsmAsyncShape = "synchronous" | "top-level-await";
export type RequireEsmCheck =
  | "compiler-error"
  | "supported"
  | "runtime-async-error";

export interface RequireEsmCase {
  moduleMode: NodeModuleMode;
  runtime: NodeRuntimeLine;
  esmShape: EsmAsyncShape;
}

export interface ExampleEsmNamespace {
  default: string;
  double(value: number): number;
}

export function assessRequireEsm(entry: RequireEsmCase): RequireEsmCheck {
  if (entry.moduleMode !== "nodenext" || entry.runtime === "node18") {
    return "compiler-error";
  }
  return entry.esmShape === "top-level-await"
    ? "runtime-async-error"
    : "supported";
}

export function renderCommonJsRequire(specifier: string): string {
  return `const namespace = require(${JSON.stringify(specifier)});`;
}

export async function consumeWithDynamicImport(
  load: () => Promise<ExampleEsmNamespace>,
): Promise<string> {
  const namespace = await load();
  return `${namespace.default}:${namespace.double(3)}`;
}

export const requireEsmCases = [
  { moduleMode: "node18", runtime: "node18", esmShape: "synchronous" },
  { moduleMode: "nodenext", runtime: "node22-plus", esmShape: "synchronous" },
  { moduleMode: "nodenext", runtime: "node22-plus", esmShape: "top-level-await" },
] as const satisfies readonly RequireEsmCase[];

// Part 1: name compiler, runtime, and graph dimensions.
type _01 = Expect<Equal<NodeModuleMode, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<NodeRuntimeLine, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<EsmAsyncShape, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<RequireEsmCheck, TODO>>; // TODO(koan) @koan-error

// Part 2: a case keeps the three responsibilities separate.
type _05 = Expect<Equal<RequireEsmCase["moduleMode"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<RequireEsmCase["runtime"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<RequireEsmCase["esmShape"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof RequireEsmCase, TODO>>; // TODO(koan) @koan-error

// Part 3: literal cases preserve the migration boundary.
type _09 = Expect<Equal<typeof requireEsmCases["length"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof requireEsmCases[number]["moduleMode"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof requireEsmCases[1]["runtime"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof requireEsmCases[2]["esmShape"], TODO>>; // TODO(koan) @koan-error

// Part 4: require returns a module namespace-shaped value.
type _13 = Expect<Equal<keyof ExampleEsmNamespace, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ExampleEsmNamespace["default"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<ExampleEsmNamespace["double"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<ExampleEsmNamespace["double"]>, TODO>>; // TODO(koan) @koan-error

// Part 5: dynamic import is always asynchronous.
type _17 = Expect<Equal<Parameters<typeof assessRequireEsm>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof assessRequireEsm>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof consumeWithDynamicImport>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof consumeWithDynamicImport>, TODO>>; // TODO(koan) @koan-error
