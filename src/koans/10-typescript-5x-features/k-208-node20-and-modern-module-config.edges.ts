import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ModernNodeConfig,
  type ModernNodeModuleMode,
  type ModernNodeResolutionMode,
  type Node20ModuleConfig,
  type NodeNextModuleConfig,
  effectiveTarget,
  modernNodeConfig,
  modernNodeConfigs,
} from "./k-208-node20-and-modern-module-config.js";

/** EDGE CASES: implied target is overridden by an explicit target, target and lib remain separate, Node20 is a feature baseline rather than a promise about every newer Node, NodeNext can change between TypeScript releases, module format still varies per file/package, require(ESM) retains runtime TLA limits, and bundler configurations should not imitate Node resolution. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations of stable versus floating implications.
type _DemoNode20Target = Expect<Equal<Node20ModuleConfig["impliedTarget"], "es2023">>;
type _DemoNodeNextTarget = Expect<Equal<NodeNextModuleConfig["impliedTarget"], "esnext">>;
type _DemoRequireEsm = Expect<Equal<ModernNodeConfig["requireEsm"], true>>;
type _DemoConfigs = Expect<Equal<typeof modernNodeConfigs["length"], 2>>;

// 1. Module and resolution spellings are related but not identical (1-7)
type _01 = Expect<Equal<ModernNodeModuleMode, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ModernNodeResolutionMode, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<ModernNodeResolutionMode, "node20">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsNever<Extract<ModernNodeResolutionMode, "node20">>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Node20ModuleConfig["moduleResolution"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<NodeNextModuleConfig["moduleResolution"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<ModernNodeResolutionMode, string>, TODO>>; // TODO(koan) @koan-error

// 2. Explicit target values are open strings in this helper (8-14)
type _08 = Expect<Equal<Parameters<typeof effectiveTarget>[1], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<NonNullable<Parameters<typeof effectiveTarget>[1]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<typeof effectiveTarget>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<IsBroadString<ReturnType<typeof effectiveTarget>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<"es2020", ReturnType<typeof effectiveTarget>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<ReturnType<typeof effectiveTarget>, "es2023" | "esnext">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<Parameters<typeof effectiveTarget>[1], undefined>, TODO>>; // TODO(koan) @koan-error

// 3. Correlation requires narrowing the config union (15-21)
type Node20 = Extract<ModernNodeConfig, { module: "node20" }>;
type NodeNext = Extract<ModernNodeConfig, { module: "nodenext" }>;
type _15 = Expect<Equal<Node20, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Node20["stability"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Node20["impliedTarget"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<NodeNext, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<NodeNext["stability"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<NodeNext["impliedTarget"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Exclude<ModernNodeConfig, Node20>, TODO>>; // TODO(koan) @koan-error

// 4. Overload reflection sees the final signature (22-26)
type _22 = Expect<Equal<Parameters<typeof modernNodeConfig>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<typeof modernNodeConfig>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<typeof modernNodeConfigs[0], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<typeof modernNodeConfigs[1], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof ModernNodeConfig, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom relationships (27-30)
type _27 = Expect<Equal<Extends<never, ModernNodeConfig>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, ModernNodeConfig>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<ModernNodeConfig, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsNever<Extract<ModernNodeConfig, never>>, TODO>>; // TODO(koan) @koan-error
