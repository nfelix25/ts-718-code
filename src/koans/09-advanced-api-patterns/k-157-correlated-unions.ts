import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 157 - CORRELATED UNIONS
 * ============================
 *
 * A correlated union is a union of complete relationships. If `kind` is text,
 * `value` is a string and `format` consumes a string; if kind is count, both
 * change to number together. Projecting those properties separately produces
 * unrelated unions and forgets which members belong together.
 *
 * Read `CorrelatedCase<M>` aloud as: "for every key K in M, build one object
 * whose kind is K, whose value is M[K], and whose formatter consumes M[K]; then
 * index the mapped type to obtain the union." At use sites, discriminate the
 * whole value or keep one generic key threaded through every dependent input.
 */

export type FieldMap = {
  text: string;
  count: number;
  active: boolean;
};

export type CorrelatedCase<
  Map,
  Kind extends keyof Map = keyof Map,
> = {
  [Key in Kind]: {
    readonly kind: Key;
    readonly value: Map[Key];
    readonly format: (value: Map[Key]) => string;
  };
}[Kind];

export type CorrelatedTuple<
  Map,
  Kind extends keyof Map = keyof Map,
> = {
  [Key in Kind]: readonly [
    kind: Key,
    value: Map[Key],
    format: (value: Map[Key]) => string,
  ];
}[Kind];

export type DispatchArgs<
  Map,
  Kind extends keyof Map = keyof Map,
> = {
  [Key in Kind]: [kind: Key, value: Map[Key]];
}[Kind];

export type HandlerMap<Map> = {
  [Key in keyof Map]: (value: Map[Key]) => string;
};

export type UncorrelatedCase<Map> = {
  readonly kind: keyof Map;
  readonly value: Map[keyof Map];
  readonly format: (value: Map[keyof Map]) => string;
};

export type FieldCase = CorrelatedCase<FieldMap>;
export type FieldTuple = CorrelatedTuple<FieldMap>;
export type FieldHandlers = HandlerMap<FieldMap>;

// Part 1: Mapped indexing constructs one complete member per key.
type _01 = Expect<Equal<FieldCase["kind"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<FieldCase, { kind: "text" }>["value"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<FieldCase, { kind: "count" }>["format"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<Extract<FieldCase, { kind: "active" }>["format"]>, TODO>>; // TODO(koan) @koan-error

// Part 2: Tuple unions preserve the same positional relationship.
type _05 = Expect<Equal<FieldTuple[0], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<FieldTuple[1], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<FieldTuple, readonly ["text", ...unknown[]]>[1], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<FieldTuple, readonly ["count", ...unknown[]]>[2], TODO>>; // TODO(koan) @koan-error

// Part 3: A keyed handler map keeps each callback paired with its input.
type _09 = Expect<Equal<keyof FieldHandlers, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<FieldHandlers["text"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<FieldHandlers["count"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<FieldHandlers["active"]>, TODO>>; // TODO(koan) @koan-error

// Part 4: Projecting first produces independent unions.
type Loose = UncorrelatedCase<FieldMap>;
type _13 = Expect<Equal<Loose["kind"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Loose["value"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<Loose["format"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<DispatchArgs<FieldMap>, TODO>>; // TODO(koan) @koan-error

// Part 5: Runtime APIs either narrow a whole case or thread one key.
type _17 = Expect<Equal<Parameters<typeof formatFieldCase>[0], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof formatFieldCase>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof dispatchField>[1], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof dispatchField>, TODO>>; // TODO(koan) @koan-error

export function formatFieldCase(field: FieldCase): string {
  switch (field.kind) {
    case "text":
      return field.format(field.value);
    case "count":
      return field.format(field.value);
    case "active":
      return field.format(field.value);
  }
}

export function formatFieldTuple(field: FieldTuple): string {
  switch (field[0]) {
    case "text":
      return field[2](field[1]);
    case "count":
      return field[2](field[1]);
    case "active":
      return field[2](field[1]);
  }
}

export function dispatchField<Key extends keyof FieldMap>(
  handlers: FieldHandlers,
  key: Key,
  value: FieldMap[Key],
): string {
  return handlers[key](value);
}

export const fieldHandlers: FieldHandlers = {
  text: (value) => value.toUpperCase(),
  count: (value) => value.toFixed(2),
  active: (value) => value ? "enabled" : "disabled",
};
