import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-147: deliberate soundness holes — constructions
 * =============================================================================
 *
 * TypeScript is not trying to prove that no accepted program can fail. It is
 * trying to describe JavaScript that people actually write, and several rules
 * are permissive on purpose: mutable containers move covariantly even though the
 * wider reference can write the wrong element, a type that is structurally wider
 * is still assignable because the language has no notion of an exact object
 * type, and an assertion simply believes the author.
 *
 * The useful skill is knowing where each compromise lives so the validation can
 * be put there. Three of them are visible from the type level alone and are
 * measured below; a fourth — the excess-property check on a fresh object
 * literal — is a checking-time courtesy that leaves no trace in the type, which
 * is exactly why `Exclude<keyof Wider, keyof Shape>` can be non-empty while the
 * assignment still succeeds. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// The shape used to compare structural width, and one that is strictly wider.
type GivenIdOnly = { id: string };
type GivenExtra = { id: string; debug: true };

// ─── The material ─────────────────────────────────────────────────────

// 1. Build the base of the hierarchy.
export type Animal = TODO; // TODO(koan)

type _01a = Expect<Equal<Animal["kind"], "animal" | "dog" | "cat">>;
type _01b = Expect<Equal<keyof Animal, "kind" | "name">>;
type _01c = Expect<Equal<Animal["name"], string>>;

// 2. Build the narrow member.
export type Dog = TODO; // TODO(koan)

