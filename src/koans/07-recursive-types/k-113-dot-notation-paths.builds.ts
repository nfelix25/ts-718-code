import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-113: dot-notation paths — constructions
 * =============================================================================
 *
 * These constructions turn an object shape into the string vocabulary that
 * addresses its nested fields. The recursive rule is "keep every string key, and
 * if the value under that key has its own paths, keep the joined path too", so
 * every prefix stays addressable and not just the deepest leaf. What the result
 * means depends entirely on the leaf policy: arrays, tuples, functions, and the
 * built-in containers stop here. Two boundaries are worth dwelling on — symbol
 * and numeric keys cannot appear in dot syntax at all, and a broad index
 * signature widens the whole union to `string`, which erases the very structure
 * the vocabulary existed to express. Constructions 5 onward apply the
 * `DotPathsOf` operator you build in construction 4. Replace each `TODO` with a
 * type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

declare const givenSecret: unique symbol;

type GivenAccount = {
  id: string;
  profile: {
    displayName: string;
    contact: { email: string; phone?: string };
  };
  flags?: { admin: boolean };
  tags: readonly string[];
};

type GivenLinkedNode = { id: string; next?: GivenLinkedNode };
type GivenMutuallyA = { name: string; b?: GivenMutuallyB };
type GivenMutuallyB = { count: number; a?: GivenMutuallyA };

// Declared with the packet's own listing signature so a construction can be
// graded against a real call site.
declare function givenListDotPaths<Value>(value: Value): DotPathsOf<Value>[];

// ─── The path vocabulary ──────────────────────────────────────────────

// 1. Build the primitive domain that can never own a nested path.
export type PathPrimitive = TODO; // TODO(koan)

type _01a = Expect<
  Equal<PathPrimitive, string | number | bigint | boolean | symbol | null | undefined>
>;
type _01b = Expect<Equal<Extract<PathPrimitive, bigint | symbol>, bigint | symbol>>;
type _01c = Expect<Equal<Extract<PathPrimitive, null | undefined>, null | undefined>>;
type _01d = Expect<
  Equal<
    {
      extracted: Extract<PathPrimitive, boolean>;
      accepts: { id: string } extends PathPrimitive ? true : false;
    },
    { extracted: boolean; accepts: false }
  >
>;
type _01e = Expect<
  Equal<
    {
      extracted: Extract<PathPrimitive, number>;
      accepts: Date extends PathPrimitive ? true : false;
    },
    { extracted: number; accepts: false }
  >
>;

// 2. Build this lesson's full leaf policy: the primitives plus every object the
//    traversal deliberately refuses to enter, including all arrays and tuples.
export type PathLeafDomain = TODO; // TODO(koan)

type _02a = Expect<Equal<Extract<PathLeafDomain, Date | RegExp>, Date | RegExp>>;
type _02b = Expect<
  Equal<
    {
      extracted: Extract<PathLeafDomain, Promise<unknown>>;
      accepts: readonly { id: 1 }[] extends PathLeafDomain ? true : false;
    },
    { extracted: Promise<unknown>; accepts: true }
  >
>;
type _02c = Expect<
  Equal<
    {
      extracted: Extract<PathLeafDomain, ReadonlySet<unknown>>;
      accepts: readonly [{ x: 1 }] extends PathLeafDomain ? true : false;
    },
    { extracted: ReadonlySet<unknown>; accepts: true }
  >
>;
type _02d = Expect<
  Equal<
    {
      extracted: Extract<PathLeafDomain, WeakSet<object>>;
      accepts: (() => void) extends PathLeafDomain ? true : false;
    },
    { extracted: WeakSet<object>; accepts: true }
  >
>;
type _02e = Expect<
  Equal<
    {
      extracted: Extract<PathLeafDomain, bigint>;
      accepts: { nested: { x: 1 } } extends PathLeafDomain ? true : false;
    },
    { extracted: bigint; accepts: false }
  >
>;

