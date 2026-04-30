# Project Guidance

## Communication

- Write concise, direct implementation notes.
- Lead with the result, changed files, and validation status.
- State assumptions briefly when they matter.

## Package Manager

- Do not use `npm`.
- Prefer `swpm` when adding dependencies.
- This workspace currently uses Yarn classic workspaces.
- Default validation commands are `yarn typecheck`, `yarn test`, and `yarn build`.

## Documentation

- When installing or wiring `pabal-expo-paywall-ui` into a consuming app for the first time, read `packages/paywall-ui/README.md` and follow its installation guide.
- Keep the root `README.md` focused on repository structure and workspace commands.

## Architecture Rules

- `packages/paywall-ui` must stay RevenueCat-agnostic.
- Do not import `react-native-purchases` from `packages/paywall-ui`.
- Do not import `react-native-purchases-ui` from `packages/paywall-ui`.
- `react-native-safe-area-context` is allowed in `packages/paywall-ui` for notch/home-indicator spacing and must remain a peer dependency.
- App-specific purchase, restore, analytics, navigation, legal link, and widget sync behavior belongs in app adapters.
- Keep `rawPackage` generic. The shared package must not know the concrete RevenueCat package type.
- If adding plan periods beyond monthly/annual, update the public types and tests in the same change.

## UI Rules

- Use React Native primitives and `StyleSheet` in the shared package.
- Do not add app-specific dependencies such as Tamagui, Lottie, Expo Video, or Skia to the shared package.
- Top media must be passed through the `hero: ReactNode` slot.
- Check small-screen text wrapping with `flexShrink`, `flexWrap`, and no unnecessary fixed widths.
- Keep card radius at 8px unless the design system changes.
- When applying alpha to theme colors in `packages/paywall-ui`, use `packages/paywall-ui/src/color-utils.ts`. Do not duplicate local hex/HSL/RGB parsing helpers such as `stripExistingAlpha`.
- Theme color alpha utilities must handle hex, RGB/RGBA, and HSL/HSLA inputs with comma and slash syntax, and must include regression tests for new color syntax.

## Localization Rules

- When adding or changing localized paywall copy, update every locale in `packages/paywall-ui/src/locales/paywall`.
- Do not add English-only fallback text for user-visible copy unless the fallback is only for app-provided custom `copy`.
- If a new localized copy key is added, make it required in the locale text type so missing locale entries fail typecheck.
- Add or update tests to verify non-English locales do not fall back to English for the changed copy.

## File Ownership

- `packages/paywall-ui/src/create-paywall-plans.ts`: pure adapter from RevenueCat-like packages to `PaywallPlan[]`.
- `packages/paywall-ui/src/types.ts`: public contract. Update README examples when this changes.
- `packages/paywall-ui/src/Paywall.tsx`: shared screen composition.
- `apps/playground`: mock state verification only. Do not add the real RevenueCat SDK here.

## Testing

- Add tests in `packages/paywall-ui/__tests__/create-paywall-plans.test.ts` when adapter logic changes.
- Update `packages/paywall-ui/README.md` and root `README.md` when the UI prop contract changes.
- Real purchase testing belongs in consuming apps with RevenueCat sandbox accounts, not in the playground.

## Validation

Run these when possible after changes:

```bash
yarn typecheck
yarn test
yarn build
```

If a validation step cannot be run, state exactly why.

## Not In Scope

- Aligning RevenueCat SDK versions across apps.
- Wrapping RevenueCat Hosted Paywalls.
- Building a `react-native-purchases-ui` footer paywall.
- Standardizing app analytics event names.
- Publishing automation for npm/GitHub Packages unless explicitly requested.
