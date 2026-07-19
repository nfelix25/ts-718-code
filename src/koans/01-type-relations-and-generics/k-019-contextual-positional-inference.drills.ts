import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  inspectPair,
  pipeThree,
  produceAndConsume,
  visitArgs,
  zipWith,
} from "./k-019-contextual-positional-inference.js";

/** K-019 drills: trace contextual input types position by position, then infer each result. */

// Group 1: Tuple positions contextually type separate callback parameters.
const d001 = inspectPair([1, "a"] as const, (left, right) => left + right.length);
const d002 = inspectPair([true, 1] as const, (left, right) => left ? right : 0);
const d003 = inspectPair(["a", "b"] as const, (left, right) => left + right);
const d004 = inspectPair([{ id: 1 }, true] as const, (record, flag) => flag ? record.id : 0);
const d005 = inspectPair([[1, 2], "x"] as const, (values, text) => values.length + text.length);
const d006 = inspectPair([{ name: "Ada" }, { age: 37 }] as const, (left, right) => ({ ...left, ...right }));
const d007 = inspectPair([1, 2] as const, (left, right) => [left, right]);
const d008 = inspectPair([1, 2] as const, (left, right) => [left, right] as const);
const d009 = inspectPair([[1, 2], ["a", "b"]] as const, ([number], [text]) => `${number}:${text}`);
const d010 = inspectPair([{ id: 1 }, { active: true }] as const, ({ id }, { active }) => active ? id : 0);
const d011 = inspectPair<1, "a", string>([1, "a"], (left, right) => `${left}${right}`);
const d012 = inspectPair<number, string, boolean>([1, "a"], (left, right) => left > right.length);
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

// Group 2: Parallel arrays establish callback positions and an index.
const d013 = zipWith([1, 2], [3, 4], (left, right) => left + right);
const d014 = zipWith([1, 2], ["a", "b"], (left, right) => `${left}:${right}`);
const d015 = zipWith([true], [1], (left, right) => left && right > 0);
const d016 = zipWith([{ id: 1 }], [{ name: "Ada" }], (left, right) => ({ ...left, ...right }));
const d017 = zipWith([[1]], [["a"]], (left, right) => [left[0], right[0]] as const);
const d018 = zipWith([1], [2], (left, right, index) => left + right + index);
const d019 = zipWith(["a"], [true], (left, right, index) => ({ left, right, index }));
const d020 = zipWith<1 | 2, "a" | "b", string>([1, 2], ["a", "b"], (left, right) => `${left}${right}`);
const d021 = zipWith<unknown, unknown, boolean>([1], ["a"], (left, right) => left === right);
const d022 = zipWith<readonly [1], readonly ["a"], number>([[1]], [["a"]], (left, right) => left.length + right.length);
const leftUnion: Array<string | number> = [1, "a"];
const d023 = zipWith(leftUnion, [true, false], (left, right) => right ? left : undefined);
const d024 = zipWith([], [], (_left: never, _right: never, index) => index);
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

// Group 3: Each pipeline output contextually types the following input.
const d025 = pipeThree(1, (value) => value + 1, (value) => value.toFixed());
const d026 = pipeThree("a", (value) => value.length, (value) => value > 0);
const d027 = pipeThree(true, (value) => value ? "yes" : "no", (value) => value.toUpperCase());
const d028 = pipeThree({ id: 1 }, (value) => value.id, (value) => String(value));
const d029 = pipeThree([1, 2], (value) => value.length, (value) => ({ count: value }));
const d030 = pipeThree(1, (value) => ({ value }), (record) => record.value);
const d031 = pipeThree("a", (value) => [value], (values) => values[0]);
const d032 = pipeThree("a", (value) => [value] as const, ([value]) => value);
const d033 = pipeThree(1, (): "a" | "b" => "a", (value) => value);
const d034 = pipeThree<number, string, boolean>(1, String, (value) => value.length > 0);
const d035 = pipeThree<unknown, string, number>(1, String, (value) => value.length);
const d036 = pipeThree<readonly [1, 2], number, string>([1, 2], (value) => value.length, String);
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

// Group 4: Producer results flow into consumers inside one object literal.
const d037 = produceAndConsume({ produce: () => 1, consume: (value) => value.toFixed() });
const d038 = produceAndConsume({ produce: () => "a", consume: (value) => value.length });
const d039 = produceAndConsume({ produce: () => true, consume: (value) => !value });
const d040 = produceAndConsume({ produce: () => ({ id: 1 }), consume: (value) => value.id });
const d041 = produceAndConsume({ produce: () => [1, 2], consume: (value) => value.length });
const d042 = produceAndConsume({ produce: () => ["a", 1] as const, consume: ([text, number]) => text.repeat(number) });
const d043 = produceAndConsume({ produce: () => ({ nested: { ok: true } }), consume: ({ nested }) => nested.ok });
const d044 = produceAndConsume({ produce: () => "ready" as const, consume: (value) => value });
const d045 = produceAndConsume<number, string>({ produce: () => 1, consume: String });
const d046 = produceAndConsume<unknown, boolean>({ produce: () => 1, consume: Boolean });
const d047 = produceAndConsume<never, never>({ produce: () => { throw new Error("x"); }, consume: (value) => value });
const d048 = produceAndConsume({ consume: (value: number) => value.toFixed(), produce: () => 1 });
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

// Group 5: Tuple arguments contextually type callback rest positions.
const d049 = visitArgs([] as const, () => undefined);
const d050 = visitArgs([1] as const, (value) => value.toFixed());
const d051 = visitArgs(["a"] as const, (value) => value.length);
const d052 = visitArgs([1, "a"] as const, (left, right) => `${left}:${right}`);
const d053 = visitArgs([true, 1, "a"] as const, (flag, number, text) => flag ? text.repeat(number) : "");
const d054 = visitArgs([{ id: 1 }, true] as const, ({ id }, flag) => flag ? id : 0);
const d055 = visitArgs([[1, 2], ["a", "b"]] as const, ([number], [text]) => `${number}${text}`);
const d056 = visitArgs([1, 2] as const, (...values) => values);
const d057 = visitArgs([1, 2] as const, (...values) => [...values]);
const d058 = visitArgs<readonly [number, string], string>([1, "a"], (number, text) => text.repeat(number));
const dynamicArgs: [number, string] = [1, "a"];
const d059 = visitArgs(dynamicArgs, (number, text) => text.repeat(number));
const d060 = visitArgs<readonly unknown[], number>([1, "a"], (...values) => values.length);
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
