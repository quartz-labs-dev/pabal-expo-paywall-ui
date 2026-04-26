import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PaywallBenefit, PaywallTheme } from "./types";

interface PaywallBenefitListProps {
  benefits: PaywallBenefit[];
  content?: ReactNode;
  theme: PaywallTheme;
  title?: string;
  variant?: "plain" | "contained";
  size?: "regular" | "large";
}

const getBenefitTitle = (benefit: PaywallBenefit): string => {
  return typeof benefit === "string" ? benefit : benefit.title;
};

const getBenefitDescription = (benefit: PaywallBenefit): string | undefined => {
  return typeof benefit === "string" ? undefined : benefit.description;
};

const getBenefitIcon = (benefit: PaywallBenefit) => {
  return typeof benefit === "string" ? undefined : benefit.icon;
};

const getBenefitOnClick = (benefit: PaywallBenefit) => {
  return typeof benefit === "string" ? undefined : benefit.onClick;
};

export const PaywallBenefitList = ({
  benefits,
  content,
  theme,
  title,
  variant = "plain",
  size = "regular",
}: PaywallBenefitListProps) => {
  const isContained = variant === "contained";
  const isLarge = size === "large";
  const shouldShowBenefits = benefits.length > 0;

  if (!shouldShowBenefits && !content) return null;

  return (
    <View style={[styles.section, !title && styles.untitledSection]}>
      {title && shouldShowBenefits && (
        <Text style={[styles.sectionTitle, { color: theme.primaryTextColor }]}>
          {title}
        </Text>
      )}
      {shouldShowBenefits && (
        <View style={styles.list}>
          {benefits.map((benefit, index) => {
            const benefitTitle = getBenefitTitle(benefit);
            const description = getBenefitDescription(benefit);
            const icon = getBenefitIcon(benefit);
            const onClick = getBenefitOnClick(benefit);
            const rowContent = (
              <>
                <View
                  style={[
                    styles.mark,
                    isContained ? styles.containedMark : styles.plainMark,
                    isLarge && !isContained && styles.largePlainMark,
                    isContained && {
                      backgroundColor: theme.selectedSurfaceColor,
                    },
                  ]}
                >
                  {icon ? (
                    <View style={isLarge ? styles.largeIconContent : undefined}>
                      {icon}
                    </View>
                  ) : (
                    <Text
                      style={[
                        styles.markText,
                        isContained
                          ? styles.containedMarkText
                          : styles.plainMarkText,
                        isLarge && styles.largeMarkText,
                        { color: theme.accentColor },
                      ]}
                    >
                      +
                    </Text>
                  )}
                </View>
                <View style={styles.copy}>
                  <Text
                    style={[
                      styles.title,
                      isContained ? styles.containedTitle : styles.plainTitle,
                      isLarge && styles.largeTitle,
                      onClick && styles.clickableTitle,
                      { color: theme.primaryTextColor },
                    ]}
                  >
                    {benefitTitle}
                  </Text>
                  {description && (
                    <Text
                      style={[
                        styles.description,
                        { color: theme.secondaryTextColor },
                      ]}
                    >
                      {description}
                    </Text>
                  )}
                </View>
              </>
            );

            if (onClick) {
              return (
                <Pressable
                  key={`${benefitTitle}-${index}`}
                  accessibilityRole="button"
                  onPress={(event) => {
                    event.stopPropagation();
                    void onClick();
                  }}
                  style={({ pressed }) => [
                    styles.row,
                    pressed && styles.pressedRow,
                  ]}
                >
                  {rowContent}
                </Pressable>
              );
            }

            return (
              <View key={`${benefitTitle}-${index}`} style={styles.row}>
                {rowContent}
              </View>
            );
          })}
        </View>
      )}
      {content && <View style={styles.content}>{content}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  untitledSection: {
    paddingVertical: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  list: {
    gap: 12,
  },
  content: {
    width: "100%",
  },
  row: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  pressedRow: {
    opacity: 0.72,
  },
  mark: {
    alignItems: "center",
    justifyContent: "center",
  },
  plainMark: {
    minHeight: 22,
    width: 18,
  },
  containedMark: {
    borderRadius: 8,
    height: 24,
    width: 24,
  },
  largePlainMark: {
    minHeight: 24,
  },
  largeIconContent: {
    transform: [{ scale: 1.12 }],
  },
  markText: {
    fontWeight: "700",
  },
  plainMarkText: {
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22,
  },
  containedMarkText: {
    fontSize: 15,
    lineHeight: 18,
  },
  largeMarkText: {
    fontSize: 18,
    lineHeight: 24,
  },
  copy: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  title: {
    flexShrink: 1,
  },
  plainTitle: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 22,
  },
  containedTitle: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  largeTitle: {
    fontSize: 17,
    lineHeight: 24,
  },
  clickableTitle: {
    textDecorationLine: "underline",
  },
  description: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
  },
});
