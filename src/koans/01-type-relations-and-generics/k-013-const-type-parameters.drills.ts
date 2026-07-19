import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  captureConst,
  captureConstMutableArray,
  captureConstReadonlyArray,
  captureOrdinary,
  captureParts,
  defineRoutes,
} from "./k-013-const-type-parameters.js";

/** K-013 drills: compare ordinary and const inference on the same call-site shapes. */

// Group 1: Primitive and union-like expressions.
const d001 = captureOrdinary("a");
const d002 = captureConst("a");
const d003 = captureOrdinary(1);
const d004 = captureConst(1);
const d005 = captureOrdinary(true);
const d006 = captureConst(true);
const d007 = captureOrdinary(1n);
const d008 = captureConst(1n);
const d009 = captureOrdinary(Symbol.iterator);
const d010 = captureConst(Symbol.iterator);
const condition = true as boolean;
const d011 = captureOrdinary(condition ? "a" : "b");
const d012 = captureConst(condition ? "a" : "b");
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

// Group 2: Object property and nested-structure preservation.
const d013 = captureOrdinary({ kind: "a" });
const d014 = captureConst({ kind: "a" });
const d015 = captureOrdinary({ count: 1, active: true });
const d016 = captureConst({ count: 1, active: true });
const d017 = captureOrdinary({ nested: { mode: "strict" } });
const d018 = captureConst({ nested: { mode: "strict" } });
const d019 = captureOrdinary({ list: [1, 2] });
const d020 = captureConst({ list: [1, 2] });
const d021 = captureOrdinary({ tuple: ["a", 1] as const });
const d022 = captureConst({ tuple: ["a", 1] as const });
const d023 = captureOrdinary({ optional: undefined as string | undefined });
const d024 = captureConst({ optional: undefined as string | undefined });
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

// Group 3: Arrays, tuples, and constraint compatibility.
const d025 = captureOrdinary([]);
const d026 = captureConst([]);
const d027 = captureOrdinary([1]);
const d028 = captureConst([1]);
const d029 = captureOrdinary(["a", "b"]);
const d030 = captureConst(["a", "b"]);
const d031 = captureOrdinary(["a", 1, true]);
const d032 = captureConst(["a", 1, true]);
const d033 = captureConstMutableArray(["a"]);
const d034 = captureConstMutableArray(["a", "b"]);
const d035 = captureConstReadonlyArray(["a"]);
const d036 = captureConstReadonlyArray(["a", "b"]);
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

// Group 4: Const rest inference records argument positions.
const d037 = captureParts();
const d038 = captureParts("a");
const d039 = captureParts("a", "b");
const d040 = captureParts("a", "b", "c");
const part: string = "dynamic";
const d041 = captureParts(part);
const d042 = captureParts("a", part);
const d043 = captureParts(...(["a", "b"] as const));
const d044 = captureParts(...["a", "b"]);
const d045 = captureParts("users", ":id");
const d046 = captureParts("GET", "/users");
const d047 = captureParts<readonly ["a", "b"]>("a", "b");
const d048 = captureParts<readonly string[]>("a", "b");
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

// Group 5: Validated object registries preserve names and nested fields.
const d049 = defineRoutes({ home: { method: "GET", path: "/" } });
const d050 = defineRoutes({ create: { method: "POST", path: "/items" } });
const d051 = defineRoutes({ a: { method: "GET", path: "/a" }, b: { method: "GET", path: "/b" } });
const d052 = defineRoutes({ home: { method: "GET", path: "/", extra: "kept" } });
const routeVariable = { home: { method: "GET", path: "/" } };
const d053 = defineRoutes(routeVariable);
const d054 = defineRoutes({ home: { method: String("GET"), path: "/" } });
const d055 = defineRoutes<Record<string, { method: string; path: string }>>({ home: { method: "GET", path: "/" } });
const d056 = defineRoutes({ numeric: { method: "GET", path: `/items/${1}` } });
const d057 = defineRoutes({ empty: { method: "", path: "" } });
const d058 = defineRoutes({ nested: { method: "PATCH", path: "/nested" } } as const);
const d059 = captureConst(d049.home);
const d060 = captureOrdinary(d049.home);
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
