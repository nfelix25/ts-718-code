import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-032: assertion functions — constructions
 * =============================================================================
 *
 * These constructions build named, condition, generic, structural, array, and
 * receiver assertion signatures, then model their successful continuation and
 * unreachable failure path. They cover explicit callable annotations,
 * contradictions, dotted-property facts, alias invalidation, reassignment,
 * lookup validation, trusted-but-unverified bodies, and special source types.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type KnownPositive<Member, Target> =
  Member extends Target
    ? Member
    : Target extends Member
      ? Target
      : never;

type GivenContinuation<Source, Target> =
  0 extends 1 & Source
    ? Target
    : unknown extends Source
      ? Target
      : Source extends unknown ? KnownPositive<Source, Target> : never;

type AssertionTarget<Assertion> =
  Assertion extends (value: any) => asserts value is infer Target
    ? Target
    : never;

type PairOverlap<Left, Right> =
  Left extends unknown
    ? Right extends unknown
      ? Left extends Right
        ? Left
        : Right extends Left
          ? Right
          : never
      : never
    : never;

type GivenUser = {
  readonly id: number;
  readonly name: string;
};

type GivenAnimal =
  | { readonly kind: "fish"; swim(): void }
  | { readonly kind: "bird"; fly(): void };

interface GivenStore<Value> {
  state: "empty" | "ready";
  value: Value | undefined;
}

// ─── Named assertion contracts and continuation ───────────────────────────

// 1. Build a named assertion whose target is assignable to its parameter.
export type NamedAssertion<
  Parameter,
  Target extends Parameter,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    NamedAssertion<unknown, string>,
    (value: unknown) => asserts value is string
  >
>;
type _01b = Expect<
  Equal<
    NamedAssertion<string | number, number>,
    (value: string | number) => asserts value is number
  >
>;
type _01c = Expect<
  Equal<
    NamedAssertion<unknown, GivenUser>,
    (value: unknown) => asserts value is GivenUser
  >
>;
type _01d = Expect<
  Equal<
    NamedAssertion<readonly unknown[], readonly string[]>,
    (value: readonly unknown[]) => asserts value is readonly string[]
  >
>;

// 2. Recover an assertion's parameters, target claim, and void call result.
export type AssertionProfile<
  Assertion extends (...args: any[]) => void,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    AssertionProfile<(value: unknown) => asserts value is string>,
    [[value: unknown], string, void]
  >
>;
type _02b = Expect<
  Equal<
    AssertionProfile<(value: GivenAnimal) => asserts value is Extract<GivenAnimal, { kind: "fish" }>>,
    [
      [value: GivenAnimal],
      Extract<GivenAnimal, { kind: "fish" }>,
      void,
    ]
  >
>;
type _02d = Expect<
  Equal<
    AssertionProfile<(value: readonly unknown[]) => asserts value is readonly number[]>,
    [[value: readonly unknown[]], readonly number[], void]
  >
>;

// 3. Construct the only reachable value type after a successful assertion.
export type AssertionContinuation<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<AssertionContinuation<string | number, number>, number>
>;
type _03b = Expect<
  Equal<AssertionContinuation<unknown, string>, string>
>;
type _03c = Expect<
  Equal<AssertionContinuation<any, string>, string>
>;
type _03d = Expect<
  Equal<
    AssertionContinuation<
      GivenAnimal,
      Extract<GivenAnimal, { kind: "fish" }>
    >,
    Extract<GivenAnimal, { kind: "fish" }>
  >
>;
type _03e = Expect<Equal<AssertionContinuation<never, never>, never>>;

// 4. Build the successful path, unreachable failure path, and void result.
export type AssertionFlow<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    AssertionFlow<string | number, string>,
    { readonly continues: string; readonly failure: never; readonly result: void }
  >
>;
type _04b = Expect<
  Equal<
    AssertionFlow<unknown, GivenUser>,
    { readonly continues: GivenUser; readonly failure: never; readonly result: void }
  >
