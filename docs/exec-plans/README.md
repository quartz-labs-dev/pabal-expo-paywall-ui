# Execution Plans

Execution plans are short checklists for repeatable change types. Read the
matching plan before editing files. The goal is to make common package changes
boring: inspect the right files, update the right docs, add the right tests, and
run the right validation.

`AGENTS.md` remains the routing map. These plans are the deeper source of truth.

## Plans

| Change type | Read first |
| --- | --- |
| Public props, exported types, exported components, helper APIs, package entrypoints, or documented consumer behavior | [Public API Change](./public-api-change.md) |
| User-visible localized paywall, onboarding, or profile copy | [Localization Change](./localization-change.md) |
| Internal package file moves, Metro-consumed imports, or static `require(...)` assets | [Asset Or Import Change](./asset-or-import-change.md) |

## Not In Scope

- Release and publishing workflow. The root `publish:paywall` script currently
  uses `npm publish`, while project guidance says not to use `npm`. Treat that
  as a separate release-process decision, not part of these change plans.
- Feature-level behavior docs. Keep using [Paywall](../paywall.md),
  [Onboarding](../onboarding.md), and [Profile](../profile.md) as the source of
  truth for those surfaces.
