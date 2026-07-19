## 1. Project Scaffold

- [x] 1.1 Create the ESM `package.json` with pnpm, native TypeScript 7, the TypeScript 6 compatibility package, Vitest, tsx, and Node type dependencies
- [x] 1.2 Add strict ESNext/bundler `tsconfig.json` and Node-based Vitest configuration
- [x] 1.3 Add `src/utils/type-utils.ts` with the exact `TODO`, `Expect`, and `Equal` definitions
- [x] 1.4 Add `_smoke.test.ts` with one runtime assertion and one compile-time equality assertion
- [x] 1.5 Add the required `test`, `test:watch`, and `typecheck` scripts exactly as specified
- [x] 1.6 Install dependencies with pnpm and commit the generated lockfile
- [x] 1.7 Verify `pnpm test` and `pnpm typecheck` both pass on the lesson-free scaffold

## 2. Koan Authoring Infrastructure

- [x] 2.1 Implement focused packet discovery and `pnpm typecheck:koan -- <selector>` using the native compiler CLI
- [x] 2.2 Implement `pnpm koan -- <selector>` to run one packet's runtime and compile-time checks
- [x] 2.3 Implement `pnpm progress` without modifying lesson sources
- [x] 2.4 Implement author diagnostic verification for declared learner holes and documented negative fixtures
- [x] 2.5 Implement syllabus and packet-structure validation for numbering, stems, and companion files
- [x] 2.6 Add the phase directory skeleton, reviewed lesson-packet template, and initial `SYLLABUS.md`
- [x] 2.7 Verify focused commands against a temporary template packet, then remove that packet before `k-001`

## 3. Phase 1 - Type Relations and Advanced Generics

- [x] 3.1 Author and verify `k-001-structural-assignability`
- [x] 3.2 Author and verify `k-002-any-unknown-never`
- [x] 3.3 Author and verify `k-003-union-intersection-algebra`
- [x] 3.4 Author and verify `k-004-literal-widening-as-const-satisfies`
- [x] 3.5 Author and verify `k-005-generic-function-inference`
- [x] 3.6 Author and verify `k-006-parameter-site-inference`
- [x] 3.7 Author and verify `k-007-contextual-return-inference`
- [x] 3.8 Author and verify `k-008-generic-constraints`
- [x] 3.9 Author and verify `k-009-keyof-semantics`
- [x] 3.10 Author and verify `k-010-indexed-access-types`
- [x] 3.11 Author and verify `k-011-related-type-parameters`
- [x] 3.12 Author and verify `k-012-generic-defaults`
- [x] 3.13 Author and verify `k-013-const-type-parameters`
- [x] 3.14 Author and verify `k-014-noinfer`
- [x] 3.15 Author and verify `k-015-generic-classes`
- [x] 3.16 Author and verify `k-016-generic-methods-and-this`
- [x] 3.17 Author and verify `k-017-multiple-inference-candidates`
- [x] 3.18 Author and verify `k-018-best-common-type`
- [x] 3.19 Author and verify `k-019-contextual-positional-inference`
- [x] 3.20 Author and verify `k-020-higher-order-generic-inference`
- [x] 3.21 Author and verify `k-021-overloads-and-call-signatures`
- [x] 3.22 Author and verify `k-022-partial-inference-and-correlation-capstone`
- [x] 3.23 Run and record the Phase 1 runtime, diagnostic, syllabus, and performance quality gate

## 4. Phase 2 - Narrowing and Control-Flow Analysis

- [x] 4.1 Author and verify `k-023-typeof-narrowing`
- [x] 4.2 Author and verify `k-024-instanceof-narrowing`
- [x] 4.3 Author and verify `k-025-in-operator-narrowing`
- [x] 4.4 Author and verify `k-026-truthiness-narrowing`
- [x] 4.5 Author and verify `k-027-equality-and-nullish-narrowing`
- [x] 4.6 Author and verify `k-028-assignment-and-reachability`
- [x] 4.7 Author and verify `k-029-discriminated-unions`
- [x] 4.8 Author and verify `k-030-exhaustiveness-and-never`
- [x] 4.9 Author and verify `k-031-user-defined-type-predicates`
- [x] 4.10 Author and verify `k-032-assertion-functions`
- [x] 4.11 Author and verify `k-033-inferred-type-predicates`
- [x] 4.12 Author and verify `k-034-built-in-and-array-guards`
- [x] 4.13 Author and verify `k-035-aliased-conditions`
- [x] 4.14 Author and verify `k-036-destructured-discriminants`
- [x] 4.15 Author and verify `k-037-closures-callbacks-and-invalidation`
- [x] 4.16 Author and verify `k-038-const-assertions-and-narrowing`
- [x] 4.17 Author and verify `k-039-generic-narrowing-and-cfa-capstone`
- [x] 4.18 Run and record the Phase 2 quality gate

