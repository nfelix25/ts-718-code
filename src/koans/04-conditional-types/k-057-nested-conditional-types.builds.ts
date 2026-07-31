import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-057: nested conditional types — constructions
 * =============================================================================
 *
 * These constructions build ordered type-level decision trees for primitive
 * and object categories, roles, templates, status codes, booleans, numeric
 * literals, structural shapes, and correlated payloads. They contrast
 * narrow-before-broad trees with deliberately shadowed branches, preserve input
 * evidence in selected leaves, delegate to named sub-classifiers, and cover
 * union, never, any, and unknown traversal. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenCategory<Value> =
  Value extends null ? "null"
    : Value extends undefined ? "undefined"
      : Value extends string ? "string"
        : Value extends number ? "number"
          : Value extends boolean ? "boolean"
            : Value extends readonly unknown[] ? "array"
              : Value extends (...args: any[]) => unknown ? "function"
                : Value extends object ? "object"
                  : "other";

type GivenRoleLevel<Role> =
  Role extends "admin" ? 3
    : Role extends "editor" ? 2
      : Role extends string ? 1
        : 0;

type GivenHttpCategory<Code extends number> =
  Code extends 200 | 201 | 204 ? "success"
    : Code extends 301 | 302 ? "redirect"
      : Code extends 400 | 401 | 403 | 404 ? "client-error"
        : Code extends 500 | 502 | 503 ? "server-error"
          : "unknown";

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

// ─── Runtime-shaped category trees and ordering ───────────────────────────

// 1. Classify nullish, primitive, container, callable, and object values in order.
export type TypeCategory<Value> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<TypeCategory<null | undefined>, "null" | "undefined">
>;
type _01b = Expect<
  Equal<TypeCategory<string | number | boolean>, "string" | "number" | "boolean">
>;
type _01c = Expect<
  Equal<
    TypeCategory<readonly [1, 2] | (() => void) | { id: number }>,
    "array" | "function" | "object"
  >
>;
type _01d = Expect<Equal<TypeCategory<symbol | bigint>, "other">>;
type _01e = Expect<Equal<TypeCategory<never>, never>>;

// 2. Classify arrays, functions, records, and scalars with narrow object cases first.
export type ObjectKind<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<ObjectKind<readonly []>, "array">>;
type _02b = Expect<Equal<ObjectKind<(value: number) => string>, "function">>;
type _02c = Expect<Equal<ObjectKind<{ id: 1 }>, "record">>;
type _02d = Expect<Equal<ObjectKind<null | string>, "scalar">>;
type _02e = Expect<
  Equal<ObjectKind<readonly [1] | (() => void)>, "array" | "function">
>;

// 3. Put object first to demonstrate arrays and functions becoming unreachable.
export type BroadObjectFirst<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<BroadObjectFirst<readonly [1, 2]>, "object">>;
type _03b = Expect<Equal<BroadObjectFirst<() => void>, "object">>;
type _03c = Expect<Equal<BroadObjectFirst<{ id: number }>, "object">>;
type _03d = Expect<Equal<BroadObjectFirst<null>, "other">>;

// 4. Refine within the object branch after excluding nullish primitives.
export type NestedObjectKind<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<NestedObjectKind<readonly [1]>, "array">>;
type _04b = Expect<Equal<NestedObjectKind<() => string>, "function">>;
type _04c = Expect<Equal<NestedObjectKind<Date>, "object">>;
type _04d = Expect<Equal<NestedObjectKind<null | 1>, "scalar">>;

// ─── Literal-before-broad protocol trees ──────────────────────────────────

// 5. Construct access objects with literal roles before the broad string case.
export type RoleAccess<Role> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<RoleAccess<"admin">, { level: 3; role: "admin" }>
>;
type _05b = Expect<
  Equal<RoleAccess<"editor">, { level: 2; role: "editor" }>
>;
type _05c = Expect<
  Equal<RoleAccess<"viewer">, { level: 1; role: "viewer" }>
>;
type _05d = Expect<
  Equal<RoleAccess<undefined>, { level: 0; role: "anonymous" }>
>;
type _05e = Expect<
  Equal<
    RoleAccess<"admin" | "viewer">,
    { level: 3; role: "admin" } | { level: 1; role: "viewer" }
  >
>;

// 6. Put the broad string role first to shadow later literal roles.
export type BroadRoleFirst<Role> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<BroadRoleFirst<"admin">, { level: 1; role: "admin" }>
>;
type _06b = Expect<
  Equal<BroadRoleFirst<"viewer">, { level: 1; role: "viewer" }>
