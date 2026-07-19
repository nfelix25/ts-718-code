import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-085: routes and path parameters
 * =============================================================================
 *
 * Route parameters are a recursive string grammar over slash-delimited
 * segments. This lesson declares three parameter forms: `:id` is required,
 * `:tab?` is optional, and `*rest` is a required wildcard string. Static
 * segments contribute no keys.
 *
 * I read
 *
 *   `Path extends `${infer Segment}/${infer Tail}`
 *      ? Param<Segment> | Params<Tail>
 *      : Param<Path>`
 *
 * aloud as:
 *
 *   "Consume one slash-delimited segment, extract any name from that segment,
 *    then union it with names found recursively in the remaining path."
 *
 * Required and optional names are collected separately and mapped into one
 * object. An empty name is ignored. Duplicate names normalize; if one occurrence
 * is required, required wins. Literal path unions distribute so each route keeps
 * its own parameter object rather than requiring every route's keys together.
 * Broad `string` cannot reveal a finite grammar and falls back to
 * `Record<string, string>`. Runtime construction mirrors the declared grammar
 * and removes a missing optional segment.
 */

type SegmentRequired<Segment extends string> = Segment extends `:${infer Name}?`
  ? never
  : Segment extends `:${infer Name}`
    ? Name extends "" ? never : Name
    : Segment extends `*${infer Name}`
      ? Name extends "" ? never : Name
      : never;
type SegmentOptional<Segment extends string> = Segment extends `:${infer Name}?`
  ? Name extends "" ? never : Name
  : never;
export type RequiredParamNames<Path extends string> =
  Path extends `${infer Segment}/${infer Tail}`
    ? SegmentRequired<Segment> | RequiredParamNames<Tail>
    : SegmentRequired<Path>;
export type OptionalParamNames<Path extends string> =
  Path extends `${infer Segment}/${infer Tail}`
    ? SegmentOptional<Segment> | OptionalParamNames<Tail>
    : SegmentOptional<Path>;
type ParamsForOnePath<Path extends string> = {
  [Name in RequiredParamNames<Path>]: string;
} & {
  [Name in Exclude<OptionalParamNames<Path>, RequiredParamNames<Path>>]?: string;
};
type Expand<Object> = { [Key in keyof Object]: Object[Key] };
export type PathParams<Path extends string> = Path extends unknown
  ? string extends Path
    ? Record<string, string>
    : Expand<ParamsForOnePath<Path>>
  : never;
export type RouteArgs<Path extends string> = keyof PathParams<Path> extends never
  ? [params?: PathParams<Path>]
  : [params: PathParams<Path>];

export function buildPath<const Path extends string>(
  path: Path,
  ...[params = {} as PathParams<Path>]: RouteArgs<Path>
): string {
  const values = params as Record<string, string | undefined>;
  const result = path
    .split("/")
    .flatMap((segment) => {
      if (segment.startsWith(":")) {
        const optional = segment.endsWith("?");
        const name = segment.slice(1, optional ? -1 : undefined);
        const value = values[name];
        return optional && value === undefined ? [] : [value ?? ""];
      }
      if (segment.startsWith("*")) return [values[segment.slice(1)] ?? ""];
      return [segment];
    })
    .join("/");
  return result || "/";
}

export function defineRoute<const Path extends string>(path: Path) {
  return {
    path,
    build: (...args: RouteArgs<Path>) => buildPath(path, ...args),
  };
}

// Part 1: required names come from colon and wildcard segments.
type _Main01 = Expect<Equal<RequiredParamNames<"/users/:id">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<RequiredParamNames<"/users/:userId/posts/:postId">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<RequiredParamNames<"/files/*rest">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<RequiredParamNames<"/about">, TODO>>; // TODO(koan) @koan-error

// Part 2: optional names are collected independently.
type _Main05 = Expect<Equal<OptionalParamNames<"/users/:tab?">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<OptionalParamNames<"/:locale?/:section?">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<OptionalParamNames<"/users/:id">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<OptionalParamNames<"/files/*rest">, TODO>>; // TODO(koan) @koan-error

// Part 3: names map into required and optional string properties.
type _Main09 = Expect<Equal<PathParams<"/users/:id">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<PathParams<"/users/:id/:tab?">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<PathParams<"/files/*rest">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<PathParams<"/about">, TODO>>; // TODO(koan) @koan-error

// Part 4: duplicate names normalize and a required occurrence wins.
type _Main13 = Expect<Equal<PathParams<"/:id/:id">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<PathParams<"/:id?/:id">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<PathParams<"/:id/:id?">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<PathParams<"/:?/*">, TODO>>; // TODO(koan) @koan-error

// Part 5: path unions distribute and route arguments reflect key presence.
type _Main17 = Expect<Equal<PathParams<"/users/:id" | "/teams/:slug">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<PathParams<string>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<RouteArgs<"/about">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<RouteArgs<"/users/:id/:tab?">, TODO>>; // TODO(koan) @koan-error
