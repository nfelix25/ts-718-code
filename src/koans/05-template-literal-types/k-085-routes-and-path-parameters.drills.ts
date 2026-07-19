import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-085 guided drills: routes and path parameters
 * =============================================================================
 * Consume one segment, classify its marker, union names through recursion, then
 * map required and optional names into one correlated parameter object.
 */

type DRequiredSegment<S extends string> = S extends `:${infer N}?`
  ? never
  : S extends `:${infer N}`
    ? N extends "" ? never : N
    : S extends `*${infer N}`
      ? N extends "" ? never : N
      : never;
type DOptionalSegment<S extends string> = S extends `:${infer N}?`
  ? N extends "" ? never : N
  : never;
type DRequired<P extends string> = P extends `${infer H}/${infer R}` ? DRequiredSegment<H> | DRequired<R> : DRequiredSegment<P>;
type DOptional<P extends string> = P extends `${infer H}/${infer R}` ? DOptionalSegment<H> | DOptional<R> : DOptionalSegment<P>;
type DExpand<T> = { [K in keyof T]: T[K] };
type DOne<P extends string> = DExpand<
  { [K in DRequired<P>]: string }
  & { [K in Exclude<DOptional<P>, DRequired<P>>]?: string }
>;
type DParams<P extends string> = P extends unknown ? string extends P ? Record<string, string> : DOne<P> : never;
type DArgs<P extends string> = keyof DParams<P> extends never ? [params?: DParams<P>] : [params: DParams<P>];

// Required parameter-name recursion spans static, colon, and wildcard segments.
type _D01 = Expect<Equal<DRequired<"/users/:id">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DRequired<"users/:id">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DRequired<"/:id">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DRequired<":id">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DRequired<"/users/:userId/posts/:postId">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DRequired<"/files/*rest">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DRequired<"*rest">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DRequired<"/static/path">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DRequired<"/">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DRequired<"">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DRequired<"/:id/:id">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DRequired<"/:id?">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DRequired<"/:id?/:slug">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DRequired<"/:/*">, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DRequired<"/:id" | "/:slug">, TODO>>; // TODO(koan) @koan-error

// Optional names use the question-mark convention only.
type _D16 = Expect<Equal<DOptional<"/users/:tab?">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DOptional<":tab?">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DOptional<"/:locale?/:section?">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DOptional<"/:id">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DOptional<"/*rest">, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DOptional<"/static/path">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DOptional<"/:?">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DOptional<"/:id?/:id?">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DOptional<"/:id?/:slug">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DOptional<"/:id?" | "/:slug?">, TODO>>; // TODO(koan) @koan-error

// Mapped parameter objects distinguish required, optional, empty, and wildcard routes.
type _D26 = Expect<Equal<DParams<"/users/:id">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DParams<"/users/:userId/posts/:postId">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DParams<"/users/:id/:tab?">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DParams<"/:locale?/:section?">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DParams<"/files/*rest">, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DParams<"/about">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DParams<"/">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DParams<"">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DParams<"/:id/:id">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DParams<"/:id?/:id">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DParams<"/:id/:id?">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DParams<"/:?/*">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DParams<"/:id?/*rest">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DParams<"/:first/:second/:third">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DParams<"/:first?/:second/:third?">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DParams<"/v1/users/:id.json">, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DParams<"/literal-:id">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DParams<"/:id/">, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DParams<"//:id//:tab?">, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DParams<string>, TODO>>; // TODO(koan) @koan-error

// Path unions distribute and route argument tuples reflect whether keys exist.
type _D46 = Expect<Equal<DParams<"/users/:id" | "/teams/:slug">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DParams<"/about" | "/users/:id">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DParams<"/:id?" | "/:slug?">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DParams<never>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DArgs<"/about">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DArgs<"/users/:id">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DArgs<"/users/:id/:tab?">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DArgs<"/:tab?">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DArgs<"/files/*rest">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DArgs<string>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<keyof DParams<"/users/:id/:tab?">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DParams<"/users/:id/:tab?">["id"], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DParams<"/users/:id/:tab?">["tab"], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<{} extends Pick<DParams<"/users/:id/:tab?">, "tab"> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<{} extends Pick<DParams<"/users/:id/:tab?">, "id"> ? true : false, TODO>>; // TODO(koan) @koan-error