>;
type _04c = Expect<
  Equal<
    AssertionFlow<never, never>,
    { readonly continues: never; readonly failure: never; readonly result: void }
  >
>;
type _04d = Expect<
  Equal<AssertionFlow<string, string>["result"], void>
>;

// ─── `asserts condition` evidence ─────────────────────────────────────────

// 5. Build a condition assertion with its optional message.
export type ConditionAssertion =
  TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    ConditionAssertion,
    (condition: unknown, message?: string) => asserts condition
  >
>;
type _05b = Expect<
  Equal<Parameters<ConditionAssertion>["length"], 1 | 2>
>;
type _05c = Expect<Equal<ReturnType<ConditionAssertion>, void>>;

// 6. Keep the overlap proven by an equality or typeof-like condition.
export type AssertedEqualCondition<
  Source,
  Proven,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<AssertedEqualCondition<string | number | null, string>, string>
>;
type _06b = Expect<
  Equal<AssertedEqualCondition<"a" | "b" | "c", "b">, "b">
>;
type _06c = Expect<
  Equal<
    AssertedEqualCondition<
      { readonly kind: "a"; readonly a: number }
      | { readonly kind: "b"; readonly b: string },
      { readonly kind: "a" }
    >,
    { readonly kind: "a"; readonly a: number }
  >
>;
type _06d = Expect<
  Equal<AssertedEqualCondition<unknown, object>, object>
>;
type _06e = Expect<Equal<AssertedEqualCondition<never, string>, never>>;

// 7. Remove the member rejected by an asserted inequality.
export type AssertedNotEqualCondition<
  Source,
  Rejected,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<AssertedNotEqualCondition<string | number | null, null>, string | number>
>;
type _07b = Expect<
  Equal<AssertedNotEqualCondition<"a" | "b" | "c", "a">, "b" | "c">
>;
type _07c = Expect<
  Equal<AssertedNotEqualCondition<boolean | undefined, false>, true | undefined>
>;
type _07d = Expect<
  Equal<AssertedNotEqualCondition<0 | false | "" | null, null>, 0 | false | "">
>;
type _07e = Expect<Equal<AssertedNotEqualCondition<never, null>, never>>;

// 8. Apply two asserted facts in sequence to model a conjunction.
export type AssertedConjunction<
  Source,
  First,
  Second,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    AssertedConjunction<unknown, object, Record<"id", unknown>>,
    Record<"id", unknown>
  >
>;
type _08b = Expect<
  Equal<
    AssertedConjunction<
      GivenAnimal,
      { readonly kind: "fish" },
      { swim(): void }
    >,
    Extract<GivenAnimal, { kind: "fish" }>
  >
>;
type _08c = Expect<
  Equal<AssertedConjunction<string | number | null, {}, string>, string>
>;
type _08d = Expect<
  Equal<AssertedConjunction<unknown, string, number>, never>
>;

// ─── Generic and structural assertions ────────────────────────────────────

// 9. Build the generic assertion signature that removes null and undefined.
export type NonNullishAssertion =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    NonNullishAssertion,
    <Value>(value: Value) => asserts value is NonNullable<Value>
  >
>;
type _09b = Expect<Equal<ReturnType<NonNullishAssertion>, void>>;

// 10. Construct the continuation of a generic non-nullish assertion.
export type NonNullishContinuation<Value> =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    NonNullishContinuation<string | null | undefined>,
    string
  >
>;
type _10b = Expect<
  Equal<
    NonNullishContinuation<0 | false | "" | null>,
    0 | false | ""
  >
>;
type _10c = Expect<Equal<NonNullishContinuation<unknown>, {}>>;
type _10d = Expect<
  Equal<
    NonNullishContinuation<{ readonly id: number } | undefined>,
    { readonly id: number }
  >
>;
type _10e = Expect<Equal<NonNullishContinuation<never>, never>>;

