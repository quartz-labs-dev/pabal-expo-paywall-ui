import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const readSource = (path: string): string => {
  return readFileSync(join(process.cwd(), path), "utf8");
};

test("exports the prelude frame as a public onboarding primitive", () => {
  const indexSource = readSource("src/index.ts");
  const typesSource = readSource("src/onboarding/types.ts");

  assert.match(
    indexSource,
    /export \{ OnboardingPreludeFrame \} from "\.\/onboarding\/OnboardingPreludeFrame";/,
  );
  assert.match(
    indexSource,
    /OnboardingPreludeFrameProps,\n\} from "\.\/onboarding\/OnboardingPreludeFrame";/,
  );
  assert.match(indexSource, /OnboardingFrameTone,/);
  assert.match(indexSource, /RequiredOnboardingPreludeSteps,/);
  assert.match(
    typesSource,
    /export type OnboardingFrameTone = "normal" \| "inverted";/,
  );
  assert.match(
    typesSource,
    /export type RequiredOnboardingPreludeSteps = readonly \[\n  OnboardingPreludeStep,\n  OnboardingPreludeStep,\n\];/,
  );
});

test("exports plain onboarding list as a package primitive", () => {
  const indexSource = readSource("src/index.ts");

  assert.match(
    indexSource,
    /export \{ OnboardingPlainList \} from "\.\/onboarding\/OnboardingPlainList";/,
  );
  assert.match(
    indexSource,
    /OnboardingPlainListItem,\n  OnboardingPlainListProps,\n\} from "\.\/onboarding\/OnboardingPlainList";/,
  );
});

test("exports notification item contract and caps the mock stack", () => {
  const indexSource = readSource("src/index.ts");
  const notificationSource = readSource(
    "src/onboarding/OnboardingNotificationMock.tsx",
  );

  assert.match(
    indexSource,
    /OnboardingNotificationItem,\n  OnboardingNotificationMockProps,/,
  );
  assert.match(notificationSource, /notifications\?: readonly OnboardingNotificationItem\[\];/);
  assert.match(notificationSource, /\.slice\(0, 3\)/);
  assert.match(notificationSource, /iconBackgroundColor\?: string;/);
});

test("exports nickname input as a localized package primitive", () => {
  const indexSource = readSource("src/index.ts");
  const nicknameInputSource = readSource(
    "src/onboarding/OnboardingNicknameInput.tsx",
  );
  const textInputSource = readSource(
    "src/onboarding/OnboardingTextInputContent.tsx",
  );
  const typingTextSource = readSource(
    "src/onboarding/OnboardingTypingText.tsx",
  );
  const nicknameFlowFrameSource = readSource(
    "src/onboarding/OnboardingNicknameFlowFrame.tsx",
  );

  assert.match(
    indexSource,
    /export \{ OnboardingNicknameInput \} from "\.\/onboarding\/OnboardingNicknameInput";/,
  );
  assert.match(indexSource, /getDefaultOnboardingNicknameInputText,/);
  assert.match(indexSource, /formatOnboardingNicknameWelcomeTitle,/);
  assert.match(
    indexSource,
    /OnboardingNicknameInputProps,\n\} from "\.\/onboarding\/OnboardingNicknameInput";/,
  );
  assert.match(
    indexSource,
    /export \{ OnboardingTextInputContent \} from "\.\/onboarding\/OnboardingTextInputContent";/,
  );
  assert.match(
    indexSource,
    /OnboardingTextInputContentProps,\n\} from "\.\/onboarding\/OnboardingTextInputContent";/,
  );
  assert.match(
    indexSource,
    /export \{ OnboardingTypingText \} from "\.\/onboarding\/OnboardingTypingText";/,
  );
  assert.match(
    indexSource,
    /OnboardingTypingTextProps,\n\} from "\.\/onboarding\/OnboardingTypingText";/,
  );
  assert.match(
    indexSource,
    /export \{ OnboardingNicknameFlowFrame \} from "\.\/onboarding\/OnboardingNicknameFlowFrame";/,
  );
  assert.match(
    indexSource,
    /OnboardingNicknameFlowFrameProps,\n  OnboardingNicknameFlowPhase,\n\} from "\.\/onboarding\/OnboardingNicknameFlowFrame";/,
  );
  assert.match(nicknameInputSource, /getDefaultOnboardingNicknameInputText/);
  assert.match(nicknameInputSource, /<OnboardingTextInputContent/);
  assert.match(nicknameInputSource, /placeholder=\{placeholder \?\? copy\.inputPlaceholder\}/);
  assert.match(nicknameInputSource, /onChangeText=\{onChangeNickname\}/);
  assert.match(textInputSource, /placeholder: string;/);
  assert.match(textInputSource, /placeholder=\{placeholder\}/);
  assert.match(typingTextSource, /Array\.from\(text\)/);
  assert.match(typingTextSource, /setVisibleCharacterCount/);
  assert.match(typingTextSource, /clearInterval/);
  assert.match(nicknameFlowFrameSource, /phase === "welcome"/);
  assert.match(nicknameFlowFrameSource, /initialPhase = "input"/);
  assert.match(nicknameFlowFrameSource, /title=\{copy\.title\}/);
  assert.match(nicknameFlowFrameSource, /showSecondaryAction=\{false\}/);
  assert.match(nicknameFlowFrameSource, /<OnboardingNicknameInput/);
  assert.match(nicknameFlowFrameSource, /tone="inverted"/);
  assert.match(nicknameFlowFrameSource, /<OnboardingTypingText/);
  assert.match(nicknameFlowFrameSource, /onSubmitNickname\?\.\(trimmedNickname\)/);
});

