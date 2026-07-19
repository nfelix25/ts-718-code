import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-075: template union cross-products
 * =============================================================================
 *
 * A union in a template substitution slot means "choose each member." When a
 * template has several union slots, TypeScript combines every choice from the
 * first with every choice from the second, then the third, producing a
 * Cartesian product.
 *
 * I read `` `${Verb}:${Resource}` `` where each variable is a union as:
 *
 *   "For every Verb member and every Resource member, emit their colon-joined
 *    string. The result has |Verb| times |Resource| combinations."
 *
 * This is expansion, not correlation. `"get:user" | "set:post"` contains two
 * deliberate pairs; `` `${"get" | "set"}:${"user" | "post"}` `` contains all
 * four pairs. Duplicate strings normalize like any union. A `never` slot has
 * zero choices and annihilates the whole template. Broad segments preserve
 * fixed framing but describe an unbounded family. Cross-products are concise
 * and useful, but large products can create expensive unions; encode only
 * combinations the domain really permits.
 */

export type Pair<Left extends string, Right extends string> = `${Left}:${Right}`;
export type Triple<A extends string, B extends string, C extends string> = `${A}/${B}/${C}`;
export type EventName<Domain extends string, Action extends string> = `${Domain}.${Action}`;
export type LocaleKey<Locale extends string, Section extends string, Key extends string> =
  `${Locale}:${Section}.${Key}`;
export type BooleanState<Name extends string> = `${Name}:${boolean}`;

export function pair<const Left extends string, const Right extends string>(
  left: Left,
  right: Right,
): Pair<Left, Right> {
  return `${left}:${right}` as Pair<Left, Right>;
}

export function eventName<const Domain extends string, const Action extends string>(
  domain: Domain,
  action: Action,
): EventName<Domain, Action> {
  return `${domain}.${action}` as EventName<Domain, Action>;
}

export function localeKey<
  const Locale extends string,
  const Section extends string,
  const Key extends string,
>(locale: Locale, section: Section, key: Key): LocaleKey<Locale, Section, Key> {
  return `${locale}:${section}.${key}` as LocaleKey<Locale, Section, Key>;
}

export function booleanState<const Name extends string>(
  name: Name,
  enabled: boolean,
): BooleanState<Name> {
  return `${name}:${enabled}` as BooleanState<Name>;
}

// Part 1: one union slot expands once.
type _Main01 = Expect<Equal<`mode:${"read" | "write"}`, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Pair<"get" | "set", "user">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Pair<"get", "user" | "post">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<BooleanState<"cache">, TODO>>; // TODO(koan) @koan-error

// Part 2: two independent union slots multiply.
type _Main05 = Expect<Equal<Pair<"get" | "set", "user" | "post">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<EventName<"user" | "team", "created" | "deleted">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<`${1 | 2}-${"a" | "b"}`, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<`${boolean}/${boolean}`, TODO>>; // TODO(koan) @koan-error

// Part 3: three slots produce the product of all three member counts.
type _Main09 = Expect<Equal<Triple<"a" | "b", "x" | "y", "1" | "2">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<LocaleKey<"en" | "fr", "nav", "home" | "about">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<LocaleKey<"en" | "fr", "nav" | "footer", "title">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Triple<"only", "one", "path">, TODO>>; // TODO(koan) @koan-error

// Part 4: explicit full strings preserve correlation instead of multiplying.
type CorrelatedMain = "get:user" | "set:post";
type ProductMain = Pair<"get" | "set", "user" | "post">;
type _Main13 = Expect<Equal<CorrelatedMain, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ProductMain, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Exclude<ProductMain, CorrelatedMain>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Extract<ProductMain, CorrelatedMain>, TODO>>; // TODO(koan) @koan-error

// Part 5: zero choices and broad choices follow union algebra.
type _Main17 = Expect<Equal<Pair<never, "x" | "y">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Pair<"a" | "b", never>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Pair<string, "created" | "deleted">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Pair<"event", string>, TODO>>; // TODO(koan) @koan-error
