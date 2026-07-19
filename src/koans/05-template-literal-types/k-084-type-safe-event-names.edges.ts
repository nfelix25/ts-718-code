import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-084 edge cases: type-safe event names
 * =============================================================================
 * Event derivation assumes textual keys and a reversible suffix convention.
 * These cases stress empty and suffix-like keys, optional values, broad records,
 * symbols/numbers, model unions, capitalization collisions, and special types.
 */

type EKeys<T> = Extract<keyof T, string>;
type EEvent<T> = `${EKeys<T>}Changed`;
type EKey<T, N extends string> = N extends `${infer K}Changed` ? K extends EKeys<T> ? K : never : never;
type EValue<T, N extends string> = EKey<T, N> extends infer K extends keyof T ? T[K] : never;
type EOnEvent<T> = `on${Capitalize<EKeys<T>>}Changed`;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty and suffix-like keys remain mechanically reversible one suffix at a time.
type _E01 = Expect<Equal<EEvent<{ "": number }>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EKey<{ "": number }, "Changed">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EEvent<{ statusChanged: boolean }>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EKey<{ statusChanged: boolean }, "statusChangedChanged">, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EKey<{ statusChanged: boolean }, "statusChanged">, TODO>>; // TODO(koan) @koan-error

// Optional properties carry undefined; readonly does not alter payload value type.
type _E06 = Expect<Equal<EValue<{ optional?: string }, "optionalChanged">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EValue<{ optional: string | undefined }, "optionalChanged">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EValue<{ readonly fixed: 1 }, "fixedChanged">, TODO>>; // TODO(koan) @koan-error

// Number and symbol keys are excluded by the chosen textual event policy.
declare const eToken: unique symbol;
type EMixed = { name: string; 0: boolean; [eToken]: Date };
type _E09 = Expect<Equal<EKeys<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EEvent<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EKey<EMixed, "0Changed">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EValue<EMixed, "0Changed">, TODO>>; // TODO(koan) @koan-error

// Broad string records create a patterned event family and broad correlated value.
type _E13 = Expect<Equal<EEvent<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<"anythingChanged" extends EEvent<Record<string, number>> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EKey<Record<string, number>, "anythingChanged">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EValue<Record<string, number>, "anythingChanged">, TODO>>; // TODO(koan) @koan-error

// keyof a model union contains only keys safe on every member.
type EUnionModel = { shared: string; a: number } | { shared: string; b: boolean };
type _E17 = Expect<Equal<EKeys<EUnionModel>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EEvent<EUnionModel>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EValue<EUnionModel, "sharedChanged">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EValue<EUnionModel, "aChanged">, TODO>>; // TODO(koan) @koan-error

// Capitalized naming conventions can collide even when raw suffix names do not.
type ECollision = { name: 1; Name: 2 };
type _E21 = Expect<Equal<EEvent<ECollision>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EOnEvent<ECollision>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EValue<ECollision, "nameChanged">, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EValue<ECollision, "NameChanged">, TODO>>; // TODO(koan) @koan-error

// Never, unknown, and any need deliberate boundary handling.
type _E25 = Expect<Equal<EEvent<never>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EEvent<unknown>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsAny<EEvent<any>>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EKey<never, "xChanged">, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EValue<unknown, "xChanged">, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EIsAny<EValue<any, "xChanged">>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a key already ending in Changed gains and removes one suffix layer.
type _DemoSuffixLayer = Expect<Equal<
  EKey<{ statusChanged: boolean }, "statusChangedChanged">,
  "statusChanged"
>>;

// Pre-solved: optional payloads expose undefined to listeners.
type _DemoOptional = Expect<Equal<EValue<{ name?: string }, "nameChanged">, string | undefined>>;

// Pre-solved: union models expose only their shared safe event vocabulary.
type _DemoUnionKeys = Expect<Equal<EEvent<EUnionModel>, "sharedChanged">>;

// Event names not derived from the model cannot be used as constrained names.
declare function acceptEvent<T, E extends EEvent<T>>(event: E): void;
// @ts-expect-error `missingChanged` is not derived from this model.
acceptEvent<{ name: string }, EEvent<{ name: string }>>("missingChanged");
