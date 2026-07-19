import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  Collection,
  FluentBase,
  Model,
  SpecializedFluent,
  invokeWith,
} from "./k-016-generic-methods-and-this.js";

/** K-016 drills: keep class-owned, method-owned, and receiver types in separate ledgers. */

// Group 1: map selects a fresh Result on every call.
const numbers = new Collection([1, 2, 3]);
const d001 = numbers.map(String);
const d002 = numbers.map(Boolean);
const d003 = numbers.map((value) => value * 2);
const d004 = numbers.map((value) => value > 1);
const d005 = numbers.map((value) => ({ value }));
const d006 = numbers.map((value) => [value]);
const d007 = numbers.map((value) => [value] as const);
const d008 = numbers.map(() => undefined);
const d009 = numbers.map(() => null);
const d010 = numbers.map<"yes" | "no">((value) => value ? "yes" : "no");
const d011 = d001.map((value) => value.length);
const d012 = d005.map((value) => value.value);
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

// Group 2: reduce owns an accumulator independent of element T.
const d013 = numbers.reduce(0, (total, value) => total + value);
const d014 = numbers.reduce("", (text, value) => text + value);
const d015 = numbers.reduce(false, (flag, value) => flag || value > 1);
const d016 = numbers.reduce<number[]>([], (result, value) => [...result, value]);
const d017 = numbers.reduce<string[]>([], (result, value) => [...result, String(value)]);
const d018 = numbers.reduce({ sum: 0 }, (result, value) => ({ sum: result.sum + value }));
const d019 = numbers.reduce(new Set<number>(), (result, value) => result.add(value));
const d020 = numbers.reduce(new Map<number, string>(), (result, value) => result.set(value, String(value)));
const words = new Collection(["a", "bb"]);
const d021 = words.reduce(0, (total, value) => total + value.length);
const d022 = words.reduce("", (text, value) => text + value);
const d023 = words.reduce<string[]>([], (result, value) => result.concat(value));
const d024 = words.reduce<{ longest?: string }>({}, (result, value) => ({ ...result, longest: value }));
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

// Group 3: Model methods introduce a key parameter per call.
const model = new Model({ id: 1, name: "Ada", active: true, tags: ["ts"] });
const d025 = model.get("id");
const d026 = model.get("name");
const d027 = model.get("active");
const d028 = model.get("tags");
const d029 = model.project("id");
const d030 = model.project("id", "name");
const d031 = model.project("active", "tags");
const d032 = model.project("id", "name", "active", "tags");
const key: "id" | "name" = Math.random() ? "id" : "name";
const d033 = model.get(key);
const d034 = model.project(key);
const d035 = model.set("id", 2);
const d036 = model.set("name", "Grace");
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

// Group 4: Polymorphic this preserves the current fluent subtype.
const base = new FluentBase();
const specialized = new SpecializedFluent();
const d037 = base.label("a");
const d038 = base.label("a").label("b");
const d039 = specialized.label("a");
const d040 = specialized.enable();
const d041 = specialized.label("a").enable();
const d042 = specialized.enable().label("a");
const d043 = specialized.label("a").enable().label("b");
const d044 = numbers.tap(() => {});
const d045 = words.tap(() => {});
const d046 = model.set("active", false);
const d047 = model.set("tags", []);
const d048 = model.set("id", 3).set("name", "Lin");
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

// Group 5: Explicit receiver inference and binding.
function describe(this: { prefix: string }, value: number, suffix: string): string {
  return `${this.prefix}${value}${suffix}`;
}
const d049 = invokeWith(describe, { prefix: "#" }, 1, "!");
const d050 = describe.bind({ prefix: "#" });
const d051 = describe.bind({ prefix: "#" }, 1);
type D052 = ThisParameterType<typeof describe>;
type D053 = OmitThisParameter<typeof describe>;
type D054 = Parameters<typeof describe>;
type D055 = ReturnType<typeof describe>;
function genericThis<T>(this: { value: T }, fallback: T): T { return this.value ?? fallback; }
const d056 = invokeWith(genericThis, { value: 1 }, 0);
const d057 = invokeWith(genericThis, { value: "a" }, "fallback");
const d058 = genericThis.bind({ value: true });
const d059 = d050(2, "?");
const d060 = d051(".");
type _D049 = Expect<Equal<typeof d049, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<typeof d050, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<typeof d051, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<D052, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<D053, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<D054, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<D055, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<typeof d056, TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<typeof d057, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<typeof d058, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<typeof d059, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<typeof d060, TODO>>; // TODO(koan) @koan-error
