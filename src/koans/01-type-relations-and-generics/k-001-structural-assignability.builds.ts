import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-001: Structural assignability — constructions
 * =============================================================================
 *
 * These constructions turn the packet's minimum-contract mental model into
 * reusable type-level tools. They compare source and target guarantees,
 * project narrower public views, inspect functions and class instances, and
 * make the packet's optional, readonly, container, freshness, and broad-object
 * qualifications explicit. Replace each `TODO` with a type that satisfies all
 * assertions in the final section.
 */

// ─── Minimum contracts and visible views ─────────────────────────────────────

// 1. Decide whether every value of Source can be used as Target.
//    Rich source → minimum target produces true.
export type IsAssignable<Source, Target> = TODO; // TODO(koan)

// 2. Return the target keys that Source supplies with compatible value types.
export type AssignableContractKeys<Source, Target> = TODO; // TODO(koan)

// 3. Return the target keys whose guarantees Source does not supply.
export type MissingContractKeys<Source, Target> = TODO; // TODO(koan)

// 4. Expose exactly Target's visible contract when Source satisfies it.
//    Incompatible source → never
export type ContractView<Source, Target> = TODO; // TODO(koan)

// 5. Return the source keys that Target does not declare.
export type ExtraKeys<Source, Target> = TODO; // TODO(koan)

// 6. Require ordinary assignability and no extra source keys.
//    This models the shape discipline behind a fresh-literal boundary.
export type IsExactContract<Source, Target> = TODO; // TODO(koan)

// 7. Return the keys Source and Target have in common.
//    This exposes why a stale source with no overlap fails a weak target.
export type SharedKeys<Source, Target> = TODO; // TODO(koan)

// ─── Functions, methods, and class instances ─────────────────────────────────

// 8. Extract the first parameter contract, or never for a zero-argument call.
export type FirstParameter<Fn> = TODO; // TODO(koan)

// 9. Extract the result promised by a function type.
export type FunctionResult<Fn> = TODO; // TODO(koan)

// 10. Strip metadata from a callable object and retain only its call contract.
export type CallableView<Fn> = TODO; // TODO(koan)

// 11. Decide whether one function can fill another function contract.
//     This includes the rule that an implementation may ignore trailing args.
export type FunctionAssignable<Source, Target> = TODO; // TODO(koan)

// 12. Return the keys whose values are required methods or functions.
export type MethodKeys<Value> = TODO; // TODO(koan)

declare class BuildPrivateAlpha {
  private brand;
  value: number;
}

declare class BuildPrivateBeta {
  private brand;
  value: number;
}

declare class BuildPublicAlpha {
  value: number;
  label: string;
}

declare class BuildPublicBeta {
  value: number;
  label: string;
}

declare class BuildValueOnly {
  value: number;
}

// 13. Project the public instance members visible through keyof.
//     Private and protected declaration identity is given machinery outside it.
export type PublicShape<Instance> = TODO; // TODO(koan)

// 14. Compare only public structure, deliberately erasing private identity.
export type PubliclyCompatible<Source, Target> = TODO; // TODO(koan)

declare class BuildStaticFirst {
  static category: "first";
  value: number;
}

declare class BuildStaticSecond {
  static category: "second";
  value: number;
}

declare class BuildCoordinate {
  x: number;
  y: number;
  label: string;
}

// 15. Extract and flatten a constructor's public instance contract.
//     Static members are not part of the result.
export type InstanceShape<
  Constructor extends abstract new (...args: never[]) => unknown,
> = TODO; // TODO(koan)

// ─── Optional and readonly guarantees ────────────────────────────────────────

// 16. Return exactly the optional keys of an object type.
export type OptionalKeys<Value> = TODO; // TODO(koan)

// 17. Return exactly the required keys of an object type.
export type RequiredKeys<Value> = TODO; // TODO(koan)

// 18. Decide whether the selected property can be omitted.
export type CanOmit<Value, Key extends keyof Value> = TODO; // TODO(koan)

// 19. Decide whether the selected property accepts an explicit undefined.
//     This distinguishes absence from a present undefined under exact optionality.
export type AcceptsExplicitUndefined<
  Value,
  Key extends keyof Value,
