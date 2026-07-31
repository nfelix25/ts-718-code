import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-054: schema transformer capstone — constructions
 * =============================================================================
 *
 * These constructions derive correlated static views from one flat runtime
 * schema: field values, required and optional partitions, parsed output, typed
 * input, defaults, entries, validators, changes, and combined API bundles. They
 * also preserve mixed PropertyKeys, filter text-generated APIs, expose naming
 * collisions, broad and union schemas, readonly fidelity, widened flags, and
 * special inputs. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

export type GivenField =
  | { type: "string"; optional?: boolean; default?: string }
  | { type: "number"; optional?: boolean; default?: number }
  | { type: "boolean"; optional?: boolean; default?: boolean }
  | { type: "date"; optional?: boolean; default?: Date }
  | { type: "strings"; optional?: boolean; default?: readonly string[] };

declare const givenToken: unique symbol;

type GivenSchema = {
  id: { type: "number" };
  name: { type: "string"; default: "anonymous" };
  active: { type: "boolean" };
  created: { type: "date" };
  tags: { type: "strings"; optional: true };
};

type GivenMixedSchema = {
  title: { type: "string" };
  0: { type: "number" };
  [givenToken]: { type: "boolean" };
};

type GivenReadonlySchema = {
  readonly id: { readonly type: "number" };
  readonly label: { readonly type: "string"; readonly optional: true };
};

type GivenSchemaUnion =
  | { kind: { type: "string" }; a: { type: "number" } }
  | { kind: { type: "string" }; b: { type: "boolean" } };

type GivenInferField<Field extends GivenField> =
  Field extends { type: "string" } ? string
    : Field extends { type: "number" } ? number
      : Field extends { type: "boolean" } ? boolean
        : Field extends { type: "date" } ? Date
          : Field extends { type: "strings" } ? readonly string[]
            : never;

type GivenSimplify<Value> = { [Key in keyof Value]: Value[Key] };

type GivenOutput<
  Schema extends Record<PropertyKey, GivenField>,
> = GivenSimplify<
  {
    [Key in keyof Schema as
      Schema[Key] extends { optional: true } ? never : Key]:
        GivenInferField<Schema[Key]>;
  } & {
    [Key in keyof Schema as
      Schema[Key] extends { optional: true } ? Key : never]?:
        GivenInferField<Schema[Key]>;
  }
>;

type GivenInput<
  Schema extends Record<PropertyKey, GivenField>,
> = GivenSimplify<
  {
    [Key in keyof Schema as
      Schema[Key] extends { optional: true } | { default: unknown }
        ? never
        : Key]:
          GivenInferField<Schema[Key]>;
  } & {
    [Key in keyof Schema as
      Schema[Key] extends { optional: true } | { default: unknown }
        ? Key
        : never]?:
          GivenInferField<Schema[Key]>;
  }
>;

type GivenDefaults<
  Schema extends Record<PropertyKey, GivenField>,
> = {
  [Key in keyof Schema as
    Schema[Key] extends { default: unknown } ? Key : never]:
      Schema[Key] extends { default: infer Default } ? Default : never;
};

type GivenEntries<
  Schema extends Record<PropertyKey, GivenField>,
> = {
  [Key in keyof Schema]-?: {
    key: Key;
    field: Schema[Key];
    value: GivenInferField<Schema[Key]>;
  };
}[keyof Schema];

type GivenValidators<
  Schema extends Record<PropertyKey, GivenField>,
> = {
  [Key in keyof Schema as
    Key extends string ? `validate${Capitalize<Key>}` : never]-?:
      (value: unknown) => value is GivenInferField<Schema[Key]>;
};

type GivenChanges<
  Schema extends Record<PropertyKey, GivenField>,
> = {
  [Key in keyof Schema as
    Key extends string ? `${Key}Changed` : never]-?:
      (
        next: GivenInferField<Schema[Key]>,
        previous: GivenInferField<Schema[Key]>,
      ) => void;
};

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

// ─── Field inference and schema partitions ────────────────────────────────

// 1. Infer the runtime value described by a field or field union.
export type InferField<Field extends GivenField> = TODO; // TODO(koan)

type _01a = Expect<Equal<InferField<{ type: "string" }>, string>>;
type _01b = Expect<Equal<InferField<{ type: "number"; optional: true }>, number>>;
type _01c = Expect<Equal<InferField<{ type: "date"; default: Date }>, Date>>;
type _01d = Expect<
  Equal<InferField<GivenField>, string | number | boolean | Date | readonly string[]>
