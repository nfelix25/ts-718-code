import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 155 - XOR AND EXACTLY-ONE TYPES
 * =====================================
 *
 * Object unions are inclusive: a value containing every property can often
 * satisfy both members. Exclusive APIs must encode absence as well as presence.
 * Optional `never` properties say "this key may be omitted, but no value may be
 * supplied here" under exactOptionalPropertyTypes.
 *
 * Read `ExactlyOne<S, K>` aloud as: "choose each key in K in turn, require that
 * key, forbid every other key in K, preserve the non-choice fields, then union
 * all choices." XOR applies the same idea to the keys unique to two object
 * shapes. These types improve object-literal APIs; they do not validate unknown
 * runtime data.
 */

export type Normalize<Value> = {
  [Key in keyof Value]: Value[Key];
};

export type KeysOfUnion<Union> =
  Union extends unknown ? keyof Union : never;

export type Without<
  Shape,
  Allowed extends PropertyKey,
> = {
  [Key in Exclude<keyof Shape, Allowed>]?: never;
};

export type Xor<Left, Right> =
  Left extends object
    ? Right extends object
      ? Normalize<Left & Without<Right, keyof Left>>
        | Normalize<Right & Without<Left, keyof Right>>
      : Left | Right
    : Left | Right;

export type ExactlyOne<
  Shape,
  Keys extends keyof Shape = keyof Shape,
> = {
  [Chosen in Keys]-?: Normalize<
    Required<Pick<Shape, Chosen>>
    & Partial<Record<Exclude<Keys, Chosen>, never>>
    & Omit<Shape, Keys>
  >;
}[Keys];

export type AtMostOne<
  Shape,
  Keys extends keyof Shape = keyof Shape,
> =
  | ExactlyOne<Shape, Keys>
  | Normalize<Omit<Shape, Keys> & Partial<Record<Keys, never>>>;

export type ExclusiveUnion<
  Union,
  All = Union,
> = Union extends object
  ? Normalize<
      Union
      & Partial<Record<Exclude<KeysOfUnion<All>, keyof Union>, never>>
    >
  : Union;

export type Credentials = Xor<
  { token: string },
  { username: string; password: string }
>;

export type Contact = {
  label: string;
} & ExactlyOne<{
  email: string;
  phone: string;
  slack: string;
}>;

export type Destination = ExclusiveUnion<
  | { file: string; encoding?: "utf8" | "base64" }
  | { url: URL; headers?: Readonly<Record<string, string>> }
  | { stream: { write(chunk: string): void } }
>;

// Part 1: XOR forbids keys unique to the unchosen side.
type _01 = Expect<Equal<Extract<Credentials, { token: string }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<Credentials, { username: string }>["password"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KeysOfUnion<Credentials>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Without<{ username: string; password: string }, "username">, TODO>>; // TODO(koan) @koan-error

// Part 2: ExactlyOne maps each possible chosen key to one union member.
type ContactChoice = ExactlyOne<{ email: string; phone: string; slack: string }>;
type _05 = Expect<Equal<ContactChoice["email"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<ContactChoice, { email: string }>["phone"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KeysOfUnion<ContactChoice>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<Contact, { phone: string }>["label"], TODO>>; // TODO(koan) @koan-error

// Part 3: A subset of keys can be exclusive while common fields remain.
type Delivery = ExactlyOne<{
  id: string;
  email?: string;
  phone?: string;
}, "email" | "phone">;
type _09 = Expect<Equal<Extract<Delivery, { email: string }>["id"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<Delivery, { email: string }>["phone"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<AtMostOne<{ email: string; phone: string }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<AtMostOne<{ email: string; phone: string }>, { email?: never; phone?: never }>, TODO>>; // TODO(koan) @koan-error

// Part 4: ExclusiveUnion scales the absence rule beyond two variants.
type _13 = Expect<Equal<KeysOfUnion<Destination>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<Destination, { file: string }>["url"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<Destination, { url: URL }>["headers"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<Destination, { stream: object }>["file"], TODO>>; // TODO(koan) @koan-error

// Part 5: Runtime presence checks enforce the same boundary on unknown data.
type _17 = Expect<Equal<Parameters<typeof exactlyOnePresent>[1], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof exactlyOnePresent>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof parseContact>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof describeCredentials>[0], TODO>>; // TODO(koan) @koan-error

export function exactlyOnePresent(
  value: object,
  keys: readonly PropertyKey[],
): boolean {
  return keys.filter((key) => Object.hasOwn(value, key)).length === 1;
}

export function parseContact(value: unknown): Contact {
  if (typeof value !== "object" || value === null) {
    throw new TypeError("contact must be an object");
  }
  if (!Object.hasOwn(value, "label") || typeof (value as { label?: unknown }).label !== "string") {
    throw new TypeError("contact requires a label");
  }
  const keys = ["email", "phone", "slack"] as const;
  if (!exactlyOnePresent(value, keys)) {
    throw new TypeError("contact requires exactly one channel");
  }
  const selected = keys.find((key) => Object.hasOwn(value, key));
  if (selected === undefined || typeof (value as Record<PropertyKey, unknown>)[selected] !== "string") {
    throw new TypeError("contact channel must be a string");
  }
  return value as Contact;
}

export function describeCredentials(credentials: Credentials): string {
  return "token" in credentials
    ? `token:${credentials.token}`
    : `password:${credentials.username}`;
}
