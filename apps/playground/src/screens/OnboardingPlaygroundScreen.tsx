import { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  createOnboardingAcquisitionSourceOptions,
  type OnboardingAcquisitionSourceId,
  type OnboardingAcquisitionSourceOption,
} from "pabal-expo-paywall-ui";
import { StyleSheet } from "react-native";

import { OnboardingFrame } from "../components/OnboardingFrame";
import { ChoiceListContent } from "../components/onboarding/ChoiceListContent";
import { PreludeStepContent } from "../components/onboarding/PreludeStepContent";
import type { PlaygroundSlide } from "../components/onboarding/types";
import type { PlaygroundOnboardingContext } from "../components/onboarding-context";
import type { PlaygroundOnboardingTheme } from "../components/onboarding-theme";
import { createOnboardingPreludeSteps } from "../fixtures/onboarding-prelude-steps";
import { stripIntroEmphasis } from "../utils/onboarding-intro-text";

interface OnboardingPlaygroundScreenProps {
  onboardingContext: PlaygroundOnboardingContext;
  onClose: () => void;
  onNotNowPress?: () => void;
}

export type OnboardingPlaygroundTheme = PlaygroundOnboardingTheme;

interface CreateAcquisitionSourceSlideParams {
  options: OnboardingAcquisitionSourceOption[];
  selectedSource: OnboardingAcquisitionSourceId | null;
  theme: Required<PlaygroundOnboardingTheme>;
  title: string;
  onSelectSource: (sourceId: OnboardingAcquisitionSourceId) => void;
}

const createAcquisitionSourceSlide = ({
  options,
  selectedSource,
  theme,
  title,
  onSelectSource,
}: CreateAcquisitionSourceSlideParams): PlaygroundSlide => ({
  title,
  canContinue: Boolean(selectedSource),
  content: (
    <ChoiceListContent
      options={options}
      selectedOptionId={selectedSource}
      theme={theme}
      onSelectOption={(sourceId) =>
        onSelectSource(sourceId as OnboardingAcquisitionSourceId)
      }
    />
  ),
});

export const OnboardingPlaygroundScreen = ({
  onboardingContext,
  onClose,
  onNotNowPress,
}: OnboardingPlaygroundScreenProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedSource, setSelectedSource] =
    useState<OnboardingAcquisitionSourceId | null>(null);
  const {
    acquisitionSourceText,
    copy: localizedCopy,
    frameTheme,
    locale,
    storePlatform,
    theme,
  } = onboardingContext;
  const continueLabel = localizedCopy.continueButton ?? "Continue";
  const acquisitionSourceOptions = useMemo(
    () =>
      createOnboardingAcquisitionSourceOptions(
        storePlatform,
        locale,
      ),
    [locale, storePlatform],
  );

  const preludeSteps = useMemo(
    () => createOnboardingPreludeSteps(theme),
    [theme],
  );

  const slides = useMemo<PlaygroundSlide[]>(
    () => [
      createAcquisitionSourceSlide({
        options: acquisitionSourceOptions,
        selectedSource,
        theme,
        title: acquisitionSourceText.title,
        onSelectSource: setSelectedSource,
      }),
    ],
    [
      selectedSource,
      acquisitionSourceText.title,
      acquisitionSourceOptions,
      theme,
    ],
  );

  const isPreludeStep = currentStepIndex < preludeSteps.length;
  const currentPreludeStep = isPreludeStep
    ? preludeSteps[currentStepIndex]
    : undefined;
  const mainStepIndex = Math.max(currentStepIndex - preludeSteps.length, 0);
  const currentSlide = slides[mainStepIndex];
  const isInvertedPreludeStep = currentPreludeStep?.tone === "inverted";
  const preludeAccessibilityLabel = currentPreludeStep
    ? `${stripIntroEmphasis(
        currentPreludeStep.headline
      )} ${currentPreludeStep.bodyLines.map(stripIntroEmphasis).join(" ")}. ${
        localizedCopy.tapToContinueButton
      }`
    : undefined;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep =
    currentStepIndex === preludeSteps.length + slides.length - 1;
  const headerStepCount = Math.max(slides.length, 1);

  const goBack = () => {
    if (isFirstStep) {
      onClose();
      return;
    }

    setCurrentStepIndex((stepIndex) => stepIndex - 1);
  };

  const goNext = () => {
    if (isLastStep) {
      onClose();
      return;
    }

    setCurrentStepIndex((stepIndex) => stepIndex + 1);
  };

  return (
    <>
      <StatusBar style={isInvertedPreludeStep ? "light" : "dark"} />
      <OnboardingFrame
        continueActionPresentation={isPreludeStep ? "tapHint" : "button"}
        continueButtonTextStyle={
          isInvertedPreludeStep
            ? { color: theme.backgroundColor }
            : isPreludeStep
            ? { color: theme.secondaryTextColor }
            : undefined
        }
        continueLabel={
          isPreludeStep ? localizedCopy.tapToContinueButton : continueLabel
        }
        contentTransitionIndex={currentStepIndex}
        contentContainerStyle={
          isPreludeStep ? styles.introContentContainer : undefined
        }
        currentStepIndex={isPreludeStep ? 0 : mainStepIndex}
        footerStyle={isPreludeStep ? styles.introFooter : undefined}
        fullScreenTapAccessibilityLabel={preludeAccessibilityLabel}
        isBodyScrollEnabled={!isPreludeStep}
        isBackButtonDisabled={
          isPreludeStep ? true : currentSlide.isBackButtonDisabled
        }
        isContentTransitionEnabled
        isFullScreenTapEnabled={isPreludeStep}
        canContinue={isPreludeStep ? true : currentSlide.canContinue}
        secondaryActionLabel={
          !isPreludeStep && onNotNowPress
            ? localizedCopy.notNowButton
            : undefined
        }
        showBackButton
        showHeader={!isPreludeStep}
        theme={
          isInvertedPreludeStep
            ? {
                ...frameTheme,
                backgroundColor: theme.primaryTextColor,
                continueButtonTextColor: theme.backgroundColor,
                footerBackgroundColor: theme.primaryTextColor,
              }
            : frameTheme
        }
        title={isPreludeStep ? undefined : currentSlide.title}
        totalSteps={isPreludeStep ? 1 : headerStepCount}
        description={isPreludeStep ? undefined : currentSlide.description}
        onBack={goBack}
        onContinue={goNext}
        onSecondaryAction={onNotNowPress}
      >
        {currentPreludeStep ? (
          <PreludeStepContent
            accentColor={theme.accentColor}
            bodyColor={currentPreludeStep.bodyColor}
            bodyLines={currentPreludeStep.bodyLines}
            headline={currentPreludeStep.headline}
            headlineColor={currentPreludeStep.headlineColor}
          />
        ) : (
          currentSlide.content
        )}
      </OnboardingFrame>
    </>
  );
};

const styles = StyleSheet.create({
  introContentContainer: {
    justifyContent: "flex-start",
    paddingHorizontal: 34,
    paddingTop: 128,
  },
  introFooter: {
    paddingHorizontal: 28,
    paddingTop: 8,
  },
});
