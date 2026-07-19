import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  concatenate,
  convert,
  genericIdentity,
  lookup,
  makeDate,
  stringIdentity,
  type DateFactory,
  type FixedIdentity,
  type GenericIdentity,
} from "./k-021-overloads-and-call-signatures.js";

/** K-021 drills: resolve one public call signature, then separately inspect the overload set. */

// Group 1: Direct overload selection.
const d001 = convert("a");
const d002 = convert(1);
const d003 = convert(String("a"));
const d004 = convert(Number(1));
const text: string = "a";
const number: number = 1;
const d005 = convert(text);
const d006 = convert(number);
const d007: number = convert("a");
const d008: string = convert(1);
const convertString: (value: string) => number = convert;
const convertNumber: (value: number) => string = convert;
const d009 = convertString("a");
const d010 = convertNumber(1);
const d011 = ["a", "b"].map(convertString);
const d012 = [1, 2].map(convertNumber);
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

// Group 2: Generic overload calls infer their own element type.
const d013 = concatenate("a", "b");
const d014 = concatenate([1], [2]);
const d015 = concatenate(["a"], ["b"]);
const d016 = concatenate([true], [false]);
const d017 = concatenate([{ id: 1 }], [{ id: 2 }]);
const d018 = concatenate([1, 2] as const, [3, 4] as const);
const d019 = concatenate<number>([1], [2]);
const d020 = concatenate<string | number>([1], ["a"]);
const d021 = concatenate<unknown>([1], ["a"]);
const d022 = concatenate<never>([], []);
const leftNumbers: readonly number[] = [1, 2];
const d023 = concatenate(leftNumbers, [3]);
const d024 = concatenate<readonly [1, 2]>([[1, 2]], [[1, 2]]);
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

// Group 3: Specific versus fallback overloads.
const d025 = lookup("id");
const d026 = lookup("name");
const d027 = lookup("other");
const dynamic: string = "id";
const d028 = lookup(dynamic);
const finite: "id" | "name" = Math.random() ? "id" : "name";
const d029 = lookup(finite);
const d030 = lookup("id" as string);
const d031 = lookup(`field-${1}`);
const d032 = lookup(String("name"));
const d033: unknown = lookup("id");
const d034: number = lookup("id");
const d035: string = lookup("name");
const d036 = lookup("" as never);
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

// Group 4: Generic-per-call versus fixed-interface type parameters.
const d037 = genericIdentity(1);
const d038 = genericIdentity("a");
const d039 = genericIdentity(true);
const d040 = genericIdentity({ id: 1 });
const d041 = genericIdentity([1, 2] as const);
const d042 = genericIdentity<unknown>(1);
const d043 = stringIdentity("a");
const fixedNumber: FixedIdentity<number> = (value) => value;
const d044 = fixedNumber(1);
const anotherGeneric: GenericIdentity = genericIdentity;
const d045 = anotherGeneric({ active: true });
const fixedUnion: FixedIdentity<string | number> = (value) => value;
const d046 = fixedUnion(1);
const d047 = fixedUnion("a");
const d048: GenericIdentity = <T>(value: T) => value;
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

// Group 5: Callable interface calls and overload utility inspection.
const d049 = makeDate(0);
const d050 = makeDate("2020-01-01");
const dateFactory: DateFactory = makeDate;
const d051 = dateFactory(1);
const d052 = dateFactory("2020-01-01");
type D053 = Parameters<typeof convert>;
type D054 = ReturnType<typeof convert>;
type D055 = Parameters<typeof concatenate>;
type D056 = ReturnType<typeof concatenate>;
type D057 = Parameters<typeof lookup>;
type D058 = ReturnType<typeof lookup>;
type D059 = Parameters<DateFactory>;
type D060 = ReturnType<DateFactory>;
type _D049 = Expect<Equal<typeof d049, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<typeof d050, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<typeof d051, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<typeof d052, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<D053, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<D054, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<D055, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<D056, TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<D057, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<D058, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<D059, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<D060, TODO>>; // TODO(koan) @koan-error