## 5. Phase 3 - Mapped Types

- [x] 5.1 Author and verify `k-040-mapped-types-and-propertykey`
- [x] 5.2 Author and verify `k-041-homomorphic-mapped-types`
- [x] 5.3 Author and verify `k-042-mapped-modifier-algebra`
- [x] 5.4 Author and verify `k-043-optionality-and-exact-optional-properties`
- [x] 5.5 Author and verify `k-044-mapping-arrays-and-tuples`
- [x] 5.6 Author and verify `k-045-key-remapping`
- [x] 5.7 Author and verify `k-046-filtering-keys-to-never`
- [x] 5.8 Author and verify `k-047-template-literal-keys`
- [x] 5.9 Author and verify `k-048-getter-and-event-transformations`
- [x] 5.10 Author and verify `k-049-mapping-object-unions`
- [x] 5.11 Author and verify `k-050-keyof-unions-and-distributed-mapping`
- [x] 5.12 Author and verify `k-051-string-number-symbol-keys`
- [x] 5.13 Author and verify `k-052-indexed-access-plus-mapping`
- [x] 5.14 Author and verify `k-053-conditional-property-transformations`
- [x] 5.15 Author and verify `k-054-schema-transformer-capstone`
- [x] 5.16 Run and record the Phase 3 quality gate

## 6. Phase 4 - Conditional Types

- [x] 6.1 Author and verify `k-055-conditional-type-basics`
- [x] 6.2 Author and verify `k-056-structural-assignability-in-conditionals`
- [x] 6.3 Author and verify `k-057-nested-conditional-types`
- [x] 6.4 Author and verify `k-058-deferred-generic-conditionals`
- [x] 6.5 Author and verify `k-059-distributive-conditional-types`
- [x] 6.6 Author and verify `k-060-preventing-distribution`
- [x] 6.7 Author and verify `k-061-never-in-conditionals`
- [x] 6.8 Author and verify `k-062-any-in-conditionals`
- [x] 6.9 Author and verify `k-063-unknown-in-conditionals`
- [x] 6.10 Author and verify `k-064-infer-basics`
- [x] 6.11 Author and verify `k-065-function-type-inference`
- [x] 6.12 Author and verify `k-066-multiple-and-nested-infer`
- [x] 6.13 Author and verify `k-067-constrained-infer`
- [x] 6.14 Author and verify `k-068-covariant-inference-candidates`
- [x] 6.15 Author and verify `k-069-contravariant-inference-candidates`
- [x] 6.16 Author and verify `k-070-overload-inference`
- [x] 6.17 Author and verify `k-071-recursive-conditionals`
- [x] 6.18 Author and verify `k-072-accumulator-recursion-and-performance`
- [x] 6.19 Author and verify `k-073-filtering-and-dispatch-capstone`
- [x] 6.20 Run and record the Phase 4 quality gate

## 7. Phase 5 - Template Literal Types

- [x] 7.1 Author and verify `k-074-template-literal-fundamentals`
- [x] 7.2 Author and verify `k-075-template-union-cross-products`
- [x] 7.3 Author and verify `k-076-intrinsic-string-casing`
- [x] 7.4 Author and verify `k-077-template-pattern-inference`
- [x] 7.5 Author and verify `k-078-prefix-and-suffix-parsing`
- [x] 7.6 Author and verify `k-079-type-level-split`
- [x] 7.7 Author and verify `k-080-type-level-trim`
- [x] 7.8 Author and verify `k-081-type-level-replace`
- [x] 7.9 Author and verify `k-082-type-level-join`
- [x] 7.10 Author and verify `k-083-mapped-template-keys`
- [x] 7.11 Author and verify `k-084-type-safe-event-names`
- [x] 7.12 Author and verify `k-085-routes-and-path-parameters`
- [x] 7.13 Author and verify `k-086-constrained-literal-parsing`
- [x] 7.14 Author and verify `k-087-query-string-parser`
- [x] 7.15 Author and verify `k-088-recursive-grammar-capstone`
- [x] 7.16 Run and record the Phase 5 quality gate