>;
type _01e = Expect<Equal<InferField<never>, never>>;

// 2. Summarize one descriptor's value, optionality, and present default.
export type FieldPolicy<Field extends GivenField> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    FieldPolicy<{ type: "string" }>,
    { value: string; optional: false; default: "absent" }
  >
>;
type _02b = Expect<
  Equal<
    FieldPolicy<{ type: "number"; optional: true }>,
    { value: number; optional: true; default: "absent" }
  >
>;
type _02c = Expect<
  Equal<
    FieldPolicy<{ type: "boolean"; default: false }>,
    { value: boolean; optional: false; default: false }
  >
>;
type _02d = Expect<
  Equal<
    FieldPolicy<{ type: "strings"; optional: false; default: readonly [] }>,
    { value: readonly string[]; optional: false; default: readonly [] }
  >
>;

// 3. Collect keys not proven optional by the literal flag true.
export type RequiredSchemaKeys<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<RequiredSchemaKeys<GivenSchema>, "id" | "name" | "active" | "created">
>;
type _03b = Expect<
  Equal<
    RequiredSchemaKeys<{
      yes: { type: "string"; optional: true };
      no: { type: "string"; optional: false };
      wide: { type: "string"; optional: boolean };
      absent: { type: "string" };
    }>,
    "no" | "wide" | "absent"
  >
>;
type _03c = Expect<
  Equal<
    RequiredSchemaKeys<{
      mixed: { type: "string" } | { type: "number"; optional: true };
    }>,
    "mixed"
  >
>;
type _03d = Expect<Equal<RequiredSchemaKeys<{}>, never>>;

// 4. Collect only keys proven optional by the literal flag true.
export type OptionalSchemaKeys<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<OptionalSchemaKeys<GivenSchema>, "tags">>;
type _04b = Expect<
  Equal<
    OptionalSchemaKeys<{
      yes: { type: "string"; optional: true };
      no: { type: "string"; optional: false };
      wide: { type: "string"; optional: boolean };
    }>,
    "yes"
  >
>;
type _04c = Expect<
  Equal<
    OptionalSchemaKeys<{
      mixed: { type: "string" } | { type: "number"; optional: true };
    }>,
    never
  >
>;
type _04d = Expect<Equal<OptionalSchemaKeys<{}>, never>>;

// 5. Partition schema keys into required and optional parsed output properties.
export type SchemaOutput<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    SchemaOutput<GivenSchema>,
    {
      id: number;
      name: string;
      active: boolean;
      created: Date;
      tags?: readonly string[];
    }
  >
>;
type _05b = Expect<
  Equal<
    SchemaOutput<{
      yes: { type: "string"; optional: true };
      wide: { type: "number"; optional: boolean };
      no: { type: "boolean"; optional: false };
    }>,
    { yes?: string; wide: number; no: boolean }
  >
>;
type _05c = Expect<
  Equal<
    SchemaOutput<GivenReadonlySchema>,
    { readonly id: number; readonly label?: string }
  >
>;
type _05d = Expect<Equal<SchemaOutput<{}>, {}>>;
type _05e = Expect<
  Equal<SchemaOutput<GivenSchema>["tags"], readonly string[] | undefined>
>;

// 6. Make fields with defaults or optional:true omittable at parse call sites.
export type SchemaInput<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    SchemaInput<GivenSchema>,
    {
      id: number;
      name?: string;
      active: boolean;
      created: Date;
      tags?: readonly string[];
    }
  >
>;
type _06b = Expect<
  Equal<
    SchemaInput<{
      count: { type: "number"; default: 0 };
      label: { type: "string"; optional: true; default: "x" };
      flag: { type: "boolean" };
    }>,
    { count?: number; label?: string; flag: boolean }
  >
>;
type _06c = Expect<
  Equal<
    SchemaInput<{ x: { type: "string"; default?: string } }>,
    { x: string }
  >
>;
type _06d = Expect<Equal<SchemaInput<{}>, {}>>;

// 7. Collect fields the parser must receive because neither omission policy applies.
export type RuntimeRequiredKeys<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<RuntimeRequiredKeys<GivenSchema>, "id" | "active" | "created">
>;
type _07b = Expect<
  Equal<
    RuntimeRequiredKeys<{
      defaulted: { type: "number"; default: 0 };
      optional: { type: "string"; optional: true };
      required: { type: "boolean" };
    }>,
    "required"
  >
