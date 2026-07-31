import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-004: Literal widening, as const, and satisfies — constructions
 * =============================================================================
 *
 * These constructions model the views TypeScript creates for mutable bindings,
 * preserved literal expressions, annotations, assertions, and validated
 * registries. The signatures explicitly separate direct literal material from
 * referenced or previously widened material, matching the syntax-sensitive
 * boundary described by the narrative. Replace each `TODO` with a type that
 * satisfies all assertions below.
 */

// Given machinery: flatten intersections so object representations compare
// directly in the assertions.
type GivenPrettify<Value> = {
  [Key in keyof Value]: Value[Key];
} & {};

declare const givenUniqueSymbol: unique symbol;

// ─── Widening locations ──────────────────────────────────────────────────────

// 1. Widen primitive literals to the peer values accepted by a mutable location.
//    "ready" → string; 3 → number; true → boolean
export type WidenLiteral<Value> = TODO; // TODO(koan)

// 2. Construct the inferred binding view, preserving const and widening let.
//    Hint: reuse WidenLiteral for the mutable branch.
export type BindingView<Value, Mutable extends boolean> = TODO; // TODO(koan)

// 3. Construct the view of a conditional binding from both branch literals.
export type ConditionalBinding<
  Left,
  Right,
  Mutable extends boolean,
> = TODO; // TODO(koan)

// 4. Make an object's top-level properties writable and widen primitive values.
export type MutableObject<Shape extends object> = TODO; // TODO(koan)

// 5. Build the mutable array inferred from a union of literal elements.
export type MutableArray<Elements> = TODO; // TODO(koan)

// 6. Build a mutable, fixed-length tuple whose primitive slots are widened.
export type MutableTuple<Elements extends readonly unknown[]> = TODO; // TODO(koan)

// 7. Build a function type whose return is an ordinary widening location.
export type WidenedReturn<
  Arguments extends readonly unknown[],
  Result,
> = TODO; // TODO(koan)

// 8. Build a function type whose return literal is explicitly preserved.
export type PreservedReturn<
  Arguments extends readonly unknown[],
  Result,
> = TODO; // TODO(koan)

// 9. Recursively construct the mutable widened view of a literal object graph.
//    Readonly tuples become mutable arrays because ordinary arrays are not tuples.
export type DeepMutableWiden<Value> = TODO; // TODO(koan)

// ─── Const preservation boundaries ──────────────────────────────────────────

// 10. Recursively preserve direct literal material with readonly structure.
export type ConstLiteral<Value> = TODO; // TODO(koan)

// 11. Construct the readonly tuple produced by a const-asserted array literal.
export type ConstTuple<Elements extends readonly unknown[]> = TODO; // TODO(koan)

// 12. Wrap a referenced value as readonly without deep-freezing its prior type.
//     Referenced → { readonly child: Referenced }
export type ConstReference<
  Key extends PropertyKey,
  Referenced,
> = TODO; // TODO(koan)

// 13. Construct a const-asserted spread: retain the source's existing value
//     types, let added keys win, and deeply preserve newly written literals.
export type ConstSpread<
  Source extends object,
  Added extends object,
> = TODO; // TODO(koan)

// 14. Construct a readonly property from a computed literal key.
export type ConstComputed<
  Key extends PropertyKey,
  Value,
> = TODO; // TODO(koan)

// 15. Construct Object.freeze's shallow readonly static view.
export type ShallowFrozen<Shape extends object> = TODO; // TODO(koan)

// ─── Chosen views and structural validation ──────────────────────────────────

// 16. Choose the declared or asserted public view instead of the expression view.
export type ChosenView<Expression, Declared> = TODO; // TODO(koan)

// 17. Validate assignability without distributing a union expression, retaining
//     the expression-specific type when it is accepted.
export type SatisfiedView<Expression, Constraint> = TODO; // TODO(koan)

// 18. Return the constraint keys absent from an expression.
export type MissingKeys<Expression, Constraint> = TODO; // TODO(koan)

