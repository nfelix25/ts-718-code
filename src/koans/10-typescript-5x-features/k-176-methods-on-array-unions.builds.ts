import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-176: methods on unions of arrays — constructions
 * =============================================================================
 *
 * Calling `filter` on a `string[] | number[]` used to fail. The two members have
 * different signatures, and TypeScript would not build a combined one — so a
 * perfectly reasonable call had no way through. TypeScript 5.2 made the checker
 * synthesise an intersection of the two signatures when every member is an
 * array, which is enough to let the call go.
 *
 * The rule is narrower than it looks, and knowing where it stops is the point.
 * It applies to *unions of arrays*, not to unions of anything else, and the
 * element type the callback sees is the union of both element types — which
 * means the callback has to handle both, even though at run time only one of
 * them will ever arrive. The result is likewise the union, not whichever member
 * was passed. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// A discriminated pair whose arrays hold different element shapes.
type GivenComicChapter = { type: "prologue" | "chapter"; pages: number };
type GivenAudioChapter = { type: "prologue" | "chapter"; duration: number };

// ─── The unions ───────────────────────────────────────────────────────

// 1. Build the element reader — the operation the whole packet turns on.
export type ElementOf<ArrayType extends readonly unknown[]> = TODO; // TODO(koan)

type _01a = Expect<Equal<ElementOf<string[]>, string>>;
type _01b = Expect<Equal<ElementOf<number[]>, number>>;
type _01c = Expect<Equal<ElementOf<readonly boolean[]>, boolean>>;
type _01d = Expect<Equal<ElementOf<[]>, never>>;
type _01e = Expect<Equal<ElementOf<[first: string, second: number]>, string | number>>;

// 2. Build the scalar union — two arrays whose element types have nothing in
//    common.
export type ScalarArrays = TODO; // TODO(koan)

