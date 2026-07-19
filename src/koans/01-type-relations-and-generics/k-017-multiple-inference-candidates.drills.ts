import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  arrayAndFallback,
  chooseLiteral,
  fromFactories,
  mergeIdentified,
  samePair,
} from "./k-017-multiple-inference-candidates.js";

/** K-017 drills: gather every candidate, then predict the single selected substitution. */

// Group 1: Constrained primitive candidate sets.
const d001 = chooseLiteral("a", "b");
const d002 = chooseLiteral("a", "a");
const d003 = chooseLiteral("red", "green");
const d004 = chooseLiteral(1, 2);
const d005 = chooseLiteral(0, 1);
const d006 = chooseLiteral(42, 42);
const d007 = chooseLiteral(true, false);
const d008 = chooseLiteral(false, false);
const letter: "a" | "b" = Math.random() ? "a" : "b";
const d009 = chooseLiteral(letter, "c");
const broadString: string = "a";
const d010 = chooseLiteral(broadString, "b");
const d011 = chooseLiteral<string>("a", "b");
const d012 = chooseLiteral<1 | 2 | 3>(1, 3);
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

// Group 2: Repeated unconstrained parameter sites.
const d013 = samePair(1, 2);
const d014 = samePair("a", "b");
const d015 = samePair(true, false);
const d016 = samePair(1n, 2n);
const d017 = samePair({ id: 1 }, { id: 2 });
const d018 = samePair({ active: true }, { active: false });
const d019 = samePair([1], [2]);
const d020 = samePair(["a"], ["b"]);
const d021 = samePair(new Date(0), new Date(1));
const d022 = samePair<1 | 2>(1, 2);
const d023 = samePair<string | number>(1, "a");
const d024 = samePair<unknown>(1, "a");
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

// Group 3: Covariant factory return candidates.
const d025 = fromFactories(() => 1);
const d026 = fromFactories(() => 1 as const, () => 2 as const);
const d027 = fromFactories(() => "a");
const d028 = fromFactories(() => "a" as const, () => "b" as const);
const d029 = fromFactories(() => true, () => false);
const d030 = fromFactories(() => ({ id: 1 }), () => ({ id: 2 }));
const d031 = fromFactories(() => [1], () => [2]);
const d032 = fromFactories<readonly [1] | readonly [2]>(() => [1] as const, () => [2] as const);
const d033 = fromFactories<number>(() => 1, () => 2);
const d034 = fromFactories<string | number>(() => 1, () => "a");
const d035 = fromFactories<unknown>(() => 1, () => "a");
const d036 = fromFactories<never>(() => { throw new Error("x"); });
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

// Group 4: Nested array element candidates plus a direct fallback candidate.
const d037 = arrayAndFallback([1, 2], 0);
const d038 = arrayAndFallback([1, 2] as const, 0);
const d039 = arrayAndFallback(["a", "b"], "c");
const d040 = arrayAndFallback(["a", "b"] as const, "c");
const d041 = arrayAndFallback([true, false], true);
const d042 = arrayAndFallback([{ id: 1 }], { id: 0 });
const d043 = arrayAndFallback([[1], [2]], [] as number[]);
const d044 = arrayAndFallback<1 | 2 | 3>([1, 2], 3);
const d045 = arrayAndFallback<string | number>([1, 2], "none");
const d046 = arrayAndFallback<unknown>([1, 2], "none");
const d047 = arrayAndFallback<never>([], undefined as never);
const d048 = arrayAndFallback<readonly [1, 2]>([], [1, 2]);
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

// Group 5: Constrained object candidates.
const d049 = mergeIdentified({ id: "a" }, { id: "b" });
const d050 = mergeIdentified({ id: "a", active: true }, { id: "b", active: false });
const d051 = mergeIdentified({ id: "a", count: 1 }, { id: "b", count: 2 });
const d052 = mergeIdentified({ id: "a", role: "admin" as const }, { id: "b", role: "user" as const });
const d053 = mergeIdentified({ id: "a", nested: { x: 1 } }, { id: "b", nested: { x: 2 } });
const d054 = mergeIdentified({ id: "a" } as const, { id: "b" } as const);
const storedD055 = { id: "a", extra: 1 };
const d055 = mergeIdentified<{ id: string }>(storedD055, { id: "b" });
const d056 = mergeIdentified<{ id: string; active?: boolean }>({ id: "a", active: true }, { id: "b" });
const richLeft = { id: "a", left: true };
const richRight = { id: "b", right: true };
const d057 = mergeIdentified<{ id: string }>(richLeft, richRight);
const d058 = mergeIdentified<{ readonly id: string }>({ id: "a" }, { id: "b" });
const d059 = mergeIdentified<{ id: "a" | "b" }>({ id: "a" }, { id: "b" });
const d060 = mergeIdentified<{ id: string; data: unknown }>({ id: "a", data: 1 }, { id: "b", data: "x" });
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
