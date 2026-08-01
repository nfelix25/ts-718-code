import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-201: generic typed arrays — constructions
 * =============================================================================
 *
 * `ArrayBuffer` and `SharedArrayBuffer` have drifted apart, so a typed view has
 * to remember which family its `.buffer` belongs to. TypeScript 5.7 made the
 * typed arrays generic in exactly that: `Uint8Array<TArrayBuffer extends
 * ArrayBufferLike = ArrayBufferLike>`. The default is what keeps every existing
 * `Uint8Array` annotation compiling; an explicit argument is what keeps shared
 * memory from being mistaken for ordinary memory.
 *
 * The other half is an ownership fact the types now carry. `subarray` aliases
 * the same storage, so its result keeps the backing type it was given; `slice`
 * copies bytes into fresh ordinary storage, so its result is always
 * `Uint8Array<ArrayBuffer>` however shared the input was. Build the parameter,
 * the two operations, and the difference between them.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The backing buffer ───────────────────────────────────────────────

// 1. Build the two families a view can be backed by.
export type BufferFamily = TODO; // TODO(koan)

type _01a = Expect<Equal<BufferFamily, "ordinary" | "shared">>;
type _01b = Expect<Equal<Exclude<BufferFamily, "shared">, "ordinary">>;
type _01c = Expect<Equal<Extract<BufferFamily, "shared">, "shared">>;
type _01d = Expect<Equal<Extract<BufferFamily, "resizable">, never>>;

// 2. Build the buffer type each family names, and the union that is the
//    parameter's constraint.
export type BufferFor<Family extends BufferFamily> = TODO; // TODO(koan)

type _02a = Expect<Equal<BufferFor<"ordinary">, ArrayBuffer>>;
type _02b = Expect<Equal<BufferFor<"shared">, SharedArrayBuffer>>;
type _02c = Expect<Equal<BufferFor<BufferFamily>, ArrayBuffer | SharedArrayBuffer>>;
type _02d = Expect<Equal<Equal<BufferFor<BufferFamily>, ArrayBufferLike>, true>>;

// 3. Build the view type itself, parameterised by its storage.
export type BytesOf<Buffer extends ArrayBufferLike> = TODO; // TODO(koan)

type _03a = Expect<Equal<BytesOf<ArrayBuffer>, Uint8Array<ArrayBuffer>>>;
type _03b = Expect<Equal<BytesOf<SharedArrayBuffer>["buffer"], SharedArrayBuffer>>;
type _03c = Expect<Equal<BytesOf<ArrayBufferLike>, Uint8Array>>;
type _03d = Expect<Equal<BytesOf<ArrayBuffer>[number], number>>;

// 4. Build the reader that recovers the storage from a view.
export type BackingBuffer<View> = TODO; // TODO(koan)

type _04a = Expect<Equal<BackingBuffer<Uint8Array<ArrayBuffer>>, ArrayBuffer>>;
type _04b = Expect<Equal<BackingBuffer<Uint8Array<SharedArrayBuffer>>, SharedArrayBuffer>>;
type _04c = Expect<Equal<BackingBuffer<Int32Array<ArrayBuffer>>, ArrayBuffer>>;
type _04d = Expect<Equal<BackingBuffer<string>, never>>;
type _04e = Expect<Equal<BackingBuffer<Uint8Array>, ArrayBufferLike>>;

// 5. Build the default the parameter carries, which is what makes every
//    pre-5.7 annotation still mean something.
export type DefaultBacking = TODO; // TODO(koan)

type _05a = Expect<Equal<DefaultBacking, ArrayBuffer | SharedArrayBuffer>>;
type _05b = Expect<Equal<Equal<Uint8Array, Uint8Array<DefaultBacking>>, true>>;
type _05c = Expect<Equal<Uint8Array<DefaultBacking>["buffer"], ArrayBuffer | SharedArrayBuffer>>;
type _05d = Expect<
  Equal<
    {
      aPinnedViewFitsTheDefaultOne: GivenExtends<Uint8Array<ArrayBuffer>, Uint8Array<DefaultBacking>>;
      butTheDefaultOneIsNotPinned: GivenExtends<Uint8Array<DefaultBacking>, Uint8Array<ArrayBuffer>>;
    },
    { aPinnedViewFitsTheDefaultOne: true; butTheDefaultOneIsNotPinned: false }
  >
>;

// 6. Build the test for shared storage, the distinction the parameter exists to
//    preserve.
export type IsShared<Buffer extends ArrayBufferLike> = TODO; // TODO(koan)

