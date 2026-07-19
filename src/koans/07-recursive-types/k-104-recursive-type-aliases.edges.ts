import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-104 edge cases: recursive type aliases
 * =============================================================================
 * Recursive aliases describe possible structure; they do not prove runtime
 * acyclicity or termination. Extreme payloads, missing base cases, optional
 * links, structural variance, and illegal bare self-reference expose the edges.
 */

type EL<T> = null | { value: T; next: EL<T> };
type EO<T> = { value: T; next?: EO<T> };
type EN<T> = T | readonly EN<T>[];
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Null-base and optional-link encodings have different observable shapes.
type _E01 = Expect<Equal<EL<string> extends EO<string> | null ? true : false, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EO<string> extends EL<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<NonNullable<EL<string>>["next"], TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EO<string>["next"], TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<null extends EO<string> ? true : false, TODO>>; // TODO(koan) @koan-error

// Never payloads leave the base inhabitable but make nodes unconstructible.
type _E06 = Expect<Equal<null extends EL<never> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<NonNullable<EL<never>>["value"], TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<{ value: never; next: null } extends EL<never> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EL<never> extends EL<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EL<string> extends EL<never> ? true : false, TODO>>; // TODO(koan) @koan-error

// Unknown absorbs a nested leaf union; any poisons it.
type _E11 = Expect<Equal<EN<unknown>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EIsAny<EN<any>>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<readonly [] extends EN<never> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<never extends EN<never> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<readonly [readonly []] extends EN<never> ? true : false, TODO>>; // TODO(koan) @koan-error

// Recursive generic families remain structurally covariant in readonly data.
type _E16 = Expect<Equal<EL<"a"> extends EL<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EL<string> extends EL<"a"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EN<"a"> extends EN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EN<string> extends EN<"a"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EL<never> extends EL<unknown> ? true : false, TODO>>; // TODO(koan) @koan-error

// One-layer utilities do not recursively transform nested links.
type Node = NonNullable<EL<{ id: number }>>;
type _E21 = Expect<Equal<Partial<Node>["value"], TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<Partial<Node>["next"], TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<Readonly<Node>["value"], TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<Readonly<Node>["next"], TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<Equal<Readonly<Node>["next"], Readonly<EL<{ id: number }>>>, TODO>>; // TODO(koan) @koan-error

// Type recursion does not guarantee an acyclic runtime object graph.
declare const cyclic: NonNullable<EL<number>>;
type _E26 = Expect<Equal<typeof cyclic["next"], TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<NonNullable<typeof cyclic["next"]>["next"], TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<NonNullable<NonNullable<typeof cyclic["next"]>["next"]>["value"], TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<typeof cyclic extends EL<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<keyof typeof cyclic, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a recursive alias exposes one productive object layer.
type _DemoLayer = Expect<Equal<NonNullable<EL<string>>["value"], string>>;

// Pre-solved: the null branch is the list's explicit base case.
type _DemoBase = Expect<Equal<Extract<EL<string>, null>, null>>;

// Pre-solved: unknown collapses a leaf-or-container union.
type _DemoUnknown = Expect<Equal<EN<unknown>, unknown>>;

// @ts-expect-error A bare alias cannot refer directly to itself without structure.
type BareCycle = BareCycle;

declare const node: NonNullable<EL<number>>;
// @ts-expect-error The recursive payload remains number at every depth.
const invalidPayload: string = node.next!.next!.value;
