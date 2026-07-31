import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-011: Related type parameters — constructions
 * =============================================================================
 *
 * These constructions connect a source type to dependent keys, selected value
 * types, callback inputs, independent results, projections, and writes. They
 * also expose where key unions weaken read/write correlation and where union,
 * intersection, index-signature, empty, and special sources change the
 * relationship. Replace each `TODO` with a type satisfying its assertions.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

declare const givenSymbol: unique symbol;

type Model = {
  id: number;
  title: string;
  complete: boolean;
  optional?: Date;
};

// ─── Dependent reads and positions ───────────────────────────────────────────

// 1. Select the value type belonging to a dependent key.
export type SelectValue<T, K extends keyof T> = TODO; // TODO(koan)

type _01a = Expect<Equal<SelectValue<Model, "id">, number>>;
type _01b = Expect<Equal<SelectValue<Model, "title">, string>>;
type _01c = Expect<
  Equal<SelectValue<Model, "id" | "complete">, number | boolean>
>;
type _01d = Expect<
  Equal<SelectValue<Model, "optional">, Date | undefined>
>;
type _01e = Expect<
  Equal<SelectValue<{ [givenSymbol]: "secret" }, typeof givenSymbol>, "secret">
>;

// 2. Keep two dependent keys in positional value slots.
export type SelectedPair<
  T,
  Left extends keyof T,
  Right extends keyof T,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<SelectedPair<Model, "id", "title">, [number, string]>
>;
type _02b = Expect<
  Equal<SelectedPair<Model, "title", "complete">, [string, boolean]>
>;
type _02c = Expect<
  Equal<SelectedPair<Model, "id", "id">, [number, number]>
>;
type _02d = Expect<
  Equal<
    SelectedPair<Model, "id" | "title", "complete" | "optional">,
    [number | string, boolean | Date | undefined]
  >
>;

// 3. Construct the contextual callback type for a selected value.
export type SelectedTransform<
  T,
  K extends keyof T,
  Result,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<SelectedTransform<Model, "id", string>, (selected: number) => string>
>;
type _03b = Expect<
  Equal<
    SelectedTransform<Model, "title" | "complete", 1 | 2>,
    (selected: string | boolean) => 1 | 2
  >
>;
type _03c = Expect<
  Equal<
    SelectedTransform<Model, "optional", undefined>,
    (selected: Date | undefined) => undefined
  >
>;

// 4. Infer an independent output after checking the selected callback input.
export type TransformResult<
  T,
  K extends keyof T,
  Transform,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<TransformResult<Model, "id", (value: number) => string>, string>
>;
type _04b = Expect<
  Equal<
    TransformResult<Model, "complete", (value: boolean) => { negated: boolean }>,
    { negated: boolean }
  >
>;
type _04c = Expect<
  Equal<TransformResult<Model, "id", (value: string) => boolean>, never>
>;
type _04d = Expect<
  Equal<
    TransformResult<Model, "id" | "title", (value: number | string) => readonly [1, 2]>,
    readonly [1, 2]
  >
>;

// 5. Construct the projection selected by a dependent key union.
export type SelectedProjection<T, K extends keyof T> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<SelectedProjection<Model, "id">, { id: number }>
>;
type _05b = Expect<
  Equal<
    SelectedProjection<Model, "id" | "title">,
    { id: number; title: string }
  >
>;
type _05c = Expect<
  Equal<SelectedProjection<Model, "optional">, { optional?: Date }>
>;
type _05d = Expect<Equal<SelectedProjection<Model, never>, {}>>;

// 6. Construct the value accepted for a selected write.
export type SelectedWriteValue<T, K extends keyof T> = TODO; // TODO(koan)

type _06a = Expect<Equal<SelectedWriteValue<Model, "id">, number>>;
type _06b = Expect<Equal<SelectedWriteValue<Model, "title">, string>>;
type _06c = Expect<
  Equal<SelectedWriteValue<Model, "id" | "title">, number | string>
>;
type _06d = Expect<
  Equal<SelectedWriteValue<Model, "optional">, Date | undefined>
>;

// ─── Related generic signatures ──────────────────────────────────────────────

// 7. Construct the related-key selector signature.
export type SelectSignature = TODO; // TODO(koan)

type _07a = Expect<
  Equal<SelectSignature, <T, K extends keyof T>(value: T, key: K) => T[K]>
>;
type _07b = Expect<
  Equal<Parameters<SelectSignature>, [value: unknown, key: never]>
>;

// 8. Construct the two-key positional selector signature.
export type SelectPairSignature = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    SelectPairSignature,
    <T, L extends keyof T, R extends keyof T>(
      value: T,
      left: L,
      right: R,
    ) => [T[L], T[R]]
  >
>;
type _08b = Expect<
  Equal<
    Parameters<SelectPairSignature>,
    [value: unknown, left: never, right: never]
  >
>;

// 9. Construct the dependent-input, independent-output transform signature.
export type TransformSelectedSignature = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    TransformSelectedSignature,
    <T, K extends keyof T, R>(
      value: T,
      key: K,
      transform: (selected: T[K]) => R,
    ) => R
  >
