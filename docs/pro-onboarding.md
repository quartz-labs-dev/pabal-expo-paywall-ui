# Pro Onboarding

Available since 1.21.0. Reference app: Post Black Belt
(`src/components/pro-guide/`, `docs/product-specs/pro-guide.md` there).
To add it to another app, paste `docs/pro-onboarding-adoption-prompt.md` into
that app's session.

Pro onboarding tells a subscriber what to try next. On the subscriber profile
it shows one "Try next" card and the app's Pro features by section, marks what
the app can prove is already in use, and folds the benefit usage table below
behind "View all Pro benefits". Apps can keep the classic profile or opt in.

## Two variants, one component

| Variant | How |
| --- | --- |
| Classic (unchanged) | `ProfileSubscriptionSection`, or `ProfileSubscriptionWithOnboarding` without `onboarding` |
| With Pro onboarding | `ProfileSubscriptionWithOnboarding` with `onboarding` |

```tsx
<ProfileSubscriptionWithOnboarding
  {...profileSubscriptionSectionProps}        // same props as today
  benefitUsageSection={benefitUsageSection}   // folded below the guide
  onboarding={{
    sections,      // ProOnboardingSection[]: { id, title, itemIds }
    items,         // Record<id, ProOnboardingItem>
    nextItemId,    // string | null
    onPressItem,   // (id, "next" | "list") => void, e.g. analytics
    onConfirmUsed, // (id) => void: record "Already used", pass a new nextItemId
  }}
/>
```

With `onboarding`, the layout is: the profile section without the table
(profile, actions, developer message) → separator → `ProOnboardingGuide` →
`ProfileBenefitUsageList` folded behind `copy.viewAllBenefitsTitle`. Passing
`onboarding={undefined}` renders the classic layout, so an app can switch per
user or per remote flag.

`ProOnboardingGuide` is exported on its own for apps that place it elsewhere.

## Items

```ts
interface ProOnboardingItem {
  id: string;
  title: string;          // app-provided, resolved with the app's i18n
  description?: string;   // shown under the title
  badge?: ReactNode;      // shown above the title (e.g. an AI badge)
  isNew?: boolean;        // NEW chip
  isInUse?: boolean;      // "In use" chip; only when the app can prove it
  onPress?: () => void;   // without it: no chevron, and the next card hides "Try it"
}
```

## Getting-started checklist (1.25.0)

Pass `steps` to show a short checklist instead of the single "Try next" card:

```tsx
onboarding={{
  ...,
  steps: [{ id, title, description?, badge?, isDone?, onPress? }],
  onConfirmStepDone: (stepId) => { /* record, then pass updated steps */ },
  defaultChecklistExpanded: false, // the header opens it; folded by default (1.26.0)
}}
```

The title is `copy.checklistTitle` ("Start here"). The header shows
`done/total` with a progress bar and opens or folds the checklist with a
height animation. Open, every step is listed: done steps are checked and
struck through, and the active step is highlighted with "Try it" (only with
`onPress`) and "Already used". The active step is the first open one, or an
open step the user taps (1.26.0). Folded (the default), the other rows shrink
away, the active step stays in place and its highlight fades so it sits on
the card. Once every step is done the checklist hides (1.26.0); the "Try next"
card does not come back. The section list below is always shown.

Never pass a "not used" state: past use that left no data is unknown.

## Entry card for Settings or My Page (1.28.0)

`ProOnboardingEntryCard` is the compact form of the checklist for a list
screen: one card with an optional app `header` (e.g. the profile row) and a
single progress row that names the next open step, with `done/total` and a
bar.

```tsx
<ProOnboardingEntryCard
  header={<ProfileRow />}        // optional; app content
  steps={steps}                  // the same steps as the checklist
  title={t("proGuide.title")}    // optional; screen reader only, defaults to checklistTitle
  onPress={openProGuide}         // the header
  locale={locale}
  theme={theme}
/>
```

The header opens `onPress`; the progress row opens the next step's `onPress`
(or `onPress` when the step has none). Since 1.29.0 the next step replaces the
"Start here" title in the progress row, and the separate step row with its
check circle and chevron is gone; `title` is read by screen readers only.
Once every step is done only the header is left, or nothing without one.
Apps can pass a later set of steps (e.g. extra missions) to keep the card
going.

## Pure helpers

- `getNextProOnboardingItemId({ order, usedItemIds, newItemIds })`: NEW items
  first, then `order`, skipping used items; `null` when everything is used.
- `isProOnboardingItemNew({ addedInVersion, lastSeenVersion, baselineVersion })`:
  added after the version the user last opened the guide on. First visits
  compare against `baselineVersion` so not everything is NEW.
- `getProOnboardingProgress(steps)` (1.28.0): `{ doneCount, totalCount, nextStep }`,
  as the entry card shows it.

All are Node-testable and optional; apps can use their own rules.

## Copy

