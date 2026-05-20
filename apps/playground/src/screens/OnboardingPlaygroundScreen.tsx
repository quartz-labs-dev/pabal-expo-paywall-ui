import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  getColorWithAlpha,
  getDefaultOnboardingCopy,
} from "pabal-expo-paywall-ui";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  View,
} from "react-native";

import { OnboardingFrame } from "../components/OnboardingFrame";
import type { OnboardingFrameTheme } from "../components/OnboardingFrame";
import type { PlaygroundLocale } from "../types/playground";

interface OnboardingPlaygroundScreenProps {
  selectedLocale: PlaygroundLocale;
  theme?: OnboardingPlaygroundTheme;
  onClose: () => void;
  onNotNowPress?: () => void;
}

export interface OnboardingPlaygroundTheme {
  accentColor?: string;
  backgroundColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  cardBackgroundColor?: string;
  deviceBackgroundColor?: string;
  deviceForegroundColor?: string;
  primaryTextColor?: string;
  progressActiveColor?: string;
  progressInactiveColor?: string;
  secondaryTextColor?: string;
  shadowColor?: string;
}

interface PlaygroundSlide {
  canContinue?: boolean;
  content: ReactNode;
  description?: string;
  isBackButtonDisabled?: boolean;
  title?: string;
}

interface PreludeStep {
  bodyColor: string;
  bodyLines: string[];
  headline: string;
  headlineColor: string;
  tone: "normal" | "inverted";
}

interface OnboardingChoiceOption {
  id: string;
  description?: string;
  icon?: ReactNode;
  title: string;
}

interface ChoiceListContentProps {
  accentColor: string;
  descriptionTextColor: string;
  options: OnboardingChoiceOption[];
  selectedOptionId: string | null;
  shadowColor: string;
  surfaceColor: string;
  textColor: string;
  onSelectOption: (optionId: string) => void;
}

interface ChoiceListRowProps {
  accentColor: string;
  descriptionTextColor: string;
  isSelected: boolean;
  option: OnboardingChoiceOption;
  shadowColor: string;
  surfaceColor: string;
  textColor: string;
  onSelectOption: (optionId: string) => void;
}

const DEFAULT_ONBOARDING_THEME = {
  accentColor: "#E22121",
  backgroundColor: "#F7F7F8",
  buttonBackgroundColor: "#E22121",
  buttonTextColor: "#FFFFFF",
  cardBackgroundColor: "#FFFFFF",
  deviceBackgroundColor: "#151515",
  deviceForegroundColor: "#050505",
  primaryTextColor: "#050505",
  progressActiveColor: "#050505",
  progressInactiveColor: "#DDDDDE",
  secondaryTextColor: "#666A70",
  shadowColor: "#000000",
} satisfies Required<OnboardingPlaygroundTheme>;

const SOURCE_OPTIONS: OnboardingChoiceOption[] = [
  { id: "instagram", title: "Instagram" },
  { id: "tiktok", title: "TikTok" },
  { id: "youtube", title: "YouTube" },
  { id: "friend", title: "Friend" },
  { id: "search", title: "Search" },
];

const TRAINING_GOAL_OPTIONS: OnboardingChoiceOption[] = [
  {
    id: "remember",
    title: "Remember techniques",
    description: "Keep the details from class from disappearing.",
  },
  {
    id: "review",
    title: "Review before rolling",
    description: "Walk into the next session with a plan.",
  },
  {
    id: "track",
    title: "Track my progress",
    description: "See what you are learning over time.",
  },
  {
    id: "compete",
    title: "Prepare for competition",
    description: "Organize the positions you need under pressure.",
  },
];

const WORKOUT_FREQUENCY_OPTIONS: OnboardingChoiceOption[] = [
  { id: "0-2", icon: <ChoiceDotIcon />, title: "0-2" },
  { id: "3-4", icon: <ChoiceDotIcon />, title: "3-4" },
  { id: "5-6", icon: <ChoiceDotIcon />, title: "5-6" },
  { id: "7-plus", icon: <ChoiceDotIcon />, title: "7+" },
];

