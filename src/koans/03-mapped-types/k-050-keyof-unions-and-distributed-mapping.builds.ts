import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-050: keyof unions and distributed mapping — constructions
 * =============================================================================
 *
 * These constructions separate keys safe on every union member from keys
 * contributed by any member. They use that distinction to build common,
 * distributed, optional, and required representations while covering lookup
 * correlation, intersections, broad indexes, mixed PropertyKeys, containers,
 * callables, absorbed unions, and own-key narrowing. Replace each `TODO` with a
 * type satisfying the assertions directly below it.
 */

declare const givenOne: unique symbol;
declare const givenTwo: unique symbol;

type GivenVariant =
  | { kind: "left"; common: string; left: number }
  | { kind: "right"; common: string; right: boolean };

type GivenAllKeys<Union> =
  Union extends unknown ? keyof Union : never;

type GivenValueAt<
  Union,
  Key extends PropertyKey,
> = Union extends unknown
  ? Key extends keyof Union
    ? Union[Key]
    : never
  : never;

type GivenOptionalView<Union> = {
  [Key in GivenAllKeys<Union>]?: GivenValueAt<Union, Key>;
};

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;
type GivenIsNever<Value> = [Value] extends [never] ? true : false;

// ─── Common and distributed key sets ───────────────────────────────────────

// 1. Recover only keys safe on every member of a union.
export type CommonKeys<Union> = TODO; // TODO(koan)

type _01a = Expect<Equal<CommonKeys<GivenVariant>, "kind" | "common">>;
type _01b = Expect<Equal<CommonKeys<{ a: 1 } | { b: 2 }>, never>>;
type _01c = Expect<
  Equal<CommonKeys<{ a: 1; c: 3 } | { b: 2; c: 4 }>, "c">
>;
type _01d = Expect<
  Equal<CommonKeys<{ x?: string } | { x: string; y: number }>, "x">
>;
type _01e = Expect<Equal<CommonKeys<{} | { id: string }>, never>>;

// 2. Distribute keyof over the union and collect every contributed key.
export type AllKeys<Union> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<AllKeys<GivenVariant>, "kind" | "common" | "left" | "right">
>;
type _02b = Expect<Equal<AllKeys<{ a: 1 } | { b: 2 }>, "a" | "b">>;
type _02c = Expect<
  Equal<
    AllKeys<{ a: 1; c: 3 } | { b: 2; c: 4 }>,
    "a" | "b" | "c"
  >
>;
type _02d = Expect<Equal<AllKeys<{} | { id: string }>, "id">>;
type _02e = Expect<Equal<AllKeys<never>, never>>;

// 3. Prevent distribution by tuple-wrapping the input before keyof.
export type NonDistributedKeys<Union> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<NonDistributedKeys<GivenVariant>, "kind" | "common">
>;
type _03b = Expect<
  Equal<NonDistributedKeys<{ a: 1 } | { b: 2 }>, never>
>;
type _03c = Expect<
  Equal<NonDistributedKeys<{ a: 1 } & { b: 2 }>, "a" | "b">
>;
type _03d = Expect<Equal<NonDistributedKeys<never>, string | number | symbol>>;

// 4. Read one key known to be common to every member.
export type CommonPropertyValue<
  Union,
  Key extends keyof Union,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<CommonPropertyValue<GivenVariant, "kind">, "left" | "right">
>;
type _04b = Expect<
  Equal<CommonPropertyValue<GivenVariant, "common">, string>
>;
type _04c = Expect<
  Equal<
    CommonPropertyValue<{ x?: string } | { x: number }, "x">,
    string | number | undefined
  >
>;
type _04d = Expect<
  Equal<
    CommonPropertyValue<
      { nested: { a: 1 } } | { nested: { b: 2 } },
      "nested"
    >,
    { a: 1 } | { b: 2 }
  >
>;

// 5. Look up a key on every member that actually owns it.
export type ValueAtAnyMember<
  Union,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<ValueAtAnyMember<GivenVariant, "kind">, "left" | "right">
>;
type _05b = Expect<
  Equal<ValueAtAnyMember<GivenVariant, "left">, number>
>;
type _05c = Expect<
  Equal<ValueAtAnyMember<GivenVariant, "right">, boolean>
>;
type _05d = Expect<
  Equal<
    ValueAtAnyMember<{ x?: string } | { x: number }, "x">,
    string | number | undefined
  >
>;
type _05e = Expect<
  Equal<ValueAtAnyMember<GivenVariant, "missing">, never>
>;

// ─── Common, distributed, and flattened records ────────────────────────────

// 6. Build one record over only the common key set.
export type CommonRecord<Union, Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    CommonRecord<GivenVariant, boolean>,
    { kind: boolean; common: boolean }
  >
>;
type _06b = Expect<
  Equal<keyof CommonRecord<GivenVariant, 0>, "kind" | "common">
>;
type _06c = Expect<
  Equal<keyof CommonRecord<{ a: 1 } | { b: 2 }, 0>, never>
