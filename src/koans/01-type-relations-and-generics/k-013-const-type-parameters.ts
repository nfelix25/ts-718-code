import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-013: Const type parameters
 * =============================================================================
 *
 * A `const` type parameter asks inference to preserve literal structure for
 * object, array, and primitive expressions written directly at the call site.
 * It gives API authors `as const`-like inference without requiring every caller
 * to add an assertion. The modifier changes inference preference, not runtime
 * behavior and not the meaning of an explicitly supplied type argument.
 *
 * I read `<const T>(value: T): T` aloud as:
 *
 *   "Infer T from this call, preferring the most literal readonly representation
 *    that still satisfies T's constraint."
 *
 * Ordinary unconstrained generics already preserve a lone primitive literal;
 * the visible difference is strongest for mutable object properties and arrays.
 * Preservation happens while the argument expression is inferred. A variable
 * that was widened earlier cannot recover lost literals. The inferred candidate
 * must also satisfy the constraint. On the current compiler, a mutable tuple
 * constraint can retain a mutable literal tuple while a readonly constraint can
 * retain a readonly one; older TS 5.0-era examples often showed broader fallback.
 */

export function captureOrdinary<T>(value: T): T {
  return value;
}

export function captureConst<const T>(value: T): T {
  return value;
}

export function captureMutableArray<T extends string[]>(value: T): T {
  return value;
}

export function captureConstMutableArray<const T extends string[]>(value: T): T {
  return value;
}

export function captureConstReadonlyArray<
  const T extends readonly string[],
>(value: T): T {
  return value;
}

export function captureParts<const Parts extends readonly string[]>(
  ...parts: Parts
): Parts {
  return parts;
}

export function defineRoutes<
  const Routes extends Record<string, { method: string; path: string }>,
>(routes: Routes): Routes {
  return routes;
}

// Part 1: Primitive literals are often preserved by ordinary inference already.
const mainOrdinaryString = captureOrdinary("ready");
const mainConstString = captureConst("ready");
const mainOrdinaryNumber = captureOrdinary(200);
const mainConstNumber = captureConst(200);
type _Main01 = Expect<Equal<typeof mainOrdinaryString, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainConstString, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainOrdinaryNumber, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainConstNumber, TODO>>; // TODO(koan) @koan-error

// Part 2: Mutable object members expose the main inference contrast.
const mainOrdinaryObject = captureOrdinary({ kind: "ready", count: 1 });
const mainConstObject = captureConst({ kind: "ready", count: 1 });
const mainOrdinaryNested = captureOrdinary({ config: { mode: "strict" }, enabled: true });
const mainConstNested = captureConst({ config: { mode: "strict" }, enabled: true });
type _Main05 = Expect<Equal<typeof mainOrdinaryObject, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainConstObject, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainOrdinaryNested, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainConstNested, TODO>>; // TODO(koan) @koan-error

// Part 3: Array expressions can become readonly tuples under const inference.
const mainOrdinaryArray = captureOrdinary(["a", "b"]);
const mainConstArray = captureConst(["a", "b"]);
const mainOrdinaryMixed = captureOrdinary(["ok", 200, true]);
const mainConstMixed = captureConst(["ok", 200, true]);
type _Main09 = Expect<Equal<typeof mainOrdinaryArray, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainConstArray, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainOrdinaryMixed, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainConstMixed, TODO>>; // TODO(koan) @koan-error

// Part 4: The constraint determines the mutability of the retained candidate.
const mainMutableFallback = captureConstMutableArray(["a", "b"]);
const mainReadonlyCandidate = captureConstReadonlyArray(["a", "b"]);
const mainOrdinaryMutable = captureMutableArray(["a", "b"]);
const mainPreservedArgument = captureConstMutableArray(["a", "b"] as ["a", "b"]);
type _Main13 = Expect<Equal<typeof mainMutableFallback, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainReadonlyCandidate, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainOrdinaryMutable, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainPreservedArgument, TODO>>; // TODO(koan) @koan-error

// Part 5: Const inference makes tuple- and registry-oriented APIs ergonomic.
const mainParts = captureParts("users", ":id", "settings");
const mainRoute = defineRoutes({ home: { method: "GET", path: "/" } });
const mainRoutes = defineRoutes({
  users: { method: "GET", path: "/users" },
  createUser: { method: "POST", path: "/users" },
});
const mainExplicitRoute = defineRoutes<Record<string, { method: string; path: string }>>({
  home: { method: "GET", path: "/" },
});
type _Main17 = Expect<Equal<typeof mainParts, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainRoute, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainRoutes, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainExplicitRoute, TODO>>; // TODO(koan) @koan-error
