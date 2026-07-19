import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-001 guided drills: structural assignability
 * =============================================================================
 *
 * These repetitions train the direction of assignment. On the left of each
 * assignment is the contract I choose to rely on. On the right is the value I
 * already have. Replace each TODO with the static type of the resulting binding.
 */

interface IdOnly {
  id: string;
}

interface NamedOnly {
  name: string;
}

interface ActiveOnly {
  active: boolean;
}

interface Timestamped {
  createdAt: Date;
}

interface TwoNumbers {
  left: number;
  right: number;
}

declare const richUser: {
  id: string;
  name: string;
  active: boolean;
  email: string;
};

declare const richJob: {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
  retries: number;
};

// Group 1: Rich sources assigned to minimum contracts.
// Variation: the target asks for different subsets and member types.

const d001: IdOnly = richUser;
const d002: NamedOnly = richUser;
const d003: ActiveOnly = richUser;
const d004: IdOnly = richJob;
const d005: NamedOnly = richJob;
const d006: Timestamped = richJob;
const d007: { id: string; active: boolean } = richUser;
const d008: { name: string; email: string } = richUser;
const d009: { id: string; createdAt: Date } = richJob;
const d010: { active: boolean; retries: number } = richJob;
const d011: { name: string; createdAt: Date; retries: number } = richJob;
const d012: { id: string; name: string; active: boolean } = richUser;

type _D001 = Expect<Equal<typeof d001, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<typeof d002, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<typeof d003, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<typeof d004, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<typeof d005, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<typeof d006, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<typeof d007, TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<typeof d008, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<typeof d009, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<typeof d010, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<typeof d011, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<typeof d012, TODO>>; // TODO(koan) @koan-error

// Group 2: Annotation versus inference.
// Variation: an annotation narrows the visible contract; inference retains the
// declared source shape, including literal and readonly information.

const d013 = richUser;
const d014: IdOnly = richUser;
const d015: NamedOnly = richUser;
const d016 = richJob;
const d017: Timestamped = richJob;
const d018: { id: string; retries: number } = richJob;
const literalSource = { kind: "task" as const, priority: 1 as const, internal: true };
const d019 = literalSource;
const d020: { kind: "task" } = literalSource;
const d021: { priority: 1 } = literalSource;
const d022: { internal: boolean } = literalSource;
const pairSource = { left: 1, right: 2, label: "pair" };
const d023: TwoNumbers = pairSource;
const d024 = pairSource;

type _D013 = Expect<Equal<typeof d013, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<typeof d014, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<typeof d015, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<typeof d016, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<typeof d017, TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<typeof d018, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<typeof d019, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<typeof d020, TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<typeof d021, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<typeof d022, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<typeof d023, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<typeof d024, TODO>>; // TODO(koan) @koan-error

// Group 3: Optional members lower the minimum requirement.
// Variation: absent, required, optional, and required-plus-extra sources.

interface OptionalName {
  name?: string;
}

interface OptionalCount {
  count?: number;
}

interface OptionalPair {
  name?: string;
  count?: number;
}

declare const requiredName: { name: string; id: string };
declare const optionalName: { name?: string; id: string };
declare const requiredCount: { count: number; source: string };
declare const optionalPair: { name?: string; count?: number; debug: boolean };

const d025: OptionalName = {};
const d026: OptionalName = requiredName;
const d027: OptionalName = optionalName;
const d028: OptionalCount = {};
const d029: OptionalCount = requiredCount;
const d030: OptionalPair = requiredName;
const d031: OptionalPair = requiredCount;
const d032: OptionalPair = optionalPair;
const d033: { name?: string; id: string } = requiredName;
const d034: { count?: number; source: string } = requiredCount;
const d035: { name: string } = requiredName;
const d036: { count: number } = requiredCount;

type _D025 = Expect<Equal<typeof d025, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<typeof d026, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<typeof d027, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<typeof d028, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<typeof d029, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<typeof d030, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<typeof d031, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<typeof d032, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<typeof d033, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<typeof d034, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<typeof d035, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<typeof d036, TODO>>; // TODO(koan) @koan-error

// Group 4: Readonly is a permission on a reference.
// Variation: mutable sources, readonly sources, readonly targets, and literals.

interface MutablePoint {
  x: number;
  y: number;
}

interface ReadonlyPoint {
  readonly x: number;
  readonly y: number;
}

declare const mutablePoint: MutablePoint & { color: string };
declare const immutablePoint: ReadonlyPoint & { readonly color: string };

