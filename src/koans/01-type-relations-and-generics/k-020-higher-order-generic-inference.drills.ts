import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  bindFirst,
  compose,
  lift,
  makeIdentity,
  preserveGeneric,
  toArray,
  toBox,
} from "./k-020-higher-order-generic-inference.js";

/** K-020 drills: decide whether each outer operation preserves, fixes, or erases polymorphism. */

// Group 1: Returned generic identities are instantiated at each call.
const identity = makeIdentity();
const d001 = identity(1);
const d002 = identity("a");
const d003 = identity(true);
const d004 = identity(1n);
const d005 = identity(null);
const d006 = identity(undefined);
const d007 = identity({ id: 1 });
const d008 = identity([1, 2]);
const d009 = identity([1, 2] as const);
const d010 = identity<unknown>(1);
const d011 = identity<never>(undefined as never);
const d012 = identity<string | number>(1);
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

// Group 2: Generic and concrete composition stages.
const boxedArray = compose(toArray, toBox);
const d013 = boxedArray(1);
const d014 = boxedArray("a");
const d015 = boxedArray(true);
const d016 = boxedArray({ id: 1 });
const d017 = boxedArray([1, 2] as const);
const arrayBox = compose(toBox, toArray);
const d018 = arrayBox(1);
const d019 = arrayBox("a");
const d020 = compose((value: number) => value * 2, String);
const d021 = compose((value: string) => value.length, (value) => value > 0);
const d022 = compose((value: { id: number }) => value.id, toArray);
const d023 = compose(toArray, (values) => values.length);
const d024 = compose(toBox, (box) => box.value);
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

// Group 3: Partial application preserves the unbound tuple.
const d025 = bindFirst((left: number, right: number) => left + right, 1);
const d026 = bindFirst((prefix: string, value: string) => prefix + value, "#");
const d027 = bindFirst((flag: boolean, yes: string, no: string) => flag ? yes : no, true);
const d028 = bindFirst((head: number, ...tail: string[]) => [head, ...tail], 1);
const d029 = bindFirst((record: { id: number }, key: "id") => record[key], { id: 1 });
const d030 = bindFirst((values: readonly number[], fallback: number) => values[0] ?? fallback, [1, 2]);
const d031 = d025(2);
const d032 = d026("a");
const d033 = d027("yes", "no");
const d034 = d028("a", "b");
const d035 = d029("id");
const d036 = d030(0);
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

// Group 4: Lifting scalar transforms into collection transforms.
const d037 = lift((value: number) => value * 2);
const d038 = lift((value: string) => value.length);
const d039 = lift((value: boolean) => !value);
const d040 = lift((value: { id: number }) => value.id);
const d041 = lift((value: number) => ({ value }));
const d042 = lift((value: string) => [value] as const);
const d043 = d037([1, 2]);
const d044 = d038(["a", "bb"]);
const d045 = d039([true, false]);
const d046 = d040([{ id: 1 }]);
const d047 = d041([1, 2]);
const d048 = d042(["a"]);
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

// Group 5: Generic function values, constraints, and instantiation expressions.
const d049 = preserveGeneric(identity);
const d050 = preserveGeneric(makeIdentity());
const d051 = d049(1);
const d052 = d049("a");
const d053 = d050({ id: 1 });
const stringIdentity = identity<string>;
const numberIdentity = identity<number>;
const d054 = stringIdentity("a");
const d055 = numberIdentity(1);
const d056: <T>(value: T) => T = identity;
const d057 = d056([1, 2] as const);
const unknownIdentity: (value: unknown) => unknown = identity;
const d058 = unknownIdentity(1);
const d059 = toArray<string>;
const d060 = d059("a");
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