>;
type _07c = Expect<
  Equal<
    RuntimeRequiredKeys<{ possible: { type: "string"; default?: string } }>,
    "possible"
  >
>;
type _07d = Expect<Equal<RuntimeRequiredKeys<{}>, never>>;

// ─── Defaults and correlated schema views ─────────────────────────────────

// 8. Project only descriptors with a definitely present default property.
export type SchemaDefaults<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<SchemaDefaults<GivenSchema>, { name: "anonymous" }>
>;
type _08b = Expect<
  Equal<
    SchemaDefaults<{
      count: { type: "number"; default: 0 };
      flag: { type: "boolean"; default: false };
      tags: { type: "strings"; default: readonly [] };
    }>,
    { count: 0; flag: false; tags: readonly [] }
  >
>;
type _08c = Expect<
  Equal<
    SchemaDefaults<{
      possible: { type: "string"; default?: string };
      absent: { type: "string" };
    }>,
    {}
  >
>;
type _08d = Expect<
  Equal<
    SchemaDefaults<{ optional: { type: "string"; optional: true; default: "x" } }>,
    { optional: "x" }
  >
>;
type _08e = Expect<Equal<SchemaDefaults<{}>, {}>>;

// 9. Map then index to build correlated field-entry objects.
export type SchemaEntries<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    SchemaEntries<{
      id: { type: "number" };
      name: { type: "string"; default: "x" };
    }>,
    | { key: "id"; field: { type: "number" }; value: number }
    | {
      key: "name";
      field: { type: "string"; default: "x" };
      value: string;
    }
  >
>;
type _09b = Expect<
  Equal<
    SchemaEntries<{ tags: { type: "strings"; optional: true } }>,
    {
      key: "tags";
      field: { type: "strings"; optional: true };
      value: readonly string[];
    }
  >
>;
type _09c = Expect<
  Equal<
    SchemaEntries<GivenMixedSchema>,
    | { key: "title"; field: { type: "string" }; value: string }
    | { key: 0; field: { type: "number" }; value: number }
    | {
      key: typeof givenToken;
      field: { type: "boolean" };
      value: boolean;
    }
  >
>;
type _09d = Expect<Equal<SchemaEntries<{}>, never>>;

// 10. Select the correlated schema entry for a supplied key subset.
export type SchemaEntryFor<
  Schema extends Record<PropertyKey, GivenField>,
  Keys extends keyof Schema,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    SchemaEntryFor<GivenSchema, "id">,
    { key: "id"; field: { type: "number" }; value: number }
  >
>;
type _10b = Expect<
  Equal<
    SchemaEntryFor<GivenSchema, "name" | "tags">,
    | {
      key: "name";
      field: { type: "string"; default: "anonymous" };
      value: string;
    }
    | {
      key: "tags";
      field: { type: "strings"; optional: true };
      value: readonly string[];
    }
  >
>;
type _10c = Expect<
  Equal<
    SchemaEntryFor<GivenMixedSchema, 0 | typeof givenToken>,
    | { key: 0; field: { type: "number" }; value: number }
    | {
      key: typeof givenToken;
      field: { type: "boolean" };
      value: boolean;
    }
  >
>;
type _10d = Expect<Equal<SchemaEntryFor<GivenSchema, never>, never>>;

// 11. Collect the parsed values from the correlated entry union.
export type SchemaValueUnion<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    SchemaValueUnion<GivenSchema>,
    string | number | boolean | Date | readonly string[]
  >
>;
type _11b = Expect<
  Equal<SchemaValueUnion<{ a: { type: "number" }; b: { type: "number" } }>, number>
>;
type _11c = Expect<
  Equal<SchemaValueUnion<GivenMixedSchema>, string | number | boolean>
>;
type _11d = Expect<Equal<SchemaValueUnion<{}>, never>>;

// ─── Generated validator and change APIs ──────────────────────────────────

// 12. Generate string-keyed validator names and correlated predicates.
export type SchemaValidators<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    SchemaValidators<{
      id: { type: "number" };
      tags: { type: "strings"; optional: true };
    }>,
    {
      validateId: (value: unknown) => value is number;
      validateTags: (value: unknown) => value is readonly string[];
    }
  >
