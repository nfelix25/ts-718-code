import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  collectDefault,
  constrainedOption,
  createRegistry,
  defaultPair,
  optionalValue,
} from "./k-012-generic-defaults.js";

/** K-012 drills: decide whether explicit choice, inference, or default supplies each slot. */

// Group 1: One defaulted parameter under omission and inference.
const d001 = optionalValue();
const d002 = optionalValue("text");
const d003 = optionalValue("text" as const);
const d004 = optionalValue(1);
const d005 = optionalValue(1 as const);
const d006 = optionalValue(true);
const d007 = optionalValue({ id: 1 });
const d008 = optionalValue([1, 2]);
const d009 = optionalValue([1, 2] as const);
const d010 = optionalValue(undefined);
const d011 = optionalValue(null);
const d012 = optionalValue<"a" | "b">();
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

// Group 2: Dependent defaults follow the earlier slot selected for this call.
const d013 = defaultPair();
const d014 = defaultPair("a");
const d015 = defaultPair(1);
const d016 = defaultPair(true);
const d017 = defaultPair({ id: 1 });
const d018 = defaultPair("a", 1);
const d019 = defaultPair(1, "a");
const d020 = defaultPair(true, null);
const d021 = defaultPair<string>();
const d022 = defaultPair<number>();
const d023 = defaultPair<number, string>();
const d024 = defaultPair<readonly [1, 2]>();
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

// Group 3: Rest inference overrides the empty-call default as soon as evidence exists.
const d025 = collectDefault();
const d026 = collectDefault(1);
const d027 = collectDefault(1, 2, 3);
const d028 = collectDefault("a");
const d029 = collectDefault("a", "b");
const d030 = collectDefault(true, false);
const d031 = collectDefault({ id: 1 });
const d032 = collectDefault([1, 2]);
const d033 = collectDefault([1, 2] as const);
const d034 = collectDefault<unknown>();
const d035 = collectDefault<string>();
const d036 = collectDefault<"a" | "b">("a", "b");
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

// Group 4: Trailing defaults make right-hand slots optional for explicit use.
const d037 = createRegistry();
const d038 = createRegistry<string>();
const d039 = createRegistry<"id">();
const d040 = createRegistry<number>();
const d041 = createRegistry<symbol>();
const d042 = createRegistry<string, number>();
const d043 = createRegistry<"id" | "name", string>();
const d044 = createRegistry<number, boolean>();
const d045 = createRegistry<symbol, Date>();
const d046 = createRegistry<PropertyKey, unknown>();
const d047 = createRegistry<never>();
const d048 = createRegistry<"id", never>();
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

// Group 5: Constrained defaults and inferred rich subtypes.
const d049 = constrainedOption();
const d050 = constrainedOption({ mode: "a" });
const d051 = constrainedOption({ mode: "a" } as const);
const d052 = constrainedOption({ mode: "a", retries: 1 });
const d053 = constrainedOption({ mode: "a", retries: 1 } as const);
const optionVariable: { mode: string; debug: boolean } = { mode: "a", debug: true };
const d054 = constrainedOption(optionVariable);
const d055 = constrainedOption<{ mode: string }>();
const d056 = constrainedOption<{ mode: "custom" }>();
const d057 = constrainedOption<{ mode: string; timeout: number }>({ mode: "a", timeout: 10 });
const d058 = constrainedOption(undefined);
const d059 = constrainedOption<{ readonly mode: string }>({ mode: "a" });
const d060 = constrainedOption({ mode: String("a"), nested: { ok: true } });
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