type _02a = Expect<Equal<ElementOf<ScalarArrays>, string | number>>;
type _02b = Expect<
  Equal<
    {
      memberFitsTheUnion: GivenExtends<string[], ScalarArrays>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { memberFitsTheUnion: true; arrayOfUnionIsNotAMember: false }
  >
>;
type _02c = Expect<Equal<GivenExtends<(string | number)[], ScalarArrays>, false>>;
type _02d = Expect<
  Equal<
    {
      aUnionOfArraysIsNotAnArrayOfAUnion: Equal<ScalarArrays, (string | number)[]>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { aUnionOfArraysIsNotAnArrayOfAUnion: false; arrayOfUnionIsNotAMember: false }
  >
>;

// 3. Build the readonly version, since the 5.2 rule covers those too.
export type ReadonlyScalarArrays = TODO; // TODO(koan)

type _03a = Expect<Equal<ElementOf<ReadonlyScalarArrays>, string | number>>;
type _03b = Expect<
  Equal<
    {
      mutableFitsReadonly: GivenExtends<ScalarArrays, ReadonlyScalarArrays>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { mutableFitsReadonly: true; arrayOfUnionIsNotAMember: false }
  >
>;
type _03c = Expect<Equal<GivenExtends<ReadonlyScalarArrays, ScalarArrays>, false>>;
type _03d = Expect<
  Equal<
    {
      elementsAgree: Equal<ElementOf<ScalarArrays>, ElementOf<ReadonlyScalarArrays>>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { elementsAgree: true; arrayOfUnionIsNotAMember: false }
  >
>;

// 4. Build the discriminated pair whose `chapters` arrays differ, so the rule
//    can be seen on object elements rather than primitives.
export type Book = TODO; // TODO(koan)

type _04a = Expect<Equal<Book["kind"], "comic" | "audio">>;
type _04b = Expect<Equal<Book["chapters"], GivenComicChapter[] | GivenAudioChapter[]>>;
type _04c = Expect<Equal<ElementOf<Book["chapters"]>, GivenComicChapter | GivenAudioChapter>>;
type _04d = Expect<Equal<Extract<Book, { kind: "comic" }>["chapters"], GivenComicChapter[]>>;
type _04e = Expect<
  Equal<
    {
      narrowingTheBookNarrowsTheArray: Extract<Book, { kind: "comic" }>["chapters"];
      butReadingItUnnarrowedDoesNot: Book["chapters"];
    },
    {
      narrowingTheBookNarrowsTheArray: GivenComicChapter[];
      butReadingItUnnarrowedDoesNot: GivenComicChapter[] | GivenAudioChapter[];
    }
  >
>;

// 5. Build the combined element type the callbacks below have to accept.
export type CombinedChapter = TODO; // TODO(koan)

type _05a = Expect<Equal<CombinedChapter, GivenComicChapter | GivenAudioChapter>>;
type _05b = Expect<Equal<CombinedChapter["type"], "prologue" | "chapter">>;
type _05c = Expect<Equal<Extract<CombinedChapter, { pages: number }>, GivenComicChapter>>;
type _05d = Expect<
  Equal<
    {
      memberFitsTheCombinedElement: GivenExtends<GivenComicChapter, CombinedChapter>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { memberFitsTheCombinedElement: true; arrayOfUnionIsNotAMember: false }
  >
>;
type _05e = Expect<
  Equal<
    {
      sharedFieldIsReachable: CombinedChapter["type"];
      memberSpecificFieldIsNot: "pages" extends keyof CombinedChapter ? true : false;
    },
    { sharedFieldIsReachable: "prologue" | "chapter"; memberSpecificFieldIsNot: false }
  >
>;

// ─── The signatures the rule makes callable ───────────────────────────

// 6. Build the filtering helper. Its result is the *union* element type, not
//    whichever member was passed — the checker cannot know which arrived.
export type FilterTruthy = TODO; // TODO(koan)

type _06a = Expect<Equal<ReturnType<FilterTruthy>, (string | number)[]>>;
type _06b = Expect<Equal<ReturnType<FilterTruthy>[number], string | number>>;
type _06c = Expect<Equal<Parameters<FilterTruthy>, [values: ScalarArrays]>>;
type _06d = Expect<
  Equal<
    {
      resultIsAnArrayOfTheUnion: Equal<ReturnType<FilterTruthy>, (string | number)[]>;
      notTheUnionOfArrays: Equal<ReturnType<FilterTruthy>, ScalarArrays>;
    },
    { resultIsAnArrayOfTheUnion: true; notTheUnionOfArrays: false }
  >
>;

// 7. Build the searching helper, whose callback must handle both element types
//    and whose result admits finding nothing.
export type FindFirst = TODO; // TODO(koan)

type _07a = Expect<Equal<ReturnType<FindFirst>, string | number | undefined>>;
type _07b = Expect<Equal<Parameters<FindFirst>[1], (value: string | number) => boolean>>;
type _07c = Expect<Equal<Parameters<Parameters<FindFirst>[1]>[0], string | number>>;
type _07d = Expect<Equal<NonNullable<ReturnType<FindFirst>>, string | number>>;
type _07e = Expect<Equal<Parameters<FindFirst>["length"], 2>>;

// 8. Build the predicate helpers, which answer with a plain boolean however
//     many members the union has.
export type MatchApi = TODO; // TODO(koan)

type _08a = Expect<Equal<ReturnType<MatchApi["hasMatch"]>, boolean>>;
type _08b = Expect<Equal<ReturnType<MatchApi["allMatch"]>, boolean>>;
type _08c = Expect<Equal<ReturnType<MatchApi["totalPrintedLength"]>, number>>;
type _08d = Expect<Equal<Parameters<MatchApi["allMatch"]>[0], ScalarArrays>>;
type _08e = Expect<Equal<Parameters<Parameters<MatchApi["hasMatch"]>[1]>[0], string | number>>;

// 9. Build the object-element searcher, where the callback sees a union of two
//     shapes that share only their discriminant.
export type FindPrologue = TODO; // TODO(koan)

type _09a = Expect<Equal<Parameters<FindPrologue>[0], GivenComicChapter[] | GivenAudioChapter[]>>;
type _09b = Expect<Equal<ReturnType<FindPrologue>, GivenComicChapter | GivenAudioChapter | undefined>>;
type _09c = Expect<
  Equal<
    {
      foundValue: NonNullable<ReturnType<FindPrologue>>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { foundValue: CombinedChapter; arrayOfUnionIsNotAMember: false }
  >
>;
type _09d = Expect<Equal<NonNullable<ReturnType<FindPrologue>>["type"], "prologue" | "chapter">>;

// ─── Where the rule stops ─────────────────────────────────────────────

// 10. Build the predicate that says whether a union qualifies — every member has
//     to be an array, or the synthesised signature is not attempted.
export type EveryMemberIsAnArray<Value> = TODO; // TODO(koan)

type _10a = Expect<Equal<EveryMemberIsAnArray<ScalarArrays>, true>>;
type _10b = Expect<Equal<EveryMemberIsAnArray<ReadonlyScalarArrays>, true>>;
type _10c = Expect<Equal<EveryMemberIsAnArray<string[] | string>, false>>;
type _10d = Expect<Equal<EveryMemberIsAnArray<Book["chapters"]>, true>>;
type _10e = Expect<Equal<EveryMemberIsAnArray<Book>, false>>;

// 11. Report the boundary. A union with one non-array member is outside the
//     rule entirely, however array-like the rest of it is.
export type BoundaryProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<BoundaryProfile["twoArrays"], true>>;
type _11b = Expect<Equal<BoundaryProfile["threeArrays"], true>>;
type _11c = Expect<Equal<BoundaryProfile["arrayAndScalar"], false>>;
type _11d = Expect<Equal<BoundaryProfile["arrayAndTuple"], true>>;
type _11e = Expect<Equal<BoundaryProfile["arrayAndNull"], false>>;

// 12. Report what the callback is handed. It is the union of every member's
//     element type, so the callback has to cope with a value that could not
//     actually have arrived alongside the array it did.
export type CallbackProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<CallbackProfile["scalarElement"], string | number>>;
type _12b = Expect<Equal<CallbackProfile["chapterElement"], GivenComicChapter | GivenAudioChapter>>;
type _12c = Expect<Equal<CallbackProfile["threeWayElement"], string | number | boolean>>;
type _12d = Expect<Equal<CallbackProfile["sharedKeysOnly"], "type">>;
type _12e = Expect<Equal<CallbackProfile["memberSpecificKeyIsUnreachable"], false>>;

// 13. Report the distinction the whole packet depends on: a union of arrays and
//     an array of a union are different types that agree on their elements. The
//     assignability runs one way only — every member of the union is an array of
//     something the wider array accepts, but the wider array is not any one
//     member.
export type UnionShapeProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<UnionShapeProfile["unionOfArrays"], string[] | number[]>>;
type _13b = Expect<Equal<UnionShapeProfile["arrayOfUnion"], (string | number)[]>>;
type _13c = Expect<Equal<UnionShapeProfile["theySharedAnElementType"], true>>;
type _13d = Expect<Equal<UnionShapeProfile["butAreNotTheSameType"], false>>;
type _13e = Expect<Equal<UnionShapeProfile["unionOfArraysFitsArrayOfUnion"], true>>;

// ─── Working around the widening ──────────────────────────────────────

// 14. Build the distributive element reader, which keeps each member's element
//     type attached to its own member rather than merging them.
export type DistributedElements<Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<DistributedElements<ScalarArrays>, string[] | number[]>>;
type _14b = Expect<Equal<DistributedElements<Book["chapters"]>, GivenComicChapter[] | GivenAudioChapter[]>>;
type _14c = Expect<Equal<DistributedElements<string>, never>>;
type _14d = Expect<
  Equal<
    {
      distributingKeepsThemApart: Equal<DistributedElements<ScalarArrays>, ScalarArrays>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { distributingKeepsThemApart: true; arrayOfUnionIsNotAMember: false }
  >
>;

// 15. Build the generic signature that keeps the caller's member. Being generic
//     in the array type is the way to give back what was passed in rather than
//     the union.
export type FilterPreserving = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    {
      preservedResult: ReturnType<typeof filterStrings>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { preservedResult: string[]; arrayOfUnionIsNotAMember: false }
  >
>;
type _15b = Expect<
  Equal<
    {
      preservedCallback: Parameters<typeof filterStrings>[1];
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { preservedCallback: (value: string) => boolean; arrayOfUnionIsNotAMember: false }
  >
>;
type _15c = Expect<
  Equal<
    {
      genericKeepsTheMember: ReturnType<typeof filterStrings>;
      unionSignatureWouldWiden: ReturnType<FilterTruthy>;
    },
    { genericKeepsTheMember: string[]; unionSignatureWouldWiden: (string | number)[] }
  >
>;
type _15d = Expect<Equal<Parameters<FilterPreserving>["length"], 2>>;

declare const filterStrings: (values: string[], predicate: (value: string) => boolean) => string[];

// 16. Build the gate that admits a union only when the 5.2 rule applies to it.
export type CallableAsArray<Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    {
      admitted: CallableAsArray<ScalarArrays>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { admitted: ScalarArrays; arrayOfUnionIsNotAMember: false }
  >
>;
type _16b = Expect<Equal<CallableAsArray<string[] | string>, never>>;
type _16c = Expect<
  Equal<
    {
      admittedChapters: CallableAsArray<Book["chapters"]>;
      arrayOfUnionIsNotAMember: GivenExtends<(string | number)[], ScalarArrays>;
    },
    { admittedChapters: Book["chapters"]; arrayOfUnionIsNotAMember: false }
  >
>;
type _16d = Expect<Equal<CallableAsArray<Book>, never>>;

// 17. Build the filter that finds the array-valued members of a record — the
//     places this rule could come up in a given shape.
export type ArrayValuedKeys<Owner> = TODO; // TODO(koan)

type _17a = Expect<Equal<ArrayValuedKeys<{ a: ScalarArrays; b: string }>, "a">>;
type _17b = Expect<Equal<ArrayValuedKeys<{ a: string[]; b: number[] }>, "a" | "b">>;
type _17c = Expect<Equal<ArrayValuedKeys<{ a: string[] | string }>, never>>;
type _17d = Expect<Equal<ArrayValuedKeys<Record<never, never>>, never>>;

// 18. Report one union at a glance: whether a method call would be allowed, what
//     the callback would see, and what a preserving alternative would give back.
export type UnionReport<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<UnionReport<ScalarArrays>["callable"], true>>;
type _18b = Expect<Equal<UnionReport<ScalarArrays>["mergedElement"], string | number>>;
type _18c = Expect<Equal<UnionReport<ScalarArrays>["distributed"], string[] | number[]>>;
type _18d = Expect<Equal<UnionReport<ScalarArrays>["widensOnCall"], false>>;
type _18e = Expect<Equal<UnionReport<string[] | string>["callable"], false>>;
