# Design QA — Limited-time offer paywall

## Target

- Reference: Sportling 24-hour lifetime offer screenshot supplied by the user
- Implementation: `LimitedTimeOfferPaywall` mobile preview at `390 × 844`
- Preview: `http://localhost:8087/paywall?offer=1`

## Comparison

- The offer is visually distinct from the standard paywall through a dark navy surface, gold offer accents, and a dedicated overlapping content sheet.
- The hierarchy follows the reference pattern: special-offer declaration, benefit-focused title, segmented countdown, discounted lifetime price, benefits, one primary purchase action, and legal links.
- The original and discounted prices remain readable together, with the discount badge attached to the price card.
- The generic `View all plans` escape is absent. A specific monthly/yearly disclosure stays collapsed beneath the featured lifetime card and keeps one footer CTA.
- Expanding the disclosure reveals normal-price monthly and yearly cards inline. Selecting either updates the footer CTA, and collapsing restores the lifetime offer selection.
- The purchase action remains fixed and reachable while the offer content scrolls.
- The hero is intentionally app-owned through the existing `hero` slot; the playground uses its bundled aurora fixture rather than Sportling production art.
- Accessibility output exposes the countdown as one combined time value and preserves close, purchase, restore, privacy, and terms actions.
- Browser console inspection showed no implementation errors. The only warning is React Native Web's existing deprecated `shadow*` style warning outside this change.

## Result

final result: passed

## Playground entry split

- Reference: the supplied Paywall Lab card with a title, settings action, and
  full-width launch button.
- The home screen now exposes two independent entries: `Standard paywall` at
  `/paywall` and `Special offer paywall` at `/offer-paywall`.
- The standard entry keeps package scenario, flow, animation, product, and
  trial controls in its own settings modal.
- The offer entry has a separate settings modal for 12/24/48-hour windows,
  20/30/40% lifetime discounts, and monthly/yearly alternative visibility.
- Browser QA confirmed that changing the offer to 40% updates the lifetime
  preview to `$17.99`, hiding alternatives removes their disclosure, and the
  dedicated route renders those settings. Defaults were restored to 24 hours,
  30%, and alternatives visible after the check.
- Both launch surfaces expose button semantics and route to distinct screens.
- The standard `/paywall` route was opened independently and still renders the
  configured standard paywall.
- No browser errors appeared. Existing React Native Web deprecation and
  development animation warnings remain outside this change.

final result: passed
