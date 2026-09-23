# Design QA — Limited-time offer paywall

## Target

- Reference: Sportling 24-hour lifetime offer screenshot supplied by the user
- Implementation: `LimitedTimeOfferPaywall` mobile preview at `390 × 844`
- Preview: `http://localhost:8087/paywall?offer=1`

## Comparison

- The offer is visually distinct from the standard paywall through a dark navy surface, gold offer accents, and a dedicated overlapping content sheet.
- The hierarchy follows the reference pattern: special-offer declaration, benefit-focused title, segmented countdown, discounted lifetime price, benefits, one primary purchase action, and legal links.
- The original and discounted prices remain readable together, with the discount badge attached to the price card.
- `View all plans` is absent when `onViewAllPlans` is omitted, leaving one unambiguous conversion action.
- The purchase action remains fixed and reachable while the offer content scrolls.
- The hero is intentionally app-owned through the existing `hero` slot; the playground uses its bundled aurora fixture rather than Sportling production art.
- Accessibility output exposes the countdown as one combined time value and preserves close, purchase, restore, privacy, and terms actions.
- Browser console inspection showed no implementation errors. The only warning is React Native Web's existing deprecated `shadow*` style warning outside this change.

## Result

final result: passed
