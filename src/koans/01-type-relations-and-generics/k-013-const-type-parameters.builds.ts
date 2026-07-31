import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-013: Const type parameters — constructions
 * =============================================================================
 *
 * These constructions build generic call and construct signatures whose
 * inference either widens ordinary expressions or preserves their available
 * literal structure. Their assertions compare inline expressions, established
 * variables, mutable and readonly constraints, rest tuples, registries,
 * explicit arguments, and special types. Replace each `TODO` with a type that
 * satisfies the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

declare const givenSymbol: unique symbol;
declare const givenAny: any;
declare const givenUnknown: unknown;
declare const givenNever: never;

const givenCondition = true as boolean;
const givenWidenedObject = { kind: "variable" };
const givenPreservedObject = { kind: "preserved" } as const;
const givenNestedReference = { mode: "shared" };
const givenMutableStrings: string[] = ["a", "b"];
const givenReadonlyStrings: readonly string[] = ["a", "b"];
const givenDynamicPart: string = "dynamic";
const givenWidenedRoutes = {
  home: { method: "GET", path: "/" },
};

// `const` belongs on type parameters inside the function and constructor types
// below. Type-alias parameters themselves do not permit the modifier.

// ─── Ordinary and const identity inference ──────────────────────────────────

// 1. Construct the ordinary generic identity signature.
export type OrdinaryCaptureSignature =
  TODO; // TODO(koan)

declare const givenOrdinaryCapture: OrdinaryCaptureSignature;
const ordinaryPrimitive = givenOrdinaryCapture("ready");
const ordinaryObject = givenOrdinaryCapture({ kind: "ready", count: 1 });
const ordinaryArray = givenOrdinaryCapture(["ok", 200]);
const ordinaryChoice = givenOrdinaryCapture(
  givenCondition ? "left" : "right",
);
type _01a = Expect<
  Equal<OrdinaryCaptureSignature, <Value>(value: Value) => Value>
>;
type _01b = Expect<Equal<typeof ordinaryPrimitive, "ready">>;
type _01c = Expect<
  Equal<typeof ordinaryObject, { kind: string; count: number }>
>;
type _01d = Expect<Equal<typeof ordinaryArray, (string | number)[]>>;
type _01e = Expect<Equal<typeof ordinaryChoice, "left" | "right">>;

// 2. Construct the const generic identity signature.
export type ConstCaptureSignature =
  TODO; // TODO(koan)

declare const givenConstCapture: ConstCaptureSignature;
const constPrimitive = givenConstCapture("ready");
const constObject = givenConstCapture({ kind: "ready", count: 1 });
const constArray = givenConstCapture(["ok", 200, true]);
type _02a = Expect<
  Equal<ConstCaptureSignature, <const Value>(value: Value) => Value>
>;
type _02b = Expect<Equal<typeof constPrimitive, "ready">>;
type _02c = Expect<
  Equal<
    typeof constObject,
    { readonly kind: "ready"; readonly count: 1 }
  >
>;
type _02d = Expect<
  Equal<typeof constArray, readonly ["ok", 200, true]>
>;

// 3. Box the preserved candidate while exposing prior variable widening.
export type ConstBoxSignature =
  TODO; // TODO(koan)

declare const givenConstBox: ConstBoxSignature;
const boxedInline = givenConstBox({ nested: { mode: "strict" } });
const boxedWidened = givenConstBox(givenWidenedObject);
const boxedPreserved = givenConstBox(givenPreservedObject);
const boxedReference = givenConstBox({ nested: givenNestedReference });
type _03a = Expect<
  Equal<
    ConstBoxSignature,
    <const Value>(value: Value) => { readonly value: Value }
  >
>;
type _03b = Expect<
  Equal<
    typeof boxedInline,
    { readonly value: { readonly nested: { readonly mode: "strict" } } }
  >
>;
type _03c = Expect<
  Equal<typeof boxedWidened, { readonly value: { kind: string } }>
>;
type _03d = Expect<
  Equal<
    typeof boxedPreserved,
    { readonly value: { readonly kind: "preserved" } }
  >
>;
type _03e = Expect<
  Equal<
    typeof boxedReference,
    { readonly value: { readonly nested: { mode: string } } }
  >
>;

// 4. Preserve an inline object while retaining the types of spreads and references.
export type ConstObjectSignature =
  TODO; // TODO(koan)

