import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Comparable, SatisfiesSelf } from "./k-149-polymorphic-this-and-f-bounds.js";
import { Command, DeployCommand, Entity, Fluent, Priority, Version } from "./k-149-polymorphic-this-and-f-bounds.js";

/** EDGE CASES: detached receivers, inheritance, structural recursion, wrong self arguments, and escape types. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
class Child extends Command { child(): this { return this; } }
class Grandchild extends Child { grandchild(): this { return this; } }
type StructuralVersion = { value: number; compare: (other: StructuralVersion) => number };
type WrongComparable = { compare: (other: Version) => number };
class WrongEntity extends Entity<Version> { copy(): Version { return new Version(0); } }
type EntitySelf<Value> = Value extends Entity<infer Self> ? Self : never;

// Pre-solved demonstrations establish the two different self mechanisms.
type _DemoPolymorphic = Expect<Equal<ReturnType<DeployCommand["label"]>, DeployCommand>>;
type _DemoNoExplicitThis = Expect<Equal<ThisParameterType<DeployCommand["label"]>, unknown>>;
type _DemoFBound = Expect<Equal<SatisfiesSelf<Version>, true>>;
type _DemoWrongSelf = Expect<Equal<EntitySelf<WrongEntity>, Version>>;
// A detached label method is callable in its type but throws without a runtime receiver.

// 1. Extracted receiver methods and union reflection (1-8)
type _01 = Expect<Equal<ReturnType<Fluent["label"]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<Command["label"]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<DeployCommand["label"]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ThisParameterType<DeployCommand["label"]>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Parameters<DeployCommand["label"]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<DeployCommand["label"], (value: string) => DeployCommand>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<(Command | DeployCommand)["label"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<(Command | DeployCommand)["tap"]>[0], TODO>>; // TODO(koan) @koan-error

// 2. Inheritance keeps specializing polymorphic this (9-16)
type _09 = Expect<Equal<ReturnType<Child["label"]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<Grandchild["label"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<Child["child"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<Grandchild["child"]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ReturnType<Grandchild["grandchild"]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<ReturnType<Grandchild["label"]>, Child>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof ReturnType<Grandchild["label"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<Command["label"] | DeployCommand["to"]>, TODO>>; // TODO(koan) @koan-error

// 3. F-bounds are structural and may name a different self (17-23)
type _17 = Expect<Equal<SatisfiesSelf<Version>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<SatisfiesSelf<StructuralVersion>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<SatisfiesSelf<WrongComparable>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<EntitySelf<Version>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<EntitySelf<WrongEntity>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<WrongEntity, Entity<Version>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<WrongEntity, Entity<WrongEntity>>, TODO>>; // TODO(koan) @koan-error

// 4. any, never, unknown, and self-type unions (24-30)
type _24 = Expect<Equal<SatisfiesSelf<any>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<SatisfiesSelf<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<SatisfiesSelf<unknown>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<IsAny<EntitySelf<any>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<EntitySelf<never>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<SatisfiesSelf<Version | Priority>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<Version | Priority, Comparable<Version | Priority>>, TODO>>; // TODO(koan) @koan-error

