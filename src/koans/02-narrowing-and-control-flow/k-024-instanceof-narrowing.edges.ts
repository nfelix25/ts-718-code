import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { Animal, Cat, Circle, Dog } from "./k-024-instanceof-narrowing.js";

/** K-024 edges: structural class compatibility and prototype identity answer different questions. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Public classes admit structural lookalikes that fail the runtime test.
const realCircle = new Circle(2);
const structuralCircle: Circle = { kind: "circle", radius: 2, area: () => 4 };
const e001 = realCircle instanceof Circle;
const e002 = structuralCircle instanceof Circle;
const e003 = realCircle.constructor;
const e004 = structuralCircle.constructor;

function edgeStructural(value: Circle | { label: string }) {
  if (value instanceof Circle) {
    type _E005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  return value;
}
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<ReturnType<typeof edgeStructural>, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof structuralCircle, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof realCircle, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<keyof Circle, TODO>>; // TODO(koan) @koan-error

// Demonstration A: both bindings have static type Circle, so boolean result types
// cannot encode which runtime prototype each value actually carries.
type _SolvedRealBoolean = Expect<Equal<typeof e001, boolean>>;
type _SolvedStructuralBoolean = Expect<Equal<typeof e002, boolean>>;
type _SolvedLookalikeStatic = Expect<Equal<typeof structuralCircle, Circle>>;
// Demonstration B: instanceof is realm- and prototype-sensitive. Equivalent APIs
// from another realm may fail because their constructor objects differ.

// Group 2: Private identity and subclasses affect assignability and narrowing.
class SecretA {
  #secret = 1;
  read(): number { return this.#secret; }
}
class SecretB {
  #secret = 1;
  read(): number { return this.#secret; }
}

function edgePrivate(value: SecretA | SecretB | Dog | Cat | Date) {
  if (value instanceof SecretA) {
    type _E011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof SecretB) {
    type _E012 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Animal) {
    type _E013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Dog) {
    type _E014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Cat) {
    type _E015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (!(value instanceof Animal)) {
    type _E016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  return value;
}
const e017 = new Dog("Ada") instanceof Animal;
const e018 = new Cat("Lin") instanceof Animal;
const e019 = new Dog("Ada") instanceof Dog;
const e020 = new Animal("Base") instanceof Dog;
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof e019, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof e020, TODO>>; // TODO(koan) @koan-error

// Demonstration C: separately declared private fields make otherwise matching
// classes nominally incompatible.
// @ts-expect-error SecretB does not carry SecretA's private-field identity.
const invalidSecret: SecretA = new SecretB();
// Demonstration D: every subclass instance satisfies its base constructor.
type _SolvedDogAnimalCheck = Expect<Equal<typeof e017, boolean>>;
type _SolvedCatAnimalCheck = Expect<Equal<typeof e018, boolean>>;

// Group 3: Generic constructors, special types, and boxed primitives.
type Constructor<Instance> = abstract new (...args: any[]) => Instance;
function narrowWith<Instance>(value: unknown, ctor: Constructor<Instance>) {
  if (value instanceof ctor) {
    type _E021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return value;
  }
  return undefined;
}
const e022 = narrowWith(new Date(0), Date);
const e023 = narrowWith(new Circle(1), Circle);
const e024 = narrowWith("text", String);
const e025 = new String("text");
const e026 = e025 instanceof String;
declare const edgeAny: any;
const e027 = edgeAny instanceof Date;
declare const edgeUnknown: unknown;
const e028 = narrowWith(edgeUnknown, Date);
declare const edgeNever: never;
// @ts-expect-error A direct instanceof left operand must be object-like or any.
const e029 = edgeNever instanceof Date;
const e030 = narrowWith(edgeNever, Date);
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration E: a generic constructor guard returns the constructor's instance
// type plus absence when the runtime check fails.
type _SolvedGenericDate = Expect<Equal<typeof e022, Date | undefined>>;
type _SolvedGenericCircle = Expect<Equal<typeof e023, Circle | undefined>>;
// Demonstration F: primitive strings are not instances of the boxed String class.
type _SolvedBoxedString = Expect<Equal<typeof e025, String>>;
type _SolvedBoxedCheck = Expect<Equal<typeof e026, boolean>>;
// Demonstration G: once passed through the generic helper, the public return is
// still determined by its Date constructor argument and possible failed check.
type _SolvedNeverGeneric = Expect<Equal<Kind<typeof e030>, "ordinary">>;

// @ts-expect-error The right side of instanceof must provide a callable constructor relation.
const invalidRightSide = ({}) instanceof ({ prototype: {} });
