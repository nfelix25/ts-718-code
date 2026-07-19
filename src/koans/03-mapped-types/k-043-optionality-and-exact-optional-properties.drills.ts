import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-043 drills: repeat optional declarations, reads, utilities, narrowing, assignability, and runtime presence. */

type DOptional<T> = { [K in keyof T]+?: T[K] };
type DRequired<T> = { [K in keyof T]-?: T[K] };

// Group 1: Optional markers and explicit undefined produce distinct shapes.
type DAbsent = { value?: string };
type DExplicit = { value: string | undefined };
type DBoth = { value?: string | undefined };
type DRequiredShape = { value: string };
type _D001 = Expect<Equal<DAbsent, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<DExplicit, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<DBoth, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<DRequiredShape, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<DAbsent["value"], TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<DExplicit["value"], TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<DBoth["value"], TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<DRequiredShape["value"], TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<keyof DAbsent, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<keyof DExplicit, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<{} extends DAbsent ? true : false, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<{} extends DExplicit ? true : false, TODO>>; // TODO(koan) @koan-error

// Group 2: Partial and Required transform presence without normalizing values.
interface DSource { name: string; count: number | undefined; label?: string; note?: string | undefined }
type _D013 = Expect<Equal<Partial<DSource>, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<Required<DSource>, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<Partial<DSource>["name"], TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<Partial<DSource>["count"], TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<Required<DSource>["label"], TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<Required<DSource>["note"], TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<DOptional<DSource>, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<DRequired<DSource>, TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<DRequired<DOptional<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<DOptional<DRequired<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<Partial<Required<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<Required<Partial<DSource>>, TODO>>; // TODO(koan) @koan-error

// Group 3: Reads and guards reveal absence through undefined.
function drillReads(value: DSource) {
  const name = value.name;
  const count = value.count;
  const label = value.label;
  const note = value.note;
  type _D025 = Expect<Equal<typeof name, TODO>>; // TODO(koan) @koan-error
  type _D026 = Expect<Equal<typeof count, TODO>>; // TODO(koan) @koan-error
  type _D027 = Expect<Equal<typeof label, TODO>>; // TODO(koan) @koan-error
  type _D028 = Expect<Equal<typeof note, TODO>>; // TODO(koan) @koan-error
  if (value.label !== undefined) {
    type _D029 = Expect<Equal<typeof value.label, TODO>>; // TODO(koan) @koan-error
  }
  if ("label" in value) {
    type _D030 = Expect<Equal<typeof value.label, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D031 = Expect<Equal<typeof value.label, TODO>>; // TODO(koan) @koan-error
  }
  if (value.note !== undefined) {
    type _D032 = Expect<Equal<typeof value.note, TODO>>; // TODO(koan) @koan-error
  }
  const { label: defaulted = "none" } = value;
  type _D033 = Expect<Equal<typeof defaulted, TODO>>; // TODO(koan) @koan-error
  const optional = value.label?.length;
  type _D034 = Expect<Equal<typeof optional, TODO>>; // TODO(koan) @koan-error
  const fallback = value.label ?? "none";
  type _D035 = Expect<Equal<typeof fallback, TODO>>; // TODO(koan) @koan-error
  type _D036 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void drillReads;

// Group 4: Structural assignability reflects presence and present-value rules.
type _D037 = Expect<Equal<DAbsent extends DExplicit ? true : false, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<DExplicit extends DAbsent ? true : false, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<DRequiredShape extends DAbsent ? true : false, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<DAbsent extends DRequiredShape ? true : false, TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<DBoth extends DAbsent ? true : false, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<DAbsent extends DBoth ? true : false, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<DExplicit extends DBoth ? true : false, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<DBoth extends DExplicit ? true : false, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<Partial<DRequiredShape> extends DAbsent ? true : false, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<DAbsent extends Partial<DRequiredShape> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<Required<DAbsent> extends DRequiredShape ? true : false, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<DRequiredShape extends Required<DAbsent> ? true : false, TODO>>; // TODO(koan) @koan-error

// Group 5: Parameters, tuples, deletion, spreads, and keys expose related semantics.
function dOptionalParameter(value?: string) {
  type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type DTuple = [name?: string, count?: number | undefined];
type _D050 = Expect<Equal<DTuple, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<DTuple[0], TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<Required<DTuple>, TODO>>; // TODO(koan) @koan-error
const dMissing: DAbsent = {};
const dPresent: DBoth = { value: undefined };
type _D053 = Expect<Equal<typeof dMissing, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<typeof dPresent, TODO>>; // TODO(koan) @koan-error
const dSpreadMissing = { ...dMissing };
const dSpreadPresent = { ...dPresent };
type _D055 = Expect<Equal<typeof dSpreadMissing, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<typeof dSpreadPresent, TODO>>; // TODO(koan) @koan-error
const dHasMissing = "value" in dMissing;
const dHasPresent = "value" in dPresent;
type _D057 = Expect<Equal<typeof dHasMissing, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<typeof dHasPresent, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<Parameters<typeof dOptionalParameter>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<ReturnType<typeof dOptionalParameter>, TODO>>; // TODO(koan) @koan-error