>;
type _06d = Expect<
  Equal<CommonRecord<{ a: 1; c: 3 } | { b: 2; c: 4 }, string>, { c: string }>
>;

// 7. Distribute record construction to retain member-specific key sets.
export type DistributedRecord<Union, Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    DistributedRecord<GivenVariant, boolean>,
    | { kind: boolean; common: boolean; left: boolean }
    | { kind: boolean; common: boolean; right: boolean }
  >
>;
type _07b = Expect<
  Equal<
    Extract<DistributedRecord<GivenVariant, boolean>, { left: boolean }>,
    { kind: boolean; common: boolean; left: boolean }
  >
>;
type _07c = Expect<
  Equal<
    DistributedRecord<{ a: 1 } | { b: 2 }, 0>,
    { a: 0 } | { b: 0 }
  >
>;
type _07d = Expect<
  Equal<keyof DistributedRecord<{ a: 1 } | { b: 2 }, 0>, never>
>;
type _07e = Expect<Equal<DistributedRecord<never, boolean>, never>>;

// 8. Flatten all member keys into one optional, correlation-losing object.
export type OptionalUnionView<Union> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    OptionalUnionView<GivenVariant>,
    {
      kind?: "left" | "right";
      common?: string;
      left?: number;
      right?: boolean;
    }
  >
>;
type _08b = Expect<
  Equal<
    OptionalUnionView<{ a: 1 } | { b: 2 }>,
    { a?: 1; b?: 2 }
  >
>;
type _08c = Expect<
  Equal<
    OptionalUnionView<{ x: string } | { x: number; y: boolean }>,
    { x?: string | number; y?: boolean }
  >
>;
type _08d = Expect<
  Equal<OptionalUnionView<{} | { id: string }>, { id?: string }>
>;
type _08e = Expect<Equal<keyof OptionalUnionView<never>, never>>;

// 9. Flatten all member keys into one required, still uncorrelated object.
export type RequiredUnionView<Union> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    RequiredUnionView<GivenVariant>,
    {
      kind: "left" | "right";
      common: string;
      left: number;
      right: boolean;
    }
  >
>;
type _09b = Expect<
  Equal<RequiredUnionView<{ a: 1 } | { b: 2 }>, { a: 1; b: 2 }>
>;
type _09c = Expect<
  Equal<
    RequiredUnionView<{ x?: string } | { x: number; y?: boolean }>,
    { x: string | number | undefined; y: boolean | undefined }
  >
>;
type _09d = Expect<Equal<keyof RequiredUnionView<never>, never>>;

// 10. Distribute a name-preserving map whose values are their own keys.
export type DistributedNames<Union> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    DistributedNames<{ a: 1 } | { b: 2 }>,
    { a: "a" } | { b: "b" }
  >
>;
type _10b = Expect<
  Equal<
    DistributedNames<GivenVariant>,
    | { kind: "kind"; common: "common"; left: "left" }
    | { kind: "kind"; common: "common"; right: "right" }
  >
>;
type _10c = Expect<
  Equal<
    Extract<DistributedNames<GivenVariant>, { left: "left" }>,
    { kind: "kind"; common: "common"; left: "left" }
  >
>;
type _10d = Expect<Equal<DistributedNames<never>, never>>;

// 11. Recover keys contributed by some but not every member.
export type ExclusiveUnionKeys<Union> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<ExclusiveUnionKeys<GivenVariant>, "left" | "right">
>;
type _11b = Expect<
  Equal<ExclusiveUnionKeys<{ a: 1 } | { b: 2 }>, "a" | "b">
>;
type _11c = Expect<
  Equal<
    ExclusiveUnionKeys<{ a: 1; c: 3 } | { b: 2; c: 4 }>,
    "a" | "b"
  >
>;
type _11d = Expect<
  Equal<ExclusiveUnionKeys<{ a: 1 } & { b: 2 }>, never>
>;

// 12. Compare union key intersection/union with an object intersection's keys.
export type KeyAlgebraProfile<
  Union,
  Intersection,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    KeyAlgebraProfile<{ a: 1 } | { b: 2 }, { a: 1 } & { b: 2 }>,
    [common: never, all: "a" | "b", intersection: "a" | "b"]
  >
>;
type _12b = Expect<
  Equal<
    KeyAlgebraProfile<
      ({ a: 1 } & { c: 3 }) | ({ b: 2 } & { c: 4 }),
      { a: 1 } & { b: 2 } & { c: 3 }
    >,
    [common: "c", all: "a" | "b" | "c", intersection: "a" | "b" | "c"]
  >
>;
type _12c = Expect<
  Equal<
    KeyAlgebraProfile<{ x: 1 }, { x: 1 }>,
    [common: "x", all: "x", intersection: "x"]
  >
>;
type _12d = Expect<
  Equal<
    KeyAlgebraProfile<{} | { id: string }, {} & { id: string }>,
    [common: never, all: "id", intersection: "id"]
  >
>;

