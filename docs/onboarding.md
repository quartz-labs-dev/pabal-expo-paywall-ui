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

`prelude` is the exception: every `/onboarding` flow must show exactly two
prelude screens before the main stepper. After that, the app can compose the
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

`/onboarding` must start with two `prelude` screens before the main stepper appears.

Intro content:

| Content | Count | Use It For | Ownership |
| --- | --- | --- | --- |
| `prelude` | 2 screens | Full-screen intro copy with tap-to-continue | Package frame + app copy/order |

Available main content:

| Content | Use It For | Ownership |
| --- | --- | --- |
| `choice-list` | Package-owned one-choice selectable list, with optional inverted tone | Package primitive + app state |
| `acquisition-source` | "Where did you hear about us?" choice list | App state + package options |
| `gallery-grid` | Animated three-row gallery of app-provided title/image/color tiles | Package primitive + app data |
| `nickname-flow` | Localized nickname input followed by typed welcome | Package frame + app state |
| `social-proof` | Headline, optional metric, and review cards | App |
| `permission-prompt` | Preview before asking for native permissions | Package primitive |
| `notification-mock` | Notification stack and phone mock | App |
| `plain-list` | Package-owned informational list rows with optional tone | Package primitive + app data |
| `completion` | Setup-done confirmation with animated success burst and app-provided copy | Package primitive + app state |

Current playground `/onboarding` sequence:

1. `prelude`
2. `prelude`
3. `nickname-flow` input
4. `nickname-flow` welcome
5. `acquisition-source`
6. `gallery-grid`
7. `social-proof`
8. `permission-prompt`
9. `notification-mock`
10. `choice-list`
11. `completion`

Use `choice-list` when the app owns the option set but wants package-owned row
UI, checked state, and tone handling. Use `acquisition-source` when the screen
should use the package-owned source labels and bundled icons.

Prelude and social-proof headlines use `**highlighted copy**` to apply the
onboarding primary/accent color. Keep that marker in content strings instead of
adding separate highlight props.

The required prelude story is two screens:

1. Problem question, `tone: "inverted"`: use the active theme's primary text
   color as the background and the normal background color for text.
2. Solution statement, `tone: "normal"`: use the normal onboarding frame theme.

`tap to continue` uses the same color as the prelude body copy. Do not introduce
a separate hint, arrow, or button color for prelude tap hints.

## Package APIs

The package currently exposes these onboarding primitives:

- `PreOnboardingWelcome` for the pre-onboarding welcome screen
- `PreOnboardingValue` for the pre-onboarding value screen
- `PreOnboardingFrame` for custom pre-onboarding screens with shared footer chrome
- `PreOnboardingBackgroundSlot`, `PreOnboardingLandingContent`,
  `PreOnboardingMockContent`, `PreOnboardingMockPhoneFrame`, and
  `PreOnboardingLoginPrompt` for package-owned pre-onboarding composition
- `OnboardingStepFrame` for app-owned onboarding steps with shared chrome
- `OnboardingPreludeFrame` for package-owned prelude chrome: full-screen tap,
  tap hint footer, intro spacing, hidden header, and inverted-tone background
- `OnboardingNicknameFlowFrame` for the package-owned nickname capture and
  personalized welcome flow
- `OnboardingPreludeContent`, `OnboardingChoiceList`,
  `OnboardingTextInputContent`, `OnboardingNicknameInput`,
  `OnboardingTypingText`, `OnboardingGalleryGrid`,
  `OnboardingSocialProof`, and `OnboardingNotificationMock` for the reusable
  animated onboarding content used by the playground
- onboarding animation helpers used by pre-onboarding and intro copy
- acquisition source copy/options with bundled source icons
- localized nickname-input copy and `formatOnboardingNicknameWelcomeTitle` for
  personalized welcome steps
- `PermissionPromptPreview` for permission education before native prompts
- `OnboardingCompletion` for the final setup-ready confirmation

Apps still own screen order, selected state, permission APIs, analytics,
navigation, media, and product-specific copy.

## Locale Files

Onboarding locale copy follows the same file layout as `src/locales/paywall`.
Each supported locale has one file under `packages/paywall-ui/src/locales/onboarding`
such as `en.ts`, `ko.ts`, `pt-br.ts`, `zh-hans.ts`, and `zh-hant.ts`.

