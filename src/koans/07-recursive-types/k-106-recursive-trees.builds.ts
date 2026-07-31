import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-106: recursive trees — constructions
 * =============================================================================
 *
 * These constructions build branching recursion: n-ary nodes that own a payload
 * and a recursive child forest, and nullable binary nodes that encode emptiness
 * with `null` instead of an empty array. They test which finite shapes satisfy
 * each family, follow payload relationships through every branch, separate the
 * readonly child view from its mutable implementations, expose what a structural
 * alias cannot prove about sharing and cycles, and finally walk finite literal
 * trees with recursive algorithms that mirror the packet's runtime folds.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

interface GivenTree<Value> {
  readonly value: Value;
  readonly children: readonly GivenTree<Value>[];
}
type GivenForest<Value> = readonly GivenTree<Value>[];
type GivenBinary<Value> = null | {
  readonly value: Value;
  readonly left: GivenBinary<Value>;
  readonly right: GivenBinary<Value>;
};
type GivenMutableTree<Value> = { value: Value; children: GivenMutableTree<Value>[] };
type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

// Unconstrained shapes used as bounds by the recursive algorithms below.
type GivenAnyTree = { readonly value: unknown; readonly children: readonly GivenAnyTree[] };
type GivenAnyBinary = null | {
  readonly value: unknown;
  readonly left: GivenAnyBinary;
  readonly right: GivenAnyBinary;
};

// Finite literal fixtures mirroring the packet's runtime tree.
type GivenLeaf<Value> = { readonly value: Value; readonly children: readonly [] };
type GivenSampleTree = {
  readonly value: 1;
  readonly children: readonly [
    GivenLeaf<2>,
    { readonly value: 3; readonly children: readonly [GivenLeaf<4>] },
  ];
};
type GivenSampleBinary = {
  readonly value: 1;
  readonly left: { readonly value: 2; readonly left: null; readonly right: null };
  readonly right: null;
};

declare const givenSharedChild: GivenTree<number>;
type GivenSharedRoot = {
  readonly value: 0;
  readonly children: readonly [typeof givenSharedChild, typeof givenSharedChild];
};

// ─── Building the recursive tree families ─────────────────────────────

// 1. Build an n-ary node owning one payload and a readonly forest of child nodes.
export type NaryTree<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<NaryTree<string>, GivenTree<string>>>;
type _01b = Expect<Equal<NaryTree<string>["value"], string>>;
type _01c = Expect<Equal<keyof NaryTree<string>, "value" | "children">>;
type _01d = Expect<
  Equal<NaryTree<number>["children"][number]["children"][number]["value"], number>
>;
type _01e = Expect<
  Equal<
    {
      family: NaryTree<number>;
      accepts: GivenLeaf<1> extends NaryTree<number> ? true : false;
    },
    { family: GivenTree<number>; accepts: true }
  >
>;

// 2. Build the readonly forest of sibling nodes that a parent owns.
export type TreeForest<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<TreeForest<string>, GivenForest<string>>>;
type _02b = Expect<Equal<TreeForest<string>[number]["value"], string>>;
type _02c = Expect<Equal<TreeForest<string>["length"], number>>;
type _02d = Expect<
  Equal<
    {
      family: TreeForest<number>;
      accepts: readonly [] extends TreeForest<number> ? true : false;
    },
    { family: GivenForest<number>; accepts: true }
  >
>;
type _02e = Expect<
  Equal<
    {
      family: TreeForest<string>;
      accepts: readonly [GivenLeaf<1>] extends TreeForest<string> ? true : false;
    },
    { family: GivenForest<string>; accepts: false }
  >
>;

// 3. Build the nullable binary family whose empty tree is `null`.
export type NullableBinaryTree<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<NullableBinaryTree<string>, GivenBinary<string>>>;
type _03b = Expect<Equal<Extract<NullableBinaryTree<string>, null>, null>>;
type _03c = Expect<
  Equal<Exclude<NullableBinaryTree<string>, null>["left"], GivenBinary<string>>
