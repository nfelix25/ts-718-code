import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  checkedDefault,
  createMachine,
  looseDefault,
  mapWithFallback,
  preferPrimary,
} from "./k-014-noinfer.js";

/** K-014 drills: identify authoritative candidate sites and validation-only sites. */

// Group 1: Loose defaults collect candidates from both arguments.
const d001 = looseDefault(["a"] as const, "a");
const d002 = looseDefault(["a"] as const, "b");
const d003 = looseDefault(["a", "b"] as const, "a");
const d004 = looseDefault(["a", "b"] as const, "c");
const d005 = looseDefault(["red", "green"] as const, "blue");
const d006 = looseDefault(["on"] as const, "off");
const d007 = looseDefault(["small", "large"] as const, "medium");
const d008 = looseDefault(["x", "y", "z"] as const, "z");
const d009 = looseDefault(["a", "b"], "c");
const broadChoices: string[] = ["a"];
const d010 = looseDefault(broadChoices, "b");
const d011 = looseDefault<string>(["a"], "b");
const d012 = looseDefault<"a" | "b">(["a"], "b");
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

// Group 2: Checked defaults infer only from the choice collection.
const d013 = checkedDefault(["a"] as const, "a");
const d014 = checkedDefault(["a", "b"] as const, "a");
const d015 = checkedDefault(["a", "b"] as const, "b");
const d016 = checkedDefault(["red", "green"] as const, "red");
const d017 = checkedDefault(["red", "green"] as const, "green");
const d018 = checkedDefault(["on", "off"] as const, "off");
const d019 = checkedDefault(["small", "large"] as const, "large");
const d020 = checkedDefault(["x", "y", "z"] as const, "y");
const d021 = checkedDefault(["a", "b"] as string[], "c");
const d022 = checkedDefault(broadChoices, "anything");
const d023 = checkedDefault<string>(["a"], "b");
const d024 = checkedDefault<"a" | "b">(["a"], "b");
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

// Group 3: Primary-driven inference checks structurally compatible fallbacks.
const d025 = preferPrimary(1 as number, 2);
const d026 = preferPrimary("a" as string, "b");
const d027 = preferPrimary(true as boolean, false);
const d028 = preferPrimary({ id: 1 }, { id: 2 });
const richFallback = { id: 2, extra: true };
const d029 = preferPrimary({ id: 1 }, richFallback);
const d030 = preferPrimary([1, 2], [3, 4]);
const d031 = preferPrimary([1, 2] as const, [1, 2] as const);
const d032 = preferPrimary<string | number>(1, "fallback");
const d033 = preferPrimary<unknown>(1, "fallback");
const d034 = preferPrimary<{ id: number }>({ id: 1 }, { id: 2 });
const primaryUnion: "a" | "b" = Math.random() ? "a" : "b";
const d035 = preferPrimary(primaryUnion, "a");
const d036 = preferPrimary<readonly number[]>([1], [2, 3]);
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

// Group 4: Callback output owns Output; fallback only confirms it.
const d037 = mapWithFallback("1", Number, 0);
const d038 = mapWithFallback(1, String, "none");
const d039 = mapWithFallback(1, (value) => value > 0, false);
const d040 = mapWithFallback(1, (value) => ({ value }), { value: 0 });
const d041 = mapWithFallback("a", (value) => [value], [] as string[]);
const d042 = mapWithFallback(1, () => "ok" as const, "ok");
const d043 = mapWithFallback(1, (): "a" | "b" => "a", "b");
const d044 = mapWithFallback(1, () => undefined, undefined);
const d045 = mapWithFallback(1, () => null, null);
const d046 = mapWithFallback<number, unknown>(1, String, false);
const d047 = mapWithFallback<number, string>(1, String, "fallback");
const d048 = mapWithFallback<readonly [1, 2], number>([1, 2], (value) => value.length, 0);
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

// Group 5: State domains come from states, not initial.
const d049 = createMachine({ states: ["idle"] as const, initial: "idle" });
const d050 = createMachine({ states: ["idle", "running"] as const, initial: "running" });
const d051 = createMachine({ states: ["red", "green"] as const, initial: "red" });
const d052 = createMachine({ states: ["open", "closed"] as const, initial: "closed" });
const d053 = createMachine({ states: ["a", "b", "c"] as const, initial: "b" });
const d054 = createMachine({ states: broadChoices, initial: "anything" });
const finiteStates: Array<"a" | "b"> = ["a", "b"];
const d055 = createMachine({ states: finiteStates, initial: "a" });
const d056 = createMachine<"a" | "b">({ states: ["a"], initial: "b" });
const d057 = createMachine<string>({ states: ["a"], initial: "outside" });
const d058 = createMachine({ states: ["a" as string], initial: "outside" });
const d059 = createMachine({ states: ["a", "b"] as const, initial: "a" as "a" | "b" });
const d060 = createMachine<never>({ states: [], initial: undefined as never });
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
