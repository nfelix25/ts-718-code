import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { typedEnumerableKeys } from "./k-009-keyof-semantics.js";

/** K-009 edges: static key permission and runtime property discovery are different questions. */

// Group 1: Object.keys is narrower at runtime and less exact in its library type.
const edgeSymbol = Symbol("edge");
const edgeObject = { visible: 1, [edgeSymbol]: 2 };
const e001 = Object.keys(edgeObject);
const e002 = typedEnumerableKeys(edgeObject);
const numericObject = { 0: "zero", 1: "one" };
const e003 = Object.keys(numericObject);
const e004 = typedEnumerableKeys(numericObject);
const nonEnumerable = Object.defineProperty({ visible: true }, "hidden", { value: true });
const e005 = Object.keys(nonEnumerable);
const e006 = Reflect.ownKeys(nonEnumerable);
const inherited = Object.create({ inherited: true }) as { inherited: boolean; own: boolean };
inherited.own = true;
const e007 = Object.keys(inherited);
type E008 = keyof typeof edgeObject;
type E009 = keyof typeof numericObject;
type E010 = keyof typeof inherited;
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<E008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<E009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<E010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: the standard Object.keys return is string[] because runtime
// enumeration cannot promise the exact static key union for arbitrary objects.
type _SolvedObjectKeys = Expect<Equal<typeof e001, string[]>>;
// Demonstration B: our assertion-based helper exposes keyof T but symbols still
// do not appear at runtime, so this signature must not be read as exhaustiveness.
type _SolvedTypedKeys = Expect<Equal<typeof e002, Array<"visible" | typeof edgeSymbol>>>;
// Demonstration C: numeric source keys are emitted as strings by Object.keys.
type _SolvedNumericRuntime = Expect<Equal<typeof e003, string[]>>;
type _SolvedNumericStatic = Expect<Equal<E009, 0 | 1>>;
// Demonstration D: Reflect.ownKeys includes non-enumerable and symbol keys but
// its static result must still cover arbitrary PropertyKey values.
type _SolvedReflectKeys = Expect<Equal<typeof e006, (string | symbol)[]>>;

// Group 2: Special, primitive, class, and callable surfaces are not interchangeable.
type E011 = keyof any;
type E012 = keyof unknown;
type E013 = keyof never;
type E014 = keyof {};
type E015 = keyof object;
type E016 = "length" extends keyof string ? true : false;
type E017 = "toFixed" extends keyof number ? true : false;
type E018 = keyof (() => void);

class EdgeClass {
  static version = 1;
  public visible = true;
  protected guarded = true;
  private hidden = true;

  run(): void {}
}

type E019 = keyof EdgeClass;
type E020 = keyof typeof EdgeClass;
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

// Demonstration E: keyof any is the complete PropertyKey domain, while unknown
// guarantees no property and therefore has no usable key.
type _SolvedAnyKeys = Expect<Equal<E011, string | number | symbol>>;
type _SolvedUnknownKeys = Expect<Equal<E012, never>>;
// Demonstration F: never is the bottom source and keyof never is the broad key
// domain. This duality helps generic algebra remain consistent.
type _SolvedNeverKeys = Expect<Equal<E013, string | number | symbol>>;
// Demonstration G: the broad object types promise no specific named member.
type _SolvedEmptyKeys = Expect<Equal<E014, never>>;
type _SolvedObjectKeysNone = Expect<Equal<E015, never>>;
// Demonstration H: a bare call signature has no declared properties in its
// structural type, despite functions having properties at runtime.
type _SolvedCallableKeys = Expect<Equal<E018, never>>;
// Demonstration I: instance keys include only public instance members; static,
// private, and protected declarations are absent.
type _SolvedClassInstanceKeys = Expect<Equal<E019, "visible" | "run">>;

// Group 3: Union key guarantees respond to optionality and index signatures.
type E021 = keyof ({ shared?: string; a: 1 } | { shared: string; b: 2 });
type E022 = keyof ({ shared: string; a: 1 } & { shared?: string; b: 2 });
type E023 = keyof ({ a: 1 } | {});
type E024 = keyof ({ a?: 1 } | { a: 1 });
type E025 = keyof ({ [key: string]: unknown } | { fixed: true; other: false });
type E026 = keyof ({ [key: number]: unknown } | { 0: true; named: false });
type E027 = keyof ({ [key: symbol]: unknown } | { [edgeSymbol]: true; named: false });
type E028 = keyof ({ a: 1 } & unknown);
type E029 = keyof ({ a: 1 } | never);
type E030 = keyof ({ a: 1 } & never);
type _E021 = Expect<Equal<E021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<E022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<E023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<E024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<E025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<E026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<E027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<E028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<E029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<E030, TODO>>; // TODO(koan) @koan-error

// Demonstration J: optionality does not remove a key when every union member
// declares it; it only changes what later value lookup can produce.
type _SolvedOptionalCommon = Expect<Equal<E021, "shared">>;
type _SolvedOptionalSameKey = Expect<Equal<E024, "a">>;
// Demonstration K: an empty alternative removes every guaranteed key.
type _SolvedEmptyAlternative = Expect<Equal<E023, never>>;
// Demonstration L: unknown is an identity under intersection, while never is an
// identity under union and an annihilator whose keyof is the broad key domain.
type _SolvedUnknownIntersection = Expect<Equal<E028, "a">>;
type _SolvedNeverUnion = Expect<Equal<E029, "a">>;
type _SolvedNeverIntersection = Expect<Equal<E030, string | number | symbol>>;
