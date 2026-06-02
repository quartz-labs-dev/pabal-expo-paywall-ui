# Public API Change

Use this plan before changing any consumer-facing package contract.

## Trigger

Read this before changing:

- public props or config interfaces
- exported components
- exported helper functions
- exported types
- package entrypoints
- behavior documented for consuming apps

## Inspect First

- `packages/paywall-ui/src/types.ts`
- `packages/paywall-ui/src/index.ts`
- the relevant implementation file under `packages/paywall-ui/src`
- `packages/paywall-ui/README.md`
- the relevant feature doc under `docs/`
- relevant tests under `packages/paywall-ui/__tests__/`

## Required Work

1. Update the public type or helper signature in the owning source file.
2. Export new public components, helpers, or types from `packages/paywall-ui/src/index.ts`.
3. Update `packages/paywall-ui/README.md` when install, import, or usage examples change.
4. Update the relevant feature doc:
   - `docs/paywall.md` for paywall APIs
   - `docs/onboarding.md` for onboarding APIs
   - `docs/profile.md` for profile APIs
5. Update root `README.md` only when repository structure, workspace commands, or top-level docs links change.
6. Add or update tests for changed behavior.

## Test Guidance

- Adapter changes in `createPaywallPlans()` need tests in `packages/paywall-ui/__tests__/create-paywall-plans.test.ts`.
- Default copy or locale resolution changes need locale tests that prove non-English locales do not fall back to English unless the fallback is only for app-provided custom copy.
- Animation behavior changes need focused regression tests when the behavior can be isolated without a native runtime.
- If a public prop changes layout behavior, add the smallest test that protects the branch and document the manual visual check that remains.

## Validation

Run when possible:

```bash
yarn typecheck
yarn test
yarn build
```

If the change moves package source files, changes internal imports, or adds package static assets, also follow [Asset Or Import Change](./asset-or-import-change.md).

## Common Misses

- Updating `types.ts` but forgetting `src/index.ts` exports.
- Updating package docs but not the matching feature doc under `docs/`.
- Adding a new plan period without updating public types and tests.
- Adding English copy without updating every locale file.
- Running TypeScript only and skipping the package build script that cleans `dist` and copies assets.

## Completion Checklist

- [ ] Public contract updated in the owning source file.
- [ ] Public exports updated in `packages/paywall-ui/src/index.ts`.
- [ ] Package README updated if consumer usage changed.
- [ ] Feature doc updated if documented behavior changed.
- [ ] Tests added or updated for changed behavior.
- [ ] `yarn typecheck` run or skipped with reason.
- [ ] `yarn test` run or skipped with reason.
- [ ] `yarn build` run or skipped with reason.