// 19. Return the expression keys not declared by a constraint.
export type ExtraKeys<Expression, Constraint> = TODO; // TODO(koan)

// 20. Model a fresh exact check: reject missing, incompatible, or extra fields.
export type ExactSatisfies<Expression, Constraint> = TODO; // TODO(koan)

// 21. Validate a tuple expression while retaining its mutable tuple identity.
export type SatisfiedTuple<
  Expression extends readonly unknown[],
  Constraint extends readonly unknown[],
> = TODO; // TODO(koan)

// 22. Validate an array against a readonly contract without adding readonly.
export type SatisfiedReadonlyArray<
  Expression extends readonly unknown[],
  Element,
> = TODO; // TODO(koan)

// 23. Build the mutable array inferred under a literal-union element constraint.
export type ConstrainedArray<Element, Allowed> = TODO; // TODO(koan)

// ─── Validated registries and exact access ───────────────────────────────────

// 24. Validate every registry entry and retain the registry's exact keys.
export type ValidatedRegistry<
  Entries extends object,
  Definition,
> = TODO; // TODO(koan)

// 25. Combine const preservation with registry validation.
export type ConstValidatedRegistry<
  Entries extends object,
  Definition,
> = TODO; // TODO(koan)

// 26. Return the exact key union retained by a registry expression.
export type RegistryKeys<Entries extends object> = TODO; // TODO(koan)

// 27. Return one registry entry's expression-specific type.
export type RegistryValue<
  Entries extends object,
  Key extends keyof Entries,
> = TODO; // TODO(koan)

// 28. Retain a string literal only when it satisfies a template constraint.
export type TemplateSatisfies<
  Value extends string,
  Pattern extends string,
> = TODO; // TODO(koan)

// 29. Extract the exact slot exposed by tuple destructuring or indexed access.
export type TupleSlot<
  Tuple extends readonly unknown[],
  Index extends keyof Tuple,
> = TODO; // TODO(koan)

// ─── Assertions ───────────────────────────────────────────────────────────────

type _01a = Expect<Equal<WidenLiteral<"ready">, string>>;
type _01b = Expect<Equal<WidenLiteral<-1 | 3>, number>>;
type _01c = Expect<Equal<WidenLiteral<true>, boolean>>;
type _01d = Expect<Equal<WidenLiteral<10n>, bigint>>;
type _01e = Expect<Equal<WidenLiteral<typeof givenUniqueSymbol>, symbol>>;

type _02a = Expect<Equal<BindingView<"ready", false>, "ready">>;
type _02b = Expect<Equal<BindingView<"ready", true>, string>>;
type _02c = Expect<Equal<BindingView<42, true>, number>>;
type _02d = Expect<Equal<BindingView<never, true>, never>>;

type _03a = Expect<
  Equal<ConditionalBinding<"left", "right", false>, "left" | "right">
>;
type _03b = Expect<
  Equal<ConditionalBinding<"left", "right", true>, string>
>;
type _03c = Expect<Equal<ConditionalBinding<0, 1, false>, 0 | 1>>;
type _03d = Expect<Equal<ConditionalBinding<never, "only", true>, string>>;

type _04a = Expect<
  Equal<
    MutableObject<{
      readonly text: "alpha";
      readonly count: 1;
      readonly enabled: true;
    }>,
    { text: string; count: number; enabled: boolean }
  >
>;
type _04b = Expect<
  Equal<MutableObject<{ readonly mode?: "dark" }>, { mode?: string }>
>; // Optionality survives while the literal widens.
type _04c = Expect<Equal<MutableObject<{}>, {}>>;
type _04d = Expect<
  Equal<
    MutableObject<{ readonly nested: { status: "new" } }>,
    { nested: { status: "new" } }
  >
>; // This construction is deliberately shallow.

type _05a = Expect<Equal<MutableArray<"a" | "b">, string[]>>;
type _05b = Expect<Equal<MutableArray<"a" | 1 | true>, (string | number | boolean)[]>>;
type _05c = Expect<Equal<MutableArray<never>, never[]>>;
type _05d = Expect<Equal<MutableArray<1 | 2 | 3>, number[]>>;

