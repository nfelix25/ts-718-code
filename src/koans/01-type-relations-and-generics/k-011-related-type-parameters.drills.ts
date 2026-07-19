import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  select,
  selectMany,
  selectPair,
  transformSelected,
} from "./k-011-related-type-parameters.js";

/** K-011 drills: follow each dependent key into its value and result positions. */

const model = {
  id: 1,
  title: "Koan",
  complete: false,
  score: 9,
  createdAt: new Date(0),
  tags: ["ts", "types"],
  meta: { author: "Ada" },
};

// Group 1: One key, one dependent return.
const d001 = select(model, "id");
const d002 = select(model, "title");
const d003 = select(model, "complete");
const d004 = select(model, "score");
const d005 = select(model, "createdAt");
const d006 = select(model, "tags");
const d007 = select(model, "meta");
const d008 = select({ 0: "zero", one: 1 }, 0);
const d009 = select({ optional: undefined as string | undefined }, "optional");
const d010 = select({ fixed: "x" } as const, "fixed");
const d011 = select<Record<string, number>, string>({ a: 1 }, "a");
const d012 = select<{ a: 1; b: 2 }, "a">({ a: 1, b: 2 }, "a");
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

// Group 2: Key unions broaden the dependent read result.
const key013: "id" | "title" = Math.random() ? "id" : "title";
const key014: "complete" | "score" = Math.random() ? "complete" : "score";
const key015: "createdAt" | "tags" = Math.random() ? "createdAt" : "tags";
const key016: keyof typeof model = "meta";
const d013 = select(model, key013);
const d014 = select(model, key014);
const d015 = select(model, key015);
const d016 = select(model, key016);
const d017 = selectPair(model, key013, "complete");
const d018 = selectPair(model, "id", key014);
const d019 = selectPair(model, key013, key014);
const d020 = selectPair(model, key015, key015);
const d021 = selectPair(model, "meta", "tags");
const d022 = selectPair(model, "score", "score");
const d023 = selectPair({ a: 1 as const, b: "b" as const }, "a", "b");
const d024 = selectPair<{ a: 1; b: 2 }, "b", "a">({ a: 1, b: 2 }, "b", "a");
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

// Group 3: A dependent callback input and independent output.
const d025 = transformSelected(model, "id", (value) => value.toFixed());
const d026 = transformSelected(model, "title", (value) => value.toUpperCase());
const d027 = transformSelected(model, "complete", (value) => !value);
const d028 = transformSelected(model, "score", (value) => value > 5);
const d029 = transformSelected(model, "createdAt", (value) => value.getUTCFullYear());
const d030 = transformSelected(model, "tags", (value) => value.join(","));
const d031 = transformSelected(model, "meta", (value) => value.author);
const d032 = transformSelected(model, "id", (value) => ({ value }));
const d033 = transformSelected(model, "title", (value) => [value]);
const d034 = transformSelected(model, "complete", (value) => value ? "yes" as const : "no" as const);
const d035 = transformSelected(model, "id", (): undefined => undefined);
const d036 = transformSelected<typeof model, "score", string>(model, "score", String);
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

// Group 4: Key collections determine Pick projections.
const d037 = selectMany(model, ["id"] as const);
const d038 = selectMany(model, ["title"] as const);
const d039 = selectMany(model, ["id", "title"] as const);
const d040 = selectMany(model, ["complete", "score"] as const);
const d041 = selectMany(model, ["createdAt", "tags"] as const);
const d042 = selectMany(model, ["meta", "id"] as const);
const d043 = selectMany(model, [key013]);
const d044 = selectMany(model, [key014]);
const d045 = selectMany(model, [key013, key014]);
const d046 = selectMany(model, [] as const);
const selectedKeys: Array<"id" | "complete"> = ["id", "complete"];
const d047 = selectMany(model, selectedKeys);
const d048 = selectMany<typeof model, keyof typeof model>(model, ["id"]);
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

// Group 5: Structural and collection sources work through the same relation.
const tuple = ["ready", 200, true] as const;
const d049 = select(tuple, 0);
const d050 = select(tuple, 1);
const d051 = select(tuple, 2);
const d052 = select(tuple, "length");
const d053 = selectPair(tuple, 0, 2);
const d054 = selectPair(tuple, 1, "length");
const dictionary: Record<string, { count: number }> = { a: { count: 1 } };
const d055 = select(dictionary, "a");
const d056 = transformSelected(dictionary, "a", (value) => value.count);
declare const symbolKey: unique symbol;
const symbolObject = { [symbolKey]: "secret" as const, ordinary: 1 };
const d057 = select(symbolObject, symbolKey);
const d058 = selectPair(symbolObject, symbolKey, "ordinary");
const d059 = selectMany(symbolObject, [symbolKey] as const);
const d060 = transformSelected(symbolObject, symbolKey, (value) => value.length);
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
