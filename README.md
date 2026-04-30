# pabal-expo-paywall-ui

<img width="2000" height="1501" alt="CleanShot 2026-04-30 at 15 08 51" src="https://github.com/user-attachments/assets/9894a2a2-865c-44e0-89d5-d9f35e850424" />


Workspace for a RevenueCat-agnostic React Native paywall/profile UI package and
its mock playground app.

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
