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

interface OnboardingFrameProps {
  background?: ReactNode;
  children: ReactNode;
  canContinue?: boolean;
  continueLabel: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  currentStepIndex: number;
  footerAccessory?: ReactNode;
  footerContentStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  continueButtonStyle?: StyleProp<ViewStyle>;
  continueButtonTextStyle?: StyleProp<TextStyle>;
  isContentTransitionEnabled?: boolean;
  isFooterTransitionEnabled?: boolean;
  isBodyScrollEnabled?: boolean;
  isBackButtonDisabled?: boolean;
  rootStyle?: StyleProp<ViewStyle>;
  secondaryActionLabel?: string;
  secondaryActionTextStyle?: StyleProp<TextStyle>;
  showBackButton?: boolean;
  showHeader?: boolean;
  theme?: OnboardingFrameTheme;
  title?: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  totalSteps: number;
  description?: ReactNode;
  descriptionStyle?: StyleProp<TextStyle>;
  onBack?: () => void;
  onContinue: () => void;
  onSecondaryAction?: () => void;
}

export interface OnboardingFrameTheme {
  backgroundColor?: string;
  backButtonBackgroundColor?: string;
  backButtonDisabledIconColor?: string;
  backButtonIconColor?: string;
  continueButtonBackgroundColor?: string;
  continueButtonTextColor?: string;
  descriptionTextColor?: string;
  footerBackgroundColor?: string;
  progressActiveColor?: string;
  progressInactiveColor?: string;
  secondaryActionTextColor?: string;
  titleTextColor?: string;
}

const DEFAULT_FRAME_THEME = {
  backgroundColor: "#F7F7F8",
  backButtonDisabledIconColor: "#C9C9CA",
  backButtonIconColor: "#050505",
  continueButtonBackgroundColor: "#E22121",
  continueButtonTextColor: "#FFFFFF",
  descriptionTextColor: "#666A70",
  footerBackgroundColor: "#F7F7F8",
  progressActiveColor: "#050505",
  progressInactiveColor: "#DDDDDE",
  secondaryActionTextColor: "#050505",
  titleTextColor: "#050505",
} satisfies Required<Omit<OnboardingFrameTheme, "backButtonBackgroundColor">>;

const INITIAL_CONTENT_TRANSITION_DELAY_MS = 90;

const getProgressRatio = (stepIndex: number, stepCount: number) => {
  const safeStepCount = Math.max(stepCount, 1);
  const safeStepIndex = Math.min(Math.max(stepIndex, 0), safeStepCount - 1);
  return (safeStepIndex + 1) / safeStepCount;
};

export const OnboardingFrame = ({
  background,
  children,
  canContinue = true,
  continueLabel,
  contentContainerStyle,
  currentStepIndex,
  footerAccessory,
  footerContentStyle,
  footerStyle,
  continueButtonStyle,
  continueButtonTextStyle,
  isContentTransitionEnabled = true,
  isFooterTransitionEnabled = false,
  isBodyScrollEnabled = true,
  isBackButtonDisabled = false,
  rootStyle,
  secondaryActionLabel,
  secondaryActionTextStyle,
  showHeader = true,
  theme: themeOverride,
  title,
  titleStyle,
  totalSteps,
  description,
  descriptionStyle,
  onBack,
  onContinue,
  onSecondaryAction,
  showBackButton = Boolean(onBack),
}: OnboardingFrameProps) => {
  const insets = useSafeAreaInsets();
  const theme = {
    ...DEFAULT_FRAME_THEME,
    ...themeOverride,
    backButtonBackgroundColor:
      themeOverride?.backButtonBackgroundColor ??
      themeOverride?.progressInactiveColor ??
      DEFAULT_FRAME_THEME.progressInactiveColor,
  };
  const isBackDisabled = isBackButtonDisabled || !showBackButton || !onBack;
  const previousStepIndexRef = useRef<number | null>(null);
  const contentDirection =
    previousStepIndexRef.current !== null &&
    currentStepIndex < previousStepIndexRef.current
      ? -1
      : 1;
  const contentTransition = useRef(
    new Animated.Value(isContentTransitionEnabled ? 0 : 1),
  ).current;
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

  useEffect(() => {
    const previousStepIndex = previousStepIndexRef.current;
    if (previousStepIndex === currentStepIndex) return;

    previousStepIndexRef.current = currentStepIndex;

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
  }, [contentTransition, currentStepIndex, isContentTransitionEnabled]);

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

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.backgroundColor },
        rootStyle,
      ]}
    >
      {background && <View style={styles.background}>{background}</View>}
      {showHeader && (
        <View
          style={[
            styles.header,
            {
              paddingTop: Math.max(insets.top, 12) + 12,
            },
          ]}
        >
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            accessibilityState={{ disabled: isBackDisabled }}
            disabled={isBackDisabled}
            onPress={onBack}
            style={[
              styles.backButton,
              { backgroundColor: theme.backButtonBackgroundColor },
              isBackDisabled && styles.backButtonDisabled,
            ]}
          >
            <ChevronLeftIcon
              color={
                isBackDisabled
                  ? theme.backButtonDisabledIconColor
                  : theme.backButtonIconColor
              }
              opacity={isBackDisabled ? 0.46 : 1}
            />
          </Pressable>
          <View
            style={[
              styles.progressTrack,
              { backgroundColor: theme.progressInactiveColor },
            ]}
          >
            <Animated.View
              style={[
                styles.progressFill,
                {
                  backgroundColor: theme.progressActiveColor,
                  width: progressTransition.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        </View>
      )}

      <Animated.View style={[styles.body, animatedBodyStyle]}>
        {(title || description) && (
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
                  descriptionStyle,
                ]}
              >
                {description}
              </Text>
            ) : (
              description
            )}
          </View>
        )}
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
        <Animated.View
          style={[
            styles.footerContent,
            isFooterTransitionEnabled && animatedBodyStyle,
            footerContentStyle,
          ]}
        >
          <Pressable
            accessibilityRole="button"
            disabled={!canContinue}
            onPress={onContinue}
            style={[
              styles.continueButton,
              { backgroundColor: theme.continueButtonBackgroundColor },
              continueButtonStyle,
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
          {footerAccessory}
        </Animated.View>
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
  background: {
    ...StyleSheet.absoluteFillObject,
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
    flex: 1,
    borderRadius: 999,
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
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  footerContent: {
    gap: 12,
  },
  continueButton: {
    alignItems: "center",
    borderRadius: 8,
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
