import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  defer,
  emptyList,
  outputOnly,
  produce,
  promiseFrom,
  transform,
} from "./k-007-contextual-return-inference.js";

/** K-007 drills: infer from returned expressions, then add or remove context. */

// Group 1: Factory return candidates and widening.
const d001 = produce(() => "a");
const d002 = produce(() => "a" as const);
const d003 = produce(() => 1);
const d004 = produce(() => 1 as const);
const d005 = produce(() => true);
const d006 = produce(() => true as const);
const d007 = produce(() => ({ id: "a" }));
const d008 = produce(() => ({ id: "a" } as const));
const d009 = produce(() => [1, 2]);
const d010 = produce(() => [1, 2] as const);
const d011 = produce((): string | number => "a");
const d012 = produce<Date>(() => new Date(0));
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

// Group 2: Independent Input and Output slots.
const d013 = transform("a", (value) => value.length);
const d014 = transform(1, (value) => String(value));
const d015 = transform(true, (value) => !value);
const d016 = transform({ id: "a" }, (value) => value.id);
const d017 = transform([1, 2], (value) => value.length);
const d018 = transform("a", () => ({ ok: true }));
const d019 = transform("a", () => ({ ok: true } as const));
const d020 = transform(1, () => ["ok", 200] as const);
const d021 = transform<string, number>("a", (value) => value.length);
const d022 = transform<number, string>(1, String);
const d023 = transform<unknown, boolean>("anything", Boolean);
const d024 = transform<readonly [1, 2], 2>([1, 2], (value) => value[1]);
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

// Group 3: Context supplies output-only type arguments.
const d025: string = outputOnly();
const d026: number = outputOnly();
const d027: boolean = outputOnly();
const d028: { id: string } = outputOnly();
const d029: readonly [1, 2] = outputOnly();
const d030: string[] = emptyList();
const d031: number[] = emptyList();
const d032: Array<{ id: string }> = emptyList();
const d033 = outputOnly();
const d034 = emptyList();
const d035 = outputOnly<string | number>();
const d036 = emptyList<"a" | "b">();
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

// Group 4: Return relationships wrapped in functions and promises.
const d037 = defer(() => "a");
const d038 = defer(() => "a" as const);
const d039 = defer(() => ({ id: "a" }));
const d040 = defer(() => ({ id: "a" } as const));
const d041: () => string = defer(() => "a");
const d042: () => { id: string } = defer(() => ({ id: "a" }));
const d043 = promiseFrom(() => 1);
const d044 = promiseFrom(() => 1 as const);
const d045 = promiseFrom(() => ({ ok: true }));
const d046 = promiseFrom(() => ({ ok: true } as const));
const d047 = promiseFrom<string>(() => "a");
const d048 = promiseFrom<readonly [1, 2]>(() => [1, 2]);
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

// Group 5: Explicit callback annotations and contextual function views.
const d049 = produce((): "a" | "b" => "a");
const d050 = produce((): string => "a");
const d051 = produce((): readonly [1, 2] => [1, 2]);
const d052: string = produce(() => "a");
const d053: { id: string } = produce(() => ({ id: "a" }));
const d054: readonly [1, 2] = produce(() => [1, 2]);
const d055: Promise<number> = promiseFrom(() => 1);
const d056: Promise<{ id: string }> = promiseFrom(() => ({ id: "a" }));
const d057 = transform("a", (): "yes" | "no" => "yes");
const d058 = transform(1, (): string | number => "a");
const d059 = defer<"a" | "b">(() => "a");
const d060 = outputOnly<never>();
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
