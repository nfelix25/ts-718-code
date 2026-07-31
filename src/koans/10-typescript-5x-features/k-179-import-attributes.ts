import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 179 - IMPORT ATTRIBUTES
 * ============================
 *
 * Import attributes attach host-readable information to a module request.
 * TypeScript 5.3 supports static `with { ... }` clauses and the second argument
 * to dynamic `import()`. A common request is `{ type: "json" }`, telling the
 * host to interpret the target as JSON rather than executable JavaScript.
 *
 * TypeScript preserves attributes for the host. Their meanings are deliberately
 * host-specific: the compiler checks the broad string-key/string-value shape,
 * but it does not decide whether `"json"` or a custom value is supported.
 *
 * Read `import(path, { with: attributes })` aloud as "ask the host to load this
 * path under these interpretation hints." The earlier `assert { ... }` syntax
 * is obsolete; new code uses `with`.
 *
 * Feature ownership: TypeScript 5.3 syntax and ImportCallOptions declarations.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html#import-attributes
 */

export type JsonImportAttributes = { readonly type: "json" };

export const jsonImportAttributes = {
  type: "json",
} as const satisfies ImportAttributes;

export function makeImportOptions(
  attributes: ImportAttributes,
): ImportCallOptions {
  return { with: attributes };
}

export function readImportAttribute(
  attributes: ImportAttributes,
  name: string,
): string | undefined {
  return attributes[name];
}

export function mergeImportAttributes(
  base: ImportAttributes,
  extra: ImportAttributes,
): ImportAttributes {
  return { ...base, ...extra };
}

export async function importWithAttributes(
  specifier: string,
  attributes: ImportAttributes,
): Promise<unknown> {
  return import(specifier, { with: attributes });
}

// Part 1: attributes are string-keyed, string-valued host hints.
type _01 = Expect<Equal<JsonImportAttributes["type"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof jsonImportAttributes, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<JsonImportAttributes extends ImportAttributes ? true : false, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ImportAttributes[string], TODO>>; // TODO(koan) @koan-error

// Part 2: dynamic import nests attributes under a `with` option.
type _05 = Expect<Equal<ImportCallOptions["with"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof makeImportOptions>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof makeImportOptions>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<typeof importWithAttributes>, TODO>>; // TODO(koan) @koan-error

// Part 3: custom host-defined attributes retain the same broad shape.
type _09 = Expect<Equal<{ type: "css" } extends ImportAttributes ? true : false, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<{ integrity: "sha256-value" } extends ImportAttributes ? true : false, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<{ mode: number } extends ImportAttributes ? true : false, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof readImportAttribute>, TODO>>; // TODO(koan) @koan-error

// Part 4: attribute records combine with ordinary object operations.
type _13 = Expect<Equal<Parameters<typeof mergeImportAttributes>[0], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof mergeImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Readonly<JsonImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<keyof JsonImportAttributes, TODO>>; // TODO(koan) @koan-error

// Part 5: host support is not encoded as a closed TypeScript union.
type _17 = Expect<Equal<string extends ImportAttributes[string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<"json" extends ImportAttributes[string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<undefined extends ImportAttributes[string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Awaited<ReturnType<typeof importWithAttributes>>, TODO>>; // TODO(koan) @koan-error
