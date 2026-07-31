import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type IsDeclarationPath,
  type JavaScriptOutputExtension,
  type RewriteRelativeImport,
  type RewriteSourceExtension,
  type TypeScriptSourceExtension,
  rewriteCases,
  rewriteRelativeImport,
} from "./k-200-relative-extension-rewriting.js";

/** GUIDED DRILLS: repeat all four suffix mappings, relative-path recognition, declaration exclusions, unchanged specifier families, union distribution, literal-preserving runtime calls, and case-matrix extraction. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsRelative<Path extends string> =
  Path extends `./${string}` | `../${string}` ? true : false;
type SourceExtension<Path extends string> =
  Path extends `${string}${infer Extension extends TypeScriptSourceExtension}`
    ? Extension
    : never;

// 1. Extension vocabularies (1-9)
type _01 = Expect<Equal<TypeScriptSourceExtension, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<JavaScriptOutputExtension, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<TypeScriptSourceExtension, ".ts">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Exclude<TypeScriptSourceExtension, ".ts">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<JavaScriptOutputExtension, ".js">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Exclude<JavaScriptOutputExtension, ".js">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<TypeScriptSourceExtension, `.${string}`>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<JavaScriptOutputExtension, `.${string}`>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<".json", TypeScriptSourceExtension>, TODO>>; // TODO(koan) @koan-error

// 2. Direct suffix rewriting (10-21)
type _10 = Expect<Equal<RewriteSourceExtension<"a.ts">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<RewriteSourceExtension<"a.tsx">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<RewriteSourceExtension<"a.mts">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<RewriteSourceExtension<"a.cts">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<RewriteSourceExtension<"nested/a.ts">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<RewriteSourceExtension<"nested/a.tsx">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<RewriteSourceExtension<"nested/a.mts">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<RewriteSourceExtension<"nested/a.cts">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<RewriteSourceExtension<"a.js">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<RewriteSourceExtension<"a.json">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<RewriteSourceExtension<"a">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<RewriteSourceExtension<string>, TODO>>; // TODO(koan) @koan-error

// 3. Relative recognition (22-30)
type _22 = Expect<Equal<IsRelative<"./a.ts">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<IsRelative<"../a.ts">, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<IsRelative<"../../a.ts">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<IsRelative<"/a.ts">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsRelative<"package/a.ts">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<IsRelative<"@scope/pkg/a.ts">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<IsRelative<"#root/a.ts">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsRelative<"@/a.ts">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsRelative<string>, TODO>>; // TODO(koan) @koan-error

// 4. Full relative rewrite rule (31-44)
type _31 = Expect<Equal<RewriteRelativeImport<"./a.ts">, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<RewriteRelativeImport<"../a.tsx">, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<RewriteRelativeImport<"../../a.mts">, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<RewriteRelativeImport<"./a.cts">, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<RewriteRelativeImport<"./a.js">, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<RewriteRelativeImport<"./a">, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<RewriteRelativeImport<"package/a.ts">, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<RewriteRelativeImport<"@scope/pkg/a.ts">, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<RewriteRelativeImport<"#root/a.ts">, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<RewriteRelativeImport<"@/a.ts">, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<RewriteRelativeImport<"./a.d.ts">, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<RewriteRelativeImport<"./a.d.mts">, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<RewriteRelativeImport<"./a.d.cts">, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<RewriteRelativeImport<string>, TODO>>; // TODO(koan) @koan-error

// 5. Declaration and source-suffix inspection (45-52)
type _45 = Expect<Equal<IsDeclarationPath<"./a.d.ts">, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<IsDeclarationPath<"./a.d.mts">, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<IsDeclarationPath<"./a.d.cts">, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<IsDeclarationPath<"./a.ts">, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<SourceExtension<"./a.ts">, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<SourceExtension<"./a.tsx">, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<SourceExtension<"./a.mts">, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<SourceExtension<"./a.js">, TODO>>; // TODO(koan) @koan-error

// 6. Runtime helper and case matrix (53-60)
type _53 = Expect<Equal<Parameters<typeof rewriteRelativeImport>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<typeof rewriteRelativeImport<"./a.ts">>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<typeof rewriteRelativeImport<"pkg/a.ts">>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<typeof rewriteCases["length"], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<typeof rewriteCases[number][0], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<typeof rewriteCases[number][1], TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<RewriteRelativeImport<"./a.ts" | "../b.mts">, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<RewriteRelativeImport<"./a.ts" | "pkg/b.ts">, TODO>>; // TODO(koan) @koan-error