>;
type _03d = Expect<
  Equal<
    {
      family: NullableBinaryTree<number>;
      accepts:
        { readonly value: 1; readonly left: null; readonly right: null } extends
          NullableBinaryTree<number>
          ? true
          : false;
    },
    { family: GivenBinary<number>; accepts: true }
  >
>;
type _03e = Expect<
  Equal<
    {
      family: NullableBinaryTree<number>;
      accepts:
        { readonly value: 1; readonly left: undefined; readonly right: null } extends
          NullableBinaryTree<number>
          ? true
          : false;
    },
    { family: GivenBinary<number>; accepts: false }
  >
>;

// 4. Build the nonempty binary node reached after the `null` base case is excluded.
export type BinaryNodeOf<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<keyof BinaryNodeOf<number>, "value" | "left" | "right">>;
type _04b = Expect<Equal<BinaryNodeOf<string>["value"], string>>;
type _04c = Expect<Equal<BinaryNodeOf<string>["left"], GivenBinary<string>>>;
type _04d = Expect<
  Equal<NonNullable<BinaryNodeOf<string>["right"]>["value"], string>
>;
type _04e = Expect<
  Equal<
    {
      family: BinaryNodeOf<number>;
      accepts: null extends BinaryNodeOf<number> ? true : false;
    },
    { family: NonNullable<GivenBinary<number>>; accepts: false }
  >
>;

// ─── Which finite shapes satisfy each family ──────────────────────────

// 5. Classify leaves, branches, and payload violations against the n-ary node.
export type NaryNodeMembershipProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<NaryNodeMembershipProfile["leaf"], true>>;
type _05b = Expect<Equal<NaryNodeMembershipProfile["branch"], true>>;
type _05c = Expect<Equal<NaryNodeMembershipProfile["deepBranch"], true>>;
type _05d = Expect<Equal<NaryNodeMembershipProfile["wrongPayload"], false>>;
type _05e = Expect<Equal<NaryNodeMembershipProfile["nullChild"], false>>;

// 6. Classify missing keys, extra keys, and mutable or non-array child positions.
export type NaryShapeMembershipProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<NaryShapeMembershipProfile["missingValue"], false>>;
type _06b = Expect<Equal<NaryShapeMembershipProfile["missingChildren"], false>>;
type _06c = Expect<Equal<NaryShapeMembershipProfile["extraProperty"], true>>;
type _06d = Expect<Equal<NaryShapeMembershipProfile["mutableChildren"], true>>;
type _06e = Expect<Equal<NaryShapeMembershipProfile["nonArrayChildren"], false>>;

// 7. Classify empty, singleton, multi-member, and invalid forests.
export type ForestMembershipProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<ForestMembershipProfile["empty"], true>>;
type _07b = Expect<Equal<ForestMembershipProfile["singleton"], true>>;
type _07c = Expect<Equal<ForestMembershipProfile["twoLeaves"], true>>;
type _07d = Expect<Equal<ForestMembershipProfile["wrongPayloadMember"], false>>;
type _07e = Expect<Equal<ForestMembershipProfile["nonArray"], false>>;

// 8. Classify the null base case and nonempty nodes of the binary family.
export type BinaryMembershipProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<BinaryMembershipProfile["nullTree"], true>>;
type _08b = Expect<Equal<BinaryMembershipProfile["leafNode"], true>>;
type _08c = Expect<Equal<BinaryMembershipProfile["nestedNode"], true>>;
type _08d = Expect<Equal<BinaryMembershipProfile["undefinedLeft"], false>>;
type _08e = Expect<Equal<BinaryMembershipProfile["missingRight"], false>>;

// ─── Payloads propagating through every branch ────────────────────────