## 8. Phase 6 - Variadic Tuples

- [x] 8.1 Author and verify `k-089-tuple-identity-and-labels`
- [x] 8.2 Author and verify `k-090-readonly-tuples`
- [x] 8.3 Author and verify `k-091-optional-tuple-elements`
- [x] 8.4 Author and verify `k-092-rest-tuple-elements`
- [x] 8.5 Author and verify `k-093-tuple-spread-normalization`
- [x] 8.6 Author and verify `k-094-head-and-tail`
- [x] 8.7 Author and verify `k-095-last-and-init`
- [x] 8.8 Author and verify `k-096-tuple-to-union`
- [x] 8.9 Author and verify `k-097-tuple-length-and-indexing`
- [x] 8.10 Author and verify `k-098-tuple-concat`
- [x] 8.11 Author and verify `k-099-tuple-zip`
- [x] 8.12 Author and verify `k-100-tuple-reverse`
- [x] 8.13 Author and verify `k-101-function-argument-tuples`
- [x] 8.14 Author and verify `k-102-tuple-shape-preservation`
- [x] 8.15 Author and verify `k-103-tuple-adapter-capstone`
- [x] 8.16 Run and record the Phase 6 quality gate

## 9. Phase 7 - Recursive Types

- [x] 9.1 Author and verify `k-104-recursive-type-aliases`
- [x] 9.2 Author and verify `k-105-recursive-json-values`
- [x] 9.3 Author and verify `k-106-recursive-trees`
- [x] 9.4 Author and verify `k-107-recursion-base-cases-and-leaves`
- [x] 9.5 Author and verify `k-108-deep-partial`
- [x] 9.6 Author and verify `k-109-deep-readonly`
- [x] 9.7 Author and verify `k-110-deep-required`
- [x] 9.8 Author and verify `k-111-deep-mutable`
- [x] 9.9 Author and verify `k-112-collection-aware-recursion`
- [x] 9.10 Author and verify `k-113-dot-notation-paths`
- [x] 9.11 Author and verify `k-114-value-by-path`
- [x] 9.12 Author and verify `k-115-recursion-over-unions`
- [x] 9.13 Author and verify `k-116-cyclic-types-and-visited-guards`
- [x] 9.14 Author and verify `k-117-depth-limits-and-path-lens-capstone`
- [x] 9.15 Run and record the Phase 7 quality gate

## 10. Phase 8 - Type-Level Programming

- [x] 10.1 Author and verify `k-118-rebuild-pick`
- [x] 10.2 Author and verify `k-119-rebuild-omit`
- [x] 10.3 Author and verify `k-120-rebuild-exclude-and-extract`
- [x] 10.4 Author and verify `k-121-rebuild-nonnullable`
- [x] 10.5 Author and verify `k-122-rebuild-partial-and-required`
- [x] 10.6 Author and verify `k-123-rebuild-readonly-and-record`
- [x] 10.7 Author and verify `k-124-rebuild-returntype`
- [x] 10.8 Author and verify `k-125-rebuild-parameters`
- [x] 10.9 Author and verify `k-126-constructor-utility-types`
- [x] 10.10 Author and verify `k-127-rebuild-awaited`
- [x] 10.11 Author and verify `k-128-this-utility-types`
- [x] 10.12 Author and verify `k-129-compose-and-pipe-types`
- [x] 10.13 Author and verify `k-130-curry-and-partial-application`
- [x] 10.14 Author and verify `k-131-type-level-boolean-logic`
- [x] 10.15 Author and verify `k-132-type-level-equality-and-comparison`
- [x] 10.16 Author and verify `k-133-tuple-arithmetic-addition`
- [x] 10.17 Author and verify `k-134-subtraction-comparison-and-ranges`
- [x] 10.18 Author and verify `k-135-type-level-string-toolbelt`
- [x] 10.19 Author and verify `k-136-union-algorithms`
- [x] 10.20 Author and verify `k-137-type-level-interpreter-capstone`
- [x] 10.21 Run and record the Phase 8 quality gate

## 11. Phase 9 - Advanced API Patterns

