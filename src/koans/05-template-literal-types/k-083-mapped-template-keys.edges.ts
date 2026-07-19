import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-083 edge cases: mapped template keys
 * =============================================================================
 * Template remapping forces a key-domain decision. These cases stress symbols,
 * number/string normalization, optional/readonly modifiers, collisions, broad
 * index signatures, object unions, empty keys, never, and patterned key access.
 */

type EGetters<T> = { [K in keyof T as K extends string ? `get${Capitalize<K>}` : never]: () => T[K] };
type EPreserve<T, P extends string> = { [K in keyof T as K extends string ? `${P}${Capitalize<K>}` : K]: T[K] };
type EStringify<T> = { [K in keyof T as K extends string | number ? `${K}` : never]: T[K] };
type EPrefixRaw<T, P extends string> = { [K in keyof T as K extends string ? `${P}${K}` : never]: T[K] };

declare const eToken: unique symbol;
type EMixed = { name: string; 0: boolean; [eToken]: Date };

// Filtering, preserving, and stringifying expose different key sets.
type _E01 = Expect<Equal<keyof EGetters<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<keyof EPreserve<EMixed, "api">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<keyof EStringify<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EPreserve<EMixed, "api">[typeof eToken], TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EStringify<EMixed>["0"], TODO>>; // TODO(koan) @koan-error

// Empty string keys and empty prefixes remain valid template results.
type _E06 = Expect<Equal<EGetters<{ "": number }>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EPrefixRaw<{ "": number }, "pre">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EPrefixRaw<{ name: string }, "">, TODO>>; // TODO(koan) @koan-error

// Homomorphic remapping preserves modifiers unless explicitly changed.
type EModified = EPrefixRaw<{ readonly fixed: number; optional?: string }, "x">;
type _E09 = Expect<Equal<EModified["xfixed"], TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EModified["xoptional"], TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<{} extends Pick<EModified, "xoptional"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<Readonly<EModified> extends EModified ? true : false, TODO>>; // TODO(koan) @koan-error

// Different source keys can collide after capitalization or other normalization.
type ECollision = EGetters<{ name: 1; Name: 2 }>;
type _E13 = Expect<Equal<keyof ECollision, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ReturnType<ECollision["getName"]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EPrefixRaw<{ a: 1; A: 2 }, "">, TODO>>; // TODO(koan) @koan-error

// Broad index signatures produce patterned key domains.
type _E16 = Expect<Equal<keyof EGetters<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EGetters<Record<string, number>>[`get${string}`], TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<keyof EPrefixRaw<Record<string, boolean>, "x">, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<keyof EStringify<Record<number, boolean>>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EStringify<Record<number, boolean>>[`${number}`], TODO>>; // TODO(koan) @koan-error

// Mapping object unions retains per-member structure but keyof their result is shared.
type EUnion = EPrefixRaw<{ a: 1 } | { b: 2 }, "x">;
type _E21 = Expect<Equal<EUnion, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<keyof EUnion, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EUnion extends { xa: 1 } | { xb: 2 } ? true : false, TODO>>; // TODO(koan) @koan-error

// Empty and never sources have different mapped-type identities.
type _E24 = Expect<Equal<EGetters<{}>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<keyof EGetters<{}>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EGetters<never>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<keyof EGetters<never>, TODO>>; // TODO(koan) @koan-error

// Pattern membership distinguishes framed transformed keys from arbitrary strings.
type _E28 = Expect<Equal<"getName" extends keyof EGetters<Record<string, number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<"name" extends keyof EGetters<Record<string, number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<typeof eToken extends keyof EPreserve<EMixed, "api"> ? true : false, TODO>>; // TODO(koan) @koan-error

// Pre-solved: filtering to string keys excludes number and symbol identities.
type _DemoFilter = Expect<Equal<keyof EGetters<EMixed>, "getName">>;

// Pre-solved: preserving policy keeps nonstring keys unchanged.
type _DemoPreserve = Expect<Equal<
  keyof EPreserve<EMixed, "api">,
  "apiName" | 0 | typeof eToken
>>;

// Pre-solved: colliding remapped keys combine the source value candidates.
type _DemoCollision = Expect<Equal<ReturnType<ECollision["getName"]>, 1 | 2>>;

// A symbol cannot be interpolated directly without a filtering branch.
// @ts-expect-error Symbols are outside template literal interpolation.
type InvalidSymbolTemplate = `${typeof eToken}`;
