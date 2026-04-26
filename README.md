# @pabal/expo-paywall-ui

Shared React Native paywall UI for Pabal apps.

The core rule of this repository is simple:

```txt
The app owns RevenueCat.
@pabal/expo-paywall-ui owns UI and plan selection.
```

`@pabal/expo-paywall-ui` does not import `react-native-purchases` or
`react-native-purchases-ui`. Each app owns its RevenueCat version, offering fetch,
purchase, restore, analytics, navigation, widget sync, and post-purchase behavior.
This package only receives normalized plan data and app-provided callbacks.

## Repository Structure

```txt
pabal-expo-paywall-ui/
  apps/
    playground/            # Expo app for mock UI states
  packages/
    paywall-ui/            # @pabal/expo-paywall-ui package
```

## Data Flow

```txt
App RevenueCatProvider
  |
  | Purchases.getOfferings()
  v
RevenueCat availablePackages
  |
  | createPaywallPlans()
  v
PaywallPlan[]
  |
  | props
  v
<Paywall />
  |
  +-- onSelectPlan(plan.id)
  +-- onPurchase(plan.rawPackage)
  +-- onRestore()
  +-- onOpenTerms()
  +-- onOpenPrivacy()
  +-- onClose()
```

`rawPackage` is the original package object passed in by the app. For a RevenueCat
app, pass it back to the app-owned purchase function:

```ts
purchasePackage(plan.rawPackage);
```

## Package Contract

The app owns:

- RevenueCat SDK version and configuration
- `Purchases.getOfferings()`
- `Purchases.purchasePackage()`
- `Purchases.restorePurchases()`
- analytics events
- navigation
- terms/privacy browser
- post-purchase storage/widget sync
- toast/confetti/success handling

`@pabal/expo-paywall-ui` owns:

- paywall layout
- safe area spacing
- hero slot placement
- monthly/annual plan cards
- selected plan rendering
- purchase button loading/disabled state
- restore/legal callback buttons
- plan normalization helper

## Install

This is currently a local workspace package.

```bash
yarn install
```

Consuming apps must already provide `react-native-safe-area-context`. The current
Pabal Expo apps use the 5.6.x line, so the shared package declares it as a peer
dependency.

When testing inside a real app before publishing, use a file dependency first:

```json
{
  "dependencies": {
    "@pabal/expo-paywall-ui": "file:../pabal-expo-paywall-ui/packages/paywall-ui"
  }
}
```

After the API stabilizes, publish it to npm or GitHub Packages and pin an explicit
version in each app.

## Commands

```bash
yarn dev        # run the Expo playground
yarn web        # run the playground on web
yarn ios        # run the playground on iOS
yarn android    # run the playground on Android
yarn typecheck  # run TypeScript checks across all workspaces
yarn test       # run paywall-ui adapter tests
yarn build      # build paywall-ui into dist
```

Use `swpm` or `yarn` when adding dependencies. Do not use `npm`.

## Playground

`apps/playground` is not a real purchase testing app.

Its job is to verify UI states quickly without binding this package to a
RevenueCat SDK version.

Flow:

```txt
/           home screen for selecting a package scenario
/paywall    paywall rendered with the selected scenario
```

Scenarios available on the home screen:

- monthly + annual
- annual only
- monthly only
- long localized price

Mock RevenueCat data lives in:

```txt
apps/playground/src/fixtures/revenuecat-mock-data.ts
```

The mock follows the RevenueCat shape used by the React Native SDK:

```txt
PurchasesOfferings
  current: PurchasesOffering
    availablePackages: PurchasesPackage[]
      product: PurchasesStoreProduct
```

What to verify on `/paywall`:

- plan card rendering
- selected plan state
- purchasing loading state
- hero image slot
- restore / terms / privacy callbacks

Real RevenueCat sandbox purchases should be tested in the consuming apps. Do not
put RevenueCat SDKs in the playground unless the package boundary intentionally
changes.

## Using In A Pabal App

