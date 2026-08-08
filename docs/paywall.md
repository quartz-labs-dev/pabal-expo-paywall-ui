# Paywall

The paywall UI gives consuming apps a polished subscription screen without
coupling this package to RevenueCat. The app fetches offerings, decides trial
eligibility, performs purchases, handles analytics, and owns navigation.

## What The Package Provides

- `Paywall`: the React Native paywall screen
- `PaywallHeroBeforeAfter`: Opal-style before/after stats hero preset
- `PaywallHeroCarousel`: swipeable, auto-advancing feature carousel hero preset
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
| Before/after stats hero | `hero={<PaywallHeroBeforeAfter ... />}` |
| Feature carousel hero | `hero={<PaywallHeroCarousel ... />}` |
| Fade hero media into the background | `heroFade` |
| Fixed hero background with content rising over it as a sheet | `heroLayout: "pinned"` |
| Ambient background layer (gradient, glow) | `backgroundOverlay` |
| Accent-colored keywords in the title | `copy.titleSegments`, `valueStep.titleSegments` |
| Card and CTA shape language | `theme.cardBorderRadius`, `theme.buttonBorderRadius` |
| Title size | `theme.titleFontSize` |
| Benefit rows | `benefits` |
| Free/Pro comparison table | `featureComparison` |
| Circle-badge checkmarks (accent-tinted) | `featureComparison.includedStyle: "circledCheck"` |
| Hide the dash on excluded cells | `featureComparison.excludedStyle: "hidden"` |
| Green (or any) color for included checkmarks | `featureComparison.includedColor` |
| App review quotes | `reviewSection` |
| Custom body below benefits/comparison | `content`, `valueStep.content` |
| Plan card order and package mapping | `planOptions` |
| Selected-plan comparison copy | `planOptions.*SelectedDescription` |
| Selected-plan CTA text | localized by default, override with `copy.formatPurchaseButtonLabel` |
| Trial footer reassurance copy | `copy.trialNoPaymentDueNow` |
| Legal links and developer site | callback props |

## Design Tokens And Ambient Background

The theme carries shape and typography tokens alongside colors. Defaults are
`cardBorderRadius: 16`, `buttonBorderRadius: 999` (pill CTA), and
`titleFontSize: 28`. Apps that want the legacy look set them back to `8`,
`8`, and `26`.

The package ships no gradient dependency. To add depth, pass any component
into `backgroundOverlay`; it renders absolutely behind the scroll content
with touches disabled. Recommended recipe — a top-weighted ambient glow in
the app's accent color:

```tsx
import { LinearGradient } from "expo-linear-gradient";
import { getColorWithAlpha } from "pabal-expo-paywall-ui";

const accent = "#5AC8B7";

const paywallConfig = {
  // ...
  heroFade: true,
  backgroundOverlay: (
    <LinearGradient
      colors={[
        getColorWithAlpha(accent, 0.22),
        getColorWithAlpha(accent, 0.06),
        "transparent",
      ]}
      locations={[0, 0.35, 0.7]}
      style={{ flex: 1 }}
    />
  ),
} satisfies Partial<PaywallConfig>;
```

Keep the glow subtle (alpha ≤ 0.25 at the top). `heroFade` blends the bottom
of the hero into `theme.backgroundColor` with an embedded alpha-ramp image,
so full-bleed hero art no longer ends in a hard edge.

### Pinned Hero Layout

By default (`heroLayout: "scroll"`) the hero scrolls with the rest of the
content, as one continuous page. Set `heroLayout: "pinned"` to keep the
hero fixed behind the screen instead: the content becomes a rounded-top
sheet (using `theme.cardBorderRadius`) that starts slightly overlapping
into the hero and rises to fully cover it as the user scrolls. The hero
image itself never moves.

```tsx
const paywallConfig = {
  // ...
  hero: <TallPhotoHero />,
  heroHeightRatio: 0.42, // a taller hero reads better pinned
  heroFade: true,
  heroLayout: "pinned",
} satisfies Partial<PaywallConfig>;
```

Works with both step modes and both hero-scroll steps (value/purchase);
close/back buttons stay fixed above the hero either way, unchanged.

Title emphasis uses segments; `title` stays as the plain fallback string:

```tsx
copy: {
  ...getDefaultPaywallCopy(locale),
  title: "Start your free week and gain 2+ hours back",
  titleSegments: [
    "Start your free week and gain ",
    { text: "2+ hours", emphasized: true },
    " back",
  ],
},
```

Emphasized segments render in `theme.accentColor`.

## Hero Presets

Both presets render on a transparent background so the `backgroundOverlay`
glow stays visible behind them (unlike an opaque full-bleed photo hero,
which covers it). All copy is app-provided and app-localized.

```tsx
import {
  PaywallHeroBeforeAfter,
  PaywallHeroCarousel,
} from "pabal-expo-paywall-ui";

// Opal-style before/after stats. The area under each value is an open
// slot (`beforeContent` / `afterContent`); when omitted, a default mini
// bar chart renders as the example (tune with `beforeBarHeights` /
// `afterBarHeights`).
hero: (
  <PaywallHeroBeforeAfter
    accentColor="#5AC8B7"
    beforeLabel="Before"
    afterLabel="After"
    beforeValue="6h 32m"
    afterValue="1h 49m"
    // beforeContent={<MyChart data={before} />}
    // afterContent={<MyChart data={after} />}
  />
),

// Swipeable feature carousel; loops infinitely in both directions
// (1 -> 2 -> 3 -> 1 keeps moving forward, and swiping back from the
// first slide reaches the last). Auto-advances (pausing while the user
// swipes), `autoAdvanceIntervalMs` to tune, 0 to disable
hero: (
  <PaywallHeroCarousel
    accentColor="#5AC8B7"
    slides={[
      { icon: <MyIcon />, title: "Live Activities", description: "…" },
      { title: "Smart Alerts", description: "…" },
    ]}
  />
),
```

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
