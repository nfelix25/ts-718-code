import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-104: recursive type aliases — constructions
 * =============================================================================
 *
 * These constructions build productive recursive families with visible object,
 * array, or union structure before each self-reference. They identify base
 * cases and one-layer observations, test finite structural members, preserve
 * generic payloads, and expose the limits around optional links, shallow
 * utilities, variance, extreme types, and cyclic runtime graphs. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenList<Value> =
  | null
  | {
    value: Value;
    next: GivenList<Value>;
  };

type GivenNested<Value> =
  Value | readonly GivenNested<Value>[];

type GivenExpression =
  | { kind: "number"; value: number }
  | { kind: "negate"; expression: GivenExpression }
  | { kind: "add"; left: GivenExpression; right: GivenExpression };

type GivenOptionalList<Value> = {
  value: Value;
  next?: GivenOptionalList<Value>;
};

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

// ─── Productive recursive families ────────────────────────────────────

// 1. Build a null-terminated recursive list carrying one generic payload per node.
export type RecursiveList<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<RecursiveList<string>, null>, null>>;
type _01b = Expect<
  Equal<NonNullable<RecursiveList<string>>["value"], string>
>;
type _01c = Expect<
  Equal<
    NonNullable<RecursiveList<string>>["next"],
    GivenList<string>
  >
>;
type _01d = Expect<
  Equal<
    NonNullable<
      NonNullable<RecursiveList<number>>["next"]
    >["value"],
    number
  >
>;
type _01e = Expect<
  Equal<keyof NonNullable<RecursiveList<boolean>>, "value" | "next">
>;

// 2. Build a recursive leaf-or-readonly-container family.
export type RecursiveNested<Value> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    {
      family: RecursiveNested<string>;
      accepts: "x" extends RecursiveNested<string> ? true : false;
    },
    { family: GivenNested<string>; accepts: true }
  >
>;
type _02b = Expect<
  Equal<
    {
      family: RecursiveNested<string>;
      accepts: readonly [] extends RecursiveNested<string> ? true : false;
    },
    { family: GivenNested<string>; accepts: true }
  >
>;
type _02c = Expect<
  Equal<
    {
      family: RecursiveNested<string>;
      accepts:
        readonly ["x", readonly ["y"]] extends RecursiveNested<string>
          ? true
          : false;
    },
    { family: GivenNested<string>; accepts: true }
  >
>;
type _02d = Expect<
  Equal<
    {
      family: RecursiveNested<string>;
      accepts: readonly [1] extends RecursiveNested<string> ? true : false;
    },
    { family: GivenNested<string>; accepts: false }
  >
>;
type _02e = Expect<
  Equal<
    {
      family: RecursiveNested<string>;
      accepts:
        readonly GivenNested<string>[] extends RecursiveNested<string>
          ? true
          : false;
    },
    { family: GivenNested<string>; accepts: true }
  >
>;

// 3. Build a recursive discriminated arithmetic-expression family.
export type RecursiveArithmeticExpression = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    RecursiveArithmeticExpression["kind"],
    "number" | "negate" | "add"
  >
>;
type _03b = Expect<
  Equal<
    Extract<RecursiveArithmeticExpression, { kind: "number" }>["value"],
    number
  >
>;
type _03c = Expect<
  Equal<
    Extract<
      RecursiveArithmeticExpression,
      { kind: "negate" }
    >["expression"],
    GivenExpression
  >
>;
type _03d = Expect<
  Equal<
    Extract<RecursiveArithmeticExpression, { kind: "add" }>["left"],
    GivenExpression
  >
>;
type _03e = Expect<
  Equal<
    {
      family: RecursiveArithmeticExpression;
      valid:
        {
          kind: "add";
          left: { kind: "number"; value: 1 };
          right: {
            kind: "negate";
            expression: { kind: "number"; value: 2 };
          };
        } extends RecursiveArithmeticExpression ? true : false;
    },
    { family: GivenExpression; valid: true }
  >
>;

// 4. Remove the list's null base branch to expose one required node layer.
export type RecursiveListNode<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<RecursiveListNode<string>["value"], string>
>;
type _04b = Expect<
  Equal<RecursiveListNode<string>["next"], GivenList<string>>
>;
type _04c = Expect<
  Equal<
    NonNullable<RecursiveListNode<string>["next"]>["value"],
    string
  >
>;
type _04d = Expect<
  Equal<RecursiveListNode<never>["value"], never>
>;
type _04e = Expect<
  Equal<keyof RecursiveListNode<unknown>, "value" | "next">
>;

