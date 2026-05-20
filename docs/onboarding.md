# Onboarding

Onboarding in this repo is intentionally split: the shared package owns a few
primitives that should stay consistent across apps, while each app owns the
actual flow, media, analytics, permissions, navigation, and which content blocks
to render.

That is the point. The package gives teams reusable pieces. The app decides the
story it tells the customer.

## Flow Structure

The playground has two separate flows:

- `/pre-onboarding`: the marketing-style entry flow before the main onboarding
- `/onboarding`: the main onboarding flow that collects context and prepares permissions

They share visual language, but they should be documented and configured as
separate surfaces. Pre-onboarding sells the app experience. Onboarding moves the
user through setup.

## Content Model

Most onboarding content is composition, not a fixed package-controlled sequence.
The app or playground screen imports the content component it needs and places it
in the flow.

`prelude` is the exception in the current playground: `/onboarding` always shows
two prelude screens before the main stepper. After that, the app can compose the
main content blocks in the order it needs.

Only the package primitives listed in [Package APIs](#package-apis) are exported
from `pabal-expo-paywall-ui`. The other content types are playground/app
composition patterns.

## Pre-Onboarding Content

`/pre-onboarding` currently has two screens:

| Content | Use It For | Ownership |
| --- | --- | --- |
| `landing` | Opening screen with optional background/media slot | App |
| `mock-video` | Mock phone image/video preview with login or primary action panels | App |

## Onboarding Content

`/onboarding` starts with two `prelude` screens before the main stepper appears.

Intro content:

| Content | Count | Use It For | Ownership |
| --- | --- | --- | --- |
| `prelude` | 2 screens | Full-screen intro copy with tap-to-continue | App |

Available main content:

| Content | Use It For | Ownership |
| --- | --- | --- |
| `list` | App-owned selectable option list, imported and used by the app/playground where needed | App |
| `acquisition-source` | "Where did you hear about us?" choice list | App state + package options |
| `social-proof` | Headline, optional metric, and review cards | App |
| `permission-prompt` | Preview before asking for native permissions | Package primitive |
| `notification-mock` | Notification stack and phone mock | App |

Current playground `/onboarding` sequence:

1. `prelude`
2. `prelude`
3. `acquisition-source`
4. `social-proof`
5. `permission-prompt`
6. `notification-mock`

Use `list` when the app owns the option set. Use `acquisition-source` when the
screen should use the package-owned source labels and bundled icons.

Prelude and social-proof headlines use `**highlighted copy**` to apply the
onboarding primary/accent color. Keep that marker in content strings instead of
adding separate highlight props.

## Package APIs

The package currently exposes two onboarding primitives:

- acquisition source copy/options with bundled source icons
- `PermissionPromptPreview` for permission education before native prompts

Apps still own screen order, selected state, permission APIs, analytics,
navigation, media, and product-specific copy.

## Acquisition Sources

Use this when every app should ask the same "Where did you hear about us?"
question.

This is rendered as a choice list in the playground, but the content type is
`acquisition-source`: the package supplies the localized source options and
icons, while the app owns selected state and analytics.

```tsx
import {
  createOnboardingAcquisitionSourceOptions,
  getDefaultOnboardingAcquisitionSourceText,
  type OnboardingAcquisitionSourceId,
} from "pabal-expo-paywall-ui";

const storePlatform = Platform.OS === "android" ? "playStore" : "appStore";
const sourceText = getDefaultOnboardingAcquisitionSourceText(locale);
const sourceOptions = createOnboardingAcquisitionSourceOptions(
  storePlatform,
  locale,
);
const [selectedSource, setSelectedSource] =
  useState<OnboardingAcquisitionSourceId | null>(null);
```

`createOnboardingAcquisitionSourceOptions()` returns:

- Instagram
- YouTube
- Google
- current store, `App Store` or `Play Store`
- X, formerly Twitter
- Friend or family
- Other

The package owns labels and icons. The app owns selected state, analytics,
layout, and what happens after the user chooses an option.

## Permission Prompt Preview

Use `PermissionPromptPreview` to educate the user before triggering the native
permission request.

```tsx
import { PermissionPromptPreview } from "pabal-expo-paywall-ui";

<PermissionPromptPreview
  locale={locale}
  message="Notifications may include alerts, sounds, and icon badges."
  platform={Platform.OS === "android" ? "android" : "ios"}
  primaryColor="#22C55E"
  title="“Brilliant” Would Like to Send You Notifications"
/>;
```

`platform` switches between iOS-style and Android-style prompt chrome. `title`
and `message` are app-provided so notifications, location, camera, photos,
microphone, and future permissions can use product-specific reasoning.

The package localizes only the button labels from `locale`. `Allow` uses the iOS
system blue (`#007AFF`) on both platforms, and the pointer is a text glyph rather
than an SVG asset. The preview uses React Native primitives only. Do not add
`react-native-svg` or permission SDKs to the shared package for this UI.
