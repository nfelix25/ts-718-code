import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-001 edge cases: where "it has the members" needs qualification
 * =============================================================================
 *
 * Structural assignability is consistent, but several nearby checks make it
 * feel inconsistent: fresh object-literal checking, exact optional semantics,
 * readonly permissions, private/protected identity, weak types, index
 * signatures, and special broad object types. These cases are worth memorizing
 * because they shape real API boundaries.
 */

interface EdgeNamed {
  name: string;
}

function keepNamed(value: EdgeNamed): EdgeNamed {
  return value;
}

// Group 1: Fresh object literals receive an additional excess-property check.
// A value stored in a variable is compared by ordinary structural assignability.

const staleNamed = { name: "Ada", role: "admin" };
const e001: EdgeNamed = staleNamed;
const e002 = staleNamed;
const e003 = keepNamed(staleNamed);
const e004: EdgeNamed = { ...staleNamed };
const computedRole = "role" as const;
const computedNamed = { name: "Grace", [computedRole]: "operator" };
const e005: EdgeNamed = computedNamed;
const destructuredNamed: { name: string } = staleNamed;
const e006 = destructuredNamed.name;
const e007 = keepNamed(computedNamed).name;

type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error

// Demonstration A: the literal is "fresh", so the typo-catching check applies.
// @ts-expect-error `role` is not declared by EdgeNamed.
keepNamed({ name: "Ada", role: "admin" });

// Demonstration B: the same runtime shape is accepted after ordinary inference.
keepNamed(staleNamed);

// Demonstration C: missing and incompatible required members are always rejected.
// @ts-expect-error `name` is missing.
keepNamed({ role: "admin" });
// @ts-expect-error `name` must be a string.
keepNamed({ name: 42 });

type _SolvedFreshSource = Expect<
  Equal<typeof staleNamed, { name: string; role: string }>
>;
type _SolvedNarrowView = Expect<Equal<typeof e001, EdgeNamed>>;

// Group 2: With exactOptionalPropertyTypes, absent is not explicit undefined.

interface ExactOptionalName {
  name?: string;
}

declare const optionalSource: { name?: string; id: number };
declare const requiredSource: { name: string; id: number };

const e008: ExactOptionalName = {};
const e009: ExactOptionalName = requiredSource;
const e010: ExactOptionalName = optionalSource;
const e011 = e008.name;
const e012 = e009.name;
const e013: { name?: string; id: number } = requiredSource;

type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<typeof e011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof e012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof e013, TODO>>; // TODO(koan) @koan-error

// Demonstration D: `name?: string` means absent or present-with-string here.
// @ts-expect-error Explicit undefined is not a string under exact optional types.
const invalidExplicitUndefined: ExactOptionalName = { name: undefined };

type _SolvedOptionalRead = Expect<Equal<typeof e011, string | undefined>>;
type _SolvedRequiredToOptional = Expect<Equal<typeof e009, ExactOptionalName>>;

// Group 3: Readonly is checked less strictly for object properties than arrays.

interface MutableCell {
  value: number;
}

interface ReadonlyCell {
  readonly value: number;
}

const readonlyCell = { value: 1, nested: { count: 2 } } as const;
const mutableCell = { value: 1, nested: { count: 2 } };
const e014: MutableCell = readonlyCell;
const e015: ReadonlyCell = mutableCell;
const e016: ReadonlyCell = readonlyCell;
const e017 = readonlyCell.value;
const e018 = readonlyCell.nested;
const e019: { readonly nested: { readonly count: 2 } } = readonlyCell;

type _E014 = Expect<Equal<typeof e014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof e015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof e016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof e019, TODO>>; // TODO(koan) @koan-error

// Demonstration E: TypeScript allows a readonly object property through a
// mutable structural view. This is intentionally permissive and can be unsound.
const permissiveMutableView: MutableCell = readonlyCell;
permissiveMutableView.value = 2;

// Demonstration F: readonly arrays and tuples do prevent mutable assignment.
const readonlyTuple = [1, 2] as const;
// @ts-expect-error A readonly tuple cannot provide mutating array operations.
const mutableArray: number[] = readonlyTuple;

type _SolvedReadonlyLiteral = Expect<
  Equal<typeof readonlyCell, { readonly value: 1; readonly nested: { readonly count: 2 } }>
