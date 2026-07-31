import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-022: Partial inference and correlation capstone — constructions
 * =============================================================================
 *
 * These constructions combine inferred, explicit, defaulted, and curried field
 * projection with const domains, NoInfer validation, key-dependent transforms,
 * and read/write correlation. They cover omitted rest evidence, empty and union
 * keys, object unions, index signatures, optional modifiers, and special source
 * types. Replace each `TODO` with a type that satisfies the assertions directly
 * below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type GivenModel = {
  id: number;
  title: string;
  complete: boolean;
  tags: string[];
  meta: { author: string };
  optional?: Date;
};

// ─── Inferred, explicit, and defaulted projection ───────────────────────────

// 1. Build the field projection selected by a related key set.
export type FieldProjection<
  Model,
  Key extends keyof Model,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<FieldProjection<GivenModel, "id">, { id: number }>
>;
type _01b = Expect<
  Equal<
    FieldProjection<GivenModel, "id" | "title">,
    { id: number; title: string }
  >
>;
type _01c = Expect<
  Equal<FieldProjection<GivenModel, "optional">, { optional?: Date }>
>;
type _01d = Expect<Equal<FieldProjection<GivenModel, never>, {}>>;
type _01e = Expect<Equal<FieldProjection<GivenModel, keyof GivenModel>, GivenModel>>;

// 2. Construct the all-inferred field-picker signature.
export type PickFieldsSignature =
  TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    PickFieldsSignature,
    <Model, Key extends keyof Model>(
      value: Model,
      ...keys: Key[]
    ) => Pick<Model, Key>
  >
>;
type _02b = Expect<
  Equal<
    Parameters<PickFieldsSignature>,
    [value: unknown, ...keys: never[]]
  >
>;
type _02c = Expect<Equal<ReturnType<PickFieldsSignature>, {}>>;

// 3. Produce the constraint fallback used when a generic rest has no candidates.
export type OmittedKeyProjection<Model> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<OmittedKeyProjection<GivenModel>, GivenModel>>;
type _03b = Expect<Equal<OmittedKeyProjection<{}>, {}>>;
type _03c = Expect<
  Equal<
    OmittedKeyProjection<{ readonly id: 1; optional?: 2 }>,
    { readonly id: 1; optional?: 2 }
  >
>;
type _03d = Expect<
  Equal<OmittedKeyProjection<Record<string, number>>, Record<string, number>>
>;

// 4. Produce the deliberately empty projection selected by explicit `never`.
export type EmptyProjection<Model> =
  TODO; // TODO(koan)

type _04a = Expect<Equal<EmptyProjection<GivenModel>, {}>>;
type _04b = Expect<Equal<EmptyProjection<{}>, {}>>;
type _04c = Expect<
  Equal<EmptyProjection<Record<string, number>>, {}>
>;

// 5. Build a projection whose trailing key argument defaults to every key.
export type DefaultedProjection<
  Model,
  Key extends keyof Model = keyof Model,
> = TODO; // TODO(koan)

type _05a = Expect<Equal<DefaultedProjection<GivenModel>, GivenModel>>;
type _05b = Expect<
  Equal<DefaultedProjection<GivenModel, "id">, { id: number }>
>;
type _05c = Expect<
  Equal<
    DefaultedProjection<GivenModel, "id" | "complete">,
    { id: number; complete: boolean }
  >
>;
type _05d = Expect<Equal<DefaultedProjection<GivenModel, never>, {}>>;

// 6. Construct the defaulted picker signature; explicit Model substitutes Key's default.
export type PickFieldsDefaultSignature =
  TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    PickFieldsDefaultSignature,
    <Model, Key extends keyof Model = keyof Model>(
      value: Model,
      ...keys: Key[]
    ) => Pick<Model, Key>
  >
>;
type _06b = Expect<
  Equal<ReturnType<PickFieldsDefaultSignature>, {}>
>;
type _06c = Expect<
  Equal<
    Parameters<PickFieldsDefaultSignature>,
    [value: unknown, ...keys: never[]]
  >
>;

// ─── Currying as partial-inference staging ──────────────────────────────────

