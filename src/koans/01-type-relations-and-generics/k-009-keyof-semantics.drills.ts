import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-009 drills: compute guaranteed key unions without looking at value types. */

// Group 1: Ordinary declared object surfaces.
type D001 = keyof { id: string };
type D002 = keyof { id: string; name: string };
type D003 = keyof { readonly id: string; name?: string };
type D004 = keyof { start(): void; stop(): void };
type D005 = keyof { callback: () => void; result: Promise<number> };
type D006 = keyof {};
type D007 = keyof { nested: { value: number } };
type D008 = keyof { true: 1; false: 0 };
type D009 = keyof { "kebab-key": string; camelKey: string };
type D010 = keyof { null: null; undefined: undefined };
type D011 = keyof { readonly fixed?: true };
type D012 = keyof { constructor: string; prototype: number };
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

// Group 2: Numeric, symbol, and mixed property-key categories.
declare const drillA: unique symbol;
declare const drillB: unique symbol;
type D013 = keyof { 0: string };
type D014 = keyof { 1: string; 2: number };
type D015 = keyof { "0": string };
type D016 = keyof { 0: string; "1": number };
type D017 = keyof { [drillA]: string };
type D018 = keyof { [drillA]: string; [drillB]: number };
type D019 = keyof { name: string; [drillA]: boolean };
type D020 = keyof { 42: true; answer: 42 };
type D021 = keyof { [-1]: string; 1.5: string };
type D022 = keyof { [Symbol.iterator](): Iterator<number> };
type D023 = keyof Record<"a" | "b", number>;
type D024 = keyof Record<0 | 1, string>;
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

// Group 3: Index signatures cover domains, sometimes plus named keys.
type D025 = keyof { [key: string]: unknown };
type D026 = keyof { [key: number]: unknown };
type D027 = keyof { [key: symbol]: unknown };
type D028 = keyof { [key: string]: string; name: string };
type D029 = keyof { [key: number]: string; length: number };
type D030 = keyof { [key: symbol]: string; name: string };
type D031 = keyof Record<string, boolean>;
type D032 = keyof Record<number, boolean>;
type D033 = keyof Record<symbol, boolean>;
type D034 = keyof { [key: string]: 0 | 1; fixed: 1 };
type D035 = keyof { [key: number]: unknown; 0: string; label: string };
type D036 = keyof { [key: string]: unknown; [key: symbol]: unknown };
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

// Group 4: Ask focused membership questions for array and tuple APIs.
type D037 = number extends keyof string[] ? true : false;
type D038 = "length" extends keyof string[] ? true : false;
type D039 = "push" extends keyof string[] ? true : false;
type D040 = "push" extends keyof readonly string[] ? true : false;
type D041 = number extends keyof readonly string[] ? true : false;
type D042 = "0" extends keyof [string, number] ? true : false;
type D043 = 0 extends keyof [string, number] ? true : false;
type D044 = 2 extends keyof [string, number] ? true : false;
type D045 = "2" extends keyof [string, number] ? true : false;
type D046 = "length" extends keyof readonly [] ? true : false;
type D047 = number extends keyof readonly [] ? true : false;
type D048 = typeof Symbol.iterator extends keyof string[] ? true : false;
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

// Group 5: Composite types change which keys are guaranteed.
type A = { common: string; a: number; optionalA?: true };
type B = { common: string; b: boolean; optionalB?: true };
type C = { common: string; c: Date };
type D049 = keyof (A | B);
type D050 = keyof (A & B);
type D051 = keyof (A | B | C);
type D052 = keyof (A & B & C);
type D053 = keyof ({ a: 1 } | { a: 2; b: 3 });
type D054 = keyof ({ a: 1 } & { a: 2; b: 3 });
type D055 = keyof ({ [key: string]: unknown } | { fixed: true });
type D056 = keyof ({ [key: string]: unknown } & { fixed: true });
type D057 = keyof unknown;
type D058 = keyof any;
type D059 = keyof never;
type D060 = keyof object;
type _D049 = Expect<Equal<D049, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<D050, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<D051, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<D052, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<D053, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<D054, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<D055, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<D056, TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<D057, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<D058, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<D059, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<D060, TODO>>; // TODO(koan) @koan-error