// 11. Build a generic assertion that intersects structural evidence into Value.
export type IntersectionAssertion<Evidence extends object> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    IntersectionAssertion<{ readonly id: string }>,
    <Value>(value: Value) => asserts value is Value & { readonly id: string }
  >
>;
type _11b = Expect<
  Equal<
    IntersectionAssertion<GivenUser>,
    <Value>(value: Value) => asserts value is Value & GivenUser
  >
>;
type _11c = Expect<
  Equal<ReturnType<IntersectionAssertion<Record<PropertyKey, unknown>>>, void>
>;
type _11d = Expect<
  Equal<
    IntersectionAssertion<{ readonly active: true; readonly note?: string }>,
    <Value>(
      value: Value
    ) => asserts value is Value & {
      readonly active: true;
      readonly note?: string;
    }
  >
>;

// 12. Build a structural assertion for unknown application input.
export type StructuralAssertion<Shape extends object> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    StructuralAssertion<GivenUser>,
    (value: unknown) => asserts value is GivenUser
  >
>;
type _12b = Expect<
  Equal<
    StructuralAssertion<Record<PropertyKey, unknown>>,
    (value: unknown) => asserts value is Record<PropertyKey, unknown>
  >
>;
type _12c = Expect<
  Equal<
    StructuralAssertion<{ readonly state: "ready"; readonly data: string }>,
    (
      value: unknown
    ) => asserts value is { readonly state: "ready"; readonly data: string }
  >
>;
type _12d = Expect<Equal<ReturnType<StructuralAssertion<GivenUser>>, void>>;

// 13. Read a field made safe by the structural assertion.
export type AssertedStructuralField<
  Shape,
  Key extends keyof Shape,
> = TODO; // TODO(koan)

type _13a = Expect<Equal<AssertedStructuralField<GivenUser, "id">, number>>;
type _13b = Expect<Equal<AssertedStructuralField<GivenUser, "name">, string>>;
type _13c = Expect<
  Equal<
    AssertedStructuralField<{ readonly data?: string }, "data">,
    string | undefined
  >
>;
type _13d = Expect<
  Equal<
    AssertedStructuralField<Record<PropertyKey, unknown>, "missing">,
    unknown
  >
>;

// ─── Receiver assertions and callable annotation ──────────────────────────

// 14. Build an assertion method that refines its receiver.
export type ThisAssertion<
  Receiver,
  Evidence extends object,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    ThisAssertion<GivenStore<string>, { state: "ready"; value: string }>,
    (
      this: GivenStore<string>
    ) => asserts this is GivenStore<string> & {
      state: "ready";
      value: string;
    }
  >
>;
type _14b = Expect<
  Equal<
    ThisParameterType<ThisAssertion<GivenStore<number>, { value: number }>>,
    GivenStore<number>
  >
>;
type _14c = Expect<
  Equal<ReturnType<ThisAssertion<GivenStore<number>, { value: number }>>, void>
>;
type _14d = Expect<
  Equal<
    ThisAssertion<{ state: "open" | "closed" }, { state: "open" }>,
    (
      this: { state: "open" | "closed" }
    ) => asserts this is { state: "open" | "closed" } & { state: "open" }
  >
>;

// 15. Construct the successful receiver intersection.
export type ThisAssertionContinuation<
  Receiver,
  Evidence extends object,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ThisAssertionContinuation<GivenStore<string>, { value: string }>,
    GivenStore<string> & { value: string }
  >
>;
type _15b = Expect<
  Equal<
    ThisAssertionContinuation<GivenStore<string>, { value: string }>["value"],
    string
  >
>;
type _15c = Expect<
  Equal<
    ThisAssertionContinuation<
      GivenStore<number>,
      { state: "ready"; value: number }
    >["state"],
    "ready"
  >
>;
type _15d = Expect<
  Equal<ThisAssertionContinuation<never, { value: string }>, never>