type _06a = Expect<
  Equal<MutableTuple<readonly ["a", 1]>, [string, number]>
>;
type _06b = Expect<
  Equal<MutableTuple<readonly [true, "x", 2n]>, [boolean, string, bigint]>
>;
type _06c = Expect<Equal<MutableTuple<readonly []>, []>>;
type _06d = Expect<
  Equal<MutableTuple<readonly [value?: "x"]>, [value?: string]>
>;

type _07a = Expect<
  Equal<WidenedReturn<[], "made">, () => string>
>;
type _07b = Expect<
  Equal<WidenedReturn<[id: number], 200>, (id: number) => number>
>;
type _07c = Expect<
  Equal<
    WidenedReturn<[flag: boolean, label?: string], true>,
    (flag: boolean, label?: string) => boolean
  >
>;

type _08a = Expect<
  Equal<PreservedReturn<[], "ok">, () => "ok">
>;
type _08b = Expect<
  Equal<
    PreservedReturn<[value: string], "ok" | "error">,
    (value: string) => "ok" | "error"
  >
>;
type _08c = Expect<
  Equal<PreservedReturn<[], never>, () => never>
>;

type _09a = Expect<
  Equal<
    DeepMutableWiden<{
      readonly mode: "dark";
      readonly nested: { readonly enabled: true };
      readonly labels: readonly ["fast", "safe"];
    }>,
    { mode: string; nested: { enabled: boolean }; labels: string[] }
  >
>;
type _09b = Expect<
  Equal<DeepMutableWiden<readonly ["a", 1, true]>, (string | number | boolean)[]>
>;
type _09c = Expect<Equal<DeepMutableWiden<readonly []>, never[]>>;
type _09d = Expect<
  Equal<
    DeepMutableWiden<{ readonly maybe?: { readonly state: "on" } }>,
    { maybe?: { state: string } }
  >
>;

type _10a = Expect<
  Equal<
    ConstLiteral<{ mode: "dark"; count: 1 }>,
    { readonly mode: "dark"; readonly count: 1 }
  >
>;
type _10b = Expect<
  Equal<
    ConstLiteral<{ nested: { enabled: true } }>,
    { readonly nested: { readonly enabled: true } }
  >
>;
type _10c = Expect<
  Equal<ConstLiteral<["a", 1]>, readonly ["a", 1]>
>;
type _10d = Expect<Equal<ConstLiteral<{}>, {}>>;
type _10e = Expect<
  Equal<ConstLiteral<{ label?: "x" }>, { readonly label?: "x" }>
>;

type _11a = Expect<
  Equal<ConstTuple<["ok", 200]>, readonly ["ok", 200]>
>;
type _11b = Expect<
  Equal<ConstTuple<[["nested", true], 1]>, readonly [readonly ["nested", true], 1]>
>;
type _11c = Expect<Equal<ConstTuple<[]>, readonly []>>;
type _11d = Expect<
  Equal<ConstTuple<[value?: "x"]>, readonly [value?: "x"]>
>;

type MutableChild = { count: number };

type _12a = Expect<
  Equal<
    ConstReference<"child", MutableChild>,
    { readonly child: MutableChild }
  >
>;
type _12b = Expect<
  Equal<ConstReference<"items", string[]>, { readonly items: string[] }>
>;
type _12c = Expect<
  Equal<ConstReference<"empty", {}>, { readonly empty: {} }>
>;

type _13a = Expect<
  Equal<
    ConstSpread<{ mode: string; count: number }, { label: "copy" }>,
    { readonly mode: string; readonly count: number; readonly label: "copy" }
  >
>;
type _13b = Expect<
  Equal<
    ConstSpread<{ mode: string; version?: number }, { mode: "dark" }>,
    { readonly version?: number; readonly mode: "dark" }
  >
>; // A newly written property overrides the spread source.
type _13c = Expect<
  Equal<
    ConstSpread<{}, { config: { enabled: true } }>,
    { readonly config: { readonly enabled: true } }
  >