declare const givenConstObject: ConstObjectSignature;
const spreadWidened = givenConstObject({
  ...givenWidenedObject,
  active: true,
});
const spreadPreserved = givenConstObject({
  ...givenPreservedObject,
  active: true,
});
const referencedNested = givenConstObject({ nested: givenNestedReference });
const explicitOptional = givenConstObject({
  optional: undefined as string | undefined,
});
type _04a = Expect<
  Equal<
    ConstObjectSignature,
    <const Value extends object>(value: Value) => Value
  >
>;
type _04b = Expect<
  Equal<
    typeof spreadWidened,
    { readonly active: true; readonly kind: string }
  >
>;
type _04c = Expect<
  Equal<
    typeof spreadPreserved,
    { readonly active: true; readonly kind: "preserved" }
  >
>;
type _04d = Expect<
  Equal<typeof referencedNested, { readonly nested: { mode: string } }>
>;
type _04e = Expect<
  Equal<
    typeof explicitOptional,
    { readonly optional: string | undefined }
  >
>;

// ─── Arrays, tuples, and constraint mutability ──────────────────────────────

// 5. Construct the ordinary mutable-string-array capture signature.
export type OrdinaryMutableArraySignature =
  TODO; // TODO(koan)

declare const givenOrdinaryMutableArray: OrdinaryMutableArraySignature;
const ordinaryEmptyStrings = givenOrdinaryMutableArray([]);
const ordinaryOneString = givenOrdinaryMutableArray(["a"]);
const ordinaryTwoStrings = givenOrdinaryMutableArray(["a", "b"]);
const ordinaryAssertedTuple = givenOrdinaryMutableArray(
  ["a", "b"] as ["a", "b"],
);
type _05a = Expect<
  Equal<
    OrdinaryMutableArraySignature,
    <Items extends string[]>(items: Items) => Items
  >
>;
type _05b = Expect<Equal<typeof ordinaryEmptyStrings, never[]>>;
type _05c = Expect<Equal<typeof ordinaryOneString, string[]>>;
type _05d = Expect<Equal<typeof ordinaryTwoStrings, string[]>>;
type _05e = Expect<Equal<typeof ordinaryAssertedTuple, ["a", "b"]>>;

// 6. Construct the const capture under a mutable array constraint.
export type ConstMutableArraySignature =
  TODO; // TODO(koan)

declare const givenConstMutableArray: ConstMutableArraySignature;
const constMutableEmpty = givenConstMutableArray([]);
const constMutableOne = givenConstMutableArray(["a"]);
const constMutableTwo = givenConstMutableArray(["a", "b"]);
const constMutableVariable = givenConstMutableArray(givenMutableStrings);
type _06a = Expect<
  Equal<
    ConstMutableArraySignature,
    <const Items extends string[]>(items: Items) => Items
  >
>;
type _06b = Expect<Equal<typeof constMutableEmpty, []>>;
type _06c = Expect<Equal<typeof constMutableOne, ["a"]>>;
type _06d = Expect<Equal<typeof constMutableTwo, ["a", "b"]>>;
type _06e = Expect<Equal<typeof constMutableVariable, string[]>>;

// 7. Construct the const capture under a readonly array constraint.
export type ConstReadonlyArraySignature =
  TODO; // TODO(koan)

declare const givenConstReadonlyArray: ConstReadonlyArraySignature;
const constReadonlyEmpty = givenConstReadonlyArray([]);
const constReadonlyTwo = givenConstReadonlyArray(["a", "b"]);
const readonlyFromMutable = givenConstReadonlyArray(givenMutableStrings);
const readonlyFromReadonly = givenConstReadonlyArray(givenReadonlyStrings);
type _07a = Expect<
  Equal<
    ConstReadonlyArraySignature,
    <const Items extends readonly string[]>(items: Items) => Items
  >
>;
type _07b = Expect<Equal<typeof constReadonlyEmpty, readonly []>>;
type _07c = Expect<
  Equal<typeof constReadonlyTwo, readonly ["a", "b"]>
>;
type _07d = Expect<Equal<typeof readonlyFromMutable, string[]>>;
type _07e = Expect<
  Equal<typeof readonlyFromReadonly, readonly string[]>
>;

// 8. Project the element union from a const-inferred readonly tuple.
export type ConstArrayElementSignature =
  TODO; // TODO(koan)

