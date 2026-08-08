# Paywall Design Refresh Plan

Status: shipped in 1.7.0 (visual defaults change, API is additive-only)

## Problem

The paywall reads as utilitarian ("settings screen") rather than persuasive
("sales screen"). Reference paywalls (Opal, Tide Guide) look richer without
heavier animation. Root causes, in priority order:

1. **Shape language**: every surface and the CTA use 8px radius with 1px
   borders. References use 16–20px cards and pill CTAs.
2. **No depth**: flat single-color background; cards defined by borders only.
   References layer ambient gradients, translucency, and glow.
3. **Hero disconnect**: the hero is a hard-clipped fixed-height box with a
   34px gap before content. References fade the hero into the background.
4. **Weak title hierarchy**: 26/600 title with no way to emphasize key words.
   References use larger titles with accent-colored keyword spans.

Animation is explicitly **not** the problem. The only animation change is
removing simultaneous infinite loops (badge shine + annual glow).

## Constraints

- Zero new dependencies. `peerDependencies` stay exactly:
  `react`, `react-native`, `react-native-safe-area-context`.
- Brand-specific pixels (real gradients, hero art) belong in consuming apps,
  passed through `ReactNode` slots — same pattern as the existing `hero` and
  `purchaseButtonBackground` props.
- API changes are additive. Visual defaults may change (this is a deliberate
  design-system change; see Versioning).
- Follow `docs/exec-plans/public-api-change.md` for every public prop added.

## Changes

### 1. Theme tokens (package)

Add flat tokens to `PaywallTheme` (flat keeps the shallow
`mergePaywallTheme` spread working):

| Token | Default | Previous hardcoded value |
| --- | --- | --- |
| `cardBorderRadius` | `16` | `8` |
| `buttonBorderRadius` | `999` (pill) | `8` |
| `titleFontSize` | `28` | `26` |

Applied to:

- `cardBorderRadius`: `PlanCard` container (annual glow ring = value + 2),
  `TrialNotice`, `PaywallFeatureComparison`, `PaywallBenefitList` card,
  `PaywallReviewSection`, `SupportMessageBubble`,
  `ProfileSubscriptionSection` cards, `ProfileIdentifiersSection` cards.
- `buttonBorderRadius`: `PurchaseButton`, value-step next button, profile
  action buttons.
- `titleFontSize`: paywall title (line height = round(size * 1.22)).

Radii that stay hardcoded: radio dot, nav icons, badges (already pill).

### 2. `backgroundOverlay` slot (package) + gradient recipe (apps)

- New `backgroundOverlay?: ReactNode` on `PaywallProps` and `PaywallConfig`.
- Rendered absolute-fill between the root background color and the scroll
  content, `pointerEvents="none"`.
- The package ships no gradient. Apps pass `expo-linear-gradient` (or
  anything) into the slot. `docs/paywall.md` gets a copy-paste "ambient
  glow" recipe: accent color at low alpha, top-weighted, fading to
  transparent. Use `withAlpha` from `color-utils` guidance in the recipe.

### 3. Hero fade (package, dependency-free)

- New `heroFade?: boolean` on `PaywallProps` and `PaywallConfig`.
  Default `false` (opt-in; apps with full-bleed hero art enable it).
- Implementation: an `Image` positioned absolutely over the bottom ~45% of
  the hero, source = embedded base64 data-URI PNG (1×64 white pixels with
  alpha ramp transparent→opaque), `tintColor = theme.backgroundColor`,
  `resizeMode="stretch"`. Pure RN, no asset files, no Metro/`require`
  concerns, nothing to copy into `dist`.

### 4. Title emphasis segments (package)

- New type `PaywallTitleSegment = string | { text: string; emphasized?: boolean }`.
- New optional `titleSegments?: PaywallTitleSegment[]` on `PaywallCopy` and
  `PaywallValueStep`. When present it wins over `title` for rendering;
  `title` remains required as the accessibility/fallback string.
- Emphasized segments render in `theme.accentColor`, same font size/weight
  (color-only emphasis keeps the restrained-weight rule).
- No locale files change: segments are app-provided copy, and default locale
  copy keeps using plain `title`.

### 5. Animation loop cleanup (package)

- In `PlanCard`, suppress the badge shine loop while the annual glow loop is
  active (`shouldAnimateBadge` excludes `shouldHighlightAnnualPlan`).
  One ambient loop at a time.

### 6. Hero presets (package) — promoted after playground validation

- `PaywallHeroBeforeAfter`: Opal-style before/after stats hero. All labels
  and values are required props (app-localized). The per-column area under
  the value is an open `ReactNode` slot (`beforeContent` / `afterContent`)
  so apps can render their own chart or visual; the built-in mini bar
  chart (`beforeBarHeights` / `afterBarHeights`) is only the default
  example.
- `PaywallHeroCarousel`: feature carousel hero. Swipeable (paging
  ScrollView) and auto-advancing; auto-advance pauses while the user
  swipes. Loops infinitely in both directions via edge-clone pages with a
  silent snap after the scroll settles (`hero-carousel-math.ts` holds the
  tested position logic). `autoAdvanceIntervalMs` tunes the cadence
  (0 disables).
- Both render on transparent backgrounds so the `backgroundOverlay` glow
  stays visible behind them.

### 7. Comparison cell styles (package)

- `featureComparison.includedStyle: "circledCheck"` renders checkmarks in
  accent-tinted circular badges (same color both columns).
- `featureComparison.excludedStyle: "hidden"` leaves excluded cells
  visually empty instead of the en-dash (accessibility labels still apply).
- `featureComparison.includedColor` overrides the check color (e.g. a
  universal green) in either style.

## Out of scope (later iterations)

- Serializable hero/config presets for remote A/B testing.
- Bulk version-bump tooling for consuming apps.

## Playground verification

The playground demonstrates every refresh feature (`apps/playground`):

- **Design** toggle (Paywall settings): `Refresh` vs `Legacy` — legacy
  reproduces the pre-refresh look (radius 8, title 26, no fade/glow) for
  side-by-side comparison.
- **Product** selector: fake products proving the system works across brand
  colors, hero types, and comparison styles. Heroes later became per step, so
  each product now carries a hero *pairing* and the original six collapsed
  into three. See [Playground Products](./paywall.md#playground-products) for
  the current list; that section is canonical and this plan does not track it.

## Docs and validation

- Update `docs/paywall.md` (new props + ambient glow recipe) and
  `packages/paywall-ui/README.md` (prop contract).
- Update `AGENTS.md` UI rule: card radius is now themeable via
  `cardBorderRadius` (default 16); drop the fixed-8px rule.
- Tests: `mergePaywallTheme` token merging; title-segment normalization
  helper; hero-fade data URI sanity.
- Run `yarn typecheck`, `yarn test`, `yarn build`.

## Versioning

- Ship as a **minor** bump (e.g. `1.7.0`): API additive, but visual defaults
  change (radius, title size). Consuming apps pin exact versions, so nothing
  changes until an app deliberately upgrades. Apps that want the old look
  back set `cardBorderRadius: 8`, `buttonBorderRadius: 8`,
  `titleFontSize: 26` in their theme.
