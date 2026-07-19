import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { enumerableValues, getProperty } from "./k-010-indexed-access-types.js";

/** K-010 edges: projected types follow the static contract, not every runtime accident. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Optional reads and checked dynamic reads are related but distinct.
type OptionalModel = { required: string; optional?: number; explicit: boolean | undefined };
type E001 = OptionalModel["required"];
type E002 = OptionalModel["optional"];
type E003 = OptionalModel["explicit"];
type E004 = OptionalModel["required" | "optional"];
type E005 = Required<OptionalModel>["optional"];
type E006 = Partial<OptionalModel>["required"];
const optionalValue: OptionalModel = { required: "x", explicit: undefined };
const e007 = getProperty(optionalValue, "required");
const e008 = getProperty(optionalValue, "optional");
const optionalKey: keyof OptionalModel = "required";
const e009 = getProperty(optionalValue, optionalKey);
const e010 = enumerableValues(optionalValue);
type _E001 = Expect<Equal<E001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<E002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<E003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<E004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<E005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<E006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: declaration-level optionality contributes undefined even
// before noUncheckedIndexedAccess considers unchecked dynamic operations.
type _SolvedOptionalRead = Expect<Equal<E002, number | undefined>>;
type _SolvedExplicitUndefined = Expect<Equal<E003, boolean | undefined>>;
// Demonstration B: Required removes optionality and, with exact optional
// semantics, leaves the declared number value type.
type _SolvedRequiredRead = Expect<Equal<E005, number>>;
// Demonstration C: a const key annotated broadly is currently narrowed by
// control flow, so this call selects only the required branch.
type _SolvedCurrentKey = Expect<Equal<typeof e009, string>>;

// Group 2: Not every apparent key is legal, and tuple bounds are checked eagerly.
type UnionObject = { shared: string; left: number } | { shared: string; right: boolean };
type E011 = UnionObject["shared"];
type E012 = ({ shared: "a"; left: number } | { shared: "b"; right: boolean })["shared"];
type E013 = ({ a: 1 } & { b: 2 })["a" | "b"];
type E014 = Record<string, number>[string];
type E015 = Record<string, number>[number];
type E016 = { [key: number]: string }[number];
type E017 = (readonly ["a", "b"])[0 | 1];
type E018 = (readonly ["a", "b"])[number];
type E019 = (readonly [head: "a", tail?: "b"])[1];
type E020 = (readonly [head: "a", ...tail: number[]])[number];
type _E011 = Expect<Equal<E011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<E012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<E013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<E014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<E015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<E016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<E017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<E018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<E019, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<E020, TODO>>; // TODO(koan) @koan-error

// Demonstration D: direct lookup on an object union is valid only for a key
// present in every member; the shared property's value alternatives are unioned.
type _SolvedUnionShared = Expect<Equal<E012, "a" | "b">>;
// Demonstration E: JavaScript stringifies numeric property access, so a string
// index signature also supplies a value for number indexing.
type _SolvedStringIndexNumber = Expect<Equal<E015, number>>;
// Demonstration F: optional tuple positions include undefined, while a number
// projection over a rest tuple unions the head and rest element types.
type _SolvedOptionalTuple = Expect<Equal<E019, "b" | undefined>>;
type _SolvedRestTuple = Expect<Equal<E020, "a" | number>>;

// @ts-expect-error left is not guaranteed on every member of the union.
type InvalidUnionLookup = UnionObject["left"];
// @ts-expect-error A fixed tuple has no position 2.
type InvalidTupleLookup = (readonly ["a", "b"])[2];
// @ts-expect-error unknown exposes no admissible key.
type InvalidUnknownLookup = unknown["x"];

// Group 3: Special types and all-values projection have distinct propagation rules.
type E021 = any["anything"];
type E022 = any[string];
type E023 = never["anything"];
type E024 = { a: 1; b: 2 }[never];
type E025 = { a: 1; b: 2 }[keyof { a: 1; b: 2 }];
type E026 = { a: never; b: string }[keyof { a: never; b: string }];
type E027 = { a?: never; b: string }[keyof { a?: never; b: string }];
type E028 = { [key: string]: unknown }[string];
type E029 = { [key: string]: any }[string];
declare const uniqueKey: unique symbol;
type E030 = { [uniqueKey]: "secret" }[typeof uniqueKey];
type _E021 = Expect<Equal<Kind<E021>, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<Kind<E022>, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<Kind<E023>, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<Kind<E024>, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<E025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<E026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<E027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<Kind<E028>, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<Kind<E029>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<E030, TODO>>; // TODO(koan) @koan-error

// Demonstration G: indexing any yields any, while using never as the key union
// yields never because no property was selected.
type _SolvedAnyLookup = Expect<Equal<Kind<E021>, "any">>;
type _SolvedNoSelectedKeys = Expect<Equal<Kind<E024>, "never">>;
// Demonstration H: never-valued members disappear from a value union, but an
// optional never member contributes undefined through possible absence.
type _SolvedNeverMember = Expect<Equal<E026, string>>;
type _SolvedOptionalNeverMember = Expect<Equal<E027, string | undefined>>;
// Demonstration I: unknown and any index signatures preserve their respective
// safety and escape-hatch behavior.
type _SolvedUnknownIndex = Expect<Equal<Kind<E028>, "unknown">>;
type _SolvedAnyIndex = Expect<Equal<Kind<E029>, "any">>;
// Demonstration J: unique-symbol identity participates in indexed access just
// like string and numeric literal identity.
type _SolvedUniqueSymbol = Expect<Equal<E030, "secret">>;