// 9. Relate n-ary trees whose payloads differ in width.
export type TreePayloadVarianceProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<TreePayloadVarianceProfile["literalToWide"], true>>;
type _09b = Expect<Equal<TreePayloadVarianceProfile["wideToLiteral"], false>>;
type _09c = Expect<Equal<TreePayloadVarianceProfile["neverToString"], true>>;
type _09d = Expect<Equal<TreePayloadVarianceProfile["stringToUnknown"], true>>;
type _09e = Expect<Equal<TreePayloadVarianceProfile["unknownToString"], false>>;

// 10. Repeat the payload relationship for forests and nullable binary trees.
export type ForestAndBinaryVarianceProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<ForestAndBinaryVarianceProfile["forestLiteralToWide"], true>>;
type _10b = Expect<Equal<ForestAndBinaryVarianceProfile["forestWideToLiteral"], false>>;
type _10c = Expect<Equal<ForestAndBinaryVarianceProfile["binaryLiteralToWide"], true>>;
type _10d = Expect<Equal<ForestAndBinaryVarianceProfile["binaryWideToLiteral"], false>>;
type _10e = Expect<Equal<ForestAndBinaryVarianceProfile["binaryNeverToUnknown"], true>>;

// 11. Report the extreme payload domains without losing recursive structure.
export type ExtremePayloadProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ExtremePayloadProfile["neverValue"], never>>;
type _11b = Expect<Equal<ExtremePayloadProfile["unknownChildValue"], unknown>>;
type _11c = Expect<Equal<ExtremePayloadProfile["anyValue"], true>>;
type _11d = Expect<Equal<ExtremePayloadProfile["neverBinaryAccepted"], true>>;
type _11e = Expect<Equal<ExtremePayloadProfile["unknownBinaryAccepted"], false>>;

// ─── Readonly child views and their mutable implementations ───────────

// 12. Build the fully mutable counterpart of the n-ary node.
export type MutableNaryTree<Value> = TODO; // TODO(koan)

type _12a = Expect<Equal<MutableNaryTree<number>, GivenMutableTree<number>>>;
type _12b = Expect<Equal<MutableNaryTree<string>["children"], GivenMutableTree<string>[]>>;
type _12c = Expect<
  Equal<
    {
      family: MutableNaryTree<number>;
      hasPush: "push" extends keyof MutableNaryTree<number>["children"] ? true : false;
    },
    { family: GivenMutableTree<number>; hasPush: true }
  >
>;
type _12d = Expect<
  Equal<
    {
      family: MutableNaryTree<number>;
      accepts: MutableNaryTree<number> extends GivenTree<number> ? true : false;
    },
    { family: GivenMutableTree<number>; accepts: true }
  >
>;
type _12e = Expect<
  Equal<
    {
      family: MutableNaryTree<number>;
      accepts: GivenTree<number> extends MutableNaryTree<number> ? true : false;
    },
    { family: GivenMutableTree<number>; accepts: false }
  >
>;

// 13. Report which array members the readonly child forest still exposes.
export type ReadonlyChildSurfaceProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ReadonlyChildSurfaceProfile["push"], false>>;
type _13b = Expect<Equal<ReadonlyChildSurfaceProfile["splice"], false>>;
type _13c = Expect<Equal<ReadonlyChildSurfaceProfile["map"], true>>;
type _13d = Expect<Equal<ReadonlyChildSurfaceProfile["includes"], true>>;
type _13e = Expect<Equal<ReadonlyChildSurfaceProfile["length"], number>>;

// 14. Show that the one-layer utilities never reach a descendant node.
export type ShallowTreeUtilityProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<ShallowTreeUtilityProfile["partialChildren"], readonly GivenTree<number>[] | undefined>
>;
type _14b = Expect<
  Equal<ShallowTreeUtilityProfile["pickValue"], { readonly value: number }>
>;
type _14c = Expect<
  Equal<ShallowTreeUtilityProfile["omitChildren"], { readonly value: number }>
>;
type _14d = Expect<
  Equal<ShallowTreeUtilityProfile["readonlyMutableChildren"], GivenMutableTree<number>[]>
>;
type _14e = Expect<
  Equal<ShallowTreeUtilityProfile["partialBinaryLeft"], GivenBinary<number> | undefined>
