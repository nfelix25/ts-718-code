import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type MetadataAt,
  type MetadataBearingContext,
  type MetadataOf,
  type RouteEntry,
  createMetadataHierarchy,
  createMetadataModel,
  routeMetadataKey,
  serializableMetadataKey,
} from "./k-168-decorator-metadata.js";

/** EDGE CASES: metadata is shared but untyped, subclass objects inherit by prototype, mutable values need copy-on-write, symbol keys avoid collisions, and standard metadata emits no design types automatically. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type Context = ClassMethodDecoratorContext<
  { value: number },
  (input: string) => boolean
>;
type Metadata = MetadataOf<Context>;
type Hierarchy = ReturnType<typeof createMetadataHierarchy>;
type Profile = InstanceType<ReturnType<typeof createMetadataModel>>;

// Pre-solved demonstrations establish the typed protocol boundary.
type _DemoUnknownValue = Expect<Equal<MetadataAt<Context, "anything">, unknown>>;
type _DemoKeySpace = Expect<Equal<keyof Metadata, PropertyKey>>;
type _DemoClassLookup = Expect<Equal<Function[typeof Symbol.metadata], DecoratorMetadata | null>>;
type _DemoNoDesignTypes = Expect<Equal<Parameters<Profile["load"]>, [id: string]>>;

// 1. Record-style metadata accepts every property key but yields unknown (1-8)
type _01 = Expect<Equal<keyof Metadata, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Metadata[string], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Metadata[number], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Metadata[symbol], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<MetadataAt<Context, typeof routeMetadataKey>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<MetadataAt<Context, typeof serializableMetadataKey>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsAny<Metadata["x"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<Metadata["x"], unknown>, TODO>>; // TODO(koan) @koan-error

// 2. Class lookup is nullable and independent from instance declaration keys (9-16)
type ProfileClass = ReturnType<typeof createMetadataModel>;
type _09 = Expect<Equal<Function[typeof Symbol.metadata], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<NonNullable<Function[typeof Symbol.metadata]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ProfileClass[typeof Symbol.metadata], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof Symbol.metadata, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<keyof Profile, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<typeof serializableMetadataKey extends keyof Profile ? true : false, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<"metadata" extends keyof Profile ? true : false, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<MetadataBearingContext["metadata"], TODO>>; // TODO(koan) @koan-error

// 3. Inheritance affects runtime metadata objects, not subclass instance keys (17-23)
type BaseClass = Hierarchy["Base"];
type DerivedClass = Hierarchy["Derived"];
type Base = InstanceType<BaseClass>;
type Derived = InstanceType<DerivedClass>;
type _17 = Expect<Equal<keyof Base, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<keyof Derived, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Derived["base"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Derived["derived"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<BaseClass[typeof Symbol.metadata], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<DerivedClass[typeof Symbol.metadata], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<Derived, Base>, TODO>>; // TODO(koan) @koan-error

// 4. Schemas, symbol names, any, and absent context metadata stay deliberate (24-30)
declare const memberName: unique symbol;
type SymbolContext = Context & { name: typeof memberName };
type _24 = Expect<Equal<SymbolContext["name"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<RouteEntry["name"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<RouteEntry["path"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<MetadataOf<SymbolContext>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<MetadataOf<never>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsAny<MetadataOf<any>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<MetadataOf<MetadataBearingContext>, TODO>>; // TODO(koan) @koan-error
