import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-225: LSP and editor architecture — constructions
 * =============================================================================
 *
 * The native language server speaks LSP, which is a good deal for everyone: one
 * protocol, any editor, and requests that can genuinely run at the same time
 * because the server has threads. Completion, navigation, hovers and refactors
 * are all there, and the server keeps project context so diagnostics mean what
 * they meant on the command line.
 *
 * What does *not* follow is the old extension surface. `tsserver` plugins hooked
 * into a JavaScript API that LSP support says nothing about, and frameworks that
 * embed TypeScript in another language — a template, a single-file component —
 * were built on those internals. Build the protocol surface, the concurrency, and
 * the boundary the old plugin model sits outside of.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── What the protocol carries ────────────────────────────────────────

// 1. Build the language operations an editor asks for.
export type LanguageRequest = TODO; // TODO(koan)

type _01a = Expect<
  Equal<LanguageRequest, "completion" | "definition" | "hover" | "rename" | "diagnostics">
>;
type _01b = Expect<Equal<Extract<LanguageRequest, `${string}tion`>, "completion" | "definition">>;
type _01c = Expect<
  Equal<Exclude<LanguageRequest, "diagnostics">, "completion" | "definition" | "hover" | "rename">
>;
type _01d = Expect<Equal<Extract<LanguageRequest, "formatting">, never>>;

// 2. Build what each request needs to see. This is what decides whether it can
//    be answered from one file.
export type ScopeOf<Request extends LanguageRequest> = TODO; // TODO(koan)

type _02a = Expect<Equal<ScopeOf<"hover">, "one file">>;
type _02b = Expect<Equal<ScopeOf<"completion">, "one file">>;
type _02c = Expect<Equal<ScopeOf<"rename">, "the project">>;
type _02d = Expect<Equal<ScopeOf<"diagnostics">, "the project">>;
type _02e = Expect<Equal<ScopeOf<LanguageRequest>, "one file" | "the project">>;

// 3. Build the concurrency the native server can offer: requests that need only
//    a file can be answered while a project-wide one is still running.
export type RunsConcurrently<Request extends LanguageRequest> = TODO; // TODO(koan)

type _03a = Expect<Equal<RunsConcurrently<"hover">, true>>;
type _03b = Expect<Equal<RunsConcurrently<"completion">, true>>;
type _03c = Expect<Equal<RunsConcurrently<"rename">, false>>;
type _03d = Expect<Equal<RunsConcurrently<LanguageRequest>, boolean>>;

// 4. Build the response each request produces, since the protocol is where the
//    shapes are agreed.
export type ResponseOf<Request extends LanguageRequest> = TODO; // TODO(koan)

type _04a = Expect<Equal<ResponseOf<"completion">, readonly string[]>>;
type _04b = Expect<Equal<ResponseOf<"definition">, { uri: string; line: number }>>;
type _04c = Expect<Equal<ResponseOf<"hover">, string>>;
type _04d = Expect<Equal<ResponseOf<"diagnostics">[number]["message"], string>>;
type _04e = Expect<Equal<ResponseOf<"rename">[number]["newText"], string>>;

// ─── The transport ────────────────────────────────────────────────────

// 5. Build the protocols an editor integration can be built on.
export type Protocol = TODO; // TODO(koan)

type _05a = Expect<Equal<Protocol, "lsp" | "tsserver-protocol">>;
type _05b = Expect<Equal<Exclude<Protocol, "lsp">, "tsserver-protocol">>;
type _05c = Expect<Equal<Extract<Protocol, `${string}protocol`>, "tsserver-protocol">>;
type _05d = Expect<Equal<Extract<Protocol, "custom">, never>>;

// 6. Build who can speak each one. That is the entire argument for LSP.
export type SpokenBy<TheProtocol extends Protocol> = TODO; // TODO(koan)

type _06a = Expect<Equal<SpokenBy<"lsp">, "any editor">>;
type _06b = Expect<Equal<SpokenBy<"tsserver-protocol">, "editors with a bespoke client">>;
type _06c = Expect<Equal<SpokenBy<Protocol>, "any editor" | "editors with a bespoke client">>;
type _06d = Expect<Equal<Equal<SpokenBy<"lsp">, SpokenBy<"tsserver-protocol">>, false>>;

// ─── The extension surface ────────────────────────────────────────────

// 7. Build the ways something can extend the editor experience.
export type ExtensionMechanism = TODO; // TODO(koan)

type _07a = Expect<
  Equal<ExtensionMechanism, "lsp client" | "tsserver plugin" | "embedded language service">
>;
type _07b = Expect<Equal<Extract<ExtensionMechanism, `${string}plugin`>, "tsserver plugin">>;
type _07c = Expect<
  Equal<Exclude<ExtensionMechanism, "lsp client">, "tsserver plugin" | "embedded language service">
>;
type _07d = Expect<Equal<Extract<ExtensionMechanism, "compiler plugin">, never>>;

// 8. Build what each mechanism depends on. Two of the three reach for the
//    JavaScript API rather than the protocol.
export type DependsOn<Mechanism extends ExtensionMechanism> = TODO; // TODO(koan)

type _08a = Expect<Equal<DependsOn<"lsp client">, "the protocol">>;
type _08b = Expect<Equal<DependsOn<"tsserver plugin">, "the javascript api">>;
type _08c = Expect<Equal<DependsOn<"embedded language service">, "the javascript api">>;
type _08d = Expect<Equal<DependsOn<ExtensionMechanism>, "the protocol" | "the javascript api">>;

// 9. Build the consequence: LSP support carries exactly the mechanisms built on
//    the protocol, and no others.
export type CarriedByLspSupport<Mechanism extends ExtensionMechanism> = TODO; // TODO(koan)