// 3. Build the join step: given a key and the value beneath it, produce every
//    `key.rest` path that value contributes, and nothing when it contributes none.
//    `ChildPathOf<"a", { b: { c: 1 } }>` is `"a.b" | "a.b.c"`.
//    Hint: capturing the inner paths with `infer Rest extends string` keeps the
//    template literal from being asked to interpolate a non-string.
export type ChildPathOf<Key extends string, Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<ChildPathOf<"profile", { name: string }>, "profile.name">>;
type _03b = Expect<Equal<ChildPathOf<"a", { b: { c: 1 } }>, "a.b" | "a.b.c">>;
type _03c = Expect<Equal<ChildPathOf<"x", string>, never>>;
type _03d = Expect<Equal<ChildPathOf<"x", { a: 1 } | { b: 2 }>, "x.a" | "x.b">>;
type _03e = Expect<Equal<ChildPathOf<"x", unknown>, never>>;

// 4. Build the path vocabulary itself: `any` addresses everything, the outer
//    conditional distributes over union members, leaves contribute nothing, and
//    every other object contributes each string key plus that key's child paths.
//    `{ profile: { name: string } }` becomes `"profile" | "profile.name"`.
export type DotPathsOf<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<DotPathsOf<{ id: string }>, "id">>;
type _04b = Expect<Equal<DotPathsOf<{ a: { b: { c: number } } }>, "a" | "a.b" | "a.b.c">>;
type _04c = Expect<Equal<DotPathsOf<{ a: 1 } | { b: 2 }>, "a" | "b">>;
type _04d = Expect<Equal<DotPathsOf<unknown>, never>>;
type _04e = Expect<Equal<DotPathsOf<any>, string>>;

// ─── Every prefix stays addressable ───────────────────────────────────

// 5. Report flat and nested shapes producing their full prefix vocabulary.
export type NestedPathProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<NestedPathProfile["single"], "id">>;
type _05b = Expect<Equal<NestedPathProfile["siblings"], "id" | "active">>;
type _05c = Expect<Equal<NestedPathProfile["oneLevel"], "profile" | "profile.name">>;
type _05d = Expect<
  Equal<
    NestedPathProfile["branch"],
    "displayName" | "contact" | "contact.email" | "contact.phone"
  >
>;
type _05e = Expect<Equal<NestedPathProfile["leafOnly"], "email" | "phone">>;

// 6. Report the prefix filters that select one subtree of the vocabulary.
export type PrefixFilterProfile = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    PrefixFilterProfile["profileSubtree"],
    "profile.displayName" | "profile.contact" | "profile.contact.email" | "profile.contact.phone"
  >
>;
type _06b = Expect<Equal<PrefixFilterProfile["optionalSubtree"], "flags.admin">>;
type _06c = Expect<Equal<PrefixFilterProfile["roots"], "id" | "profile" | "flags" | "tags">>;
type _06d = Expect<Equal<PrefixFilterProfile["leafArray"], "tags">>;
type _06e = Expect<
  Equal<PrefixFilterProfile["contactLeaves"], "profile.contact.email" | "profile.contact.phone">
>;

// 7. Report optionality and nullable value domains, which change what is present
//    at runtime but not what is addressable in the vocabulary.
export type OptionalPathProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<OptionalPathProfile["optionalBranch"], "maybe" | "maybe.value">>;
type _07b = Expect<Equal<OptionalPathProfile["unionValue"], "value" | "value.length">>;
type _07c = Expect<Equal<OptionalPathProfile["nullableValue"], "left" | "left.value">>;
type _07d = Expect<Equal<OptionalPathProfile["undefinedValue"], "data" | "data.ready">>;
type _07e = Expect<
  Equal<
    OptionalPathProfile["optionalLeaf"],
    "contact" | "contact.email" | "contact.phone"
  >
>;

// ─── Where the traversal stops ────────────────────────────────────────

// 8. Report the containers this lesson treats as leaves, including tuples whose
//    elements are perfectly ordinary objects.
export type LeafPolicyProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<LeafPolicyProfile["array"], "rows">>;
type _08b = Expect<Equal<LeafPolicyProfile["tuple"], "pair">>;
type _08c = Expect<Equal<LeafPolicyProfile["builtins"], "createdAt" | "matcher">>;
type _08d = Expect<Equal<LeafPolicyProfile["map"], "cache">>;
type _08e = Expect<Equal<LeafPolicyProfile["promise"], "promise">>;

