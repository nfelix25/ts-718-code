import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  "01" as firstOrdinal,
  "build-version" as buildVersion,
  "wasm:add" as wasmAdd,
  type ArbitraryExportName,
  type ExportBindingCase,
  exportBindingCases,
  readBoundaryValue,
  renderArbitraryImport,
} from "./k-196-arbitrary-module-identifiers.js";

/** EDGE CASES: quoted names are exact and case-sensitive, aliases still need legal local identifiers, duplicate external names remain invalid, object-property strings predate this feature, type/value namespaces retain their normal rules, module transforms must support the syntax, and arbitrary names do not imply dynamic export lookup. */

type ModuleShape = typeof import("./k-196-arbitrary-module-identifiers.js");
type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations using real imports with legal aliases.
type _DemoFunction = Expect<Equal<typeof wasmAdd, (left: number, right: number) => number>>;
type _DemoVersion = Expect<Equal<typeof buildVersion, "7.0">>;
type _DemoOrdinal = Expect<Equal<typeof firstOrdinal, 1>>;
type _DemoExactNames = Expect<Equal<Extract<keyof ModuleShape, ArbitraryExportName>, ArbitraryExportName>>;

// 1. Exact spelling and missing-key behavior (1-7)
type _01 = Expect<Equal<Extract<keyof ModuleShape, "wasm:add">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<keyof ModuleShape, "WASM:add">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsNever<Extract<keyof ModuleShape, "WASM:add">>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<ArbitraryExportName, "01">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<ArbitraryExportName, "1">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsNever<Extract<ArbitraryExportName, "1">>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsBroadString<ArbitraryExportName>, TODO>>; // TODO(koan) @koan-error

// 2. Module keys are strings but remain a closed union here (8-14)
type _08 = Expect<Equal<Extends<ArbitraryExportName, string>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<string, ArbitraryExportName>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ModuleShape[ArbitraryExportName], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<keyof Pick<ModuleShape, ArbitraryExportName>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Exclude<ArbitraryExportName, keyof ModuleShape>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<IsNever<Exclude<ArbitraryExportName, keyof ModuleShape>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<keyof ModuleShape, `${number}`>, TODO>>; // TODO(koan) @koan-error

// 3. External names and legal aliases are independent (15-21)
type _15 = Expect<Equal<typeof exportBindingCases[number]["external"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<typeof exportBindingCases[number]["local"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<typeof exportBindingCases[number], { external: "wasm:add" }>["local"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<typeof exportBindingCases[number], { local: "wasmAdd" }>["external"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ExportBindingCase<"has space", "hasSpace">["external"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ExportBindingCase<"has space", "hasSpace">["local"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<ExportBindingCase<"", "emptyName">, ExportBindingCase>, TODO>>; // TODO(koan) @koan-error

// 4. Helper APIs cannot statically choose a value by a dynamic string (22-26)
type _22 = Expect<Equal<Parameters<typeof readBoundaryValue>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<typeof readBoundaryValue>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof renderArbitraryImport>[0], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Parameters<typeof renderArbitraryImport>[1], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ReturnType<typeof renderArbitraryImport>, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom relationships (27-30)
type _27 = Expect<Equal<Extends<never, ArbitraryExportName>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, ArbitraryExportName>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<ArbitraryExportName, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsNever<Extract<ArbitraryExportName, never>>, TODO>>; // TODO(koan) @koan-error
