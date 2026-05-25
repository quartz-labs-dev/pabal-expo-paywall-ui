# pabal-expo-paywall-ui

RevenueCat-agnostic React Native UI for paywalls, onboarding helpers, and
profile subscription surfaces.

The consuming app owns RevenueCat configuration, offering fetch, purchase,
restore, analytics, navigation, legal links, permissions, and clipboard behavior.
This package receives normalized data and app-owned callbacks only.
Pass `freeTrial`, selected plans, and purchase/restore loading flags into
`Paywall`; the package localizes the default CTA text from those props.

It does not import `react-native-purchases` or `react-native-purchases-ui`.

## Install

```bash
yarn add pabal-expo-paywall-ui
```

If the consuming app uses `swpm`:

```bash
swpm add pabal-expo-paywall-ui
```

Wrap the app with `SafeAreaProvider`. `react-native-safe-area-context` is a peer
dependency.

## Docs

- [Paywall](../../docs/paywall.md): configure plans, benefits, trials, purchase
  callbacks, and RevenueCat-like package conversion.
- [Onboarding](../../docs/onboarding.md): pre-onboarding screen exports,
  pre-onboarding frame/content exports, onboarding frame/content exports,
  required prelude problem/solution frame, supported onboarding content types,
  package-owned nickname flow, gallery grid animation and image-only display
  controls, animation helpers, acquisition source options, permission prompt
  previews, prelude body paragraph migration guidance, and the required
  first-screen language selector placement under the title.
- [Profile](../../docs/profile.md): subscription status, benefit usage, and
  profile identifier UI.

## Validate

```bash
yarn typecheck
yarn test
yarn build
```

Real RevenueCat sandbox purchases belong in consuming apps. Do not add the
RevenueCat SDK to this package or the playground.
