import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  duplicate,
  first,
  fromFactory,
  identity,
  makeBox,
  makePair,
  mapValue,
} from "./k-005-generic-function-inference.js";

/**
 * K-005 guided drills: generic function inference
 * =============================================================================
 *
 * Trace each call in three steps: locate every occurrence of a type parameter,
 * gather the static argument candidates at those positions, then substitute the
 * chosen type into the result. Variation comes from literal freshness, wrappers,
 * element positions, independent parameters, and callback-produced candidates.
 */

// Group 1: Direct identity candidates.

const d001 = identity("alpha");
const d002 = identity(1);
const d003 = identity(true);
const d004 = identity(1n);
const d005 = identity(null);
const d006 = identity(undefined);
let drillString = "alpha";
let drillNumber = 1;
let drillBoolean = true;
const d007 = identity(drillString);
const d008 = identity(drillNumber);
const d009 = identity(drillBoolean);
const d010 = identity<string>("alpha");
const d011 = identity<number>(1);
const d012 = identity<"a" | "b">("a");
const d013 = identity("a" as "a" | "b");
const d014 = identity(new Date(0));

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
type _D013 = Expect<Equal<typeof d013, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<typeof d014, TODO>>; // TODO(koan) @koan-error

// Group 2: Substitution into objects, boxes, and tuples.

const d015 = identity({ kind: "alpha" });
const d016 = identity({ kind: "alpha" } as const);
const d017 = identity([1, 2]);
const d018 = identity([1, 2] as const);
const d019 = makeBox("alpha");
const d020 = makeBox({ id: "a" });
const d021 = makeBox({ id: "a" } as const);
const d022 = makeBox([true, false]);
const d023 = duplicate("same");
const d024 = duplicate("same" as const);
const d025 = duplicate({ count: 1 });
const d026 = duplicate({ count: 1 } as const);
const d027 = makeBox<readonly [1, 2]>([1, 2]);
const d028 = identity<readonly string[]>(["a", "b"]);

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
type _D025 = Expect<Equal<typeof d025, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<typeof d026, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<typeof d027, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<typeof d028, TODO>>; // TODO(koan) @koan-error

// Group 3: Infer T from array and readonly-array element positions.

const d029 = first([1, 2, 3]);
const d030 = first(["a", "b"]);
const d031 = first([true, false]);
const d032 = first([1, "a"]);
const d033 = first([1, 2] as const);
const d034 = first(["a", "b"] as const);
const d035 = first([]);
const d036 = first<string>([]);
const d037 = first([{ id: "a" }, { id: "b" }]);
const d038 = first([{ kind: "a" }, { kind: "b", extra: true }]);
const d039 = first<1 | 2 | 3>([1, 2]);
const d040 = first<"a" | "b">(["a"]);
const readonlyDrillNumbers: readonly number[] = [1, 2];
const d041 = first(readonlyDrillNumbers);
const d042 = first([new Date(0)]);

type _D029 = Expect<Equal<typeof d029, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<typeof d030, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<typeof d031, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<typeof d032, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<typeof d033, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<typeof d034, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<typeof d035, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<typeof d036, TODO>>; // TODO(koan) @koan-error
type _D037 = Expect<Equal<typeof d037, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<typeof d038, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<typeof d039, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<typeof d040, TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<typeof d041, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<typeof d042, TODO>>; // TODO(koan) @koan-error

// Group 4: Independent Left and Right type parameters.

const d043 = makePair("a", 1);
const d044 = makePair(true, "yes");
const d045 = makePair(null, undefined);
const d046 = makePair({ id: "a" }, [1, 2]);
const d047 = makePair("a" as const, 1 as const);
const d048 = makePair([1, 2] as const, { ready: true } as const);
const d049 = makePair<string, number>("a", 1);
const d050 = makePair<"a" | "b", 1 | 2>("a", 1);
const d051 = makePair(identity("nested"), makeBox(2));
const d052 = makePair(makePair("a", 1), makePair(true, null));
const d053 = makePair(new Date(0), /koan/u);
const d054 = makePair<unknown, string>({ anything: true }, "known");
const d055 = makePair<readonly number[], readonly string[]>([1], ["a"]);
const d056 = makePair(() => 1, () => "a");

type _D043 = Expect<Equal<typeof d043, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<typeof d044, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<typeof d045, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<typeof d046, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<typeof d047, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<typeof d048, TODO>>; // TODO(koan) @koan-error
type _D049 = Expect<Equal<typeof d049, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<typeof d050, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<typeof d051, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<typeof d052, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<typeof d053, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<typeof d054, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<typeof d055, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<typeof d056, TODO>>; // TODO(koan) @koan-error

// Group 5: Callback input and output candidates.

const d057 = mapValue("abc", (value) => value.length);
const d058 = mapValue(3, (value) => String(value));
const d059 = mapValue(true, (value) => (value ? 1 : 0));
const d060 = mapValue({ id: "a" }, (value) => value.id);
const d061 = mapValue([1, 2], (value) => value.length);
const d062 = mapValue("x", () => ({ ok: true }));
const d063 = mapValue("x", () => ({ ok: true } as const));
const d064 = fromFactory(() => 1);
const d065 = fromFactory(() => 1 as const);
const d066 = fromFactory(() => ({ kind: "made" }));
const d067 = fromFactory(() => ({ kind: "made" } as const));
const d068 = fromFactory<string>(() => "wide");
const d069 = fromFactory<"exact">(() => "exact");
const d070 = mapValue<string, readonly [1, 2]>("x", () => [1, 2]);

type _D057 = Expect<Equal<typeof d057, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<typeof d058, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<typeof d059, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<typeof d060, TODO>>; // TODO(koan) @koan-error
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

// Group 6: Generic references and instantiation expressions.

const d071 = identity;
const d072 = identity<string>;
const d073 = identity<number>;
const d074 = makeBox;
const d075 = makeBox<boolean>;
const d076 = makePair;
const d077 = makePair<string, number>;
const d078 = duplicate;
const d079 = duplicate<Date>;
const d080 = first;
const d081 = first<string>;
const d082 = mapValue;
const d083 = mapValue<string, number>;
const d084 = fromFactory<readonly ["a", 1]>;

type _D071 = Expect<Equal<typeof d071, TODO>>; // TODO(koan) @koan-error
type _D072 = Expect<Equal<typeof d072, TODO>>; // TODO(koan) @koan-error
type _D073 = Expect<Equal<typeof d073, TODO>>; // TODO(koan) @koan-error
type _D074 = Expect<Equal<typeof d074, TODO>>; // TODO(koan) @koan-error
type _D075 = Expect<Equal<typeof d075, TODO>>; // TODO(koan) @koan-error
type _D076 = Expect<Equal<typeof d076, TODO>>; // TODO(koan) @koan-error
type _D077 = Expect<Equal<typeof d077, TODO>>; // TODO(koan) @koan-error
type _D078 = Expect<Equal<typeof d078, TODO>>; // TODO(koan) @koan-error
type _D079 = Expect<Equal<typeof d079, TODO>>; // TODO(koan) @koan-error
type _D080 = Expect<Equal<typeof d080, TODO>>; // TODO(koan) @koan-error
type _D081 = Expect<Equal<typeof d081, TODO>>; // TODO(koan) @koan-error
type _D082 = Expect<Equal<typeof d082, TODO>>; // TODO(koan) @koan-error
type _D083 = Expect<Equal<typeof d083, TODO>>; // TODO(koan) @koan-error
type _D084 = Expect<Equal<typeof d084, TODO>>; // TODO(koan) @koan-error
