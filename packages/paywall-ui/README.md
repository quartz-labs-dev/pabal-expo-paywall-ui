# pabal-expo-paywall-ui

RevenueCat-agnostic React Native paywall UI.

This package renders a paywall from normalized data. It does not configure or call
RevenueCat directly.

It uses `react-native-safe-area-context` for notch and home-indicator spacing. The
consuming app must provide `SafeAreaProvider` at the app root.

## Install

```bash
yarn add pabal-expo-paywall-ui
```

## Public API

```ts
export { Paywall } from "pabal-expo-paywall-ui";
export { ProfileSubscriptionSection } from "pabal-expo-paywall-ui";
export { createPaywallPlans, getDefaultSelectedPlanId } from "pabal-expo-paywall-ui";
export type {
  CreatePaywallPlansOptions,
  PaywallAnimationMode,
  PaywallBenefit,
  PaywallBenefitDetail,
  PaywallConfig,
  PaywallPlan,
  PaywallProps,
  PaywallCopy,
  PaywallStepMode,
  PaywallTheme,
  PaywallValueStep,
  ProfileSubscriptionConfig,
  ProfileSubscriptionCopy,
  ProfileSubscriptionSectionProps,
  PurchasesPackageLike,
} from "pabal-expo-paywall-ui";
```

## Types

```ts
interface PaywallPlan<TPackage = unknown> {
  id: string;
  period: "monthly" | "annual" | "lifetime";
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

```ts
type PaywallStepMode = "twoStep" | "singleStep";
type PaywallAnimationMode = "default" | "none";

interface PaywallValueStep {
  title: string;
  subtitle?: string;
  benefits?: PaywallBenefit[];
  content?: ReactNode;
  nextButton?: string;
  nextButtonAccessibilityLabel?: string;
  closeButtonVisibility?: "hidden" | "visible";
}
```

## App Config

Keep each app's paywall copy, colors, media slot, and package mapping in one typed
config object.

```tsx
import { type PaywallConfig } from "pabal-expo-paywall-ui";

const paywallConfig = {
  hero: <HeroImage />,
  heroHeightRatio: 0.2,
  animationMode: "default",
  valueStep: {
    title: "Unlock the full app",
    subtitle: "See what Pro adds before choosing a plan.",
    benefits: [
      {
        title: "Get the result faster",
        description: "Use the premium tools without limits.",
        icon: <SpeedIcon />,
      },
      {
        title: "Keep access across devices",
        description: "Your subscription follows your store account.",
        icon: <SyncIcon />,
      },
    ],
  },
  benefits: [
    {
      title: "Unlock all premium features",
      description: "Get every premium tool in this app.",
      icon: <PremiumIcon />,
    },
    {
      title: "Cancel anytime",
      description: "Manage or cancel the subscription from the store.",
      icon: <StoreIcon />,
    },
  ],
  copy: {
    title: "Upgrade to Pro",
    purchaseButton: "Start trial",
    restoreButton: "Restore purchases",
    legalSeparator: "/",
    closeButtonAccessibilityLabel: "Close paywall",
    termsText: "Terms",
    privacyText: "Privacy",
  },
  planOptions: {
    formatDiscountText: (discountPercentage) => `Save ${discountPercentage}%`,
    formatMonthlyPriceText: (monthlyPriceText) => `${monthlyPriceText} / mo`,
    lifetimeBadgeText: "One-time payment",
    recommendedPeriod: "annual",
  },
  theme: {
    accentColor: "#5AC8B7",
    backgroundColor: "#05080C",
    primaryTextColor: "#F5F7FA",
  },
} satisfies PaywallConfig;

