import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-076: intrinsic string casing — constructions
 * =============================================================================
 *
 * These constructions apply whole-string and first-segment intrinsic casing,
 * compose the transforms into API names and mapped keys, and distinguish
 * composition order. They cover unions and normalization, empty and nonletter
 * prefixes, broad transformed-string identities, Unicode expansion, any,
 * never, and the string-only input boundary. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

declare const givenToken: unique symbol;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

// ─── The four intrinsic transforms ──────────────────────────────────────

// 1. Uppercase every cased character in each string member.
export type UpperText<Text extends string> =
  TODO; // TODO(koan)

type _01a = Expect<Equal<UpperText<"typescript">, "TYPESCRIPT">>;
type _01b = Expect<
  Equal<UpperText<"Type-Script 5">, "TYPE-SCRIPT 5">
>;
type _01c = Expect<
  Equal<UpperText<"read" | "write">, "READ" | "WRITE">
>;
type _01d = Expect<Equal<UpperText<"a" | "A">, "A">>;
type _01e = Expect<Equal<UpperText<never>, never>>;

// 2. Lowercase every cased character in each string member.
export type LowerText<Text extends string> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<LowerText<"TYPESCRIPT">, "typescript">>;
type _02b = Expect<
  Equal<LowerText<"Type-Script 5">, "type-script 5">
>;
type _02c = Expect<
  Equal<LowerText<"GET" | "POST">, "get" | "post">
>;
type _02d = Expect<Equal<LowerText<"a" | "A">, "a">>;
type _02e = Expect<Equal<LowerText<never>, never>>;

// 3. Uppercase only the first character-like segment of each member.
export type Capitalized<Text extends string> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<Capitalized<"typescript">, "Typescript">>;
type _03b = Expect<Equal<Capitalized<"hELLO">, "HELLO">>;
type _03c = Expect<
  Equal<Capitalized<"user" | "team">, "User" | "Team">
>;
type _03d = Expect<Equal<Capitalized<"1value" | "-hello">, "1value" | "-hello">>;
type _03e = Expect<Equal<Capitalized<"">, "">>;

// 4. Lowercase only the first character-like segment of each member.
export type Uncapitalized<Text extends string> =
  TODO; // TODO(koan)

type _04a = Expect<Equal<Uncapitalized<"TypeScript">, "typeScript">>;
type _04b = Expect<Equal<Uncapitalized<"TYPESCRIPT">, "tYPESCRIPT">>;
type _04c = Expect<
  Equal<Uncapitalized<"User" | "Team">, "user" | "team">
>;
type _04d = Expect<
  Equal<Uncapitalized<"1HELLO" | "-HELLO">, "1HELLO" | "-HELLO">
>;
type _04e = Expect<Equal<Uncapitalized<"">, "">>;

// ─── Composition and API naming ─────────────────────────────────────────

// 5. Lowercase the whole input, then capitalize only its new beginning.
export type Pascalized<Text extends string> =
  TODO; // TODO(koan)

type _05a = Expect<Equal<Pascalized<"hELLO">, "Hello">>;
type _05b = Expect<Equal<Pascalized<"TYPEscript">, "Typescript">>;
type _05c = Expect<
  Equal<Pascalized<"fOO" | "bAR">, "Foo" | "Bar">
>;
type _05d = Expect<Equal<Pascalized<"1HELLO">, "1hello">>;
type _05e = Expect<Equal<Pascalized<"">, "">>;

// 6. Construct a getter name by capitalizing a property name after `get`.
export type GetterName<Key extends string> =
  TODO; // TODO(koan)

type _06a = Expect<Equal<GetterName<"name">, "getName">>;
type _06b = Expect<Equal<GetterName<"firstName">, "getFirstName">>;
type _06c = Expect<
  Equal<GetterName<"name" | "age">, "getName" | "getAge">
>;
type _06d = Expect<Equal<GetterName<"">, "get">>;
type _06e = Expect<
  Equal<GetterName<string>, `get${Capitalize<string>}`>
