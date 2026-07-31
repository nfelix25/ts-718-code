import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-116: cyclic types and visited guards — constructions
 * =============================================================================
 *
 * A self-referential shape has no natural stopping point, so a traversal has to
 * carry its own memory. These constructions build that memory as a `Seen`
 * accumulator plus a deliberate policy for what to expose when a shape is met
 * again. Two honest guards are built here and they answer different questions.
 * The assignability guard asks "does this fit something already crossed?", which
 * is cheap but reports a revisit early: a strict superset stops against a subset
 * it has never actually visited. The equality guard asks "is this exactly a shape
 * already crossed?", which is precise but keeps descending through look-alikes.
 * Neither is runtime identity — that still needs a `WeakMap`. Replace each `TODO`
 * with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenRevisitMode = "stop" | "shallow";

type GivenNode = { id: string; next?: GivenNode };
type GivenDepartment = {
  name: string;
  parent?: GivenDepartment;
  members: readonly { id: number }[];
};
type GivenA = { a: string; b?: GivenB };
type GivenB = { b: number; a?: GivenA };
type GivenSmall = { id: string };
type GivenLarge = { id: string; meta: { active: boolean } };
type GivenRecursiveArray = Array<number | GivenRecursiveArray>;
type GivenTwoWay = {
  id: string;
  left?: GivenTwoWay;
  right?: GivenTwoWay;
  other: { x: 1 };
};

// Declared with the packet's own cloning signature so a construction can be
// graded against a real call site.
declare function givenCloneObjectGraph<Value>(value: Value): Value;

// ─── The guard's vocabulary ───────────────────────────────────────────

// 1. Build the atomic domain that stops before any guard is consulted. Note that
//    the eager collections belong here, so no cycle inside them is ever crossed.
export type GuardAtomic = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<GuardAtomic, Date | RegExp>, Date | RegExp>>;
type _01b = Expect<
  Equal<Extract<GuardAtomic, ReadonlyMap<unknown, unknown>>, ReadonlyMap<unknown, unknown>>
>;
type _01c = Expect<
  Equal<
    {
      extracted: Extract<GuardAtomic, Promise<unknown>>;
      accepts: ReadonlySet<number> extends GuardAtomic ? true : false;
    },
    { extracted: Promise<unknown>; accepts: true }
  >
>;
type _01d = Expect<
  Equal<
    {
      extracted: Extract<GuardAtomic, bigint>;
      accepts: GivenNode extends GuardAtomic ? true : false;
    },
    { extracted: bigint; accepts: false }
  >
>;
type _01e = Expect<
  Equal<
    {
      extracted: Extract<GuardAtomic, null | undefined>;
      accepts: readonly number[] extends GuardAtomic ? true : false;
    },
    { extracted: null | undefined; accepts: false }
  >
>;

// 2. Build the frontier policy: what a revisited shape is allowed to expose.
//    `"stop"` contributes nothing at all; `"shallow"` contributes one more layer
//    of that shape's own string keys and then goes no further.
export type RevisitFrontierOf<Value, Mode extends GivenRevisitMode> = TODO; // TODO(koan)

type _02a = Expect<Equal<RevisitFrontierOf<{ a: 1; b: 2 }, "shallow">, "a" | "b">>;
type _02b = Expect<Equal<RevisitFrontierOf<{ a: 1; b: 2 }, "stop">, never>>;
type _02c = Expect<Equal<RevisitFrontierOf<string, "shallow">, never>>;
type _02d = Expect<Equal<RevisitFrontierOf<{}, "shallow">, never>>;
type _02e = Expect<Equal<RevisitFrontierOf<{ a: 1 }, GivenRevisitMode>, "a">>;

// 3. Build the guarded path vocabulary. Stop at atomic values and at arrays, and
//    when the current shape is assignable to something already in `Seen`, expose
//    only the chosen frontier. Otherwise walk each string key and recurse with
//    the current shape added to `Seen`.
//    Hint: `Seen` starts as `never`, which nothing is assignable to, so the first
//    visit of any shape always descends.
export type GuardedPathsOf<
  Value,
  Seen = never,
  Mode extends GivenRevisitMode = "shallow",
> = TODO; // TODO(koan)