test("keeps prelude tap hint color aligned with prelude copy color", () => {
  const preludeFrameSource = readSource(
    "src/onboarding/OnboardingPreludeFrame.tsx",
  );
  const stepFrameSource = readSource("src/onboarding/OnboardingStepFrame.tsx");

  assert.match(
    preludeFrameSource,
    /continueButtonTextStyle=\{\{ color: step\.bodyColor \}\}/,
  );
  assert.match(
    preludeFrameSource,
    /continueButtonTextColor: step\.bodyColor/,
  );
  assert.match(stepFrameSource, /color: theme\.continueButtonTextColor/);
  assert.match(stepFrameSource, /continueButtonTextStyle/);
  assert.doesNotMatch(
    stepFrameSource,
    /styles\.tapHintArrow,[\s\S]{0,120}continueButtonBackgroundColor/,
  );
});

test("keeps shared onboarding body transition disabled by default", () => {
  const stepFrameSource = readSource("src/onboarding/OnboardingStepFrame.tsx");
  const preludeFrameSource = readSource(
    "src/onboarding/OnboardingPreludeFrame.tsx",
  );
  const nicknameFlowFrameSource = readSource(
    "src/onboarding/OnboardingNicknameFlowFrame.tsx",
  );

  assert.match(stepFrameSource, /isContentTransitionEnabled = false/);
  assert.match(
    preludeFrameSource,
    /isContentTransitionEnabled=\{isContentTransitionEnabled\}/,
  );
  assert.match(
    nicknameFlowFrameSource,
    /isContentTransitionEnabled=\{isContentTransitionEnabled\}/,
  );
  assert.doesNotMatch(
    preludeFrameSource,
    /isContentTransitionEnabled\s*(?:\n\s*)?(?:locale=|isFullScreenTapEnabled)/,
  );
  assert.doesNotMatch(
    nicknameFlowFrameSource,
    /isContentTransitionEnabled\s*(?:\n\s*)?(?:locale=|showBackButton)/,
  );
});

test("keeps nickname input content input aligned in the shared frame", () => {
  const stepFrameSource = readSource("src/onboarding/OnboardingStepFrame.tsx");
  const nicknameFlowFrameSource = readSource(
    "src/onboarding/OnboardingNicknameFlowFrame.tsx",
  );

  assert.match(stepFrameSource, /contentVerticalAlignment = "center"/);
  assert.match(
    stepFrameSource,
    /isInputContentLayout && styles\.bodyContentInput/,
  );
  assert.match(nicknameFlowFrameSource, /contentVerticalAlignment="input"/);
});