Each locale file owns the full onboarding copy bundle for that language:

```txt
onboarding/{locale}.ts
  ├─ text              # buttons, landing title, pre-onboarding labels
  ├─ permissionPrompt  # native permission preview buttons
  └─ nicknameInput     # nickname title, placeholder, accessibility label, welcome
```

When adding or changing an onboarding copy key, update every locale file. The
`OnboardingLocaleText` type makes missing `text`, `permissionPrompt`, or
`nicknameInput` fields fail typecheck.

## Nickname Input

Use `OnboardingNicknameFlowFrame` when the app wants a personalized greeting
without collecting a real name. It is a screen-level primitive like
`OnboardingPreludeFrame`: the package owns the title, input layout, welcome
layout, CTA secondary-action removal, inverted welcome tone, typing animation,
and localized default copy. The app owns the value, analytics, persistence, and
what happens after the welcome screen completes.

`OnboardingTextInputContent` is the lower-level reusable primitive for any
single-input onboarding content. Use it directly for future steps like goal,
team, academy, or city input. It requires `placeholder` explicitly so each flow
chooses the field hint at the call site instead of hiding it inside generic UI.

```tsx
import {
  OnboardingNicknameFlowFrame,
} from "pabal-expo-paywall-ui";

<OnboardingNicknameFlowFrame
  autoFocus
  baseStepIndex={mainStepIndex}
  continueLabel={copy.continueButton}
  frameTheme={frameTheme}
  locale={locale}
  nickname={nickname}
  theme={theme}
  totalSteps={totalSteps}
  onBack={goBack}
  onChangeNickname={setNickname}
  onComplete={goNext}
  onPhaseChange={setNicknameFlowPhase}
  onSubmitNickname={(submittedNickname) => {
    analytics.track("onboarding_nickname_submitted", { hasNickname: true });
    saveProfileNickname(submittedNickname);
  }}
/>;
```

`OnboardingStepFrame` always uses React Native's built-in
`KeyboardAvoidingView`, so the footer CTA stays reachable when a step contains
an input. Do not add a keyboard package for a single-name capture step. Reach
for a dedicated keyboard controller only if an app later needs gesture-synced
keyboard animation across many dense input screens.

## Notification Mock

Use `OnboardingNotificationMock` when the app wants a lock-screen style
notification preview after the permission education step. Pass `notifications`
with 1-3 localized items. The component renders only the provided count and caps
the stack at three cards.

Each notification owns its `title`, `description`, optional `icon`, optional
`iconSource`, and optional `iconBackgroundColor`. All cards use the provided
localized `nowLabel`. The phone mock shows the current date/time by default, or
the app can pass `dateLabel` and `timeLabel` when it needs deterministic copy for
screenshots.

```tsx
<OnboardingNotificationMock
  nowLabel={copy.notificationNowLabel}
  notifications={[
    {
      description: copy.weeklyTipDescription,
      icon: <TipIcon />,
      iconBackgroundColor: "#D8B4FE",
      title: copy.weeklyTipTitle,
    },
    {
      description: copy.reviewReadyDescription,
      icon: <ReviewIcon />,
      iconBackgroundColor: "#F4D48A",
      title: copy.reviewReadyTitle,
    },
  ]}
  theme={theme}
/>;
```

## Onboarding Prelude

Use `OnboardingPreludeFrame` for the opening full-screen problem/solution beats
before the main onboarding stepper. This is not optional for `/onboarding`.
The package owns the frame behavior and spacing. The app owns the required
two-step story, copy, analytics, and navigation.

```tsx
import {
  OnboardingPreludeFrame,
  type RequiredOnboardingPreludeSteps,
} from "pabal-expo-paywall-ui";

const preludeSteps: RequiredOnboardingPreludeSteps = [
  {
    bodyColor: theme.backgroundColor,
    bodyLines: [
      "you are not alone",
      "jiu-jitsu is too deep to keep in your head,",
      "especially when every class adds another detail.",
    ],
    headline: "ever feel like you **forget** the technique right after class?",
    headlineColor: theme.backgroundColor,
    tone: "inverted",
  },
  {
    bodyColor: theme.primaryTextColor,
    bodyLines: [
      "save the move, review the key detail,",
      "and come back before the next roll.",
    ],
    headline:
      "Post Black Belt turns training into a **library** you can actually use.",
    headlineColor: theme.primaryTextColor,
    tone: "normal",
  },
];

<OnboardingPreludeFrame
  continueLabel={copy.tapToContinueButton}
  contentTransitionIndex={currentStepIndex}
  frameTheme={frameTheme}
  locale={locale}
  step={preludeSteps[currentPreludeIndex]}
  theme={theme}
  onContinue={goNext}
/>;
```

