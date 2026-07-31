import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type IsDeclarationPath,
  type RewriteRelativeImport,
  type RewriteSourceExtension,
  rewriteCases,
  rewriteRelativeImport,
} from "./k-200-relative-extension-rewriting.js";

/** EDGE CASES: rewriting is static and syntactic, declaration files are excluded, dynamic computed specifiers cannot be rewritten reliably, package/path/import-map aliases are untouched, query/hash suffixes are not a documented match, broad strings remain broad, and a rewritten path still needs corresponding emitted output. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations of the narrow transformation.
type _DemoRelative = Expect<Equal<RewriteRelativeImport<"./a.ts">, "./a.js">>;
type _DemoPackage = Expect<Equal<RewriteRelativeImport<"pkg/a.ts">, "pkg/a.ts">>;
type _DemoDeclaration = Expect<Equal<RewriteRelativeImport<"./a.d.ts">, "./a.d.ts">>;
type _DemoCaseCount = Expect<Equal<typeof rewriteCases["length"], 8>>;

// 1. Naive suffix rewriting differs from the full rule (1-7)
type _01 = Expect<Equal<RewriteSourceExtension<"pkg/a.ts">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<RewriteRelativeImport<"pkg/a.ts">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<RewriteSourceExtension<"./a.d.ts">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<RewriteRelativeImport<"./a.d.ts">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<IsDeclarationPath<"./a.d.ts">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsDeclarationPath<"./a.ts">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<RewriteRelativeImport<"./a.ts">, RewriteSourceExtension<"./a.ts">>, TODO>>; // TODO(koan) @koan-error

// 2. Non-relative resolution mechanisms stay untouched (8-15)
type _08 = Expect<Equal<RewriteRelativeImport<"pkg/file.ts">, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<RewriteRelativeImport<"@scope/pkg/file.ts">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<RewriteRelativeImport<"#root/file.ts">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<RewriteRelativeImport<"@/file.ts">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<RewriteRelativeImport<"/absolute/file.ts">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<RewriteRelativeImport<"node:fs">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<RewriteRelativeImport<"./file.js">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<RewriteRelativeImport<"./file">, TODO>>; // TODO(koan) @koan-error

// 3. Broad and unusual strings expose syntactic limits (16-22)
type _16 = Expect<Equal<RewriteRelativeImport<string>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<IsBroadString<RewriteRelativeImport<string>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<RewriteRelativeImport<never>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsNever<RewriteRelativeImport<never>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<RewriteRelativeImport<"./file.ts?raw">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<RewriteRelativeImport<"./file.ts#fragment">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<RewriteRelativeImport<"./file.TS">, TODO>>; // TODO(koan) @koan-error

// 4. Runtime helper preserves const-generic precision (23-27)
type _23 = Expect<Equal<ReturnType<typeof rewriteRelativeImport<"./a.ts">>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReturnType<typeof rewriteRelativeImport<"./a.d.ts">>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof rewriteRelativeImport<"pkg/a.ts">>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<typeof rewriteRelativeImport>[0], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<typeof rewriteRelativeImport>, TODO>>; // TODO(koan) @koan-error

// 5. Union and top/bottom relationships (28-30)
type _28 = Expect<Equal<RewriteRelativeImport<"./a.ts" | "./b.cts" | "pkg/c.ts">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<RewriteRelativeImport<"./a.ts">, string>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<unknown, RewriteRelativeImport<string>>, TODO>>; // TODO(koan) @koan-error
