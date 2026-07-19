import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-037 drills: trace stable captures, last assignments, invalidating writes, property snapshots, and callback flow. */

// Group 1: Const and never-assigned captures retain branch narrowing.
function drillStable(value: string | number) {
  if (typeof value === "string") {
    const one = () => {
      type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value;
    };
    const two = () => value.length;
    type _D002 = Expect<Equal<ReturnType<typeof one>, TODO>>; // TODO(koan) @koan-error
    type _D003 = Expect<Equal<ReturnType<typeof two>, TODO>>; // TODO(koan) @koan-error
    [1].forEach(() => {
      type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    });
  } else {
    const numeric = () => {
      type _D005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value;
    };
    type _D006 = Expect<Equal<ReturnType<typeof numeric>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillConst(input: string | number) {
  const value = input;
  if (typeof value === "number") {
    const callback = () => value;
    type _D007 = Expect<Equal<ReturnType<typeof callback>, TODO>>; // TODO(koan) @koan-error
  }
}
function drillDiscriminant(value: { kind: "a"; a: string } | { kind: "b"; b: number }) {
  if (value.kind === "a") {
    const callback = () => value;
    type _D008 = Expect<Equal<ReturnType<typeof callback>, TODO>>; // TODO(koan) @koan-error
    const field = () => value.a;
    type _D009 = Expect<Equal<ReturnType<typeof field>, TODO>>; // TODO(koan) @koan-error
  }
  type _D010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type _D011 = Expect<Equal<ReturnType<typeof drillStable>, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<Parameters<typeof drillStable>, TODO>>; // TODO(koan) @koan-error
void drillStable;
void drillConst;
void drillDiscriminant;

// Group 2: TS 5.4 preserves captures created after a last assignment.
function drillLast(input: string | number, flag: boolean) {
  let value = input;
  value = "text";
  const text = () => {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return value;
  };
  type _D014 = Expect<Equal<ReturnType<typeof text>, TODO>>; // TODO(koan) @koan-error
  let numeric: string | number = input;
  numeric = 1;
  const number = () => {
    type _D015 = Expect<Equal<typeof numeric, TODO>>; // TODO(koan) @koan-error
    return numeric;
  };
  type _D016 = Expect<Equal<ReturnType<typeof number>, TODO>>; // TODO(koan) @koan-error
  let conditional: string | number = input;
  conditional = flag ? "yes" : 0;
  const union = () => {
    type _D017 = Expect<Equal<typeof conditional, TODO>>; // TODO(koan) @koan-error
    return conditional;
  };
  type _D018 = Expect<Equal<ReturnType<typeof union>, TODO>>; // TODO(koan) @koan-error
  let narrowed = input;
  if (typeof narrowed === "string") {
    const callback = () => {
      type _D019 = Expect<Equal<typeof narrowed, TODO>>; // TODO(koan) @koan-error
      return narrowed;
    };
    type _D020 = Expect<Equal<ReturnType<typeof callback>, TODO>>; // TODO(koan) @koan-error
  }
  type _D021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _D022 = Expect<Equal<typeof numeric, TODO>>; // TODO(koan) @koan-error
  type _D023 = Expect<Equal<typeof conditional, TODO>>; // TODO(koan) @koan-error
  return union;
}
type _D024 = Expect<Equal<ReturnType<typeof drillLast>, TODO>>; // TODO(koan) @koan-error

// Group 3: Later writes and callback writes invalidate captured observations.
function drillLater(input: string | number, flag: boolean) {
  let value = input;
  if (typeof value === "string") {
    const callback = () => {
      type _D025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value;
    };
    value = 1;
    type _D026 = Expect<Equal<ReturnType<typeof callback>, TODO>>; // TODO(koan) @koan-error
  }
  let other = input;
  if (typeof other === "number") {
    const callback = () => {
      type _D027 = Expect<Equal<typeof other, TODO>>; // TODO(koan) @koan-error
      return other;
    };
    if (flag) other = "changed";
    type _D028 = Expect<Equal<ReturnType<typeof callback>, TODO>>; // TODO(koan) @koan-error
  }
  let mutated = input;
  const mutate = () => { mutated = "callback"; };
  if (typeof mutated === "number") {
    const read = () => {
      type _D029 = Expect<Equal<typeof mutated, TODO>>; // TODO(koan) @koan-error
      return mutated;
    };
    mutate();
    type _D030 = Expect<Equal<ReturnType<typeof read>, TODO>>; // TODO(koan) @koan-error
  }
  type _D031 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _D032 = Expect<Equal<typeof other, TODO>>; // TODO(koan) @koan-error
  type _D033 = Expect<Equal<typeof mutated, TODO>>; // TODO(koan) @koan-error
  type _D034 = Expect<Equal<typeof mutate, TODO>>; // TODO(koan) @koan-error
  return mutate;
}
type _D035 = Expect<Equal<ReturnType<typeof drillLater>, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<Parameters<typeof drillLater>, TODO>>; // TODO(koan) @koan-error

// Group 4: Properties need stable snapshots; callback execution is not guaranteed.
function drillProperty(box: { value: string | number }, values: readonly string[]) {
  if (typeof box.value === "string") {
    const snapshot = box.value;
    const property = () => {
      type _D037 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
      return box.value;
    };
    const stable = () => {
      type _D038 = Expect<Equal<typeof snapshot, TODO>>; // TODO(koan) @koan-error
      return snapshot;
    };
    type _D039 = Expect<Equal<ReturnType<typeof property>, TODO>>; // TODO(koan) @koan-error
    type _D040 = Expect<Equal<ReturnType<typeof stable>, TODO>>; // TODO(koan) @koan-error
  }
  let result: string | undefined;
  values.forEach(value => {
    result = value;
    type _D041 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  });
  type _D042 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  const mapped = values.map(value => value.length);
  type _D043 = Expect<Equal<typeof mapped, TODO>>; // TODO(koan) @koan-error
  const found = values.find(value => value.length > 0);
  type _D044 = Expect<Equal<typeof found, TODO>>; // TODO(koan) @koan-error
  let direct: string | undefined;
  for (const value of values) direct = value;
  type _D045 = Expect<Equal<typeof direct, TODO>>; // TODO(koan) @koan-error
  type _D046 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  type _D047 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
  return result;
}
type _D048 = Expect<Equal<ReturnType<typeof drillProperty>, TODO>>; // TODO(koan) @koan-error

// Group 5: Immediate, returned, async, nested, shadowed, and loop closures.
function drillForms(value: string | number, values: readonly (string | number)[]) {
  if (typeof value === "string") {
    const immediate = (() => value.length)();
    type _D049 = Expect<Equal<typeof immediate, TODO>>; // TODO(koan) @koan-error
    const returned = () => value;
    type _D050 = Expect<Equal<typeof returned, TODO>>; // TODO(koan) @koan-error
    type _D051 = Expect<Equal<ReturnType<typeof returned>, TODO>>; // TODO(koan) @koan-error
    const asyncValue = Promise.resolve().then(() => value);
    type _D052 = Expect<Equal<typeof asyncValue, TODO>>; // TODO(koan) @koan-error
    const nested = () => () => value;
    type _D053 = Expect<Equal<ReturnType<ReturnType<typeof nested>>, TODO>>; // TODO(koan) @koan-error
    const shadowed = [1].map(value => value.toFixed());
    type _D054 = Expect<Equal<typeof shadowed, TODO>>; // TODO(koan) @koan-error
  }
  const callbacks: Array<() => string | number> = [];
  for (const item of values) {
    if (typeof item === "string") {
      callbacks.push(() => {
        type _D055 = Expect<Equal<typeof item, TODO>>; // TODO(koan) @koan-error
        return item;
      });
    } else {
      callbacks.push(() => {
        type _D056 = Expect<Equal<typeof item, TODO>>; // TODO(koan) @koan-error
        return item;
      });
    }
  }
  type _D057 = Expect<Equal<typeof callbacks, TODO>>; // TODO(koan) @koan-error
  type _D058 = Expect<Equal<typeof callbacks[0], TODO>>; // TODO(koan) @koan-error
  const invoked = callbacks.map(callback => callback());
  type _D059 = Expect<Equal<typeof invoked, TODO>>; // TODO(koan) @koan-error
  return callbacks;
}
type _D060 = Expect<Equal<ReturnType<typeof drillForms>, TODO>>; // TODO(koan) @koan-error