const { planOptions, ...paywallPresentation } = paywallConfig;
```

When `valueStep` is present, `Paywall` defaults to a two-step flow:

1. value step: no close button, no prices, no restore/legal links, compact right-aligned primary-color `nextButton`
2. purchase step: close button visible, plan selector, restore/legal links, full-width purchase button

The value step is app-configurable through `hero`, `valueStep.title`,
`valueStep.subtitle`, `valueStep.benefits`, `valueStep.content`, and
`valueStep.closeButtonVisibility`. `nextButton` and
`nextButtonAccessibilityLabel` are fixed UI copy from `copy` by default and can
still be overridden on `valueStep` when an app needs a custom label.

Use `stepMode: "singleStep"` to opt out and render the classic one-step paywall
while keeping the same config object.

Animations are enabled by default. Use `animationMode: "none"` to render the
initial paywall and step changes immediately.

Use `benefits: string[]` for the simplest built-in checklist. Use
`benefits: [{ title, description, icon }]` when each benefit needs supporting
copy or an app-owned icon.
Use `content` for custom React Native content. If both are passed, `content`
replaces the built-in benefits list.

## Adapter

```ts
const plans = createPaywallPlans(offering.availablePackages, planOptions);
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
By default, `createPaywallPlans()` recognizes `$rc_monthly`, `$rc_annual`, and
`$rc_lifetime`. When both monthly and annual packages are present, the helper compares
`monthly.product.price * 12` with `annual.product.price` and adds annual
discount copy such as `Save 33%`. This discount copy is used as the annual badge
instead of `annualBadgeText`. Use `formatDiscountText` and
`formatMonthlyPriceText` to localize generated plan copy.

```ts
const plans = createPaywallPlans(offering.availablePackages, {
  annualTitle: "연간",
  monthlyTitle: "월간",
  formatDiscountText: (discountPercentage) => `${discountPercentage}% 할인`,
  formatMonthlyPriceText: (monthlyPriceText) => `월 ${monthlyPriceText}`,
});
```

## Render

```tsx
<Paywall
  {...paywallPresentation}
  plans={plans}
  selectedPlanId={selectedPlanId}
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

## Profile Subscription Section

Use `ProfileSubscriptionSection` inside an app-owned profile or settings screen
when the app needs to show Pro status, benefits, subscription management, restore,
and optional promo code entry. The component stays RevenueCat-agnostic; the app
owns every callback and message after each action.

```tsx
import { type ProfileSubscriptionConfig } from "pabal-expo-paywall-ui";

const profileSubscriptionConfig = {
  benefits: [
    {
      title: "Unlock all premium features",
      description: "Get every premium tool in this app.",
      icon: <PremiumIcon />,
    },
    {
      title: "Cancel anytime",
      description: "Manage the subscription from the store.",
      icon: <StoreIcon />,
    },
  ],
  copy: {
    subscribedTitle: "Pro is active",
    subscribedSubtitle: "Your premium benefits are available.",
    notSubscribedTitle: "Upgrade to Pro",
    notSubscribedSubtitle: "Unlock the full app experience.",
    benefitsTitle: "Pro benefits",
    upgradeButton: "Upgrade to Pro",
    manageSubscriptionButton: "Manage subscription",
    restorePurchasesButton: "Restore purchases",
    redeemPromoCodeButton: "Enter promo code",
  },
  headerIcon: <AppIcon />,
} satisfies ProfileSubscriptionConfig;

<ProfileSubscriptionSection
  {...profileSubscriptionConfig}
  isSubscribed={isPro}
  planLabel={isPro ? "Annual Pro" : undefined}
  renewalLabel={isPro ? "Renews from your store account" : undefined}
  showPromoCodeButton={!isPro && canRedeemPromoCode}
  onUpgrade={() => router.push("/paywall")}
  onManageSubscription={openStoreSubscriptionManagement}
  onRestorePurchases={restorePurchases}
  onRedeemPromoCode={redeemPromoCode}
/>
```

Pass `showPromoCodeButton={true}` only when the consuming app can present a promo
or offer-code flow. If `onRedeemPromoCode` is omitted, the promo button is hidden.
When `isSubscribed` is true, upgrade, restore, and promo-code actions are hidden
because the user already has Pro; subscription management remains visible.

The header icon and benefit body can be app-owned React Native content:

```tsx
<ProfileSubscriptionSection
  {...profileProps}
  headerIcon={<AppIcon />}
  content={<MyBenefitRows />}
/>
```

When `content` is provided, it replaces the built-in benefit list. Both
`Paywall` and `ProfileSubscriptionSection` accept benefit items as
`{ title, description, icon }`; `icon` is optional React Native content.

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

Pass `purchaseButtonBackground` when an app needs a custom button fill such as a
gradient. The shared package only receives React Native content and does not
depend on a specific gradient library.

```tsx
import { LinearGradient } from "expo-linear-gradient";

<Paywall
  purchaseButtonBackground={
    <LinearGradient
      colors={["#5AC8B7", "#3E8BFF"]}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    />
  }
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
yarn workspace pabal-expo-paywall-ui test
```

The current tests cover plan filtering, default selection, custom identifiers,
raw package preservation, and high-value price formatting.
