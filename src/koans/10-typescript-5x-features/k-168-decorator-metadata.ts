import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 168 - DECORATOR METADATA
 * ==============================
 *
 * TypeScript 5.2 added the standard decorator metadata protocol. Every
 * decorator involved in one class receives the same mutable metadata object as
 * `context.metadata`. After decoration finishes, that object is exposed on the
 * class at `Class[Symbol.metadata]`. Symbol keys give independent decorators
 * collision-resistant namespaces; values remain `unknown` until a framework
 * validates or asserts its own schema.
 *
 * This is not legacy `emitDecoratorMetadata`: standard metadata does not
 * automatically emit constructor or parameter design types. Decorators write
 * exactly the information their protocol defines.
 *
 * Metadata inheritance uses a prototype-linked object for a decorated subclass.
 * Mutable inherited values need copy-on-write handling, or a subclass decorator
 * can accidentally mutate the base class's arrays.
 *
 * Feature ownership: TypeScript 5.2's implementation and library types for the
 * standard ECMAScript decorator metadata proposal.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#decorator-metadata
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
 */

export const serializableMetadataKey = Symbol("serializable");
export const routeMetadataKey = Symbol("routes");

export type MetadataBearingContext = {
  readonly name: string | symbol | undefined;
  readonly metadata: DecoratorMetadata;
};

export type MetadataOf<Context extends MetadataBearingContext> =
  Context["metadata"];

export type MetadataAt<
  Context extends MetadataBearingContext,
  Key extends PropertyKey,
> = Context["metadata"][Key];

export type SerializableContext =
  | ClassFieldDecoratorContext
  | ClassGetterDecoratorContext
  | ClassAccessorDecoratorContext;

export type RouteEntry = {
  name: string | symbol;
  path: string;
};

export function ensureMetadataSymbol(): typeof Symbol.metadata {
  if (typeof Symbol.metadata === "undefined") {
    Object.defineProperty(Symbol, "metadata", {
      configurable: true,
      value: Symbol("Symbol.metadata"),
    });
  }
  return Symbol.metadata;
}

function copyOnWriteList<Item>(
  metadata: DecoratorMetadata,
  key: PropertyKey,
): Item[] {
  if (Object.hasOwn(metadata, key)) {
    return metadata[key] as Item[];
  }

  const inherited = metadata[key] as readonly Item[] | undefined;
  const own = inherited === undefined ? [] : [...inherited];
  metadata[key] = own;
  return own;
}

export function serializable(
  _value: unknown,
  context: SerializableContext,
): void {
  if (context.static || context.private || typeof context.name !== "string") {
    throw new TypeError("@serializable requires a public instance string name");
  }

  copyOnWriteList<string>(
    context.metadata,
    serializableMetadataKey,
  ).push(context.name);
}

export function route(path: string) {
  return function <This, Method extends (this: This, ...args: any[]) => any>(
    _value: Method,
    context: ClassMethodDecoratorContext<This, Method>,
  ): void {
    copyOnWriteList<RouteEntry>(
      context.metadata,
      routeMetadataKey,
    ).push({ name: context.name, path });
  };
}

export function captureMetadata(seen: object[]) {
  return function (
    _value: unknown,
    context: MetadataBearingContext,
  ): void {
    seen.push(context.metadata);
  };
}

export function metadataOf(classValue: Function): DecoratorMetadata | null {
  return classValue[Symbol.metadata];
}

export function serializableNamesOf(classValue: Function): readonly string[] {
  const metadata = metadataOf(classValue);
  return (
    metadata?.[serializableMetadataKey] as readonly string[] | undefined
  ) ?? [];
}

export function routesOf(classValue: Function): readonly RouteEntry[] {
  const metadata = metadataOf(classValue);
  return (
    metadata?.[routeMetadataKey] as readonly RouteEntry[] | undefined
  ) ?? [];
}

export function serializeMarked(instance: object): Record<string, unknown> {
  const names = serializableNamesOf(instance.constructor);
  const source = instance as Record<string, unknown>;
  return Object.fromEntries(names.map((name) => [name, source[name]]));
}

export function createMetadataModel(seen: object[] = []) {
  ensureMetadataSymbol();

  class Profile {
    @captureMetadata(seen)
    @serializable
    name = "Ada";

    @captureMetadata(seen)
    @serializable
    age = 36;

    secret = "not serialized";

    @captureMetadata(seen)
    @route("/profiles/:id")
    load(id: string): string {
      return id;
    }
  }

  return Profile;
}

export function createMetadataHierarchy() {
  ensureMetadataSymbol();

  class Base {
    @serializable
    base = "base";
  }

  class Derived extends Base {
    @serializable
    derived = "derived";
  }

  return { Base, Derived };
}

type MethodContext = ClassMethodDecoratorContext<
  { value: number },
  (delta: number) => number
>;
type FieldContext = ClassFieldDecoratorContext<{ value: number }, number>;

// Part 1: Every standard decorator context exposes the metadata object.
type _01 = Expect<Equal<MethodContext["metadata"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<FieldContext["metadata"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<MetadataOf<MethodContext>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof MetadataOf<MethodContext>, TODO>>; // TODO(koan) @koan-error

// Part 2: Metadata keys are property keys and unvalidated values are unknown.
type _05 = Expect<Equal<typeof serializableMetadataKey, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<typeof routeMetadataKey, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<MetadataAt<MethodContext, typeof routeMetadataKey>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<MetadataAt<FieldContext, "custom">, TODO>>; // TODO(koan) @koan-error

// Part 3: The class-side protocol is nullable until metadata exists.
type _09 = Expect<Equal<typeof Symbol.metadata, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Function[typeof Symbol.metadata], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof metadataOf>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof ensureMetadataSymbol>, TODO>>; // TODO(koan) @koan-error

// Part 4: Each decorator defines and narrows its own metadata schema.
type _13 = Expect<Equal<Parameters<typeof serializable>[1], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof serializable>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof route>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<ReturnType<typeof route>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Metadata helpers expose framework schemas, not design-time types.
type ProfileClass = ReturnType<typeof createMetadataModel>;
type Profile = InstanceType<ProfileClass>;
type _17 = Expect<Equal<ReturnType<typeof serializableNamesOf>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof routesOf>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof serializeMarked>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof Profile, TODO>>; // TODO(koan) @koan-error
