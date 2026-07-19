import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  direct,
  firstValue,
  gather,
  inferFromConsumer,
  optionalValue,
  tapValue,
  unwrapBox,
  unwrapPayload,
} from "./k-006-parameter-site-inference.js";

/** K-006 drills: match argument structure against each T-bearing parameter site. */

// Group 1: Direct sites, varying freshness and explicit views.
const d001 = direct("a");
const d002 = direct(1);
const d003 = direct(true);
let dWideString = "a";
let dWideNumber = 1;
const d004 = direct(dWideString);
const d005 = direct(dWideNumber);
const d006 = direct("a" as "a" | "b");
const d007 = direct<string>("a");
const d008 = direct<unknown>("a");
const d009 = direct({ id: "a" });
const d010 = direct({ id: "a" } as const);
const d011 = direct([1, 2]);
const d012 = direct([1, 2] as const);
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

// Group 2: Nested object sites and depth.
const d013 = unwrapBox({ value: "a" });
const d014 = unwrapBox({ value: 1 });
const d015 = unwrapBox({ value: { id: "a" } });
const d016 = unwrapBox({ value: { id: "a" } } as const);
const d017 = unwrapBox({ value: [1, 2] });
const d018 = unwrapBox({ value: [1, 2] as const });
const d019 = unwrapPayload({ payload: "a", source: "x" });
const d020 = unwrapPayload({ payload: { ok: true }, source: "x" });
const d021 = unwrapPayload({ payload: { ok: true }, source: "x" } as const);
const d022 = unwrapPayload<string | number>({ payload: 1, source: "x" });
const d023 = unwrapBox<readonly string[]>({ value: ["a"] });
const d024 = unwrapPayload<Date>({ payload: new Date(0), source: "x" });
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

// Group 3: Element sites in mutable and readonly arrays.
const d025 = firstValue([1, 2]);
const d026 = firstValue(["a", "b"]);
const d027 = firstValue([true, false]);
const d028 = firstValue([1, "a"]);
const d029 = firstValue([1, 2] as const);
const d030 = firstValue(["a", "b"] as const);
const d031 = firstValue([]);
const d032 = firstValue<string>([]);
const d033 = firstValue([{ id: "a" }]);
const d034 = firstValue([{ id: "a" }] as const);
const d035 = firstValue<1 | 2 | 3>([1, 2]);
const d036 = firstValue<readonly [1, 2]>([[1, 2]]);
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

// Group 4: Value sites contextually type callback parameter sites.
const d037 = tapValue("a", (value) => value.length);
const d038 = tapValue(1, (value) => value.toFixed());
const d039 = tapValue(true, (value) => !value);
const d040 = tapValue({ id: "a" }, (value) => value.id);
const d041 = tapValue([1, 2], (value) => value.length);
const d042 = tapValue([1, 2] as const, (value) => value[1]);
const d043 = tapValue<string>("a", (value) => value.toUpperCase());
const d044 = tapValue<1 | 2>(1, (value) => value);
const d045 = inferFromConsumer((value: string) => value.length);
const d046 = inferFromConsumer((value: number) => value.toFixed());
const d047 = inferFromConsumer((value: { id: string }) => value.id);
const d048 = inferFromConsumer((value) => void value);
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
type _D048 = Expect<Equal<Parameters<typeof d048>[0], TODO>>; // TODO(koan) @koan-error

// Group 5: Optional and rest sites.
const d049 = optionalValue();
const d050 = optionalValue("a");
const d051 = optionalValue(1);
const d052 = optionalValue<string>();
const d053 = optionalValue<"a" | "b">("a");
const d054 = gather(1, 2, 3);
const d055 = gather("a", "b");
const d056 = gather(true, false);
const d057 = gather(1 as const, 2 as const);
const d058 = gather("a" as const, "b" as const);
const d059 = gather<string>();
const d060 = gather<readonly [1, 2]>([1, 2]);
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