>;

// 16. Record whether a callable assertion's explicit annotation exposes its effect.
export type CallableAssertionMetadata<
  Signature,
  Annotation extends "explicit" | "inferred",
> = TODO; // TODO(koan)

type GivenNumberAssertion = (value: unknown) => asserts value is number;
type _16a = Expect<
  Equal<
    CallableAssertionMetadata<GivenNumberAssertion, "explicit">,
    {
      readonly signature: GivenNumberAssertion;
      readonly callEffect: "available";
    }
  >
>;
type _16b = Expect<
  Equal<
    CallableAssertionMetadata<GivenNumberAssertion, "inferred">,
    {
      readonly signature: GivenNumberAssertion;
      readonly callEffect: "requires-explicit-annotation";
    }
  >
>;
type _16c = Expect<
  Equal<
    CallableAssertionMetadata<ConditionAssertion, "explicit">["callEffect"],
    "available"
  >
>;
type _16d = Expect<
  Equal<
    CallableAssertionMetadata<ConditionAssertion, "inferred">["signature"],
    (condition: unknown, message?: string) => asserts condition
  >
>;

// ─── Contradictions, writes, aliases, and lookups ──────────────────────────

// 17. Apply an ordered sequence of assertion targets.
export type AssertionSequence<
  Source,
  Targets extends readonly unknown[],
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<AssertionSequence<string | number, [string]>, string>
>;
type _17b = Expect<
  Equal<AssertionSequence<string | number, [string, number]>, never>
>;
type _17c = Expect<
  Equal<
    AssertionSequence<unknown, [object, Record<"id", unknown>]>,
    Record<"id", unknown>
  >
>;
type _17d = Expect<
  Equal<
    AssertionSequence<
      GivenAnimal,
      [{ readonly kind: "fish" }, { swim(): void }]
    >,
    Extract<GivenAnimal, { kind: "fish" }>
  >
>;
type _17e = Expect<Equal<AssertionSequence<never, [string]>, never>>;

// 18. Track the declared owner separately from its asserted property observation.
export type PropertyAssertionObservation<
  Owner,
  Key extends keyof Owner,
  Target extends Owner[Key],
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    PropertyAssertionObservation<
      { value: string | undefined },
      "value",
      string
    >,
    {
      readonly owner: { value: string | undefined };
      readonly property: string;
    }
  >
>;
type _18b = Expect<
  Equal<
    PropertyAssertionObservation<
      { readonly value?: number },
      "value",
      number
    >,
    {
      readonly owner: { readonly value?: number };
      readonly property: number;
    }
  >
>; // The owner keeps readonly/optional modifiers while the read is narrowed.
type _18c = Expect<
  Equal<
    PropertyAssertionObservation<GivenStore<string>, "state", "ready">["property"],
    "ready"
  >
>;
type _18d = Expect<
  Equal<
    PropertyAssertionObservation<{ value: never }, "value", never>["property"],
    never
  >
>;

// 19. Restore the declared property type after a possible write through an alias.
export type AfterAssertionAliasMutation<DeclaredProperty> =
  TODO; // TODO(koan)

type _19a = Expect<
  Equal<AfterAssertionAliasMutation<string | undefined>, string | undefined>
>;
type _19b = Expect<
  Equal<AfterAssertionAliasMutation<number | null>, number | null>
>;
type _19c = Expect<
  Equal<
    AfterAssertionAliasMutation<{ readonly id: string } | undefined>,
    { readonly id: string } | undefined
  >
>;
type _19d = Expect<Equal<AfterAssertionAliasMutation<unknown>, unknown>>;

// 20. Let a later valid assignment establish a fresh observed type.
export type ReassignmentAfterAssertion<
  Declared,
  Assigned extends Declared,
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<ReassignmentAfterAssertion<"a" | "b", "b">, "b">
>;
type _20b = Expect<
  Equal<ReassignmentAfterAssertion<string | number, number>, number>
