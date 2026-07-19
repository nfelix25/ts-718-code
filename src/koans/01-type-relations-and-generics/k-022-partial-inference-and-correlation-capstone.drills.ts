import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  chooseMember,
  mapField,
  pickerFor,
  pickFields,
  pickFieldsDefault,
  writeField,
} from "./k-022-partial-inference-and-correlation-capstone.js";

/** K-022 drills: choose which layer owns T, K, and Result, then preserve their correlation. */

interface Model {
  id: number;
  title: string;
  complete: boolean;
  tags: string[];
  meta: { author: string };
}
const model: Model = { id: 1, title: "Koan", complete: false, tags: ["ts"], meta: { author: "Ada" } };

// Group 1: Fully inferred field projection.
const d001 = pickFields(model, "id");
const d002 = pickFields(model, "title");
const d003 = pickFields(model, "complete");
const d004 = pickFields(model, "tags");
const d005 = pickFields(model, "meta");
const d006 = pickFields(model, "id", "title");
const d007 = pickFields(model, "complete", "tags");
const d008 = pickFields(model, "id", "title", "complete");
const d009 = pickFields(model, "id", "title", "complete", "tags", "meta");
const modelKey: "id" | "title" = Math.random() ? "id" : "title";
const d010 = pickFields(model, modelKey);
const keys: Array<"id" | "complete"> = ["id", "complete"];
const d011 = pickFields(model, ...keys);
const d012 = pickFields(model);
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

// Group 2: Explicit arguments versus a trailing default.
const d013 = pickFields<Model, "id">(model, "id");
const d014 = pickFields<Model, "title">(model, "title");
const d015 = pickFields<Model, "id" | "title">(model, "id", "title");
const d016 = pickFields<Model, keyof Model>(model, "id");
const d017 = pickFields<Model, never>(model);
const d018 = pickFieldsDefault(model, "id");
const d019 = pickFieldsDefault<Model>(model, "id");
const d020 = pickFieldsDefault<Model, "id">(model, "id");
const d021 = pickFieldsDefault<Model, "id" | "title">(model, "id", "title");
const d022 = pickFieldsDefault<Model>(model);
const d023 = pickFieldsDefault<Model, never>(model);
const d024 = pickFieldsDefault<Model, keyof Model>(model, "meta");
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

// Group 3: Curried staging keeps T fixed while each call infers K.
const pickModel = pickerFor<Model>();
const d025 = pickModel(model, "id");
const d026 = pickModel(model, "title");
const d027 = pickModel(model, "complete");
const d028 = pickModel(model, "tags");
const d029 = pickModel(model, "meta");
const d030 = pickModel(model, "id", "title");
const d031 = pickModel(model, "complete", "tags");
const d032 = pickModel(model, modelKey);
const d033 = pickModel(model, ...keys);
const d034 = pickModel(model);
const d035 = pickerFor<{ id: 1; state: "ready" }>()({ id: 1, state: "ready" }, "state");
const d036 = pickerFor<Record<string, number>>()({ a: 1 }, "a");
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

// Group 4: Const domains plus NoInfer-checked fallback members.
const d037 = chooseMember(["a"] as const, "a");
const d038 = chooseMember(["a", "b"] as const, "a");
const d039 = chooseMember(["a", "b"] as const, "b");
const d040 = chooseMember(["red", "green"] as const, "green");
const d041 = chooseMember(["on", "off"] as const, "off");
const d042 = chooseMember(["small", "medium", "large"] as const, "medium");
const broadChoices: string[] = ["a", "b"];
const d043 = chooseMember(broadChoices, "outside");
const finiteChoices: Array<"a" | "b"> = ["a", "b"];
const d044 = chooseMember(finiteChoices, "a");
const d045 = chooseMember<readonly ["a", "b"]>(["a", "b"], "b");
const d046 = chooseMember<readonly string[]>(["a"], "outside");
const d047 = chooseMember([] as readonly string[], "outside");
const d048 = chooseMember([String("a")], "outside");
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

// Group 5: Key-dependent map and write operations.
const d049 = mapField(model, "id", (value) => value.toFixed());
const d050 = mapField(model, "title", (value) => value.length);
const d051 = mapField(model, "complete", (value) => !value);
const d052 = mapField(model, "tags", (value) => value.join(","));
const d053 = mapField(model, "meta", (value) => value.author);
const d054 = mapField(model, modelKey, String);
const mutable: Model = { ...model };
writeField(mutable, "id", 2);
writeField(mutable, "title", "Updated");
writeField(mutable, "complete", true);
const d055 = mutable.id;
const d056 = mutable.title;
const d057 = mutable.complete;
const d058 = mapField(model, "id", (value) => ({ value }));
const d059 = mapField<Model, "title", string[]>(model, "title", (value) => [value]);
const d060 = mapField<Model, keyof Model, string>(model, modelKey, String);
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