> = TODO; // TODO(koan)

// 20. Produce a readonly view while preserving optional modifiers.
export type ReadonlyView<Value> = TODO; // TODO(koan)

// 21. Produce a mutable view while preserving optional modifiers.
export type MutableView<Value> = TODO; // TODO(koan)

// ─── Containers and index contracts ──────────────────────────────────────────

// 22. Extract the exposed element contract from an array or tuple.
export type ContainerElement<Container extends readonly unknown[]> = TODO; // TODO(koan)

// 23. Classify mutable and readonly arrays separately from fixed tuples.
export type ContainerKind<Container extends readonly unknown[]> = TODO; // TODO(koan)

// 24. Decide whether a container exposes mutating array operations.
export type CanUseAsMutableArray<Container extends readonly unknown[]> = TODO; // TODO(koan)

// 25. Decide whether every declared string property satisfies value type V.
export type StringIndexCompatible<Value, V> = TODO; // TODO(koan)

// ─── Broad object boundaries and composition ─────────────────────────────────

// 26. Keep every non-nullish union member, including primitives and functions.
//     Hint: this is the real meaning of the broad `{}` constraint.
export type NonNullishMembers<Value> = TODO; // TODO(koan)

// 27. Keep object and function union members while removing primitives.
export type ObjectMembers<Value> = TODO; // TODO(koan)

// 28. Decide whether Source supplies two contracts simultaneously.
export type SatisfiesBoth<Source, Left, Right> = TODO; // TODO(koan)

// ─── Assertions ───────────────────────────────────────────────────────────────

type _01a = Expect<
  Equal<IsAssignable<{ id: string; name: string }, { id: string }>, true>
>;
type _01b = Expect<
  Equal<IsAssignable<{ id: string }, { id: string; name: string }>, false>
>;
type _01c = Expect<
  Equal<IsAssignable<{ id: string } | { name: string }, { id: string }>, false>
>;
type _01d = Expect<
  Equal<IsAssignable<{ readonly value: 1 }, { value: number }>, true>
>;
type _01e = Expect<Equal<IsAssignable<BuildPrivateAlpha, BuildPrivateBeta>, false>>;

type _02a = Expect<
  Equal<
    AssignableContractKeys<
      { id: string; name: string; active: "yes" },
      { id: string; active: boolean; missing: number }
    >,
    "id"
  >
>;
type _02b = Expect<Equal<AssignableContractKeys<{}, { id: string }>, never>>;
type _02c = Expect<
  Equal<
    AssignableContractKeys<{ name?: string }, { name?: string; count?: number }>,
    "name"
  >
>;

type _03a = Expect<
  Equal<
    MissingContractKeys<
      { id: string; active: string },
      { id: string; active: boolean; name: string }
    >,
    "active" | "name"
  >
>;
type _03b = Expect<Equal<MissingContractKeys<{ extra: true }, {}>, never>>;
type _03c = Expect<
  Equal<MissingContractKeys<{ id: string }, { id: string }>, never>
>;

type _04a = Expect<
  Equal<
    ContractView<{ id: string; name: string }, { id: string }>,
    { id: string }
  >
>;
type _04b = Expect<
  Equal<
    ContractView<
      { id: string; name: string },
      { readonly id: string; name?: string }
    >,
    { readonly id: string; name?: string }
  >
>;
type _04c = Expect<
  Equal<ContractView<{ id: number }, { id: string }>, never>
>;
type _04d = Expect<Equal<ContractView<{ anything: true }, {}>, {}>>;
type _04e = Expect<
  Equal<
    ContractView<Date, { toISOString(): string }>,
    { toISOString(): string }
  >
>;

type _05a = Expect<
  Equal<ExtraKeys<{ id: string; name: string }, { id: string }>, "name">
>;
type _05b = Expect<Equal<ExtraKeys<{ id: string }, { id: string }>, never>>;
type _05c = Expect<Equal<ExtraKeys<{}, { id?: string }>, never>>;

type _06a = Expect<
  Equal<IsExactContract<{ id: string }, { id: string }>, true>
