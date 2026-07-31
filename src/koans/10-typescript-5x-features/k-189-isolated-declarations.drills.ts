import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AnnotationState,
  type DeclarationAudit,
  type ExportKind,
  type User,
  UserStore,
  createUser,
  declarationReady,
  enabled,
  formatUser,
  protocolName,
  protocolVersion,
} from "./k-189-isolated-declarations.js";

/** GUIDED DRILLS: repeat trivial export types, explicit function/class surfaces, audit records, declaration-visible utility transforms, compiler-option prerequisites, and public-versus-local distinctions. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Store = InstanceType<typeof UserStore>;
type AuditByKind<Kind extends ExportKind> =
  DeclarationAudit & { kind: Kind };

// Trivial exported literals (1-12)
type _01 = Expect<Equal<typeof protocolVersion, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof protocolName, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<typeof enabled, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<typeof protocolVersion, number>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<number, typeof protocolVersion>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<typeof protocolName, string>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<string, typeof protocolName>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<typeof enabled, boolean>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<boolean, typeof enabled>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof protocolVersion | typeof protocolName, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<readonly [typeof protocolVersion, typeof protocolName], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Record<typeof protocolName, typeof protocolVersion>, TODO>>; // TODO(koan) @koan-error

// Explicit function surfaces (13-24)
type _13 = Expect<Equal<Parameters<typeof createUser>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<typeof createUser>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof createUser>[1], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof createUser>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Parameters<typeof formatUser>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<typeof formatUser>[0], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof formatUser>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<typeof createUser, (id: number, name: string) => User>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<typeof formatUser, (user: User) => string>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<User["id"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<User["name"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<keyof User, TODO>>; // TODO(koan) @koan-error

// Explicit class surfaces (25-36)
type _25 = Expect<Equal<ConstructorParameters<typeof UserStore>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<InstanceType<typeof UserStore>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Store["users"], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Store["users"][number], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Store["add"], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Parameters<Store["add"]>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<ReturnType<Store["add"]>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Store["size"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<keyof Store, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Pick<Store, "size">, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Omit<Store, "users">, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Readonly<Store>["users"], TODO>>; // TODO(koan) @koan-error

// Audit vocabulary (37-48)
type _37 = Expect<Equal<ExportKind, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<AnnotationState, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<keyof DeclarationAudit, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<DeclarationAudit["name"], TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<DeclarationAudit["kind"], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<DeclarationAudit["annotation"], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<AuditByKind<"function">["kind"], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<AuditByKind<"variable">["kind"], TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<AuditByKind<"class">["kind"], TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Parameters<typeof declarationReady>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<ReturnType<typeof declarationReady>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Partial<DeclarationAudit>, TODO>>; // TODO(koan) @koan-error

// Public declaration transforms (49-60)
type _49 = Expect<Equal<Pick<User, "id">, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Omit<User, "id">, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Readonly<User>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Partial<User>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Required<Partial<User>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Record<"user", User>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Array<User>[number], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Promise<User> extends Promise<infer Value> ? Value : never, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<User, object>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<object, User>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extract<AnnotationState, "missing">, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Exclude<AnnotationState, "missing">, TODO>>; // TODO(koan) @koan-error
