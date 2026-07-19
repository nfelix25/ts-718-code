import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-054 edge cases: schema transformer capstone
 * =============================================================================
 * Schema precision determines output precision. These cases stress widened
 * flags, descriptor unions, optional default declarations versus present
 * defaults, readonly literals, generated-name collisions, broad key domains,
 * special types, and unions of whole schema objects.
 */

type EField =
  | { type: "string"; optional?: boolean; default?: string }
  | { type: "number"; optional?: boolean; default?: number }
  | { type: "boolean"; optional?: boolean; default?: boolean };
type EInfer<F extends EField> = F extends { type: "string" } ? string : F extends { type: "number" } ? number : F extends { type: "boolean" } ? boolean : never;
type ESimplify<T> = { [K in keyof T]: T[K] };
type EOutput<S extends Record<PropertyKey, EField>> = ESimplify<
  { [K in keyof S as S[K] extends { optional: true } ? never : K]: EInfer<S[K]> } &
  { [K in keyof S as S[K] extends { optional: true } ? K : never]?: EInfer<S[K]> }
>;
type EDefaults<S extends Record<PropertyKey, EField>> = { [K in keyof S as S[K] extends { default: unknown } ? K : never]: S[K] extends { default: infer V } ? V : never };
type EEntries<S extends Record<PropertyKey, EField>> = { [K in keyof S]-?: { key: K; value: EInfer<S[K]> } }[keyof S];
type EValidators<S extends Record<PropertyKey, EField>> = { [K in keyof S as K extends string ? `validate${Capitalize<K>}` : never]-?: (value: unknown) => value is EInfer<S[K]> };
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Only the literal true flag enters the optional partition.
type _E01 = Expect<Equal<EOutput<{ x: { type: "string"; optional: true } }>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EOutput<{ x: { type: "string"; optional: false } }>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EOutput<{ x: { type: "string"; optional: boolean } }>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EOutput<{ x: { type: "string"; optional?: boolean } }>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EOutput<{ x: { type: "string" } | { type: "number"; optional: true } }>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EInfer<{ type: "string" } | { type: "number" }>, TODO>>; // TODO(koan) @koan-error

// Default filtering tests property presence, not whether a descriptor permits it.
type _E07 = Expect<Equal<EDefaults<{ x: { type: "string"; default: "x" } }>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EDefaults<{ x: { type: "string"; default?: string } }>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EDefaults<{ x: Extract<EField, { type: "string" }> }>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EDefaults<{ x: { type: "number"; default: 0 }; y: { type: "boolean"; default: false } }>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EDefaults<{ x: { type: "string"; optional: true; default: "x" } }>, TODO>>; // TODO(koan) @koan-error

// Readonly schemas and optional fields retain precise mapped behavior.
type EReadonlySchema = { readonly id: { readonly type: "number" }; readonly label: { readonly type: "string"; readonly optional: true } };
type _E12 = Expect<Equal<EOutput<EReadonlySchema>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EEntries<EReadonlySchema>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EEntries<{ label: { type: "string"; optional: true } }>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<Extract<EEntries<EReadonlySchema>, { key: "label" }>["value"], TODO>>; // TODO(koan) @koan-error

// Text normalization can merge validators from distinct source keys.
type ECollision = EValidators<{ name: { type: "string" }; Name: { type: "number" } }>;
type _E16 = Expect<Equal<ECollision, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ECollision["validateName"], TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<Parameters<ECollision["validateName"]>, TODO>>; // TODO(koan) @koan-error

declare const eToken: unique symbol;
type EMixed = { text: { type: "string" }; 0: { type: "number" }; [eToken]: { type: "boolean" } };

// Output and entries preserve PropertyKeys; validator names use strings only.
type _E19 = Expect<Equal<keyof EOutput<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<keyof EValidators<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EEntries<EMixed>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EOutput<Record<string, { type: "number" }>>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<keyof EValidators<Record<string, { type: "number" }>>, TODO>>; // TODO(koan) @koan-error

type ESchemaUnion = { kind: { type: "string" }; a: { type: "number" } } | { kind: { type: "string" }; b: { type: "boolean" } };

// Whole-schema unions, empty schemas, and poison/bottom inputs complete the model.
type _E24 = Expect<Equal<EOutput<ESchemaUnion>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<keyof EOutput<ESchemaUnion>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EEntries<ESchemaUnion>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EOutput<{}>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EOutput<never>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EIsAny<EOutput<any>>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EEntries<never>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a widened boolean does not prove the field is optional.
type _DemoWidened = Expect<Equal<EOutput<{ x: { type: "string"; optional: boolean } }>, { x: string }>>;

// Pre-solved: a present literal default retains its literal value.
type _DemoDefault = Expect<Equal<EDefaults<{ count: { type: "number"; default: 0 } }>, { count: 0 }>>;

// Pre-solved: the entry table removes optionality before being indexed.
type _DemoEntry = Expect<Equal<EEntries<{ label: { type: "string"; optional: true } }>, { key: "label"; value: string }>>;

// Invalid descriptors fail the schema constraint.
// @ts-expect-error "integer" is not a supported field discriminator.
type InvalidSchema = EOutput<{ id: { type: "integer" } }>;