declare const givenConstArrayElement: ConstArrayElementSignature;
const emptyElement = givenConstArrayElement([]);
const stringElements = givenConstArrayElement(["a", "b"]);
const mixedElements = givenConstArrayElement(["a", 1, true]);
const broadElement = givenConstArrayElement(givenReadonlyStrings);
type _08a = Expect<
  Equal<
    ConstArrayElementSignature,
    <const Items extends readonly unknown[]>(items: Items) => Items[number]
  >
>;
type _08b = Expect<Equal<typeof emptyElement, never>>;
type _08c = Expect<Equal<typeof stringElements, "a" | "b">>;
type _08d = Expect<Equal<typeof mixedElements, "a" | 1 | true>>;
type _08e = Expect<Equal<typeof broadElement, string>>;

// ─── Variadic const inference ────────────────────────────────────────────────

// 9. Construct a const rest signature that records string argument positions.
export type ConstPartsSignature =
  TODO; // TODO(koan)

declare const givenConstParts: ConstPartsSignature;
const noParts = givenConstParts();
const threeParts = givenConstParts("users", ":id", "settings");
const mixedParts = givenConstParts("users", givenDynamicPart);
const spreadMutableParts = givenConstParts(...givenMutableStrings);
type _09a = Expect<
  Equal<
    ConstPartsSignature,
    <const Parts extends readonly string[]>(...parts: Parts) => Parts
  >
>;
type _09b = Expect<Equal<typeof noParts, readonly []>>;
type _09c = Expect<
  Equal<typeof threeParts, readonly ["users", ":id", "settings"]>
>;
type _09d = Expect<
  Equal<typeof mixedParts, readonly ["users", string]>
>;
type _09e = Expect<Equal<typeof spreadMutableParts, string[]>>;

// 10. Construct a heterogeneous const rest signature.
export type ConstArgumentsSignature =
  TODO; // TODO(koan)

declare const givenConstArguments: ConstArgumentsSignature;
const mixedArguments = givenConstArguments("GET", 200, true);
const objectArguments = givenConstArguments(
  { id: 1 },
  { state: "ready" },
);
const spreadConstArguments = givenConstArguments(
  ...(["a", 1] as const),
);
type _10a = Expect<
  Equal<
    ConstArgumentsSignature,
    <const Items extends readonly unknown[]>(...items: Items) => Items
  >
>;
type _10b = Expect<
  Equal<typeof mixedArguments, readonly ["GET", 200, true]>
>;
type _10c = Expect<
  Equal<
    typeof objectArguments,
    readonly [
      { readonly id: 1 },
      { readonly state: "ready" },
    ]
  >
>;
type _10d = Expect<
  Equal<typeof spreadConstArguments, readonly ["a", 1]>
>;

// ─── Literal-preserving registries ──────────────────────────────────────────

type GivenRoute = { method: string; path: string };
const givenBroadRoutes: Record<string, GivenRoute> = givenWidenedRoutes;
const givenBroadRouteName: string = "home";
const givenBroadRoute: GivenRoute = { method: "GET", path: "/" };

// 11. Construct the const route-registry identity signature.
export type DefineRoutesSignature =
  TODO; // TODO(koan)

declare const givenDefineRoutes: DefineRoutesSignature;
const oneRoute = givenDefineRoutes({
  home: { method: "GET", path: "/" },
});
const detailedRoutes = givenDefineRoutes({
  users: { method: "GET", path: "/users" },
  create: { method: "POST", path: "/users", extra: "kept" },
});
const widenedRoutes = givenDefineRoutes(givenWidenedRoutes);
const broadRoutes = givenDefineRoutes(givenBroadRoutes);
type _11a = Expect<
  Equal<
    DefineRoutesSignature,
    <const Routes extends Record<string, GivenRoute>>(routes: Routes) => Routes
  >
>;
type _11b = Expect<
  Equal<
    typeof oneRoute,
    { readonly home: { readonly method: "GET"; readonly path: "/" } }
  >
>;
type _11c = Expect<
  Equal<
    typeof detailedRoutes,
    {
      readonly users: {
        readonly method: "GET";
        readonly path: "/users";
      };
      readonly create: {
        readonly method: "POST";
        readonly path: "/users";
        readonly extra: "kept";
      };
    }
  >
>;
type _11d = Expect<
  Equal<
    typeof widenedRoutes,
    { home: { method: string; path: string } }
  >
>;
type _11e = Expect<Equal<typeof broadRoutes, Record<string, GivenRoute>>>;

// 12. Project every preserved route method into a readonly registry.
export type RouteMethodsSignature =
  TODO; // TODO(koan)

