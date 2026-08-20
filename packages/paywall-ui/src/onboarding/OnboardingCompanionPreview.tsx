import type { ReactNode } from "react";
import {
  Animated,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import {
  getOnboardingCompanionPreviewVisibility,
  resolveOnboardingCompanionPreviewAccentColor,
  type OnboardingCompanionPreviewVariant,
} from "./onboarding-companion-preview-layout";
import { useOnboardingPhoneFrameEntranceAnimation } from "./onboarding-animations";
import type { OnboardingContentTheme } from "./types";

export interface OnboardingCompanionPreviewProps {
  accessibilityLabel?: string;
  isAnimated?: boolean;
  phoneDateLabel?: string;
  phoneLabel?: string;
  phoneTimeLabel?: string;
  phoneWidgets?: readonly [ReactNode, ReactNode?];
  stageAccentColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  theme: OnboardingContentTheme;
  variant: OnboardingCompanionPreviewVariant;
  watchContent?: ReactNode;
  watchLabel?: string;
}

export const OnboardingCompanionPreview = ({
  accessibilityLabel,
  isAnimated = true,
  phoneDateLabel,
  phoneLabel,
  phoneTimeLabel,
  phoneWidgets,
  stageAccentColor,
  style,
  testID = "onboarding-companion-preview",
  theme,
  variant,
  watchContent,
  watchLabel,
}: OnboardingCompanionPreviewProps) => {
  const { showsPhone, showsWatch } =
    getOnboardingCompanionPreviewVisibility(variant);
  const isCombined = showsPhone && showsWatch;
  const phoneAnimatedStyle = useOnboardingPhoneFrameEntranceAnimation(
    60,
    -12,
    18,
  );
  const watchAnimatedStyle = useOnboardingPhoneFrameEntranceAnimation(
    180,
    18,
    12,
  );
  const [primaryWidget, secondaryWidget] = phoneWidgets ?? [];
  const resolvedStageAccentColor =
    resolveOnboardingCompanionPreviewAccentColor(
      stageAccentColor,
      theme.accentColor,
    );
  const accentGlow = getColorWithAlpha(
    resolvedStageAccentColor,
    0.12,
    theme.backgroundColor,
  );
  const phoneScreenGlow = getColorWithAlpha(
    resolvedStageAccentColor,
    0.14,
    "#12151A",
  );

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? "image" : undefined}
      accessible={Boolean(accessibilityLabel)}
      style={[
        styles.root,
        showsPhone ? styles.phoneStage : styles.watchStage,
        style,
      ]}
      testID={testID}
    >
      <View
        importantForAccessibility="no"
        pointerEvents="none"
        style={[
          styles.glow,
          showsPhone ? styles.phoneGlow : styles.watchGlow,
          { backgroundColor: accentGlow },
        ]}
      />

      {showsPhone ? (
        <Animated.View
          style={[
            styles.device,
            isCombined ? styles.phoneCombined : styles.phoneOnly,
            isAnimated ? phoneAnimatedStyle : null,
          ]}
          testID={`${testID}-phone`}
        >
          <View style={styles.phoneSideButtonTop} />
          <View style={styles.phoneSideButtonBottom} />
          <View style={styles.phoneFrame}>
            <View style={styles.phoneScreen}>
              <View
                pointerEvents="none"
                style={[
                  styles.phoneScreenGlow,
                  { backgroundColor: phoneScreenGlow },
                ]}
              />
              <View style={styles.dynamicIsland} />
              {phoneDateLabel ? (
                <Text style={styles.phoneDate}>{phoneDateLabel}</Text>
              ) : null}
              {phoneTimeLabel ? (
                <Text style={styles.phoneTime}>{phoneTimeLabel}</Text>
              ) : null}
              <View style={styles.phoneWidgetStack}>
                {primaryWidget ? (
                  <View style={styles.primaryWidget}>{primaryWidget}</View>
                ) : null}
                {secondaryWidget ? (
                  <View style={styles.secondaryWidget}>{secondaryWidget}</View>
                ) : null}
              </View>
              <View style={styles.homeIndicator} />
            </View>
          </View>
          {phoneLabel ? (
            <Text style={[styles.deviceLabel, { color: theme.secondaryTextColor }]}>
              {phoneLabel}
            </Text>
          ) : null}
        </Animated.View>
      ) : null}

      {showsWatch ? (
        <Animated.View
          style={[
            styles.device,
            isCombined ? styles.watchCombined : styles.watchOnly,
            isAnimated ? watchAnimatedStyle : null,
          ]}
          testID={`${testID}-watch`}
        >
          <View style={styles.watchBand} />
          <View style={styles.watchCrown} />
          <View style={styles.watchCase}>
            <View style={styles.watchScreen}>{watchContent}</View>
          </View>
          {watchLabel ? (
            <Text style={[styles.deviceLabel, { color: theme.secondaryTextColor }]}>
              {watchLabel}
            </Text>
          ) : null}
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    maxWidth: 360,
    position: "relative",
    width: "100%",
  },
  phoneStage: {
    height: 350,
  },
  watchStage: {
    height: 190,
  },
  glow: {
    position: "absolute",
  },
  phoneGlow: {
    borderRadius: 140,
    height: 280,
    width: 280,
  },
  watchGlow: {
    borderRadius: 85,
    height: 170,
    width: 170,
  },
  device: {
    alignItems: "center",
  },
  phoneCombined: {
    left: "7%",
    position: "absolute",
    top: 0,
  },
  phoneOnly: {
    position: "relative",
  },
  phoneFrame: {
    backgroundColor: "#34353A",
    borderColor: "#73747B",
    borderRadius: 36,
    borderWidth: 1,
    elevation: 6,
    height: 326,
    padding: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    width: 176,
  },
  phoneSideButtonTop: {
    backgroundColor: "#3C3D43",
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    height: 34,
    left: -3,
    position: "absolute",
    top: 58,
    width: 5,
  },
  phoneSideButtonBottom: {
    backgroundColor: "#3C3D43",
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    height: 45,
    position: "absolute",
    right: -3,
    top: 78,
    width: 5,
  },
  phoneScreen: {
    alignItems: "center",
    backgroundColor: "#12151A",
    borderRadius: 31,
    flex: 1,
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingTop: 9,
  },
  phoneScreenGlow: {
    borderRadius: 110,
    height: 220,
    position: "absolute",
    right: -90,
    top: 54,
    width: 220,
  },
  dynamicIsland: {
    backgroundColor: "#000000",
    borderRadius: 999,
    height: 14,
    marginBottom: 12,
    width: 52,
  },
  phoneDate: {
    color: "rgba(255,255,255,0.58)",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 0.8,
  },
  phoneTime: {
    color: "#FFFFFF",
    fontSize: 30,
    fontVariant: ["tabular-nums"],
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 2,
  },
  phoneWidgetStack: {
    alignItems: "center",
    flex: 1,
    gap: 8,
    justifyContent: "center",
    paddingBottom: 10,
    width: "100%",
  },
  primaryWidget: {
    alignItems: "center",
    width: "100%",
  },
  secondaryWidget: {
    alignItems: "center",
    width: "92%",
  },
  homeIndicator: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 999,
    bottom: 7,
    height: 3,
    position: "absolute",
    width: 54,
  },
  watchCombined: {
    bottom: 24,
    position: "absolute",
    right: "5%",
  },
  watchOnly: {
    position: "relative",
  },
  watchBand: {
    backgroundColor: "#252529",
    borderRadius: 24,
    height: 168,
    position: "absolute",
    top: -18,
    width: 62,
  },
  watchCrown: {
    backgroundColor: "#44444A",
    borderRadius: 4,
    height: 25,
    position: "absolute",
    right: -5,
    top: 34,
    width: 8,
  },
  watchCase: {
    backgroundColor: "#303035",
    borderColor: "#5B5B61",
    borderRadius: 34,
    borderWidth: 1,
    elevation: 8,
    height: 126,
    padding: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
    shadowRadius: 14,
    width: 108,
  },
  watchScreen: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 28,
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  deviceLabel: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1.3,
    marginTop: 8,
  },
});