type _06a = Expect<Equal<IsShared<SharedArrayBuffer>, true>>;
type _06b = Expect<Equal<IsShared<ArrayBuffer>, false>>;
type _06c = Expect<Equal<IsShared<ArrayBufferLike>, false>>;
type _06d = Expect<Equal<IsShared<BackingBuffer<Uint8Array<SharedArrayBuffer>>>, true>>;

// ─── The operations ───────────────────────────────────────────────────

// 7. Build the factory that makes a view over a given buffer, keeping the
//    caller's storage type in the result.
export type ViewFactory = TODO; // TODO(koan)

type _07a = Expect<Equal<ReturnType<ViewFactory>, Uint8Array<ArrayBufferLike>>>;
type _07b = Expect<Equal<Parameters<ViewFactory>[0], ArrayBufferLike>>;
type _07c = Expect<Equal<Parameters<ViewFactory>["length"], 1>>;
type _07d = Expect<Equal<BackingBuffer<ReturnType<ViewFactory>>, ArrayBufferLike>>;

// 8. Build the aliasing operation. It hands back a window onto the same bytes,
//    so the backing type it was given comes back out.
export type SubarraySignature<Buffer extends ArrayBufferLike> = TODO; // TODO(koan)

type _08a = Expect<Equal<ReturnType<SubarraySignature<ArrayBuffer>>, Uint8Array<ArrayBuffer>>>;
type _08b = Expect<
  Equal<ReturnType<SubarraySignature<SharedArrayBuffer>>, Uint8Array<SharedArrayBuffer>>
>;
type _08c = Expect<
  Equal<BackingBuffer<ReturnType<SubarraySignature<SharedArrayBuffer>>>, SharedArrayBuffer>
>;
type _08d = Expect<
  Equal<
    Equal<
      Parameters<SubarraySignature<ArrayBuffer>>[0],
      ReturnType<SubarraySignature<ArrayBuffer>>
    >,
    true
  >
>;

// 9. Build the copying operation. Fresh storage is ordinary storage, whatever
//    the input was — which is why this one is not generic in the result.
export type SliceSignature = TODO; // TODO(koan)

type _09a = Expect<Equal<ReturnType<SliceSignature>, Uint8Array<ArrayBuffer>>>;
type _09b = Expect<Equal<BackingBuffer<ReturnType<SliceSignature>>, ArrayBuffer>>;
type _09c = Expect<Equal<Parameters<SliceSignature>[0], Uint8Array>>;
type _09d = Expect<Equal<IsShared<BackingBuffer<ReturnType<SliceSignature>>>, false>>;

// 10. Build the reader that hands the storage itself back to a caller.
export type ReadBufferSignature<Buffer extends ArrayBufferLike> = TODO; // TODO(koan)

type _10a = Expect<Equal<ReturnType<ReadBufferSignature<ArrayBuffer>>, ArrayBuffer>>;
type _10b = Expect<Equal<ReturnType<ReadBufferSignature<SharedArrayBuffer>>, SharedArrayBuffer>>;
type _10c = Expect<Equal<Parameters<ReadBufferSignature<ArrayBuffer>>[0], Uint8Array<ArrayBuffer>>>;
type _10d = Expect<Equal<ReturnType<ReadBufferSignature<ArrayBufferLike>>, ArrayBufferLike>>;

// ─── Aliasing versus copying ──────────────────────────────────────────

// 11. Build the operations whose ownership behaviour differs.
export type ViewOperation = TODO; // TODO(koan)

type _11a = Expect<Equal<ViewOperation, "subarray" | "slice" | "set" | "toReversed">>;
type _11b = Expect<Equal<Extract<ViewOperation, `to${string}`>, "toReversed">>;
type _11c = Expect<Equal<Exclude<ViewOperation, "subarray">, "slice" | "set" | "toReversed">>;
type _11d = Expect<Equal<Extract<ViewOperation, "map">, never>>;

// 12. Build which of them keeps pointing at the original bytes.
export type Aliases<Operation extends ViewOperation> = TODO; // TODO(koan)

type _12a = Expect<Equal<Aliases<"subarray">, true>>;
type _12b = Expect<Equal<Aliases<"set">, true>>;
type _12c = Expect<Equal<Aliases<"slice">, false>>;
type _12d = Expect<Equal<Aliases<"toReversed">, false>>;
type _12e = Expect<Equal<Aliases<ViewOperation>, boolean>>;

// 13. Build the backing type each operation's result has. Copying is where the
//     shared-ness is lost, and the type says so.
export type ResultBackingOf<
  Operation extends ViewOperation,
  Buffer extends ArrayBufferLike,