// 13. Characterize common, all, and per-member values with a broad index member.
export type BroadIndexProfile<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    BroadIndexProfile<number>,
    [common: "fixed" | "other", all: string, fixed: number]
  >
>;
type _13b = Expect<
  Equal<BroadIndexProfile<unknown>[2], unknown>
>;
type _13c = Expect<
  Equal<BroadIndexProfile<1>[2], 1>
>;
type _13d = Expect<
  Equal<BroadIndexProfile<never>[2], 1>
>;

// 14. Expose common/all/value behavior for numeric and unique-symbol keys.
export type MixedPropertyKeyProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<MixedPropertyKeyProfile[0], never>>;
type _14b = Expect<
  Equal<MixedPropertyKeyProfile[1], 0 | 1 | typeof givenOne | typeof givenTwo>
>;
type _14c = Expect<Equal<MixedPropertyKeyProfile[2], 1>>;
type _14d = Expect<
  Equal<Extract<MixedPropertyKeyProfile[1], symbol>, typeof givenOne | typeof givenTwo>
>;

// 15. Classify common and distributed infrastructure keys on container unions.
export type ContainerKeyFacts<Union> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ContainerKeyFacts<string[] | readonly number[]>,
    [hasCommonLength: true, hasCommonPush: false, allHasZero: false, allHasOne: false]
  >
>;
type _15b = Expect<
  Equal<
    ContainerKeyFacts<[string] | readonly [number, boolean]>,
    [hasCommonLength: true, hasCommonPush: false, allHasZero: true, allHasOne: true]
  >
>;
type _15c = Expect<
  Equal<
    ContainerKeyFacts<[string] | [number, boolean]>,
    [hasCommonLength: true, hasCommonPush: true, allHasZero: true, allHasOne: true]
  >
>;
type _15d = Expect<
  Equal<
    ContainerKeyFacts<readonly []>,
    [hasCommonLength: true, hasCommonPush: false, allHasZero: false, allHasOne: false]
  >
>;

// 16. Expose key algebra for callable and callable/object unions.
export type CallableKeyFacts<Callable> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<CallableKeyFacts<() => string>, [common: never, all: never, hasMeta: false]>
>;
type _16b = Expect<
  Equal<
    CallableKeyFacts<(() => string) | { meta: boolean }>,
    [common: never, all: "meta", hasMeta: true]
  >
>;
type _16c = Expect<
  Equal<
    CallableKeyFacts<(() => string) & { meta: boolean }>,
    [common: "meta", all: "meta", hasMeta: true]
  >
>;
type _16d = Expect<
  Equal<
    CallableKeyFacts<(() => string) | ((value: number) => void)>,
    [common: never, all: never, hasMeta: false]
  >
>;

// 17. Classify distributed keyof after any, unknown, and never absorption.
export type SpecialAllKeysProfile<Source> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    SpecialAllKeysProfile<any | { id: string }>,
    [keysIsAny: false, keysIsNever: false, keys: string | number | symbol]
  >
>;
type _17b = Expect<
  Equal<
    SpecialAllKeysProfile<unknown | { id: string }>,
    [keysIsAny: false, keysIsNever: true, keys: never]
  >
>;
type _17c = Expect<
  Equal<
    SpecialAllKeysProfile<never>,
    [keysIsAny: false, keysIsNever: true, keys: never]
  >
>;
type _17d = Expect<
  Equal<
    SpecialAllKeysProfile<{} | { id: string }>,
    [keysIsAny: false, keysIsNever: false, keys: "id"]
  >
>;

// 18. Classify a distributed member lookup without making any the answer.
export type AnyMemberValueProfile<
  Union,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<AnyMemberValueProfile<any, "x">, [valueIsAny: true, valueIsNever: false]>
>;
type _18b = Expect<
  Equal<AnyMemberValueProfile<unknown, "x">, [valueIsAny: false, valueIsNever: true]>
>;
type _18c = Expect<
  Equal<AnyMemberValueProfile<GivenVariant, "left">, [valueIsAny: false, valueIsNever: false]>
>;
type _18d = Expect<
  Equal<AnyMemberValueProfile<GivenVariant, "missing">, [valueIsAny: false, valueIsNever: true]>
>;

// 19. Construct the key type established by a successful own-key predicate.
export type OwnKeyNarrow<
  Source extends object,
  Candidate extends PropertyKey,
> = TODO; // TODO(koan)

type _19a = Expect<Equal<OwnKeyNarrow<{ text: string }, "text">, "text">>;
type _19b = Expect<Equal<OwnKeyNarrow<{ text: string }, "count">, never>>;
type _19c = Expect<
  Equal<OwnKeyNarrow<{ 0: string; name: string }, 0 | "name">, 0 | "name">
>;
type _19d = Expect<
  Equal<OwnKeyNarrow<{ [givenOne]: number }, typeof givenOne>, typeof givenOne>
>;
type _19e = Expect<
  Equal<OwnKeyNarrow<{ a: 1; b: 2 }, string>, "a" | "b">
>;