Fetch the RevenueCat offering in the app.

```tsx
import { useState } from "react";
import Purchases from "react-native-purchases";
import {
  Paywall,
  createPaywallPlans,
  getDefaultSelectedPlanId,
  type PaywallPlan,
} from "@pabal/expo-paywall-ui";

const plans = createPaywallPlans(offering.availablePackages, {
  annualBadgeText: "Best value",
  annualTitle: "Yearly",
  monthlyTitle: "Monthly",
  recommendedPeriod: "annual",
});
```

Then pass only plans and callbacks into the UI.

```tsx
const [selectedPlanId, setSelectedPlanId] = useState(
  getDefaultSelectedPlanId(plans),
);

const selectedPlanIdSafe =
  selectedPlanId ?? getDefaultSelectedPlanId(plans);

<Paywall
  hero={<MyAppPaywallHero />}
  plans={plans}
  selectedPlanId={selectedPlanIdSafe}
  benefits={[
    "Unlock all premium features",
    "Sync across supported devices",
    "Cancel anytime",
  ]}
  copy={{
    title: "Upgrade to Pro",
    subtitle: "Get the full app experience.",
    purchaseButton: "Continue",
    purchasingButton: "Processing",
    restoreButton: "Restore purchases",
    legalPrefix: "Subscription renews automatically.",
    termsText: "Terms",
    privacyText: "Privacy",
  }}
  onSelectPlan={setSelectedPlanId}
  onPurchase={async (plan: PaywallPlan) => {
    await Purchases.purchasePackage(plan.rawPackage);
  }}
  onRestore={async () => {
    await Purchases.restorePurchases();
  }}
  onClose={() => router.back()}
  onOpenTerms={openTerms}
  onOpenPrivacy={openPrivacy}
/>
```

App-specific post-purchase behavior belongs inside `onPurchase`.

```tsx
onPurchase={async (plan) => {
  trackEvent("Click Purchase Attempt", { source: "paywall" });
  const result = await purchasePackage(plan.rawPackage);

  if (!result) {
    trackEvent("Purchase Cancelled", { source: "paywall" });
    return;
  }

  trackEvent("Purchase Completed", { source: "paywall" });
  syncIsProToStorage(true);
  showSuccessToast();
  router.back();
}}
```

## Hero Media

Top media is passed through the `hero` slot.

Image:

```tsx
<Paywall hero={<Image source={heroImage} style={styles.heroImage} />} />
```

Video:

```tsx
<Paywall hero={<VideoView player={player} style={styles.heroVideo} />} />
```

This package does not own app-specific media dependencies such as `expo-video`,
Lottie, or Skia.

## Safe Area

`Paywall` uses `react-native-safe-area-context` to keep the close button and bottom
content clear of notches and home indicators.

Make sure the consuming app has a `SafeAreaProvider` at the app root. Expo Router
and React Navigation setups often already have this, but the playground wraps its
root explicitly.

## Tests

The current tests lock down the highest-risk adapter path for purchases.

```txt
createPaywallPlans()
  +-- filters to monthly/annual packages
  +-- recommends annual by default
  +-- falls back to the first plan when annual is missing
  +-- supports app-specific package identifiers
  +-- preserves the original rawPackage
  +-- handles long currency strings
```

Run:

```bash
yarn test
```

## Build Output

```bash
yarn build
```

Build output is generated in `packages/paywall-ui/dist`. Do not commit that
directory.

## Not In Scope

- Shared RevenueCat SDK initialization
- `react-native-purchases-ui` wrapper
- Real sandbox purchases in the playground
- App-specific dependencies such as Tamagui, Lottie, or Expo Video
- Standardizing app analytics event names

## Current Validation

Last verified:

```bash
yarn typecheck  # pass
yarn test       # pass, 6 tests
yarn build      # pass
```

The Expo web server did not open a port inside this Codex sandbox after
`Starting project...`, so browser verification was not completed here. Run this
locally:

```bash
yarn dev
```
