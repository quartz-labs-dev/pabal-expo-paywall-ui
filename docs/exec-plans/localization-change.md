# Localization Change

Use this plan before adding or changing user-visible localized copy.

## Trigger

Read this before changing:

- paywall copy
- profile subscription or identifier copy
- onboarding copy
- permission prompt copy
- acquisition source labels
- nickname input copy

## Inspect First

- `packages/paywall-ui/src/locales/paywall/types.ts`
- `packages/paywall-ui/src/locales/paywall/*.ts`
- `packages/paywall-ui/src/locales/onboarding/types.ts`
- `packages/paywall-ui/src/locales/onboarding/*.ts`
- `packages/paywall-ui/src/locales/onboarding/acquisition-source.ts`
- `packages/paywall-ui/src/locales/onboarding/nickname-input.ts`
- locale-related tests under `packages/paywall-ui/__tests__/`

## Required Work

1. Add new user-visible keys to the relevant locale type so missing locale entries fail typecheck.
2. Update every supported locale file for that copy bundle.
3. Keep app-provided custom copy fallback separate from package-owned localized defaults.
4. Update relevant docs when consumers need to know about the copy behavior.
5. Add or update tests for locale resolution or fallback behavior.

## Test Guidance

- Tests that run in Node should import pure locale modules.
- Avoid importing onboarding option modules that pull in React Native when the test only needs locale data.
- Add a regression test when changing fallback behavior.
- For new required keys, typecheck is part of the test because it proves every locale implements the key.

## Validation

Run when possible:

```bash
yarn typecheck
yarn test
yarn build
```

## Common Misses

- Adding the English string only.
- Adding an optional key when the copy is package-owned and should be required.
- Reusing English fallback for non-English package-owned defaults.
- Importing React Native modules into Node locale tests.
- Updating paywall locale copy but forgetting profile copy that shares the same bundle.

## Completion Checklist

- [ ] Locale type updated when a new key is added.
- [ ] Every locale file in the affected bundle updated.
- [ ] Fallback behavior is intentional and tested.
- [ ] Relevant docs updated if consumer behavior changed.
- [ ] `yarn typecheck` run or skipped with reason.
- [ ] `yarn test` run or skipped with reason.
- [ ] `yarn build` run or skipped with reason.
