# Onboarding

Onboarding in this repo is intentionally split: the shared package owns a few
primitives that should stay consistent across apps, while each app owns the
actual flow, media, analytics, permissions, and navigation.

That is the point. The package gives teams reusable pieces. The app decides the
story it tells the customer.

## Supported Content Types

The playground supports these app-composed onboarding content types:

| Type | Use It For | Ownership |
| --- | --- | --- |
| `landing` | Pre-onboarding opening screen with optional background/media slot | App |
| `mock-video` | Mock phone image/video preview with login or primary action panels | App |
| `prelude` | Full-screen intro text steps | App |
| `choice-list` | Selectable options, currently used for acquisition sources | App + package options |
| `social-proof` | Headline, optional metric, and review cards | App |
| `permission-prompt` | Preview before asking for native permissions | Package primitive |
| `notification-mock` | Notification stack and phone mock | App |

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
