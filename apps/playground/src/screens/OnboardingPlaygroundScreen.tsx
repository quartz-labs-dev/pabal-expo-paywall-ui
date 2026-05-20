import { type ComponentProps, type ReactNode, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  createOnboardingAcquisitionSourceOptions,
  PermissionPromptPreview,
  type OnboardingAcquisitionSourceId,
  type OnboardingAcquisitionSourceOption,
} from "pabal-expo-paywall-ui";
import { StyleSheet } from "react-native";

import { OnboardingFrame } from "../components/OnboardingFrame";
import { ChoiceListContent } from "../components/onboarding/ChoiceListContent";
import { NotificationMockContent } from "../components/onboarding/NotificationMockContent";
import { PreludeStepContent } from "../components/onboarding/PreludeStepContent";
import { SocialProofContent } from "../components/onboarding/SocialProofContent";
import type { PlaygroundSlide } from "../components/onboarding/types";
import type { PlaygroundOnboardingContext } from "../components/onboarding-context";
import type { PlaygroundOnboardingTheme } from "../components/onboarding-theme";
import { createOnboardingPreludeSteps } from "../fixtures/onboarding-prelude-steps";
import { stripIntroEmphasis } from "../utils/onboarding-intro-text";

interface OnboardingPlaygroundScreenProps {
  notificationContent?: OnboardingNotificationContent;
  onboardingContext: PlaygroundOnboardingContext;
  onClose: () => void;
  onNotNowPress?: () => void;
}

export type OnboardingPlaygroundTheme = PlaygroundOnboardingTheme;

export interface OnboardingNotificationContent {
  body: string;
  logo?: ReactNode;
  title: string;
}

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

interface CreateNotificationSlideParams {
  content: OnboardingNotificationContent;
  nowLabel: string;
  theme: Required<PlaygroundOnboardingTheme>;
}

const createNotificationSlide = ({
  content,
  nowLabel,
  theme,
}: CreateNotificationSlideParams): PlaygroundSlide => ({
  canContinue: true,
  content: (
    <NotificationMockContent
      body={content.body}
      logo={content.logo}
      nowLabel={nowLabel}
      theme={theme}
      title={content.title}
    />
  ),
  title: "Get your plan reminders",
});

export const OnboardingPlaygroundScreen = ({
  notificationContent = DEFAULT_NOTIFICATION_CONTENT,
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
    platform,
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
      {
        canContinue: true,
        content: (
          <SocialProofContent
            {...ONBOARDING_SOCIAL_PROOF_CONTENT}
            theme={theme}
          />
        ),
      },
      {
        title: "Enable smarter reminders",
        description:
          "Use the shared permission prompt template before the native permission request.",
        content: (
          <PermissionPromptPreview
            locale={locale}
            message="Notifications may include alerts, sounds, and icon badges. These can be configured in Settings."
            platform={platform}
            primaryColor={theme.accentColor}
            title="“Post Black Belt” Would Like to Send You Notifications"
          />
        ),
      },
      createNotificationSlide({
        content: notificationContent,
        nowLabel: localizedCopy.notificationNowLabel,
        theme,
      }),
    ],
    [
      selectedSource,
      acquisitionSourceText.title,
      acquisitionSourceOptions,
      locale,
      localizedCopy.notificationNowLabel,
      notificationContent,
      platform,
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

const DEFAULT_NOTIFICATION_CONTENT = {
  body: "Check out your workouts, meal plan and mindset activities for next week!",
  title: "Your Plan is READY",
} satisfies OnboardingNotificationContent;

const ONBOARDING_SOCIAL_PROOF_CONTENT = {
  eyebrow: "App Store reviews",
  headline: "Post Black Belt was made for athletes like you.",
  highlightedText: "athletes like you",
  metric: {
    label: "100K+ App Ratings",
    value: "4.8",
  },
  reviews: [
    {
      author: "App Store review",
      quote:
        "I finally stopped losing track of what to train next. The reminders and plan flow make it easy to stay consistent.",
      rating: 5,
      title: "FINALLY CONSISTENT.",
    },
    {
      author: "App Store review",
      quote:
        "Simple, clean, and actually useful. It gives me just enough structure without turning training into admin work.",
      rating: 5,
      title: "EXACTLY WHAT I NEEDED.",
    },
  ],
  subheadline: "Trusted by people building better training habits.",
} satisfies Omit<ComponentProps<typeof SocialProofContent>, "theme">;

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