>;
type _20c = Expect<
  Equal<
    ReassignmentAfterAssertion<
      { readonly kind: "a" } | { readonly kind: "b" },
      { readonly kind: "b" }
    >,
    { readonly kind: "b" }
  >
>;
type _20d = Expect<
  Equal<ReassignmentAfterAssertion<unknown, null>, null>
>;

// 21. Remove absence from an indexed, tuple, or map lookup.
export type AssertedLookup<Value> =
  TODO; // TODO(koan)

type _21a = Expect<Equal<AssertedLookup<string | undefined>, string>>;
type _21b = Expect<Equal<AssertedLookup<number | null>, number>>;
type _21c = Expect<
  Equal<AssertedLookup<{ readonly id: number } | undefined>, { readonly id: number }>
>;
type _21d = Expect<Equal<AssertedLookup<0 | false | null>, 0 | false>>;
type _21e = Expect<Equal<AssertedLookup<never>, never>>;

// ─── Legality, expression use, arrays, and special values ─────────────────

// 22. Report whether the named assertion target is legal for its parameter.
export type AssertionContractValid<
  Parameter,
  Target,
> = TODO; // TODO(koan)

type _22a = Expect<Equal<AssertionContractValid<unknown, string>, true>>;
type _22b = Expect<Equal<AssertionContractValid<string, number>, false>>;
type _22c = Expect<
  Equal<
    AssertionContractValid<GivenAnimal, Extract<GivenAnimal, { kind: "fish" }>>,
    true
  >
>;
type _22d = Expect<
  Equal<AssertionContractValid<readonly unknown[], readonly string[]>, true>
>;
type _22e = Expect<
  Equal<AssertionContractValid<string | number, boolean>, false>
>;

// 23. Describe why an assertion call cannot be tested as a boolean.
export type AssertionUseProfile<Assertion extends (...args: any[]) => void> =
  TODO; // TODO(koan)

type _23a = Expect<
  Equal<
    AssertionUseProfile<(value: unknown) => asserts value is string>,
    { readonly result: void; readonly booleanConditionAllowed: false }
  >
>;
type _23b = Expect<
  Equal<
    AssertionUseProfile<ConditionAssertion>,
    { readonly result: void; readonly booleanConditionAllowed: false }
  >
>;
type _23c = Expect<
  Equal<
    AssertionUseProfile<() => void>,
    { readonly result: void; readonly booleanConditionAllowed: false }
  >
>;

// 24. Build an assertion that validates array identity and every element.
export type ArrayAssertion<Element> =
  TODO; // TODO(koan)

type _24a = Expect<
  Equal<
    ArrayAssertion<number>,
    (value: unknown) => asserts value is number[]
  >
>;
type _24b = Expect<
  Equal<
    ArrayAssertion<string>,
    (value: unknown) => asserts value is string[]
  >
>;
type _24c = Expect<
  Equal<
    ArrayAssertion<{ readonly id: string }>,
    (value: unknown) => asserts value is Array<{ readonly id: string }>
  >
>;
type _24d = Expect<Equal<ReturnType<ArrayAssertion<never>>, void>>;

// 25. Classify successful continuation without letting any satisfy assertions.
export type AssertionContinuationKind<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _25a = Expect<
  Equal<AssertionContinuationKind<any, string>, "ordinary">
>;
type _25b = Expect<
  Equal<AssertionContinuationKind<unknown, string>, "ordinary">
>;
type _25c = Expect<
  Equal<AssertionContinuationKind<never, never>, "never">
>;
type _25d = Expect<
  Equal<
    AssertionContinuationKind<string | number, boolean & (string | number)>,
    "never"
  >
>;
type _25e = Expect<
  Equal<
    AssertionContinuationKind<
      GivenAnimal,
      Extract<GivenAnimal, { kind: "fish" }>
    >,
    "ordinary"
  >
>;
