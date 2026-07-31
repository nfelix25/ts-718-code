import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type LibDeclarationSource,
  type LibReplacementSetting,
  type LibResolutionCase,
  type ReplacementPackageName,
  type ReplacementPackageState,
  type StandardLibFamily,
  libResolutionCases,
  replacementPackageName,
  resolveLibDeclarations,
} from "./k-206-lib-replacement.js";

/** GUIDED DRILLS: repeat library-family selection, replacement settings, package states, conditional resolution, package-name templates, literal case extraction, generic case shapes, and structural relationships. */

type Extends<From, To> = [From] extends [To] ? true : false;
type SourceFor<
  Setting extends LibReplacementSetting,
  Package extends ReplacementPackageState,
> =
  Setting extends "enabled"
    ? Package extends "installed"
      ? "replacement-package"
      : "bundled-lib"
    : "bundled-lib";
type CaseFor<Lib extends StandardLibFamily> =
  Extract<typeof libResolutionCases[number], { lib: Lib }>;

// 1. Standard-library families (1-9)
type _01 = Expect<Equal<StandardLibFamily, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<StandardLibFamily, "dom">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<StandardLibFamily, "es2024">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<StandardLibFamily, "webworker">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Exclude<StandardLibFamily, "dom">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<StandardLibFamily, `es${number}`>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<StandardLibFamily, `${string}worker`>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<StandardLibFamily, string>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<string, StandardLibFamily>, TODO>>; // TODO(koan) @koan-error

// 2. Lookup policy and package state (10-19)
type _10 = Expect<Equal<LibReplacementSetting, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<LibReplacementSetting, "enabled">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Exclude<LibReplacementSetting, "enabled">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ReplacementPackageState, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<ReplacementPackageState, "installed">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Exclude<ReplacementPackageState, "installed">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<LibDeclarationSource, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<LibDeclarationSource, `${string}package`>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<LibDeclarationSource, `${string}package`>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<LibDeclarationSource, string>, TODO>>; // TODO(koan) @koan-error

// 3. Conditional resolution matrix (20-29)
type _20 = Expect<Equal<SourceFor<"enabled", "installed">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<SourceFor<"enabled", "missing">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<SourceFor<"disabled", "installed">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<SourceFor<"disabled", "missing">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<SourceFor<LibReplacementSetting, "installed">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<SourceFor<"enabled", ReplacementPackageState>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<SourceFor<"disabled", ReplacementPackageState>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<SourceFor<LibReplacementSetting, ReplacementPackageState>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<SourceFor<LibReplacementSetting, ReplacementPackageState>, LibDeclarationSource>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<"bundled-lib", SourceFor<LibReplacementSetting, ReplacementPackageState>>, TODO>>; // TODO(koan) @koan-error

// 4. Replacement package naming (30-40)
type _30 = Expect<Equal<ReplacementPackageName<"dom">, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<ReplacementPackageName<"DOM">, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<ReplacementPackageName<"es2024">, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<ReplacementPackageName<"webworker">, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReplacementPackageName<StandardLibFamily>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extract<ReplacementPackageName<StandardLibFamily>, `${string}dom`>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Parameters<typeof replacementPackageName>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<ReturnType<typeof replacementPackageName<"dom">>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<ReturnType<typeof replacementPackageName<"ES2024">>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Extends<ReplacementPackageName<"dom">, string>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Extends<"@typescript/lib-dom", ReplacementPackageName<"dom">>, TODO>>; // TODO(koan) @koan-error

// 5. Literal resolution cases (41-52)
type _41 = Expect<Equal<typeof libResolutionCases["length"], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<typeof libResolutionCases[0]["lib"], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<typeof libResolutionCases[0]["replacement"], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<typeof libResolutionCases[0]["packageState"], TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<typeof libResolutionCases[1]["packageState"], TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<typeof libResolutionCases[2]["replacement"], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<typeof libResolutionCases[3]["lib"], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<typeof libResolutionCases[number]["lib"], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<CaseFor<"dom">, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<CaseFor<"es2024">, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<CaseFor<"webworker">, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<keyof LibResolutionCase, TODO>>; // TODO(koan) @koan-error

// 6. Resolver and structural surfaces (53-60)
type _53 = Expect<Equal<Parameters<typeof resolveLibDeclarations>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<typeof resolveLibDeclarations>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<LibResolutionCase<"dom">["lib"], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<LibResolutionCase<"es2024">["lib"], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<LibResolutionCase<"dom">, LibResolutionCase>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<LibResolutionCase, { lib: StandardLibFamily }>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<ReturnType<typeof resolveLibDeclarations>, LibDeclarationSource>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<ReplacementPackageName<StandardLibFamily>, `@typescript/lib-${string}`>, TODO>>; // TODO(koan) @koan-error