// 9. Report intersections with a leaf, where the leaf branch wins and hides the
//    object half entirely, and a plain object whose method is just another leaf.
export type IntersectionLeafProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<IntersectionLeafProfile["callableWithMeta"], "fn">>;
type _09b = Expect<Equal<IntersectionLeafProfile["dateWithMeta"], "date">>;
type _09c = Expect<
  Equal<
    IntersectionLeafProfile["methodBearingObject"],
    "boxed" | "boxed.valueOf" | "boxed.meta" | "boxed.meta.id"
  >
>;
type _09d = Expect<Equal<IntersectionLeafProfile["setLeaf"], "set">>;
type _09e = Expect<Equal<IntersectionLeafProfile["readonlyArrayLeaf"], "array">>;

// ─── Keys dot notation cannot spell ───────────────────────────────────

// 10. Report the keys that never enter the vocabulary, because `keyof T & string`
//     admits neither symbols nor numeric literal keys.
export type KeyRepresentabilityProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<KeyRepresentabilityProfile["symbolOnly"], never>>;
type _10b = Expect<Equal<KeyRepresentabilityProfile["symbolBeside"], "shown" | "shown.x">>;
type _10c = Expect<Equal<KeyRepresentabilityProfile["numericBeside"], "one">>;
type _10d = Expect<Equal<KeyRepresentabilityProfile["dottedKey"], "a.b" | "a.b.c">>;
type _10e = Expect<Equal<KeyRepresentabilityProfile["emptyKey"], "" | ".x">>;

// 11. Report the broad index signature, which widens the union to `string` and
//     with it destroys the structure that made the vocabulary useful: even a
//     pattern that obviously matches can no longer be extracted from it.
export type WideningProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<WideningProfile["broadRecord"], string>>;
type _11b = Expect<Equal<WideningProfile["broadBranchRecord"], string>>;
type _11c = Expect<Equal<WideningProfile["extractedPattern"], never>>;
type _11d = Expect<Equal<WideningProfile["narrowRecord"], "only" | "only.nested">>;
type _11e = Expect<Equal<WideningProfile["extractedFromNarrow"], "only.nested">>;

// ─── Distribution, absorption, and poisoned branches ──────────────────

// 12. Report the outer conditional distributing over object unions.
export type UnionDistributionProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<UnionDistributionProfile["plain"], "a" | "b">>;
type _12b = Expect<
  Equal<UnionDistributionProfile["discriminated"], "kind" | "a" | "a.x" | "b" | "b.y">
>;
type _12c = Expect<Equal<UnionDistributionProfile["withNull"], "a">>;
type _12d = Expect<Equal<UnionDistributionProfile["withNever"], "a">>;
type _12e = Expect<
  Equal<UnionDistributionProfile["intersectedUnion"], "a" | "a.x" | "root" | "b" | "b.y">
>;

// 13. Report the members that absorb a union before the traversal ever sees the
//     object beside them.
export type AbsorptionProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<AbsorptionProfile["withUnknown"], never>>;
type _13b = Expect<Equal<AbsorptionProfile["withAny"], string>>;
type _13c = Expect<Equal<AbsorptionProfile["bareUnknown"], never>>;
type _13d = Expect<Equal<AbsorptionProfile["bareNever"], never>>;
type _13e = Expect<Equal<AbsorptionProfile["bareAny"], string>>;

// 14. Report the same extreme types sitting in a value position, where the key
//     survives even when the value contributes no children of its own.
export type PoisonedValueProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<PoisonedValueProfile["unknownValue"], "value">>;
type _14b = Expect<Equal<PoisonedValueProfile["neverValue"], "value">>;
type _14c = Expect<Equal<PoisonedValueProfile["anyValue"], "value" | `value.${string}`>>;
type _14d = Expect<
  Equal<
    PoisonedValueProfile["anyBesideBranch"],
    "value" | `value.${string}` | "nested" | "nested.x"
  >
>;
type _14e = Expect<Equal<PoisonedValueProfile["emptyObject"], never>>;

// ─── Recursive shapes and the missing guard ───────────────────────────