test("keeps opt-in onboarding body transition fade-only", () => {
  const stepFrameSource = readSource("src/onboarding/OnboardingStepFrame.tsx");
  const animatedBodyStyleSource =
    stepFrameSource.match(
      /const animatedBodyStyle = isContentTransitionEnabled[\s\S]*?: undefined;/,
    )?.[0] ?? "";

  assert.match(animatedBodyStyleSource, /opacity: contentTransition\.interpolate/);
  assert.doesNotMatch(animatedBodyStyleSource, /transform:/);
  assert.doesNotMatch(animatedBodyStyleSource, /translateX/);
  assert.doesNotMatch(stepFrameSource, /contentDirection/);
});

test("scales pre-onboarding mock phone frame chrome with frame width", async () => {
  const { getPreOnboardingPhoneFrameMetrics } = await import(
    "../src/onboarding/pre-onboarding-phone-frame-metrics"
  );

  const compactMetrics = getPreOnboardingPhoneFrameMetrics(160);
  const regularMetrics = getPreOnboardingPhoneFrameMetrics(224);
  const tabletMetrics = getPreOnboardingPhoneFrameMetrics(320);

  assert.ok(compactMetrics.borderRadius < regularMetrics.borderRadius);
  assert.ok(compactMetrics.leftTopButtonTop < regularMetrics.leftTopButtonTop);
  assert.ok(compactMetrics.rightButtonHeight < regularMetrics.rightButtonHeight);
  assert.equal(regularMetrics.borderRadius, 38);
  assert.equal(regularMetrics.borderWidth, 5);
  assert.equal(tabletMetrics.borderRadius, 43);
  assert.equal(tabletMetrics.borderWidth, 6);
});

test("supports inverted tone on the shared onboarding step frame", () => {
  const stepFrameSource = readSource("src/onboarding/OnboardingStepFrame.tsx");
  const preludeFrameSource = readSource(
    "src/onboarding/OnboardingPreludeFrame.tsx",
  );
  const choiceListSource = readSource("src/onboarding/OnboardingChoiceList.tsx");
  const plainListSource = readSource("src/onboarding/OnboardingPlainList.tsx");
  const playgroundSource = readFileSync(
    join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "playground",
      "src",
      "screens",
      "OnboardingPlaygroundScreen.tsx",
    ),
    "utf8",
  );

  assert.match(stepFrameSource, /tone\?: OnboardingFrameTone;/);
  assert.match(stepFrameSource, /tone = "normal"/);
  assert.match(stepFrameSource, /const isInvertedTone = tone === "inverted";/);
  assert.match(stepFrameSource, /backgroundColor: frameBackgroundColor/);
  assert.match(stepFrameSource, /backgroundColor: footerBackgroundColor/);
  assert.match(stepFrameSource, /progressActiveColor=\{progressActiveColor\}/);
  assert.match(preludeFrameSource, /tone=\{step\.tone\}/);
  assert.match(choiceListSource, /tone\?: OnboardingFrameTone;/);
  assert.match(choiceListSource, /selectedOptionId: string \| null;/);
  assert.match(choiceListSource, /onSelectOption: \(optionId: string\) => void;/);
  assert.match(choiceListSource, /const isInvertedTone = tone === "inverted";/);
  assert.match(plainListSource, /tone\?: OnboardingFrameTone;/);
  assert.match(plainListSource, /const isInvertedTone = tone === "inverted";/);
  assert.match(playgroundSource, /<OnboardingChoiceList[\s\S]{0,260}tone="inverted"/);
  assert.match(playgroundSource, /selectedOptionId=\{selectedProgressStep\}/);
  assert.match(playgroundSource, /tone: "inverted"/);
  assert.match(playgroundSource, /tone=\{currentSlide\.tone\}/);
  assert.doesNotMatch(playgroundSource, /checkedOptionIds/);
});