>;
type _09b = Expect<Equal<ReturnType<TransformSelectedSignature>, unknown>>;

// 10. Construct the related-key collection projection signature.
export type SelectManySignature = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    SelectManySignature,
    <T, K extends keyof T>(value: T, keys: readonly K[]) => Pick<T, K>
  >
>;
type _10b = Expect<
  Equal<
    Parameters<SelectManySignature>,
    [value: unknown, keys: readonly never[]]
  >
>;

// 11. Construct the related-key assignment signature.
export type AssignSelectedSignature = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    AssignSelectedSignature,
    <T, K extends keyof T>(value: T, key: K, next: T[K]) => void
  >
>;
type _11b = Expect<Equal<ReturnType<AssignSelectedSignature>, void>>;

// ─── Correlation strength ────────────────────────────────────────────────────

// 12. Build the loose key/value pair admitted when both sides are unions.
export type LooseWritePair<T> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    LooseWritePair<{ id: number; name: string }>,
    [key: "id" | "name", value: number | string]
  >
>;
type _12b = Expect<
  Equal<
    LooseWritePair<{ optional?: number; required: string }>,
    [key: "optional" | "required", value: number | string | undefined]
  >
>;
type _12c = Expect<Equal<LooseWritePair<{}>, [key: never, value: never]>>;

// 13. Build a correlated union pairing each key only with its own value.
export type CorrelatedWritePair<T> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    CorrelatedWritePair<{ id: number; name: string }>,
    ["id", number] | ["name", string]
  >
>;
type _13b = Expect<
  Equal<
    CorrelatedWritePair<{ readonly fixed: 1; optional?: 2 }>,
    ["fixed", 1] | ["optional", 2 | undefined] | undefined
  >
>;
type _13c = Expect<Equal<CorrelatedWritePair<{}>, never>>;

// 14. Decide whether a particular key/value pair preserves the relation.
export type ValidWritePair<
  T,
  K extends keyof T,
  Value,
> = TODO; // TODO(koan)

type _14a = Expect<Equal<ValidWritePair<Model, "id", number>, true>>;
type _14b = Expect<Equal<ValidWritePair<Model, "id", string>, false>>;
type _14c = Expect<
  Equal<ValidWritePair<Model, "id" | "title", number>, true>
>; // A union key admits the union value relation.
type _14d = Expect<
  Equal<ValidWritePair<Model, "optional", undefined>, true>
>;

// ─── Composite and boundary sources ──────────────────────────────────────────

// 15. Select only keys guaranteed by every member of a source union.
export type UnionSourceValue<
  Union,
  K extends keyof Union,
> = TODO; // TODO(koan)

type Left = { kind: "left"; shared: string; left: number };
type Right = { kind: "right"; shared: string; right: boolean };

type _15a = Expect<
  Equal<UnionSourceValue<Left | Right, "kind">, "left" | "right">
>;
type _15b = Expect<
  Equal<UnionSourceValue<Left | Right, "shared">, string>
>;
type _15c = Expect<
  Equal<UnionSourceValue<{ a: 1 } | {}, never>, never>
>;

// 16. Select across the combined key surface of an intersection source.
export type IntersectionSourceValue<
  LeftSource,
  RightSource,
  K extends keyof (LeftSource & RightSource),
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<IntersectionSourceValue<{ left: number }, { right: boolean }, "left">, number>
>;
type _16b = Expect<
  Equal<
    IntersectionSourceValue<{ left: number }, { right: boolean }, "left" | "right">,
    number | boolean
  >
>;
type _16c = Expect<
  Equal<IntersectionSourceValue<Left, Right, "left">, never>
>; // Conflicting discriminants collapse the whole intersection.

// 17. Construct the projection selected from a union source's common keys.
export type UnionSourceProjection<
  Union,
  K extends keyof Union,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    keyof UnionSourceProjection<Left | Right, "kind" | "shared">,
    "kind" | "shared"
  >
>;
type _17b = Expect<
  Equal<
    UnionSourceProjection<Left | Right, "kind">,
    Pick<Left | Right, "kind">
  >
>;
type _17c = Expect<
  Equal<UnionSourceProjection<{ a: 1 } | {}, never>, {}>
>;

// 18. Select from a broad index signature.
export type DictionaryValue<
  Value,
  K extends string,
> = TODO; // TODO(koan)

type _18a = Expect<Equal<DictionaryValue<number, "missing">, number>>;
type _18b = Expect<
  Equal<DictionaryValue<{ count: number }, "a" | "b">, { count: number }>
>;
type _18c = Expect<Equal<DictionaryValue<never, string>, never>>;

// 19. Classify selection from special sources without expecting any directly.
export type RelatedSelectionKind<
  T,
  K extends keyof T,
> = TODO; // TODO(koan)

type _19a = Expect<Equal<RelatedSelectionKind<any, "anything">, "any">>;
type _19b = Expect<
  Equal<RelatedSelectionKind<never, "anything">, "never">
>;
type _19c = Expect<
  Equal<RelatedSelectionKind<{ value: unknown }, "value">, "unknown">
>;
type _19d = Expect<
  Equal<RelatedSelectionKind<{ value: string }, "value">, "ordinary">
>;