declare const givenRouteMethods: RouteMethodsSignature;
const noMethods = givenRouteMethods({});
const oneMethod = givenRouteMethods({
  home: { method: "GET", path: "/" },
});
const severalMethods = givenRouteMethods({
  list: { method: "GET", path: "/items" },
  create: { method: "POST", path: "/items" },
});
const widenedMethods = givenRouteMethods(givenWidenedRoutes);
type _12a = Expect<
  Equal<
    RouteMethodsSignature,
    <const Routes extends Record<string, GivenRoute>>(
      routes: Routes,
    ) => { readonly [Name in keyof Routes]: Routes[Name]["method"] }
  >
>;
type _12b = Expect<Equal<typeof noMethods, {}>>;
type _12c = Expect<Equal<typeof oneMethod, { readonly home: "GET" }>>;
type _12d = Expect<
  Equal<
    typeof severalMethods,
    { readonly list: "GET"; readonly create: "POST" }
  >
>;
type _12e = Expect<
  Equal<typeof widenedMethods, { readonly home: string }>
>;

// 13. Pair an inferred route name with its preserved nested definition.
export type RouteEntrySignature =
  TODO; // TODO(koan)

declare const givenRouteEntry: RouteEntrySignature;
const homeEntry = givenRouteEntry(
  "home",
  { method: "GET", path: "/" },
);
const dynamicName: string = "dynamic";
const dynamicEntry = givenRouteEntry(
  dynamicName,
  { method: "PATCH", path: "/dynamic" },
);
const broadEntry = givenRouteEntry(givenBroadRouteName, givenBroadRoute);
const richEntry = givenRouteEntry(
  "create",
  { method: "POST", path: "/items", secure: true },
);
type _13a = Expect<
  Equal<
    RouteEntrySignature,
    <const Name extends string, const Route extends GivenRoute>(
      name: Name,
      route: Route,
    ) => readonly [Name, Route]
  >
>;
type _13b = Expect<
  Equal<
    typeof homeEntry,
    readonly [
      "home",
      { readonly method: "GET"; readonly path: "/" },
    ]
  >
>;
type _13c = Expect<
  Equal<
    typeof dynamicEntry,
    readonly [
      string,
      { readonly method: "PATCH"; readonly path: "/dynamic" },
    ]
  >
>;
type _13d = Expect<
  Equal<typeof broadEntry, readonly [string, GivenRoute]>
>;
type _13e = Expect<
  Equal<
    typeof richEntry,
    readonly [
      "create",
      {
        readonly method: "POST";
        readonly path: "/items";
        readonly secure: true;
      },
    ]
  >
>;

// ─── Constrained projections and special inputs ─────────────────────────────

// 14. Project a literal discriminant retained by a const constraint.
export type ConstDiscriminantSignature =
  TODO; // TODO(koan)

declare const givenConstDiscriminant: ConstDiscriminantSignature;
const inlineDiscriminant = givenConstDiscriminant({ kind: "ready" });
const variableDiscriminant = givenConstDiscriminant(givenWidenedObject);
const choiceDiscriminant = givenConstDiscriminant(
  givenCondition ? { kind: "left" } : { kind: "right" },
);
const richDiscriminant = givenConstDiscriminant({
  kind: "rich",
  nested: { ok: true },
});
type _14a = Expect<
  Equal<
    ConstDiscriminantSignature,
    <const Value extends { kind: string }>(value: Value) => Value["kind"]
  >
>;
type _14b = Expect<Equal<typeof inlineDiscriminant, "ready">>;
type _14c = Expect<Equal<typeof variableDiscriminant, string>>;
type _14d = Expect<
  Equal<typeof choiceDiscriminant, "left" | "right">
>;
type _14e = Expect<Equal<typeof richDiscriminant, "rich">>;

// 15. Construct a readonly property from two independently preserved arguments.
export type ConstPropertySignature =
  TODO; // TODO(koan)

declare const givenConstProperty: ConstPropertySignature;
const countProperty = givenConstProperty("count", 1);
const dynamicProperty = givenConstProperty(
  givenDynamicPart,
  { active: true },
);
const symbolProperty = givenConstProperty(givenSymbol, "secret");
const objectProperty = givenConstProperty(
  "config",
  { mode: "strict", levels: [1, 2] },
);
type _15a = Expect<
  Equal<
    ConstPropertySignature,
    <const Key extends PropertyKey, const Value>(
      key: Key,
      value: Value,
    ) => { readonly [Name in Key]: Value }
  >
