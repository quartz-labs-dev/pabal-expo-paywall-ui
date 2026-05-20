# Profile

The profile UI lets an app show subscription status, upgrade/manage actions,
benefit access, and optional debug identifiers in settings. The package renders
the surface. The app owns RevenueCat, clipboard, navigation, and support flows.

## What The Package Provides

- `ProfileSubscriptionSection`: subscription card for profile/settings
- `getDefaultProfileSubscriptionCopy()`: localized profile copy
- `getDefaultProfilePlanLabel()` and `getDefaultProfileRenewalLabel()`
- `getDefaultProfileIdentifiersCopy()`: localized show/hide/copy labels

## Render Subscription Status

Use this when the app needs to show whether the customer has Pro access and give
them a clear path to upgrade or manage the subscription.

```tsx
import {
  ProfileSubscriptionSection,
  getDefaultProfileSubscriptionCopy,
  type ProfileSubscriptionConfig,
} from "pabal-expo-paywall-ui";

const profileSubscriptionConfig = {
  benefits: paywallBenefits,
  benefitDisplayMode: "list",
  copy: {
    ...getDefaultProfileSubscriptionCopy(appLocale, {
      productName: "Golden Horizon Pro",
    }),
    subscribedTitle: "Golden Horizon Pro",
    notSubscribedTitle: "Golden Horizon Pro",
  },
  headerIcon: <AppIcon />,
  supportMessageIcon: <AppIcon size={28} />,
  theme: {
    ...paywallConfig.theme,
    surfaceColor: "#151C24",
  },
  locale: appLocale,
} satisfies ProfileSubscriptionConfig;

<ProfileSubscriptionSection
  {...profileSubscriptionConfig}
  isSubscribed={isPro}
  planLabel={isPro ? "Annual Pro" : undefined}
  renewalLabel={isPro ? "Managed by your store account" : undefined}
  onUpgrade={() => router.push("/paywall")}
  onManageSubscription={openStoreSubscriptionManagement}
  onOpenDeveloperWebsite={openDeveloperWebsite}
  onRestorePurchases={restorePurchases}
/>;
```

When `isSubscribed` is true, upgrade and restore actions are hidden.
Subscription management remains visible.

## Benefit Display Modes

Use `benefitDisplayMode: "list"` for the standard profile benefit list.

Use `benefitDisplayMode: "usage"` with `benefitUsageSection` when the profile
should show current usage next to the Pro allocation.

```tsx
const benefitUsageSection = {
  usageColumnTitle: "Usage",
  proLimitColumnTitle: "Pro",
  items: [
    {
      id: "saved-locations",
      title: "Custom locations",
      usageText: "1 place",
      proLimitText: "Unlimited",
    },
  ],
};
```

Each usage item keeps a required plain `title` for accessibility and may pass
`titleContent` when the app needs custom React Native title UI. If usage mode is
selected but `benefitUsageSection.items` is empty, the component falls back to
list mode so the profile does not render an empty benefits area.

## Identifier Section

`identifierSection` renders profile IDs for support/debugging. It is hidden by
default. Set `isEnabled: true` to show it.

```tsx
const profileIdentifiers = [
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
```

The package localizes show/hide/copy labels from `locale`. The package does not
import a clipboard dependency, so the consuming app owns `onCopy`.

## Copy Guidance

Prefer using the same profile title in both states, formatted as the app name
plus `Pro`, for example `Golden Horizon Pro`. Put subscription state in the
badge, subtitle, plan label, or action button instead of changing the main title
to generic copy like `Pro is active` or `Upgrade to Pro`.

Use `theme.surfaceColor` for the profile card background. If the profile UI is
split between a lighter top card and darker lower background, set `surfaceColor`
to the lighter top card color and keep `backgroundColor` for the lower panel.
