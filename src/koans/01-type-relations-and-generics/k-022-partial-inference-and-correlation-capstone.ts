import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-022: Partial inference and correlation capstone
 * =============================================================================
 *
 * Generic API design is often about deciding who chooses each type parameter.
 * TypeScript normally requires callers to provide either no type arguments or
 * every required one. It cannot accept a placeholder meaning "I will specify T;
 * please infer K." A default makes K omittable, but once T is explicit that
 * default is substituted rather than reopening inference for K.
 *
 * I read `<T, K extends keyof T = keyof T>` with explicit T aloud as:
 *
 *   "Use my T, then use K's default unless I also write K; do not infer K from
 *    later value arguments."
 *
 * Currying is the standard escape hatch: one call explicitly chooses T and
 * returns a fresh generic function whose K can be inferred by a later call.
 * `NoInfer` solves a different problem by making one value validate a domain
 * inferred elsewhere. Correlation requires equal care. `T[K]` is precise for a
 * literal K, but a union K produces a union of values. That is correct for reads;
 * for writes it may allow a value from one key branch beside another runtime key.
 * This capstone combines constraints, defaults, const inference, higher-order
 * functions, overload-era call design, and key/value relationships into APIs.
 */

export function pickFields<T, Key extends keyof T>(
  value: T,
  ...keys: Key[]
): Pick<T, Key> {
  const result = {} as Pick<T, Key>;
  for (const key of keys) result[key] = value[key];
  return result;
}

export function pickFieldsDefault<T, Key extends keyof T = keyof T>(
  value: T,
  ...keys: Key[]
): Pick<T, Key> {
  return pickFields(value, ...keys);
}

export function pickerFor<T>() {
  return <Key extends keyof T>(value: T, ...keys: Key[]): Pick<T, Key> =>
    pickFields(value, ...keys);
}

export function chooseMember<const Choices extends readonly string[]>(
  choices: Choices,
  fallback: NoInfer<Choices[number]>,
): Choices[number] {
  return choices.includes(fallback) ? fallback : choices[0]!;
}

export function mapField<T, Key extends keyof T, Result>(
  value: T,
  key: Key,
  transform: (field: T[Key]) => Result,
): Result {
  return transform(value[key]);
}

export function writeField<T, Key extends keyof T>(
  value: T,
  key: Key,
  field: T[Key],
): void {
  value[key] = field;
}

interface MainUser {
  id: number;
  name: string;
  active: boolean;
}
const mainUser: MainUser = { id: 1, name: "Ada", active: true };

// Part 1: All-inferred calls relate T and K naturally.
const mainIdPick = pickFields(mainUser, "id");
const mainNamePick = pickFields(mainUser, "name");
const mainIdentityPick = pickFields(mainUser, "id", "name");
const mainEmptyPick = pickFields(mainUser);
type _Main01 = Expect<Equal<typeof mainIdPick, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainNamePick, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainIdentityPick, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainEmptyPick, TODO>>; // TODO(koan) @koan-error

// Part 2: Explicit calls must supply every required type argument.
const mainExplicitId = pickFields<MainUser, "id">(mainUser, "id");
const mainExplicitIdentity = pickFields<MainUser, "id" | "name">(mainUser, "id", "name");
const mainExplicitAll = pickFields<MainUser, keyof MainUser>(mainUser, "id", "name", "active");
const mainExplicitNever = pickFields<MainUser, never>(mainUser);
type _Main05 = Expect<Equal<typeof mainExplicitId, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainExplicitIdentity, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainExplicitAll, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainExplicitNever, TODO>>; // TODO(koan) @koan-error

// Part 3: A default permits omission but does not mean "infer this slot later."
const mainDefaultInferred = pickFieldsDefault(mainUser, "id");
const mainDefaultAfterExplicitT = pickFieldsDefault<MainUser>(mainUser, "id");
const mainDefaultExplicitK = pickFieldsDefault<MainUser, "id">(mainUser, "id");
const mainDefaultNoKeys = pickFieldsDefault<MainUser>(mainUser);
type _Main09 = Expect<Equal<typeof mainDefaultInferred, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainDefaultAfterExplicitT, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainDefaultExplicitK, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainDefaultNoKeys, TODO>>; // TODO(koan) @koan-error

// Part 4: Currying stages explicit T before a fresh inferred K call.
const mainUserPicker = pickerFor<MainUser>();
const mainCurriedId = mainUserPicker(mainUser, "id");
const mainCurriedIdentity = mainUserPicker(mainUser, "id", "name");
const mainCurriedActive = mainUserPicker(mainUser, "active");
type _Main13 = Expect<Equal<typeof mainUserPicker, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainCurriedId, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainCurriedIdentity, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainCurriedActive, TODO>>; // TODO(koan) @koan-error

// Part 5: Domain validation and key-dependent transformations preserve relationships.
const mainChoice = chooseMember(["red", "green"] as const, "green");
const mainMappedId = mapField(mainUser, "id", (id) => id.toFixed());
const mainMappedName = mapField(mainUser, "name", (name) => name.length);
const mainMappedActive = mapField(mainUser, "active", (active) => !active);
type _Main17 = Expect<Equal<typeof mainChoice, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainMappedId, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainMappedName, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainMappedActive, TODO>>; // TODO(koan) @koan-error
