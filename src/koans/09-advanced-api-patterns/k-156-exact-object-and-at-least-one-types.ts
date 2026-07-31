import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 156 - EXACT OBJECTS AND AT-LEAST-ONE TYPES
 * ================================================
 *
 * Structural assignability is intentionally open: a value may have more keys
 * than its target mentions. Excess-property checking is only a freshness check,
 * not an exact-object type. At a generic boundary we can compare the candidate's
 * keys with the allowed shape and turn every extra key into `never`.
 *
 * AtLeastOne solves a different problem. Read it aloud as: "choose each key in
 * the controlled subset in turn, require that key, make the remaining choices
 * optional, preserve all fields outside the subset, then union the choices."
 * Static exactness still does not validate unknown runtime objects.
 */

export type Normalize<Value> = {
  [Key in keyof Value]: Value[Key];
};

export type AtLeastOne<
  Shape,
  Keys extends keyof Shape = keyof Shape,
> = {
  [Chosen in Keys]-?: Normalize<
    Required<Pick<Shape, Chosen>>
    & Partial<Pick<Shape, Exclude<Keys, Chosen>>>
    & Omit<Shape, Keys>
  >;
}[Keys];

export type AllOrNone<
  Shape,
  Keys extends keyof Shape = keyof Shape,
> =
  | Normalize<Omit<Shape, Keys> & Required<Pick<Shape, Keys>>>
  | Normalize<Omit<Shape, Keys> & Partial<Record<Keys, never>>>;

export type ExtraKeys<Candidate, Shape> =
  Exclude<keyof Candidate, keyof Shape>;

export type Exact<
  Shape,
  Candidate extends Shape,
> = Candidate & Record<ExtraKeys<Candidate, Shape>, never>;

export type IsExactShape<Candidate, Shape> =
  [Candidate] extends [Shape]
    ? [ExtraKeys<Candidate, Shape>] extends [never]
      ? true
      : false
    : false;

export type UserPatch = AtLeastOne<{
  name?: string;
  email?: string;
  active?: boolean;
}>;

export type UpdateRequest = {
  readonly id: string;
} & AtLeastOne<{
  name?: string;
  email?: string;
  active?: boolean;
}>;

export type ConnectionConfig = {
  host: string;
  port: number;
  secure?: boolean;
};

// Part 1: AtLeastOne creates one member per possible required key.
type _01 = Expect<Equal<Extract<UserPatch, { name: string }>["email"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<UserPatch, { email: string }>["email"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof UserPatch, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<AtLeastOne<{ only?: number }>, TODO>>; // TODO(koan) @koan-error

// Part 2: Only a subset can participate while other fields remain required.
type ContactRequest = AtLeastOne<{
  id: string;
  email?: string;
  phone?: string;
}, "email" | "phone">;
type _05 = Expect<Equal<Extract<ContactRequest, { email: string }>["id"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<ContactRequest, { phone: string }>["email"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<UpdateRequest, { active: boolean }>["id"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<AtLeastOne<{ a?: 1; b?: 2 }, never>, TODO>>; // TODO(koan) @koan-error

// Part 3: Exactness compares candidate keys at a generic boundary.
type GoodConfig = { host: string; port: number; secure: true };
type ExtraConfig = GoodConfig & { debug: boolean };
type _09 = Expect<Equal<ExtraKeys<GoodConfig, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ExtraKeys<ExtraConfig, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<IsExactShape<GoodConfig, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsExactShape<ExtraConfig, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error

// Part 4: AllOrNone expresses grouped presence rather than a count.
type AuthHeaders = AllOrNone<{
  requestId: string;
  username?: string;
  password?: string;
}, "username" | "password">;
type _13 = Expect<Equal<Extract<AuthHeaders, { username: string }>["password"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<AuthHeaders, { username?: never }>["requestId"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof AuthHeaders, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<AllOrNone<{ token?: string }>, TODO>>; // TODO(koan) @koan-error

// Part 5: Static constructors and runtime parsers guard different boundaries.
type _17 = Expect<Equal<Parameters<typeof defineConnection>[0], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof defineConnection>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof parseUserPatch>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof parseUserPatch>, TODO>>; // TODO(koan) @koan-error

export function defineConnection<
  const Candidate extends ConnectionConfig,
>(
  config: Exact<ConnectionConfig, Candidate>,
): Candidate {
  return config;
}

export function parseUserPatch(value: unknown): UserPatch {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("patch must be an object");
  }
  const record = value as Record<PropertyKey, unknown>;
  const allowed = ["name", "email", "active"] as const;
  const keys = Reflect.ownKeys(record);
  if (keys.length === 0) throw new TypeError("patch requires at least one field");
  const extra = keys.find((key) => !allowed.includes(key as never));
  if (extra !== undefined) throw new TypeError(`unexpected patch key: ${String(extra)}`);
  if (Object.hasOwn(record, "name") && typeof record.name !== "string") {
    throw new TypeError("name must be a string");
  }
  if (Object.hasOwn(record, "email") && typeof record.email !== "string") {
    throw new TypeError("email must be a string");
  }
  if (Object.hasOwn(record, "active") && typeof record.active !== "boolean") {
    throw new TypeError("active must be a boolean");
  }
  return record as UserPatch;
}