>;

type _14a = Expect<
  Equal<ConstComputed<"mode", "dark">, { readonly mode: "dark" }>
>;
type _14b = Expect<
  Equal<
    ConstComputed<"home" | "admin", boolean>,
    { readonly home: boolean; readonly admin: boolean }
  >
>;
type _14c = Expect<Equal<ConstComputed<never, string>, {}>>;

type _15a = Expect<
  Equal<
    ShallowFrozen<{ mode: "dark"; nested: { count: number } }>,
    { readonly mode: "dark"; readonly nested: { count: number } }
  >
>;
type _15b = Expect<
  Equal<ShallowFrozen<{ value?: number }>, { readonly value?: number }>
>;
type _15c = Expect<Equal<ShallowFrozen<{}>, {}>>;

interface GivenOptions {
  mode: "light" | "dark";
  retries: number;
}

type _16a = Expect<
  Equal<
    ChosenView<{ mode: "dark"; retries: 3 }, GivenOptions>,
    GivenOptions
  >
>;
type _16b = Expect<
  Equal<ChosenView<"idle", "idle" | "busy">, "idle" | "busy">
>;
type _16c = Expect<Equal<ChosenView<readonly [1, 2], number[]>, number[]>>;

type _17a = Expect<
  Equal<
    SatisfiedView<
      { mode: "dark"; retries: number },
      GivenOptions
    >,
    { mode: "dark"; retries: number }
  >
>;
type _17b = Expect<
  Equal<
    SatisfiedView<{ name: string; role: string }, { name: string }>,
    { name: string; role: string }
  >
>; // A stale compatible value retains its extra property.
type _17c = Expect<
  Equal<SatisfiedView<{ retries: string }, GivenOptions>, never>
>;
type _17d = Expect<Equal<SatisfiedView<never, GivenOptions>, never>>;

type _18a = Expect<
  Equal<
    MissingKeys<{ mode: "dark" }, GivenOptions>,
    "retries"
  >
>;
type _18b = Expect<
  Equal<MissingKeys<GivenOptions, GivenOptions>, never>
>;
type _18c = Expect<Equal<MissingKeys<{}, { a: string; b?: number }>, "a" | "b">>;

type _19a = Expect<
  Equal<
    ExtraKeys<{ name: string; role: string }, { name: string }>,
    "role"
  >
>;
type _19b = Expect<Equal<ExtraKeys<GivenOptions, GivenOptions>, never>>;
type _19c = Expect<Equal<ExtraKeys<{}, GivenOptions>, never>>;
type _19d = Expect<
  Equal<ExtraKeys<{ a: string; b: number; c: boolean }, { a: unknown }>, "b" | "c">
>;

type _20a = Expect<
  Equal<
    ExactSatisfies<
      { mode: "dark"; retries: number },
      GivenOptions
    >,
    { mode: "dark"; retries: number }
  >
>;
type _20b = Expect<
  Equal<
    ExactSatisfies<
      { mode: "dark"; retries: number; extra: true },
      GivenOptions
    >,
    never
  >
>;
type _20c = Expect<
  Equal<ExactSatisfies<{ mode: "dark" }, GivenOptions>, never>
>;
type _20d = Expect<
  Equal<ExactSatisfies<{ mode: "dark"; retries: string }, GivenOptions>, never>
>;

type _21a = Expect<
  Equal<SatisfiedTuple<[number, number], readonly [number, number]>, [number, number]>
>;
type _21b = Expect<
  Equal<SatisfiedTuple<[1, 2], [number, number]>, [1, 2]>
>;
type _21c = Expect<
  Equal<SatisfiedTuple<[1], [number, number]>, never>
>;
type _21d = Expect<Equal<SatisfiedTuple<[], readonly []>, []>>;

type _22a = Expect<
  Equal<SatisfiedReadonlyArray<string[], string>, string[]>
>;
type _22b = Expect<
  Equal<SatisfiedReadonlyArray<readonly ["a", "b"], string>, readonly ["a", "b"]>
