import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-056 edge cases: structural assignability in conditionals
 * =============================================================================
 * Conditional checks compare types, so expression-level freshness and excess
 * property diagnostics do not participate. These cases stress method bivariance,
 * call/construct signatures, private/protected origins, sibling subclasses,
 * brands, intersections, and open-domain requirements.
 */

type EAssign<A, B> = A extends B ? true : false;

// Type-to-type checks allow width even where a fresh object expression may error.
type _E01 = Expect<Equal<EAssign<{ x: 1; extra: true }, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EAssign<{ x: 1; extra: true }, { x: number; [key: string]: unknown }>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EAssign<{ x: 1 }, Record<"x" | "y", number>>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EAssign<Record<string, number>, { fixed: number }>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EAssign<{ fixed: number }, Record<string, number>>, TODO>>; // TODO(koan) @koan-error

interface EMethodWide { handle(value: unknown): void }
interface EMethodNarrow { handle(value: string): void }
interface EPropertyWide { handle: (value: unknown) => void }
interface EPropertyNarrow { handle: (value: string) => void }

// Methods retain bivariance; function-valued properties use strict variance.
type _E06 = Expect<Equal<EAssign<EMethodNarrow, EMethodWide>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EAssign<EMethodWide, EMethodNarrow>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EAssign<EPropertyNarrow, EPropertyWide>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EAssign<EPropertyWide, EPropertyNarrow>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EAssign<{ call(x: string): "x" }, { call(x: unknown): string }>, TODO>>; // TODO(koan) @koan-error

// Call and construct signatures are structural but occupy different surfaces.
type ECallable = { (value: string): number; label: string };
type EConstructable = new (value: string) => { value: string };
type _E11 = Expect<Equal<EAssign<ECallable, (value: string) => number>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EAssign<(value: string) => number, ECallable>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EAssign<EConstructable, new (value: string) => object>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EAssign<EConstructable, (...args: any[]) => unknown>, TODO>>; // TODO(koan) @koan-error

class EBase { private id = 0; protected state = "base"; value = 1; }
class ELeft extends EBase { left = true; }
class ERight extends EBase { right = true; }
class EUnrelated { private id = 0; protected state = "base"; value = 1; }

// Same-origin private/protected members survive inheritance, not re-declaration.
type _E15 = Expect<Equal<EAssign<ELeft, EBase>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EAssign<ERight, EBase>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EAssign<ELeft, ERight>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EAssign<ELeft, { value: number }>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EAssign<EBase, EUnrelated>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EAssign<EUnrelated, { value: number }>, TODO>>; // TODO(koan) @koan-error

declare const eBrand: unique symbol;
type EBrand<Value, Name> = Value & { readonly [eBrand]: Name };
type EUser = EBrand<string, "User">;
type EOrder = EBrand<string, "Order">;

// Shared brand machinery remains structural in its brand value argument.
type _E21 = Expect<Equal<EAssign<EUser, EBrand<string, string>>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EAssign<EBrand<string, string>, EUser>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EAssign<EUser, EOrder>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EAssign<EUser & { source: "db" }, EUser>, TODO>>; // TODO(koan) @koan-error

// Intersections, unions, and nullish members finish the assignability matrix.
type _E25 = Expect<Equal<EAssign<{ x: 1 } & { y: 2 }, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EAssign<{ x: 1 }, { x: number } & { y?: string }>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EAssign<{ x: 1 } | { x: 2; y: 3 }, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EAssign<{ x: 1 } | null, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EAssign<void, undefined>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EAssign<undefined, void>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: excess-property checks are expression freshness rules, not type relation rules.
type _DemoWidth = Expect<Equal<EAssign<{ x: 1; extra: true }, { x: number }>, true>>;

// Pre-solved: sibling subclasses share their base private member but lack each other's public fields.
type _DemoSibling = Expect<Equal<EAssign<ELeft, ERight>, false>>;

// Pre-solved: a branded value remains assignable to its underlying representation.
type _DemoBrandBase = Expect<Equal<EAssign<EUser, string>, true>>;

// A fresh expression still receives an excess-property diagnostic at a value site.
// @ts-expect-error Fresh object expressions reject unknown target properties.
const invalidFresh: { x: number } = { x: 1, extra: true };
void invalidFresh;
