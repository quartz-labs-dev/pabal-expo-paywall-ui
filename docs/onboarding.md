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
| `landing` | Opening screen with optional background/media slot | Package screen + app media/state |
| `mock-video` | Mock phone image/video preview with login or primary action | Package screen + app preview/action state |

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
| `completion` | Setup-done confirmation with animated success burst and app-provided copy | Package primitive + app state |

Current playground `/onboarding` sequence:

1. `prelude`
2. `prelude`
3. `acquisition-source`
4. `social-proof`
5. `permission-prompt`
6. `notification-mock`
7. `completion`

Use `list` when the app owns the option set. Use `acquisition-source` when the
screen should use the package-owned source labels and bundled icons.

Prelude and social-proof headlines use `**highlighted copy**` to apply the
onboarding primary/accent color. Keep that marker in content strings instead of
adding separate highlight props.

## Package APIs

The package currently exposes these onboarding primitives:

- `PreOnboardingWelcome` for the pre-onboarding welcome screen
- `PreOnboardingValue` for the pre-onboarding value screen
- `PreOnboardingFrame` for custom pre-onboarding screens with shared footer chrome
- `PreOnboardingBackgroundSlot`, `PreOnboardingLandingContent`,
  `PreOnboardingMockContent`, `PreOnboardingMockPhoneFrame`, and
  `PreOnboardingLoginPrompt` for package-owned pre-onboarding composition
- `OnboardingStepFrame` for app-owned onboarding steps with shared chrome
- `OnboardingPreludeContent`, `OnboardingChoiceList`,
  `OnboardingSocialProof`, and `OnboardingNotificationMock` for the reusable
  animated onboarding content used by the playground
- onboarding animation helpers used by pre-onboarding and intro copy
- acquisition source copy/options with bundled source icons
- `PermissionPromptPreview` for permission education before native prompts
- `OnboardingCompletion` for the final setup-ready confirmation

Apps still own screen order, selected state, permission APIs, analytics,
navigation, media, and product-specific copy.

## Pre-Onboarding Screens

Use `PreOnboardingWelcome` and `PreOnboardingValue` when the app wants the
shared pre-onboarding layout, but still owns media, locale state, login flow,
signup flow, analytics, and navigation.

```tsx
import {
  PreOnboardingValue,
  PreOnboardingWelcome,
  getDefaultOnboardingCopy,
} from "pabal-expo-paywall-ui";

const copy = getDefaultOnboardingCopy(locale);

<PreOnboardingWelcome
  background={<LandingVideoBackground />}
  copy={copy}
  isLocaleSelectorVisible={isLocaleSelectorVisible}
  localeSelector={<LocaleSelector />}
  logo={<Image source={appIcon} />}
  selectedLocaleText="🇰🇷 한국어 / Korean"
  onContinue={goNext}
  onToggleLocaleSelector={toggleLocaleSelector}
/>;

<PreOnboardingValue
  copy={copy}
  preview={<LoginDemoPhoneFrame width={demoPhoneWidth} />}
  onLogin={startLogin}
  onStart={startSignUp}
/>;
```

The package renders only the shell: safe-area spacing, localized title/button
copy, the language card, the primary CTA, and the login prompt. Keep the actual
background image/video, app logo, locale selector, phone mock, purchase/login
actions, and routing in the consuming app.

The playground passes `PreOnboardingLanguageSelector` into the
`PreOnboardingPlaygroundScreen` `languageSelector` slot. That selector reuses the
shared playground locale labels, flags, and unified locale list so `/pre-onboarding`
can preview localized onboarding copy directly from the first screen.

Use `PreOnboardingFrame` directly when the app needs a custom pre-onboarding
screen that does not fit `PreOnboardingWelcome` or `PreOnboardingValue`.

### Pre-Onboarding Language Selector Placement

On the first pre-onboarding landing screen, the language selector belongs inside
`PreOnboardingFrame` children, directly below the logo/title group. This matches
the package-owned `PreOnboardingLandingContent` structure:

1. background/media
2. centered logo
3. title
4. language selector card and its animated expanded panel
5. footer CTA

Do not put the first-screen language selector in `footerTopAccessory`.
`footerTopAccessory` is reserved for footer-adjacent content such as the
`mock-video` title above the CTA. Putting the language selector there moves it
to the bottom of the screen and breaks the intended playground layout.

```tsx
import {
  PreOnboardingFrame,
  PreOnboardingLandingContent,
} from "pabal-expo-paywall-ui";

<PreOnboardingFrame
  background={<LandingVideoBackground />}
  continueLabel={copy.continueButton}
  theme={frameTheme}
  onContinue={goNext}
>
  <PreOnboardingLandingContent
    languageSelector={<LanguageSelectorCard />}
    logo={<AppLogo />}
    logoAnimatedStyle={logoAnimatedStyle}
    selectorAnimatedStyle={selectorAnimatedStyle}
    theme={theme}
    title={copy.landingTitle}
    titleAnimatedStyle={titleAnimatedStyle}
  />
</PreOnboardingFrame>;
```

