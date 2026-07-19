import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { collect, copyList, first, last } from "./k-018-best-common-type.js";

/** K-018 drills: compare all sibling expressions, then decide array, union, or tuple. */

// Group 1: Homogeneous and mixed primitive arrays.
const d001 = [1, 2];
const d002 = [1, 2, 3, 4];
const d003 = ["a", "b"];
const d004 = [true, false];
const d005 = [1n, 2n];
const d006 = [Symbol.iterator, Symbol.asyncIterator];
const d007 = [1, "a"];
const d008 = [1, true];
const d009 = ["a", false];
const d010 = [1, "a", true];
const d011 = [null, undefined];
const d012 = [1, null, undefined];
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

// Group 2: Object candidate shapes.
const d013 = [{ id: 1 }, { id: 2 }];
const d014 = [{ active: true }, { active: false }];
const d015 = [{ id: 1 }, { id: 2, active: true }];
const d016 = [{ id: 1, active: true }, { id: 2 }];
const d017 = [{ left: 1 }, { right: 2 }];
const d018 = [{ kind: "a" as const }, { kind: "b" as const }];
const d019 = [{ nested: { id: 1 } }, { nested: { id: 2 } }];
const d020 = [{ value: 1 }, { value: "a" }];
const d021 = [{ callback: () => 1 }, { callback: () => 2 }];
const d022 = [new Date(0), new Date(1)];
const d023 = [/a/, /b/];
const d024 = [new Map<string, number>(), new Map<string, number>()];
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

// Group 3: Context supplies an element target.
const d025: number[] = [1, 2];
const d026: Array<string | number> = [1, "a"];
const d027: readonly (string | number)[] = [1, "a"];
const d028: Array<{ id: number }> = [{ id: 1 }, { id: 2 }];
const d029: Array<{ id: number; active?: boolean }> = [{ id: 1 }, { id: 2, active: true }];
const d030: ReadonlyArray<{ id: number }> = [{ id: 1 }];
const d031: [number, string] = [1, "a"];
const d032: readonly [number, string] = [1, "a"];
const d033: Array<unknown> = [1, "a", true];
const d034: Array<number | undefined> = [1, undefined];
const d035: Array<1 | 2> = [1, 2];
const d036: Array<"a" | "b"> = ["a", "b"];
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

// Group 4: Const assertions preserve positions instead of one array element type.
const d037 = [1, 2] as const;
const d038 = ["a", "b"] as const;
const d039 = [1, "a"] as const;
const d040 = [1, "a", true] as const;
const d041 = [{ id: 1 }, { id: 2 }] as const;
const d042 = [{ left: 1 }, { right: "r" }] as const;
const d043 = [] as const;
const d044 = copyList(d037);
const d045 = copyList(d039);
const d046 = first(d039);
const d047 = last(d040);
const d048 = copyList(d043);
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

// Group 5: Generic consumers observe the chosen element type.
const d049 = first([1, 2]);
const d050 = last(["a", "b"]);
const d051 = first([1, "a"]);
const d052 = last([1, "a", true]);
const d053 = collect(1, 2, 3);
const d054 = collect("a", "b");
const d055 = collect<string | number>(1, "a");
const d056 = copyList([1, "a"]);
const d057 = first<Array<number>>([[1], [2]]);
const d058 = last<{ id: number }>([{ id: 1 }, { id: 2 }]);
const d059 = copyList<unknown>([1, "a"]);
const d060 = collect<never>();
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
