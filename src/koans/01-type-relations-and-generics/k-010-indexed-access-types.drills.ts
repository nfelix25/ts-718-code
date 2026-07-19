import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { getProperty, getTupleElement, pluck } from "./k-010-indexed-access-types.js";

/** K-010 drills: choose a key set, then project and union its value set. */

// Group 1: Direct property projection.
type Model = {
  id: number;
  title: string;
  published: boolean;
  createdAt: Date;
  meta: { views: number };
  callback: () => void;
  optional?: "yes";
  readonly fixed: 1;
};
type D001 = Model["id"];
type D002 = Model["title"];
type D003 = Model["published"];
type D004 = Model["createdAt"];
type D005 = Model["meta"];
type D006 = Model["callback"];
type D007 = Model["optional"];
type D008 = Model["fixed"];
type D009 = { 0: "zero" }[0];
type D010 = { "0": "zero" }["0"];
declare const token: unique symbol;
type D011 = { [token]: "secret" }[typeof token];
type D012 = Record<"a", 1>["a"];
type _D001 = Expect<Equal<D001, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<D002, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<D003, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<D004, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<D005, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<D006, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<D007, TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<D008, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<D009, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<D010, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<D011, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<D012, TODO>>; // TODO(koan) @koan-error

// Group 2: Union keys produce unions of their corresponding values.
type D013 = Model["id" | "title"];
type D014 = Model["id" | "published"];
type D015 = Model["title" | "optional"];
type D016 = Model["fixed" | "optional"];
type D017 = Model["meta" | "createdAt"];
type D018 = Model["callback" | "published"];
type D019 = Model[keyof Model];
type D020 = { a: 1; b: 1 }["a" | "b"];
type D021 = { a: 1; b: 2; c: 3 }["a" | "c"];
type D022 = Record<"a" | "b", boolean>["a" | "b"];
type D023 = Record<string, Date>[string];
type D024 = Record<number, RegExp>[number];
type _D013 = Expect<Equal<D013, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<D014, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<D015, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<D016, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<D017, TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<D018, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<D019, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<D020, TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<D021, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<D022, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<D023, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<D024, TODO>>; // TODO(koan) @koan-error

// Group 3: Array and tuple projections.
type D025 = number[][number];
type D026 = (readonly string[])[number];
type D027 = Array<{ id: string }>[number];
type D028 = ReadonlyArray<Promise<number>>[number];
type D029 = ["a", 1, true][0];
type D030 = ["a", 1, true][1];
type D031 = ["a", 1, true][2];
type D032 = ["a", 1, true][number];
type D033 = (readonly ["a", 1])[number];
type D034 = [first: string, second?: number][1];
type D035 = [head: string, ...tail: boolean[]][number];
type D036 = [][number];
type _D025 = Expect<Equal<D025, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<D026, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<D027, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<D028, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<D029, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<D030, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<D031, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<D032, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<D033, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<D034, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<D035, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<D036, TODO>>; // TODO(koan) @koan-error

// Group 4: Chained projection follows nested data one layer at a time.
type Api = {
  account: {
    profile: { name: string; preferences?: { theme: "light" | "dark" } };
  };
  rows: Array<{ cells: readonly [{ value: string }, { value: number }] }>;
  dictionary: Record<string, { enabled: boolean }>;
};
type D037 = Api["account"];
type D038 = Api["account"]["profile"];
type D039 = Api["account"]["profile"]["name"];
type D040 = NonNullable<Api["account"]["profile"]["preferences"]>;
type D041 = NonNullable<Api["account"]["profile"]["preferences"]>["theme"];
type D042 = Api["rows"][number];
type D043 = Api["rows"][number]["cells"];
type D044 = Api["rows"][number]["cells"][0];
type D045 = Api["rows"][number]["cells"][number];
type D046 = Api["rows"][number]["cells"][number]["value"];
type D047 = Api["dictionary"][string];
type D048 = Api["dictionary"][string]["enabled"];
type _D037 = Expect<Equal<D037, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<D038, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<D039, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<D040, TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<D041, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<D042, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<D043, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<D044, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<D045, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<D046, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<D047, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<D048, TODO>>; // TODO(koan) @koan-error

// Group 5: Call-site key inference chooses the corresponding result type.
const model: Model = {
  id: 1,
  title: "Koan",
  published: true,
  createdAt: new Date(0),
  meta: { views: 10 },
  callback() {},
  fixed: 1,
};
const d049 = getProperty(model, "id");
const d050 = getProperty(model, "title");
const d051 = getProperty(model, "optional");
const d052 = getProperty(model, "meta");
const d053 = pluck([model], "published");
const d054 = pluck([model], "createdAt");
const d055 = pluck([model], "optional");
const d056 = getTupleElement(["a", 1, true] as const, 0);
const d057 = getTupleElement(["a", 1, true] as const, 2);
const d058 = getTupleElement(["a", 1, true] as const, "length");
const modelKey: "id" | "title" = Math.random() ? "id" : "title";
const d059 = getProperty(model, modelKey);
const d060 = pluck([model], modelKey);
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