>;

// 7. Construct an event-handler name by capitalizing the event after `on`.
export type HandlerName<Event extends string> =
  TODO; // TODO(koan)

type _07a = Expect<Equal<HandlerName<"click">, "onClick">>;
type _07b = Expect<
  Equal<HandlerName<"click" | "focus">, "onClick" | "onFocus">
>;
type _07c = Expect<Equal<HandlerName<"Click">, "onClick">>;
type _07d = Expect<Equal<HandlerName<"1change">, "on1change">>;
type _07e = Expect<Equal<HandlerName<never>, never>>;

// 8. Lowercase method choices and uppercase resource choices independently.
export type MethodResource<
  Method extends string,
  Resource extends string,
> =
  TODO; // TODO(koan)

type _08a = Expect<Equal<MethodResource<"GET", "user">, "get:USER">>;
type _08b = Expect<
  Equal<
    MethodResource<"GET" | "POST", "user" | "team">,
    "get:USER" | "get:TEAM" | "post:USER" | "post:TEAM"
  >
>;
type _08c = Expect<
  Equal<MethodResource<string, "user">, `${Lowercase<string>}:USER`>
>;
type _08d = Expect<
  Equal<MethodResource<"GET", string>, `get:${Uppercase<string>}`>
>;
type _08e = Expect<Equal<MethodResource<never, "user">, never>>;

// 9. Expose how changing composition order changes a string's result.
export type CompositionProfile<Text extends string> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    CompositionProfile<"hELLO">,
    {
      upperThenCapitalize: "HELLO";
      capitalizeThenUpper: "HELLO";
      capitalizeThenLower: "hello";
      lowerThenCapitalize: "Hello";
      upperThenUncapitalize: "hELLO";
      uncapitalizeThenUpper: "HELLO";
    }
  >
>;
type _09b = Expect<
  Equal<CompositionProfile<"hello">["upperThenUncapitalize"], "hELLO">
>;
type _09c = Expect<
  Equal<CompositionProfile<"hELLO">["lowerThenCapitalize"], "Hello">
>;
type _09d = Expect<
  Equal<
    CompositionProfile<"fOO" | "bAR">["lowerThenCapitalize"],
    "Foo" | "Bar"
  >
>;
type _09e = Expect<
  Equal<CompositionProfile<"">["capitalizeThenUpper"], "">
>;

// ─── Intrinsics in mapped keys ──────────────────────────────────────────

// 10. Uppercase string property keys while preserving other keys and modifiers.
export type UppercaseKeys<ObjectType> =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<UppercaseKeys<{ firstName: string; age: number }>, { FIRSTNAME: string; AGE: number }>
>;
type _10b = Expect<
  Equal<
    UppercaseKeys<{ readonly firstName?: string }>,
    { readonly FIRSTNAME?: string }
  >
>;
type _10c = Expect<
  Equal<
    UppercaseKeys<{ "kebab-key": boolean; snake_key: 1 }>,
    { "KEBAB-KEY": boolean; SNAKE_KEY: 1 }
  >
>;
type _10d = Expect<
  Equal<
    UppercaseKeys<{ 1: string; [givenToken]: Date }>,
    { 1: string; [givenToken]: Date }
  >
>;
type _10e = Expect<Equal<UppercaseKeys<{}>, {}>>;

// 11. Lowercase string property keys and union values when keys collide.
export type LowercaseKeys<ObjectType> =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<LowercaseKeys<{ FIRST: 1; SECOND: 2 }>, { first: 1; second: 2 }>
>;
type _11b = Expect<
  Equal<
    LowercaseKeys<{ readonly USER_NAME?: string }>,
    { readonly user_name?: string }
  >
>;
type _11c = Expect<
  Equal<LowercaseKeys<{ FOO: 1; foo: 2 }>, { foo: 1 | 2 }>