> = TODO; // TODO(koan)

type _13a = Expect<Equal<ResultBackingOf<"subarray", SharedArrayBuffer>, SharedArrayBuffer>>;
type _13b = Expect<Equal<ResultBackingOf<"slice", SharedArrayBuffer>, ArrayBuffer>>;
type _13c = Expect<Equal<ResultBackingOf<"subarray", ArrayBuffer>, ArrayBuffer>>;
type _13d = Expect<Equal<IsShared<ResultBackingOf<"slice", SharedArrayBuffer>>, false>>;

// 14. Build the resulting view type, which is what a caller actually holds.
export type ResultViewOf<
  Operation extends ViewOperation,
  Buffer extends ArrayBufferLike,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<ResultViewOf<"subarray", SharedArrayBuffer>, Uint8Array<SharedArrayBuffer>>
>;
type _14b = Expect<Equal<ResultViewOf<"slice", SharedArrayBuffer>, Uint8Array<ArrayBuffer>>>;
type _14c = Expect<
  Equal<
    Equal<ResultViewOf<"subarray", SharedArrayBuffer>, ResultViewOf<"slice", SharedArrayBuffer>>,
    false
  >
>;
type _14d = Expect<Equal<ResultViewOf<"subarray", ArrayBuffer>["buffer"], ArrayBuffer>>;

// 15. Build the element type of a view, which the buffer parameter leaves
//     entirely alone.
export type ElementOf<View> = TODO; // TODO(koan)

type _15a = Expect<Equal<ElementOf<Uint8Array<ArrayBuffer>>, number>>;
type _15b = Expect<Equal<ElementOf<Int32Array<SharedArrayBuffer>>, number>>;
type _15c = Expect<Equal<ElementOf<BigInt64Array<ArrayBuffer>>, bigint>>;
type _15d = Expect<
  Equal<
    {
      theElementTypeIgnoresTheBuffer: Equal<
        ElementOf<Uint8Array<ArrayBuffer>>,
        ElementOf<Uint8Array<SharedArrayBuffer>>
      >;
      andItIsStillJustANumber: ElementOf<Uint8Array<SharedArrayBuffer>>;
    },
    { theElementTypeIgnoresTheBuffer: true; andItIsStillJustANumber: number }
  >
>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report what the default parameter buys: old annotations keep working, and
//     they keep working by meaning "either family".
export type CompatibilityProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<CompatibilityProfile["theBareAnnotation"], Uint8Array<ArrayBufferLike>>>;
type _16b = Expect<Equal<CompatibilityProfile["whichIsTheDefaultedOne"], true>>;
type _16c = Expect<Equal<CompatibilityProfile["itsBufferIsEitherFamily"], ArrayBufferLike>>;
type _16d = Expect<Equal<CompatibilityProfile["soAPinnedViewStillFitsIt"], true>>;
type _16e = Expect<Equal<CompatibilityProfile["butNotTheOtherWayAround"], false>>;

// 17. Report the ownership pair on shared memory, where getting it wrong matters
//     most.
export type OwnershipProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<OwnershipProfile["aWindowOntoSharedBytes"], Uint8Array<SharedArrayBuffer>>
>;
type _17b = Expect<Equal<OwnershipProfile["aCopyOfSharedBytes"], Uint8Array<ArrayBuffer>>>;
type _17c = Expect<Equal<OwnershipProfile["theWindowIsStillShared"], true>>;
type _17d = Expect<Equal<OwnershipProfile["theCopyIsNot"], false>>;
type _17e = Expect<Equal<OwnershipProfile["andTheElementTypeIsUnchangedEitherWay"], number>>;

// 18. Report one view at a glance: its storage, whether that storage is shared,
//     and what each operation leaves you holding.
export type TypedArrayReport<Buffer extends ArrayBufferLike> = TODO; // TODO(koan)

type _18a = Expect<Equal<TypedArrayReport<SharedArrayBuffer>["backing"], SharedArrayBuffer>>;
type _18b = Expect<Equal<TypedArrayReport<SharedArrayBuffer>["shared"], true>>;
type _18c = Expect<
  Equal<TypedArrayReport<SharedArrayBuffer>["afterSubarray"], Uint8Array<SharedArrayBuffer>>
>;
type _18d = Expect<Equal<TypedArrayReport<SharedArrayBuffer>["afterSlice"], Uint8Array<ArrayBuffer>>>;
type _18e = Expect<Equal<TypedArrayReport<ArrayBuffer>["shared"], false>>;