- [x] 11.1 Author and verify `k-138-branded-types`
- [x] 11.2 Author and verify `k-139-opaque-module-types`
- [x] 11.3 Author and verify `k-140-phantom-types`
- [x] 11.4 Author and verify `k-141-unique-symbol-identity`
- [x] 11.5 Author and verify `k-142-covariance`
- [x] 11.6 Author and verify `k-143-contravariance`
- [x] 11.7 Author and verify `k-144-invariance`
- [x] 11.8 Author and verify `k-145-variance-annotations`
- [x] 11.9 Author and verify `k-146-bivariance-methods-and-properties`
- [ ] 11.10 Author and verify `k-147-deliberate-soundness-holes`
- [ ] 11.11 Author and verify `k-148-accumulating-builders`
- [ ] 11.12 Author and verify `k-149-polymorphic-this-and-f-bounds`
- [ ] 11.13 Author and verify `k-150-typestate`
- [ ] 11.14 Author and verify `k-151-typed-transition-tables`
- [ ] 11.15 Author and verify `k-152-type-safe-event-emitters`
- [ ] 11.16 Author and verify `k-153-event-map-transformations`
- [ ] 11.17 Author and verify `k-154-fluent-mini-dsls`
- [ ] 11.18 Author and verify `k-155-xor-and-exactly-one-types`
- [ ] 11.19 Author and verify `k-156-exact-object-and-at-least-one-types`
- [ ] 11.20 Author and verify `k-157-correlated-unions`
- [ ] 11.21 Author and verify `k-158-higher-kinded-type-emulation`
- [ ] 11.22 Author and verify `k-159-extensible-registry-capstone`
- [ ] 11.23 Run and record the Phase 9 quality gate

## 12. Phase 10 - TypeScript 5.x Feature Laboratories

- [ ] 12.1 Author and verify `k-160-decorator-mental-model`
- [ ] 12.2 Author and verify `k-161-class-decorators`
- [ ] 12.3 Author and verify `k-162-method-decorators`
- [ ] 12.4 Author and verify `k-163-field-decorators`
- [ ] 12.5 Author and verify `k-164-accessor-and-auto-accessor-decorators`
- [ ] 12.6 Author and verify `k-165-decorator-factories-and-composition`
- [ ] 12.7 Author and verify `k-166-well-typed-generic-decorators`
- [ ] 12.8 Author and verify `k-167-decorator-initializers`
- [ ] 12.9 Author and verify `k-168-decorator-metadata`
- [ ] 12.10 Author and verify `k-169-synchronous-resource-management`
- [ ] 12.11 Author and verify `k-170-asynchronous-resource-management`
- [ ] 12.12 Author and verify `k-171-disposal-stacks-and-suppressed-errors`
- [ ] 12.13 Author and verify `k-172-unrelated-getter-setter-types`
- [ ] 12.14 Author and verify `k-173-easier-undefined-returns`
- [ ] 12.15 Author and verify `k-174-jsx-elementtype-and-namespaced-attributes`
- [ ] 12.16 Author and verify `k-175-tuple-label-relaxation`
- [ ] 12.17 Author and verify `k-176-methods-on-array-unions`
- [ ] 12.18 Author and verify `k-177-copying-array-methods`
- [ ] 12.19 Author and verify `k-178-symbols-as-weak-collection-keys`
- [ ] 12.20 Author and verify `k-179-import-attributes`
- [ ] 12.21 Author and verify `k-180-resolution-mode`
- [ ] 12.22 Author and verify `k-181-switch-true-narrowing`
- [ ] 12.23 Author and verify `k-182-boolean-comparison-narrowing`
- [ ] 12.24 Author and verify `k-183-symbol-hasinstance-narrowing`
- [ ] 12.25 Author and verify `k-184-object-and-map-groupby`
- [ ] 12.26 Author and verify `k-185-preserved-closure-narrowing`
- [ ] 12.27 Author and verify `k-186-noinfer-release-lab`
- [ ] 12.28 Author and verify `k-187-inferred-predicate-release-lab`
- [ ] 12.29 Author and verify `k-188-constant-indexed-control-flow-analysis`
- [ ] 12.30 Author and verify `k-189-isolated-declarations`
- [ ] 12.31 Author and verify `k-190-configdir`
- [ ] 12.32 Author and verify `k-191-regexp-syntax-checking`
- [ ] 12.33 Author and verify `k-192-jsdoc-import`
- [ ] 12.34 Author and verify `k-193-iterator-helpers`
- [ ] 12.35 Author and verify `k-194-strict-builtin-iterator-return`
- [ ] 12.36 Author and verify `k-195-unchecked-side-effect-imports`
- [ ] 12.37 Author and verify `k-196-arbitrary-module-identifiers`
- [ ] 12.38 Author and verify `k-197-syntactic-truthy-nullish-checks`
- [ ] 12.39 Author and verify `k-198-no-check-and-build-through-errors`
- [ ] 12.40 Author and verify `k-199-never-initialized-variables`
- [ ] 12.41 Author and verify `k-200-relative-extension-rewriting`
- [ ] 12.42 Author and verify `k-201-generic-typed-arrays`
- [ ] 12.43 Author and verify `k-202-nodenext-json-imports`
- [ ] 12.44 Author and verify `k-203-granular-return-expression-checks`
- [ ] 12.45 Author and verify `k-204-require-esm-from-commonjs`
- [ ] 12.46 Author and verify `k-205-erasable-syntax-only`
- [ ] 12.47 Author and verify `k-206-lib-replacement`
- [ ] 12.48 Author and verify `k-207-import-defer`
- [ ] 12.49 Author and verify `k-208-node20-and-modern-module-config`
- [ ] 12.50 Run and record the Phase 10 quality gate

