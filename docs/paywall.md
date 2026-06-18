# Paywall

The paywall UI gives consuming apps a polished subscription screen without
coupling this package to RevenueCat. The app fetches offerings, decides trial
eligibility, performs purchases, handles analytics, and owns navigation.

## What The Package Provides

- `Paywall`: the React Native paywall screen
- `createPaywallPlans()`: converts RevenueCat-like packages into `PaywallPlan[]`
- `getDefaultSelectedPlanId()`: selects the default plan from normalized plans
- `getDefaultPaywallCopy()`: localized default paywall copy
- `getDefaultPaywallPlanOptions()`: default package mapping and plan ordering

## Configure The Screen

Keep app-owned media, benefits, copy, plan mapping, and theme in one typed
config. This makes the integration easy to audit and keeps business logic out of
the UI package.

```tsx
import {
  getDefaultPaywallCopy,
  getDefaultPaywallPlanOptions,
  type PaywallConfig,
} from "pabal-expo-paywall-ui";

const paywallConfig = {
  hero: <HeroImage />,
  stepMode: "twoStep",
  animationMode: "default",
  freeTrial: {
    duration: { value: 7, unit: "day" },
    byPeriod: {
      weekly: { duration: { value: 3, unit: "day" } },
      annual: { duration: { value: 2, unit: "week" } },
    },
  },
  valueStep: {
    title: "Unlock the full app",
    subtitle: "See what Pro adds before choosing a plan.",
  },
  benefits: paywallBenefits,
  copy: getDefaultPaywallCopy(locale, {
    title: "Upgrade to Pro",
    subtitle: "Get the full app experience.",
  }),
  planOptions: {
    ...getDefaultPaywallPlanOptions(),
    displayOrder: ["annual", "monthly", "weekly"],
  },
  theme: {
    accentColor: "#5AC8B7",
    backgroundColor: "#05080C",
    primaryTextColor: "#F5F7FA",
  },
} satisfies PaywallConfig;
```

## Convert Offerings

```tsx
import {
  createPaywallPlans,
  getDefaultSelectedPlanId,
} from "pabal-expo-paywall-ui";

const plans = createPaywallPlans(offering.availablePackages, paywallConfig.planOptions);
const defaultSelectedPlanId = getDefaultSelectedPlanId(plans);
```

`createPaywallPlans()` accepts RevenueCat-like packages and preserves the
original object as `plan.rawPackage`, so the app can pass it back to RevenueCat
during purchase.

By default, the adapter recognizes RevenueCat package identifiers
`$rc_weekly`, `$rc_monthly`, `$rc_annual`, and `$rc_lifetime`. Apps with custom
package identifiers can pass `weeklyPackageIds`, `monthlyPackageIds`,
`annualPackageIds`, and `lifetimePackageIds` through `planOptions`.

## Render

```tsx
import { Paywall, type PaywallPlan } from "pabal-expo-paywall-ui";

<Paywall
  {...paywallPresentation}
  plans={plans}
  selectedPlanId={selectedPlanId ?? defaultSelectedPlanId}
  isPurchasing={isPurchasing}
  isRestoring={isRestoring}
  onSelectPlan={setSelectedPlanId}
  onPurchase={async (plan: PaywallPlan) => {
    await Purchases.purchasePackage(plan.rawPackage);
  }}
  onRestore={restorePurchases}
  onClose={() => router.back()}
  onOpenTerms={openTerms}
  onOpenPrivacy={openPrivacy}
/>;
```

Purchase success, cancellation, failure handling, restore loading state,
analytics, entitlement refresh, toast, widget sync, and navigation belong inside
the app's callbacks. Set `isPurchasing` or `isRestoring` while those callbacks
are running so the CTA shows the localized processing label and spinner.

## Supported Content

| Need | Use |
| --- | --- |
| One-step or two-step paywall | `stepMode` |
| Moving, fade-only, or no transition | `animationMode` |
| Trial duration, no trial, or plan-specific trials | `freeTrial` |
| Top media | `hero`, `heroHeightRatio` |
| Benefit rows | `benefits` |
| Free/Pro comparison table | `featureComparison` |
| App review quotes | `reviewSection` |
| Custom body below benefits/comparison | `content`, `valueStep.content` |
| Plan card order and package mapping | `planOptions` |
| Selected-plan comparison copy | `planOptions.*SelectedDescription` |
| Selected-plan CTA text | localized by default, override with `copy.formatPurchaseButtonLabel` |
| Trial footer reassurance copy | `copy.trialNoPaymentDueNow` |
| Legal links and developer site | callback props |

## Dynamic CTA Labels

`getDefaultPaywallCopy()` provides localized purchase CTA labels based on the
selected plan and `freeTrial` prop:

- free trial: `7 days free, then $29.99`
- no free trial: `Start for $29.99`
- loading: `Processing` with the button spinner

Use `copy.formatPurchaseButtonLabel` only when the app needs product-specific
CTA text. The app still owns the RevenueCat/customer logic that decides whether
`freeTrial` should be enabled.

`freeTrial` accepts the existing global forms and optional plan-specific
overrides:

```tsx
freeTrial={true}
freeTrial={false}
freeTrial={{ duration: { value: 7, unit: "day" } }}
freeTrial={{
  duration: { value: 7, unit: "day" },
  byPeriod: {
    weekly: { duration: { value: 3, unit: "day" } },
    monthly: true,
    annual: { duration: { value: 2, unit: "week" } },
  },
  byPlanId: {
    "custom-monthly-intro": false,
  },
}}
```

For the selected plan, `byPlanId` overrides `byPeriod`, and both override the
global `duration`. Lifetime plans never show a free trial.

```tsx
const copy = getDefaultPaywallCopy(locale, {
  formatPurchaseButtonLabel: ({ plan, hasFreeTrial, trialDuration }) => {
    if (hasFreeTrial && trialDuration) {
      return `Start ${trialDuration.value}-day free trial`;
    }

    return `Start for ${plan.priceText}`;
  },
});
```

This lets an app replace the default `7 days free, then $29.99` or
`Start for $9.99` labels without rebuilding the whole paywall.

When `freeTrial` is enabled, the fixed footer shows localized reassurance copy
below the purchase button. `getDefaultPaywallCopy()` provides `No payment due now`
and its localized equivalents by default. Override `copy.trialNoPaymentDueNow`
only when the app needs different wording.