test("keeps keyboard avoiding on the shared onboarding step frame", () => {
  const stepFrameSource = readSource("src/onboarding/OnboardingStepFrame.tsx");

  assert.match(stepFrameSource, /KeyboardAvoidingView/);
  assert.match(stepFrameSource, /keyboardVerticalOffset\?: number;/);
  assert.match(
    stepFrameSource,
    /const isInputContentLayout = contentVerticalAlignment === "input";/,
  );
  assert.match(
    stepFrameSource,
    /const shouldAvoidAndroidFooterKeyboard = isInputContentLayout;/,
  );
  assert.match(
    stepFrameSource,
    /const \[androidFrameHeight, setAndroidFrameHeight\] = useState\(0\);/,
  );
  assert.match(
    stepFrameSource,
    /const \[androidFooterKeyboardOffset, setAndroidFooterKeyboardOffset\]/,
  );
  assert.match(stepFrameSource, /Keyboard\.addListener\(\s*"keyboardDidShow"/);
  assert.match(stepFrameSource, /Keyboard\.addListener\(\s*"keyboardDidHide"/);
  assert.match(stepFrameSource, /androidFrameHeight - keyboardTop/);
  assert.match(stepFrameSource, /translateY: -androidFooterKeyboardOffset/);
  assert.match(stepFrameSource, /onLayout=\{handleAndroidRootLayout\}/);
  assert.doesNotMatch(stepFrameSource, /ANDROID_FOOTER_KEYBOARD_BEHAVIOR/);
  assert.match(
    stepFrameSource,
    /const IOS_KEYBOARD_AVOIDING_BEHAVIOR = "padding"/,
  );
  assert.match(stepFrameSource, /Platform\.OS === "android"/);
  assert.doesNotMatch(stepFrameSource, /enabled=\{isKeyboardVisible\}/);
  assert.doesNotMatch(stepFrameSource, /android: "height" as const/);
  assert.doesNotMatch(stepFrameSource, /behavior=\{"position"\}/);
  assert.match(
    stepFrameSource,
    /behavior=\{IOS_KEYBOARD_AVOIDING_BEHAVIOR\}/,
  );
  assert.match(
    stepFrameSource,
    /contentContainerStyle=\{styles\.keyboardAvoidingContent\}/,
  );
  assert.match(
    stepFrameSource,
    /getOnboardingFooterBottomPadding\(insets\.bottom, \{\s*isCompactSpacingEnabled: isInputContentLayout,\s*\}\)/,
  );
  assert.match(stepFrameSource, /styles\.footerContent/);
  assert.doesNotMatch(stepFrameSource, /isKeyboardAvoidingEnabled/);
  assert.doesNotMatch(stepFrameSource, /footerBottomPadding\?: number;/);
  assert.doesNotMatch(stepFrameSource, /isSecondaryActionVisible/);
});

test("documents compact secondary action footer input examples in the playground", () => {
  const playgroundSource = readFileSync(
    join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "playground",
      "src",
      "screens",
      "OnboardingPlaygroundScreen.tsx",
    ),
    "utf8",
  );

  assert.match(playgroundSource, /<OnboardingWeightInputExample/);
  assert.match(playgroundSource, /contentVerticalAlignment: "input"/);
  assert.match(playgroundSource, /showSecondaryAction: true/);
  assert.match(playgroundSource, /currentUnit === "kg" \? "lb" : "kg"/);
  assert.ok(
    playgroundSource.indexOf('title: "Pick a weight unit"') <
      playgroundSource.indexOf("title: acquisitionSourceText.title"),
  );
  assert.doesNotMatch(playgroundSource, /footerBottomPadding/);
  assert.doesNotMatch(playgroundSource, /2\.2046226218/);
});

test("keeps onboarding frame CTA buttons compact", () => {
  const stepFrameSource = readSource("src/onboarding/OnboardingStepFrame.tsx");
  const preFrameSource = readSource("src/onboarding/PreOnboardingFrame.tsx");
  const playgroundPreOnboardingSource = readFileSync(
    join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "playground",
      "src",
      "screens",
      "PreOnboardingPlaygroundScreen.tsx",
    ),
    "utf8",
  );

  assert.match(stepFrameSource, /continueButton:[\s\S]{0,160}minHeight: 52/);
  assert.match(preFrameSource, /continueButton:[\s\S]{0,160}minHeight: 52/);
  assert.match(
    playgroundPreOnboardingSource,
    /primaryButton:[\s\S]{0,80}minHeight: 52/,
  );
});