>;
type _12b = Expect<
  Equal<keyof SchemaValidators<GivenSchema>, "validateId" | "validateName" | "validateActive" | "validateCreated" | "validateTags">
>;
type _12c = Expect<
  Equal<
    SchemaValidators<GivenMixedSchema>,
    { validateTitle: (value: unknown) => value is string }
  >
>;
type _12d = Expect<Equal<SchemaValidators<{}>, {}>>;

// 13. Generate string-keyed change callbacks with correlated old and new values.
export type SchemaChanges<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    SchemaChanges<{ id: { type: "number" }; active: { type: "boolean" } }>,
    {
      idChanged: (next: number, previous: number) => void;
      activeChanged: (next: boolean, previous: boolean) => void;
    }
  >
>;
type _13b = Expect<
  Equal<
    Parameters<SchemaChanges<GivenSchema>["tagsChanged"]>,
    [next: readonly string[], previous: readonly string[]]
  >
>;
type _13c = Expect<
  Equal<
    SchemaChanges<GivenMixedSchema>,
    { titleChanged: (next: string, previous: string) => void }
  >
>;
type _13d = Expect<Equal<SchemaChanges<{}>, {}>>;

// 14. Build a correlated union of change-event payloads.
export type SchemaChangeEvents<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    SchemaChangeEvents<{ id: { type: "number" }; active: { type: "boolean" } }>,
    | { event: "id"; next: number; previous: number }
    | { event: "active"; next: boolean; previous: boolean }
  >
>;
type _14b = Expect<
  Equal<
    Extract<SchemaChangeEvents<GivenSchema>, { event: "tags" }>,
    {
      event: "tags";
      next: readonly string[];
      previous: readonly string[];
    }
  >
>;
type _14c = Expect<
  Equal<
    Extract<SchemaChangeEvents<GivenMixedSchema>, { event: typeof givenToken }>,
    { event: typeof givenToken; next: boolean; previous: boolean }
  >
>;
type _14d = Expect<Equal<SchemaChangeEvents<{}>, never>>;

// 15. Expose validator normalization collisions from differently cased keys.
export type ValidatorCollision<
  Schema extends Record<PropertyKey, GivenField>,
  Name extends keyof GivenValidators<Schema>,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ValidatorCollision<
      { name: { type: "string" }; Name: { type: "number" } },
      "validateName"
    >,
    (value: unknown) => value is string | number
  >
>;
type _15b = Expect<
  Equal<
    ValidatorCollision<
      { id: { type: "number" }; ID: { type: "boolean" } },
      "validateId" | "validateID"
    >,
    | ((value: unknown) => value is number)
    | ((value: unknown) => value is boolean)
  >
>;
type _15c = Expect<
  Equal<
    Parameters<
      ValidatorCollision<
        { name: { type: "string" }; Name: { type: "number" } },
        "validateName"
      >
    >,
    [value: unknown]
  >
>;
type _15d = Expect<
  Equal<
    ValidatorCollision<{ only: { type: "date" } }, "validateOnly">,
    (value: unknown) => value is Date
  >
>;

// ─── Mixed, broad, union, and special schemas ──────────────────────────────

// 16. Summarize which key families survive each generated view.
export type SchemaKeyView<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    SchemaKeyView<GivenMixedSchema>,
    [
      output: "title" | 0 | typeof givenToken,
      entries: "title" | 0 | typeof givenToken,
      validators: "validateTitle",
      changes: "titleChanged",
    ]
  >
>;
type _16b = Expect<
  Equal<
    SchemaKeyView<GivenSchema>,
    [
      output: keyof GivenSchema,
      entries: keyof GivenSchema,
      validators: "validateId" | "validateName" | "validateActive" | "validateCreated" | "validateTags",
      changes: "idChanged" | "nameChanged" | "activeChanged" | "createdChanged" | "tagsChanged",
    ]
  >
>;
type _16c = Expect<
  Equal<
    SchemaKeyView<{ 1: { type: "number" } }>,
    [output: 1, entries: 1, validators: never, changes: never]
  >
>;
type _16d = Expect<
  Equal<
    SchemaKeyView<{}>,
    [output: never, entries: never, validators: never, changes: never]
  >
>;

// 17. Describe output and generated names for a broad string-key schema.
export type BroadStringSchemaView<
  Field extends GivenField,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    BroadStringSchemaView<{ type: "number" }>[0],
    Record<string, number>
  >
