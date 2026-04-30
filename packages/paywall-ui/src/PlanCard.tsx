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
  const selectedDescription =
    isSelected && plan.selectedDescription
      ? plan.selectedDescription
      : undefined;
  const selectedDescriptionProgress = useRef(
    new Animated.Value(selectedDescription ? 1 : 0),
  ).current;
  const badgeShine = useRef(new Animated.Value(0)).current;
  const annualBorderGlow = useRef(new Animated.Value(0)).current;
  const shouldAnimateBadge = shouldAnimate && Boolean(plan.badgeText);
  const shouldHighlightAnnualPlan = isSelected && plan.period === "annual";
  const shouldAnimateAnnualGlow = shouldAnimate && shouldHighlightAnnualPlan;
  const annualBorderGlowOpacity = annualBorderGlow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.18, 0.48, 0.18],
  });
  const annualBorderGlowScale = annualBorderGlow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.015, 1],
  });
  const badgeShineTranslateX = badgeShine.interpolate({
    inputRange: [0, 1],
    outputRange: [-42, 96],
  });
  const priceTranslateY = selectedDescriptionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });
  const selectedDescriptionOpacity = selectedDescriptionProgress.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
  });
  const selectedDescriptionTranslateY = selectedDescriptionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 0],
  });

  useEffect(() => {
    Animated.timing(selectedDescriptionProgress, {
      duration: shouldAnimate ? 180 : 0,
      easing: Easing.out(Easing.cubic),
      toValue: selectedDescription ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [selectedDescription, selectedDescriptionProgress, shouldAnimate]);

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

  useEffect(() => {
    if (!shouldAnimateAnnualGlow) {
      annualBorderGlow.stopAnimation();
      annualBorderGlow.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(annualBorderGlow, {
          duration: 1200,
          easing: Easing.inOut(Easing.cubic),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(annualBorderGlow, {
          duration: 1200,
          easing: Easing.inOut(Easing.cubic),
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    annualBorderGlow.setValue(0);
    animation.start();

    return () => {
      animation.stop();
    };
  }, [annualBorderGlow, shouldAnimateAnnualGlow]);

  return (
    <Pressable
      accessibilityLabel={[
        plan.title,
        plan.priceText,
        plan.monthlyPriceText,
        plan.badgeText,
        selectedDescription,
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
          borderWidth: shouldHighlightAnnualPlan ? 2 : isSelected ? 1.5 : 1,
        },
      ]}
    >
      {shouldHighlightAnnualPlan && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.annualGlow,
            {
              borderColor: theme.selectedBorderColor,
              opacity: annualBorderGlowOpacity,
              transform: [{ scale: annualBorderGlowScale }],
            },
          ]}
        />
      )}

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

        <View style={styles.priceBlock}>
          <Animated.View
            style={[
              styles.priceRow,
              { transform: [{ translateY: priceTranslateY }] },
            ]}
          >
            <Text
              style={[styles.price, { color: theme.primaryTextColor }]}
            >
              {priceParts ? (
                <>
                  {priceParts.prefix && (
                    <Text style={styles.priceCurrency}>
                      {priceParts.prefix}
                    </Text>
                  )}
                  {priceParts.amount}
                  {priceParts.suffix && (
                    <Text style={styles.priceCurrency}>
                      {priceParts.suffix}
                    </Text>
                  )}
                </>
              ) : (
                plan.priceText
              )}
            </Text>
            {plan.monthlyPriceText && (
              <Text
                numberOfLines={1}
                style={[
                  styles.monthlyPrice,
                  { color: theme.secondaryTextColor },
                ]}
              >
                {plan.monthlyPriceText}
              </Text>
            )}
          </Animated.View>

          {plan.selectedDescription && (
            <Animated.View
              style={[
                styles.selectedDescriptionSlot,
                {
                  opacity: selectedDescriptionOpacity,
                  transform: [
                    { translateY: selectedDescriptionTranslateY },
                  ],
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.selectedDescription,
                  { color: theme.secondaryTextColor },
                ]}
              >
                {plan.selectedDescription}
              </Text>
            </Animated.View>
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
    overflow: "visible",
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: "relative",
  },
  annualGlow: {
    borderRadius: 10,
    borderWidth: 3,
    bottom: -3,
    left: -3,
    position: "absolute",
    right: -3,
    top: -3,
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
    paddingHorizontal: 12,
    paddingVertical: 5,
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
  priceBlock: {
    gap: 5,
    minHeight: 51,
  },
  priceRow: {
    alignItems: "baseline",
    flexDirection: "row",
    gap: 7,
    minHeight: 30,
  },
  price: {
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
  selectedDescriptionSlot: {
    height: 16,
    justifyContent: "center",
  },
  selectedDescription: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
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
