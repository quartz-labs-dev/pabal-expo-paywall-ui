import { type ComponentProps, type ReactNode, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  createOnboardingAcquisitionSourceOptions,
  OnboardingChoiceList,
  OnboardingCompletion,
  OnboardingNotificationMock,
  OnboardingPreludeFrame,
  OnboardingSocialProof,
  OnboardingStepFrame,
  PermissionPromptPreview,
  type OnboardingAcquisitionSourceId,
  type OnboardingAcquisitionSourceOption,
  type OnboardingChoiceOption,
  type OnboardingSlide,
} from "pabal-expo-paywall-ui";
import type { ImageSourcePropType } from "react-native";

import type { PlaygroundOnboardingContext } from "../components/onboarding-context";
import type { PlaygroundOnboardingTheme } from "../components/onboarding-theme";
import { createOnboardingPreludeSteps } from "../fixtures/onboarding-prelude-steps";

interface OnboardingPlaygroundScreenProps {
  notificationContent?: OnboardingNotificationContent;
  onboardingContext: PlaygroundOnboardingContext;
  onClose: () => void;
}

export type OnboardingPlaygroundTheme = PlaygroundOnboardingTheme;

export interface OnboardingNotificationContent {
  body: string;
  logo?: ReactNode;
  logoSource?: ImageSourcePropType;
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
}: CreateAcquisitionSourceSlideParams): OnboardingSlide => ({
  title,
  canContinue: Boolean(selectedSource),
  content: (
    <OnboardingChoiceList
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
}: CreateNotificationSlideParams): OnboardingSlide => ({
  canContinue: true,
  content: (
    <OnboardingNotificationMock
      body={content.body}
      logo={content.logo}
      logoSource={content.logoSource}
      nowLabel={nowLabel}
      theme={theme}
      title={content.title}
    />
  ),
  title: "Get your plan reminders",
});

interface CreateCompletionSlideParams {
  doneLabel: string;
  theme: Required<PlaygroundOnboardingTheme>;
}

const createCompletionSlide = ({
  doneLabel,
  theme,
}: CreateCompletionSlideParams): OnboardingSlide => ({
  canContinue: true,
  continueLabel: doneLabel,
  content: (
    <OnboardingCompletion
      description="Your setup is ready. The app can now move into the first real moment instead of ending on a form."
      eyebrow="Setup complete"
      theme={{
        accentColor: theme.accentColor,
        accentTextColor: theme.buttonTextColor,
        primaryTextColor: theme.primaryTextColor,
        secondaryTextColor: theme.secondaryTextColor,
      }}
      title="You're all set"
    />
  ),
});

export const OnboardingPlaygroundScreen = ({
  notificationContent = DEFAULT_NOTIFICATION_CONTENT,
  onboardingContext,
  onClose,
}: OnboardingPlaygroundScreenProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedSource, setSelectedSource] =
    useState<OnboardingAcquisitionSourceId | null>(null);
  const [selectedProgressStep, setSelectedProgressStep] = useState<
    string | null
  >(null);
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

  const slides = useMemo<OnboardingSlide[]>(
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
          <OnboardingSocialProof
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
      {
        canContinue: Boolean(selectedProgressStep),
        content: (
          <OnboardingChoiceList
            options={INVERTED_FRAME_LIST_OPTIONS}
            selectedOptionId={selectedProgressStep}
            theme={theme}
            tone="inverted"
            onSelectOption={setSelectedProgressStep}
          />
        ),
        description:
          "The best plan is the one you can return to before the next roll.",
        title: "Built for repeated progress",
        tone: "inverted",
      },
      createCompletionSlide({
        doneLabel: localizedCopy.doneButton,
        theme,
      }),
    ],
    [
      selectedSource,
      selectedProgressStep,
      acquisitionSourceText.title,
      acquisitionSourceOptions,
      locale,
      localizedCopy.doneButton,
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
  const isInvertedFrameTone =
    currentPreludeStep?.tone === "inverted" ||
    (!currentPreludeStep && currentSlide.tone === "inverted");
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
      <StatusBar style={isInvertedFrameTone ? "light" : "dark"} />
      {currentPreludeStep ? (
        <OnboardingPreludeFrame
          continueLabel={localizedCopy.tapToContinueButton}
          contentTransitionIndex={currentStepIndex}
          frameTheme={frameTheme}
          locale={locale}
          step={currentPreludeStep}
          theme={theme}
          onContinue={goNext}
        />
      ) : (
        <OnboardingStepFrame
          canContinue={currentSlide.canContinue}
          continueLabel={currentSlide.continueLabel ?? continueLabel}
          contentTransitionIndex={currentStepIndex}
          currentStepIndex={mainStepIndex}
          description={currentSlide.description}
          isBackButtonDisabled={currentSlide.isBackButtonDisabled}
          isContentTransitionEnabled
          locale={locale}
          showBackButton
          showSecondaryAction={!isLastStep}
          theme={frameTheme}
          title={currentSlide.title}
          tone={currentSlide.tone}
          totalSteps={headerStepCount}
          onBack={goBack}
          onContinue={goNext}
          onSecondaryAction={goNext}
        >
          {currentSlide.content}
        </OnboardingStepFrame>
      )}
    </>
  );
};

const DEFAULT_NOTIFICATION_CONTENT = {
  body: "Check out your workouts, meal plan and mindset activities for next week!",
  title: "Your Plan is READY",
} satisfies OnboardingNotificationContent;

const ONBOARDING_SOCIAL_PROOF_CONTENT = {
  headline: "Post Black Belt was made for **athletes like you**.",
  metric: {
    label: "100K+ App Ratings",
    value: "4.8",
  },
  reviews: [
    {
      quote:
        "I finally stopped losing track of what to train next. The reminders and plan flow make it easy to stay consistent.",
      rating: 5,
      title: "FINALLY CONSISTENT.",
    },
    {
      quote:
        "Simple, clean, and actually useful. It gives me just enough structure without turning training into admin work.",
      rating: 5,
      title: "EXACTLY WHAT I NEEDED.",
    },
  ],
} satisfies Omit<ComponentProps<typeof OnboardingSocialProof>, "theme">;

const INVERTED_FRAME_LIST_OPTIONS = [
  {
    id: "save-detail",
    title: "Save one detail from class",
  },
  {
    id: "review-before-roll",
    title: "Review it before the next roll",
  },
  {
    id: "build-library",
    title: "Build a library over time",
  },
] satisfies OnboardingChoiceOption[];
