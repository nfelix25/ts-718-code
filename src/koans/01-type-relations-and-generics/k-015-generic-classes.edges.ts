import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { Box, Pair, Registry, Stack } from "./k-015-generic-classes.js";

/** K-015 edges: class arguments live on instances and matter only where structure uses them. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Instance and static sides expose different generic surfaces.
const e001 = new Box(1);
const e002 = Box.of(1);
const BoxConstructor = Box;
const e003 = new BoxConstructor("a");
const e004 = BoxConstructor.of(true);
type E005 = typeof Box;
type E006 = InstanceType<typeof Box<number>>;
type E007 = ConstructorParameters<typeof Box<number>>;
type E008 = ReturnType<typeof Box.of<string>>;
const e009 = new Pair(1, "a").swap();
const e010 = new Registry<string>();
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<E005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<E006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<E007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<E008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: an instantiation expression fixes the generic constructor
// before ConstructorParameters or InstanceType inspects it.
type _SolvedFixedInstance = Expect<Equal<E006, Box<number>>>;
type _SolvedFixedConstructorArgs = Expect<Equal<E007, [value: number]>>;
// Demonstration B: the static factory owns an independent method parameter and
// returns an ordinary instance family member.
type _SolvedStaticResult = Expect<Equal<E008, Box<string>>>;
class InvalidStatic<T> {
  // @ts-expect-error One shared static member cannot use an instance-specific T.
  static value: T;
}

// Group 2: Structural variance follows actual positions, including permissive methods.
class Animal { animal = true; }
class Dog extends Animal { dog = true; }
const dogBox = new Box(new Dog());
const e011: Box<Animal> = dogBox;
e011.set(new Animal());
const e012 = dogBox.get();

class StrictCell<T> {
  constructor(
    readonly get: () => T,
    readonly set: (value: T) => void,
  ) {}
}

class Phantom<T> {
  tag = "same";
}

const e013 = new StrictCell(() => new Dog(), (_dog: Dog) => {});
const e014 = new Phantom<number>();
const e015: Phantom<string> = e014;
class PrivateCell<T> {
  #value: T;
  constructor(value: T) { this.#value = value; }
  get(): T { return this.#value; }
}
const e016 = new PrivateCell(1);
const e017 = e016.get();
const e018 = new Stack<Dog>();
const e019: Stack<Animal> = e018;
const e020 = e019.pop();
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

// Demonstration C: class methods are checked bivariantly, so mutable Box appears
// covariant and permits an Animal write through a Box<Animal> view of dogBox.
type _SolvedPermissiveBox = Expect<Equal<typeof e012, Dog>>;
// Demonstration D: an unused phantom parameter has no structural effect, making
// different instantiations assignable.
type _SolvedPhantomView = Expect<Equal<typeof e015, Phantom<string>>>;
// Demonstration E: function properties engage strict parameter variance and make
// StrictCell invariant in practice.
// @ts-expect-error Dog-only setter cannot satisfy StrictCell<Animal>.
const strictAnimalCell: StrictCell<Animal> = e013;

// Group 3: Erasure and special arguments affect static views, not runtime identity.
const numberBox = new Box(1);
const stringBox = new Box("a");
const e021 = numberBox instanceof Box;
const e022 = stringBox instanceof Box;
const e023 = numberBox.constructor === stringBox.constructor;
const e024 = new Box<any>(1);
const e025 = e024.get();
const e026 = new Box<unknown>(1).get();
const e027 = new Box<never>(undefined as never).get();
const e028 = new Pair<any, unknown>(1, "a").swap();
const e029 = new Registry<never, string>();
const e030 = new Stack<never>().pop();
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<Kind<typeof e025>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<Kind<typeof e026>, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<Kind<typeof e027>, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration F: all instantiations share the same runtime constructor.
type _SolvedInstanceof = Expect<Equal<typeof e021, boolean>>;
type _SolvedConstructorEquality = Expect<Equal<typeof e023, boolean>>;
// Demonstration G: special type arguments propagate through instance methods.
type _SolvedAnyGet = Expect<Equal<Kind<typeof e025>, "any">>;
type _SolvedUnknownGet = Expect<Equal<Kind<typeof e026>, "unknown">>;
type _SolvedNeverGet = Expect<Equal<Kind<typeof e027>, "never">>;
// Demonstration H: pop adds runtime absence, so Stack<never>.pop normalizes to undefined.
type _SolvedNeverPop = Expect<Equal<typeof e030, undefined>>;