const TRAINING_HOUR_OPTIONS: OnboardingChoiceOption[] = [
  {
    id: "1-2",
    icon: <ChoiceDotIcon />,
    title: "1-2 hours",
    description: "A light week on the mats",
  },
  {
    id: "2-3",
    icon: <ChoiceDotIcon />,
    title: "2-3 hours",
    description: "A steady training rhythm",
  },
  {
    id: "3-4",
    icon: <ChoiceDotIcon />,
    title: "3-4 hours",
    description: "Several focused sessions",
  },
  {
    id: "4-5",
    icon: <ChoiceDotIcon />,
    title: "4-5 hours",
    description: "Training most weeks",
  },
  {
    id: "5-6",
    icon: <ChoiceDotIcon />,
    title: "5-6 hours",
    description: "A committed weekly pace",
  },
  {
    id: "6-plus",
    icon: <ChoiceDotIcon />,
    title: "6+ hours",
    description: "You live on the mats",
  },
];

export const OnboardingPlaygroundScreen = ({
  selectedLocale,
  theme: themeOverride,
  onClose,
  onNotNowPress,
}: OnboardingPlaygroundScreenProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedSource, setSelectedSource] = useState<string | null>("youtube");
  const [selectedTrainingGoal, setSelectedTrainingGoal] = useState<string | null>(
    "remember",
  );
  const [selectedWorkoutFrequency, setSelectedWorkoutFrequency] = useState<
    string | null
  >("0-2");
  const [selectedTrainingHours, setSelectedTrainingHours] = useState<
    string | null
  >("6-plus");
  const localizedCopy = getDefaultOnboardingCopy(selectedLocale);
  const continueLabel = localizedCopy.continueButton ?? "Continue";
  const theme = { ...DEFAULT_ONBOARDING_THEME, ...themeOverride };
  const mutedPrimaryTextColor = getColorWithAlpha(
    theme.primaryTextColor,
    0.62,
    theme.secondaryTextColor,
  );
  const frameTheme: OnboardingFrameTheme = {
    backgroundColor: theme.backgroundColor,
    backButtonBackgroundColor: theme.progressInactiveColor,
    backButtonDisabledIconColor: theme.secondaryTextColor,
    backButtonIconColor: theme.primaryTextColor,
    continueButtonBackgroundColor: theme.buttonBackgroundColor,
    continueButtonTextColor: theme.buttonTextColor,
    descriptionTextColor: mutedPrimaryTextColor,
    footerBackgroundColor: theme.backgroundColor,
    progressActiveColor: theme.progressActiveColor,
    progressInactiveColor: theme.progressInactiveColor,
    secondaryActionTextColor: theme.primaryTextColor,
    titleTextColor: theme.primaryTextColor,
  };

  const preludeSteps = useMemo<PreludeStep[]>(
    () => [
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
    ],
    [theme],
  );

  const slides = useMemo<PlaygroundSlide[]>(
    () => [
      {
        title: "Where did you hear about us?",
        canContinue: Boolean(selectedSource),
        content: (
          <ChoiceListContent
            accentColor={theme.accentColor}
            descriptionTextColor={mutedPrimaryTextColor}
            options={SOURCE_OPTIONS}
            selectedOptionId={selectedSource}
            shadowColor={theme.shadowColor}
            surfaceColor={theme.cardBackgroundColor}
            textColor={theme.primaryTextColor}
            onSelectOption={setSelectedSource}
          />
        ),
      },
      {
        title: "What do you want to improve first?",
        canContinue: Boolean(selectedTrainingGoal),
        content: (
          <ChoiceListContent
            accentColor={theme.accentColor}
            descriptionTextColor={mutedPrimaryTextColor}
            options={TRAINING_GOAL_OPTIONS}
            selectedOptionId={selectedTrainingGoal}
            shadowColor={theme.shadowColor}
            surfaceColor={theme.cardBackgroundColor}
            textColor={theme.primaryTextColor}
            onSelectOption={setSelectedTrainingGoal}
          />
        ),
      },
      {
        title: "How often do you work out?",
        canContinue: Boolean(selectedWorkoutFrequency),
        content: (
          <ChoiceListContent
            accentColor={theme.accentColor}
            descriptionTextColor={mutedPrimaryTextColor}
            options={WORKOUT_FREQUENCY_OPTIONS}
            selectedOptionId={selectedWorkoutFrequency}
            shadowColor={theme.shadowColor}
            surfaceColor={theme.cardBackgroundColor}
            textColor={theme.primaryTextColor}
            onSelectOption={setSelectedWorkoutFrequency}
          />
        ),
      },
      {
        title: "How much do you train each week?",
        canContinue: Boolean(selectedTrainingHours),
        content: (
          <ChoiceListContent
            accentColor={theme.accentColor}
            descriptionTextColor={mutedPrimaryTextColor}
            options={TRAINING_HOUR_OPTIONS}
            selectedOptionId={selectedTrainingHours}
            shadowColor={theme.shadowColor}
            surfaceColor={theme.cardBackgroundColor}
            textColor={theme.primaryTextColor}
            onSelectOption={setSelectedTrainingHours}
          />
        ),
      },
      {
        title: "Bring onboarding content freely",
        description:
          "The frame owns progress, safe area spacing, and the bottom action. Each app owns everything in the middle.",
        isBackButtonDisabled: true,
        content: (
          <View style={styles.centerStack}>
            <View
              style={[
                styles.logoMark,
                {
                  backgroundColor: theme.cardBackgroundColor,
                  shadowColor: theme.shadowColor,
                },
              ]}
            >
              <Text style={[styles.logoText, { color: theme.accentColor }]}>
                PB
              </Text>
            </View>
          </View>
        ),
      },
      {
        title: "Device frames stay app-owned",
        content: (
          <View style={styles.previewStack}>
            <View
              style={[
                styles.phoneFrame,
                { backgroundColor: theme.deviceBackgroundColor },
              ]}
            >
              <View
                style={[
                  styles.phoneHeader,
                  { backgroundColor: theme.deviceForegroundColor },
                ]}
              />
              <View
                style={[
                  styles.phoneCard,
                  { backgroundColor: theme.cardBackgroundColor },
                ]}
              >
                <Text
                  style={[
                    styles.phoneCardTitle,
                    { color: theme.primaryTextColor },
                  ]}
                >
                  Open Guard
                </Text>
                <Text
                  style={[
                    styles.phoneCardBody,
                    { color: theme.secondaryTextColor },
                  ]}
                >
                  Screenshots, videos, forms, lists, or custom React Native
                  content can all live in this center slot.
                </Text>
              </View>
              <View
                style={[
                  styles.phoneFooter,
                  { backgroundColor: theme.deviceForegroundColor },
                ]}
              />
            </View>
          </View>
        ),
      },
    ],
    [
      selectedSource,
      selectedTrainingGoal,
      selectedTrainingHours,
      selectedWorkoutFrequency,
      mutedPrimaryTextColor,
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
    ? `${stripIntroEmphasis(currentPreludeStep.headline)} ${currentPreludeStep.bodyLines
        .map(stripIntroEmphasis)
        .join(" ")}. ${localizedCopy.tapToContinueButton}`
    : undefined;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === preludeSteps.length + slides.length - 1;
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

interface PreludeStepContentProps {
  accentColor: string;
  bodyColor: string;
  bodyLines: string[];
  headline: string;
  headlineColor: string;
}

interface IntroTextSegment {
  isHighlighted?: boolean;
  text: string;
}

interface IntroTextToken {
  color: string;
  isHighlighted: boolean;
  key: string;
  text: string;
}

const PreludeStepContent = ({
  accentColor,
  bodyColor,
  bodyLines,
  headline,
  headlineColor,
}: PreludeStepContentProps) => {
  const headlineTokens = useMemo(
    () =>
      createIntroTextTokens(
        parseIntroEmphasisSegments(headline),
        headlineColor,
        accentColor,
      ),
    [accentColor, headline, headlineColor],
  );
  const bodyLineTokens = useMemo(
    () =>
      bodyLines.map((line) =>
        createIntroTextTokens(
          parseIntroEmphasisSegments(line),
          bodyColor,
          accentColor,
        ),
      ),
    [accentColor, bodyColor, bodyLines],
  );
  const wordCount =
    headlineTokens.length +
    bodyLineTokens.reduce((count, lineTokens) => count + lineTokens.length, 0);
  const wordAnimations = useSequentialTextAnimation(wordCount);
  let wordIndex = 0;

  return (
    <View style={styles.introCopy}>
      <View style={styles.introHeadlineLine}>
        {headlineTokens.map((token) => {
          const animatedStyle = getSequentialWordStyle(wordAnimations[wordIndex]);
          wordIndex += 1;

          return (
            <Animated.Text
              key={token.key}
              style={[
                styles.introHeadline,
                styles.introWord,
                { color: token.color },
                token.isHighlighted && styles.introHighlightedWord,
                animatedStyle,
              ]}
            >
              {token.text}
            </Animated.Text>
          );
        })}
      </View>
      <View style={styles.introBodyStack}>
        {bodyLineTokens.map((lineTokens, lineIndex) => (
          <View key={`body-line-${lineIndex}`} style={styles.introBodyLine}>
            {lineTokens.map((token) => {
              const animatedStyle = getSequentialWordStyle(
                wordAnimations[wordIndex],
              );
              wordIndex += 1;

              return (
                <Animated.Text
                  key={token.key}
                  style={[
                    styles.introBody,
                    styles.introWord,
                    { color: token.color },
                    token.isHighlighted && styles.introHighlightedWord,
                    animatedStyle,
                  ]}
                >
                  {token.text}
                </Animated.Text>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const ChoiceListContent = ({
  accentColor,
  descriptionTextColor,
  options,
  selectedOptionId,
  shadowColor,
  surfaceColor,
  textColor,
  onSelectOption,
}: ChoiceListContentProps) => {
  return (
    <View style={styles.choiceList}>
      {options.map((option) => (
        <ChoiceListRow
          key={option.id}
          accentColor={accentColor}
          descriptionTextColor={descriptionTextColor}
          isSelected={option.id === selectedOptionId}
          option={option}
          shadowColor={shadowColor}
          surfaceColor={surfaceColor}
          textColor={textColor}
          onSelectOption={onSelectOption}
        />
      ))}
    </View>
  );
};

const ChoiceListRow = ({
  accentColor,
  descriptionTextColor,
  isSelected,
  option,
  shadowColor,
  surfaceColor,
  textColor,
  onSelectOption,
}: ChoiceListRowProps) => {
  const selectionProgress = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      selectionProgress.setValue(isSelected ? 1 : 0);
      return;
    }

    if (!isSelected) {
      Animated.timing(selectionProgress, {
        duration: 120,
        easing: Easing.out(Easing.cubic),
        toValue: 0,
        useNativeDriver: true,
      }).start();
      return;
    }

    selectionProgress.setValue(0);
    Animated.sequence([
      Animated.timing(selectionProgress, {
        duration: 150,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(selectionProgress, {
        duration: 130,
        easing: Easing.out(Easing.cubic),
        toValue: 0.82,
        useNativeDriver: true,
      }),
      Animated.timing(selectionProgress, {
        duration: 120,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSelected, selectionProgress]);

  const animatedRowStyle = {
    transform: [
      {
        scale: selectionProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.018],
        }),
      },
    ],
  };
  const animatedCheckStyle = {
    opacity: selectionProgress,
    transform: [
      {
        scale: selectionProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.72, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedRowStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        onPress={() => onSelectOption(option.id)}
        style={[
          styles.choiceRow,
          {
            backgroundColor: surfaceColor,
            shadowColor,
          },
          isSelected && {
            borderColor: accentColor,
          },
        ]}
      >
        {option.icon ? (
          <View style={styles.choiceLeadingIcon}>{option.icon}</View>
        ) : null}
        <View style={styles.choiceTextWrap}>
          <Text style={[styles.choiceTitle, { color: textColor }]}>
            {option.title}
          </Text>
          {option.description ? (
            <Text
              style={[
                styles.choiceDescription,
                { color: descriptionTextColor },
              ]}
            >
              {option.description}
            </Text>
          ) : null}
        </View>
        <Animated.View
          style={[
            styles.choiceIndicator,
            isSelected && animatedCheckStyle,
            {
              backgroundColor: accentColor,
              borderColor: accentColor,
              opacity: isSelected ? undefined : 0,
            },
          ]}
        >
          <CheckIcon color="#FFFFFF" />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

function ChoiceDotIcon() {
  return (
    <View style={styles.choiceDotIcon}>
      <View style={styles.choiceDotIconMark} />
    </View>
  );
}

interface CheckIconProps {
  color: string;
}

const CheckIcon = ({ color }: CheckIconProps) => {
  return (
    <View style={styles.checkIcon}>
      <View
        style={[
          styles.checkLine,
          styles.checkLineShort,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          styles.checkLine,
          styles.checkLineLong,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

const EMPHASIS_PATTERN = /\*\*(.*?)\*\*/g;

const stripIntroEmphasis = (copy: string) => {
  return copy.replace(EMPHASIS_PATTERN, "$1");
};

const parseIntroEmphasisSegments = (copy: string): IntroTextSegment[] => {
  const segments: IntroTextSegment[] = [];
  let currentIndex = 0;
  let match = EMPHASIS_PATTERN.exec(copy);

  while (match) {
    if (match.index > currentIndex) {
      segments.push({ text: copy.slice(currentIndex, match.index) });
    }

    segments.push({ isHighlighted: true, text: match[1] });
    currentIndex = match.index + match[0].length;
    match = EMPHASIS_PATTERN.exec(copy);
  }

  if (currentIndex < copy.length) {
    segments.push({ text: copy.slice(currentIndex) });
  }

  EMPHASIS_PATTERN.lastIndex = 0;
  return segments;
};

const createIntroTextTokens = (
  segments: IntroTextSegment[],
  defaultColor: string,
  accentColor: string,
): IntroTextToken[] => {
  return segments.flatMap((segment, segmentIndex) =>
    segment.text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word, wordIndex) => ({
        color: segment.isHighlighted ? accentColor : defaultColor,
        isHighlighted: Boolean(segment.isHighlighted),
        key: `${segmentIndex}-${wordIndex}-${word}`,
        text: word,
      })),
  );
};

const useSequentialTextAnimation = (count: number) => {
  const animationsRef = useRef<Animated.Value[]>([]);

  if (animationsRef.current.length !== count) {
    animationsRef.current = Array.from(
      { length: count },
      () => new Animated.Value(0),
    );
  }

  useEffect(() => {
    const animations = animationsRef.current;
    animations.forEach((animation) => animation.setValue(0));

    const sequence = Animated.stagger(
      42,
      animations.map((animation) =>
        Animated.timing(animation, {
          duration: 320,
          easing: Easing.out(Easing.cubic),
          toValue: 1,
          useNativeDriver: false,
        }),
      ),
    );

    sequence.start();
    return () => sequence.stop();
  }, [count]);

  return animationsRef.current;
};

const getSequentialWordStyle = (
  animation: Animated.Value,
): Animated.WithAnimatedObject<TextStyle> => ({
  opacity: animation,
  transform: [
    {
      translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
    },
  ],
});

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
  introCopy: {
    gap: 72,
    width: "100%",
  },
  introHeadlineLine: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  introHeadline: {
    fontSize: 31,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 39,
  },
  introHighlightedWord: {
    fontWeight: "700",
  },
  introWord: {
    marginRight: 7,
  },
  introBodyStack: {
    gap: 0,
  },
  introBodyLine: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  introBody: {
    fontSize: 23,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 34,
  },
  centerStack: {
    alignItems: "center",
    gap: 18,
  },
  previewStack: {
    alignItems: "center",
    gap: 26,
  },
  logoMark: {
    alignItems: "center",
    borderRadius: 8,
    height: 76,
    justifyContent: "center",
    shadowOffset: { height: 12, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    width: 76,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0,
  },
  phoneFrame: {
    borderRadius: 38,
    maxWidth: 260,
    minHeight: 390,
    padding: 14,
    width: "72%",
  },
  phoneHeader: {
    alignSelf: "center",
    borderRadius: 999,
    height: 22,
    marginBottom: 24,
    width: 86,
  },
  phoneCard: {
    borderRadius: 8,
    gap: 8,
    padding: 18,
  },
  phoneCardTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  phoneCardBody: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  phoneFooter: {
    borderRadius: 999,
    height: 44,
    marginTop: "auto",
  },
  choiceList: {
    gap: 12,
    maxWidth: 360,
    width: "100%",
  },
  choiceRow: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    minHeight: 62,
    paddingHorizontal: 18,
    paddingVertical: 10,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
  },
  choiceLeadingIcon: {
    alignItems: "center",
    flexShrink: 0,
    justifyContent: "center",
  },
  choiceDotIcon: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  choiceDotIconMark: {
    backgroundColor: "#191522",
    borderRadius: 999,
    height: 16,
    width: 16,
  },
  choiceTextWrap: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  choiceTitle: {
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 22,
  },
  choiceDescription: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 18,
  },
  choiceIndicator: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  checkIcon: {
    height: 14,
    width: 14,
  },
  checkLine: {
    borderRadius: 999,
    height: 2.5,
    position: "absolute",
  },
  checkLineShort: {
    left: 1.5,
    top: 7,
    transform: [{ rotate: "45deg" }],
    width: 6,
  },
  checkLineLong: {
    right: 0.5,
    top: 5.5,
    transform: [{ rotate: "-45deg" }],
    width: 11,
  },
});