>;
type _06c = Expect<
  Equal<BroadRoleFirst<42>, { level: 0; role: "anonymous" }>
>;
type _06d = Expect<
  Equal<
    BroadRoleFirst<"admin" | undefined>,
    { level: 1; role: "admin" } | { level: 0; role: "anonymous" }
  >
>;

// 7. Classify finite HTTP status families before the numeric fallback.
export type HttpCategory<Code extends number> = TODO; // TODO(koan)

type _07a = Expect<Equal<HttpCategory<200 | 204>, "success">>;
type _07b = Expect<Equal<HttpCategory<302>, "redirect">>;
type _07c = Expect<Equal<HttpCategory<401 | 404>, "client-error">>;
type _07d = Expect<Equal<HttpCategory<500 | 503>, "server-error">>;
type _07e = Expect<Equal<HttpCategory<418>, "unknown">>;

// 8. Classify selected numeric literals before a broad number branch.
export type NumberCategory<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<NumberCategory<0>, "zero">>;
type _08b = Expect<Equal<NumberCategory<1>, "one">>;
type _08c = Expect<Equal<NumberCategory<2 | 3>, "number">>;
type _08d = Expect<
  Equal<NumberCategory<0 | 1 | 2>, "zero" | "one" | "number">
>;
type _08e = Expect<Equal<NumberCategory<string>, "other">>;

// 9. Split the broad boolean union into its two literal leaves.
export type BooleanCategory<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<BooleanCategory<true>, "true">>;
type _09b = Expect<Equal<BooleanCategory<false>, "false">>;
type _09c = Expect<Equal<BooleanCategory<boolean>, "true" | "false">>;
type _09d = Expect<Equal<BooleanCategory<true | null>, "true" | "other">>;
type _09e = Expect<Equal<BooleanCategory<never>, never>>;

// 10. Classify one literal, then numeric-id templates, then broad strings.
export type SpecificStringCategory<Value> = TODO; // TODO(koan)

type _10a = Expect<Equal<SpecificStringCategory<"id-0">, "zero-id">>;
type _10b = Expect<Equal<SpecificStringCategory<"id-42">, "numeric-id">>;
type _10c = Expect<Equal<SpecificStringCategory<`id-${number}`>, "numeric-id">>;
type _10d = Expect<Equal<SpecificStringCategory<string>, "string">>;
type _10e = Expect<
  Equal<
    SpecificStringCategory<"id-0" | "id-2" | "name">,
    "zero-id" | "numeric-id" | "string"
  >
>;

// 11. Put broad strings first to demonstrate template and literal shadowing.
export type BroadStringFirst<Value> = TODO; // TODO(koan)

type _11a = Expect<Equal<BroadStringFirst<"id-0">, "string">>;
type _11b = Expect<Equal<BroadStringFirst<"id-42">, "string">>;
type _11c = Expect<Equal<BroadStringFirst<`id-${number}`>, "string">>;
type _11d = Expect<Equal<BroadStringFirst<number>, "other">>;

// ─── Structural and correlated branch results ─────────────────────────────

// 12. Preserve the checked input inside category-specific payload objects.
export type ValuePayload<Value> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<ValuePayload<"hello">, { kind: "text"; value: "hello" }>
>;
type _12b = Expect<
  Equal<ValuePayload<42>, { kind: "count"; value: 42 }>
>;
type _12c = Expect<
  Equal<ValuePayload<false>, { kind: "other"; value: false }>
>;
type _12d = Expect<
  Equal<
    ValuePayload<"x" | 1>,
    { kind: "text"; value: "x" } | { kind: "count"; value: 1 }
  >
>;
type _12e = Expect<Equal<ValuePayload<never>, never>>;

// 13. Order a specific tagged shape before broad tagged and object shapes.
export type ShapeCategory<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<ShapeCategory<{ kind: "a"; value: 1; extra: true }>, "specific-a">
>;
type _13b = Expect<
  Equal<ShapeCategory<{ kind: "a"; value: string }>, "tagged">
>;
type _13c = Expect<Equal<ShapeCategory<{ kind: "b" }>, "tagged">>;
type _13d = Expect<Equal<ShapeCategory<{ value: 1 }>, "object">>;
type _13e = Expect<
  Equal<
    ShapeCategory<{ kind: "a"; value: 1 } | { kind: "b" }>,
    "specific-a" | "tagged"
  >
