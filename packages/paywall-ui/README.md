# @pabal/expo-paywall-ui

RevenueCat-agnostic React Native paywall UI.

This package renders a paywall from normalized data. It does not configure or call
RevenueCat directly.

It uses `react-native-safe-area-context` for notch and home-indicator spacing. The
consuming app must provide `SafeAreaProvider` at the app root.

## Public API

```ts
export { Paywall } from "@pabal/expo-paywall-ui";
export { createPaywallPlans, getDefaultSelectedPlanId } from "@pabal/expo-paywall-ui";
export type {
  PaywallPlan,
  PaywallProps,
  PaywallCopy,
  PaywallTheme,
  PurchasesPackageLike,
} from "@pabal/expo-paywall-ui";
```

## Types

```ts
interface PaywallPlan<TPackage = unknown> {
  id: string;
  period: "monthly" | "annual";
  title: string;
  priceText: string;
  monthlyPriceText?: string;
  discountText?: string;
  badgeText?: string;
  description?: string;
  isRecommended?: boolean;
  rawPackage: TPackage;
}
```

`rawPackage` is intentionally generic. In a RevenueCat app it will be the original
RevenueCat package object. The app uses it when purchasing.

## Adapter

```ts
const plans = createPaywallPlans(offering.availablePackages, {
  monthlyPackageIds: ["$rc_monthly"],
  annualPackageIds: ["$rc_annual"],
  annualBadgeText: "Best value",
  recommendedPeriod: "annual",
});
```

The helper only assumes this structural shape:

```ts
interface PurchasesPackageLike {
  identifier: string;
  product: {
    price: number;
    priceString: string;
    description?: string;
  };
}
```

This keeps the package independent from `react-native-purchases` versions.
When both monthly and annual packages are present, the helper compares
`monthly.product.price * 12` with `annual.product.price` and adds annual
discount copy such as `Save 33%`. This discount copy is used as the annual badge
instead of `annualBadgeText`.

## Render

```tsx
<Paywall
  hero={<HeroImage />}
  heroHeightRatio={0.2}
  plans={plans}
  selectedPlanId={selectedPlanId}
  benefits={["Unlock all premium features"]}
  copy={{
    title: "Upgrade to Pro",
    purchaseButton: "Continue",
    restoreButton: "Restore purchases",
    termsText: "Terms",
    privacyText: "Privacy",
  }}
  onSelectPlan={setSelectedPlanId}
  onPurchase={(plan) => purchasePackage(plan.rawPackage)}
  onRestore={restorePurchases}
  onClose={goBack}
  onOpenTerms={openTerms}
  onOpenPrivacy={openPrivacy}
/>
```

`heroHeightRatio` is optional and defaults to `0.2`, so the media slot uses 20%
of the current device height. Increase or decrease it per app when the paywall
needs a taller or shorter media section.

## Styling

Pass a partial theme when an app needs different colors.

```tsx
<Paywall
  theme={{
    accentColor: "#5AC8B7",
    backgroundColor: "#05080C",
  }}
  {...props}
/>
```

Do not add app-specific styling systems here. Keep the shared package on React
Native primitives.

## Safe Area

The paywall applies safe area insets to:

- close button top position
- scroll content bottom padding

Keep `react-native-safe-area-context` as a peer dependency so consuming apps own the
native version.

## Edge Cases The Caller Should Handle

- `plans.length === 0`: show an app-level loading or error state before rendering.
- purchase cancellation: app decides whether to show nothing or a message.
- restore with no active entitlement: app decides the toast/message.
- already-pro user: app should avoid showing the paywall or close it immediately.
- post-purchase sync: app updates widget/storage/analytics after purchase.

## Test

```bash
yarn workspace @pabal/expo-paywall-ui test
```

The current tests cover plan filtering, default selection, custom identifiers,
raw package preservation, and high-value price formatting.
