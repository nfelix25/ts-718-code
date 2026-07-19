import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-106 guided drills: recursive trees
 * =============================================================================
 * Identify the node, forest, and empty branch encodings separately. Then follow
 * the generic payload through each recursive child position.
 */

interface DT<T> { readonly value: T; readonly children: readonly DT<T>[] }
type DF<T> = readonly DT<T>[];
type DB<T> = null | { readonly value: T; readonly left: DB<T>; readonly right: DB<T> };
type DBN<T> = NonNullable<DB<T>>;

// N-ary nodes expose a recursively homogeneous child forest.
type _D01 = Expect<Equal<DT<string>["value"], TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DT<string>["children"], TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DT<string>["children"][number], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DT<string>["children"][number]["value"], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DT<string>["children"][number]["children"], TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<keyof DT<string>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DF<string>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DF<string>[number], TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DF<string>["length"], TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<readonly [] extends DF<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<readonly [DT<string>] extends DF<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<readonly [DT<number>] extends DF<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DT<never>["value"], TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DT<unknown>["children"][number]["value"], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<Readonly<DT<string>>, TODO>>; // TODO(koan) @koan-error

// Finite leaves and branches satisfy the same recursive node family.
type L1 = { readonly value: 1; readonly children: readonly [] };
type L2 = { readonly value: 2; readonly children: readonly [] };
type B12 = { readonly value: 0; readonly children: readonly [L1, L2] };
type _D16 = Expect<Equal<L1 extends DT<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<L2 extends DT<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<B12 extends DT<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<B12["children"][number]["value"], TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<B12["children"]["length"], TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<{ value: 1; children: readonly [{ value: "x"; children: readonly [] }] } extends DT<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<{ value: 1; children: readonly [null] } extends DT<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<{ value: 1 } extends DT<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<{ children: readonly [] } extends DT<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<{ value: 1; children: readonly []; extra: true } extends DT<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<readonly [L1, L2] extends DF<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<readonly [L1, { value: "x"; children: readonly [] }] extends DF<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<B12 extends DB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<Partial<DT<number>>["children"], TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<Pick<DT<number>, "value">, TODO>>; // TODO(koan) @koan-error

// Binary trees encode emptiness with null at every child position.
type _D31 = Expect<Equal<null extends DB<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DBN<string>["value"], TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DBN<string>["left"], TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DBN<string>["right"], TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<NonNullable<DBN<string>["left"]>["value"], TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<Extract<DB<string>, null>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<Exclude<DB<string>, null>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<{ value: 1; left: null; right: null } extends DB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<{ value: 1; left: { value: 2; left: null; right: null }; right: null } extends DB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<{ value: 1; left: undefined; right: null } extends DB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<{ value: 1; left: null } extends DB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DB<never> extends DB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DB<1> extends DB<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DB<number> extends DB<1> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<keyof DBN<number>, TODO>>; // TODO(koan) @koan-error

// Payload relationships propagate through every recursive branch.
type _D46 = Expect<Equal<DT<"a"> extends DT<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DT<string> extends DT<"a"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DF<"a"> extends DF<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DF<string> extends DF<"a"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DB<"a"> extends DB<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DB<string> extends DB<"a"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DT<never> extends DT<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DT<string> extends DT<unknown> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DT<unknown> extends DT<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DB<never> extends DB<unknown> ? true : false, TODO>>; // TODO(koan) @koan-error

// Forests and child arrays expose ordinary array observations.
type _D56 = Expect<Equal<DF<1>[number]["value"], TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DF<1>[number]["children"][number]["value"], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<readonly [] extends DT<number>["children"] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DT<number>["children"] extends DF<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DF<number> extends readonly unknown[] ? true : false, TODO>>; // TODO(koan) @koan-error