type _09a = Expect<Equal<CarriedByLspSupport<"lsp client">, true>>;
type _09b = Expect<Equal<CarriedByLspSupport<"tsserver plugin">, false>>;
type _09c = Expect<Equal<CarriedByLspSupport<"embedded language service">, false>>;
type _09d = Expect<Equal<CarriedByLspSupport<ExtensionMechanism>, boolean>>;

// 10. Build what a blocked mechanism is waiting for.
export type BlockedOn<Mechanism extends ExtensionMechanism> = TODO; // TODO(koan)

type _10a = Expect<Equal<BlockedOn<"lsp client">, "nothing">>;
type _10b = Expect<Equal<BlockedOn<"tsserver plugin">, "a replacement for the old API">>;
type _10c = Expect<Equal<BlockedOn<"embedded language service">, "a replacement for the old API">>;
type _10d = Expect<
  Equal<Equal<BlockedOn<"lsp client">, BlockedOn<"tsserver plugin">>, false>
>;

// ─── The project context ──────────────────────────────────────────────

// 11. Build what the server has to hold to answer a project-scoped request.
export type ServerState = TODO; // TODO(koan)

type _11a = Expect<Equal<ServerState, "open documents" | "project graph" | "checker state">>;
type _11b = Expect<Equal<Extract<ServerState, `${string}state`>, "checker state">>;
type _11c = Expect<Equal<Exclude<ServerState, "open documents">, "project graph" | "checker state">>;
type _11d = Expect<Equal<Extract<ServerState, "file watchers">, never>>;

// 12. Build what a request needs from that state.
export type NeedsFromState<Request extends LanguageRequest> = TODO; // TODO(koan)

type _12a = Expect<Equal<NeedsFromState<"hover">, "open documents">>;
type _12b = Expect<
  Equal<NeedsFromState<"rename">, "open documents" | "project graph" | "checker state">
>;
type _12c = Expect<Equal<NeedsFromState<"completion">, "open documents">>;
type _12d = Expect<
  Equal<NeedsFromState<"diagnostics">, "open documents" | "project graph" | "checker state">
>;

// 13. Build the consistency claim that project context buys: the editor's
//     diagnostics and the command line's are the same set.
export type MatchesCommandLine<Request extends LanguageRequest> = TODO; // TODO(koan)

type _13a = Expect<Equal<MatchesCommandLine<"diagnostics">, true>>;
type _13b = Expect<Equal<MatchesCommandLine<"hover">, false>>;
type _13c = Expect<Equal<MatchesCommandLine<"completion">, false>>;
type _13d = Expect<Equal<MatchesCommandLine<LanguageRequest>, boolean>>;

// ─── What LSP support does and does not say ───────────────────────────

// 14. Build the claims shipping an LSP server might be read as making.
export type Claim = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    Claim,
    "anyEditorCanConnect" | "requestsCanOverlap" | "tsserverPluginsKeepWorking" | "embeddedFrameworksKeepWorking"
  >
>;
type _14b = Expect<
  Equal<Extract<Claim, `${string}KeepWorking`>, "tsserverPluginsKeepWorking" | "embeddedFrameworksKeepWorking">
>;
type _14c = Expect<Equal<Extract<Claim, "anyEditorCanConnect">, "anyEditorCanConnect">>;
type _14d = Expect<Equal<Extract<Claim, "refactorsAreFaster">, never>>;

// 15. Build which of them follow.
export type FollowsFromLsp<TheClaim extends Claim> = TODO; // TODO(koan)

type _15a = Expect<Equal<FollowsFromLsp<"anyEditorCanConnect">, true>>;
type _15b = Expect<Equal<FollowsFromLsp<"requestsCanOverlap">, true>>;
type _15c = Expect<Equal<FollowsFromLsp<"tsserverPluginsKeepWorking">, false>>;
type _15d = Expect<Equal<FollowsFromLsp<"embeddedFrameworksKeepWorking">, false>>;
type _15e = Expect<Equal<FollowsFromLsp<Claim>, boolean>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the requests by what they need and whether they can overlap.
export type RequestProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<RequestProfile["hover"], "one file">>;
type _16b = Expect<Equal<RequestProfile["completion"], "one file">>;
type _16c = Expect<Equal<RequestProfile["rename"], "the project">>;
type _16d = Expect<Equal<RequestProfile["diagnostics"], "the project">>;
type _16e = Expect<Equal<keyof RequestProfile, LanguageRequest>>;

// 17. Report the extension surface: one mechanism carried, two waiting.
export type ExtensionProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<ExtensionProfile["lspClients"], true>>;
type _17b = Expect<Equal<ExtensionProfile["legacyPlugins"], false>>;
type _17c = Expect<Equal<ExtensionProfile["embeddedFrameworks"], false>>;
type _17d = Expect<Equal<ExtensionProfile["whatTheyAreWaitingFor"], "a replacement for the old API">>;
type _17e = Expect<Equal<ExtensionProfile["andTheyDependOn"], "the javascript api">>;

// 18. Report one request at a glance: its scope, whether it overlaps, what it
//     returns, and what the protocol still does not carry.
export type EditorReport<
  Request extends LanguageRequest,
  Mechanism extends ExtensionMechanism,
> = TODO; // TODO(koan)

type _18a = Expect<Equal<EditorReport<"hover", "lsp client">["scope"], "one file">>;
type _18b = Expect<Equal<EditorReport<"hover", "lsp client">["concurrent"], true>>;
type _18c = Expect<Equal<EditorReport<"hover", "lsp client">["response"], string>>;
type _18d = Expect<Equal<EditorReport<"rename", "tsserver plugin">["mechanismCarried"], false>>;
type _18e = Expect<Equal<EditorReport<"rename", "lsp client">["pluginsFollow"], false>>;
