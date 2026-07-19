import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-106 edge cases: recursive trees
 * =============================================================================
 * Recursive tree types admit graph-shaped runtime values. Empty child arrays,
 * null roots, shared subtrees, cycles, mutable aliases, and extreme payloads all
 * affect algorithms differently even when structural assignment succeeds.
 */

interface ET<T> { readonly value: T; readonly children: readonly ET<T>[] }
type EB<T> = null | { readonly value: T; readonly left: EB<T>; readonly right: EB<T> };
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// N-ary leaves and nullable binary emptiness are different base cases.
type _E01 = Expect<Equal<{ value: 1; children: readonly [] } extends ET<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<null extends ET<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<null extends EB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<{ value: 1; left: null; right: null } extends EB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<readonly [] extends readonly ET<number>[] ? true : false, TODO>>; // TODO(koan) @koan-error

// Readonly child views accept mutable implementations but remove writes at use sites.
type MutableTree<T> = { value: T; children: MutableTree<T>[] };
type _E06 = Expect<Equal<MutableTree<number> extends ET<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ET<number> extends MutableTree<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<"push" extends keyof ET<number>["children"] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<"map" extends keyof ET<number>["children"] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<Readonly<MutableTree<number>>["children"], TODO>>; // TODO(koan) @koan-error

// Never, unknown, and any affect payloads without removing recursive structure.
type _E11 = Expect<Equal<ET<never>["value"], TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ET<unknown>["children"][number]["value"], TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EIsAny<ET<any>["value"]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EB<never> extends EB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EB<unknown> extends EB<number> ? true : false, TODO>>; // TODO(koan) @koan-error

// Structural tree aliases cannot prove uniqueness or absence of shared children.
declare const sharedChild: ET<number>;
type SharedRoot = { readonly value: 0; readonly children: readonly [typeof sharedChild, typeof sharedChild] };
type _E16 = Expect<Equal<SharedRoot extends ET<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<SharedRoot["children"][0], TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<Equal<SharedRoot["children"][0], SharedRoot["children"][1]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<SharedRoot["children"][number]["value"], TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<SharedRoot["children"]["length"], TODO>>; // TODO(koan) @koan-error

// Cyclic graphs also satisfy the structural alias and can break naive traversal.
declare const cyclicTree: ET<number>;
type _E21 = Expect<Equal<typeof cyclicTree extends ET<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<typeof cyclicTree["children"][number], TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<typeof cyclicTree["children"][number]["children"][number], TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<typeof cyclicTree["children"][number]["value"], TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<keyof typeof cyclicTree, TODO>>; // TODO(koan) @koan-error

// One-layer utilities do not deep-transform descendants.
type _E26 = Expect<Equal<Partial<ET<number>>["children"], TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<Readonly<MutableTree<number>>["children"], TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<Pick<ET<number>, "value">, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<Omit<ET<number>, "children">, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<Partial<NonNullable<EB<number>>>["left"], TODO>>; // TODO(koan) @koan-error

// Pre-solved: a leaf is an ordinary node with an empty child forest.
type _DemoLeaf = Expect<{ value: 1; children: readonly [] } extends ET<number> ? true : false>;

// Pre-solved: binary empty trees use the null branch.
type _DemoBinaryEmpty = Expect<Equal<Extract<EB<number>, null>, null>>;

// Pre-solved: mutable data can satisfy a readonly recursive view.
type _DemoMutableView = Expect<MutableTree<number> extends ET<number> ? true : false>;

declare const readonlyTree: ET<number>;
// @ts-expect-error The readonly child forest does not expose mutating methods.
readonlyTree.children.push(readonlyTree);
