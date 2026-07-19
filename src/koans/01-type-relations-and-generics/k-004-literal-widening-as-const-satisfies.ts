import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-004: Literal widening, as const, and satisfies
 * =============================================================================
 *
 * A literal expression carries exact information: `"ready"`, `3`, and `true`
 * each describe one value. TypeScript decides whether preserving that exactness
 * will be useful or whether a location is expected to change and should receive
 * the wider `string`, `number`, or `boolean` type.
 *
 * I read ordinary inference as a question about future writes:
 *
 *   "Should this location keep exactly this value, or should it accept peers?"
 *
 * A `const` primitive binding cannot be reassigned, so its literal is useful. A
 * property inside a const-bound object is still mutable, and an array can still
 * be pushed into, so their elements normally widen. `const` protects the binding,
 * not the object graph.
 *
 * I read `expression as const` as:
 *
 *   "Infer this literal expression in preservation mode: keep literal values,
 *    make object properties readonly, and infer arrays as readonly tuples."
 *
 * I read `expression satisfies Constraint` as:
 *
 *   "Check this expression against Constraint, but keep the useful type inferred
 *    for the expression instead of replacing it with Constraint."
 *
 * An annotation chooses the public view. `satisfies` validates without choosing
 * that wider view. `as const satisfies` is therefore valuable for registries and
 * configuration tables that need exact keys and values plus shape validation.
 */

export type Mode = "development" | "production";

export interface Options {
  mode: "light" | "dark";
  retries: number;
}

export interface ServiceConfig {
  mode: Mode;
  port: number;
  features: readonly string[];
}

export interface RouteDefinition {
  path: `/${string}`;
  secure: boolean;
}

export const checkedService = {
  mode: "production",
  port: 8080,
  features: ["logging"],
} satisfies ServiceConfig;

export const routeTable = {
  home: { path: "/", secure: false },
  admin: { path: "/admin", secure: true },
} as const satisfies Record<string, RouteDefinition>;

export type RouteName = keyof typeof routeTable;

export function getRoutePath(name: RouteName): "/" | "/admin" {
  return routeTable[name].path;
}

export function isRouteSecure(name: RouteName): boolean {
  return routeTable[name].secure;
}

export function formatRgb(color: readonly [number, number, number]): string {
  return `rgb(${color.join(", ")})`;
}

export function describeService(config: ServiceConfig): string {
  return `${config.mode}:${config.port}:${config.features.join(",")}`;
}

export function routeNames(): RouteName[] {
  return Object.keys(routeTable) as RouteName[];
}

export function mutateReferencedObject(): number {
  const mutable = { count: 1 };
  const wrapper = { mutable } as const;
  mutable.count += 1;
  return wrapper.mutable.count;
}

// Part 1: Primitive const bindings preserve literals; let bindings anticipate writes.
// -----------------------------------------------------------------------------

const constantText = "ready";
let changingText = "ready";
const constantCount = 3;
let changingCount = 3;

type _Main01 = Expect<Equal<typeof constantText, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof changingText, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof constantCount, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof changingCount, TODO>>; // TODO(koan) @koan-error

// Part 2: A const object binding does not make its writable contents literal.
// -----------------------------------------------------------------------------

const mutableAction = {
  type: "increment",
  amount: 1,
  enabled: true,
};
const mutableLabels = ["fast", "safe"];

type _Main05 = Expect<Equal<typeof mutableAction.type, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mutableAction.amount, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mutableAction.enabled, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mutableLabels, TODO>>; // TODO(koan) @koan-error

// Part 3: An annotation replaces the inferred view with its declared contract.
// -----------------------------------------------------------------------------

const annotatedOptions: Options = { mode: "dark", retries: 3 };
const inferredOptions = { mode: "dark", retries: 3 };
const literalPropertyOptions = { mode: "dark" as const, retries: 3 };

type _Main09 = Expect<Equal<typeof annotatedOptions, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof annotatedOptions.mode, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof inferredOptions.mode, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof literalPropertyOptions.mode, TODO>>; // TODO(koan) @koan-error

// Part 4: `as const` preserves the literal expression and adds readonly structure.
// -----------------------------------------------------------------------------

const preservedOptions = {
  mode: "dark",
  retries: 3,
  labels: ["fast", "safe"],
  nested: { enabled: true },
} as const;

type _Main13 = Expect<Equal<typeof preservedOptions.mode, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof preservedOptions.retries, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof preservedOptions.labels, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof preservedOptions.nested, TODO>>; // TODO(koan) @koan-error

// Part 5: `satisfies` validates while retaining expression-specific information.
// -----------------------------------------------------------------------------

const annotatedService: ServiceConfig = {
  mode: "production",
  port: 8080,
  features: ["logging"],
};

type _Main17 = Expect<Equal<typeof annotatedService.mode, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof checkedService.mode, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof checkedService.port, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof checkedService.features, TODO>>; // TODO(koan) @koan-error
type _Main21 = Expect<Equal<keyof typeof checkedService, TODO>>; // TODO(koan) @koan-error

// Part 6: `as const satisfies` preserves a validated literal registry.
// -----------------------------------------------------------------------------

type _Main22 = Expect<Equal<RouteName, TODO>>; // TODO(koan) @koan-error
type _Main23 = Expect<Equal<typeof routeTable.home.path, TODO>>; // TODO(koan) @koan-error
type _Main24 = Expect<Equal<typeof routeTable.admin.secure, TODO>>; // TODO(koan) @koan-error
type _Main25 = Expect<Equal<ReturnType<typeof getRoutePath>, TODO>>; // TODO(koan) @koan-error