For `tone: "inverted"`, pass copy colors that already match the inverted
background. `OnboardingPreludeFrame` does not invent a separate tap hint color:
the label and arrow both follow `step.bodyColor`.

Use `RequiredOnboardingPreludeSteps` for app-owned prelude fixtures so TypeScript
fails if a consuming app accidentally removes either the required problem screen
or the required solution screen.

`tone` is a frame-level concept. `OnboardingPreludeFrame` reads it from the
prelude step and forwards it to `OnboardingStepFrame`, and regular onboarding
steps can also set `tone: "inverted"` when the frame chrome should invert.

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
step transition, CTA, and optional localized secondary continue action.

```tsx
import {
  OnboardingChoiceList,
  OnboardingPlainList,
  OnboardingStepFrame,
} from "pabal-expo-paywall-ui";

<OnboardingStepFrame
  backButtonAccessibilityLabel="Back"
  canContinue={Boolean(selectedSource)}
  continueLabel={copy.continueButton}
  currentStepIndex={mainStepIndex}
  description="Tell us where you first found the app."
  locale={locale}
  showSecondaryAction
  theme={frameTheme}
  title={acquisitionSourceText.title}
  tone="normal"
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

Set `tone="inverted"` on `OnboardingStepFrame` when the frame background,
footer, title, description, progress, back icon, and secondary action should use
the inverted chrome.

`OnboardingChoiceList` is the package-owned one-choice selection list: selecting
one row shows the checkmark and enables Continue in the app flow. It also
supports `tone="inverted"` for inverted frames. For non-interactive
informational list content, use the package-owned `OnboardingPlainList`; it
supports the same tone prop. The playground should only provide item/option
data, selected state, and handlers; it should not keep a local custom list
implementation for this UI.

```tsx
<OnboardingStepFrame
  canContinue={Boolean(selectedListOption)}
  continueLabel={copy.continueButton}
  currentStepIndex={mainStepIndex}
  description="The best plan is the one you can return to before the next roll."
  theme={frameTheme}
  title="Built for repeated progress"
  tone="inverted"
  totalSteps={slides.length}
  onBack={goBack}
  onContinue={goNext}
>
  <OnboardingChoiceList
    options={listOptions}
    selectedOptionId={selectedListOption}
    theme={theme}
    tone="inverted"
    onSelectOption={setSelectedListOption}
  />
</OnboardingStepFrame>;
```

Use `OnboardingGalleryGrid` when the app wants a dense animated library/content
preview. The package owns the three-row marquee layout and infinite row
animation; the app owns the tile titles, image sources, and colors. Rows 1 and
3 move right, and row 2 moves left. Set `isBorderVisible={false}` when the
app wants softer image/color tiles without the black card outline.

```tsx
import {
  OnboardingGalleryGrid,
  OnboardingStepFrame,
  type OnboardingGalleryGridItem,
} from "pabal-expo-paywall-ui";

const galleryItems = [
  {
    backgroundColor: "#F48BB7",
    id: "captain-hook",
    title: "Captain Hook",
  },
  {
    backgroundColor: "#79D4DC",
    id: "james-dean",
    imageSource: require("./assets/james-dean.png"),
    title: "James Dean",
  },
] satisfies readonly OnboardingGalleryGridItem[];

<OnboardingStepFrame
  canContinue
  continueLabel={copy.continueButton}
  currentStepIndex={mainStepIndex}
  description="Save the small details you want to remember."
  theme={frameTheme}
  title="Your training library starts here"
  totalSteps={slides.length}
  onBack={goBack}
  onContinue={goNext}
>
  <OnboardingGalleryGrid
    isBorderVisible={false}
    items={galleryItems}
    theme={theme}
  />
</OnboardingStepFrame>;
```

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
low-level helpers directly, render `OnboardingPreludeContent` for only the
animated copy, or render `OnboardingPreludeFrame` for the full prelude screen
chrome used by the playground.

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
- TikTok
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
