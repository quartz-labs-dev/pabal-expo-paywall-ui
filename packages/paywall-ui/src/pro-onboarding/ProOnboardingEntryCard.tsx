import { Pressable, StyleSheet, Text, View } from "react-native";

import { getDefaultProOnboardingCopy } from "../locales/localized-paywall-copy";
import { getColorWithAlpha } from "../shared/color-utils";
import { CheckCircleIcon, ChevronLeftIcon } from "../shared/icons";
import { mergePaywallTheme } from "../shared/theme";
import type { ProOnboardingEntryCardProps } from "../types";
import { getProOnboardingProgress } from "./pro-onboarding";

/**
 * Compact Pro onboarding for a Settings or My Page list. One card: the app's
 * header, progress and the next step. The header and progress open the full
 * guide (`onPress`); the step row opens the step (`step.onPress`). Once every
 * step is done only the header is left, or nothing without one.
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

  const progressTitle = title ?? getDefaultProOnboardingCopy(locale).checklistTitle;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surfaceColor,
          borderRadius: theme.cardBorderRadius,
          paddingBottom: nextStep ? 4 : 14,
        },
      ]}
    >
      <Pressable
        accessibilityRole={onPress ? "button" : undefined}
        disabled={!onPress}
        onPress={onPress}
        style={({ pressed }) => [styles.top, pressed && styles.pressed]}
      >
        {header}
        {nextStep ? (
          <View style={styles.progress}>
            <View style={styles.progressRow}>
              <Text
                numberOfLines={1}
                style={[styles.progressTitle, { color: theme.primaryTextColor }]}
              >
                {progressTitle}
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
          </View>
        ) : null}
      </Pressable>

      {nextStep ? (
        <Pressable
          accessibilityRole={nextStep.onPress ? "button" : undefined}
          disabled={!nextStep.onPress}
          onPress={nextStep.onPress}
          style={({ pressed }) => [styles.stepRow, pressed && styles.pressed]}
        >
          <CheckCircleIcon
            checkColor={theme.accentTextColor}
            color={theme.accentColor}
            isChecked={false}
          />
          <View style={styles.stepTexts}>
            {nextStep.badge}
            <Text
              numberOfLines={2}
              style={[styles.stepTitle, { color: theme.primaryTextColor }]}
            >
              {nextStep.title}
            </Text>
          </View>
          {nextStep.onPress ? (
            <View style={styles.chevron}>
              <ChevronLeftIcon color={theme.mutedTextColor} />
            </View>
          ) : null}
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderCurve: "continuous",
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  top: {
    gap: 14,
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
  stepRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    minHeight: 44,
    paddingVertical: 6,
  },
  stepTexts: {
    alignItems: "flex-start",
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  stepTitle: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19,
  },
  chevron: {
    transform: [{ rotate: "180deg" }],
  },
  pressed: {
    opacity: 0.72,
  },
});