const d037: ReadonlyPoint = mutablePoint;
const d038: MutablePoint = mutablePoint;
const d039: ReadonlyPoint = immutablePoint;
const d040: MutablePoint = immutablePoint;
const d041 = immutablePoint;
const d042 = mutablePoint;
const readonlyLiteral = { x: 1, y: 2, tag: "fixed" } as const;
const d043: ReadonlyPoint = readonlyLiteral;
const d044: MutablePoint = readonlyLiteral;
const d045 = readonlyLiteral;
const d046: { readonly x: number } = mutablePoint;
const d047: { x: number } = immutablePoint;
const d048: { readonly y: number; readonly color: string } = immutablePoint;

type _D037 = Expect<Equal<typeof d037, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<typeof d038, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<typeof d039, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<typeof d040, TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<typeof d041, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<typeof d042, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<typeof d043, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<typeof d044, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<typeof d045, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<typeof d046, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<typeof d047, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<typeof d048, TODO>>; // TODO(koan) @koan-error

// Group 5: Methods, callable objects, and class instances are structures.
// Variation: independent declarations with compatible call and member shapes.

interface StringFormatter {
  format(value: string): string;
}

interface NumberParser {
  parse(value: string): number;
}

interface UnaryNumberFunction {
  (value: number): number;
}

declare const richFormatter: {
  format(value: string): string;
  locale: string;
};

declare const richParser: {
  parse(value: string): number;
  radix: number;
};

declare const callableWithMetadata: UnaryNumberFunction & { description: string };

class DrillCoordinate {
  x = 0;
  y = 0;
  label = "origin";
}

const drillCoordinate = new DrillCoordinate();
const d049: StringFormatter = richFormatter;
const d050 = richFormatter;
const d051: NumberParser = richParser;
const d052 = richParser;
const d053: UnaryNumberFunction = callableWithMetadata;
const d054 = callableWithMetadata;
const d055: { x: number; y: number } = drillCoordinate;
const d056: { label: string } = drillCoordinate;
const d057 = drillCoordinate;
const d058: { format(value: string): string } = richFormatter;
const d059: { parse(value: string): number } = richParser;
const d060: (value: number) => number = callableWithMetadata;

type _D049 = Expect<Equal<typeof d049, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<typeof d050, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<typeof d051, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<typeof d052, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<typeof d053, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<typeof d054, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<typeof d055, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<typeof d056, TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<typeof d057, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<typeof d058, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<typeof d059, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<typeof d060, TODO>>; // TODO(koan) @koan-error

// Group 6: Container structures compare their exposed element contracts.
// Variation: mutable arrays, readonly arrays, tuples, and string index signatures.

declare const numberTuple: readonly [1, 2, 3];
declare const mutableNumbers: number[];
declare const namedRecords: Array<{ id: string; name: string }>;
declare const stringRecord: { first: string; second: string; third: string };

const d061: readonly number[] = numberTuple;
const d062 = numberTuple;
const d063: readonly number[] = mutableNumbers;
const d064: number[] = mutableNumbers;
const d065: ReadonlyArray<{ id: string }> = namedRecords;
const d066: Array<{ id: string }> = namedRecords;
const d067: { readonly 0: 1; readonly 1: 2; readonly length: 3 } = numberTuple;
const d068: { [key: string]: string } = stringRecord;
const d069: { first: string } = stringRecord;
const d070 = stringRecord;

type _D061 = Expect<Equal<typeof d061, TODO>>; // TODO(koan) @koan-error
type _D062 = Expect<Equal<typeof d062, TODO>>; // TODO(koan) @koan-error
type _D063 = Expect<Equal<typeof d063, TODO>>; // TODO(koan) @koan-error
type _D064 = Expect<Equal<typeof d064, TODO>>; // TODO(koan) @koan-error
type _D065 = Expect<Equal<typeof d065, TODO>>; // TODO(koan) @koan-error
type _D066 = Expect<Equal<typeof d066, TODO>>; // TODO(koan) @koan-error
type _D067 = Expect<Equal<typeof d067, TODO>>; // TODO(koan) @koan-error
type _D068 = Expect<Equal<typeof d068, TODO>>; // TODO(koan) @koan-error
type _D069 = Expect<Equal<typeof d069, TODO>>; // TODO(koan) @koan-error
type _D070 = Expect<Equal<typeof d070, TODO>>; // TODO(koan) @koan-error
