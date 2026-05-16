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
`valueStep` controls the first screen title, subtitle, and body only. The first
screen Next button label is localized by the package and is not app-configurable.
In two-step mode, the top-level `benefits` list and custom `content` body render
on the value step only and are hidden on the purchase step.

```tsx
import {
  getDefaultPaywallCopy,
  getDefaultPaywallPlanOptions,
  type PaywallConfig,
  type PaywallFeatureComparison,
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
    onClick: openSubscriptionHelp,
  },
];

const featureComparison = {
  freeColumnTitle: "Free",
  paidColumnTitle: "Pro",
  highlightedColumn: "none",
  rows: [
    {
      id: "premium-widget",
      label: "Home Screen Widget",
      labelContent: <FeatureTitle title="Home Screen Widget" badge="New" />,
      free: { kind: "excluded", accessibilityLabel: "Not included" },
      paid: { kind: "included", accessibilityLabel: "Included" },
      onPress: openWidgetDetails,
    },
    {
      id: "saved-locations",
      label: "Custom locations",
      free: { kind: "text", text: "1 place", tone: "muted" },
      paid: { kind: "text", text: "Unlimited", tone: "accent" },
    },
  ],
} satisfies PaywallFeatureComparison;

const paywallConfig = {
  hero: <HeroImage />,
  supportMessageIcon: <AppLogoIcon />,
  stepMode: "twoStep",
  animationMode: "default",
  freeTrial: { duration: { value: 7, unit: "day" } },
  valueStep: {
    title: "Unlock the full app",
    subtitle: "See what Pro adds before choosing a plan.",
  },
  benefits: paywallBenefits,
  featureComparison,
  reviewSection: {
    reviews: [
      {
        rating: 5,
        quote: "The widget is exactly what I needed for quick daily checks.",
        author: "App Store review",
      },
    ],
  },
  copy: getDefaultPaywallCopy(undefined, {
    title: "Upgrade to Pro",
    subtitle: "Get the full app experience.",
    formatPurchaseButtonLabel: ({ plan, hasFreeTrial }) => {
      return hasFreeTrial ? "Start 7-day free trial" : `Start for ${plan.priceText}`;
    },
  }),
  planOptions: {
    ...getDefaultPaywallPlanOptions(),
    annualSelectedDescription:
      "About 90% less than a guided aurora hunt.",
    monthlySelectedDescription:
      "Flexible access without annual commitment.",
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

Use `stepMode: "singleStep"` to skip the value step. `animationMode` defaults
to `"default"` for the moving entrance and step transition. Use `"opacity"` for
fade-only paywall transitions, or `"none"` to render paywall and step changes
immediately. Use `featureComparison` when the paywall should compare Free and
Pro access in a table instead of rendering the built-in benefit list. Profile
subscription sections continue to use `benefits`.
Use `content` when the app needs a custom React Native body below the built-in
benefit list or feature comparison; in two-step mode, use `valueStep.content`
for custom first-step body content.
Feature comparison cells are explicit: `{ kind: "included" }` renders a check,
`{ kind: "excluded" }` renders a dash, and `{ kind: "text", text: "Unlimited" }`
renders app-provided usage copy as-is.
Feature row titles keep a required plain `label` for accessibility and may pass
`labelContent` when the app needs a custom React Native title component.
Use `reviewSection` for real user reviews on the purchase step. Its title is
localized by the package and is not app-configurable.
`getDefaultPaywallCopy()` includes a localized developer note below the review
section. Pass `supportMessage` only when the app needs to override it. The note
uses the bundled retriever image by default; pass `supportMessageIcon` when an
app needs its own icon. Pass `onOpenDeveloperWebsite` when tapping the note
should open the developer site.
Use `*SelectedDescription` plan options for short app-owned comparison copy
that appears only inside the currently selected plan card.
Add `onClick` to an object benefit when a row should open app-owned help or
detail UI; clickable benefit titles render with an underline.

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
const isEligibleForIntroOffer = useIntroOfferEligibility(customerInfo);
const freeTrial = isEligibleForIntroOffer ? paywallConfig.freeTrial : false;

if (plans.length === 0) return <LoadingOrErrorState />;

<Paywall
  {...paywallPresentation}
  freeTrial={freeTrial}
  plans={plans}
  selectedPlanId={selectedPlanId ?? getDefaultSelectedPlanId(plans)}
  onSelectPlan={setSelectedPlanId}
  onPurchase={async (plan: PaywallPlan) => {
    await Purchases.purchasePackage(plan.rawPackage);
  }}
  onRestore={async () => {
    await Purchases.restorePurchases();
  }}
  onOpenDeveloperWebsite={openDeveloperWebsite}
  onClose={() => router.back()}
  onOpenTerms={openTerms}
  onOpenPrivacy={openPrivacy}
/>;
```