// 5. Describe the base, node, payload, recursive link, and visible key layer.
export type ListLayerProfile<Value> = TODO; // TODO(koan)

type _05a = Expect<Equal<ListLayerProfile<string>["base"], null>>;
type _05b = Expect<
  Equal<
    ListLayerProfile<string>["node"],
    { value: string; next: GivenList<string> }
  >
>;
type _05c = Expect<
  Equal<ListLayerProfile<number>["payload"], number>
>;
type _05d = Expect<
  Equal<ListLayerProfile<boolean>["next"], GivenList<boolean>>
>;
type _05e = Expect<
  Equal<ListLayerProfile<unknown>["keys"], "value" | "next">
>;

// 6. Map a list family to a new payload while preserving its recursive shape.
export type MappedRecursiveList<Input, Output> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<MappedRecursiveList<number, string>, GivenList<string>>
>;
type _06b = Expect<
  Equal<Extract<MappedRecursiveList<never, boolean>, null>, null>
>;
type _06c = Expect<
  Equal<
    NonNullable<MappedRecursiveList<number, string>>["value"],
    string
  >
>;
type _06d = Expect<
  Equal<
    NonNullable<MappedRecursiveList<string, number>>["next"],
    GivenList<number>
  >
>;
type _06e = Expect<
  Equal<MappedRecursiveList<unknown, never>, GivenList<never>>
>;

// ─── Finite members, bases, and recursive variants ───────────────────

// 7. Classify representative finite object chains against a recursive list.
export type FiniteListMembershipProfile = TODO; // TODO(koan)

type _07a = Expect<
  Equal<FiniteListMembershipProfile["base"], true>
>;
type _07b = Expect<
  Equal<FiniteListMembershipProfile["one"], true>
>;
type _07c = Expect<
  Equal<FiniteListMembershipProfile["two"], true>
>;
type _07d = Expect<
  Equal<FiniteListMembershipProfile["wrongPayload"], false>
>;
type _07e = Expect<
  Equal<FiniteListMembershipProfile["missingLink"], false>
>;

// 8. Classify shallow and deeply nested readonly containers.
export type NestedMembershipProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<NestedMembershipProfile["leaf"], true>>;
type _08b = Expect<Equal<NestedMembershipProfile["empty"], true>>;
type _08c = Expect<Equal<NestedMembershipProfile["flat"], true>>;
type _08d = Expect<Equal<NestedMembershipProfile["deep"], true>>;
type _08e = Expect<Equal<NestedMembershipProfile["mixed"], false>>;

// 9. Extract each expression variant and its recursive child fields.
export type ExpressionLayerProfile = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ExpressionLayerProfile["kinds"], "number" | "negate" | "add">
>;
type _09b = Expect<
  Equal<ExpressionLayerProfile["numberValue"], number>
>;
type _09c = Expect<
  Equal<ExpressionLayerProfile["negated"], GivenExpression>
>;
type _09d = Expect<
  Equal<ExpressionLayerProfile["addLeft"], GivenExpression>
>;
type _09e = Expect<
  Equal<ExpressionLayerProfile["addKeys"], "kind" | "left" | "right">
>;

// 10. Contrast an explicit null base with an optional recursive link.
export type ListEncodingProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<ListEncodingProfile["nullListToOptional"], false>
>;
type _10b = Expect<
  Equal<ListEncodingProfile["optionalToNull"], false>
>;
type _10c = Expect<
  Equal<ListEncodingProfile["nullNext"], GivenList<string>>
>;
type _10d = Expect<
  Equal<
    ListEncodingProfile["optionalNext"],
    GivenOptionalList<string> | undefined
  >
>;
type _10e = Expect<
  Equal<ListEncodingProfile["optionalHasNull"], false>
>;

// ─── Extreme payloads, variance, and shallow utilities ───────────────

// 11. Keep the null base available when the node payload is `never`.
export type NeverListProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<NeverListProfile["base"], true>>;
type _11b = Expect<Equal<NeverListProfile["payload"], never>>;
type _11c = Expect<
  Equal<NeverListProfile["structuralNode"], true>
>;
type _11d = Expect<Equal<NeverListProfile["toString"], true>>;
type _11e = Expect<Equal<NeverListProfile["fromString"], false>>;

// 12. Classify collapsing and inhabitable branches of extreme nested families.
export type ExtremeNestedProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ExtremeNestedProfile["unknown"], unknown>>;
type _12b = Expect<Equal<ExtremeNestedProfile["any"], true>>;
type _12c = Expect<
  Equal<ExtremeNestedProfile["neverEmpty"], true>
>;
type _12d = Expect<
  Equal<ExtremeNestedProfile["neverValue"], true>
