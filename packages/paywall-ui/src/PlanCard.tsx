import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";

import type { PaywallPlan, PaywallTheme } from "./types";

interface PlanCardProps<TPackage> {
  plan: PaywallPlan<TPackage>;
  isSelected: boolean;
  shouldAnimate: boolean;
  theme: PaywallTheme;
  onPress: () => void;
}

export const PlanCard = <TPackage,>({
  plan,
  isSelected,
  shouldAnimate,
  theme,
  onPress,
}: PlanCardProps<TPackage>) => {
  const priceParts = splitPriceText(plan.priceText);
  const badgeShine = useRef(new Animated.Value(0)).current;
  const shouldAnimateBadge = shouldAnimate && Boolean(plan.badgeText);
  const badgeShineTranslateX = badgeShine.interpolate({
    inputRange: [0, 1],
    outputRange: [-42, 96],
  });

  useEffect(() => {
    if (!shouldAnimateBadge) {
      badgeShine.stopAnimation();
      badgeShine.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(badgeShine, {
          duration: 1250,
          easing: Easing.out(Easing.cubic),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.delay(2200),
      ]),
    );

    badgeShine.setValue(0);
    animation.start();

    return () => {
      animation.stop();
    };
  }, [badgeShine, shouldAnimateBadge]);

  return (
    <Pressable
      accessibilityLabel={[
        plan.title,
        plan.priceText,
        plan.monthlyPriceText,
        plan.badgeText,
      ]
        .filter(Boolean)
        .join(", ")}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        {
          backgroundColor: isSelected
            ? theme.selectedSurfaceColor
            : theme.surfaceColor,
          borderColor: isSelected
            ? theme.selectedBorderColor
            : theme.borderColor,
          borderWidth: isSelected ? 1.5 : 1,
        },
      ]}
    >
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

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            numberOfLines={1}
            style={[styles.title, { color: theme.primaryTextColor }]}
          >
            {plan.title}
          </Text>

          {plan.badgeText && (
            <View
              style={[styles.badge, { backgroundColor: theme.accentColor }]}
            >
              {shouldAnimateBadge && (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.badgeShine,
                    {
                      transform: [
                        { translateX: badgeShineTranslateX },
                        { rotate: "16deg" },
                      ],
                    },
                  ]}
                />
              )}
              <Text
                numberOfLines={1}
                style={[styles.badgeText, { color: theme.accentTextColor }]}
              >
                {plan.badgeText}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.priceRow}>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.82}
            numberOfLines={1}
            style={[styles.price, { color: theme.primaryTextColor }]}
          >
            {priceParts ? (
              <>
                {priceParts.prefix && (
                  <Text style={styles.priceCurrency}>{priceParts.prefix}</Text>
                )}
                {priceParts.amount}
                {priceParts.suffix && (
                  <Text style={styles.priceCurrency}>{priceParts.suffix}</Text>
                )}
              </>
            ) : (
              plan.priceText
            )}
          </Text>
          {plan.monthlyPriceText && (
            <Text
              numberOfLines={1}
              style={[styles.monthlyPrice, { color: theme.secondaryTextColor }]}
            >
              {plan.monthlyPriceText}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    borderRadius: 8,
    flexDirection: "row",
    gap: 12,
    minHeight: 92,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.995 }],
  },
  content: {
    flex: 1,
    gap: 9,
    minWidth: 0,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  radio: {
    alignItems: "center",
    borderRadius: 9,
    borderWidth: 2,
    height: 18,
    justifyContent: "center",
    marginTop: 2,
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
    lineHeight: 21,
  },
  badge: {
    borderRadius: 999,
    flexShrink: 0,
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingVertical: 4,
    position: "relative",
  },
  badgeShine: {
    backgroundColor: "rgba(255, 255, 255, 0.42)",
    bottom: -8,
    position: "absolute",
    top: -8,
    width: 18,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 13,
  },
  priceRow: {
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  price: {
    flexShrink: 1,
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
  },
  monthlyPrice: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 17,
  },
  priceCurrency: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 24,
  },
});

interface PriceParts {
  prefix: string;
  amount: string;
  suffix: string;
}

const splitPriceText = (priceText: string): PriceParts | null => {
  const firstDigitIndex = priceText.search(/\d/);
  if (firstDigitIndex === -1) return null;

  let lastDigitIndex = firstDigitIndex;
  for (let index = priceText.length - 1; index >= firstDigitIndex; index -= 1) {
    if (/\d/.test(priceText[index])) {
      lastDigitIndex = index;
      break;
    }
  }

  return {
    prefix: priceText.slice(0, firstDigitIndex),
    amount: priceText.slice(firstDigitIndex, lastDigitIndex + 1),
    suffix: priceText.slice(lastDigitIndex + 1),
  };
};
