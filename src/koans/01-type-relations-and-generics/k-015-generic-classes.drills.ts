import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { Box, Pair, Registry, Stack } from "./k-015-generic-classes.js";

/** K-015 drills: separate constructor inference, persistent instance T, and method-local generics. */

// Group 1: Box construction and explicit instantiation.
const d001 = new Box(1);
const d002 = new Box("a");
const d003 = new Box(true);
const d004 = new Box(1n);
const d005 = new Box(null);
const d006 = new Box(undefined);
const d007 = new Box({ id: 1 });
const d008 = new Box([1, 2]);
const d009 = new Box([1, 2] as const);
const d010 = new Box<number | string>(1);
const d011 = new Box<unknown>(1);
const d012 = new Box<never>(undefined as never);
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

// Group 2: get and map reuse or replace the instance argument.
const d013 = d001.get();
const d014 = d002.get();
const d015 = d003.get();
const d016 = d007.get();
const d017 = d001.map(String);
const d018 = d002.map((value) => value.length);
const d019 = d003.map((value) => !value);
const d020 = d007.map((value) => value.id);
const d021 = d001.map((value) => ({ value }));
const d022 = d002.map((value) => [value]);
const d023 = d009.map((value) => value.length);
const d024 = d010.map((value) => typeof value);
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

// Group 3: Pair arguments remain positional through swap.
const d025 = new Pair(1, "a");
const d026 = new Pair("a", true);
const d027 = new Pair({ id: 1 }, [1, 2]);
const d028 = new Pair("a" as const, 1 as const);
const d029 = d025.swap();
const d030 = d026.swap();
const d031 = d027.swap();
const d032 = d028.swap();
const d033 = d025.swap().swap();
const d034 = new Pair<number | string, boolean>(1, true);
const d035 = new Pair<unknown, never>(1, undefined as never);
const d036 = new Pair<readonly [1, 2], { readonly ok: true }>([1, 2], { ok: true });
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

// Group 4: Empty stateful containers need an explicit instance argument.
const d037 = new Stack<number>();
const d038 = new Stack<string>();
const d039 = new Stack<boolean>();
const d040 = new Stack<{ id: number }>();
const d041 = new Stack<readonly [1, 2]>();
const d042 = new Stack<unknown>();
const d043 = d037.pop();
const d044 = d038.pop();
const d045 = d039.toArray();
const d046 = d040.toArray();
const d047 = d041.toArray();
const d048 = d042.pop();
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

// Group 5: Defaults, constraints, fluent this, and the static factory.
const d049 = new Registry<string>();
const d050 = new Registry<"id">();
const d051 = new Registry<number, boolean>();
const d052 = new Registry<symbol, Date>();
const d053 = new Registry<PropertyKey, unknown>();
const d054 = d050.set("id", 1);
const d055 = d051.set(0, true);
const d056 = d052.get(Symbol.iterator);
const d057 = Box.of(1);
const d058 = Box.of("a");
const d059 = Box.of({ id: 1 });
const d060 = Box.of([1, 2] as const);
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
