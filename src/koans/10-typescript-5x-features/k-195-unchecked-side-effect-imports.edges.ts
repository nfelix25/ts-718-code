import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type SideEffectCheck,
  type SideEffectImportCase,
  type SideEffectResolution,
  ambientAssetPattern,
  auditSideEffectImport,
  renderSideEffectImport,
  sideEffectCases,
} from "./k-195-unchecked-side-effect-imports.js";

/** EDGE CASES: this option changes unresolved side-effect imports only, ambient wildcards trade typo detection for asset recognition, declarations do not prove file existence, module resolution does not prove runtime effects, relative and package specifiers share the same check, and type-level models cannot execute a resolver. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;
type AssetExtension<Value extends string> =
  Value extends `*.${infer Extension}` ? Extension : never;

// Pre-solved demonstrations that keep compiler diagnostics out of lesson source.
type _DemoMissingCase = Expect<Equal<typeof sideEffectCases[2]["resolution"], "missing">>;
type _DemoAuditUnion = Expect<Equal<ReturnType<typeof auditSideEffectImport>, SideEffectCheck>>;
type _DemoRenderer = Expect<Equal<ReturnType<typeof renderSideEffectImport>, string>>;
type _DemoResolutionClosed = Expect<Equal<IsBroadString<SideEffectResolution>, false>>;

const broadExtension: string = "css";
const broadPattern = ambientAssetPattern(broadExtension);
const literalPattern = ambientAssetPattern("css");

// 1. Wildcard precision and widening (1-7)
type _01 = Expect<Equal<typeof literalPattern, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof broadPattern, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<AssetExtension<typeof literalPattern>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<AssetExtension<typeof broadPattern>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<IsBroadString<typeof literalPattern>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsBroadString<typeof broadPattern>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<AssetExtension<"./theme.css">, TODO>>; // TODO(koan) @koan-error

// 2. Closed compiler model versus open module specifiers (8-14)
type _08 = Expect<Equal<IsBroadString<SideEffectResolution>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<IsBroadString<SideEffectCheck>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<IsBroadString<SideEffectImportCase["specifier"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<SideEffectResolution, "runtime-failed">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsNever<Extract<SideEffectResolution, "runtime-failed">>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Exclude<SideEffectResolution, SideEffectResolution>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsNever<Exclude<SideEffectResolution, SideEffectResolution>>, TODO>>; // TODO(koan) @koan-error

// 3. Ambient acceptance is distinct from source checking (15-21)
type _15 = Expect<Equal<Extract<SideEffectCheck, `${string}declaration`>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<SideEffectCheck, `${string}source`>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<SideEffectCheck, `${string}error`>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<SideEffectCheck, "accepted-declaration">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<"accepted-declaration", "checked-source">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<"checked-source", SideEffectCheck>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<"runtime-loaded", SideEffectCheck>, TODO>>; // TODO(koan) @koan-error

// 4. Functions expose models, not actual compiler resolution (22-26)
type _22 = Expect<Equal<Parameters<typeof auditSideEffectImport>[0], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<typeof auditSideEffectImport>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof renderSideEffectImport>[0], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof renderSideEffectImport>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof SideEffectImportCase, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom relationships (27-30)
type _27 = Expect<Equal<Extends<never, SideEffectImportCase>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, SideEffectImportCase>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<SideEffectImportCase, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<SideEffectImportCase, { specifier: string }>, TODO>>; // TODO(koan) @koan-error