// 15. Report the finite views of a self-referential shape. Asking for the paths
//     of the whole node would not terminate, which is the gap a visited-type or
//     depth policy has to close.
export type RecursiveBoundaryProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<RecursiveBoundaryProfile["nodeKeys"], "id" | "next">>;
type _15b = Expect<Equal<RecursiveBoundaryProfile["finiteView"], "id">>;
type _15c = Expect<Equal<RecursiveBoundaryProfile["nestedFiniteView"], "node" | "node.id">>;
type _15d = Expect<Equal<RecursiveBoundaryProfile["mutualKeysA"], "name" | "b">>;
type _15e = Expect<
  Equal<RecursiveBoundaryProfile["mutualFiniteView"], "a" | "a.name" | "b" | "b.count">
>;

// ─── Reusable surfaces ────────────────────────────────────────────────

// 16. Build the key filter that names exactly the properties the traversal
//     descends into.
//     Hint: an optional property reads as `Value | undefined`, and that union is
//     neither a leaf nor an object, so it has to be stripped before the test.
export type BranchKeysOf<Model> = TODO; // TODO(koan)

type _16a = Expect<Equal<BranchKeysOf<GivenAccount>, "profile" | "flags">>;
type _16b = Expect<Equal<BranchKeysOf<{}>, never>>;
type _16c = Expect<Equal<BranchKeysOf<{ a: string; b: number }>, never>>;
type _16d = Expect<Equal<BranchKeysOf<{ a: { x: 1 }; b: { y: 2 } }>, "a" | "b">>;
type _16e = Expect<Equal<BranchKeysOf<{ rows: { id: 1 }[]; nested: { id: 1 } }>, "nested">>;

// 17. Build the depth-one vocabulary, which keeps only the root keys and proves
//     the joined paths really are the recursive part.
export type RootPathsOf<Model> = TODO; // TODO(koan)

type _17a = Expect<Equal<RootPathsOf<GivenAccount>, "id" | "profile" | "flags" | "tags">>;
type _17b = Expect<Equal<RootPathsOf<{ a: { b: { c: 1 } } }>, "a">>;
type _17c = Expect<Equal<RootPathsOf<{ a: 1 } | { b: 2 }>, "a" | "b">>;
type _17d = Expect<Equal<RootPathsOf<{}>, never>>;
type _17e = Expect<Equal<RootPathsOf<Record<"a.b", { c: 1 }>>, never>>;

// 18. Build the parent reader that drops the last segment of a path, which is
//     the inverse of the join step in construction 3.
//     Hint: matching `${infer Head}.${infer Rest}` is greedy from the left, so
//     recursing on the remainder is what reaches the final segment.
export type ParentPathOf<Path extends string> = TODO; // TODO(koan)

type _18a = Expect<Equal<ParentPathOf<"profile.contact.email">, "profile.contact">>;
type _18b = Expect<Equal<ParentPathOf<"profile.name">, "profile">>;
type _18c = Expect<Equal<ParentPathOf<"id">, never>>;
type _18d = Expect<Equal<ParentPathOf<"a.b" | "c.d.e">, "a" | "c.d">>;
type _18e = Expect<Equal<ParentPathOf<"a.b.c.d">, "a.b.c">>;

// 19. Build the listing signature the packet exports, whose element type is the
//     same vocabulary the type level produces.
export type PathRuntimeApi = TODO; // TODO(koan)

type _19a = Expect<
  Equal<PathRuntimeApi["listDotPaths"], <Value>(value: Value) => DotPathsOf<Value>[]>
>;
type _19b = Expect<
  Equal<ReturnType<typeof givenListDotPaths<{ a: { b: 1 } }>>, ("a" | "a.b")[]>
>;
type _19c = Expect<Equal<Parameters<PathRuntimeApi["listDotPaths"]>, [value: unknown]>>;
type _19d = Expect<
  Equal<ReturnType<typeof givenListDotPaths<GivenAccount["profile"]>>, ("displayName" | "contact" | "contact.email" | "contact.phone")[]>
>;
type _19e = Expect<
  Equal<ReturnType<typeof givenListDotPaths<{ rows: { id: string }[] }>>, "rows"[]>
>;
