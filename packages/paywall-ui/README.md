# pabal-expo-paywall-ui

RevenueCat-agnostic React Native paywall UI.

The consuming app owns RevenueCat configuration, offering fetch, purchase,
restore, analytics, navigation, and legal links. This package receives normalized
plan data and app-owned callbacks only.

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

## App Config

Keep app-owned media, benefits, copy, plan mapping, and theme in one typed config.
`valueStep` controls the first screen copy only. The paywall uses the top-level
`benefits` list for both the value step and purchase step.

```tsx
import {
  getDefaultPaywallCopy,
  getDefaultPaywallPlanOptions,
  type PaywallConfig,
} from "pabal-expo-paywall-ui";

const paywallBenefits = [
  {
    title: "Use every premium tool",
    description: "Remove limits and unlock the full workflow.",
    icon: <PremiumIcon />,
  },
  {
    title: "Store-managed subscription",
    description: "Restore access on devices signed into the same store account.",
    icon: <StoreIcon />,
  },
];

const paywallConfig = {
  hero: <HeroImage />,
  stepMode: "twoStep",
  freeTrial: { duration: { value: 7, unit: "day" } },
  valueStep: {
    title: "Unlock the full app",
    subtitle: "See what Pro adds before choosing a plan.",
  },
  benefits: paywallBenefits,
  copy: getDefaultPaywallCopy(undefined, {
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

const { planOptions, ...paywallPresentation } = paywallConfig;
```

Use `stepMode: "singleStep"` to skip the value step. Use `content` only when the
app needs a custom React Native body instead of the built-in benefit list.

## Convert Offerings

```tsx
import {
  createPaywallPlans,
  getDefaultSelectedPlanId,
} from "pabal-expo-paywall-ui";

const plans = createPaywallPlans(offering.availablePackages, planOptions);
const defaultSelectedPlanId = getDefaultSelectedPlanId(plans);
```

`createPaywallPlans()` accepts RevenueCat-like packages and preserves the
original object as `plan.rawPackage`.

```ts
interface PurchasesPackageLike {
  identifier: string;
  product: {
    price: number;
    priceString: string;
    pricePerPeriodString?: string | null;
    price_per_period?: string | null;
    pricePerMonthString?: string | null;
    pricePerYearString?: string | null;
    description?: string;
  };
}
```

## Render

```tsx
import { useState } from "react";
import Purchases from "react-native-purchases";
import {
  Paywall,
  getDefaultSelectedPlanId,
  type PaywallPlan,
} from "pabal-expo-paywall-ui";

const [selectedPlanId, setSelectedPlanId] = useState(defaultSelectedPlanId);

if (plans.length === 0) return <LoadingOrErrorState />;

<Paywall
  {...paywallPresentation}
  plans={plans}
  selectedPlanId={selectedPlanId ?? getDefaultSelectedPlanId(plans)}
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
/>;
```

Purchase success, cancellation, failure handling, analytics, toast, widget sync,
entitlement refresh, and navigation belong inside the app's `onPurchase`.

## Options

| Need | Use |
| --- | --- |
| Two-step or one-step flow | `stepMode` |
| Disable motion | `animationMode: "none"` |
| Trial duration or no trial | `freeTrial` |
| Top media | `hero`, `heroHeightRatio` |
| Benefit rows | `benefits` |
| Custom body layout | `content` |
| RevenueCat package mapping | `planOptions.*PackageIds` |
| Plan card order | `planOptions.displayOrder` |
| Theme colors | `theme` |
| Custom purchase button fill | `purchaseButtonBackground` |

## Profile Section

Add this only when the app needs to show subscription status in profile/settings.

```tsx
import {
  ProfileSubscriptionSection,
  type ProfileIdentifierItem,
  type ProfileSubscriptionConfig,
} from "pabal-expo-paywall-ui";

const profileIdentifiers: ProfileIdentifierItem[] = [
  {
    key: "anonymous-user-id",
    label: "User ID",
    value: userId,
  },
  {
    key: "revenuecat-id",
    label: "RevenueCat ID",
    value: customerInfo.originalAppUserId,
  },
];

const copyProfileIdentifier = async (item: ProfileIdentifierItem) => {
  if (!item.value) return;
  await copyToClipboard(item.value);
};

const profileSubscriptionConfig = {
  benefits: paywallBenefits,
  copy: {
    subscribedTitle: "Pro is active",
    notSubscribedTitle: "Upgrade to Pro",
    notSubscribedSubtitle: "Unlock the full app experience.",
    manageSubscriptionButton: "Manage subscription",
    restorePurchasesButton: "Restore purchases",
  },
  headerIcon: <AppIcon />,
  identifierSection: {
    copy: {
      copyButtonAccessibilityLabel: "Copy identifier",
      hideButtonLabel: "Hide identifiers",
      showButtonLabel: "Show identifiers",
    },
    defaultExpanded: true,
    isEnabled: true,
    items: profileIdentifiers,
    onCopy: copyProfileIdentifier,
  },
} satisfies ProfileSubscriptionConfig;

<ProfileSubscriptionSection
  {...profileSubscriptionConfig}
  isSubscribed={isPro}
  planLabel={isPro ? "Annual Pro" : undefined}
  renewalLabel={isPro ? "Managed by your store account" : undefined}
  onUpgrade={() => router.push("/paywall")}
  onManageSubscription={openStoreSubscriptionManagement}
  onRestorePurchases={restorePurchases}
/>;
```

When `isSubscribed` is true, upgrade and restore actions are hidden. Subscription
management remains visible.

`identifierSection` renders the profile ID copy UI. It is hidden by default; set
`isEnabled: true` to show the whole UI.
The package does not import a clipboard dependency, so the consuming app owns
`onCopy`.

## Validate

```bash
yarn typecheck
yarn test
yarn build
```

Real RevenueCat sandbox purchases belong in consuming apps. Do not add the
RevenueCat SDK to this package or the playground.
