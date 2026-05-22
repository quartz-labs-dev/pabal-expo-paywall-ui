import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  type KeyboardEvent,
  type LayoutChangeEvent,
  Platform,
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

import { getDefaultOnboardingCopy } from "../locales/onboarding";
import { getColorWithAlpha } from "../shared/color-utils";
import {
  resolveOnboardingFrameTheme,
  type OnboardingFrameTheme,
} from "./onboarding-frame-theme";
import { getOnboardingFooterBottomPadding } from "./onboarding-layout";
import type { OnboardingFrameTone } from "./types";

export interface OnboardingStepFrameProps {
  children: ReactNode;
  canContinue?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  contentTransitionIndex?: number;
  contentVerticalAlignment?: "center" | "input";
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
  keyboardVerticalOffset?: number;
  locale?: string;
  rootStyle?: StyleProp<ViewStyle>;
  showBackButton?: boolean;
  showSecondaryAction?: boolean;
  showHeader?: boolean;
  theme?: OnboardingFrameTheme;
  title?: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  tone?: OnboardingFrameTone;
  totalSteps: number;
  onBack?: () => Promise<void> | void;
  onContinue: () => Promise<void> | void;
  onSecondaryAction?: () => void;
}

const INITIAL_CONTENT_TRANSITION_DELAY_MS = 90;

