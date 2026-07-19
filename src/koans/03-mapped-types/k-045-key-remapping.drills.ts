import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-045 drills: repeat identity, conditional, table, expansion, collision, event, numeric, and symbol remaps. */

interface DSource { id: number; name: string; active: boolean }

// Group 1: Identity and simple conditional renames.
type DIdentity<T> = { [K in keyof T as K]: T[K] };
type DRenameId<T> = { [K in keyof T as K extends "id" ? "key" : K]: T[K] };
type DRenameTwo<T> = {
  [K in keyof T as K extends "id" ? "key" : K extends "name" ? "label" : K]: T[K]
};
type _D001 = Expect<Equal<DIdentity<DSource>, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<DRenameId<DSource>, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<DRenameTwo<DSource>, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<keyof DIdentity<DSource>, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<keyof DRenameId<DSource>, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<keyof DRenameTwo<DSource>, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<DRenameId<DSource>["key"], TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<DRenameId<DSource>["name"], TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<DRenameTwo<DSource>["label"], TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<DRenameTwo<DSource>["active"], TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<DIdentity<{}>, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<DRenameId<{ id?: number }>, TODO>>; // TODO(koan) @koan-error

// Group 2: Lookup maps define explicit destination names.
type DNames = { id: "identifier"; name: "displayName"; active: "enabled" };
type DLookup<T, M extends { [K in keyof T]: PropertyKey }> = { [K in keyof T as M[K]]: T[K] };
type DRenamed = DLookup<DSource, DNames>;
type _D013 = Expect<Equal<DRenamed, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<keyof DRenamed, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<DRenamed["identifier"], TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<DRenamed["displayName"], TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<DRenamed["enabled"], TODO>>; // TODO(koan) @koan-error
type DNumericNames = { id: 0; name: 1; active: 2 };
type DNumericRename = DLookup<DSource, DNumericNames>;
type _D018 = Expect<Equal<DNumericRename, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<keyof DNumericRename, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<DNumericRename[0], TODO>>; // TODO(koan) @koan-error
declare const dId: unique symbol;
declare const dName: unique symbol;
declare const dActive: unique symbol;
type DSymbolNames = { id: typeof dId; name: typeof dName; active: typeof dActive };
type DSymbolRename = DLookup<DSource, DSymbolNames>;
type _D021 = Expect<Equal<DSymbolRename, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<keyof DSymbolRename, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<DSymbolRename[typeof dId], TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<DSymbolRename[typeof dName], TODO>>; // TODO(koan) @koan-error

// Group 3: Union destinations expand sources; collisions merge values.
type DDuplicate<T> = { [K in keyof T as K | "all"]: T[K] };
type DPrefixPair<T> = { [K in keyof T as K | "original"]: [K, T[K]] };
type DCollapse<T> = { [K in keyof T as "value"]: T[K] };
type _D025 = Expect<Equal<DDuplicate<DSource>, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<DDuplicate<DSource>["all"], TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<DDuplicate<DSource>["id"], TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<keyof DDuplicate<DSource>, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<DPrefixPair<DSource>, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<DPrefixPair<DSource>["original"], TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<DCollapse<DSource>, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<DCollapse<DSource>["value"], TODO>>; // TODO(koan) @koan-error
type DPartialCollision = {
  [K in keyof DSource as K extends "id" | "name" ? "identity" : K]: DSource[K]
};
type _D033 = Expect<Equal<DPartialCollision, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<DPartialCollision["identity"], TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<DPartialCollision["active"], TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<keyof DPartialCollision, TODO>>; // TODO(koan) @koan-error

// Group 4: Union members can become keys in handler and payload maps.
type DEvent =
  | { type: "open"; id: string }
  | { type: "close"; code: number }
  | { type: "tick"; at: Date };
type DHandlers<E extends { type: PropertyKey }> = { [V in E as V["type"]]: (event: V) => void };
type DPayloads<E extends { type: PropertyKey }> = { [V in E as V["type"]]: V };
type _D037 = Expect<Equal<DHandlers<DEvent>, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<keyof DHandlers<DEvent>, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<Parameters<DHandlers<DEvent>["open"]>, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<Parameters<DHandlers<DEvent>["close"]>, TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<Parameters<DHandlers<DEvent>["tick"]>, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<DPayloads<DEvent>, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<DPayloads<DEvent>["open"], TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<DPayloads<DEvent>["close"], TODO>>; // TODO(koan) @koan-error
type DNumericEvent = { type: 200; body: string } | { type: 404; missing: true };
type _D045 = Expect<Equal<DHandlers<DNumericEvent>, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<keyof DHandlers<DNumericEvent>, TODO>>; // TODO(koan) @koan-error
type DSymbolEvent = { type: typeof dId; value: number } | { type: typeof dName; value: string };
type _D047 = Expect<Equal<DHandlers<DSymbolEvent>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<keyof DHandlers<DSymbolEvent>, TODO>>; // TODO(koan) @koan-error

// Group 5: Modifier preservation, broad destinations, never, and composition.
interface DModified { readonly id: number; name?: string }
type DIdentityRemap<T> = { [K in keyof T as K]: T[K] };
type DMutableRemap<T> = { -readonly [K in keyof T as K]: T[K] };
type _D049 = Expect<Equal<DIdentityRemap<DModified>, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<DMutableRemap<DModified>, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<DIdentityRemap<DModified>["name"], TODO>>; // TODO(koan) @koan-error
type DBroad<T> = { [K in keyof T as string]: T[K] };
type _D052 = Expect<Equal<DBroad<DSource>, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<keyof DBroad<DSource>, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<DBroad<DSource>[string], TODO>>; // TODO(koan) @koan-error
type DNone<T> = { [K in keyof T as never]: T[K] };
type _D055 = Expect<Equal<DNone<DSource>, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<keyof DNone<DSource>, TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<DIdentityRemap<DRenameId<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<DRenameId<DIdentityRemap<DSource>>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<DIdentityRemap<never>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<DIdentityRemap<unknown>, TODO>>; // TODO(koan) @koan-error