Purchase success, cancellation, failure handling, analytics, toast, widget sync,
entitlement refresh, and navigation belong inside the app's `onPurchase`.

### Dynamic purchase button labels

Use `copy.formatPurchaseButtonLabel` when the CTA depends on the selected plan
or trial eligibility. The consuming app still owns the RevenueCat/customer logic
that decides whether a user can receive a trial. Users who already used a trial
or subscribed before should pass `freeTrial={false}`. The paywall then calls the
formatter with the selected `plan`, `hasFreeTrial`, and `trialDuration`.

```tsx
const copy = getDefaultPaywallCopy(locale, {
  title: "Upgrade to Pro",
  formatPurchaseButtonLabel: ({ plan, hasFreeTrial, trialDuration }) => {
    if (hasFreeTrial && trialDuration) {
      const unit = trialDuration.unit === "week" ? "week" : "day";
      return `Start ${trialDuration.value}-${unit} free trial`;
    }

    return `Start for ${plan.priceText}`;
  },
});

const freeTrial = isEligibleForIntroOffer
  ? { duration: { value: 7, unit: "day" } }
  : false;

<Paywall
  copy={copy}
  freeTrial={freeTrial}
  plans={plans}
  selectedPlanId={selectedPlanId}
  onSelectPlan={setSelectedPlanId}
  onPurchase={purchasePlan}
  onRestore={restorePurchases}
  onClose={closePaywall}
  onOpenTerms={openTerms}
  onOpenPrivacy={openPrivacy}
/>
```

For example, an app can show `Start 7-day free trial` to users who have never
subscribed and `Start for $9.99` to expired or returning users, without
rebuilding the whole `copy` object every time the selected plan changes.

## Options

| Need | Use |
| --- | --- |
| Two-step or one-step flow | `stepMode` |
| Fade-only transition | `animationMode: "opacity"` |
| Disable motion | `animationMode: "none"` |
| Trial duration or no trial | `freeTrial` |
| Top media | `hero`, `heroHeightRatio` |
| Benefit rows | `benefits` |
| Free/Pro feature table | `featureComparison` |
| Custom body below benefits | `content` |
| Purchase-step user reviews | `reviewSection` |
| RevenueCat package mapping | `planOptions.*PackageIds` |
| Plan card order | `planOptions.displayOrder` |
| Selected-plan comparison copy | `planOptions.*SelectedDescription` |
| Localized support note | `copy.supportMessage` |
| Support note logo | `supportMessageIcon` |
| Developer site link | `onOpenDeveloperWebsite` |
| Theme colors | `theme` |
| Custom purchase button fill | `purchaseButtonBackground` |
| Selected-plan CTA text | `copy.formatPurchaseButtonLabel` |

## Review Request Modal

Use this when an app wants a reusable, developer-led review prompt after a
positive moment. The package owns only the UI. The consuming app owns when to
show it, App Store or Play Store review APIs, feedback navigation, cooldowns,
and analytics.

```tsx
import {
  ReviewRequestModal,
  getDefaultReviewRequestModalCopy,
} from "pabal-expo-paywall-ui";

<ReviewRequestModal
  copy={getDefaultReviewRequestModalCopy(appLocale, {
    developerName: "Quartz",
  })}
  developerName="Quartz"
  styles={{
    card: { maxWidth: 360 },
    primaryButton: { backgroundColor: "#111827" },
  }}
  visible={isReviewPromptVisible}
  onDismiss={() => setIsReviewPromptVisible(false)}
  onRequestFeedback={() => {
    setIsReviewPromptVisible(false);
    router.push("/feedback");
  }}
  onRequestReview={async () => {
    setIsReviewPromptVisible(false);
    await requestStoreReview();
  }}
/>;
```

