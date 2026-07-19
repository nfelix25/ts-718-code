import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { DotPaths } from "./k-113-dot-notation-paths.js";

/**
 * EDGE CASES & GOTCHAS
 *
 * A path union is only meaningful together with its traversal policy. Broad
 * index signatures widen paths to string, symbols cannot appear in dot syntax,
 * arrays require a separate index grammar, and recursive graphs need a depth or
 * visited-type policy. Those are semantic boundaries, not incidental syntax.
 */

type D<T> = DotPaths<T>;
declare const secret: unique symbol;

// Pre-solved demonstrations.
type _DemoOptionalStillDescends = Expect<Equal<D<{ a?: { b: 1 } }>, "a" | "a.b">>;
type _DemoUnionDistributes = Expect<Equal<D<{ a: 1 } | { b: 2 }>, "a" | "b">>;
type _DemoArrayIsLeaf = Expect<Equal<D<{ rows: { id: string }[] }>, "rows">>;
type _DemoSymbolIgnored = Expect<Equal<D<{ [secret]: { hidden: 1 }; shown: 2 }>, "shown">>;
type _DemoBroadRecordWidens = Expect<Equal<D<Record<string, number>>, string>>;
type _DemoAnyPolicy = Expect<Equal<D<any>, string>>;
type _DemoUnknownStops = Expect<Equal<D<unknown>, never>>;
type _DemoNeverDisappears = Expect<Equal<D<never>, never>>;

// 1. Keys that dot notation cannot faithfully represent (1-8)
type _01 = Expect<Equal<D<{ [secret]: 1 }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<D<{ [secret]: 1; visible: { x: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<D<{ 0: { x: 1 }; one: 2 }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<D<Record<"a.b", { c: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<D<Record<"", { x: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<D<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<D<Record<string, { nested: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<D<Record<string, { nested: 1 }>>, `${string}.nested`>, TODO>>; // TODO(koan) @koan-error

// 2. Distribution, absorption, and poisoned branches (9-16)
type _09 = Expect<Equal<D<{ a: 1 } | null>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<D<{ a: 1 } | unknown>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<D<{ a: 1 } | any>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<D<{ a: 1 } | never>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<D<{ value: unknown }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<D<{ value: never }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<D<{ value: any }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<D<({ a: { x: 1 } } | { b: { y: 2 } }) & { root: 0 }>, TODO>>; // TODO(koan) @koan-error

// 3. Leaf-policy surprises (17-24)
type _17 = Expect<Equal<D<{ tuple: readonly [{ deep: 1 }] }>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<D<{ array: ReadonlyArray<{ deep: 1 }> }>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<D<{ fn: (() => void) & { meta: { id: 1 } } }>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<D<{ promise: Promise<{ deep: 1 }> }>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<D<{ map: ReadonlyMap<string, { deep: 1 }> }>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<D<{ set: ReadonlySet<{ deep: 1 }> }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<D<{ date: Date & { meta: { id: 1 } } }>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<D<{ boxed: { valueOf(): number; meta: { id: 1 } } }>, TODO>>; // TODO(koan) @koan-error

// 4. Cycles and representational boundaries (25-30)
type LinkedNode = { id: string; next?: LinkedNode };
type MutuallyA = { name: string; b?: MutuallyB };
type MutuallyB = { count: number; a?: MutuallyA };

// Asking for D<LinkedNode> would recurse indefinitely. k-116 adds visited guards.
type _25 = Expect<Equal<keyof LinkedNode & string, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<D<Pick<LinkedNode, "id">>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<D<{ node: Pick<LinkedNode, "id"> }>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<keyof MutuallyA & string, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<keyof MutuallyB & string, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<D<{ a: Pick<MutuallyA, "name">; b: Pick<MutuallyB, "count"> }>, TODO>>; // TODO(koan) @koan-error
