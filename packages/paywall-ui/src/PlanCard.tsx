import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PaywallPlan, PaywallTheme } from "./types";

interface PlanCardProps<TPackage> {
  plan: PaywallPlan<TPackage>;
  isSelected: boolean;
  theme: PaywallTheme;
  onPress: () => void;
}

export const PlanCard = <TPackage,>({
  plan,
  isSelected,
  theme,
  onPress,
}: PlanCardProps<TPackage>) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isSelected
            ? theme.selectedSurfaceColor
            : theme.surfaceColor,
          borderColor: isSelected
            ? theme.selectedBorderColor
            : theme.borderColor,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View
            style={[
              styles.radio,
              {
                borderColor: isSelected
                  ? theme.selectedBorderColor
                  : theme.mutedTextColor,
              },
            ]}
          >
            {isSelected && (
              <View
                style={[
                  styles.radioDot,
                  { backgroundColor: theme.selectedBorderColor },
                ]}
              />
            )}
          </View>
          <Text style={[styles.title, { color: theme.primaryTextColor }]}>
            {plan.title}
          </Text>
        </View>

        {plan.badgeText && (
          <View style={[styles.badge, { backgroundColor: theme.accentColor }]}>
            <Text style={[styles.badgeText, { color: theme.accentTextColor }]}>
              {plan.badgeText}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.priceRow}>
        <Text style={[styles.price, { color: theme.primaryTextColor }]}>
          {plan.priceText}
        </Text>
        {plan.monthlyPriceText && (
          <Text style={[styles.monthlyPrice, { color: theme.secondaryTextColor }]}>
            {plan.monthlyPriceText} / mo
          </Text>
        )}
      </View>

      {plan.description && (
        <Text style={[styles.description, { color: theme.secondaryTextColor }]}>
          {plan.description}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    gap: 10,
  },
  radio: {
    alignItems: "center",
    borderRadius: 9,
    borderWidth: 2,
    height: 18,
    justifyContent: "center",
    width: 18,
  },
  radioDot: {
    borderRadius: 5,
    height: 8,
    width: 8,
  },
  title: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "800",
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
  priceRow: {
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "900",
  },
  monthlyPrice: {
    fontSize: 13,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
});
