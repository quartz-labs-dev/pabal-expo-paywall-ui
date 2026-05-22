import { type ComponentProps, type ReactNode, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import {
  createOnboardingAcquisitionSourceOptions,
  OnboardingChoiceList,
  OnboardingCompletion,
  OnboardingGalleryGrid,
  OnboardingNicknameFlowFrame,
  OnboardingNotificationMock,
  OnboardingPreludeFrame,
  OnboardingSocialProof,
  OnboardingStepFrame,
  PermissionPromptPreview,
  type OnboardingAcquisitionSourceId,
  type OnboardingAcquisitionSourceOption,
  type OnboardingChoiceOption,
  type OnboardingGalleryGridItem,
  type OnboardingNicknameFlowPhase,
  type OnboardingNotificationItem,
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
  body?: string;
  dateLabel?: string;
  description?: string;
  iconBackgroundColor?: string;
  logo?: ReactNode;
  logoSource?: ImageSourcePropType;
  notifications?: readonly OnboardingNotificationItem[];
  timeLabel?: string;
  title?: string;
}

export interface OnboardingSubmittedNicknameProfile {
  nickname: string;
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

interface PlaygroundOnboardingSlide extends OnboardingSlide {
  contentVerticalAlignment?: ComponentProps<
    typeof OnboardingStepFrame
  >["contentVerticalAlignment"];
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
      dateLabel={content.dateLabel}
      description={content.description}
      iconBackgroundColor={content.iconBackgroundColor}
      logo={content.logo}
      logoSource={content.logoSource}
      nowLabel={nowLabel}
      notifications={content.notifications}
      theme={theme}
      timeLabel={content.timeLabel}
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
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [profileNickname, setProfileNickname] = useState("");
  const [nicknameFlowPhase, setNicknameFlowPhase] =
    useState<OnboardingNicknameFlowPhase>("input");
  const [, setSubmittedNicknameProfile] =
    useState<OnboardingSubmittedNicknameProfile | null>(null);
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

  const slides = useMemo<PlaygroundOnboardingSlide[]>(
    () => [
      {
        canContinue: Boolean(weight.trim()),
        content: (
          <OnboardingWeightInputExample
            theme={theme}
            unit={weightUnit}
            value={weight}
            onChangeValue={setWeight}
            onToggleUnit={() => {
              setWeightUnit((currentUnit) =>
                currentUnit === "kg" ? "lb" : "kg",
              );
            }}
          />
        ),
        contentVerticalAlignment: "input",
        description:
          "This mirrors an input step with a secondary action and a compact safe-area footer.",
        showSecondaryAction: true,
        title: "Pick a weight unit",
      },
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
          <OnboardingGalleryGrid
            animationDurationMs={17000}
            items={ONBOARDING_GALLERY_GRID_ITEMS}
            theme={theme}
          />
        ),
        description:
          "Save the small details you want to remember, then come back to them before the next round.",
        title: "Your training library starts here",
      },
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
      weight,
      weightUnit,
    ],
  );

  const isPreludeStep = currentStepIndex < preludeSteps.length;
  const currentPreludeStep = isPreludeStep
    ? preludeSteps[currentStepIndex]
    : undefined;
  const isNicknameFlowStep = currentStepIndex === preludeSteps.length;
  const mainSlideStepIndex = Math.max(
    currentStepIndex - preludeSteps.length - 1,
    0,
  );
  const currentSlide = slides[mainSlideStepIndex];
  const isInvertedFrameTone =
    currentPreludeStep?.tone === "inverted" ||
    (isNicknameFlowStep && nicknameFlowPhase === "welcome") ||
    (!currentPreludeStep &&
      !isNicknameFlowStep &&
      currentSlide.tone === "inverted");
  const isFirstStep = currentStepIndex === 0;
  const isLastStep =
    currentStepIndex === preludeSteps.length + slides.length;
  const headerStepCount = Math.max(slides.length + 2, 1);

  const goBack = () => {
    if (isFirstStep) {
      onClose();
      return;
    }

    setCurrentStepIndex((stepIndex) => stepIndex - 1);
  };

  const goNext = async () => {
    if (!isNicknameFlowStep) {
      await currentSlide.onContinue?.();
    }

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
      ) : isNicknameFlowStep ? (
        <OnboardingNicknameFlowFrame
          autoFocus
          baseStepIndex={0}
          continueLabel={continueLabel}
          contentTransitionIndex={currentStepIndex}
          frameTheme={frameTheme}
          initialPhase={nicknameFlowPhase}
          locale={locale}
          nickname={profileNickname}
          theme={theme}
          totalSteps={headerStepCount}
          onBack={goBack}
          onChangeNickname={setProfileNickname}
          onComplete={goNext}
          onPhaseChange={setNicknameFlowPhase}
          onSubmitNickname={(nickname) => {
            setSubmittedNicknameProfile({ nickname });
          }}
        />
      ) : (
        <OnboardingStepFrame
          canContinue={currentSlide.canContinue}
          continueLabel={currentSlide.continueLabel ?? continueLabel}
          contentTransitionIndex={currentStepIndex}
          contentVerticalAlignment={currentSlide.contentVerticalAlignment}
          currentStepIndex={mainSlideStepIndex + 2}
          description={currentSlide.description}
          isBackButtonDisabled={currentSlide.isBackButtonDisabled}
          isContentTransitionEnabled
          locale={locale}
          showBackButton
          showSecondaryAction={
            currentSlide.showSecondaryAction ?? !isLastStep
          }
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
  notifications: [
    {
      description: "New anti-impulse tip available.",
      icon: <NotificationGlyph color="#5B2E91" label="!" />,
      iconBackgroundColor: "#D8B4FE",
      title: "Weekly tip",
    },
    {
      description: "Your 14-day review is open now.",
      icon: <NotificationGlyph color="#8A6A21" label="*" />,
      iconBackgroundColor: "#F4D48A",
      title: "Review ready",
    },
    {
      description: "Your item is ready for check-in.",
      icon: <NotificationGlyph color="#4A7FA7" label=">" />,
      iconBackgroundColor: "#CFE8FF",
      title: "Cooldown complete",
    },
  ],
} satisfies OnboardingNotificationContent;

interface NotificationGlyphProps {
  color: string;
  label: string;
}

function NotificationGlyph({ color, label }: NotificationGlyphProps) {
  return (
    <View style={styles.notificationGlyph}>
      <Text style={[styles.notificationGlyphText, { color }]}>{label}</Text>
    </View>
  );
}

type WeightUnit = "kg" | "lb";

interface OnboardingWeightInputExampleProps {
  theme: Required<PlaygroundOnboardingTheme>;
  unit: WeightUnit;
  value: string;
  onChangeValue: (value: string) => void;
  onToggleUnit: () => void;
}

function OnboardingWeightInputExample({
  theme,
  unit,
  value,
  onChangeValue,
  onToggleUnit,
}: OnboardingWeightInputExampleProps) {
  return (
    <View
      style={[
        styles.weightInputCard,
        { backgroundColor: theme.cardBackgroundColor },
      ]}
    >
      <Text style={[styles.weightInputTitle, { color: theme.primaryTextColor }]}>
        Weight
      </Text>
      <View
        style={[
          styles.weightInputRow,
          { backgroundColor: theme.frameBackgroundColor },
        ]}
      >
        <TextInput
          autoFocus
          keyboardType="decimal-pad"
          placeholder="Enter weight"
          placeholderTextColor={theme.secondaryTextColor}
          style={[styles.weightInput, { color: theme.primaryTextColor }]}
          value={value}
          onChangeText={onChangeValue}
        />
        <Pressable
          accessibilityLabel={`Switch weight unit from ${unit}`}
          accessibilityRole="button"
          hitSlop={8}
          onPress={onToggleUnit}
          style={[
            styles.weightUnitToggle,
            { backgroundColor: theme.cardBackgroundColor },
          ]}
        >
          <Text
            style={[
              styles.weightUnitToggleText,
              { color: theme.primaryTextColor },
            ]}
          >
            {unit}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

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

const ONBOARDING_GALLERY_GRID_ITEMS = [
  {
    backgroundColor: "#F48BB7",
    id: "captain-hook",
    title: "Captain Hook",
  },
  {
    backgroundColor: "#79D4DC",
    id: "james-dean",
    imageSource: require("../../../../packages/paywall-ui/src/assets/acquisition-icons/instagram.png"),
    title: "James Dean",
  },
  {
    backgroundColor: "#8BCB67",
    id: "espresso-machine",
    imageSource: require("../../../../packages/paywall-ui/src/assets/acquisition-icons/google.png"),
    title: "Espresso machine",
  },
  {
    backgroundColor: "#F4D35E",
    id: "saturn-v",
    imageSource: require("../../../../packages/paywall-ui/src/assets/acquisition-icons/youtube.png"),
    title: "Saturn V",
  },
  {
    backgroundColor: "#CBA7F2",
    id: "miss-americana",
    title: "Miss Americana & the Heartbreak Prince",
  },
  {
    backgroundColor: "#68CBD3",
    id: "carpenter-ants",
    title: "Carpenter ants",
  },
  {
    backgroundColor: "#F8E45C",
    id: "madison-square-garden",
    title: "Madison Square Garden",
  },
  {
    backgroundColor: "#5AAEEB",
    id: "josephine-baker",
    imageSource: require("../../../../packages/paywall-ui/src/assets/acquisition-icons/x.png"),
    title: "Josephine Baker",
  },
  {
    backgroundColor: "#F6A57F",
    id: "space-odyssey",
    title: "2001: A Space Odyssey",
  },
  {
    backgroundColor: "#8DD06A",
    id: "nitrogen",
    title: "Nitrogen's atomic number",
  },
  {
    backgroundColor: "#E7EFF7",
    id: "moonwalk",
    imageSource: require("../../../../packages/paywall-ui/src/assets/acquisition-icons/app-store.png"),
    title: "Moonwalk",
  },
  {
    backgroundColor: "#D6C6A7",
    id: "classical-study",
    imageSource: require("../../../../packages/paywall-ui/src/assets/acquisition-icons/play-store.png"),
    title: "Classical study",
  },
] satisfies readonly OnboardingGalleryGridItem[];

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

const styles = StyleSheet.create({
  weightInputCard: {
    alignSelf: "center",
    borderRadius: 8,
    gap: 14,
    maxWidth: 420,
    padding: 16,
    width: "100%",
  },
  weightInputTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 22,
  },
  weightInputRow: {
    alignItems: "center",
    borderRadius: 14,
    flexDirection: "row",
    gap: 10,
    minHeight: 56,
    paddingLeft: 16,
    paddingRight: 8,
  },
  weightInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 27,
    minHeight: 56,
    paddingVertical: 0,
  },
  weightUnitToggle: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 40,
    minWidth: 58,
    paddingHorizontal: 14,
  },
  weightUnitToggleText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 20,
  },
  notificationGlyph: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  notificationGlyphText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 18,
  },
});