>;
type _12e = Expect<
  Equal<ExtremeNestedProfile["nestedEmpty"], true>
>;

// 13. Describe structural covariance across list and readonly nested families.
export type RecursiveVarianceProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<RecursiveVarianceProfile["narrowList"], true>
>;
type _13b = Expect<
  Equal<RecursiveVarianceProfile["broadList"], false>
>;
type _13c = Expect<
  Equal<RecursiveVarianceProfile["narrowNested"], true>
>;
type _13d = Expect<
  Equal<RecursiveVarianceProfile["broadNested"], false>
>;
type _13e = Expect<
  Equal<RecursiveVarianceProfile["neverList"], true>
>;

// 14. Apply ordinary utilities to only the currently visible node layer.
export type ShallowListUtilityProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    ShallowListUtilityProfile["partialValue"],
    { id: number } | undefined
  >
>;
type _14b = Expect<
  Equal<
    ShallowListUtilityProfile["partialNext"],
    GivenList<{ id: number }> | undefined
  >
>;
type _14c = Expect<
  Equal<
    ShallowListUtilityProfile["readonlyValue"],
    { id: number }
  >
>;
type _14d = Expect<
  Equal<
    ShallowListUtilityProfile["readonlyNext"],
    GivenList<{ id: number }>
  >
>;
type _14e = Expect<
  Equal<ShallowListUtilityProfile["deepReadonly"], false>
>;

// 15. Build one-layer Pick, Omit, Partial, and Readonly node views.
export type ListNodeUtilityProfile<Value> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ListNodeUtilityProfile<string>["partial"],
    { value?: string; next?: GivenList<string> }
  >
>;
type _15b = Expect<
  Equal<
    ListNodeUtilityProfile<string>["readonly"],
    { readonly value: string; readonly next: GivenList<string> }
  >
>;
type _15c = Expect<
  Equal<
    ListNodeUtilityProfile<string>["payloadOnly"],
    { value: string }
  >
>;
type _15d = Expect<
  Equal<
    ListNodeUtilityProfile<string>["withoutNext"],
    { value: string }
  >
>;
type _15e = Expect<
  Equal<
    ListNodeUtilityProfile<string>["values"],
    string | GivenList<string>
  >
>;

// 16. Describe repeated observations that are also compatible with cyclic graphs.
export type RecursiveObservationProfile<Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<RecursiveObservationProfile<number>["next"], GivenList<number>>
>;
type _16b = Expect<
  Equal<
    RecursiveObservationProfile<number>["secondNext"],
    GivenList<number>
  >
>;
type _16c = Expect<
  Equal<RecursiveObservationProfile<number>["deepValue"], number>
>;
type _16d = Expect<
  Equal<RecursiveObservationProfile<number>["nodeIsList"], true>
>;
type _16e = Expect<
  Equal<RecursiveObservationProfile<number>["keys"], "value" | "next">
>;

// 17. Describe nested-expression observations one recursive layer at a time.
export type RecursiveExpressionObservationProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    RecursiveExpressionObservationProfile["kinds"],
    "number" | "negate" | "add"
  >
>;
type _17b = Expect<
  Equal<
    RecursiveExpressionObservationProfile["groupedKinds"],
    "number" | "negate" | "add"
  >
>;
type _17c = Expect<
  Equal<
    RecursiveExpressionObservationProfile["nestedNumber"],
    number
  >
>;
type _17d = Expect<
  Equal<
    RecursiveExpressionObservationProfile["addLeft"],
    GivenExpression
  >
>;
type _17e = Expect<
  Equal<RecursiveExpressionObservationProfile["validPair"], true>
>;

// 18. Build the runtime signatures for list, nesting, and expression algorithms.
export type RecursiveRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    RecursiveRuntimeApi["listFromArray"],
    <Value>(values: readonly Value[]) => GivenList<Value>
  >
>;
type _18b = Expect<
  Equal<
    RecursiveRuntimeApi["listToArray"],
    <Value>(list: GivenList<Value>) => Value[]
  >
>;
type _18c = Expect<
  Equal<
    RecursiveRuntimeApi["mapList"],
    <Input, Output>(
      list: GivenList<Input>,
      transform: (value: Input) => Output,
    ) => GivenList<Output>
  >
>;
type _18d = Expect<
  Equal<
    RecursiveRuntimeApi["nestedDepth"],
    (value: unknown) => number
  >
>;
type _18e = Expect<
  Equal<
    RecursiveRuntimeApi["evaluateExpression"],
    (expression: GivenExpression) => number
  >
>;
