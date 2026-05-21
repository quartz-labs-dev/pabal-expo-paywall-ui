import { type ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  type StyleProp,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  resolveOnboardingFrameTheme,
  type OnboardingFrameTheme,
} from "./onboarding-frame-theme";

export interface OnboardingStepFrameProps {
  children: ReactNode;
  canContinue?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  contentTransitionIndex?: number;
  continueActionPresentation?: "button" | "tapHint";
  continueButtonTextStyle?: StyleProp<TextStyle>;
  continueLabel: string;
  currentStepIndex: number;
  description?: ReactNode;
  footerStyle?: StyleProp<ViewStyle>;
  fullScreenTapAccessibilityLabel?: string;
  backButtonAccessibilityLabel?: string;
  isBackButtonDisabled?: boolean;
  isBodyScrollEnabled?: boolean;
  isContentTransitionEnabled?: boolean;
  isFullScreenTapEnabled?: boolean;
  rootStyle?: StyleProp<ViewStyle>;
  secondaryActionLabel?: string;
  secondaryActionTextStyle?: StyleProp<TextStyle>;
  showBackButton?: boolean;
  showHeader?: boolean;
  theme?: OnboardingFrameTheme;
  title?: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  totalSteps: number;
  onBack?: () => Promise<void> | void;
  onContinue: () => Promise<void> | void;
  onSecondaryAction?: () => Promise<void> | void;
}

const INITIAL_CONTENT_TRANSITION_DELAY_MS = 90;

const getProgressRatio = (stepIndex: number, stepCount: number) => {
  const safeStepCount = Math.max(stepCount, 1);
  const safeStepIndex = Math.min(Math.max(stepIndex, 0), safeStepCount - 1);
  return (safeStepIndex + 1) / safeStepCount;
};

