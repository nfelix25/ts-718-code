import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { DeepBox, DeepLeaves, WholeDeepLeaves } from "./k-115-recursion-over-unions.js";

/** EDGE CASES: absorption, keyof union behavior, lost correlation, and recursion branch order. */

type D<T> = DeepLeaves<T>;
type W<T> = WholeDeepLeaves<T>;
type B<T> = DeepBox<T>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoDistributedKeys = Expect<Equal<D<{ a: 1 } | { b: 2 }>, 1 | 2>>;
type _DemoWholeKeysDisappear = Expect<Equal<W<{ a: 1 } | { b: 2 }>, never>>;
type _DemoSharedWholeKey = Expect<Equal<W<{ common: 0; a: 1 } | { common: 0; b: 2 }>, 0>>;
// The `-?` projection asks for declared property values, so optional presence does not add a leaf.
type _DemoOptionalPresenceRemoved = Expect<Equal<D<{ value?: 1 }>, 1>>;
type _DemoEmptyObjectHasNoLeaves = Expect<Equal<D<{}>, never>>;
type _DemoUnknownAbsorbsUnion = Expect<Equal<D<1 | unknown>, unknown>>;
type _DemoAnyClassified = Expect<Equal<IsAny<D<any>>, true>>;

// 1. Algebra before recursion starts (1-8)
type _01 = Expect<Equal<D<1 | never>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<D<1 | unknown>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsAny<D<1 | any>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<D<boolean>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<D<true | false>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<D<{} | object>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<D<{} | null>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<W<{} | null>, TODO>>; // TODO(koan) @koan-error

// 2. keyof sees common keys only when distribution is blocked (9-16)
type _09 = Expect<Equal<keyof ({ a: 1 } | { b: 2 }), TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<keyof ({ common: 0; a: 1 } | { common: 0; b: 2 }), TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<D<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<W<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<D<{ common: 0; a: 1 } | { common: 0; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<W<{ common: 0; a: 1 } | { common: 0; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<D<({ a: 1 } | { b: 2 }) & { root: 0 }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<W<({ a: 1 } | { b: 2 }) & { root: 0 }>, TODO>>; // TODO(koan) @koan-error

// 3. Flattening leaves deliberately loses path/value correlation (17-23)
type Event = { kind: "count"; value: number } | { kind: "label"; value: string };
type _17 = Expect<Equal<D<Event>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<D<Event>, string>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<D<Event>, number>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<B<Event>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<B<Event>["kind"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<B<Event>["value"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<D<{ pair: ["id", number] | ["name", string] }>, TODO>>; // TODO(koan) @koan-error

// 4. Empty, never-valued, and broad containers (24-30)
type _24 = Expect<Equal<D<[]>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<D<never[]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<D<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<IsAny<D<any[]>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<D<{ value: never }>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<D<{ value?: never }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<B<{ value: never }>, TODO>>; // TODO(koan) @koan-error