## 13. Phase 11 - TypeScript 6 Transition

- [ ] 13.1 Author and verify `k-209-strict-family-unpacked`
- [ ] 13.2 Author and verify `k-210-strict-adjacent-hardening-flags`
- [ ] 13.3 Author and verify `k-211-modern-compiler-defaults`
- [ ] 13.4 Author and verify `k-212-thisless-function-context-sensitivity`
- [ ] 13.5 Author and verify `k-213-stable-type-ordering`
- [ ] 13.6 Author and verify `k-214-es2025-lib-and-regexp-escape`
- [ ] 13.7 Author and verify `k-215-temporal-api-types`
- [ ] 13.8 Author and verify `k-216-map-upsert-methods`
- [ ] 13.9 Author and verify `k-217-set-iterator-promise-es2025-apis`
- [ ] 13.10 Author and verify `k-218-dom-iterable-consolidation`
- [ ] 13.11 Author and verify `k-219-module-resolution-tightening`
- [ ] 13.12 Author and verify `k-220-typescript-6-migration-capstone`
- [ ] 13.13 Run and record the Phase 11 quality gate with TypeScript 6 and 7 comparison fixtures

## 14. Phase 12 - TypeScript 7 Native Epilogue

- [ ] 14.1 Author and verify `k-221-native-compiler-architecture`
- [ ] 14.2 Author and verify `k-222-typescript-6-7-compatibility-contract`
- [ ] 14.3 Author and verify `k-223-checker-builder-parallelism`
- [ ] 14.4 Author and verify `k-224-native-watch-mode`
- [ ] 14.5 Author and verify `k-225-lsp-and-editor-architecture`
- [ ] 14.6 Author and verify `k-226-compiler-api-and-side-by-side-use`
- [ ] 14.7 Author and verify `k-227-configuration-hard-removals`
- [ ] 14.8 Author and verify `k-228-diagnostic-js-jsdoc-emit-differences`
- [ ] 14.9 Author and verify `k-229-native-parity-and-performance-capstone`
- [ ] 14.10 Run and record the Phase 12 quality gate

## 15. Final Repository Validation

- [ ] 15.1 Validate that all 229 syllabus entries and all four companion files per packet agree
- [ ] 15.2 Run the complete Vitest suite and fix any runtime regression
- [ ] 15.3 Run the complete author diagnostic inventory and fix every unintended TypeScript error
- [ ] 15.4 Verify a representative solved packet from every phase becomes type-clean without changing runtime tests
- [ ] 15.5 Measure and document full native TypeScript 7 typecheck and Vitest durations
- [ ] 15.6 Audit versioned lessons against cited official TypeScript primary sources
- [ ] 15.7 Review narrative ordering, cross-lesson prerequisites, drill variety, and edge-case coverage for gaps or filler
- [ ] 15.8 Complete the final `SYLLABUS.md` index and repository usage documentation