type _02a = Expect<Equal<Dog["kind"], "dog">>;
type _02b = Expect<
  Equal<
    { narrowIntoBroad: GivenExtends<Dog, Animal>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _02c = Expect<Equal<ReturnType<Dog["bark"]>, string>>;

// 3. Build the sibling — the element that gets written into a container that
//    was never meant to hold it.
export type Cat = TODO; // TODO(koan)

type _03a = Expect<Equal<Cat["kind"], "cat">>;
type _03b = Expect<Equal<GivenExtends<Dog, Cat>, false>>;
type _03c = Expect<
  Equal<
    { siblingIntoBase: GivenExtends<Cat, Animal>; baseIntoSibling: GivenExtends<Animal, Cat> },
    { siblingIntoBase: true; baseIntoSibling: false }
  >
>;

// 4. Build the writable container — the smallest thing that demonstrates the
//    first compromise.
export type MutableBox<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    { stored: MutableBox<Dog>["value"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { stored: Dog; broadIntoNarrow: false }
  >
>;
type _04b = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<MutableBox<Dog>, MutableBox<Animal>>;
      broadIntoNarrow: GivenExtends<MutableBox<Animal>, MutableBox<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _04c = Expect<Equal<GivenExtends<MutableBox<Animal>, MutableBox<Dog>>, false>>;
type _04d = Expect<Equal<keyof MutableBox<Dog>, "value">>;

// 5. Build the read-only container, which reaches the same verdict for a reason
//    that is actually sound.
export type ReadonlyBox<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    { stored: ReadonlyBox<Dog>["value"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { stored: Dog; broadIntoNarrow: false }
  >
>;
type _05b = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<ReadonlyBox<Dog>, ReadonlyBox<Animal>>;
      broadIntoNarrow: GivenExtends<ReadonlyBox<Animal>, ReadonlyBox<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _05c = Expect<
  Equal<
    {
      writableAgrees: GivenExtends<MutableBox<Dog>, MutableBox<Animal>>;
      readonlyAgrees: GivenExtends<ReadonlyBox<Dog>, ReadonlyBox<Animal>>;
      andNeitherGoesBack: GivenExtends<ReadonlyBox<Animal>, ReadonlyBox<Dog>>;
    },
    { writableAgrees: true; readonlyAgrees: true; andNeitherGoesBack: false }
  >
>;

// 6. Build the record with an optional property — the shape a refinement gets
//    made on and then invalidated behind the checker's back.
export type Article = TODO; // TODO(koan)

type _06a = Expect<Equal<keyof Article, "title" | "author">>;
type _06b = Expect<Equal<Article["author"], string | undefined>>;
type _06c = Expect<Equal<NonNullable<Article["author"]>, string>>;
type _06d = Expect<
  Equal<
    {
      articleIntoTitleOnly: GivenExtends<Article, { title: string }>;
      missingTitleRefused: GivenExtends<{ author: string }, Article>;
    },
    { articleIntoTitleOnly: true; missingTitleRefused: false }
  >
>;
type _06e = Expect<
  Equal<
    {
      presentAuthorAccepted: GivenExtends<{ title: string; author: string }, Article>;
      wrongAuthorRefused: GivenExtends<{ title: string; author: number }, Article>;
    },
    { presentAuthorAccepted: true; wrongAuthorRefused: false }
  >
>;

// ─── The instruments ──────────────────────────────────────────────────

// 7. Build the direction classifier, so a compromise can be shown as a verdict
//    rather than argued about.
export type DirectionOf<AtNarrow, AtBroad> = TODO; // TODO(koan)

type _07a = Expect<Equal<DirectionOf<Dog[], Animal[]>, "covariant">>;
type _07b = Expect<Equal<DirectionOf<readonly Dog[], readonly Animal[]>, "covariant">>;
type _07c = Expect<Equal<DirectionOf<MutableBox<Dog>, MutableBox<Animal>>, "covariant">>;
type _07d = Expect<Equal<DirectionOf<Dog, Cat>, "invariant">>;

// 8. Build the `any` detector. It works by asking a question only `any` can
//    answer both ways, which is the same escape hatch every assertion opens.
export type IsAny<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<IsAny<any>, true>>;
type _08b = Expect<Equal<IsAny<unknown>, false>>;
type _08c = Expect<Equal<IsAny<never>, false>>;
type _08d = Expect<Equal<IsAny<string>, false>>;

// 9. Build the operator that names the keys a type has beyond a shape it is
//    being compared against. This is the evidence the excess-property check
//    uses at a literal, and throws away everywhere else.
export type ExcessKeysOf<Value, Shape> = TODO; // TODO(koan)

type _09a = Expect<Equal<ExcessKeysOf<GivenExtra, GivenIdOnly>, "debug">>;
type _09b = Expect<Equal<ExcessKeysOf<GivenIdOnly, GivenExtra>, never>>;
type _09c = Expect<Equal<ExcessKeysOf<Dog, Animal>, "bark">>;
type _09d = Expect<Equal<ExcessKeysOf<GivenIdOnly, GivenIdOnly>, never>>;

// 10. Build the width classifier: assignable and no extra keys is exact,
//     assignable with extra keys is wider, and anything else is unrelated. The
//     middle case is the one the type system has no way to refuse.
export type WidthOf<Value, Shape> = TODO; // TODO(koan)

type _10a = Expect<Equal<WidthOf<GivenExtra, GivenIdOnly>, "wider">>;
type _10b = Expect<Equal<WidthOf<GivenIdOnly, GivenIdOnly>, "exact">>;
type _10c = Expect<Equal<WidthOf<GivenIdOnly, GivenExtra>, "unrelated">>;
type _10d = Expect<Equal<WidthOf<Dog, Animal>, "wider">>;
type _10e = Expect<Equal<WidthOf<Animal, Dog>, "unrelated">>;

// ─── The compromises, one at a time ───────────────────────────────────

// 11. Report the mutable-container compromise. The writable and read-only forms
//     reach the same verdict, but only one of them has an argument behind it.
export type MutableCovarianceProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<MutableCovarianceProfile["mutableArray"], "covariant">>;
type _11b = Expect<Equal<MutableCovarianceProfile["readonlyArray"], "covariant">>;
type _11c = Expect<Equal<MutableCovarianceProfile["mutableBox"], "covariant">>;
type _11d = Expect<Equal<MutableCovarianceProfile["readonlyBox"], "covariant">>;
type _11e = Expect<Equal<MutableCovarianceProfile["writableAndReadonlyAgree"], true>>;

// 12. Report the width compromise. A wider type is assignable, keeps its extra
//     keys, and nothing in the type records that it was ever wider — the check
//     that would have caught it only fires on a fresh literal.
export type WidthProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<WidthProfile["widerIsAssignable"], true>>;
type _12b = Expect<Equal<WidthProfile["narrowerIsNot"], false>>;
type _12c = Expect<Equal<WidthProfile["extraKeysSurvive"], "id" | "debug">>;
type _12d = Expect<Equal<WidthProfile["extraKeysNamed"], "debug">>;
type _12e = Expect<Equal<WidthProfile["narrowedByPick"], { id: string }>>;

// 13. Report the indexed-access compromise. The *type* of an element is the
//     declared element type with nothing added, while the *expression* that
//     reads one has to admit the index might be out of range — which is why the
//     reader below returns a wider type than `[number]` does.
export type IndexedAccessProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<IndexedAccessProfile["arrayElementType"], string>>;
type _13b = Expect<Equal<IndexedAccessProfile["recordValueType"], number>>;
type _13c = Expect<Equal<IndexedAccessProfile["readerResult"], unknown>>;
type _13d = Expect<Equal<IndexedAccessProfile["scoreReaderResult"], number | undefined>>;
type _13e = Expect<Equal<IndexedAccessProfile["typeAndExpressionDisagree"], false>>;

// 14. Report the optionality compromise. A refinement on a mutable optional
//     property is not discarded when something is called that could erase it,
//     so the narrowed type outlives the value it described.
export type RefinementProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<RefinementProfile["declared"], string | undefined>>;
type _14b = Expect<Equal<RefinementProfile["refined"], string>>;
type _14c = Expect<Equal<RefinementProfile["eraserResult"], void>>;
type _14d = Expect<
  Equal<
    { accepts: RefinementProfile["eraserAccepts"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: Article; broadIntoNarrow: false }
  >
>;
type _14e = Expect<Equal<RefinementProfile["unsafeReaderResult"], string | undefined>>;

// 15. Report the one place the checker is stricter than it looks. Two members
//     whose discriminants disagree intersect to nothing, so an impossible
//     combination is not merely unusable — it has no type at all.
export type DiscriminantProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<DiscriminantProfile["intersected"], never>>;
type _15b = Expect<Equal<DiscriminantProfile["isEmpty"], true>>;
type _15c = Expect<Equal<DiscriminantProfile["discriminantsIntersect"], never>>;
type _15d = Expect<
  Equal<
    {
      bothReachTheBase: DiscriminantProfile["bothStillReachTheBase"];
      baseDoesNotReachBack: GivenExtends<Animal, Dog>;
    },
    { bothReachTheBase: true; baseDoesNotReachBack: false }
  >
>;

// ─── Where the obligation moves to ────────────────────────────────────

// 16. Build the API. Every one of these signatures promises more than it can
//     check: the readers admit a missing element, and the last three hand the
//     proof obligation to whoever calls them.
export type TrustApi = TODO; // TODO(koan)

type _16a = Expect<Equal<ReturnType<TrustApi["assumeString"]>, string>>;
type _16b = Expect<
  Equal<
    {
      accepts: Parameters<TrustApi["assumeString"]>[0];
      returnsTheClaimUnchecked: Equal<ReturnType<TrustApi["assumeString"]>, string>;
    },
    { accepts: unknown; returnsTheClaimUnchecked: true }
  >
>;
type _16c = Expect<Equal<ReturnType<TrustApi["firstDeclared"]>, unknown>>;
type _16d = Expect<Equal<ReturnType<TrustApi["parseTrusted"]>, unknown>>;
type _16e = Expect<Equal<ReturnType<TrustApi["readScore"]>, number | undefined>>;

// 17. Report the trust boundary. An assertion produces a type nobody checked,
//     and the ambient parser hands back `any`, which is the widest possible
//     promise the language can make.
export type TrustProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<TrustProfile["assertedIsExactlyTheClaim"], true>>;
type _17b = Expect<Equal<TrustProfile["assertedInputWasUnchecked"], true>>;
type _17c = Expect<Equal<TrustProfile["ambientParserIsAny"], true>>;
type _17d = Expect<Equal<TrustProfile["parseTrustedIsNotAny"], false>>;
type _17e = Expect<Equal<TrustProfile["nonNullAssertionKeepsTheArgument"], true>>;

// 18. Report the whole audit: for each compromise, the verdict the checker
//     gives and whether that verdict is one the safety argument actually
//     supports.
export type CompromiseReport = TODO; // TODO(koan)

type _18a = Expect<Equal<CompromiseReport["mutableContainerVerdict"], "covariant">>;
type _18b = Expect<Equal<CompromiseReport["mutableContainerIsSound"], false>>;
type _18c = Expect<Equal<CompromiseReport["widthVerdict"], "wider">>;
type _18d = Expect<Equal<CompromiseReport["indexedTypeAdmitsNothingMissing"], true>>;
type _18e = Expect<Equal<CompromiseReport["assertionIsUnchecked"], true>>;