const IOS_KEYBOARD_AVOIDING_BEHAVIOR = "padding";

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
  contentVerticalAlignment = "center",
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
  isContentTransitionEnabled = false,
  isFullScreenTapEnabled = false,
  keyboardVerticalOffset = 0,
  locale,
  rootStyle,
  showBackButton,
  showSecondaryAction = false,
  showHeader = true,
  theme: themeOverride,
  title,
  titleStyle,
  tone = "normal",
  totalSteps,
  onBack,
  onContinue,
  onSecondaryAction,
}: OnboardingStepFrameProps) => {
  const insets = useSafeAreaInsets();
  const theme = resolveOnboardingFrameTheme(themeOverride);
  const isInvertedTone = tone === "inverted";
  const frameBackgroundColor = isInvertedTone
    ? theme.titleTextColor
    : theme.backgroundColor;
  const frameForegroundColor = isInvertedTone
    ? theme.backgroundColor
    : theme.titleTextColor;
  const frameMutedForegroundColor = getColorWithAlpha(
    frameForegroundColor,
    0.68,
    theme.descriptionTextColor,
  );
  const frameSubtleForegroundColor = getColorWithAlpha(
    frameForegroundColor,
    0.22,
    theme.progressInactiveColor,
  );
  const frameControlBackgroundColor = getColorWithAlpha(
    frameForegroundColor,
    0.14,
    theme.backButtonBackgroundColor,
  );
  const frameDescriptionColor = isInvertedTone
    ? frameMutedForegroundColor
    : theme.descriptionTextColor;
  const footerBackgroundColor = isInvertedTone
    ? frameBackgroundColor
    : theme.footerBackgroundColor;
  const secondaryActionTextColor = isInvertedTone
    ? frameForegroundColor
    : theme.secondaryActionTextColor;
  const progressActiveColor = isInvertedTone
    ? frameForegroundColor
    : theme.progressActiveColor;
  const progressInactiveColor = isInvertedTone
    ? frameSubtleForegroundColor
    : theme.progressInactiveColor;
  const backButtonBackgroundColor = isInvertedTone
    ? frameControlBackgroundColor
    : theme.backButtonBackgroundColor;
  const backButtonIconColor = isInvertedTone
    ? frameForegroundColor
    : theme.backButtonIconColor;
  const backButtonDisabledIconColor = isInvertedTone
    ? frameForegroundColor
    : theme.backButtonDisabledIconColor;
  const copy = getDefaultOnboardingCopy(locale);
  const shouldShowSecondaryAction =
    showSecondaryAction && Boolean(onSecondaryAction);
  const shouldShowBackButton = showBackButton ?? Boolean(onBack);
  const isBackDisabled = isBackButtonDisabled || !shouldShowBackButton || !onBack;
  const effectiveContentTransitionIndex =
    contentTransitionIndex ?? currentStepIndex;
  const previousStepIndexRef = useRef<number | null>(null);
  const [androidFrameHeight, setAndroidFrameHeight] = useState(0);
  const [androidFooterKeyboardOffset, setAndroidFooterKeyboardOffset] =
    useState(0);
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
      }
    : undefined;

  const rootStyleValue: StyleProp<ViewStyle> = [
    styles.root,
    { backgroundColor: frameBackgroundColor },
    rootStyle,
  ];
  const isInputContentLayout = contentVerticalAlignment === "input";
  const shouldAvoidAndroidFooterKeyboard = isInputContentLayout;
  const androidFooterKeyboardStyle: StyleProp<ViewStyle> =
    shouldAvoidAndroidFooterKeyboard && androidFooterKeyboardOffset > 0
      ? { transform: [{ translateY: -androidFooterKeyboardOffset }] }
      : undefined;

  useEffect(() => {
    if (Platform.OS !== "android" || !shouldAvoidAndroidFooterKeyboard) {
      setAndroidFooterKeyboardOffset(0);
      return;
    }

    const handleKeyboardShow = (event: KeyboardEvent) => {
      const keyboardTop = event.endCoordinates.screenY;
      const overlapFromFrame =
        androidFrameHeight > 0 ? androidFrameHeight - keyboardTop : 0;
      const overlap =
        overlapFromFrame > 0 ? overlapFromFrame : event.endCoordinates.height;

      setAndroidFooterKeyboardOffset(
        Math.max(overlap - keyboardVerticalOffset, 0),
      );
    };

    const keyboardShowSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow,
    );
    const keyboardHideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setAndroidFooterKeyboardOffset(0);
      },
    );

    return () => {
      keyboardShowSubscription.remove();
      keyboardHideSubscription.remove();
      setAndroidFooterKeyboardOffset(0);
    };
  }, [
    androidFrameHeight,
    keyboardVerticalOffset,
    shouldAvoidAndroidFooterKeyboard,
  ]);

  const handleAndroidRootLayout = (event: LayoutChangeEvent) => {
    if (Platform.OS !== "android") return;
    setAndroidFrameHeight(event.nativeEvent.layout.height);
  };

  const mainContent = (
    <>
      {showHeader && (
        <OnboardingStepHeader
          backButtonAccessibilityLabel={backButtonAccessibilityLabel}
          backButtonBackgroundColor={backButtonBackgroundColor}
          backButtonDisabledIconColor={backButtonDisabledIconColor}
          backButtonIconColor={backButtonIconColor}
          currentStepIndex={currentStepIndex}
          isBackDisabled={isBackDisabled}
          progressActiveColor={progressActiveColor}
          progressInactiveColor={progressInactiveColor}
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
                  { color: frameForegroundColor },
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
                  { color: frameDescriptionColor },
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
            isInputContentLayout && styles.bodyContentInput,
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
    </>
  );

  const footer = (
    <View
      style={[
        styles.footer,
        { backgroundColor: footerBackgroundColor },
        footerStyle,
        {
          paddingBottom: getOnboardingFooterBottomPadding(insets.bottom, {
            isCompactSpacingEnabled: isInputContentLayout,
          }),
        },
      ]}
    >
      <View style={styles.footerContent}>
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
                { color: theme.continueButtonTextColor },
                continueButtonTextStyle,
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
        {shouldShowSecondaryAction ? (
          <Pressable
            accessibilityRole="button"
            onPress={onSecondaryAction}
            style={styles.secondaryActionButton}
          >
            <Text
              style={[
                styles.secondaryActionText,
                { color: secondaryActionTextColor },
              ]}
            >
              {copy.notNowButton}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  const content = (
    <>
      {mainContent}
      {footer}
    </>
  );

  const androidContent = (
    <>
      {mainContent}
      {shouldAvoidAndroidFooterKeyboard ? (
        <View style={androidFooterKeyboardStyle}>
          {footer}
        </View>
      ) : (
        footer
      )}
    </>
  );

  if (Platform.OS === "android") {
    return (
      <View onLayout={handleAndroidRootLayout} style={rootStyleValue}>
        {isFullScreenTapEnabled ? (
          <Pressable
            accessibilityLabel={fullScreenTapAccessibilityLabel ?? continueLabel}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canContinue }}
            disabled={!canContinue}
            onPress={onContinue}
            style={styles.root}
          >
            {androidContent}
          </Pressable>
        ) : (
          androidContent
        )}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={IOS_KEYBOARD_AVOIDING_BEHAVIOR}
      contentContainerStyle={styles.keyboardAvoidingContent}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={rootStyleValue}
    >
      {isFullScreenTapEnabled ? (
        <Pressable
          accessibilityLabel={fullScreenTapAccessibilityLabel ?? continueLabel}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canContinue }}
          disabled={!canContinue}
          onPress={onContinue}
          style={styles.root}
        >
          {content}
        </Pressable>
      ) : (
        content
      )}
    </KeyboardAvoidingView>
  );
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
  keyboardAvoidingContent: {
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
  bodyContentInput: {
    justifyContent: "flex-start",
    paddingTop: 72,
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
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 52,
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
