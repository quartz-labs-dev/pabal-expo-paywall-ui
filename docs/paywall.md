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
  freeTrial: { duration: { value: 7, unit: "day" } },
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
    displayOrder: ["annual", "monthly"],
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

## Render

```tsx
import { Paywall, type PaywallPlan } from "pabal-expo-paywall-ui";

<Paywall
  {...paywallPresentation}
  plans={plans}
  selectedPlanId={selectedPlanId ?? defaultSelectedPlanId}
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

Purchase success, cancellation, failure handling, analytics, entitlement refresh,
toast, widget sync, and navigation belong inside the app's callbacks.

## Supported Content

| Need | Use |
| --- | --- |
| One-step or two-step paywall | `stepMode` |
| Moving, fade-only, or no transition | `animationMode` |
| Trial duration or no trial | `freeTrial` |
| Top media | `hero`, `heroHeightRatio` |
| Benefit rows | `benefits` |
| Free/Pro comparison table | `featureComparison` |
| App review quotes | `reviewSection` |
| Custom body below benefits/comparison | `content`, `valueStep.content` |
| Plan card order and package mapping | `planOptions` |
| Selected-plan comparison copy | `planOptions.*SelectedDescription` |
| Selected-plan CTA text | `copy.formatPurchaseButtonLabel` |
| Trial footer reassurance copy | `copy.trialNoPaymentDueNow` |
| Legal links and developer site | callback props |

## Dynamic CTA Labels

Use `copy.formatPurchaseButtonLabel` when the button text depends on selected
plan or trial eligibility. The app still owns the RevenueCat/customer logic that
decides whether `freeTrial` should be enabled.

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

This lets a first-time user see `Start 7-day free trial` while a returning user
sees `Start for $9.99`, without rebuilding the whole paywall.

When `freeTrial` is enabled, the fixed footer shows localized reassurance copy
below the purchase button. `getDefaultPaywallCopy()` provides `No payment due now`
and its localized equivalents by default. Override `copy.trialNoPaymentDueNow`
only when the app needs different wording.
