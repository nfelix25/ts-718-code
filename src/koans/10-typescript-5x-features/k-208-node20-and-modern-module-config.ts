import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 208 - NODE20 AND MODERN MODULE CONFIG
 * ===========================================
 *
 * Node module modes describe more than emitted syntax. They select Node-aware
 * resolution, decide whether each file is ESM or CommonJS from its extension
 * and nearest package `"type"`, and control which interop rules are accepted.
 *
 * TypeScript 5.9 added stable `module: "node20"`. It includes modern Node 20
 * behavior such as `require(ESM)` and, unless overridden, implies
 * `target: "es2023"`. `nodenext` intentionally floats with the latest stable
 * Node behavior and implies the floating `target: "esnext"`.
 *
 * Read the choice as a deployment promise: use a stable mode when the runtime
 * baseline is fixed; use NodeNext when the project deliberately tracks current
 * Node. Bundled applications instead normally use `moduleResolution: "bundler"`
 * with preserved/ESNext module syntax.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html#support-for---module-node20
 * - https://www.typescriptlang.org/tsconfig/module.html
 */

export type ModernNodeModuleMode = "node20" | "nodenext";
export type ModernNodeResolutionMode = "node16" | "nodenext";
export type ImpliedNodeTarget = "es2023" | "esnext";
export type ModuleModeStability = "stable" | "floating";

export interface Node20ModuleConfig {
  module: "node20";
  moduleResolution: "node16";
  impliedTarget: "es2023";
  stability: "stable";
  requireEsm: true;
}

export interface NodeNextModuleConfig {
  module: "nodenext";
  moduleResolution: "nodenext";
  impliedTarget: "esnext";
  stability: "floating";
  requireEsm: true;
}

export type ModernNodeConfig = Node20ModuleConfig | NodeNextModuleConfig;

export function modernNodeConfig(
  mode: "node20",
): Node20ModuleConfig;
export function modernNodeConfig(
  mode: "nodenext",
): NodeNextModuleConfig;
export function modernNodeConfig(
  mode: ModernNodeModuleMode,
): ModernNodeConfig {
  return mode === "node20"
    ? {
        module: "node20",
        moduleResolution: "node16",
        impliedTarget: "es2023",
        stability: "stable",
        requireEsm: true,
      }
    : {
        module: "nodenext",
        moduleResolution: "nodenext",
        impliedTarget: "esnext",
        stability: "floating",
        requireEsm: true,
      };
}

export function effectiveTarget(
  config: ModernNodeConfig,
  explicitTarget?: string,
): string {
  return explicitTarget ?? config.impliedTarget;
}

export const modernNodeConfigs = [
  modernNodeConfig("node20"),
  modernNodeConfig("nodenext"),
] as const;

// Part 1: identify stable and floating modes.
type _01 = Expect<Equal<ModernNodeModuleMode, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ModernNodeResolutionMode, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ImpliedNodeTarget, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ModuleModeStability, TODO>>; // TODO(koan) @koan-error

// Part 2: Node 20 is a frozen feature bundle.
type _05 = Expect<Equal<Node20ModuleConfig["module"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Node20ModuleConfig["moduleResolution"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Node20ModuleConfig["impliedTarget"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Node20ModuleConfig["stability"], TODO>>; // TODO(koan) @koan-error

// Part 3: NodeNext tracks current Node.
type _09 = Expect<Equal<NodeNextModuleConfig["module"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<NodeNextModuleConfig["moduleResolution"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<NodeNextModuleConfig["impliedTarget"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<NodeNextModuleConfig["stability"], TODO>>; // TODO(koan) @koan-error

// Part 4: the union preserves each correlated configuration.
type _13 = Expect<Equal<ModernNodeConfig["module"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ModernNodeConfig["moduleResolution"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ModernNodeConfig["impliedTarget"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ModernNodeConfig["requireEsm"], TODO>>; // TODO(koan) @koan-error

// Part 5: explicit target selection overrides implication.
type _17 = Expect<Equal<ReturnType<typeof modernNodeConfig>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<typeof modernNodeConfigs[number], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof effectiveTarget>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof effectiveTarget>, TODO>>; // TODO(koan) @koan-error
