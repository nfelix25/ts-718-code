import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 189 - ISOLATED DECLARATIONS
 * =================================
 *
 * Declaration emit traditionally uses the whole type checker. An exported
 * function may return a value whose type depends on another file, forcing emit
 * to resolve imports and infer across the program. TypeScript 5.5 introduced
 * `--isolatedDeclarations` to report public APIs that cannot be transformed to
 * `.d.ts` one file at a time.
 *
 * Read the option as a portability contract: "a declaration emitter may use
 * this file's syntax, but it should not need cross-file type inference." Public
 * functions and complex exported values generally need explicit annotations.
 * Locals do not. Some trivial expressions, such as exported primitive literals,
 * are directly recognizable and need no annotation.
 *
 * The option requires `declaration` or `composite`. It reports diagnostics; it
 * does not itself change TypeScript's emitter or automatically parallelize a
 * build. The trade-off is more public annotation in exchange for alternative
 * emitters and more parallel build architectures.
 *
 * Compiler configuration ownership: TypeScript 5.5 diagnostics.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#isolated-declarations
 */

export interface User {
  id: number;
  name: string;
}

export const protocolVersion = 1;
export const protocolName = "koans";
export const enabled = true;

export function createUser(id: number, name: string): User {
  return { id, name };
}

export const formatUser: (user: User) => string =
  (user) => `${user.id}:${user.name}`;

export class UserStore {
  readonly users: User[] = [];

  add(user: User): void {
    this.users.push(user);
  }

  get size(): number {
    return this.users.length;
  }
}

export type AnnotationState = "explicit" | "trivial" | "missing";
export type ExportKind = "function" | "variable" | "class" | "method";

export interface DeclarationAudit {
  name: string;
  kind: ExportKind;
  annotation: AnnotationState;
}

export function declarationReady(item: DeclarationAudit): boolean {
  return item.annotation !== "missing";
}

// Part 1: trivial exported primitives have locally visible declaration types.
type _01 = Expect<Equal<typeof protocolVersion, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof protocolName, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<typeof enabled, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<typeof protocolVersion | typeof protocolName, TODO>>; // TODO(koan) @koan-error

// Part 2: exported functions state their public contracts.
type _05 = Expect<Equal<Parameters<typeof createUser>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof createUser>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof formatUser>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<typeof formatUser>, TODO>>; // TODO(koan) @koan-error

// Part 3: exported class member types are locally declared.
type _09 = Expect<Equal<InstanceType<typeof UserStore>["users"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<InstanceType<typeof UserStore>["add"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<InstanceType<typeof UserStore>["add"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<InstanceType<typeof UserStore>["size"], TODO>>; // TODO(koan) @koan-error

// Part 4: the audit vocabulary separates public export forms and annotations.
type _13 = Expect<Equal<ExportKind, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<AnnotationState, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<DeclarationAudit["kind"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<DeclarationAudit["annotation"], TODO>>; // TODO(koan) @koan-error

// Part 5: the option is a diagnostic precondition, not a runtime transform.
type _17 = Expect<Equal<Parameters<typeof declarationReady>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof declarationReady>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof DeclarationAudit, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof User, TODO>>; // TODO(koan) @koan-error