>;
type _SolvedShallowView = Expect<Equal<typeof e014, MutableCell>>;

// Group 4: Private and protected members introduce declaration identity.

class PrivateAlpha {
  private brand = "alpha";
  value = 1;
}

class PrivateBeta {
  private brand = "beta";
  value = 1;
}

class PublicAlpha {
  value = 1;
  label = "alpha";
}

class PublicBeta {
  value = 2;
  label = "beta";
}

const privateAlpha = new PrivateAlpha();
const publicBeta = new PublicBeta();
const e020: PrivateAlpha = privateAlpha;
const e021 = privateAlpha;
const e022: PublicAlpha = publicBeta;
const e023: { value: number } = privateAlpha;
const e024: { value: number; label: string } = publicBeta;

type _E020 = Expect<Equal<typeof e020, TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error

const privateBeta = new PrivateBeta();
// Demonstration G: same public shape, different private declaration origin.
// @ts-expect-error Private brands make these class instance types incompatible.
const privateMismatch: PrivateAlpha = privateBeta;

type _SolvedPublicStructural = Expect<Equal<typeof e022, PublicAlpha>>;
type _SolvedPrivatePublicView = Expect<Equal<typeof e023, { value: number }>>;

// Group 5: Index signatures, weak types, and broad object types.

type StringBag = { [key: string]: string };
interface WeakOptions {
  color?: string;
  size?: number;
}

const bagSource = { first: "one", second: "two" };
const e025: StringBag = bagSource;
const e026: { first: string } = bagSource;
const e027: {} = "non-null primitive";
const e028: object = () => 42;
const e029: unknown = { anything: true };
const e030: { readonly [key: string]: unknown } = bagSource;

type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration H: every explicit member must satisfy an index signature.
// @ts-expect-error `count` is not a string.
const invalidBag: StringBag = { first: "one", count: 2 };

const unrelatedOptions = { width: 100 };
// Demonstration I: all-optional "weak" targets reject stale sources with no
// properties in common, even though all target properties are optional.
// @ts-expect-error No properties overlap with WeakOptions.
const weakMismatch: WeakOptions = unrelatedOptions;

// Demonstration J: `{}` means any non-nullish value, not an empty object.
const broadEmptyObject: {} = 42;
// @ts-expect-error null is excluded from `{}` under strict null checks.
const nullEmptyObject: {} = null;

// Demonstration K: `object` excludes primitives but includes functions.
// @ts-expect-error A string primitive is not assignable to object.
const primitiveObject: object = "text";

type _SolvedBagView = Expect<Equal<typeof e025, StringBag>>;
type _SolvedUnknownView = Expect<Equal<typeof e029, unknown>>;

// Group 6: Structural comparison also applies to functions and built-ins.

interface IsoFormattable {
  toISOString(): string;
}

interface ValueBox {
  value: number;
}

class FirstBox {
  static category = "first";
  value = 1;
}

class SecondBox {
  static category = "second";
  value = 2;
}

const unary = (value: number): string => String(value);
const e031: IsoFormattable = new Date(0);
const e032: (value: number, radix: number) => string = unary;
const e033: FirstBox = new SecondBox();
const e034: ValueBox = new FirstBox();
const dualSource = { left: 1, right: "two", ignored: true };
const e035: { left: number } & { right: string } = dualSource;

type _E031 = Expect<Equal<typeof e031, TODO>>; // TODO(koan) @koan-error
type _E032 = Expect<Equal<typeof e032, TODO>>; // TODO(koan) @koan-error
type _E033 = Expect<Equal<typeof e033, TODO>>; // TODO(koan) @koan-error
type _E034 = Expect<Equal<typeof e034, TODO>>; // TODO(koan) @koan-error
type _E035 = Expect<Equal<typeof e035, TODO>>; // TODO(koan) @koan-error

// Demonstration L: a function may ignore trailing arguments supplied by callers.
type _SolvedFewerParameters = Expect<
  Equal<typeof e032, (value: number, radix: number) => string>
>;

// Demonstration M: instance compatibility ignores unrelated static members.
type _SolvedClassInstance = Expect<Equal<typeof e033, FirstBox>>;
type _SolvedIntersectionView = Expect<
  Equal<typeof e035, { left: number } & { right: string }>
>;