- Package-owned, localized in every `locales/paywall` file:
  `getDefaultProOnboardingCopy(locale)` → `title`, `checklistTitle`,
  `nextTitle`, `tryButton`, `alreadyUsedButton`, `inUseBadge`, `newBadge`
  ("NEW"), `allExplored`. Override any of them with
  `onboarding.copy`. "Pro" in the guide title and
  `viewAllBenefitsTitle` is written in each locale's script (프로, プロ, 专业版, Про, برو …); Latin
  script locales keep "Pro".
- `getDefaultProfileSubscriptionCopy(locale).viewAllBenefitsTitle` labels the
  folded table.
- App-provided: section titles, item titles and descriptions.

## App responsibilities

The package stays RevenueCat-, Firebase- and navigation-agnostic.

| Concern | Stays in the app |
| --- | --- |
| Which items and sections | App config |
| Proving use (`isInUse`) | Device settings, cached reads, tracked events. Never a collection scan |
| Destinations (`onPress`) | Navigation callbacks |
| "Already used", last-seen version | App storage |
| Analytics | `onPressItem` / `onConfirmUsed` |

## Playground

- `/profile`: classic profile, unchanged.
- `/profile-onboarding`: `ProfileSubscriptionWithOnboarding` with fixture
  items and five checklist steps (`apps/playground/src/fixtures/pro-onboarding.tsx`).
  It opens subscribed with the quiet manage button, and shows the
  `ProOnboardingEntryCard` preview above the profile. The screen shows only the
  profile; Settings (top right) opens a sheet for the plan, manage button,
  promo, IDs, benefit display, checklist versus single next card, NEW / In
  use / link fixtures, and resetting "Already used". `/profile` has the same
  sheet without the Pro guide group.

`__tests__/playground-paywall-routing.test.ts` keeps the two entries
independent.

## Migration

| Version | Change | Consumer action |
| --- | --- | --- |
| 1.20.0 | `ProfileBenefitUsageList` exported, `collapsible` | None |
| 1.21.0 | `viewAllBenefitsTitle`; Pro onboarding (`ProfileSubscriptionWithOnboarding`, `ProOnboardingGuide`, helpers, copy) | None for classic apps |
| 1.22.0 | `manageSubscriptionButtonVariant: "secondary"` | None |
| 1.23.0 | Rows end in a check instead of the "In use" chip; the guide title folds the list (`defaultListExpanded`); "Pro" localized in non-Latin scripts | None |
| 1.25.0 (1.24.0 was not published) | Getting-started checklist (`steps`, `onConfirmStepDone`, `defaultChecklistExpanded`, `copy.checklistTitle`) that keeps the next step when folded; folding the checklist and "View all Pro benefits" animates; section list back to "In use" chips and chevrons, always shown (`defaultListExpanded` removed); compact centered secondary "Manage subscription" in a tighter panel; `planLabel` / `renewalLabel` move under the title (the separate plan box is gone); with `onboarding`, the profile no longer repeats `benefits` above the folded table | Apps that passed `defaultListExpanded` remove it (the list is always shown) |
| 1.26.0 | Checklist folded by default (`defaultChecklistExpanded`); tapping an open step makes it active; hidden once every step is done; folded, the active step's highlight fades; checklist title "Start here" in every locale | Pass `defaultChecklistExpanded: true` to open it by default |
| 1.27.0 | Checklist title reworded in 29 locales (ko "여기부터 시작하세요"; "where to start" phrasing in Slavic and Romance locales); switching the active step animates (the old step's actions and highlight fold away, the new one's open) | None |
| 1.28.0 | `ProOnboardingEntryCard` and `getProOnboardingProgress` for Settings/My Page; with the secondary manage button, "Show IDs" sits left of "Manage subscription" in one row (same text size) and the ID list opens borderless inside the card | None. Apps using the secondary manage button with `identifierSection` see the new ID placement |
| 1.29.0 | `ProOnboardingEntryCard` is one compact progress row: the next step takes the title's place (`title` becomes screen-reader only); no step row, check circle or chevron; the row opens the next step | None. Apps that rely on the visible "Start here" title in the entry card see the step name instead |

All changes are additive (no breaking change). To opt in:

1. Upgrade the package.
2. Write the item/section config and resolve titles with the app's i18n.
3. Compute `isInUse`, `isNew` and `nextItemId` (helpers available).
4. Replace `ProfileSubscriptionSection` with
   `ProfileSubscriptionWithOnboarding` and pass `onboarding`.
5. Wire `onPress`, `onPressItem` and `onConfirmUsed` to navigation, storage
   and analytics.

Post Black Belt: replace its local `ProOnboardingSection` markup and its
manual table placement with `ProfileSubscriptionWithOnboarding`; keep its
config, evidence hooks, links, `@proGuide` storage key and Mixpanel events. No
stored data changes.

## Not yet in the package

The home mission card and post-purchase welcome sheet from Post Black Belt.
Their presentational parts can follow the same split later. The Settings or My
Page entry is in the package as `ProOnboardingEntryCard`.