>;
type _22c = Expect<
  Equal<SatisfiedReadonlyArray<number[], string>, never>
>;
type _22d = Expect<Equal<SatisfiedReadonlyArray<never[], string>, never[]>>;

type _23a = Expect<
  Equal<ConstrainedArray<"red" | "green", "red" | "green" | "blue">, ("red" | "green")[]>
>;
type _23b = Expect<
  Equal<ConstrainedArray<"red" | "orange", "red" | "green">, never>
>;
type _23c = Expect<Equal<ConstrainedArray<never, string>, never[]>>;
type _23d = Expect<Equal<ConstrainedArray<1 | 2, 1 | 2 | 3>, (1 | 2)[]>>;

interface GivenEndpoint {
  method: "GET" | "POST";
  path: `/${string}`;
  headers?: readonly string[];
}

type GivenEndpoints = {
  list: { method: "GET"; path: "/users" };
  create: {
    method: "POST";
    path: "/users";
    headers: ["content-type"];
  };
};

type _24a = Expect<
  Equal<ValidatedRegistry<GivenEndpoints, GivenEndpoint>, GivenEndpoints>
>;
type _24b = Expect<
  Equal<
    ValidatedRegistry<
      { broken: { method: "DELETE"; path: "/users" } },
      GivenEndpoint
    >,
    never
  >
>;
type _24c = Expect<Equal<ValidatedRegistry<{}, GivenEndpoint>, {}>>;
type _24d = Expect<
  Equal<
    ValidatedRegistry<
      { a: { method: "GET"; path: "/" }; b: { method: "POST"; path: "/b" } },
      GivenEndpoint
    >,
    {
      a: { method: "GET"; path: "/" };
      b: { method: "POST"; path: "/b" };
    }
  >
>;

type _25a = Expect<
  Equal<
    ConstValidatedRegistry<GivenEndpoints, GivenEndpoint>,
    {
      readonly list: {
        readonly method: "GET";
        readonly path: "/users";
      };
      readonly create: {
        readonly method: "POST";
        readonly path: "/users";
        readonly headers: readonly ["content-type"];
      };
    }
  >
>;
type _25b = Expect<
  Equal<ConstValidatedRegistry<{}, GivenEndpoint>, {}>
>;
type _25c = Expect<
  Equal<
    ConstValidatedRegistry<
      { broken: { method: "GET"; path: "users" } },
      GivenEndpoint
    >,
    never
  >
>;

type _26a = Expect<Equal<RegistryKeys<GivenEndpoints>, "list" | "create">>;
type _26b = Expect<Equal<RegistryKeys<{}>, never>>;
type _26c = Expect<
  Equal<RegistryKeys<Record<string, GivenEndpoint>>, string>
>;

type _27a = Expect<
  Equal<
    RegistryValue<GivenEndpoints, "list">,
    { method: "GET"; path: "/users" }
  >
>;
type _27b = Expect<
  Equal<
    RegistryValue<GivenEndpoints, "create">["headers"],
    ["content-type"]
  >
>;
type _27c = Expect<
  Equal<RegistryValue<{ only: never }, "only">, never>
>;

type _28a = Expect<
  Equal<TemplateSatisfies<"/users", `/${string}`>, "/users">
>;
type _28b = Expect<
  Equal<TemplateSatisfies<"users", `/${string}`>, never>
>;
type _28c = Expect<
  Equal<
    TemplateSatisfies<"/users" | "/admin", `/${string}`>,
    "/users" | "/admin"
  >
>;
type _28d = Expect<Equal<TemplateSatisfies<never, `/${string}`>, never>>;

type _29a = Expect<
  Equal<TupleSlot<readonly ["ok", 200], 0>, "ok">
>;
type _29b = Expect<
  Equal<TupleSlot<readonly ["ok", 200], 1>, 200>
>;
type _29c = Expect<
  Equal<TupleSlot<readonly ["ok", 200], number>, "ok" | 200>
>;
type _29d = Expect<Equal<TupleSlot<readonly [], number>, never>>;
