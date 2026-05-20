import { type ReactNode, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { getDefaultOnboardingCopy } from "pabal-expo-paywall-ui";
import { StyleSheet, Text, View } from "react-native";

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
  content: ReactNode;
  description?: string;
  isBackButtonDisabled?: boolean;
  title: string;
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

export const OnboardingPlaygroundScreen = ({
  selectedLocale,
  theme: themeOverride,
  onClose,
  onNotNowPress,
}: OnboardingPlaygroundScreenProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const localizedCopy = getDefaultOnboardingCopy(selectedLocale);
  const continueLabel = localizedCopy.continueButton ?? "Continue";
  const theme = { ...DEFAULT_ONBOARDING_THEME, ...themeOverride };
  const frameTheme: OnboardingFrameTheme = {
    backgroundColor: theme.backgroundColor,
    backButtonBackgroundColor: theme.progressInactiveColor,
    backButtonDisabledIconColor: theme.secondaryTextColor,
    backButtonIconColor: theme.primaryTextColor,
    continueButtonBackgroundColor: theme.buttonBackgroundColor,
    continueButtonTextColor: theme.buttonTextColor,
    descriptionTextColor: theme.secondaryTextColor,
    footerBackgroundColor: theme.backgroundColor,
    progressActiveColor: theme.progressActiveColor,
    progressInactiveColor: theme.progressInactiveColor,
    secondaryActionTextColor: theme.primaryTextColor,
    titleTextColor: theme.primaryTextColor,
  };

  const slides = useMemo<PlaygroundSlide[]>(
    () => [
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
      {
        title: "Where did you hear about us?",
        content: (
          <View style={styles.centerStack}>
            <Text style={[styles.kicker, { color: theme.accentColor }]}>
              Reusable pattern later
            </Text>
            <View style={styles.sourceList}>
              {["Instagram", "TikTok", "YouTube", "Friend", "Search"].map(
                (source) => (
                  <View
                    key={source}
                    style={[
                      styles.sourceRow,
                      { backgroundColor: theme.cardBackgroundColor },
                    ]}
                  >
                    <View
                      style={[
                        styles.sourceDot,
                        { backgroundColor: theme.deviceForegroundColor },
                      ]}
                    />
                    <Text
                      style={[
                        styles.sourceText,
                        { color: theme.primaryTextColor },
                      ]}
                    >
                      {source}
                    </Text>
                  </View>
                ),
              )}
            </View>
          </View>
        ),
      },
    ],
    [theme],
  );

  const currentSlide = slides[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === slides.length - 1;

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
      <StatusBar style="dark" />
      <OnboardingFrame
        continueLabel={continueLabel}
        currentStepIndex={currentStepIndex}
        isBackButtonDisabled={currentSlide.isBackButtonDisabled}
        secondaryActionLabel={onNotNowPress ? localizedCopy.notNowButton : undefined}
        showBackButton
        theme={frameTheme}
        title={currentSlide.title}
        totalSteps={slides.length}
        description={currentSlide.description}
        onBack={goBack}
        onContinue={goNext}
        onSecondaryAction={onNotNowPress}
      >
        {currentSlide.content}
      </OnboardingFrame>
    </>
  );
};

const styles = StyleSheet.create({
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
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  sourceList: {
    gap: 10,
    maxWidth: 360,
    width: "100%",
  },
  sourceRow: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    gap: 14,
    minHeight: 62,
    paddingHorizontal: 16,
  },
  sourceDot: {
    borderRadius: 8,
    height: 16,
    width: 16,
  },
  sourceText: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "700",
  },
});