>;
type _11d = Expect<
  Equal<
    LowercaseKeys<{ 2: boolean; [givenToken]: "token" }>,
    { 2: boolean; [givenToken]: "token" }
  >
>;
type _11e = Expect<Equal<LowercaseKeys<{}>, {}>>;

// 12. Remap string properties to getter names returning their original values.
export type GetterMap<ObjectType> =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    GetterMap<{ name: string; age: number }>,
    { getName: () => string; getAge: () => number }
  >
>;
type _12b = Expect<
  Equal<
    GetterMap<{ readonly firstName?: string }>,
    { readonly getFirstName?: () => string | undefined }
  >
>;
type _12c = Expect<
  Equal<
    GetterMap<{ "user-name": boolean }>,
    { "getUser-name": () => boolean }
  >
>;
type _12d = Expect<
  Equal<GetterMap<{ 1: string; [givenToken]: Date }>, {}>
>;
type _12e = Expect<Equal<GetterMap<{}>, {}>>;

// ─── Unicode, broad strings, and special inputs ─────────────────────────

// 13. Apply all four intrinsics to one Unicode-bearing string.
export type UnicodeCasingProfile<Text extends string> =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    UnicodeCasingProfile<"straße">,
    ["STRASSE", "straße", "Straße", "straße"]
  >
>;
type _13b = Expect<
  Equal<
    UnicodeCasingProfile<"ßeta">,
    ["SSETA", "ßeta", "SSeta", "ßeta"]
  >
>;
type _13c = Expect<
  Equal<
    UnicodeCasingProfile<"İ">,
    ["İ", "i̇", "İ", "i̇"]
  >
>;
type _13d = Expect<
  Equal<
    UnicodeCasingProfile<"ı">,
    ["I", "ı", "I", "ı"]
  >
>;
type _13e = Expect<
  Equal<
    UnicodeCasingProfile<"🙂a">,
    ["🙂A", "🙂a", "🙂a", "🙂a"]
  >
>;

// 14. Describe the directional identities retained by broad casing outputs.
export type BroadCasingProfile =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<BroadCasingProfile["upper"], Uppercase<string>>
>;
type _14b = Expect<
  Equal<BroadCasingProfile["lower"], Lowercase<string>>
>;
type _14c = Expect<
  Equal<BroadCasingProfile["capitalized"], Capitalize<string>>
>;
type _14d = Expect<
  Equal<
    Pick<BroadCasingProfile, "upperExtendsString" | "stringExtendsUpper">,
    { upperExtendsString: true; stringExtendsUpper: false }
  >
>;
type _14e = Expect<
  Equal<BroadCasingProfile["upperEqualsString"], false>
>;

// 15. Classify any and never before and after intrinsic transformation.
export type CasingSpecialProfile<Text extends string> =
  TODO; // TODO(koan)

type _15a = Expect<
  Equal<CasingSpecialProfile<any>, [false, false, false, false, false]>
>;
type _15b = Expect<
  Equal<CasingSpecialProfile<never>, [false, false, true, false, true]>
>;
type _15c = Expect<
  Equal<CasingSpecialProfile<string>, [false, false, false, false, false]>
>;
type _15d = Expect<
  Equal<CasingSpecialProfile<"">, [false, false, false, false, false]>
>;
type _15e = Expect<
  Equal<
    CasingSpecialProfile<"a" | "A">,
    [false, false, false, false, false]
  >
>;

// 16. Classify which inputs satisfy the intrinsics' string-only boundary.
export type CanCase<Value> =
  TODO; // TODO(koan)

type _16a = Expect<Equal<CanCase<"literal" | string>, true>>;
type _16b = Expect<Equal<CanCase<42 | symbol | { id: 1 }>, false>>;
type _16c = Expect<Equal<CanCase<"ok" | 42>, boolean>>;
type _16d = Expect<Equal<CanCase<unknown>, false>>;
type _16e = Expect<Equal<CanCase<never>, never>>;
