import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 200 - RELATIVE IMPORT EXTENSION REWRITING
 * ================================================
 *
 * Runtimes that execute TypeScript in place need source imports such as
 * `./worker.ts`. Published JavaScript needs that same specifier to point at
 * `./worker.js`. TypeScript 5.7's `rewriteRelativeImportExtensions` option
 * bridges those workflows during emit.
 *
 * Read the rule literally: if a static specifier starts with `./` or `../`,
 * ends in `.ts`, `.tsx`, `.mts`, or `.cts`, and is not a declaration file,
 * rewrite only the suffix to `.js`, `.jsx`, `.mjs`, or `.cjs`.
 *
 * The transformation is intentionally local and syntactic. Package names,
 * package-import maps, path aliases, extensionless paths, existing JavaScript
 * paths, and computed dynamic imports are not resolved and rewritten.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html#path-rewriting-for-relative-paths
 */

export type TypeScriptSourceExtension = ".ts" | ".tsx" | ".mts" | ".cts";
export type JavaScriptOutputExtension = ".js" | ".jsx" | ".mjs" | ".cjs";

export type RewriteSourceExtension<Path extends string> =
  Path extends `${infer Stem}.tsx`
    ? `${Stem}.jsx`
    : Path extends `${infer Stem}.mts`
      ? `${Stem}.mjs`
      : Path extends `${infer Stem}.cts`
        ? `${Stem}.cjs`
        : Path extends `${infer Stem}.ts`
          ? `${Stem}.js`
          : Path;

export type IsDeclarationPath<Path extends string> =
  Path extends `${string}.d.ts` | `${string}.d.mts` | `${string}.d.cts`
    ? true
    : false;

export type RewriteRelativeImport<Path extends string> =
  Path extends `./${string}` | `../${string}`
    ? IsDeclarationPath<Path> extends true
      ? Path
      : RewriteSourceExtension<Path>
    : Path;

export function rewriteRelativeImport<const Path extends string>(
  path: Path,
): RewriteRelativeImport<Path> {
  if (!path.startsWith("./") && !path.startsWith("../")) {
    return path as RewriteRelativeImport<Path>;
  }
  if (/\.d\.(?:ts|mts|cts)$/.test(path)) {
    return path as RewriteRelativeImport<Path>;
  }
  const replacements: Record<TypeScriptSourceExtension, JavaScriptOutputExtension> = {
    ".ts": ".js",
    ".tsx": ".jsx",
    ".mts": ".mjs",
    ".cts": ".cjs",
  };
  for (const [source, output] of Object.entries(replacements)) {
    if (path.endsWith(source)) {
      return `${path.slice(0, -source.length)}${output}` as RewriteRelativeImport<Path>;
    }
  }
  return path as RewriteRelativeImport<Path>;
}

export const rewriteCases = [
  ["./foo.ts", "./foo.js"],
  ["../ui/view.tsx", "../ui/view.jsx"],
  ["./esm.mts", "./esm.mjs"],
  ["./common.cts", "./common.cjs"],
  ["package/file.ts", "package/file.ts"],
  ["#/file.ts", "#/file.ts"],
  ["./types.d.ts", "./types.d.ts"],
  ["./already.js", "./already.js"],
] as const;

// Part 1: learn the exact extension mapping.
type _01 = Expect<Equal<TypeScriptSourceExtension, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<JavaScriptOutputExtension, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<RewriteSourceExtension<"./file.ts">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<RewriteSourceExtension<"./view.tsx">, TODO>>; // TODO(koan) @koan-error

// Part 2: module-format extensions retain their format.
type _05 = Expect<Equal<RewriteSourceExtension<"./module.mts">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<RewriteSourceExtension<"./module.cts">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<RewriteSourceExtension<"./file.js">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<RewriteSourceExtension<"./file">, TODO>>; // TODO(koan) @koan-error

// Part 3: rewriting requires a relative, non-declaration path.
type _09 = Expect<Equal<RewriteRelativeImport<"./file.ts">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<RewriteRelativeImport<"../file.ts">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<RewriteRelativeImport<"package/file.ts">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<RewriteRelativeImport<"./file.d.ts">, TODO>>; // TODO(koan) @koan-error

// Part 4: declaration detection is a separate predicate.
type _13 = Expect<Equal<IsDeclarationPath<"./file.d.ts">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsDeclarationPath<"./file.d.mts">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsDeclarationPath<"./file.ts">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<IsDeclarationPath<string>, TODO>>; // TODO(koan) @koan-error

// Part 5: the runtime helper preserves the literal rewritten result.
type _17 = Expect<Equal<ReturnType<typeof rewriteRelativeImport<"./foo.ts">>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<typeof rewriteRelativeImport>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<typeof rewriteCases[number][0], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<typeof rewriteCases[number][1], TODO>>; // TODO(koan) @koan-error
