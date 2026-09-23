import { StyleSheet, Text, View } from "react-native";

import type { PaywallPlan, PaywallTheme } from "../types";

interface OfferPriceCardProps<TPackage> {
  billingDisclosure: string;
  discountText?: string;
  originalPriceText?: string;
  plan: PaywallPlan<TPackage>;
  theme: PaywallTheme;
}

export const OfferPriceCard = <TPackage,>({
  billingDisclosure,
  discountText,
  originalPriceText,
  plan,
  theme,
}: OfferPriceCardProps<TPackage>) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.selectedSurfaceColor,
          borderColor: theme.selectedBorderColor,
          borderRadius: theme.cardBorderRadius,
        },
      ]}
    >
      <View style={styles.headingRow}>
        <Text style={[styles.planTitle, { color: theme.primaryTextColor }]}>
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
      <Text style={[styles.disclosure, { color: theme.secondaryTextColor }]}>
        {billingDisclosure}
      </Text>
    </View>
  );
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
  priceRow: {
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
