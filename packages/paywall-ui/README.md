# pabal-expo-paywall-ui

RevenueCat-agnostic React Native UI for paywalls, onboarding helpers, and
profile subscription surfaces.

The consuming app owns RevenueCat configuration, offering fetch, purchase,
restore, analytics, navigation, legal links, permissions, and clipboard behavior.
This package receives normalized data and app-owned callbacks only.
Pass `freeTrial`, selected weekly/monthly/annual/lifetime plans, and
purchase/restore loading flags into `Paywall`; the package localizes the
default CTA text from those props. `freeTrial` can be global or overridden per
plan period or plan id.

It does not import `react-native-purchases` or `react-native-purchases-ui`.

The offer countdown uses a larger, high-contrast pill with `theme.accentTextColor`.
The header shows only the image, countdown, title and discount. Legacy
`copy.badgeText` and `copy.subtitle` remain accepted but are not rendered.
Hero media spans the full screen width; title padding is independent.
Omit `title` in `getDefaultLimitedTimeOfferCopy` to share the package's localized
two-line title between the app and playground.

`LimitedTimeOfferPaywall` renders a visually distinct annual or lifetime
promotion with a compact countdown, original/offer prices, a bundled default
illustration, and the same comparison, review, developer-note, legal, and fixed
CTA building blocks as the standard paywall. Pass a custom `hero` to replace the
default illustration. Pass a collapsible `featureComparison` to show its key
rows first and let users expand the complete feature list before the
always-visible normal monthly or annual products. Alternative plans use the
same `badgeText`, `monthlyPriceText`, and `selectedDescription` copy as the
standard `PlanCard`. `headerTheme.backgroundColor` customizes the promotion
header; setting it to `transparent` lets the app's paywall background continue
behind the illustration and header copy.
The featured offer stays selected by default. Apps persist eligibility and start
time, select the promotional store product, calculate discount copy, and use
`resolveLimitedTimeOfferWindow()` plus `resolvePaywallVariant()` for a safe
standard-paywall fallback. See
[Limited-Time Install Offers](../../docs/paywall.md#limited-time-install-offers).

Pass `locale` and build offer copy with `getDefaultLimitedTimeOfferCopy(locale,
{ badgeText, title, countdownLabel })`. The package owns the translated
"View other plans", close/restore/legal labels, and price-aware purchase CTA.
The close button stays fixed at the top right while content scrolls.
Offer trials default to `false`; pass `freeTrial` only after the app checks
store eligibility. The footer follows the selected plan's price, period and
trial, and lifetime purchases never display trial terms.
`copy.purchaseButtonByPeriod` and `copy.purchaseDisclosureByPeriod` customize
paid-plan actions. `copy.formatPurchaseButtonLabel` supports custom price-aware
labels and uses the same context as the standard paywall.
Use `plan.selectedDescription` for app-specific price comparisons; the same
description appears when selecting that plan in either paywall. Keep comparisons
appropriate to the app's actual local prices rather than assuming a universal
coffee price.

The paywall theme carries shape and typography tokens (`cardBorderRadius`,
`buttonBorderRadius`, `titleFontSize`) alongside colors. Depth effects stay
dependency-free: apps pass gradients into the `backgroundOverlay` slot, and
`heroFade` blends hero media into the background with an embedded alpha-ramp
image. See [Design Tokens And Ambient Background](../../docs/paywall.md#design-tokens-and-ambient-background).

A two-step paywall can carry a hero per step: `valueStep.hero` and its layout
props override the top-level ones on the value step, and each falls back on
its own when omitted. Leave them out and both steps share one hero. See
[A Hero Per Step](../../docs/paywall.md#a-hero-per-step).

The step itself is internal state, so `onStepView` is how an app follows it.
It reports every step the user lands on, the opening one included, which makes
a `value` → `purchase` funnel countable from one event. See
[Step Analytics](../../docs/paywall.md#step-analytics).

Package defaults assume the dark paywall the theme describes. An app on a
light `theme.backgroundColor` has to pass `PaywallHeroCarousel`'s
`inactiveDotColor`; the default is translucent white and disappears there.

Pre-onboarding `background` and video preview slots accept app-owned
`ReactNode` renderers. Apps can pass an image, video component, or animated
visual while keeping media dependencies and playback state outside this
package.

Main onboarding can use `OnboardingCompanionPreview` as a reusable phone/widget
and watch stage. Choose `widget`, `watch`, or `widget-watch`, then pass the
app's real widget and watch previews as ReactNode slots. Titles, descriptions,
CTA copy, device labels, and accessibility copy remain app-owned. The optional
`stageAccentColor` prop customizes the soft background circle without changing
the rest of the onboarding theme, and `showsStageGlow={false}` removes it.
`watchHealthPlatform` floats the bundled Apple Health / Health Connect logo as
an app-icon tile above the watch, `watchBadgeLabel` captions it, and
`watchBadge` swaps in an app-owned tile instead.

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