>;

// 14. Put the broad tagged contract first to shadow its specific subtype.
export type BroadShapeFirst<Value> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<BroadShapeFirst<{ kind: "a"; value: 1 }>, "tagged">
>;
type _14b = Expect<Equal<BroadShapeFirst<{ kind: "b" }>, "tagged">>;
type _14c = Expect<Equal<BroadShapeFirst<{ value: 1 }>, "object">>;
type _14d = Expect<Equal<BroadShapeFirst<null>, "other">>;

// 15. Prefer a full entity, then an id-only entity, then any other object.
export type EntityDepth<Value> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<EntityDepth<{ id: 1; name: "Ada"; extra: true }>, "full">
>;
type _15b = Expect<Equal<EntityDepth<{ id: "x" }>, "identified">>;
type _15c = Expect<Equal<EntityDepth<{ name: string }>, "object">>;
type _15d = Expect<Equal<EntityDepth<string>, "other">>;
type _15e = Expect<
  Equal<EntityDepth<{ id: 1 } | { name: string }>, "identified" | "object">
>;

// 16. Build a correlated union pairing each input member with its category.
export type CorrelatedCategory<Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    CorrelatedCategory<"x" | 1>,
    { category: "string"; value: "x" } | { category: "number"; value: 1 }
  >
>;
type _16b = Expect<
  Equal<
    CorrelatedCategory<readonly [1] | { id: number }>,
    | { category: "array"; value: readonly [1] }
    | { category: "object"; value: { id: number } }
  >
>;
type _16c = Expect<
  Equal<CorrelatedCategory<null>, { category: "null"; value: null }>
>;
type _16d = Expect<Equal<CorrelatedCategory<never>, never>>;

// 17. Pair independent category and value unions to expose lost correlation.
export type LooseCategory<Value> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    LooseCategory<"x" | 1>,
    { category: "string" | "number"; value: "x" | 1 }
  >
>;
type _17b = Expect<
  Equal<
    LooseCategory<readonly [1] | { id: number }>,
    {
      category: "array" | "object";
      value: readonly [1] | { id: number };
    }
  >
>;
type _17c = Expect<
  Equal<LooseCategory<unknown>, { category: "other"; value: unknown }>
>;
type _17d = Expect<
  Equal<LooseCategory<never>, { category: never; value: never }>
>;

// 18. Preserve a status code inside its selected protocol category.
export type StatusPayload<Code extends number> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<StatusPayload<200>, { code: 200; category: "success" }>
>;
type _18b = Expect<
  Equal<StatusPayload<302>, { code: 302; category: "redirect" }>
>;
type _18c = Expect<
  Equal<
    StatusPayload<404 | 503>,
    { code: 404 | 503; category: "client-error" | "server-error" }
  >
>;
type _18d = Expect<
  Equal<StatusPayload<418>, { code: 418; category: "unknown" }>
>;

// ─── Helper delegation and special-type traversal ─────────────────────────

// 19. Delegate number and string branches to named sub-decisions.
export type ProtocolDecision<Value> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<ProtocolDecision<204>, { protocol: "http"; result: "success" }>
>;
type _19b = Expect<
  Equal<ProtocolDecision<"admin">, { protocol: "role"; result: 3 }>
>;
type _19c = Expect<
  Equal<ProtocolDecision<"viewer">, { protocol: "role"; result: 1 }>
>;
type _19d = Expect<
  Equal<ProtocolDecision<boolean>, { protocol: "unsupported"; result: 0 }>
>;
type _19e = Expect<
  Equal<
    ProtocolDecision<404 | "editor">,
    | { protocol: "http"; result: "client-error" }
    | { protocol: "role"; result: 2 }
  >
>;

// 20. Classify special traversal without expecting a raw any answer.
export type CategorySpecialProfile<Value> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    CategorySpecialProfile<any>,
    [
      true,
      false,
      false,
      | "null"
      | "undefined"
      | "string"
      | "number"
      | "boolean"
      | "array"
      | "function"
      | "object"
      | "other",
    ]
  >
>;
type _20b = Expect<
  Equal<CategorySpecialProfile<never>, [false, false, true, never]>
>;
type _20c = Expect<
  Equal<CategorySpecialProfile<unknown>, [false, false, false, "other"]>
>;
type _20d = Expect<
  Equal<
    CategorySpecialProfile<string | Date>,
    [false, false, false, "string" | "object"]
  >
>;
