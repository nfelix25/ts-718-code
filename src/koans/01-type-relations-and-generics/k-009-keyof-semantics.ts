import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-009: keyof semantics
 * =============================================================================
 *
 * `keyof T` asks which property-key types the checker permits me to use when I
 * have only the static view T. Its result is a union drawn from string, number,
 * and symbol keys. Optional and readonly modifiers affect value operations, not
 * whether a key belongs to that union.
 *
 * I read `keyof T` aloud as:
 *
 *   "the union of every key guaranteed by the static type T."
 *
 * That word "guaranteed" explains the apparent reversal for composites. A
 * value of `A | B` guarantees only keys shared by both alternatives, whereas a
 * value of `A & B` supplies both surfaces. Index signatures describe whole key
 * domains, and JavaScript's string coercion makes a string index signature also
 * admit number keys. `keyof` is static: it is not an exact model of Object.keys,
 * enumerable ownership, symbol enumeration, or properties added at runtime.
 */

export function typedEnumerableKeys<T extends object>(value: T): Array<keyof T> {
  return Object.keys(value) as Array<keyof T>;
}

export function hasOwnKey<T extends object>(
  value: T,
  key: PropertyKey,
): key is keyof T {
  return Object.hasOwn(value, key);
}

export function keyCategory(key: PropertyKey): "string" | "number" | "symbol" {
  if (typeof key === "symbol") return "symbol";
  if (typeof key === "number") return "number";
  return "string";
}

export function ownKeyCount(value: object): number {
  return Reflect.ownKeys(value).length;
}

// Part 1: Declared members contribute keys regardless of property modifiers.
interface MainPerson {
  readonly id: string;
  name?: string;
  active: boolean;
  greet(): string;
}

type MainPersonKeys = keyof MainPerson;
type MainRequiredKeys = keyof { required: string; optional?: number };
type MainReadonlyKeys = keyof { readonly fixed: true; mutable: false };
type MainMethodKeys = keyof { run(): void; stop: () => void };
type _Main01 = Expect<Equal<MainPersonKeys, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainRequiredKeys, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainReadonlyKeys, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<MainMethodKeys, TODO>>; // TODO(koan) @koan-error

// Part 2: Property keys can be strings, numbers, or unique symbols.
declare const mainToken: unique symbol;
type MainMixedKeys = keyof { name: string; 0: boolean; [mainToken]: Date };
type MainNumericKeys = keyof { 0: "zero"; 1: "one"; length: 2 };
type MainSymbolKey = keyof { [mainToken]: string };
type MainPropertyKey = keyof any;
type _Main05 = Expect<Equal<MainMixedKeys, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainNumericKeys, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainSymbolKey, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<MainPropertyKey, TODO>>; // TODO(koan) @koan-error

// Part 3: Index signatures describe broad key domains.
type MainStringIndexKeys = keyof { [key: string]: boolean };
type MainNumberIndexKeys = keyof { [index: number]: string };
type MainNumberWithNamedKeys = keyof { [index: number]: string; length: number };
type MainSymbolIndexKeys = keyof { [key: symbol]: unknown };
type _Main09 = Expect<Equal<MainStringIndexKeys, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<MainNumberIndexKeys, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainNumberWithNamedKeys, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<MainSymbolIndexKeys, TODO>>; // TODO(koan) @koan-error

// Part 4: Arrays and tuples expose index keys plus their object APIs.
type MainArrayHasNumber = number extends keyof string[] ? true : false;
type MainArrayHasPush = "push" extends keyof string[] ? true : false;
type MainTupleHasLiteralZero = "0" extends keyof readonly ["a", "b"] ? true : false;
type MainTupleHasNumber = number extends keyof readonly ["a", "b"] ? true : false;
type _Main13 = Expect<Equal<MainArrayHasNumber, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<MainArrayHasPush, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<MainTupleHasLiteralZero, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<MainTupleHasNumber, TODO>>; // TODO(koan) @koan-error

// Part 5: Unions keep common guarantees; intersections combine key surfaces.
type MainLeft = { shared: string; left: number };
type MainRight = { shared: string; right: boolean };
type MainUnionKeys = keyof (MainLeft | MainRight);
type MainIntersectionKeys = keyof (MainLeft & MainRight);
type MainUnknownKeys = keyof unknown;
type MainNeverKeys = keyof never;
type _Main17 = Expect<Equal<MainUnionKeys, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainIntersectionKeys, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainUnknownKeys, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MainNeverKeys, TODO>>; // TODO(koan) @koan-error