>;
type _15b = Expect<
  Equal<typeof countProperty, { readonly count: 1 }>
>;
type _15c = Expect<
  Equal<
    typeof dynamicProperty,
    { readonly [name: string]: { readonly active: true } }
  >
>;
type _15d = Expect<
  Equal<
    typeof symbolProperty,
    { readonly [givenSymbol]: "secret" }
  >
>;
type _15e = Expect<
  Equal<
    typeof objectProperty,
    {
      readonly config: {
        readonly mode: "strict";
        readonly levels: readonly [1, 2];
      };
    }
  >
>;

// 16. Classify a const-inferred candidate without leaking `any`.
export type ConstKindSignature =
  TODO; // TODO(koan)

declare const givenConstKind: ConstKindSignature;
const ordinaryKind = givenConstKind({ value: 1 });
const anyKind = givenConstKind(givenAny);
const unknownKind = givenConstKind(givenUnknown);
const neverKind = givenConstKind(givenNever);
type _16a = Expect<
  Equal<
    ConstKindSignature,
    <const Value>(value: Value) => GivenKind<Value>
  >
>;
type _16b = Expect<Equal<typeof ordinaryKind, "ordinary">>;
type _16c = Expect<Equal<typeof anyKind, "any">>;
type _16d = Expect<Equal<typeof unknownKind, "unknown">>;
type _16e = Expect<Equal<typeof neverKind, "never">>;

// ─── Constructor and higher-arity variations ────────────────────────────────

// 17. Construct a generic constructor that preserves its inline argument.
export type ConstConstructorSignature =
  TODO; // TODO(koan)

declare const GivenConstConstructor: ConstConstructorSignature;
const constructedObject = new GivenConstConstructor({ kind: "ready" });
const constructedTuple = new GivenConstConstructor(["a", 1]);
const constructedVariable = new GivenConstConstructor(givenWidenedObject);
type _17a = Expect<
  Equal<
    ConstConstructorSignature,
    new <const Value>(value: Value) => { readonly value: Value }
  >
>;
type _17b = Expect<
  Equal<
    typeof constructedObject,
    { readonly value: { readonly kind: "ready" } }
  >
>;
type _17c = Expect<
  Equal<
    typeof constructedTuple,
    { readonly value: readonly ["a", 1] }
  >
>;
type _17d = Expect<
  Equal<
    typeof constructedVariable,
    { readonly value: { kind: string } }
  >
>;

// 18. Preserve two independent arguments in a readonly positional pair.
export type ConstPairSignature =
  TODO; // TODO(koan)

declare const givenConstPair: ConstPairSignature;
const primitivePair = givenConstPair("status", 200);
const objectPair = givenConstPair(
  { kind: "left" },
  { kind: "right", nested: [1, 2] },
);
const variablePair = givenConstPair(
  givenWidenedObject,
  { active: true },
);
const broadPair = givenConstPair(givenDynamicPart, 200 as number);
type _18a = Expect<
  Equal<
    ConstPairSignature,
    <const Left, const Right>(
      left: Left,
      right: Right,
    ) => readonly [Left, Right]
  >
>;
type _18b = Expect<
  Equal<typeof primitivePair, readonly ["status", 200]>
>;
type _18c = Expect<
  Equal<
    typeof objectPair,
    readonly [
      { readonly kind: "left" },
      {
        readonly kind: "right";
        readonly nested: readonly [1, 2];
      },
    ]
  >
>;
type _18d = Expect<
  Equal<
    typeof variablePair,
    readonly [{ kind: string }, { readonly active: true }]
  >
>;
type _18e = Expect<
  Equal<typeof broadPair, readonly [string, number]>
>;

// ─── Explicit selection boundary ────────────────────────────────────────────

// 19. Preserve an explicitly selected type exactly; const preference is bypassed.
export type ExplicitSelection<Selected> =
  TODO; // TODO(koan)

type _19a = Expect<Equal<ExplicitSelection<string>, string>>;
type _19b = Expect<Equal<ExplicitSelection<string[]>, string[]>>;
type _19c = Expect<
  Equal<ExplicitSelection<readonly string[]>, readonly string[]>
>;
type _19d = Expect<
  Equal<
    ExplicitSelection<{ kind: string }>,
    { kind: string }
  >
>;
type _19e = Expect<
  Equal<ExplicitSelection<"a" | "b">, "a" | "b">
>;