test("keeps onboarding footer backgrounds and android CTA spacing intentional", () => {
  const preFrameSource = readSource("src/onboarding/PreOnboardingFrame.tsx");
  const layoutSource = readSource("src/onboarding/onboarding-layout.ts");

  assert.match(preFrameSource, /background\s*\?\s*"transparent"/);
  assert.match(
    preFrameSource,
    /getOnboardingFooterBottomPadding\(insets\.bottom\)/,
  );
  assert.match(layoutSource, /isCompactSpacingEnabled\?: boolean;/);
  assert.match(layoutSource, /ANDROID_FOOTER_BOTTOM_PADDING_CAP = 24/);
  assert.match(
    layoutSource,
    /Math\.min\(safeAreaBottom, ANDROID_FOOTER_BOTTOM_PADDING_CAP\)/,
  );
  assert.match(layoutSource, /Platform\.OS === "android"/);
  assert.match(
    layoutSource,
    /Math\.max\(\s*MIN_FOOTER_BOTTOM_PADDING,/,
  );
  assert.doesNotMatch(
    layoutSource,
    /if \(Platform\.OS === "android"\) return bottomPadding;/,
  );
  assert.match(
    layoutSource,
    /if \(options\.isCompactSpacingEnabled\) return MIN_FOOTER_BOTTOM_PADDING;/,
  );
  assert.match(
    layoutSource,
    /bottomPadding \+ IOS_FOOTER_EXTRA_BOTTOM_PADDING/,
  );
});

test("keeps prelude screen chrome in the package instead of the playground", () => {
  const preludeFrameSource = readSource(
    "src/onboarding/OnboardingPreludeFrame.tsx",
  );
  const playgroundSource = readFileSync(
    join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "playground",
      "src",
      "screens",
      "OnboardingPlaygroundScreen.tsx",
    ),
    "utf8",
  );

  assert.match(preludeFrameSource, /continueActionPresentation="tapHint"/);
  assert.match(preludeFrameSource, /isFullScreenTapEnabled/);
  assert.match(preludeFrameSource, /showHeader=\{false\}/);
  assert.match(preludeFrameSource, /isBodyScrollEnabled=\{false\}/);
  assert.match(preludeFrameSource, /<OnboardingPreludeContent/);
  assert.match(playgroundSource, /<OnboardingPreludeFrame/);
  assert.doesNotMatch(playgroundSource, /OnboardingPreludeContent/);
  assert.doesNotMatch(playgroundSource, /introContentContainer/);
});

test("keeps playground onboarding prelude mandatory before main steps", () => {
  const fixtureSource = readFileSync(
    join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "playground",
      "src",
      "fixtures",
      "onboarding-prelude-steps.ts",
    ),
    "utf8",
  );
  const playgroundSource = readFileSync(
    join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "playground",
      "src",
      "screens",
      "OnboardingPlaygroundScreen.tsx",
    ),
    "utf8",
  );

  assert.match(fixtureSource, /RequiredOnboardingPreludeSteps/);
  assert.match(playgroundSource, /currentStepIndex < preludeSteps\.length/);
  assert.match(playgroundSource, /isNicknameFlowStep = currentStepIndex === preludeSteps\.length/);
  assert.match(
    playgroundSource,
    /Math\.max\(\n    currentStepIndex - preludeSteps\.length - 1,\n    0,\n  \)/,
  );
  assert.match(playgroundSource, /<OnboardingNicknameFlowFrame/);
  assert.match(playgroundSource, /currentStepIndex=\{mainSlideStepIndex \+ 2\}/);
});
