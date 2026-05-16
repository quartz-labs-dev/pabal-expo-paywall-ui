import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PaywallTheme, ProfileBenefitUsageSection } from "./types";

interface ProfileBenefitUsageListProps {
  section: ProfileBenefitUsageSection;
  theme: PaywallTheme;
  title?: string;
}

export const ProfileBenefitUsageList = ({
  section,
  theme,
  title,
}: ProfileBenefitUsageListProps) => {
  if (section.items.length === 0) return null;

  return (
    <View style={styles.section}>
      {title && (
        <Text style={[styles.title, { color: theme.primaryTextColor }]}>
          {title}
        </Text>
      )}

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <View style={styles.featureHeader} />
          <View style={styles.valueHeader}>
            <Text
              style={[styles.headerText, { color: theme.secondaryTextColor }]}
            >
              {section.usageColumnTitle}
            </Text>
          </View>
          <View style={styles.valueHeader}>
            <Text style={[styles.headerText, { color: theme.accentColor }]}>
              {section.proLimitColumnTitle}
            </Text>
          </View>
        </View>

        {section.items.map((item) => {
          const featureTitle = item.titleContent ?? (
            <Text
              style={[
                styles.featureTitle,
                item.onPress && styles.clickableFeatureTitle,
                { color: theme.primaryTextColor },
              ]}
            >
              {item.title}
            </Text>
          );

          return (
            <View key={item.id} style={styles.row}>
              {item.onPress ? (
                <Pressable
                  accessibilityLabel={item.title}
                  accessibilityRole="button"
                  onPress={() => {
                    void item.onPress?.();
                  }}
                  style={({ pressed }) => [
                    styles.featureCell,
                    pressed && styles.pressedFeatureCell,
                  ]}
                >
                  {featureTitle}
                </Pressable>
              ) : (
                <View style={styles.featureCell}>{featureTitle}</View>
              )}
              <View style={styles.valueCell}>
                <Text
                  style={[styles.valueText, { color: theme.secondaryTextColor }]}
                >
                  {item.usageText}
                </Text>
              </View>
              <View style={styles.valueCell}>
                <Text style={[styles.valueText, { color: theme.accentColor }]}>
                  {item.proLimitText}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  table: {
    width: "100%",
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 30,
  },
  featureHeader: {
    flex: 1,
    minWidth: 0,
  },
  valueHeader: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 30,
    width: 72,
  },
  headerText: {
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 15,
    textAlign: "center",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 42,
  },
  featureCell: {
    flex: 1,
    justifyContent: "center",
    minHeight: 42,
    minWidth: 0,
    paddingRight: 8,
  },
  pressedFeatureCell: {
    opacity: 0.72,
  },
  featureTitle: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    minWidth: 0,
  },
  clickableFeatureTitle: {
    textDecorationLine: "underline",
  },
  valueCell: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    paddingHorizontal: 4,
    width: 72,
  },
  valueText: {
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15,
    textAlign: "center",
  },
});