>;
type _06b = Expect<
  Equal<IsExactContract<{ id: string; name: string }, { id: string }>, false>
>;
type _06c = Expect<
  Equal<IsExactContract<{ id: number }, { id: string }>, false>
>;
type _06d = Expect<Equal<IsExactContract<{}, {}>, true>>;

type _07a = Expect<
  Equal<
    SharedKeys<{ color: string; width: number }, { color?: string; size?: number }>,
    "color"
  >
>;
type _07b = Expect<
  Equal<SharedKeys<{ width: number }, { color?: string; size?: number }>, never>
>;
type _07c = Expect<Equal<SharedKeys<{}, { color?: string }>, never>>;

type _08a = Expect<
  Equal<FirstParameter<(value: string, radix: number) => number>, string>
>;
type _08b = Expect<Equal<FirstParameter<() => void>, never>>;
type _08c = Expect<
  Equal<FirstParameter<(value: { id: string }) => boolean>, { id: string }>
>;

type _09a = Expect<Equal<FunctionResult<(value: string) => number>, number>>;
type _09b = Expect<Equal<FunctionResult<() => void>, void>>;
type _09c = Expect<Equal<FunctionResult<string>, never>>;

type CallableWithMetadata = ((value: number) => string) & {
  description: string;
};

type _10a = Expect<
  Equal<CallableView<CallableWithMetadata>, (value: number) => string>
>;
type _10b = Expect<Equal<CallableView<() => boolean>, () => boolean>>;
type _10c = Expect<Equal<CallableView<{ description: string }>, never>>;

type _11a = Expect<
  Equal<
    FunctionAssignable<
      (value: number) => string,
      (value: number, radix: number) => string
    >,
    true
  >
>;
type _11b = Expect<
  Equal<
    FunctionAssignable<
      (value: number, radix: number) => string,
      (value: number) => string
    >,
    false
  >
>;
type _11c = Expect<
  Equal<
    FunctionAssignable<(value: number) => number, (value: number) => string>,
    false
  >
>;

type _12a = Expect<
  Equal<
    MethodKeys<{
      name: string;
      format(value: string): string;
      parse: (value: string) => number;
    }>,
    "format" | "parse"
  >
>;
type _12b = Expect<Equal<MethodKeys<{ name: string; count: number }>, never>>;
type _12c = Expect<Equal<MethodKeys<{}>, never>>;

type _13a = Expect<Equal<PublicShape<BuildPrivateAlpha>, { value: number }>>;
type _13b = Expect<
  Equal<
    PublicShape<BuildPublicAlpha>,
    { value: number; label: string }
  >
>;
type _13c = Expect<Equal<PublicShape<{}>, {}>>;

type _14a = Expect<
  Equal<PubliclyCompatible<BuildPrivateAlpha, BuildPrivateBeta>, true>
>;
type _14b = Expect<
  Equal<PubliclyCompatible<BuildPublicAlpha, BuildPublicBeta>, true>
>;
type _14c = Expect<
  Equal<PubliclyCompatible<BuildValueOnly, BuildPublicAlpha>, false>
>;

type _15a = Expect<
  Equal<InstanceShape<typeof BuildStaticFirst>, { value: number }>
>;
type _15b = Expect<
  Equal<InstanceShape<typeof BuildStaticSecond>, { value: number }>
>;
type _15c = Expect<
  Equal<
    InstanceShape<typeof BuildCoordinate>,
    { x: number; y: number; label: string }
  >
>;

type _16a = Expect<
  Equal<OptionalKeys<{ id: string; name?: string; count?: number }>, "name" | "count">
>;
type _16b = Expect<Equal<OptionalKeys<{ id: string; name: string }>, never>>;
type _16c = Expect<Equal<OptionalKeys<{}>, never>>;

type _17a = Expect<
  Equal<RequiredKeys<{ id: string; name?: string; active: boolean }>, "id" | "active">
>;
type _17b = Expect<
  Equal<RequiredKeys<{ name?: string; count?: number }>, never>
>;
type _17c = Expect<Equal<RequiredKeys<{}>, never>>;

