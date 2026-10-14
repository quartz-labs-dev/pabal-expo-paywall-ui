import { Pressable, StyleSheet, Text, View } from "react-native";

import type {
  PaywallTheme,
  ProOnboardingCopy,
  ProOnboardingItem,
} from "../types";

interface ProOnboardingNextCardProps {
  item: ProOnboardingItem;
  copy: ProOnboardingCopy;
  theme: PaywallTheme;
  onTry?: () => void;
  onConfirmUsed?: () => void;
}

/** One suggested item with "Try it" and "Already used". */
export const ProOnboardingNextCard = ({
  item,
  copy,
  theme,
  onTry,
  onConfirmUsed,
}: ProOnboardingNextCardProps) => (
  <View
    style={[
      styles.card,
      {
        borderColor: theme.accentColor,
        borderRadius: theme.cardBorderRadius,
      },
    ]}
  >
    <Text style={[styles.label, { color: theme.accentColor }]}>
      {copy.nextTitle}
    </Text>
    {item.badge}
    <Text style={[styles.title, { color: theme.primaryTextColor }]}>
      {item.title}
    </Text>
    {item.description ? (
      <Text style={[styles.description, { color: theme.secondaryTextColor }]}>
        {item.description}
      </Text>
    ) : null}
    <View style={styles.actions}>
      {item.onPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={onTry}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: theme.accentColor,
              // Same border width as the secondary button keeps both labels
              // on one line.
              borderColor: theme.accentColor,
              borderRadius: theme.buttonBorderRadius,
            },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.accentTextColor }]}>
            {copy.tryButton}
          </Text>
        </Pressable>
      ) : null}
      <Pressable
        accessibilityRole="button"
        onPress={onConfirmUsed}
        style={({ pressed }) => [
          styles.button,
          {
            borderColor: theme.borderColor,
            borderRadius: theme.buttonBorderRadius,
          },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.secondaryTextColor }]}>
          {copy.alreadyUsedButton}
        </Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    alignItems: "flex-start",
    borderWidth: 1.5,
    gap: 6,
    padding: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "600",
  },
  description: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "400",
  },
  actions: {
    alignSelf: "stretch",
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  button: {
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.72,
  },
});
