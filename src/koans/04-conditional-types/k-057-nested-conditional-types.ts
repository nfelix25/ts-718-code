import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-057: nested conditional types
 * =============================================================================
 *
 * A conditional branch may contain another conditional, producing an ordered
 * decision tree. Evaluation stops at the first satisfied test, so branch order
 * is semantic whenever constraints overlap.
 *
 * I read a chain aloud as:
 *
 *   "If T matches the first, choose it; otherwise test the second; otherwise
 *    test the third; otherwise use the final fallback."
 *
 * Put narrower cases before broader supertypes: `"admin"` before `string`,
 * tuples and arrays before `object`, functions before `object`, and specific
 * status codes before `number`. A broad early branch makes later branches
 * unreachable at the type level. Each selected branch may still mention T,
 * preserving literal or structural information in its result. Helper aliases
 * can name sub-decisions when a long inline chain stops reading clearly. This
 * lesson focuses on ordering and reduction; deferred generics and union
 * distribution receive dedicated treatment next.
 */

export type TypeCategory<T> =
  T extends null ? "null" :
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends readonly unknown[] ? "array" :
  T extends (...args: any[]) => unknown ? "function" :
  T extends object ? "object" :
  "other";

export type RoleAccess<T> =
  T extends "admin" ? { level: 3; role: T } :
  T extends "editor" ? { level: 2; role: T } :
  T extends string ? { level: 1; role: T } :
  { level: 0; role: "anonymous" };

export type HttpCategory<Code extends number> =
  Code extends 200 | 201 | 204 ? "success" :
  Code extends 301 | 302 ? "redirect" :
  Code extends 400 | 401 | 403 | 404 ? "client-error" :
  Code extends 500 | 502 | 503 ? "server-error" :
  "unknown";

export function typeCategory<T>(value: T): TypeCategory<T> {
  if (value === null) return "null" as TypeCategory<T>;
  if (Array.isArray(value)) return "array" as TypeCategory<T>;
  return (typeof value === "object" ? "object" : typeof value) as TypeCategory<T>;
}

export function roleAccess<T>(role: T): RoleAccess<T> {
  if (role === "admin") return { level: 3, role } as RoleAccess<T>;
  if (role === "editor") return { level: 2, role } as RoleAccess<T>;
  if (typeof role === "string") return { level: 1, role } as RoleAccess<T>;
  return { level: 0, role: "anonymous" } as RoleAccess<T>;
}

export function httpCategory<Code extends number>(code: Code): HttpCategory<Code> {
  if ([200, 201, 204].includes(code)) return "success" as HttpCategory<Code>;
  if ([301, 302].includes(code)) return "redirect" as HttpCategory<Code>;
  if ([400, 401, 403, 404].includes(code)) return "client-error" as HttpCategory<Code>;
  if ([500, 502, 503].includes(code)) return "server-error" as HttpCategory<Code>;
  return "unknown" as HttpCategory<Code>;
}

// Part 1: A linear primitive classifier selects the first matching branch.
type _Main01 = Expect<Equal<TypeCategory<string>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<TypeCategory<42>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<TypeCategory<false>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<TypeCategory<symbol>, TODO>>; // TODO(koan) @koan-error

// Part 2: Null, arrays, functions, and objects require deliberate ordering.
type _Main05 = Expect<Equal<TypeCategory<null>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<TypeCategory<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<TypeCategory<() => void>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<TypeCategory<{ id: number }>, TODO>>; // TODO(koan) @koan-error

// Part 3: Literal cases must appear before their broader primitive constraint.
type _Main09 = Expect<Equal<RoleAccess<"admin">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<RoleAccess<"editor">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<RoleAccess<"viewer">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<RoleAccess<undefined>, TODO>>; // TODO(koan) @koan-error

// Part 4: Ordered sets make finite protocol classifications readable.
type _Main13 = Expect<Equal<HttpCategory<200>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<HttpCategory<302>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<HttpCategory<404>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<HttpCategory<418>, TODO>>; // TODO(koan) @koan-error

// Part 5: Reordering overlapping branches changes or shadows results.
type MainGood<T> = T extends "special" ? "literal" : T extends string ? "string" : "other";
type MainBad<T> = T extends string ? "string" : T extends "special" ? "literal" : "other";
type _Main17 = Expect<Equal<MainGood<"special">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainBad<"special">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainGood<"ordinary">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MainGood<Date>, TODO>>; // TODO(koan) @koan-error
