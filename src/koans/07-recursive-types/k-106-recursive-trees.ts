import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-106: recursive trees
 * =============================================================================
 *
 * Tree recursion branches: each node owns a payload and zero or more recursive
 * children. An empty children array is a leaf base case for an n-ary tree. A
 * nullable binary tree instead uses `null` as the empty-tree base and always
 * declares two recursive child positions on a nonempty node.
 *
 * I read `children: readonly Tree<T>[]` aloud as "every child is another tree
 * carrying the same payload domain." Runtime folds must recurse into every
 * branch and combine their results. Type aliases describe graph-compatible
 * structure, so they cannot prove that subtrees are unique, acyclic, balanced,
 * ordered, or finite; algorithms must choose and enforce those semantics.
 */

export interface Tree<Value> {
  readonly value: Value;
  readonly children: readonly Tree<Value>[];
}

export type Forest<Value> = readonly Tree<Value>[];

export type BinaryTree<Value> = null | {
  readonly value: Value;
  readonly left: BinaryTree<Value>;
  readonly right: BinaryTree<Value>;
};

export type TreeNode<Value> = Tree<Value>;
export type BinaryNode<Value> = NonNullable<BinaryTree<Value>>;

export function treeSize<Value>(tree: Tree<Value>): number {
  return 1 + tree.children.reduce((size, child) => size + treeSize(child), 0);
}

export function treeDepth<Value>(tree: Tree<Value>): number {
  return 1 + Math.max(0, ...tree.children.map(treeDepth));
}

export function preorder<Value>(tree: Tree<Value>): Value[] {
  return [tree.value, ...tree.children.flatMap(preorder)];
}

export function mapTree<Input, Output>(tree: Tree<Input>, transform: (value: Input) => Output): Tree<Output> {
  return { value: transform(tree.value), children: tree.children.map((child) => mapTree(child, transform)) };
}

export function binarySize<Value>(tree: BinaryTree<Value>): number {
  return tree === null ? 0 : 1 + binarySize(tree.left) + binarySize(tree.right);
}

// Part 1: one n-ary node layer exposes a payload and recursive child forest.
type _Main01 = Expect<Equal<Tree<string>["value"], TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Tree<string>["children"], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Tree<string>["children"][number], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Tree<string>["children"][number]["value"], TODO>>; // TODO(koan) @koan-error

// Part 2: leaves use an empty child collection without changing node type.
type MainLeaf = { readonly value: 1; readonly children: readonly [] };
type MainBranch = { readonly value: 1; readonly children: readonly [MainLeaf] };
type _Main05 = Expect<Equal<MainLeaf extends Tree<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainBranch extends Tree<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<readonly [] extends Forest<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Forest<number>[number], TODO>>; // TODO(koan) @koan-error

// Part 3: nullable binary trees use a different base-case encoding.
type _Main09 = Expect<Equal<null extends BinaryTree<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<BinaryNode<string>["value"], TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<BinaryNode<string>["left"], TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<BinaryNode<string>["right"], TODO>>; // TODO(koan) @koan-error

// Part 4: payload type arguments persist throughout every branch.
type _Main13 = Expect<Equal<Tree<"a"> extends Tree<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Tree<string> extends Tree<"a"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<BinaryTree<1> extends BinaryTree<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<BinaryTree<number> extends BinaryTree<1> ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 5: traversal and mapping preserve their recursive contracts.
type _Main17 = Expect<Equal<ReturnType<typeof treeSize<string>>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof preorder<1 | 2>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof mapTree<number, string>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Parameters<typeof binarySize<boolean>>[0], TODO>>; // TODO(koan) @koan-error
