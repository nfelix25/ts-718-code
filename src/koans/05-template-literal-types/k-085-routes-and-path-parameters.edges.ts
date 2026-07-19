import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-085 edge cases: routes and path parameters
 * =============================================================================
 * A route parser is only as sound as its declared segment grammar. These cases
 * stress empty and embedded markers, duplicates, required/optional precedence,
 * wildcards, trailing slashes, broad and union paths, special types, and
 * structurally permissive empty parameter objects.
 */

type EReqSeg<S extends string> = S extends `:${infer N}?`
  ? never
  : S extends `:${infer N}`
    ? N extends "" ? never : N
    : S extends `*${infer N}`
      ? N extends "" ? never : N
      : never;
type EOptSeg<S extends string> = S extends `:${infer N}?` ? N extends "" ? never : N : never;
type EReq<P extends string> = P extends `${infer H}/${infer R}` ? EReqSeg<H> | EReq<R> : EReqSeg<P>;
type EOpt<P extends string> = P extends `${infer H}/${infer R}` ? EOptSeg<H> | EOpt<R> : EOptSeg<P>;
type EExpand<T> = { [K in keyof T]: T[K] };
type EOne<P extends string> = EExpand<{ [K in EReq<P>]: string } & { [K in Exclude<EOpt<P>, EReq<P>>]?: string }>;
type EParams<P extends string> = P extends unknown ? string extends P ? Record<string, string> : EOne<P> : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Only whole segments beginning with markers participate in this grammar.
type _E01 = Expect<Equal<EParams<"/v1/users/:id.json">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EParams<"/literal-:id">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EParams<"/:id-suffix">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EParams<"/prefix*:rest">, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EParams<"/:?/*">, TODO>>; // TODO(koan) @koan-error

// Duplicate names normalize, with any required occurrence taking precedence.
type _E06 = Expect<Equal<EParams<"/:id/:id">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EParams<"/:id?/:id?">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EParams<"/:id?/:id">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EParams<"/:id/:id?">, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EParams<"/*id/:id?">, TODO>>; // TODO(koan) @koan-error

// Slashes create empty static segments but do not create parameters.
type _E11 = Expect<Equal<EParams<"/">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EParams<"//">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EParams<"/:id/">, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EParams<"//:id//:tab?">, TODO>>; // TODO(koan) @koan-error

// Wildcard is a named string in this model, not a recursively parsed subpath.
type _E15 = Expect<Equal<EParams<"/files/*rest">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EParams<"/*first/*second">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EParams<"/*">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EParams<"/*rest/:id">, TODO>>; // TODO(koan) @koan-error

// Union paths distribute to preserve route-specific object alternatives.
type _E19 = Expect<Equal<EParams<"/users/:id" | "/teams/:slug">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EParams<"/about" | "/users/:id">, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EParams<"/:id?" | "/:slug">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<keyof EParams<"/users/:id" | "/teams/:slug">, TODO>>; // TODO(koan) @koan-error

// Broad and special paths require explicit fallbacks or guards.
type _E23 = Expect<Equal<EParams<string>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EParams<`/users/${string}`>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EParams<never>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EIsAny<EParams<any>>, TODO>>; // TODO(koan) @koan-error

// Empty parameter objects are structurally permissive unless exactness is added separately.
type _E27 = Expect<Equal<{ extra: string } extends EParams<"/about"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<{} extends EParams<"/users/:id"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<{} extends EParams<"/users/:tab?"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<{ id: string; extra: string } extends EParams<"/users/:id"> ? true : false, TODO>>; // TODO(koan) @koan-error

// Pre-solved: required occurrence wins over an optional duplicate.
type _DemoRequiredWins = Expect<Equal<EParams<"/:id?/:id">, { id: string }>>;

// Pre-solved: literal path unions remain a union of correlated parameter objects.
type _DemoDistributed = Expect<Equal<
  EParams<"/users/:id" | "/teams/:slug">,
  { id: string } | { slug: string }
>>;

// Pre-solved: broad paths use an honest record fallback.
type _DemoBroad = Expect<Equal<EParams<string>, Record<string, string>>>;

// Required route params cannot be omitted at a constrained builder boundary.
declare function acceptParams<P extends string>(path: P, params: EParams<P>): void;
// @ts-expect-error `id` is required by this route grammar.
acceptParams("/users/:id", {});
