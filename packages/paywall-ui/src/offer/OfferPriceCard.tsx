import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PaywallPlan, PaywallTheme } from "../types";

interface OfferPriceCardProps<TPackage> {
  billingDisclosure: string;
  discountText?: string;
  originalPriceText?: string;
  plan: PaywallPlan<TPackage>;
  isSelected?: boolean;
  theme: PaywallTheme;
  onPress?: () => void;
}

export const OfferPriceCard = <TPackage,>({
  billingDisclosure,
  discountText,
  originalPriceText,
  plan,
  isSelected = true,
  theme,
  onPress,
}: OfferPriceCardProps<TPackage>) => {
  const cardStyle = [
    styles.card,
    {
      backgroundColor: isSelected
        ? theme.selectedSurfaceColor
        : theme.surfaceColor,
      borderColor: isSelected
        ? theme.selectedBorderColor
        : theme.borderColor,
      borderRadius: theme.cardBorderRadius,
    },
  ];
  const cardContent = (
    <>
      <View style={styles.headingRow}>
        {onPress ? (
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
            {isSelected ? (
              <View
                style={[
                  styles.radioDot,
                  { backgroundColor: theme.selectedBorderColor },
                ]}
              />
            ) : null}
          </View>
        ) : null}
        <Text
          style={[styles.planTitle, { color: theme.primaryTextColor }]}
        >
          {plan.title}
        </Text>
        {discountText ? (
          <View style={[styles.badge, { backgroundColor: theme.accentColor }]}>
            <Text style={[styles.badgeText, { color: theme.accentTextColor }]}>
              {discountText}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.priceRow}>
        {originalPriceText ? (
          <Text
            accessibilityLabel={originalPriceText}
            style={[styles.originalPrice, { color: theme.mutedTextColor }]}
          >
            {originalPriceText}
          </Text>
        ) : null}
        <Text style={[styles.offerPrice, { color: theme.primaryTextColor }]}>
          {plan.priceText}
        </Text>
      </View>
      <Text
        style={[styles.disclosure, { color: theme.secondaryTextColor }]}
      >
        {billingDisclosure}
      </Text>
      {isSelected && plan.selectedDescription ? (
        <Text
          style={[styles.disclosure, { color: theme.secondaryTextColor }]}
        >
          {plan.selectedDescription}
        </Text>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityLabel={[plan.title, plan.priceText, discountText]
          .filter(Boolean)
          .join(", ")}
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
        onPress={onPress}
        style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
      >
        {cardContent}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{cardContent}</View>;
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  card: {
    borderCurve: "continuous",
    borderWidth: 1.5,
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  disclosure: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
  },
  headingRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  offerPrice: {
    fontSize: 38,
    fontWeight: "700",
    letterSpacing: -0.8,
    lineHeight: 45,
  },
  originalPrice: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
    textDecorationLine: "line-through",
  },
  planTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
    lineHeight: 23,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.995 }],
  },
  priceRow: {
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "wrap",
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
});
