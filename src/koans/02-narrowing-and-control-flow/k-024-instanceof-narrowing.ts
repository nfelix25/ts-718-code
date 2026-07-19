import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-024: instanceof narrowing
 * =============================================================================
 *
 * `value instanceof Constructor` asks JavaScript whether Constructor.prototype
 * appears in value's prototype chain. TypeScript uses the true branch to retain
 * members compatible with the constructor's instance type and the false branch
 * to exclude them. This is runtime identity evidence, unlike ordinary structural
 * assignability.
 *
 * I read `value instanceof Date` aloud as:
 *
 *   "At runtime, Date.prototype is in value's prototype chain; along this path,
 *    expose the Date instance API."
 *
 * Subclasses satisfy checks for their base constructor. Built-ins such as Date,
 * Error, Map, Set, and boxed primitives participate through the same mechanism.
 * An object literal may be structurally assignable to a class with only public
 * members yet still fail `instanceof` because it has a different prototype.
 * Private/protected members add nominal identity to class assignability, but the
 * runtime operator itself always follows JavaScript. Values from another realm
 * can have equivalent APIs and still fail because their constructors and
 * prototypes are different objects.
 */

export class Circle {
  readonly kind = "circle";
  constructor(public radius: number) {}
  area(): number { return Math.PI * this.radius ** 2; }
}

export class Rectangle {
  readonly kind = "rectangle";
  constructor(public width: number, public height: number) {}
  area(): number { return this.width * this.height; }
}

export class Animal {
  constructor(public name: string) {}
  speak(): string { return this.name; }
}

export class Dog extends Animal {
  bark(): string { return "woof"; }
}

export class Cat extends Animal {
  meow(): string { return "meow"; }
}

export function formatDateOrText(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : value.toUpperCase();
}

export function errorMessage(value: Error | string): string {
  return value instanceof Error ? value.message : value;
}

export function shapeArea(value: Circle | Rectangle): number {
  return value instanceof Circle ? value.area() : value.area();
}

export function animalSound(value: Dog | Cat): string {
  return value instanceof Dog ? value.bark() : value.meow();
}

export function isRealCircle(value: Circle): boolean {
  return value instanceof Circle;
}

// Part 1: Built-in constructors expose their instance APIs.
function mainBuiltIn(value: Date | Error | string) {
  if (value instanceof Date) {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Error) {
    type _Main02 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "string") {
    type _Main03 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main04 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainBuiltIn;

// Part 2: User-defined classes narrow by constructor identity.
function mainShapes(value: Circle | Rectangle) {
  if (value instanceof Circle) {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main06 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Rectangle) {
    type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main08 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainShapes;

// Part 3: A base-class check keeps every compatible subclass.
function mainHierarchy(value: Dog | Cat | Date) {
  if (value instanceof Animal) {
    type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main10 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value instanceof Dog) {
    type _Main11 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main12 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainHierarchy;

// Part 4: Early returns accumulate constructor exclusions.
function mainReturns(value: Date | Error | RegExp) {
  if (value instanceof Date) return value.getTime();
  type _Main13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value instanceof Error) return value.message.length;
  type _Main14 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const remaining = value;
  type _Main15 = Expect<Equal<typeof remaining, TODO>>; // TODO(koan) @koan-error
  return remaining.source.length;
}
type _Main16 = Expect<Equal<ReturnType<typeof mainReturns>, TODO>>; // TODO(koan) @koan-error

// Part 5: unknown can be narrowed by a runtime constructor check.
function mainUnknown(value: unknown) {
  if (value instanceof Date) {
    type _Main17 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (value instanceof Map) {
    type _Main18 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (value instanceof Set) {
    type _Main19 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main20 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainUnknown;
