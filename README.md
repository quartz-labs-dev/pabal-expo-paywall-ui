# pabal-expo-paywall-ui

<img width="2000" height="1501" alt="CleanShot 2026-04-30 at 15 08 51" src="https://github.com/user-attachments/assets/9894a2a2-865c-44e0-89d5-d9f35e850424" />


Workspace for a RevenueCat-agnostic React Native paywall, onboarding, and
profile UI package with a mock playground app.

## Project Structure

```txt
pabal-expo-paywall-ui/
  apps/
    playground/
      # Expo app for checking paywall/profile/onboarding UI states with mock data.
      # It does not include the RevenueCat SDK.

  packages/
    paywall-ui/
      # Published package source, including paywall/onboarding/profile UI contracts.
      # See packages/paywall-ui/README.md for the UI prop contract and usage.
```

## Docs

- [Paywall](./docs/paywall.md)
- [Onboarding](./docs/onboarding.md): pre-onboarding screens and onboarding primitives
- [Profile](./docs/profile.md)

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

## Playground

The playground is for checking mock paywall, profile, and onboarding states.
It does not include the RevenueCat SDK or real purchase flows.
