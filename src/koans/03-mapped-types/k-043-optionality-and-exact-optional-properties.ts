import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-043: optionality and exact optional properties
 * =============================================================================
 *
 * With `exactOptionalPropertyTypes`, `value?: T` means the property may be
 * absent; when supplied, its declared value must be T. It does not silently mean
 * `value?: T | undefined`. This models the runtime difference between a missing
 * key and a present key whose value is undefined.
 *
 * I read `name?: string` aloud as:
 *
 *   "The object may omit name. If name is present, the written value is string."
 *
 * Reading still yields `string | undefined` because absence is observed as
 * undefined. Presence and value type are separate dimensions. `Partial<T>` adds
 * optional markers without adding undefined to declared values; `Required<T>`
 * removes markers without removing explicitly declared undefined. Equality
 * guards can narrow a read, while `in` and `Object.hasOwn` have their own control-
 * flow limitations. Optional parameters are a different language feature and
 * still accept an explicit undefined argument. At runtime, `in`, Object.keys,
 * spread, deletion, and serialization can all distinguish or expose presence.
 */

export interface Preferences {
  theme?: "light" | "dark";
  label?: string | undefined;
  retries: number | undefined;
}

export function hasTheme(value: Preferences): boolean {
  return "theme" in value;
}

export function themeOrDefault(value: Preferences): "light" | "dark" {
  return value.theme ?? "light";
}

export function mergePreferences(
  defaults: Required<Preferences>,
  update: Partial<Preferences>,
): Preferences {
  return { ...defaults, ...update };
}

export function clearTheme(value: Preferences): Preferences {
  const copy = { ...value };
  delete copy.theme;
  return copy;
}

export function ownKeys(value: Preferences): string[] {
  return Object.keys(value);
}

// Part 1: Declared presence and read-time undefined are separate facts.
type MainTheme = Preferences["theme"];
type MainLabel = Preferences["label"];
type MainRetries = Preferences["retries"];
type _Main01 = Expect<Equal<MainTheme, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainLabel, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainRetries, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<keyof Preferences, TODO>>; // TODO(koan) @koan-error

// Part 2: Partial adds absence; Required removes absence, preserving explicit undefined.
type MainPartial = Partial<Preferences>;
type MainRequired = Required<Preferences>;
type _Main05 = Expect<Equal<MainPartial, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainRequired, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainRequired["theme"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<MainRequired["label"], TODO>>; // TODO(koan) @koan-error

// Part 3: The mapped modifier changes presence, not the underlying declared union.
type MainOptional<T> = { [K in keyof T]+?: T[K] };
type MainConcrete<T> = { [K in keyof T]-?: T[K] };
type _Main09 = Expect<Equal<MainOptional<{ count: number }>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<MainConcrete<{ count?: number }>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainConcrete<{ count?: number | undefined }>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<MainOptional<{ count: number | undefined }>, TODO>>; // TODO(koan) @koan-error

// Part 4: Value checks narrow reads; presence checks do not rewrite declarations.
function mainNarrow(value: Preferences) {
  if (value.theme !== undefined) {
    type _Main13 = Expect<Equal<typeof value.theme, TODO>>; // TODO(koan) @koan-error
  }
  if ("theme" in value) {
    type _Main14 = Expect<Equal<typeof value.theme, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main15 = Expect<Equal<typeof value.theme, TODO>>; // TODO(koan) @koan-error
  }
  const { theme = "light" } = value;
  type _Main16 = Expect<Equal<typeof theme, TODO>>; // TODO(koan) @koan-error
}
void mainNarrow;

// Part 5: Optional and required-undefined shapes have different assignability.
type MainOptionalCount = { count?: number };
type MainRequiredUndefined = { count: number | undefined };
type MainRequiredCount = { count: number };
type _Main17 = Expect<Equal<MainOptionalCount extends MainRequiredUndefined ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainRequiredUndefined extends MainOptionalCount ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainRequiredCount extends MainOptionalCount ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MainOptionalCount extends Partial<MainRequiredCount> ? true : false, TODO>>; // TODO(koan) @koan-error

// @ts-expect-error Present undefined is not valid for theme?: Theme under exact optional semantics.
const invalidTheme: Preferences = { theme: undefined, retries: 1 };