type _03a = Expect<Equal<GuardedPathsOf<GivenNode>, "id" | "next" | "next.id" | "next.next">>;
type _03b = Expect<Equal<GuardedPathsOf<GivenNode, never, "stop">, "id" | "next">>;
type _03c = Expect<Equal<GuardedPathsOf<{ id: string }>, "id">>;
type _03d = Expect<Equal<GuardedPathsOf<GivenNode, unknown>, "id" | "next">>;
type _03e = Expect<Equal<GuardedPathsOf<any>, string>>;

// 4. Build the exact-membership test, which asks whether the current shape is
//    identical to any single member of `Seen` rather than merely assignable to it.
//    Hint: distribute over `Seen` to compare one member at a time, then ask
//    whether `true` is among the answers.
export type SeenExactlyOf<Value, Seen> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    { same: SeenExactlyOf<GivenSmall, GivenSmall>; wider: SeenExactlyOf<GivenLarge, GivenSmall> },
    { same: true; wider: false }
  >
>;
type _04b = Expect<
  Equal<
    { empty: SeenExactlyOf<GivenSmall, never>; top: SeenExactlyOf<GivenSmall, unknown> },
    { empty: false; top: false }
  >
>;
type _04c = Expect<
  Equal<
    {
      inUnion: SeenExactlyOf<GivenSmall, { a: 1 } | GivenSmall>;
      notInUnion: SeenExactlyOf<GivenSmall, { a: 1 } | { b: 2 }>;
    },
    { inUnion: true; notInUnion: false }
  >
>;
type _04d = Expect<
  Equal<
    { narrower: SeenExactlyOf<GivenSmall, GivenLarge>; node: SeenExactlyOf<GivenNode, GivenNode> },
    { narrower: false; node: true }
  >
>;
type _04e = Expect<
  Equal<
    {
      primitive: SeenExactlyOf<string, string>;
      widened: SeenExactlyOf<"a", string>;
    },
    { primitive: true; widened: false }
  >
>;

// 5. Build the equality-guarded vocabulary, which keeps descending through a
//    shape that merely looks assignable and stops only on an exact repeat.
export type ExactGuardedPathsOf<Value, Seen = never> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<ExactGuardedPathsOf<GivenNode>, "id" | "next" | "next.id" | "next.next">
>;
type _05b = Expect<Equal<ExactGuardedPathsOf<GivenLarge, GivenSmall>, "id" | "meta" | "meta.active">>;
type _05c = Expect<Equal<ExactGuardedPathsOf<{ id: 1 }, unknown>, "id">>;
type _05d = Expect<Equal<ExactGuardedPathsOf<GivenSmall, GivenSmall>, "id">>;
type _05e = Expect<Equal<ExactGuardedPathsOf<GivenNode, GivenNode | Date>, "id" | "next">>;

// 6. Build the guarded deep transform. At a revisited shape it returns that shape
//    unchanged, which is what makes the frontier visible in the result.
export type GuardedDeepReadonlyOf<Value, Seen = never> = TODO; // TODO(koan)

type _06a = Expect<Equal<keyof GuardedDeepReadonlyOf<GivenNode>, "id" | "next">>;
type _06b = Expect<Equal<GuardedDeepReadonlyOf<GivenNode>["id"], string>>;
type _06c = Expect<Equal<GuardedDeepReadonlyOf<GivenNode>["next"], GivenNode | undefined>>;
type _06d = Expect<Equal<GuardedDeepReadonlyOf<never>, never>>;
type _06e = Expect<
  Equal<
    {
      anyStaysAny: GivenIsAny<GuardedDeepReadonlyOf<any>>;
      plainObject: GuardedDeepReadonlyOf<{ id: string }>;
    },
    { anyStaysAny: true; plainObject: { readonly id: string } }
  >
>;

// ─── Self-reference and the frontier ──────────────────────────────────

// 7. Report a self-referential shape under both frontier policies.
export type SelfReferenceProfile = TODO; // TODO(koan)

type _07a = Expect<
  Equal<SelfReferenceProfile["shallow"], "id" | "next" | "next.id" | "next.next">
>;
type _07b = Expect<Equal<SelfReferenceProfile["stop"], "id" | "next">>;
type _07c = Expect<Equal<SelfReferenceProfile["shallowSubtree"], "next.id" | "next.next">>;
type _07d = Expect<Equal<SelfReferenceProfile["stopSubtree"], never>>;
type _07e = Expect<Equal<SelfReferenceProfile["preSeen"], never>>;

