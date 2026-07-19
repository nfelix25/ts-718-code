import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-073 edge cases: filtering and dispatch capstone
 * =============================================================================
 * Dispatch derivation relies on a unique, narrow discriminant and a deliberate
 * payload-presence convention. These cases stress duplicate tags, broad tags,
 * optional and undefined payloads, union handler callability, whole-union tests,
 * and special types at the system boundary.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EKind<E> = E extends { type: infer K extends PropertyKey } ? K : never;
type EEvent<E, K extends PropertyKey> = E extends { type: K } ? E : never;
type EPayload<E> = E extends { payload: infer P } ? P : never;
type EResult<E> = E extends { result: infer R } ? R : never;
type EHandler<E> = E extends { payload: infer P; result: infer R }
  ? (payload: P) => R
  : E extends { result: infer R }
    ? () => R
    : never;
type EArgs<E, K extends EKind<E>> = EEvent<E, K> extends infer M
  ? M extends { payload: infer P }
    ? [type: K, payload: P]
    : [type: K]
  : never;
type EAllHavePayload<E> = [E] extends [{ payload: unknown }] ? true : false;

type Duplicate =
  | { type: "same"; payload: string; result: 1 }
  | { type: "same"; payload: number; result: 2 };
type PayloadVariants =
  | { type: "absent"; result: 0 }
  | { type: "undefined"; payload: undefined; result: 1 }
  | { type: "optional"; payload?: string; result: 2 }
  | { type: "void"; payload: void; result: 3 };

// Duplicate discriminants select a union rather than one unique member.
type _E01 = Expect<Equal<EKind<Duplicate>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EEvent<Duplicate, "same">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EPayload<EEvent<Duplicate, "same">>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EResult<EEvent<Duplicate, "same">>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EHandler<EEvent<Duplicate, "same">>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EArgs<Duplicate, "same">, TODO>>; // TODO(koan) @koan-error

// Payload presence is structural: absent, required undefined, optional, and void differ.
type _E07 = Expect<Equal<EArgs<PayloadVariants, "absent">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EArgs<PayloadVariants, "undefined">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EArgs<PayloadVariants, "optional">, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EArgs<PayloadVariants, "void">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EHandler<EEvent<PayloadVariants, "absent">>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EHandler<EEvent<PayloadVariants, "undefined">>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EHandler<EEvent<PayloadVariants, "optional">>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EHandler<EEvent<PayloadVariants, "void">>, TODO>>; // TODO(koan) @koan-error

// Broad discriminants match literal requests structurally and reduce precision.
type Broad = { type: string; payload: unknown; result: unknown } | { type: "exact"; payload: 1; result: 2 };
type _E15 = Expect<Equal<EKind<Broad>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EEvent<Broad, "exact">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EPayload<EEvent<Broad, "exact">>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EResult<EEvent<Broad, "exact">>, TODO>>; // TODO(koan) @koan-error

// Wrapped checks ask about the union as a whole instead of filtering each member.
type _E19 = Expect<Equal<EAllHavePayload<Duplicate>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EAllHavePayload<PayloadVariants>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EAllHavePayload<{ payload: 1 } | { payload: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EAllHavePayload<never>, TODO>>; // TODO(koan) @koan-error

// Special types can stop extraction or poison it and should be guarded at boundaries.
type _E23 = Expect<Equal<EKind<unknown>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EKind<never>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EIsAny<EKind<any>>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EPayload<unknown>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EPayload<never>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EIsAny<EPayload<any>>, TODO>>; // TODO(koan) @koan-error

// Result bottom and payload top retain their ordinary type algebra.
type _E29 = Expect<Equal<EHandler<{ type: "x"; payload: unknown; result: never }>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EArgs<{ type: "x"; payload: unknown; result: never }, "x">, TODO>>; // TODO(koan) @koan-error

// Pre-solved: duplicate tags yield a union of independently correlated handlers.
type _DemoDuplicateHandlers = Expect<Equal<
  EHandler<EEvent<Duplicate, "same">>,
  ((payload: string) => 1) | ((payload: number) => 2)
>>;

// Pre-solved: required `payload: undefined` still occupies an argument position.
type _DemoUndefinedPayload = Expect<Equal<
  EArgs<PayloadVariants, "undefined">,
  [type: "undefined", payload: undefined]
>>;

// Pre-solved: wrapping asks whether every union member has a required payload.
type _DemoWholeUnion = Expect<Equal<EAllHavePayload<PayloadVariants>, false>>;

declare const duplicateHandler: EHandler<EEvent<Duplicate, "same">>;
// @ts-expect-error A union of incompatible handlers has no argument accepted by every member.
duplicateHandler("text");