// 7. Build the fresh key-generic function returned after Model is fixed.
export type PickerFor<Model> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    PickerFor<GivenModel>,
    <Key extends keyof GivenModel>(
      value: GivenModel,
      ...keys: Key[]
    ) => Pick<GivenModel, Key>
  >
>;
type _07b = Expect<
  Equal<
    Parameters<PickerFor<{ id: number }>>,
    [value: { id: number }, ...keys: "id"[]]
  >
>;
type _07c = Expect<
  Equal<ReturnType<PickerFor<{ id: number; title: string }>>, { id: number; title: string }>
>;

// 8. Construct the outer factory that stages explicit Model selection.
export type PickerFactorySignature =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<PickerFactorySignature, <Model>() => PickerFor<Model>>
>;
type _08b = Expect<
  Equal<
    ReturnType<PickerFactorySignature>,
    <Key extends never>(
      value: unknown,
      ...keys: Key[]
    ) => Pick<unknown, Key>
  >
>;

// 9. Produce a curried projection for one subsequently inferred key set.
export type CurriedProjection<
  Model,
  Key extends keyof Model,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<CurriedProjection<GivenModel, "active" & keyof GivenModel>, {}>
>; // No `active` key exists in this model.
type _09b = Expect<
  Equal<CurriedProjection<GivenModel, "meta">, { meta: { author: string } }>
>;
type _09c = Expect<
  Equal<
    CurriedProjection<GivenModel, "complete" | "tags">,
    { complete: boolean; tags: string[] }
  >
>;
type _09d = Expect<Equal<CurriedProjection<GivenModel, never>, {}>>;

// ─── Const domains and validation-only fallbacks ────────────────────────────

// 10. Project the finite member union from a readonly choice tuple.
export type ChoiceMember<Choices extends readonly string[]> =
  TODO; // TODO(koan)

type _10a = Expect<Equal<ChoiceMember<readonly ["a"]>, "a">>;
type _10b = Expect<
  Equal<ChoiceMember<readonly ["a", "b"]>, "a" | "b">
>;
type _10c = Expect<
  Equal<ChoiceMember<readonly ["small", "medium", "large"]>, "small" | "medium" | "large">
>;
type _10d = Expect<Equal<ChoiceMember<readonly string[]>, string>>;
type _10e = Expect<Equal<ChoiceMember<readonly []>, never>>;

// 11. Construct the choice helper with a NoInfer-checked fallback.
export type ChooseMemberSignature =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ChooseMemberSignature,
    <const Choices extends readonly string[]>(
      choices: Choices,
      fallback: NoInfer<Choices[number]>,
    ) => Choices[number]
  >
>;
type _11b = Expect<Equal<ReturnType<ChooseMemberSignature>, string>>;
type _11c = Expect<
  Equal<
    Parameters<ChooseMemberSignature>,
    [choices: readonly string[], fallback: string]
  >
>;

// ─── Key-dependent transforms and writes ────────────────────────────────────

// 12. Build the selected field transform signature.
export type FieldTransform<Model, Key extends keyof Model, Result> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<FieldTransform<GivenModel, "id", string>, (field: number) => string>
>;
type _12b = Expect<
  Equal<FieldTransform<GivenModel, "title", number>, (field: string) => number>
>;
type _12c = Expect<
  Equal<
    FieldTransform<GivenModel, "id" | "title", boolean>,
    (field: number | string) => boolean
  >
>;
type _12d = Expect<
  Equal<FieldTransform<GivenModel, "optional", void>, (field: Date | undefined) => void>
>;

// 13. Construct the full map-field signature with independent Result.
export type MapFieldSignature =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    MapFieldSignature,
    <Model, Key extends keyof Model, Result>(
      value: Model,
      key: Key,
      transform: (field: Model[Key]) => Result,
    ) => Result
  >
>;
type _13b = Expect<Equal<ReturnType<MapFieldSignature>, unknown>>;

// 14. Construct the selected write-field signature.
export type WriteFieldSignature =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    WriteFieldSignature,
    <Model, Key extends keyof Model>(
      value: Model,
      key: Key,
      field: Model[Key],
    ) => void
  >
>;
type _14b = Expect<Equal<ReturnType<WriteFieldSignature>, void>>;