// 8. Report the completeness the frontier deliberately gives up: the vocabulary
//    is finite, so paths past the frontier simply are not in it.
export type FrontierCompletenessProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<FrontierCompletenessProfile["oneDeep"], true>>;
type _08b = Expect<Equal<FrontierCompletenessProfile["frontierItself"], true>>;
type _08c = Expect<Equal<FrontierCompletenessProfile["pastFrontier"], false>>;
type _08d = Expect<Equal<FrontierCompletenessProfile["stopOneDeep"], false>>;
type _08e = Expect<Equal<FrontierCompletenessProfile["rootAlways"], true>>;

// 9. Report mutual recursion, where the guard fires only once the traversal
//    returns to the shape it started from.
export type MutualRecursionProfile = TODO; // TODO(koan)

type _09a = Expect<
  Equal<MutualRecursionProfile["fromA"], "a" | "b" | "b.b" | "b.a" | "b.a.a" | "b.a.b">
>;
type _09b = Expect<
  Equal<MutualRecursionProfile["fromB"], "b" | "a" | "a.a" | "a.b" | "a.b.b" | "a.b.a">
>;
type _09c = Expect<Equal<MutualRecursionProfile["returnToA"], "b.a.a" | "b.a.b">>;
type _09d = Expect<Equal<MutualRecursionProfile["stopFromA"], "a" | "b" | "b.b" | "b.a">>;
type _09e = Expect<
  Equal<MutualRecursionProfile["department"], "name" | "parent" | "members">
>;

// ─── Two guards, two answers ──────────────────────────────────────────

// 10. Report the assignability guard's early stop: a strict superset is
//     assignable to a subset it has never actually visited, so its extra branch
//     is never explored.
export type AssignabilityGuardProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<AssignabilityGuardProfile["wideAgainstNarrow"], "id" | "meta">>;
type _10b = Expect<Equal<AssignabilityGuardProfile["narrowAgainstWide"], "id">>;
type _10c = Expect<Equal<AssignabilityGuardProfile["againstBroadValue"], "id" | "meta">>;
type _10d = Expect<Equal<AssignabilityGuardProfile["againstObject"], "id" | "meta">>;
type _10e = Expect<
  Equal<AssignabilityGuardProfile["unguarded"], "id" | "meta" | "meta.active">
>;

// 11. Report the equality guard keeping the same branch alive, because a superset
//     is not the same shape as the subset already crossed.
export type ExactGuardProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<ExactGuardProfile["wideAgainstNarrow"], "id" | "meta" | "meta.active">
>;
type _11b = Expect<Equal<ExactGuardProfile["narrowAgainstWide"], "id">>;
type _11c = Expect<
  Equal<ExactGuardProfile["againstBroadValue"], "id" | "meta" | "meta.active">
>;
type _11d = Expect<Equal<ExactGuardProfile["againstTop"], "id" | "meta" | "meta.active">>;
type _11e = Expect<Equal<ExactGuardProfile["exactRepeat"], "id" | "meta">>;

// 12. Report the algebra of the `Seen` accumulator itself.
export type SeenAlgebraProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<SeenAlgebraProfile["emptySeen"], "id" | "next" | "next.id" | "next.next">
>;
type _12b = Expect<Equal<SeenAlgebraProfile["topSeen"], "id" | "next">>;
type _12c = Expect<Equal<SeenAlgebraProfile["unionSeen"], "id" | "next">>;
type _12d = Expect<
  Equal<SeenAlgebraProfile["irrelevantSeen"], "id" | "next" | "next.id" | "next.next">
>;
type _12e = Expect<Equal<SeenAlgebraProfile["exactUnionSeen"], "id" | "next">>;

// ─── Arrays, transforms, and the leaking frontier ─────────────────────

// 13. Report arrays, which the path vocabulary treats as leaves — so a cycle that
//     only exists through an array is never entered at all.
export type ArrayPolicyProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ArrayPolicyProfile["recursiveArray"], never>>;
type _13b = Expect<Equal<ArrayPolicyProfile["arrayProperty"], "items">>;
type _13c = Expect<Equal<ArrayPolicyProfile["nodeArrayProperty"], "nodes">>;
type _13d = Expect<Equal<ArrayPolicyProfile["tupleProperty"], "pair">>;
type _13e = Expect<Equal<ArrayPolicyProfile["departmentMembers"], never>>;

