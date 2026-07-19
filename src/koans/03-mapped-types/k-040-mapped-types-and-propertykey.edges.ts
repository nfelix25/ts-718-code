import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-040 edges: empty, broad, any, numeric, symbol, and invalid key domains expose mapped-type boundaries. */

declare const eToken: unique symbol;
type EMap<K extends PropertyKey, V> = { [P in K]: V };

// Group 1: Empty and special iteration domains have distinct results.
type _E001 = Expect<Equal<EMap<never, string>, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<keyof EMap<never, string>, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<{ [K in keyof unknown]: K }, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<{ [K in keyof never]: K }, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<{ [K in keyof any]: K }, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<keyof any, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<keyof unknown, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<keyof never, TODO>>; // TODO(koan) @koan-error

// Demonstration A: mapping never emits zero properties. `keyof unknown` is also
// empty, while `keyof any` and `keyof never` span PropertyKey for different reasons.

// Group 2: Numeric literal keys and broad numeric index domains are not identical.
type ENumericLiteral = { [K in 0 | 1]: string };
type ENumericBroad = { [K in number]: string };
type EStringBroad = { [K in string]: string };
type _E009 = Expect<Equal<keyof ENumericLiteral, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<keyof ENumericBroad, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<keyof EStringBroad, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<ENumericLiteral[0], TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<ENumericBroad[42], TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<EStringBroad["42"], TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<EMap<0, string>, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<EMap<"0", string>, TODO>>; // TODO(koan) @koan-error

// Demonstration B: JavaScript coerces runtime numeric property names to strings,
// but TypeScript retains useful distinctions between literal and index domains.

// Group 3: Symbol keys require symbol identity, not a string description.
type ESymbol = EMap<typeof eToken, number>;
type EAllSymbols = EMap<symbol, boolean>;
type _E017 = Expect<Equal<keyof ESymbol, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<ESymbol[typeof eToken], TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<keyof EAllSymbols, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<EAllSymbols[typeof eToken], TODO>>; // TODO(koan) @koan-error
type EMixed = EMap<"name" | 0 | typeof eToken, Date>;
type _E021 = Expect<Equal<keyof EMixed, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<EMixed["name"], TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<EMixed[0], TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<EMixed[typeof eToken], TODO>>; // TODO(koan) @koan-error

// Demonstration C: unique symbols create one nominal key; broad symbol mappings
// accept every symbol key and do not manufacture named string properties.

// Group 4: Mapped syntax is type-level and key-constrained.
type EDependent<K extends PropertyKey> = { [P in K]: [P, P extends string ? "string" : "other"] };
type _E025 = Expect<Equal<EDependent<"a" | 1>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<EDependent<"a" | 1>["a"], TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<EDependent<"a" | 1>[1], TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<Record<never, string>, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<Record<PropertyKey, unknown>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<keyof Record<PropertyKey, unknown>, TODO>>; // TODO(koan) @koan-error

// @ts-expect-error Mapped iteration keys must be assignable to PropertyKey.
type InvalidObjectKey = { [K in { id: string }]: boolean };
// @ts-expect-error Interfaces cannot directly declare a mapped member.
interface InvalidMappedInterface { [K in "a" | "b"]: string }
