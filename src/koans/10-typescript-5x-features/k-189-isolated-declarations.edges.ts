import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AnnotationState,
  type DeclarationAudit,
  type ExportKind,
  type User,
  UserStore,
  createUser,
  declarationReady,
  protocolVersion,
} from "./k-189-isolated-declarations.js";

/** EDGE CASES: only exported API shape matters, trivial literal inference is allowed, complex public inference needs annotations, declaration/composite is required, diagnostics do not alter emit, computed names remain constrained, annotations preserve author spelling, and private/local implementation details disappear. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;

// Pre-solved diagnostic matrix expressed without adding broken source.
type RequiresAnnotation<Kind extends ExportKind, State extends AnnotationState> =
  State extends "missing"
    ? Kind extends "function" | "method" | "variable" ? true : false
    : false;
type _DemoFunctionMissing = Expect<Equal<RequiresAnnotation<"function", "missing">, true>>;
type _DemoFunctionExplicit = Expect<Equal<RequiresAnnotation<"function", "explicit">, false>>;
type _DemoTrivialLiteral = Expect<Equal<typeof protocolVersion, 1>>;
type _DemoLocalIrrelevant = Expect<Equal<RequiresAnnotation<"variable", "trivial">, false>>;

// 1. Diagnostic matrix (1-8)
type _01 = Expect<Equal<RequiresAnnotation<"function", "missing">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<RequiresAnnotation<"function", "explicit">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<RequiresAnnotation<"variable", "missing">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<RequiresAnnotation<"variable", "trivial">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<RequiresAnnotation<"method", "missing">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<RequiresAnnotation<"method", "explicit">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<RequiresAnnotation<"class", "missing">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<RequiresAnnotation<ExportKind, "missing">, TODO>>; // TODO(koan) @koan-error

// 2. Public API versus implementation (9-15)
type Store = InstanceType<typeof UserStore>;
type _09 = Expect<Equal<keyof User, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<keyof Store, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<typeof createUser>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof createUser>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Store["users"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Store["size"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<Store["add"]>, TODO>>; // TODO(koan) @koan-error

// 3. Audit optionality and exhaustive states (16-22)
type _16 = Expect<Equal<AnnotationState, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ExportKind, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<AnnotationState, "missing">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<AnnotationState, "missing">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Exclude<ExportKind, "class">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Required<Partial<DeclarationAudit>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnType<typeof declarationReady>, TODO>>; // TODO(koan) @koan-error

// 4. Top/bottom and declaration-visible transformations (23-30)
type _23 = Expect<Equal<IsNever<RequiresAnnotation<never, "missing">>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<RequiresAnnotation<"function", never>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<never, ExportKind>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<unknown, ExportKind>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Readonly<User>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Partial<User>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Pick<User, "name">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Omit<User, "name">, TODO>>; // TODO(koan) @koan-error
