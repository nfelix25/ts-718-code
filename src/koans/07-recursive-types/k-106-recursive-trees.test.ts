import { describe, expect, it } from "vitest";

import { binarySize, mapTree, preorder, treeDepth, treeSize, type BinaryTree, type Tree } from "./k-106-recursive-trees.js";

const tree: Tree<number> = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] },
  ],
};

describe("k-106 recursive trees", () => {
  it("counts every n-ary node", () => {
    expect(treeSize(tree)).toBe(4);
  });

  it("measures root-inclusive depth", () => {
    expect(treeDepth(tree)).toBe(3);
    expect(treeDepth({ value: 1, children: [] })).toBe(1);
  });

  it("traverses in preorder", () => {
    expect(preorder(tree)).toEqual([1, 2, 3, 4]);
  });

  it("maps every payload while preserving branches", () => {
    expect(preorder(mapTree(tree, (value) => `#${value}`))).toEqual(["#1", "#2", "#3", "#4"]);
  });

  it("counts nullable binary nodes", () => {
    const binary: BinaryTree<number> = { value: 1, left: { value: 2, left: null, right: null }, right: null };
    expect(binarySize(binary)).toBe(2);
    expect(binarySize(null)).toBe(0);
  });
});
