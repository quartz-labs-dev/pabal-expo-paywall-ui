# pabal-expo-paywall-ui

<img width="2000" height="1501" alt="CleanShot 2026-04-30 at 15 08 51" src="https://github.com/user-attachments/assets/9894a2a2-865c-44e0-89d5-d9f35e850424" />


Workspace for a RevenueCat-agnostic React Native paywall/profile UI package and
its mock playground app.

## Project Structure

```txt
pabal-expo-paywall-ui/
  apps/
    playground/
      # Expo app for checking paywall/profile/onboarding UI states with mock data.
      # It does not include the RevenueCat SDK.

  packages/
    paywall-ui/
      # Published package source, including paywall/profile UI contracts.
      # See packages/paywall-ui/README.md for the UI prop contract and usage.
```

## Workspace Commands

```bash
yarn dev        # Expo playground
yarn web        # playground web
yarn ios        # playground iOS
yarn android    # playground Android
yarn typecheck  # TypeScript checks
yarn test       # paywall-ui tests
yarn build      # paywall-ui build
```

Use `swpm` or `yarn` when adding dependencies. Do not use `npm`.

## Playground Onboarding

The playground includes `/pre-onboarding` and `/onboarding` flows for checking
app-owned onboarding composition. Supported content types are:

- `landing`: pre-onboarding landing content with optional background/media slot
- `mock-video`: mock phone image/video preview with login/primary action panels
- `prelude`: full-screen intro text steps
- `choice-list`: selectable options, currently used for acquisition sources
- `social-proof`: headline, optional metric, and review cards
- `permission-prompt`: shared native permission prompt preview
- `notification-mock`: notification stack and phone mock

Prelude and social-proof headlines use `**highlighted copy**` to apply the
onboarding primary/accent color. Keep the marker in content strings instead of
adding a separate highlight prop.