>;

// 15. Report what a structural tree alias cannot prove about sharing or cycles.
export type TreeStructuralLimitProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<TreeStructuralLimitProfile["sharedAccepted"], true>>;
type _15b = Expect<Equal<TreeStructuralLimitProfile["sharedIndistinguishable"], true>>;
type _15c = Expect<Equal<TreeStructuralLimitProfile["sharedLength"], 2>>;
type _15d = Expect<Equal<TreeStructuralLimitProfile["unfoldsForever"], true>>;
type _15e = Expect<Equal<TreeStructuralLimitProfile["nodeKeys"], "value" | "children">>;

// ─── Recursive algorithms over finite literal trees ───────────────────

// 16. Collect every payload in a finite tree as one union.
//     `{ value: 1; children: [{ value: 2; children: [] }] }` becomes `1 | 2`.
//     Hint: distributing over the child union lets `never` end the recursion when
//     a leaf's `children[number]` is empty.
export type TreeValueUnion<Node extends GivenAnyTree> = TODO; // TODO(koan)

type _16a = Expect<Equal<TreeValueUnion<GivenSampleTree>, 1 | 2 | 3 | 4>>;
type _16b = Expect<Equal<TreeValueUnion<GivenLeaf<"only">>, "only">>;
type _16c = Expect<
  Equal<
    TreeValueUnion<{
      readonly value: "a";
      readonly children: readonly [GivenLeaf<"b">, GivenLeaf<"c">];
    }>,
    "a" | "b" | "c"
  >
>;
type _16d = Expect<
  Equal<
    TreeValueUnion<{
      readonly value: 1;
      readonly children: readonly [
        { readonly value: 2; readonly children: readonly [GivenLeaf<3>] },
      ];
    }>,
    1 | 2 | 3
  >
>;
type _16e = Expect<Equal<TreeValueUnion<GivenLeaf<never>>, never>>;

// 17. Flatten a forest into a preorder tuple of payloads: each node's own value,
//     then its whole subtree, then its siblings.
//     `[{ value: 1; children: [{ value: 2; children: [] }] }]` becomes `[1, 2]`.
//     Hint: prepending a node's children to the pending list keeps one recursion.
export type PreorderForestValues<Nodes extends readonly GivenAnyTree[]> = TODO; // TODO(koan)

type _17a = Expect<Equal<PreorderForestValues<readonly [GivenSampleTree]>, [1, 2, 3, 4]>>;
type _17b = Expect<Equal<PreorderForestValues<readonly []>, []>>;
type _17c = Expect<Equal<PreorderForestValues<readonly [GivenLeaf<"x">]>, ["x"]>>;
type _17d = Expect<
  Equal<PreorderForestValues<readonly [GivenLeaf<1>, GivenLeaf<2>]>, [1, 2]>
>;
type _17e = Expect<
  Equal<
    PreorderForestValues<
      readonly [
        {
          readonly value: "root";
          readonly children: readonly [
            { readonly value: "a"; readonly children: readonly [GivenLeaf<"b">] },
            GivenLeaf<"c">,
          ];
        },
      ]
    >,
    ["root", "a", "b", "c"]
  >
>;

// 18. Count every node reachable from a forest as a numeric literal.
//     Hint: grow the given accumulator one element per visited node and read its
//     `length` when nothing is pending.
export type TreeNodeCount<
  Nodes extends readonly GivenAnyTree[],
  Counted extends readonly unknown[] = [],
> = TODO; // TODO(koan)

type _18a = Expect<Equal<TreeNodeCount<readonly [GivenSampleTree]>, 4>>;
type _18b = Expect<Equal<TreeNodeCount<readonly []>, 0>>;
type _18c = Expect<Equal<TreeNodeCount<readonly [GivenLeaf<1>]>, 1>>;
type _18d = Expect<Equal<TreeNodeCount<readonly [GivenLeaf<1>, GivenLeaf<2>]>, 2>>;
type _18e = Expect<
  Equal<
    TreeNodeCount<
      readonly [
        {
          readonly value: 1;
          readonly children: readonly [
            { readonly value: 2; readonly children: readonly [GivenLeaf<3>] },
          ];
        },
      ]
    >,
    3
  >