// 14. Report the guarded transform, which unlike the path vocabulary does recurse
//     into arrays.
export type GuardedTransformProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    GuardedTransformProfile["node"],
    { readonly id: string; readonly next?: GivenNode }
  >
>;
type _14b = Expect<
  Equal<GuardedTransformProfile["departmentMembers"], readonly { readonly id: number }[]>
>;
type _14c = Expect<
  Equal<
    GuardedTransformProfile["nodeTuple"],
    readonly [{ readonly id: string; readonly next?: GivenNode }]
  >
>;
type _14d = Expect<
  Equal<
    GuardedTransformProfile["nodeArray"],
    readonly { readonly id: string; readonly next?: GivenNode }[]
  >
>;
type _14e = Expect<
  Equal<
    GuardedTransformProfile["nodeArrayElement"],
    { readonly id: string; readonly next?: GivenNode }
  >
>;

// 15. Report the frontier leaking the original, untransformed type. The guard
//     bought termination by handing back the very shape it refused to enter, so
//     the result is not deeply readonly all the way down.
export type FrontierLeakProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<FrontierLeakProfile["frontier"], GivenNode | undefined>>;
type _15b = Expect<Equal<FrontierLeakProfile["frontierIsOriginal"], true>>;
type _15c = Expect<Equal<FrontierLeakProfile["frontierKeys"], "id" | "next">>;
type _15d = Expect<Equal<FrontierLeakProfile["outerIsTransformed"], false>>;
type _15e = Expect<
  Equal<FrontierLeakProfile["parentFrontier"], GivenDepartment | undefined>
>;

// 16. Report the top and bottom types, which are intercepted before any
//     membership test could recurse.
export type ExtremeGuardProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ExtremeGuardProfile["unknownSource"], never>>;
type _16b = Expect<Equal<ExtremeGuardProfile["neverSource"], never>>;
type _16c = Expect<Equal<ExtremeGuardProfile["anySource"], string>>;
type _16d = Expect<Equal<ExtremeGuardProfile["anyTransform"], true>>;
type _16e = Expect<Equal<ExtremeGuardProfile["neverTransform"], never>>;

// ─── Reusable surfaces ────────────────────────────────────────────────

// 17. Build the reporter that names the shapes a traversal would revisit: the
//     keys whose value is assignable to the shape that owns them.
export type SelfReferentialKeysOf<Model> = TODO; // TODO(koan)

type _17a = Expect<Equal<SelfReferentialKeysOf<GivenNode>, "next">>;
type _17b = Expect<Equal<SelfReferentialKeysOf<GivenDepartment>, "parent">>;
type _17c = Expect<Equal<SelfReferentialKeysOf<{ a: 1; b: 2 }>, never>>;
type _17d = Expect<Equal<SelfReferentialKeysOf<{}>, never>>;
type _17e = Expect<Equal<SelfReferentialKeysOf<GivenTwoWay>, "left" | "right">>;

// 18. Build the graph-cloning signature the packet exports. It returns the same
//     type it received, because preserving cycles and shared identity is a
//     runtime property that no `Seen` accumulator can express.
export type GraphCloneRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<GraphCloneRuntimeApi["cloneObjectGraph"], <Value>(value: Value) => Value>
>;
type _18b = Expect<Equal<ReturnType<GraphCloneRuntimeApi["cloneObjectGraph"]>, unknown>>;
type _18c = Expect<
  Equal<Parameters<GraphCloneRuntimeApi["cloneObjectGraph"]>, [value: unknown]>
>;
type _18d = Expect<
  Equal<
    {
      cloned: ReturnType<typeof givenCloneObjectGraph<GivenNode>>;
      frontier: GuardedDeepReadonlyOf<GivenNode>["next"];
    },
    { cloned: GivenNode; frontier: GivenNode | undefined }
  >
>;
type _18e = Expect<
  Equal<
    {
      cloned: ReturnType<typeof givenCloneObjectGraph<GivenNode>>;
      guarded: GuardedDeepReadonlyOf<GivenNode>;
    },
    { cloned: GivenNode; guarded: { readonly id: string; readonly next?: GivenNode } }
  >
>;