export const OnboardingStepFrame = ({
  children,
  canContinue = true,
  contentContainerStyle,
  contentTransitionIndex,
  continueActionPresentation = "button",
  continueButtonTextStyle,
  continueLabel,
  currentStepIndex,
  description,
  footerStyle,
  fullScreenTapAccessibilityLabel,
  backButtonAccessibilityLabel = "Go back",
  isBackButtonDisabled = false,
  isBodyScrollEnabled = true,
  isContentTransitionEnabled = true,
  isFullScreenTapEnabled = false,
  rootStyle,
  secondaryActionLabel,
  secondaryActionTextStyle,
  showBackButton,
  showHeader = true,
  theme: themeOverride,
  title,
  titleStyle,
  totalSteps,
  onBack,
  onContinue,
  onSecondaryAction,
}: OnboardingStepFrameProps) => {
  const insets = useSafeAreaInsets();
  const theme = resolveOnboardingFrameTheme(themeOverride);
  const shouldShowBackButton = showBackButton ?? Boolean(onBack);
  const isBackDisabled = isBackButtonDisabled || !shouldShowBackButton || !onBack;
  const effectiveContentTransitionIndex =
    contentTransitionIndex ?? currentStepIndex;
  const previousStepIndexRef = useRef<number | null>(null);
  const contentDirection =
    previousStepIndexRef.current !== null &&
    effectiveContentTransitionIndex < previousStepIndexRef.current
      ? -1
      : 1;
  const contentTransition = useRef(
    new Animated.Value(isContentTransitionEnabled ? 0 : 1),
  ).current;

  useEffect(() => {
    const previousStepIndex = previousStepIndexRef.current;
    if (previousStepIndex === effectiveContentTransitionIndex) return;

    previousStepIndexRef.current = effectiveContentTransitionIndex;

    if (!isContentTransitionEnabled) {
      contentTransition.setValue(1);
      return;
    }

    contentTransition.setValue(0);
    const animation = Animated.timing(contentTransition, {
      duration: 360,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });

    const delay =
      previousStepIndex === null ? INITIAL_CONTENT_TRANSITION_DELAY_MS : 0;
    const timeoutId = setTimeout(() => {
      animation.start();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      animation.stop();
    };
  }, [
    contentTransition,
    effectiveContentTransitionIndex,
    isContentTransitionEnabled,
  ]);

  const animatedBodyStyle = isContentTransitionEnabled
    ? {
        opacity: contentTransition.interpolate({
          inputRange: [0, 1],
          outputRange: [0.01, 1],
        }),
        transform: [
          {
            translateX: contentTransition.interpolate({
              inputRange: [0, 1],
              outputRange: [44 * contentDirection, 0],
            }),
          },
        ],
      }
    : undefined;

  const rootStyleValue: StyleProp<ViewStyle> = [
    styles.root,
    { backgroundColor: theme.backgroundColor },
    rootStyle,
  ];

  const content = (
    <>
      {showHeader && (
        <OnboardingStepHeader
          backButtonAccessibilityLabel={backButtonAccessibilityLabel}
          backButtonBackgroundColor={theme.backButtonBackgroundColor}
          backButtonDisabledIconColor={theme.backButtonDisabledIconColor}
          backButtonIconColor={theme.backButtonIconColor}
          currentStepIndex={currentStepIndex}
          isBackDisabled={isBackDisabled}
          progressActiveColor={theme.progressActiveColor}
          progressInactiveColor={theme.progressInactiveColor}
          safeAreaTop={insets.top}
          totalSteps={totalSteps}
          onBack={onBack}
        />
      )}

      <Animated.View style={[styles.body, animatedBodyStyle]}>
        {title || description ? (
          <View style={styles.stepIntro}>
            {typeof title === "string" || typeof title === "number" ? (
              <Text
                style={[
                  styles.stepTitle,
                  { color: theme.titleTextColor },
                  titleStyle,
                ]}
              >
                {title}
              </Text>
            ) : (
              title
            )}
            {typeof description === "string" ||
            typeof description === "number" ? (
              <Text
                style={[
                  styles.stepDescription,
                  { color: theme.descriptionTextColor },
                ]}
              >
                {description}
              </Text>
            ) : (
              description
            )}
          </View>
        ) : null}
        <ScrollView
          bounces={isBodyScrollEnabled}
          contentContainerStyle={[
            styles.bodyContent,
            contentContainerStyle,
            !showHeader && {
              paddingTop: Math.max(insets.top, 12) + 22,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={isBodyScrollEnabled}
          showsVerticalScrollIndicator={false}
          style={styles.bodyScroll}
        >
          {children}
        </ScrollView>
      </Animated.View>

      <View
        style={[
          styles.footer,
          { backgroundColor: theme.footerBackgroundColor },
          footerStyle,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 12,
          },
        ]}
      >
        {continueActionPresentation === "tapHint" ? (
          <View
            style={[
              styles.tapHint,
              !canContinue && styles.continueButtonDisabled,
            ]}
          >
            <Text
              style={[
                styles.tapHintText,
                { color: theme.continueButtonTextColor },
                continueButtonTextStyle,
              ]}
            >
              {continueLabel}
            </Text>
            <Text
              accessibilityElementsHidden
              importantForAccessibility="no"
              style={[
                styles.tapHintArrow,
                { color: theme.continueButtonBackgroundColor },
              ]}
            >
              →
            </Text>
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            disabled={!canContinue}
            onPress={onContinue}
            style={[
              styles.continueButton,
              { backgroundColor: theme.continueButtonBackgroundColor },
              !canContinue && styles.continueButtonDisabled,
            ]}
          >
            <Text
              style={[
                styles.continueButtonText,
                { color: theme.continueButtonTextColor },
                continueButtonTextStyle,
              ]}
            >
              {continueLabel}
            </Text>
          </Pressable>
        )}
        {secondaryActionLabel && onSecondaryAction ? (
          <Pressable
            accessibilityRole="button"
            onPress={onSecondaryAction}
            style={styles.secondaryActionButton}
          >
            <Text
              style={[
                styles.secondaryActionText,
                { color: theme.secondaryActionTextColor },
                secondaryActionTextStyle,
              ]}
            >
              {secondaryActionLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </>
  );

  if (isFullScreenTapEnabled) {
    return (
      <Pressable
        accessibilityLabel={fullScreenTapAccessibilityLabel ?? continueLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canContinue }}
        disabled={!canContinue}
        onPress={onContinue}
        style={rootStyleValue}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={rootStyleValue}>{content}</View>;
};

interface OnboardingStepHeaderProps {
  backButtonAccessibilityLabel: string;
  backButtonBackgroundColor: string;
  backButtonDisabledIconColor: string;
  backButtonIconColor: string;
  currentStepIndex: number;
  isBackDisabled: boolean;
  progressActiveColor: string;
  progressInactiveColor: string;
  safeAreaTop: number;
  totalSteps: number;
  onBack?: () => Promise<void> | void;
}

const OnboardingStepHeader = ({
  backButtonAccessibilityLabel,
  backButtonBackgroundColor,
  backButtonDisabledIconColor,
  backButtonIconColor,
  currentStepIndex,
  isBackDisabled,
  progressActiveColor,
  progressInactiveColor,
  safeAreaTop,
  totalSteps,
  onBack,
}: OnboardingStepHeaderProps) => {
  const progressTransition = useRef(
    new Animated.Value(getProgressRatio(currentStepIndex, totalSteps)),
  ).current;

  useEffect(() => {
    const animation = Animated.timing(progressTransition, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
      toValue: getProgressRatio(currentStepIndex, totalSteps),
      useNativeDriver: false,
    });

    animation.start();
    return () => animation.stop();
  }, [currentStepIndex, progressTransition, totalSteps]);

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: Math.max(safeAreaTop, 12) + 12,
        },
      ]}
    >
      <Pressable
        accessibilityLabel={backButtonAccessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled: isBackDisabled }}
        disabled={isBackDisabled}
        onPress={onBack}
        style={[
          styles.backButton,
          { backgroundColor: backButtonBackgroundColor },
          isBackDisabled && styles.backButtonDisabled,
        ]}
      >
        <ChevronLeftIcon
          color={
            isBackDisabled
              ? backButtonDisabledIconColor
              : backButtonIconColor
          }
          opacity={isBackDisabled ? 0.46 : 1}
        />
      </Pressable>
      <View
        style={[
          styles.progressTrack,
          { backgroundColor: progressInactiveColor },
        ]}
      >
        <Animated.View
          style={[
            styles.progressFill,
            {
              backgroundColor: progressActiveColor,
              width: progressTransition.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

interface ChevronLeftIconProps {
  color: string;
  opacity?: number;
}

const ChevronLeftIcon = ({ color, opacity = 1 }: ChevronLeftIconProps) => {
  return (
    <View style={[styles.chevronLeftIcon, { opacity }]}>
      <View
        style={[
          styles.chevronLeftLine,
          styles.chevronLeftLineFirst,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          styles.chevronLeftLine,
          styles.chevronLeftLineSecond,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  backButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  backButtonDisabled: {
    opacity: 0.48,
  },
  chevronLeftIcon: {
    alignItems: "center",
    height: 14,
    justifyContent: "center",
    width: 14,
  },
  chevronLeftLine: {
    borderRadius: 1,
    height: 2,
    position: "absolute",
    width: 9,
  },
  chevronLeftLineFirst: {
    top: 3.5,
    transform: [{ rotate: "-45deg" }],
  },
  chevronLeftLineSecond: {
    bottom: 3.5,
    transform: [{ rotate: "45deg" }],
  },
  progressTrack: {
    borderRadius: 999,
    flex: 1,
    height: 4,
    overflow: "hidden",
  },
  progressFill: {
    borderRadius: 999,
    height: "100%",
  },
  body: {
    flex: 1,
  },
  stepIntro: {
    gap: 10,
    paddingHorizontal: 24,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 34,
    textAlign: "left",
  },
  stepDescription: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
    textAlign: "left",
  },
  bodyScroll: {
    flex: 1,
  },
  bodyContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 22,
  },
  footer: {
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  continueButton: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 58,
    paddingHorizontal: 18,
  },
  continueButtonDisabled: {
    opacity: 0.36,
  },
  continueButtonText: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 23,
    textAlign: "center",
  },
  tapHint: {
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: 8,
    minHeight: 36,
  },
  tapHintText: {
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    textAlign: "right",
  },
  tapHintArrow: {
    fontSize: 25,
    fontWeight: "400",
    lineHeight: 29,
  },
  secondaryActionButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 36,
    paddingHorizontal: 18,
  },
  secondaryActionText: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 21,
    textAlign: "center",
  },
});