>;

// 19. Replace every payload in a finite tree while preserving its exact branch
//     structure, tuple lengths, and `readonly` modifiers.
//     Hint: binding `Node["children"]` to an inferred type variable keeps the
//     child mapped type homomorphic over the tuple.
export type RemapTreeValues<Node extends GivenAnyTree, To> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    RemapTreeValues<GivenLeaf<1>, boolean>,
    { readonly value: boolean; readonly children: readonly [] }
  >
>;
type _19b = Expect<
  Equal<
    RemapTreeValues<GivenSampleTree, string>,
    {
      readonly value: string;
      readonly children: readonly [
        { readonly value: string; readonly children: readonly [] },
        {
          readonly value: string;
          readonly children: readonly [
            { readonly value: string; readonly children: readonly [] },
          ];
        },
      ];
    }
  >
>;
type _19c = Expect<Equal<RemapTreeValues<GivenSampleTree, string>["children"]["length"], 2>>;
type _19d = Expect<
  Equal<
    RemapTreeValues<GivenSampleTree, string>["children"][1]["children"][0]["value"],
    string
  >
>;
type _19e = Expect<
  Equal<
    {
      remapped: RemapTreeValues<GivenLeaf<1>, string>;
      matchesMutable: Equal<
        RemapTreeValues<GivenLeaf<1>, string>,
        { value: string; children: [] }
      >;
    },
    {
      remapped: { readonly value: string; readonly children: readonly [] };
      matchesMutable: false;
    }
  >
>;

// 20. Collect every payload of a nullable binary tree as one union.
//     Hint: `null` carries no payload, so matching the nonempty node shape and
//     recursing into both links covers the whole tree.
export type BinaryValueUnion<Node extends GivenAnyBinary> = TODO; // TODO(koan)

type _20a = Expect<Equal<BinaryValueUnion<GivenSampleBinary>, 1 | 2>>;
type _20b = Expect<Equal<BinaryValueUnion<null>, never>>;
type _20c = Expect<
  Equal<
    BinaryValueUnion<{ readonly value: "a"; readonly left: null; readonly right: null }>,
    "a"
  >
>;
type _20d = Expect<
  Equal<
    BinaryValueUnion<{
      readonly value: 1;
      readonly left: { readonly value: 2; readonly left: null; readonly right: null };
      readonly right: { readonly value: 3; readonly left: null; readonly right: null };
    }>,
    1 | 2 | 3
  >
>;
type _20e = Expect<
  Equal<
    BinaryValueUnion<{
      readonly value: 1;
      readonly left: null;
      readonly right: {
        readonly value: 2;
        readonly left: null;
        readonly right: { readonly value: 3; readonly left: null; readonly right: null };
      };
    }>,
    1 | 2 | 3
  >
>;

// ─── The runtime fold contracts ───────────────────────────────────────

// 21. Build the traversal, measurement, and mapping signatures the packet exports.
export type TreeRuntimeApi = TODO; // TODO(koan)

type _21a = Expect<
  Equal<TreeRuntimeApi["treeSize"], <Value>(tree: GivenTree<Value>) => number>
>;
type _21b = Expect<
  Equal<TreeRuntimeApi["preorder"], <Value>(tree: GivenTree<Value>) => Value[]>
>;
type _21c = Expect<
  Equal<
    TreeRuntimeApi["mapTree"],
    <Input, Output>(
      tree: GivenTree<Input>,
      transform: (value: Input) => Output,
    ) => GivenTree<Output>
  >
>;
type _21d = Expect<
  Equal<TreeRuntimeApi["binarySize"], <Value>(tree: GivenBinary<Value>) => number>
>;
type _21e = Expect<Equal<ReturnType<TreeRuntimeApi["preorder"]>, unknown[]>>;