For the second `mock-video` pre-onboarding screen, use `footerTopAccessory` for
the large title above the CTA, and keep login prompt or secondary action copy in
`footerAccessory`.

```tsx
import {
  PreOnboardingFrame,
  PreOnboardingLoginPrompt,
  PreOnboardingMockContent,
} from "pabal-expo-paywall-ui";

<PreOnboardingFrame
  continueLabel={copy.startButton}
  footerTopAccessory={<Text style={styles.mockTitle}>{copy.mockTitle}</Text>}
  footerAccessory={
    <PreOnboardingLoginPrompt
      loginLabel={copy.loginLabel}
      prompt={copy.loginPrompt}
      theme={theme}
      onPress={openLogin}
    />
  }
  theme={frameTheme}
  onContinue={startSignUp}
>
  <PreOnboardingMockContent
    actionContent={<LoginOrSignupActions />}
    actionProgress={actionProgress}
    entranceOffsetX={screenWidth}
    isActionPanelMounted={isActionPanelMounted}
    mockPhoneHeight={mockPhoneHeight}
    mockPhoneWidth={mockPhoneWidth}
    returnLabel={copy.returnButton}
    theme={theme}
    onReturn={closeActionPanel}
  />
</PreOnboardingFrame>;
```

## Onboarding Step Frame

Use `OnboardingStepFrame` when the app owns the onboarding step sequence and
content, but wants the shared header, progress bar, safe-area spacing, animated
step transition, CTA, and optional secondary action.

```tsx
import {
  OnboardingChoiceList,
  OnboardingStepFrame,
} from "pabal-expo-paywall-ui";

<OnboardingStepFrame
  backButtonAccessibilityLabel="Back"
  canContinue={Boolean(selectedSource)}
  continueLabel={copy.continueButton}
  currentStepIndex={mainStepIndex}
  description="Tell us where you first found the app."
  secondaryActionLabel={copy.notNowButton}
  theme={frameTheme}
  title={acquisitionSourceText.title}
  totalSteps={slides.length}
  onBack={goBack}
  onContinue={goNext}
  onSecondaryAction={skipStep}
>
  <OnboardingChoiceList
    options={sourceOptions}
    selectedOptionId={selectedSource}
    theme={theme}
    onSelectOption={setSelectedSource}
  />
</OnboardingStepFrame>;
```

The package does not own the full onboarding flow. The app still decides which
steps exist, selected values, permission request timing, analytics, and final
navigation.

## Onboarding Animations

The shared package owns the animation helpers used by pre-onboarding and
intro-style onboarding screens. The playground imports these helpers from
`pabal-expo-paywall-ui` instead of keeping local copies.

```tsx
import {
  createOnboardingIntroTextTokens,
  createOnboardingSequentialWordAnimation,
  getOnboardingSequentialWordStyle,
  parseOnboardingIntroEmphasisSegments,
  startOnboardingSequentialTextAnimation,
  stripOnboardingIntroEmphasis,
  useOnboardingActionPanelAnimation,
  useOnboardingEntranceAnimation,
  useOnboardingPhoneFrameEntranceAnimation,
} from "pabal-expo-paywall-ui";
```

Use `useOnboardingEntranceAnimation` for staggered landing-screen elements such
as logo, title, and language selector. Use `useOnboardingActionPanelAnimation`
for the pre-onboarding login/signup action panel. Use
`useOnboardingPhoneFrameEntranceAnimation` when a phone preview should slide in
from an app-provided offset.

The intro text helpers parse `**highlighted copy**`, create word tokens, and run
the sequential word reveal animation used by prelude screens. Apps can use the
low-level helpers directly, or render the package-owned `OnboardingPreludeContent`
for the same animated intro copy layout used by the playground.

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

## Completion

Use `OnboardingCompletion` when every app needs a polished final "setup is
ready" moment, but each app has different setup state.

The package owns the layout and a short native `Animated` success burst. The app
owns the words, next route, analytics event, and what counts as complete. The
playground keeps this final screen intentionally simple: burst, copy, and the
localized `doneButton` CTA.

Pass the active onboarding theme from the app/context. `OnboardingCompletion`
does not define its own default theme.

```tsx
import { OnboardingCompletion } from "pabal-expo-paywall-ui";

<OnboardingCompletion
  eyebrow="Setup complete"
  title="You're all set"
  description="Your plan is ready. Start with the first workout when you are."
  theme={{
    accentColor: "#E22121",
    accentTextColor: "#FFFFFF",
    primaryTextColor: "#050505",
    secondaryTextColor: "#666A70",
  }}
/>;
```
