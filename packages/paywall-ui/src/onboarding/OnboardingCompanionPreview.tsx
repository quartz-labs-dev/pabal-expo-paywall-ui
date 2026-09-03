import type { ReactNode } from "react";
import {
  Animated,
  Image,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import type { OnboardingHealthSyncMockPlatform } from "./health-sync-mock-palette";
import {
  COMPANION_WATCH_BADGE_SIZE,
  getOnboardingCompanionPreviewVisibility,
  resolveOnboardingCompanionPreviewAccentColor,
  resolveOnboardingCompanionWatchBadgePalette,
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
  // Soft accent circle behind the devices. Pass false to drop it when the
  // step already sits on a busy background.
  showsStageGlow?: boolean;
  stageAccentColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  theme: OnboardingContentTheme;
  variant: OnboardingCompanionPreviewVariant;
  // Custom content for the app-icon tile floating above the watch. Wins
  // over `watchHealthPlatform` when both are given.
  watchBadge?: ReactNode;
  // Caption under the badge tile, e.g. "HEALTH". App-owned like the
  // device labels.
  watchBadgeLabel?: string;
  watchContent?: ReactNode;
  // Floats the bundled Apple Health / Health Connect logo above the watch
  // so a health-sync step can reuse the same device stage.
  watchHealthPlatform?: OnboardingHealthSyncMockPlatform;
  watchLabel?: string;
}

export const OnboardingCompanionPreview = ({
  accessibilityLabel,
  isAnimated = true,
  phoneDateLabel,
  phoneLabel,
  phoneTimeLabel,
  phoneWidgets,
  showsStageGlow = true,
  stageAccentColor,
  style,
  testID = "onboarding-companion-preview",
  theme,
  variant,
  watchBadge,
  watchBadgeLabel,
  watchContent,
  watchHealthPlatform,
  watchLabel,
}: OnboardingCompanionPreviewProps) => {
  const { showsPhone, showsWatch, showsWatchBadge, showsStageGlow: showsGlow } =
    getOnboardingCompanionPreviewVisibility(variant, {
      hasWatchBadge: watchBadge !== undefined && watchBadge !== null,
      showsStageGlow,
      watchHealthPlatform,
    });
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
  // Lands after the watch so it reads as something arriving on the watch,
  // not as part of the watch itself.
  const watchBadgeAnimatedStyle = useOnboardingPhoneFrameEntranceAnimation(
    420,
    0,
    10,
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
  const watchBadgePalette = resolveOnboardingCompanionWatchBadgePalette(
    watchHealthPlatform,
    theme.cardBackgroundColor,
  );

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? "image" : undefined}
      accessible={Boolean(accessibilityLabel)}
      style={[
        styles.root,
        showsPhone ? styles.phoneStage : styles.watchStage,
        !showsPhone && showsWatchBadge ? styles.watchStageWithBadge : null,
        style,
      ]}
      testID={testID}
    >
      {showsGlow ? (
        <View
          importantForAccessibility="no"
          pointerEvents="none"
          style={[
            styles.glow,
            showsPhone ? styles.phoneGlow : styles.watchGlow,
            { backgroundColor: accentGlow },
          ]}
          testID={`${testID}-glow`}
        />
      ) : null}

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
          {showsWatchBadge ? (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.watchBadgeSlot,
                isCombined
                  ? styles.watchBadgeSlotCombined
                  : styles.watchBadgeSlotStandalone,
                isAnimated ? watchBadgeAnimatedStyle : null,
              ]}
              testID={`${testID}-watch-badge`}
            >
              <View
                style={[
                  styles.watchBadge,
                  {
                    backgroundColor: watchBadgePalette.backgroundColor,
                    borderRadius: watchBadgePalette.borderRadius,
                  },
                ]}
              >
                {watchBadge ?? (
                  <Image
                    resizeMode="contain"
                    source={
                      watchHealthPlatform === "health-connect"
                        ? require("../assets/health/health-connect.png")
                        : require("../assets/health/apple-health.png")
                    }
                    style={styles.watchBadgeImage}
                  />
                )}
              </View>
              {watchBadgeLabel ? (
                <Text
                  style={[
                    styles.deviceLabel,
                    { color: theme.secondaryTextColor },
                  ]}
                >
                  {watchBadgeLabel}
                </Text>
              ) : null}
            </Animated.View>
          ) : null}
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
  // Makes room for the badge above the watch when there is no phone.
  watchStageWithBadge: {
    height: 290,
    paddingTop: 100,
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
  watchBadgeSlot: {
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    zIndex: 2,
  },
  // Sits in the empty stage area above the watch band, clear of the phone.
  watchBadgeSlotCombined: {
    top: -118,
  },
  watchBadgeSlotStandalone: {
    top: -100,
  },
  watchBadge: {
    alignItems: "center",
    elevation: 8,
    height: COMPANION_WATCH_BADGE_SIZE,
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    width: COMPANION_WATCH_BADGE_SIZE,
  },
  watchBadgeImage: {
    height: COMPANION_WATCH_BADGE_SIZE,
    width: COMPANION_WATCH_BADGE_SIZE,
  },
  deviceLabel: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1.3,
    marginTop: 8,
  },
});
