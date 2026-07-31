import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type LibDeclarationSource,
  type LibReplacementSetting,
  type LibResolutionCase,
  type ReplacementPackageName,
  type StandardLibFamily,
  libResolutionCases,
  replacementPackageName,
  resolveLibDeclarations,
} from "./k-206-lib-replacement.js";

/** EDGE CASES: replacement lookup does not select lib families, declarations do not polyfill runtime APIs, missing packages fall back to bundled libs, disabling lookup ignores installed replacements, package compatibility is the author's responsibility, skipLibCheck is separate, and the lesson resolver models rather than performs node_modules resolution. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations of lookup fallback.
type _DemoInstalled = Expect<Equal<typeof libResolutionCases[0]["packageState"], "installed">>;
type _DemoMissing = Expect<Equal<typeof libResolutionCases[1]["packageState"], "missing">>;
type _DemoPackageName = Expect<Equal<ReplacementPackageName<"dom">, "@typescript/lib-dom">>;
type _DemoResolver = Expect<Equal<ReturnType<typeof resolveLibDeclarations>, LibDeclarationSource>>;

// 1. Selecting a lib and replacing it are orthogonal (1-7)
type _01 = Expect<Equal<StandardLibFamily, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<LibReplacementSetting, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<"dom", StandardLibFamily>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<"enabled", StandardLibFamily>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<"enabled", LibReplacementSetting>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsBroadString<StandardLibFamily>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsBroadString<LibReplacementSetting>, TODO>>; // TODO(koan) @koan-error

// 2. Replacement package names are conventions, not installed proof (8-14)
type _08 = Expect<Equal<ReplacementPackageName<"dom">, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<ReplacementPackageName<"custom">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<typeof replacementPackageName<"dom">>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof replacementPackageName<"custom">>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<ReplacementPackageName<"dom">, `@typescript/${string}`>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<ReplacementPackageName<"dom">, StandardLibFamily>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<typeof replacementPackageName>[0], TODO>>; // TODO(koan) @koan-error

// 3. Fallback and disabled lookup both use bundled declarations (15-21)
type _15 = Expect<Equal<LibDeclarationSource, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<LibDeclarationSource, "bundled-lib">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<LibDeclarationSource, "replacement-package">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<LibDeclarationSource, "bundled-lib">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<"bundled-lib", "replacement-package">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsBroadString<LibDeclarationSource>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<string, LibDeclarationSource>, TODO>>; // TODO(koan) @koan-error

// 4. The helper models a resolver decision, not runtime APIs (22-26)
type _22 = Expect<Equal<Parameters<typeof resolveLibDeclarations>[0], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<typeof resolveLibDeclarations>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<LibResolutionCase["lib"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<LibResolutionCase["replacement"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof LibResolutionCase, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom relationships (27-30)
type _27 = Expect<Equal<Extends<never, LibResolutionCase>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, LibResolutionCase>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<LibResolutionCase, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsNever<Extract<LibDeclarationSource, never>>, TODO>>; // TODO(koan) @koan-error
