import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type FieldDecorator,
  type FieldInitializer,
  type FieldReplacement,
  createDecoratedRecord,
} from "./k-163-field-decorators.js";

/** EDGE CASES: field values do not exist at decoration time, initializer types are invariant in practice, and context access can cross private/readonly syntax boundaries at runtime. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type Receiver = { value: number };
type NumberDecorator = FieldDecorator<Receiver, number>;
type NumberInitializer = FieldInitializer<Receiver, number>;
type BroadInput = (this: Receiver, initial: number | string) => number;
type NarrowInput = (this: Receiver, initial: 1) => number;
type WrongOutput = (this: Receiver, initial: number) => string;
type OptionalContext = ClassFieldDecoratorContext<Receiver, number | undefined>;
type RecordInstance = InstanceType<ReturnType<typeof createDecoratedRecord>>;

// Pre-solved demonstrations distinguish the undefined decoration value from the later initializer value.
type _DemoDecorationValue = Expect<Equal<Parameters<NumberDecorator>[0], undefined>>;
type _DemoInitializerValue = Expect<Equal<Parameters<NumberInitializer>, [initialValue: number]>>;
type _DemoPrivateHidden = Expect<Equal<"#secret" extends keyof RecordInstance ? true : false, false>>;
type _DemoFieldKind = Expect<Equal<ClassFieldDecoratorContext["kind"], "field">>;

// 1. Decoration time and initialization time expose different values (1-8)
type _01 = Expect<Equal<Parameters<NumberDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<NumberDecorator>[1]["kind"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<NumberInitializer>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<NumberInitializer>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ThisParameterType<NumberInitializer>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<FieldReplacement<NumberDecorator>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<FieldReplacement<() => void>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ClassFieldDecoratorContext["kind"], TODO>>; // TODO(koan) @koan-error

// 2. Initializer input/output compatibility remains strict (9-16)
type _09 = Expect<Equal<Extends<BroadInput, NumberInitializer>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<NarrowInput, NumberInitializer>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<WrongOutput, NumberInitializer>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<NumberInitializer, BroadInput>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<OptionalContext["access"]["set"]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<OptionalContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<FieldInitializer<Receiver, never>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<FieldInitializer<Receiver, unknown>, TODO>>; // TODO(koan) @koan-error

// 3. Access objects see private/static fields while declared keys do not (17-23)
type _17 = Expect<Equal<"#secret" extends keyof RecordInstance ? true : false, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<keyof RecordInstance, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ClassFieldDecoratorContext["name"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ClassFieldDecoratorContext["private"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ClassFieldDecoratorContext["static"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof ClassFieldDecoratorContext["access"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<ClassFieldDecoratorContext<unknown, unknown>["access"]["has"]>, TODO>>; // TODO(koan) @koan-error

// 4. Readonly declarations, symbol names, and special returns (24-30)
declare const fieldName: unique symbol;
type SymbolContext = ClassFieldDecoratorContext<Receiver, string> & { name: typeof fieldName };
type _24 = Expect<Equal<SymbolContext["name"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Parameters<SymbolContext["access"]["set"]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<FieldReplacement<() => never>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<IsAny<FieldReplacement<() => any>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<FieldReplacement<() => NumberInitializer | void>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Parameters<ClassFieldDecoratorContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<ClassFieldDecoratorContext["addInitializer"]>, TODO>>; // TODO(koan) @koan-error
