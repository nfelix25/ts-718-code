import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AllOrNone,
  type AtLeastOne,
  type ConnectionConfig,
  type Exact,
  type ExtraKeys,
  type IsExactShape,
  type UserPatch,
} from "./k-156-exact-object-and-at-least-one-types.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * Excess-property checks apply to fresh literals, while structural assignment
 * accepts variables with extra fields. Exact works only when a generic boundary
 * retains the candidate type. Broad index signatures and union shapes change
 * what `keyof` means, so exactness utilities need an explicit policy there.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type UnionShape = { a: 1 } | { b: 2 };
type UnionChoices = { a?: 1 } | { b?: 2 };

// Pre-solved demonstrations separate assignability from exactness.
type _DemoStructuralExtra = Expect<Equal<Extends<{ host: string; port: number; debug: true }, ConnectionConfig>, true>>;
type _DemoExactExtra = Expect<Equal<IsExactShape<{ host: string; port: number; debug: true }, ConnectionConfig>, false>>;
type _DemoUndefinedRejected = Expect<Equal<Extends<{ name: undefined }, UserPatch>, false>>;
type _DemoUnionKeys = Expect<Equal<keyof UnionShape, never>>;
// Reflect.ownKeys is required at runtime because Object.keys would ignore symbol extras.

// 1. Structural openness versus retained candidate exactness (1-8)
type _01 = Expect<Equal<Extends<{ host: string; port: number; debug: true }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ExtraKeys<{ host: string; port: number; debug: true }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsExactShape<{ host: string; port: number; debug: true }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Exact<ConnectionConfig, { host: string; port: number; debug: true }>["debug"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<IsExactShape<{ host: string; port: number }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsExactShape<{ host: string; port: number; secure?: boolean }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsExactShape<{ host: "local"; port: 1 }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsExactShape<{ host: string }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error

// 2. Optional fields, explicit undefined, and grouped presence (9-16)
type _09 = Expect<Equal<Extends<{ name: undefined }, UserPatch>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<{ name: string; email: undefined }, UserPatch>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<AtLeastOne<{ value: string | undefined }>["value"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<AtLeastOne<{ a?: 1; b?: 2 }>["a"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<AllOrNone<{ a?: string; b?: number }>["a"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<{ a: string }, AllOrNone<{ a?: string; b?: number }>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<{ a: string; b: number }, AllOrNone<{ a?: string; b?: number }>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<{}, AllOrNone<{ a?: string; b?: number }>>, TODO>>; // TODO(koan) @koan-error

// 3. Broad keys and union shapes defeat simple finite-key assumptions (17-23)
type _17 = Expect<Equal<AtLeastOne<Record<string, string>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<keyof AtLeastOne<Record<string, string>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ExtraKeys<{ name: string; extra: true }, Record<string, unknown>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsExactShape<{ name: string; extra: true }, Record<string, unknown>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<keyof UnionShape, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<IsExactShape<{ a: 1 }, UnionShape>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<AtLeastOne<UnionChoices>, TODO>>; // TODO(koan) @koan-error

// 4. Empty choices, modifiers, and special key domains (24-30)
declare const symbolKey: unique symbol;
type _24 = Expect<Equal<AtLeastOne<{ a?: 1; b?: 2 }, never>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<AllOrNone<{}>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<AtLeastOne<{ readonly a?: 1; readonly b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ExtraKeys<{ name: string; [symbolKey]: true }, { name: string }>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<IsExactShape<{ name: string; [symbolKey]: true }, { name: string }>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ExtraKeys<{ 0: string }, {}>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsExactShape<never, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