// 15. Produce the value union accepted by a selected key set.
export type WriteValue<Model, Key extends keyof Model> =
  TODO; // TODO(koan)

type _15a = Expect<Equal<WriteValue<GivenModel, "id">, number>>;
type _15b = Expect<Equal<WriteValue<GivenModel, "title">, string>>;
type _15c = Expect<
  Equal<WriteValue<GivenModel, "id" | "title">, number | string>
>;
type _15d = Expect<
  Equal<WriteValue<GivenModel, "optional">, Date | undefined>
>;

// 16. Build the loose key/value pair admitted by a union-key write.
export type LooseWritePair<Model, Key extends keyof Model> =
  TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    LooseWritePair<GivenModel, "id" | "title">,
    [key: "id" | "title", value: number | string]
  >
>;
type _16b = Expect<
  Equal<
    LooseWritePair<GivenModel, "complete" | "tags">,
    [key: "complete" | "tags", value: boolean | string[]]
  >
>;
type _16c = Expect<
  Equal<
    LooseWritePair<GivenModel, "optional">,
    [key: "optional", value: Date | undefined]
  >
>;

// 17. Build a correlated union pairing each key only with its own value.
export type CorrelatedWritePairs<Model> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    CorrelatedWritePairs<{ id: number; title: string }>,
    [key: "id", value: number] | [key: "title", value: string]
  >
>;
type _17b = Expect<
  Equal<
    CorrelatedWritePairs<{ complete: boolean; tags: string[] }>,
    [key: "complete", value: boolean] | [key: "tags", value: string[]]
  >
>;
type _17c = Expect<
  Equal<
    CorrelatedWritePairs<{ optional?: Date }>,
    [key: "optional", value: Date | undefined]
  >
>;
type _17d = Expect<Equal<CorrelatedWritePairs<{}>, never>>;

// ─── Union, index-signature, and special sources ────────────────────────────

// 18. Project only keys guaranteed by every member of an object union.
export type CommonUnionProjection<
  Union,
  Key extends keyof Union,
> = TODO; // TODO(koan)

type GivenLeft = { shared: string; left: number };
type GivenRight = { shared: string; right: boolean };

type _18a = Expect<
  Equal<CommonUnionProjection<GivenLeft | GivenRight, "shared">, { shared: string }>
>;
type _18b = Expect<
  Equal<CommonUnionProjection<{ kind: "a" } | { kind: "b" }, "kind">, { kind: "a" | "b" }>
>;
type _18c = Expect<
  Equal<CommonUnionProjection<{ id: number } | {}, never>, {}>
>;

// 19. Build a projection over a broad string index-signature domain.
export type IndexProjection<
  Value,
  Key extends string,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<IndexProjection<number, "missing">, { missing: number }>
>;
type _19b = Expect<
  Equal<
    IndexProjection<boolean, "a" | "b">,
    { a: boolean; b: boolean }
  >
>;
type _19c = Expect<Equal<IndexProjection<unknown, never>, {}>>;

// 20. Classify a source or selected result without allowing `any` to escape.
export type CorrelationKind<Value> =
  TODO; // TODO(koan)

type _20a = Expect<Equal<CorrelationKind<number | string>, "ordinary">>;
type _20b = Expect<Equal<CorrelationKind<any>, "any">>;
type _20c = Expect<Equal<CorrelationKind<unknown>, "unknown">>;
type _20d = Expect<Equal<CorrelationKind<never>, "never">>;

// 21. Record who chooses each slot in an explicitly staged API.
export type SelectionLedger<Model, Key extends keyof Model, Result> =
  TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    SelectionLedger<GivenModel, "id", string>,
    { model: GivenModel; key: "id"; field: number; result: string }
  >
>;
type _21b = Expect<
  Equal<
    SelectionLedger<GivenModel, "id" | "title", boolean>,
    {
      model: GivenModel;
      key: "id" | "title";
      field: number | string;
      result: boolean;
    }
  >
>;
type _21c = Expect<
  Equal<
    SelectionLedger<GivenModel, "optional", void>,
    {
      model: GivenModel;
      key: "optional";
      field: Date | undefined;
      result: void;
    }
  >
>;
