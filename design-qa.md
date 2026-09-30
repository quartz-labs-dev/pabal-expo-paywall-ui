# Design QA — Limited-time offer paywall

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
