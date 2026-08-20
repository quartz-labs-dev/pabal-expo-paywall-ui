import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  OnboardingCompanionPreview,
  type OnboardingCompanionPreviewVariant,
  type OnboardingContentTheme,
} from "pabal-expo-paywall-ui";

interface OnboardingCompanionPreviewExampleProps {
  theme: OnboardingContentTheme;
}

interface VariantOption {
  label: string;
  value: OnboardingCompanionPreviewVariant;
}

export const OnboardingCompanionPreviewExample = ({
  theme,
}: OnboardingCompanionPreviewExampleProps) => {
  const [variant, setVariant] =
    useState<OnboardingCompanionPreviewVariant>("widget-watch");

  return (
    <View style={styles.root}>
      <View style={styles.previewShell}>
        <OnboardingCompanionPreview
          accessibilityLabel="Phone widgets and watch companion preview"
          phoneDateLabel="TUE, AUG 20"
          phoneLabel="PHONE"
          phoneTimeLabel="9:41"
          phoneWidgets={[
            <PlaygroundHomeWidget key="home" />,
            <PlaygroundLockWidget key="lock" />,
          ]}
          stageAccentColor="#7C6CF2"
          theme={theme}
          variant={variant}
          watchContent={<PlaygroundWatchWidget />}
          watchLabel="WATCH"
        />
      </View>

      <View
        accessibilityLabel="Companion preview type"
        accessibilityRole="radiogroup"
        style={[styles.selector, { backgroundColor: theme.cardBackgroundColor }]}
      >
        {VARIANT_OPTIONS.map((option) => {
          const isSelected = option.value === variant;

          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              key={option.value}
              onPress={() => setVariant(option.value)}
              style={[
                styles.selectorOption,
                isSelected && { backgroundColor: theme.accentColor },
              ]}
            >
              <Text
                style={[
                  styles.selectorLabel,
                  {
                    color: isSelected
                      ? theme.buttonTextColor
                      : theme.secondaryTextColor,
                  },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const PlaygroundHomeWidget = () => (
  <View style={styles.homeWidget}>
    <View style={styles.widgetHeaderRow}>
      <Text style={styles.widgetEyebrow}>TRAINING</Text>
      <Text style={styles.widgetEyebrow}>7 DAYS</Text>
    </View>
    <View style={styles.progressTrack}>
      <View style={styles.progressFill} />
      <View style={styles.progressMarker} />
    </View>
    <Text style={styles.widgetValue}>D+3653</Text>
  </View>
);

const PlaygroundLockWidget = () => (
  <View style={styles.lockWidget}>
    <Text style={styles.lockWidgetValue}>D+25</Text>
    <View style={styles.lockWidgetTrack}>
      <View style={styles.lockWidgetFill} />
    </View>
  </View>
);

const PlaygroundWatchWidget = () => (
  <View style={styles.watchWidget}>
    <Text style={styles.watchWidgetValue}>D+3653</Text>
    <View style={styles.watchTrack}>
      <View style={styles.watchFill} />
      <View style={styles.watchMarker} />
    </View>
    <Text style={styles.watchCaption}>7 DAY STREAK</Text>
  </View>
);

const VARIANT_OPTIONS: readonly VariantOption[] = [
  { label: "Widget", value: "widget" },
  { label: "Watch", value: "watch" },
  { label: "Both", value: "widget-watch" },
];

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  previewShell: {
    alignItems: "center",
    height: 350,
    justifyContent: "center",
    width: "100%",
  },
  selector: {
    borderRadius: 14,
    flexDirection: "row",
    gap: 4,
    padding: 4,
  },
  selectorOption: {
    borderRadius: 10,
    minWidth: 72,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectorLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  homeWidget: {
    backgroundColor: "rgba(16,16,19,0.92)",
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 9,
    borderWidth: 1,
    gap: 6,
    padding: 8,
    width: 138,
  },
  widgetHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  widgetEyebrow: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 5,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  progressTrack: {
    backgroundColor: "#34343B",
    borderRadius: 3,
    height: 8,
    overflow: "hidden",
    position: "relative",
  },
  progressFill: {
    backgroundColor: "#7C6CF2",
    height: "100%",
    width: "64%",
  },
  progressMarker: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    left: "66%",
    position: "absolute",
    width: 3,
  },
  widgetValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  lockWidget: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.11)",
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 9,
    paddingVertical: 7,
    width: 118,
  },
  lockWidgetValue: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  lockWidgetTrack: {
    backgroundColor: "#34343B",
    borderRadius: 2,
    flex: 1,
    height: 6,
    overflow: "hidden",
  },
  lockWidgetFill: {
    backgroundColor: "#7C6CF2",
    height: "100%",
    width: "72%",
  },
  watchWidget: {
    alignItems: "center",
    gap: 8,
  },
  watchWidgetValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  watchTrack: {
    backgroundColor: "#303039",
    borderRadius: 3,
    height: 7,
    overflow: "hidden",
    position: "relative",
    width: 58,
  },
  watchFill: {
    backgroundColor: "#7C6CF2",
    height: "100%",
    width: "68%",
  },
  watchMarker: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    left: "70%",
    position: "absolute",
    width: 3,
  },
  watchCaption: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 6,
    fontWeight: "600",
    letterSpacing: 0.7,
  },
});
