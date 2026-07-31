import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type JSDocImport,
  type JSDocNamedImport,
  type JSDocNamespaceImport,
  defineNamedImport,
  defineNamespaceImport,
  namedModelImport,
  referenceImportedType,
  renderJSDocImport,
} from "./k-192-jsdoc-import.js";

/** EDGE CASES: @import is meaningful to TypeScript only inside checked JavaScript, never creates runtime bindings, follows module resolution, is file-scoped, can name value exports for type-position use, and still inherits ordinary widening, missing-export, alias, and configuration concerns. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsUnion<Value, Whole = Value> =
  Value extends unknown
    ? [Whole] extends [Value]
      ? false
      : true
    : never;

// Pre-solved demonstrations: the model has no runtime import operation.
type _DemoNamedKind = Expect<Equal<typeof namedModelImport.kind, "named">>;
type _DemoNoRuntimeBinding = Expect<Equal<"none" extends "none" ? true : false, true>>;
type _DemoUnion = Expect<Equal<IsUnion<JSDocImport>, true>>;
type _DemoCommentRenderer = Expect<Equal<ReturnType<typeof renderJSDocImport>, string>>;

const widenedNames: string[] = ["User", "UserId"];
const widenedNamed = defineNamedImport("./models.js", ...widenedNames);
const broadModule: string = "./models.js";
const widenedNamespace = defineNamespaceImport(broadModule, "models");

// 1. Const inference versus caller widening (1-8)
type _01 = Expect<Equal<typeof namedModelImport.names, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof widenedNamed.names, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<typeof widenedNamed.names[number], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<typeof widenedNamed.from, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<typeof widenedNamespace.from, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<typeof widenedNamespace.alias, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<typeof namedModelImport, JSDocNamedImport>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<typeof widenedNamespace, JSDocNamespaceImport>, TODO>>; // TODO(koan) @koan-error

// 2. Empty tuples and never propagation (9-15)
type EmptyImport = JSDocNamedImport<"./empty.js", readonly []>;
type _09 = Expect<Equal<EmptyImport["names"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<EmptyImport["names"][number], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<IsNever<EmptyImport["names"][number]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<JSDocImport, { kind: "missing" }>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<IsNever<Extract<JSDocImport, { kind: "missing" }>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Exclude<JSDocImport, JSDocImport>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsNever<Exclude<JSDocImport, JSDocImport>>, TODO>>; // TODO(koan) @koan-error

// 3. Union keys and discriminant-only common access (16-22)
type _16 = Expect<Equal<keyof JSDocImport, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<JSDocImport["kind"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<JSDocImport["from"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<JSDocImport, { kind: "named" }>["names"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<JSDocImport, { kind: "namespace" }>["alias"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<IsUnion<JSDocImport["kind"]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<JSDocImport, { from: string }>, TODO>>; // TODO(koan) @koan-error

// 4. Runtime helpers manipulate strings, not imported modules (23-27)
type _23 = Expect<Equal<ReturnType<typeof renderJSDocImport>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof renderJSDocImport>[0], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof referenceImportedType>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<typeof referenceImportedType>[0], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Parameters<typeof referenceImportedType>[1], TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom inputs expose model boundaries (28-30)
type _28 = Expect<Equal<Extends<unknown, JSDocImport>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<never, JSDocImport>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<JSDocImport, unknown>, TODO>>; // TODO(koan) @koan-error
