# Design QA — Limited-time offer paywall

## Target

- References: the three limited-offer, feature-comparison, and lower-content screenshots supplied by the user
- Implementation: `LimitedTimeOfferPaywall` in the dedicated playground route
- Preview: `http://localhost:8087/offer-paywall?locale=ko-KR`

## Visual and interaction review

- The offer header uses a warm cream surface and a dark paywall body so the temporary promotion is immediately distinct from the standard paywall.
- The bundled illustration is an original hourglass, star trail, and open deep-teal gift box composition. It avoids the reference's hands, red square gift, and elliptical ground-line composition.
- The header hierarchy is illustration → compact countdown pill → special-offer label → lifetime headline → discount → supporting copy.
- The discounted lifetime plan remains the first and default selection.
- Four Free/Pro comparison rows appear before the normal-price monthly and yearly plans. Both normal plans are always visible without a dropdown, and the remaining five comparison rows continue below them.
- Selecting monthly in browser QA changed both the selected card and the fixed footer CTA to `월간 Pro 시작하기`. The CTA stayed fixed while the content scrolled.
- Reviews, developer message, store disclosure, restore, privacy, and terms reuse the standard paywall components and appear after the remaining feature rows.
- Accessibility output exposes the close action, combined countdown value, selectable plans, comparison values, reviews, legal links, and purchase CTA.
- No implementation error appeared during browser QA. The Expo compatibility notice for the patch-level Expo version remains outside this change.

## Playground entry split

- The home screen keeps independent entries for the standard paywall and special-offer paywall.
- The offer route retains separate controls for offer duration, lifetime discount, and normal-plan visibility.
- The standard paywall route and configuration remain separate from the limited-offer route.

## Result

final result: passed
