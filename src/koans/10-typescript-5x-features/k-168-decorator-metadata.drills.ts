import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type MetadataAt,
  type MetadataBearingContext,
  type MetadataOf,
  type RouteEntry,
  type SerializableContext,
  captureMetadata,
  createMetadataHierarchy,
  createMetadataModel,
  ensureMetadataSymbol,
  metadataOf,
  route,
  routeMetadataKey,
  routesOf,
  serializable,
  serializableMetadataKey,
  serializableNamesOf,
  serializeMarked,
} from "./k-168-decorator-metadata.js";

/** GUIDED DRILLS: inspect metadata across context kinds, symbol-keyed unknown values, class-side lookup, decorator schemas, helper contracts, and inheritance surfaces. */

type MethodContext = ClassMethodDecoratorContext<
  { count: number },
  (delta: number) => number
>;
type GetterContext = ClassGetterDecoratorContext<{ count: number }, number>;
type SetterContext = ClassSetterDecoratorContext<{ count: number }, number>;
type FieldContext = ClassFieldDecoratorContext<{ label: string }, string>;
type AccessorContext = ClassAccessorDecoratorContext<{ count: number }, number>;
type ClassContext = ClassDecoratorContext<new () => { value: number }>;

// Metadata presence across every context kind (1-15)
type _01 = Expect<Equal<MethodContext["metadata"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<GetterContext["metadata"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<SetterContext["metadata"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<FieldContext["metadata"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<AccessorContext["metadata"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ClassContext["metadata"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<MetadataOf<MethodContext>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<MetadataOf<GetterContext>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<MetadataOf<FieldContext>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<MetadataOf<ClassContext>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<keyof MetadataOf<MethodContext>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<MethodContext["kind"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<FieldContext["kind"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<AccessorContext["kind"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ClassContext["kind"], TODO>>; // TODO(koan) @koan-error

// Keys and values before framework-specific narrowing (16-30)
type _16 = Expect<Equal<typeof serializableMetadataKey, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<typeof routeMetadataKey, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<MetadataAt<MethodContext, typeof routeMetadataKey>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<MetadataAt<FieldContext, typeof serializableMetadataKey>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<MetadataAt<AccessorContext, "label">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<MetadataAt<GetterContext, 0>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<MetadataBearingContext["name"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<MetadataBearingContext["metadata"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<keyof MetadataBearingContext, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<RouteEntry["name"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<RouteEntry["path"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<keyof RouteEntry, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<SerializableContext["kind"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<SerializableContext["name"], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<SerializableContext["metadata"], TODO>>; // TODO(koan) @koan-error

// Decorator and lookup helper contracts (31-45)
type _31 = Expect<Equal<Parameters<typeof ensureMetadataSymbol>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<ReturnType<typeof ensureMetadataSymbol>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Parameters<typeof serializable>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReturnType<typeof serializable>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Parameters<typeof route>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Parameters<ReturnType<typeof route>>[1]["kind"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<ReturnType<ReturnType<typeof route>>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Parameters<typeof captureMetadata>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ReturnType<ReturnType<typeof captureMetadata>>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Parameters<typeof metadataOf>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<ReturnType<typeof metadataOf>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Parameters<typeof serializableNamesOf>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ReturnType<typeof serializableNamesOf>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<typeof routesOf>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<ReturnType<typeof serializeMarked>, TODO>>; // TODO(koan) @koan-error

// Decorated model and hierarchy reflection (46-60)
type ProfileClass = ReturnType<typeof createMetadataModel>;
type Profile = InstanceType<ProfileClass>;
type Hierarchy = ReturnType<typeof createMetadataHierarchy>;
type BaseClass = Hierarchy["Base"];
type DerivedClass = Hierarchy["Derived"];
type _46 = Expect<Equal<ConstructorParameters<ProfileClass>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<keyof Profile, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Profile["name"], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Profile["age"], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Profile["secret"], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<Profile["load"]>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<Profile["load"]>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Function[typeof Symbol.metadata], TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<InstanceType<BaseClass>["base"], TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<keyof InstanceType<BaseClass>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<InstanceType<DerivedClass>["base"], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<InstanceType<DerivedClass>["derived"], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<keyof InstanceType<DerivedClass>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ReturnType<typeof createMetadataHierarchy>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<typeof Symbol.metadata, TODO>>; // TODO(koan) @koan-error
