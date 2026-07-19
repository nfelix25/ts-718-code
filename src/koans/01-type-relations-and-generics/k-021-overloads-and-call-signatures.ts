import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-021: Overloads and call signatures
 * =============================================================================
 *
 * An overloaded function exposes several public call signatures above one
 * implementation. A call is checked against the overload list; the implementation
 * signature exists to make the body safe and is not an extra callable case.
 * Resolution chooses an applicable overload, with earlier specific signatures
 * able to win over later broad ones.
 *
 * I read an overload set aloud as:
 *
 *   "Callers may use any one listed contract. The implementation must handle all
 *    of them, but callers cannot see additional flexibility in its body signature."
 *
 * Object and interface types can declare call signatures without describing an
 * implementation. A type parameter on the call signature is selected per call;
 * a type parameter on the containing interface is fixed for that interface
 * instance. Construct signatures model `new` separately. Utility types such as
 * `Parameters` and `ReturnType` do not perform overload resolution: they inspect
 * the last public overload signature. Union arguments often fail because one
 * overload must accept the entire argument type, not a different branch per value.
 */

export function convert(value: string): number;
export function convert(value: number): string;
export function convert(value: string | number): string | number {
  return typeof value === "string" ? value.length : String(value);
}

export function concatenate(left: string, right: string): string;
export function concatenate<T>(left: readonly T[], right: readonly T[]): T[];
export function concatenate(
  left: string | readonly unknown[],
  right: string | readonly unknown[],
): string | unknown[] {
  if (typeof left === "string" && typeof right === "string") return left + right;
  return [...(left as readonly unknown[]), ...(right as readonly unknown[])];
}

export function lookup(key: "id"): number;
export function lookup(key: "name"): string;
export function lookup(key: string): unknown;
export function lookup(key: string): unknown {
  if (key === "id") return 1;
  if (key === "name") return "Ada";
  return undefined;
}

export interface GenericIdentity {
  <T>(value: T): T;
}

export interface FixedIdentity<T> {
  (value: T): T;
}

export const genericIdentity: GenericIdentity = (value) => value;
export const stringIdentity: FixedIdentity<string> = (value) => value;

export interface DateFactory {
  (timestamp: number): Date;
  (iso: string): Date;
}

export const makeDate: DateFactory = (value: number | string) =>
  typeof value === "number" ? new Date(value) : new Date(value);

// Part 1: Each argument type selects its public overload result.
const mainConvertedNumber = convert("123");
const mainConvertedString = convert(123);
const mainLiteralString = convert("a");
const mainLiteralNumber = convert(1);
type _Main01 = Expect<Equal<typeof mainConvertedNumber, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainConvertedString, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainLiteralString, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainLiteralNumber, TODO>>; // TODO(koan) @koan-error

// Part 2: Generic and non-generic overloads can share one implementation.
const mainText = concatenate("type", "script");
const mainNumbers = concatenate([1, 2], [3, 4]);
const mainStrings = concatenate(["a"], ["b"]);
const mainObjects = concatenate([{ id: 1 }], [{ id: 2 }]);
type _Main05 = Expect<Equal<typeof mainText, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainNumbers, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainStrings, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainObjects, TODO>>; // TODO(koan) @koan-error

// Part 3: Specific signatures should precede a broad fallback overload.
const mainId = lookup("id");
const mainName = lookup("name");
const mainOther = lookup("other");
const mainDynamic = lookup("dynamic" as string);
type _Main09 = Expect<Equal<typeof mainId, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainName, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainOther, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainDynamic, TODO>>; // TODO(koan) @koan-error

// Part 4: Call-signature placement controls when a generic is chosen.
const mainGenericNumber = genericIdentity(1);
const mainGenericString = genericIdentity("a");
const mainFixedString = stringIdentity("a");
const mainGenericTuple = genericIdentity([1, "a"] as const);
type _Main13 = Expect<Equal<typeof mainGenericNumber, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainGenericString, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainFixedString, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainGenericTuple, TODO>>; // TODO(koan) @koan-error

// Part 5: Callable interfaces and utility types observe different surfaces.
const mainDateNumber = makeDate(0);
const mainDateString = makeDate("2020-01-01T00:00:00.000Z");
type MainConvertParameters = Parameters<typeof convert>;
type MainConvertReturn = ReturnType<typeof convert>;
type _Main17 = Expect<Equal<typeof mainDateNumber, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainDateString, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainConvertParameters, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MainConvertReturn, TODO>>; // TODO(koan) @koan-error
