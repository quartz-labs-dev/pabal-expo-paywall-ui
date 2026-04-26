# pabal-expo-paywall-ui

Workspace for a RevenueCat-agnostic React Native paywall UI package and its mock
playground app.

## Project Structure

```txt
pabal-expo-paywall-ui/
  apps/
    playground/
      # Expo app for checking paywall/profile UI states with mock package data.
      # It does not include the RevenueCat SDK.

  packages/
    paywall-ui/
      # Published package source.
      # See packages/paywall-ui/README.md for first-time installation and usage.
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