The default profile image is `packages/paywall-ui/src/assets/retriever.webp`.
Pass `profileImageSource` if an app needs its own developer photo.
`getDefaultReviewRequestModalCopy()` returns localized default copy for every
paywall text locale. Pass a custom `copy` when an app needs different wording.
Use `styles` for slot-level overrides when an app needs a different modal
treatment. Slots include `backdrop`, `card`, `title`, `message`,
`profileImage`, `actionGroup`, `primaryButton`, `secondaryButton`, and
`laterButton` plus matching button text slots.

## Profile Section

Add this only when the app needs to show subscription status in profile/settings.

```tsx
import {
  ProfileSubscriptionSection,
  getDefaultProfileSubscriptionCopy,
  type ProfileBenefitUsageSection,
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

const profileBenefitUsageSection = {
  usageColumnTitle: "Usage",
  proLimitColumnTitle: "Pro",
  items: [
    {
      id: "premium-widget",
      title: "Home Screen Widget",
      titleContent: <FeatureTitle title="Home Screen Widget" />,
      usageText: "Off",
      proLimitText: "Included",
      onPress: openWidgetDetails,
    },
    {
      id: "saved-locations",
      title: "Custom locations",
      usageText: "1 place",
      proLimitText: "Unlimited",
    },
  ],
} satisfies ProfileBenefitUsageSection;

const profileSubscriptionConfig = {
  benefits: paywallBenefits,
  benefitDisplayMode: "list",
  benefitUsageSection: profileBenefitUsageSection,
  copy: {
    ...getDefaultProfileSubscriptionCopy(appLocale, {
      productName: "Golden Horizon Pro",
    }),
    subscribedTitle: "Golden Horizon Pro",
    notSubscribedTitle: "Golden Horizon Pro",
    notSubscribedSubtitle: "Unlock the full app experience.",
  },
  headerIcon: <AppIcon />,
  supportMessageIcon: <AppIcon size={28} />,
  theme: {
    ...paywallConfig.theme,
    surfaceColor: "#151C24",
  },
  identifierSection: {
    defaultExpanded: true,
    isEnabled: true,
    items: profileIdentifiers,
    onCopy: copyProfileIdentifier,
  },
  locale: appLocale,
} satisfies ProfileSubscriptionConfig;

<ProfileSubscriptionSection
  {...profileSubscriptionConfig}
  benefitDisplayMode={profileBenefitDisplayMode}
  isSubscribed={isPro}
  planLabel={isPro ? "Annual Pro" : undefined}
  renewalLabel={isPro ? "Managed by your store account" : undefined}
  onUpgrade={() => router.push("/paywall")}
  onManageSubscription={openStoreSubscriptionManagement}
  onOpenDeveloperWebsite={openDeveloperWebsite}
  onRestorePurchases={restorePurchases}
/>;
```

When `isSubscribed` is true, upgrade and restore actions are hidden. Subscription
management remains visible.

Use `benefitDisplayMode: "list"` for the current profile benefit list. Use
`benefitDisplayMode: "usage"` with `benefitUsageSection` when the profile should
show title, current usage, and Pro allocation columns. Each usage item keeps a
required plain `title` for accessibility and may pass `titleContent` when the app
needs a custom React Native title component. If usage mode is
selected but `benefitUsageSection.items` is empty, the component falls back to
the list mode so the profile does not render an empty benefits area.

Prefer using the same profile title in both states, formatted as the app name
plus `Pro` (for example, `Golden Horizon Pro`). Put subscription state in the
badge, subtitle, plan label, or action button instead of changing the main title
to generic copy like `Pro is active` or `Upgrade to Pro`.

Use `theme.surfaceColor` for the profile card background. If the profile UI is
split between a lighter top card and a darker lower background, set
`surfaceColor` to the lighter top card color and keep `backgroundColor` for the
darker lower panel.

`identifierSection` renders the profile IDs copy UI. It is hidden by default; set
`isEnabled: true` to show the whole UI.
The show/hide/copy labels are localized by the package from `locale`; pass
`identifierSection.copy` only when the app needs to override that default copy.
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