>;
type _17b = Expect<
  Equal<
    BroadStringSchemaView<{ type: "number" }>[1],
    `validate${Capitalize<string>}`
  >
>;
type _17c = Expect<
  Equal<
    BroadStringSchemaView<{ type: "boolean" }>[2],
    `${string}Changed`
  >
>;
type _17d = Expect<
  Equal<
    BroadStringSchemaView<{ type: "strings" }>[3],
    {
      key: string;
      field: { type: "strings" };
      value: readonly string[];
    }
  >
>;

// 18. Expose output and entry behavior for a union of whole schema objects.
export type UnionSchemaView<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    UnionSchemaView<GivenSchemaUnion>[0],
    | { kind: string; a: number }
    | { kind: string; b: boolean }
  >
>;
type _18b = Expect<
  Equal<UnionSchemaView<GivenSchemaUnion>[1], "kind">
>;
type _18c = Expect<
  Equal<
    UnionSchemaView<GivenSchemaUnion>[2],
    | { key: "kind"; field: { type: "string" }; value: string }
    | { key: "kind"; field: { type: "string" }; value: string }
  >
>;
type _18d = Expect<
  Equal<
    UnionSchemaView<{ only: { type: "boolean" } }>,
    [
      output: { only: boolean },
      outputKeys: "only",
      entries: {
        key: "only";
        field: { type: "boolean" };
        value: boolean;
      },
    ]
  >
>;

// 19. Classify empty, never, and any schemas without expecting raw any.
export type SpecialSchemaProfile<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<SpecialSchemaProfile<{}>, [false, false, false, true]>
>;
type _19b = Expect<
  Equal<SpecialSchemaProfile<never>, [false, false, true, true]>
>;
type _19c = Expect<
  Equal<SpecialSchemaProfile<any>, [false, false, false, false]>
>;
type _19d = Expect<
  Equal<
    SpecialSchemaProfile<{ x: { type: "string" } }>,
    [false, false, false, false]
  >
>;

// 20. Validate descriptor candidates as a non-any boolean result.
export type IsFieldDescriptor<Value> = TODO; // TODO(koan)

type _20a = Expect<Equal<IsFieldDescriptor<{ type: "integer" }>, false>>;
type _20b = Expect<
  Equal<IsFieldDescriptor<{ type: "string"; default: "x" }>, true>
>;
type _20c = Expect<
  Equal<
    IsFieldDescriptor<{ type: "number" } | { type: "integer" }>,
    boolean
  >
>;
type _20d = Expect<Equal<IsFieldDescriptor<unknown>, false>>;
type _20e = Expect<Equal<IsFieldDescriptor<never>, never>>;

// 21. Assemble all primary derived APIs from a single schema.
export type SchemaBundle<
  Schema extends Record<PropertyKey, GivenField>,
> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    SchemaBundle<{
      id: { type: "number" };
      name: { type: "string"; default: "x" };
      tags: { type: "strings"; optional: true };
    }>,
    {
      output: { id: number; name: string; tags?: readonly string[] };
      input: { id: number; name?: string; tags?: readonly string[] };
      defaults: { name: "x" };
      entries:
        | { key: "id"; field: { type: "number" }; value: number }
        | {
          key: "name";
          field: { type: "string"; default: "x" };
          value: string;
        }
        | {
          key: "tags";
          field: { type: "strings"; optional: true };
          value: readonly string[];
        };
      validators: {
        validateId: (value: unknown) => value is number;
        validateName: (value: unknown) => value is string;
        validateTags: (value: unknown) => value is readonly string[];
      };
      changes: {
        idChanged: (next: number, previous: number) => void;
        nameChanged: (next: string, previous: string) => void;
        tagsChanged: (
          next: readonly string[],
          previous: readonly string[],
        ) => void;
      };
    }
  >
>;
type _21b = Expect<
  Equal<
    SchemaBundle<{}>,
    {
      output: {};
      input: {};
      defaults: {};
      entries: never;
      validators: {};
      changes: {};
    }
  >
>;
type _21c = Expect<
  Equal<
    SchemaBundle<GivenMixedSchema>["output"],
    { title: string; 0: number; [givenToken]: boolean }
  >
>;
type _21d = Expect<
  Equal<
    keyof SchemaBundle<GivenSchema>,
    "output" | "input" | "defaults" | "entries" | "validators" | "changes"
  >
>;
