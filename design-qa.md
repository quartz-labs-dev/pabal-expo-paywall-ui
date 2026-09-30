# Design QA — Limited-time offer paywall

## 2026-10-01 — 1.19.2 selected plans and fixed controls

- Reference: user-supplied monthly/yearly card capture (373×330 cropped region)
  and standard purchase-footer capture. Compared with the same yearly-selected
  state in the 393×852 mobile playground. The source region and rendered screen
  were opened together for the plan-card comparison.
- Typography/layout: standard PlanCard title, prices, radio, badge and selected
  description slots remain shared. Longer translated descriptions wrap instead
  of truncating. Monthly and annual stay visible after features.
- Colors/tokens: playground intentionally uses its existing teal theme rather
  than Sportling's yellow; selection, badge and CTA all use the same accent.
  Fixed close icon uses the theme surface to stay legible over light or dark
  header imagery. Earlier translucent-background contrast risk was corrected
  before final capture.
- Image quality: bundled hero is unchanged; no replacement or crop was added.
- Copy/content: heading is now package-localized “다른 플랜 보기”. Monthly,
  annual and lifetime prices interpolate into the same app-owned comparison
  templates used by the standard preview. Paid footer shows actual selected
  price and period; lifetime displays one-time purchase rather than trial copy.
- Interactions: monthly → annual → lifetime updated the CTA and disclosure;
  only the selected card's comparison was visible. X remained fixed during
  scrolling and returned to the playground home. Console error log was empty.
- Automated verification: typecheck, 166 tests and package library build passed.
  Tests include all 74 locales, per-period trial eligibility, lifetime trial
  exclusion, actual price updates and custom CTA/disclosure.
- Native store purchase and iOS/Android rendering remain consumer-app checks.
  App export/prebuild was omitted per the user's app-build constraint.

final result: passed

## Target

- References: the limited-offer, feature-comparison, plan-card, and lower-content screenshots supplied by the user
- Implementation: `LimitedTimeOfferPaywall` in the dedicated playground route
- Preview: `http://localhost:8087/offer-paywall?locale=ko-KR`

## Visual and interaction review

- The package keeps a warm default header surface, while the playground uses a transparent header so the selected standard-paywall theme continues behind the illustration and offer copy.
- The bundled illustration is an original hourglass, star trail, and open deep-teal gift box composition. It avoids the reference's hands, red square gift, and elliptical ground-line composition.
- The header hierarchy is illustration → compact countdown pill → special-offer label → lifetime headline → discount → supporting copy.
- The discounted lifetime plan remains the first and default selection.
- Four Free/Pro comparison rows appear first, followed by a localized toggle that reveals the remaining five rows in place. The monthly and yearly plans stay visible after the complete feature section without a plan dropdown.
- The normal plans reuse the standard `PlanCard` copy slots. Browser QA confirmed the yearly card shows its 58% badge, localized monthly equivalent, and selected savings sentence; selecting it updates the fixed CTA to `연간 Pro 시작하기`.
- Reviews, developer message, store disclosure, restore, privacy, and terms reuse the standard paywall components and appear after the normal plan cards.
- Accessibility output exposes the close action, combined countdown value, selectable plans, comparison values, reviews, legal links, and purchase CTA.
- No implementation error appeared during browser QA. The Expo compatibility notice for the patch-level Expo version remains outside this change.

## Playground entry split

- The home screen keeps independent entries for the standard paywall and special-offer paywall.
- The offer route retains separate controls for offer duration, lifetime discount, and normal-plan visibility.
- The standard paywall route and configuration remain separate from the limited-offer route.

## Result

final result: passed
