import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-025 edges: optionality, inheritance, and unlisted keys make existence subtler than ownership. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Optional properties remain possible on both sides.
type RequiredX = { kind: "required"; x: number };
type OptionalX = { kind: "optional"; x?: number };
type AbsentX = { kind: "absent"; y: string };
function edgeOptional(value: RequiredX | OptionalX | AbsentX) {
  if ("x" in value) {
    type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E002 = Expect<Equal<typeof value.x, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!("x" in value)) {
    type _E004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("y" in value) {
    type _E005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const unchanged = value;
  type _E006 = Expect<Equal<typeof unchanged, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _E007 = Expect<Equal<ReturnType<typeof edgeOptional>, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<keyof RequiredX, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<keyof OptionalX, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<keyof AbsentX, TODO>>; // TODO(koan) @koan-error

// Demonstration A: optional declarations inhabit both branches because runtime
// objects may carry or omit the property.
function solvedOptional(value: RequiredX | OptionalX | AbsentX) {
  if ("x" in value) {
    type _SolvedTrue = Expect<Equal<typeof value, RequiredX | OptionalX>>;
  } else {
    type _SolvedFalse = Expect<Equal<typeof value, OptionalX | AbsentX>>;
  }
}
void solvedOptional;
// Demonstration B: even with exactOptionalPropertyTypes enabled, this `in`
// check does not remove undefined from the type of an optional property read.
function solvedPresent(value: OptionalX) {
  if ("x" in value) {
    type _SolvedPresentValue = Expect<Equal<typeof value.x, number | undefined>>;
  }
}
void solvedPresent;

// Group 2: `in` includes prototypes; Object.hasOwn asks a different runtime question.
const plain = {};
const e011 = "toString" in plain;
const e012 = Object.hasOwn(plain, "toString");
const inherited = Object.create({ inherited: true }) as { inherited: boolean; own: boolean };
inherited.own = true;
const e013 = "inherited" in inherited;
const e014 = Object.hasOwn(inherited, "inherited");
const e015 = "own" in inherited;
const e016 = Object.hasOwn(inherited, "own");
const nullPrototype = Object.create(null) as object;
const e017 = "toString" in nullPrototype;
const e018 = "length" in [];
const e019 = "map" in [];
const e020 = "prototype" in function example() {};
type _E011 = Expect<Equal<typeof e011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof e012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof e013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof e014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof e015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof e016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof e019, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof e020, TODO>>; // TODO(koan) @koan-error

// Demonstration C: all existence and ownership operations return boolean; their
// runtime answers differ for inherited properties.
type _SolvedInBoolean = Expect<Equal<typeof e011, boolean>>;
type _SolvedOwnBoolean = Expect<Equal<typeof e012, boolean>>;
// Demonstration D: Object.hasOwn is not declared as a type predicate, so it does
// not replace the in operator's control-flow narrowing behavior.

// Group 3: Unknown, any, private fields, and operand restrictions.
function edgeUnknown(value: unknown) {
  if (typeof value === "object" && value !== null && "id" in value) {
    type _E021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E022 = Expect<Equal<typeof value.id, TODO>>; // TODO(koan) @koan-error
  }
  return value;
}
declare const edgeAny: any;
function edgeAnyValue(value: any) {
  if ("id" in value) {
    type _E023 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
    type _E024 = Expect<Equal<Kind<typeof value.id>, TODO>>; // TODO(koan) @koan-error
  }
  return value;
}

class Branded {
  #brand = true;
  static inspect(value: object) {
    if (#brand in value) {
      type _E025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value;
    }
    return undefined;
  }
}

const e026 = Branded.inspect(new Branded());
const e027 = Branded.inspect({});
const e028 = edgeUnknown({ id: 1 });
const e029 = edgeAnyValue(edgeAny);
const e030 = "id" in edgeAny;
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<Kind<typeof e028>, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<Kind<typeof e029>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration E: unlisted-property narrowing adds an unknown-valued record key.
function solvedUnlisted(value: object) {
  if ("id" in value) {
    type _SolvedId = Expect<Equal<typeof value.id, unknown>>;
  }
}
void solvedUnlisted;
// Demonstration F: a private-field in check is a brand check available only where
// that private name is lexically visible.
type _SolvedBrandResult = Expect<Equal<typeof e026, Branded | undefined>>;
// Demonstration G: any remains the escape hatch through an in guard.
type _SolvedAnyResult = Expect<Equal<Kind<typeof e029>, "any">>;

// @ts-expect-error Unknown must first be proven object-like before `in`.
function invalidUnknown(value: unknown) { return "id" in value; }
// @ts-expect-error The right operand cannot be a primitive.
const invalidPrimitive = "length" in "text";
// @ts-expect-error The left operand must be string, number, or symbol.
const invalidKey = ({}) in {};
