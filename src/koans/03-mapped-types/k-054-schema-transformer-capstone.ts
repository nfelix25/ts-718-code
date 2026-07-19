import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-054: schema transformer capstone
 * =============================================================================
 *
 * A schema is a runtime object whose keys name fields and whose values describe
 * them. Phase 3's tools can derive several related static views from that one
 * object: parsed output, defaults, validators, change handlers, and key unions.
 *
 * I read the output transform aloud as:
 *
 *   "For each schema key K, inspect descriptor S[K] to compute its value type;
 *    emit K in the required or optional partition; then combine the partitions."
 *
 * This capstone deliberately keeps runtime schemas flat; recursive schema trees
 * arrive later. Even flat schemas exercise homomorphic modifier behavior, key
 * filtering, remapping, template names, indexed access, conditional value
 * transforms, map-then-index unions, and all PropertyKey families. Each derived
 * API makes a policy choice: parsed output preserves number/symbol keys,
 * validators use text-generated names and therefore include string keys only,
 * defaults include only descriptors with a present `default`, and optional
 * output properties model absence rather than an automatic undefined value.
 */

export type Field =
  | { type: "string"; optional?: boolean; default?: string }
  | { type: "number"; optional?: boolean; default?: number }
  | { type: "boolean"; optional?: boolean; default?: boolean }
  | { type: "date"; optional?: boolean; default?: Date }
  | { type: "strings"; optional?: boolean; default?: readonly string[] };

export type InferField<F extends Field> =
  F extends { type: "string" } ? string :
  F extends { type: "number" } ? number :
  F extends { type: "boolean" } ? boolean :
  F extends { type: "date" } ? Date :
  F extends { type: "strings" } ? readonly string[] :
  never;

type Simplify<T> = { [K in keyof T]: T[K] };

export type SchemaOutput<S extends Record<PropertyKey, Field>> = Simplify<
  { [K in keyof S as S[K] extends { optional: true } ? never : K]: InferField<S[K]> } &
  { [K in keyof S as S[K] extends { optional: true } ? K : never]?: InferField<S[K]> }
>;

export type SchemaDefaults<S extends Record<PropertyKey, Field>> = {
  [K in keyof S as S[K] extends { default: unknown } ? K : never]:
    S[K] extends { default: infer Default } ? Default : never
};

export type SchemaEntries<S extends Record<PropertyKey, Field>> = {
  [K in keyof S]-?: { key: K; field: S[K]; value: InferField<S[K]> }
}[keyof S];

export type SchemaValidators<S extends Record<PropertyKey, Field>> = {
  [K in keyof S as K extends string ? `validate${Capitalize<K>}` : never]-?:
    (value: unknown) => value is InferField<S[K]>
};

export type SchemaChanges<S extends Record<PropertyKey, Field>> = {
  [K in keyof S as K extends string ? `${K}Changed` : never]-?:
    (next: InferField<S[K]>, previous: InferField<S[K]>) => void
};

function isFieldValue(field: Field, value: unknown): boolean {
  if (field.type === "date") return value instanceof Date;
  if (field.type === "strings") return Array.isArray(value) && value.every(item => typeof item === "string");
  return typeof value === field.type;
}

export function parseSchema<S extends Record<PropertyKey, Field>>(
  schema: S,
  input: Record<PropertyKey, unknown>,
): SchemaOutput<S> {
  const output: Record<PropertyKey, unknown> = {};
  for (const key of Reflect.ownKeys(schema)) {
    const field = Reflect.get(schema, key) as Field;
    if (!Object.hasOwn(input, key)) {
      if ("default" in field) Reflect.set(output, key, field.default);
      else if (field.optional !== true) throw new TypeError(`Missing field: ${String(key)}`);
      continue;
    }
    const value = Reflect.get(input, key);
    if (!isFieldValue(field, value)) throw new TypeError(`Invalid field: ${String(key)}`);
    Reflect.set(output, key, value);
  }
  return output as SchemaOutput<S>;
}

export function makeValidators<S extends Record<PropertyKey, Field>>(schema: S): SchemaValidators<S> {
  const validators: Record<string, (value: unknown) => boolean> = {};
  for (const key of Object.keys(schema)) {
    const field = schema[key]!;
    validators[`validate${key[0]?.toUpperCase() ?? ""}${key.slice(1)}`] = value => isFieldValue(field, value);
  }
  return validators as SchemaValidators<S>;
}

type MainSchema = {
  id: { type: "number" };
  name: { type: "string"; default: "anonymous" };
  active: { type: "boolean" };
  tags: { type: "strings"; optional: true };
};

// Part 1: Descriptor unions map to their runtime value types.
type _Main01 = Expect<Equal<InferField<{ type: "string" }>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<InferField<{ type: "number"; optional: true }>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<InferField<{ type: "date" }>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<InferField<Field>, TODO>>; // TODO(koan) @koan-error

// Part 2: Required and optional key partitions combine into parsed output.
type MainOutput = SchemaOutput<MainSchema>;
type _Main05 = Expect<Equal<MainOutput, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<keyof MainOutput, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainOutput["tags"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Required<MainOutput>, TODO>>; // TODO(koan) @koan-error

// Part 3: Present default properties form a filtered lookup projection.
type MainDefaults = SchemaDefaults<MainSchema>;
type _Main09 = Expect<Equal<MainDefaults, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<keyof MainDefaults, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainDefaults["name"], TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<SchemaDefaults<{ count: { type: "number"; default: 0 } }>, TODO>>; // TODO(koan) @koan-error

// Part 4: The same schema generates correlated entry, validator, and event APIs.
type _Main13 = Expect<Equal<SchemaEntries<MainSchema>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<keyof SchemaValidators<MainSchema>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Parameters<SchemaChanges<MainSchema>["idChanged"]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<SchemaValidators<MainSchema>["validateTags"], TODO>>; // TODO(koan) @koan-error

// Part 5: Output preserves mixed keys while generated text APIs filter them.
declare const mainToken: unique symbol;
type MainMixedSchema = {
  title: { type: "string" };
  0: { type: "number" };
  [mainToken]: { type: "boolean" };
};
type _Main17 = Expect<Equal<SchemaOutput<MainMixedSchema>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof SchemaOutput<MainMixedSchema>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<keyof SchemaValidators<MainMixedSchema>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<SchemaEntries<MainMixedSchema>, TODO>>; // TODO(koan) @koan-error