type _18a = Expect<Equal<CanOmit<{ name?: string }, "name">, true>>;
type _18b = Expect<Equal<CanOmit<{ name: string }, "name">, false>>;
type _18c = Expect<
  Equal<CanOmit<{ name?: string; count: number }, "name" | "count">, false>
>;

type _19a = Expect<
  Equal<AcceptsExplicitUndefined<{ name?: string }, "name">, false>
>;
type _19b = Expect<
  Equal<
    AcceptsExplicitUndefined<{ name?: string | undefined }, "name">,
    true
  >
>;
type _19c = Expect<
  Equal<AcceptsExplicitUndefined<{ name: string | undefined }, "name">, true>
>;

type _20a = Expect<
  Equal<
    ReadonlyView<{ id: string; name?: string }>,
    { readonly id: string; readonly name?: string }
  >
>;
type _20b = Expect<Equal<ReadonlyView<{}>, {}>>;
type _20c = Expect<
  Equal<ReadonlyView<{ readonly value: 1 }>, { readonly value: 1 }>
>;

type _21a = Expect<
  Equal<
    MutableView<{ readonly id: string; readonly name?: string }>,
    { id: string; name?: string }
  >
>;
type _21b = Expect<Equal<MutableView<{}>, {}>>;
type _21c = Expect<Equal<MutableView<{ value: number }>, { value: number }>>;

type _22a = Expect<Equal<ContainerElement<readonly [1, 2, 3]>, 1 | 2 | 3>>;
type _22b = Expect<Equal<ContainerElement<string[]>, string>>;
type _22c = Expect<Equal<ContainerElement<readonly []>, never>>;

type _23a = Expect<Equal<ContainerKind<number[]>, "mutable-array">>;
type _23b = Expect<Equal<ContainerKind<readonly number[]>, "readonly-array">>;
type _23c = Expect<Equal<ContainerKind<[1, 2]>, "mutable-tuple">>;
type _23d = Expect<Equal<ContainerKind<readonly [1, 2]>, "readonly-tuple">>;
type _23e = Expect<Equal<ContainerKind<[]>, "mutable-tuple">>;

type _24a = Expect<Equal<CanUseAsMutableArray<number[]>, true>>;
type _24b = Expect<Equal<CanUseAsMutableArray<readonly number[]>, false>>;
type _24c = Expect<Equal<CanUseAsMutableArray<[1, 2]>, true>>;
type _24d = Expect<Equal<CanUseAsMutableArray<readonly []>, false>>;

type _25a = Expect<
  Equal<StringIndexCompatible<{ first: string; second: string }, string>, true>
>;
type _25b = Expect<
  Equal<StringIndexCompatible<{ first: string; count: number }, string>, false>
>;
type _25c = Expect<Equal<StringIndexCompatible<{}, string>, true>>;

type _26a = Expect<
  Equal<NonNullishMembers<string | 0 | null | undefined>, string | 0>
>;
type _26b = Expect<Equal<NonNullishMembers<() => void>, () => void>>;
type _26c = Expect<Equal<NonNullishMembers<never>, never>>;
type _26d = Expect<Equal<NonNullishMembers<unknown>, never>>;

type _27a = Expect<
  Equal<
    ObjectMembers<string | { id: string } | (() => number)>,
    { id: string } | (() => number)
  >
>;
type _27b = Expect<Equal<ObjectMembers<string | number | null>, never>>;
type _27c = Expect<Equal<ObjectMembers<{}>, {}>>;
type _27d = Expect<Equal<ObjectMembers<unknown>, never>>;

type _28a = Expect<
  Equal<
    SatisfiesBoth<
      { left: number; right: string; ignored: true },
      { left: number },
      { right: string }
    >,
    true
  >
>;
type _28b = Expect<
  Equal<
    SatisfiesBoth<{ left: number }, { left: number }, { right: string }>,
    false
  >
>;
type _28c = Expect<Equal<SatisfiesBoth<{}, {}, {}>, true>>;
type _28d = Expect<
  Equal<
    SatisfiesBoth<
      { left: number; right: string } | { left: number },
      { left: number },
      { right: string }
    >,
    false
  >
>;
