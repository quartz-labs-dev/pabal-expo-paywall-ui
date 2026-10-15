import { Pressable, StyleSheet, Text, View } from "react-native";

import { getDefaultProOnboardingCopy } from "../locales/localized-paywall-copy";
import { getColorWithAlpha } from "../shared/color-utils";
import { mergePaywallTheme } from "../shared/theme";
import type { ProOnboardingEntryCardProps } from "../types";
import { getProOnboardingProgress } from "./pro-onboarding";

/**
 * Compact Pro onboarding for a Settings or My Page list. One card: the app's
 * header, then a single progress row that names the next step with
 * `done/total` and a bar. The header opens the full guide (`onPress`); the
 * progress row opens the next step (`step.onPress`, else `onPress`). Once
 * every step is done only the header is left, or nothing without one.
 */
export const ProOnboardingEntryCard = ({
  header,
  steps,
  title,
  onPress,
  locale,
  theme: themeOverride,
}: ProOnboardingEntryCardProps) => {
  const theme = mergePaywallTheme(themeOverride);
  const { doneCount, nextStep, totalCount } = getProOnboardingProgress(steps);
  if (!header && !nextStep) return null;

  const checklistTitle =
    title ?? getDefaultProOnboardingCopy(locale).checklistTitle;
  const onPressProgress = nextStep?.onPress ?? onPress;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surfaceColor,
          borderRadius: theme.cardBorderRadius,
        },
      ]}
    >
      {header ? (
        <Pressable
          accessibilityRole={onPress ? "button" : undefined}
          disabled={!onPress}
          onPress={onPress}
          style={({ pressed }) => pressed && styles.pressed}
        >
          {header}
        </Pressable>
      ) : null}

      {nextStep ? (
        <Pressable
          // The visible row shows only the step; the checklist title is
          // still read out so the progress has context.
          accessibilityLabel={`${checklistTitle}: ${nextStep.title}, ${doneCount}/${totalCount}`}
          accessibilityRole={onPressProgress ? "button" : undefined}
          disabled={!onPressProgress}
          onPress={onPressProgress}
          style={({ pressed }) => [styles.progress, pressed && styles.pressed]}
        >
          <View style={styles.progressRow}>
            {nextStep.badge}
            <Text
              numberOfLines={1}
              style={[styles.progressTitle, { color: theme.primaryTextColor }]}
            >
              {nextStep.title}
            </Text>
            <Text style={[styles.progressCount, { color: theme.accentColor }]}>
              {`${doneCount}/${totalCount}`}
            </Text>
          </View>
          <View
            style={[
              styles.track,
              {
                backgroundColor: getColorWithAlpha(
                  theme.accentColor,
                  0.16,
                  theme.borderColor,
                ),
              },
            ]}
          >
            <View
              style={[
                styles.fill,
                {
                  backgroundColor: theme.accentColor,
                  width: `${Math.round((doneCount / totalCount) * 100)}%`,
                },
              ]}
            />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderCurve: "continuous",
    gap: 14,
    padding: 14,
  },
  progress: {
    gap: 8,
  },
  progressRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  progressTitle: {
    flex: 1,
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  progressCount: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  track: {
    borderRadius: 2,
    height: 4,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 2,
    height: 4,
  },
  pressed: {
    opacity: 0.72,
  },
});
