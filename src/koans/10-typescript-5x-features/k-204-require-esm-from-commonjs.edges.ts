import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type EsmAsyncShape,
  type ExampleEsmNamespace,
  type NodeModuleMode,
  type RequireEsmCase,
  type RequireEsmCheck,
  assessRequireEsm,
  consumeWithDynamicImport,
  renderCommonJsRequire,
  requireEsmCases,
} from "./k-204-require-esm-from-commonjs.js";

/** EDGE CASES: require is synchronous, top-level await anywhere in the ESM graph is a runtime barrier, compiler acceptance cannot inspect every deployed graph, NodeNext moves with Node, stable modes freeze older behavior, the returned value is a namespace, dynamic import always returns a promise, and dual publishing can have identity hazards. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations of sync versus async boundaries.
type _DemoSupported = Expect<Equal<typeof requireEsmCases[1]["esmShape"], "synchronous">>;
type _DemoTla = Expect<Equal<typeof requireEsmCases[2]["esmShape"], "top-level-await">>;
type _DemoDynamicPromise = Expect<Equal<ReturnType<typeof consumeWithDynamicImport>, Promise<string>>>;
type _DemoNamespace = Expect<Equal<keyof ExampleEsmNamespace, "default" | "double">>;

// 1. Synchronous require cannot absorb async evaluation (1-7)
type _01 = Expect<Equal<EsmAsyncShape, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<EsmAsyncShape, "synchronous">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<EsmAsyncShape, "top-level-await">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Exclude<EsmAsyncShape, "synchronous">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<Promise<unknown>, ExampleEsmNamespace>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof consumeWithDynamicImport>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Awaited<ReturnType<typeof consumeWithDynamicImport>>, TODO>>; // TODO(koan) @koan-error

// 2. NodeNext is not a frozen runtime version (8-14)
type _08 = Expect<Equal<NodeModuleMode, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extract<NodeModuleMode, "nodenext">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<NodeModuleMode, "node18">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<NodeModuleMode, "node20">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsNever<Extract<NodeModuleMode, "node20">>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<IsBroadString<NodeModuleMode>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<string, NodeModuleMode>, TODO>>; // TODO(koan) @koan-error

// 3. Compiler and runtime errors remain distinct (15-21)
type _15 = Expect<Equal<RequireEsmCheck, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<RequireEsmCheck, `compiler-${string}`>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<RequireEsmCheck, `runtime-${string}`>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<RequireEsmCheck, "supported">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Exclude<RequireEsmCheck, "supported">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsBroadString<RequireEsmCheck>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<"runtime-async-error", "compiler-error">, TODO>>; // TODO(koan) @koan-error

// 4. Helpers express policy but cannot load/deep-scan a graph (22-26)
type _22 = Expect<Equal<Parameters<typeof assessRequireEsm>[0], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<typeof assessRequireEsm>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof renderCommonJsRequire>[0], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof renderCommonJsRequire>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof RequireEsmCase, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom relationships (27-30)
type _27 = Expect<Equal<Extends<never, RequireEsmCase>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, RequireEsmCase>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<RequireEsmCase, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsNever<Extract<RequireEsmCheck, never>>, TODO>>; // TODO(koan) @koan-error
