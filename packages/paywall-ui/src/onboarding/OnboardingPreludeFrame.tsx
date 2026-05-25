import { StyleSheet } from "react-native";

import type { OnboardingFrameTheme } from "./onboarding-frame-theme";
import { stripOnboardingIntroEmphasis } from "./onboarding-animations";
import { OnboardingPreludeContent } from "./OnboardingPreludeContent";
import { OnboardingStepFrame } from "./OnboardingStepFrame";
import type { OnboardingContentTheme, OnboardingPreludeStep } from "./types";

export interface OnboardingPreludeFrameProps {
  continueLabel: string;
  contentTransitionIndex?: number;
  frameTheme?: OnboardingFrameTheme;
  fullScreenTapAccessibilityLabel?: string;
  isContentTransitionEnabled?: boolean;
  locale?: string;
  step: OnboardingPreludeStep;
  theme: Pick<
    OnboardingContentTheme,
    "accentColor" | "backgroundColor" | "primaryTextColor"
  >;
  onContinue: () => Promise<void> | void;
}

const createPreludeAccessibilityLabel = (
  step: OnboardingPreludeStep,
  continueLabel: string,
) => {
  const bodyLines = normalizePreludeBodyLines(step.bodyLines);
  const copy = [
    stripOnboardingIntroEmphasis(step.headline),
    ...bodyLines.map(stripOnboardingIntroEmphasis),
    continueLabel,
  ];

  return copy.join(" ");
};

const normalizePreludeBodyLines = (bodyLines: string[]) => {
  if (bodyLines.length <= 1) return bodyLines;

  return [bodyLines.join(" ")];
};

export const OnboardingPreludeFrame = ({
  continueLabel,
  contentTransitionIndex,
  frameTheme,
  fullScreenTapAccessibilityLabel,
  isContentTransitionEnabled,
  locale,
  step,
  theme,
  onContinue,
}: OnboardingPreludeFrameProps) => {
  const bodyLines = normalizePreludeBodyLines(step.bodyLines);

  return (
    <OnboardingStepFrame
      canContinue
      continueActionPresentation="tapHint"
      continueButtonTextStyle={{ color: step.bodyColor }}
      continueLabel={continueLabel}
      contentContainerStyle={styles.contentContainer}
      contentTransitionIndex={contentTransitionIndex}
      currentStepIndex={0}
      footerStyle={styles.footer}
      fullScreenTapAccessibilityLabel={
        fullScreenTapAccessibilityLabel ??
        createPreludeAccessibilityLabel(step, continueLabel)
      }
      isBackButtonDisabled
      isBodyScrollEnabled={false}
      isContentTransitionEnabled={isContentTransitionEnabled}
      isFullScreenTapEnabled
      locale={locale}
      showBackButton
      showHeader={false}
      showSecondaryAction={false}
      theme={{
        ...frameTheme,
        continueButtonTextColor: step.bodyColor,
      }}
      tone={step.tone}
      totalSteps={1}
      onContinue={onContinue}
    >
      <OnboardingPreludeContent
        accentColor={theme.accentColor}
        bodyColor={step.bodyColor}
        bodyLines={bodyLines}
        headline={step.headline}
        headlineColor={step.headlineColor}
      />
    </OnboardingStepFrame>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 112,
  },
  footer: {
    paddingHorizontal: 28,
    paddingTop: 8,
  },
});
